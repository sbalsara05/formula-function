"""Service for fetching F1 data from the Jolpica (Ergast) API."""
import httpx
from typing import Any

JOLPICA_BASE = "https://api.jolpi.ca/ergast/f1"
# Jolpica/Ergast default page size is 30 — always paginate using MRData.total.
_PAGE_LIMIT = 100


async def _fetch_paginated_standings(
    season: int | str,
    kind: str,  # "driverstandings" | "constructorstandings"
    list_key: str,  # "DriverStandings" | "ConstructorStandings"
) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    offset = 0
    total = None

    async with httpx.AsyncClient(timeout=15) as client:
        while True:
            url = (
                f"{JOLPICA_BASE}/{season}/{kind}.json"
                f"?limit={_PAGE_LIMIT}&offset={offset}"
            )
            r = await client.get(url)
            r.raise_for_status()
            data = r.json()
            mr = data["MRData"]
            if total is None:
                total = int(mr.get("total") or 0)
            standings_lists = mr["StandingsTable"]["StandingsLists"]
            if not standings_lists:
                break
            batch = standings_lists[0].get(list_key) or []
            rows.extend(batch)
            offset += len(batch)
            if not batch or offset >= total:
                break

    if total is not None and len(rows) < total:
        raise RuntimeError(
            f"Jolpica {kind} for {season}: fetched {len(rows)} of {total} — refusing truncated result"
        )
    return rows


async def get_constructor_standings(season: int | str = "current") -> list[dict[str, Any]]:
    return await _fetch_paginated_standings(
        season, "constructorstandings", "ConstructorStandings"
    )


async def get_driver_standings(season: int | str = "current") -> list[dict[str, Any]]:
    return await _fetch_paginated_standings(
        season, "driverstandings", "DriverStandings"
    )


async def get_constructor_seasons(constructor_id: str) -> list[dict[str, Any]]:
    """All seasons a constructor competed in."""
    seasons: list[dict[str, Any]] = []
    offset = 0
    total = None
    async with httpx.AsyncClient(timeout=15) as client:
        while True:
            url = (
                f"{JOLPICA_BASE}/constructors/{constructor_id}/seasons.json"
                f"?limit={_PAGE_LIMIT}&offset={offset}"
            )
            r = await client.get(url)
            r.raise_for_status()
            data = r.json()
            mr = data["MRData"]
            if total is None:
                total = int(mr.get("total") or 0)
            batch = mr["SeasonTable"]["Seasons"] or []
            seasons.extend(batch)
            offset += len(batch)
            if not batch or offset >= total:
                break
    return seasons


async def get_constructor_wins(constructor_id: str) -> int:
    """Total race wins for a constructor."""
    url = f"{JOLPICA_BASE}/constructors/{constructor_id}/results/1.json?limit=1&offset=0"
    async with httpx.AsyncClient(timeout=8) as client:
        r = await client.get(url)
        r.raise_for_status()
    data = r.json()
    return int(data["MRData"]["total"])
