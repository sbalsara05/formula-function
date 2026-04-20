from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import date

Series = Literal["f1", "f2", "f3"]
DriverStatus = Literal["active", "retired", "deceased"]
SessionType = Literal["qualifying", "race", "practice"]
Conditions = Literal["dry", "wet", "mixed"]
MomentType = Literal["overtake", "crash", "masterclass", "debut", "title", "pole"]
ConfidenceTier = Literal["HIGH", "MODERATE", "LOW-MODERATE", "LOW"]
CareerOutcome = Literal["F1", "WEC", "IndyCar", "FE", "F2", "F3-Year2", "Regional", "Other", "Exit"]


# ─── Driver ────────────────────────────────────────────────────────────────────

class Driver(BaseModel):
    id: str
    name: str
    short_name: str
    initials: str
    nationality: str
    dob: date
    dod: Optional[date] = None
    status: DriverStatus
    series: list[Series]
    peak_era_team_id: str
    entity_color: str
    bio: str
    quote: Optional[str] = None
    quote_context: Optional[str] = None


class DriverStats(BaseModel):
    driver_id: str
    series: Series
    titles: int
    wins: int
    poles: int
    podiums: int
    career_span: str
    races_entered: int
    fastest_laps: Optional[int] = None
    points_scored: Optional[float] = None


class SignatureAxis(BaseModel):
    label: str
    value: float = Field(ge=0, le=100)


class DrivingSignature(BaseModel):
    driver_id: str
    series: Series
    axes: list[SignatureAxis]
    cohort_average: list[float]
    uncertainty_envelope: Optional[list[float]] = None
    confidence_score: float = Field(ge=0, le=1)
    sample_size: Optional[int] = None


# ─── Team ──────────────────────────────────────────────────────────────────────

class Team(BaseModel):
    id: str
    name: str
    short_name: str
    country: str
    series: list[Series]
    founded: int
    current: bool
    entity_color: str
    livery_hex: str
    bio: str


class TeamStats(BaseModel):
    team_id: str
    constructors_titles: int
    drivers_titles: int
    wins: int
    podiums: int
    seasons: int
    first_season: int


# ─── Venue ─────────────────────────────────────────────────────────────────────

class Venue(BaseModel):
    id: str
    name: str
    sub_label: Optional[str] = None
    country: str
    layout_version: str
    length_km: float
    corners: int
    elevation_delta_m: int
    f1_since: int
    entity_color: str
    entity_color_hex: str
    quote: Optional[str] = None
    quote_attribution: Optional[str] = None


class VenueFingerprintBar(BaseModel):
    label: str
    rating: Literal["EXTREME", "CRITICAL", "HIGH", "MODERATE", "LOW", "EXCEPTIONAL"]
    value: float = Field(ge=0, le=100)
    caption: str


class VenueFingerprint(BaseModel):
    venue_id: str
    bars: list[VenueFingerprintBar]


# ─── Lap ───────────────────────────────────────────────────────────────────────

class Lap(BaseModel):
    id: str
    driver_id: str
    driver_name: str
    venue_id: str
    venue_name: str
    team_id: str
    session: SessionType
    season: int
    lap_number: int
    time_ms: int
    conditions: Conditions
    cv_pipeline_version: str
    frames_analyzed: int
    confidence_score: float = Field(ge=0, le=1)
    processing_date: date
    video_url: Optional[str] = None
    video_available: bool


class LapTelemetry(BaseModel):
    lap_id: str
    timestamps_ms: list[float]
    steering: list[float]
    throttle: list[float]
    brake: list[float]
    speed_kmh: list[float]
    racing_line_x: list[float]
    racing_line_y: list[float]
    sector_boundaries_ms: tuple[float, float, float]


# ─── Moment ────────────────────────────────────────────────────────────────────

class Moment(BaseModel):
    id: str
    type: MomentType
    title: str
    driver_ids: list[str]
    venue_id: str
    team_ids: list[str]
    year: int
    description: str
    tags: list[str]
    image_available: bool


# ─── Trajectory prediction ──────────────────────────────────────────────────────

class OutcomeProbability(BaseModel):
    destination: CareerOutcome
    probability: float = Field(ge=0, le=1)


class CohortAnalog(BaseModel):
    driver_id: str
    driver_name: str
    match_percentage: float = Field(ge=0, le=100)
    era: str
    academy: Optional[str] = None
    destination: CareerOutcome
    current_status: str


class FeatureWeight(BaseModel):
    feature: str
    direction: Literal["positive", "negative"]
    weight: float
    human_readable_value: str


class TrajectoryPrediction(BaseModel):
    driver_id: str
    series: Literal["f2", "f3"]
    generated_at: str
    confidence_tier: ConfidenceTier
    sample_size: int
    training_data_range: str
    outcomes: list[OutcomeProbability]
    next_step_outcomes: Optional[list[OutcomeProbability]] = None
    f1_probability_unconditional: Optional[float] = None
    f1_probability_via_f2: Optional[float] = None
    cohort_analogs: list[CohortAnalog]
    feature_weights: list[FeatureWeight]
