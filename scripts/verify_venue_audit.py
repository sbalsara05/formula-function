#!/usr/bin/env python3
"""Validate venue audit coverage and consistency contracts."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VENUES = ROOT / "frontend" / "src" / "data" / "mock" / "venues.ts"
AUDIT = ROOT / "scripts" / "venue_audit_output.json"
WEATHER = ROOT / "scripts" / "venue_weather_classifications.json"
FPS = ROOT / "scripts" / "venue_fingerprint_rubrics.json"
PAGE = ROOT / "frontend" / "src" / "app" / "f" / "[series]" / "venue" / "[slug]" / "page.tsx"

SLUGS = [
    "spa", "monaco", "monza", "silverstone", "suzuka", "interlagos", "bahrain",
    "abu-dhabi", "jeddah", "melbourne", "shanghai", "miami", "imola", "montreal",
    "barcelona", "hungaroring", "zandvoort", "baku", "singapore", "cota",
    "mexico", "las-vegas", "qatar",
]


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    audit = json.loads(AUDIT.read_text()) if AUDIT.exists() else {}
    weather = json.loads(WEATHER.read_text()) if WEATHER.exists() else {}
    fps = json.loads(FPS.read_text()) if FPS.exists() else {}
    venues_ts = VENUES.read_text()
    page_ts = PAGE.read_text()

    circuits = audit.get("circuits", {})
    for slug in SLUGS:
        if slug not in circuits:
            errors.append(f"audit missing circuit: {slug}")
            continue
        c = circuits[slug]
        if c.get("raceCount", 0) < 1:
            errors.append(f"{slug}: raceCount < 1")
        log = c.get("log") or {}
        if log.get("races_fetched") != log.get("races_total"):
            errors.append(f"{slug}: races fetched != total ({log})")
        fit = c.get("driverFit") or []
        if len(fit) < 1:
            errors.append(f"{slug}: empty driverFit")
        for d in fit:
            for k in ("fitScore", "wins", "poles", "podiums", "starts"):
                if k not in d:
                    errors.append(f"{slug}: fit row missing {k}")

    for slug in SLUGS:
        if slug not in weather or "percentages" not in weather.get(slug, {}):
            errors.append(f"weather missing: {slug}")
            continue
        w = weather[slug]
        pct = w["percentages"]
        if pct["dryPct"] + pct["mixedPct"] + pct["wetPct"] != 100:
            errors.append(f"{slug}: weather pct sum != 100 ({pct})")
        counts = w["counts"]
        if counts["dry"] + counts["mixed"] + counts["wet"] != w["totalRaces"]:
            errors.append(f"{slug}: weather counts != totalRaces")

    for slug in SLUGS:
        if slug not in fps.get("venues", {}):
            errors.append(f"fingerprint rubric missing: {slug}")
            continue
        bars = fps["venues"][slug].get("bars") or []
        if len(bars) != 6:
            errors.append(f"{slug}: expected 6 fingerprint bars, got {len(bars)}")
        if any(b["label"] == "Driver Bravery" for b in bars):
            errors.append(f"{slug}: still uses Driver Bravery label")

    if "Driver Bravery" in venues_ts:
        errors.append("venues.ts still contains Driver Bravery")
    if "accounts for car strength" in venues_ts or "accounts for car strength" in page_ts:
        errors.append("car-strength claim still present in UI/data")

    # Registry aliases for 23 browse venues
    for slug in SLUGS:
        # page registry uses bare keys or quoted kebab-case
        if not re.search(rf"(^|\n)\s+('{re.escape(slug)}'|\"{re.escape(slug)}\"|{re.escape(slug)}):", page_ts):
            errors.append(f"page.tsx missing registry slug {slug}")

    print("Venue verification")
    print(f"  audit circuits: {len(circuits)}")
    print(f"  weather entries: {sum(1 for s in SLUGS if s in weather)}")
    print(f"  fingerprint entries: {len(fps.get('venues', {}))}")
    if errors:
        print(f"  FAIL ({len(errors)}):")
        for e in errors:
            print(f"    - {e}")
        return 1
    print("  OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
