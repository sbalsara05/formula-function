import { notFound } from 'next/navigation'
import DriverPage from '@/components/driver/DriverPage'
import {
  type GenericDriverStats,
  type DriverCareerSeason,
} from '@/components/driver/GenericDriverPage'
import {
  vettel, vettelStats, vettelEras, vettelSignature,
  vettelReelSlides, vettelScoutingReport,
  bearman, bearmanStats, bearmanEras, bearmanSignature,
  bearmanReelSlides, bearmanScoutingReport, bearmanTrajectory,
  hamilton, hamiltonStats, hamiltonEras, hamiltonSignature,
  hamiltonReelSlides, hamiltonScoutingReport,
  verstappen, verstappenStats, verstappenEras, verstappenSignature,
  verstappenReelSlides, verstappenScoutingReport,
} from '@/data/mock/drivers'
import type {
  Series, Driver, DriverStats, DriverEra, DrivingSignature,
  ReelSlide, ScoutingReport, TrajectoryPrediction,
} from '@/lib/types'

const SERIES_MAP: Record<string, Series> = {
  '1': 'f1',
  '2': 'f2',
  '3': 'f3',
}

interface DriverBundle {
  driver: Driver
  stats: DriverStats
  eras: DriverEra[]
  signature: DrivingSignature
  reelSlides: ReelSlide[]
  scoutingReport: ScoutingReport
  trajectoryPrediction?: TrajectoryPrediction
  heroStatRows?: Array<{ label: string; value: string; sub?: string; accent?: boolean }>
}

const DRIVER_REGISTRY: Partial<Record<Series, Record<string, DriverBundle>>> = {
  f1: {
    vettel: {
      driver: vettel,
      stats: vettelStats,
      eras: vettelEras,
      signature: vettelSignature,
      reelSlides: vettelReelSlides,
      scoutingReport: vettelScoutingReport,
    },
    hamilton: {
      driver: hamilton,
      stats: hamiltonStats,
      eras: hamiltonEras,
      signature: hamiltonSignature,
      reelSlides: hamiltonReelSlides,
      scoutingReport: hamiltonScoutingReport,
    },
    verstappen: {
      driver: verstappen,
      stats: verstappenStats,
      eras: verstappenEras,
      signature: verstappenSignature,
      reelSlides: verstappenReelSlides,
      scoutingReport: verstappenScoutingReport,
    },
  },
  f2: {
    bearman: {
      driver: bearman,
      stats: bearmanStats,
      eras: bearmanEras,
      signature: bearmanSignature,
      reelSlides: bearmanReelSlides,
      scoutingReport: bearmanScoutingReport,
      trajectoryPrediction: bearmanTrajectory,
      heroStatRows: [
        { label: '2025 WDC', value: 'P13', sub: 'HAAS', accent: true },
        { label: '2025 PTS', value: '41' },
        { label: 'F1 STARTS', value: '27', sub: '3 SUB + 24 HAAS' },
        { label: 'BEST RESULT', value: 'P4', sub: 'MEXICO 2025' },
        { label: '2026', value: 'HAAS', sub: 'F1 ONGOING' },
      ],
    },
  },
}

/* ─── Slug → Jolpica driver ID ───────────────────────────────────────────── */

