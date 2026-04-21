import type {
  Driver,
  DriverStats,
  DriverEra,
  TeammateRecord,
  TrackRecord,
  DrivingSignature,
  ReelSlide,
  ScoutingReport,
  TrajectoryPrediction,
  FeaturedLap,
  LapRecord,
  LapMoment,
  LapSector,
  TelemetryTrace,
  LapAnalysis,
  ComparisonLap,
  DeltaInsight,
  SectorComparison,
  OverlayTrace,
  LineAnnotation,
  LapComparisonData,
} from "@/lib/types";

/* ─── Vettel ───────────────────────────────────────────────────────────────── */

export const vettel: Driver = {
  id: "vettel",
  name: "Sebastian Vettel",
  shortName: "Vettel",
  initials: "SV",
  nationality: "German",
  dob: "1987-07-03",
  status: "retired",
  series: ["f1"],
  peakEraTeamId: "redbull",
  entityColor: "vettel",
  bio: "Four-time world champion. The defining driver of the V8 turbo era — a technical virtuoso whose car sensitivity and setup methodology redefined what a modern racing driver could demand from his engineers.",
  quote:
    "The youngest world champion. Four consecutive titles. Clean inputs and single-lap dominance.",
  quoteContext: "Career retrospective",
};

export const vettelStats: DriverStats = {
  driverId: "vettel",
  series: "f1",
  titles: 4,
  wins: 53,
  poles: 57,
  podiums: 122,
  careerSpan: "2007–2022",
  racesEntered: 300,
  fastestLaps: 38,
  pointsScored: 3098,
};

export const vettelEras: DriverEra[] = [
  {
    driverId: "vettel",
    teamId: "toro-rosso",
    teamName: "Toro Rosso",
    seasons: "2007–2008",
    highlights: ["First career points at USGP 2007", "First pole, Monza 2008"],
    titles: 0,
    wins: 1,
    teamLiveryHex: "#E60000",
    statLabel: "1W · 1P",
  },
  {
    driverId: "vettel",
    teamId: "redbull",
    teamName: "Red Bull",
    seasons: "2009–2014",
    highlights: [
      "Four consecutive world championships",
      "Record 13 wins in 2013",
    ],
    titles: 4,
    wins: 38,
    teamLiveryHex: "#1E3A8A",
    teamAccentHex: "#FFD700",
    statLabel: "4× WDC",
  },
  {
    driverId: "vettel",
    teamId: "ferrari",
    teamName: "Ferrari",
    seasons: "2015–2020",
    highlights: ["14 wins with Ferrari", "Title contender 2017–2018"],
    titles: 0,
    wins: 14,
    teamLiveryHex: "#DC0000",
    statLabel: "14W · 2nd×2",
  },
  {
    driverId: "vettel",
    teamId: "astonmartin",
    teamName: "Aston Martin",
    seasons: "2021–2022",
    highlights: ["Final F1 season", "Retirement announced mid-2022"],
    titles: 0,
    wins: 0,
    teamLiveryHex: "#006F62",
    statLabel: "1 PODIUM",
  },
];

export const vettelTeammates: TeammateRecord[] = [
  {
    driverId: "vettel",
    teammateId: "webber",
    teammateName: "Mark Webber",
    seasons: "2009–2013",
    qualiWinPct: 67,
    raceWinPct: 63,
    deltaMs: -145,
  },
  {
    driverId: "vettel",
    teammateId: "raikkonen",
    teammateName: "Kimi Räikkönen",
    seasons: "2015–2018",
    qualiWinPct: 74,
    raceWinPct: 68,
    deltaMs: -198,
  },
  {
    driverId: "vettel",
    teammateId: "leclerc",
    teammateName: "Charles Leclerc",
    seasons: "2019–2020",
    qualiWinPct: 38,
    raceWinPct: 44,
    deltaMs: 86,
  },
];

export const vettelTracks: TrackRecord[] = [
  {
    driverId: "vettel",
    venueId: "suzuka",
    venueName: "Suzuka",
    wins: 6,
    poles: 6,
    podiums: 10,
    sentiment: "excelled",
  },
  {
    driverId: "vettel",
    venueId: "bahrain",
    venueName: "Bahrain",
    wins: 4,
    poles: 4,
    podiums: 9,
    sentiment: "excelled",
  },
  {
    driverId: "vettel",
    venueId: "monaco",
    venueName: "Monaco",
    wins: 1,
    poles: 1,
    podiums: 8,
    sentiment: "struggled",
  },
  {
    driverId: "vettel",
    venueId: "spa",
    venueName: "Spa-Francorchamps",
    wins: 2,
    poles: 4,
    podiums: 8,
    sentiment: "neutral",
  },
];

export const vettelSignature: DrivingSignature = {
  driverId: "vettel",
  series: "f1",
  axes: [
    { label: "Steering Smoothness", value: 94 },
    { label: "Entry Aggression", value: 71 },
    { label: "Tyre Management", value: 96 },
    { label: "Throttle Application", value: 92 },
    { label: "Braking", value: 89 },
    { label: "Consistency", value: 97 },
  ],
  cohortAverage: [78, 73, 74, 79, 80, 76],
  confidenceScore: 0.94,
  sampleSize: 1847,
};

export const vettelReelSlides: ReelSlide[] = [
  {
    slotLabel: "SV · 05",
    badge: "POLE",
    glowColor: "#E60000",
    kicker: "FIRST F1 POLE · YOUNGEST POLE-SITTER",
    headline: "Monza",
    meta: "2008 · TORO ROSSO · 1:37.555",
    svgPath:
      "M 30 160 L 90 160 Q 112 148, 130 100 L 180 100 Q 210 116, 230 160 L 290 160 Q 310 144, 325 104 L 370 100",
  },
  {
    slotLabel: "SV · 01",
    badge: "TITLE",
    glowColor: "#1E3A8A",
    kicker: "FIRST WORLD TITLE · WDC #1",
    headline: "Abu Dhabi",
    meta: "2010 · RED BULL · \"I'M WORLD CHAMPION, BOYS\"",
    svgPath:
      "M 30 160 Q 60 150, 85 115 L 145 115 Q 175 135, 195 160 L 255 160 Q 285 140, 310 100 L 370 100",
  },
  {
    slotLabel: "SV · 01",
    badge: "POLE",
    glowColor: "#1E3A8A",
    kicker: "WET-DRY MASTERCLASS · Malaysia RACE WIN",
    headline: "Malaysia",
    meta: "2012 · RED BULL · MIXED CONDITIONS",
    svgPath:
      "M 30 160 L 75 160 Q 95 148, 110 100 L 160 100 Q 180 118, 195 160 L 240 160 Q 260 172, 275 220 L 320 220 Q 340 190, 355 160",
  },
  {
    slotLabel: "SV · 01",
    badge: "DEFENSE",
    glowColor: "#1E3A8A",
    kicker: "HELD OFF WEBBER · CRITICAL WIN",
    headline: "Suzuka",
    meta: "2009 · RED BULL · POLE TO WIN",
    svgPath:
      "M 30 160 Q 65 148, 95 112 L 150 112 Q 180 130, 205 160 L 255 160 Q 285 178, 310 215 L 370 215",
    circles: [
      { cx: 245, cy: 145, r: 4, fill: "#FFD700" },
      { cx: 310, cy: 178, r: 4, fill: "#fff" },
    ],
  },
  {
    slotLabel: "SV · 01",
    badge: "WIN",
    glowColor: "#1E3A8A",
    kicker: "PEAK DOMINANCE · 32.6s WINNING MARGIN",
    headline: "Singapore",
    meta: "2013 · RED BULL · 32.6s MARGIN",
    svgPath:
      "M 30 160 Q 70 150, 100 115 L 150 115 Q 180 135, 205 160 L 260 160 Q 290 180, 315 218 L 360 218 Q 385 180, 395 145",
  },
  {
    slotLabel: "SV · 01",
    badge: "TITLE",
    glowColor: "#1E3A8A",
    kicker: "4TH CONSECUTIVE TITLE · YOUNGEST QUADRUPLE CHAMPION",
    headline: "India",
    meta: "2013 · RED BULL · TITLE-CLINCHING RACE",
    svgPath:
      "M 30 160 L 90 160 Q 112 148, 130 105 L 190 105 Q 215 122, 235 160 L 290 160 Q 315 138, 335 104 L 370 104",
  },
];

