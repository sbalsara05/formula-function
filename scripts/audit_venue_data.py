#!/usr/bin/env python3
"""
Venue accuracy audit — Jolpica circuit stats + reproducible driver-fit scores.

Writes:
  scripts/venue_audit_cache/<circuitId>.json
  scripts/venue_audit_output.json
  DATA_AUDIT_VENUES.md

Usage:
  python3 scripts/audit_venue_data.py
  python3 scripts/audit_venue_data.py --only spa,monaco
  python3 scripts/audit_venue_data.py --force
"""

from __future__ import annotations

import argparse
import json
import time
import urllib.error
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CACHE_DIR = ROOT / "scripts" / "venue_audit_cache"
OUT_JSON = ROOT / "scripts" / "venue_audit_output.json"
OUT_MD = ROOT / "DATA_AUDIT_VENUES.md"

JOLPICA = "https://api.jolpi.ca/ergast/f1"
UA = {"User-Agent": "formula-function-venue-audit/1.0 (research; local)"}
DELAY = 2.0

CIRCUIT_MAP: dict[str, str] = {
    "spa": "spa",
    "monaco": "monaco",
    "monza": "monza",
    "silverstone": "silverstone",
    "suzuka": "suzuka",
    "interlagos": "interlagos",
    "bahrain": "bahrain",
    "abu-dhabi": "yas_marina",
    "jeddah": "jeddah",
    "melbourne": "albert_park",
    "shanghai": "shanghai",
    "miami": "miami",
    "imola": "imola",
    "montreal": "villeneuve",
    "barcelona": "catalunya",
    "hungaroring": "hungaroring",
    "zandvoort": "zandvoort",
    "baku": "baku",
    "singapore": "marina_bay",
    "cota": "americas",
    "mexico": "rodriguez",
    "las-vegas": "las_vegas",
    "qatar": "losail",
}

W_WIN = 25
W_PODIUM = 8
W_POLE = 10
PRIOR_STRENGTH = 4.0
MIN_STARTS = 3


def get_json(path: str, retries: int = 12) -> dict:
    url = f"{JOLPICA}{path}"
    last_err: Exception | None = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=60) as resp:
                return json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            last_err = e
            if e.code == 429:
                wait = 20 + attempt * 10
            else:
                wait = max(DELAY * (2 ** attempt), DELAY)
            print(f"  ! HTTP {e.code} {path} — wait {wait:.1f}s")
            time.sleep(wait)
        except Exception as e:
            last_err = e
            time.sleep(DELAY * (attempt + 1))
    raise RuntimeError(f"Failed {path}: {last_err}")


def paginate_races(path: str) -> tuple[list[dict], int]:
    """Paginate RaceTable. Offset advances by Result/QualifyingResult rows, else by races."""
    offset = 0
    limit = 100
    races: list[dict] = []
    total = 0
    while True:
        sep = "&" if "?" in path else "?"
        data = get_json(f"{path}{sep}limit={limit}&offset={offset}")
        time.sleep(DELAY)
        mr = data["MRData"]
        total = int(mr["total"])
        batch = mr.get("RaceTable", {}).get("Races", [])
        if not batch:
            break
        races.extend(batch)
        n_rows = 0
        for race in batch:
            n_rows += len(race.get("Results", []))
            n_rows += len(race.get("QualifyingResults", []))
        offset += n_rows if n_rows else len(batch)
        print(f"    {path}: {min(offset, total)}/{total}")
        if offset >= total:
            break
    return races, total


def fetch_results_per_race(races_list: list[dict]) -> tuple[list[dict], int]:
    out: list[dict] = []
    rows = 0
    for r in races_list:
        season, rnd = r["season"], r["round"]
        path = f"/{season}/{rnd}/results.json?limit=100"
        data = get_json(path)
        time.sleep(max(DELAY, 3.0))
        batch = data["MRData"].get("RaceTable", {}).get("Races", [])
        out.extend(batch)
        for race in batch:
            rows += len(race.get("Results", []))
        print(f"    per-race results {season}/{rnd}: rows={rows}")
    return out, rows


def fetch_qual_per_race(races_list: list[dict]) -> tuple[list[dict], int]:
    out: list[dict] = []
    rows = 0
    for r in races_list:
        season, rnd = r["season"], r["round"]
        path = f"/{season}/{rnd}/qualifying.json?limit=100"
        try:
            data = get_json(path)
        except RuntimeError:
            print(f"    per-race qual {season}/{rnd}: missing")
            time.sleep(DELAY)
            continue
        time.sleep(max(DELAY, 3.0))
        batch = data["MRData"].get("RaceTable", {}).get("Races", [])
        out.extend(batch)
        for race in batch:
            rows += len(race.get("QualifyingResults", []))
        print(f"    per-race qual {season}/{rnd}: rows={rows}")
    return out, rows


