export type Series = 'f1' | 'f2' | 'f3'

export type DriverStatus = 'active' | 'retired'

export interface Driver {
  [key: string]: unknown
  id: string
  name: string
  shortName: string
  initials: string
  nationality: string
  dob: string
  status: DriverStatus
  series: Series[]
  peakEraTeamId: string
  entityColor: string
  portraitUrl?: string
  bio: string
  quote?: string
  quoteContext?: string
}

export interface DriverStats {
  [key: string]: unknown
  driverId: string
  series: Series
  titles: number
  wins: number
  poles: number
  podiums: number
  careerSpan: string
  racesEntered: number
  fastestLaps?: number
  pointsScored?: number
}

export interface DriverEra {
  [key: string]: unknown
  driverId: string
  teamId: string
  teamName: string
  seasons: string
  highlights: string[]
  titles: number
  wins: number
  teamLiveryHex: string
  teamAccentHex?: string
  statLabel?: string
  imageUrl?: string
}

export interface TeammateRecord {
  [key: string]: unknown
  teammateId?: string
  teammateName?: string
  seasons?: string
  races?: number
  qualifyingHeadToHead?: string
  raceHeadToHead?: string
  pointsHeadToHead?: string
  narrative?: string
}

export interface TrackAffinity {
  [key: string]: unknown
  trackId?: string
  trackName?: string
  score?: number
  wins?: number
  poles?: number
  podiums?: number
  note?: string
}

export interface DrivingSignatureAxis {
  [key: string]: unknown
  label: string
  value: number
}

export interface DrivingSignature {
  [key: string]: unknown
  driverId: string
  series: Series
  axes: DrivingSignatureAxis[]
  cohortAverage: number[]
  confidenceScore: number
  sampleSize?: number
}

export interface ReelCircle {
  [key: string]: unknown
  cx: number
  cy: number
  r: number
  fill: string
}

export interface ReelSlide {
  [key: string]: unknown
  slotLabel?: string
  label?: string
  badge?: string
  glowColor: string
  kicker?: string
  tags?: string
  title?: string
  headline?: string
  subtitle?: string
  meta?: string
  svgPath: string
  circles?: ReelCircle[]
  image?: string
  imageUrl?: string
  videoId?: string
  videoStart?: number
}

export interface SetupPreferenceBar {
  [key: string]: unknown
  leftLabel: string
  rightLabel: string
  position: number
  annotation: string
  highlight?: boolean
}

export interface ScoutingReport {
  [key: string]: unknown
  paragraphs: string[]
  highlights: string[]
  setupBars: SetupPreferenceBar[]
  excelledAt: string[]
  struggledWith: string[]
}

export interface TrajectoryOutcome {
  [key: string]: unknown
  destination: string
  probability: number
}

export interface TrajectoryCohortAnalog {
  [key: string]: unknown
  driverId: string
  driverName: string
  matchPercentage: number
  era: string
  academy?: string
  destination: string
  currentStatus: string
}

export interface TrajectoryFeatureWeight {
  [key: string]: unknown
  feature: string
  humanReadableValue: string
  weight?: number
  direction: 'positive' | 'negative' | 'neutral'
}

export interface TrajectoryPrediction {
  [key: string]: unknown
  outcomes: TrajectoryOutcome[]
  cohortAnalogs: TrajectoryCohortAnalog[]
  featureWeights: TrajectoryFeatureWeight[]
  confidenceTier: string
  sampleSize: number
  trainingDataRange: string
  statusLabel?: string
  calibrationNote?: string
}

export interface FeaturedLapBadge {
  [key: string]: unknown
  label: string
  color: string
}

export interface FeaturedLap {
  [key: string]: unknown
  id: string
  featured?: boolean
  borderColor: string
  glowColor: string
  svgViewBox?: string
  svgPath: string
  badges: FeaturedLapBadge[]
  kicker: string
  headline: string
  meta: string
}

export type LapSessionType = 'qualifying' | 'race' | 'practice'
export type LapCondition = 'dry' | 'wet' | 'mixed'

export interface LapRecord {
  [key: string]: unknown
  id: string
  era: string
  sessionType: LapSessionType
  conditions: LapCondition
  track: string
  year: number
  timeMs: number
  teamColor: string
  team: string
  session: string
  timeFormatted: string
  result: string
  resultColor: string
}

export interface LapSector {
  [key: string]: unknown
  label: string
  time: string
  delta?: string
  status?: string
  positive?: boolean
}

export interface TelemetryTrace {
  [key: string]: unknown
  label: string
  svgPath: string
  color: string
}

export interface LapMoment {
  [key: string]: unknown
  id: string
  label: string
  timestamp: string
  description: string
  stat: string
  jumpPct: number
  accent?: 'gold' | 'red'
}

export interface LapAnalysis {
  [key: string]: unknown
  lapId: string
  headline: string
  metaLine: string
  narrative: string
  lapTimeMs: number
  lapTimeFormatted: string
  lapTimeSub: string
  vTeammate: string
  vTeammateSub: string
  topSpeedKmh: number
  topSpeedSub: string
  avgThrottlePct: number
  avgThrottleSub: string
  trackLengthM: number
  racingLinePath: string
  sectorObservation: string
  sectors: LapSector[]
  telemetry: TelemetryTrace[]
  moments: LapMoment[]
  framesAnalyzed?: number
  processingTimeS?: number
  videoSource?: string
}

export interface ComparisonLapSectorTime {
  [key: string]: unknown
  label: string
  time: string
}

export interface ComparisonLap {
  [key: string]: unknown
  name: string
  teamName: string
  teamColor: string
  lapTime: string
  lapTimeMs: number
  result: string
  resultColor: string
  meta: string
  sectors: ComparisonLapSectorTime[]
}