export const vettelScoutingReport: ScoutingReport = {
  paragraphs: [
    "Vettel preferred a pointy front end — a car that rotated willingly into corners, even at the cost of rear stability. He trusted the rear to hold and turned in aggressively, often earlier and sharper than his teammates.",
    "The Red Bull era suited him perfectly — Newey's blown-diffuser cars generated enormous rear downforce, letting Vettel over-rotate without penalty. When that aero advantage evaporated after 2013, and later at Ferrari with understeery balance, his signature strength became a liability. He never fully adapted.",
    "Built his reputation on single-lap qualifying pace over race management. Four consecutive titles owe more to his Saturday than his Sunday.",
  ],
  highlights: ["pointy front end", "single-lap qualifying pace"],
  setupBars: [
    {
      leftLabel: "UNDERSTEER",
      rightLabel: "OVERSTEER",
      position: 72,
      annotation: "POINTY · ROTATES ON ENTRY",
      highlight: true,
    },
    {
      leftLabel: "SOFT",
      rightLabel: "STIFF",
      position: 62,
      annotation: "STIFF · KERB-RESPONSIVE",
    },
    {
      leftLabel: "LOW AERO",
      rightLabel: "HIGH AERO",
      position: 78,
      annotation: "HIGH DOWNFORCE PREFERRED",
    },
  ],
  excelledAt: [
    "Single-lap qualifying pace",
    "High-downforce circuits (Suzuka, Singapore)",
    "Dry conditions with consistent grip",
  ],
  struggledWith: [
    "Understeery car balance",
    "Tyre degradation management",
    "Close wheel-to-wheel pressure",
  ],
};

/* ─── Leclerc ──────────────────────────────────────────────────────────────── */

export const leclerc: Driver = {
  id: "leclerc",
  name: "Charles Leclerc",
  shortName: "Leclerc",
  initials: "CL",
  nationality: "Monégasque",
  dob: "1997-10-16",
  status: "active",
  series: ["f1"],
  peakEraTeamId: "ferrari",
  entityColor: "leclerc",
  bio: "Ferrari's lead driver and one of the fastest qualifiers of his generation. Rose through Prema's F2 academy, won the 2017 F2 title, and became the youngest Ferrari driver to win multiple races.",
  quote: "Qualifying is where I feel most alive on the circuit.",
  quoteContext: "Ferrari press day, 2023",
};

export const leclerStats: DriverStats = {
  driverId: "leclerc",
  series: "f1",
  titles: 0,
  wins: 8,
  poles: 33,
  podiums: 52,
  careerSpan: "2018–present",
  racesEntered: 176,
  fastestLaps: 8,
  pointsScored: 1672,
};

export const leclerSignature: DrivingSignature = {
  driverId: "leclerc",
  series: "f1",
  axes: [
    { label: "Steering Smoothness", value: 82 },
    { label: "Entry Aggression", value: 92 },
    { label: "Tyre Management", value: 76 },
    { label: "Throttle Application", value: 88 },
    { label: "Braking", value: 95 },
    { label: "Consistency", value: 80 },
  ],
  cohortAverage: [78, 73, 74, 79, 80, 76],
  confidenceScore: 0.88,
  sampleSize: 892,
};

/* ─── Bearman ──────────────────────────────────────────────────────────────── */

export const bearman: Driver = {
  id: "bearman",
  name: "Oliver Bearman",
  shortName: "Bearman",
  initials: "OB",
  nationality: "British",
  dob: "2005-05-08",
  status: "active",
  series: ["f2", "f1"],
  peakEraTeamId: "prema",
  entityColor: "ferrari", // Ferrari Driver Academy — red portrait glow
  bio: "Ferrari Driver Academy graduate. Won F4 Italy before progressing through Prema's F3 and F2 programs. Made his F1 debut for Ferrari at Jeddah 2024 as a last-minute Sainz substitute, scoring points on debut.",
  quote:
    "Two F3 wins at 17. F2 podium debut at 18. F1 debut for Ferrari at 18 after a last-minute Sainz appendicitis.",
};

export const bearmanStats: DriverStats = {
  driverId: "bearman",
  series: "f2",
  titles: 0,
  wins: 3,
  poles: 2,
  podiums: 9,
  careerSpan: "2020–present",
  racesEntered: 58,
};

export const bearmanEras: DriverEra[] = [
  {
    driverId: "bearman",
    teamId: "prema-f4",
    teamName: "F4 Italy",
    seasons: "2020–21",
    highlights: ["F4 Italy Champion 2021", "5 wins in title-winning season"],
    titles: 1,
    wins: 5,
    teamLiveryHex: "#00E5FF",
    teamAccentHex: "#FFD700",
    statLabel: "TITLE",
  },
  {
    driverId: "bearman",
    teamId: "prema-f3",
    teamName: "F3 · Prema",
    seasons: "2022",
    highlights: ["P3 F3 Championship", "2 race wins"],
    titles: 0,
    wins: 2,
    teamLiveryHex: "#B026FF",
    statLabel: "P3",
  },
  {
    driverId: "bearman",
    teamId: "prema-f2",
    teamName: "F2 · Prema",
    seasons: "2023–24",
    highlights: ["3 F2 race wins", "P4 in 2024 championship"],
    titles: 0,
    wins: 3,
    teamLiveryHex: "#00E5FF",
    statLabel: "P4",
  },
  {
    driverId: "bearman",
    teamId: "haas",
    teamName: "F1 · Haas",
    seasons: "2024–present",
    highlights: ["F1 debut Jeddah 2024 · P7 · 6 pts (Ferrari sub)", "Full Haas season 2025 · 62 points", "Career-best P4 Mexico City GP 2025", "30 F1 starts as of Japanese GP 2026"],
    titles: 0,
    wins: 0,
    teamLiveryHex: "#DC0000",
    teamAccentHex: "#FFD700",
    statLabel: "F1",
  },
];

export const bearmanSignature: DrivingSignature = {
  driverId: "bearman",
  series: "f2",
  axes: [
    { label: "Steering Smoothness", value: 82 },
    { label: "Entry Discipline", value: 80 },
    { label: "Tyre Management", value: 50 },
    { label: "Race Craft", value: 80 },
    { label: "Quali Pace", value: 75 },
    { label: "Consistency", value: 60 },
  ],
  cohortAverage: [60, 70, 70, 68, 70, 70],
  confidenceScore: 0.62,
  sampleSize: 134,
};