def load_or_fetch(circuit_id: str, force: bool = False) -> dict:
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_path = CACHE_DIR / f"{circuit_id}.json"
    if cache_path.exists() and not force:
        print(f"  cache hit {circuit_id}")
        return json.loads(cache_path.read_text())

    print(f"  fetching {circuit_id}…")
    races_list, race_total = paginate_races(f"/circuits/{circuit_id}/races.json")
    wins, win_total = paginate_races(f"/circuits/{circuit_id}/results/1.json")
    p2, p2_total = paginate_races(f"/circuits/{circuit_id}/results/2.json")
    p3, p3_total = paginate_races(f"/circuits/{circuit_id}/results/3.json")

    try:
        all_results, results_total = paginate_races(f"/circuits/{circuit_id}/results.json")
    except RuntimeError as e:
        print(f"  ! bulk results failed ({e}); falling back to per-race fetch")
        all_results, results_total = fetch_results_per_race(races_list)

    try:
        all_qual, qual_total = paginate_races(f"/circuits/{circuit_id}/qualifying.json")
    except RuntimeError as e:
        print(f"  ! bulk qualifying failed ({e}); falling back to per-race fetch")
        all_qual, qual_total = fetch_qual_per_race(races_list)

    starts: dict[str, int] = defaultdict(int)
    names: dict[str, str] = {}
    grid_poles: dict[tuple[int, int], dict] = {}
    for race in all_results:
        season, rnd = int(race["season"]), int(race["round"])
        for res in race.get("Results", []):
            d = res["Driver"]
            did = d["driverId"]
            starts[did] += 1
            names[did] = f"{d['givenName']} {d['familyName']}"
            if str(res.get("grid")) == "1" and (season, rnd) not in grid_poles:
                grid_poles[(season, rnd)] = {
                    "season": season,
                    "round": rnd,
                    "driverId": did,
                    "name": names[did],
                    "source": "grid",
                }

    qual_poles: dict[tuple[int, int], dict] = {}
    for race in all_qual:
        season, rnd = int(race["season"]), int(race["round"])
        for q in race.get("QualifyingResults", []):
            if str(q.get("position")) == "1":
                d = q["Driver"]
                did = d["driverId"]
                names[did] = f"{d['givenName']} {d['familyName']}"
                qual_poles[(season, rnd)] = {
                    "season": season,
                    "round": rnd,
                    "driverId": did,
                    "name": names[did],
                    "source": "qualifying",
                }
                break

    # Prefer official qualifying pole; fall back to grid=1 for pre-qualifying eras / gaps
    merged_poles: list[dict] = []
    keys = set(grid_poles) | set(qual_poles)
    for key in sorted(keys):
        merged_poles.append(qual_poles.get(key) or grid_poles[key])

    payload = {
        "circuitId": circuit_id,
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
        "raceTotal": race_total,
        "races": [
            {"season": int(r["season"]), "round": int(r["round"]), "raceName": r["raceName"]}
            for r in races_list
        ],
        "wins": [
            {
                "season": int(r["season"]),
                "driverId": r["Results"][0]["Driver"]["driverId"],
                "name": f"{r['Results'][0]['Driver']['givenName']} {r['Results'][0]['Driver']['familyName']}",
            }
            for r in wins if r.get("Results")
        ],
        "p2": [
            {
                "season": int(r["season"]),
                "driverId": r["Results"][0]["Driver"]["driverId"],
                "name": f"{r['Results'][0]['Driver']['givenName']} {r['Results'][0]['Driver']['familyName']}",
            }
            for r in p2 if r.get("Results")
        ],
        "p3": [
            {
                "season": int(r["season"]),
                "driverId": r["Results"][0]["Driver"]["driverId"],
                "name": f"{r['Results'][0]['Driver']['givenName']} {r['Results'][0]['Driver']['familyName']}",
            }
            for r in p3 if r.get("Results")
        ],
        "poles": merged_poles,
        "starts": dict(starts),
        "names": names,
        "log": {
            "races_fetched": len(races_list),
            "races_total": race_total,
            "wins_fetched": len(wins),
            "wins_total": win_total,
            "p2_fetched": len(p2),
            "p2_total": p2_total,
            "p3_fetched": len(p3),
            "p3_total": p3_total,
            "results_rows_fetched": results_total,
            "qual_rows_fetched": qual_total,
            "poles_merged": len(merged_poles),
            "poles_from_qualifying": sum(1 for p in merged_poles if p["source"] == "qualifying"),
            "poles_from_grid": sum(1 for p in merged_poles if p["source"] == "grid"),
        },
    }
    cache_path.write_text(json.dumps(payload, indent=2))
    print(f"  wrote {cache_path} poles={len(merged_poles)}")
    return payload


def aggregate(payload: dict) -> dict[str, dict]:
    stats: dict[str, dict] = {}

    def ensure(did: str, name: str = "") -> dict:
        if did not in stats:
            stats[did] = {
                "driverId": did,
                "driverName": name or payload["names"].get(did, did),
                "wins": 0,
                "podiums": 0,
                "poles": 0,
                "starts": int(payload["starts"].get(did, 0)),
            }
        elif name:
            stats[did]["driverName"] = name
        return stats[did]

    for row in payload["wins"]:
        s = ensure(row["driverId"], row["name"])
        s["wins"] += 1
        s["podiums"] += 1
    for row in payload["p2"]:
        ensure(row["driverId"], row["name"])["podiums"] += 1
    for row in payload["p3"]:
        ensure(row["driverId"], row["name"])["podiums"] += 1
    for row in payload["poles"]:
        ensure(row["driverId"], row["name"])["poles"] += 1
    for did, n in payload["starts"].items():
        ensure(did)["starts"] = int(n)
    return stats


