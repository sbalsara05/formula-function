export interface DriverStandingRow {
  position: number
  driverId: string
  firstName: string
  lastName: string
  nationality: string
  permanentNumber?: string
  constructorId: string
  constructorName: string
  points: string
  wins: string
}

export interface ConstructorStandingRow {
  position: number
  constructorId: string
  name: string
  nationality: string
  points: string
  wins: string
}

export interface LiveStandings {
  season: string
  round: string
  driverStandings: DriverStandingRow[]
  constructorStandings: ConstructorStandingRow[]
}

export async function fetchLiveStandings(): Promise<LiveStandings | null> {
  try {
    const [dRes, cRes] = await Promise.all([
      fetch('https://api.jolpi.ca/ergast/f1/current/driverstandings.json?limit=100', { next: { revalidate: 300 } }),
      fetch('https://api.jolpi.ca/ergast/f1/current/constructorstandings.json?limit=100', { next: { revalidate: 300 } }),
    ])
    if (!dRes.ok || !cRes.ok) return null
    const [dData, cData] = await Promise.all([dRes.json(), cRes.json()])

    const dList = dData?.MRData?.StandingsTable?.StandingsLists?.[0]
    const cList = cData?.MRData?.StandingsTable?.StandingsLists?.[0]
    if (!dList || !cList) return null

    const season = dList.season as string
    const round = dList.round as string

    const driverStandings: DriverStandingRow[] = (dList.DriverStandings ?? []).map((s: Record<string, unknown>) => {
      const d = s.Driver as Record<string, string>
      const c = (s.Constructors as Array<Record<string, string>>)?.[0]
      return {
        position: parseInt(s.position as string),
        driverId: d?.driverId ?? '',
        firstName: d?.givenName ?? '',
        lastName: d?.familyName ?? '',
        nationality: d?.nationality ?? '',
        permanentNumber: d?.permanentNumber,
        constructorId: c?.constructorId ?? '',
        constructorName: c?.name ?? '',
        points: s.points as string,
        wins: s.wins as string,
      }
    })

    const constructorStandings: ConstructorStandingRow[] = (cList.ConstructorStandings ?? []).map((s: Record<string, unknown>) => {
      const c = s.Constructor as Record<string, string>
      return {
        position: parseInt(s.position as string),
        constructorId: c?.constructorId ?? '',
        name: c?.name ?? '',
        nationality: c?.nationality ?? '',
        points: s.points as string,
        wins: s.wins as string,
      }
    })

    return { season, round, driverStandings, constructorStandings }
  } catch {
    return null
  }
}

export const CONSTRUCTOR_COLORS: Record<string, string> = {
  ferrari: '#DC0000', mclaren: '#FF8000', mercedes: '#00D2BE', red_bull: '#1E3A8A',
  williams: '#005AFF', aston_martin: '#006F62', alpine: '#0090FF', haas: '#B6BABD',
  sauber: '#52E252', audi: '#BB1C2A', rb: '#6692FF', cadillac: '#C8A96E',
}
