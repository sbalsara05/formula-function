"""TracingInsights' public data as a drop-in source for ingest.py (2018-2022, no account).

TracingInsights (github.com/TracingInsights/<season>) publishes the official live-timing
feed as extracted by FastF1: per-driver lap tables, per-lap telemetry, race-control
messages and session info. Only the files the pipeline uses are downloaded from
raw.githubusercontent.com; the repositories themselves are tens of GB per season.

TracingInsightsClient answers the OpenF1 queries ingest.py makes (sessions, meetings,
drivers, laps, stints, race_control, intervals) plus lap_telemetry() for the selected
qualifying laps, so lap selection, flag periods and metrics are shared with OpenF1.

Their telemetry is FastF1's merged trace: car-data samples (~3.7 Hz) interleaved with
position samples, with the car channels interpolated at the position timestamps. Only
the genuine car-data samples are kept (whole km/h speed, interpolated position), which
matches OpenF1 car data with position interpolated onto it. X/Y are in decimetres, the
same unit as OpenF1.
"""

from __future__ import annotations

import time
from urllib.parse import quote

import numpy as np
import pandas as pd
import requests

from source_common import SESSION_CODES, clean, event_schedule, gaps_from_crossings, iso, parse_query, session_records, utc

BASE_URL = "https://raw.githubusercontent.com/TracingInsights/{year}/main/"
REQUEST_GAP_S = 0.25
MAX_ATTEMPTS = 6
FOLDER = {code: name for name, code in SESSION_CODES.items()}


def table(data: dict) -> pd.DataFrame:
    """Column-oriented JSON with 'None' strings for missing values -> DataFrame."""
    df = pd.DataFrame(data)
    return df.replace("None", np.nan).infer_objects()


def session_zero(info: dict, laps: pd.DataFrame, rcm: pd.DataFrame) -> tuple[pd.Timestamp | None, str | None]:
    """The session's time zero on the lap clock, and where it came from.

    In order: session_info.json; any lap's start date minus its start time in session seconds;
    for a race with neither (2018 Bahrain), race control's chequered flag minus the winner's
    final crossing. The last case only aligns laps with race control: that session's status
    feed runs on a different clock, so its session-status times are not used."""
    if info.get("t0_date"):
        return utc(info["t0_date"]), "session_info"
    known = laps.dropna(subset=["lSD", "lST"])
    if not known.empty:
        first = known.iloc[0]
        return utc(first["lSD"]) - pd.Timedelta(seconds=float(first["lST"])), "lap_dates"
    if rcm.empty or "msg" not in rcm:
        return None, None
    chequered = rcm[rcm["msg"].astype(str).str.upper().str.contains("CHEQUERED")]
    crossings = laps.assign(end=pd.to_numeric(laps["sesT"], errors="coerce"), n=pd.to_numeric(laps["lap"]))
    crossings = crossings.dropna(subset=["end"])
    if chequered.empty or crossings.empty:
        return None, None
    winner_finish = crossings[crossings["n"] == crossings["n"].max()]["end"].min()
    return utc(chequered["time"].iloc[0]) - pd.Timedelta(seconds=float(winner_finish)), "chequered_flag"