def raw_rate(s: dict) -> float:
    return (s["wins"] * W_WIN + s["podiums"] * W_PODIUM + s["poles"] * W_POLE) / max(s["starts"], 1)


def compute_fit(stats: dict[str, dict], top_n: int = 5) -> list[dict]:
    eligible = [s for s in stats.values() if s["starts"] >= MIN_STARTS or s["wins"] >= 2]
    if not eligible:
        eligible = list(stats.values())
    rates = [raw_rate(s) for s in eligible]
    mean_rate = sum(rates) / len(rates) if rates else 0.0
    scored = []
    for s in eligible:
        r = raw_rate(s)
        n = max(s["starts"], 1)
        shrunk = (r * n + mean_rate * PRIOR_STRENGTH) / (n + PRIOR_STRENGTH)
        scored.append({**s, "rate": r, "shrunk": shrunk})
    scored.sort(key=lambda x: (-x["shrunk"], -x["wins"], -x["podiums"], -x["poles"]))
    if not scored:
        return []
    top = scored[0]["shrunk"] or 1.0
    out = []
    for s in scored[:top_n]:
        fit = max(50, min(99, int(round(50 + 48 * (s["shrunk"] / top)))))
        out.append({
            "driverId": s["driverId"],
            "driverName": s["driverName"],
            "fitScore": fit,
            "wins": s["wins"],
            "poles": s["poles"],
            "podiums": s["podiums"],
            "starts": s["starts"],
            "rate": round(s["rate"], 3),
            "shrunk": round(s["shrunk"], 3),
        })
    return out


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", help="Comma-separated browse slugs")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    slugs = list(CIRCUIT_MAP)
    if args.only:
        slugs = [s.strip() for s in args.only.split(",") if s.strip()]

    output = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "formula": {
            "points": f"{W_WIN}*wins + {W_PODIUM}*podiums + {W_POLE}*poles",
            "rate": "points / starts",
            "shrinkage": f"(rate*starts + mean*{PRIOR_STRENGTH}) / (starts + {PRIOR_STRENGTH})",
            "eligibility": f"starts >= {MIN_STARTS} OR wins >= 2",
            "poles": "Qualifying P1 when Jolpica has qualifying; else race grid=1",
            "note": "Not car-strength adjusted.",
        },
        "circuits": {},
    }

    for slug in slugs:
        cid = CIRCUIT_MAP[slug]
        print(f"\n=== {slug} ({cid}) ===")
        payload = load_or_fetch(cid, force=args.force)
        stats = aggregate(payload)
        fit = compute_fit(stats)
        output["circuits"][slug] = {
            "circuitId": cid,
            "raceCount": payload["raceTotal"],
            "log": payload["log"],
            "driverFit": fit,
            "topWins": sorted(
                [
                    {
                        "driverId": s["driverId"],
                        "driverName": s["driverName"],
                        "wins": s["wins"],
                        "poles": s["poles"],
                        "podiums": s["podiums"],
                        "starts": s["starts"],
                    }
                    for s in stats.values() if s["wins"] > 0
                ],
                key=lambda x: -x["wins"],
            )[:15],
        }
        print(f"  races={payload['raceTotal']} fit={[d['driverName']+':'+str(d['fitScore']) for d in fit]}")

    OUT_JSON.write_text(json.dumps(output, indent=2))
    lines = [
        "# Venue Data Audit",
        "",
        f"Generated: `{output['generatedAt']}`",
        "",
        "## Driver-fit formula",
        "",
        f"- Points: `{output['formula']['points']}`",
        f"- Rate: `{output['formula']['rate']}`",
        f"- Shrinkage: `{output['formula']['shrinkage']}`",
        f"- Eligibility: `{output['formula']['eligibility']}`",
        f"- Poles: {output['formula']['poles']}",
        f"- Note: {output['formula']['note']}",
        "",
    ]
    for slug, data in output["circuits"].items():
        lines += [
            f"## {slug}",
            "",
            f"- Jolpica circuitId: `{data['circuitId']}`",
            f"- WC races at circuit: **{data['raceCount']}**",
            f"- Poles merged: {data['log'].get('poles_merged')} "
            f"(qual {data['log'].get('poles_from_qualifying')}, grid {data['log'].get('poles_from_grid')})",
            "",
            "| Driver | Fit | Wins | Poles | Podiums | Starts |",
            "|--------|-----|------|-------|---------|--------|",
        ]
        for d in data["driverFit"]:
            lines.append(
                f"| {d['driverName']} | {d['fitScore']} | {d['wins']} | {d['poles']} | {d['podiums']} | {d['starts']} |"
            )
        lines.append("")
    OUT_MD.write_text("\n".join(lines))
    print(f"\nWrote {OUT_JSON}")
    print(f"Wrote {OUT_MD}")


if __name__ == "__main__":
    main()
