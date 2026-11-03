/* ─── Core entity types ────────────────────────────────────────────────────── */

export type Series = "f1" | "f2" | "f3";
export type DriverStatus = "active" | "retired" | "deceased";
export type TeamLivery = string;
export type ConfidenceTier = "HIGH" | "MODERATE" | "LOW" | "LOW-MODERATE";
export type SessionType = "qualifying" | "race" | "practice";
export type Conditions = "dry" | "wet" | "mixed";
export type MomentType =
  | "overtake"
  | "crash"
  | "masterclass"
  | "debut"
  | "title"
  | "pole";
export type CareerOutcome =
  | "F1"
  | "WEC"
  | "IndyCar"
  | "FE"
  | "Regional"
  | "F2"
  | "F3-Year2"
  | "Other"
  | "Exit";

/* ─── Driver ───────────────────────────────────────────────────────────────── */

export interface Driver {
  id: string;
  name: string;
  shortName: string;
  initials: string;
  nationality: string;
  dob: string; // ISO date
  dod?: string; // ISO date — present only if deceased
  status: DriverStatus;
  series: Series[];
  peakEraTeamId: string;
  entityColor: TeamLivery;
  bio: string;
  quote?: string;
  quoteContext?: string; // where/when the quote was said
  portraitUrl?: string; // full-body or hero portrait for the driver panel
}

export interface DriverStats {
  driverId: string;
  series: Series;
  titles: number;
  wins: number;
  poles: number;
  podiums: number;
  careerSpan: string; // e.g. "2007–2023"
  racesEntered: number;
  fastestLaps?: number;
  pointsScored?: number;
}

export interface DriverEra {
  driverId: string;
  teamId: string;
  teamName: string;
  seasons: string; // e.g. "2009–2013"
  seriesColor?: string; // override if multi-series team
  highlights: string[];
  titles: number;
  wins: number;
  teamLiveryHex: string; // hex for the era card glow
  teamAccentHex?: string; // optional accent for label (e.g. gold for championship eras)
  statLabel?: string; // compact bottom-right summary, e.g. "4× WDC"
  imageUrl?: string; // optional background photo for the era card
}

/* ─── Lap picker ───────────────────────────────────────────────────────────── */

export interface FeaturedLap {
  id: string;
  badges: { label: string; color: string }[];
  kicker: string;
  headline: string;
  meta: string;
  glowColor: string;
  borderColor: string;
  svgPath: string;
  svgViewBox?: string; // default "0 0 400 225"
  featured?: boolean; // spans 2 grid rows
  era: string; // e.g. "'09–'14 RB"
  conditions: Conditions;
  sessionType: SessionType;
}

export interface LapRecord {
  id: string;
  year: number;
  track: string;
  team: string;
  teamColor: string;
  session: string; // display label e.g. "QUALI Q3" | "RACE L42"
  sessionType: SessionType;
  conditions: Conditions;
  era: string;
  timeMs: number;
  timeFormatted: string;
  result: string;
  resultColor: string;
}

export interface LapMoment {
  id: string;
  label: string;
  timestamp: string;
  jumpPct: number;
  description: string;
  stat: string;
  accent: "gold" | "red";
}

export interface LapSector {
  label: string;
  time: string;
  status: string;
  delta: string;
  positive: boolean;
}

export interface TelemetryTrace {
  label: string;
  color: string;
  svgPath: string;
}

export interface LapAnalysis {
  lapId: string;
  headline: string;
  narrative: string;
  metaLine: string;
  lapTimeFormatted: string;
  lapTimeMs: number;
  lapTimeSub: string;
  vTeammate: string;
  vTeammateSub: string;
  topSpeedKmh: number;
  topSpeedSub: string;
  avgThrottlePct: number;
  avgThrottleSub: string;
  racingLinePath: string;
  trackLengthM: number;
  sectors: LapSector[];
  sectorObservation: string;
  telemetry: TelemetryTrace[];
  moments: LapMoment[];
  framesAnalyzed: number;
  processingTimeS: number;
  videoSource: string;
}

/* ─── Reel / cycling content ───────────────────────────────────────────────── */

export interface ReelSlide {
  image?: string;      // canonical slide image URL (co-located with caption fields)
  imageUrl?: string;   // photo URL — co-located with its caption fields
  label?: string;      // top-right badge, e.g. "FIRST WIN" | "PEAK ERA" | "TITLE #4"
  badge?: string;      // legacy alias for label — still used in team slide data
  slotLabel?: string;  // legacy top-left driver+number tag — unused by renderer
  title?: string;      // large sans text — venue or event name
  headline?: string;   // legacy alias for title
  subtitle?: string;   // small mono metadata line
  meta?: string;       // legacy alias for subtitle
  tags?: string;       // small gold mono achievement string
  kicker?: string;     // legacy alias for tags
  glowColor: string;   // hex for no-media fallback radial glow
  svgPath: string;     // telemetry trace SVG d for no-media fallback
  circles?: Array<{ cx: number; cy: number; r: number; fill: string }>;
  videoId?: string;    // YouTube video ID for autoplay background clip
  videoStart?: number; // seconds to start the clip from
}