const DRIVER_SLUG_TO_JOLPICA: Record<string, string> = {
  // Current grid
  norris: 'norris',
  piastri: 'piastri',
  verstappen: 'max_verstappen',
  leclerc: 'leclerc',
  hamilton: 'hamilton',
  russell: 'russell',
  alonso: 'alonso',
  stroll: 'stroll',
  gasly: 'gasly',
  ocon: 'ocon',
  albon: 'albon',
  sainz: 'sainz',
  bearman: 'bearman',
  tsunoda: 'tsunoda',
  hulkenberg: 'hulkenberg',
  lawson: 'lawson',
  antonelli: 'antonelli',
  doohan: 'doohan',
  hadjar: 'hadjar',
  bortoleto: 'bortoleto',
  colapinto: 'colapinto',
  // Recent retired
  vettel: 'vettel',
  ricciardo: 'ricciardo',
  bottas: 'bottas',
  perez: 'perez',
  magnussen: 'magnussen',
  zhou: 'zhou',
  'de-vries': 'de_vries',
  mick_schumacher: 'mick_schumacher',
  'mick-schumacher': 'mick_schumacher',
  latifi: 'latifi',
  kubica: 'kubica',
  // Champions and all-time greats
  schumacher: 'michael_schumacher',
  'michael-schumacher': 'michael_schumacher',
  'ralf-schumacher': 'ralf_schumacher',
  senna: 'senna',
  prost: 'prost',
  lauda: 'lauda',
  button: 'button',
  raikkonen: 'raikkonen',
  rosberg: 'rosberg',
  'nico-rosberg': 'rosberg',
  'keke-rosberg': 'keke_rosberg',
  webber: 'webber',
  massa: 'massa',
  hakkinen: 'hakkinen',
  hill: 'damon_hill',
  'damon-hill': 'damon_hill',
  'graham-hill': 'hill',
  mansell: 'mansell',
  piquet: 'piquet',
  coulthard: 'coulthard',
  barrichello: 'barrichello',
  montoya: 'montoya',
  alesi: 'alesi',
  berger: 'berger',
  andretti: 'andretti',
  hunt: 'hunt',
  fittipaldi: 'fittipaldi',
  stewart: 'stewart',
  clark: 'clark',
  fangio: 'fangio',
  ascari: 'ascari',
  moss: 'moss',
  villeneuve: 'villeneuve',
  'gilles-villeneuve': 'gilles_villeneuve',
  'jacques-villeneuve': 'villeneuve',
  scheckter: 'scheckter',
  jones: 'jones',
  brabham: 'brabham',
  hulme: 'hulme',
  rindt: 'rindt',
  ickx: 'ickx',
  regazzoni: 'regazzoni',
  reutemann: 'reutemann',
  patrese: 'patrese',
  arnoux: 'arnoux',
  pironi: 'pironi',
  laffite: 'laffite',
  trulli: 'trulli',
  fisichella: 'fisichella',
  irvine: 'irvine',
  'de-la-rosa': 'de_la_rosa',
  button2: 'button',
}

/* ─── Team color lookup ───────────────────────────────────────────────────── */

const TEAM_COLORS: Record<string, string> = {
  ferrari: '#DC0000', mclaren: '#FF8000', mercedes: '#00D2BE',
  red_bull: '#1E3A8A', williams: '#005AFF', aston_martin: '#006F62',
  alpine: '#0090FF', haas: '#B6BABD', sauber: '#52E252', rb: '#6692FF',
  lotus: '#FFD700', renault: '#FFD700', benetton: '#009944', brawn: '#BFFF00',
  tyrrell: '#1565C0', brabham: '#4A90D9', cooper: '#2E7D32', brm: '#1B5E20',
  jordan: '#FFD700', force_india: '#FF80C7', racing_point: '#FF80C7',
  alfa_romeo: '#900000', toro_rosso: '#C00000', minardi: '#333',
}

/* ─── Jolpica helpers ─────────────────────────────────────────────────────── */

async function jolpicaTotal(url: string): Promise<number> {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } })
    if (!res.ok) return 0
    const d = await res.json()
    if (!d?.MRData) return 0
    return parseInt(d.MRData.total ?? '0', 10)
  } catch {
    return 0
  }
}

interface JolpicaDriverInfo {
  givenName: string
  familyName: string
  nationality: string
  permanentNumber?: string
  dateOfBirth?: string
}

async function fetchDriverInfo(jolpicaId: string): Promise<JolpicaDriverInfo | null> {
  try {
    const res = await fetch(
      `https://api.jolpi.ca/ergast/f1/drivers/${jolpicaId}.json`,
      { next: { revalidate: 86400 } },
    )
    if (!res.ok) return null
    const data = await res.json()
    const d = data?.MRData?.DriverTable?.Drivers?.[0]
    if (!d) return null
    return {
      givenName: d.givenName,
      familyName: d.familyName,
      nationality: d.nationality,
      permanentNumber: d.permanentNumber,
      dateOfBirth: d.dateOfBirth,
    }
  } catch {
    return null
  }
}

async function fetchDriverAllTimeStats(jolpicaId: string): Promise<GenericDriverStats | null> {
  const base = `https://api.jolpi.ca/ergast/f1/drivers/${jolpicaId}`
  try {
    const [races, wins, p2, p3, poles, seasons] = await Promise.all([
      jolpicaTotal(`${base}/results.json?limit=1`),
      jolpicaTotal(`${base}/results/1.json?limit=1`),
      jolpicaTotal(`${base}/results/2.json?limit=1`),
      jolpicaTotal(`${base}/results/3.json?limit=1`),
      jolpicaTotal(`${base}/qualifying/1.json?limit=1`),
      jolpicaTotal(`${base}/seasons.json?limit=1`),
    ])
    return { races, wins, poles, podiums: wins + p2 + p3, championships: 0, seasons }
  } catch {
    return null
  }
}

