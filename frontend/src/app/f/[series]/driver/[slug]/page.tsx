import { notFound } from 'next/navigation'
import DriverPage from '@/components/driver/DriverPage'
import GenericDriverPage, {
  type GenericDriverStats,
  type DriverCareerSeason,
} from '@/components/driver/GenericDriverPage'
import {
  vettel, vettelStats, vettelEras, vettelSignature,
  vettelReelSlides, vettelScoutingReport,
  bearman, bearmanStats, bearmanEras, bearmanSignature,
  bearmanReelSlides, bearmanScoutingReport, bearmanTrajectory,
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
        { label: 'F2 POS', value: 'P4', sub: '2024', accent: true },
        { label: 'F2 WINS', value: '3' },
        { label: 'F1 STARTS', value: '3', sub: 'SUB · 2024' },
        { label: 'F1 POINTS', value: '6', sub: 'JEDDAH P7' },
        { label: '2025', value: 'HAAS', sub: 'FULL-TIME F1' },
      ],
    },
  },
}

/* ─── Slug → Jolpica driver ID ───────────────────────────────────────────── */

const DRIVER_SLUG_TO_JOLPICA: Record<string, string> = {
  // Current grid
  norris: 'norris',
  piastri: 'piastri',
  verstappen: 'verstappen',
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
  const res = await fetch(url, { next: { revalidate: 86400 } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const d = await res.json()
  return parseInt(d?.MRData?.total ?? '0', 10)
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
    const [races, wins, p2, p3, poles, championships, seasons] = await Promise.all([
      jolpicaTotal(`${base}/results.json?limit=1`),
      jolpicaTotal(`${base}/results/1.json?limit=1`),
      jolpicaTotal(`${base}/results/2.json?limit=1`),
      jolpicaTotal(`${base}/results/3.json?limit=1`),
      jolpicaTotal(`${base}/qualifying/1.json?limit=1`),
      jolpicaTotal(`${base}/driverstandings/1.json?limit=1`),
      jolpicaTotal(`${base}/seasons.json?limit=1`),
    ])
    return { races, wins, poles, podiums: wins + p2 + p3, championships, seasons }
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
    const res = await fetch(
      `https://api.jolpi.ca/ergast/f1/drivers/${jolpicaId}/driverstandings.json?limit=100`,
      { next: { revalidate: 86400 } },
    )
    if (!res.ok) return []
    const data = await res.json()
    const lists: Array<Record<string, unknown>> = data?.MRData?.StandingsTable?.StandingsLists ?? []
    return lists
      .map(l => {
        const s = (l.DriverStandings as Array<Record<string, unknown>>)?.[0]
        const constructor = (s?.Constructors as Array<Record<string, string>>)?.[0]
        return {
          season: parseInt(l.season as string),
          position: parseInt((s?.position as string) ?? '0'),
          points: parseFloat((s?.points as string) ?? '0'),
          wins: parseInt((s?.wins as string) ?? '0'),
          constructorId: constructor?.constructorId ?? 'unknown',
          constructorName: constructor?.name ?? 'Unknown',
        }
      })
      .filter(r => r.season > 0)
  } catch {
    return []
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

    return (
      <GenericDriverPage
        jolpicaId={jolpicaId}
        givenName={info.givenName}
        familyName={info.familyName}
        nationality={info.nationality}
        permanentNumber={info.permanentNumber}
        dateOfBirth={info.dateOfBirth}
        currentTeamName={currentStanding?.constructorName}
        currentTeamColor={teamColor}
        liveStats={liveStats}
        currentStanding={
          currentStanding
            ? {
                position: currentStanding.position,
                points: currentStanding.points,
                wins: currentStanding.wins,
                season: currentStanding.season,
              }
            : undefined
        }
        careerHistory={careerHistory}
      />
    )
  }

  notFound()
}