/* ─── Setup & style module ─────────────────────────────────────────────────── */

export interface SetupBar {
  leftLabel: string;
  rightLabel: string;
  position: number; // 0–100, where the marker sits
  annotation: string; // label shown below the bar
  highlight?: boolean; // if true, annotation rendered in entity color
}

export interface ScoutingReport {
  paragraphs: string[]; // editorial prose — plain text
  highlights: string[]; // words/phrases to highlight in entity color across paragraphs
  setupBars: SetupBar[];
  excelledAt: string[];
  struggledWith: string[];
}

export interface TeammateRecord {
  driverId: string;
  teammateId: string;
  teammateName: string;
  seasons: string;
  qualiWinPct: number; // 0-100
  raceWinPct: number; // 0-100
  deltaMs: number; // avg quali gap in ms, positive = driver faster
}

export interface TrackRecord {
  driverId: string;
  venueId: string;
  venueName: string;
  wins: number;
  poles: number;
  podiums: number;
  sentiment: "excelled" | "struggled" | "neutral";
}

/* ─── Driving signature ────────────────────────────────────────────────────── */

export interface SignatureAxis {
  label: string;
  value: number | null; // 0–100 percentile; null = not measured (pending data source or too few samples)
}

export type SignatureCohortKey = "era" | "allTime" | "champions" | "teammates";

export interface SignatureEra {
  id: string; // regulation era, e.g. "2022-2025"
  label: string; // e.g. "Ground effect"
  seasons: string; // seasons actually covered, e.g. "2023–2025"
  span?: string; // seasons the rules apply to, e.g. "2022–2025" or "2026 onwards"
  rules?: string; // what defines the era's technical regulations
  caveat?: string; // what to keep in mind when reading signatures from this era
}

export interface DrivingSignature {
  driverId: string;
  series: Series;
  axes: SignatureAxis[]; // 6 axes — labels vary by series
  cohortAverage: (number | null)[]; // era comparison polygon, 6 values matching axes order
  cohorts?: Partial<Record<SignatureCohortKey, (number | null)[]>>;
  uncertaintyEnvelope?: (number | null)[]; // 95th-percentile bound per axis
  confidenceScore: number | null; // 0–1
  sampleSize?: number; // laps analyzed
  era?: SignatureEra;
  source?: "timing" | "vision"; // timing = official live-timing telemetry; vision = onboard CV pipeline
}

/* ─── Team ─────────────────────────────────────────────────────────────────── */

export interface Team {
  id: string;
  name: string;
  shortName: string;
  country: string;
  series: Series[];
  founded: number;
  current: boolean;
  entityColor: TeamLivery;
  liveryHex: string; // resolved hex — used for CSS var injection
  bio: string;
  quote?: string;
  quoteContext?: string;
}

export interface TeamStats {
  teamId: string;
  constructorsTitles: number;
  driversTitles: number;
  wins: number;
  podiums: number;
  seasons: number;
  firstSeason: number;
}

export interface TeamEngineeringEra {
  teamId: string;
  label: string; // e.g. "Forghieri"
  seasons: string; // e.g. "1969–1984"
  description: string;
  championships: number;
  driverNames?: string; // pre-formatted e.g. "LAUDA · SCHECKTER"
  champLabel?: string; // pre-formatted e.g. "4× WDC" or "NO TITLES"
  golden?: boolean;
  current?: boolean;
  imageUrl?: string;
}

export interface TeamAcademyDriver {
  name: string;
  tier: "f1" | "junior" | "alumni";
  note: string; // e.g. "FDA '16" or "F2" or "'09–'15"
  deceased?: boolean;
}

export interface TeamIconicCar {
  name: string;
  year: number;
  subtitle: string;
  meta: string;
  peak?: boolean;
  imageUrl?: string; // actual car photo URL
}

export interface TeamKeyMoment {
  videoId: string;
  title: string;
  year: number;
  label: string;
  badge: string;
}

export interface TeamSignatureBar {
  label: string;
  rating: "EXCEPTIONAL" | "CRITICAL" | "HIGH" | "MODERATE" | "LOW" | "INCONSISTENT" | "STRONG" | "CONSERVATIVE" | "BEST-IN-CLASS";
  value: number; // 0–100 for bar width
  caption: string;
  sentiment: "strength" | "weakness" | "neutral";
}

