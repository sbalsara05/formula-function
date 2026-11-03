/* ─── Series config ──────────────────────────────────────────────────────────── */

export const SERIES_CONFIG = {
  '1': {
    label: 'f(1)', name: 'Formula 1', color: '#FF1E56',
    tier: 'TIER 1 · THE PINNACLE',
    description: 'The pinnacle of motorsport. Championships, constructors, and the drivers who shaped the modern era.',
    drivers: [
      { slug: 'verstappen',        name: 'Max Verstappen',    tagline: '4× WDC · Red Bull · 2021–2024',        color: '#1E3A8A' },
      { slug: 'hamilton',          name: 'Lewis Hamilton',    tagline: '7× WDC · Mercedes dynasty · Ferrari',   color: '#00D2BE' },
      { slug: 'leclerc',           name: 'Charles Leclerc',   tagline: 'Ferrari · Monaco native · 2019–',       color: '#DC0000' },
      { slug: 'norris',            name: 'Lando Norris',      tagline: 'McLaren · 2025 WDC · 1× Monaco win',    color: '#FF8000' },
      { slug: 'piastri',           name: 'Oscar Piastri',     tagline: 'McLaren · 2024 WDC runner-up',          color: '#FF8000' },
      { slug: 'alonso',            name: 'Fernando Alonso',   tagline: '2× WDC · Renault · Ferrari · 2001–',    color: '#006F62' },
      { slug: 'russell',           name: 'George Russell',    tagline: 'Mercedes · Williams graduate · 2020–',  color: '#00D2BE' },
      { slug: 'sainz',             name: 'Carlos Sainz Jr.',  tagline: 'Williams · 2024 Australian GP winner',  color: '#005AFF' },
      { slug: 'vettel',            name: 'Sebastian Vettel',  tagline: '4× WDC · Red Bull dynasty · 2010–2013',color: '#1E3A8A' },
      { slug: 'schumacher',        name: 'Michael Schumacher',tagline: '7× WDC · Ferrari · Benetton · 1991–',  color: '#DC0000' },
      { slug: 'senna',             name: 'Ayrton Senna',      tagline: '3× WDC · Monaco legend · 1984–1994',   color: '#E10600' },
      { slug: 'prost',             name: 'Alain Prost',       tagline: '4× WDC · McLaren · Williams · 1980–93', color: '#FF8000' },
      { slug: 'raikkonen',         name: 'Kimi Räikkönen',    tagline: '1× WDC · Ferrari · McLaren · 2001–21', color: '#DC0000' },
      { slug: 'button',            name: 'Jenson Button',     tagline: '1× WDC · Brawn GP · 2009',             color: '#BFFF00' },
      { slug: 'hakkinen',          name: 'Mika Häkkinen',     tagline: '2× WDC · McLaren · 1998–1999',         color: '#E8E8E8' },
      { slug: 'hill',              name: 'Damon Hill',        tagline: '1× WDC · Williams · 1996',             color: '#005AFF' },
      { slug: 'mansell',           name: 'Nigel Mansell',     tagline: '1× WDC · Williams · 1992',             color: '#005AFF' },
      { slug: 'rosberg',           name: 'Nico Rosberg',      tagline: '1× WDC · Mercedes · 2016',             color: '#00D2BE' },
      { slug: 'ricciardo',         name: 'Daniel Ricciardo',  tagline: 'McLaren · Red Bull · 2011–2023',       color: '#1E3A8A' },
    ],
    teams: [
      { slug: 'ferrari',       name: 'Scuderia Ferrari',    tagline: '16× WCC · most storied constructor',    color: '#DC0000' },
      { slug: 'red-bull',      name: 'Red Bull Racing',     tagline: '6× WCC · 8× WDC · Verstappen dynasty',  color: '#1E3A8A' },
      { slug: 'mclaren',       name: 'McLaren',             tagline: '8× WCC · 2024 Constructors\' Champions', color: '#FF8000' },
      { slug: 'mercedes',      name: 'Mercedes',            tagline: '8× WCC · Hamilton dynasty · 2014–2021', color: '#00D2BE' },
      { slug: 'williams',      name: 'Williams Racing',     tagline: '9× WCC · constructors legend',           color: '#005AFF' },
      { slug: 'aston-martin',  name: 'Aston Martin',        tagline: 'Alonso · British racing green',          color: '#006F62' },
      { slug: 'alpine',        name: 'Alpine F1 Team',      tagline: 'Renault lineage · 2× WCC',              color: '#0090FF' },
      { slug: 'haas',          name: 'Haas F1 Team',        tagline: 'American constructor · 2016–',          color: '#B6BABD' },
      { slug: 'lotus',         name: 'Team Lotus',          tagline: '7× WCC · Clark · Hill · Senna',         color: '#FFD700' },
      { slug: 'benetton',      name: 'Benetton Formula',    tagline: '1× WCC · Schumacher · 1994–1995',       color: '#009944' },
      { slug: 'brawn',         name: 'Brawn GP',            tagline: '1× WCC · Button · 2009',               color: '#BFFF00' },
      { slug: 'brabham',       name: 'Brabham',             tagline: '2× WCC · Brabham · Piquet',             color: '#4A90D9' },
    ],
    venues: [
      { slug: 'spa',          name: 'Spa-Francorchamps',   tagline: '7.004 km · Ardennes, Belgium',            color: '#5FB87C' },
      { slug: 'monaco',       name: 'Circuit de Monaco',   tagline: '3.337 km · Monte Carlo',                  color: '#B5A642' },
      { slug: 'monza',        name: 'Monza',               tagline: '5.793 km · Temple of Speed, Italy',       color: '#C12E2E' },
      { slug: 'silverstone',  name: 'Silverstone',         tagline: '5.891 km · Northamptonshire, GB',         color: '#005AFF' },
      { slug: 'suzuka',       name: 'Suzuka',              tagline: '5.807 km · Mie Prefecture, Japan',        color: '#FF6B35' },
      { slug: 'interlagos',   name: 'Interlagos',          tagline: '4.309 km · São Paulo, Brazil',            color: '#00A651' },
      { slug: 'bahrain',      name: 'Bahrain',             tagline: '5.412 km · Sakhir, Bahrain',              color: '#E0891A' },
      { slug: 'abu-dhabi',    name: 'Abu Dhabi',           tagline: '5.281 km · Yas Marina, UAE',              color: '#9B59B6' },
      { slug: 'jeddah',       name: 'Jeddah',              tagline: '6.174 km · Corniche Street Circuit, KSA', color: '#1E8A4C' },
      { slug: 'melbourne',    name: 'Melbourne',           tagline: '5.278 km · Albert Park, Australia',       color: '#003580' },
      { slug: 'shanghai',     name: 'Shanghai',            tagline: '5.451 km · China · since 2004',           color: '#DE2910' },
      { slug: 'miami',        name: 'Miami',               tagline: '5.412 km · Hard Rock Stadium, USA',       color: '#00B4D8' },
      { slug: 'imola',        name: 'Imola',               tagline: '4.909 km · Emilia-Romagna, Italy',        color: '#CC3300' },
      { slug: 'montreal',     name: 'Montreal',            tagline: '4.361 km · Circuit Gilles Villeneuve',    color: '#FF0000' },
      { slug: 'barcelona',    name: 'Barcelona',           tagline: '4.657 km · Catalunya, Spain',             color: '#FFCC00' },
      { slug: 'hungaroring',  name: 'Hungaroring',         tagline: '4.381 km · Mogyoród, Hungary',            color: '#CC0000' },
      { slug: 'zandvoort',    name: 'Zandvoort',           tagline: '4.259 km · North Holland, Netherlands',   color: '#FF6600' },
      { slug: 'baku',         name: 'Baku',                tagline: '6.003 km · Azerbaijan Street Circuit',    color: '#009999' },
      { slug: 'singapore',    name: 'Singapore',           tagline: '4.927 km · Marina Bay Street Circuit',    color: '#FF3300' },
      { slug: 'cota',         name: 'Circuit of the Americas', tagline: '5.513 km · Austin, Texas, USA',      color: '#003366' },
      { slug: 'mexico',       name: 'Mexico City',         tagline: '4.304 km · Hermanos Rodriguez, 2,238m alt',color: '#006847' },
      { slug: 'las-vegas',    name: 'Las Vegas',           tagline: '6.201 km · Las Vegas Strip Circuit',      color: '#CC9900' },
      { slug: 'qatar',        name: 'Qatar',               tagline: '5.419 km · Lusail International Circuit', color: '#8C1C13' },
    ],
  },
  '2': {
    label: 'f(2)', name: 'Formula 2', color: '#00E5FF',
    tier: 'TIER 2 · THE PROVING GROUND',
    description: 'Where the next generation earns the call-up. Every F1 champion must pass through.',
    drivers: [
      { slug: 'leclerc-f2',   name: 'Charles Leclerc',   tagline: 'F2 champion 2017 · Prema · → Ferrari F1',     color: '#DC0000' },
      { slug: 'russell-f2',   name: 'George Russell',    tagline: 'F2 champion 2018 · ART · wire-to-wire',       color: '#00D2BE' },
      { slug: 'schumacher-f2',name: 'Mick Schumacher',   tagline: 'F2 champion 2020 · Prema · Haas F1',          color: '#E8001C' },
      { slug: 'piastri-f2',   name: 'Oscar Piastri',     tagline: 'F2 champion 2021 · Prema · rookie title',     color: '#FF8000' },
      { slug: 'bortoleto',    name: 'Gabriel Bortoleto', tagline: 'F2 champion 2024 · Invicta · Sauber F1 2025', color: '#52E252' },
      { slug: 'bearman',      name: 'Oliver Bearman',    tagline: 'Haas F1 2025 · Prema F2 2023–24 · FDA',       color: '#B6BABD' },
      { slug: 'antonelli',    name: 'Kimi Antonelli',    tagline: 'Mercedes F1 2025 · Prema F2 2024 · P3',       color: '#00D2BE' },
      { slug: 'hadjar',       name: 'Isack Hadjar',      tagline: 'Red Bull F1 2025 · F2 runner-up 2024',        color: '#1E3A8A' },
      { slug: 'pourchaire',   name: 'Théo Pourchaire',   tagline: 'F2 champion 2023 · ART · Sauber reserve',     color: '#52E252' },
      { slug: 'drugovich',    name: 'Felipe Drugovich',  tagline: 'F2 champion 2022 · MP Motorsport',            color: '#006F62' },
    ],
    teams: [
      { slug: 'prema',           name: 'Prema Racing',        tagline: '6× F2 champion · graduate machine · Italy',    color: '#E8001C' },
      { slug: 'art',             name: 'ART Grand Prix',      tagline: '3× F2 champion · Russell · de Vries · Pourchaire', color: '#888888' },
      { slug: 'dams',            name: 'DAMS Lucas Oil',      tagline: 'French outfit · GP2 powerhouse · 2004–',        color: '#CC2200' },
      { slug: 'mp',              name: 'MP Motorsport',       tagline: 'Drugovich 2022 champion · Dutch squad',         color: '#FF6600' },
      { slug: 'invicta',         name: 'Invicta Racing',      tagline: 'Bortoleto 2024 champion · rebranded Virtuosi',   color: '#1199CC' },
      { slug: 'hitech',          name: 'Hitech TGR',          tagline: 'Red Bull partnership · F2 & F3 outfit',         color: '#CC0022' },
      { slug: 'trident',         name: 'Trident',             tagline: 'Italian outfit · F2 & F3 regular',              color: '#990000' },
      { slug: 'campos',          name: 'Campos Racing',       tagline: 'Spanish constructor · GP2 veteran',             color: '#002266' },
      { slug: 'rodin',           name: 'Rodin Motorsport',    tagline: 'New Zealand-backed outfit · F2 & F3',           color: '#CC3300' },
      { slug: 'vaf',             name: 'Van Amersfoort Racing', tagline: 'Dutch outfit · F2 & F3 · 2022–',              color: '#FF9900' },
    ],
    venues: [] as { slug: string; name: string; tagline: string; color: string }[],
  },
  '3': {
    label: 'f(3)', name: 'Formula 3', color: '#B026FF',
    tier: 'TIER 3 · THE FIRST RUNG',
    description: 'Where raw talent meets the pyramid for the first time. 30 drivers, 10 teams, zero margin.',
    drivers: [
      { slug: 'shwartzman-f3',  name: 'Robert Shwartzman',  tagline: 'F3 champion 2019 · Prema · Ferrari reserve',   color: '#DC0000' },
      { slug: 'piastri-f3',     name: 'Oscar Piastri',      tagline: 'F3 champion 2020 · Prema · → F2 → F1',        color: '#FF8000' },
      { slug: 'hauger-f3',      name: 'Dennis Hauger',      tagline: 'F3 champion 2021 · Prema · Red Bull Junior',   color: '#1E3A8A' },
      { slug: 'martins-f3',     name: 'Victor Martins',     tagline: 'F3 champion 2022 · ART · Alpine Academy',      color: '#0090FF' },
      { slug: 'bortoleto',      name: 'Gabriel Bortoleto',  tagline: 'F3 champion 2023 · Trident · → F2 champion',   color: '#52E252' },
      { slug: 'fornaroli-f3',   name: 'Leonardo Fornaroli', tagline: 'F3 champion 2024 · Trident · Italian prodigy', color: '#990000' },
    ],
    teams: [
      { slug: 'prema',   name: 'Prema Racing',   tagline: 'F3 dynasty · 4 titles 2019–2021, 2022 · Italy', color: '#E8001C' },
      { slug: 'trident', name: 'Trident',         tagline: '3× F3 champion · Bortoleto · Fornaroli · Câmara', color: '#990000' },
      { slug: 'art',     name: 'ART Grand Prix',  tagline: 'Martins 2022 · F3 & F2 · Belgian-French',       color: '#888888' },
      { slug: 'hitech',  name: 'Hitech TGR',      tagline: 'UK-based · F3 & F2 regular since 2018',          color: '#CC0022' },
      { slug: 'mp',      name: 'MP Motorsport',   tagline: 'Dutch outfit · F3 & F2 · Drugovich 2022',         color: '#FF6600' },
      { slug: 'campos',  name: 'Campos Racing',   tagline: 'Spanish veterans · F3 & F2 since 2010s',          color: '#002266' },
      { slug: 'vaf',     name: 'Van Amersfoort',  tagline: 'Dutch outfit · Verstappen alumni · F2 2022–',     color: '#FF9900' },
      { slug: 'rodin',   name: 'Rodin Motorsport',tagline: 'Formerly Carlin · NZ-backed · F3 & F2 2024–',     color: '#CC3300' },
    ],
    venues: [] as { slug: string; name: string; tagline: string; color: string }[],
  },
}

