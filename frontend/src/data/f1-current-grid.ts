import {
  leclerc, hamilton, verstappen, hadjar, lawson, lindblad,
  norris, piastriF1, russellF1, antonelli, sainz, albon,
  gasly, colapinto, stroll, alonso, bortoleto, hulkenberg, bearman, ocon,
  perez, bottas,
} from './mock/drivers'

export type GridEntity = {
  slug: string
  name: string
  tagline: string
  color: string
  image?: string
  imageFallback?: string
  number?: string
  numberImage?: string
  logoImage?: string
  logoFallback?: string
}

const TEAM_COLORS = {
  ferrari: '#DC0000',
  'red-bull': '#1E3A8A',
  rb: '#6692FF',
  mclaren: '#FF8700',
  mercedes: '#00D2BE',
  williams: '#005AFF',
  alpine: '#FF87BC',
  'aston-martin': '#006F62',
  sauber: '#52E252',
  audi: '#BB1C2A',
  haas: '#B6BABD',
  cadillac: '#C8A96E',
} as const

/** Browse-card slugs match DRIVER_REGISTRY keys (may differ from mock `Driver.id`). */
const DRIVER_GRID_SLUG: Record<string, string> = {
  max_verstappen: 'verstappen',
}

function driver(
  d: { id: string; name: string; portraitUrl?: string },
  tagline: string,
  teamSlug: keyof typeof TEAM_COLORS,
): GridEntity {
  const image = d.portraitUrl?.startsWith('/images/') ? d.portraitUrl : undefined
  const slug = DRIVER_GRID_SLUG[d.id] ?? d.id
  return { slug, name: d.name, tagline, color: TEAM_COLORS[teamSlug], image }
}

/** 2026 F1 grid — teams with curated detail pages in TEAM_REGISTRY.f1 */
export const CURRENT_F1_TEAMS: GridEntity[] = [
  { slug: 'ferrari', name: 'Scuderia Ferrari', tagline: '16× WCC · Hamilton & Leclerc · 2026', color: TEAM_COLORS.ferrari },
  { slug: 'red-bull', name: 'Red Bull Racing', tagline: '6× WCC · Verstappen & Hadjar · 2026', color: TEAM_COLORS['red-bull'] },
  { slug: 'mclaren', name: 'McLaren', tagline: '10× WCC · 2024 WCC · Norris WDC 2025', color: TEAM_COLORS.mclaren },
  { slug: 'mercedes', name: 'Mercedes', tagline: '8× WCC · Russell & Antonelli · 2026', color: TEAM_COLORS.mercedes },
  { slug: 'williams', name: 'Williams Racing', tagline: '9× WCC · Sainz & Albon · 2026', color: TEAM_COLORS.williams },
  { slug: 'aston-martin', name: 'Aston Martin', tagline: 'Alonso & Stroll · Newey era · 2026', color: TEAM_COLORS['aston-martin'] },
  { slug: 'alpine', name: 'Alpine F1 Team', tagline: 'Gasly & Colapinto · Mercedes PU · 2026', color: TEAM_COLORS.alpine },
  { slug: 'haas', name: 'Haas F1 Team', tagline: 'Bearman & Ocon · Ferrari customer · 2026', color: TEAM_COLORS.haas },
  { slug: 'rb', name: 'Racing Bulls', tagline: 'Lawson & Lindblad · Ford PU · 2026', color: TEAM_COLORS.rb },
  { slug: 'audi', name: 'Audi F1 Team', tagline: 'Bortoleto & Hülkenberg · works PU · 2026', color: TEAM_COLORS.audi },
  { slug: 'cadillac', name: 'Cadillac F1 Team', tagline: 'Pérez & Bottas · GM debut · 2026', color: TEAM_COLORS.cadillac },
]

