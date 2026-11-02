#!/usr/bin/env python3
"""
Current-driver F1 career stats from Jolpica (Ergast-compatible API).

Writes:
  scripts/driver_audit_cache/<jolpicaId>.json   raw paginated responses
  scripts/driver_stats_audit.json              computed stats, before/after, fetch counts

Usage:
  python3 scripts/audit_driver_stats.py                 # fetch (cached) + compare
  python3 scripts/audit_driver_stats.py --only norris   # subset (site driverId)
  python3 scripts/audit_driver_stats.py --force         # refetch
  python3 scripts/audit_driver_stats.py --apply         # write values into drivers.ts

Definitions:
  racesEntered  rows in the driver's race results (Grands Prix started or classified as entrants)
  wins/podiums  race finishing position 1 / ≤3 (sprints excluded)
  poles         started the Grand Prix from grid slot 1 — reproduces F1's official totals (e.g.
                Hamilton 104, Verstappen 40, Leclerc 26 at end-2024). Jolpica's qualifying/1 filter
                also returns non-P1 rows, and fastest-qualifier counts disagree after grid penalties.
                Exception: 2022 sprint weekends credit the qualifying winner.
  fastestLaps   FastestLap rank 1 — Jolpica only records this from 2004
  pointsScored  race points + sprint points
  titles        seasons finished P1 in the drivers' standings (current season excluded; fetched
                per season — Jolpica rejects standings queries without a season)
"""

from __future__ import annotations

import argparse
import json
import re
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / "scripts" / "driver_audit_cache"
OUT = ROOT / "scripts" / "driver_stats_audit.json"
DRIVERS_TS = ROOT / "frontend" / "src" / "data" / "mock" / "drivers.ts"

JOLPICA = "https://api.jolpi.ca/ergast/f1"
UA = {"User-Agent": "formula-function-driver-audit/1.0 (research; local)"}
DELAY = 4.0
FASTEST_LAP_DATA_FROM = 2004

# site driverId -> (DriverStats const in drivers.ts, Jolpica driverId)
DRIVERS: dict[str, tuple[str, str]] = {
    "hamilton": ("hamiltonStats", "hamilton"),
    "verstappen": ("verstappenStats", "max_verstappen"),
    "leclerc": ("leclerStats", "leclerc"),
    "norris": ("norrisStats", "norris"),
    "piastri": ("piastriF1Stats", "piastri"),
    "russell": ("russellF1Stats", "russell"),
    "antonelli": ("antonelliStats", "antonelli"),
    "alonso": ("alonsoStats", "alonso"),
    "stroll": ("strollStats", "stroll"),
    "gasly": ("gaslyStats", "gasly"),
    "colapinto": ("colapintoStats", "colapinto"),
    "albon": ("albonStats", "albon"),
    "sainz": ("sainzStats", "sainz"),
    "bearman": ("bearmanF1Stats", "bearman"),
    "ocon": ("oconStats", "ocon"),
    "hulkenberg": ("hulkenbergStats", "hulkenberg"),
    "bortoleto": ("bortoletoF1Stats", "bortoleto"),
    "tsunoda": ("tsunodaStats", "tsunoda"),
    "hadjar": ("hadjarStats", "hadjar"),
    "lawson": ("lawsonStats", "lawson"),
    "perez": ("perezStats", "perez"),
    "bottas": ("bottasStats", "bottas"),
    "lindblad": ("lindbladStats", "arvid_lindblad"),
}

# In 2022 the sprint set the Grand Prix grid but pole went to the Friday qualifying winner
# (e.g. Magnussen, Brazil 2022, while Russell started first).
QUALI_POLE_SPRINT_SEASONS = {"2022"}

# Fastest laps Jolpica cannot see (before FASTEST_LAP_DATA_FROM): site driverId -> (count, source)
PRE_2004_FASTEST_LAPS: dict[str, tuple[int, str]] = {
    "alonso": (1, "2003 Canadian GP — https://gpracingstats.com/drivers/fernando-alonso/fastest-laps/"),
}

