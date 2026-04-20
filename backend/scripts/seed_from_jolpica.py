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

async def fetch_constructor_standings(season: int, client: httpx.AsyncClient) -> list[dict]:
    url = f"{JOLPICA_BASE}/{season}/constructorstandings.json"
    r = await client.get(url, timeout=10)
    r.raise_for_status()
    data = r.json()
    standings_lists = data["MRData"]["StandingsTable"]["StandingsLists"]
    if not standings_lists:
        return []
    return standings_lists[0]["ConstructorStandings"]

async def fetch_driver_standings(season: int, client: httpx.AsyncClient) -> list[dict]:
    url = f"{JOLPICA_BASE}/{season}/driverstandings.json"
    r = await client.get(url, timeout=10)
    r.raise_for_status()
    data = r.json()
    standings_lists = data["MRData"]["StandingsTable"]["StandingsLists"]
    if not standings_lists:
        return []
    return standings_lists[0]["DriverStandings"]

async def seed_season(season: int, client: httpx.AsyncClient, db):
    print(f"  Seeding {season}...")

    # Constructor standings
    try:
        c_standings = await fetch_constructor_standings(season, client)
        rows = [
            {
                "constructor_id": s["Constructor"]["constructorId"],
                "season": season,
                "position": int(s["position"]),
                "points": float(s["points"]),
                "wins": int(s["wins"]),
            }
            for s in c_standings
        ]
        if rows:
            db.table("constructors_standings").upsert(rows, on_conflict="constructor_id,season").execute()
            print(f"    ✓ {len(rows)} constructor standings")
    except Exception as e:
        print(f"    ✗ constructor standings: {e}")

    # Driver standings
    try:
        d_standings = await fetch_driver_standings(season, client)
        rows = [
            {
                "driver_id": s["Driver"]["driverId"],
                "season": season,
                "position": int(s["position"]),
                "points": float(s["points"]),
                "wins": int(s["wins"]),
                "constructor_id": s["Constructors"][0]["constructorId"] if s["Constructors"] else None,
            }
            for s in d_standings
        ]
        if rows:
            db.table("drivers_standings").upsert(rows, on_conflict="driver_id,season").execute()
            print(f"    ✓ {len(rows)} driver standings")
    except Exception as e:
        print(f"    ✗ driver standings: {e}")

async def main():
    db = get_supabase()
    seasons = list(range(2018, 2026))  # 2018-2025 (2025 will be partial/final)
    print(f"Seeding {len(seasons)} seasons from Jolpica API...")
    async with httpx.AsyncClient() as client:
        for season in seasons:
            await seed_season(season, client, db)
            await asyncio.sleep(0.5)  # be polite to the API
    print("Done.")

if __name__ == "__main__":
    asyncio.run(main())