/** 2026 race drivers with curated pages in DRIVER_REGISTRY.f1 (Bottas listed once — Cadillac) */
export const CURRENT_F1_DRIVERS: GridEntity[] = [
  driver(leclerc, 'Ferrari · Monaco native · 2019–', 'ferrari'),
  driver(hamilton, 'Ferrari · 7× WDC · Mercedes dynasty', 'ferrari'),
  driver(verstappen, 'Red Bull · 4× WDC · 2021–2024', 'red-bull'),
  driver(hadjar, 'Red Bull · F2 runner-up 2024 · 2026', 'red-bull'),
  driver(lawson, 'Racing Bulls · Red Bull graduate · 2026', 'rb'),
  driver(lindblad, 'Racing Bulls · youngest British F1 driver', 'rb'),
  driver(norris, 'McLaren · 2025 WDC · 1× Monaco win', 'mclaren'),
  driver(piastriF1, 'McLaren · 2024 WDC runner-up', 'mclaren'),
  driver(russellF1, 'Mercedes · Williams graduate · 2020–', 'mercedes'),
  driver(antonelli, 'Mercedes · Prema graduate · rookie 2025', 'mercedes'),
  driver(sainz, 'Williams · 2024 Australian GP winner', 'williams'),
  driver(albon, 'Williams · Red Bull alumni · 2022–', 'williams'),
  driver(gasly, 'Alpine · 2020 Monza winner · 2019–', 'alpine'),
  driver(colapinto, 'Alpine · Williams graduate · 2026', 'alpine'),
  driver(stroll, 'Aston Martin · Canadian · 2017–', 'aston-martin'),
  driver(alonso, 'Aston Martin · 2× WDC · 2001–', 'aston-martin'),
  driver(bortoleto, 'Audi F1 Team · F2 champion 2024 · rookie 2025', 'audi'),
  driver(hulkenberg, 'Audi F1 Team · 228+ starts · lead driver 2026', 'audi'),
  driver(bearman, 'Haas · Ferrari graduate · FDA · 2026', 'haas'),
  driver(ocon, 'Haas · 2021 Hungarian GP winner · 2026', 'haas'),
  driver(bottas, 'Cadillac · 10× race wins · Mercedes alumni', 'cadillac'),
  driver(perez, 'Cadillac · Red Bull race winner · 2026', 'cadillac'),
]

/** All 23 venues on the 2026 calendar — matches VENUE_REGISTRY.f1 */
export const CURRENT_F1_VENUES: GridEntity[] = [
  { slug: 'spa', name: 'Spa-Francorchamps', tagline: '7.004 km · Ardennes, Belgium', color: '#5FB87C' },
  { slug: 'monaco', name: 'Circuit de Monaco', tagline: '3.337 km · Monte Carlo', color: '#B5A642' },
  { slug: 'monza', name: 'Monza', tagline: '5.793 km · Temple of Speed, Italy', color: '#C12E2E' },
  { slug: 'silverstone', name: 'Silverstone', tagline: '5.891 km · Northamptonshire, GB', color: '#005AFF' },
  { slug: 'suzuka', name: 'Suzuka', tagline: '5.807 km · Mie Prefecture, Japan', color: '#FF6B35' },
  { slug: 'interlagos', name: 'Interlagos', tagline: '4.309 km · São Paulo, Brazil', color: '#00A651' },
  { slug: 'bahrain', name: 'Bahrain', tagline: '5.412 km · Sakhir, Bahrain', color: '#E0891A' },
  { slug: 'abu-dhabi', name: 'Abu Dhabi', tagline: '5.281 km · Yas Marina, UAE', color: '#9B59B6' },
  { slug: 'jeddah', name: 'Jeddah', tagline: '6.174 km · Corniche Street Circuit, KSA', color: '#1E8A4C' },
  { slug: 'melbourne', name: 'Melbourne', tagline: '5.278 km · Albert Park, Australia', color: '#003580' },
  { slug: 'shanghai', name: 'Shanghai', tagline: '5.451 km · China · since 2004', color: '#DE2910' },
  { slug: 'miami', name: 'Miami', tagline: '5.412 km · Hard Rock Stadium, USA', color: '#00B4D8' },
  { slug: 'imola', name: 'Imola', tagline: '4.909 km · Emilia-Romagna, Italy', color: '#CC3300' },
  { slug: 'montreal', name: 'Montreal', tagline: '4.361 km · Circuit Gilles Villeneuve', color: '#FF0000' },
  { slug: 'barcelona', name: 'Barcelona', tagline: '4.657 km · Catalunya, Spain', color: '#FFCC00' },
  { slug: 'hungaroring', name: 'Hungaroring', tagline: '4.381 km · Mogyoród, Hungary', color: '#CC0000' },
  { slug: 'zandvoort', name: 'Zandvoort', tagline: '4.259 km · North Holland, Netherlands', color: '#FF6600' },
  { slug: 'baku', name: 'Baku', tagline: '6.003 km · Azerbaijan Street Circuit', color: '#009999' },
  { slug: 'singapore', name: 'Singapore', tagline: '4.927 km · Marina Bay Street Circuit', color: '#FF3300' },
  { slug: 'cota', name: 'Circuit of the Americas', tagline: '5.513 km · Austin, Texas, USA', color: '#003366' },
  { slug: 'mexico', name: 'Mexico City', tagline: '4.304 km · Hermanos Rodriguez, 2,238m alt', color: '#006847' },
  { slug: 'las-vegas', name: 'Las Vegas', tagline: '6.201 km · Las Vegas Strip Circuit', color: '#CC9900' },
  { slug: 'qatar', name: 'Qatar', tagline: '5.419 km · Lusail International Circuit', color: '#8C1C13' },
]
