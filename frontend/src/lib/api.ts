import { connection } from 'next/server'

// BACKEND_URL comes from the Vercel service binding and only exists at request time, never during `next build`.
async function backendUrl(path: string): Promise<string | null> {
  await connection()
  const base = process.env.BACKEND_URL
  return base ? `${base.replace(/\/$/, '')}${path}` : null
}

export async function getConstructorStandings(season: string | number = 'current') {
  const url = await backendUrl(`/api/v1/teams/standings/${season}`)
  if (!url) return null
  try {
    const res = await fetch(url, {
      next: { revalidate: 300 }, // 5 min cache
    })
    if (!res.ok) return null
    return res.json() as Promise<ConstructorStanding[]>
  } catch {
    return null
  }
}

export interface ConstructorStanding {
  position: string
  points: string
  wins: string
  Constructor: {
    constructorId: string
    name: string
    nationality: string
    url: string
  }
}

export async function getDriverStandings(season: string | number = 'current') {
  const url = await backendUrl(`/api/v1/drivers/standings/${season}`)
  if (!url) return null
  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    return res.json() as Promise<DriverStanding[]>
  } catch {
    return null
  }
}

export interface DriverStanding {
  position: string
  points: string
  wins: string
  Driver: {
    driverId: string
    givenName: string
    familyName: string
    nationality: string
    permanentNumber?: string
  }
  Constructors: Array<{ constructorId: string; name: string }>
}
