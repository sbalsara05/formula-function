from fastapi import APIRouter, HTTPException
from app.models.schemas import Lap, LapTelemetry, TrajectoryPrediction

router = APIRouter(prefix="/laps", tags=["laps"])


@router.get("/", response_model=list[Lap])
async def list_laps(
    driver_id: str | None = None,
    venue_id: str | None = None,
    season: int | None = None,
    conditions: str | None = None,
):
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/{lap_id}", response_model=Lap)
async def get_lap(lap_id: str):
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/{lap_id}/telemetry", response_model=LapTelemetry)
async def get_telemetry(lap_id: str):
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/drivers/{driver_id}/trajectory", response_model=TrajectoryPrediction)
async def get_trajectory(driver_id: str):
    """F2/F3 only. Returns 404 for F1 drivers."""
    raise HTTPException(status_code=501, detail="Not implemented")
