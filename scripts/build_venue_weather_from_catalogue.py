#!/usr/bin/env python3
"""
Build venue weather classifications from a curated wet-race catalogue + Jolpica race lists.

Primary catalogue: todosobreformula1 wet/damp race list (GP codes × years).
Spa keeps its curated year-level WET/MIXED split from venue_weather_classifications.json.

Definition:
  DRY   = race year at circuit not in rain-affected set
  MIXED = rain-affected per catalogue (or curated mixed)
  WET   = curated primarily-wet / rain-abandoned races

Usage:
  python3 scripts/build_venue_weather_from_catalogue.py
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CACHE_DIR = ROOT / "scripts" / "venue_audit_cache"
OUT = ROOT / "scripts" / "venue_weather_classifications.json"

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
    "singapore": "marina_bay",
    "cota": "americas",
    "mexico": "rodriguez",
    "las-vegas": "las_vegas",
    "qatar": "losail",
}

# GP code → browse slug(s). Historic codes that moved venues are year-gated below.
GP_TO_SLUG = {
    "Mon": "monaco",
    "Ing": "silverstone",
    "Ita": "monza",
    "Jap": "suzuka",
    "Bra": "interlagos",
    "Can": "montreal",
    "Esp": "barcelona",  # Jarama/Jerez/Catalunya — filtered by circuit race years
    "Hun": "hungaroring",
    "Sin": "singapore",
    "Chi": "shanghai",
    "Aus": "melbourne",
    "Hol": "zandvoort",
    "USA": "cota",  # filtered: only when race year exists at americas; Indy/others excluded by cache years
    "San": "imola",
    "Emilia Romagna": "imola",
    "Bel": "spa",  # Zolder years excluded because not in spa race list
    "Mex": "mexico",
    "Qat": "qatar",
    "Bhr": "bahrain",
    "Abu": "abu-dhabi",
    "Miami": "miami",
    "Las": "las-vegas",
    "Jed": "jeddah",
    "Aze": "baku",
    "Cor": None,  # Korea — not in calendar
    "Mal": None,
    "Tur": None,
    "Rus": None,
    "Eur": None,
    "Fra": None,
    "Ale": None,
    "Aut": None,
    "Por": None,
    "Arg": None,
    "Sui": None,
    "Afr": None,
    "Evil": None,  # Malaysia typo in source for 2013
}

# (year, gp_code) rain-affected from todosobreformula1 wet catalogue + curated supplements.
# Format: year -> list of GP codes as they appear in the source.
CATALOGUE: dict[int, list[str]] = {
    1950: ["USA"],
    1951: ["Sui"],
    1952: ["Bel", "Fra", "Hol"],
    1953: ["Ing"],
    1954: ["Arg", "Ing", "Sui"],
    1955: ["Hol"],
    1956: ["Bel", "Ale"],
    1958: ["Por"],
    1960: ["Mon"],
    1961: ["Ing", "Ale"],
    1962: ["Ale", "Ita"],
    1963: ["Bel", "Fra"],
    1965: ["Bel", "USA"],
    1966: ["Bel", "Ing", "Ale"],
    1967: ["Can"],
    1968: ["Hol", "Fra", "Ale"],
    1971: ["Hol", "Can"],
    1972: ["Esp", "Mon", "USA"],
    1973: ["Can"],
    1974: ["Bra", "Esp", "Ale"],
    1975: ["Mon", "Hol", "Ing", "Aut"],
    1976: ["Ale", "Jap"],
    1977: ["USA II", "Bel", "Aut"],
    1978: ["Aut"],
    1979: ["Afr", "USA II"],
    1980: ["Mon"],
    1981: ["Bra", "San", "Bel", "Ale", "Can"],
    1982: ["Mon"],
    1983: ["Mon"],
    1984: ["Mon"],
    1985: ["Por", "Bel"],
    1988: ["Ing", "Ale", "Jap"],
    1989: ["Can", "Bel", "Aus"],
    1990: ["Can"],
    1991: ["Bra", "San", "Esp", "Aus"],
    1992: ["Esp", "Fra", "Bel"],
    1993: ["Bra", "Eur", "San", "Jap"],
    1994: ["Jap"],
    1995: ["Arg", "San", "Bel", "Eur", "Jap"],
    1996: ["Bra", "Mon", "Esp"],
    1997: ["Mon", "Fra", "Bel"],
    1998: ["Arg", "Ing", "Bel"],
    1999: ["Fra", "Eur"],
    2000: ["Eur", "Can", "Ale", "Bel", "USA", "Jap"],
    2001: ["Mal", "Bra"],
    2002: ["Ing"],
    2003: ["Bra", "USA"],
    2004: ["Mal", "Ita", "Bra"],
    2005: ["Bel"],
    2006: ["Hun", "Chi"],
    2007: ["Eur", "Jap", "Chi"],
    2008: ["Mon", "Ing", "Bel", "Ita", "Bra"],
    2009: ["Mal", "Chi"],
    2010: ["Aus", "Chi", "Bel", "Cor"],
    2011: ["Can", "Ing", "Hun"],
    2012: ["Mal", "Bra"],
    2013: ["Mal"],  # source "Evil" = Malaysia
    2014: ["Hun", "Jap"],
    2015: ["Ing", "USA"],
    2016: ["Mon", "Ing", "Bra"],
    2017: ["Chi", "Sin"],
    2018: ["Ale"],
    2019: ["Ale"],  # China wet start noted separately → add Chi
    2020: ["Tur"],
    2021: ["Emilia Romagna", "Rus", "Tur"],
    2022: ["Emilia Romagna", "Mon", "Sin", "Jap"],
    2023: ["Mon", "Hol"],
    2024: ["Can", "Ing", "Bra"],
    2025: ["Aus", "Ing", "Bel"],
}

# Curated supplements the catalogue misses for our 23 venues
EXTRA_RAIN: list[tuple[str, int, str]] = [
    # slug, year, MIXED|WET
    ("spa", 2016, "MIXED"),
    ("spa", 2021, "WET"),
    ("shanghai", 2019, "MIXED"),  # wet track at race start
    ("imola", 2020, "MIXED"),  # if raced — may not exist
]

# Primarily wet / abandoned / monsoon — counted as WET not MIXED
WET_OVERRIDES: set[tuple[str, int]] = {
    ("spa", 1956),
    ("spa", 1963),
    ("spa", 1966),
    ("spa", 1989),
    ("spa", 1998),
    ("spa", 2021),
    ("monaco", 1984),
    ("monaco", 1996),
    ("monaco", 2008),
    ("silverstone", 2008),
    ("silverstone", 2024),
    ("suzuka", 1994),
    ("suzuka", 2022),
    ("interlagos", 2016),
    ("interlagos", 2024),
    ("singapore", 2017),
    ("imola", 2022),
    ("zandvoort", 2023),
    ("montreal", 2011),
}


def pcts(dry: int, mixed: int, wet: int) -> tuple[int, int, int]:
    total = dry + mixed + wet
    if total == 0:
        return 0, 0, 0
    raw = [(dry / total) * 100, (mixed / total) * 100, (wet / total) * 100]
    floors = [int(x) for x in raw]
    rem = 100 - sum(floors)
    order = sorted(range(3), key=lambda i: raw[i] - floors[i], reverse=True)
    for i in order[:rem]:
        floors[i] += 1
    return floors[0], floors[1], floors[2]


def normalize_code(code: str) -> str:
    c = code.strip()
    if c.startswith("USA"):
        return "USA"
    if c == "Evil":
        return "Mal"
    return c


def rain_years_by_slug() -> dict[str, set[int]]:
    out: dict[str, set[int]] = {s: set() for s in CIRCUIT_MAP}
    for year, codes in CATALOGUE.items():
        for code in codes:
            code = normalize_code(code)
            slug = GP_TO_SLUG.get(code)
            if slug and slug in out:
                out[slug].add(year)
    for slug, year, _lab in EXTRA_RAIN:
        if slug in out:
            out[slug].add(year)
    return out


def main() -> None:
    existing = json.loads(OUT.read_text()) if OUT.exists() else {}
    rain = rain_years_by_slug()

    out: dict = {
        "method": (
            "Rain-affected years from the curated wet/damp F1 race catalogue "
            "(todosobreformula1) mapped to Jolpica circuit race years, plus curated supplements. "
            "DRY = not rain-affected; MIXED = rain-affected; WET = curated primarily-wet overrides. "
            "Percentages via largest-remainder so integers sum to 100. "
            "Spa retains its finer curated year list when present."
        ),
        "dataThrough": "2026-07-29",
        "sources": [
            "https://en.tudosobreformula1.com.br/corridas-com-pista-molhada-ou-%C3%BAmida",
            "scripts/venue_weather_classifications.json (spa curated)",
            "Jolpica circuit race lists in scripts/venue_audit_cache/",
        ],
    }

    # Prefer curated Spa year split, but drop any seasons that have not been raced yet
    if "spa" in existing and existing["spa"].get("counts"):
        spa_cache = CACHE_DIR / "spa.json"
        completed = set()
        if spa_cache.exists():
            completed = {int(w["season"]) for w in json.loads(spa_cache.read_text()).get("wins", [])}
        spa = dict(existing["spa"])
        for key in ("wetYears", "mixedYears", "dryYears"):
            spa[key] = [y for y in spa.get(key, []) if not completed or y in completed]
        dry, mixed, wet = len(spa["dryYears"]), len(spa["mixedYears"]), len(spa["wetYears"])
        spa["counts"] = {"dry": dry, "mixed": mixed, "wet": wet}
        spa["totalRaces"] = dry + mixed + wet
        dry_pct, mixed_pct, wet_pct = pcts(dry, mixed, wet)
        spa["percentages"] = {"dryPct": dry_pct, "mixedPct": mixed_pct, "wetPct": wet_pct}
        if spa.get("yearNotes"):
            spa["yearNotes"] = {k: v for k, v in spa["yearNotes"].items() if int(k) in (completed or {int(k)})}
        out["spa"] = spa
        print(f"spa: curated filtered n={spa['totalRaces']} → {dry_pct}/{mixed_pct}/{wet_pct}")
    else:
        print("spa: will build from catalogue")

    for slug, cid in CIRCUIT_MAP.items():
        if slug == "spa" and "spa" in out:
            continue
        cache_path = CACHE_DIR / f"{cid}.json"
        if not cache_path.exists():
            print(f"{slug}: no cache, skip")
            continue
        payload = json.loads(cache_path.read_text())
        # Only count completed GPs (have a race winner). Calendar entries without
        # results — e.g. scheduled 2026 races — must not appear in weather totals.
        completed = {int(w["season"]) for w in payload.get("wins", [])}
        years = sorted(
            int(r["season"])
            for r in payload["races"]
            if int(r["season"]) in completed
        )
        wet_years: list[int] = []
        mixed_years: list[int] = []
        dry_years: list[int] = []
        notes: dict[str, str] = {}
        for y in years:
            if y in rain[slug]:
                if (slug, y) in WET_OVERRIDES:
                    wet_years.append(y)
                    notes[str(y)] = "Catalogue rain-affected · curated WET"
                else:
                    mixed_years.append(y)
                    notes[str(y)] = "Catalogue rain-affected · MIXED"
            else:
                dry_years.append(y)
        dry, mixed, wet = len(dry_years), len(mixed_years), len(wet_years)
        dry_pct, mixed_pct, wet_pct = pcts(dry, mixed, wet)
        out[slug] = {
            "circuitId": cid,
            "totalRaces": len(years),
            "wetYears": wet_years,
            "mixedYears": mixed_years,
            "dryYears": dry_years,
            "counts": {"dry": dry, "mixed": mixed, "wet": wet},
            "percentages": {"dryPct": dry_pct, "mixedPct": mixed_pct, "wetPct": wet_pct},
            "sources": out["sources"],
            "yearNotes": notes,
        }
        print(f"{slug}: n={len(years)} dry={dry} mixed={mixed} wet={wet} → {dry_pct}/{mixed_pct}/{wet_pct}")

    OUT.write_text(json.dumps(out, indent=2))
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
