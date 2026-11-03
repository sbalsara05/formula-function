"""F1 technical regulation eras used as the default comparison group.

`rules` and `caveat` are shown on the site. Sources: formula1.com regulation
explainers (2022 car, 2026 rule changes) and the F1 2026 terminology update
(corp.formula1.com).
"""

from __future__ import annotations

ERAS: list[dict] = [
    {
        "id": "2018-2021", "label": "Late hybrid", "start": 2018, "end": 2021,
        "rules": "1.6-litre V6 turbo hybrid power units, used since 2014, in the wider, "
                 "higher-downforce cars on wider tyres introduced in 2017.",
        "caveat": "The era starts in 2018, the first season of the official timing archive, "
                  "although its car rules date from 2017.",
    },
    {
        "id": "2022-2025", "label": "Ground effect", "start": 2022, "end": 2025,
        "rules": "Most downforce comes from two Venturi tunnels under the floor, with simplified wings "
                 "and 18-inch low-profile tyres, so that cars can follow each other more closely.",
    },
    {
        "id": "2026-", "label": "Active aero", "start": 2026, "end": None,
        "rules": "Front and rear wings switch between a corner mode and a low-drag straight mode, "
                 "replacing DRS. Cars are shorter, narrower and lighter (768 kg), the floor tunnels are gone, "
                 "and power is split roughly half and half between combustion and electric, "
                 "with the MGU-H removed and fully sustainable fuel.",
        "caveat": "Energy recovery is a bigger part of each lap: drivers lift off before braking to recharge "
                  "and cars harvest at full throttle at the end of straights. Throttle and braking traces "
                  "reflect energy management as well as driving style.",
    },
]

ERA_BY_ID = {era["id"]: era for era in ERAS}


def era_for_season(season: int) -> dict:
    for era in ERAS:
        if season >= era["start"] and (era["end"] is None or season <= era["end"]):
            return era
    raise ValueError(f"No regulation era defined for season {season}")


def era_span(era: dict) -> str:
    return f"{era['start']} onwards" if era["end"] is None else f"{era['start']}\u2013{era['end']}"


def seasons_label(seasons: list[int]) -> str:
    seasons = sorted(set(seasons))
    if not seasons:
        return ""
    if seasons[0] == seasons[-1]:
        return str(seasons[0])
    return f"{seasons[0]}\u2013{seasons[-1]}"
