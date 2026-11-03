"""Write the frontend datasets from data/aggregate.json and data/session_scores.csv.gz.

  frontend/src/data/generated/signatures.json         one DrivingSignature per driver-era (driver page)
  frontend/src/data/generated/signature-details.json  full metrics, era definitions and methodology (metrics page)

Only driver-eras with at least one scored axis are exported; the driver page
defaults to the most recent of them."""

from __future__ import annotations

import json
from pathlib import Path

import pandas as pd

from aggregate import (AGGREGATE_PATH, AXES, BOOTSTRAP_N, COHORT_KEYS, MIN_COMPOUND_STINTS, MIN_FIELD_LAPS_PER_CORNER,
                       MIN_QUALI_SAMPLES, MIN_QUALI_SESSIONS, MIN_RACE_SESSIONS, MIN_RACE_STINTS, QUALI_AXES,
                       RACE_AXES, SESSION_SCORES_PATH, Z_CLIP)
from corners import MIN_PROMINENCE_KMH
from eras import ERA_BY_ID, ERAS, era_span, seasons_label
from ingest import COVERAGE_PATH, QUALI_LAPS_PER_DRIVER, QUALI_PERSONAL_CUTOFF, QUALI_SESSION_CUTOFF
from metrics import (FUEL_EFFECT_S_PER_LAP, FULL_THROTTLE_PCT, MIN_GAP_AHEAD_S, MIN_LAPS_CONSISTENCY,
                     MIN_LAPS_DEGRADATION, STINT_PACE_CUTOFF, THROTTLE_LIFT_PCT)

REPO_ROOT = Path(__file__).resolve().parents[3]
GENERATED_DIR = REPO_ROOT / "frontend" / "src" / "data" / "generated"
OUTPUT_PATH = GENERATED_DIR / "signatures.json"
DETAILS_PATH = GENERATED_DIR / "signature-details.json"


def num(v, digits: int = 2) -> float | None:
    if v is None or pd.isna(v):
        return None
    return round(float(v), digits)


def era_info(era_id: str, seasons: list[int]) -> dict:
    era = ERA_BY_ID[era_id]
    info = {"id": era_id, "label": era["label"], "seasons": seasons_label(seasons),
            "span": era_span(era), "rules": era["rules"]}
    if era.get("caveat"):
        info["caveat"] = era["caveat"]
    return info


def to_signature(rec: dict) -> dict:
    axes = [{"label": axis, "value": rec["axes"][axis]["percentile"]} for axis in AXES]
    return {
        "driverId": rec["slug"],
        "series": "f1",
        "axes": axes,
        "cohortAverage": rec["cohorts"]["era"],
        "cohorts": {key: rec["cohorts"][key] for key in COHORT_KEYS},
        "uncertaintyEnvelope": [rec["axes"][axis]["p95"] for axis in AXES],
        "confidenceScore": rec["confidence"],
        "sampleSize": rec["sample_size"],
        "era": era_info(rec["era"], rec["seasons"]),
        "source": "timing",
    }


# ─── Full metrics ────────────────────────────────────────────────────────────

def methodology() -> dict:
    return {
        "quali": {
            "lapsPerDriver": QUALI_LAPS_PER_DRIVER,
            "personalCutoffPct": round((QUALI_PERSONAL_CUTOFF - 1) * 100, 1),
            "sessionCutoffPct": round(QUALI_SESSION_CUTOFF * 100),
            "minFieldLapsPerCorner": MIN_FIELD_LAPS_PER_CORNER,
            "cornerProminenceKmh": MIN_PROMINENCE_KMH,
            "fullThrottlePct": FULL_THROTTLE_PCT,
            "throttleLiftPct": THROTTLE_LIFT_PCT,
        },
        "race": {
            "minGapAheadS": MIN_GAP_AHEAD_S,
            "stintPaceCutoffPct": round(STINT_PACE_CUTOFF * 100),
            "fuelEffectSPerLap": FUEL_EFFECT_S_PER_LAP,
            "minLapsConsistency": MIN_LAPS_CONSISTENCY,
            "minLapsDegradation": MIN_LAPS_DEGRADATION,
            "minCompoundStints": MIN_COMPOUND_STINTS,
        },
        "scoring": {
            "zClip": Z_CLIP,
            "minQualiSessions": MIN_QUALI_SESSIONS, "minQualiSamples": MIN_QUALI_SAMPLES,
            "minRaceSessions": MIN_RACE_SESSIONS, "minRaceStints": MIN_RACE_STINTS,
            "bootstrapN": BOOTSTRAP_N,
        },
    }