export const bearmanReelSlides: ReelSlide[] = [
  {
    slotLabel: "JEDDAH · 2024",
    badge: "F2 WIN",
    glowColor: "#00E5FF",
    kicker: "F2 · PREMA · SPRINT WIN",
    headline: "Jeddah sprint",
    meta: "2024 · +4.2s MARGIN",
    svgPath:
      "M 30 160 L 90 160 Q 112 148 130 100 L 180 100 Q 210 116 230 160 L 290 160 Q 310 144 325 104 L 370 100",
  },
  {
    slotLabel: "JEDDAH · 2024",
    badge: "F1 DEBUT",
    glowColor: "#DC0000",
    kicker: "FERRARI · SUBSTITUTE · JEDDAH",
    headline: "F1 debut",
    meta: "P7 · 6 POINTS · FERRARI",
    svgPath:
      "M 30 162 L 90 160 Q 112 148 130 102 L 180 100 Q 210 116 230 162 L 290 162 Q 310 144 325 104 L 370 100",
  },
  {
    slotLabel: "MONZA · 2024",
    badge: "F2 WIN",
    glowColor: "#00E5FF",
    kicker: "F2 · PREMA · FEATURE WIN",
    headline: "Monza feature",
    meta: "2024 · FEATURE RACE WIN",
    svgPath:
      "M 30 160 Q 70 148 110 160 L 170 160 Q 200 148 240 160 L 300 160 Q 330 148 370 160",
  },
  {
    slotLabel: "ITALIA · 2021",
    badge: "TITLE",
    glowColor: "#FFD700",
    kicker: "F4 ITALY · PREMA · CHAMPION",
    headline: "F4 champion",
    meta: "5 WINS · 2021 SEASON",
    svgPath:
      "M 30 160 L 90 160 Q 112 148 130 100 L 180 100 Q 210 116 230 160 L 290 160 Q 312 148 330 100 L 370 100",
    circles: [{ cx: 200, cy: 140, r: 5, fill: "#FFD700" }],
  },
];

export const bearmanScoutingReport: ScoutingReport = {
  paragraphs: [
    "Bearman's defining characteristic is composure under extreme pressure. His Jeddah F1 debut with Ferrari — zero preparation, no free practice, stepping in for Sainz hours before qualifying — produced a points finish that told you everything about his mental architecture.",
    "In F2, he gravitates toward a neutral-to-mild-understeer balance. Entry discipline is high — he commits early and trusts the front to hold. Where he gives time is tyre management in the second stint, characteristic of F3 graduates still building tyre sensitivity at F2 speeds.",
  ],
  highlights: ["composure under extreme pressure", "Entry discipline", "Jeddah F1 debut"],
  setupBars: [
    {
      leftLabel: "UNDERSTEER",
      rightLabel: "OVERSTEER",
      position: 45,
      annotation: "NEUTRAL · SLIGHT US TOLERANCE",
    },
    {
      leftLabel: "SOFT",
      rightLabel: "STIFF",
      position: 50,
      annotation: "MID-RANGE · ADAPTS TO CIRCUIT",
    },
    {
      leftLabel: "LOW AERO",
      rightLabel: "HIGH AERO",
      position: 62,
      annotation: "HIGH-DF · QUALI-ORIENTED",
      highlight: true,
    },
  ],
  excelledAt: [
    "High-pressure debut situations",
    "Clean entry discipline and commitment",
    "Single-lap qualifying pace",
  ],
  struggledWith: [
    "Tyre degradation in long stints",
    "F2 consistency across full season",
  ],
};

export const bearmanTrajectory: TrajectoryPrediction = {
  driverId: "bearman",
  series: "f2",
  generatedAt: "2024-03-01",
  confidenceTier: "HIGH",
  sampleSize: 847,
  trainingDataRange: "2010–2024",
  outcomes: [
    { destination: "F1", probability: 0.62 },
    { destination: "WEC", probability: 0.18 },
    { destination: "IndyCar", probability: 0.11 },
    { destination: "Other", probability: 0.09 },
  ],
  cohortAnalogs: [
    {
      driverId: "leclerc",
      driverName: "Charles Leclerc",
      matchPercentage: 84,
      era: "2017",
      academy: "Ferrari",
      destination: "F1",
      currentStatus: "F1 Ferrari",
    },
    {
      driverId: "piastri",
      driverName: "Oscar Piastri",
      matchPercentage: 79,
      era: "2021",
      academy: "Alpine",
      destination: "F1",
      currentStatus: "F1 McLaren",
    },
    {
      driverId: "vesti",
      driverName: "Frederik Vesti",
      matchPercentage: 71,
      era: "2023",
      academy: "Mercedes",
      destination: "WEC",
      currentStatus: "FE · WEC",
    },
    {
      driverId: "aitken",
      driverName: "Jack Aitken",
      matchPercentage: 58,
      era: "2019",
      academy: "Williams Dev",
      destination: "WEC",
      currentStatus: "WEC GTE",
    },
  ],
  featureWeights: [
    {
      feature: "FDA membership + strong F3 → F2 transition",
      direction: "positive",
      weight: 18,
      humanReadableValue: "+18% F1 LIKELIHOOD",
    },
    {
      feature: "CV signature matches multiple F1-bound analogs",
      direction: "positive",
      weight: 14,
      humanReadableValue: "+14%",
    },
    {
      feature: "F1 substitute appearance (Jeddah 2024)",
      direction: "positive",
      weight: 11,
      humanReadableValue: "+11%",
    },
    {
      feature: "F2 championship not won (P4 2024)",
      direction: "negative",
      weight: 7,
      humanReadableValue: "−7% vs title-winning analogs",
    },
    {
      feature: "Grid spot availability (chassis competition)",
      direction: "negative",
      weight: 4,
      humanReadableValue: "−4%",
    },
  ],
  statusLabel: "RESOLVED · HAAS F1 2025–26",
  calibrationNote:
    "Model computed March 2024 prior to Bearman's Haas contract. Now in his second F1 season (2026): 30 starts, 62 points, P4 career-best at Mexico City 2025. Preserved to show model calibration against a confirmed outcome.",
};

/* ─── Vettel lap picker data ─────────────────────────────────────────────────── */

export const vettelFeaturedLaps: FeaturedLap[] = [
  {
    id: "vtl-monaco-2011-q3",
    badges: [
      { label: "POLE", color: "#FFD700" },
      { label: "FEATURED", color: "#FF1E56" },
    ],
    kicker: "2011 · MONACO · Q3",
    headline: "Monaco pole lap",
    meta: "1:13.556 · RED BULL RB7",
    glowColor: "#1E3A8A",
    borderColor: "#1E3A8A",
    svgPath:
      "M 30 140 L 60 140 Q 75 130, 85 90 L 120 90 Q 140 105, 155 140 L 195 140 Q 215 155, 230 195 L 260 198 Q 275 180, 290 140 L 330 140 Q 345 120, 360 80 L 380 80",
    svgViewBox: "0 0 400 250",
    featured: true,
    era: "'09–'14 RB",
    conditions: "dry",
    sessionType: "qualifying",
  },
  {
    id: "vtl-monza-2008-q3",
    badges: [{ label: "FIRST POLE", color: "#FFD700" }],
    kicker: "2008 · MONZA",
    headline: "Youngest pole-sitter",
    meta: "1:37.555 · TORO ROSSO",
    glowColor: "#E60000",
    borderColor: "#2a1500",
    svgPath:
      "M 30 120 L 90 120 Q 112 108, 130 70 L 180 70 Q 210 88, 230 120 L 290 120 Q 310 104, 325 72 L 370 72",
    era: "'07–'08 TR",
    conditions: "dry",
    sessionType: "qualifying",
  },
  {
    id: "vtl-abudhabi-2010-q3",
    badges: [{ label: "TITLE DECIDER", color: "#FFD700" }],
    kicker: "2010 · ABU DHABI",
    headline: "First WDC secured",
    meta: "1:39.394 · RED BULL",
    glowColor: "#1E3A8A",
    borderColor: "#1a2847",
    svgPath:
      "M 30 120 Q 60 110, 85 85 L 145 85 Q 175 98, 195 120 L 255 120 Q 285 105, 310 80 L 370 80",
    era: "'09–'14 RB",
    conditions: "dry",
    sessionType: "qualifying",
  },
  {
    id: "vtl-malaysia-2012-race",
    badges: [{ label: "MIXED", color: "#00E5FF" }],
    kicker: "2012 · MALAYSIA",
    headline: "Wet-dry masterclass",
    meta: "+0.6 TO TEAMMATE",
    glowColor: "#1E3A8A",
    borderColor: "#1a2847",
    svgPath:
      "M 30 120 L 75 120 Q 95 108, 110 75 L 160 75 Q 180 90, 195 120 L 240 120 Q 260 135, 275 165 L 320 165 Q 340 140, 355 120",
    era: "'09–'14 RB",
    conditions: "mixed",
    sessionType: "race",
  },
  {
    id: "vtl-singapore-2013-race",
    badges: [{ label: "WIN", color: "#FFD700" }],
    kicker: "2013 · SINGAPORE",
    headline: "Peak dominance",
    meta: "+32.6s MARGIN",
    glowColor: "#1E3A8A",
    borderColor: "#1a2847",
    svgPath:
      "M 30 120 Q 65 110, 95 80 L 150 80 Q 180 95, 205 120 L 255 120 Q 285 138, 310 170 L 370 170",
    era: "'09–'14 RB",
    conditions: "dry",
    sessionType: "race",
  },
];

