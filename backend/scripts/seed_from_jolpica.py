#!/usr/bin/env python3
"""
Seed Supabase with F1 championship data from the Jolpica (Ergast) API.
Run: python -m scripts.seed_from_jolpica
"""
import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import httpx
from app.database import get_supabase

JOLPICA_BASE = "https://api.jolpi.ca/ergast/f1"

def parse_pos(val) -> int:
    """Convert position field — Jolpica uses '-' for unranked entries."""
    try:
        return int(val)
    except (TypeError, ValueError):
        return 0

async def fetch_with_retry(url: str, client: httpx.AsyncClient, retries: int = 5) -> dict:
    delay = 2.0
    for attempt in range(retries):
        try:
            r = await client.get(url, timeout=15)
            if r.status_code == 429:
                wait = delay * (2 ** attempt)
                print(f"    ⏳ 429 rate limit, waiting {wait:.0f}s...")
                await asyncio.sleep(wait)
                continue
            r.raise_for_status()
            return r.json()
        except httpx.HTTPStatusError as e:
            if attempt == retries - 1:
                raise
            await asyncio.sleep(delay * (2 ** attempt))
    raise RuntimeError(f"Failed after {retries} retries: {url}")

async def fetch_constructor_standings(season: int, client: httpx.AsyncClient) -> list[dict]:
    url = f"{JOLPICA_BASE}/{season}/constructorstandings.json"
    data = await fetch_with_retry(url, client)
    standings_lists = data["MRData"]["StandingsTable"]["StandingsLists"]
    return standings_lists[0]["ConstructorStandings"] if standings_lists else []

async def fetch_driver_standings(season: int, client: httpx.AsyncClient) -> list[dict]:
    url = f"{JOLPICA_BASE}/{season}/driverstandings.json"
    data = await fetch_with_retry(url, client)
    standings_lists = data["MRData"]["StandingsTable"]["StandingsLists"]
    return standings_lists[0]["DriverStandings"] if standings_lists else []


async def main():
    db = get_supabase()
    current_year = 2027  # include the current in-progress season
    driver_seasons = list(range(1950, current_year))
    print(f"Seeding {len(driver_seasons)} seasons (WDC from 1950, WCC from 1958) from Jolpica API...")
    async with httpx.AsyncClient() as client:
        for season in driver_seasons:
            print(f"  Seeding {season}...")

            if season >= 1958:
                try:
                    c_standings = await fetch_constructor_standings(season, client)
                    rows = [
                        {
                            "constructor_id": s["Constructor"]["constructorId"],
                            "season": season,
                            "position": parse_pos(s.get("position") or s.get("positionText")),
                            "points": float(s.get("points") or 0),
                            "wins": int(s.get("wins") or 0),
                        }
                        for s in c_standings
                    ]
                    if rows:
                        db.table("constructors_standings").upsert(rows, on_conflict="constructor_id,season").execute()
                        print(f"    ✓ {len(rows)} constructor standings")
                except Exception as e:
                    print(f"    ✗ constructor standings: {e}")

            try:
                d_standings = await fetch_driver_standings(season, client)
                rows = [
                    {
                        "driver_id": s["Driver"]["driverId"],
                        "season": season,
                        "position": parse_pos(s.get("position") or s.get("positionText")),
                        "points": float(s.get("points") or 0),
                        "wins": int(s.get("wins") or 0),
                        "constructor_id": s["Constructors"][0]["constructorId"] if s.get("Constructors") else None,
                    }
                    for s in d_standings
                ]
                if rows:
                    db.table("drivers_standings").upsert(rows, on_conflict="driver_id,season").execute()
                    print(f"    ✓ {len(rows)} driver standings")
            except Exception as e:
                print(f"    ✗ driver standings: {e}")

            await asyncio.sleep(2.0)  # 2 req/season at 2s = 1 req/s, well under Jolpica's limit

    print("Done.")

if __name__ == "__main__":
    asyncio.run(main())