def era_table(agg: dict) -> list[dict]:
    data_seasons = agg["seasons"]
    out = []
    for era in ERAS:
        e = agg["eras"].get(era["id"], {})
        covered = e.get("seasons_covered", [])
        last = era["end"] if era["end"] is not None else max(data_seasons)
        missing = [s for s in range(era["start"], last + 1) if s not in covered]
        out.append({
            **era_info(era["id"], covered),
            "seasonsCovered": covered, "seasonsMissing": missing,
            "driverEras": e.get("driver_eras", 0), "scoredDriverEras": e.get("scored_driver_eras", 0),
        })
    return out


def coverage_table() -> list[dict]:
    coverage = json.loads(COVERAGE_PATH.read_text())["seasons"]
    return [{
        "season": int(season), "weekends": c["weekends"], "pending": c.get("weekends_pending", 0),
        "qualiOk": c["quali_ok"], "raceOk": c["race_ok"],
        "skipped": [{"round": p["round"], "meeting": p["meeting"], "part": p["part"], "detail": p["detail"]}
                    for p in c["problems"]],
    } for season, c in sorted(coverage.items())]


def era_ranks(records: list[dict]) -> dict[tuple[str, str, str], tuple[int, int]]:
    ranks = {}
    for era in ERAS:
        recs = [r for r in records if r["era"] == era["id"]]
        for axis in AXES:
            scored = sorted((r for r in recs if r["axes"][axis]["score"] is not None),
                            key=lambda r: -r["axes"][axis]["score"])
            for i, r in enumerate(scored, start=1):
                ranks[(r["slug"], r["era"], axis)] = (i, len(scored))
    return ranks


def main_team(rec: dict) -> str | None:
    return max(rec["teams"].items(), key=lambda kv: kv[1])[0] if rec["teams"] else None


def weekend_rows(scores: pd.DataFrame, slug: str, era_id: str) -> list[dict]:
    g = scores[(scores.slug == slug) & (scores.era == era_id)]
    rows = []
    for (season, rnd), w in g.groupby(["season", "round"], sort=True):
        q, r = w[w.kind == "Q"], w[w.kind == "R"]
        values = {axis: (num(q[axis].iloc[0]) if len(q) else None) for axis in QUALI_AXES}
        values.update({axis: (num(r[axis].iloc[0]) if len(r) else None) for axis in RACE_AXES})
        rows.append({
            "season": int(season), "round": int(rnd),
            "circuit": None if pd.isna(w.circuit.iloc[0]) else w.circuit.iloc[0],
            "meeting": None if pd.isna(w.meeting.iloc[0]) else w.meeting.iloc[0],
            "team": w.team.dropna().iloc[0] if w.team.notna().any() else None,
            "qualiLaps": int(q.laps.iloc[0]) if len(q) else None,
            "raceLaps": int(r.laps.iloc[0]) if len(r) else None,
            "values": values,
        })
    return rows


QUALI_RAW = {"d_brake_point_m": "brakePointDeltaM", "d_min_speed_kmh": "minSpeedDeltaKmh",
             "d_release_speed_kmh": "releaseSpeedDeltaKmh", "d_to_full_throttle_m": "fullThrottleDeltaM"}
RACE_RAW = {"d_spread_s": "spreadDeltaS", "d_deg_s_per_lap": "degDeltaSPerLap",
            "residual_spread_s": "spreadS", "deg_slope_s_per_lap": "degSPerLap"}


def rename(raw: dict | None, names: dict) -> dict | None:
    return {new: raw.get(old) for old, new in names.items()} if raw else None