export interface DeltaInsight {
  [key: string]: unknown
  label: string
  description: string
  note: string
  winner: 'a' | 'b'
}

export interface LineAnnotation {
  [key: string]: unknown
  cx: number
  cy: number
  dx: number
  dy: number
  label: string
  winner: 'a' | 'b'
  textAnchor?: 'start' | 'end' | 'middle' | 'inherit'
}

export interface OverlayTrace {
  [key: string]: unknown
  label: string
  pathA: string
  pathB: string
}

export interface SectorComparison {
  [key: string]: unknown
  label: string
  winnerLabel: string
  winnerColor: string
  lapA: { time: string; barWidth: number }
  lapB: { time: string; barWidth: number }
  keyNote: string
}

export interface LapComparisonData {
  [key: string]: unknown
  id: string
  title: string
  subtitle: string
  description: string
  colorA: string
  colorB: string
  lapA: ComparisonLap
  lapB: ComparisonLap
  deltaPath: string
  deltaInsights: DeltaInsight[]
  circuitPath: string
  linePathA: string
  linePathB: string
  lineAnnotations: LineAnnotation[]
  divergenceDescription: string
  divergence: {
    maxM: number
    maxLocation: string
    avgM: number
    overlapPct: number
    note: string
  }
  overlayTraces: OverlayTrace[]
  sectors: SectorComparison[]
  takeaway: string[]
  totalFrames: number
}

export type TeamLivery = string

export interface Team {
  [key: string]: unknown
  id: string
  name: string
  shortName: string
  country: string
  series: Series[]
  founded: number
  current: boolean
  entityColor: string
  liveryHex: string
  bio: string
  quote?: string
  quoteContext?: string
}

export interface TeamStats {
  [key: string]: unknown
  teamId: string
  constructorsTitles: number
  driversTitles: number
  wins: number
  podiums: number
  seasons: number
  firstSeason: number
}

export interface TeamEngineeringEra {
  [key: string]: unknown
  teamId: string
  label: string
  seasons: string
  description: string
  championships: number
  driverNames?: string
  champLabel?: string
  golden?: boolean
  current?: boolean
  imageUrl?: string
}

export interface TeamSignatureBar {
  [key: string]: unknown
  label: string
  rating: string
  value: number
  caption: string
  sentiment: string
}

export interface TeamAcademyDriver {
  [key: string]: unknown
  name: string
  tier: 'f1' | 'junior' | 'alumni'
  note: string
  deceased?: boolean
}

export interface TeamIconicCar {
  [key: string]: unknown
  name: string
  year: number
  subtitle: string
  meta: string
  peak?: boolean
  imageUrl?: string
}

export interface TeamKeyMoment {
  [key: string]: unknown
  videoId: string
  title: string
  year: number
  label: string
  badge: string
}

export interface PremaStats {
  [key: string]: unknown
  f2Titles: number
  f3TitlesSince2019: number
  f1Graduates: number
  f2Wins: number
  graduationRatePct: number
}

export interface PremaGraduate {
  [key: string]: unknown
  name: string
  f3Result: string
  f2Result: string
  graduatedTo: string
  graduatedToColor: string
  current: string
  currentColor: string
  status: string
  statusColor: string
}

export interface PremaCurrentDriver {
  [key: string]: unknown
  name: string
  academy: string
}

export interface PremaCurrentSeason {
  [key: string]: unknown
  f2: PremaCurrentDriver[]
  f3: PremaCurrentDriver[]
  f1Academy: PremaCurrentDriver[]
}

export interface Venue {
  [key: string]: unknown
  id: string
  name: string
  subLabel?: string
  country: string
  layoutVersion: string
  lengthKm: number
  corners: number
  elevationDeltaM: number
  f1Since: number
  entityColor: string
  entityColorHex: string
  quote?: string
  quoteAttribution?: string
  trackPath?: string
  trackLocation?: string
}

export interface VenueStats {
  [key: string]: unknown
  venueId: string
  lengthKm: number
  corners: number
  lapRecord: string
  lapRecordDriver: string
  lapRecordYear: number
  elevationDeltaM: number
  f1Since: number
}

export interface VenueFingerprintBar {
  [key: string]: unknown
  label: string
  rating: string
  value: number
  caption: string
}

export interface VenueFingerprint {
  [key: string]: unknown
  venueId: string
  bars: VenueFingerprintBar[]
  description?: string
}

export interface DriverTrackFit {
  [key: string]: unknown
  venueId: string
  driverId: string
  driverName: string
  fitScore: number
  wins: number
  poles: number
}

export type HotspotType = 'iconic' | 'legendary' | 'passive'

export interface Hotspot {
  [key: string]: unknown
  id: string
  venueId: string
  cornerLabel: string
  x: number
  y: number
  type: HotspotType
  momentId?: string
}

export interface MomentOverlay {
  [key: string]: unknown
  momentId: string
  title: string
  year: number
  driver1Id: string
  driver2Id: string
  cornerLabel: string
  description: string
  defenderTrace: [number, number][]
  overtakerTrace: [number, number][]
}

export interface VenueIconicMoment {
  [key: string]: unknown
  id: string
  year: number
  title: string
  teamLabel: string
  conditionBadge: string
  conditionColor: string
  glowColor: string
  imageUrl?: string
}

export interface VenueWeather {
  [key: string]: unknown
  venueId: string
  dryPct: number
  mixedPct: number
  wetPct: number
  totalRaces: number
  chaoticRaces: Array<{
    year: number
    label: string
    type: 'DRY' | 'MIXED' | 'WET'
  }>
  description?: string
  circuitNote?: string
}

export type TrackRecord = TrackAffinity