export const vettelLapRecords: LapRecord[] = [
  {
    id: "vtl-suzuka-2009-q3",
    year: 2009,
    track: "Suzuka · Japan",
    team: "Red Bull",
    teamColor: "#1E3A8A",
    session: "QUALI Q3",
    sessionType: "qualifying",
    conditions: "dry",
    era: "'09–'14 RB",
    timeMs: 92160,
    timeFormatted: "1:32.160",
    result: "POLE · WIN",
    resultColor: "#FFD700",
  },
  {
    id: "vtl-silverstone-2010-q3",
    year: 2010,
    track: "Silverstone · UK",
    team: "Red Bull",
    teamColor: "#1E3A8A",
    session: "QUALI Q3",
    sessionType: "qualifying",
    conditions: "dry",
    era: "'09–'14 RB",
    timeMs: 89615,
    timeFormatted: "1:29.615",
    result: "POLE",
    resultColor: "#FFD700",
  },
  {
    id: "vtl-spa-2013-race",
    year: 2013,
    track: "Spa · Belgium",
    team: "Red Bull",
    teamColor: "#1E3A8A",
    session: "RACE L42",
    sessionType: "race",
    conditions: "dry",
    era: "'09–'14 RB",
    timeMs: 110756,
    timeFormatted: "1:50.756",
    result: "WIN",
    resultColor: "#FFD700",
  },
  {
    id: "vtl-buddh-2013-q3",
    year: 2013,
    track: "Buddh · India",
    team: "Red Bull",
    teamColor: "#1E3A8A",
    session: "QUALI Q3",
    sessionType: "qualifying",
    conditions: "dry",
    era: "'09–'14 RB",
    timeMs: 84119,
    timeFormatted: "1:24.119",
    result: "POLE · WDC4",
    resultColor: "#FFD700",
  },
  {
    id: "vtl-hungaroring-2015-race",
    year: 2015,
    track: "Hungaroring",
    team: "Ferrari",
    teamColor: "#DC0000",
    session: "RACE L69",
    sessionType: "race",
    conditions: "dry",
    era: "'15–'20 FER",
    timeMs: 84921,
    timeFormatted: "1:24.921",
    result: "WIN",
    resultColor: "#FFD700",
  },
  {
    id: "vtl-baku-2017-race",
    year: 2017,
    track: "Baku · Azerbaijan",
    team: "Ferrari",
    teamColor: "#DC0000",
    session: "RACE L22",
    sessionType: "race",
    conditions: "dry",
    era: "'15–'20 FER",
    timeMs: 103882,
    timeFormatted: "1:43.882",
    result: "P4",
    resultColor: "#aaa",
  },
  {
    id: "vtl-montreal-2019-race",
    year: 2019,
    track: "Montreal · Canada",
    team: "Ferrari",
    teamColor: "#DC0000",
    session: "RACE L48",
    sessionType: "race",
    conditions: "dry",
    era: "'15–'20 FER",
    timeMs: 73078,
    timeFormatted: "1:13.078",
    result: "P2 · CONTESTED",
    resultColor: "#aaa",
  },
  {
    id: "vtl-baku-2021-race",
    year: 2021,
    track: "Baku · Azerbaijan",
    team: "Aston Martin",
    teamColor: "#006F62",
    session: "RACE L49",
    sessionType: "race",
    conditions: "dry",
    era: "'21–'22 AM",
    timeMs: 106114,
    timeFormatted: "1:46.114",
    result: "P2 PODIUM",
    resultColor: "#FFD700",
  },
];