export interface PremaStats {
  f2Titles: number;
  f3TitlesSince2019: number;
  f1Graduates: number;
  f2Wins: number;
  graduationRatePct: number;
}

export interface PremaGraduate {
  name: string;
  f3Result: string; // "CHAMP '20" or "P4 '21" or "—"
  f2Result: string; // "CHAMP '17" or "P3 '24" or "—"
  graduatedTo: string; // "Ferrari" "Williams" etc
  graduatedToColor: string; // team color hex
  current: string; // "Ferrari F1" "Mercedes F1" "WEC / FE"
  currentColor: string; // hex
  status: string; // "ACTIVE F1" "WEC" "ENDURANCE" "F1 ROOKIE"
  statusColor: string; // #5FB87C for F1 active, #FFD700 for WEC, #888 for endurance
}

export interface PremaSeasonDriver {
  name: string;
  academy: string; // e.g. "FERRARI FDA" or "ALPINE ACADEMY"
}

export interface PremaCurrentSeason {
  f2: PremaSeasonDriver[];
  f3: PremaSeasonDriver[];
  f1Academy: PremaSeasonDriver[];
}

/* ─── Venue ────────────────────────────────────────────────────────────────── */

export interface Venue {
  id: string;
  name: string;
  subLabel?: string; // e.g. "Circuit de"
  country: string;
  layoutVersion: string;
  lengthKm: number;
  corners: number;
  elevationDeltaM: number;
  f1Since: number;
  entityColor: string; // CSS token name e.g. "spa"
  entityColorHex: string;
  quote?: string;
  quoteAttribution?: string;
  trackPath?: string; // SVG `d` attribute for 500×500 viewBox
  trackLocation?: string; // short label e.g. "ARDENNES · BE"
}

export interface VenueIconicMoment {
  id: string;
  year: number;
  title: string;
  teamLabel: string;
  conditionBadge: string;
  conditionColor: string; // hex
  glowColor: string; // hex for radial glow
  imageUrl?: string; // background race photo
}

export interface VenueWeather {
  venueId: string;
  dryPct: number;
  mixedPct: number;
  wetPct: number;
  totalRaces: number;
  chaoticRaces: { year: number; label: string; type: "WET" | "MIXED" | "DRY" }[];
  description?: string; // optional prose intro for the weather section
  circuitNote?: string; // optional note shown under the circuit overview diagram
}

export interface VenueStats {
  venueId: string;
  lengthKm: number;
  corners: number;
  lapRecord: string; // formatted lap time
  lapRecordDriver: string;
  lapRecordYear: number;
  elevationDeltaM: number;
  f1Since: number;
}

export interface VenueFingerprintBar {
  label: string;
  rating: "EXTREME" | "CRITICAL" | "HIGH" | "MODERATE" | "LOW" | "EXCEPTIONAL";
  value: number; // 0–100
  caption: string;
}

export interface VenueFingerprint {
  venueId: string;
  bars: VenueFingerprintBar[];
  description?: string; // optional prose for the "WHAT MATTERS HERE" subtitle
}

export interface DriverTrackFit {
  venueId: string;
  driverId: string;
  driverName: string;
  fitScore: number; // 0–100
  wins: number;
  poles: number;
  podiums?: number;
  starts?: number;
}

export interface Hotspot {
  id: string;
  venueId: string;
  cornerLabel: string;
  x: number; // SVG percentage
  y: number; // SVG percentage
  type: "legendary" | "iconic" | "passive";
  momentId?: string;
}

export interface MomentOverlay {
  momentId: string;
  title: string;
  year: number;
  driver1Id: string;
  driver2Id?: string;
  cornerLabel: string;
  defenderTrace?: [number, number][]; // unused; kept so older entries still type-check
  overtakerTrace?: [number, number][];
  description: string; // short matchup, e.g. "FERRARI over MERCEDES"
  body: string; // one or two sentences of what happened
  imageUrl?: string;
  imageNote?: string; // set when the photo is the race, not the pass itself
}

/* ─── Lap ──────────────────────────────────────────────────────────────────── */

export interface Lap {
  id: string;
  driverId: string;
  driverName: string;
  venueId: string;
  venueName: string;
  teamId: string;
  session: SessionType;
  season: number;
  lapNumber: number;
  timeMs: number;
  conditions: Conditions;
  cvPipelineVersion: string;
  framesAnalyzed: number;
  confidenceScore: number; // 0–1
  processingDate: string;
  videoUrl?: string;
  videoAvailable: boolean;
}

export interface LapTelemetry {
  lapId: string;
  // Time-series at ~25Hz. Each array is the same length.
  timestampsMs: number[];
  steering: number[]; // –1 to 1 (left to right)
  throttle: number[]; // 0 to 1
  brake: number[]; // 0 to 1
  speedKmh: number[];
  racingLineX: number[]; // track-normalized 0–1
  racingLineY: number[]; // track-normalized 0–1
  sectorBoundariesMs: [number, number, number]; // S1 end, S2 end, S3 end
}

