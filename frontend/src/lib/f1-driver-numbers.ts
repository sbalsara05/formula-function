export type DriverNumberEntry = {
  number: string
  numberImage?: string
}

export type DriverNumberData = Record<string, DriverNumberEntry>

export type DriverNumberFields = {
  slug: string
  number?: string
  numberImage?: string
}

/** Browse-card slugs that differ from Jolpica driverId. */
const SLUG_FROM_JOLPICA: Record<string, string> = {
  max_verstappen: 'verstappen',
  arvid_lindblad: 'lindblad',
}

/**
 * formula1.com 2026 number-graphic path pieces.
 * Same roster as scripts/download_f1_portraits.py (team slug + driver ref).
 */
const F1_NUMBER_ASSETS: Record<string, { team: string; ref: string }> = {
  leclerc: { team: 'ferrari', ref: 'chalec01' },
  hamilton: { team: 'ferrari', ref: 'lewham01' },
  verstappen: { team: 'redbullracing', ref: 'maxver01' },
  hadjar: { team: 'redbullracing', ref: 'isahad01' },
  lawson: { team: 'racingbulls', ref: 'lialaw01' },
  lindblad: { team: 'racingbulls', ref: 'arvlin01' },
  norris: { team: 'mclaren', ref: 'lannor01' },
  piastri: { team: 'mclaren', ref: 'oscpia01' },
  russell: { team: 'mercedes', ref: 'georus01' },
  antonelli: { team: 'mercedes', ref: 'andant01' },
  sainz: { team: 'williams', ref: 'carsai01' },
  albon: { team: 'williams', ref: 'alealb01' },
  gasly: { team: 'alpine', ref: 'piegas01' },
  colapinto: { team: 'alpine', ref: 'fracol01' },
  stroll: { team: 'astonmartin', ref: 'lanstr01' },
  alonso: { team: 'astonmartin', ref: 'feralo01' },
  bortoleto: { team: 'audi', ref: 'gabbor01' },
  hulkenberg: { team: 'audi', ref: 'nichul01' },
  bearman: { team: 'haasf1team', ref: 'olibea01' },
  ocon: { team: 'haasf1team', ref: 'estoco01' },
  bottas: { team: 'cadillac', ref: 'valbot01' },
  perez: { team: 'cadillac', ref: 'serper01' },
}

function numberImageUrl(team: string, ref: string): string {
  const path = `common/f1/2026/${team}/${ref}/2026${team}${ref}numberwhitefrless.webp`
  return `https://media.formula1.com/image/upload/c_fit,w_400/q_auto:best/v1740000001/${path}`
}

function seedFromAssets(): DriverNumberData {
  const data: DriverNumberData = {}
  for (const [slug, asset] of Object.entries(F1_NUMBER_ASSETS)) {
    data[slug] = { number: '', numberImage: numberImageUrl(asset.team, asset.ref) }
  }
  return data
}

export function applyDriverNumbers<T extends DriverNumberFields>(
  drivers: T[],
  data: DriverNumberData,
): T[] {
  return drivers.map((driver) => {
    const info = data[driver.slug]
    if (!info) return driver
    return {
      ...driver,
      number: info.number || driver.number,
      numberImage: info.numberImage || driver.numberImage,
    }
  })
}

/**
 * Live racing numbers from Jolpica current driver standings, keyed by landing-page slug.
 * Always includes F1.com number graphics so cards still render if the API is down.
 */
export async function fetchF1DriverNumberData(): Promise<DriverNumberData> {
  const data = seedFromAssets()
  try {
    const res = await fetch(
      'https://api.jolpi.ca/ergast/f1/current/driverstandings.json',
      { next: { revalidate: 300 } },
    )
    if (!res.ok) return data
    const json = await res.json() as {
      MRData?: {
        StandingsTable?: {
          StandingsLists?: Array<{
            DriverStandings?: Array<{
              Driver?: { driverId?: string; permanentNumber?: string }
            }>
          }>
        }
      }
    }
    const rows = json?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? []
    for (const row of rows) {
      const driverId = row.Driver?.driverId
      const permanentNumber = row.Driver?.permanentNumber
      if (!driverId || !permanentNumber) continue
      const slug = SLUG_FROM_JOLPICA[driverId] ?? driverId
      const existing = data[slug]
      data[slug] = {
        number: permanentNumber,
        numberImage: existing?.numberImage,
      }
    }
  } catch {
    // Keep graphic URLs; numbers stay empty and EntityCard falls back to no digit overlay.
  }
  return data
}