export const vettelSuzuka2009Analysis: LapAnalysis = {
  lapId: "vtl-suzuka-2009-q3",
  headline: "Suzuka · 2009 · Q3",
  narrative: "The lap that defined Vettel as a qualifying weapon. Held off his championship-rival teammate. Converted pole into a race win the next day.",
  metaLine: "RED BULL RB5 · DRY · POLE POSITION · WIN",
  lapTimeFormatted: "1:32.160",
  lapTimeMs: 92160,
  lapTimeSub: "POLE · +0.000",
  vTeammate: "+0.122",
  vTeammateSub: "FASTER THAN WEBBER",
  topSpeedKmh: 307,
  topSpeedSub: "MAIN STRAIGHT",
  avgThrottlePct: 71,
  avgThrottleSub: "FULL-THROTTLE 64% OF LAP",
  racingLinePath: "M 40 230 L 110 230 Q 125 228, 135 220 L 170 200 Q 185 188, 195 175 L 220 150 Q 235 135, 240 120 L 245 95 Q 245 80, 235 75 L 215 70 Q 200 70, 195 82 L 190 100 Q 190 115, 195 125 L 210 145 Q 220 155, 225 170 L 225 195 Q 220 210, 205 215 L 165 225 Q 140 225, 120 215 L 95 195 Q 85 180, 80 160 L 80 130 Q 85 110, 100 100 L 140 75 Q 160 65, 180 65 L 265 60 Q 290 60, 305 72 L 325 92 Q 335 110, 335 128 L 335 170 Q 330 190, 315 200 L 285 215 Q 265 222, 250 230 L 230 245 Q 215 258, 200 260 L 115 262 Q 85 262, 70 252 L 50 240 Q 40 235, 40 230 Z",
  trackLengthM: 5807,
  sectors: [
    { label: "SECTOR 1", time: "30.421", status: "FASTEST IN SESSION", delta: "−0.068 vs field", positive: true },
    { label: "SECTOR 2", time: "36.890", status: "P2 · TECHNICAL", delta: "+0.044 vs field", positive: false },
    { label: "SECTOR 3", time: "24.849", status: "FASTEST IN SESSION", delta: "−0.098 vs field", positive: true },
  ],
  sectorObservation: "Sectors 1 and 3 fastest in session. Sector 2 (hairpin + Degner complex) gave up a fraction — consistent with Vettel's pointy front-end setup being less optimal for slow technical corners.",
  telemetry: [
    {
      label: "STEERING",
      color: "#FFD700",
      svgPath: "M 0 25 L 40 25 Q 55 18, 75 6 L 120 6 Q 140 13, 155 25 L 195 25 Q 210 32, 225 44 L 250 44 Q 265 37, 280 25 L 320 25 Q 335 18, 350 8 L 390 8 Q 405 15, 420 25 L 455 25 Q 470 32, 485 41 L 515 41 Q 530 33, 545 25 L 585 25 Q 600 18, 615 10 L 655 10 Q 670 17, 685 25 L 720 25 Q 735 32, 750 42 L 800 42",
    },
    {
      label: "BRAKE",
      color: "#FF1E56",
      svgPath: "M 0 42 L 55 42 L 58 10 L 82 10 L 85 42 L 150 42 L 153 18 L 200 18 L 203 42 L 275 42 L 278 15 L 310 15 L 313 42 L 390 42 L 393 12 L 430 12 L 433 42 L 500 42 L 503 24 L 545 24 L 548 42 L 625 42 L 628 15 L 665 15 L 668 42 L 735 42 L 738 25 L 780 25 L 783 42 L 800 42",
    },
    {
      label: "THROTTLE",
      color: "#5FB87C",
      svgPath: "M 0 8 L 52 8 L 60 40 L 85 40 L 95 8 L 148 8 L 155 36 L 205 36 L 215 8 L 275 8 L 282 35 L 315 35 L 325 8 L 388 8 L 395 32 L 435 32 L 445 8 L 498 8 L 505 35 L 550 35 L 560 8 L 622 8 L 630 32 L 670 32 L 680 8 L 733 8 L 740 33 L 785 33 L 795 8 L 800 8",
    },
    {
      label: "SPEED",
      color: "#378ADD",
      svgPath: "M 0 13 Q 30 12, 55 18 L 80 36 Q 85 38, 95 27 L 145 12 Q 155 12, 158 20 L 200 33 Q 210 35, 215 25 L 275 10 Q 285 13, 288 23 L 315 35 Q 325 37, 330 27 L 388 12 Q 398 13, 400 22 L 435 33 Q 445 35, 450 25 L 500 12 Q 510 13, 512 25 L 550 33 Q 560 35, 565 25 L 625 12 Q 635 13, 638 23 L 670 32 Q 680 34, 685 24 L 738 12 Q 748 13, 750 25 L 788 33 Q 798 35, 800 25",
    },
  ],
  moments: [
    { id: "m1", label: "T1–2 ESSES", timestamp: "00:04.8", jumpPct: 5, description: "Took T1 slightly wider than reference — traded entry speed for exit line through T2", stat: "+0.04 through esses", accent: "gold" },
    { id: "m2", label: "S CURVES", timestamp: "00:18.2", jumpPct: 20, description: "Full-throttle through the S — no lift, clean single-input arcs", stat: "0 corrections · signature pattern", accent: "gold" },
    { id: "m3", label: "DEGNER 1", timestamp: "00:28.4", jumpPct: 31, description: "Late brake — 18m later than reference. Risked lockup to carry entry speed", stat: "+0.07 vs session avg", accent: "red" },
    { id: "m4", label: "HAIRPIN", timestamp: "00:58.1", jumpPct: 63, description: "Small understeer correction mid-corner — lost time on a technically demanding slow section", stat: "−0.05 vs teammate here", accent: "red" },
    { id: "m5", label: "SPOON CURVE", timestamp: "01:08.9", jumpPct: 75, description: "Double-apex line — picked up throttle 0.3s earlier than reference. Key time gained.", stat: "+0.12 through spoon", accent: "gold" },
    { id: "m6", label: "130R", timestamp: "01:18.6", jumpPct: 86, description: "Flat through 130R — no lift detected. Only 4 drivers managed it that session.", stat: "307 km/h apex", accent: "gold" },
  ],
  framesAnalyzed: 847,
  processingTimeS: 4.2,
  videoSource: "OFFICIAL F1 CHANNEL",
};

