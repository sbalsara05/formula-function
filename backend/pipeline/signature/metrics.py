"""Raw per-lap corner measurements (qualifying) and per-stint measurements (race).

Inputs are the normalised files written by ingest.py, so this module can be
re-run offline (`python metrics.py`) after a definition change without
re-downloading anything.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import numpy as np
import pandas as pd

from corners import build_reference_line, detect_corners, project_lap, speed_distance

DATA_DIR = Path(__file__).resolve().parent / "data"
RAW_DIR = DATA_DIR / "raw"
METRICS_DIR = DATA_DIR / "metrics"

FULL_THROTTLE_PCT = 98.0
THROTTLE_LIFT_PCT = 10.0
MIN_BRAKE_RUN_SAMPLES = 2
MIN_BRAKE_DROP_KMH = 15.0

DRY_COMPOUNDS = {"SOFT", "MEDIUM", "HARD"}
FUEL_EFFECT_S_PER_LAP = 0.055
MIN_GAP_AHEAD_S = 1.5
STINT_PACE_CUTOFF = 1.07
MIN_LAPS_CONSISTENCY = 6
MIN_LAPS_DEGRADATION = 8

STINT_COLUMNS = [
    "driver_number", "stint", "compound", "n_clean", "first_lap", "last_lap",
    "mean_corrected_s", "residual_spread_s", "deg_slope_s_per_lap",
]
CORNER_COLUMNS = [
    "apex_s", "min_speed", "braked", "brake_on_s", "brake_off_s",
    "brake_release_speed", "brake_len_m", "apex_to_full_throttle_m", "throttle_lifts",
]


# ─── Qualifying corners ──────────────────────────────────────────────────────

def measure_lap_corners(s: np.ndarray, speed: np.ndarray, throttle: np.ndarray,
                        brake: np.ndarray, corners) -> list[dict]:
    n = len(s)
    sample_idx = np.arange(n)
    rows = []
    for c in corners:
        row = {"corner": c.index, **{k: np.nan for k in CORNER_COLUMNS}}
        row["braked"] = False
        in_apex = np.flatnonzero((s >= c.apex_s - c.apex_half_width) & (s <= c.apex_s + c.apex_half_width))
        if len(in_apex) == 0:
            rows.append(row)
            continue
        ai = int(in_apex[np.argmin(speed[in_apex])])
        row["apex_s"] = float(s[ai])
        row["min_speed"] = float(speed[ai])

        # Main braking application before the apex: the brake-on run with the
        # largest speed drop whose onset lies inside the corner window.
        window = np.flatnonzero((s >= c.window_start) & (sample_idx <= ai))
        best = None
        if len(window) >= 2:
            for j in range(int(window[0]) + 1, ai + 1):
                if not (brake[j] and not brake[j - 1]):
                    continue
                r = j
                while r < n and brake[r]:
                    r += 1
                drop = float(speed[j - 1] - speed[j:min(r + 1, n)].min())
                if (r - j) >= MIN_BRAKE_RUN_SAMPLES or drop >= MIN_BRAKE_DROP_KMH:
                    if best is None or drop > best[2]:
                        best = (j, r, drop)
        if best is not None:
            j, r, _ = best
            row["braked"] = True
            row["brake_on_s"] = float(0.5 * (s[j - 1] + s[j]))
            if r < n:
                row["brake_off_s"] = float(0.5 * (s[r - 1] + s[r]))
                row["brake_release_speed"] = float(0.5 * (speed[r - 1] + speed[r]))
                row["brake_len_m"] = row["brake_off_s"] - row["brake_on_s"]

        after = np.flatnonzero((sample_idx >= ai) & (s <= c.window_end))
        full = after[throttle[after] >= FULL_THROTTLE_PCT]
        if len(full):
            k = int(full[0])
            row["apex_to_full_throttle_m"] = max(0.0, float(s[k] - s[ai]))
            row["throttle_lifts"] = int((np.diff(throttle[ai:k + 1]) <= -THROTTLE_LIFT_PCT).sum())
        rows.append(row)
    return rows


def quali_corner_metrics(laps: pd.DataFrame, tel: pd.DataFrame,
                         corner_labels: list[dict] | None) -> tuple[pd.DataFrame, list[dict], dict]:
    """Measure every selected qualifying lap at every corner of the session."""
    ref_row = laps.sort_values("lap_duration").iloc[0]
    ref_tel = tel[(tel.driver_number == ref_row.driver_number) & (tel.lap_number == ref_row.lap_number)].sort_values("t")
    ref = build_reference_line(ref_tel.x.to_numpy(), ref_tel.y.to_numpy())

    ref_s, _ = project_lap(ref, ref_tel.t.to_numpy(), ref_tel.speed.to_numpy(),
                           ref_tel.x.to_numpy(), ref_tel.y.to_numpy())
    corners = detect_corners(ref_s, ref_tel.speed.to_numpy(), ref, corner_labels)

    rows = []
    offsets = []
    for lap in laps.itertuples(index=False):
        lt = tel[(tel.driver_number == lap.driver_number) & (tel.lap_number == lap.lap_number)].sort_values("t")
        if len(lt) < 20:
            continue
        s, off = project_lap(ref, lt.t.to_numpy(), lt.speed.to_numpy(), lt.x.to_numpy(), lt.y.to_numpy())
        offsets.append(np.nanmedian(off))
        for r in measure_lap_corners(s, lt.speed.to_numpy(float), lt.throttle.to_numpy(float),
                                     lt.brake.to_numpy() > 0, corners):
            rows.append({"driver_number": int(lap.driver_number), "lap_number": int(lap.lap_number), **r})

    info = {
        "reference": {
            "driver_number": int(ref_row.driver_number),
            "lap_number": int(ref_row.lap_number),
            "lap_duration": float(ref_row.lap_duration),
            "length_m": round(ref.length, 1),
            "speed_distance_m": round(float(speed_distance(ref_tel.t.to_numpy(float), ref_tel.speed.to_numpy(float))[-1]), 1),
        },
        "median_lateral_offset_m": round(float(np.nanmedian(offsets)), 2) if offsets else None,
    }
    return pd.DataFrame(rows), [c.to_dict() for c in corners], info


# ─── Race stints ─────────────────────────────────────────────────────────────

def clean_race_laps(race_laps: pd.DataFrame) -> pd.DataFrame:
    gap_ok = race_laps.gap_ahead.isna() | (race_laps.gap_ahead >= MIN_GAP_AHEAD_S)
    clean = race_laps[
        (race_laps.lap_number >= 2)
        & ~race_laps.pit_out & ~race_laps.in_lap & ~race_laps.neutralised & ~race_laps.yellow
        & race_laps.compound.isin(DRY_COMPOUNDS)
        & race_laps.lap_duration.notna() & race_laps.stint.notna()
        & gap_ok
    ].copy()
    stint_median = clean.groupby(["driver_number", "stint"]).lap_duration.transform("median")
    return clean[clean.lap_duration <= STINT_PACE_CUTOFF * stint_median]


def race_stint_metrics(race_laps: pd.DataFrame, total_laps: int) -> pd.DataFrame:
    clean = clean_race_laps(race_laps)
    clean["corrected"] = clean.lap_duration - FUEL_EFFECT_S_PER_LAP * (total_laps - clean.lap_number)

    rows = []
    for (drv, stint), g in clean.groupby(["driver_number", "stint"]):
        n = len(g)
        row = {
            "driver_number": int(drv), "stint": int(stint), "compound": g.compound.iloc[0],
            "n_clean": n, "first_lap": int(g.lap_number.min()), "last_lap": int(g.lap_number.max()),
            "mean_corrected_s": float(g.corrected.mean()),
            "residual_spread_s": np.nan, "deg_slope_s_per_lap": np.nan,
        }
        if n >= MIN_LAPS_CONSISTENCY and g.tyre_age.nunique() >= 3:
            slope, intercept = np.polyfit(g.tyre_age.to_numpy(float), g.corrected.to_numpy(float), 1)
            resid = g.corrected.to_numpy(float) - (slope * g.tyre_age.to_numpy(float) + intercept)
            row["residual_spread_s"] = float(1.4826 * np.median(np.abs(resid - np.median(resid))))
            if n >= MIN_LAPS_DEGRADATION:
                row["deg_slope_s_per_lap"] = float(slope)
        rows.append(row)
    return pd.DataFrame(rows, columns=STINT_COLUMNS)


# ─── Offline recompute ───────────────────────────────────────────────────────

def compute_session_metrics(season: int, rnd: int) -> dict:
    """Recompute metrics for one weekend from its stored raw inputs."""
    raw = RAW_DIR / str(season)
    out = METRICS_DIR / str(season)
    out.mkdir(parents=True, exist_ok=True)
    meta_path = raw / f"{rnd:02d}_meta.json"
    meta = json.loads(meta_path.read_text())
    summary: dict = {}

    q_laps_path, q_tel_path = raw / f"{rnd:02d}_Q_laps.csv.gz", raw / f"{rnd:02d}_Q_telemetry.csv.gz"
    if q_laps_path.exists() and q_tel_path.exists():
        laps, tel = pd.read_csv(q_laps_path), pd.read_csv(q_tel_path)
        if laps.driver_number.nunique() >= 10:
            corners_df, corners, info = quali_corner_metrics(laps, tel, meta.get("corner_labels"))
            corners_df.to_csv(out / f"{rnd:02d}_Q_corners.csv.gz", index=False)
            (out / f"{rnd:02d}_Q_corners.json").write_text(json.dumps({"corners": corners, **info}, indent=1))
            summary["quali"] = {"laps": int(laps.shape[0]), "corners": len(corners), "rows": int(corners_df.shape[0])}
        else:
            summary["quali"] = {"skipped": f"only {laps.driver_number.nunique()} drivers with usable laps"}

    r_laps_path = raw / f"{rnd:02d}_R_laps.csv.gz"
    if r_laps_path.exists():
        race_laps = pd.read_csv(r_laps_path)
        for col in ("pit_out", "in_lap", "neutralised", "yellow"):
            race_laps[col] = race_laps[col].astype(bool)
        stints = race_stint_metrics(race_laps, int(meta["race"]["total_laps"]))
        stints.to_csv(out / f"{rnd:02d}_R_stints.csv.gz", index=False)
        summary["race"] = {"stints": int(stints.shape[0]),
                           "clean_laps": int(stints.n_clean.sum()) if len(stints) else 0}
    return summary


def main() -> None:
    parser = argparse.ArgumentParser(description="Recompute metrics from stored raw inputs (offline).")
    parser.add_argument("--season", type=int, action="append", help="limit to these seasons")
    args = parser.parse_args()
    for meta_path in sorted(RAW_DIR.glob("*/*_meta.json")):
        season = int(meta_path.parent.name)
        if args.season and season not in args.season:
            continue
        rnd = int(meta_path.name.split("_")[0])
        print(season, rnd, compute_session_metrics(season, rnd), flush=True)


if __name__ == "__main__":
    main()
