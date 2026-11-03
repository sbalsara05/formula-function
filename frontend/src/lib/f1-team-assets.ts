import { f1MediaUrl } from './f1-media-cdn'

/** Browse slug → formula1.com CDN folder id (2026 season). */
const F1_TEAM_CDN_ID: Record<string, string> = {
  ferrari: 'ferrari',
  'red-bull': 'redbullracing',
  mclaren: 'mclaren',
  mercedes: 'mercedes',
  williams: 'williams',
  'aston-martin': 'astonmartin',
  alpine: 'alpine',
  haas: 'haasf1team',
  rb: 'racingbulls',
  audi: 'audi',
  cadillac: 'cadillac',
}

/** Local front-3/4 on-track photos for browse cards (2026 Chinese GP qualifying). */
const TEAM_CAR_PHOTOS: Record<string, string> = {
  ferrari: '/images/teams/browse/ferrari-china-2026.jpg',
  'red-bull': '/images/teams/browse/red-bull-china-2026.jpg',
  mclaren: '/images/teams/browse/mclaren-china-2026.jpg',
  mercedes: '/images/teams/browse/mercedes-china-2026.jpg',
  williams: '/images/teams/browse/williams-china-2026.jpg',
  'aston-martin': '/images/teams/browse/aston-martin-china-2026.jpg',
  alpine: '/images/teams/browse/alpine-china-2026.jpg',
  haas: '/images/teams/browse/haas-china-2026.jpg',
  rb: '/images/teams/browse/rb-china-2026.jpg',
  audi: '/images/teams/browse/audi-china-2026.jpg',
  cadillac: '/images/teams/browse/cadillac-china-2026.jpg',
}

/** Local SVG fallbacks when CDN fails — keyed by browse slug. */
const LOCAL_LOGO_FALLBACK: Record<string, string> = {
  ferrari: '/images/teams/logos/ferrari.svg',
  'red-bull': '/images/teams/logos/red-bull.svg',
  mclaren: '/images/teams/logos/mclaren.svg',
  mercedes: '/images/teams/logos/mercedes.svg',
  williams: '/images/teams/logos/williams.svg',
  'aston-martin': '/images/teams/logos/aston-martin.jpg',
  alpine: '/images/teams/logos/alpine.svg',
  haas: '/images/teams/logos/haas.svg',
  rb: '/images/teams/logos/rb.svg',
  audi: '/images/teams/logos/sauber.svg',
  cadillac: '/images/teams/logos/cadillac.svg',
}

export function getF1TeamAssets(slug: string): {
  carImage?: string
  carRenderFallback?: string
  logoImage?: string
  logoFallback?: string
} {
  const folder = F1_TEAM_CDN_ID[slug]
  if (!folder) return {}
  const carRenderFallback = f1MediaUrl(`common/f1/2026/${folder}/2026${folder}carright.webp`, 600)
  return {
    carImage: TEAM_CAR_PHOTOS[slug] ?? carRenderFallback,
    carRenderFallback,
    logoImage: f1MediaUrl(`common/f1/2026/${folder}/2026${folder}logowhite.webp`, 200),
    logoFallback: LOCAL_LOGO_FALLBACK[slug],
  }
}

export function applyTeamAssets<
  T extends { slug: string; image?: string; imageFallback?: string; logoImage?: string; logoFallback?: string },
>(items: T[]): T[] {
  return items.map(item => {
    const assets = getF1TeamAssets(item.slug)
    return {
      ...item,
      image: assets.carImage ?? item.image,
      imageFallback: assets.carRenderFallback ?? item.imageFallback,
      logoImage: assets.logoImage ?? item.logoImage,
      logoFallback: assets.logoFallback ?? item.logoFallback,
    }
  })
}
