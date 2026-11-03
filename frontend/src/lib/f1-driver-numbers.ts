/** Maps our driver slugs to Jolpica / Ergast driverId (2026 entry list). */
const JOLPICA_DRIVER_ID: Record<string, string> = {
  lindblad: 'arvid_lindblad',
  verstappen: 'max_verstappen',
}

/**
 * 2026 stylized number assets from formula1.com CDN (per-driver custom typography).
 * Paths scraped from formula1.com/en/drivers — update each season.
 */
const F1_DRIVER_NUMBER_ASSET: Record<string, string> = {
  leclerc: 'common/f1/2026/ferrari/chalec01/2026ferrarichalec01numberwhitefrless.webp',
  hamilton: 'common/f1/2026/ferrari/lewham01/2026ferrarilewham01numberwhitefrless.webp',
  verstappen: 'common/f1/2026/redbullracing/maxver01/2026redbullracingmaxver01numberwhitefrless.webp',
  max_verstappen: 'common/f1/2026/redbullracing/maxver01/2026redbullracingmaxver01numberwhitefrless.webp',
  hadjar: 'common/f1/2026/redbullracing/isahad01/2026redbullracingisahad01numberwhitefrless.webp',
  lawson: 'common/f1/2026/racingbulls/lialaw01/2026racingbullslialaw01numberwhitefrless.webp',
  lindblad: 'common/f1/2026/racingbulls/arvlin01/2026racingbullsarvlin01numberwhitefrless.webp',
  norris: 'common/f1/2026/mclaren/lannor01/2026mclarenlannor01numberwhitefrless.webp',
  piastri: 'common/f1/2026/mclaren/oscpia01/2026mclarenoscpia01numberwhitefrless.webp',
  russell: 'common/f1/2026/mercedes/georus01/2026mercedesgeorus01numberwhitefrless.webp',
  antonelli: 'common/f1/2026/mercedes/andant01/2026mercedesandant01numberwhitefrless.webp',
  sainz: 'common/f1/2026/williams/carsai01/2026williamscarsai01numberwhitefrless.webp',
  albon: 'common/f1/2026/williams/alealb01/2026williamsalealb01numberwhitefrless.webp',
  gasly: 'common/f1/2026/alpine/piegas01/2026alpinepiegas01numberwhitefrless.webp',
  colapinto: 'common/f1/2026/alpine/fracol01/2026alpinefracol01numberwhitefrless.webp',
  alonso: 'common/f1/2026/astonmartin/feralo01/2026astonmartinferalo01numberwhitefrless.webp',
  stroll: 'common/f1/2026/astonmartin/lanstr01/2026astonmartinlanstr01numberwhitefrless.webp',
  bortoleto: 'common/f1/2026/audi/gabbor01/2026audigabbor01numberwhitefrless.webp',
  hulkenberg: 'common/f1/2026/audi/nichul01/2026audinichul01numberwhitefrless.webp',
  bearman: 'common/f1/2026/haasf1team/olibea01/2026haasf1teamolibea01numberwhitefrless.webp',
  ocon: 'common/f1/2026/haasf1team/estoco01/2026haasf1teamestoco01numberwhitefrless.webp',
  perez: 'common/f1/2026/cadillac/serper01/2026cadillacserper01numberwhitefrless.webp',
  bottas: 'common/f1/2026/cadillac/valbot01/2026cadillacvalbot01numberwhitefrless.webp',
}

import { f1MediaUrl } from './f1-media-cdn'

export type DriverNumberData = {
  numbers: Record<string, string>
  numberImages: Record<string, string>
}

/** Permanent numbers — source: api.jolpi.ca/ergast/f1/2026/drivers (FIA entry list). */
export async function fetchF1DriverNumberData(): Promise<DriverNumberData> {
  const numbers = await fetchF1DriverNumbers()
  const numberImages: Record<string, string> = {}
  for (const [slug, assetPath] of Object.entries(F1_DRIVER_NUMBER_ASSET)) {
    numberImages[slug] = f1MediaUrl(assetPath)
  }
  return { numbers, numberImages }
}

async function fetchF1DriverNumbers(): Promise<Record<string, string>> {
  try {
    const res = await fetch('https://api.jolpi.ca/ergast/f1/2026/drivers.json?limit=50', {
      next: { revalidate: 86400 },
    })
    if (!res.ok) return {}
    const data = await res.json()
    const drivers = data?.MRData?.DriverTable?.Drivers ?? []
    const byJolpicaId: Record<string, string> = {}
    for (const d of drivers) {
      if (d.driverId && d.permanentNumber) {
        byJolpicaId[d.driverId] = d.permanentNumber
      }
    }
    const bySlug: Record<string, string> = {}
    for (const [slug, jolpicaId] of Object.entries(JOLPICA_DRIVER_ID)) {
      if (byJolpicaId[jolpicaId]) bySlug[slug] = byJolpicaId[jolpicaId]
    }
    for (const [jolpicaId, num] of Object.entries(byJolpicaId)) {
      const slug = jolpicaId === 'max_verstappen' ? 'verstappen'
        : jolpicaId === 'arvid_lindblad' ? 'lindblad'
        : jolpicaId
      if (!bySlug[slug]) bySlug[slug] = num
      if (slug === 'verstappen') bySlug.max_verstappen = num
    }
    return bySlug
  } catch {
    return {}
  }
}

export function applyDriverNumbers<T extends { slug: string; number?: string; numberImage?: string }>(
  items: T[],
  data: DriverNumberData,
): T[] {
  return items.map(item => ({
    ...item,
    number: data.numbers[item.slug] ?? item.number,
    numberImage: data.numberImages[item.slug] ?? item.numberImage,
  }))
}