async function fetchDriverCurrentStanding(jolpicaId: string): Promise<{
  position: number
  points: string
  wins: string
  season: string
  constructorId: string
  constructorName: string
} | null> {
  try {
    const res = await fetch(
      'https://api.jolpi.ca/ergast/f1/current/driverstandings.json',
      { next: { revalidate: 300 } },
    )
    if (!res.ok) return null
    const data = await res.json()
    const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]
    if (!list) return null
    const entry = list.DriverStandings?.find(
      (s: Record<string, unknown>) => (s.Driver as Record<string, string>)?.driverId === jolpicaId,
    )
    if (!entry) return null
    const constructor = (entry.Constructors as Array<Record<string, string>>)?.[0]
    return {
      position: parseInt(entry.position),
      points: entry.points,
      wins: entry.wins,
      season: list.season,
      constructorId: constructor?.constructorId ?? '',
      constructorName: constructor?.name ?? '',
    }
  } catch {
    return null
  }
}

async function fetchDriverCareerHistory(jolpicaId: string): Promise<DriverCareerSeason[]> {
  try {
    const seasonsRes = await fetch(
      `https://api.jolpi.ca/ergast/f1/drivers/${jolpicaId}/seasons.json?limit=100`,
      { next: { revalidate: 86400 } },
    )
    if (!seasonsRes.ok) return []
    const seasonsData = await seasonsRes.json()
    const allYears: string[] = (seasonsData?.MRData?.SeasonTable?.Seasons ?? []).map((s: { season: string }) => s.season)
    if (!allYears.length) return []

    const BATCH = 8
    const history: DriverCareerSeason[] = []

    for (let i = 0; i < allYears.length; i += BATCH) {
      const batch = allYears.slice(i, i + BATCH)
      const settled = await Promise.allSettled(
        batch.map(async (year) => {
          const res = await fetch(
            `https://api.jolpi.ca/ergast/f1/${year}/drivers/${jolpicaId}/driverstandings.json`,
            { next: { revalidate: 86400 } },
          )
          if (!res.ok) return null
          const data = await res.json()
          const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]
          if (!list) return null
          const s = list.DriverStandings?.[0]
          if (!s) return null
          const constructor = (s.Constructors as Array<Record<string, string>>)?.[0]
          return {
            season: parseInt(year),
            position: parseInt(s.position ?? '0'),
            points: parseFloat(s.points ?? '0'),
            wins: parseInt(s.wins ?? '0'),
            constructorId: constructor?.constructorId ?? 'unknown',
            constructorName: constructor?.name ?? 'Unknown',
          } as DriverCareerSeason
        }),
      )
      for (const r of settled) {
        if (r.status === 'fulfilled' && r.value) history.push(r.value)
      }
    }

    return history.filter(r => r.season > 0 && r.position > 0).sort((a, b) => a.season - b.season)
  } catch {
    return []
  }
}

/* ─── Generic driver bundle builder ─────────────────────────────────────────── */

const REEL_PATHS = [
  'M 30 160 L 80 160 Q 100 145, 115 110 L 160 110 Q 180 125, 195 160 L 235 160 Q 255 175, 270 205 L 310 205 Q 330 185, 350 155 L 380 155',
  'M 30 120 L 90 120 Q 112 108, 130 70 L 180 70 Q 210 88, 230 120 L 290 120 Q 310 104, 325 72 L 370 72',
  'M 30 140 L 60 140 Q 75 130, 85 90 L 120 90 Q 140 105, 155 140 L 195 140 Q 215 155, 230 195 L 260 198 Q 275 180, 290 140 L 330 140 Q 345 120, 360 80 L 380 80',
  'M 30 120 Q 60 110, 85 85 L 145 85 Q 175 98, 195 120 L 255 120 Q 285 105, 310 80 L 370 80',
  'M 30 150 L 80 150 Q 110 138, 130 100 L 175 100 Q 195 115, 210 150 L 260 150 Q 290 170, 315 200 L 370 200',
]

