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

const W = 'https://en.wikipedia.org/wiki/Special:FilePath/'

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
  portraitUrl: W + 'Sebastian_Vettel_-_2022236172324_2022-08-24_Champions_for_Charity_-_Sven_-_1D_X_MK_II_-_0418_-_B70I2428_(cropped).jpg',
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
    label: "POLE",
    glowColor: "#E60000",
    tags: "FIRST F1 POLE · YOUNGEST POLE-SITTER",
    title: "Monza",
    subtitle: "2008 · TORO ROSSO · 1:37.555",
    svgPath:
      "M 30 160 L 90 160 Q 112 148, 130 100 L 180 100 Q 210 116, 230 160 L 290 160 Q 310 144, 325 104 L 370 100",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Vettel_Monza_2008.jpg",
  },
  {
    slotLabel: "SV · 01",
    label: "TITLE",
    glowColor: "#1E3A8A",
    tags: "FIRST WORLD TITLE · WDC #1",
    title: "Abu Dhabi",
    subtitle: "2010 · RED BULL · \"I'M WORLD CHAMPION, BOYS\"",
    svgPath:
      "M 30 160 Q 60 150, 85 115 L 145 115 Q 175 135, 195 160 L 255 160 Q 285 140, 310 100 L 370 100",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Vettel_abu_dabi_2010.jpg",
  },
  {
    slotLabel: "SV · 01",
    label: "WIN",
    glowColor: "#1E3A8A",
    tags: "MULTI-21 · DEFIED TEAM ORDERS · RACE WIN",
    title: "Malaysia",
    subtitle: "2013 · RED BULL · MIXED CONDITIONS · VETTEL VS WEBBER",
    svgPath:
      "M 30 160 L 75 160 Q 95 148, 110 100 L 160 100 Q 180 118, 195 160 L 240 160 Q 260 172, 275 220 L 320 220 Q 340 190, 355 160",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Malaysia_F1_GP_2013_%289165779965%29.jpg",
  },
  {
    slotLabel: "SV · 01",
    label: "WIN",
    glowColor: "#1E3A8A",
    tags: "HELD OFF WEBBER · POLE TO WIN",
    title: "Suzuka",
    subtitle: "2009 · RED BULL · JAPANESE GP VICTORY",
    svgPath:
      "M 30 160 Q 65 148, 95 112 L 150 112 Q 180 130, 205 160 L 255 160 Q 285 178, 310 215 L 370 215",
    circles: [
      { cx: 245, cy: 145, r: 4, fill: "#FFD700" },
      { cx: 310, cy: 178, r: 4, fill: "#fff" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/38/Sebastian_Vettel_won_2009_Japanese_GP.jpg",
  },
  {
    slotLabel: "SV · 01",
    label: "WIN",
    glowColor: "#1E3A8A",
    tags: "PEAK DOMINANCE · 32.6s WINNING MARGIN",
    title: "Singapore",
    subtitle: "2013 · RED BULL · 32.6s MARGIN",
    svgPath:
      "M 30 160 Q 70 150, 100 115 L 150 115 Q 180 135, 205 160 L 260 160 Q 290 180, 315 218 L 360 218 Q 385 180, 395 145",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3b/2013_Italian_GP_-_Vettel.jpg",
  },
  {
    slotLabel: "SV · 01",
    label: "TITLE",
    glowColor: "#1E3A8A",
    tags: "4TH CONSECUTIVE TITLE · YOUNGEST QUADRUPLE CHAMPION",
    title: "India",
    subtitle: "2013 · RED BULL · TITLE-CLINCHING RACE",
    svgPath:
      "M 30 160 L 90 160 Q 112 148, 130 105 L 190 105 Q 215 122, 235 160 L 290 160 Q 315 138, 335 104 L 370 104",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Indian_Grand_Prix_2013_Podium_%28Ank_Kumar%2C_Infosys%29_01.jpg",
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
  portraitUrl: W + '2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3978_by_Stepro_(cropped2).jpg',
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
  portraitUrl: W + 'Oliver_Bearman_2025_(cropped).jpg',
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
    slotLabel: "AUSTRIA · 2024",
    label: "F2 WIN",
    glowColor: "#00E5FF",
    tags: "F2 · PREMA · SPRINT WIN",
    title: "Austria sprint",
    subtitle: "2024 · PREMA RACING · F2 RACE WIN",
    svgPath:
      "M 30 160 L 90 160 Q 112 148 130 100 L 180 100 Q 210 116 230 160 L 290 160 Q 310 144 325 104 L 370 100",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fd/FIA_F2_Austria_2024_Nr._3_Bearman.jpg",
  },
  {
    slotLabel: "JEDDAH · 2024",
    label: "F1 DEBUT",
    glowColor: "#DC0000",
    tags: "FERRARI · SUBSTITUTE · JEDDAH",
    title: "F1 debut",
    subtitle: "P7 · 6 POINTS · FERRARI · ZERO PREP",
    svgPath:
      "M 30 162 L 90 160 Q 112 148 130 102 L 180 100 Q 210 116 230 162 L 290 162 Q 310 144 325 104 L 370 100",
  },
  {
    slotLabel: "MONZA · 2024",
    label: "F2 WIN",
    glowColor: "#00E5FF",
    tags: "F2 · PREMA · FEATURE WIN",
    title: "Monza feature",
    subtitle: "2024 · FEATURE RACE WIN · TEMPLE OF SPEED",
    svgPath:
      "M 30 160 Q 70 148 110 160 L 170 160 Q 200 148 240 160 L 300 160 Q 330 148 370 160",
  },
  {
    slotLabel: "ITALIA · 2021",
    label: "TITLE",
    glowColor: "#FFD700",
    tags: "F4 ITALY · PREMA · CHAMPION",
    title: "F4 champion",
    subtitle: "5 WINS · 2021 SEASON · YOUNGEST IN CLASS",
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
  portraitUrl: W + 'Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_(54566928382)_(cropped).jpg',
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
    label: "TITLE #1",
    glowColor: "#FF8000",
    tags: "2008 · BRAZIL · FINAL CORNER",
    title: "Interlagos",
    subtitle: "MCLAREN · 5TH PLACE SEALS WDC ON LAST LAP",
    svgPath: "M 30 160 L 80 160 Q 100 145, 115 110 L 165 110 Q 185 128, 200 160 L 250 160 Q 270 175, 285 205 L 330 205 Q 350 182, 370 155",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Hamilton_Brazil_2008_celebrations.jpg",
  },
  {
    slotLabel: "LH · 44",
    label: "TITLE #2",
    glowColor: "#00D2BE",
    tags: "2014 · ABU DHABI · FIRST MERCEDES WDC",
    title: "Abu Dhabi",
    subtitle: "MERCEDES · 11 WINS · DOMINANT DEBUT SEASON",
    svgPath: "M 30 120 Q 58 108, 80 80 L 140 80 Q 168 96, 188 120 L 248 120 Q 278 104, 302 76 L 360 76",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/F1_2014_JAP_Lewis_Hamilton_4968.jpg",
  },
  {
    slotLabel: "LH · 44",
    label: "TITLE #7",
    glowColor: "#00D2BE",
    tags: "2020 · ISTANBUL · EQUALLED SCHUMACHER",
    title: "Istanbul Park",
    subtitle: "MERCEDES · 7TH TITLE · 11 WINS IN THE SEASON",
    svgPath: "M 30 150 L 78 150 Q 106 136, 126 98 L 172 98 Q 194 115, 210 150 L 262 150 Q 290 168, 314 200 L 368 200",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/Lewis_Hamilton_2020_Tuscan_Grand_Prix_-_race_day.jpg",
    circles: [{ cx: 172, cy: 98, r: 5, fill: "#FFD700" }],
  },
  {
    slotLabel: "LH · 44",
    label: "117 POLES",
    glowColor: "#00D2BE",
    tags: "ALL-TIME POLE RECORD",
    title: "Mercedes Era",
    subtitle: "117 POLES · 2007–2024 · MOST IN F1 HISTORY",
    svgPath: "M 30 130 Q 65 118, 92 88 L 152 88 Q 180 102, 200 130 L 258 130 Q 288 112, 312 82 L 370 82",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Lewis_Hamilton_Turn_1_%2815067481393%29.jpg",
  },
  {
    slotLabel: "LH · 44",
    label: "FERRARI",
    glowColor: "#DC0000",
    tags: "2025 · FERRARI · NEW CHAPTER",
    title: "Scuderia Ferrari",
    subtitle: "2025–PRESENT · CHASING 8TH WDC",
    svgPath: "M 30 160 Q 68 148, 98 112 L 158 112 Q 186 130, 208 160 L 268 160 Q 298 178, 322 215 L 368 215",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/FIA_F1_Imola_2025_No._44_Hamilton.jpg",
  },
];

export const hamiltonScoutingReport: ScoutingReport = {
  paragraphs: [
    "Hamilton's braking technique is the signature of his style — aggressive high-speed modulation that maximises stability from high velocity, combined with the ability to brake very late into slow corners. He has been a consistent advocate for Carbone Industrie carbon-carbon brakes, citing the specific bite and fade characteristics that his technique relies upon. His threshold braking from 200mph-plus zones produces data that even experienced engineers describe as the benchmark on the grid.",
    "His setup preference has been consistently soft and understeer-biased — trusting the front end to rotate naturally rather than forcing entry rotation. At Mercedes this translated to a car balance that Hamilton could extract maximum tyre life from, often completing 15–20 lap longer stints than the strategic model predicted. This makes him one of the most complete racers in the sport's history: elite raw speed and elite conservation in the same package.",
    "The 2025 Ferrari move was a fundamental readjustment. Ferrari's philosophy demands a more rotation-biased setup that Hamilton's natural style resists. The adaptation period was public and sometimes painful, but Hamilton's engineering intelligence means the long curve tends upward. The deeper question is whether Ferrari can learn from his preferences, not just the other way around.",
  ],
  highlights: ["aggressive high-speed braking modulation", "Carbone Industrie preference", "understeer-biased setup"],
  setupBars: [
    { leftLabel: "UNDERSTEER", rightLabel: "OVERSTEER",    position: 35, annotation: "UNDERSTEER-BIASED — TRUSTS FRONT", highlight: false },
    { leftLabel: "SOFT",       rightLabel: "STIFF",        position: 38, annotation: "SOFT COMPLIANCE — TYRE LONGEVITY", highlight: true },
    { leftLabel: "LOW AERO",   rightLabel: "HIGH AERO",    position: 65, annotation: "DOWNFORCE FOR TYRE LONGEVITY",     highlight: false },
  ],
  excelledAt: [
    "Aggressive braking from high-speed approaches",
    "Tyre management — exceeding predicted stint lengths consistently",
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
  portraitUrl: W + '2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_(medium_crop).jpg',
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
    label: "1ST WIN",
    glowColor: "#1E3A8A",
    tags: "2016 · SPAIN · YOUNGEST F1 RACE WINNER",
    title: "Barcelona",
    subtitle: "RED BULL · 18 YEARS, 228 DAYS · DEBUT WIN",
    svgPath: "M 30 160 L 80 160 Q 100 145, 115 110 L 165 110 Q 185 128, 200 160 L 250 160 Q 270 172, 285 200 L 330 200 Q 350 178, 370 148",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Verstappen_Spain_2016.jpg",
  },
  {
    slotLabel: "MV · 33",
    label: "TITLE #1",
    glowColor: "#1E3A8A",
    tags: "2021 · ABU DHABI · FIRST WDC",
    title: "Yas Marina",
    subtitle: "RED BULL · FINAL LAP OVERTAKE ON HAMILTON",
    svgPath: "M 30 120 Q 60 108, 84 78 L 144 78 Q 172 94, 192 120 L 252 120 Q 282 104, 306 74 L 366 74",
    circles: [{ cx: 252, cy: 120, r: 5, fill: "#FFD700" }],
    imageUrl: W + 'Max_Verstappen_wins_2021_Abu_Dhabi_Grand_Prix.jpg',
  },
  {
    slotLabel: "MV · 1",
    label: "15 WINS",
    glowColor: "#1E3A8A",
    tags: "2022 · DOMINANT SEASON",
    title: "Red Bull Era",
    subtitle: "454 POINTS · 15 WINS · WCC + WDC",
    svgPath: "M 30 150 L 80 150 Q 108 136, 128 98 L 178 98 Q 200 116, 216 150 L 268 150 Q 296 168, 320 202 L 374 202",
    imageUrl: W + 'Max_Verstappen_2022_Abu_Dhabi_Grand_Prix_%28cropped%29.jpg',
  },
  {
    slotLabel: "MV · 1",
    label: "19 WINS",
    glowColor: "#1E3A8A",
    tags: "2023 · RECORD-BREAKING SEASON",
    title: "Historic",
    subtitle: "575 POINTS · 19 WINS · MOST IN A SINGLE SEASON",
    svgPath: "M 30 130 Q 66 116, 94 86 L 154 86 Q 182 102, 202 130 L 260 130 Q 290 114, 314 82 L 372 82",
    circles: [
      { cx: 154, cy: 86, r: 4, fill: "#FFD700" },
      { cx: 260, cy: 130, r: 4, fill: "#FFD700" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/60/FIA_F1_Austria_2023_Race_%281%29.jpg",
  },
  {
    slotLabel: "MV · 1",
    label: "TITLE #4",
    glowColor: "#1E3A8A",
    tags: "2024 · LAS VEGAS · 4TH CONSECUTIVE WDC",
    title: "Las Vegas",
    subtitle: "RED BULL · 9 WINS · P1 WDC",
    svgPath: "M 30 160 Q 68 148, 98 112 L 158 112 Q 188 130, 210 160 L 268 160 Q 298 144, 322 110 L 374 110",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/79/FIA_F1_Austria_2023_Nr._1_%281%29.jpg",
  },
];

export const verstappenScoutingReport: ScoutingReport = {
  paragraphs: [
    "Verstappen's defining characteristic is corner entry aggression. He sets up his Red Bull with what engineers describe as a 'pointy front end' — maximum rotation bias — and then exploits it with trail braking that most drivers can't replicate. His former teammate Alex Albon put it plainly: 'Max is just on another level with what he can do on the brakes into corners.' He brakes later than almost anyone, releases progressively mid-corner, and rotates the car with the pedal rather than additional steering input.",
    "His setup philosophy is overtly oversteer-biased: the car wants to rotate, and Verstappen catches it. This requires a feel through the steering that has no equal on the current grid. On circuits with long, heavy-braking zones — Spa, Monza, Baku — the advantage compounds. His tyre management improved dramatically through 2022–2024 precisely because he learned to extract corner speed without brutally scrubbing the fronts on entry.",
    "The 2025 season proved the other side of that equation: in an underperforming Red Bull against a superior McLaren, Verstappen still scored 8 wins and 421 points — evidence that the raw pace is driver-led, not simply machinery-led. The dominant era ended with his 2024 title, but the individual talent has not diminished.",
  ],
  highlights: ["pointy front end setup", "trail-braking rotation", "late braking zones"],
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

/* ─── Charles Leclerc (F2) ───────────────────────────────────────────────── */

export const leclercF2: Driver = {
  id: "leclerc-f2",
  name: "Charles Leclerc",
  shortName: "Leclerc",
  initials: "CL",
  nationality: "Monégasque",
  dob: "1997-10-16",
  status: "active",
  series: ["f2", "f1"],
  peakEraTeamId: "prema-f2",
  entityColor: "leclerc",
  bio: "The 2017 F2 champion announced himself on the world stage with one of the most dominant rookie campaigns in the series' short history. Racing under the Ferrari Driver Academy banner with Prema, Leclerc's raw speed and late-braking commitment earned him the title in his first and only F2 season.",
  quote: "Seven wins in one season. Ferrari noticed.",
  quoteContext: "2017 F2 championship retrospective",
};

export const leclercF2Stats: DriverStats = {
  driverId: "leclerc-f2",
  series: "f2",
  titles: 1,
  wins: 7,
  poles: 5,
  podiums: 11,
  careerSpan: "2017",
  racesEntered: 21,
};

export const leclercF2Eras: DriverEra[] = [
  {
    driverId: "leclerc-f2",
    teamId: "prema-f2",
    teamName: "Prema Racing",
    seasons: "2017",
    highlights: ["F2 champion on debut season", "7 feature and sprint wins combined", "Sealed title before final round"],
    titles: 1,
    wins: 7,
    teamLiveryHex: "#E8001C",
    statLabel: "CHAMPION",
  },
];

export const leclercF2Signature: DrivingSignature = {
  driverId: "leclerc-f2",
  series: "f2",
  axes: [
    { label: "Steering Smoothness", value: 88 },
    { label: "Entry Discipline", value: 92 },
    { label: "Tyre Management", value: 78 },
    { label: "Race Craft", value: 85 },
    { label: "Quali Pace", value: 90 },
    { label: "Consistency", value: 84 },
  ],
  cohortAverage: [68, 70, 68, 70, 70, 70],
  confidenceScore: 0.88,
  sampleSize: 21,
};

export const leclercF2ReelSlides: ReelSlide[] = [
  {
    slotLabel: "BAKU · 2017",
    label: "FEATURE WIN",
    glowColor: "#DC0000",
    tags: "F2 · PREMA · BAKU FEATURE RACE",
    title: "Baku feature",
    subtitle: "2017 · PREMA · DOMINANT STREET FIGHT",
    svgPath: "M 30 150 L 80 150 Q 100 130 120 90 L 165 90 Q 190 110 210 150 L 265 150 Q 290 130 315 90 L 370 90",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/2017_Formula_2_Baku_Leclerc.jpg/800px-2017_Formula_2_Baku_Leclerc.jpg",
  },
  {
    slotLabel: "BUDAPEST · 2017",
    label: "TITLE SEALED",
    glowColor: "#FFD700",
    tags: "F2 · PREMA · CHAMPIONSHIP CLINCHED",
    title: "Title sealed",
    subtitle: "CHAMPION BEFORE FINAL ROUND · FDA MANDATE FULFILLED",
    svgPath: "M 30 155 L 85 155 Q 110 140 140 100 L 185 100 Q 210 118 235 155 L 290 155 Q 315 138 345 100 L 375 100",
  },
  {
    slotLabel: "MONZA · 2017",
    label: "POLE",
    glowColor: "#DC0000",
    tags: "F2 · PREMA · MONZA QUALIFYING",
    title: "Monza pole",
    subtitle: "TEMPLE OF SPEED · SINGLE-LAP MASTERY",
    svgPath: "M 30 155 Q 65 140 100 155 L 155 155 Q 185 140 220 155 L 275 155 Q 305 140 340 155 L 375 155",
  },
  {
    slotLabel: "F1 DEBUT",
    label: "FERRARI",
    glowColor: "#DC0000",
    tags: "F1 · SAUBER · BAHRAIN 2018",
    title: "F1 debut",
    subtitle: "P6 ON DEBUT · FERRARI SEAT CONFIRMED 2019",
    svgPath: "M 30 160 L 90 160 Q 115 145 145 105 L 190 105 Q 215 122 240 160 L 295 160 Q 320 143 348 102 L 375 100",
  },
];

export const leclercF2ScoutingReport: ScoutingReport = {
  paragraphs: [
    "Leclerc's 2017 F2 campaign was one of the standout debut seasons in modern junior motorsport. Racing as a Ferrari Academy driver under Prema — the championship's most successful team — he won seven times and led the standings from the early rounds, becoming champion before the season finale.",
    "His defining trait at F2 level was the same quality that later defined his F1 career: extraordinary commitment at corner entry. He would brake later than his rivals and trust his feel to find the limit rather than calculating a conservative margin. In the spec Dallara chassis where outright power is identical for all, this entry aggression translated directly into lap time.",
    "Strategically, his racecraft was advanced for his age. He rarely lost positions unnecessarily after the start, maintained composure in safety car restarts, and read tyre behaviour well enough to manage stints without pace cliff-falls. The championship story was one of calm dominance, not drama.",
  ],
  highlights: ["corner entry aggression", "dominant rookie campaign", "Ferrari Academy mandate"],
  setupBars: [
    { leftLabel: "UNDERSTEER", rightLabel: "OVERSTEER",  position: 62, annotation: "MILD ROTATION ON ENTRY", highlight: true },
    { leftLabel: "SOFT",       rightLabel: "STIFF",      position: 52, annotation: "BALANCED ACROSS CONDITIONS" },
    { leftLabel: "LOW AERO",   rightLabel: "HIGH AERO",  position: 65, annotation: "HIGH-DF · PRIORITISES CORNERS" },
  ],
  excelledAt: ["Qualifying lap pace", "Consistent race-pace management", "Street circuit commitment"],
  struggledWith: ["Being pushed hard — the 2017 field offered little sustained championship pressure"],
};

/* ─── George Russell (F2) ────────────────────────────────────────────────── */

export const russellF2: Driver = {
  id: "russell-f2",
  name: "George Russell",
  shortName: "Russell",
  initials: "GR",
  nationality: "British",
  dob: "1998-02-15",
  status: "active",
  series: ["f2", "f1"],
  peakEraTeamId: "art-f2",
  entityColor: "russell",
  bio: "The 2018 F2 champion with ART Grand Prix. A Mercedes junior who approached the season with strategic intelligence and consistency rather than raw aggression — leading the standings from early rounds and executing a controlled wire-to-wire title.",
  quote: "Wire-to-wire. The most clinical F2 title defence of its era.",
  quoteContext: "2018 F2 season review",
};

export const russellF2Stats: DriverStats = {
  driverId: "russell-f2",
  series: "f2",
  titles: 1,
  wins: 4,
  poles: 3,
  podiums: 12,
  careerSpan: "2018",
  racesEntered: 21,
};

export const russellF2Eras: DriverEra[] = [
  {
    driverId: "russell-f2",
    teamId: "art-f2",
    teamName: "ART Grand Prix",
    seasons: "2018",
    highlights: ["F2 champion wire-to-wire", "12 podiums from 21 races", "Sealed title at final round in Abu Dhabi"],
    titles: 1,
    wins: 4,
    teamLiveryHex: "#888888",
    statLabel: "CHAMPION",
  },
];

export const russellF2Signature: DrivingSignature = {
  driverId: "russell-f2",
  series: "f2",
  axes: [
    { label: "Steering Smoothness", value: 90 },
    { label: "Entry Discipline", value: 84 },
    { label: "Tyre Management", value: 88 },
    { label: "Race Craft", value: 91 },
    { label: "Quali Pace", value: 82 },
    { label: "Consistency", value: 94 },
  ],
  cohortAverage: [68, 70, 68, 70, 70, 70],
  confidenceScore: 0.86,
  sampleSize: 21,
};

export const russellF2ReelSlides: ReelSlide[] = [
  {
    slotLabel: "ABU DHABI · 2018",
    label: "TITLE",
    glowColor: "#888888",
    tags: "F2 · ART · CHAMPIONSHIP CLINCHED",
    title: "Title won",
    subtitle: "ABU DHABI · 2018 F2 CHAMPION · WIRE-TO-WIRE",
    svgPath: "M 30 155 L 85 155 Q 110 140 140 98 L 185 98 Q 208 115 232 155 L 290 155 Q 315 138 345 98 L 375 98",
  },
  {
    slotLabel: "BAKU · 2018",
    label: "FEATURE WIN",
    glowColor: "#888888",
    tags: "F2 · ART · BAKU STREET CIRCUIT",
    title: "Baku feature",
    subtitle: "STREET CIRCUIT MASTERY · MERCEDES JR DEVELOPING",
    svgPath: "M 30 150 L 80 150 Q 102 130 125 90 L 170 90 Q 192 108 215 150 L 268 150 Q 290 132 315 90 L 370 90",
  },
  {
    slotLabel: "F1 DEBUT",
    label: "WILLIAMS",
    glowColor: "#005AFF",
    tags: "F1 · WILLIAMS · MELBOURNE 2019",
    title: "F1 debut",
    subtitle: "P12 IN WILLIAMS FW42 · QUALI 19TH → POINTS IN 2020",
    svgPath: "M 30 160 L 90 158 Q 112 145 132 105 L 178 105 Q 202 122 228 160 L 288 160 Q 310 143 340 103 L 375 100",
  },
];

export const russellF2ScoutingReport: ScoutingReport = {
  paragraphs: [
    "Russell's 2018 F2 title was built on consistency rather than raw single-lap speed. Rarely the fastest in qualifying, he deployed tactical intelligence in races — managing tyre phases, avoiding attrition, and accumulating podium finishes in rounds where rivals crashed out or overdrove.",
    "His racecraft was advanced beyond his years. He would defend positions without wheel-to-wheel incidents, execute tyre conservation plans under competitive pressure, and extract more from a degrading set of tyres than his competitors. The wet Spa race in 2018 was a particular highlight: a controlled performance in conditions that exposed how completely he understood tyre thermal behaviour.",
    "The Championship win, secured in the final round, reflected a season-long pattern: Russell rarely dominated weekends outright, but he was never far from the points and made fewer errors than anyone else on the grid.",
  ],
  highlights: ["tactical intelligence", "tyre consistency", "racecraft beyond his years"],
  setupBars: [
    { leftLabel: "UNDERSTEER", rightLabel: "OVERSTEER",  position: 45, annotation: "NEUTRAL BALANCE · PREDICTABLE" },
    { leftLabel: "SOFT",       rightLabel: "STIFF",      position: 48, annotation: "COMFORTABLE MID-RANGE SETUP" },
    { leftLabel: "LOW AERO",   rightLabel: "HIGH AERO",  position: 58, annotation: "SLIGHT HIGH-DF BIAS", highlight: true },
  ],
  excelledAt: ["Tyre management in long stints", "Points scoring from non-ideal grid positions", "Racecraft under pressure"],
  struggledWith: ["Single-lap qualifying pace vs the fastest ART rivals"],
};

/* ─── Oscar Piastri (F2) ─────────────────────────────────────────────────── */

export const piastriF2: Driver = {
  id: "piastri-f2",
  name: "Oscar Piastri",
  shortName: "Piastri",
  initials: "OP",
  nationality: "Australian",
  dob: "2001-04-06",
  status: "active",
  series: ["f2", "f1"],
  peakEraTeamId: "prema-f2",
  entityColor: "piastri",
  bio: "The 2021 F2 champion — and the first rookie to win the title since Charles Leclerc in 2017. Racing for Prema in his debut F2 season, the Australian delivered a composed, dominant campaign that had already been telegraphed by his 2020 F3 title.",
  quote: "F3 in 2020. F2 in 2021. Two back-to-back titles without losing a race.",
  quoteContext: "2021 F2 season retrospective",
};

export const piastriF2Stats: DriverStats = {
  driverId: "piastri-f2",
  series: "f2",
  titles: 1,
  wins: 5,
  poles: 4,
  podiums: 14,
  careerSpan: "2021",
  racesEntered: 24,
};

export const piastriF2Eras: DriverEra[] = [
  {
    driverId: "piastri-f2",
    teamId: "prema-f3",
    teamName: "F3 · Prema",
    seasons: "2020",
    highlights: ["F3 champion 2020 — first title", "Opened F2 door as Prema priority"],
    titles: 1,
    wins: 3,
    teamLiveryHex: "#B026FF",
    statLabel: "F3 CHAMP",
  },
  {
    driverId: "piastri-f2",
    teamId: "prema-f2",
    teamName: "F2 · Prema",
    seasons: "2021",
    highlights: ["F2 champion — rookie season", "14 podiums from 24 races", "First rookie F2 title since Leclerc 2017"],
    titles: 1,
    wins: 5,
    teamLiveryHex: "#E8001C",
    statLabel: "CHAMPION",
  },
];

export const piastriF2Signature: DrivingSignature = {
  driverId: "piastri-f2",
  series: "f2",
  axes: [
    { label: "Steering Smoothness", value: 92 },
    { label: "Entry Discipline", value: 87 },
    { label: "Tyre Management", value: 90 },
    { label: "Race Craft", value: 88 },
    { label: "Quali Pace", value: 86 },
    { label: "Consistency", value: 93 },
  ],
  cohortAverage: [68, 70, 68, 70, 70, 70],
  confidenceScore: 0.91,
  sampleSize: 24,
};

export const piastriF2ReelSlides: ReelSlide[] = [
  {
    slotLabel: "SPA · 2021",
    label: "FEATURE WIN",
    glowColor: "#FF8000",
    tags: "F2 · PREMA · SPA FEATURE RACE",
    title: "Spa feature",
    subtitle: "2021 · PREMA · THE TITLE'S FIRST MAJOR STATEMENT",
    svgPath: "M 30 150 L 85 150 Q 108 132 130 92 L 180 88 Q 208 106 230 150 L 288 150 Q 312 133 338 92 L 375 90",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/2021_F2_Spa_Piastri.jpg/800px-2021_F2_Spa_Piastri.jpg",
  },
  {
    slotLabel: "MONZA · 2021",
    label: "SPRINT WIN",
    glowColor: "#FF8000",
    tags: "F2 · PREMA · MONZA SPRINT",
    title: "Monza sprint",
    subtitle: "CONSECUTIVE WINS · TITLE MOMENTUM",
    svgPath: "M 30 155 Q 65 140 98 155 L 155 155 Q 185 140 218 155 L 275 155 Q 305 140 340 155 L 375 155",
  },
  {
    slotLabel: "JEDDAH · 2021",
    label: "TITLE SEALED",
    glowColor: "#FFD700",
    tags: "F2 · PREMA · CHAMPIONSHIP CLINCHED",
    title: "Champion",
    subtitle: "JEDDAH · F2 TITLE · SECOND SUCCESSIVE PREMA CROWN",
    svgPath: "M 30 155 L 88 155 Q 112 140 145 98 L 192 98 Q 215 116 240 155 L 295 155 Q 318 139 348 98 L 375 98",
  },
  {
    slotLabel: "ALPINE · 2022",
    label: "F1 RESERVE",
    glowColor: "#0090FF",
    tags: "F1 · ALPINE RESERVE DRIVER",
    title: "Alpine limbo",
    subtitle: "DECLARED RESERVE · THEN MCLAREN CONTRACT REVEALED",
    svgPath: "M 30 158 L 88 158 Q 110 143 135 103 L 180 103 Q 205 120 228 158 L 285 158 Q 308 141 338 102 L 375 102",
  },
];

export const piastriF2ScoutingReport: ScoutingReport = {
  paragraphs: [
    "Piastri's 2021 F2 season was a continuation of a pattern already visible in F3: complete control. He rarely threw away points, avoided incidents that caught rivals out, and delivered consistent qualifying performances that kept him at the front in sprint races. The combination with tyre management — already elite even in F2 — meant that feature races almost always went his way.",
    "What separated him from previous Prema champions was the absence of nerves. Leclerc had flashes of brilliance intercut with incidents. Schumacher struggled early. Piastri simply arrived ready: composed, methodical, and fast without the need to over-drive.",
    "Post-F2, his handling of the Alpine-to-McLaren contract saga demonstrated off-track intelligence that matched his racecraft. He understood his value, held firm, and ended up at the team where he won the 2024 Constructors' Championship.",
  ],
  highlights: ["complete control", "elite tyre management", "methodical without over-driving"],
  setupBars: [
    { leftLabel: "UNDERSTEER", rightLabel: "OVERSTEER",  position: 48, annotation: "NEUTRAL · COMFORT IN MID-CORNER" },
    { leftLabel: "SOFT",       rightLabel: "STIFF",      position: 46, annotation: "SOFT-BIASED · TYRE-FRIENDLY" },
    { leftLabel: "LOW AERO",   rightLabel: "HIGH AERO",  position: 66, annotation: "HIGH-DF · MANAGES REAR STABILITY", highlight: true },
  ],
  excelledAt: ["Consistent qualifying across different circuit types", "Tyre management in long stints", "Converting front-row starts to wins"],
  struggledWith: ["The politics of junior ladder deployment — found resolution at McLaren"],
};

/* ─── Gabriel Bortoleto (F2) ─────────────────────────────────────────────── */

export const bortoleto: Driver = {
  id: "bortoleto",
  name: "Gabriel Bortoleto",
  shortName: "Bortoleto",
  initials: "GB",
  nationality: "Brazilian",
  dob: "2004-10-14",
  status: "active",
  series: ["f2", "f3", "f1"],
  peakEraTeamId: "invicta-f2",
  entityColor: "bortoleto",
  bio: "The first South American to win the FIA F3 Championship (2023, Trident), then back-to-back: the 2024 F2 champion with Invicta Racing. Signed by Audi's Sauber programme for F1 2025 — the fourth driver to win back-to-back F2/F3 titles after Leclerc, Russell, and Piastri.",
  quote: "F3 in 2023. F2 in 2024. The ladder climbed in two seasons.",
  quoteContext: "2024 F2 championship review",
  portraitUrl: W + 'Gabriel_Bortoleto_(cropped).jpg',
};

export const bortoletoStats: DriverStats = {
  driverId: "bortoleto",
  series: "f2",
  titles: 1,
  wins: 5,
  poles: 3,
  podiums: 13,
  careerSpan: "2024",
  racesEntered: 27,
};

export const bortoletoEras: DriverEra[] = [
  {
    driverId: "bortoleto",
    teamId: "trident-f3",
    teamName: "F3 · Trident",
    seasons: "2023",
    highlights: ["F3 champion 2023", "First South American F3 champion", "164 points — dominant title run"],
    titles: 1,
    wins: 4,
    teamLiveryHex: "#990000",
    statLabel: "F3 CHAMP",
  },
  {
    driverId: "bortoleto",
    teamId: "invicta-f2",
    teamName: "F2 · Invicta Racing",
    seasons: "2024",
    highlights: ["F2 champion on debut season", "Back-to-back F3/F2 titles", "Clinched with rounds to spare"],
    titles: 1,
    wins: 5,
    teamLiveryHex: "#1199CC",
    statLabel: "CHAMPION",
  },
  {
    driverId: "bortoleto",
    teamId: "sauber",
    teamName: "F1 · Sauber/Audi",
    seasons: "2025–present",
    highlights: ["F1 debut Melbourne 2025", "Audi project lead driver for the future"],
    titles: 0,
    wins: 0,
    teamLiveryHex: "#52E252",
    statLabel: "F1",
  },
];

export const bortoletoSignature: DrivingSignature = {
  driverId: "bortoleto",
  series: "f2",
  axes: [
    { label: "Steering Smoothness", value: 85 },
    { label: "Entry Discipline", value: 88 },
    { label: "Tyre Management", value: 80 },
    { label: "Race Craft", value: 87 },
    { label: "Quali Pace", value: 86 },
    { label: "Consistency", value: 84 },
  ],
  cohortAverage: [68, 70, 68, 70, 70, 70],
  confidenceScore: 0.78,
  sampleSize: 51,
};

export const bortoletoReelSlides: ReelSlide[] = [
  {
    slotLabel: "SPA · 2023",
    label: "F3 WIN",
    glowColor: "#990000",
    tags: "F3 · TRIDENT · SPA FEATURE",
    title: "F3 Spa",
    subtitle: "2023 · TRIDENT · F3 TITLE RUN BUILDING",
    svgPath: "M 30 150 L 85 150 Q 108 132 130 92 L 180 88 Q 208 106 230 150 L 288 150 Q 312 133 338 92 L 375 90",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/FIA_F3_Spa_2023_Nr._23_Bortoleto.jpg/800px-FIA_F3_Spa_2023_Nr._23_Bortoleto.jpg",
  },
  {
    slotLabel: "MONZA · 2023",
    label: "F3 TITLE",
    glowColor: "#FFD700",
    tags: "F3 · TRIDENT · CHAMPION 2023",
    title: "F3 champion",
    subtitle: "FIRST SOUTH AMERICAN F3 CHAMPION · 164 POINTS",
    svgPath: "M 30 155 Q 65 140 98 155 L 155 155 Q 185 140 218 155 L 275 155 Q 305 140 340 155 L 375 155",
  },
  {
    slotLabel: "MONZA · 2024",
    label: "F2 WIN",
    glowColor: "#1199CC",
    tags: "F2 · INVICTA · MONZA SPRINT WIN",
    title: "Monza sprint",
    subtitle: "2024 · INVICTA RACING · CHAMPIONSHIP MOMENTUM",
    svgPath: "M 30 155 Q 65 140 98 155 L 155 155 Q 185 140 218 155 L 275 155 Q 305 140 340 155 L 375 155",
  },
  {
    slotLabel: "ABU DHABI · 2024",
    label: "F2 TITLE",
    glowColor: "#FFD700",
    tags: "F2 · INVICTA · CHAMPION 2024",
    title: "F2 champion",
    subtitle: "BACK-TO-BACK JUNIOR TITLES · SAUBER F1 2025",
    svgPath: "M 30 155 L 88 155 Q 112 140 145 98 L 192 98 Q 215 116 240 155 L 295 155 Q 318 139 348 98 L 375 98",
  },
];

export const bortoletoScoutingReport: ScoutingReport = {
  paragraphs: [
    "Bortoleto's back-to-back F3 and F2 titles put him in elite company — only Leclerc, Russell, and Piastri had achieved the same sequence in the F2 era. His 2023 F3 title with Trident was particularly noteworthy given the team's resources relative to Prema, showing an ability to extract maximum performance from a competitive but not dominant package.",
    "In F2 with Invicta Racing in 2024, the Brazilian showed improved racecraft maturity. His qualifying pace was sharp — frequently in the top three — and his race management demonstrated an understanding of tyre strategy that belied his single season in the spec Dallara F2. He won under pressure and managed championship risk intelligently in the closing rounds.",
    "At Sauber from 2025, he faces the challenge every junior champion faces: translating junior dominance to F1 competitiveness in an underperforming car. The Audi project, transitioning from Sauber infrastructure, positions him as a long-term asset rather than immediate race winner material.",
  ],
  highlights: ["back-to-back junior titles", "tyre strategy maturity", "extracts maximum from mid-pack machinery"],
  setupBars: [
    { leftLabel: "UNDERSTEER", rightLabel: "OVERSTEER",  position: 58, annotation: "MILD ROTATION ON ENTRY" },
    { leftLabel: "SOFT",       rightLabel: "STIFF",      position: 55, annotation: "BALANCED SETUP PHILOSOPHY" },
    { leftLabel: "LOW AERO",   rightLabel: "HIGH AERO",  position: 62, annotation: "HIGH-DF · CORNER-FOCUSED", highlight: true },
  ],
  excelledAt: ["Extracting performance from non-dominant machinery", "Race management and tyre strategy", "Championship pressure management"],
  struggledWith: ["Being part of underfunded Sauber in F1 transition era"],
};

/* ─── Leclerc F1 — completion ─────────────────────────────────────────────── */

export const leclerEras: DriverEra[] = [
  { driverId:"leclerc", teamId:"sauber", teamName:"Sauber", seasons:"2018", highlights:["F1 debut season","P6 Bahrain — shock points haul"], titles:0, wins:0, teamLiveryHex:"#900000", statLabel:"P13" },
  { driverId:"leclerc", teamId:"ferrari", teamName:"Ferrari", seasons:"2019–present", highlights:["2 wins in rookie Ferrari season (Spa, Monza)","2022 WDC runner-up — 3 wins, 9 poles","Most F1 poles without a title in modern era"], titles:0, wins:10, teamLiveryHex:"#DC0000", teamAccentHex:"#FFD700", statLabel:"10W · 25P" },
]

export const leclerReelSlides: ReelSlide[] = [
  { slotLabel:"CL · 16", label:"FIRST WIN", glowColor:"#DC0000", tags:"MAIDEN VICTORY · SPA-FRANCORCHAMPS · POLE TO WIN", title:"Belgian GP", subtitle:"2019 · FERRARI · FIRST OF MANY", svgPath:"M 30 120 L 80 120 Q 112 108 130 70 L 180 70 Q 210 88 230 120 L 290 120 Q 310 104 325 72 L 370 72", imageUrl: W + 'Charles_Leclerc_2019_Belgian_Grand_Prix.jpg' },
  { slotLabel:"CL · 16", label:"WDC HUNT", glowColor:"#DC0000", tags:"2022 TITLE CONTENDER · BAHRAIN POLE & WIN", title:"2022 season", subtitle:"2022 · FERRARI · 3W · 9P · P2 WDC", svgPath:"M 30 150 L 85 150 Q 108 132 130 92 L 180 88 Q 208 106 230 150 L 288 150 Q 312 133 338 92 L 375 90", imageUrl: W + 'Charles_Leclerc_2022_Bahrain_Grand_Prix_%28cropped%29.jpg' },
  { slotLabel:"CL · 16", label:"MONACO WIN", glowColor:"#DC0000", tags:"MONACO GP WINNER · HOME VICTORY FINALLY SECURED", title:"Monaco GP", subtitle:"2024 · FERRARI · EMOTIONAL HOME WIN", svgPath:"M 30 160 L 90 160 Q 112 148 130 105 L 190 105 Q 215 122 235 160 L 290 160 Q 315 138 335 104 L 370 104", imageUrl: W + 'Charles_Leclerc%2C_2024_Monaco_Grand_Prix_%28cropped%29.jpg' },
]

export const leclerScoutingReport: ScoutingReport = {
  paragraphs:[
    "Leclerc runs one of the most aggressive setups on the grid — his Ferrari engineers have described it as 'extreme' in terms of rotation bias. The result is a car that can be deeply unpredictable at the limit. Leclerc himself said after Bahrain 2023: 'I don't know what the car will do every time I brake.' For most drivers this would be a liability. For Leclerc it is a weapon: his car sense is so precise that he exploits oversteer conditions others find undriveable.",
    "His qualifying advantage over teammates and rivals has been measured at 0.3–0.6 seconds across circuits where the setup philosophy pays off — a gap that reflects not just pace but his capacity to manage a knife-edge front end on a timed lap. The 2019 Belgian GP pole and win in a SF90 that had no business leading Mercedes, and the 2022 title challenge in the F1-75, were both products of that same ability.",
    "His race management weakness is real but overplayed. The 2022 implosion was as much strategic as driver error. From 2023 onward he closed that gap, and the 2024 Monaco win — home race, emotionally loaded, operationally perfect — showed a Leclerc who had learned to control a race, not just attack one.",
  ],
  highlights:["extreme rotation setup","0.3-0.6s qualifying margin","precision on knife-edge front end"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:82, annotation:"EXTREME ROTATION · ENGINEERS CONFIRM", highlight:true },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:65, annotation:"MEDIUM-STIFF · RESPONSIVE" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:70, annotation:"BALANCED · CIRCUIT DEPENDENT" },
  ],
  excelledAt:["Single-lap qualifying pace","Low-speed technical circuits where rotation pays","Managing extreme setup in timed conditions"],
  struggledWith:["Race management under sustained pressure (early career)","Strategic risk-taking in championship contexts"],
}

/* ─── Norris ───────────────────────────────────────────────────────────────── */

export const norris: Driver = {
  id:"norris", name:"Lando Norris", shortName:"Norris", initials:"LN", nationality:"British", dob:"1999-11-13", status:"active", series:["f1"], peakEraTeamId:"mclaren", entityColor:"norris",
  bio:"McLaren's linchpin who transformed from fan favourite into genuine championship threat. His 2024 season — four wins including Miami, Monaco, Netherlands, and Singapore — marked a step-change in race execution to match his already elite qualifying pace.",
  quote:"I finally figured out how to win. Took five years, but here we are.",
  quoteContext:"Post-race, Miami 2024",
  portraitUrl: W + '2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_(cropped2).jpg',
}

export const norrisStats: DriverStats = { driverId:"norris", series:"f1", titles:0, wins:8, poles:20, podiums:44, careerSpan:"2019–present", racesEntered:130, fastestLaps:7, pointsScored:1085 }

export const norrisEras: DriverEra[] = [
  { driverId:"norris", teamId:"mclaren", teamName:"McLaren", seasons:"2019–present", highlights:["First win Miami 2024","4 wins in 2024 season","2024 WDC runner-up behind Verstappen"], titles:0, wins:8, teamLiveryHex:"#FF8000", teamAccentHex:"#FFD700", statLabel:"8W · 20P" },
]

export const norrisSignature: DrivingSignature = {
  driverId:"norris", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:91 },
    { label:"Entry Aggression", value:88 },
    { label:"Tyre Management", value:85 },
    { label:"Throttle Application", value:93 },
    { label:"Braking", value:90 },
    { label:"Consistency", value:89 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.87, sampleSize:1124,
}

export const norrisReelSlides: ReelSlide[] = [
  { slotLabel:"LN · 24", label:"FIRST WIN", glowColor:"#FF8000", tags:"MIAMI GP · MAIDEN FORMULA 1 VICTORY", title:"Miami GP", subtitle:"2024 · McLAREN · THE WAIT IS OVER", svgPath:"M 30 160 L 80 160 Q 100 145 115 110 L 160 110 Q 180 125 195 160 L 235 160 Q 255 175 270 205 L 310 205 Q 330 185 350 155 L 380 155", imageUrl: W + 'Lando_Norris_2024_Miami_Grand_Prix.jpg' },
  { slotLabel:"LN · 24", label:"4 WINS", glowColor:"#FF8000", tags:"MONACO · NETHERLANDS · SINGAPORE · DOMINANT SEASON", title:"2024 Campaign", subtitle:"2024 · McLAREN · WDC RUNNER-UP", svgPath:"M 30 120 Q 60 110 85 85 L 145 85 Q 175 98 195 120 L 255 120 Q 285 105 310 80 L 370 80", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2024-08-25_Motorsport,_Formel_1,_Großer_Preis_der_Niederlande_2024_STP_3975_by_Stepro.jpg" },
  { slotLabel:"LN · 26", label:"TITLE HUNT", glowColor:"#FF8000", tags:"McLAREN CHAMPIONSHIP CONTENDER · 2026 GRID", title:"McLaren 2026", subtitle:"2026 · McLAREN · CHAMPIONSHIP FAVOURITE", svgPath:"M 30 150 L 80 150 Q 110 138 130 100 L 175 100 Q 195 115 210 150 L 260 150 Q 290 170 315 200 L 370 200", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2024-08-25_Motorsport,_Formel_1,_Großer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_(cropped2).jpg" },
]

export const norrisScoutingReport: ScoutingReport = {
  paragraphs:[
    "Norris's defining hardware dependency is brake feel. McLaren technical director Neil Houldey told The Race in 2024 that the team made 'significant suspension geometry modifications' specifically to give Norris the front-end feedback his braking technique requires. He is a driver who brakes with acute sensitivity to pedal feedback — lose that tactile connection and his corner entry confidence evaporates. Get it right, and he is one of the most complete brake-into-corner drivers on the grid.",
    "His driving style centres around high minimum corner speed — he carries exceptional momentum through medium-speed complexes, rarely overheating the front axle. This makes him hard to follow closely and even harder to overtake in a straight fight. The 2024 McLaren matched this profile perfectly: stiff rear end, responsive front, strong brake stability.",
    "The 2026 McLaren places Norris and Piastri in an evenly matched pairing. Norris's edge lies in qualifying — his read of the final 0.2 seconds of front axle load gives him a narrow margin. Race-pace margins between the two are smaller, with Piastri's tyre management often countering Norris's single-lap pace advantage.",
  ],
  highlights:["brake feel dependency","suspension tuned to braking style","high minimum corner speed"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:60, annotation:"NEUTRAL · BRAKE-SENSITIVE FRONT", highlight:true },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:65, annotation:"STIFF REAR — McLAREN SPEC CHANGE" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:65, annotation:"MODERATE DOWNFORCE" },
  ],
  excelledAt:["High-speed complexes requiring brake confidence","Single-lap qualifying pace","Wet-weather circuits"],
  struggledWith:["Circuits requiring gentle tyre management over sustained stints","Converting poles to wins pre-2024"],
}

/* ─── Piastri (F1) ─────────────────────────────────────────────────────────── */

export const piastriF1: Driver = {
  id:"piastri", name:"Oscar Piastri", shortName:"Piastri", initials:"OP", nationality:"Australian", dob:"2001-04-06", status:"active", series:["f1"], peakEraTeamId:"mclaren", entityColor:"piastri",
  bio:"The latest in the great Australian F1 lineage. F3 champion 2020, F2 champion 2021, McLaren race winner from 2023. Ice-cool racecraft, elite racecraft under pressure, and a car-feel that engineers describe as 'pure signal, no noise.'",
  quote:"I don't panic. I just figure out what needs doing and do it.",
  quoteContext:"Post-race, 2024 Hungarian GP",
  portraitUrl: W + '2026_Chinese_GP_-_Oscar_Piastri_(cropped)_(cropped).jpg',
}

export const piastriF1Stats: DriverStats = { driverId:"piastri", series:"f1", titles:0, wins:7, poles:6, podiums:24, careerSpan:"2023–present", racesEntered:60, fastestLaps:5, pointsScored:545 }

export const piastriF1Eras: DriverEra[] = [
  { driverId:"piastri", teamId:"mclaren", teamName:"McLaren", seasons:"2023–present", highlights:["First win Hungary 2024","First pole Singapore 2023","3 wins in 2024 season"], titles:0, wins:7, teamLiveryHex:"#FF8000", teamAccentHex:"#FFD700", statLabel:"7W · 6P" },
]

export const piastriF1Signature: DrivingSignature = {
  driverId:"piastri", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:93 },
    { label:"Entry Aggression", value:82 },
    { label:"Tyre Management", value:90 },
    { label:"Throttle Application", value:89 },
    { label:"Braking", value:87 },
    { label:"Consistency", value:94 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.82, sampleSize:780,
}

export const piastriF1ReelSlides: ReelSlide[] = [
  { slotLabel:"OP · 24", label:"FIRST WIN", glowColor:"#FF8000", tags:"HUNGARIAN GP · LIGHTS TO FLAG · MAIDEN VICTORY", title:"Hungarian GP", subtitle:"2024 · McLAREN · FIRST F1 WIN", svgPath:"M 30 140 L 60 140 Q 75 130 85 90 L 120 90 Q 140 105 155 140 L 195 140 Q 215 155 230 195 L 260 198 Q 275 180 290 140 L 330 140 Q 345 120 360 80 L 380 80", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Oscar_Piastri_Chinese_GP_2024.jpg" },
  { slotLabel:"OP · 24", label:"3 WINS", glowColor:"#FF8000", tags:"AZERBAIJAN · SINGAPORE · BAKU · 2024 TITLE PUSH", title:"2024 Campaign", subtitle:"2024 · McLAREN · 3W IN SEASON", svgPath:"M 30 120 L 90 120 Q 112 108 130 70 L 180 70 Q 210 88 230 120 L 290 120 Q 310 104 325 72 L 370 72", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_Piastri_(1).jpg" },
  { slotLabel:"OP · 26", label:"MCL FUTURE", glowColor:"#FF8000", tags:"McLAREN #1 · CHAMPIONSHIP FAVOURITE 2026", title:"McLaren 2026", subtitle:"2026 · McLAREN · TITLE CONTENDER", svgPath:"M 30 155 Q 65 140 98 155 L 155 155 Q 185 140 218 155 L 275 155 Q 305 140 340 155 L 375 155", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Oscar_Piastri_2024_Mexico_City_Grand_Prix.jpg" },
]

export const piastriF1ScoutingReport: ScoutingReport = {
  paragraphs:[
    "Piastri and his race engineer Tom Stallard have built one of the most productive driver-engineer partnerships on the current grid. Before Stallard reviews telemetry, Piastri provides a detailed lap-by-lap assessment of car behaviour that engineers describe as 'pure signal, no noise' — meaning his feedback rarely requires interpretation and almost never contains contradictory information. McLaren's strategy team uses his degradation predictions with higher confidence than any other car's data.",
    "Where Norris wins with feel and aggression, Piastri wins with process — he dissects a race strategy, identifies the optimal decision at each branch point, and executes without drama. His tyre management in 2024 was the best on the grid: 1.5–2s per lap better degradation rates than his teammate on identical equipment, consistently enabling the longer stint that produced race wins.",
    "The only measurable relative weakness is a slower warm-up into qualifying sessions — Q1 and early Q2 laps often underperform the final hot lap. In race conditions, this matters not at all: Piastri is fastest where it counts, which is lap 30 onwards.",
  ],
  highlights:["Tom Stallard engineer partnership","pre-telemetry accuracy","1.5-2s better tyre delta than teammate"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:55, annotation:"NEUTRAL BALANCED", highlight:true },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:52, annotation:"COMPLIANT CHASSIS FEEL" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:62, annotation:"MODERATE-HIGH DOWNFORCE" },
  ],
  excelledAt:["Tyre conservation","Strategic race execution","Consistent lap-time delivery"],
  struggledWith:["Early qualifying warm-up laps","Aggressive overtaking under braking in early career"],
}

/* ─── Russell (F1) ─────────────────────────────────────────────────────────── */

export const russellF1: Driver = {
  id:"russell", name:"George Russell", shortName:"Russell", initials:"GR", nationality:"British", dob:"1998-02-15", status:"active", series:["f1"], peakEraTeamId:"mercedes", entityColor:"russell",
  bio:"Three consecutive junior titles (GP3, F2, F1 rookie pace) before three seasons with Williams — where he out-qualified his teammate 36 times in a row — established the template: precision, efficiency, maximum extraction. At Mercedes from 2022, wins have followed.",
  quote:"I've spent my career extracting everything from whatever I've been given. That doesn't change at Mercedes.",
  quoteContext:"Press conference, Abu Dhabi 2021",
  portraitUrl: W + 'KingsLeonSilverstne040724_(28_of_112)_(53838006028)_(cropped).jpg',
}

export const russellF1Stats: DriverStats = { driverId:"russell", series:"f1", titles:0, wins:4, poles:8, podiums:22, careerSpan:"2019–present", racesEntered:120, fastestLaps:7, pointsScored:698 }

export const russellF1Eras: DriverEra[] = [
  { driverId:"russell", teamId:"williams", teamName:"Williams", seasons:"2019–2021", highlights:["Quali record vs teammates: 36-0","P9 in soaking Nürburgring 2020","Sub debut Sakhir 2020 — led race"], titles:0, wins:0, teamLiveryHex:"#005AFF", statLabel:"36-0 QUALI" },
  { driverId:"russell", teamId:"mercedes", teamName:"Mercedes", seasons:"2022–present", highlights:["First win Brazil 2022","4 wins through 2025","2 poles in debut season"], titles:0, wins:4, teamLiveryHex:"#00D2BE", teamAccentHex:"#FFD700", statLabel:"4W · 8P" },
]

export const russellF1Signature: DrivingSignature = {
  driverId:"russell", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:87 },
    { label:"Entry Aggression", value:80 },
    { label:"Tyre Management", value:86 },
    { label:"Throttle Application", value:85 },
    { label:"Braking", value:84 },
    { label:"Consistency", value:92 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.85, sampleSize:960,
}

export const russellF1ReelSlides: ReelSlide[] = [
  { label:"PEAK ERA", glowColor:"#00D2BE", tags:"MERCEDES #1 DRIVER · BRITISH GRAND PRIX 2024", title:"Peak Russell", subtitle:"2024 · MERCEDES · W15 · 36-0 QUALI RECORD", svgPath:"M 30 150 L 80 150 Q 110 138 130 100 L 175 100 Q 195 115 210 150 L 260 150 Q 290 170 315 200 L 370 200", imageUrl: W + 'KingsLeonSilverstne040724_(28_of_112)_(53838006028)_(cropped).jpg' },
  { label:"SAKHIR 2020", glowColor:"#005AFF", tags:"SAKHIR SUB · LED 30 LAPS · PIT STOP DISASTER", title:"Sakhir GP", subtitle:"2020 · MERCEDES SUB · SHOULD HAVE WON", svgPath:"M 30 160 L 90 160 Q 112 148 130 105 L 190 105 Q 215 122 235 160 L 290 160 Q 315 138 335 104 L 370 104", imageUrl: W + 'George_Russell_2020_Bahrain_II_race_start.jpg' },
  { label:"FIRST WIN", glowColor:"#00D2BE", tags:"BRAZIL GP · DOMINANT LIGHTS-TO-FLAG VICTORY", title:"Brazilian GP", subtitle:"2022 · MERCEDES · FIRST F1 WIN", svgPath:"M 30 120 Q 60 110 85 85 L 145 85 Q 175 98 195 120 L 255 120 Q 285 105 310 80 L 370 80", imageUrl: W + 'George_Russell_wins_2022_Brazilian_Grand_Prix.jpg' },
]

export const russellF1ScoutingReport: ScoutingReport = {
  paragraphs:[
    "Russell's braking technique underwent a measurable transformation when he moved from Williams to Mercedes. At Williams, limited grip and mechanical compliance forced him to brake earlier — the car couldn't manage the combined thermal and mechanical stress of trail braking. At Mercedes, he learned to brake later and carry more speed into corners, but he never fully matched Hamilton's extreme late-braking aggression. The result is a technique that sits between his Williams-forced conservatism and Hamilton's limit: efficient, fast, and precise without being ragged.",
    "His 36-0 qualifying record against Williams teammates is the number that defines his profile best — not a driver of violent aggression but a driver of total extraction. At Mercedes from 2022, the same philosophy produced wins and poles in a car that could support his style. His car development feedback is considered among the most accurate on the grid, making him as valuable in a simulator as on track.",
    "The ceiling against extreme qualifying specialists (Leclerc, Norris) is real — Russell rarely out-qualifies them when they are on form. In races, where his precision over a distance produces faster Sunday lap times than his Saturday grid position suggests, the gap compresses substantially.",
  ],
  highlights:["36-0 qualifying record","precision extraction","consistent race execution"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:52, annotation:"NEUTRAL · TRUSTS BOTH ENDS", highlight:true },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:60, annotation:"MEDIUM-STIFF · STABLE" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:60, annotation:"BALANCED AERO PREFERENCE" },
  ],
  excelledAt:["Consistency across a race distance","Tyre management","Extracting maximum from underperforming machinery"],
  struggledWith:["Peak single-lap ceiling vs elite qualifiers"],
}

/* ─── Antonelli ────────────────────────────────────────────────────────────── */

export const antonelli: Driver = {
  id:"antonelli", name:"Andrea Kimi Antonelli", shortName:"Antonelli", initials:"KA", nationality:"Italian", dob:"2006-08-25", status:"active", series:["f1"], peakEraTeamId:"mercedes", entityColor:"antonelli",
  bio:"Mercedes' most anticipated junior in a generation. F2 runner-up in 2024 as a 17-year-old before a direct promotion to the Silver Arrows for 2025. Named after his godfather Kimi Räikkönen, the pressure of expectation sits alongside startling natural pace.",
  quote:"I want to win. I've always wanted to win. Nothing else.",
  quoteContext:"Media day, Mercedes, 2025",
  portraitUrl: W + 'Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin%2C_TX_(cropped).jpg',
}

export const antonelliStats: DriverStats = { driverId:"antonelli", series:"f1", titles:0, wins:0, poles:1, podiums:3, careerSpan:"2025–present", racesEntered:25, fastestLaps:1, pointsScored:62 }

export const antonelliEras: DriverEra[] = [
  { driverId:"antonelli", teamId:"mercedes", teamName:"Mercedes", seasons:"2025–present", highlights:["Youngest driver on 2025 grid","First pole at Imola 2025","Race podium debut"], titles:0, wins:0, teamLiveryHex:"#00D2BE", statLabel:"ROOKIE" },
]

export const antonelliSignature: DrivingSignature = {
  driverId:"antonelli", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:78 },
    { label:"Entry Aggression", value:86 },
    { label:"Tyre Management", value:72 },
    { label:"Throttle Application", value:84 },
    { label:"Braking", value:85 },
    { label:"Consistency", value:74 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.55, sampleSize:380,
}

export const antonelliReelSlides: ReelSlide[] = [
  { slotLabel:"KA · 25", label:"DEBUT", glowColor:"#00D2BE", tags:"F1 DEBUT · MERCEDES · 2025 SEASON OPENER", title:"2025 Debut", subtitle:"2025 · MERCEDES · AGE 18 · F1 START", svgPath:"M 30 160 L 90 160 Q 112 148 130 105 L 190 105 Q 215 122 235 160 L 290 160 Q 315 138 335 104 L 370 104", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2025_Imola_GP_Kimi_Antonelli.jpg" },
  { slotLabel:"KA · 25", label:"FIRST POLE", glowColor:"#00D2BE", tags:"IMOLA · MAIDEN FORMULA 1 POLE POSITION", title:"Imola quali", subtitle:"2025 · MERCEDES · YOUNGEST POLE IN YEARS", svgPath:"M 30 120 Q 60 110 85 85 L 145 85 Q 175 98 195 120 L 255 120 Q 285 105 310 80 L 370 80", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2025_Japan_GP_-_Mercedes_-_Kimi_Antonelli_-_FP2.jpg" },
  { slotLabel:"KA · 26", label:"YEAR 2", glowColor:"#00D2BE", tags:"SEASON 2 UNDERWAY · TARGET: FIRST WIN", title:"2026 Season", subtitle:"2026 · MERCEDES · GROWTH SEASON", svgPath:"M 30 150 L 80 150 Q 110 138 130 100 L 175 100 Q 195 115 210 150 L 260 150 Q 290 170 315 200 L 370 200", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2025_Nr._12_Antonelli.jpg" },
]

export const antonelliScoutingReport: ScoutingReport = {
  paragraphs:[
    "Antonelli was fast-tracked by Mercedes based on a junior career of startling precocity: at 17 he was competitive in F2 against drivers with multiple seasons of experience. His qualifying pace is the headline metric — short-run aggression, willingness to commit on cold tyres, and a spatial awareness in traffic that drivers rarely show before their second F1 season.",
    "The areas needing development are predictable for his experience level: tyre management over 20+ lap stints, consistent race starts, and strategic patience. His 2025 season showed clear improvement on all three counts, with teammates noting his speed of adaptation was abnormal.",
    "As a long-term Mercedes asset, Antonelli represents the Silver Arrows' plan for a post-Hamilton era that is younger, more aggressive, and built around his pairing with Russell. Sample size remains limited but trajectory is exceptional.",
  ],
  highlights:["exceptional qualifying pace","rapid adaptation","youngest on the grid"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:68, annotation:"SLIGHT ROTATION PREFERENCE" },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:55, annotation:"BALANCED" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:60, annotation:"MODERATE DOWNFORCE" },
  ],
  excelledAt:["Short qualifying runs","Wet-weather pace","High-speed sector confidence"],
  struggledWith:["Tyre life management in long stints","Race start consistency"],
}

/* ─── Alonso ───────────────────────────────────────────────────────────────── */

export const alonso: Driver = {
  id:"alonso", name:"Fernando Alonso", shortName:"Alonso", initials:"FA", nationality:"Spanish", dob:"1981-07-29", status:"active", series:["f1"], peakEraTeamId:"renault", entityColor:"alonso",
  bio:"Two-time world champion. The most analytically complete driver F1 has produced. Renault bookends frame a career of tactical brilliance — three stints at Ferrari, two at McLaren, alpine interludes — all producing performances above machinery. Active at 44 with Aston Martin in 2026.",
  quote:"Every corner, every lap, every race — I extract everything. That's all I know how to do.",
  quoteContext:"Retrospective, 2024",
  portraitUrl: W + 'Alonso-68_(24710447098).jpg',
}

export const alonsoStats: DriverStats = { driverId:"alonso", series:"f1", titles:2, wins:32, poles:22, podiums:106, careerSpan:"2001–present", racesEntered:403, fastestLaps:23, pointsScored:2267 }

export const alonsoEras: DriverEra[] = [
  { driverId:"alonso", teamId:"renault", teamName:"Renault", seasons:"2003–2006", highlights:["2× world champion (2005, 2006)","Youngest champion in history at the time","51 starts, 17 wins with Renault"], titles:2, wins:17, teamLiveryHex:"#FFD700", teamAccentHex:"#FFD700", statLabel:"2× WDC" },
  { driverId:"alonso", teamId:"mclaren", teamName:"McLaren", seasons:"2007", highlights:["P3 championship on McLaren debut","Controversial Hamilton-Alonso rivalry"], titles:0, wins:4, teamLiveryHex:"#FF8000", statLabel:"4W" },
  { driverId:"alonso", teamId:"renault", teamName:"Renault (2nd spell)", seasons:"2008–2009", highlights:["2 wins back at Renault"], titles:0, wins:2, teamLiveryHex:"#FFD700", statLabel:"2W" },
  { driverId:"alonso", teamId:"ferrari", teamName:"Ferrari", seasons:"2010–2014", highlights:["2 WDC near-misses (2010, 2012)","11 wins with Ferrari","Extracted maximum from non-dominant machinery"], titles:0, wins:11, teamLiveryHex:"#DC0000", statLabel:"11W · 2× P2" },
  { driverId:"alonso", teamId:"mclaren", teamName:"McLaren-Honda", seasons:"2015–2018", highlights:["Engine collaboration that failed","Indy 500 attempts","Performed above machinery consistently"], titles:0, wins:0, teamLiveryHex:"#FF8000", statLabel:"0W — fought for scraps" },
  { driverId:"alonso", teamId:"alpine", teamName:"Alpine", seasons:"2021–2022", highlights:["1 win — Hungary 2021","Consistent top-5 presence with Alpine"], titles:0, wins:1, teamLiveryHex:"#0090FF", statLabel:"1W" },
  { driverId:"alonso", teamId:"aston_martin", teamName:"Aston Martin", seasons:"2023–present", highlights:["8 podiums in debut Aston Martin season 2023","P4 championship in 2023"], titles:0, wins:0, teamLiveryHex:"#006F62", statLabel:"8 PODS · P4" },
]

export const alonsoSignature: DrivingSignature = {
  driverId:"alonso", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:96 },
    { label:"Entry Aggression", value:89 },
    { label:"Tyre Management", value:97 },
    { label:"Throttle Application", value:94 },
    { label:"Braking", value:93 },
    { label:"Consistency", value:98 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.96, sampleSize:3250,
}

export const alonsoReelSlides: ReelSlide[] = [
  { slotLabel:"FA · 05", label:"CHAMPION", glowColor:"#FFD700", tags:"2005 WORLD CHAMPION · YOUNGEST AT THE TIME", title:"Renault 2005", subtitle:"2005 · RENAULT · 7 WINS · FIRST TITLE", svgPath:"M 30 160 L 80 160 Q 100 145 115 110 L 160 110 Q 180 125 195 160 L 235 160 Q 255 175 270 205 L 310 205 Q 330 185 350 155 L 380 155", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Fernando_Alonso_2024_Chinese_GP.jpg" },
  { slotLabel:"FA · 12", label:"ALMOST", glowColor:"#DC0000", tags:"2012 TITLE DUEL · 3 POINTS BEHIND VETTEL", title:"Ferrari 2012", subtitle:"2012 · FERRARI · CLOSEST MISS · 11 WINS", svgPath:"M 30 120 Q 60 110 85 85 L 145 85 Q 175 98 195 120 L 255 120 Q 285 105 310 80 L 370 80", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2024_Nr._14_Alonso.jpg" },
  { slotLabel:"FA · 23", label:"COMEBACK", glowColor:"#006F62", tags:"ASTON MARTIN · 8 PODIUMS IN DEBUT SEASON", title:"Aston Martin", subtitle:"2023 · ASTON MARTIN · AGE 41 · P4 WDC", svgPath:"M 30 150 L 85 150 Q 108 132 130 92 L 180 88 Q 208 106 230 150 L 288 150 Q 312 133 338 92 L 375 90", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2024_Spanish_Grand_Prix_(53810013882).jpg" },
]

export const alonsoScoutingReport: ScoutingReport = {
  paragraphs:[
    "Edd Straw wrote in The Race that Alonso's ability to coordinate steering and throttle simultaneously in oversteer conditions is 'ludicrous' — a word chosen deliberately. Where most drivers either steer or apply throttle in a snap oversteer moment, Alonso does both in the same instant, at the same limit, without the cognitive hierarchy other drivers display. This reflexive coordination has not meaningfully diminished with age.",
    "His race management is the most complete the sport has produced. He manages tyre delta, gap to car ahead, fuel load evolution, and weather probability simultaneously across 60 laps without degradation in quality. Teams that worked with him report that his description of car behaviour at specific circuit sections is precise enough to identify the required setup change without needing video review — a feedback quality that saved Renault, Ferrari, and Alpine from development dead ends repeatedly.",
    "At 44 in the 2026 Aston Martin, the Saturday qualifying ceiling is fractionally lower. On Sundays, the management skills and race intelligence remain at a level no current driver can match. His value to Aston Martin is not just points — it is the development multiplier that his presence brings.",
  ],
  highlights:["race intelligence","engineering feedback precision","above-machinery extraction"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:62, annotation:"MILD ROTATION — ADAPTABLE", highlight:true },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:58, annotation:"CIRCUIT-SPECIFIC" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:65, annotation:"BALANCED — ADAPTS TO PACKAGE" },
  ],
  excelledAt:["Race management over 60 laps","Extracting maximum from non-dominant machinery","Engineering feedback and car development"],
  struggledWith:["Peak Saturday qualifying pace (later career)"],
}

/* ─── Stroll ───────────────────────────────────────────────────────────────── */

export const stroll: Driver = {
  id:"stroll", name:"Lance Stroll", shortName:"Stroll", initials:"LS", nationality:"Canadian", dob:"1998-10-29", status:"active", series:["f1"], peakEraTeamId:"aston_martin", entityColor:"stroll",
  bio:"The youngest Canadian to score F1 points. Three poles tell a different story to his reputation — Stroll in wet or unusual conditions is a different driver entirely, possessing elite car balance feel in degraded grip. A more complete driver than his standing suggests.",
  quote:"When conditions are right, I can fight anyone on this grid.",
  quoteContext:"Post-qualifying, Monza 2020",
  portraitUrl: W + 'Lance_Stroll_2024_Abu_Dhabi_(cropped).jpg',
}

export const strollStats: DriverStats = { driverId:"stroll", series:"f1", titles:0, wins:0, poles:3, podiums:12, careerSpan:"2017–present", racesEntered:165, fastestLaps:0, pointsScored:298 }

export const strollEras: DriverEra[] = [
  { driverId:"stroll", teamId:"williams", teamName:"Williams", seasons:"2017", highlights:["Youngest Canadian to score F1 points","Podium debut in Baku 2017"], titles:0, wins:0, teamLiveryHex:"#005AFF", statLabel:"P2 BAKU" },
  { driverId:"stroll", teamId:"racing_point", teamName:"Force India / Racing Point", seasons:"2018–2020", highlights:["Pole Monza 2020 (wet)","Pole Turkey 2020","2 podiums Racing Point"], titles:0, wins:0, teamLiveryHex:"#FF80C7", statLabel:"3 POLES" },
  { driverId:"stroll", teamId:"aston_martin", teamName:"Aston Martin", seasons:"2021–present", highlights:["Pole position Baku 2021","Multiple top-5 finishes 2023"], titles:0, wins:0, teamLiveryHex:"#006F62", statLabel:"1P · AM" },
]

export const strollSignature: DrivingSignature = {
  driverId:"stroll", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:78 },
    { label:"Entry Aggression", value:72 },
    { label:"Tyre Management", value:80 },
    { label:"Throttle Application", value:76 },
    { label:"Braking", value:74 },
    { label:"Consistency", value:70 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.75, sampleSize:1140,
}

export const strollReelSlides: ReelSlide[] = [
  { slotLabel:"LS · 17", label:"P3 DEBUT", glowColor:"#005AFF", tags:"BAKU 2017 · PODIUM ON F1 DEBUT SEASON", title:"Baku GP", subtitle:"2017 · WILLIAMS · YOUNGEST CANADIAN IN F1", svgPath:"M 30 160 L 90 160 Q 112 148 130 105 L 190 105 Q 215 122 235 160 L 290 160 Q 315 138 335 104 L 370 104", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_Stroll_(1).jpg" },
  { slotLabel:"LS · 20", label:"POLE", glowColor:"#FF80C7", tags:"MONZA POLE IN THE WET · ELITE CONDITIONS PACE", title:"Monza Quali", subtitle:"2020 · RACING POINT · UNEXPECTED POLE", svgPath:"M 30 155 Q 65 140 98 155 L 155 155 Q 185 140 218 155 L 275 155 Q 305 140 340 155 L 375 155", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2024_Nr._18_Stroll.jpg" },
  { slotLabel:"LS · 26", label:"AM", glowColor:"#006F62", tags:"ASTON MARTIN 2026 · RACING WITH ALONSO", title:"Aston Martin", subtitle:"2026 · ASTON MARTIN · SENIOR SEASON", svgPath:"M 30 150 L 80 150 Q 110 138 130 100 L 175 100 Q 195 115 210 150 L 260 150 Q 290 170 315 200 L 370 200" },
]

export const strollScoutingReport: ScoutingReport = {
  paragraphs:[
    "Stroll is a more nuanced driver than his positioning in the standings typically suggests. In degraded or unusual grip conditions — standing water, damp patches, evolving track surface — he displays a level of car-feel that produces qualifying results far above his normal dry-weather ceiling. His three poles, all in mixed conditions, are genuine, not flukes.",
    "His Achilles heel is dry-condition qualifying where the fine margin between grip and overstep is unforgiving. Stroll's style does not naturally generate front-axle load through the entry phase, making the critical last 2% of lap time elusive on Saturday afternoons when track conditions are optimal and competitors extract their maximum.",
  ],
  highlights:["elite wet-weather pace","three pole positions","improving racecraft"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:48, annotation:"SLIGHT UNDERSTEER TENDENCY" },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:50, annotation:"BALANCED PREFERENCE" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:62, annotation:"HIGH-DF PREFERRED" },
  ],
  excelledAt:["Wet-weather and mixed conditions","Baku-style street circuit grip transitions"],
  struggledWith:["Optimal dry-condition qualifying extraction","Consistent pace in stable conditions"],
}

/* ─── Gasly ────────────────────────────────────────────────────────────────── */

export const gasly: Driver = {
  id:"gasly", name:"Pierre Gasly", shortName:"Gasly", initials:"PG", nationality:"French", dob:"1996-02-07", status:"active", series:["f1"], peakEraTeamId:"alphatauri", entityColor:"gasly",
  bio:"The most emphatic comeback in recent F1 history. Demoted from Red Bull mid-2019 after struggling, he returned to Toro Rosso and won the Italian GP in 2020 — one of the race of the decade. Now an established Alpine front-runner in his home team.",
  quote:"Monza 2020 changed everything. It told me what I was capable of.",
  quoteContext:"Retrospective interview, 2022",
  portraitUrl: W + 'Pierre_Gasly_2024_Abu_Dhabi_(cropped).jpg',
}

export const gaslyStats: DriverStats = { driverId:"gasly", series:"f1", titles:0, wins:1, poles:1, podiums:4, careerSpan:"2017–present", racesEntered:160, fastestLaps:4, pointsScored:444 }

export const gaslyEras: DriverEra[] = [
  { driverId:"gasly", teamId:"toro_rosso", teamName:"Toro Rosso", seasons:"2017–2018", highlights:["F1 debut Bahrain 2017","Points score in F1 rookie season"], titles:0, wins:0, teamLiveryHex:"#C00000", statLabel:"F1 DEBUT" },
  { driverId:"gasly", teamId:"red_bull", teamName:"Red Bull", seasons:"2019", highlights:["Promoted to Red Bull 2019","Demoted mid-season after struggles"], titles:0, wins:0, teamLiveryHex:"#1E3A8A", statLabel:"DEMOTION" },
  { driverId:"gasly", teamId:"alphatauri", teamName:"AlphaTauri", seasons:"2019–2022", highlights:["MONZA 2020 VICTORY","Emotional first F1 win in Italian GP","Podium São Paulo 2021"], titles:0, wins:1, teamLiveryHex:"#4169E1", teamAccentHex:"#FFD700", statLabel:"1W" },
  { driverId:"gasly", teamId:"alpine", teamName:"Alpine", seasons:"2023–present", highlights:["Team leader at Alpine","Points scorer in difficult machinery"], titles:0, wins:0, teamLiveryHex:"#0090FF", statLabel:"TEAM LEADER" },
]

export const gaslySignature: DrivingSignature = {
  driverId:"gasly", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:82 },
    { label:"Entry Aggression", value:84 },
    { label:"Tyre Management", value:80 },
    { label:"Throttle Application", value:83 },
    { label:"Braking", value:87 },
    { label:"Consistency", value:79 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.78, sampleSize:1120,
}

export const gaslyReelSlides: ReelSlide[] = [
  { slotLabel:"PG · 20", label:"WIN", glowColor:"#4169E1", tags:"MONZA · ONE OF THE GREATEST UPSETS IN F1 HISTORY", title:"Italian GP", subtitle:"2020 · ALPHATAURI · GASLY WINS MONZA", svgPath:"M 30 155 Q 65 140 98 155 L 155 155 Q 185 140 218 155 L 275 155 Q 305 140 340 155 L 375 155", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Pierre_Gasly_2024_Chinese_GP.jpg" },
  { slotLabel:"PG · 21", label:"P3", glowColor:"#4169E1", tags:"SÃO PAULO PODIUM · SECOND CAREER PODIUM", title:"São Paulo GP", subtitle:"2021 · ALPHATAURI · P3 IN BRAZIL", svgPath:"M 30 120 L 90 120 Q 112 108 130 70 L 180 70 Q 210 88 230 120 L 290 120 Q 310 104 325 72 L 370 72", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_Gasly_(1).jpg" },
  { slotLabel:"PG · 26", label:"ALPINE", glowColor:"#0090FF", tags:"ALPINE 2026 · LEADING HOME TEAM INTO NEW ERA", title:"Alpine 2026", subtitle:"2026 · ALPINE · HOME TEAM LEAD", svgPath:"M 30 150 L 80 150 Q 110 138 130 100 L 175 100 Q 195 115 210 150 L 260 150 Q 290 170 315 200 L 370 200", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2024_Nr._10_Gasly.jpg" },
]

export const gaslyScoutingReport: ScoutingReport = {
  paragraphs:[
    "Gasly's career trajectory has a defining pivot: the 2020 Italian GP, where he drove an AlphaTauri to a result that should have been mathematically impossible given the competitive order. His win at Monza came through clean racecraft, reading a late safety car perfectly, and holding off Hamilton with genuine wheel-to-wheel skill. That performance established him as more than a journey-driver.",
    "His strongest trait is high-speed braking commitment — his late-apex style under braking generates front-axle load efficiently, making him genuinely fast in the late-braking zones that punish hesitation. His weaker area is tyre management in longer stints where consistency of pace drops relative to his qualifying level.",
  ],
  highlights:["Monza 2020 win","high-speed braking commitment","racecraft under pressure"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:64, annotation:"ROTATION AT ENTRY" },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:55, annotation:"MEDIUM COMPLIANCE" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:62, annotation:"MODERATE DOWNFORCE" },
  ],
  excelledAt:["Late-braking zones","Safety car restarts and race reading","Wheel-to-wheel racecraft"],
  struggledWith:["Long-stint tyre management","Consistent podium conversion"],
}

/* ─── Colapinto ────────────────────────────────────────────────────────────── */

export const colapinto: Driver = {
  id:"colapinto", name:"Franco Colapinto", shortName:"Colapinto", initials:"FC", nationality:"Argentine", dob:"2003-05-27", status:"active", series:["f1"], peakEraTeamId:"alpine", entityColor:"colapinto",
  bio:"Argentina's first F1 representative since 2001. Thrust into a Williams mid-season in 2024 after just 9 races, he delivered performances that prompted Alpine to sign him for 2026. Carries the weight of a nation with visible ease.",
  quote:"I never thought I'd be in F1 this soon. I'm not going to waste a single lap.",
  quoteContext:"Press conference, Singapore 2024",
  portraitUrl: W + 'Franco_Colapinto_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_(028A8704)_(cropped).jpg',
}

export const colapintoStats: DriverStats = { driverId:"colapinto", series:"f1", titles:0, wins:0, poles:0, podiums:0, careerSpan:"2024–present", racesEntered:22, fastestLaps:0, pointsScored:11 }

export const colapintoEras: DriverEra[] = [
  { driverId:"colapinto", teamId:"williams", teamName:"Williams", seasons:"2024", highlights:["Mid-season debut replacing Sargeant","P6 Singapore 2024 — breakthrough result","First Argentine driver since 2001"], titles:0, wins:0, teamLiveryHex:"#005AFF", statLabel:"P6 SGP" },
  { driverId:"colapinto", teamId:"alpine", teamName:"Alpine", seasons:"2025–present", highlights:["Full-season contract 2026","Argentina following his every race"], titles:0, wins:0, teamLiveryHex:"#0090FF", statLabel:"FULL SEASON" },
]

export const colapintoSignature: DrivingSignature = {
  driverId:"colapinto", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:74 },
    { label:"Entry Aggression", value:82 },
    { label:"Tyre Management", value:72 },
    { label:"Throttle Application", value:79 },
    { label:"Braking", value:80 },
    { label:"Consistency", value:68 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.42, sampleSize:210,
}

export const colapintoReelSlides: ReelSlide[] = [
  { slotLabel:"FC · 24", label:"DEBUT", glowColor:"#005AFF", tags:"WILLIAMS DEBUT · FIRST ARGENTINE IN F1 SINCE 2001", title:"F1 Debut", subtitle:"2024 · WILLIAMS · ARGENTINA WATCHES", svgPath:"M 30 160 L 90 160 Q 112 148 130 105 L 190 105 Q 215 122 235 160 L 290 160 Q 315 138 335 104 L 370 104", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Franco_Colapinto_2025_Italian_Grand_Prix_FP3.jpg" },
  { slotLabel:"FC · 24", label:"P6", glowColor:"#005AFF", tags:"SINGAPORE P6 · BREAKTHROUGH RESULT IN 3RD RACE", title:"Singapore GP", subtitle:"2024 · WILLIAMS · BEST F1 RESULT", svgPath:"M 30 120 Q 60 110 85 85 L 145 85 Q 175 98 195 120 L 255 120 Q 285 105 310 80 L 370 80", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Imola_2025_No._43_Colapinto.jpg" },
  { slotLabel:"FC · 26", label:"ALPINE", glowColor:"#0090FF", tags:"ALPINE 2026 · FULL SEASON · BUILDING", title:"Alpine 2026", subtitle:"2026 · ALPINE · FIRST FULL SEASON", svgPath:"M 30 150 L 80 150 Q 110 138 130 100 L 175 100 Q 195 115 210 150 L 260 150 Q 290 170 315 200 L 370 200", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2025_Emilia_Romagna_Grand_Prix_01.jpg" },
]

export const colapintoScoutingReport: ScoutingReport = {
  paragraphs:[
    "Colapinto's 2024 mid-season debut was one of the most scrutinised arrivals in recent F1 memory — not least because nine races in a Williams is a brutally short audition. What he showed was a driver with elite braking confidence and real race intelligence above his experience level. His P6 in Singapore came in his third race start, in wet-to-dry conditions, against drivers with years of F1 experience.",
    "The key metrics from his limited sample: qualifying pace that consistently matched or bettered the benchmark for the Williams FW46's expected range, and race-management that prioritised tyre longevity intelligently. Errors were present — as expected — but the correct ones: pushing at moments that mattered, consolidating when the race demanded it.",
  ],
  highlights:["Singapore P6 in debut season","elite braking confidence","reading race conditions above experience level"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:62, annotation:"SLIGHT ROTATION ON ENTRY" },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:52, annotation:"SLIGHTLY COMPLIANT" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:60, annotation:"MODERATE DOWNFORCE" },
  ],
  excelledAt:["Late braking commitment","Wet-to-dry transitions","Above-experience race reading"],
  struggledWith:["Consistency in qualifying (small sample)","Street circuit barriers"],
}

/* ─── Albon ────────────────────────────────────────────────────────────────── */

export const albon: Driver = {
  id:"albon", name:"Alexander Albon", shortName:"Albon", initials:"AA", nationality:"Thai", dob:"1996-03-23", status:"active", series:["f1"], peakEraTeamId:"williams", entityColor:"albon",
  bio:"Wrongly dismissed by Red Bull after two seasons, Albon spent 2021 as a reserve before Williams gave him a second chance. The consistency and car development skill he showed with Williams — dragging the FW46 to regular points against better machinery — vindicated every manager who backed his return.",
  quote:"2021 was the hardest year of my career. Williams gave me back everything.",
  quoteContext:"Williams press day, 2022",
  portraitUrl: W + 'Alex_Albon_2024_Abu_Dhabi_(cropped).jpg',
}

export const albonStats: DriverStats = { driverId:"albon", series:"f1", titles:0, wins:0, poles:0, podiums:2, careerSpan:"2019–present", racesEntered:112, fastestLaps:1, pointsScored:258 }

export const albonEras: DriverEra[] = [
  { driverId:"albon", teamId:"toro_rosso", teamName:"Toro Rosso / Red Bull", seasons:"2019–2020", highlights:["Promoted to Red Bull mid-2019","2 podiums (Bahrain P3, Abu Dhabi P3)","Released after 2020 season"], titles:0, wins:0, teamLiveryHex:"#1E3A8A", statLabel:"2 PODS" },
  { driverId:"albon", teamId:"williams", teamName:"Williams", seasons:"2022–present", highlights:["Points in non-points Williams","Driver of the Year candidates multiple times","Team leader and car developer"], titles:0, wins:0, teamLiveryHex:"#005AFF", teamAccentHex:"#FFFFFF", statLabel:"TEAM LEADER" },
]

export const albonSignature: DrivingSignature = {
  driverId:"albon", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:85 },
    { label:"Entry Aggression", value:78 },
    { label:"Tyre Management", value:84 },
    { label:"Throttle Application", value:82 },
    { label:"Braking", value:80 },
    { label:"Consistency", value:87 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.76, sampleSize:880,
}

export const albonReelSlides: ReelSlide[] = [
  { slotLabel:"AA · 20", label:"P3", glowColor:"#1E3A8A", tags:"BAHRAIN P3 · RED BULL ERA HIGHLIGHT", title:"Bahrain GP", subtitle:"2020 · RED BULL · CAREER BEST RESULT", svgPath:"M 30 160 L 90 160 Q 112 148 130 105 L 190 105 Q 215 122 235 160 L 290 160 Q 315 138 335 104 L 370 104", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Alex_Albon_2024_Chinese_GP.jpg" },
  { slotLabel:"AA · 23", label:"WILLIAMS", glowColor:"#005AFF", tags:"WILLIAMS RESURGENCE · POINTS FROM NOTHING", title:"Williams era", subtitle:"2022–present · WILLIAMS · DEFYING PERFORMANCE CEILING", svgPath:"M 30 155 Q 65 140 98 155 L 155 155 Q 185 140 218 155 L 275 155 Q 305 140 340 155 L 375 155", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_Albon_(1).jpg" },
  { slotLabel:"AA · 26", label:"SAINZ ERA", glowColor:"#005AFF", tags:"WILLIAMS 2026 · ALONGSIDE CARLOS SAINZ", title:"Williams 2026", subtitle:"2026 · WILLIAMS · ALBON + SAINZ", svgPath:"M 30 150 L 80 150 Q 110 138 130 100 L 175 100 Q 195 115 210 150 L 260 150 Q 290 170 315 200 L 370 200", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2025_Nr._23_Albon.jpg" },
]

export const albonScoutingReport: ScoutingReport = {
  paragraphs:[
    "Albon's career has been defined by the ability to find pace in cars that statistically should not deliver it. His seasons with Williams produced multiple points finishes in machinery that, on pure performance delta, had no business finishing in the top 10. This is not luck or strategy alone — it is consistent race management, tyre conservation under pressure, and DRS train tactics executed near-perfectly.",
    "His feedback quality is consistently praised by Williams engineers: detailed, reliable, and actionable. The 2022–2025 Williams cars improved measurably with Albon as team leader and development driver, a correlation that speaks to his off-track technical investment.",
    "The lingering question mark is his ceiling in a front-running car. His Red Bull stint at 2019–2020 showed comfort rather than dominance alongside Verstappen. Williams 2026 with Sainz provides a different measuring stick.",
  ],
  highlights:["car development feedback","points from below-par machinery","consistent race management"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:55, annotation:"BALANCED · STABLE" },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:58, annotation:"MEDIUM COMPLIANCE" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:60, annotation:"MODERATE DOWNFORCE" },
  ],
  excelledAt:["Race management","Tyre conservation","Points extraction from mid-pack"],
  struggledWith:["Extracting absolute peak single-lap time","Asserting pace in front-running machinery"],
}

/* ─── Sainz ────────────────────────────────────────────────────────────────── */

export const sainz: Driver = {
  id:"sainz", name:"Carlos Sainz", shortName:"Sainz", initials:"CS", nationality:"Spanish", dob:"1994-09-01", status:"active", series:["f1"], peakEraTeamId:"ferrari", entityColor:"sainz",
  bio:"Son of a rally legend, built his own legacy on racecraft over raw pace. Four teams, four different car philosophies, consistent top-10 results throughout. Three wins including Silverstone 2022 and Singapore 2023 — a driver who extracts more than the machinery deserves.",
  quote:"My father won rallies in the dirt. I win in the rain. Different surfaces, same DNA.",
  quoteContext:"Post-race, Silverstone 2022",
  portraitUrl: W + 'Formula1Gabelhofen2022_(04)_(cropped2).jpg',
}

export const sainzStats: DriverStats = { driverId:"sainz", series:"f1", titles:0, wins:4, poles:6, podiums:28, careerSpan:"2015–present", racesEntered:198, fastestLaps:5, pointsScored:1166 }

export const sainzEras: DriverEra[] = [
  { driverId:"sainz", teamId:"toro_rosso", teamName:"Toro Rosso", seasons:"2015–2017", highlights:["Outstanding debut year 2015","Points on talent not machinery"], titles:0, wins:0, teamLiveryHex:"#C00000", statLabel:"DEBUT ERA" },
  { driverId:"sainz", teamId:"renault", teamName:"Renault", seasons:"2017–2018", highlights:["Podium debut Bahrain 2018 (!)","Mid-grid extraction master"], titles:0, wins:0, teamLiveryHex:"#FFD700", statLabel:"1 POD" },
  { driverId:"sainz", teamId:"mclaren", teamName:"McLaren", seasons:"2019–2020", highlights:["Consistent P5 finishes","Dragged McLaren toward top 5"], titles:0, wins:0, teamLiveryHex:"#FF8000", statLabel:"TOP 5" },
  { driverId:"sainz", teamId:"ferrari", teamName:"Ferrari", seasons:"2021–2024", highlights:["First win Silverstone 2022","Singapore 2023 masterclass","Melbourne 2024 win"], titles:0, wins:3, teamLiveryHex:"#DC0000", teamAccentHex:"#FFD700", statLabel:"3W · 6P" },
  { driverId:"sainz", teamId:"williams", teamName:"Williams", seasons:"2025–present", highlights:["Elevated Williams to mid-field force","First win for Williams in decades"], titles:0, wins:1, teamLiveryHex:"#005AFF", statLabel:"WIL W" },
]

export const sainzSignature: DrivingSignature = {
  driverId:"sainz", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:88 },
    { label:"Entry Aggression", value:85 },
    { label:"Tyre Management", value:88 },
    { label:"Throttle Application", value:87 },
    { label:"Braking", value:86 },
    { label:"Consistency", value:90 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.89, sampleSize:1580,
}

export const sainzReelSlides: ReelSlide[] = [
  { slotLabel:"CS · 22", label:"FIRST WIN", glowColor:"#DC0000", tags:"SILVERSTONE IN THE RAIN · FIRST F1 WIN", title:"British GP", subtitle:"2022 · FERRARI · EMOTIONAL MAIDEN WIN", svgPath:"M 30 120 L 80 120 Q 112 108 130 70 L 180 70 Q 210 88 230 120 L 290 120 Q 310 104 325 72 L 370 72", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Carlos_Sainz_2025_Italian_Grand_Prix_FP3.jpg" },
  { slotLabel:"CS · 23", label:"SINGAPORE", glowColor:"#DC0000", tags:"SINGAPORE MASTERCLASS · PERFECT RACE EXECUTION", title:"Singapore GP", subtitle:"2023 · FERRARI · POLE TO WIN", svgPath:"M 30 150 L 85 150 Q 108 132 130 92 L 180 88 Q 208 106 230 150 L 288 150 Q 312 133 338 92 L 375 90", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2025_Nr._55_Sainz.jpg" },
  { slotLabel:"CS · 26", label:"WILLIAMS", glowColor:"#005AFF", tags:"WILLIAMS 2026 · ELEVATING GROVE TO THE FRONT", title:"Williams 2026", subtitle:"2026 · WILLIAMS · ALONGSIDE ALBON", svgPath:"M 30 155 Q 65 140 98 155 L 155 155 Q 185 140 218 155 L 275 155 Q 305 140 340 155 L 375 155", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2025_Japan_GP_-_Williams_-_Carlos_Sainz_-_FP1.jpg" },
]

export const sainzScoutingReport: ScoutingReport = {
  paragraphs:[
    "Sainz runs a bespoke steering column paddle arrangement that teams he joins must accommodate — a twin-paddle configuration inherited from his early Red Bull junior days that he has maintained across every car. At Ferrari the team initially resisted the preference but ultimately adapted. At Williams for 2025, the same request was made and fulfilled. This kind of setup-specific insistence reflects a broader pattern: Sainz is meticulous about the physical interface between driver and car, to a degree unusual even at the top level.",
    "His driving style centres on mid-corner smoothness — he avoids scrubbing rear tyres by keeping entry understeer manageable, which sacrifices some front-end rotation speed for tyre life. The trade-off produces outstanding race day pace relative to qualifying, making him consistently faster on Sundays than his Saturday grid position suggests. Singapore 2023 is the archetype: pole, fastest laps, gap managed to the tenth, tyres alive at the end of a circuit that destroys rubber.",
    "Williams inherited a driver still adjusting from Ferrari habits — four years in a high-rotation car leaves fingerprints on technique. Early 2025 showed occasional oversteer corrections under braking that were atypical for Sainz. By midseason those had largely resolved, confirming his track record across five teams: the adaptation always completes.",
  ],
  highlights:["Sunday racecraft","tyre longevity skill","above-machinery extraction"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:56, annotation:"BALANCED ROTATION", highlight:true },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:60, annotation:"SLIGHTLY STIFF · STABLE" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:65, annotation:"MODERATE-HIGH DOWNFORCE" },
  ],
  excelledAt:["Sunday race management","Singapore and street circuits","Above-expectation result delivery"],
  struggledWith:["Peak Saturday qualifying vs elite qualifiers","Internal team political environments"],
}

/* ─── Bearman F1 ───────────────────────────────────────────────────────────── */

export const bearmanF1Stats: DriverStats = { driverId:"bearman", series:"f1", titles:0, wins:0, poles:0, podiums:0, careerSpan:"2024–present", racesEntered:30, fastestLaps:0, pointsScored:62 }

export const bearmanF1Signature: DrivingSignature = {
  driverId:"bearman", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:80 },
    { label:"Entry Aggression", value:87 },
    { label:"Tyre Management", value:75 },
    { label:"Throttle Application", value:83 },
    { label:"Braking", value:86 },
    { label:"Consistency", value:76 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.58, sampleSize:420,
}

export const bearmanF1ReelSlides: ReelSlide[] = [
  { slotLabel:"OB · 24", label:"F1 DEBUT", glowColor:"#DC0000", tags:"SAUDI ARABIA · P7 · FERRARI SUBSTITUTE AT 18", title:"Saudi GP", subtitle:"2024 · FERRARI SUB · SCORINGON DEBUT", svgPath:"M 30 160 L 80 160 Q 100 145 115 110 L 160 110 Q 180 125 195 160 L 235 160 Q 255 175 270 205 L 310 205 Q 330 185 350 155 L 380 155", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Oliver_Bearman_2025_Italian_Grand_Prix_qualifying.jpg" },
  { slotLabel:"OB · 25", label:"HAAS", glowColor:"#B6BABD", tags:"HAAS FULL SEASON · CAREER-BEST P4 MEXICO", title:"Haas 2025", subtitle:"2025 · HAAS · 62 POINTS · P13 WDC", svgPath:"M 30 120 Q 60 110 85 85 L 145 85 Q 175 98 195 120 L 255 120 Q 285 105 310 80 L 370 80", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_FP2.jpg" },
  { slotLabel:"OB · 26", label:"YEAR 3", glowColor:"#B6BABD", tags:"HAAS 2026 · TARGET: FIRST F1 PODIUM", title:"Haas 2026", subtitle:"2026 · HAAS · THIRD SEASON", svgPath:"M 30 150 L 80 150 Q 110 138 130 100 L 175 100 Q 195 115 210 150 L 260 150 Q 290 170 315 200 L 370 200", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2025_Nr._87_Bearman.jpg" },
]

export const bearmanF1ScoutingReport: ScoutingReport = {
  paragraphs:[
    "Bearman's F1 debut for Ferrari in Saudi Arabia 2024 — aged 18, with 90 minutes notice, in a car he hadn't driven at race distance — produced P7 and 6 points. It remains one of the most composed F1 emergency debuts in history. The score matters less than what it revealed: a driver with exceptional composure under extreme pressure and genuine front-end commitment that Haas subsequently saw enough of to sign him full-time.",
    "His 2025 Haas season produced 62 points and a P4 at Mexico City — a result that confirmed his Saudi debut was not an anomaly. His driving style at Haas centred around strong braking aggression and confidence in the front axle's rotation, which suits the VF-25's characteristics. Tyre management over longer stints remains the key development area.",
  ],
  highlights:["composed emergency debut","P4 Mexico City","elite braking confidence"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:66, annotation:"ROTATION PREFERRED" },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:58, annotation:"MEDIUM COMPLIANCE" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:62, annotation:"MODERATE DOWNFORCE" },
  ],
  excelledAt:["High-pressure debut situations","Braking zone commitment","Adapting to unfamiliar machinery"],
  struggledWith:["Long-stint tyre management","Consistency through a full race weekend"],
}

/* ─── Ocon ─────────────────────────────────────────────────────────────────── */

export const ocon: Driver = {
  id:"ocon", name:"Esteban Ocon", shortName:"Ocon", initials:"EO", nationality:"French", dob:"1996-09-17", status:"active", series:["f1"], peakEraTeamId:"alpine", entityColor:"ocon",
  bio:"Hungary 2021 defines his career: a perfect race from start to finish — surviving a first-lap incident, managing tyres on a strategy that no one else attempted, holding off Hamilton for the final ten laps. One win, delivered with precision when it mattered most.",
  quote:"The race that stays with me isn't the one I won. It's the ones I should have.",
  quoteContext:"Driver profile interview, 2023",
  portraitUrl: W + 'Esteban_Ocon_2024_Abu_Dhabi_(cropped).jpg',
}

export const oconStats: DriverStats = { driverId:"ocon", series:"f1", titles:0, wins:1, poles:0, podiums:4, careerSpan:"2016–present", racesEntered:170, fastestLaps:2, pointsScored:406 }

export const oconEras: DriverEra[] = [
  { driverId:"ocon", teamId:"force_india", teamName:"Force India / Racing Point", seasons:"2017–2018", highlights:["Consistent points finishes","Clash with Perez at Force India"], titles:0, wins:0, teamLiveryHex:"#FF80C7", statLabel:"P8 WDC" },
  { driverId:"ocon", teamId:"renault", teamName:"Renault", seasons:"2020", highlights:["Return to grid after Mercedes reserve year","Podium Bahrain 2020 second chance GP"], titles:0, wins:0, teamLiveryHex:"#FFD700", statLabel:"RETURN" },
  { driverId:"ocon", teamId:"alpine", teamName:"Alpine", seasons:"2021–2024", highlights:["HUNGARY 2021 WIN","Held off Hamilton in final laps","4 career podiums total"], titles:0, wins:1, teamLiveryHex:"#0090FF", teamAccentHex:"#FFD700", statLabel:"1W" },
  { driverId:"ocon", teamId:"haas", teamName:"Haas", seasons:"2026–present", highlights:["New team 2026","Alongside Bearman at Haas"], titles:0, wins:0, teamLiveryHex:"#B6BABD", statLabel:"HAAS 26" },
]

export const oconSignature: DrivingSignature = {
  driverId:"ocon", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:82 },
    { label:"Entry Aggression", value:80 },
    { label:"Tyre Management", value:85 },
    { label:"Throttle Application", value:80 },
    { label:"Braking", value:82 },
    { label:"Consistency", value:82 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.78, sampleSize:1250,
}

export const oconReelSlides: ReelSlide[] = [
  { slotLabel:"EO · 21", label:"WIN", glowColor:"#0090FF", tags:"HUNGARIAN GP · LIGHTS-TO-FLAG · HELD HAMILTON", title:"Hungarian GP", subtitle:"2021 · ALPINE · ONLY F1 WIN", svgPath:"M 30 160 L 90 160 Q 112 148 130 105 L 190 105 Q 215 122 235 160 L 290 160 Q 315 138 335 104 L 370 104", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Esteban_Ocon_2024_Chinese_GP.jpg" },
  { slotLabel:"EO · 24", label:"ALPINE", glowColor:"#0090FF", tags:"FINAL ALPINE SEASON · POINTS IN DIFFICULT YEAR", title:"Alpine 2024", subtitle:"2024 · ALPINE · FINAL SEASON", svgPath:"M 30 120 Q 60 110 85 85 L 145 85 Q 175 98 195 120 L 255 120 Q 285 105 310 80 L 370 80", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_Ocon_(1).jpg" },
  { slotLabel:"EO · 26", label:"HAAS", glowColor:"#B6BABD", tags:"HAAS 2026 · NEW CHAPTER · PROVEN RACE WINNER", title:"Haas 2026", subtitle:"2026 · HAAS · VETERAN PRESENCE", svgPath:"M 30 155 Q 65 140 98 155 L 155 155 Q 185 140 218 155 L 275 155 Q 305 140 340 155 L 375 155", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2024_Nr._31_Ocon.jpg" },
]

export const oconScoutingReport: ScoutingReport = {
  paragraphs:[
    "Ocon's Hungary 2021 win crystallises what he is as a racing driver: a tactician with strong tyre management who can execute an improbable strategy and defend the result under pressure. That race required managing a two-stop versus one-stop calculation, executing a start that avoided the chaos that collected most of the field, and then 10 laps holding off Hamilton — a driver 0.5s per lap faster on fresh tyres.",
    "Away from that single high-point, Ocon has been a consistent mid-field scorer — reliable at converting machinery into points without the peaks that attract headlines. His qualifying pace ceiling has been his most persistent limitation, often leaving him fighting from further back than his race pace should require.",
  ],
  highlights:["Hungary 2021 race victory","tyre strategy execution","defending race leads"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:55, annotation:"NEUTRAL BALANCED" },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:55, annotation:"BALANCED COMPLIANCE" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:65, annotation:"HIGH DOWNFORCE PREFERRED" },
  ],
  excelledAt:["Tyre management","Race strategy execution","Holding position under pressure"],
  struggledWith:["Saturday qualifying pace ceiling","High-frequency pace peaks"],
}

/* ─── Hülkenberg ───────────────────────────────────────────────────────────── */

export const hulkenberg: Driver = {
  id:"hulkenberg", name:"Nico Hülkenberg", shortName:"Hülkenberg", initials:"NH", nationality:"German", dob:"1987-08-19", status:"active", series:["f1"], peakEraTeamId:"audi", entityColor:"hulkenberg",
  bio:"Le Mans 24H winner in his debut attempt. The most starts in F1 history without a podium — a record that reflects machinery as much as the driver. Back as Audi's lead driver for the new constructor era. One of the sport's most analytically respected racers.",
  quote:"The records I hold — some of them I'd rather not.",
  quoteContext:"Press conference, 2024",
  portraitUrl: W + 'Nico_H%C3%BClkenberg_2024_Abu_Dhabi_(cropped).jpg',
}

export const hulkenbergStats: DriverStats = { driverId:"hulkenberg", series:"f1", titles:0, wins:0, poles:1, podiums:0, careerSpan:"2010–present", racesEntered:228, fastestLaps:2, pointsScored:545 }

export const hulkenbergEras: DriverEra[] = [
  { driverId:"hulkenberg", teamId:"williams", teamName:"Williams", seasons:"2010", highlights:["Pole position Brazil 2010 in his 3rd race","Promising debut season"], titles:0, wins:0, teamLiveryHex:"#005AFF", statLabel:"POLE P1" },
  { driverId:"hulkenberg", teamId:"force_india", teamName:"Force India", seasons:"2012–2016", highlights:["Le Mans 24H winner 2015 on first attempt","Consistent midfield points scorer"], titles:0, wins:0, teamLiveryHex:"#FF80C7", statLabel:"LM WIN" },
  { driverId:"hulkenberg", teamId:"renault", teamName:"Renault / Racing Point / Aston Martin", seasons:"2017–2022", highlights:["Multi-team journeyman","COVID substitute drives","Continued points extraction"], titles:0, wins:0, teamLiveryHex:"#FFD700", statLabel:"JOURNEYMAN" },
  { driverId:"hulkenberg", teamId:"haas", teamName:"Haas", seasons:"2023–2025", highlights:["P6 WDC 2023 — career best","Inspired Haas resurgence","Full seasons of consistent points"], titles:0, wins:0, teamLiveryHex:"#B6BABD", teamAccentHex:"#FFFFFF", statLabel:"P6 WDC" },
  { driverId:"hulkenberg", teamId:"audi", teamName:"Audi", seasons:"2026–present", highlights:["Audi project lead driver","New chapter with German marque"], titles:0, wins:0, teamLiveryHex:"#BB1C2A", statLabel:"AUDI ERA" },
]

export const hulkenbergSignature: DrivingSignature = {
  driverId:"hulkenberg", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:86 },
    { label:"Entry Aggression", value:82 },
    { label:"Tyre Management", value:86 },
    { label:"Throttle Application", value:84 },
    { label:"Braking", value:85 },
    { label:"Consistency", value:88 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.85, sampleSize:1820,
}

export const hulkenbergReelSlides: ReelSlide[] = [
  { slotLabel:"NH · 10", label:"POLE", glowColor:"#005AFF", tags:"BRAZIL 2010 · POLE ON 3RD F1 START", title:"Brazil Quali", subtitle:"2010 · WILLIAMS · SHOCK POLE SITTER", svgPath:"M 30 160 L 90 160 Q 112 148 130 105 L 190 105 Q 215 122 235 160 L 290 160 Q 315 138 335 104 L 370 104", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Nico_Hulkenberg_2024_Chinese_GP.jpg" },
  { slotLabel:"NH · 23", label:"P6 WDC", glowColor:"#B6BABD", tags:"CAREER BEST CHAMPIONSHIP · HAAS ERA REVIVAL", title:"2023 Season", subtitle:"2023 · HAAS · P6 IN WDC", svgPath:"M 30 120 Q 60 110 85 85 L 145 85 Q 175 98 195 120 L 255 120 Q 285 105 310 80 L 370 80", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_H%C3%BClkenberg_(1).jpg" },
  { slotLabel:"NH · 26", label:"AUDI", glowColor:"#BB1C2A", tags:"AUDI ERA · LEAD DRIVER OF NEW GERMAN CONSTRUCTOR", title:"Audi 2026", subtitle:"2026 · AUDI · FRESH START", svgPath:"M 30 150 L 80 150 Q 110 138 130 100 L 175 100 Q 195 115 210 150 L 260 150 Q 290 170 315 200 L 370 200", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/H%C3%BClkenberg_2024_BelgiumGP.jpg" },
]

export const hulkenbergScoutingReport: ScoutingReport = {
  paragraphs:[
    "Hülkenberg's career statistician's nightmare — most starts without a podium — obscures a driver who has consistently delivered above-machinery results across fourteen years and five teams. His Le Mans 2015 win on first attempt (while also competing in F1) speaks to physical and mental capacity that most monodisciplinary drivers never test.",
    "His driving style is characterised by exceptional race-pace consistency. He rarely has the single-lap peak of his pole-position days (Brazil 2010 remains the high-water mark) but over a race distance his management of tyres and fuel is near-optimal. His 2023 Haas season — P6 in the championship — was possibly the best relative performance from any driver on the grid that year, given the machinery.",
    "As Audi's lead development driver, Hülkenberg brings something teams rarely get from a race seat: a driver with enough experience to know what he doesn't know. His feedback granularity is a genuine asset for a constructor building from scratch.",
  ],
  highlights:["Le Mans 2015 winner","P6 WDC 2023","above-machinery delivery across career"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:58, annotation:"NEUTRAL — BALANCED APPROACH" },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:62, annotation:"MEDIUM-STIFF" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:60, annotation:"BALANCED" },
  ],
  excelledAt:["Race-pace consistency","Tyre management across long stints","Above-machinery points extraction"],
  struggledWith:["Peak Saturday qualifying (mid-career)","Converting fast cars into podiums (machinery dependent)"],
}

/* ─── Bortoleto F1 ─────────────────────────────────────────────────────────── */

export const bortoletoF1Stats: DriverStats = { driverId:"bortoleto", series:"f1", titles:0, wins:0, poles:0, podiums:0, careerSpan:"2025–present", racesEntered:28, fastestLaps:0, pointsScored:30 }

export const bortoletoF1Signature: DrivingSignature = {
  driverId:"bortoleto", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:82 },
    { label:"Entry Aggression", value:84 },
    { label:"Tyre Management", value:78 },
    { label:"Throttle Application", value:83 },
    { label:"Braking", value:82 },
    { label:"Consistency", value:80 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.55, sampleSize:380,
}

export const bortoletoF1ReelSlides: ReelSlide[] = [
  { slotLabel:"GB · 25", label:"F1 DEBUT", glowColor:"#52E252", tags:"SAUBER/AUDI DEBUT · MELBOURNE 2025", title:"F1 Debut", subtitle:"2025 · SAUBER · START OF F1 CHAPTER", svgPath:"M 30 155 L 88 155 Q 112 140 145 98 L 192 98 Q 215 116 240 155 L 295 155 Q 318 139 348 98 L 375 98", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2025_ImolaGP_Gabriel_Bortoleto.jpg" },
  { slotLabel:"GB · 26", label:"AUDI", glowColor:"#BB1C2A", tags:"AUDI ERA BEGINS · NEW MANUFACTURER CHAPTER", title:"Audi 2026", subtitle:"2026 · AUDI · GERMAN POWER", svgPath:"M 30 150 L 85 150 Q 108 132 130 92 L 180 88 Q 208 106 230 150 L 288 150 Q 312 133 338 92 L 375 90", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2025_Japan_GP_-_Sauber_-_Gabriel_Bortoleto_-_FP2.jpg" },
  { slotLabel:"GB · 26", label:"GROWING", glowColor:"#BB1C2A", tags:"BUILDING INTO F1 · BACK-TO-BACK JUNIOR CHAMPION", title:"Development", subtitle:"2026 · AUDI · TARGET: FIRST POINTS", svgPath:"M 30 155 Q 65 140 98 155 L 155 155 Q 185 140 218 155 L 275 155 Q 305 140 340 155 L 375 155", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2025_Nr._5_Bortoleto.jpg" },
]

export const bortoletoF1ScoutingReport: ScoutingReport = {
  paragraphs:[
    "Bortoleto's transition from F2 champion to F1 midfield follows the template set by his three predecessors who won back-to-back F3/F2 titles (Leclerc, Russell, Piastri). All three became race winners within four F1 seasons — the question for Bortoleto is whether the Audi project gives him competitive machinery on that timeline.",
    "His F1 adaptation in 2025 showed the expected curve: initial overpush in qualifying as he calibrated the car's limits, gradually replaced by more consistent 90%-of-maximum laps as the year progressed. His race management improved measurably across the second half of 2025. The baseline raw pace is not in question.",
  ],
  highlights:["back-to-back junior titles","rapid F1 adaptation curve","Audi long-term project"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:60, annotation:"MODERATE ROTATION" },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:55, annotation:"BALANCED" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:64, annotation:"CORNER-SPEED FOCUS" },
  ],
  excelledAt:["Qualifying pace on good days","Race craft from junior racing","Extracting from difficult machinery"],
  struggledWith:["F1 tyre degradation learning curve","Consistency through full race weekends"],
}

/* ─── Tsunoda ───────────────────────────────────────────────────────────────── */

export const tsunoda: Driver = {
  id:"tsunoda", name:"Yuki Tsunoda", shortName:"Tsunoda", initials:"YT", nationality:"Japanese", dob:"2000-05-11", status:"active", series:["f1"], peakEraTeamId:"rb", entityColor:"tsunoda",
  bio:"Japan's most promising F1 talent in a generation. Raw pace that stunned Red Bull enough to sign him at 20, paired with emotional volatility that has characterised his early seasons — but a driver maturing race-by-race into one of the most complete midfield performers on the grid.",
  quote:"I'm Japanese. I will not stop until I am the best.",
  quoteContext:"Sky Sports interview, 2022",
  portraitUrl: W + 'Yuki_Tsunoda_2024_Abu_Dhabi_(cropped).jpg',
}

export const tsunodaStats: DriverStats = { driverId:"tsunoda", series:"f1", titles:0, wins:0, poles:0, podiums:2, careerSpan:"2021–present", racesEntered:98, fastestLaps:3, pointsScored:198 }

export const tsunodaEras: DriverEra[] = [
  { driverId:"tsunoda", teamId:"alphatauri", teamName:"AlphaTauri / Racing Bulls", seasons:"2021–present", highlights:["Bahrain 2021 debut — points scored","Rapid pace maturation through 2022–2024","Race podiums as machinery allowed"], titles:0, wins:0, teamLiveryHex:"#6692FF", statLabel:"POINTS SCORER" },
]

export const tsunodaSignature: DrivingSignature = {
  driverId:"tsunoda", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:77 },
    { label:"Entry Aggression", value:90 },
    { label:"Tyre Management", value:76 },
    { label:"Throttle Application", value:85 },
    { label:"Braking", value:88 },
    { label:"Consistency", value:74 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.72, sampleSize:780,
}

export const tsunodaReelSlides: ReelSlide[] = [
  { slotLabel:"YT · 21", label:"DEBUT PTS", glowColor:"#6692FF", tags:"BAHRAIN 2021 · DEBUT POINTS · JAPAN WATCHES", title:"Bahrain debut", subtitle:"2021 · ALPHATAURI · DEBUT SEASON", svgPath:"M 30 160 L 90 160 Q 112 148 130 105 L 190 105 Q 215 122 235 160 L 290 160 Q 315 138 335 104 L 370 104", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Yuki_Tsunoda_Chinese_GP_2024.jpg" },
  { slotLabel:"YT · 24", label:"MATURING", glowColor:"#6692FF", tags:"2024 · RACING BULLS · STRONGEST SEASON YET", title:"2024 Campaign", subtitle:"2024 · RACING BULLS · CONSISTENT SCORER", svgPath:"M 30 120 Q 60 110 85 85 L 145 85 Q 175 98 195 120 L 255 120 Q 285 105 310 80 L 370 80", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_Tsunoda_(1).jpg" },
  { slotLabel:"YT · 26", label:"RB", glowColor:"#6692FF", tags:"RACING BULLS 2026 · SENIOR DRIVER · JAPAN'S HOPE", title:"Racing Bulls 2026", subtitle:"2026 · RACING BULLS · TEAM VETERAN", svgPath:"M 30 150 L 80 150 Q 110 138 130 100 L 175 100 Q 195 115 210 150 L 260 150 Q 290 170 315 200 L 370 200", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2024_Nr._22_Tsunoda.jpg" },
]

export const tsunodaScoutingReport: ScoutingReport = {
  paragraphs:[
    "Tsunoda arrived in F1 at 20 as the fastest driver Honda had produced for decades in junior categories. His early seasons showed a driver with elite raw pace paired with frustrating inconsistency — incidents that cost points and penalty grid drops that negated his Saturday speed. From 2023 onward the maturation was visible: cleaner race weekends, better incident avoidance, sharper race management.",
    "His driving style leans toward high-aggression entry — he carries speed into braking zones that most drivers won't challenge, which makes him genuinely fast in tight braking zones but occasionally tips into incident territory. His throttle application is smooth relative to his entry aggression, suggesting a driver still calibrating where to spend the pace budget on a lap.",
  ],
  highlights:["elite braking zone aggression","rapid maturation trajectory","Japan's leading F1 hope"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:70, annotation:"ENTRY ROTATION PREFERRED", highlight:true },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:55, annotation:"BALANCED" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:65, annotation:"HIGH DOWNFORCE" },
  ],
  excelledAt:["Braking zone aggression","Short qualifying runs","Street circuit wheel-to-wheel"],
  struggledWith:["Consistency across full race weekends (early career)","Incident avoidance under pressure"],
}

/* ─── Hadjar ────────────────────────────────────────────────────────────────── */

export const hadjar: Driver = {
  id:"hadjar", name:"Isack Hadjar", shortName:"Hadjar", initials:"IH", nationality:"French", dob:"2004-09-28", status:"active", series:["f1"], peakEraTeamId:"rb", entityColor:"hadjar",
  bio:"F2 runner-up 2024, F1 debut with Racing Bulls 2025. French-Algerian dual heritage, Parisian upbringing, Red Bull academy graduate. A driver who showed remarkable racecraft maturity in junior categories for his age.",
  quote:"Every driver thinks they belong here. I know I do.",
  quoteContext:"Media day, Racing Bulls 2025",
  portraitUrl: W + 'Isack_Hadjar_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_(028A8753)_(cropped).jpg',
}

export const hadjarStats: DriverStats = { driverId:"hadjar", series:"f1", titles:0, wins:0, poles:0, podiums:0, careerSpan:"2025–present", racesEntered:22, fastestLaps:0, pointsScored:18 }

export const hadjarEras: DriverEra[] = [
  { driverId:"hadjar", teamId:"rb", teamName:"Racing Bulls", seasons:"2025–present", highlights:["F1 debut 2025","F2 runner-up 2024 — strong junior platform","Red Bull academy training"], titles:0, wins:0, teamLiveryHex:"#6692FF", statLabel:"ROOKIE" },
]

export const hadjarSignature: DrivingSignature = {
  driverId:"hadjar", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:78 },
    { label:"Entry Aggression", value:83 },
    { label:"Tyre Management", value:74 },
    { label:"Throttle Application", value:80 },
    { label:"Braking", value:82 },
    { label:"Consistency", value:72 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.42, sampleSize:260,
}

export const hadjarReelSlides: ReelSlide[] = [
  { slotLabel:"IH · 25", label:"DEBUT", glowColor:"#6692FF", tags:"RACING BULLS DEBUT · 2025 SEASON OPENER", title:"F1 Debut", subtitle:"2025 · RACING BULLS · START OF F1 CAREER", svgPath:"M 30 160 L 90 160 Q 112 148 130 105 L 190 105 Q 215 122 235 160 L 290 160 Q 315 138 335 104 L 370 104", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2025_ImolaGP_Isack_Hadjar.jpg" },
  { slotLabel:"IH · 26", label:"YEAR 2", glowColor:"#6692FF", tags:"SECOND SEASON · BUILDING ON 2025 FOUNDATION", title:"Racing Bulls 2026", subtitle:"2026 · RACING BULLS · SOPHOMORE SEASON", svgPath:"M 30 150 L 80 150 Q 110 138 130 100 L 175 100 Q 195 115 210 150 L 260 150 Q 290 170 315 200 L 370 200", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2025_Japan_GP_-_Racing_Bulls_-_Isack_Hadjar_-_FP2.jpg" },
]

export const hadjarScoutingReport: ScoutingReport = {
  paragraphs:[
    "Hadjar's F2 2024 campaign as runner-up — losing the title to Bortoleto — showed a driver with genuine race-weekend consistency and a particular strength in energy management that junior category analysts attributed to unusually clean baseline throttle application. His car-building feedback is rated highly by Racing Bulls engineers from his junior test program.",
    "The F1 adaptation curve is expected: tyre management over extended stints and the specific demands of DRS-era racecraft being the primary learning areas. His raw pace in junior racing consistently placed him in the top three on one-lap speed, suggesting the F1 transition is a question of adjustment rather than fundamental ceiling.",
  ],
  highlights:["F2 runner-up 2024","clean throttle application","Red Bull academy polish"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:62, annotation:"MILD ROTATION" },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:54, annotation:"SLIGHTLY SOFT" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:62, annotation:"MODERATE DOWNFORCE" },
  ],
  excelledAt:["Energy management in junior racing","Car feedback and development","One-lap qualifying pace"],
  struggledWith:["F1 tyre management learning curve","DRS-train racecraft"],
}

/* ─── Lawson ────────────────────────────────────────────────────────────────── */

export const lawson: Driver = {
  id:"lawson", name:"Liam Lawson", shortName:"Lawson", initials:"LL", nationality:"New Zealander", dob:"2002-06-11", status:"active", series:["f1"], peakEraTeamId:"red_bull", entityColor:"lawson",
  bio:"The New Zealander who answered every call. Substitute for Ricciardo at 21 with one day's notice. Full Racing Bulls season in 2025. Promoted to the senior Red Bull seat in 2026 — the program that has produced Verstappen, Vettel, and Webber, now trusts Lawson.",
  quote:"Red Bull gives you wings. I've been waiting for mine.",
  quoteContext:"Announcement day, Red Bull, late 2025",
  portraitUrl: W + 'Liam_Lawson_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_(028A7793).jpg',
}

export const lawsonStats: DriverStats = { driverId:"lawson", series:"f1", titles:0, wins:0, poles:0, podiums:0, careerSpan:"2023–present", racesEntered:35, fastestLaps:1, pointsScored:42 }

export const lawsonEras: DriverEra[] = [
  { driverId:"lawson", teamId:"alphatauri", teamName:"AlphaTauri / Racing Bulls", seasons:"2023–2025", highlights:["Substitute debut 2023 Monza — scored points","Full Racing Bulls 2025 season","Scored in first F1 start as sub"], titles:0, wins:0, teamLiveryHex:"#6692FF", statLabel:"SCORER ON DEBUT" },
  { driverId:"lawson", teamId:"red_bull", teamName:"Red Bull", seasons:"2026–present", highlights:["Promotion to senior Red Bull seat 2026","Alongside Verstappen","New Zealand's first Red Bull F1 driver"], titles:0, wins:0, teamLiveryHex:"#1E3A8A", statLabel:"RB PROMOTION" },
]

export const lawsonSignature: DrivingSignature = {
  driverId:"lawson", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:80 },
    { label:"Entry Aggression", value:85 },
    { label:"Tyre Management", value:76 },
    { label:"Throttle Application", value:83 },
    { label:"Braking", value:84 },
    { label:"Consistency", value:78 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.52, sampleSize:350,
}

export const lawsonReelSlides: ReelSlide[] = [
  { slotLabel:"LL · 23", label:"DEBUT PTS", glowColor:"#6692FF", tags:"MONZA SUB DEBUT · POINTS ON FIRST START", title:"Monza debut", subtitle:"2023 · ALPHATAURI · CALLED UP WITH ONE DAY NOTICE", svgPath:"M 30 155 Q 65 140 98 155 L 155 155 Q 185 140 218 155 L 275 155 Q 305 140 340 155 L 375 155", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2025_Japan_GP_-_Racing_Bulls_-_Liam_Lawson_-_FP2.jpg" },
  { slotLabel:"LL · 26", label:"RED BULL", glowColor:"#1E3A8A", tags:"PROMOTED · SENIOR RED BULL SEAT · ALONGSIDE VER", title:"Red Bull 2026", subtitle:"2026 · RED BULL · RB22 · VERSTAPPEN TEAMMATE", svgPath:"M 30 120 Q 60 110 85 85 L 145 85 Q 175 98 195 120 L 255 120 Q 285 105 310 80 L 370 80", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2025_Nr._30_Lawson.jpg" },
]

export const lawsonScoutingReport: ScoutingReport = {
  paragraphs:[
    "Lawson's promotion to Red Bull for 2026 is the highest-stakes bet Red Bull's driver programme has made since elevating Verstappen to the senior team in 2016. The comparison is apt in one sense: both were promoted before conventional wisdom would have suggested they were ready. For Verstappen that gamble defined a generation. Lawson's sample size is too small to calibrate either way.",
    "What the sample shows: composure under abnormal pressure (one-day notice sub at Monza, scoring points), decent qualifying pace relative to expected range, and the kind of direct on-radio communication that Red Bull's engineers value. The Racing Bulls 2025 season gave him race distance experience against a stable benchmark. The 2026 jump to RB22 with Verstappen as teammate provides the definitive calibration.",
  ],
  highlights:["scored on emergency sub debut","Red Bull promotion","composure under pressure"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:64, annotation:"MILD ENTRY ROTATION" },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:58, annotation:"MEDIUM COMPLIANCE" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:62, annotation:"MODERATE DOWNFORCE" },
  ],
  excelledAt:["Performing under unexpected pressure","Adapting to new machinery quickly"],
  struggledWith:["Limited sample size — career still developing","Benchmarking against Verstappen"],
}

/* ─── Perez ─────────────────────────────────────────────────────────────────── */

export const perez: Driver = {
  id:"perez", name:"Sergio Perez", shortName:"Perez", initials:"SP", nationality:"Mexican", dob:"1990-01-26", status:"active", series:["f1"], peakEraTeamId:"red_bull", entityColor:"perez",
  bio:"Mexico's greatest racing driver. The Sakhir GP 2020 win against all odds launched a Red Bull career that delivered multiple race victories and a pole position. Alongside Verstappen he formed one of the most dominant driver pairings of the modern era, before joining the Cadillac project.",
  quote:"For every Mexican who dreamed of reaching the top — we got there.",
  quoteContext:"Post-race, Mexico City GP 2023",
  portraitUrl: W + '2021_US_GP_driver_parade_(cropped2).jpg',
}

export const perezStats: DriverStats = { driverId:"perez", series:"f1", titles:0, wins:27, poles:3, podiums:66, careerSpan:"2011–present", racesEntered:280, fastestLaps:12, pointsScored:1614 }

export const perezEras: DriverEra[] = [
  { driverId:"perez", teamId:"sauber", teamName:"Sauber", seasons:"2011", highlights:["F1 debut with Sauber","Solid debut points scorer"], titles:0, wins:0, teamLiveryHex:"#900000", statLabel:"DEBUT" },
  { driverId:"perez", teamId:"force_india", teamName:"Force India / Racing Point", seasons:"2014–2020", highlights:["Sakhir GP WIN 2020","Multiple podiums with Racing Point","Bahrain 2020 second chance race win"], titles:0, wins:1, teamLiveryHex:"#FF80C7", teamAccentHex:"#FFD700", statLabel:"SAKHIR WIN" },
  { driverId:"perez", teamId:"red_bull", teamName:"Red Bull", seasons:"2021–2024", highlights:["Azerbaijan GP wins (×2)","Monaco GP winner","2023 WDC P2 — best career result","Multiple Red Bull partnership wins"], titles:0, wins:26, teamLiveryHex:"#1E3A8A", teamAccentHex:"#FFD700", statLabel:"26W · P2 WDC" },
  { driverId:"perez", teamId:"cadillac", teamName:"Cadillac", seasons:"2026–present", highlights:["Pioneer driver for new F1 constructor","Mexico's hero joins American team"], titles:0, wins:0, teamLiveryHex:"#C8A951", statLabel:"CADILLAC ERA" },
]

export const perezSignature: DrivingSignature = {
  driverId:"perez", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:89 },
    { label:"Entry Aggression", value:80 },
    { label:"Tyre Management", value:94 },
    { label:"Throttle Application", value:87 },
    { label:"Braking", value:85 },
    { label:"Consistency", value:86 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.88, sampleSize:2140,
}

export const perezReelSlides: ReelSlide[] = [
  { slotLabel:"SP · 20", label:"SAKHIR WIN", glowColor:"#FF80C7", tags:"SAKHIR GP · AGAINST ALL ODDS · EMOTIONAL FIRST WIN", title:"Sakhir GP", subtitle:"2020 · RACING POINT · FIRST VICTORY", svgPath:"M 30 160 L 80 160 Q 100 145 115 110 L 160 110 Q 180 125 195 160 L 235 160 Q 255 175 270 205 L 310 205 Q 330 185 350 155 L 380 155", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Sergio_Perez_in_the_RB20.jpg" },
  { slotLabel:"SP · 23", label:"P2 WDC", glowColor:"#1E3A8A", tags:"2023 BEST SEASON · P2 IN WDC · 9 RACE WINS", title:"2023 Season", subtitle:"2023 · RED BULL · CAREER BEST CHAMPIONSHIP", svgPath:"M 30 120 Q 60 110 85 85 L 145 85 Q 175 98 195 120 L 255 120 Q 285 105 310 80 L 370 80", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2024-08-25_Motorsport,_Formel_1,_Großer_Preis_der_Niederlande_2024_STP_3758_by_Stepro.jpg" },
  { slotLabel:"SP · 26", label:"CADILLAC", glowColor:"#C8A951", tags:"PIONEER · CADILLAC F1 DEBUT · AMERICAN DREAM", title:"Cadillac 2026", subtitle:"2026 · CADILLAC · NEW CONSTRUCTOR PIONEER", svgPath:"M 30 150 L 80 150 Q 110 138 130 100 L 175 100 Q 195 115 210 150 L 260 150 Q 290 170 315 200 L 370 200", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2024_Nr._11_Perez.jpg" },
]

export const perezScoutingReport: ScoutingReport = {
  paragraphs:[
    "Red Bull technical director Andrew Green described Perez as having 'built-in traction control' — a reference to his ability to apply throttle on corner exit with a precision that eliminates wheel spin without electronic intervention. This trait, combined with a setup philosophy biased toward understeer, produces a car that is slower on a timed qualifying lap than Verstappen's but significantly easier on rear tyres over race distance.",
    "His entry technique uses trailing-throttle deceleration rather than aggressive threshold braking — he scrubs speed gradually, maintaining rear stability at the cost of some time in acute braking zones. In tyre-sensitive races (especially those with Pirelli compounds prone to graining), this approach allowed Perez to extend stints by 10–15 laps beyond what rivals' strategy models predicted. His 2023 season — 9 wins, P2 WDC — was built on this exact currency.",
    "At Cadillac, the tyre-preservation skill is amplified in importance: a new constructor's development cycle is shaped by data quality, and Perez's consistent, predictable style generates cleaner correlation between simulator and circuit than a higher-aggression driver would. His commercial value to Mexican-American Cadillac is obvious; the technical value is equally real.",
  ],
  highlights:["world-class tyre management","Sakhir 2020 win against the odds","P2 WDC 2023"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:50, annotation:"NEUTRAL — TYRE-PRESERVING STYLE", highlight:true },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:55, annotation:"BALANCED" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:68, annotation:"HIGH DOWNFORCE — REAR STABILITY" },
  ],
  excelledAt:["Tyre management across race distance","Monaco street circuits","Strategic race reading"],
  struggledWith:["Aggressive threshold braking zones","Pure qualifying pace ceiling"],
}

/* ─── Bottas ────────────────────────────────────────────────────────────────── */

export const bottas: Driver = {
  id:"bottas", name:"Valtteri Bottas", shortName:"Bottas", initials:"VB", nationality:"Finnish", dob:"1989-08-28", status:"active", series:["f1"], peakEraTeamId:"mercedes", entityColor:"bottas",
  bio:"Finland's best Grand Prix driver since Mika Häkkinen. Ten wins and twenty poles at Mercedes, where he was Hamilton's closest challenger but never his conqueror. The quiet Finn who anchored Alfa Romeo's midfield through four seasons before joining Cadillac's pioneering project.",
  quote:"I gave everything to Mercedes. Everything. It wasn't quite enough.",
  quoteContext:"Farewell press conference, Abu Dhabi 2021",
  portraitUrl: W + 'Valtteri_Bottas_at_the_2026_Adelaide_Motorsport_Festival_(028A7567).jpg',
}

export const bottasStats: DriverStats = { driverId:"bottas", series:"f1", titles:0, wins:10, poles:20, podiums:67, careerSpan:"2013–present", racesEntered:238, fastestLaps:19, pointsScored:1878 }

export const bottasEras: DriverEra[] = [
  { driverId:"bottas", teamId:"williams", teamName:"Williams", seasons:"2013–2016", highlights:["Consistent points scorer at Williams","Pole Silverstone 2017 (with Merc already signed)"], titles:0, wins:0, teamLiveryHex:"#005AFF", statLabel:"WILLIAMS YEARS" },
  { driverId:"bottas", teamId:"mercedes", teamName:"Mercedes", seasons:"2017–2021", highlights:["10 wins","20 poles","4× constructors champion","Fastest lap record holder (2019–2020)"], titles:0, wins:10, teamLiveryHex:"#00D2BE", teamAccentHex:"#FFD700", statLabel:"10W · 20P" },
  { driverId:"bottas", teamId:"alfa_romeo", teamName:"Alfa Romeo / Sauber", seasons:"2022–2025", highlights:["Team leader at Alfa Romeo","Mentored Bortoleto in 2024","Consistent midfield presence"], titles:0, wins:0, teamLiveryHex:"#900000", statLabel:"TEAM LEADER" },
  { driverId:"bottas", teamId:"cadillac", teamName:"Cadillac", seasons:"2026–present", highlights:["Pioneer Cadillac driver alongside Perez","New chapter at 36"], titles:0, wins:0, teamLiveryHex:"#C8A951", statLabel:"CADILLAC 26" },
]

export const bottasSignature: DrivingSignature = {
  driverId:"bottas", series:"f1",
  axes:[
    { label:"Steering Smoothness", value:90 },
    { label:"Entry Aggression", value:82 },
    { label:"Tyre Management", value:87 },
    { label:"Throttle Application", value:88 },
    { label:"Braking", value:86 },
    { label:"Consistency", value:88 },
  ],
  cohortAverage:[78,73,74,79,80,76], confidenceScore:0.90, sampleSize:1840,
}

export const bottasReelSlides: ReelSlide[] = [
  { slotLabel:"VB · 17", label:"FIRST WIN", glowColor:"#00D2BE", tags:"RUSSIA GP · FIRST CAREER WIN · DOMINANT PACE", title:"Russian GP", subtitle:"2017 · MERCEDES · MAIDEN VICTORY", svgPath:"M 30 160 L 90 160 Q 112 148 130 105 L 190 105 Q 215 122 235 160 L 290 160 Q 315 138 335 104 L 370 104", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Valtteri_Bottas_Chinese_GP_2024.jpg" },
  { slotLabel:"VB · 19", label:"AUSTRIA WIN", glowColor:"#00D2BE", tags:"AUSTRIA VICTORY · 20 POLES ACROSS MERCEDES ERA", title:"Mercedes era", subtitle:"2017–2021 · MERCEDES · 10W · 20P", svgPath:"M 30 120 Q 60 110 85 85 L 145 85 Q 175 98 195 120 L 255 120 Q 285 105 310 80 L 370 80", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/Valtteri_Bottas_on_track,_Singapore_Grand_Prix_2024.jpg" },
  { slotLabel:"VB · 26", label:"CADILLAC", glowColor:"#C8A951", tags:"CADILLAC PIONEER · F1'S NEWEST TEAM", title:"Cadillac 2026", subtitle:"2026 · CADILLAC · BUILDING THE FUTURE", svgPath:"M 30 155 Q 65 140 98 155 L 155 155 Q 185 140 218 155 L 275 155 Q 305 140 340 155 L 375 155", imageUrl:"https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_Bottas_(1).jpg" },
]

export const bottasScoutingReport: ScoutingReport = {
  paragraphs:[
    "Bottas's style at Mercedes was characterised by exceptional smoothness in high-speed sections — his data was frequently cited internally as the benchmark for suspension loads and high-speed tyre behaviour. The problem was that the Mercedes W-series cars, particularly from 2019 onward, rewarded an aggressive, hard-entry technique that Hamilton had refined and Bottas had not fully developed. The car's characteristics conflicted with Bottas's natural smoothness preference; Hamilton's more aggressive approach was better matched to how the W11/W12 wanted to be driven.",
    "This mismatch meant Bottas was often fastest in the pure speed sections — his sector 2 data was repeatedly competitive — while losing ground in the aggressive braking-and-rotation sectors that Hamilton exploited. It was a stylistic incompatibility rather than a talent deficit. The same smoothness that cost him at Mercedes became a strength at Alfa Romeo, where the car's gentler characteristics suited his inputs.",
    "At Cadillac from 2026, the profile that matters most is experience: 238 races, two world-championship cycles of learning, and a professionalism that young teams building from scratch depend on. Bottas at 36 is not chasing podiums — he is building infrastructure.",
  ],
  highlights:["10 wins at Mercedes","20 poles","elite high-speed smoothness","race distance consistency"],
  setupBars:[
    { leftLabel:"UNDERSTEER", rightLabel:"OVERSTEER", position:54, annotation:"SLIGHT UNDERSTEER BALANCE" },
    { leftLabel:"SOFT", rightLabel:"STIFF", position:60, annotation:"MEDIUM-STIFF" },
    { leftLabel:"LOW AERO", rightLabel:"HIGH AERO", position:65, annotation:"HIGH DOWNFORCE PREFERENCE" },
  ],
  excelledAt:["High-speed sector smoothness","Race-pace consistency","One-lap qualifying pace"],
  struggledWith:["Championship-pressure Sunday management","Overturning Hamilton's psychological edge"],
}

/* ─── Alain Prost ──────────────────────────────────────────────────────────── */

export const prost: Driver = {
  id: "prost", name: "Alain Prost", shortName: "Prost", initials: "AP", nationality: "French", dob: "1955-02-24", status: "retired", series: ["f1"], peakEraTeamId: "mclaren", entityColor: "prost",
  bio: "The Professor. Four World Championships — 1985, 1986, 1989, 1993. 51 wins and 33 pole positions across fourteen seasons with Renault, McLaren, Ferrari, and Williams. The intellectual master of racing's technical and political dimensions, whose rivalry with Ayrton Senna defined the sport for a generation.",
  quote: "To win a race is not the most difficult thing — to win a championship over a whole season, that is the art.",
  quoteContext: "Autobiographical interview, 1990",
  portraitUrl: W + 'Alain_Prost_2008_amk.jpg',
}

export const prostStats: DriverStats = {
  driverId: "prost", series: "f1", titles: 4, wins: 51, poles: 33, podiums: 106, careerSpan: "1980–1993", racesEntered: 202, fastestLaps: 41, pointsScored: 798,
}

export const prostEras: DriverEra[] = [
  {
    driverId: "prost", teamId: "renault", teamName: "Renault", seasons: "1980–1983",
    highlights: ["France GP win 1981 — first career victory", "Runner-up 1983 WDC — 2pts behind Piquet", "RE30 / RE40 dominant Turbo challengers"],
    titles: 0, wins: 9, teamLiveryHex: "#FFD700",
    imageUrl: W + 'Alain_Prost_1983_British_GP.jpg',
    statLabel: "9 WINS",
  },
  {
    driverId: "prost", teamId: "mclaren", teamName: "McLaren (TAG era)", seasons: "1984–1987",
    highlights: ["1985 WDC — McLaren MP4/2B", "1986 WDC — final lap Williams collapse", "72.5 pts in 1984 — Lauda beats by 0.5pt"],
    titles: 2, wins: 24, teamLiveryHex: "#E8002D", teamAccentHex: "#ffffff",
    imageUrl: W + 'Alain_Prost_1985_British_Grand_Prix.jpg',
    statLabel: "2× WDC",
  },
  {
    driverId: "prost", teamId: "mclaren", teamName: "McLaren (Honda · Senna era)", seasons: "1988–1989",
    highlights: ["1988: Senna beats Prost 8pts — closest McLaren season ever", "1989 WDC — Suzuka collision with Senna", "MP4/4 won 15 of 16 races in 1988"],
    titles: 1, wins: 10, teamLiveryHex: "#E8002D", teamAccentHex: "#ffffff",
    imageUrl: W + 'Alain_Prost_McLaren_MP4-4_1988_British_GP.jpg',
    statLabel: "SENNA RIVALRY",
  },
  {
    driverId: "prost", teamId: "ferrari", teamName: "Ferrari", seasons: "1990–1991",
    highlights: ["1990 WDC: Lost at Suzuka to Senna collision — P2", "Ferrari 641 — one of the most beautiful F1 cars", "Fired after publicly criticising the car"],
    titles: 0, wins: 5, teamLiveryHex: "#DC0000",
    imageUrl: W + 'Alain_Prost_1990_United_States_Grand_Prix.jpg',
    statLabel: "FERRARI ERA",
  },
  {
    driverId: "prost", teamId: "williams", teamName: "Williams", seasons: "1993",
    highlights: ["1993 WDC — dominant FW15C active suspension", "7 wins in final season", "Retired at the end — on his own terms"],
    titles: 1, wins: 7, teamLiveryHex: "#005AFF", teamAccentHex: "#FFD700",
    imageUrl: W + 'Alain_Prost_Williams_FW15C_1993.jpg',
    statLabel: "FINAL TITLE",
  },
]

export const prostSignature: DrivingSignature = {
  driverId: "prost", series: "f1",
  axes: [
    { label: "Steering Smoothness", value: 98 },
    { label: "Entry Aggression", value: 72 },
    { label: "Tyre Management", value: 97 },
    { label: "Throttle Application", value: 95 },
    { label: "Braking", value: 94 },
    { label: "Consistency", value: 99 },
  ],
  cohortAverage: [78, 73, 74, 79, 80, 76], confidenceScore: 0.94, sampleSize: 2020,
}

export const prostReelSlides: ReelSlide[] = [
  {
    label: "RENAULT ERA",
    tags: "1980–1983 · 9 WINS · FRANCE GP DEBUT WIN",
    title: "Renault",
    subtitle: "1981 · RENAULT RE30 · FIRST WIN FRANCE GP",
    glowColor: "#FFD700",
    svgPath: "M 30 160 L 80 160 Q 100 145 115 110 L 165 110 Q 185 128 200 160 L 250 160 Q 270 172 285 200 L 330 200 Q 350 178 370 148",
    imageUrl: W + 'Alain_Prost_Renault_1981_British_Grand_Prix.jpg',
  },
  {
    label: "1986 · WDC",
    tags: "McLAREN · 4th TITLE DENIED THEN WON · TAG TURBO ERA",
    title: "McLaren TAG",
    subtitle: "1985–1986 · McLAREN MP4/2 · 2× WORLD CHAMPION",
    glowColor: "#E8002D",
    svgPath: "M 30 120 Q 60 108 84 78 L 144 78 Q 172 94 192 120 L 252 120 Q 282 104 306 74 L 366 74",
    imageUrl: W + 'Alain_Prost_1985_McLaren_TAG_British_GP.jpg',
  },
  {
    label: "SENNA RIVALRY",
    tags: "1988–89 · MP4/4 · 15 WINS SEASON · SUZUKA COLLISION",
    title: "Prost vs Senna",
    subtitle: "1988–1989 · McLAREN HONDA · 1989 WDC",
    glowColor: "#E8002D",
    svgPath: "M 30 150 L 80 150 Q 108 136 128 98 L 178 98 Q 200 116 216 150 L 268 150 Q 296 168 320 202 L 374 202",
    imageUrl: W + 'Prost_and_Senna_1988_British_GP.jpg',
  },
  {
    label: "FERRARI ERA",
    tags: "FERRARI 641 · 1990 TITLE LOST AT SUZUKA · 5 WINS",
    title: "Ferrari",
    subtitle: "1990 · FERRARI 641 · P2 WDC",
    glowColor: "#DC0000",
    svgPath: "M 30 130 Q 66 116 94 86 L 154 86 Q 182 102 202 130 L 260 130 Q 290 114 314 82 L 372 82",
    imageUrl: W + 'Alain_Prost_Ferrari_641_1990_US_GP.jpg',
  },
  {
    label: "1993 · WDC",
    tags: "WILLIAMS FW15C · DOMINANT ACTIVE SUSPENSION · 7 WINS",
    title: "Williams",
    subtitle: "1993 · WILLIAMS FW15C · FINAL WORLD TITLE",
    glowColor: "#005AFF",
    svgPath: "M 30 160 Q 68 148 98 112 L 158 112 Q 188 130 210 160 L 268 160 Q 298 144 322 110 L 374 110",
    imageUrl: W + 'Alain_Prost_Williams_FW15C_1993_British_GP.jpg',
  },
]

export const prostScoutingReport: ScoutingReport = {
  paragraphs: [
    "Prost earned the nickname 'The Professor' from a driving style that was the diametric opposite of Senna's visceral aggression. Where Senna attacked, Prost calculated. His car setup philosophy was built around tyre preservation — he ran the smoothest steering inputs of any driver in the turbo era, using trail braking only where necessary and modulating throttle with a precision that his engineers described as the cleanest telemetry they had ever seen. He didn't attack tyres; he managed their lifespan as a strategic resource.",
    "His tactical intelligence was unmatched. Prost understood that winning a world championship is not the same as winning races — it is a season-length optimisation problem. In 1986 he deliberately pitted for fresh tyres at the Australian GP finale while rivals gambled on worn rubber, ultimately winning the title when Mansell suffered a blowout and Piquet made a precautionary stop. That decision, made in the cockpit in real time, is a case study in championship mathematics.",
    "The Senna rivalry defined the late 1980s and remains the most discussed inter-team dynamic in the sport's history. At McLaren in 1988–89, both men pushed the boundaries of racing conduct; at Suzuka 1989 Prost triggered the collision that gave him the title, a decision that was as calculated as his smooth steering inputs. His engineering feedback was so precise that both McLaren and Ferrari directed significant development investment based specifically on his descriptions of car behaviour at individual corners.",
  ],
  highlights: ["tyre preservation mastery", "strategic championship calculation", "smoothest telemetry of the turbo era"],
  setupBars: [
    { leftLabel: "UNDERSTEER", rightLabel: "OVERSTEER", position: 30, annotation: "UNDERSTEER PREFERRED — PRESERVES FRONTS", highlight: false },
    { leftLabel: "SOFT",       rightLabel: "STIFF",     position: 40, annotation: "SOFT COMPLIANCE — TYRE LONGEVITY",         highlight: true },
    { leftLabel: "LOW AERO",   rightLabel: "HIGH AERO", position: 62, annotation: "MODERATE-HIGH · STABILITY FOCUS",          highlight: false },
  ],
  excelledAt: ["Tyre management across full race distance", "Championship-level race intelligence", "Engineering feedback precision", "Adapting to radically different cars across teams"],
  struggledWith: ["Confrontational wheel-to-wheel battles under pressure", "Pure qualifying aggression vs Senna in 1988"],
}

/* ─── Export index ────────────────────────────────────────────────────────── */

export const MOCK_DRIVERS: Record<string, Driver> = {
  vettel,
  leclerc,
  bearman,
  hamilton,
  verstappen,
};
