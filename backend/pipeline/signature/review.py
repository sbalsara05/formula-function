"""Review gate: print signature output for a few drivers plus a teammate sanity check.

    python review.py --drivers leclerc verstappen norris --era 2022-2025

The sanity check compares each driver's qualifying head-to-head against a
teammate (share of shared sessions where their best lap was faster) with the
direction of their Braking and Entry Aggression difference to that teammate
over the same sessions. Pace and these two axes should usually agree.
"""

from __future__ import annotations

import argparse
import json

import pandas as pd

from aggregate import AGGREGATE_PATH, AXES, SESSION_SCORES_PATH, quali_best_laps

CHECK_AXES = ["Braking", "Entry Aggression"]


def fmt_axis(e: dict) -> str:
    if e["percentile"] is None:
        return f"{'pending' if e['sessions'] == 0 and e['samples'] == 0 else 'insufficient':>12}"
    return f"{e['percentile']:>3}  [{e['p5']:>3}-{e['p95']:<3}]"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--drivers", nargs="+", default=["leclerc", "verstappen", "norris"])
    parser.add_argument("--era", default="2022-2025")
    args = parser.parse_args()

    agg = json.loads(AGGREGATE_PATH.read_text())
    recs = {(r["slug"], r["era"]): r for r in agg["driver_eras"]}
    scores = pd.read_csv(SESSION_SCORES_PATH)
    scores = scores[(scores.kind == "Q") & (scores.era == args.era)]
    best = quali_best_laps()

    print(f"Source: {agg['source']}  seasons {agg['seasons']}  era {args.era}")
    era_poly = next((r["cohorts"]["era"] for r in agg["driver_eras"] if r["era"] == args.era), None)
    print(f"ERA AVG polygon: {dict(zip(AXES, era_poly))}" if era_poly else "")
    print(f"CHAMPIONS: {[c['slug'] + ' ' + str(c['season']) for c in agg['champions']]}")

    agreements, checks = 0, 0
    for slug in args.drivers:
        rec = recs.get((slug, args.era))
        print("\n" + "=" * 78)
        if rec is None:
            print(f"{slug}: no data for era {args.era}")
            continue
        print(f"{rec['name']}  ({rec['era']}, seasons {rec['seasons']}, teams {rec['teams']})")
        print(f"  sample: {rec['sample_size']} laps  quali sessions {rec['quali_sessions']}  "
              f"race sessions {rec['race_sessions']}  confidence {rec['confidence']}")
        print(f"  {'axis':22s} {'pct [p5-p95]':>16}  sessions  samples  vs ERA  vs TEAMMATES")
        for i, axis in enumerate(AXES):
            e = rec["axes"][axis]
            era_v, mate_v = rec["cohorts"]["era"][i], rec["cohorts"]["teammates"][i]
            print(f"  {axis:22s} {fmt_axis(e):>16}  {e['sessions']:>8}  {e['samples']:>7}  "
                  f"{'' if era_v is None else era_v:>6}  {'' if mate_v is None else mate_v:>6}")
        q_raw = rec["axes"]["Braking"].get("raw") or {}
        r_raw = rec["axes"]["Consistency"].get("raw") or {}
        print(f"  raw vs field (quali): brake point {q_raw.get('d_brake_point_m')} m later, "
              f"min speed {q_raw.get('d_min_speed_kmh')} km/h, release speed {q_raw.get('d_release_speed_kmh')} km/h, "
              f"apex-to-full-throttle {q_raw.get('d_to_full_throttle_m')} m")
        print(f"  raw vs field (race):  stint spread {r_raw.get('d_spread_s')} s, "
              f"degradation {r_raw.get('d_deg_s_per_lap')} s/lap")

        mine = scores[scores.slug == slug]
        for mate in rec["teammates"]:
            theirs = scores[scores.slug == mate["slug"]]
            shared = mine.merge(theirs, on=["session_id", "team"], suffixes=("", "_m"))
            if shared.empty:
                continue
            b = best[best.session_id.isin(shared.session_id)]
            h2h = b[b.slug == slug].merge(b[b.slug == mate["slug"]], on="session_id", suffixes=("", "_m"))
            if h2h.empty:
                continue
            h2h_pct = 100.0 * (h2h.best < h2h.best_m).mean()
            line = f"  vs {mate['name']:22s} shared quali {len(h2h):>3}  quali H2H {h2h_pct:5.1f}%"
            for axis in CHECK_AXES:
                diff = (shared[axis] - shared[f"{axis}_m"]).mean()
                agree = (diff > 0) == (h2h_pct > 50) if h2h_pct != 50 else None
                if agree is not None and len(h2h) >= 5:
                    checks += 1
                    agreements += bool(agree)
                line += f"  {axis} diff {diff:+.2f} ({'agrees' if agree else 'disagrees' if agree is not None else 'n/a'})"
            print(line)

    if checks:
        print(f"\nTeammate sanity check: {agreements}/{checks} axis directions agree with the quali head-to-head")


if __name__ == "__main__":
    main()