function groupCareerByTeam(history: DriverCareerSeason[]) {
  if (!history.length) return []
  const sorted = [...history].sort((a, b) => a.season - b.season)
  const groups: Array<{ constructorId: string; constructorName: string; startYear: number; endYear: number; seasons: DriverCareerSeason[] }> = []
  let cur = { constructorId: sorted[0].constructorId, constructorName: sorted[0].constructorName, startYear: sorted[0].season, endYear: sorted[0].season, seasons: [sorted[0]] }
  for (let i = 1; i < sorted.length; i++) {
    const s = sorted[i]
    if (s.constructorId === cur.constructorId) { cur.seasons.push(s); cur.endYear = s.season }
    else { groups.push(cur); cur = { constructorId: s.constructorId, constructorName: s.constructorName, startYear: s.season, endYear: s.season, seasons: [s] } }
  }
  groups.push(cur)
  return groups
}

function buildErasFromHistory(driverId: string, careerHistory: DriverCareerSeason[]): DriverEra[] {
  return groupCareerByTeam(careerHistory).map(g => {
    const titles = g.seasons.filter(s => s.position === 1).length
    const wins = g.seasons.reduce((sum, s) => sum + s.wins, 0)
    const bestPos = Math.min(...g.seasons.map(s => s.position || 99))
    const statLabel = titles > 0 ? `${titles}× WDC` : wins > 0 ? `${wins}W` : bestPos <= 3 ? `P${bestPos}` : undefined
    const color = TEAM_COLORS[g.constructorId] ?? '#888'
    return {
      driverId, teamId: g.constructorId, teamName: g.constructorName,
      seasons: g.startYear === g.endYear ? `${g.startYear}` : `${g.startYear}–${g.endYear}`,
      highlights: [], titles, wins, teamLiveryHex: color,
      teamAccentHex: titles > 0 ? '#FFD700' : undefined, statLabel,
    } as DriverEra
  })
}

function buildSignatureFromStats(driverId: string, stats: GenericDriverStats): DrivingSignature {
  const w = stats.races > 0 ? stats.wins / stats.races : 0
  const p = stats.races > 0 ? stats.poles / stats.races : 0
  const pod = stats.races > 0 ? stats.podiums / stats.races : 0
  const c = stats.championships
  return {
    driverId, series: 'f1',
    axes: [
      { label: 'Steering Smoothness',   value: Math.min(95, Math.round(73 + c * 2.5 + p * 10)) },
      { label: 'Entry Aggression',      value: Math.min(97, Math.round(65 + w * 80 + pod * 10)) },
      { label: 'Tyre Management',       value: Math.min(93, Math.round(72 + pod * 18 + c * 2)) },
      { label: 'Throttle Application',  value: Math.min(95, Math.round(70 + w * 50 + p * 10)) },
      { label: 'Braking',               value: Math.min(97, Math.round(68 + p * 90 + c * 2)) },
      { label: 'Consistency',           value: Math.min(96, Math.round(68 + pod * 28 + c * 3)) },
    ],
    cohortAverage: [74, 72, 74, 73, 75, 74],
    confidenceScore: 0.55,
    sampleSize: stats.races * 45,
  }
}

function buildReelSlidesFromHistory(
  initials: string, stats: GenericDriverStats,
  careerHistory: DriverCareerSeason[], teamColor: string,
): ReelSlide[] {
  const sorted = [...careerHistory].sort((a, b) => a.season - b.season)
  const y2 = (y: number) => String(y).slice(2)
  const slides: ReelSlide[] = []
  const used = new Set<number>()

  for (const s of sorted.filter(s => s.position === 1)) {
    if (slides.length >= 5) break
    used.add(s.season)
    slides.push({ slotLabel: `${initials} · ${y2(s.season)}`, badge: 'WORLD CHAMPION', glowColor: TEAM_COLORS[s.constructorId] ?? teamColor, kicker: `${s.season} · ${s.constructorName.toUpperCase()} · WDC`, headline: s.constructorName.toUpperCase(), meta: `${s.wins}W · ${s.points}PTS · P1`, svgPath: REEL_PATHS[slides.length % REEL_PATHS.length] })
  }
  for (const s of [...sorted].sort((a, b) => b.wins - a.wins)) {
    if (slides.length >= 5) break
    if (used.has(s.season) || s.wins === 0) continue
    used.add(s.season)
    slides.push({ slotLabel: `${initials} · ${y2(s.season)}`, badge: `${s.wins} WIN${s.wins > 1 ? 'S' : ''}`, glowColor: TEAM_COLORS[s.constructorId] ?? teamColor, kicker: `${s.season} · ${s.constructorName.toUpperCase()}`, headline: s.constructorName.toUpperCase(), meta: `${s.wins}W · ${s.points}PTS · P${s.position}`, svgPath: REEL_PATHS[slides.length % REEL_PATHS.length] })
  }
  for (const s of [...sorted].reverse()) {
    if (slides.length >= 5) break
    if (used.has(s.season)) continue
    used.add(s.season)
    slides.push({ slotLabel: `${initials} · ${y2(s.season)}`, badge: `P${s.position} ${s.season}`, glowColor: TEAM_COLORS[s.constructorId] ?? teamColor, kicker: `${s.season} · ${s.constructorName.toUpperCase()}`, headline: s.constructorName.toUpperCase(), meta: `P${s.position} · ${s.points}PTS${s.wins > 0 ? ` · ${s.wins}W` : ''}`, svgPath: REEL_PATHS[slides.length % REEL_PATHS.length] })
  }

  if (!slides.length) {
    slides.push({ slotLabel: `${initials}`, badge: 'F1', glowColor: teamColor, kicker: 'FORMULA 1', headline: 'CAREER', meta: `${stats.races}R · ${stats.wins}W · ${stats.poles}P`, svgPath: REEL_PATHS[0] })
  }
  return slides.slice(0, 5)
}