export type SeriesNum = keyof typeof SERIES_CONFIG

export function isSeriesNum(series: string): series is SeriesNum {
  return series === '1' || series === '2' || series === '3'
}

/* ─── Section pages ──────────────────────────────────────────────────────────── */

export type SeriesSection = 'news' | 'standings' | 'teams' | 'drivers' | 'eras' | 'venues'

export const SECTION_LABELS: Record<SeriesSection, string> = {
  news: 'NEWS',
  standings: 'STANDINGS',
  teams: 'TEAMS',
  drivers: 'DRIVERS',
  eras: 'ERAS',
  venues: 'VENUES',
}

/** Nav order; F2/F3 have no news, standings, eras, or venue data. */
export const SERIES_SECTIONS: Record<SeriesNum, SeriesSection[]> = {
  '1': ['news', 'standings', 'teams', 'drivers', 'eras', 'venues'],
  '2': ['teams', 'drivers'],
  '3': ['teams', 'drivers'],
}

/* ─── F2 data ────────────────────────────────────────────────────────────────── */

export const F2_CHAMPIONS = [
  { year: '2017', driver: 'Charles Leclerc',   team: 'Prema Racing',   teamColor: '#E8001C', dest: 'Ferrari',   destColor: '#DC0000' },
  { year: '2018', driver: 'George Russell',    team: 'ART Grand Prix', teamColor: '#888888', dest: 'Mercedes',  destColor: '#00D2BE' },
  { year: '2019', driver: 'Nyck de Vries',     team: 'ART Grand Prix', teamColor: '#888888', dest: 'Williams / AlphaTauri', destColor: '#005AFF' },
  { year: '2020', driver: 'Mick Schumacher',   team: 'Prema Racing',   teamColor: '#E8001C', dest: 'Haas',      destColor: '#B6BABD' },
  { year: '2021', driver: 'Oscar Piastri',     team: 'Prema Racing',   teamColor: '#E8001C', dest: 'McLaren',   destColor: '#FF8000' },
  { year: '2022', driver: 'Felipe Drugovich',  team: 'MP Motorsport',  teamColor: '#FF6600', dest: 'Aston Martin (reserve)', destColor: '#006F62' },
  { year: '2023', driver: 'Théo Pourchaire',   team: 'ART Grand Prix', teamColor: '#888888', dest: 'Sauber (reserve)', destColor: '#52E252' },
  { year: '2024', driver: 'Gabriel Bortoleto', team: 'Invicta Racing', teamColor: '#1199CC', dest: 'Sauber/Audi', destColor: '#52E252' },
]

/* ─── F3 data ────────────────────────────────────────────────────────────────── */

export const F3_CHAMPIONS = [
  { year: '2019', driver: 'Robert Shwartzman',  team: 'Prema Racing',   teamColor: '#E8001C' },
  { year: '2020', driver: 'Oscar Piastri',       team: 'Prema Racing',   teamColor: '#E8001C' },
  { year: '2021', driver: 'Dennis Hauger',       team: 'Prema Racing',   teamColor: '#E8001C' },
  { year: '2022', driver: 'Victor Martins',      team: 'ART Grand Prix', teamColor: '#888888' },
  { year: '2023', driver: 'Gabriel Bortoleto',   team: 'Trident',        teamColor: '#990000' },
  { year: '2024', driver: 'Leonardo Fornaroli',  team: 'Trident',        teamColor: '#990000' },
]
