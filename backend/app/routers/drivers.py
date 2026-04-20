from fastapi import APIRouter, HTTPException
from app.models.schemas import Driver, DriverStats
from app.services import jolpica

router = APIRouter(prefix="/drivers", tags=["drivers"])

@router.get("/standings/current")
async def current_driver_standings():
    try:
        return await jolpica.get_driver_standings("current")
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

@router.get("/standings/{season}")
async def driver_standings_by_season(season: int):
    try:
        return await jolpica.get_driver_standings(season)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

@router.get("/", response_model=list[Driver])
async def list_drivers(series: str | None = None):
    raise HTTPException(status_code=501, detail="Not implemented — use Supabase")

@router.get("/{driver_id}", response_model=Driver)
async def get_driver(driver_id: str):
    raise HTTPException(status_code=501, detail="Not implemented — use Supabase")

@router.get("/{driver_id}/stats", response_model=DriverStats)
async def get_driver_stats(driver_id: str):
    raise HTTPException(status_code=501, detail="Not implemented — use Supabase")