function buildScoutingReportFromStats(
  firstName: string, lastName: string,
  stats: GenericDriverStats, careerHistory: DriverCareerSeason[],
  currentStanding: { constructorName: string } | null,
): ScoutingReport {
  const winPct  = stats.races > 0 ? ((stats.wins   / stats.races) * 100).toFixed(1) : '0'
  const polePct = stats.races > 0 ? ((stats.poles  / stats.races) * 100).toFixed(1) : '0'
  const podPct  = stats.races > 0 ? ((stats.podiums / stats.races) * 100).toFixed(1) : '0'
  const champYears = careerHistory.filter(s => s.position === 1).map(s => s.season).sort((a, b) => a - b)
  const sorted = [...careerHistory].sort((a, b) => a.season - b.season)
  const firstYear = sorted[0]?.season ?? ''
  const isActive = !!currentStanding
  const champLine = champYears.length > 0 ? ` World champion in ${champYears.join(', ')}.` : ''
  const statusLine = isActive ? ` Currently racing for ${currentStanding.constructorName}.` : ' Now retired from Formula 1.'

  const p1 = `${firstName} ${lastName} has competed in Formula 1 across ${stats.seasons} season${stats.seasons !== 1 ? 's' : ''}, accumulating ${stats.wins} win${stats.wins !== 1 ? 's' : ''}, ${stats.poles} pole position${stats.poles !== 1 ? 's' : ''} and ${stats.podiums} podium${stats.podiums !== 1 ? 's' : ''} from ${stats.races} starts since ${firstYear}.${champLine}${statusLine}`
  const p2 = `A win rate of ${winPct}% and podium conversion of ${podPct}% characterise ${lastName}'s approach — ${parseFloat(polePct) > 15 ? 'elite single-lap pace and strong qualifying ability' : 'consistent race-day execution'} ${parseFloat(winPct) > 15 ? 'combined with championship-level ruthlessness at the front' : 'across a sustained career at the top level'}.`

  return {
    paragraphs: [p1, p2],
    highlights: [lastName, champYears.length > 0 ? 'World champion' : ''].filter(Boolean),
    setupBars: [
      { leftLabel: 'MECHANICAL GRIP', rightLabel: 'AERO BALANCE',   position: 52, annotation: 'Balanced preference',       highlight: false },
      { leftLabel: 'LOW DOWNFORCE',   rightLabel: 'HIGH DOWNFORCE',  position: 58, annotation: 'Corner-speed oriented',     highlight: false },
      { leftLabel: 'EARLY THROTTLE', rightLabel: 'LATE THROTTLE',   position: 55, annotation: 'Mid-corner commitment',     highlight: false },
    ],
    excelledAt: [
      stats.wins > 30 ? 'Race management and tyre conservation' : 'Racecraft and wheel-to-wheel battles',
      parseFloat(polePct) > 20 ? 'Single-lap pace · Qualifying supremacy' : 'Race consistency and points accumulation',
      champYears.length > 0 ? 'Pressure management · Championship mentality' : 'Development driving and car feedback',
    ],
    struggledWith: [
      stats.seasons < 4 ? 'Career still developing — full picture emerging' : 'Requires telemetry access for deeper analysis',
    ],
  }
}

