"""Turn per-session measurements into driver-era signature scores.

Reads data/metrics/ and data/raw/*_meta.json, writes:
  data/session_scores.csv.gz  one row per driver per session (field-relative z-scores)
  data/aggregate.json         driver-era scores, percentiles, confidence, comparison groups
"""

from __future__ import annotations

import json
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd
import requests

from eras import ERA_BY_ID, ERAS, era_for_season
from ingest import PIPELINE_VERSION, driver_slug
from metrics import DATA_DIR, METRICS_DIR, RAW_DIR

AXES = ["Steering Smoothness", "Entry Aggression", "Tyre Management", "Throttle Application", "Braking", "Consistency"]
QUALI_AXES = ["Braking", "Entry Aggression", "Throttle Application"]
RACE_AXES = ["Consistency", "Tyre Management"]
COHORT_KEYS = ["era", "allTime", "champions", "teammates"]

MIN_FIELD_LAPS_PER_CORNER = 8
BRAKING_CORNER_SHARE = 0.5
Z_CLIP = 3.0
MIN_QUALI_SESSIONS, MIN_QUALI_SAMPLES = 5, 150
MIN_RACE_SESSIONS, MIN_RACE_STINTS = 5, 8
MIN_RACE_FIELD_STINTS = 6
MIN_COMPOUND_STINTS = 4
BOOTSTRAP_N = 400
SEED = 20261102

SESSION_SCORES_PATH = DATA_DIR / "session_scores.csv.gz"
AGGREGATE_PATH = DATA_DIR / "aggregate.json"
CHAMPIONS_PATH = DATA_DIR / "champions.json"
DRIVER_COVERAGE_PATH = DATA_DIR / "driver_coverage.csv"


def robust_z(x: pd.Series) -> pd.Series:
    med = x.median()
    scale = 1.4826 * (x - med).abs().median()
    if not np.isfinite(scale) or scale == 0:
        scale = x.std()
    if not np.isfinite(scale) or scale == 0:
        return (x * 0.0).where(x.notna())
    return ((x - med) / scale).clip(-Z_CLIP, Z_CLIP)


def row_mean(*cols: pd.Series) -> pd.Series:
    return pd.concat(cols, axis=1).mean(axis=1, skipna=True)


# ─── Per-session scores ──────────────────────────────────────────────────────

def quali_session_scores(meta: dict, df: pd.DataFrame) -> list[dict]:
    df = df[df.apex_s.notna()].copy()
    field = df.groupby("corner").size()
    df = df[df.corner.isin(field[field >= MIN_FIELD_LAPS_PER_CORNER].index)]
    if df.empty:
        return []

    braking_corners = df.groupby("corner").braked.mean()
    non_braking = df.corner.isin(braking_corners[braking_corners < BRAKING_CORNER_SHARE].index)
    brake_cols = ["brake_on_s", "brake_off_s", "brake_release_speed", "brake_len_m"]
    df.loc[non_braking | ~df.braked.astype(bool), brake_cols] = np.nan

    by_corner = df.groupby("corner")
    z = {c: by_corner[c].transform(robust_z)
         for c in ["brake_on_s", "brake_len_m", "brake_release_speed", "min_speed", "apex_to_full_throttle_m"]}
    lift_dev = df.throttle_lifts - by_corner.throttle_lifts.transform("mean")
    lift_sd = lift_dev.std()
    z["throttle_lifts"] = (lift_dev / lift_sd).clip(-Z_CLIP, Z_CLIP) if lift_sd and np.isfinite(lift_sd) else lift_dev * 0.0

    df["Braking"] = row_mean(z["brake_on_s"], -z["brake_len_m"])
    df["Entry Aggression"] = row_mean(z["brake_release_speed"], z["min_speed"])
    df["Throttle Application"] = row_mean(-z["apex_to_full_throttle_m"], -z["throttle_lifts"])
    for col, name in (("brake_on_s", "d_brake_point_m"), ("min_speed", "d_min_speed_kmh"),
                      ("brake_release_speed", "d_release_speed_kmh"), ("apex_to_full_throttle_m", "d_to_full_throttle_m")):
        df[name] = df[col] - by_corner[col].transform("median")

    drivers = meta["quali"].get("drivers", {})
    rows = []
    for drv, g in df.groupby("driver_number"):
        info = drivers.get(str(int(drv)), {})
        row = {
            "session_id": f"{meta['season']}-{meta['round']:02d}-Q", "kind": "Q",
            "season": meta["season"], "round": meta["round"], "slug": info.get("slug"),
            "name": info.get("name"), "team": info.get("team"),
            "laps": int(g.lap_number.nunique()),
            "d_brake_point_m": g.d_brake_point_m.mean(), "d_min_speed_kmh": g.d_min_speed_kmh.mean(),
            "d_release_speed_kmh": g.d_release_speed_kmh.mean(), "d_to_full_throttle_m": g.d_to_full_throttle_m.mean(),
        }
        for axis in QUALI_AXES:
            vals = g[axis].dropna()
            row[axis], row[f"{axis}__n"] = (vals.mean(), len(vals)) if len(vals) else (np.nan, 0)
        rows.append(row)
    return rows


