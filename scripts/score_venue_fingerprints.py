#!/usr/bin/env python3
"""
Score the six venue track-fingerprint bars from sourced 2025 inputs.

Reads  scripts/venue_fingerprint_inputs.json  (raw Pirelli / Brembo / full-throttle figures + copy)
Writes scripts/venue_fingerprint_rubrics.json (bars applied to venues.ts by apply_venue_audit.py)
       scripts/venue_sources.json             (<slug>.fingerprintRubric: value, rating, basis, sources)

Usage:
  python3 scripts/score_venue_fingerprints.py --show spa,monaco,monza   # before/after, writes nothing
  python3 scripts/score_venue_fingerprints.py --write                   # write both JSON files
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INPUTS = ROOT / "scripts" / "venue_fingerprint_inputs.json"
RUBRICS = ROOT / "scripts" / "venue_fingerprint_rubrics.json"
SOURCES = ROOT / "scripts" / "venue_sources.json"

FD_URL = "https://www.formuladream.app/blog/how-much-of-an-f1-lap-is-flat-out"
LABELS = ["Engine Power", "Aero Efficiency", "Mechanical Grip", "Braking Stability",
          "Tyre Degradation", "High-speed commitment"]

# Pirelli and Brembo both rate 1-5; the same map keeps the two scales comparable.
SCALE5 = {1: 22, 2: 40, 3: 58, 4: 76, 5: 92}
HARDEST_COMPOUND_ADJ = {"C1": 4, "C2": 2, "C3": 0, "C4": -3}

RUBRIC_TEXT = (
    "Each bar is a 0-100 index built from sourced 2025 figures, the same formula at every venue. "
    "Engine Power: 65% share of the fastest 2025 qualifying lap at full throttle by time "
    "(Formula Dream, FastF1 telemetry) + 35% top speed. "
    "Aero Efficiency: Pirelli downforce rating; low-downforce tracks score on drag efficiency instead "
    "(full-throttle share and top speed) when that is higher. "
    "Mechanical Grip: Pirelli traction rating, raised when Pirelli rates asphalt grip low. "
    "Braking Stability: Brembo 2025 difficulty index, adjusted by Pirelli's braking rating. "
    "Tyre Degradation: Pirelli tyre-stress rating, adjusted by asphalt abrasion and the hardest compound nominated. "
    "High-speed commitment: Pirelli lateral-load rating (fast corners), adjusted by full-throttle share; "
    "walls and runoff are not scored. "
    "Bands: LOW 0-39, MODERATE 40-64, HIGH 65-84, CRITICAL 85-94, EXTREME 95-100."
)


def clamp(v: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, v))


def band(v: int) -> str:
    if v >= 95:
        return "EXTREME"
    if v >= 85:
        return "CRITICAL"
    if v >= 65:
        return "HIGH"
    if v >= 40:
        return "MODERATE"
    return "LOW"


def fmt_pct(p: float) -> str:
    return f"{p:.1f}%".replace(".0%", "%")


def score(v: dict) -> dict[str, dict]:
    p, b, ft = v["pirelli"], v["brembo"], v["fullThrottle"]
    pct, vmax = ft["pctTime"], ft["topSpeedKmh"]
    hardest = p["compounds"].split("/")[0]

    ft_score = 15 + (pct - 44) * (80 / 33)
    vmax_score = 15 + (vmax - 289) * (80 / 62)
    engine = 0.65 * ft_score + 0.35 * vmax_score

    aero = SCALE5[p["downforce"]]
    low_drag = None
    if p["downforce"] <= 2:
        low_drag = 40 + (pct - 55) * 1.6 + (vmax - 320) * 0.3
        aero = max(aero, low_drag)

    mech = SCALE5[p["traction"]] - 5 * (p["asphaltGrip"] - 3)
    brake = SCALE5[b["index"]] + 3 * (p["braking"] - 3)
    tyre = SCALE5[p["tyreStress"]] + 3 * (p["abrasion"] - 3) + HARDEST_COMPOUND_ADJ.get(hardest, 0)
    hsc = SCALE5[p["lateral"]] + clamp(0.3 * (pct - 60), -5, 5)

    ft_src = FD_URL if ft["source"] == "formuladream" else ft["source"]
    raw = {
        "Engine Power": (engine,
            f"{fmt_pct(pct)} of the lap at full throttle by time; {vmax} km/h top speed"
            + (f" ({ft['note']})" if ft.get("note") else ""), [ft_src]),
        "Aero Efficiency": (aero,
            f"Pirelli downforce {p['downforce']}/5"
            + (f"; scored on drag efficiency ({fmt_pct(pct)} full throttle, {vmax} km/h)" if low_drag and low_drag >= SCALE5[p['downforce']] else ""),
            [p["source"]] + ([ft_src] if low_drag and low_drag >= SCALE5[p['downforce']] else [])),
        "Mechanical Grip": (mech,
            f"Pirelli traction {p['traction']}/5, asphalt grip {p['asphaltGrip']}/5", [p["source"]]),
        "Braking Stability": (brake,
            f"Brembo 2025 index {b['index']}/5 ({b['note']}); Pirelli braking {p['braking']}/5",
            [b["source"], p["source"]]),
        "Tyre Degradation": (tyre,
            f"Pirelli tyre stress {p['tyreStress']}/5, abrasion {p['abrasion']}/5; compounds {p['compounds']}",
            [p["source"]]),
        "High-speed commitment": (hsc,
            f"Pirelli lateral load {p['lateral']}/5; {fmt_pct(pct)} full throttle", [p["source"], ft_src]),
    }
    out = {}
    for label, (val, basis, srcs) in raw.items():
        value = int(round(clamp(val, 8, 99)))
        out[label] = {"value": value, "rating": band(value), "basis": basis, "sources": srcs}
    return out


def default_caption(label: str, v: dict) -> str:
    p, b, ft = v["pirelli"], v["brembo"], v["fullThrottle"]
    return {
        "Engine Power": f"{fmt_pct(ft['pctTime'])} flat · {ft['topSpeedKmh']} km/h",
        "Aero Efficiency": f"Pirelli downforce {p['downforce']}/5",
        "Mechanical Grip": f"Pirelli traction {p['traction']}/5",
        "Braking Stability": f"Brembo {b['index']}/5",
        "Tyre Degradation": f"Pirelli stress {p['tyreStress']}/5 · {p['compounds']}",
        "High-speed commitment": f"Pirelli lateral {p['lateral']}/5",
    }[label]


def build(inputs: dict) -> dict[str, dict]:
    venues = {}
    for slug, v in inputs["venues"].items():
        scored = score(v)
        copy = inputs.get("copy", {}).get(slug, {})
        caps = copy.get("captions", {})
        bars = [{
            "label": label,
            "rating": scored[label]["rating"],
            "value": scored[label]["value"],
            "caption": caps.get(label, default_caption(label, v)),
        } for label in LABELS]
        venues[slug] = {"scored": scored, "bars": bars, "description": copy.get("description")}
    return venues


def show(slugs: list[str], built: dict, current: dict) -> None:
    for slug in slugs:
        cur = {b["label"]: b for b in current["venues"][slug]["bars"]}
        print(f"\n=== {slug}")
        print(f"  description BEFORE: {current['venues'][slug].get('description')}")
        print(f"  description AFTER:  {built[slug]['description'] or '(unchanged)'}")
        for bar in built[slug]["bars"]:
            c = cur[bar["label"]]
            print(f"  {bar['label']:<22} {c['rating']:>8} {c['value']:>3} {c['caption']!r:<36} -> "
                  f"{bar['rating']:>8} {bar['value']:>3} {bar['caption']!r}")
            print(f"  {'':<22} basis: {built[slug]['scored'][bar['label']]['basis']}")


def write(built: dict, current: dict) -> None:
    current["rubric"] = RUBRIC_TEXT
    current["dataThrough"] = "2025 season (Pirelli, Brembo, FastF1 qualifying telemetry)"
    current["inputs"] = "scripts/venue_fingerprint_inputs.json"
    for slug, b in built.items():
        entry = current["venues"].setdefault(slug, {})
        if b["description"]:
            entry["description"] = b["description"]
        entry["bars"] = b["bars"]
        entry["sources"] = [f"scripts/venue_sources.json#{slug}.fingerprintRubric"]
    RUBRICS.write_text(json.dumps(current, indent=2, ensure_ascii=False) + "\n")

    sources = json.loads(SOURCES.read_text())
    copy_sources = json.loads(INPUTS.read_text()).get("copySources", {})
    for slug, b in built.items():
        sources.setdefault(slug, {})["fingerprintRubric"] = b["scored"]
        if slug in copy_sources:
            sources[slug]["fingerprintCopySource"] = copy_sources[slug]
    SOURCES.write_text(json.dumps(sources, indent=2, ensure_ascii=False) + "\n")
    print(f"Wrote {RUBRICS} and {SOURCES} ({len(built)} venues)")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--show", help="comma-separated slugs to preview")
    ap.add_argument("--write", action="store_true")
    args = ap.parse_args()

    inputs = json.loads(INPUTS.read_text())
    current = json.loads(RUBRICS.read_text())
    built = build(inputs)
    if args.show:
        show([s.strip() for s in args.show.split(",")], built, current)
    if args.write:
        write(built, current)


if __name__ == "__main__":
    main()
