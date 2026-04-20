"""Service for fetching F1 data from the Jolpica (Ergast) API."""
import httpx
from typing import Any

JOLPICA_BASE = "https://api.jolpi.ca/ergast/f1"

async def get_constructor_standings(season: int | str = "current") -> list[dict[str, Any]]:
    url = f"{JOLPICA_BASE}/{season}/constructorstandings.json"
    async with httpx.AsyncClient(timeout=8) as client:
        r = await client.get(url)
        r.raise_for_status()
    data = r.json()
    standings_lists = data["MRData"]["StandingsTable"]["StandingsLists"]
    if not standings_lists:
        return []
    return standings_lists[0]["ConstructorStandings"]

async def get_driver_standings(season: int | str = "current") -> list[dict[str, Any]]:
    url = f"{JOLPICA_BASE}/{season}/driverstandings.json"
    async with httpx.AsyncClient(timeout=8) as client:
        r = await client.get(url)
        r.raise_for_status()
    data = r.json()
    standings_lists = data["MRData"]["StandingsTable"]["StandingsLists"]
    if not standings_lists:
        return []
    return standings_lists[0]["DriverStandings"]

async def get_constructor_seasons(constructor_id: str) -> list[dict[str, Any]]:
    """All seasons a constructor competed in."""
    url = f"{JOLPICA_BASE}/constructors/{constructor_id}/seasons.json?limit=100"
    async with httpx.AsyncClient(timeout=8) as client:
        r = await client.get(url)
        r.raise_for_status()
    data = r.json()
    return data["MRData"]["SeasonTable"]["Seasons"]

async def get_constructor_wins(constructor_id: str) -> int:
    """Total race wins for a constructor."""
    url = f"{JOLPICA_BASE}/constructors/{constructor_id}/results/1.json?limit=1&offset=0"
    async with httpx.AsyncClient(timeout=8) as client:
        r = await client.get(url)
        r.raise_for_status()
    data = r.json()
    return int(data["MRData"]["total"])
