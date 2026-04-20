import { notFound } from 'next/navigation'
import TeamPage, { type ConstructorStandingEntry, type StandingsMeta, type LiveTeamStats } from '@/components/team/TeamPage'
import PremaPage from '@/components/team/PremaPage'
import {
  ferrari, ferrariStats, ferrariEras, ferrariSignatureBars,
  ferrariReelSlides, ferrariAcademy, ferrariIconicCars,
  prema, premaStats, premaReelSlides, premaSignatureBars,
  premaGraduates, premaCurrentSeason,
} from '@/data/mock/teams'
import type {
  Series, Team, TeamStats, TeamEngineeringEra, TeamSignatureBar,
  TeamAcademyDriver, TeamIconicCar, ReelSlide, TeamLivery,
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

/* ─── Slug → Jolpica constructor ID ──────────────────────────────────────── */

const SLUG_TO_JOLPICA: Record<string, string> = {
  ferrari: 'ferrari', mclaren: 'mclaren', mercedes: 'mercedes',
  'red-bull': 'red_bull', williams: 'williams', 'aston-martin': 'aston_martin',
  alpine: 'alpine', haas: 'haas', sauber: 'sauber', rb: 'rb',
  'kick-sauber': 'sauber', 'racing-bulls': 'rb',
  lotus: 'lotus', tyrrell: 'tyrrell', brabham: 'brabham', benetton: 'benetton',
  renault: 'renault', brawn: 'brawn', jordan: 'jordan',
  'force-india': 'force_india', 'racing-point': 'racing_point',
  'alfa-romeo': 'alfa_romeo', 'toro-rosso': 'toro_rosso', minardi: 'minardi',
  bar: 'bar', jaguar: 'jaguar', honda: 'honda', toyota: 'toyota',
  cooper: 'cooper', matra: 'matra', march: 'march', wolf: 'wolf',
  ligier: 'ligier', arrows: 'arrows', maserati: 'maserati', vanwall: 'vanwall',
  brm: 'brm', lancia: 'lancia', stewart: 'stewart', prost: 'prost',
  'super-aguri': 'super_aguri', hrt: 'hrt', caterham: 'caterham', marussia: 'marussia',
}

/* ─── Static meta: display name, short name, color, nationality ───────────── */

const TEAM_META: Record<string, { name: string; short: string; color: string; nat: string }> = {
  ferrari:       { name: 'Scuderia Ferrari',          short: 'Ferrari',       color: '#DC0000', nat: 'Italian' },
  mclaren:       { name: 'McLaren',                   short: 'McLaren',       color: '#FF8000', nat: 'British' },
  mercedes:      { name: 'Mercedes-AMG Petronas',     short: 'Mercedes',      color: '#00D2BE', nat: 'German' },
  red_bull:      { name: 'Red Bull Racing',           short: 'Red Bull',      color: '#1E3A8A', nat: 'Austrian' },
  williams:      { name: 'Williams Racing',           short: 'Williams',      color: '#005AFF', nat: 'British' },
  aston_martin:  { name: 'Aston Martin',              short: 'Aston Martin',  color: '#006F62', nat: 'British' },
  alpine:        { name: 'Alpine F1 Team',            short: 'Alpine',        color: '#0090FF', nat: 'French' },
  haas:          { name: 'Haas F1 Team',              short: 'Haas',          color: '#B6BABD', nat: 'American' },
  sauber:        { name: 'Kick Sauber',               short: 'Sauber',        color: '#52E252', nat: 'Swiss' },
  rb:            { name: 'Racing Bulls',              short: 'Racing Bulls',  color: '#6692FF', nat: 'Italian' },
  lotus:         { name: 'Team Lotus',                short: 'Lotus',         color: '#FFD700', nat: 'British' },
  tyrrell:       { name: 'Tyrrell Racing',            short: 'Tyrrell',       color: '#1565C0', nat: 'British' },
  brabham:       { name: 'Brabham',                   short: 'Brabham',       color: '#4A90D9', nat: 'British' },
  benetton:      { name: 'Benetton Formula',          short: 'Benetton',      color: '#009944', nat: 'British' },
  renault:       { name: 'Renault F1 Team',           short: 'Renault',       color: '#FFD700', nat: 'French' },
  brawn:         { name: 'Brawn GP',                  short: 'Brawn',         color: '#BFFF00', nat: 'British' },
  jordan:        { name: 'Jordan Grand Prix',         short: 'Jordan',        color: '#FFD700', nat: 'Irish' },
  force_india:   { name: 'Force India',               short: 'Force India',   color: '#FF80C7', nat: 'Indian' },
  racing_point:  { name: 'Racing Point',              short: 'Racing Point',  color: '#FF80C7', nat: 'British' },
  alfa_romeo:    { name: 'Alfa Romeo Racing',         short: 'Alfa Romeo',    color: '#900000', nat: 'Swiss' },
  toro_rosso:    { name: 'Scuderia Toro Rosso',       short: 'Toro Rosso',    color: '#C00000', nat: 'Italian' },
  minardi:       { name: 'Minardi',                   short: 'Minardi',       color: '#333333', nat: 'Italian' },
  bar:           { name: 'BAR',                       short: 'BAR',           color: '#800080', nat: 'British' },
  jaguar:        { name: 'Jaguar Racing',             short: 'Jaguar',        color: '#006600', nat: 'British' },
  honda:         { name: 'Honda Racing F1',           short: 'Honda',         color: '#999999', nat: 'Japanese' },
  toyota:        { name: 'Toyota F1',                 short: 'Toyota',        color: '#CC0000', nat: 'Japanese' },
  cooper:        { name: 'Cooper',                    short: 'Cooper',        color: '#2E7D32', nat: 'British' },
  matra:         { name: 'Matra',                     short: 'Matra',         color: '#1565C0', nat: 'French' },
  brm:           { name: 'BRM',                       short: 'BRM',           color: '#1B5E20', nat: 'British' },
  maserati:      { name: 'Maserati',                  short: 'Maserati',      color: '#1A3A5C', nat: 'Italian' },
  vanwall:       { name: 'Vanwall',                   short: 'Vanwall',       color: '#006400', nat: 'British' },
  march:         { name: 'March',                     short: 'March',         color: '#CC0000', nat: 'British' },
  wolf:          { name: 'Wolf',                      short: 'Wolf',          color: '#8B0000', nat: 'Canadian' },
  ligier:        { name: 'Ligier',                    short: 'Ligier',        color: '#003399', nat: 'French' },
  arrows:        { name: 'Arrows',                    short: 'Arrows',        color: '#FF6600', nat: 'British' },
  stewart:       { name: 'Stewart Grand Prix',        short: 'Stewart',       color: '#FFFFFF', nat: 'British' },
  prost:         { name: 'Prost Grand Prix',          short: 'Prost',         color: '#003399', nat: 'French' },
}

/* ─── Jolpica helpers ─────────────────────────────────────────────────────── */

async function jolpicaTotal(url: string): Promise<number> {
  const res = await fetch(url, { next: { revalidate: 86400 } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const d = await res.json()
  return parseInt(d?.MRData?.total ?? '0', 10)
}

interface FullTeamStats {
  races: number
  wins: number
  podiums: number
  poles: number
  driverTitles: number
  wccTitles: number
  seasons: number
}

interface TeamSeasonResult {
  season: number
  position: number
  points: number
  wins: number
}

interface GenericTeamDriver {
  driverId: string
  givenName: string
  familyName: string
  nationality: string
  permanentNumber?: string
}

async function fetchFullTeamStats(jolpicaId: string): Promise<FullTeamStats | null> {
  const base = `https://api.jolpi.ca/ergast/f1/constructors/${jolpicaId}`
  try {
    const [races, wins, p2, p3, poles, driverTitles, wcc, seasons] = await Promise.all([
      jolpicaTotal(`${base}/results.json?limit=1`),
      jolpicaTotal(`${base}/results/1.json?limit=1`),
      jolpicaTotal(`${base}/results/2.json?limit=1`),
      jolpicaTotal(`${base}/results/3.json?limit=1`),
      jolpicaTotal(`${base}/qualifying/1.json?limit=1`),
      jolpicaTotal(`${base}/driverstandings/1.json?limit=1`),
      jolpicaTotal(`${base}/constructorstandings/1.json?limit=1`),
      jolpicaTotal(`${base}/seasons.json?limit=1`),
    ])
    return { races, wins, podiums: wins + p2 + p3, poles, driverTitles, wccTitles: wcc, seasons }
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
      { next: { revalidate: 300 } },
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]
    if (!list) throw new Error('No standings')
    return { standings: list.ConstructorStandings ?? [], meta: { season: list.season, round: list.round } }
  } catch {
    return { standings: [], meta: { season: '', round: '' } }
  }
}

async function fetchCurrentDrivers(jolpicaId: string): Promise<GenericTeamDriver[]> {
  try {
    const res = await fetch(
      `https://api.jolpi.ca/ergast/f1/current/constructors/${jolpicaId}/drivers.json`,
      { next: { revalidate: 300 } },
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data?.MRData?.DriverTable?.Drivers ?? []).map((d: Record<string, string>) => ({
      driverId: d.driverId, givenName: d.givenName, familyName: d.familyName,
      nationality: d.nationality, permanentNumber: d.permanentNumber,
    }))
  } catch { return [] }
}

async function fetchTeamSeasonHistory(jolpicaId: string): Promise<TeamSeasonResult[]> {
  try {
    const res = await fetch(
      `https://api.jolpi.ca/ergast/f1/constructors/${jolpicaId}/constructorstandings.json?limit=100`,
      { next: { revalidate: 86400 } },
    )
    if (!res.ok) return []
    const data = await res.json()
    const lists: Array<Record<string, unknown>> = data?.MRData?.StandingsTable?.StandingsLists ?? []
    return lists.map(l => {
      const s = (l.ConstructorStandings as Array<Record<string, string>>)?.[0]
      return {
        season: parseInt(l.season as string),
        position: parseInt(s?.position ?? '0'),
        points: parseFloat(s?.points ?? '0'),
        wins: parseInt(s?.wins ?? '0'),
      }
    }).filter(r => r.season > 0 && r.position > 0)
  } catch { return [] }
}

/* ─── Data builders ───────────────────────────────────────────────────────── */

const REEL_PATHS = [
  'M 20 150 C 80 80, 130 220, 200 140 S 310 60, 380 100',
  'M 20 180 C 60 90, 140 230, 220 130 S 330 80, 380 150',
  'M 20 200 C 100 60, 160 240, 240 120 S 340 100, 380 80',
  'M 30 160 C 90 70, 150 200, 210 140 T 380 120',
  'M 20 130 C 70 200, 150 80, 230 170 S 320 110, 380 140',
]

function buildReelSlides(
  history: TeamSeasonResult[],
  shortName: string,
  color: string,
): ReelSlide[] {
  const sorted = [...history].sort((a, b) => b.season - a.season)
  const abbr = shortName.slice(0, 3).toUpperCase()
  const champSeasons = [...history].filter(s => s.position === 1)
    .sort((a, b) => b.wins - a.wins).slice(0, 3)
  const recent = sorted.filter(s => !champSeasons.some(c => c.season === s.season)).slice(0, 3)

  const slides: ReelSlide[] = []

  champSeasons.forEach((s, i) => slides.push({
    slotLabel: `${abbr} · ${s.season}`,
    badge: 'WCC',
    glowColor: color,
    kicker: `${s.season} WORLD CONSTRUCTORS' CHAMPION`,
    headline: `${s.wins} WINS`,
    meta: `${s.points} PTS · P1 FINAL STANDINGS`,
    svgPath: REEL_PATHS[i % REEL_PATHS.length],
  }))

  recent.forEach((s, i) => slides.push({
    slotLabel: `${abbr} · ${s.season}`,
    badge: s.season.toString(),
    glowColor: color,
    kicker: `${s.season} SEASON · P${s.position} FINAL`,
    headline: `${s.wins > 0 ? `${s.wins} WINS` : 'SEASON RECAP'}`,
    meta: `${s.points} PTS`,
    svgPath: REEL_PATHS[(champSeasons.length + i) % REEL_PATHS.length],
  }))

  if (!slides.length) slides.push({
    slotLabel: abbr,
    badge: 'F1',
    glowColor: color,
    kicker: 'FORMULA 1',
    headline: shortName.toUpperCase(),
    meta: 'CHAMPIONSHIP ARCHIVE',
    svgPath: REEL_PATHS[0],
  })

  return slides.slice(0, 5)
}

function buildEras(history: TeamSeasonResult[], jolpicaId: string): TeamEngineeringEra[] {
  if (!history.length) return []
  const sorted = [...history].sort((a, b) => a.season - b.season)
  const total = sorted.length
  const count = Math.min(4, Math.max(1, Math.ceil(total / 12)))
  const lastSeason = sorted[sorted.length - 1].season
  const isActive = lastSeason >= 2024

  if (count === 1) {
    const champs = sorted.filter(s => s.position === 1).length
    return [{
      teamId: jolpicaId,
      label: `${sorted[0].season}s Era`,
      seasons: `${sorted[0].season}–${isActive ? 'PRESENT' : lastSeason}`,
      description: 'Full team history',
      championships: champs,
      champLabel: champs > 0 ? `${champs}× WCC` : 'NO TITLES',
      current: isActive,
    }]
  }

  const chunkSize = Math.floor(total / count)
  return Array.from({ length: count }, (_, i) => {
    const isLast = i === count - 1
    const chunk = sorted.slice(i * chunkSize, isLast ? total : (i + 1) * chunkSize)
    const champs = chunk.filter(s => s.position === 1).length
    const first = chunk[0].season
    const last = chunk[chunk.length - 1].season
    return {
      teamId: jolpicaId,
      label: `${first}s Era`,
      seasons: `${first}–${isLast && isActive ? 'PRESENT' : last}`,
      description: `${chunk.length} seasons`,
      championships: champs,
      champLabel: champs > 0 ? `${champs}× WCC` : 'NO TITLES',
      golden: champs >= 3,
      current: isLast && isActive,
    }
  })
}

function buildSignatureBars(stats: FullTeamStats): TeamSignatureBar[] {
  const safe = (n: number) => (!isFinite(n) || isNaN(n) ? 0 : n)
  const races = Math.max(stats.races, 1)
  const winPct    = safe((stats.wins    / races) * 100)
  const podPct    = safe((stats.podiums / races) * 100)
  const polePct   = safe((stats.poles   / races) * 100)
  const champRate = safe((stats.wccTitles / Math.max(stats.seasons, 1)) * 100)

  const rate = (pct: number, th: number[]): TeamSignatureBar['rating'] => {
    if (pct >= th[0]) return 'EXCEPTIONAL'
    if (pct >= th[1]) return 'STRONG'
    if (pct >= th[2]) return 'HIGH'
    if (pct >= th[3]) return 'MODERATE'
    return 'LOW'
  }

  return [
    { label: 'Race Win Rate',        rating: rate(winPct,    [25, 15,  8, 3]),  value: Math.min(winPct  * 3.5, 100), caption: `${stats.wins} wins from ${races} entries`,            sentiment: 'strength' },
    { label: 'Podium Conversion',    rating: rate(podPct,    [50, 35, 20, 10]), value: Math.min(podPct  * 1.5, 100), caption: `${stats.podiums} podium finishes recorded`,           sentiment: 'strength' },
    { label: 'Pole Position Rate',   rating: rate(polePct,   [20, 12,  6,  2]), value: Math.min(polePct * 4,   100), caption: `${stats.poles} poles from the front row`,            sentiment: 'neutral'  },
    { label: 'Championship Success', rating: rate(champRate, [30, 15,  8,  2]), value: Math.min(champRate * 5, 100), caption: `${stats.wccTitles} WCC in ${stats.seasons} seasons`, sentiment: 'strength' },
  ]
}

function buildAcademy(drivers: GenericTeamDriver[], year: string): TeamAcademyDriver[] {
  return drivers.map(d => ({
    name: `${d.givenName} ${d.familyName}`,
    tier: 'f1' as const,
    note: d.permanentNumber ? `#${d.permanentNumber}` : d.nationality,
  }))
}

function buildIconicCars(history: TeamSeasonResult[]): TeamIconicCar[] {
  const champs = [...history].filter(s => s.position === 1).sort((a, b) => b.wins - a.wins).slice(0, 3)
  const recent = [...history].sort((a, b) => b.season - a.season)
    .filter(s => !champs.some(c => c.season === s.season)).slice(0, 3)

  const seen = new Set<number>()
  return [
    ...champs.map(s => ({
      name: `${s.season}`,
      year: s.season,
      subtitle: `${s.wins} victories`,
      meta: `WORLD CONSTRUCTORS' CHAMPION`,
      peak: champs[0]?.season === s.season,
    })),
    ...recent.map(s => ({
      name: `${s.season}`,
      year: s.season,
      subtitle: `P${s.position} · ${s.wins} wins`,
      meta: `${s.points} POINTS`,
      peak: false,
    })),
  ].filter(n => {
    if (seen.has(n.year)) return false
    seen.add(n.year)
    return true
  }).slice(0, 6)
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

  const lcSlug = slug.toLowerCase()

  // Prema (F2/F3)
  if (lcSlug === 'prema' && (series === 'f2' || series === 'f3')) {
    return (
      <PremaPage
        team={prema} stats={premaStats} reelSlides={premaReelSlides}
        signatureBars={premaSignatureBars} graduates={premaGraduates}
        currentSeason={premaCurrentSeason} series={series}
      />
    )
  }

  // Blueprint pages (Ferrari)
  const bundle = TEAM_REGISTRY[series]?.[lcSlug]
  if (bundle) {
    const jolpicaId = SLUG_TO_JOLPICA[lcSlug] ?? lcSlug
    const [liveStats, { standings, meta }] = await Promise.all([
      series === 'f1' ? fetchFullTeamStats(jolpicaId) : Promise.resolve(null),
      series === 'f1' ? fetchCurrentStandings() : Promise.resolve({ standings: [], meta: { season: '', round: '' } }),
    ])
    const simpleLive: LiveTeamStats | undefined = liveStats
      ? { wins: liveStats.wins, podiums: liveStats.podiums, wccTitles: liveStats.wccTitles, seasons: liveStats.seasons }
      : undefined
    return (
      <TeamPage
        {...bundle} series={series}
        liveStats={simpleLive}
        currentStandings={standings} standingsMeta={meta} jolpicaId={jolpicaId}
      />
    )
  }

  // Generic F1 team — build full TeamPage data from Jolpica
  const jolpicaId = SLUG_TO_JOLPICA[lcSlug]
  if (series === 'f1' && jolpicaId) {
    const meta = TEAM_META[jolpicaId]
    if (!meta) notFound()

    const [fullStats, { standings, standingsMeta }, currentDrivers, seasonHistory] = await Promise.all([
      fetchFullTeamStats(jolpicaId),
      fetchCurrentStandings().then(r => ({ standings: r.standings, standingsMeta: r.meta })),
      fetchCurrentDrivers(jolpicaId),
      fetchTeamSeasonHistory(jolpicaId),
    ])

    if (!fullStats) notFound()

    const firstSeason = seasonHistory.length
      ? Math.min(...seasonHistory.map(s => s.season))
      : 1950
    const isActive = seasonHistory.some(s => s.season >= 2024)
    const currentYear = standingsMeta.season || new Date().getFullYear().toString()

    const team: Team = {
      id: jolpicaId,
      name: meta.name,
      shortName: meta.short,
      country: meta.nat,
      series: ['f1'],
      founded: firstSeason,
      current: isActive,
      entityColor: 'ferrari' as TeamLivery, // type placeholder — liveryHex drives all visuals
      liveryHex: meta.color,
      bio: fullStats.wccTitles > 0
        ? `${meta.name} has won ${fullStats.wccTitles} World Constructors' Championship${fullStats.wccTitles > 1 ? 's' : ''} and ${fullStats.wins} races across ${fullStats.seasons} Formula 1 seasons since ${firstSeason}.`
        : `${meta.name} has competed in ${fullStats.seasons} Formula 1 seasons since ${firstSeason}, accumulating ${fullStats.wins} race wins and ${fullStats.podiums} podium finishes.`,
    }

    const teamStats: TeamStats = {
      teamId: jolpicaId,
      constructorsTitles: fullStats.wccTitles,
      driversTitles: fullStats.driverTitles,
      wins: fullStats.wins,
      podiums: fullStats.podiums,
      seasons: fullStats.seasons,
      firstSeason,
    }

    const simpleLive: LiveTeamStats = {
      wins: fullStats.wins,
      podiums: fullStats.podiums,
      wccTitles: fullStats.wccTitles,
      seasons: fullStats.seasons,
    }

    const reelSlides   = buildReelSlides(seasonHistory, meta.short, meta.color)
    const eras         = buildEras(seasonHistory, jolpicaId)
    const sigBars      = buildSignatureBars(fullStats)
    const academy      = buildAcademy(currentDrivers, currentYear)
    const iconicCars   = buildIconicCars(seasonHistory)

    const sigDescription = fullStats.wccTitles > 0
      ? `${meta.name} has claimed ${fullStats.wccTitles} Constructors' title${fullStats.wccTitles > 1 ? 's' : ''} with a ${((fullStats.wins / Math.max(fullStats.races, 1)) * 100).toFixed(1)}% win rate and ${((fullStats.poles / Math.max(fullStats.races, 1)) * 100).toFixed(1)}% pole rate across ${fullStats.seasons} seasons.`
      : `${meta.name} has entered ${fullStats.races} races across ${fullStats.seasons} seasons, taking ${fullStats.wins} wins, ${fullStats.podiums} podiums, and ${fullStats.poles} pole positions.`

    const academyTitle = isActive
      ? `CURRENT LINEUP · ${currentYear}`
      : `DRIVER HISTORY · ${firstSeason}–${seasonHistory.length ? Math.max(...seasonHistory.map(s => s.season)) : firstSeason}`
    const academySubtitle = `${meta.nat.toUpperCase()} · ${meta.short.toUpperCase()}`

    return (
      <TeamPage
        team={team} stats={teamStats} eras={eras} signatureBars={sigBars}
        reelSlides={reelSlides} academy={academy} iconicCars={iconicCars}
        series={series}
        liveStats={simpleLive}
        currentStandings={standings} standingsMeta={standingsMeta} jolpicaId={jolpicaId}
        signatureDescription={sigDescription}
        academyTitle={academyTitle}
        academySubtitle={academySubtitle}
      />
    )
  }

  notFound()
}