def race_session_scores(meta: dict, stints: pd.DataFrame) -> list[dict]:
    if stints.empty:
        return []
    s = stints.copy()
    s["z_cons"] = np.nan
    s["z_deg"] = np.nan
    cons = s.residual_spread_s.notna()
    if cons.sum() >= MIN_RACE_FIELD_STINTS:
        s.loc[cons, "z_cons"] = -robust_z(s.loc[cons, "residual_spread_s"])
    deg = s.deg_slope_s_per_lap.notna()
    if deg.sum() >= MIN_RACE_FIELD_STINTS:
        race_median = s.loc[deg, "deg_slope_s_per_lap"].median()
        s.loc[deg, "z_deg"] = -robust_z(s.loc[deg, "deg_slope_s_per_lap"])
        for compound, g in s[deg].groupby("compound"):
            if len(g) >= MIN_COMPOUND_STINTS:
                s.loc[g.index, "z_deg"] = -robust_z(g.deg_slope_s_per_lap)
        s["d_deg_s_per_lap"] = s.deg_slope_s_per_lap - race_median
    s["d_spread_s"] = s.residual_spread_s - s.residual_spread_s.median()

    drivers = meta["race"].get("drivers", {})
    rows = []
    for drv, g in s.groupby("driver_number"):
        info = drivers.get(str(int(drv)), {})
        used = g[g.z_cons.notna() | g.z_deg.notna()]
        row = {
            "session_id": f"{meta['season']}-{meta['round']:02d}-R", "kind": "R",
            "season": meta["season"], "round": meta["round"], "slug": info.get("slug"),
            "name": info.get("name"), "team": info.get("team"),
            "laps": int(used.n_clean.sum()),
            "residual_spread_s": g.residual_spread_s.mean(), "deg_slope_s_per_lap": g.deg_slope_s_per_lap.mean(),
            "d_spread_s": g.d_spread_s.mean(), "d_deg_s_per_lap": g.get("d_deg_s_per_lap", pd.Series(dtype=float)).mean(),
        }
        for axis, col in (("Consistency", "z_cons"), ("Tyre Management", "z_deg")):
            v = g[g[col].notna()]
            if len(v):
                row[axis] = float(np.average(v[col], weights=v.n_clean))
                row[f"{axis}__n"] = len(v)
                row[f"{axis}__w"] = int(v.n_clean.sum())
            else:
                row[axis], row[f"{axis}__n"], row[f"{axis}__w"] = np.nan, 0, 0
        rows.append(row)
    return rows


def build_session_scores() -> pd.DataFrame:
    rows: list[dict] = []
    for meta_path in sorted(RAW_DIR.glob("*/*_meta.json")):
        meta = json.loads(meta_path.read_text())
        season, rnd = meta["season"], meta["round"]
        q_path = METRICS_DIR / str(season) / f"{rnd:02d}_Q_corners.csv.gz"
        r_path = METRICS_DIR / str(season) / f"{rnd:02d}_R_stints.csv.gz"
        weekend: list[dict] = []
        if q_path.exists() and meta.get("quali", {}).get("status") == "ok":
            weekend += quali_session_scores(meta, pd.read_csv(q_path))
        if r_path.exists() and meta.get("race", {}).get("status") == "ok":
            weekend += race_session_scores(meta, pd.read_csv(r_path))
        for row in weekend:
            row["circuit"], row["meeting"] = meta.get("circuit_short_name"), meta.get("meeting_name")
        rows += weekend
    df = pd.DataFrame(rows)
    df = df[df.slug.notna()]
    df["era"] = df.season.map(lambda s: era_for_season(int(s))["id"])
    return df