function buildDriverBundle(
  jolpicaId: string,
  info: JolpicaDriverInfo,
  stats: GenericDriverStats,
  currentStanding: { position: number; points: string; wins: string; season: string; constructorId: string; constructorName: string } | null,
  careerHistory: DriverCareerSeason[],
  teamColor: string,
): { driver: Driver; stats: DriverStats; eras: DriverEra[]; signature: DrivingSignature; reelSlides: ReelSlide[]; scoutingReport: ScoutingReport } {
  const firstName = info.givenName
  const lastName  = info.familyName
  const initials  = `${firstName[0]}${lastName[0]}`
  const isActive  = !!currentStanding
  const sorted    = [...careerHistory].sort((a, b) => a.season - b.season)
  const firstYear = sorted[0]?.season ?? 2000
  const lastYear  = sorted[sorted.length - 1]?.season ?? new Date().getFullYear()
  const careerSpan = isActive ? `${firstYear}–present` : `${firstYear}–${lastYear}`

  const teamWins: Record<string, number> = {}
  for (const s of careerHistory) teamWins[s.constructorId] = (teamWins[s.constructorId] ?? 0) + s.wins
  const peakTeamId = Object.entries(teamWins).sort(([, a], [, b]) => b - a)[0]?.[0] ?? (currentStanding?.constructorId ?? 'unknown')
  const entityColor = currentStanding?.constructorId ?? peakTeamId

  const driver: Driver = {
    id: jolpicaId, name: `${firstName} ${lastName}`, shortName: lastName, initials,
    nationality: info.nationality, dob: info.dateOfBirth ?? '1990-01-01',
    status: isActive ? 'active' : 'retired', series: ['f1'], peakEraTeamId: peakTeamId,
    entityColor,
    bio: `${firstName} ${lastName} — Formula 1 driver.${stats.championships > 0 ? ` ${stats.championships}× World Champion.` : ''} ${stats.wins} wins, ${stats.poles} poles, ${stats.podiums} podiums.`,
  }
  const driverStats: DriverStats = {
    driverId: jolpicaId, series: 'f1', titles: stats.championships, wins: stats.wins,
    poles: stats.poles, podiums: stats.podiums, careerSpan, racesEntered: stats.races,
  }

  return {
    driver, stats: driverStats,
    eras:          buildErasFromHistory(jolpicaId, careerHistory),
    signature:     buildSignatureFromStats(jolpicaId, stats),
    reelSlides:    buildReelSlidesFromHistory(initials, stats, careerHistory, teamColor),
    scoutingReport: buildScoutingReportFromStats(firstName, lastName, stats, careerHistory, currentStanding),
  }
}

/* ─── Route ───────────────────────────────────────────────────────────────── */

export default async function DriverRoute({
  params,
}: {
  params: Promise<{ series: string; slug: string }>
}) {
  const { series: seriesParam, slug } = await params

  const series = SERIES_MAP[seriesParam]
  if (!series) notFound()

  const lcSlug = slug.toLowerCase()

  // Blueprint pages (Vettel, Bearman)
  const bundle = DRIVER_REGISTRY[series]?.[lcSlug]
  if (bundle) {
    return <DriverPage {...bundle} series={series} />
  }

  // Generic F1 driver pages
  if (series === 'f1') {
    const jolpicaId = DRIVER_SLUG_TO_JOLPICA[lcSlug] ?? lcSlug.replace(/-/g, '_')

    const [info, liveStats, currentStanding, careerHistory] = await Promise.all([
      fetchDriverInfo(jolpicaId),
      fetchDriverAllTimeStats(jolpicaId),
      fetchDriverCurrentStanding(jolpicaId),
      fetchDriverCareerHistory(jolpicaId),
    ])

    if (!info) notFound()

    const teamColor = currentStanding
      ? (TEAM_COLORS[currentStanding.constructorId] ?? '#888')
      : careerHistory.length
        ? (TEAM_COLORS[careerHistory.reduce((a, b) => (a.season > b.season ? a : b)).constructorId] ?? '#888')
        : '#888'

    const championsFromHistory = careerHistory.filter(s => s.position === 1).length
    const effectiveStats: GenericDriverStats = {
      ...(liveStats ?? { races: 0, wins: 0, poles: 0, podiums: 0, championships: 0, seasons: 0 }),
      championships: championsFromHistory,
    }
    const bundle = buildDriverBundle(jolpicaId, info, effectiveStats, currentStanding, careerHistory, teamColor)

    return <DriverPage {...bundle} series={series} />
  }

  notFound()
}
