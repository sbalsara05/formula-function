from fastapi import APIRouter, HTTPException
from app.models.schemas import Team, TeamStats
from app.services import jolpica
import os

router = APIRouter(prefix="/teams", tags=["teams"])

# Inline static data as fallback when Supabase isn't configured
STATIC_TEAMS: dict[str, dict] = {
    "ferrari": {
        "id": "ferrari",
        "name": "Scuderia Ferrari",
        "short_name": "Ferrari",
        "country": "Italy",
        "series": ["f1"],
        "founded": 1950,
        "current": True,
        "entity_color": "ferrari",
        "livery_hex": "#DC0000",
        "bio": "The oldest and most storied constructor in Formula 1. 16 WCC titles, 15 WDC titles.",
    }
}

STATIC_STATS: dict[str, dict] = {
    "ferrari": {
        "team_id": "ferrari",
        "constructors_titles": 16,
        "drivers_titles": 15,
        "wins": 243,
        "podiums": 815,
        "seasons": 75,
        "first_season": 1950,
    }
}

def _db_available() -> bool:
    return bool(os.getenv("SUPABASE_URL") and os.getenv("SUPABASE_SERVICE_KEY"))

@router.get("/", response_model=list[Team])
async def list_teams(series: str | None = None):
    if _db_available():
        try:
            from app.database import get_supabase
            db = get_supabase()
            q = db.table("teams").select("*")
            if series:
                q = q.contains("series", [series])
            rows = q.execute().data
            return [Team(**{
                "id": r["id"], "name": r["name"], "short_name": r["short_name"],
                "country": r["country"], "series": r["series"], "founded": r["founded"],
                "current": r["current"], "entity_color": r["entity_color"],
                "livery_hex": r["livery_hex"], "bio": r["bio"],
            }) for r in rows]
        except Exception:
            pass
    return []

@router.get("/standings/current")
async def current_constructor_standings():
    """Live WCC standings from Jolpica."""
    try:
        standings = await jolpica.get_constructor_standings("current")
        return standings
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Jolpica unavailable: {e}")

@router.get("/standings/{season}")
async def constructor_standings_by_season(season: int):
    """WCC standings for a specific season from Jolpica."""
    try:
        standings = await jolpica.get_constructor_standings(season)
        return standings
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Jolpica unavailable: {e}")

@router.get("/{team_id}", response_model=Team)
async def get_team(team_id: str):
    if _db_available():
        try:
            from app.database import get_supabase
            db = get_supabase()
            rows = db.table("teams").select("*").eq("id", team_id).execute().data
            if rows:
                r = rows[0]
                return Team(**{
                    "id": r["id"], "name": r["name"], "short_name": r["short_name"],
                    "country": r["country"], "series": r["series"], "founded": r["founded"],
                    "current": r["current"], "entity_color": r["entity_color"],
                    "livery_hex": r["livery_hex"], "bio": r["bio"],
                })
        except Exception:
            pass
    if team_id in STATIC_TEAMS:
        return Team(**STATIC_TEAMS[team_id])
    raise HTTPException(status_code=404, detail="Team not found")

@router.get("/{team_id}/stats", response_model=TeamStats)
async def get_team_stats(team_id: str):
    if _db_available():
        try:
            from app.database import get_supabase
            db = get_supabase()
            rows = db.table("team_stats").select("*").eq("team_id", team_id).execute().data
            if rows:
                r = rows[0]
                return TeamStats(**{
                    "team_id": r["team_id"],
                    "constructors_titles": r["constructors_titles"],
                    "drivers_titles": r["drivers_titles"],
                    "wins": r["wins"],
                    "podiums": r["podiums"],
                    "seasons": r["seasons"],
                    "first_season": r["first_season"],
                })
        except Exception:
            pass
    if team_id in STATIC_STATS:
        return TeamStats(**STATIC_STATS[team_id])
    raise HTTPException(status_code=404, detail="Team stats not found")