export const vettelWebberSuzuka2009: LapComparisonData = {
  id: "vtl-suzuka-2009-q3-vs-web-suzuka-2009-q3",
  title: "Suzuka · 2009 · Q3",
  subtitle: "Vettel vs. Webber",
  description: "Same car. Same session. Same track. The gap was 0.122 seconds — here's where it came from.",
  colorA: "#FF1E56",
  colorB: "#00E5FF",
  lapA: {
    name: "Sebastian Vettel",
    teamName: "Red Bull",
    teamColor: "#1E3A8A",
    lapTime: "1:32.160",
    lapTimeMs: 92160,
    result: "P1",
    resultColor: "#FFD700",
    meta: "Q3 · DRY · POLE · WIN",
    sectors: [
      { label: "S1", time: "30.421" },
      { label: "S2", time: "36.890" },
      { label: "S3", time: "24.849" },
    ],
  },
  lapB: {
    name: "Mark Webber",
    teamName: "Red Bull",
    teamColor: "#1E3A8A",
    lapTime: "1:32.282",
    lapTimeMs: 92282,
    result: "P2 · +0.122",
    resultColor: "#888",
    meta: "Q3 · DRY · TEAMMATE",
    sectors: [
      { label: "S1", time: "30.489" },
      { label: "S2", time: "36.846" },
      { label: "S3", time: "24.947" },
    ],
  },
  deltaPath: "M 0 90 L 50 85 L 100 75 L 150 68 L 200 62 L 264 58 L 320 66 L 380 74 L 430 82 L 480 88 L 540 100 L 600 108 L 650 96 L 700 80 L 750 66 L 800 58",
  deltaInsights: [
    { label: "DEGNER COMPLEX", description: "Vettel gained 0.16s with a committed late-brake entry", note: "BIGGEST SINGLE GAIN", winner: "a" },
    { label: "HAIRPIN TO S2 EXIT", description: "Webber clawed back 0.10s through slow-corner section", note: "VETTEL'S WEAK POINT", winner: "b" },
    { label: "SPOON → 130R", description: "Vettel reopened the gap through fast sweepers · +0.08s", note: "DECISIVE FINAL SECTOR", winner: "a" },
  ],
  circuitPath: "M 40 232 L 110 232 Q 125 230, 135 222 L 170 202 Q 185 190, 195 177 L 220 152 Q 235 137, 240 122 L 245 97 Q 245 82, 235 77 L 215 72 Q 200 72, 195 84 L 190 102 Q 190 117, 195 127 L 210 147 Q 220 157, 225 172 L 225 197 Q 220 212, 205 217 L 165 227 Q 140 227, 120 217 L 95 197 Q 85 182, 80 162 L 80 132 Q 85 112, 100 102 L 140 77 Q 160 67, 180 67 L 265 62 Q 290 62, 305 74 L 325 94 Q 335 112, 335 130 L 335 172 Q 330 192, 315 202 L 285 217 Q 265 224, 250 232 L 230 247 Q 215 260, 200 262 L 115 264 Q 85 264, 70 254 L 50 242 Q 40 237, 40 232 Z",
  linePathA: "M 40 230 L 110 230 Q 125 228, 135 220 L 170 200 Q 185 188, 195 175 L 220 150 Q 235 135, 240 120 L 245 95 Q 245 80, 235 75 L 215 70 Q 200 70, 195 82 L 190 100 Q 190 115, 195 125 L 210 145 Q 220 155, 225 170 L 225 195 Q 220 210, 205 215 L 165 225 Q 140 225, 120 215 L 95 195 Q 85 180, 80 160 L 80 130 Q 85 110, 100 100 L 140 75 Q 160 65, 180 65 L 265 60 Q 290 60, 305 72 L 325 92 Q 335 110, 335 128 L 335 170 Q 330 190, 315 200 L 285 215 Q 265 222, 250 230 L 230 245 Q 215 258, 200 260 L 115 262 Q 85 262, 70 252 L 50 240 Q 40 235, 40 230 Z",
  linePathB: "M 42 232 L 112 232 Q 128 230, 140 223 L 175 205 Q 190 193, 200 181 L 224 156 Q 238 141, 243 126 L 247 100 Q 246 84, 236 80 L 217 74 Q 202 74, 198 87 L 194 104 Q 194 118, 199 128 L 214 150 Q 224 161, 229 176 L 229 198 Q 225 213, 210 218 L 168 226 Q 143 225, 123 215 L 98 198 Q 88 184, 84 164 L 84 133 Q 88 114, 103 105 L 142 79 Q 162 69, 182 69 L 266 64 Q 290 64, 304 77 L 324 97 Q 333 114, 333 131 L 333 173 Q 328 193, 313 203 L 283 217 Q 263 224, 248 232 L 228 246 Q 213 260, 198 262 L 114 263 Q 85 264, 70 255 L 51 243 Q 42 237, 42 232 Z",
  lineAnnotations: [
    { cx: 245, cy: 95, winner: "a", label: "DEGNER · +0.16", textAnchor: "start", dx: 7, dy: -3 },
    { cx: 300, cy: 72, winner: "b", label: "HAIRPIN · −0.10", textAnchor: "start", dx: 7, dy: -4 },
    { cx: 335, cy: 170, winner: "a", label: "SPOON · +0.08", textAnchor: "end", dx: -7, dy: 18 },
  ],
  divergence: { maxM: 2.1, maxLocation: "T1", avgM: 0.7, overlapPct: 74, note: "MAXIMUM DIVERGENCE AT T1 — VETTEL 2.1 m TIGHTER INSIDE LINE · 74% IDENTICAL RACING LINE ACROSS FULL CIRCUIT" },
  divergenceDescription: "Vettel carried a tighter inside line through the fast corners, turning earlier and relying on the Red Bull's rear-end rotation. Webber stayed more conservative — wider entries, later apex, prioritizing traction over minimum radius.",
  overlayTraces: [
    {
      label: "STEERING",
      pathA: "M 0 30 L 40 30 Q 55 22, 75 8 L 120 8 Q 140 16, 155 30 L 195 30 Q 210 38, 225 52 L 250 52 Q 265 44, 280 30 L 320 30 Q 335 22, 350 10 L 390 10 Q 405 18, 420 30 L 455 30 Q 470 38, 485 48 L 515 48 Q 530 40, 545 30 L 585 30 Q 600 22, 615 12 L 655 12 Q 670 20, 685 30 L 720 30 Q 735 38, 750 50 L 800 50",
      pathB: "M 0 30 L 42 30 Q 58 24, 76 12 L 122 12 Q 142 18, 157 30 L 197 30 Q 213 38, 228 50 L 252 50 Q 268 44, 282 30 L 322 30 Q 338 24, 352 14 L 392 14 Q 408 20, 422 30 L 457 30 Q 472 38, 487 46 L 517 46 Q 532 40, 547 30 L 587 30 Q 602 24, 618 16 L 657 16 Q 672 22, 687 30 L 722 30 Q 737 38, 752 48 L 800 48",
    },
    {
      label: "BRAKE",
      pathA: "M 0 50 L 55 50 L 58 12 L 82 12 L 85 50 L 150 50 L 153 22 L 200 22 L 203 50 L 275 50 L 278 18 L 310 18 L 313 50 L 390 50 L 393 14 L 430 14 L 433 50 L 500 50 L 503 28 L 545 28 L 548 50 L 625 50 L 628 18 L 665 18 L 668 50 L 735 50 L 738 30 L 780 30 L 783 50 L 800 50",
      pathB: "M 0 50 L 50 50 L 54 18 L 80 18 L 84 50 L 148 50 L 152 26 L 202 26 L 206 50 L 270 50 L 274 22 L 312 22 L 316 50 L 386 50 L 390 18 L 432 18 L 436 50 L 498 50 L 502 32 L 547 32 L 551 50 L 622 50 L 626 22 L 667 22 L 671 50 L 733 50 L 737 34 L 782 34 L 786 50 L 800 50",
    },
    {
      label: "THROTTLE",
      pathA: "M 0 10 L 52 10 L 60 48 L 85 48 L 95 10 L 148 10 L 155 44 L 205 44 L 215 10 L 275 10 L 282 42 L 315 42 L 325 10 L 388 10 L 395 38 L 435 38 L 445 10 L 498 10 L 505 42 L 550 42 L 560 10 L 622 10 L 630 38 L 670 38 L 680 10 L 733 10 L 740 40 L 785 40 L 795 10 L 800 10",
      pathB: "M 0 12 L 48 12 L 58 46 L 82 46 L 92 14 L 146 14 L 156 42 L 208 42 L 218 14 L 272 14 L 284 40 L 318 40 L 328 14 L 385 14 L 397 36 L 438 36 L 448 14 L 495 14 L 507 40 L 552 40 L 562 14 L 620 14 L 632 36 L 672 36 L 682 14 L 730 14 L 742 38 L 788 38 L 798 14 L 800 14",
    },
    {
      label: "SPEED",
      pathA: "M 0 15 Q 30 14, 55 22 L 80 44 Q 85 46, 95 32 L 145 14 Q 155 14, 158 24 L 200 40 Q 210 42, 215 30 L 275 12 Q 285 16, 288 28 L 315 42 Q 325 44, 330 32 L 388 14 Q 398 16, 400 26 L 435 40 Q 445 42, 450 30 L 500 14 Q 510 16, 512 30 L 550 40 Q 560 42, 565 30 L 625 14 Q 635 16, 638 28 L 670 38 Q 680 40, 685 28 L 738 14 Q 748 16, 750 30 L 788 40 Q 798 42, 800 30",
      pathB: "M 0 17 Q 32 16, 56 24 L 78 42 Q 82 44, 94 30 L 146 16 Q 156 16, 160 26 L 202 38 Q 212 40, 218 28 L 276 14 Q 286 18, 290 28 L 316 40 Q 326 42, 332 30 L 390 16 Q 398 18, 402 26 L 436 38 Q 446 40, 452 28 L 502 16 Q 510 18, 514 28 L 552 38 Q 562 40, 568 28 L 628 16 Q 636 18, 640 28 L 672 36 Q 682 38, 688 28 L 740 16 Q 750 18, 754 28 L 790 38 Q 798 40, 800 28",
    },
  ],
  sectors: [
    {
      label: "SECTOR 1",
      winnerLabel: "VETTEL +0.068",
      winnerColor: "#FF1E56",
      lapA: { time: "30.421", barWidth: 92 },
      lapB: { time: "30.489", barWidth: 88 },
      keyNote: "KEY: T1 ENTRY · ESSES COMMIT",
    },
    {
      label: "SECTOR 2",
      winnerLabel: "WEBBER −0.044",
      winnerColor: "#00E5FF",
      lapA: { time: "36.890", barWidth: 85 },
      lapB: { time: "36.846", barWidth: 87 },
      keyNote: "KEY: HAIRPIN · DEGNER EXIT",
    },
    {
      label: "SECTOR 3",
      winnerLabel: "VETTEL +0.098",
      winnerColor: "#FF1E56",
      lapA: { time: "24.849", barWidth: 94 },
      lapB: { time: "24.947", barWidth: 89 },
      keyNote: "KEY: SPOON · 130R COMMIT",
    },
  ],
  takeaway: [
    "Same car, same session, same tires — and yet 0.122 seconds apart. The gap came almost entirely from two corners: Degner 1, where Vettel's aggressive late-brake found a tenth Webber wouldn't risk, and Spoon, where Vettel's willingness to rotate the car earlier let him pick up throttle a fraction sooner.",
    "The hairpin told the other story: the slow, technical section where Webber's cleaner, more conservative style actually clawed time back. Over a lap, Vettel's high-risk, high-commitment approach won the aggregate — which is why he was the faster qualifier that year.",
  ],
  totalFrames: 1694,
};

