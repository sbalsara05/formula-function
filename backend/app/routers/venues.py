from fastapi import APIRouter, HTTPException
from app.models.schemas import Venue, VenueFingerprint

router = APIRouter(prefix="/venues", tags=["venues"])


@router.get("/", response_model=list[Venue])
async def list_venues():
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/{venue_id}", response_model=Venue)
async def get_venue(venue_id: str):
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/{venue_id}/fingerprint", response_model=VenueFingerprint)
async def get_fingerprint(venue_id: str):
    raise HTTPException(status_code=501, detail="Not implemented")
