export type Series = 'f1' | 'f2' | 'f3'

type Extensible = Record<string, unknown>

export interface Driver extends Extensible {
  id: string
  name: string
  shortName: string
  initials: string
  nationality: string
  dob: string
  status: 'active' | 'retired' | string
  series: Series[]
  peakEraTeamId?: string
  entityColor: string
  bio: string
  quote?: string
  quoteContext?: string
  portraitUrl?: string
}

export interface DriverStats extends Extensible {
  driverId: string
  series: Series
  titles: number
  wins: number
  poles: number
  podiums: number
  careerSpan: string
  racesEntered?: number
  fastestLaps?: number
  pointsScored?: number
}

export interface DriverEra extends Extensible {
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

export interface TeammateRecord extends Extensible {
  driverId: string
}

export interface TrackRecord extends Extensible {
  driverId: string
}

export interface DrivingSignatureAxis extends Extensible {
  label: string
  value: number
}

export interface DrivingSignature extends Extensible {
  driverId?: string
  axes: DrivingSignatureAxis[]
  cohortAverage: number[]
}

export interface ReelCircle extends Extensible {
  cx: number
  cy: number
  r: number
  fill: string
}

export interface ReelSlide extends Extensible {
  label?: string
  badge?: string
  title?: string
  headline?: string
  subtitle?: string
  meta?: string
  kicker?: string
  tags?: string
  image?: string
  imageUrl?: string
  videoId?: string
  videoStart?: number
  glowColor: string
  svgPath: string
  circles?: ReelCircle[]
}

export interface ScoutingReportBar extends Extensible {
  leftLabel: string
  rightLabel: string
  position: number
  annotation: string
  highlight?: boolean
}

export interface ScoutingReport extends Extensible {
  driverId?: string
  summary?: string
  paragraphs?: string[]
  highlightedTerms?: string[]
  bars?: ScoutingReportBar[]
}

export interface TrajectoryOutcome extends Extensible {
  destination: string
  probability: number
}

export interface TrajectoryAnalog extends Extensible {
  driverId: string
  driverName: string
  matchPercentage: number
  destination: string
  era: string
  academy?: string
  currentStatus: string
}

export interface TrajectoryFeatureWeight extends Extensible {
  feature: string
  humanReadableValue: string
  direction: 'positive' | 'negative' | 'neutral' | string
}

export interface TrajectoryPrediction extends Extensible {
  outcomes: TrajectoryOutcome[]
  cohortAnalogs: TrajectoryAnalog[]
  featureWeights: TrajectoryFeatureWeight[]
  confidenceTier: string
  sampleSize: number
  trainingDataRange: string
  statusLabel?: string
  calibrationNote?: string
}

export interface LapBadge extends Extensible {
  label: string
  color: string
}

export interface FeaturedLap extends Extensible {
  id: string
  featured?: boolean
  borderColor: string
  glowColor: string
  svgViewBox?: string
  svgPath: string
  badges: LapBadge[]
  kicker: string
  headline: string
  meta: string
}

export interface LapRecord extends Extensible {
  id: string
  era: string
  sessionType: 'qualifying' | 'race' | 'practice' | string
  conditions: 'dry' | 'wet' | 'mixed' | string
  track: string
  year: number
  timeMs: number
  teamColor: string
  team: string
  session: string
  timeFormatted: string
  resultColor: string
  result: string
}

export interface LapSector extends Extensible {
  label: string
  time: string
  delta: string
  status: string
  positive: boolean
}

export interface TelemetryTrace extends Extensible {
  label: string
  color: string
  svgPath: string
}

export interface LapMoment extends Extensible {
  id: string
  label: string
  timestamp: string
  description: string
  stat: string
  jumpPct: number
  accent: 'gold' | string
}

export interface LapAnalysis extends Extensible {
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
  framesAnalyzed: number
  processingTimeS: number
  videoSource: string
}

export interface ComparisonLapSector extends Extensible {
  label: string
  time: string
}

export interface ComparisonLap extends Extensible {
  name: string
  lapTime: string
  lapTimeMs: number
  result: string
  resultColor: string
  meta: string
  teamName: string
  teamColor: string
  sectors: ComparisonLapSector[]
}

export interface DeltaInsight extends Extensible {
  label: string
  description: string
  note: string
  winner: 'a' | 'b'
}

export interface LineAnnotation extends Extensible {
  cx: number
  cy: number
  dx: number
  dy: number
  label: string
  winner: 'a' | 'b'
  textAnchor?: 'start' | 'end' | 'middle' | 'inherit'
}

export interface OverlayTrace extends Extensible {
  label: string
  pathA: string
  pathB: string
}

export interface SectorComparison extends Extensible {
  label: string
  winnerColor: string
  winnerLabel: string
  lapA: {
    time: string
    barWidth: number
  }
  lapB: {
    time: string
    barWidth: number
  }
  keyNote: string
}

export interface LapComparisonData extends Extensible {
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

export interface Team extends Extensible {
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

export interface TeamStats extends Extensible {
  teamId: string
  constructorsTitles: number
  driversTitles: number
  wins: number
  podiums: number
  seasons: number
  firstSeason: number
}

export interface TeamEngineeringEra extends Extensible {
  teamId: string
  label: string
  seasons: string
  description: string
  championships: number
  driverNames?: string
  champLabel?: string
  imageUrl?: string
  golden?: boolean
  current?: boolean
}

export interface TeamSignatureBar extends Extensible {
  label: string
  rating: string
  value: number
  caption: string
}

export interface TeamAcademyDriver extends Extensible {
  name: string
  academy?: string
}

export interface TeamIconicCar extends Extensible {
  label?: string
  title?: string
  imageUrl?: string
}

export interface TeamKeyMoment extends Extensible {
  label?: string
  title?: string
  description?: string
}

export interface TeamLivery extends Extensible {
  teamId: string
}

export interface PremaStats extends Extensible {
  teamId: string
  f2Titles: number
  f3TitlesSince2019: number
  f1Graduates: number
  f2Wins: number
  graduationRatePct: number
}

export interface PremaGraduate extends Extensible {
  name: string
  academy: string
}

export interface PremaCurrentSeason extends Extensible {
  title?: string
}

export interface Venue extends Extensible {
  id: string
  name: string
  country: string
  series: Series[]
  f1Since: number
  entityColorHex: string
  trackLocation?: string
  subLabel?: string
  quote?: string
  quoteAttribution?: string
  trackPath?: string
  corners: number
  lengthKm: number
}

export interface VenueStats extends Extensible {
  venueId: string
  lengthKm: number
  corners: number
  lapRecord: string
  lapRecordDriver: string
  lapRecordYear: number
  elevationDeltaM: number
  f1Since: number
}

export interface VenueFingerprintBar extends Extensible {
  label: string
  rating: string
  value: number
  caption: string
}

export interface VenueFingerprint extends Extensible {
  venueId: string
  description?: string
  bars: VenueFingerprintBar[]
}

export interface DriverTrackFit extends Extensible {
  driverId?: string
  driverName?: string
  rating?: string
}

export interface Hotspot extends Extensible {
  id: string
  x: number
  y: number
  cornerLabel: string
  type: 'iconic' | 'legendary' | 'passive' | string
  momentId?: string
}

export interface MomentOverlay extends Extensible {
  momentId: string
  cornerLabel: string
  year: number
  description: string
  title: string
  defenderTrace?: [number, number][]
  overtakerTrace?: [number, number][]
}

export interface VenueIconicMoment extends Extensible {
  id: string
  year: number
  label: string
  title: string
  description: string
  stat?: string
  imageUrl?: string
}

export interface VenueWeatherRace extends Extensible {
  year: number
  label: string
  type: 'DRY' | 'MIXED' | 'WET' | string
}

export interface VenueWeather extends Extensible {
  venueId: string
  dryPct: number
  mixedPct: number
  wetPct: number
  totalRaces: number
  description?: string
  circuitNote?: string
  notableRaces: VenueWeatherRace[]
}