/* ─── Hamilton ───────────────────────────────────────────────────────────────
   Stats verified via Jolpica API (April 2026):
   383 races · 105 wins · 117 poles · 203 podiums · 7× WDC
   ─────────────────────────────────────────────────────────────────────────── */

export const hamilton: Driver = {
  id: "hamilton",
  name: "Lewis Hamilton",
  shortName: "Hamilton",
  initials: "LH",
  nationality: "British",
  dob: "1985-01-07",
  status: "active",
  series: ["f1"],
  peakEraTeamId: "mercedes",
  entityColor: "mercedes",
  bio: "Seven-time world champion. The most decorated driver in Formula 1 history, with 105 wins and 117 pole positions. Dominated the hybrid era at Mercedes before moving to Ferrari for 2025.",
  quote: "I want to show that it doesn't matter where you come from — you can still be the greatest.",
  quoteContext: "British Grand Prix, 2021",
};

export const hamiltonStats: DriverStats = {
  driverId: "hamilton",
  series: "f1",
  titles: 7,
  wins: 105,
  poles: 117,
  podiums: 203,
  careerSpan: "2007–present",
  racesEntered: 383,
  fastestLaps: 67,
  pointsScored: 4862,
};

export const hamiltonEras: DriverEra[] = [
  {
    driverId: "hamilton",
    teamId: "mclaren",
    teamName: "McLaren",
    seasons: "2007–2012",
    highlights: [
      "2008 WDC — final-corner overtake in Brazil",
      "21 wins at McLaren including 2010 Turkey, 2012 US GP",
    ],
    titles: 1,
    wins: 21,
    teamLiveryHex: "#FF8000",
    statLabel: "1× WDC",
  },
  {
    driverId: "hamilton",
    teamId: "mercedes",
    teamName: "Mercedes",
    seasons: "2013–2024",
    highlights: [
      "Six WDC titles: 2014, 2015, 2017, 2018, 2019, 2020",
      "2020: 11 wins, equalled Schumacher's 7-title record",
      "103 wins in silver, defining the hybrid era",
    ],
    titles: 6,
    wins: 84,
    teamLiveryHex: "#00D2BE",
    teamAccentHex: "#FFD700",
    statLabel: "6× WDC",
  },
  {
    driverId: "hamilton",
    teamId: "ferrari",
    teamName: "Ferrari",
    seasons: "2025–",
    highlights: ["Joined Ferrari for 2025, seeking 8th WDC"],
    titles: 0,
    wins: 0,
    teamLiveryHex: "#DC0000",
    statLabel: "ONGOING",
  },
];

export const hamiltonSignature: DrivingSignature = {
  driverId: "hamilton",
  series: "f1",
  axes: [
    { label: "Steering Smoothness",   value: 96 },
    { label: "Entry Aggression",      value: 87 },
    { label: "Tyre Management",       value: 97 },
    { label: "Throttle Application",  value: 91 },
    { label: "Braking",               value: 96 },
    { label: "Consistency",           value: 95 },
  ],
  cohortAverage: [78, 73, 74, 79, 80, 76],
  confidenceScore: 0.96,
  sampleSize: 2847,
};

export const hamiltonReelSlides: ReelSlide[] = [
  {
    slotLabel: "LH · 44",
    badge: "TITLE #1",
    glowColor: "#FF8000",
    kicker: "2008 · BRAZIL · FINAL CORNER",
    headline: "Interlagos",
    meta: "MCLAREN · 5TH PLACE SEALS WDC ON LAST LAP",
    svgPath: "M 30 160 L 80 160 Q 100 145, 115 110 L 165 110 Q 185 128, 200 160 L 250 160 Q 270 175, 285 205 L 330 205 Q 350 182, 370 155",
  },
  {
    slotLabel: "LH · 44",
    badge: "TITLE #2",
    glowColor: "#00D2BE",
    kicker: "2014 · ABU DHABI · FIRST MERCEDES WDC",
    headline: "Abu Dhabi",
    meta: "MERCEDES · 11 WINS · DOMINANT DEBUT SEASON",
    svgPath: "M 30 120 Q 58 108, 80 80 L 140 80 Q 168 96, 188 120 L 248 120 Q 278 104, 302 76 L 360 76",
  },
  {
    slotLabel: "LH · 44",
    badge: "TITLE #7",
    glowColor: "#00D2BE",
    kicker: "2020 · ISTANBUL · EQUALLED SCHUMACHER",
    headline: "Istanbul Park",
    meta: "MERCEDES · 7TH TITLE · 11 WINS IN THE SEASON",
    svgPath: "M 30 150 L 78 150 Q 106 136, 126 98 L 172 98 Q 194 115, 210 150 L 262 150 Q 290 168, 314 200 L 368 200",
    circles: [{ cx: 172, cy: 98, r: 5, fill: "#FFD700" }],
  },
  {
    slotLabel: "LH · 44",
    badge: "117 POLES",
    glowColor: "#00D2BE",
    kicker: "ALL-TIME POLE RECORD",
    headline: "Mercedes Era",
    meta: "117 POLES · 2007–2024 · MOST IN F1 HISTORY",
    svgPath: "M 30 130 Q 65 118, 92 88 L 152 88 Q 180 102, 200 130 L 258 130 Q 288 112, 312 82 L 370 82",
  },
  {
    slotLabel: "LH · 44",
    badge: "FERRARI",
    glowColor: "#DC0000",
    kicker: "2025 · FERRARI · NEW CHAPTER",
    headline: "Scuderia Ferrari",
    meta: "2025–PRESENT · CHASING 8TH WDC",
    svgPath: "M 30 160 Q 68 148, 98 112 L 158 112 Q 186 130, 208 160 L 268 160 Q 298 178, 322 215 L 368 215",
  },
];

export const hamiltonScoutingReport: ScoutingReport = {
  paragraphs: [
    "Hamilton's driving style is defined by exceptional smoothness — low steering inputs, minimal tyre scrub, and a metronomic braking technique that allows him to carry maximum speed through corners while protecting his tyres. He is arguably the finest tyre manager in F1 history, regularly completing stints 15–20 laps longer than the strategic model predicted.",
    "At Mercedes he developed a preference for a neutral-to-slight understeer balance — trusting the front end to rotate naturally rather than forcing entry rotation. His late-braking ability is elite: he consistently trails the braking marker deeper than teammates and rivals, particularly at high-speed stops like Blanchimont and the Senna chicane.",
    "The move to Ferrari for 2025 represents the most scrutinised car change of the modern era. Early results suggest a period of adaptation to a fundamentally different aero philosophy, but Hamilton's feedback loop with engineers and his ability to develop a car over a season remain world-class.",
  ],
  highlights: ["tyre manager", "late-braking", "neutral-to-slight understeer"],
  setupBars: [
    { leftLabel: "UNDERSTEER", rightLabel: "OVERSTEER",    position: 38, annotation: "NEUTRAL — TRUSTS FRONT NATURALLY", highlight: false },
    { leftLabel: "SOFT",       rightLabel: "STIFF",        position: 42, annotation: "SOFTER THAN TEAMMATES",            highlight: false },
    { leftLabel: "LOW AERO",   rightLabel: "HIGH AERO",    position: 65, annotation: "DOWNFORCE FOR TYRE LONGEVITY",     highlight: true },
  ],
  excelledAt: [
    "Tyre management — consistently exceeding predicted stint lengths",
    "Late braking and trail-braking technique",
    "Wet-weather and variable condition races",
    "Race management from the front",
  ],
  struggledWith: [
    "High-rotation, pointy car balance",
    "Adapting to new car philosophies mid-career",
  ],
};

