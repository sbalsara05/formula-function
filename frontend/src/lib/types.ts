export type Series = 'f1' | 'f2' | 'f3'

type ExtraFields = Record<string, unknown>

export interface Driver extends ExtraFields {
  id: string
  name: string
  shortName: string
  initials: string
  nationality: string
  dob: string
  status: 'active' | 'retired'
  series: Series[]
  peakEraTeamId: string
  entityColor: string
  portraitUrl?: string
  quote?: string
  quoteContext?: string
}

export interface DriverStats extends ExtraFields {
  driverId: string
  series: Series
  titles: number
  wins: number
  poles: number
  podiums: number
  careerSpan: string
  racesEntered: number
  fastestLaps: number
  pointsScored: number
}

export interface DriverEra extends ExtraFields {
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

export interface TeammateRecord extends ExtraFields {
  teammateId: string
  teammateName: string
  seasons: string
  racesTogether: number
  qualifyingRecord: string
  raceRecord: string
  pointsDelta: string
  sentiment: string
}

export interface TrackRecord extends ExtraFields {
  trackId: string
  trackName: string
  wins: number
  poles: number
  podiums: number
  note?: string
}

export interface DrivingSignatureAxis extends ExtraFields {
  label: string
  value: number
}

export interface DrivingSignature extends ExtraFields {
  driverId: string
  series: Series
  axes: DrivingSignatureAxis[]
  cohortAverage: number[]
  sampleSize?: number
}

export interface ReelCircle extends ExtraFields {
  cx: number
  cy: number
  r: number
  fill: string
}

export interface ReelSlide extends ExtraFields {
  glowColor: string
  svgPath: string
  image?: string
  imageUrl?: string
  videoId?: string
  videoStart?: number
  badge?: string
  label?: string
  headline?: string
  title?: string
  meta?: string
  subtitle?: string
  tags?: string
  kicker?: string
  slotLabel?: string
  circles?: ReelCircle[]
}

export interface SetupBar extends ExtraFields {
  leftLabel: string
  rightLabel: string
  position: number
  annotation: string
  highlight?: boolean
}

export interface ScoutingReport extends ExtraFields {
  paragraphs: string[]
  highlights: string[]
  setupBars: SetupBar[]
  excelledAt: string[]
  struggledWith: string[]
}

export interface TrajectoryOutcome extends ExtraFields {
  destination: string
  probability: number
}

export interface TrajectoryAnalog extends ExtraFields {
  driverId: string
  driverName: string
  matchPercentage: number
  era: string
  academy?: string
  destination: string
  currentStatus: string
}

export interface TrajectoryFeatureWeight extends ExtraFields {
  feature: string
  direction: 'positive' | 'negative' | 'neutral'
  humanReadableValue: string
}

export interface TrajectoryPrediction extends ExtraFields {
  driverId: string
  outcomes: TrajectoryOutcome[]
  cohortAnalogs: TrajectoryAnalog[]
  featureWeights: TrajectoryFeatureWeight[]
  confidenceTier: string
  sampleSize: number
  trainingDataRange: string
  statusLabel?: string
  calibrationNote?: string
}

export interface FeaturedLapBadge extends ExtraFields {
  label: string
  color: string
}

export interface FeaturedLap extends ExtraFields {
  id: string
  featured?: boolean
  borderColor: string
  glowColor: string
  svgPath: string
  svgViewBox?: string
  badges: FeaturedLapBadge[]
  kicker: string
  headline: string
  meta: string
}

export interface LapRecord extends ExtraFields {
  id: string
  year: number
  track: string
  team: string
  teamColor: string
  session: string
  sessionType: 'qualifying' | 'race' | 'practice'
  conditions: 'dry' | 'wet' | 'mixed'
  era: string
  timeFormatted: string
  timeMs: number
  result: string
  resultColor: string
}

export interface LapSector extends ExtraFields {
  label: string
  time: string
  status: string
  delta: string
  positive: boolean
}

export interface TelemetryTrace extends ExtraFields {
  label: string
  color: string
  svgPath: string
}

export interface LapMoment extends ExtraFields {
  id: string
  label: string
  timestamp: string
  jumpPct: number
  description: string
  stat: string
  accent: string
}

export interface LapAnalysis extends ExtraFields {
  lapId: string
  headline: string
  narrative: string
  metaLine: string
  lapTimeFormatted: string
  lapTimeMs: number
  lapTimeSub: string
  vTeammate: string
  vTeammateSub: string
  topSpeedKmh: number
  topSpeedSub: string
  avgThrottlePct: number
  avgThrottleSub: string
  racingLinePath: string
  trackLengthM: number
  sectors: LapSector[]
  sectorObservation: string
  telemetry: TelemetryTrace[]
  moments: LapMoment[]
  framesAnalyzed: number
  processingTimeS: number
  videoSource: string
}

export interface ComparisonLap extends ExtraFields {
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

export interface DeltaInsight extends ExtraFields {
  label: string
  description: string
  note: string
  winner: 'a' | 'b'
}

export interface OverlayTrace extends ExtraFields {
  label: string
  pathA: string
  pathB: string
}

export interface LineAnnotation extends ExtraFields {
  cx: number
  cy: number
  winner: 'a' | 'b'
  label: string
  textAnchor?: 'start' | 'end' | 'middle' | 'inherit'
  dx: number
  dy: number
}

export interface SectorComparison extends ExtraFields {
  label: string
  winnerLabel: string
  winnerColor: string
  lapA: { time: string; barWidth: number }
  lapB: { time: string; barWidth: number }
  keyNote: string
}

export interface LapComparisonData extends ExtraFields {
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
  divergence: {
    maxM: number
    maxLocation: string
    avgM: number
    overlapPct: number
    note: string
  }
  divergenceDescription: string
  overlayTraces: OverlayTrace[]
  sectors: SectorComparison[]
  takeaway: string[]
  totalFrames: number
}

export interface Team extends ExtraFields {
  id: string
  name: string
  shortName: string
  country: string
  founded: number
  series: Series[]
  current: boolean
  entityColor: string
  liveryHex: string
  bio: string
  quote?: string
  quoteContext?: string
}

export interface TeamStats extends ExtraFields {
  teamId: string
  series: Series
  constructorsTitles: number
  driversTitles: number
  wins: number
  poles: number
  podiums: number
  firstSeason: number
  seasons: number
}

export interface TeamEngineeringEra extends ExtraFields {
  label: string
  seasons: string
  description: string
  championships: number
  driverNames?: string
  golden?: boolean
  current?: boolean
  champLabel?: string
  imageUrl?: string
}

export interface TeamSignatureBar extends ExtraFields {
  label: string
  rating: string
  value: number
  caption: string
  sentiment?: 'strength' | 'neutral' | 'weakness'
}

export interface TeamAcademyDriver extends ExtraFields {
  name: string
  tier: 'f1' | 'junior' | 'alumni'
  note: string
  deceased?: boolean
}

export interface TeamIconicCar extends ExtraFields {
  name: string
  year: number
  subtitle: string
  meta: string
  imageUrl?: string
  peak?: boolean
}

export interface TeamKeyMoment extends ExtraFields {
  videoId: string
  title: string
  badge: string
  year: number
  label: string
}

export interface TeamLivery extends ExtraFields {
  teamId: string
  season: number | string
  primaryHex: string
  secondaryHex?: string
  accentHex?: string
}

export interface PremaStats extends ExtraFields {
  teamId: string
  f2Titles: number
  f3TitlesSince2019: number
  f1Graduates: number
  f2Wins: number
  graduationRatePct: number
}

export interface PremaGraduate extends ExtraFields {
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

export interface PremaCurrentSeasonDriver extends ExtraFields {
  name: string
  academy: string
}

export interface PremaCurrentSeason extends ExtraFields {
  f2: PremaCurrentSeasonDriver[]
  f3: PremaCurrentSeasonDriver[]
  f1Academy: PremaCurrentSeasonDriver[]
}

export interface Venue extends ExtraFields {
  id: string
  name: string
  country: string
  series: Series[]
  f1Since: number
  entityColorHex: string
  lengthKm: number
  corners: number
  trackPath?: string
  trackLocation?: string
  subLabel?: string
  quote?: string
  quoteAttribution?: string
}

export interface VenueStats extends ExtraFields {
  venueId: string
  lengthKm: number
  corners: number
  lapRecord: string
  lapRecordDriver: string
  lapRecordYear: number
  elevationDeltaM: number
  f1Since: number
}

export interface VenueFingerprintBar extends ExtraFields {
  label: string
  rating: string
  value: number
  caption: string
}

export interface VenueFingerprint extends ExtraFields {
  venueId: string
  description?: string
  bars: VenueFingerprintBar[]
}

export interface DriverTrackFit extends ExtraFields {
  venueId: string
  driverId: string
  driverName: string
  fitScore: number
  wins: number
  poles: number
}

export interface Hotspot extends ExtraFields {
  id: string
  venueId: string
  cornerLabel: string
  x: number
  y: number
  type: 'legendary' | 'iconic' | 'passive'
  momentId?: string
}

export interface MomentOverlay extends ExtraFields {
  id: string
  hotspotId: string
  title: string
  subtitle: string
  year: number
  body: string
  accentColor: string
}

export interface VenueIconicMoment extends ExtraFields {
  id: string
  year: number
  title: string
  teamLabel: string
  conditionBadge: string
  conditionColor: string
  glowColor: string
  imageUrl: string
}

export interface VenueWeatherRace extends ExtraFields {
  year: number
  label: string
  type: 'DRY' | 'MIXED' | 'WET'
}

export interface VenueWeather extends ExtraFields {
  venueId: string
  dryPct: number
  mixedPct: number
  wetPct: number
  totalRaces: number
  chaoticRaces: VenueWeatherRace[]
  description?: string
  circuitNote?: string
}
