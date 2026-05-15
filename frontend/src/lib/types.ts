export type Series = 'f1' | 'f2' | 'f3'

export interface Driver {
  [key: string]: any
  id: string
  name: string
  shortName: string
  initials: string
  nationality: string
  dob: string
  status: 'active' | 'retired' | string
  series: Series[]
  peakEraTeamId: string
  entityColor: string
  bio: string
  quote?: string
  quoteContext?: string
  portraitUrl?: string
}

export interface DriverStats {
  [key: string]: any
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
  [key: string]: any
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
  golden?: boolean
}

export interface TeammateRecord {
  [key: string]: any
}

export interface TrackRecord {
  [key: string]: any
}

export interface SignatureAxis {
  [key: string]: any
  label: string
  value: number
}

export interface DrivingSignature {
  [key: string]: any
  driverId: string
  series: Series
  axes: SignatureAxis[]
  cohortAverage: number[]
  confidenceScore: number
  sampleSize: number
}

export interface ReelSlide {
  [key: string]: any
  slotLabel?: string
  label?: string
  badge?: string
  glowColor?: string
  tags?: string
  kicker?: string
  title?: string
  headline?: string
  subtitle?: string
  meta?: string
  svgPath?: string
  circles?: Array<{ cx: number; cy: number; r: number; fill: string }>
  image?: string
  imageUrl?: string
  videoId?: string
  videoStart?: number
}

export interface ScoutingReport {
  [key: string]: any
  paragraphs: string[]
}

export interface TrajectoryPrediction {
  [key: string]: any
  driverId: string
}

export interface FeaturedLap {
  [key: string]: any
  id: string
  track: string
  year: number
  session: string
  title: string
  description: string
  time: string
  delta: string
  conditions: string
  badge: string
}

export interface LapRecord {
  [key: string]: any
  id: string
  track: string
  year: number
  sessionType: 'qualifying' | 'race' | 'practice' | string
  conditions: 'dry' | 'wet' | 'mixed' | string
  era: string
  time: string
  timeMs: number
  position: string
  car: string
  significance: string
}

export interface LapMoment {
  [key: string]: any
  jumpPct: number
  label: string
  title: string
  detail: string
  color: string
}

export interface LapSector {
  [key: string]: any
  label: string
  time: string
  status: string
  delta: string
  positive: boolean
}

export interface TelemetryTrace {
  [key: string]: any
  label: string
  path: string
  color: string
}

export interface LapAnalysis {
  [key: string]: any
  lapId: string
  trackName: string
  year: number
  session: string
  car: string
  lapTime: string
  lapTimeMs: number
  trackLengthM: number
  summary: string
  sectors: LapSector[]
  sectorObservation: string
  telemetry: TelemetryTrace[]
  moments: LapMoment[]
}

export interface ComparisonLap {
  [key: string]: any
  lapTime: string
  lapTimeMs: number
}

export interface DeltaInsight {
  [key: string]: any
  label: string
  value: string
  detail: string
  advantage: 'lapA' | 'lapB' | 'neutral' | string
}

export interface SectorComparison {
  [key: string]: any
  sector: string
  lapA: string
  lapB: string
  deltaMs: number
  advantage: 'lapA' | 'lapB' | 'neutral' | string
}

export interface OverlayTrace {
  [key: string]: any
  label: string
  path: string
  color: string
}

export interface LineAnnotation {
  [key: string]: any
  pct: number
  label: string
  detail: string
}

export interface LapComparisonData {
  [key: string]: any
  id: string
  lapA: ComparisonLap
  lapB: ComparisonLap
}

export interface Team {
  [key: string]: any
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
  [key: string]: any
  teamId: string
  constructorsTitles: number
  driversTitles: number
  wins: number
  podiums: number
  seasons: number
  firstSeason: number
}

export interface TeamEngineeringEra {
  [key: string]: any
  teamId: string
  label: string
  seasons: string
  description: string
  championships: number
  driverNames?: string
  champLabel: string
  imageUrl?: string
  golden?: boolean
}

export interface TeamSignatureBar {
  [key: string]: any
  label: string
  rating: string
  value: number
  caption: string
  sentiment?: 'strength' | 'weakness' | 'neutral' | string
}

export interface TeamAcademyDriver {
  [key: string]: any
  name: string
  tier: string
  note: string
}

export interface TeamIconicCar {
  [key: string]: any
  name: string
  year: number
  subtitle: string
  meta: string
  imageUrl?: string
  peak?: boolean
}

export interface TeamKeyMoment {
  [key: string]: any
  year: number
  title: string
  detail: string
  tag: string
}

export type TeamLivery = string

export interface PremaStats {
  [key: string]: any
  teamId: string
  f2DriversTitles: number
  f3DriversTitles: number
  f2TeamsTitles: number
  f3TeamsTitles: number
  f1Graduates: number
  founded: number
}

export interface PremaGraduate {
  [key: string]: any
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

export interface PremaCurrentSeason {
  [key: string]: any
  f2: Array<{ name: string; academy: string }>
  f3: Array<{ name: string; academy: string }>
  f1Academy: Array<{ name: string; academy: string }>
}

export interface Venue {
  [key: string]: any
  id: string
  name: string
  location: string
  country: string
  series: Series[]
  firstGrandPrix: number
  current: boolean
  entityColor: string
  entityColorHex: string
  bio: string
  trackPath: string
}

export interface VenueStats {
  [key: string]: any
  venueId: string
  lengthKm: number
  corners: number
  lapRecord: string
  lapRecordDriver: string
  lapRecordYear: number
  racesHeld: number
}

export interface VenueFingerprintBar {
  [key: string]: any
  label: string
  rating: string
  value: number
  caption: string
}

export interface VenueFingerprint {
  [key: string]: any
  venueId: string
  bars: VenueFingerprintBar[]
}

export interface DriverTrackFit {
  [key: string]: any
  driverId: string
  driverName: string
  fitScore: number
  reason: string
  color: string
}

export interface Hotspot {
  [key: string]: any
  id: string
  x: number
  y: number
  cornerLabel: string
  type: 'passive' | 'legendary' | 'iconic' | string
  momentId?: string
}

export interface MomentOverlay {
  [key: string]: any
  momentId: string
  title: string
  subtitle: string
  description: string
  year: number
  color: string
  trace?: [number, number][]
}

export interface VenueIconicMoment {
  [key: string]: any
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
  [key: string]: any
  venueId: string
  dryProbability: number
  mixedProbability: number
  wetProbability: number
  note: string
}
