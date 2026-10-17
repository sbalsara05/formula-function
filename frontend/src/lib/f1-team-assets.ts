export type TeamAssetFields = {
  slug: string
  image?: string
  imageFallback?: string
  logoImage?: string
  logoFallback?: string
}

const W = 'https://en.wikipedia.org/wiki/Special:FilePath/'

/** Wikimedia 2026 Chinese GP qualifying stills — same files as scripts/download_team_browse_photos.py */
const BROWSE_FALLBACK: Record<string, string> = {
  ferrari: W + '2026_Chinese_GP_-_Ferrari_-_Charles_Leclerc_-_Qualifying.jpg',
  'red-bull': W + '2026_Chinese_GP_-_Red_Bull_-_Max_Verstappen_-_Qualifying.jpg',
  mclaren: W + '2026_Chinese_GP_-_McLaren_-_Lando_Norris_-_Qualifying.jpg',
  mercedes: W + '2026_Chinese_GP_-_Mercedes_-_George_Russell_-_Qualifying.jpg',
  williams: W + '2026_Chinese_GP_-_Williams_-_Alex_Albon_-_Qualifying.jpg',
  'aston-martin': W + '2026_Chinese_GP_-_Aston_Martin_-_Fernando_Alonso_-_Qualifying.jpg',
  alpine: W + '2026_Chinese_GP_-_Alpine_-_Pierre_Gasly_-_Qualifying.jpg',
  haas: W + '2026_Chinese_GP_-_Haas_-_Oliver_Bearman_-_Qualifying.jpg',
  rb: W + '2026_Chinese_GP_-_Racing_Bulls_-_Arvid_Lindblad_-_Qualifying.jpg',
  audi: W + '2026_Chinese_GP_-_Audi_-_Nico_Hulkenberg_-_Qualifying.jpg',
  cadillac: W + '2026_Chinese_GP_-_Cadillac_-_Valtteri_Bottas_-_Qualifying.jpg',
}

const LOGO_FILE: Record<string, string> = {
  ferrari: '/images/teams/logos/ferrari.svg',
  'red-bull': '/images/teams/logos/red-bull.svg',
  mclaren: '/images/teams/logos/mclaren.svg',
  mercedes: '/images/teams/logos/mercedes.svg',
  williams: '/images/teams/logos/williams.svg',
  'aston-martin': '/images/teams/logos/aston-martin.jpg',
  alpine: '/images/teams/logos/alpine.svg',
  haas: '/images/teams/logos/haas.svg',
  rb: '/images/teams/logos/rb.svg',
  cadillac: '/images/teams/logos/cadillac.svg',
  // No local Audi mark in /images/teams/logos; Sauber-era file is the works-team predecessor.
  audi: '/images/teams/logos/sauber.svg',
}

const LOGO_FALLBACK: Record<string, string> = {
  ferrari: W + 'Scuderia_Ferrari_Logo.svg',
  'red-bull': W + 'Red_Bull.svg',
  mclaren: W + 'McLaren_Racing_logo.svg',
  mercedes: W + 'Mercedes-Benz_star_2010.svg',
  williams: W + 'Williams_Racing_2022_logo.svg',
  'aston-martin': W + 'Aston_Martin_Lagonda_logo.svg',
  alpine: W + 'BWT_Alpine_F1_Team_logo.svg',
  haas: W + 'MoneyGram_Haas_F1_Team_logo.svg',
  rb: W + 'Visa_Cash_App_RB_F1_Team_logo.svg',
  audi: W + 'Audi-Logo_2016.svg',
  cadillac: W + 'Cadillac_logo.svg',
}

/**
 * Attach self-hosted browse photos and logos to F1 landing team cards.
 * Existing fields on the entity win so curated overrides stay intact.
 */
export function applyTeamAssets<T extends TeamAssetFields>(teams: T[]): T[] {
  return teams.map((team) => ({
    ...team,
    image: team.image ?? `/images/teams/browse/${team.slug}-china-2026.jpg`,
    imageFallback: team.imageFallback ?? BROWSE_FALLBACK[team.slug],
    logoImage: team.logoImage ?? LOGO_FILE[team.slug],
    logoFallback: team.logoFallback ?? LOGO_FALLBACK[team.slug],
  }))
}
