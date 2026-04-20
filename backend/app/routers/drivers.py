from fastapi import APIRouter, HTTPException
from app.models.schemas import Driver, DriverStats, DrivingSignature

router = APIRouter(prefix="/drivers", tags=["drivers"])


@router.get("/", response_model=list[Driver])
async def list_drivers(series: str | None = None, status: str | None = None):
    # TODO: replace with database query
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/{driver_id}", response_model=Driver)
async def get_driver(driver_id: str):
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/{driver_id}/stats", response_model=DriverStats)
async def get_driver_stats(driver_id: str, series: str = "f1"):
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/{driver_id}/signature", response_model=DrivingSignature)
async def get_driving_signature(driver_id: str):
    raise HTTPException(status_code=501, detail="Not implemented")
