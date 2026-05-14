export type Series = 'f1' | 'f2' | 'f3'

type LooseRecord = Record<string, any>

export interface Driver extends LooseRecord {
  id: string
  name: string
  shortName: string
  initials: string
  nationality: string
  dob: string
  status: string
  series: Series[]
  peakEraTeamId: string
  entityColor: string
  bio: string
  quote?: string
  quoteContext?: string
  portraitUrl?: string
}

export interface DriverStats extends LooseRecord {
  driverId: string
  series: Series
  titles: number
  wins: number
  poles: number
  podiums: number
  careerSpan: string
  racesEntered: number
}

export interface DriverEra extends LooseRecord {
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

export type TeammateRecord = LooseRecord
export type TrackRecord = LooseRecord

export interface DrivingSignature extends LooseRecord {
  driverId: string
  series: Series
  axes: Array<{ label: string; value: number }>
  cohortAverage: number[]
  confidenceScore: number
  sampleSize: number
}

export interface ReelSlide extends LooseRecord {
  slotLabel?: string
  label?: string
  badge?: string
  glowColor: string
  tags?: string
  kicker?: string
  title?: string
  headline?: string
  subtitle?: string
  meta?: string
  svgPath: string
  image?: string
  imageUrl?: string
  videoId?: string
  videoStart?: number
  circles?: Array<{ cx: number; cy: number; r: number; fill: string }>
}

export interface ScoutingReport extends LooseRecord {
  paragraphs: string[]
  highlights: string[]
  setupBars: Array<{
    leftLabel: string
    rightLabel: string
    position: number
    annotation: string
    highlight?: boolean
  }>
  excelledAt: string[]
  struggledWith: string[]
}

export interface TrajectoryPrediction extends LooseRecord {
  outcomes: Array<{ destination: string; probability: number }>
  cohortAnalogs: Array<{
    driverId: string
    driverName: string
    matchPercentage: number
    destination: string
    currentStatus: string
    era?: string
    academy?: string
  }>
  featureWeights: Array<{
    feature: string
    humanReadableValue: string
    direction: 'positive' | 'negative' | 'neutral' | string
    weight?: number
    [key: string]: any
  }>
  confidenceTier: string
  sampleSize: number
  trainingDataRange: string
  statusLabel?: string
  calibrationNote?: string
}

export interface Team extends LooseRecord {
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

export interface TeamStats extends LooseRecord {
  teamId: string
  constructorsTitles: number
  driversTitles: number
  wins: number
  podiums: number
  seasons: number
  firstSeason: number
}

export interface TeamEngineeringEra extends LooseRecord {
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

export interface TeamSignatureBar extends LooseRecord {
  label: string
  rating: string
  value: number
  caption: string
  sentiment?: string
}

export interface TeamAcademyDriver extends LooseRecord {
  name: string
  tier: 'f1' | 'junior' | 'alumni' | string
  note: string
  deceased?: boolean
}

export interface TeamIconicCar extends LooseRecord {
  name: string
  year: number
  subtitle: string
  meta: string
  imageUrl?: string
  peak?: boolean
}

export interface TeamKeyMoment extends LooseRecord {
  videoId: string
  title: string
  badge: string
  year: number
  label: string
}

export type TeamLivery = string

export interface PremaStats extends LooseRecord {
  teamId?: string
  titles?: number
  wins?: number
  podiums?: number
  seasons?: number
  firstSeason?: number
  f2Titles?: number
  f3TitlesSince2019?: number
  f1Graduates?: number
  f2Wins?: number
  graduationRatePct?: number
}

export interface PremaGraduate extends LooseRecord {
  name: string
  destination?: string
  years?: string
  achievement?: string
  f3Result?: string
  f2Result?: string
  graduatedTo?: string
  graduatedToColor?: string
  current?: string
  currentColor?: string
  status?: string
  statusColor?: string
}

export interface PremaCurrentSeason extends LooseRecord {
  series?: string
  drivers?: string[]
  wins?: number
  podiums?: number
  position?: string
  f2: Array<{ name: string; academy: string }>
  f3: Array<{ name: string; academy: string }>
  f1Academy: Array<{ name: string; academy: string }>
}

export interface Venue extends LooseRecord {
  id: string
  name: string
  country: string
  f1Since: number
  entityColor: string
  entityColorHex: string
  trackPath?: string
  trackLocation?: string
  subLabel?: string
  quote?: string
  quoteAttribution?: string
}

export interface VenueStats extends LooseRecord {
  venueId: string
  lengthKm: number
  corners: number
  lapRecord: string
  lapRecordDriver: string
  lapRecordYear: number
  elevationDeltaM: number
  f1Since: number
}

export interface VenueFingerprint extends LooseRecord {
  venueId: string
  description?: string
  bars: Array<{ label: string; rating: string; value: number; caption: string }>
}

export interface DriverTrackFit extends LooseRecord {
  venueId: string
  driverId: string
  driverName: string
  fitScore: number
  wins: number
  poles: number
}

export interface Hotspot extends LooseRecord {
  id: string
  venueId: string
  cornerLabel: string
  x: number
  y: number
  type: 'legendary' | 'iconic' | 'passive' | string
  momentId?: string
}

export interface MomentOverlay extends LooseRecord {
  momentId: string
  title: string
  year: number
  driver1Id: string
  driver2Id: string
  cornerLabel: string
  description: string
  defenderTrace: [number, number][]
  overtakerTrace: [number, number][]
  imageUrl?: string
}

export interface VenueIconicMoment extends LooseRecord {
  id: string
  year: number
  title: string
  teamLabel: string
  conditionBadge: string
  conditionColor: string
  glowColor: string
  imageUrl?: string
}

export interface VenueWeather extends LooseRecord {
  venueId: string
  description?: string
  dryPct: number
  mixedPct: number
  wetPct: number
  totalRaces: number
  chaoticRaces: Array<{ year: number; label: string; type: string }>
  circuitNote?: string
  rows?: Array<{ label: string; pct: number; color: string }>
}

export interface FeaturedLap extends LooseRecord {
  id: string
  featured?: boolean
  borderColor: string
  glowColor: string
  svgPath: string
  svgViewBox?: string
  badges: Array<{ label: string; color: string }>
  kicker: string
  headline: string
  meta: string
}

export interface LapRecord extends LooseRecord {
  id: string
  year: number
  track: string
  team: string
  teamColor: string
  session: string
  sessionType: 'qualifying' | 'race' | 'practice' | string
  conditions: 'dry' | 'wet' | 'mixed' | string
  era: string
  timeMs: number
  timeFormatted: string
  result: string
  resultColor: string
}

export interface LapSector extends LooseRecord {
  label: string
  time: string
  delta: string
  status: string
  positive?: boolean
}

export interface TelemetryTrace extends LooseRecord {
  label: string
  color: string
  svgPath: string
}

export interface LapMoment extends LooseRecord {
  id: string
  label: string
  timestamp: string
  jumpPct: number
  description: string
  stat: string
  accent?: string
}

export interface LapAnalysis extends LooseRecord {
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
  sectors: LapSector[]
  sectorObservation: string
  telemetry: TelemetryTrace[]
  moments: LapMoment[]
}

export interface ComparisonLap extends LooseRecord {
  name: string
  teamName: string
  teamColor: string
  lapTime: string
  lapTimeMs: number
  result: string
  resultColor: string
  meta: string
  sectors: Array<{ label: string; time: string }>
}

export interface DeltaInsight extends LooseRecord {
  label: string
  winner: 'a' | 'b' | string
  description: string
  note: string
}

export interface LineAnnotation extends LooseRecord {
  cx: number
  cy: number
  dx: number
  dy: number
  label: string
  winner: 'a' | 'b' | string
  textAnchor?: 'start' | 'end' | 'middle' | 'inherit'
}

export interface OverlayTrace extends LooseRecord {
  label: string
  pathA: string
  pathB: string
}

export interface SectorComparison extends LooseRecord {
  label: string
  winnerColor: string
  winnerLabel: string
  lapA: { time: string; barWidth: number }
  lapB: { time: string; barWidth: number }
  keyNote: string
}

export interface LapComparisonData extends LooseRecord {
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