FIELDS = ["titles", "wins", "poles", "podiums", "careerSpan", "racesEntered", "fastestLaps", "pointsScored"]


def get_json(path: str, retries: int = 8) -> dict:
    url = f"{JOLPICA}{path}"
    last: Exception | None = None
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                return json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            last = e
            if 400 <= e.code < 500 and e.code != 429:
                break
            wait = 30 + attempt * 15 if e.code == 429 else DELAY * (2 ** attempt)
            print(f"  ! HTTP {e.code} {path} — wait {wait:.0f}s")
            time.sleep(wait)
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(DELAY * (attempt + 1))
    raise RuntimeError(f"Failed {path}: {last}")


def paginate(path: str, table: str, key: str) -> tuple[list[dict], int]:
    """Collect every row of MRData[table][key]; one request per 100 rows."""
    rows: list[dict] = []
    offset, total = 0, 0
    while True:
        data = get_json(f"{path}?limit=100&offset={offset}")
        time.sleep(DELAY)
        mr = data["MRData"]
        total = int(mr["total"])
        batch = mr.get(table, {}).get(key, [])
        rows.extend(batch)
        offset += int(mr["limit"])
        print(f"    {path}: {min(offset, total)}/{total}")
        if not batch or offset >= total:
            break
    return rows, total


def fetch(jid: str, force: bool) -> dict:
    CACHE.mkdir(parents=True, exist_ok=True)
    fp = CACHE / f"{jid}.json"
    if fp.exists() and not force:
        return json.loads(fp.read_text())
    print(f"  fetching {jid}")
    results, results_total = paginate(f"/drivers/{jid}/results.json", "RaceTable", "Races")
    poles, poles_total = paginate(f"/drivers/{jid}/qualifying/1.json", "RaceTable", "Races")
    sprints, sprints_total = paginate(f"/drivers/{jid}/sprint.json", "RaceTable", "Races")
    payload = {
        "results": results, "poles": poles, "sprints": sprints,
        "counts": {
            "results": [len(results), results_total], "poles": [len(poles), poles_total],
            "sprints": [len(sprints), sprints_total],
        },
    }
    for name, (got, total) in payload["counts"].items():
        if got != total:
            raise RuntimeError(f"{jid} {name}: fetched {got} of {total}")
    fp.write_text(json.dumps(payload, ensure_ascii=False))
    return payload


def fetch_champions(seasons: range, force: bool) -> dict[int, str]:
    """Season -> champion Jolpica driverId from each season's final standings (one call per season)."""
    fp = CACHE / "_champions.json"
    champs = {} if force or not fp.exists() else {int(k): v for k, v in json.loads(fp.read_text()).items()}
    for season in seasons:
        if season in champs:
            continue
        lists = get_json(f"/{season}/driverStandings/1.json")["MRData"]["StandingsTable"]["StandingsLists"]
        time.sleep(DELAY)
        champs[season] = lists[0]["DriverStandings"][0]["Driver"]["driverId"]
        print(f"    {season} champion: {champs[season]}")
    CACHE.mkdir(parents=True, exist_ok=True)
    fp.write_text(json.dumps(champs, indent=0))
    return champs