# ─── Champions ───────────────────────────────────────────────────────────────

def load_champions(seasons: list[int]) -> list[dict]:
    cached = json.loads(CHAMPIONS_PATH.read_text()) if CHAMPIONS_PATH.exists() else {}
    current_year = datetime.now(timezone.utc).year
    out = []
    for season in seasons:
        if season >= current_year:
            continue
        key = str(season)
        if key not in cached:
            try:
                resp = requests.get(f"https://api.jolpi.ca/ergast/f1/{season}/driverstandings.json", timeout=30)
                resp.raise_for_status()
                lists = resp.json()["MRData"]["StandingsTable"]["StandingsLists"]
                top = lists[0]["DriverStandings"][0]["Driver"]
                cached[key] = {"given": top["givenName"], "family": top["familyName"]}
            except Exception as exc:
                print(f"  champion for {season} unavailable: {exc}")
                continue
        champ = cached[key]
        out.append({"season": season, "slug": driver_slug(champ["given"], champ["family"], None),
                    "name": f"{champ['given']} {champ['family']}", "era": era_for_season(season)["id"]})
    CHAMPIONS_PATH.write_text(json.dumps(cached, indent=1))
    return out


# ─── Teammates ───────────────────────────────────────────────────────────────

def quali_best_laps() -> pd.DataFrame:
    """Each driver's best selected qualifying lap per session (selection rules in ingest.py)."""
    rows = []
    for meta_path in sorted(RAW_DIR.glob("*/*_meta.json")):
        meta = json.loads(meta_path.read_text())
        laps_path = meta_path.parent / f"{meta['round']:02d}_Q_laps.csv.gz"
        if not laps_path.exists():
            continue
        drivers = meta["quali"].get("drivers", {})
        laps = pd.read_csv(laps_path)
        for drv, best in laps.groupby("driver_number").lap_duration.min().items():
            rows.append({"session_id": f"{meta['season']}-{meta['round']:02d}-Q",
                         "slug": drivers.get(str(int(drv)), {}).get("slug"), "best": best})
    return pd.DataFrame(rows, columns=["session_id", "slug", "best"])


def teammate_comparison(scores: pd.DataFrame, best: pd.DataFrame, slug: str, mate: str, era_id: str) -> dict:
    """Mean axis difference (driver minus teammate, in field-spread units) over shared sessions,
    plus the share of shared qualifying sessions where the driver's best lap was faster."""
    in_era = scores[scores.era == era_id]
    shared = in_era[in_era.slug == slug].merge(in_era[in_era.slug == mate], on=["session_id", "kind", "team"],
                                               suffixes=("", "_m"))
    diffs = {}
    for axis in QUALI_AXES + RACE_AXES:
        d = (shared[axis] - shared[f"{axis}_m"]).dropna()
        diffs[axis] = round(float(d.mean()), 3) if len(d) else None
    b = best[best.session_id.isin(shared.loc[shared.kind == "Q", "session_id"])]
    h2h = b[b.slug == slug].merge(b[b.slug == mate], on="session_id", suffixes=("", "_m"))
    return {
        "shared_quali": int(len(h2h)),
        "shared_races": int((shared.kind == "R").sum()),
        "quali_h2h_pct": round(100.0 * float((h2h.best < h2h.best_m).mean()), 1) if len(h2h) else None,
        "diffs": diffs,
    }


# ─── Driver-era aggregation ──────────────────────────────────────────────────

def weight_column(axis: str) -> str:
    return f"{axis}__w" if axis in RACE_AXES else f"{axis}__n"


def percentile_of(sorted_ref: np.ndarray, values: np.ndarray) -> np.ndarray:
    lo = np.searchsorted(sorted_ref, values, side="left")
    hi = np.searchsorted(sorted_ref, values, side="right")
    return 100.0 * (lo + hi) / 2.0 / len(sorted_ref)