class TracingInsightsClient:
    name = "tracinginsights"

    def __init__(self):
        self.calls = 0
        self.http = requests.Session()
        self.http.headers["User-Agent"] = "formula-function-signature-pipeline/0.1"
        self._last = 0.0
        self._events: dict[int, list[dict]] = {}
        self._info: dict[tuple, dict | None] = {}
        self._rosters: dict[int, dict[str, dict]] = {}
        self._key: str | None = None
        self._data: dict | None = None
        self.skip_reason: str | None = None  # why the last session loaded had no usable data

    # ─── HTTP ─────────────────────────────────────────────────────────────

    def _fetch(self, year: int, *parts: str) -> dict | None:
        url = BASE_URL.format(year=year) + "/".join(quote(p) for p in parts)
        for attempt in range(MAX_ATTEMPTS):
            wait = REQUEST_GAP_S - (time.time() - self._last)
            if wait > 0:
                time.sleep(wait)
            self._last = time.time()
            self.calls += 1
            try:
                resp = self.http.get(url, timeout=60)
            except requests.RequestException:
                time.sleep(5 * (attempt + 1))
                continue
            if resp.status_code == 404:
                return None
            if resp.status_code in (429, 500, 502, 503, 504):
                time.sleep(min(120, 5 * 2 ** attempt))
                continue
            resp.raise_for_status()
            return resp.json()
        raise RuntimeError(f"TracingInsights request kept failing: {url}")

    # ─── OpenF1-compatible entry point ────────────────────────────────────

    def get(self, endpoint: str, query: str = ""):
        params, _ = parse_query(query)
        if endpoint == "sessions":
            year = int(params["year"])
            events = self._season(year)
            keys = {ev["round"]: ((self._session_info(year, ev["name"], "Qualifying") or {})
                                  .get("session_info", {}).get("Meeting", {}).get("Circuit", {}).get("Key"))
                    for ev in events}
            return session_records(year, events, keys)
        if endpoint == "meetings":
            year = int(params["year"])
            return [{"meeting_key": f"{year}-{ev['round']:02d}", "meeting_name": ev["name"]} for ev in self._season(year)]
        data = self._load(params["session_key"])
        if data is None:
            return [] if endpoint in ("drivers", "race_control") else pd.DataFrame()
        return getattr(self, f"_{endpoint}")(data)

    def _season(self, year: int) -> list[dict]:
        if year not in self._events:
            self._events[year] = event_schedule(year)
        return self._events[year]

    def _session_info(self, year: int, event: str, folder: str) -> dict | None:
        key = (year, event, folder)
        if key not in self._info:
            self._info[key] = self._fetch(year, event, folder, "session_info.json")
        return self._info[key]

    # ─── Session loading ──────────────────────────────────────────────────

    def _load(self, session_key: str) -> dict | None:
        if session_key == self._key:
            return self._data
        year, rnd, code = session_key.split("-")
        year, rnd = int(year), int(rnd)
        event = next(ev["name"] for ev in self._season(year) if ev["round"] == rnd)
        folder = FOLDER[code]
        info = self._session_info(year, event, folder) or {}
        listed = (self._fetch(year, event, folder, "drivers.json") or {}).get("drivers", [])
        laps, drivers = [], []
        for d in listed:
            lt = self._fetch(year, event, folder, d["driver"], "laptimes.json")
            if not lt or not lt.get("lap"):
                continue
            lt = table(lt)
            d = self._complete_driver(year, d, lt)
            if d is None:
                continue
            drivers.append(d)
            laps.append(lt.assign(driver_number=int(d["dn"]), code=d["driver"]))

        data, self.skip_reason = None, "no data in the source"
        if laps:
            laps = pd.concat(laps, ignore_index=True)
            rcm = table(self._fetch(year, event, folder, "rcm.json") or {})
            if rcm.empty:
                self.skip_reason = "no race-control messages in the source, so flags cannot be applied"
            else:
                t0, t0_source = session_zero(info, laps, rcm)
                data = {"year": year, "event": event, "folder": folder, "t0": t0, "t0_source": t0_source,
                        "info": info, "drivers": drivers, "rcm": rcm, "laps": laps}
                self.skip_reason = None
        self._key, self._data = session_key, data
        return data

    def _complete_driver(self, year: int, d: dict, laps: pd.DataFrame) -> dict | None:
        """Some drivers.json files list only code and team: take the car number from the lap
        table and the names from Jolpica's season driver list."""
        d = dict(d)
        if not clean(d.get("dn")):
            numbers = pd.to_numeric(laps.get("dNum"), errors="coerce").dropna()
            if numbers.empty:
                return None
            d["dn"] = str(int(numbers.iloc[0]))
        if not clean(d.get("fn")) or not clean(d.get("ln")):
            person = self._roster(year).get(d["driver"], {})
            d["fn"], d["ln"] = person.get("givenName"), person.get("familyName")
        return d

    def _roster(self, year: int) -> dict[str, dict]:
        if year not in self._rosters:
            resp = self.http.get(f"https://api.jolpi.ca/ergast/f1/{year}/drivers.json?limit=100", timeout=30)
            resp.raise_for_status()
            drivers = resp.json()["MRData"]["DriverTable"]["Drivers"]
            self._rosters[year] = {p["code"]: p for p in drivers if p.get("code")}
        return self._rosters[year]

    def release(self) -> None:
        self._key, self._data = None, None

    # ─── Endpoints ────────────────────────────────────────────────────────

    def _drivers(self, data: dict) -> list[dict]:
        return [{
            "driver_number": int(d["dn"]), "first_name": clean(d.get("fn")), "last_name": clean(d.get("ln")),
            "full_name": f"{d.get('fn', '')} {d.get('ln', '')}".strip(), "name_acronym": d["driver"],
            "team_name": clean(d.get("team")),
        } for d in data["drivers"]]

    def _laps(self, data: dict) -> pd.DataFrame:
        laps = data["laps"]
        if laps.empty:
            return laps
        t0 = data["t0"]
        start_s = pd.to_numeric(laps["lST"], errors="coerce")
        dates = [iso(d) if clean(d) is not None else (iso(t0 + pd.Timedelta(seconds=float(s))) if t0 is not None and pd.notna(s) else None)
                 for d, s in zip(laps["lSD"], start_s)]
        return pd.DataFrame({
            "driver_number": laps["driver_number"].astype(int),
            "lap_number": pd.to_numeric(laps["lap"]).astype(int),
            "lap_duration": pd.to_numeric(laps["time"], errors="coerce"),
            "date_start": dates,
            "is_pit_out_lap": pd.to_numeric(laps["pout"], errors="coerce").notna(),
        })

    def _stints(self, data: dict) -> pd.DataFrame:
        laps = data["laps"]
        if laps.empty:
            return pd.DataFrame()
        laps = laps[pd.to_numeric(laps["stint"], errors="coerce").notna()]
        rows = []
        for (drv, stint), g in laps.groupby(["driver_number", "stint"]):
            g = g.sort_values("lap")
            compounds = g["compound"].dropna()
            life = pd.to_numeric(g["life"], errors="coerce").dropna()
            rows.append({
                "driver_number": int(drv), "stint_number": int(float(stint)),
                "lap_start": int(g["lap"].iloc[0]), "lap_end": int(g["lap"].iloc[-1]),
                "compound": compounds.mode().iloc[0] if len(compounds) else None,
                "tyre_age_at_start": max(float(life.iloc[0]) - 1, 0.0) if len(life) else 0.0,
            })
        return pd.DataFrame(rows)

    def _race_control(self, data: dict) -> list[dict]:
        msgs = []
        rcm = data["rcm"]
        for m in rcm.to_dict("records") if not rcm.empty else []:
            msgs.append({
                "date": iso(m.get("time")), "category": clean(m.get("cat")), "message": clean(m.get("msg")),
                "flag": clean(m.get("flag")), "scope": clean(m.get("scope")),
                "sector": int(float(m["sector"])) if clean(m.get("sector")) is not None else None,
                "lap_number": int(float(m["lap"])) if clean(m.get("lap")) is not None else None,
            })
        # Live timing carries session status as its own feed; OpenF1 lists it as race-control messages.
        status = (data["info"].get("session_status") or {}) if data["t0_source"] == "session_info" else {}
        for t, s in zip(status.get("Time", []), status.get("Status", [])):
            msgs.append({"date": iso(data["t0"] + pd.Timedelta(seconds=float(t))), "category": "SessionStatus",
                         "message": f"SESSION {str(s).upper()}", "flag": None, "scope": None,
                         "sector": None, "lap_number": None})
        return sorted((m for m in msgs if m["date"]), key=lambda m: m["date"])

    def _intervals(self, data: dict) -> pd.DataFrame:
        laps = data["laps"]
        if laps.empty or data["t0"] is None:
            return pd.DataFrame()
        rows = pd.DataFrame({"driver_number": laps["driver_number"], "lap_number": laps["lap"],
                             "end_s": pd.to_numeric(laps["sesT"], errors="coerce")})
        return gaps_from_crossings(rows, data["t0"])

    # ─── Telemetry ────────────────────────────────────────────────────────

    def lap_telemetry(self, sel: pd.DataFrame, min_samples_per_s: float) -> tuple[pd.DataFrame, dict]:
        """Car-data samples with interpolated X/Y for the selected laps, in ingest's telemetry format."""
        data = self._data
        codes = {int(d["dn"]): d["driver"] for d in data["drivers"]}
        rows, dropped, files = [], [], 0
        for lap in sel.itertuples(index=False):
            drv, n = int(lap.driver_number), int(lap.lap_number)
            raw = self._fetch(data["year"], data["event"], data["folder"], codes[drv], f"{n}_tel.json")
            files += 1
            tel = table((raw or {}).get("tel") or {})
            if tel.empty or not {"time", "speed", "throttle", "brake", "x", "y"} <= set(tel.columns):
                dropped.append((drv, n, "no telemetry file"))
                continue
            tel = tel.dropna(subset=["time", "speed", "x", "y"])
            speed, x, y = (tel[c].to_numpy(float) for c in ("speed", "x", "y"))
            car = np.isclose(speed, np.round(speed)) & ~(np.isclose(x, np.round(x)) & np.isclose(y, np.round(y)))
            c = tel[car & (tel["time"] >= 0) & (tel["time"] <= lap.lap_duration)]
            if len(c) < min_samples_per_s * lap.lap_duration:
                dropped.append((drv, n, f"sparse {len(c)}/{lap.lap_duration:.0f}s"))
                continue
            rows.append(pd.DataFrame({
                "driver_number": drv, "lap_number": n, "t": c["time"].round(3).to_numpy(),
                "speed": c["speed"].to_numpy(), "throttle": c["throttle"].to_numpy(),
                "brake": (c["brake"].astype(float).to_numpy() > 0).astype(int),
                "x": c["x"].round(1).to_numpy(), "y": c["y"].round(1).to_numpy(),
            }))
        tel = pd.concat(rows, ignore_index=True) if rows else pd.DataFrame()
        return tel, {"telemetry_files": files, "laps_dropped": [list(d) for d in dropped]}
