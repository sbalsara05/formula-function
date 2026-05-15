export type Series = 'f1' | 'f2' | 'f3'

type LooseRecord = Record<string, any>
type LooseList = LooseRecord[]

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

export interface TeammateRecord extends LooseRecord {}
export interface TrackRecord extends LooseRecord {}

export interface SignatureAxis extends LooseRecord {
  label: string
  value: number
}

export interface DrivingSignature extends LooseRecord {
  driverId: string
  series: Series
  axes: SignatureAxis[]
  cohortAverage: number[]
  confidenceScore: number
  sampleSize: number
}

export interface ReelSlide extends LooseRecord {
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

export interface ScoutingReport extends LooseRecord {
  paragraphs: string[]
  highlights?: string[]
  setupBars: LooseList
  excelledAt: string[]
  struggledWith: string[]
}

export interface TrajectoryPrediction extends LooseRecord {
  driverId: string
  outcomes: LooseList
  cohortAnalogs: LooseList
  featureWeights: LooseList
  sampleSize: number
}

export interface FeaturedLap extends LooseRecord {
  id: string
  badges: Array<{ label: string; color: string }>
  kicker: string
  headline: string
  meta: string
  glowColor: string
  borderColor: string
  svgPath: string
  era: string
  conditions: string
  sessionType: string
}

export interface LapRecord extends LooseRecord {
  id: string
  year: number
  track: string
  team: string
  teamColor: string
  session: string
  sessionType: string
  conditions: string
  era: string
  timeMs: number
  timeFormatted: string
  result: string
  resultColor: string
  badges?: Array<{ label: string; color: string }>
}

export interface LapMoment extends LooseRecord {
  id?: string
  label: string
  jumpPct: number
}

export interface LapSector extends LooseRecord {
  label: string
}

export interface TelemetryTrace extends LooseRecord {
  label: string
  color: string
  svgPath?: string
  path?: string
}

export interface LapAnalysis extends LooseRecord {
  lapId: string
  trackName: string
  lapTimeMs: number
  trackLengthM: number
  sectors: LapSector[]
  telemetry: TelemetryTrace[]
  moments: LapMoment[]
}

export interface ComparisonLap extends LooseRecord {
  lapTime: string
  lapTimeMs: number
  sectors: LooseList
}

export interface DeltaInsight extends LooseRecord {}
export interface SectorComparison extends LooseRecord {}
export interface OverlayTrace extends LooseRecord {}
export interface LineAnnotation extends LooseRecord {}

export interface LapComparisonData extends LooseRecord {
  id: string
  lapA: ComparisonLap
  lapB: ComparisonLap
  deltaInsights: LooseList
  lineAnnotations: LooseList
  overlayTraces: LooseList
  sectors: LooseList
  takeaway: string[]
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
}

export interface TeamStats extends LooseRecord {
  teamId: string
}

export interface TeamEngineeringEra extends LooseRecord {
  teamId: string
  label: string
  seasons: string
  description: string
  championships: number
  driverNames?: string
  champLabel?: string
  imageUrl?: string
}

export interface TeamSignatureBar extends LooseRecord {
  label: string
  rating: string
  value: number
  caption: string
}

export interface TeamAcademyDriver extends LooseRecord {
  name: string
}

export interface TeamIconicCar extends LooseRecord {
  name: string
  year: number
  subtitle: string
  meta: string
  imageUrl?: string
}

export interface TeamKeyMoment extends LooseRecord {
  title: string
  year: number
}

export type TeamLivery = string

export interface PremaStats extends LooseRecord {}
export interface PremaGraduate extends LooseRecord {}

export interface PremaCurrentSeason extends LooseRecord {
  f2: LooseList
  f3: LooseList
  f1Academy: LooseList
}

export interface Venue extends LooseRecord {
  id: string
  name: string
  country: string
  entityColor: string
  entityColorHex: string
  trackPath: string
}

export interface VenueStats extends LooseRecord {
  venueId: string
  lengthKm: number
  corners: number
  lapRecord: string
  lapRecordDriver: string
  lapRecordYear: number
}

export interface VenueFingerprintBar extends LooseRecord {
  label: string
  rating: string
  value: number
  caption: string
}

export interface VenueFingerprint extends LooseRecord {
  venueId: string
  bars: VenueFingerprintBar[]
}

export interface DriverTrackFit extends LooseRecord {
  driverId: string
  driverName: string
  fitScore: number
}

export interface Hotspot extends LooseRecord {
  id: string
  x: number
  y: number
  cornerLabel: string
  type: string
  momentId?: string
}

export interface MomentOverlay extends LooseRecord {
  momentId: string
  title: string
  year: number
  cornerLabel?: string
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
  dryPct: number
  mixedPct: number
  wetPct: number
  totalRaces: number
  chaoticRaces: LooseList
}