def aggregate(scores: pd.DataFrame) -> dict:
    rng = np.random.default_rng(SEED)
    records: dict[tuple[str, str], dict] = {}

    for (slug, era_id), g in scores.groupby(["slug", "era"]):
        rec = {
            "slug": slug, "name": g["name"].dropna().iloc[-1], "era": era_id,
            "seasons": sorted(int(s) for s in g.season.unique()),
            "teams": dict(Counter(g.team.dropna())),
            "quali_sessions": int((g.kind == "Q").sum()), "race_sessions": int((g.kind == "R").sum()),
            "sample_size": int(g.laps.sum()), "axes": {}, "_session_values": {},
        }
        for axis in AXES:
            entry = {"score": None, "percentile": None, "p5": None, "p95": None, "sessions": 0, "samples": 0}
            if axis in QUALI_AXES or axis in RACE_AXES:
                kind = "Q" if axis in QUALI_AXES else "R"
                sg = g[(g.kind == kind) & g[axis].notna() & (g[weight_column(axis)] > 0)]
                n_samples = int(sg[f"{axis}__n"].sum())
                entry["sessions"], entry["samples"] = int(len(sg)), n_samples
                min_sessions, min_samples = ((MIN_QUALI_SESSIONS, MIN_QUALI_SAMPLES) if kind == "Q"
                                             else (MIN_RACE_SESSIONS, MIN_RACE_STINTS))
                if len(sg) >= min_sessions and n_samples >= min_samples:
                    v, w = sg[axis].to_numpy(float), sg[weight_column(axis)].to_numpy(float)
                    entry["score"] = float(np.average(v, weights=w))
                    rec["_session_values"][axis] = (v, w)
                raw_cols = (["d_brake_point_m", "d_min_speed_kmh", "d_release_speed_kmh", "d_to_full_throttle_m"]
                            if kind == "Q" else ["d_spread_s", "d_deg_s_per_lap", "residual_spread_s", "deg_slope_s_per_lap"])
                gk = g[g.kind == kind]
                entry["raw"] = {c: (round(float(gk[c].mean()), 3) if c in gk and gk[c].notna().any() else None)
                                for c in raw_cols}
            rec["axes"][axis] = entry
        records[(slug, era_id)] = rec

    # Percentiles and bootstrap confidence against the full set of driver-eras.
    for axis in AXES:
        scored = [r for r in records.values() if r["axes"][axis]["score"] is not None]
        if not scored:
            continue
        ref = np.sort([r["axes"][axis]["score"] for r in scored])
        n = len(ref)
        for r in scored:
            e = r["axes"][axis]
            rank = np.searchsorted(ref, e["score"], side="left") + 1
            e["percentile"] = int(round(100.0 * (rank - 0.5) / n))
            v, w = r["_session_values"][axis]
            idx = rng.integers(0, len(v), size=(BOOTSTRAP_N, len(v)))
            reps = (v[idx] * w[idx]).sum(axis=1) / w[idx].sum(axis=1)
            pct = percentile_of(ref, reps)
            e["p5"], e["p95"] = int(round(np.percentile(pct, 5))), int(round(np.percentile(pct, 95)))

    for r in records.values():
        widths = [(e["p95"] - e["p5"]) / 100.0 for e in r["axes"].values() if e["percentile"] is not None]
        r["confidence"] = round(float(np.clip(1.0 - np.mean(widths), 0.0, 1.0)), 2) if widths else None
        r["scored_axes"] = sum(e["percentile"] is not None for e in r["axes"].values())
        del r["_session_values"]

    # Comparison groups.
    def mean_polygon(members: list[tuple[dict, float]]) -> list[float | None]:
        poly = []
        for axis in AXES:
            vals = [(m["axes"][axis]["percentile"], w) for m, w in members if m["axes"][axis]["percentile"] is not None]
            poly.append(round(float(np.average([v for v, _ in vals], weights=[w for _, w in vals])), 1) if vals else None)
        return poly

    all_recs = list(records.values())
    era_polys = {era["id"]: mean_polygon([(r, 1.0) for r in all_recs if r["era"] == era["id"]]) for era in ERAS}
    all_time_poly = mean_polygon([(r, 1.0) for r in all_recs])

    champions = load_champions(sorted(int(s) for s in scores.season.unique()))
    champ_keys = {(c["slug"], c["era"]) for c in champions}
    champ_poly = mean_polygon([(records[k], 1.0) for k in champ_keys if k in records])

    shared: dict[tuple[str, str], Counter] = defaultdict(Counter)
    for (_, era_id, team), g in scores.groupby(["session_id", "era", "team"]):
        slugs = sorted(set(g.slug))
        for a in slugs:
            for b in slugs:
                if a != b:
                    shared[(a, era_id)][b] += 1

    best = quali_best_laps()
    for key, r in records.items():
        mates = [(records[(m, r["era"])], float(c)) for m, c in shared[key].items() if (m, r["era"]) in records]
        r["teammates"] = [{"slug": m["slug"], "name": m["name"], "shared_sessions": int(c),
                           **teammate_comparison(scores, best, r["slug"], m["slug"], r["era"])}
                          for m, c in sorted(mates, key=lambda mc: -mc[1])]
        r["cohorts"] = {
            "era": era_polys[r["era"]],
            "allTime": all_time_poly,
            "champions": champ_poly,
            "teammates": mean_polygon(mates) if mates else [None] * len(AXES),
        }

    eras_out = {}
    for era in ERAS:
        recs = [r for r in all_recs if r["era"] == era["id"]]
        eras_out[era["id"]] = {
            "label": era["label"],
            "seasons_covered": sorted({s for r in recs for s in r["seasons"]}),
            "driver_eras": len(recs),
            "scored_driver_eras": sum(r["scored_axes"] > 0 for r in recs),
        }

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "pipeline_version": PIPELINE_VERSION,
        "source": "OpenF1 historical API (official F1 live-timing feed)",
        "axes": AXES,
        "seasons": sorted(int(s) for s in scores.season.unique()),
        "sessions": {"quali": int(scores[scores.kind == "Q"].session_id.nunique()),
                     "race": int(scores[scores.kind == "R"].session_id.nunique())},
        "eras": eras_out,
        "champions": champions,
        "driver_eras": sorted(all_recs, key=lambda r: (r["era"], r["slug"])),
    }


