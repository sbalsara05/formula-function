from fastapi import APIRouter, HTTPException
from app.models.schemas import Team, TeamStats

router = APIRouter(prefix="/teams", tags=["teams"])


@router.get("/", response_model=list[Team])
async def list_teams(series: str | None = None):
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/{team_id}", response_model=Team)
async def get_team(team_id: str):
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/{team_id}/stats", response_model=TeamStats)
async def get_team_stats(team_id: str):
    raise HTTPException(status_code=501, detail="Not implemented")