def to_detail(rec: dict, ranks: dict, scores: pd.DataFrame) -> dict:
    axes = {}
    for axis in AXES:
        e = rec["axes"][axis]
        rank = ranks.get((rec["slug"], rec["era"], axis))
        axes[axis] = {
            "percentile": e["percentile"], "p5": e["p5"], "p95": e["p95"], "score": num(e["score"], 3),
            "sessions": e["sessions"], "samples": e["samples"],
            "rank": rank[0] if rank else None, "rankOf": rank[1] if rank else None,
        }
    return {
        "era": era_info(rec["era"], rec["seasons"]),
        "seasons": rec["seasons"],
        "teams": rec["teams"],
        "qualiSessions": rec["quali_sessions"], "raceSessions": rec["race_sessions"],
        "sampleSize": rec["sample_size"], "confidence": rec["confidence"],
        "axes": axes,
        "raw": {"quali": rename(rec["axes"]["Braking"].get("raw"), QUALI_RAW),
                "race": rename(rec["axes"]["Consistency"].get("raw"), RACE_RAW)},
        "cohorts": rec["cohorts"],
        "teammates": [{
            "slug": t["slug"], "name": t["name"], "sharedSessions": t["shared_sessions"],
            "sharedQuali": t["shared_quali"], "sharedRaces": t["shared_races"],
            "qualiH2hPct": t["quali_h2h_pct"], "diffs": t["diffs"],
        } for t in rec["teammates"]],
        "weekends": weekend_rows(scores, rec["slug"], rec["era"]),
    }


def main() -> None:
    agg = json.loads(AGGREGATE_PATH.read_text())
    scores = pd.read_csv(SESSION_SCORES_PATH)
    era_order = {era["id"]: i for i, era in enumerate(ERAS)}
    exported = [r for r in agg["driver_eras"] if r["scored_axes"] > 0]
    ranks = era_ranks(exported)

    drivers: dict[str, dict] = {}
    details: dict[str, dict] = {}
    for rec in exported:
        d = drivers.setdefault(rec["slug"], {"name": rec["name"], "defaultEra": rec["era"], "signatures": {}})
        d["signatures"][rec["era"]] = to_signature(rec)
        if era_order[rec["era"]] > era_order[d["defaultEra"]]:
            d["defaultEra"], d["name"] = rec["era"], rec["name"]
        details.setdefault(rec["slug"], {"eras": {}})["eras"][rec["era"]] = to_detail(rec, ranks, scores)
    for slug, d in drivers.items():
        details[slug].update({"name": d["name"], "defaultEra": d["defaultEra"]})

    out = {
        "generatedAt": agg["generated_at"],
        "pipelineVersion": agg["pipeline_version"],
        "source": agg["source"],
        "seasons": agg["seasons"],
        "axes": AXES,
        "eras": [
            {"id": era_id, "label": e["label"], "span": era_span(ERA_BY_ID[era_id]),
             "seasons": seasons_label(e["seasons_covered"])}
            for era_id, e in agg["eras"].items() if e["scored_driver_eras"]
        ],
        "drivers": dict(sorted(drivers.items())),
    }
    detail_out = {
        "generatedAt": agg["generated_at"],
        "pipelineVersion": agg["pipeline_version"],
        "source": agg["source"],
        "seasons": agg["seasons"],
        "sessions": agg["sessions"],
        "axes": AXES,
        "axisGroups": {"quali": QUALI_AXES, "race": RACE_AXES},
        "eras": era_table(agg),
        "methodology": methodology(),
        "coverage": coverage_table(),
        "champions": [{"season": c["season"], "slug": c["slug"], "name": c["name"]} for c in agg["champions"]],
        "peers": {
            era["id"]: [{"slug": r["slug"], "name": r["name"], "team": main_team(r),
                         "values": [r["axes"][axis]["percentile"] for axis in AXES]}
                        for r in exported if r["era"] == era["id"]]
            for era in ERAS
        },
        "drivers": dict(sorted(details.items())),
    }

    GENERATED_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(out, indent=1, ensure_ascii=False, allow_nan=False) + "\n")
    DETAILS_PATH.write_text(json.dumps(detail_out, ensure_ascii=False, allow_nan=False, separators=(",", ":")) + "\n")
    print(f"wrote {len(drivers)} drivers to {OUTPUT_PATH}")
    print(f"wrote details ({DETAILS_PATH.stat().st_size // 1024} KB) to {DETAILS_PATH}")


if __name__ == "__main__":
    main()