/* ─── Verstappen ─────────────────────────────────────────────────────────────
   Stats verified via Jolpica API (April 2026):
   236 races · 71 wins · 62 poles · 127 podiums · 4× WDC
   Jolpica ID: max_verstappen
   ─────────────────────────────────────────────────────────────────────────── */

export const verstappen: Driver = {
  id: "max_verstappen",
  name: "Max Verstappen",
  shortName: "Verstappen",
  initials: "MV",
  nationality: "Dutch",
  dob: "1997-09-30",
  status: "active",
  series: ["f1"],
  peakEraTeamId: "red_bull",
  entityColor: "red_bull",
  bio: "Four-time world champion. The defining driver of the late hybrid era — ferociously quick in all conditions with an aggressive entry style that redefined what was considered possible in modern F1.",
  quote: "I just give everything every single lap. That's all I know.",
  quoteContext: "Post-race, Bahrain 2023",
};

export const verstappenStats: DriverStats = {
  driverId: "max_verstappen",
  series: "f1",
  titles: 4,
  wins: 71,
  poles: 62,
  podiums: 127,
  careerSpan: "2015–present",
  racesEntered: 236,
  fastestLaps: 31,
  pointsScored: 3166,
};

export const verstappenEras: DriverEra[] = [
  {
    driverId: "max_verstappen",
    teamId: "toro_rosso",
    teamName: "Toro Rosso",
    seasons: "2015–2016",
    highlights: [
      "Youngest driver to start an F1 race (17 years, 166 days)",
      "First race win on Red Bull debut, Spain 2016 — youngest F1 winner ever",
    ],
    titles: 0,
    wins: 1,
    teamLiveryHex: "#C00000",
    statLabel: "1W",
  },
  {
    driverId: "max_verstappen",
    teamId: "red_bull",
    teamName: "Red Bull",
    seasons: "2016–",
    highlights: [
      "4× WDC: 2021, 2022, 2023, 2024",
      "2023: 19 wins — most in a single F1 season",
      "2022: 15 wins, first dominant championship",
      "71 wins and counting from Red Bull",
    ],
    titles: 4,
    wins: 70,
    teamLiveryHex: "#1E3A8A",
    teamAccentHex: "#FFD700",
    statLabel: "4× WDC",
  },
];

export const verstappenSignature: DrivingSignature = {
  driverId: "max_verstappen",
  series: "f1",
  axes: [
    { label: "Steering Smoothness",   value: 82 },
    { label: "Entry Aggression",      value: 98 },
    { label: "Tyre Management",       value: 84 },
    { label: "Throttle Application",  value: 95 },
    { label: "Braking",               value: 96 },
    { label: "Consistency",           value: 93 },
  ],
  cohortAverage: [78, 73, 74, 79, 80, 76],
  confidenceScore: 0.95,
  sampleSize: 2124,
};

export const verstappenReelSlides: ReelSlide[] = [
  {
    slotLabel: "MV · 33",
    badge: "1ST WIN",
    glowColor: "#1E3A8A",
    kicker: "2016 · SPAIN · YOUNGEST F1 RACE WINNER",
    headline: "Barcelona",
    meta: "RED BULL · 18 YEARS, 228 DAYS · DEBUT WIN",
    svgPath: "M 30 160 L 80 160 Q 100 145, 115 110 L 165 110 Q 185 128, 200 160 L 250 160 Q 270 172, 285 200 L 330 200 Q 350 178, 370 148",
  },
  {
    slotLabel: "MV · 33",
    badge: "TITLE #1",
    glowColor: "#1E3A8A",
    kicker: "2021 · ABU DHABI · FIRST WDC",
    headline: "Yas Marina",
    meta: "RED BULL · FINAL LAP OVERTAKE ON HAMILTON",
    svgPath: "M 30 120 Q 60 108, 84 78 L 144 78 Q 172 94, 192 120 L 252 120 Q 282 104, 306 74 L 366 74",
    circles: [{ cx: 252, cy: 120, r: 5, fill: "#FFD700" }],
  },
  {
    slotLabel: "MV · 1",
    badge: "15 WINS",
    glowColor: "#1E3A8A",
    kicker: "2022 · DOMINANT SEASON",
    headline: "Red Bull Era",
    meta: "454 POINTS · 15 WINS · WCC + WDC",
    svgPath: "M 30 150 L 80 150 Q 108 136, 128 98 L 178 98 Q 200 116, 216 150 L 268 150 Q 296 168, 320 202 L 374 202",
  },
  {
    slotLabel: "MV · 1",
    badge: "19 WINS",
    glowColor: "#1E3A8A",
    kicker: "2023 · RECORD-BREAKING SEASON",
    headline: "Historic",
    meta: "575 POINTS · 19 WINS · MOST IN A SINGLE SEASON",
    svgPath: "M 30 130 Q 66 116, 94 86 L 154 86 Q 182 102, 202 130 L 260 130 Q 290 114, 314 82 L 372 82",
    circles: [
      { cx: 154, cy: 86, r: 4, fill: "#FFD700" },
      { cx: 260, cy: 130, r: 4, fill: "#FFD700" },
    ],
  },
  {
    slotLabel: "MV · 1",
    badge: "TITLE #4",
    glowColor: "#1E3A8A",
    kicker: "2024 · LAS VEGAS · 4TH CONSECUTIVE WDC",
    headline: "Las Vegas",
    meta: "RED BULL · 9 WINS · P1 WDC",
    svgPath: "M 30 160 Q 68 148, 98 112 L 158 112 Q 188 130, 210 160 L 268 160 Q 298 144, 322 110 L 374 110",
  },
];

export const verstappenScoutingReport: ScoutingReport = {
  paragraphs: [
    "Verstappen's defining characteristic is corner entry aggression — he carries more speed into slow corners than any driver of his generation, relying on extraordinary car control and feel through the steering to catch slides that would send most drivers off. His trail-braking technique is particularly remarkable: he brakes late, releases progressively, and rotates the car mid-corner with the brake pedal rather than the steering wheel.",
    "His tyre management improved dramatically after 2020. Early in his career he was criticised for over-driving on cold or degrading tyres, but by the 2022–2024 championship era he had developed elite-level conservation ability — often completing one-stop strategies that rivals couldn't match. Combined with raw pace that hasn't been seriously challenged for four consecutive seasons, the package became historically dominant.",
    "The 2025 season marked a shift: McLaren outpaced Red Bull comprehensively. Verstappen's 421 points and 8 wins still showed exceptional form in an underperforming car, but the era of Red Bull dominance ended with his 2024 title.",
  ],
  highlights: ["corner entry aggression", "trail-braking", "tyre management"],
  setupBars: [
    { leftLabel: "UNDERSTEER", rightLabel: "OVERSTEER",    position: 68, annotation: "ROTATES ON ENTRY",                 highlight: true },
    { leftLabel: "SOFT",       rightLabel: "STIFF",        position: 70, annotation: "STIFF — MAXIMUM MECHANICAL GRIP",  highlight: false },
    { leftLabel: "LOW AERO",   rightLabel: "HIGH AERO",    position: 72, annotation: "HIGH DOWNFORCE · CORNER PRIORITY", highlight: false },
  ],
  excelledAt: [
    "Corner entry speed and car rotation",
    "Wet-weather driving — especially in mixed conditions",
    "Overtaking on the first lap and under pressure",
    "Tyre management during one-stop races",
  ],
  struggledWith: [
    "Understeery car balance — less natural than high-rotation setup",
    "Managing team politics in multi-car incidents",
  ],
};

/* ─── Export index ────────────────────────────────────────────────────────── */

export const MOCK_DRIVERS: Record<string, Driver> = {
  vettel,
  leclerc,
  bearman,
  hamilton,
  verstappen,
};
