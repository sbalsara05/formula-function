export type F1Champion = {
  year: number
  driver: string
  team: string
  color: string
}

export const F1_CHAMPIONS: F1Champion[] = [
  { year: 1950, driver: 'Farina',      team: 'Alfa Romeo', color: '#9C0000' },
  { year: 1951, driver: 'Fangio',      team: 'Alfa Romeo', color: '#9C0000' },
  { year: 1952, driver: 'Ascari',      team: 'Ferrari',    color: '#DC0000' },
  { year: 1953, driver: 'Ascari',      team: 'Ferrari',    color: '#DC0000' },
  { year: 1954, driver: 'Fangio',      team: 'Mercedes',   color: '#C0C0C0' },
  { year: 1955, driver: 'Fangio',      team: 'Mercedes',   color: '#C0C0C0' },
  { year: 1956, driver: 'Fangio',      team: 'Ferrari',    color: '#DC0000' },
  { year: 1957, driver: 'Fangio',      team: 'Maserati',   color: '#1A3A5C' },
  { year: 1958, driver: 'Hawthorn',   team: 'Ferrari',    color: '#DC0000' },
  { year: 1959, driver: 'Brabham',    team: 'Cooper',     color: '#2E7D32' },
  { year: 1960, driver: 'Brabham',    team: 'Cooper',     color: '#2E7D32' },
  { year: 1961, driver: 'P. Hill',    team: 'Ferrari',    color: '#DC0000' },
  { year: 1962, driver: 'G. Hill',    team: 'BRM',        color: '#1B5E20' },
  { year: 1963, driver: 'Clark',      team: 'Lotus',      color: '#FFD700' },
  { year: 1964, driver: 'Surtees',    team: 'Ferrari',    color: '#DC0000' },
  { year: 1965, driver: 'Clark',      team: 'Lotus',      color: '#FFD700' },
  { year: 1966, driver: 'Brabham',    team: 'Brabham',    color: '#4A90D9' },
  { year: 1967, driver: 'Hulme',      team: 'Brabham',    color: '#4A90D9' },
  { year: 1968, driver: 'G. Hill',    team: 'Lotus',      color: '#FFD700' },
  { year: 1969, driver: 'Stewart',    team: 'Matra',      color: '#1565C0' },
  { year: 1970, driver: 'Rindt †',   team: 'Lotus',      color: '#FFD700' },
  { year: 1971, driver: 'Stewart',    team: 'Tyrrell',    color: '#1565C0' },
  { year: 1972, driver: 'Fittipaldi', team: 'Lotus',      color: '#FFD700' },
  { year: 1973, driver: 'Stewart',    team: 'Tyrrell',    color: '#1565C0' },
  { year: 1974, driver: 'Fittipaldi', team: 'McLaren',    color: '#FF8700' },
  { year: 1975, driver: 'Lauda',      team: 'Ferrari',    color: '#DC0000' },
  { year: 1976, driver: 'Hunt',       team: 'McLaren',    color: '#FF8700' },
  { year: 1977, driver: 'Lauda',      team: 'Ferrari',    color: '#DC0000' },
  { year: 1978, driver: 'Andretti',   team: 'Lotus',      color: '#FFD700' },
  { year: 1979, driver: 'Scheckter',  team: 'Ferrari',    color: '#DC0000' },
  { year: 1980, driver: 'Jones',      team: 'Williams',   color: '#005AFF' },
  { year: 1981, driver: 'Piquet',     team: 'Brabham',    color: '#4A90D9' },
  { year: 1982, driver: 'Rosberg',    team: 'Williams',   color: '#005AFF' },
  { year: 1983, driver: 'Piquet',     team: 'Brabham',    color: '#4A90D9' },
  { year: 1984, driver: 'Lauda',      team: 'McLaren',    color: '#FF8700' },
  { year: 1985, driver: 'Prost',      team: 'McLaren',    color: '#FF8700' },
  { year: 1986, driver: 'Prost',      team: 'McLaren',    color: '#FF8700' },
  { year: 1987, driver: 'Piquet',     team: 'Williams',   color: '#005AFF' },
  { year: 1988, driver: 'Senna',      team: 'McLaren',    color: '#E10600' },
  { year: 1989, driver: 'Prost',      team: 'McLaren',    color: '#E10600' },
  { year: 1990, driver: 'Senna',      team: 'McLaren',    color: '#E10600' },
  { year: 1991, driver: 'Senna',      team: 'McLaren',    color: '#E10600' },
  { year: 1992, driver: 'Mansell',    team: 'Williams',   color: '#005AFF' },
  { year: 1993, driver: 'Prost',      team: 'Williams',   color: '#005AFF' },
  { year: 1994, driver: 'Schumacher', team: 'Benetton',   color: '#FFD700' },
  { year: 1995, driver: 'Schumacher', team: 'Benetton',   color: '#FFD700' },
  { year: 1996, driver: 'D. Hill',    team: 'Williams',   color: '#005AFF' },
  { year: 1997, driver: 'Villeneuve', team: 'Williams',   color: '#005AFF' },
  { year: 1998, driver: 'Häkkinen',   team: 'McLaren',    color: '#A0A8C8' },
  { year: 1999, driver: 'Häkkinen',   team: 'McLaren',    color: '#A0A8C8' },
  { year: 2000, driver: 'Schumacher', team: 'Ferrari',    color: '#DC0000' },
  { year: 2001, driver: 'Schumacher', team: 'Ferrari',    color: '#DC0000' },
  { year: 2002, driver: 'Schumacher', team: 'Ferrari',    color: '#DC0000' },
  { year: 2003, driver: 'Schumacher', team: 'Ferrari',    color: '#DC0000' },
  { year: 2004, driver: 'Schumacher', team: 'Ferrari',    color: '#DC0000' },
  { year: 2005, driver: 'Alonso',     team: 'Renault',    color: '#FFD700' },
  { year: 2006, driver: 'Alonso',     team: 'Renault',    color: '#FFD700' },
  { year: 2007, driver: 'Räikkönen',  team: 'Ferrari',    color: '#DC0000' },
  { year: 2008, driver: 'Hamilton',   team: 'McLaren',    color: '#C0C0C0' },
  { year: 2009, driver: 'Button',     team: 'Brawn GP',   color: '#BFFF00' },
  { year: 2010, driver: 'Vettel',     team: 'Red Bull',   color: '#1E3A8A' },
  { year: 2011, driver: 'Vettel',     team: 'Red Bull',   color: '#1E3A8A' },
  { year: 2012, driver: 'Vettel',     team: 'Red Bull',   color: '#1E3A8A' },
  { year: 2013, driver: 'Vettel',     team: 'Red Bull',   color: '#1E3A8A' },
  { year: 2014, driver: 'Hamilton',   team: 'Mercedes',   color: '#00D2BE' },
  { year: 2015, driver: 'Hamilton',   team: 'Mercedes',   color: '#00D2BE' },
  { year: 2016, driver: 'Rosberg',    team: 'Mercedes',   color: '#00D2BE' },
  { year: 2017, driver: 'Hamilton',   team: 'Mercedes',   color: '#00D2BE' },
  { year: 2018, driver: 'Hamilton',   team: 'Mercedes',   color: '#00D2BE' },
  { year: 2019, driver: 'Hamilton',   team: 'Mercedes',   color: '#00D2BE' },
  { year: 2020, driver: 'Hamilton',   team: 'Mercedes',   color: '#00D2BE' },
  { year: 2021, driver: 'Verstappen', team: 'Red Bull',   color: '#1E3A8A' },
  { year: 2022, driver: 'Verstappen', team: 'Red Bull',   color: '#1E3A8A' },
  { year: 2023, driver: 'Verstappen', team: 'Red Bull',   color: '#1E3A8A' },
  { year: 2024, driver: 'Verstappen', team: 'Red Bull',   color: '#1E3A8A' },
  { year: 2025, driver: 'Norris',     team: 'McLaren',    color: '#FF8700' },
]

