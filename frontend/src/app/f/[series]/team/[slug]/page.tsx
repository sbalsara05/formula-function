import { notFound } from 'next/navigation'
import TeamPage, { type ConstructorStandingEntry, type StandingsMeta } from '@/components/team/TeamPage'
import PremaPage from '@/components/team/PremaPage'
import {
  ferrari, ferrariStats, ferrariEras, ferrariSignatureBars,
  ferrariReelSlides, ferrariAcademy, ferrariIconicCars,
  prema, premaStats, premaReelSlides, premaSignatureBars,
  premaGraduates, premaCurrentSeason,
} from '@/data/mock/teams'
import type {
  Series, Team, TeamStats, TeamEngineeringEra, TeamSignatureBar,
  TeamAcademyDriver, TeamIconicCar, ReelSlide,
} from '@/lib/types'

const SERIES_MAP: Record<string, Series> = {
  '1': 'f1',
  '2': 'f2',
  '3': 'f3',
}

interface TeamBundle {
  team: Team
  stats: TeamStats
  eras: TeamEngineeringEra[]
  signatureBars: TeamSignatureBar[]
  reelSlides: ReelSlide[]
  academy: TeamAcademyDriver[]
  iconicCars: TeamIconicCar[]
}

const TEAM_REGISTRY: Partial<Record<Series, Record<string, TeamBundle>>> = {
  f1: {
    ferrari: {
      team: ferrari,
      stats: ferrariStats,
      eras: ferrariEras,
      signatureBars: ferrariSignatureBars,
      reelSlides: ferrariReelSlides,
      academy: ferrariAcademy,
      iconicCars: ferrariIconicCars,
    },
  },
}

const SLUG_TO_JOLPICA: Record<string, string> = {
  ferrari: 'ferrari',
  mclaren: 'mclaren',
  mercedes: 'mercedes',
  'red-bull': 'red_bull',
  williams: 'williams',
  'aston-martin': 'aston_martin',
  alpine: 'alpine',
  haas: 'haas',
  sauber: 'sauber',
  rb: 'rb',
}

/* ─── Jolpica fetchers ────────────────────────────────────────────────────── */

async function jolpicaTotal(url: string): Promise<number> {
  const res = await fetch(url, { next: { revalidate: 86400 } }) // 24h — all-time stats change rarely
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const d = await res.json()
  return parseInt(d?.MRData?.total ?? '0', 10)
}

export interface LiveTeamStats {
  wins: number
  podiums: number
  wccTitles: number
  seasons: number
}

async function fetchTeamAllTimeStats(jolpicaId: string): Promise<LiveTeamStats | null> {
  const base = `https://api.jolpi.ca/ergast/f1/constructors/${jolpicaId}`
  try {
    const [wins, p2, p3, wcc, seasons] = await Promise.all([
      jolpicaTotal(`${base}/results/1.json?limit=1`),
      jolpicaTotal(`${base}/results/2.json?limit=1`),
      jolpicaTotal(`${base}/results/3.json?limit=1`),
      jolpicaTotal(`${base}/constructorstandings/1.json?limit=1`),
      jolpicaTotal(`${base}/seasons.json?limit=1`),
    ])
    return { wins, podiums: wins + p2 + p3, wccTitles: wcc, seasons }
  } catch {
    return null
  }
}

async function fetchCurrentStandings(): Promise<{
  standings: ConstructorStandingEntry[]
  meta: StandingsMeta
}> {
  try {
    const res = await fetch(
      'https://api.jolpi.ca/ergast/f1/current/constructorstandings.json',
      { next: { revalidate: 300 } }, // 5 min — live race data
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]
    if (!list) throw new Error('No standings data')
    return {
      standings: list.ConstructorStandings ?? [],
      meta: { season: list.season, round: list.round },
    }
  } catch {
    return { standings: [], meta: { season: '', round: '' } }
  }
}

/* ─── Route ───────────────────────────────────────────────────────────────── */

export default async function TeamRoute({
  params,
}: {
  params: Promise<{ series: string; slug: string }>
}) {
  const { series: seriesParam, slug } = await params

  const series = SERIES_MAP[seriesParam]
  if (!series) notFound()

  if (slug.toLowerCase() === 'prema' && (series === 'f2' || series === 'f3')) {
    return (
      <PremaPage
        team={prema}
        stats={premaStats}
        reelSlides={premaReelSlides}
        signatureBars={premaSignatureBars}
        graduates={premaGraduates}
        currentSeason={premaCurrentSeason}
        series={series}
      />
    )
  }

  const bundle = TEAM_REGISTRY[series]?.[slug.toLowerCase()]
  if (!bundle) notFound()

  const jolpicaId = SLUG_TO_JOLPICA[slug.toLowerCase()] ?? slug.toLowerCase()

  // Run both fetches in parallel — all-time stats (24h cache) + live standings (5m cache)
  const [liveStats, { standings, meta }] = await Promise.all([
    series === 'f1' ? fetchTeamAllTimeStats(jolpicaId) : Promise.resolve(null),
    series === 'f1' ? fetchCurrentStandings() : Promise.resolve({ standings: [], meta: { season: '', round: '' } }),
  ])

  return (
    <TeamPage
      {...bundle}
      series={series}
      liveStats={liveStats ?? undefined}
      currentStandings={standings}
      standingsMeta={meta}
      jolpicaId={jolpicaId}
    />
  )
}
