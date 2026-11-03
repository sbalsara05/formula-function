"""Download and normalise timing data for the driving-signature pipeline.

Usage:
    python ingest.py --seasons 2024
    python ingest.py --seasons 2023-2026

Sessions are processed one at a time (OpenF1 allows 30 requests/minute).
Each weekend writes its normalised inputs to data/raw/<season>/ and its
metrics to data/metrics/<season>/, so an interrupted run resumes where it
stopped. Weekends already complete are skipped unless --force is given.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import time
import traceback
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd
import requests

from metrics import DATA_DIR, RAW_DIR, compute_session_metrics
from openf1 import OpenF1Client

PIPELINE_VERSION = "timing-0.1.0"
COVERAGE_PATH = DATA_DIR / "coverage.json"
LOCK_PATH = DATA_DIR / ".ingest.lock"
FASTF1_CACHE_DIR = DATA_DIR / "fastf1_cache"
OPENF1_FIRST_SEASON = 2023  # earlier seasons: TracingInsights' public copy of the same feed (or FastF1 with F1 TV)
SOURCES = ("auto", "openf1", "tracinginsights", "fastf1")

QUALI_LAPS_PER_DRIVER = 3
QUALI_PERSONAL_CUTOFF = 1.01
QUALI_SESSION_CUTOFF = 1.07
WET_COMPOUNDS = {"INTERMEDIATE", "WET"}
WINDOW_PAD_S = 3.0
WINDOW_MERGE_GAP_S = 20.0
CHUNK_MAX_S = 300.0
CAR_DATA_HZ = 3.7
MIN_SAMPLE_COVERAGE = 0.7
MIN_POSITION_COVERAGE = 0.8
GAP_LOOKBACK_S = 30.0
MAX_NEUTRAL_S = 1800.0
YELLOW_FLAGS = {"YELLOW", "DOUBLE YELLOW"}
MAX_YELLOW_S = 600.0

SLUG_OVERRIDES = {"mick schumacher": "mick-schumacher"}

DELETED_RE = re.compile(r"CAR (\d+)\b.*?TIME (\d+:\d+\.\d+) DELETED(?:.*?\bLAP (\d+))?")
REINSTATED_RE = re.compile(r"CAR (\d+)\b.*?TIME (\d+:\d+\.\d+) REINSTATED")


# ─── Helpers ─────────────────────────────────────────────────────────────────

def log(msg: str) -> None:
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}", flush=True)


def strip_accents(text: str) -> str:
    return "".join(ch for ch in unicodedata.normalize("NFKD", text) if not unicodedata.combining(ch))


def driver_slug(first: str | None, last: str | None, full: str | None) -> str:
    full_norm = strip_accents(f"{first or ''} {last or ''}".strip() or (full or "")).lower()
    if full_norm in SLUG_OVERRIDES:
        return SLUG_OVERRIDES[full_norm]
    base = last or (full or "").split()[-1]
    return re.sub(r"[^a-z0-9]+", "-", strip_accents(base).lower()).strip("-")


def driver_map(drivers: list[dict]) -> dict[str, dict]:
    out = {}
    for d in drivers:
        first, last = d.get("first_name"), d.get("last_name")
        out[str(d["driver_number"])] = {
            "slug": driver_slug(first, last, d.get("full_name")),
            "name": f"{first} {last}".strip() if first and last else (d.get("full_name") or "").title(),
            "acronym": d.get("name_acronym"),
            "team": d.get("team_name"),
        }
    return out


def to_utc(series: pd.Series) -> pd.Series:
    return pd.to_datetime(series, utc=True, format="ISO8601")


def epoch_s(series: pd.Series) -> np.ndarray:
    return ((series - pd.Timestamp("1970-01-01", tz="UTC")).dt.total_seconds()).to_numpy(float)


def fmt_query_time(ts: float) -> str:
    return datetime.fromtimestamp(ts, tz=timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")


def parse_lap_time(text: str) -> float:
    minutes, seconds = text.split(":")
    return int(minutes) * 60 + float(seconds)


def ensure_single_instance() -> None:
    me = os.getpid()
    try:
        out = subprocess.run(["ps", "aux"], capture_output=True, text=True).stdout
    except OSError as exc:
        print(f"ps unavailable ({exc}); relying on the lock file only", flush=True)
        out = ""
    others = []
    for line in out.splitlines():
        fields = line.split(None, 10)
        if len(fields) < 11 or "ingest.py" not in fields[10] or "python" not in fields[10].lower():
            continue
        if int(fields[1]) != me:
            others.append(line)
    if others:
        sys.exit("Another ingest.py is already running:\n" + "\n".join(others))
    if LOCK_PATH.exists():
        try:
            os.kill(int(LOCK_PATH.read_text().strip()), 0)
            sys.exit(f"Lock file {LOCK_PATH} points to a running process.")
        except (ProcessLookupError, ValueError):
            pass
    LOCK_PATH.parent.mkdir(parents=True, exist_ok=True)
    LOCK_PATH.write_text(str(me))


# ─── Race control parsing ────────────────────────────────────────────────────

def neutral_windows(rc: list[dict], include_safety_car: bool) -> list[tuple[float, float]]:
    """Red-flag periods (and safety car / VSC periods if requested) as epoch-second windows.

    Race control does not always close a period explicitly: a red flag can end
    with "SESSION STARTED" instead of a green flag, and a VSC can turn into a
    full safety car without a "VSC ENDING" message.
    """
    msgs = sorted(rc, key=lambda m: m["date"])
    times = [pd.Timestamp(m["date"]).timestamp() for m in msgs]
    windows = []
    for i, m in enumerate(msgs):
        text = (m.get("message") or "").upper()
        if m.get("flag") == "RED":
            kind = "red"
        elif include_safety_car and m.get("category") == "SafetyCar" and "DEPLOYED" in text:
            kind = "vsc" if "VIRTUAL" in text else "sc"
        else:
            continue
        start, end = times[i], None
        for m2, t2 in zip(msgs[i + 1:], times[i + 1:]):
            t2_text = (m2.get("message") or "").upper()
            category, flag = m2.get("category"), m2.get("flag")
            session_restart = category == "SessionStatus" and ("STARTED" in t2_text or "RESUMED" in t2_text)
            if flag == "CHEQUERED" or (category == "SessionStatus" and "FINISHED" in t2_text):
                end = t2
            elif kind == "red" and ((flag == "GREEN" and m2.get("scope") in ("Track", None)) or session_restart):
                end = t2
            elif kind != "red" and flag == "RED":
                end = t2
            elif kind == "vsc" and category == "SafetyCar":
                end = t2 + (20 if "ENDING" in t2_text else 0)
            elif kind == "sc" and category == "SafetyCar" and ("IN THIS LAP" in t2_text or "ENDING" in t2_text):
                end = t2 + 120
            if end is not None:
                break
        cap = start + (3 * 3600 if kind == "red" else MAX_NEUTRAL_S)
        windows.append((start, min(end, cap) if end is not None else start + MAX_NEUTRAL_S))
    return windows


def yellow_windows(rc: list[dict]) -> list[tuple[float, float]]:
    """Yellow and double-yellow periods as epoch-second windows, applied track-wide.

    Race control flags marshal sectors, but there is no public mapping from a
    car's position to a marshal sector for race laps, so any lap overlapping a
    yellow anywhere is treated as affected. A sector stays yellow until it is
    cleared, the whole track is cleared or goes green or red, or the session ends.
    """
    open_sectors: dict[object, float] = {}
    windows = []
    for m in sorted(rc, key=lambda m: m["date"]):
        t = pd.Timestamp(m["date"]).timestamp()
        text = (m.get("message") or "").upper()
        flag, scope = m.get("flag"), m.get("scope")
        for key, start in list(open_sectors.items()):
            if t - start > MAX_YELLOW_S:
                windows.append((start, start + MAX_YELLOW_S))
                del open_sectors[key]
        if flag in YELLOW_FLAGS:
            open_sectors.setdefault(m.get("sector") if scope == "Sector" else "track", t)
        elif flag == "CLEAR" and scope == "Sector":
            start = open_sectors.pop(m.get("sector"), None)
            if start is not None:
                windows.append((start, t))
        elif ((flag in ("CLEAR", "GREEN") and scope in ("Track", None)) or flag in ("RED", "CHEQUERED")
              or (m.get("category") == "SessionStatus" and ("FINISHED" in text or "ENDED" in text))):
            windows.extend((start, t) for start in open_sectors.values())
            open_sectors.clear()
    windows.extend((start, start + MAX_YELLOW_S) for start in open_sectors.values())
    return windows


def overlaps_any(starts: np.ndarray, ends: np.ndarray, windows: list[tuple[float, float]]) -> np.ndarray:
    hit = np.zeros(len(starts), dtype=bool)
    for a, b in windows:
        hit |= (starts < b) & (ends > a)
    return hit


def deleted_laps(rc: list[dict], laps: pd.DataFrame) -> set[tuple[int, int]]:
    deleted: dict[tuple[int, float], int | None] = {}
    for m in sorted(rc, key=lambda m: m["date"]):
        text = (m.get("message") or "").upper()
        if (hit := DELETED_RE.search(text)):
            deleted[(int(hit.group(1)), parse_lap_time(hit.group(2)))] = int(hit.group(3)) if hit.group(3) else None
        elif (hit := REINSTATED_RE.search(text)):
            deleted.pop((int(hit.group(1)), parse_lap_time(hit.group(2))), None)

    out = set()
    for (drv, lap_time), lap_no in deleted.items():
        if lap_no is not None:
            out.add((drv, lap_no))
            continue
        match = laps[(laps.driver_number == drv) & ((laps.lap_duration - lap_time).abs() < 0.002)]
        out.update((drv, int(n)) for n in match.lap_number)
    return out


# ─── Tyres ───────────────────────────────────────────────────────────────────

def attach_stints(laps: pd.DataFrame, stints: pd.DataFrame) -> pd.DataFrame:
    laps = laps.copy()
    laps["compound"], laps["stint"], laps["tyre_age"] = None, np.nan, np.nan
    if stints.empty:
        return laps
    m = laps[["driver_number", "lap_number"]].reset_index().merge(
        stints[["driver_number", "stint_number", "lap_start", "lap_end", "compound", "tyre_age_at_start"]],
        on="driver_number", how="inner")
    lap_end = m.lap_end.fillna(10_000)
    m = m[(m.lap_number >= m.lap_start) & (m.lap_number <= lap_end)]
    m = m.sort_values(["index", "stint_number"]).drop_duplicates("index", keep="last").set_index("index")
    laps.loc[m.index, "compound"] = m.compound.str.upper()
    laps.loc[m.index, "stint"] = m.stint_number
    laps.loc[m.index, "tyre_age"] = m.tyre_age_at_start.fillna(0) + (m.lap_number - m.lap_start)
    return laps


# ─── Qualifying ──────────────────────────────────────────────────────────────

def select_quali_laps(laps: pd.DataFrame, deleted: set, flagged: list) -> pd.DataFrame:
    v = laps[laps.lap_duration.notna() & ~laps.is_pit_out_lap & laps.date_start.notna()].copy()
    v = v[[(d, n) not in deleted for d, n in zip(v.driver_number, v.lap_number)]]
    start = epoch_s(v.date_start)
    v = v[~overlaps_any(start, start + v.lap_duration.to_numpy(float), flagged)]
    v = v[~v.compound.isin(WET_COMPOUNDS)]
    if v.empty:
        return v
    v = v[v.lap_duration <= QUALI_SESSION_CUTOFF * v.lap_duration.min()]
    personal_best = v.groupby("driver_number").lap_duration.transform("min")
    v = v[v.lap_duration <= QUALI_PERSONAL_CUTOFF * personal_best]
    return v.sort_values("lap_duration").groupby("driver_number").head(QUALI_LAPS_PER_DRIVER)


def telemetry_chunks(sel: pd.DataFrame) -> list[tuple[float, float]]:
    start = epoch_s(sel.date_start)
    spans = sorted(zip(start - WINDOW_PAD_S, start + sel.lap_duration.to_numpy(float) + WINDOW_PAD_S))
    merged: list[list[float]] = []
    for a, b in spans:
        if merged and a <= merged[-1][1] + WINDOW_MERGE_GAP_S:
            merged[-1][1] = max(merged[-1][1], b)
        else:
            merged.append([a, b])
    chunks = []
    for a, b in merged:
        while a < b:
            chunks.append((a, min(b, a + CHUNK_MAX_S)))
            a += CHUNK_MAX_S
    return chunks


def fetch_lap_telemetry(client: OpenF1Client, session_key: int, sel: pd.DataFrame) -> tuple[pd.DataFrame, dict]:
    car_parts, loc_parts = [], []
    chunks = telemetry_chunks(sel)
    for a, b in chunks:
        q = f"session_key={session_key}&date>={fmt_query_time(a)}&date<={fmt_query_time(b)}"
        car_parts.append(pd.DataFrame(client.get("car_data", q)))
        loc_parts.append(pd.DataFrame(client.get("location", q)))
    car = pd.concat(car_parts, ignore_index=True).drop_duplicates(["driver_number", "date"])
    loc = pd.concat(loc_parts, ignore_index=True).drop_duplicates(["driver_number", "date"])
    car["ts"] = epoch_s(to_utc(car.date))
    loc["ts"] = epoch_s(to_utc(loc.date))
    loc = loc[~((loc.x == 0) & (loc.y == 0))]
    car_by_drv = {d: g.sort_values("ts") for d, g in car.groupby("driver_number")}
    loc_by_drv = {d: g.sort_values("ts") for d, g in loc.groupby("driver_number")}

    rows, dropped = [], []
    for lap in sel.itertuples(index=False):
        t0 = lap.date_start.timestamp()
        t1 = t0 + lap.lap_duration
        c = car_by_drv.get(lap.driver_number)
        p = loc_by_drv.get(lap.driver_number)
        if c is None or p is None:
            dropped.append((int(lap.driver_number), int(lap.lap_number), "no data"))
            continue
        c = c[(c.ts >= t0) & (c.ts <= t1)]
        p = p[(p.ts >= t0 - 2) & (p.ts <= t1 + 2)]
        expected = lap.lap_duration * CAR_DATA_HZ
        pos_in_lap = ((p.ts >= t0) & (p.ts <= t1)).sum()
        if len(c) < MIN_SAMPLE_COVERAGE * expected or pos_in_lap < MIN_POSITION_COVERAGE * MIN_SAMPLE_COVERAGE * expected:
            dropped.append((int(lap.driver_number), int(lap.lap_number), f"sparse {len(c)}/{expected:.0f}"))
            continue
        x = np.interp(c.ts, p.ts, p.x)
        y = np.interp(c.ts, p.ts, p.y)
        rows.append(pd.DataFrame({
            "driver_number": int(lap.driver_number), "lap_number": int(lap.lap_number),
            "t": (c.ts - t0).round(3).to_numpy(), "speed": c.speed.to_numpy(),
            "throttle": c.throttle.to_numpy(), "brake": (c.brake.to_numpy() > 0).astype(int),
            "x": np.round(x, 1), "y": np.round(y, 1),
        }))
    tel = pd.concat(rows, ignore_index=True) if rows else pd.DataFrame()
    return tel, {"chunks": len(chunks), "car_rows": int(len(car)), "location_rows": int(len(loc)),
                 "laps_dropped": [list(d) for d in dropped]}


def process_quali(client: OpenF1Client, session: dict, raw: Path, rnd: int) -> dict:
    sk = session["session_key"]
    drivers = driver_map(client.get("drivers", f"session_key={sk}"))
    laps = pd.DataFrame(client.get("laps", f"session_key={sk}"))
    rc = client.get("race_control", f"session_key={sk}")
    stints = pd.DataFrame(client.get("stints", f"session_key={sk}"))
    if laps.empty:
        return {"status": "skipped", "reason": getattr(client, "skip_reason", None) or "no laps", "drivers": drivers}

    (raw / f"{rnd:02d}_Q_race_control.json").write_text(json.dumps(rc))
    laps["date_start"] = to_utc(laps.date_start)
    laps["is_pit_out_lap"] = laps.is_pit_out_lap.fillna(False).astype(bool)
    laps = attach_stints(laps, stints)
    deleted = deleted_laps(rc, laps)
    red = neutral_windows(rc, include_safety_car=False)
    yellow = yellow_windows(rc)
    sel = select_quali_laps(laps, deleted, red + yellow)
    info = {
        "session_key": sk, "date_start": session["date_start"], "drivers": drivers,
        "laps_total": int(len(laps)), "laps_timed": int(laps.lap_duration.notna().sum()),
        "laps_deleted": len(deleted), "red_flag_windows": [[fmt_query_time(a), fmt_query_time(b)] for a, b in red],
        "yellow_windows": [[fmt_query_time(a), fmt_query_time(b)] for a, b in yellow],
        "laps_selected": int(len(sel)),
        "drivers_selected": int(sel.driver_number.nunique()) if len(sel) else 0,
    }
    if info["drivers_selected"] < 10:
        return {**info, "status": "skipped", "reason": f"only {info['drivers_selected']} drivers with dry push laps"}

    if hasattr(client, "lap_telemetry"):
        tel, tel_info = client.lap_telemetry(sel, CAR_DATA_HZ * MIN_SAMPLE_COVERAGE)
    else:
        tel, tel_info = fetch_lap_telemetry(client, sk, sel)
    kept = tel[["driver_number", "lap_number"]].drop_duplicates() if len(tel) else pd.DataFrame(columns=["driver_number", "lap_number"])
    sel = sel.merge(kept, on=["driver_number", "lap_number"])
    sel["team"] = sel.driver_number.astype(str).map(lambda n: drivers.get(n, {}).get("team"))
    sel[["driver_number", "lap_number", "lap_duration", "date_start", "compound", "team"]].to_csv(
        raw / f"{rnd:02d}_Q_laps.csv.gz", index=False)
    if len(tel):
        tel.to_csv(raw / f"{rnd:02d}_Q_telemetry.csv.gz", index=False)
    return {**info, **tel_info, "laps_with_telemetry": int(len(sel)), "status": "ok"}


# ─── Race ────────────────────────────────────────────────────────────────────

def gap_at(times: np.ndarray, values: np.ndarray, t: float) -> float:
    i = np.searchsorted(times, t, side="right") - 1
    if i < 0 or t - times[i] > GAP_LOOKBACK_S:
        return np.nan
    return values[i]


def interval_value(interval, gap_to_leader) -> float:
    """Seconds to the car ahead; inf when there is no car ahead (leader or lapped gap)."""
    if isinstance(gap_to_leader, (int, float)) and gap_to_leader == 0:
        return np.inf
    if interval is None:
        return np.nan
    if isinstance(interval, (int, float)):
        return float(interval) if np.isfinite(interval) else np.nan
    return np.inf if "LAP" in str(interval).upper() else np.nan


def process_race(client: OpenF1Client, session: dict, raw: Path, rnd: int) -> dict:
    sk = session["session_key"]
    drivers = driver_map(client.get("drivers", f"session_key={sk}"))
    laps = pd.DataFrame(client.get("laps", f"session_key={sk}"))
    rc = client.get("race_control", f"session_key={sk}")
    stints = pd.DataFrame(client.get("stints", f"session_key={sk}"))
    intervals = pd.DataFrame(client.get("intervals", f"session_key={sk}"))
    if laps.empty:
        return {"status": "skipped", "reason": getattr(client, "skip_reason", None) or "no laps", "drivers": drivers}

    (raw / f"{rnd:02d}_R_race_control.json").write_text(json.dumps(rc))
    laps = laps.sort_values(["driver_number", "lap_number"]).reset_index(drop=True)
    laps["date_start"] = to_utc(laps.date_start)
    laps["pit_out"] = laps.is_pit_out_lap.fillna(False).astype(bool)
    laps["in_lap"] = laps.groupby("driver_number").pit_out.shift(-1, fill_value=False).astype(bool)
    laps = attach_stints(laps, stints)

    start = epoch_s(laps.date_start)
    end = start + laps.lap_duration.to_numpy(float)
    windows = neutral_windows(rc, include_safety_car=True)
    laps["neutralised"] = overlaps_any(start, end, windows)
    yellow = yellow_windows(rc)
    laps["yellow"] = overlaps_any(start, end, yellow)

    laps["gap_ahead"] = np.nan
    if not intervals.empty:
        intervals["ts"] = epoch_s(to_utc(intervals.date))
        intervals["gap"] = [interval_value(i, g) for i, g in zip(intervals.interval, intervals.gap_to_leader)]
        for drv, g in intervals.sort_values("ts").groupby("driver_number"):
            idx = laps.index[laps.driver_number == drv]
            times, values = g.ts.to_numpy(), g.gap.to_numpy(float)
            laps.loc[idx, "gap_ahead"] = [gap_at(times, values, t) if np.isfinite(t) else np.nan for t in end[idx]]

    laps["team"] = laps.driver_number.astype(str).map(lambda n: drivers.get(n, {}).get("team"))
    cols = ["driver_number", "lap_number", "lap_duration", "date_start", "pit_out", "in_lap",
            "neutralised", "yellow", "compound", "stint", "tyre_age", "gap_ahead", "team"]
    laps[cols].to_csv(raw / f"{rnd:02d}_R_laps.csv.gz", index=False)
    return {
        "session_key": sk, "date_start": session["date_start"], "drivers": drivers,
        "total_laps": int(laps.lap_number.max()), "laps_total": int(len(laps)),
        "laps_neutralised": int(laps.neutralised.sum()), "laps_yellow": int(laps.yellow.sum()),
        "neutral_windows": [[fmt_query_time(a), fmt_query_time(b)] for a, b in windows],
        "yellow_windows": [[fmt_query_time(a), fmt_query_time(b)] for a, b in yellow],
        "intervals_rows": int(len(intervals)), "laps_with_gap": int(laps.gap_ahead.notna().sum()),
        "status": "ok",
    }


# ─── Weekend orchestration ───────────────────────────────────────────────────

def fetch_corner_labels(circuit_key: int, season: int) -> list[dict]:
    try:
        resp = requests.get(f"https://api.multiviewer.app/api/v1/circuits/{circuit_key}/{season}",
                            headers={"User-Agent": "formula-function-signature-pipeline/0.1"}, timeout=30)
        resp.raise_for_status()
        return [{"label": f"T{c['number']}{c.get('letter') or ''}",
                 "x": float(c["trackPosition"]["x"]), "y": float(c["trackPosition"]["y"])}
                for c in resp.json().get("corners", [])]
    except Exception as exc:  # labels are cosmetic; corners fall back to C1..Cn
        log(f"  corner labels unavailable for circuit {circuit_key}: {exc}")
        return []


def season_weekends(client: OpenF1Client, season: int) -> list[dict]:
    now = datetime.now(timezone.utc).isoformat()
    sessions = client.get("sessions", f"year={season}")
    meetings = {m["meeting_key"]: m for m in client.get("meetings", f"year={season}")}
    by_meeting: dict[int, dict] = {}
    for s in sessions:
        if s.get("is_cancelled"):
            continue
        if s["session_name"] in ("Qualifying", "Race"):
            by_meeting.setdefault(s["meeting_key"], {})[s["session_name"]] = s
    weekends = [w for w in by_meeting.values() if "Race" in w]
    weekends.sort(key=lambda w: w["Race"]["date_start"])
    out = []
    for rnd, w in enumerate(weekends, start=1):
        m = meetings.get(w["Race"]["meeting_key"], {})
        out.append({
            "season": season, "round": rnd, "meeting_key": w["Race"]["meeting_key"],
            "meeting_name": m.get("meeting_name"), "circuit_key": w["Race"]["circuit_key"],
            "circuit_short_name": w["Race"].get("circuit_short_name"),
            "country_name": w["Race"].get("country_name"),
            "quali": w.get("Qualifying") if w.get("Qualifying") and w["Qualifying"]["date_end"] < now else None,
            "race": w["Race"] if w["Race"]["date_end"] < now else None,
        })
    return out


def process_weekend(client: OpenF1Client, wk: dict, force: bool) -> dict:
    raw = RAW_DIR / str(wk["season"])
    raw.mkdir(parents=True, exist_ok=True)
    meta_path = raw / f"{wk['round']:02d}_meta.json"
    meta = json.loads(meta_path.read_text()) if meta_path.exists() and not force else {}
    done = ("ok", "skipped")
    if meta.get("quali", {}).get("status") in done and meta.get("race", {}).get("status") in done:
        return meta

    meta.update({k: wk[k] for k in ("season", "round", "meeting_key", "meeting_name",
                                    "circuit_key", "circuit_short_name", "country_name")})
    meta["pipeline_version"] = PIPELINE_VERSION
    meta["source"] = getattr(client, "name", "openf1")
    if "corner_labels" not in meta:
        meta["corner_labels"] = fetch_corner_labels(wk["circuit_key"], wk["season"])

    for part, session, fn in (("quali", wk["quali"], process_quali), ("race", wk["race"], process_race)):
        if meta.get(part, {}).get("status") in done:
            continue
        if session is None:
            meta[part] = {"status": "pending", "reason": "session not held yet"}
            continue
        t0, calls0 = time.time(), client.calls
        try:
            meta[part] = fn(client, session, raw, wk["round"])
        except Exception as exc:
            meta[part] = {"status": "error", "error": f"{exc.__class__.__name__}: {exc}",
                          "trace": traceback.format_exc(limit=3)}
        meta[part]["requests"] = client.calls - calls0
        meta[part]["seconds"] = round(time.time() - t0, 1)
        meta["fetched_at"] = datetime.now(timezone.utc).isoformat()
        meta_path.write_text(json.dumps(meta, indent=1, default=str))
        p = meta[part]
        log(f"  {part:5s} {p['status']:7s} {p.get('reason') or p.get('error') or ''} "
            f"laps total={p.get('laps_total')} selected={p.get('laps_with_telemetry', p.get('laps_selected'))} "
            f"requests={p['requests']} {p['seconds']}s")

    meta_path.write_text(json.dumps(meta, indent=1, default=str))
    if not any(meta.get(part, {}).get("status") == "ok" for part in ("quali", "race")):
        meta["metrics"] = {}
        log("  metrics skipped: no session loaded")
    else:
        try:
            meta["metrics"] = compute_session_metrics(wk["season"], wk["round"])
        except Exception as exc:
            meta["metrics"] = {"error": f"{exc.__class__.__name__}: {exc}", "trace": traceback.format_exc(limit=4)}
        log(f"  metrics {meta['metrics']}")
    meta_path.write_text(json.dumps(meta, indent=1, default=str))
    if hasattr(client, "release"):
        client.release()
    return meta


def write_coverage() -> dict:
    coverage: dict = {"pipeline_version": PIPELINE_VERSION, "updated_at": datetime.now(timezone.utc).isoformat(), "seasons": {}}
    for meta_path in sorted(RAW_DIR.glob("*/*_meta.json")):
        meta = json.loads(meta_path.read_text())
        s = coverage["seasons"].setdefault(str(meta["season"]), {
            "weekends": 0, "weekends_pending": 0, "quali_ok": 0, "race_ok": 0, "problems": [],
            "quali_laps_total": 0, "quali_laps_with_telemetry": 0, "race_laps_total": 0, "race_clean_laps": 0,
        })
        q, r = meta.get("quali", {}), meta.get("race", {})
        if q.get("status") == "pending" and r.get("status") == "pending":
            s["weekends_pending"] += 1
            continue
        s["weekends"] += 1
        s["quali_ok"] += q.get("status") == "ok"
        s["race_ok"] += r.get("status") == "ok"
        s["quali_laps_total"] += q.get("laps_total") or 0
        s["quali_laps_with_telemetry"] += q.get("laps_with_telemetry") or 0
        s["race_laps_total"] += r.get("laps_total") or 0
        s["race_clean_laps"] += (meta.get("metrics", {}).get("race") or {}).get("clean_laps") or 0
        for part, p in (("quali", q), ("race", r)):
            if p.get("status") != "ok":
                s["problems"].append({"round": meta["round"], "meeting": meta.get("meeting_name"), "part": part,
                                      "status": p.get("status"), "detail": p.get("reason") or p.get("error")})
        if "error" in meta.get("metrics", {}):
            s["problems"].append({"round": meta["round"], "meeting": meta.get("meeting_name"), "part": "metrics",
                                  "status": "error", "detail": meta["metrics"]["error"]})
    COVERAGE_PATH.write_text(json.dumps(coverage, indent=1))
    return coverage


def parse_seasons(values: list[str]) -> list[int]:
    seasons: list[int] = []
    for v in values:
        if "-" in v:
            a, b = v.split("-")
            seasons.extend(range(int(a), int(b) + 1))
        else:
            seasons.append(int(v))
    return sorted(set(seasons))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--seasons", nargs="+", required=True, help="e.g. 2024 or 2023-2026")
    parser.add_argument("--rounds", type=int, nargs="*", help="only these round numbers")
    parser.add_argument("--force", action="store_true", help="re-download weekends that are already complete")
    parser.add_argument("--source", choices=SOURCES, default="auto",
                        help="auto = OpenF1 from 2023, TracingInsights before; forcing tracinginsights on 2023+ "
                             "is how that source is validated (use SIGNATURE_DATA_DIR to keep it separate)")
    args = parser.parse_args()

    ensure_single_instance()
    clients: dict[str, object] = {}

    def client_for(season: int):
        name = args.source if args.source != "auto" else (
            "openf1" if season >= OPENF1_FIRST_SEASON else "tracinginsights")
        if name not in clients:
            if name == "openf1":
                clients[name] = OpenF1Client()
            elif name == "tracinginsights":
                from tracinginsights_source import TracingInsightsClient
                clients[name] = TracingInsightsClient()
            else:
                from fastf1_source import FastF1Client
                clients[name] = FastF1Client(FASTF1_CACHE_DIR)
        return clients[name]

    try:
        for season in parse_seasons(args.seasons):
            client = client_for(season)
            weekends = season_weekends(client, season)
            if args.rounds:
                weekends = [w for w in weekends if w["round"] in args.rounds]
            log(f"Season {season}: {len(weekends)} weekends expected "
                f"({sum(w['race'] is not None for w in weekends)} races held)")
            for wk in weekends:
                log(f"{season} R{wk['round']:02d} {wk['meeting_name']}")
                process_weekend(client, wk, args.force)
            cov = write_coverage()["seasons"].get(str(season), {})
            log(f"Season {season} coverage: weekends={cov.get('weekends')} (+{cov.get('weekends_pending')} not yet held) "
                f"quali_ok={cov.get('quali_ok')} "
                f"race_ok={cov.get('race_ok')} quali laps {cov.get('quali_laps_with_telemetry')}/{cov.get('quali_laps_total')} "
                f"race clean laps {cov.get('race_clean_laps')}/{cov.get('race_laps_total')} problems={len(cov.get('problems', []))}")
        log("Done. Requests this run: " + ", ".join(f"{name} {c.calls}" for name, c in clients.items()))
    finally:
        LOCK_PATH.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