export const TIMELINE_START = F1_CHAMPIONS[0].year
export const TIMELINE_END = F1_CHAMPIONS[F1_CHAMPIONS.length - 1].year
export const TIMELINE_SPAN = TIMELINE_END - TIMELINE_START
export const TIMELINE_DECADE_MARKERS = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, TIMELINE_END]

/** Canonical bar + legend color per constructor that has won the drivers' title */
export const CHAMPIONSHIP_CONSTRUCTOR_COLORS: Record<string, string> = {
  'Alfa Romeo': '#9C0000',
  'Ferrari': '#DC0000',
  'Mercedes': '#00D2BE',
  'Maserati': '#1A3A5C',
  'Cooper': '#2E7D32',
  'BRM': '#1B5E20',
  'Lotus': '#FFD700',
  'Brabham': '#4A90D9',
  'Matra': '#6A5ACD',
  'Tyrrell': '#004B87',
  'McLaren': '#FF8700',
  'Williams': '#005AFF',
  'Benetton': '#009F6B',
  'Renault': '#FFF500',
  'Brawn': '#BFFF00',
  'Red Bull': '#1E3A8A',
}

const CONSTRUCTOR_FAMILY_ALIASES: Record<string, string> = {
  'Brawn GP': 'Brawn',
}

export function normalizeConstructorFamily(team: string): string {
  return CONSTRUCTOR_FAMILY_ALIASES[team] ?? team
}

export function championBarColor(team: string): string {
  const family = normalizeConstructorFamily(team)
  return CHAMPIONSHIP_CONSTRUCTOR_COLORS[family] ?? '#888888'
}

export function buildChampionshipLegend(champions: F1Champion[]) {
  const families = new Map<string, { count: number; latestYear: number }>()

  for (const c of champions) {
    const label = normalizeConstructorFamily(c.team)
    const prev = families.get(label)
    if (!prev) {
      families.set(label, { count: 1, latestYear: c.year })
    } else {
      families.set(label, {
        count: prev.count + 1,
        latestYear: Math.max(prev.latestYear, c.year),
      })
    }
  }

  return [...families.entries()]
    .map(([label, data]) => ({
      label,
      color: CHAMPIONSHIP_CONSTRUCTOR_COLORS[label] ?? '#888888',
      count: data.count,
      latestYear: data.latestYear,
    }))
    .sort((a, b) => b.count - a.count || b.latestYear - a.latestYear || a.label.localeCompare(b.label))
}

export const F1_CHAMPIONSHIP_LEGEND = buildChampionshipLegend(F1_CHAMPIONS)

export function getChampionsInRange(startYear: number, endYear?: number): F1Champion[] {
  const end = endYear ?? TIMELINE_END
  return F1_CHAMPIONS.filter(c => c.year >= startYear && c.year <= end)
}