export interface SectorSplit {
  lapId: string;
  s1Ms: number;
  s2Ms: number;
  s3Ms: number;
}

/* ─── Moment (heritage graph node) ────────────────────────────────────────── */

export interface Moment {
  id: string;
  type: MomentType;
  title: string;
  driverIds: string[]; // can be multiple (e.g. overtake: [attacker, defender])
  venueId: string;
  teamIds: string[];
  year: number;
  description: string;
  tags: string[]; // "wet", "title-decider", "lap1", etc.
  imageAvailable: boolean;
}

/* ─── Chassis ──────────────────────────────────────────────────────────────── */

export interface Chassis {
  id: string;
  teamId: string;
  season: number;
  name: string;
  powerUnit: string;
  championshipPoints?: number;
  wins?: number;
}

/* ─── Season / Round ───────────────────────────────────────────────────────── */

export interface Season {
  id: string;
  series: Series;
  year: number;
  rounds: number;
  currentRound?: number; // present for active seasons
}

export interface Round {
  id: string;
  seasonId: string;
  venueId: string;
  venueName: string;
  date: string;
  raceNumber: number;
  completed: boolean;
}

/* ─── Trajectory prediction (F2 / F3) ─────────────────────────────────────── */

export interface OutcomeProbability {
  destination: CareerOutcome;
  probability: number; // 0–1
}

export interface CohortAnalog {
  driverId: string;
  driverName: string;
  matchPercentage: number; // 0–100
  era: string;
  academy?: string;
  destination: CareerOutcome;
  currentStatus: string;
}

export interface FeatureWeight {
  feature: string;
  direction: "positive" | "negative"; // toward vs away from F1
  weight: number; // magnitude
  humanReadableValue: string;
}

export interface TrajectoryPrediction {
  driverId: string;
  series: "f2" | "f3";
  generatedAt: string;
  confidenceTier: ConfidenceTier;
  sampleSize: number;
  trainingDataRange: string; // e.g. "2010–2024"
  // F2: single distribution. F3: nextStep + longHorizon both present.
  outcomes: OutcomeProbability[];
  nextStepOutcomes?: OutcomeProbability[]; // F3 only
  f1ProbabilityUnconditional?: number; // F3 only
  f1ProbabilityViaF2?: number; // F3 only
  cohortAnalogs: CohortAnalog[];
  featureWeights: FeatureWeight[];
  // Editorial context
  statusLabel?: string; // e.g. "PARTIALLY RESOLVED · IN F1"
  calibrationNote?: string; // shown in gold italic when prediction is resolved
}

/* ─── Compare ──────────────────────────────────────────────────────────────── */

export type ComparisonType =
  | "SAME-ERA · TEAMMATES"
  | "SAME-ERA · DIFFERENT-TEAMS"
  | "CROSS-ERA"
  | "SAME-ERA · DIFFERENT-SERIES";

export interface LapComparison {
  lapAId: string;
  lapBId: string;
  deltaMs: number[]; // cumulative time delta at each telemetry sample
  biggestGainSampleIdx: number;
  biggestLossSampleIdx: number;
  finalDeltaMs: number; // positive = A faster overall
}

export interface ComparisonLap {
  name: string;
  teamName: string;
  teamColor: string;
  lapTime: string;
  lapTimeMs: number;
  result: string;
  resultColor: string;
  meta: string;
  sectors: { label: string; time: string }[];
}

export interface DeltaInsight {
  label: string;
  description: string;
  note: string;
  winner: "a" | "b";
}

export interface SectorComparison {
  label: string;
  winnerLabel: string;
  winnerColor: string;
  lapA: { time: string; barWidth: number };
  lapB: { time: string; barWidth: number };
  keyNote: string;
}

export interface OverlayTrace {
  label: string;
  pathA: string;
  pathB: string;
}

export interface LineAnnotation {
  cx: number;
  cy: number;
  winner: "a" | "b";
  label: string;
  textAnchor?: string;
  dx: number;
  dy: number;
}

export interface LapComparisonData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  colorA: string;
  colorB: string;
  lapA: ComparisonLap;
  lapB: ComparisonLap;
  deltaPath: string;
  deltaInsights: DeltaInsight[];
  circuitPath: string;
  linePathA: string;
  linePathB: string;
  lineAnnotations: LineAnnotation[];
  divergence: { maxM: number; maxLocation: string; avgM: number; overlapPct: number; note: string };
  divergenceDescription: string;
  overlayTraces: OverlayTrace[];
  sectors: SectorComparison[];
  takeaway: string[];
  totalFrames: number;
}
