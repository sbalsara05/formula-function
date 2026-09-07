#!/usr/bin/env python3
"""
Classify venue race weather from Wikipedia race articles (keyword rubric).

Writes/updates scripts/venue_weather_classifications.json entries for each circuit.
Uses Jolpica race lists from scripts/venue_audit_cache/<circuitId>.json.

Usage:
  python3 scripts/classify_venue_weather.py
  python3 scripts/classify_venue_weather.py --only spa,monaco
"""

from __future__ import annotations

import argparse
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CACHE_DIR = ROOT / "scripts" / "venue_audit_cache"
OUT = ROOT / "scripts" / "venue_weather_classifications.json"
UA = {"User-Agent": "formula-function-weather-audit/1.0 (research; local)"}
DELAY = 1.0

# browse slug → jolpica circuitId (same as audit_venue_data.py)
CIRCUIT_MAP = {
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
    "singapore": "singapore",  # note: jolpica marina_bay — fix below
    "cota": "americas",
    "mexico": "rodriguez",
    "las-vegas": "las_vegas",
    "qatar": "losail",
}
CIRCUIT_MAP["singapore"] = "marina_bay"

# Strong wet signals
WET_PATTERNS = [
    r"\bmonsoon\b",
    r"\btorrential\b",
    r"\bdeluge\b",
    r"\btyphoon\b",
    r"\babandoned\b.{0,40}\brain\b",
    r"\brain\b.{0,40}\babandoned\b",
    r"\bred.?flagg?ed\b.{0,60}\brain\b",
    r"\bheavy rain\b",
    r"\bsevere rain\b",
    r"\bwet throughout\b",
    r"\brentlessly wet\b",
    r"\bsopping\b",
]

MIXED_PATTERNS = [
    r"\brain\b",
    r"\bwet\b",
    r"\bdamp\b",
    r"\bshower\b",
    r"\bdrizzle\b",
    r"\bdrying\b",
    r"\bintermediate(?:s)?\b",
    r"\bwets?\b",
    r"\bwet.?weather\b",
    r"\bchangeable\b",
    r"\bmixed conditions\b",
    r"\brain.?affected\b",
    r"\brain.?delayed\b",
    r"\bsafety car\b.{0,40}\brain\b",
]

# Manual overrides (authoritative curated rows) — never overwrite if present for slug
# Spa is fully curated in OUT already.


def wiki_extract(title: str) -> str:
    params = urllib.parse.urlencode({
        "action": "query",
        "prop": "extracts",
        "explaintext": 1,
        "exintro": 0,
        "titles": title,
        "format": "json",
        "redirects": 1,
    })
    url = f"https://en.wikipedia.org/w/api.php?{params}"
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=45) as resp:
        data = json.loads(resp.read().decode())
    pages = data.get("query", {}).get("pages", {})
    for page in pages.values():
        if page.get("missing") is not None:
            return ""
        return page.get("extract") or ""
    return ""


def classify_text(text: str) -> str:
    low = text.lower()
    # Focus on race-day paragraphs when possible
    race_idx = low.find("race")
    window = low[max(0, race_idx) : max(0, race_idx) + 12000] if race_idx >= 0 else low[:16000]
    for pat in WET_PATTERNS:
        if re.search(pat, window):
            return "WET"
    hits = 0
    for pat in MIXED_PATTERNS:
        if re.search(pat, window):
            hits += 1
    if hits >= 2 or re.search(r"\brain\b", window):
        # Single rain mention still MIXED if clearly race weather
        if re.search(r"\brain\b|\bwet (?:race|track|conditions)\b|\bdamp\b|\bshower", window):
            return "MIXED"
    return "DRY"


def pcts(dry: int, mixed: int, wet: int) -> tuple[int, int, int]:
    total = dry + mixed + wet
    if total == 0:
        return 0, 0, 0
    # Largest remainder method so integers sum to 100
    raw = [(dry / total) * 100, (mixed / total) * 100, (wet / total) * 100]
    floors = [int(x) for x in raw]
    rem = 100 - sum(floors)
    order = sorted(range(3), key=lambda i: raw[i] - floors[i], reverse=True)
    for i in order[:rem]:
        floors[i] += 1
    return floors[0], floors[1], floors[2]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", help="Comma-separated browse slugs")
    parser.add_argument("--force", action="store_true", help="Reclassify even curated entries")
    args = parser.parse_args()

    existing = {}
    if OUT.exists():
        existing = json.loads(OUT.read_text())

    slugs = list(CIRCUIT_MAP)
    if args.only:
        slugs = [s.strip() for s in args.only.split(",") if s.strip()]

    method = existing.get("method") or (
        "Per-race Wikipedia extract keyword rubric. "
        "DRY = no meaningful rain effect; MIXED = rain affected part of race / changing; "
        "WET = primarily rain or rain red-flag/abandon. Percentages via largest-remainder to sum 100."
    )
    out = {
        "method": method,
        "dataThrough": existing.get("dataThrough", time.strftime("%Y-%m-%d")),
    }
    # preserve spa curated unless --force
    if "spa" in existing and "spa" not in slugs:
        out["spa"] = existing["spa"]

    for slug in slugs:
        cid = CIRCUIT_MAP[slug]
        if slug == "spa" and "spa" in existing and not args.force:
            out["spa"] = existing["spa"]
            print(f"=== {slug}: keep curated ===")
            continue

        cache_path = CACHE_DIR / f"{cid}.json"
        if not cache_path.exists():
            print(f"=== {slug}: no cache {cid}, skip ===")
            if slug in existing:
                out[slug] = existing[slug]
            continue

        payload = json.loads(cache_path.read_text())
        races = payload["races"]
        print(f"=== {slug} ({cid}) races={len(races)} ===")
        classified: dict[str, list[int]] = {"DRY": [], "MIXED": [], "WET": []}
        year_notes: dict[str, str] = {}
        for r in races:
            year = int(r["season"])
            name = r.get("raceName") or "Grand Prix"
            title = f"{year} {name}"
            try:
                extract = wiki_extract(title)
            except Exception as e:
                print(f"  ! {title}: {e}")
                extract = ""
            time.sleep(DELAY)
            if not extract:
                # fallback: assume DRY but flag
                label = "DRY"
                year_notes[str(year)] = f"No Wikipedia extract for '{title}' — default DRY"
            else:
                label = classify_text(extract)
                year_notes[str(year)] = f"Wikipedia '{title}' → {label}"
            classified[label].append(year)
            print(f"  {year}: {label}")

        dry, mixed, wet = len(classified["DRY"]), len(classified["MIXED"]), len(classified["WET"])
        dry_pct, mixed_pct, wet_pct = pcts(dry, mixed, wet)
        out[slug] = {
            "circuitId": cid,
            "totalRaces": len(races),
            "wetYears": classified["WET"],
            "mixedYears": classified["MIXED"],
            "dryYears": classified["DRY"],
            "counts": {"dry": dry, "mixed": mixed, "wet": wet},
            "percentages": {"dryPct": dry_pct, "mixedPct": mixed_pct, "wetPct": wet_pct},
            "sources": ["https://en.wikipedia.org/w/api.php (race article extracts)", "keyword rubric in classify_venue_weather.py"],
            "yearNotes": year_notes,
        }

    # Keep any other curated keys not in this run
    for k, v in existing.items():
        if k in ("method", "dataThrough"):
            continue
        if k not in out:
            out[k] = v

    OUT.write_text(json.dumps(out, indent=2))
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
