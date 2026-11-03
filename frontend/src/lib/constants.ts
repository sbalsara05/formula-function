import type { Series, ConfidenceTier, CareerOutcome } from "./types";

/* ─── Series ───────────────────────────────────────────────────────────────── */

export const SERIES_LABELS: Record<Series, string> = {
  f1: "FORMULA 1",
  f2: "FORMULA 2",
  f3: "FORMULA 3",
};

export const SERIES_SHORT: Record<Series, string> = {
  f1: "f(1)",
  f2: "f(2)",
  f3: "f(3)",
};

export const SERIES_COLOR_VAR: Record<Series, string> = {
  f1: "var(--color-f1)",
  f2: "var(--color-f2)",
  f3: "var(--color-f3)",
};

/* ─── Driving signature axes (per-series) ──────────────────────────────────── */

export const SIGNATURE_AXES: Record<Series, string[]> = {
  f1: [
    "Steering Smoothness",
    "Entry Aggression",
    "Tyre Management",
    "Throttle Application",
    "Braking",
    "Consistency",
  ],
  f2: [
    "Steering Smoothness",
    "Entry Discipline",
    "Tyre Management",
    "Race Craft",
    "Quali Pace",
    "Consistency",
  ],
  f3: [
    "Steering Smoothness",
    "Wheel-to-Wheel",
    "First-Lap Aggression",
    "Consistency",
    "Quali Pace",
    "Race Craft",
  ],
};

/* ─── Track fingerprint dimensions ─────────────────────────────────────────── */

export const TRACK_FINGERPRINT_DIMENSIONS = [
  "Engine Dependency",
  "Aerodynamic Load",
  "Mechanical Grip",
  "Braking Severity",
  "Tyre Degradation",
  "Driver Bravery",
] as const;

/* ─── Team engineering signature dimensions ─────────────────────────────────── */

export const TEAM_SIGNATURE_DIMENSIONS = [
  "Downforce Bias",
  "Straight-Line Speed",
  "Qualifying Pace",
  "Race Pace",
  "Strategy Aggression",
  "Wet Weather Execution",
] as const;

/* ─── F2/F3 operational signature dimensions ────────────────────────────────── */

export const OPERATIONAL_SIGNATURE_DIMENSIONS = [
  "Qualifying Setup",
  "Race Pace Conversion",
  "Strategy Aggression",
  "Rookie Conversion",
  "Wet Weather Execution",
  "F1 Graduation Rate",
] as const;

/* ─── Confidence tiers ──────────────────────────────────────────────────────── */

export const CONFIDENCE_TIER_LABEL: Record<ConfidenceTier, string> = {
  HIGH: "HIGH CONFIDENCE",
  MODERATE: "MODERATE CONFIDENCE",
  "LOW-MODERATE": "LOW–MODERATE CONFIDENCE",
  LOW: "LOW CONFIDENCE — DIRECTIONAL ONLY",
};

export const CONFIDENCE_TIER_MIN_SAMPLES: Record<ConfidenceTier, number> = {
  HIGH: 500,
  MODERATE: 200,
  "LOW-MODERATE": 80,
  LOW: 0,
};

/* ─── Career outcome labels ─────────────────────────────────────────────────── */

export const OUTCOME_LABELS: Record<CareerOutcome, string> = {
  F1: "Formula 1",
  WEC: "WEC / Le Mans",
  IndyCar: "IndyCar",
  FE: "Formula E",
  F2: "Formula 2",
  "F3-Year2": "F3 Year 2",
  Regional: "Regional / National",
  Other: "Other Series",
  Exit: "Exit Racing",
};

/* ─── Sensitivity / rating labels ───────────────────────────────────────────── */

export const RATING_ORDER = [
  "EXCEPTIONAL",
  "EXTREME",
  "CRITICAL",
  "HIGH",
  "MODERATE",
  "LOW",
  "INCONSISTENT",
] as const;

export type Rating = (typeof RATING_ORDER)[number];

/* ─── Section header copy ───────────────────────────────────────────────────── */

export const SECTION_LABELS = {
  drivingSignature: "DRIVING SIGNATURE",
  setupStyle: "SETUP & STYLE",
  careerArc: "CAREER ARC",
  teammateH2H: "TEAMMATE H2H",
  trackByTrack: "TRACK BY TRACK",
  lapsLibrary: "LAPS LIBRARY",
  trajectory: "TRAJECTORY FORECAST",
  cohortAnalogs: "COHORT ANALOGS",
  featureWeights: "MODEL FACTORS",
  trackFingerprint: "TRACK FINGERPRINT",
  weather: "WEATHER PROFILE",
  driverTrackFit: "DRIVER–TRACK FIT",
  iconicMoments: "ICONIC MOMENTS",
  engineeringEras: "ENGINEERING ERAS",
  engineeringSignature: "ENGINEERING SIGNATURE",
  driverAcademy: "DRIVER ACADEMY",
  iconicCars: "ICONIC CARS",
  graduateAlumni: "GRADUATE ALUMNI",
  operationalSignature: "OPERATIONAL SIGNATURE",
  currentSeason: "CURRENT SEASON",
} as const;

/* ─── Placeholder flag variants ─────────────────────────────────────────────── */

export const PLACEHOLDER = {
  editorial: "[PLACEHOLDER · NEEDS EDITORIAL VERIFICATION]",
  figures: "[PLACEHOLDER · FIGURES ILLUSTRATIVE]",
  liveData: "[PLACEHOLDER · NEEDS LIVE DATA SOURCE]",
  seasonal: "[PLACEHOLDER · ROSTER CHANGES SEASONALLY]",
  trackMap: "[PLACEHOLDER · TRACK MAP SCHEMATIC · NOT TO SCALE]",
  cv: "[PLACEHOLDER · CV PIPELINE OUTPUT NOT YET INTEGRATED]",
  prediction: "[PLACEHOLDER · MODEL OUTPUT ILLUSTRATIVE]",
} as const;

/* ─── Reel defaults ─────────────────────────────────────────────────────────── */

export const REEL_DWELL_MS = 5000;
export const REEL_TRANSITION_MS = 900;
export const REEL_SLIDE_COUNT = 6;

/* ─── Layout constants ──────────────────────────────────────────────────────── */

export const HERO_HEIGHT_PX = 620;
export const PAGE_PADDING_X = "1.75rem";
export const SECTION_PADDING_Y = "2rem";
export const HERO_PADDING_Y = "2.5rem";