def driver_coverage(result: dict) -> pd.DataFrame:
    rows = []
    for r in result["driver_eras"]:
        row = {"slug": r["slug"], "era": r["era"], "seasons": " ".join(map(str, r["seasons"])),
               "quali_sessions": r["quali_sessions"], "race_sessions": r["race_sessions"],
               "laps_used": r["sample_size"], "scored_axes": r["scored_axes"]}
        for axis in QUALI_AXES + RACE_AXES:
            e = r["axes"][axis]
            row[f"{axis} sessions"], row[f"{axis} samples"] = e["sessions"], e["samples"]
        rows.append(row)
    return pd.DataFrame(rows).sort_values(["era", "scored_axes", "slug"], ascending=[True, False, True])


def main() -> None:
    scores = build_session_scores()
    scores.to_csv(SESSION_SCORES_PATH, index=False)
    result = aggregate(scores)
    AGGREGATE_PATH.write_text(json.dumps(result, indent=1))
    coverage = driver_coverage(result)
    coverage.to_csv(DRIVER_COVERAGE_PATH, index=False)
    measurable = len(QUALI_AXES) + len(RACE_AXES)
    print(f"seasons {result['seasons']}  sessions {result['sessions']}")
    for era_id, e in result["eras"].items():
        if e["driver_eras"]:
            print(f"  era {era_id}: {e['scored_driver_eras']}/{e['driver_eras']} driver-eras scored, seasons {e['seasons_covered']}")
    partial = coverage[coverage.scored_axes < measurable]
    print(f"  {len(coverage) - len(partial)} driver-eras with all {measurable} measurable axes; partial or unscored:")
    for _, r in partial.iterrows():
        print(f"    {r.slug:18s} {r.era:10s} axes {r.scored_axes}/{measurable}  quali {r.quali_sessions}  "
              f"races {r.race_sessions}  laps {r.laps_used}")
    print(f"  champions: {[(c['season'], c['slug']) for c in result['champions']]}")
    print(f"wrote {AGGREGATE_PATH} and {DRIVER_COVERAGE_PATH}")


if __name__ == "__main__":
    main()