def compute(p: dict, sid: str, jid: str, champions: dict[int, str], current_season: int, last_race: str) -> dict:
    res = [r for race in p["results"] for r in race["Results"]]
    seasons = sorted({int(race["season"]) for race in p["results"]})
    first_season = seasons[0]
    pts = sum(float(r["points"]) for r in res)
    pts += sum(float(r["points"]) for race in p["sprints"] for r in race["SprintResults"])
    titles = sorted(s for s, d in champions.items() if d == jid and s != current_season)
    active = current_season in seasons
    early_fl, early_fl_source = PRE_2004_FASTEST_LAPS.get(sid, (0, None))
    quali_p1 = {(r["season"], r["round"]) for r in p["poles"] if r["QualifyingResults"][0]["position"] == "1"}
    quali_set_pole = {(r["season"], r["round"]) for r in p["sprints"] if r["season"] in QUALI_POLE_SPRINT_SEASONS}
    poles = sum(
        (key in quali_p1) if key in quali_set_pole else race["Results"][0]["grid"] == "1"
        for race in p["results"]
        for key in [(race["season"], race["round"])]
    )
    return {
        "titles": len(titles),
        "wins": sum(r["position"] == "1" for r in res),
        "poles": poles,
        "podiums": sum(r["position"] in ("1", "2", "3") for r in res),
        "careerSpan": f"{first_season}–present" if active else f"{first_season}–{seasons[-1]}",
        "racesEntered": len(res),
        "fastestLaps": early_fl + sum(r.get("FastestLap", {}).get("rank") == "1" for r in res),
        "pointsScored": int(pts) if pts == int(pts) else round(pts, 1),
        "_titleSeasons": titles,
        "_fastestLapIncomplete": first_season < FASTEST_LAP_DATA_FROM and early_fl_source is None,
        "_fastestLapPre2004Source": early_fl_source,
        "_dataThrough": last_race,
    }


def stats_block(text: str, const: str) -> re.Match:
    m = re.search(rf"export const {re.escape(const)}: DriverStats = \{{[^}}]*\}}", text)
    if not m:
        raise RuntimeError(f"{const} not found in drivers.ts")
    return m


def read_current(block: str) -> dict:
    out = {}
    for f in FIELDS:
        m = re.search(rf'\b{f}\s*:\s*("([^"]*)"|[\d.]+)', block)
        if m:
            out[f] = m.group(2) if m.group(2) is not None else float(m.group(1)) if "." in m.group(1) else int(m.group(1))
    return out


def set_field(block: str, field: str, value) -> str:
    rendered = f'"{value}"' if isinstance(value, str) else str(value)
    new, n = re.subn(rf'(\b{field}\s*:\s*)("[^"]*"|[\d.]+)', lambda m: m.group(1) + rendered, block, count=1)
    if n != 1:
        raise RuntimeError(f"field {field} missing in block")
    return new


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--only")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--apply", action="store_true")
    args = ap.parse_args()

    ids = [s.strip() for s in args.only.split(",")] if args.only else list(DRIVERS)
    last = get_json("/current/last/results.json")["MRData"]["RaceTable"]
    time.sleep(DELAY)
    current_season = int(last["season"])
    race = last["Races"][0]
    last_race = f"{race['season']} round {race['round']} · {race['raceName']} · {race['date']}"
    print(f"Data through {last_race}")

    text = DRIVERS_TS.read_text()
    report = json.loads(OUT.read_text()) if OUT.exists() else {}
    report["dataThrough"] = last_race
    report.setdefault("drivers", {})

    payloads = {sid: fetch(DRIVERS[sid][1], args.force) for sid in ids}
    first = min(int(race["season"]) for p in payloads.values() for race in p["results"])
    champions = fetch_champions(range(first, current_season), args.force)
    for sid in ids:
        const, jid = DRIVERS[sid]
        computed = compute(payloads[sid], sid, jid, champions, current_season, last_race)
        m = stats_block(text, const)
        before = read_current(m.group(0))
        report["drivers"][sid] = {"const": const, "jolpicaId": jid, "before": before, "after": computed}
        diffs = [f"{f} {before.get(f)}→{computed[f]}" for f in FIELDS if before.get(f) != computed[f]]
        print(f"{sid:<11} " + ("; ".join(diffs) if diffs else "no change"))
        if args.apply:
            block = m.group(0)
            for f in FIELDS:
                if f == "fastestLaps" and computed["_fastestLapIncomplete"]:
                    continue
                block = set_field(block, f, computed[f])
            text = text[: m.start()] + block + text[m.end():]

    OUT.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n")
    if args.apply:
        DRIVERS_TS.write_text(text)
        print(f"Wrote {DRIVERS_TS}")


if __name__ == "__main__":
    main()
