#!/usr/bin/env python3
"""
Apply audited driver-fit (+ optional weather) into frontend/src/data/mock/venues.ts.

Reads:
  scripts/venue_audit_output.json
  scripts/venue_weather_classifications.json (optional)

Usage:
  python3 scripts/apply_venue_audit.py
  python3 scripts/apply_venue_audit.py --weather
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VENUES = ROOT / "frontend" / "src" / "data" / "mock" / "venues.ts"
AUDIT = ROOT / "scripts" / "venue_audit_output.json"
WEATHER = ROOT / "scripts" / "venue_weather_classifications.json"
FINGERPRINTS = ROOT / "scripts" / "venue_fingerprint_rubrics.json"

# browse slug → exported const prefix in venues.ts
SLUG_CONST = {
    "spa": "spa",
    "monaco": "monaco",
    "monza": "monza",
    "silverstone": "silverstone",
    "suzuka": "suzuka",
    "interlagos": "interlagos",
    "bahrain": "bahrain",
    "abu-dhabi": "abuDhabi",
    "jeddah": "jeddah",
    "melbourne": "melbourne",
    "shanghai": "shanghai",
    "miami": "miami",
    "imola": "imola",
    "montreal": "montreal",
    "barcelona": "barcelona",
    "hungaroring": "hungaroring",
    "zandvoort": "zandvoort",
    "baku": "baku",
    "singapore": "singapore",
    "cota": "cota",
    "mexico": "mexico",
    "las-vegas": "lasVegas",
    "qatar": "qatar",
}

# Map Jolpica driverIds → app driver ids used elsewhere
DRIVER_ID_MAP = {
    "michael_schumacher": "schumacher",
    "max_verstappen": "verstappen",
    "kevin_magnussen": "magnussen",
}


def fit_block(venue_id: str, rows: list[dict]) -> str:
    lines = [
        f"export const {SLUG_CONST[venue_id] if False else ''}DriverFit: DriverTrackFit[] = [",
    ]
    # fixed below
    return ""


def render_fit(const_name: str, venue_key: str, rows: list[dict]) -> str:
    out = [f"export const {const_name}DriverFit: DriverTrackFit[] = ["]
    out.append("  // Jolpica circuit results/qualifying · scripts/audit_venue_data.py")
    for r in rows:
        did = DRIVER_ID_MAP.get(r["driverId"], r["driverId"])
        out.append(
            "  { "
            f'venueId: "{venue_key}", '
            f'driverId: "{did}", '
            f'driverName: "{r["driverName"]}", '
            f'fitScore: {r["fitScore"]}, '
            f'wins: {r["wins"]}, '
            f'poles: {r["poles"]}, '
            f'podiums: {r["podiums"]}, '
            f'starts: {r["starts"]} '
            "},"
        )
    out.append("];")
    return "\n".join(out)


def replace_const_array(text: str, const_name: str, new_block: str) -> str:
    # Match export const fooDriverFit: DriverTrackFit[] = [ ... ];
    pat = re.compile(
        rf"export const {re.escape(const_name)}DriverFit: DriverTrackFit\[] = \[[\s\S]*?\n\];",
        re.M,
    )
    if not pat.search(text):
        raise RuntimeError(f"Could not find {const_name}DriverFit")
    return pat.sub(new_block, text, count=1)


def replace_weather(text: str, const_name: str, venue_key: str, w: dict, venue_label: str) -> str:
    pct = w["percentages"]
    counts = w["counts"]
    # Chaotic list is wet/mixed only — never invent a "chaotic" dry calendar entry.
    chaotic = []
    for y in sorted(w.get("wetYears", []), reverse=True)[:2]:
        chaotic.append((y, "WET"))
    for y in sorted(w.get("mixedYears", []), reverse=True):
        if len(chaotic) >= 3:
            break
        chaotic.append((y, "MIXED"))

    chaotic_lines = []
    for y, t in chaotic:
        note = (w.get("yearNotes") or {}).get(str(y), f"{t.lower()} race")
        # shorten note for UI
        label = note.split("—")[0].split("→")[0].strip()
        if len(label) > 48:
            label = label[:45] + "…"
        label = label.replace('"', '\\"')
        chaotic_lines.append(f'    {{ year: {y}, label: "{label}", type: "{t}" }},')
    chaotic_body = ("\n" + "\n".join(chaotic_lines) + "\n") if chaotic_lines else "\n"

    block = f'''export const {const_name}Weather: VenueWeather = {{
  venueId: "{venue_key}",
  dryPct: {pct["dryPct"]},
  mixedPct: {pct["mixedPct"]},
  wetPct: {pct["wetPct"]},
  totalRaces: {w["totalRaces"]},
  description:
    "Historical race-day conditions across {w["totalRaces"]} World Championship races at this circuit. Classified dry / mixed / wet from race reports.",
  circuitNote:
    "{venue_label} — {counts["dry"]} dry / {counts["mixed"]} mixed / {counts["wet"]} wet of {w["totalRaces"]} races.",
  chaoticRaces: [{chaotic_body}],
}};'''

    pat = re.compile(
        rf"export const {re.escape(const_name)}Weather: VenueWeather = \{{[\s\S]*?\n\}};",
        re.M,
    )
    # abu-dhabi uses abuDhabiWeather but also abadhabiStats typo elsewhere — weather is abuDhabiWeather
    if not pat.search(text):
        raise RuntimeError(f"Could not find {const_name}Weather")
    return pat.sub(block, text, count=1)


# venueId field inside bundles (abu-dhabi → abudhabi id etc.)
VENUE_ID_FIELD = {
    "spa": "spa",
    "monaco": "monaco",
    "monza": "monza",
    "silverstone": "silverstone",
    "suzuka": "suzuka",
    "interlagos": "interlagos",
    "bahrain": "bahrain",
    "abu-dhabi": "abu-dhabi",
    "jeddah": "jeddah",
    "melbourne": "melbourne",
    "shanghai": "shanghai",
    "miami": "miami",
    "imola": "imola",
    "montreal": "montreal",
    "barcelona": "barcelona",
    "hungaroring": "hungaroring",
    "zandvoort": "zandvoort",
    "baku": "baku",
    "singapore": "singapore",
    "cota": "cota",
    "mexico": "mexico",
    "las-vegas": "las-vegas",
    "qatar": "qatar",
}


def render_fingerprint(const_name: str, venue_key: str, fp: dict) -> str:
    lines = [
        f"export const {const_name}Fingerprint: VenueFingerprint = {{",
        f'  venueId: "{venue_key}",',
    ]
    desc = fp.get("description")
    if desc:
        safe = desc.replace('"', '\\"')
        lines.append(f'  description: "{safe}",')
    lines.append("  bars: [")
    for b in fp["bars"]:
        lines.append(
            "    { "
            f'label: "{b["label"]}", '
            f'rating: "{b["rating"]}", '
            f'value: {b["value"]}, '
            f'caption: "{b["caption"]}" '
            "},"
        )
    lines.append("  ],")
    lines.append("};")
    return "\n".join(lines)


def replace_fingerprint(text: str, const_name: str, new_block: str) -> str:
    pat = re.compile(
        rf"export const {re.escape(const_name)}Fingerprint: VenueFingerprint = \{{[\s\S]*?\n\}};",
        re.M,
    )
    if not pat.search(text):
        raise RuntimeError(f"Could not find {const_name}Fingerprint")
    return pat.sub(new_block, text, count=1)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--weather", action="store_true")
    parser.add_argument("--fingerprints", action="store_true")
    parser.add_argument("--only", help="Comma-separated browse slugs")
    args = parser.parse_args()

    audit = json.loads(AUDIT.read_text()) if AUDIT.exists() else {"circuits": {}}
    weather = json.loads(WEATHER.read_text()) if args.weather and WEATHER.exists() else {}
    fps = json.loads(FINGERPRINTS.read_text()) if args.fingerprints and FINGERPRINTS.exists() else {}
    text = VENUES.read_text()

    slugs = list(SLUG_CONST)
    if args.only:
        slugs = [s.strip() for s in args.only.split(",") if s.strip()]

    for slug in slugs:
        const = SLUG_CONST[slug]
        vid = VENUE_ID_FIELD[slug]

        if slug in audit.get("circuits", {}):
            block = render_fit(const, vid, audit["circuits"][slug]["driverFit"])
            text = replace_const_array(text, const, block)
            print(f"updated {const}DriverFit")
        else:
            print(f"skip fit {slug}: not in audit output")

        if args.fingerprints and slug in fps.get("venues", {}):
            text = replace_fingerprint(text, const, render_fingerprint(const, vid, fps["venues"][slug]))
            print(f"updated {const}Fingerprint")

        if args.weather and slug in weather and isinstance(weather[slug], dict) and "percentages" in weather[slug]:
            # resolve venue display name loosely
            m = re.search(rf'export const {re.escape(const if const != "abuDhabi" else "abudhabi")}: Venue = \{{[\s\S]*?name: "([^"]+)"', text)
            if const == "abuDhabi":
                m = re.search(r'export const abudhabi: Venue = \{[\s\S]*?name: "([^"]+)"', text)
            label = m.group(1) if m else slug
            text = replace_weather(text, const, vid, weather[slug], label)
            print(f"updated {const}Weather")

    VENUES.write_text(text)
    print(f"Wrote {VENUES}")


if __name__ == "__main__":
    main()
