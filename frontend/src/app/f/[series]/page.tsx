import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TeamLogo } from '@/components/constructors/TeamLogo'

/* ─── Championship history data ─────────────────────────────────────────────── */

const F1_CHAMPIONS = [
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
  { year: 2025, driver: 'Norris',     team: 'McLaren',    color: '#FF8000' },
]

const MULTI_CHAMPS = [
  { driver: 'Michael Schumacher', short: 'Schumacher', titles: 7, years: '1994–2004', color: '#DC0000', teams: 'BEN · FER', nat: '🇩🇪' },
  { driver: 'Lewis Hamilton',     short: 'Hamilton',   titles: 7, years: '2008–2020', color: '#00D2BE', teams: 'MCL · MER', nat: '🇬🇧' },
  { driver: 'Juan M. Fangio',     short: 'Fangio',     titles: 5, years: '1951–1957', color: '#9C0000', teams: 'ALF · MAS', nat: '🇦🇷' },
  { driver: 'Sebastian Vettel',   short: 'Vettel',     titles: 4, years: '2010–2013', color: '#1E3A8A', teams: 'RED',       nat: '🇩🇪' },
  { driver: 'Max Verstappen',     short: 'Verstappen', titles: 4, years: '2021–2024', color: '#1E3A8A', teams: 'RED',       nat: '🇳🇱' },
  { driver: 'Alain Prost',        short: 'Prost',      titles: 4, years: '1985–1993', color: '#FF8700', teams: 'MCL · WIL', nat: '🇫🇷' },
  { driver: 'Ayrton Senna',       short: 'Senna',      titles: 3, years: '1988–1991', color: '#E10600', teams: 'MCL',       nat: '🇧🇷' },
  { driver: 'Nelson Piquet',      short: 'Piquet',     titles: 3, years: '1981–1987', color: '#4A90D9', teams: 'BRA · WIL', nat: '🇧🇷' },
  { driver: 'Niki Lauda',         short: 'Lauda',      titles: 3, years: '1975–1984', color: '#DC0000', teams: 'FER · MCL', nat: '🇦🇹' },
  { driver: 'Jack Brabham',       short: 'Brabham',    titles: 3, years: '1959–1966', color: '#2E7D32', teams: 'COO · BRA', nat: '🇦🇺' },
]

const F1_ERAS = [
  {
    name: 'The Italian Supremacy',
    years: '1950–1961',
    color: '#DC0000',
    accent: '#9C0000',
    drivers: 'Fangio · Ascari · Hawthorn · Moss',
    stat1: { label: 'FANGIO', value: '5×' },
    stat2: { label: 'FERRARI TITLES', value: '4' },
    flavor: 'Alfa Romeo, Ferrari, Maserati — the championship born in Italian blood.',
  },
  {
    name: 'The Turbo War',
    years: '1977–1988',
    color: '#FF8700',
    accent: '#CC5500',
    drivers: 'Prost · Lauda · Piquet · Mansell',
    stat1: { label: 'TURBO TEAMS', value: '8' },
    stat2: { label: 'HP PEAK', value: '1,500+' },
    flavor: 'Forced induction chaos. Qualifying engines producing 1,500 horsepower. Never replicated.',
  },
  {
    name: 'The Schumacher Epoch',
    years: '1994–2006',
    color: '#DC0000',
    accent: '#880000',
    drivers: 'Schumacher',
    stat1: { label: 'CONSECUTIVE TITLES', value: '5' },
    stat2: { label: 'CAREER WINS', value: '91' },
    flavor: 'Benetton. Then Ferrari. The most statistically dominant individual in motorsport history.',
  },
  {
    name: 'The Hybrid Dynasty',
    years: '2014–present',
    color: '#00D2BE',
    accent: '#007A73',
    drivers: 'Hamilton · Verstappen · Norris',
    stat1: { label: 'HAMILTON WINS', value: '105' },
    stat2: { label: 'TITLES IN ERA', value: '12' },
    flavor: 'Mercedes then Red Bull, then McLaren. Twelve titles across the hybrid era — three separate dynasties in one technical generation.',
  },
]

/* ─── Constructor history ────────────────────────────────────────────────────── */

const W = 'https://en.wikipedia.org/wiki/Special:FilePath/'

const F1_CONSTRUCTORS = [
  // ── CURRENT GRID (2025) ──────────────────────────────────────────────────────
  { name: 'Scuderia Ferrari',        short: 'Ferrari',       abbr: 'FER', wcc: 16, active: '1950–',    color: '#DC0000', status: 'current', slug: 'ferrari' },
  { name: 'McLaren Racing',          short: 'McLaren',       abbr: 'MCL', wcc: 10, active: '1966–',    color: '#FF8700', status: 'current', slug: 'mclaren',       logo: W + 'McLaren_Racing_logo.svg' },
  { name: 'Mercedes-AMG Petronas',   short: 'Mercedes',      abbr: 'MER', wcc: 8,  active: '2010–',    color: '#00D2BE', status: 'current', slug: 'mercedes',      logo: W + 'Mercedes_AMG_Petronas_F1_Logo.svg' },
  { name: 'Williams Racing',         short: 'Williams',      abbr: 'WIL', wcc: 9,  active: '1977–',    color: '#005AFF', status: 'current', slug: 'williams' },
  { name: 'Red Bull Racing',         short: 'Red Bull',      abbr: 'RBR', wcc: 6,  active: '2005–',    color: '#1E3A8A', status: 'current', slug: 'red-bull' },
  { name: 'Aston Martin Aramco',     short: 'Aston Martin',  abbr: 'AMF', wcc: 0,  active: '2021–',    color: '#006F62', status: 'current', slug: 'aston-martin' },
  { name: 'BWT Alpine F1',           short: 'Alpine',        abbr: 'ALP', wcc: 2,  active: '2021–',    color: '#FF87BC', status: 'current', slug: 'alpine' },
  { name: 'MoneyGram Haas F1',       short: 'Haas',          abbr: 'HAA', wcc: 0,  active: '2016–',    color: '#B6BABD', status: 'current', slug: 'haas' },
  { name: 'Stake F1 / Sauber',       short: 'Sauber',        abbr: 'SAU', wcc: 0,  active: '1993–',    color: '#52E252', status: 'current', slug: 'sauber' },
  { name: 'Visa Cash App RB',        short: 'RB',            abbr: 'RB',  wcc: 0,  active: '2024–',    color: '#6692FF', status: 'current', slug: 'rb' },
  // ── RECENT DEFUNCT (2000–2023) ───────────────────────────────────────────────
  { name: 'Brawn GP',                short: 'Brawn GP',      abbr: 'BGP', wcc: 1,  active: '2009',     color: '#BFFF00', status: 'recent',  slug: 'brawn',         logo: W + 'Brawn_GP_logo.svg' },
  { name: 'AlphaTauri',              short: 'AlphaTauri',    abbr: 'AT',  wcc: 0,  active: '2020–23',  color: '#4E7C9B', status: 'recent',  slug: 'alphatauri' },
  { name: 'Scuderia Toro Rosso',     short: 'Toro Rosso',    abbr: 'STR', wcc: 0,  active: '2006–19',  color: '#5588AA', status: 'recent',  slug: 'toro-rosso' },
  { name: 'Force India / Racing Point', short: 'Force India', abbr: 'FIN', wcc: 0, active: '2008–20',  color: '#FF80C7', status: 'recent',  slug: 'force-india' },
  { name: 'Lotus F1 Team',           short: 'Lotus (2012)',  abbr: 'LOT', wcc: 0,  active: '2012–15',  color: '#FFD700', status: 'recent',  slug: 'lotus-2012' },
  { name: 'Manor / Marussia / Virgin', short: 'Manor',       abbr: 'MAN', wcc: 0,  active: '2010–16',  color: '#CC0000', status: 'recent',  slug: 'manor' },
  { name: 'Caterham F1',             short: 'Caterham',      abbr: 'CAT', wcc: 0,  active: '2012–14',  color: '#2E7D32', status: 'recent',  slug: 'caterham' },
  { name: 'HRT (Hispania Racing)',   short: 'HRT',           abbr: 'HRT', wcc: 0,  active: '2010–12',  color: '#AAAAAA', status: 'recent',  slug: 'hrt' },
  { name: 'BMW Sauber',              short: 'BMW Sauber',    abbr: 'BMW', wcc: 0,  active: '2006–09',  color: '#6699CC', status: 'recent',  slug: 'bmw-sauber' },
  { name: 'Toyota F1 Team',          short: 'Toyota',        abbr: 'TOY', wcc: 0,  active: '2002–09',  color: '#CC0000', status: 'recent',  slug: 'toyota' },
  { name: 'Super Aguri',             short: 'Super Aguri',   abbr: 'SA',  wcc: 0,  active: '2006–08',  color: '#AA0000', status: 'recent',  slug: 'super-aguri' },
  { name: 'Spyker / Midland / MF1',  short: 'Spyker',        abbr: 'SPY', wcc: 0,  active: '2005–07',  color: '#FF6600', status: 'recent',  slug: 'spyker' },
  { name: 'Jaguar Racing',           short: 'Jaguar',        abbr: 'JAG', wcc: 0,  active: '2000–04',  color: '#006400', status: 'recent',  slug: 'jaguar' },
  { name: 'BAR / Honda Racing',      short: 'BAR/Honda',     abbr: 'BAR', wcc: 0,  active: '1999–08',  color: '#888800', status: 'recent',  slug: 'bar-honda' },
  { name: 'Stewart Grand Prix',      short: 'Stewart',       abbr: 'STW', wcc: 0,  active: '1997–99',  color: '#C0C0C0', status: 'recent',  slug: 'stewart' },
  { name: 'Prost Grand Prix',        short: 'Prost GP',      abbr: 'PRO', wcc: 0,  active: '1997–01',  color: '#1565C0', status: 'recent',  slug: 'prost' },
  // ── HISTORIC (1970–2000) ─────────────────────────────────────────────────────
  { name: 'Team Lotus',              short: 'Lotus',         abbr: 'LOT', wcc: 7,  active: '1958–94',  color: '#FFD700', status: 'historic', slug: 'lotus' },
  { name: 'Williams F1',             short: 'Williams',      abbr: 'WIL', wcc: 9,  active: '1977–',    color: '#005AFF', status: 'historic', slug: 'williams' },
  { name: 'Brabham Racing',          short: 'Brabham',       abbr: 'BRA', wcc: 2,  active: '1962–92',  color: '#4A90D9', status: 'historic', slug: 'brabham' },
  { name: 'Tyrrell Racing',          short: 'Tyrrell',       abbr: 'TYR', wcc: 1,  active: '1970–98',  color: '#1565C0', status: 'historic', slug: 'tyrrell' },
  { name: 'Benetton Formula',        short: 'Benetton',      abbr: 'BEN', wcc: 1,  active: '1986–02',  color: '#009F6B', status: 'historic', slug: 'benetton' },
  { name: 'Renault F1',              short: 'Renault',       abbr: 'REN', wcc: 2,  active: '1977–11',  color: '#FFF500', status: 'historic', slug: 'renault' },
  { name: 'Jordan Grand Prix',       short: 'Jordan',        abbr: 'JOR', wcc: 0,  active: '1991–05',  color: '#F5C400', status: 'historic', slug: 'jordan' },
  { name: 'Ligier',                  short: 'Ligier',        abbr: 'LIG', wcc: 0,  active: '1976–96',  color: '#005AFF', status: 'historic', slug: 'ligier' },
  { name: 'Arrows / Footwork',       short: 'Arrows',        abbr: 'ARR', wcc: 0,  active: '1978–02',  color: '#FF6600', status: 'historic', slug: 'arrows' },
  { name: 'Toleman Motorsport',      short: 'Toleman',       abbr: 'TOL', wcc: 0,  active: '1981–85',  color: '#AA6600', status: 'historic', slug: 'toleman' },
  { name: 'Shadow Racing Cars',      short: 'Shadow',        abbr: 'SHA', wcc: 0,  active: '1973–80',  color: '#444444', status: 'historic', slug: 'shadow' },
  { name: 'Wolf Racing',             short: 'Wolf',          abbr: 'WOL', wcc: 0,  active: '1977–79',  color: '#884400', status: 'historic', slug: 'wolf' },
  { name: 'Hesketh Racing',          short: 'Hesketh',       abbr: 'HES', wcc: 0,  active: '1973–78',  color: '#CC3333', status: 'historic', slug: 'hesketh' },
  { name: 'Surtees Racing',          short: 'Surtees',       abbr: 'SUR', wcc: 0,  active: '1970–78',  color: '#CC6600', status: 'historic', slug: 'surtees' },
  { name: 'March Engineering',       short: 'March',         abbr: 'MAR', wcc: 0,  active: '1970–77',  color: '#CC6600', status: 'historic', slug: 'march' },
  { name: 'Ensign Racing',           short: 'Ensign',        abbr: 'ENS', wcc: 0,  active: '1973–82',  color: '#446600', status: 'historic', slug: 'ensign' },
  { name: 'Theodore Racing',         short: 'Theodore',      abbr: 'THE', wcc: 0,  active: '1978–83',  color: '#885500', status: 'historic', slug: 'theodore' },
  { name: 'ATS (Automobiltechnik)',   short: 'ATS',           abbr: 'ATS', wcc: 0,  active: '1977–84',  color: '#880000', status: 'historic', slug: 'ats' },
  { name: 'Osella Squadra Corse',    short: 'Osella',        abbr: 'OSE', wcc: 0,  active: '1980–90',  color: '#CC0044', status: 'historic', slug: 'osella' },
  { name: 'Zakspeed',                short: 'Zakspeed',      abbr: 'ZAK', wcc: 0,  active: '1985–89',  color: '#334455', status: 'historic', slug: 'zakspeed' },
  { name: 'Larrousse',               short: 'Larrousse',     abbr: 'LAR', wcc: 0,  active: '1987–94',  color: '#556677', status: 'historic', slug: 'larrousse' },
  { name: 'Minardi',                 short: 'Minardi',       abbr: 'MIN', wcc: 0,  active: '1985–05',  color: '#999922', status: 'historic', slug: 'minardi' },
  { name: 'Leyton House / March',    short: 'Leyton House',  abbr: 'LH',  wcc: 0,  active: '1987–92',  color: '#007755', status: 'historic', slug: 'leyton-house' },
  { name: 'Simtek Research',         short: 'Simtek',        abbr: 'SIM', wcc: 0,  active: '1994–95',  color: '#666666', status: 'historic', slug: 'simtek' },
  { name: 'Pacific Grand Prix',      short: 'Pacific',       abbr: 'PAC', wcc: 0,  active: '1994–95',  color: '#556699', status: 'historic', slug: 'pacific' },
  { name: 'Penske Racing',           short: 'Penske',        abbr: 'PEN', wcc: 0,  active: '1974–76',  color: '#C0C0C0', status: 'historic', slug: 'penske' },
  // ── EARLY ERA (1950–1970) ────────────────────────────────────────────────────
  { name: 'Alfa Romeo Corse',        short: 'Alfa Romeo',    abbr: 'ALF', wcc: 1,  active: '1950–51',  color: '#9C0000', status: 'early',   slug: 'alfa-romeo-50s' },
  { name: 'Cooper Car Company',      short: 'Cooper',        abbr: 'COO', wcc: 2,  active: '1950–69',  color: '#2E7D32', status: 'early',   slug: 'cooper' },
  { name: 'British Racing Motors',   short: 'BRM',           abbr: 'BRM', wcc: 1,  active: '1951–77',  color: '#1B5E20', status: 'early',   slug: 'brm' },
  { name: 'Vanwall',                 short: 'Vanwall',       abbr: 'VAN', wcc: 1,  active: '1954–60',  color: '#006400', status: 'early',   slug: 'vanwall' },
  { name: 'Officine Maserati',       short: 'Maserati',      abbr: 'MAS', wcc: 0,  active: '1950–60',  color: '#1A3A5C', status: 'early',   slug: 'maserati' },
  { name: 'Équipe Gordini',          short: 'Gordini',       abbr: 'GOR', wcc: 0,  active: '1950–56',  color: '#1188BB', status: 'early',   slug: 'gordini' },
  { name: 'Matra Sports',            short: 'Matra',         abbr: 'MAT', wcc: 1,  active: '1966–72',  color: '#1565C0', status: 'early',   slug: 'matra' },
  { name: 'Honda F1 (1960s)',        short: 'Honda \'64',    abbr: 'HON', wcc: 0,  active: '1964–68',  color: '#CC0000', status: 'early',   slug: 'honda-60s' },
  { name: 'All American Racers / Eagle', short: 'Eagle/AAR', abbr: 'EAG', wcc: 0,  active: '1966–69',  color: '#BB8800', status: 'early',   slug: 'eagle' },
  { name: 'Connaught Engineering',   short: 'Connaught',     abbr: 'CON', wcc: 0,  active: '1950–59',  color: '#558800', status: 'early',   slug: 'connaught' },
  { name: 'Porsche (F1)',            short: 'Porsche',       abbr: 'POR', wcc: 0,  active: '1961–62',  color: '#888800', status: 'early',   slug: 'porsche-f1' },
  { name: 'Lancia',                  short: 'Lancia',        abbr: 'LAN', wcc: 0,  active: '1954–55',  color: '#3344CC', status: 'early',   slug: 'lancia' },
  { name: 'HWM',                     short: 'HWM',           abbr: 'HWM', wcc: 0,  active: '1950–54',  color: '#554400', status: 'early',   slug: 'hwm' },
  { name: 'Talbot-Lago',             short: 'Talbot-Lago',   abbr: 'TAL', wcc: 0,  active: '1950–51',  color: '#336699', status: 'early',   slug: 'talbot-lago' },
]

/* ─── Series config ──────────────────────────────────────────────────────────── */

const SERIES_CONFIG = {
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

/* ─── Shared EntityCard ──────────────────────────────────────────────────────── */

function EntityCard({ href, type, name, tagline, entityColor, seriesColor }: {
  href: string; type: string; name: string; tagline: string; entityColor: string; seriesColor: string
}) {
  return (
    <Link href={href} style={{
      display: 'block', textDecoration: 'none', color: 'inherit',
      background: '#080808', border: '0.5px solid #1a1a1a',
      borderRadius: 8, padding: '20px 22px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 0% 50%, ${entityColor} 0%, transparent 50%)`,
        opacity: 0.06, pointerEvents: 'none',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 8, color: entityColor,
          background: entityColor + '18', border: `0.5px solid ${entityColor}44`,
          padding: '2px 7px', borderRadius: 3, letterSpacing: 1.5,
        }}>{type}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: seriesColor }}>→</span>
      </div>
      <p style={{ fontSize: 18, fontWeight: 400, color: '#fff', margin: '0 0 6px', letterSpacing: -0.5 }}>{name}</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: 0, letterSpacing: 0.5 }}>
        {tagline.toUpperCase()}
      </p>
    </Link>
  )
}

/* ─── Live standings helpers ─────────────────────────────────────────────────── */

interface DriverStandingRow {
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

interface ConstructorStandingRow {
  position: number
  constructorId: string
  name: string
  nationality: string
  points: string
  wins: string
}

interface LiveStandings {
  season: string
  round: string
  driverStandings: DriverStandingRow[]
  constructorStandings: ConstructorStandingRow[]
}

async function fetchLiveStandings(): Promise<LiveStandings | null> {
  try {
    const [dRes, cRes] = await Promise.all([
      fetch('https://api.jolpi.ca/ergast/f1/current/driverstandings.json', { next: { revalidate: 300 } }),
      fetch('https://api.jolpi.ca/ergast/f1/current/constructorstandings.json', { next: { revalidate: 300 } }),
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

const CONSTRUCTOR_COLORS: Record<string, string> = {
  ferrari: '#DC0000', mclaren: '#FF8000', mercedes: '#00D2BE', red_bull: '#1E3A8A',
  williams: '#005AFF', aston_martin: '#006F62', alpine: '#0090FF', haas: '#B6BABD',
  sauber: '#52E252', rb: '#6692FF', cadillac: '#C8A96E',
}

/* ─── F1 heritage page ───────────────────────────────────────────────────────── */

function F1LandingPage({ config, standings }: {
  config: typeof SERIES_CONFIG['1']
  standings: LiveStandings | null
}) {
  const decadeMarkers = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ── */}
      <header style={{
        padding: '1rem 1.75rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '0.5px solid #1a1a1a',
        background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/" style={{ textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, color: '#fff', letterSpacing: -0.5 }}>
            f(x)
          </Link>
          <span style={{ color: '#1a1a1a', fontFamily: 'var(--font-mono)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color }}>
            F(1) · FORMULA 1
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/f/1/driver/vettel" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1, textDecoration: 'none' }}>
            DRIVERS ↗
          </Link>
          <Link href="/f/1/team/ferrari" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1, textDecoration: 'none' }}>
            TEAMS ↗
          </Link>
          <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1, textDecoration: 'none' }}>
            ← ALL SERIES
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 1.75rem 4rem', minHeight: '55vh', display: 'flex', alignItems: 'center' }}>
        {/* Background glows */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 50%, #FF1E5615 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 30%, #FF1E5608 0%, transparent 50%)', pointerEvents: 'none' }} />
        {/* Diagonal rule lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }} aria-hidden="true">
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="#FF1E56" strokeWidth="1" />
          <line x1="-10%" y1="100%" x2="90%" y2="0" stroke="#FF1E56" strokeWidth="0.5" />
          <line x1="10%" y1="100%" x2="110%" y2="0" stroke="#FF1E56" strokeWidth="0.5" />
        </svg>

        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          {/* Left: identity */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: '#555', margin: '0 0 16px' }}>
              {config.tier}
            </p>
            <h1 style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(72px, 10vw, 130px)',
              fontWeight: 400, color: config.color, letterSpacing: -4, lineHeight: 0.9, margin: '0 0 20px',
            }}>
              f(1)
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: '#444', margin: '0 0 16px' }}>
              FORMULA 1 WORLD CHAMPIONSHIP
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 16, color: '#777', maxWidth: 420, lineHeight: 1.7, margin: 0,
            }}>
              {config.description}
            </p>
          </div>

          {/* Right: key stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a1a1a', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
            {[
              { value: '77', label: 'SEASONS' },
              { value: '35', label: 'CHAMPIONS' },
              { value: '1,171', label: 'GRANDS PRIX' },
              { value: '1950', label: 'INAUGURAL' },
            ].map(s => (
              <div key={s.label} style={{ background: '#060606', padding: '24px 28px' }}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 'clamp(28px, 3vw, 42px)',
                  fontWeight: 400, color: '#fff', letterSpacing: -1, margin: '0 0 6px', lineHeight: 1,
                }}>
                  {s.value}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 2, margin: 0 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Championship DNA strip ── */}
      <section style={{ borderTop: '0.5px solid #1a1a1a', borderBottom: '0.5px solid #1a1a1a' }}>
        <div style={{ padding: '14px 1.75rem 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#555', margin: 0 }}>
            CHAMPIONSHIP DNA · 1950–2025
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            EACH BAR = ONE SEASON · COLOR = CHAMPION'S CONSTRUCTOR
          </p>
        </div>
        <div style={{ padding: '0 1.75rem 0', position: 'relative' }}>
          {/* Year bars */}
          <div style={{ display: 'flex', gap: 2, height: 48, alignItems: 'stretch' }}>
            {F1_CHAMPIONS.map(c => (
              <div
                key={c.year}
                title={`${c.year} · ${c.driver} · ${c.team}`}
                style={{
                  flex: 1, background: c.color,
                  opacity: 0.85,
                  borderRadius: 1,
                  minWidth: 0,
                }}
              />
            ))}
          </div>
          {/* Decade markers */}
          <div style={{ display: 'flex', position: 'relative', height: 20, marginTop: 4 }}>
            {decadeMarkers.map(yr => {
              const idx = yr - 1950
              const pct = (idx / 75) * 100
              return (
                <span
                  key={yr}
                  style={{
                    position: 'absolute',
                    left: `${pct}%`,
                    fontFamily: 'var(--font-mono)', fontSize: 8,
                    color: '#444', letterSpacing: 0.5,
                    transform: 'translateX(-50%)',
                  }}
                >
                  {yr}
                </span>
              )
            })}
          </div>
        </div>
        {/* Legend */}
        <div style={{ padding: '12px 1.75rem 16px', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { label: 'Ferrari', color: '#DC0000' },
            { label: 'McLaren', color: '#FF8700' },
            { label: 'Williams', color: '#005AFF' },
            { label: 'Mercedes', color: '#00D2BE' },
            { label: 'Red Bull', color: '#1E3A8A' },
            { label: 'Lotus', color: '#FFD700' },
            { label: 'Other', color: '#555' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#444', letterSpacing: 1 }}>
                {l.label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Eras ── */}
      <section style={{ padding: '3rem 1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            THE ERAS
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            DEFINING CHAPTERS IN THE SPORT'S HISTORY
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {F1_ERAS.map(era => (
            <div key={era.name} style={{
              background: '#080808', border: '0.5px solid #1a1a1a',
              borderRadius: 10, padding: '28px 28px 24px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at 0% 0%, ${era.color}18 0%, transparent 55%)`,
                pointerEvents: 'none',
              }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: era.color, opacity: 0.6 }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: era.color, letterSpacing: 2, margin: '0 0 8px' }}>
                      {era.years}
                    </p>
                    <h3 style={{ fontSize: 20, fontWeight: 500, color: '#fff', margin: '0 0 8px', letterSpacing: -0.5 }}>
                      {era.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: 0, letterSpacing: 0.5 }}>
                      {era.drivers.toUpperCase()}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
                    {[era.stat1, era.stat2].map(s => (
                      <div key={s.label} style={{ textAlign: 'right' }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 400, color: era.color, margin: '0 0 2px', letterSpacing: -1, lineHeight: 1 }}>
                          {s.value}
                        </p>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#444', letterSpacing: 1, margin: 0 }}>
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, color: '#666', margin: 0, lineHeight: 1.6 }}>
                  {era.flavor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Legends ── */}
      <section style={{ padding: '0 1.75rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20, borderTop: '0.5px solid #1a1a1a', paddingTop: '2rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            MULTIPLE WORLD CHAMPIONS
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            {MULTI_CHAMPS.length} DRIVERS · 3+ TITLES
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
          {MULTI_CHAMPS.map((c, i) => (
            <div key={c.driver} style={{
              background: '#060606',
              border: `0.5px solid ${i < 2 ? c.color + '40' : '#1a1a1a'}`,
              borderRadius: 8, padding: '16px 14px', position: 'relative', overflow: 'hidden',
            }}>
              {i < 2 && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse at 50% 100%, ${c.color}18 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />
              )}
              <div style={{ position: 'relative' }}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 40, fontWeight: 400,
                  color: i < 2 ? c.color : i < 5 ? c.color + 'aa' : '#333',
                  margin: '0 0 6px', letterSpacing: -2, lineHeight: 1,
                }}>
                  {c.titles}×
                </p>
                <p style={{ fontSize: 13, fontWeight: 500, color: i < 5 ? '#ddd' : '#666', margin: '0 0 3px', letterSpacing: -0.3 }}>
                  {c.short}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#444', margin: '0 0 2px', letterSpacing: 0.5 }}>
                  {c.years}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#333', margin: 0, letterSpacing: 0.5 }}>
                  {c.teams}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Constructors ── */}
      <section style={{ padding: '0 1.75rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24, borderTop: '0.5px solid #1a1a1a', paddingTop: '2rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            CONSTRUCTORS
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            {F1_CONSTRUCTORS.length} TEAMS · ALL TIME
          </p>
        </div>

        {([
          { label: 'CURRENT GRID · 2025', key: 'current', cols: 5, cardPad: '16px 14px' },
          { label: 'RECENT · DEFUNCT POST-2000', key: 'recent', cols: 5, cardPad: '13px 12px' },
          { label: 'HISTORIC · 1970–2000', key: 'historic', cols: 6, cardPad: '11px 11px' },
          { label: 'EARLY ERA · 1950–1970', key: 'early', cols: 6, cardPad: '11px 11px' },
        ] as const).map(section => {
          const teams = F1_CONSTRUCTORS.filter(t => t.status === section.key)
          const isCurrent = section.key === 'current'
          return (
            <div key={section.key} style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 2, color: '#3a3a3a', margin: '0 0 10px' }}>
                {section.label}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${section.cols}, 1fr)`, gap: isCurrent ? 8 : 6 }}>
                {teams.map(t => (
                  <Link
                    key={t.slug}
                    href={`/f/1/team/${t.slug}`}
                    style={{
                      textDecoration: 'none', color: 'inherit',
                      background: isCurrent ? '#060606' : '#030303',
                      border: `0.5px solid ${t.wcc > 0 ? t.color + '38' : '#111'}`,
                      borderRadius: isCurrent ? 8 : 6,
                      padding: section.cardPad,
                      position: 'relative', overflow: 'hidden',
                      display: 'block',
                    }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: isCurrent ? 2 : 1.5, background: t.color, opacity: t.wcc > 0 ? 0.7 : 0.18 }} />
                    {t.wcc > 3 && (
                      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 0% 100%, ${t.color}10 0%, transparent 55%)`, pointerEvents: 'none' }} />
                    )}
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: isCurrent ? 8 : 5 }}>
                      <TeamLogo
                        logo={(t as { logo?: string }).logo}
                        abbr={t.abbr}
                        color={t.color}
                        size={isCurrent ? 36 : 28}
                      />
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: isCurrent ? (t.wcc > 0 ? 26 : 18) : (t.wcc > 0 ? 18 : 13),
                          fontWeight: 400,
                          color: t.wcc > 0 ? t.color : isCurrent ? '#2a2a2a' : '#1e1e1e',
                          margin: '0 0 3px', letterSpacing: -1, lineHeight: 1,
                        }}>
                          {t.wcc > 0 ? `${t.wcc}×` : '—'}
                        </p>
                        <p style={{
                          fontSize: isCurrent ? 11 : 9,
                          fontWeight: 500,
                          color: t.wcc > 4 ? '#ddd' : t.wcc > 0 ? '#aaa' : isCurrent ? '#444' : '#333',
                          margin: '0 0 2px', letterSpacing: -0.2,
                        }}>
                          {t.short}
                        </p>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: '#2a2a2a', margin: 0, letterSpacing: 0.3 }}>
                          {t.active}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* ── Live Standings ── */}
      {standings && (standings.driverStandings.length > 0 || standings.constructorStandings.length > 0) && (
        <section style={{ padding: '0 1.75rem 3rem', borderTop: '0.5px solid #1a1a1a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '2rem 0 20px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
              LIVE STANDINGS
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
              {standings.season} · ROUND {standings.round}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {/* Driver standings */}
            <div style={{ background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px 10px', borderBottom: '0.5px solid #1a1a1a', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#555' }}>DRIVERS</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333' }}>PTS</span>
              </div>
              <div style={{ maxHeight: 460, overflowY: 'auto' }}>
                {standings.driverStandings.map((d, i) => {
                  const teamColor = CONSTRUCTOR_COLORS[d.constructorId] ?? '#555'
                  return (
                    <Link
                      key={d.driverId}
                      href={`/f/1/driver/${d.driverId.replace(/_/g, '-')}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px',
                        borderBottom: i < standings.driverStandings.length - 1 ? '0.5px solid #111' : 'none',
                        textDecoration: 'none', color: 'inherit',
                        background: i === 0 ? teamColor + '0a' : 'transparent',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: i < 3 ? teamColor : '#444', minWidth: 20 }}>
                        P{d.position}
                      </span>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: i === 0 ? '#fff' : '#ccc' }}>
                          {d.lastName}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#444', marginLeft: 8, letterSpacing: 0.5 }}>
                          {d.constructorName.toUpperCase()}
                        </span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: i === 0 ? teamColor : '#666', fontWeight: i === 0 ? 500 : 400 }}>
                        {d.points}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
            {/* Constructor standings */}
            <div style={{ background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px 10px', borderBottom: '0.5px solid #1a1a1a', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#555' }}>CONSTRUCTORS</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333' }}>PTS</span>
              </div>
              {standings.constructorStandings.map((c, i) => {
                const teamColor = CONSTRUCTOR_COLORS[c.constructorId] ?? '#555'
                return (
                  <Link
                    key={c.constructorId}
                    href={`/f/1/team/${c.constructorId.replace(/_/g, '-')}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px',
                      borderBottom: i < standings.constructorStandings.length - 1 ? '0.5px solid #111' : 'none',
                      textDecoration: 'none', color: 'inherit',
                      background: i === 0 ? teamColor + '0a' : 'transparent',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: i < 3 ? teamColor : '#444', minWidth: 20 }}>
                      P{c.position}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ width: 3, height: 12, background: teamColor, display: 'inline-block', borderRadius: 1, marginRight: 8, verticalAlign: 'middle' }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: i === 0 ? '#fff' : '#ccc' }}>
                        {c.name}
                      </span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: i === 0 ? teamColor : '#666', fontWeight: i === 0 ? 500 : 400 }}>
                      {c.points}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Browse ── */}
      <section style={{ padding: '0 1.75rem 4rem', borderTop: '0.5px solid #1a1a1a' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: '2rem 0 16px' }}>
          BROWSE
        </p>
        {[
          { label: 'DRIVERS', items: config.drivers, type: 'DRIVER', seg: 'driver' },
          { label: 'TEAMS',   items: config.teams,   type: 'TEAM',   seg: 'team' },
          { label: 'VENUES',  items: config.venues,  type: 'VENUE',  seg: 'venue' },
        ].filter(s => s.items.length > 0).map(section => (
          <div key={section.label} style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#444', margin: '0 0 10px' }}>
              {section.label}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {section.items.map(item => (
                <EntityCard
                  key={item.slug}
                  href={`/f/1/${section.seg}/${item.slug}`}
                  type={section.type}
                  name={item.name}
                  tagline={item.tagline}
                  entityColor={item.color}
                  seriesColor={config.color}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Memorial ── */}
      <section style={{ padding: '2rem 1.75rem 3rem', borderTop: '0.5px solid #111', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#333', margin: '0 0 14px' }}>
          — IN MEMORIAM —
        </p>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, color: '#444', lineHeight: 2, margin: 0 }}>
          {['Bandini', 'Rindt', 'Peterson', 'Villeneuve', 'Paletti', 'Senna', 'Ratzenberger', 'Bianchi'].join('  ·  ')}
        </p>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: '1rem 1.75rem',
        borderTop: '0.5px solid #1a1a1a',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#333',
      }}>
        <span>f(x) · FORMULA 1</span>
        <span>PHASE 3 · DYNAMIC</span>
      </footer>
    </div>
  )
}

/* ─── F2 data ────────────────────────────────────────────────────────────────── */

const F2_CHAMPIONS = [
  { year: '2017', driver: 'Charles Leclerc',   team: 'Prema Racing',   teamColor: '#E8001C', dest: 'Ferrari',   destColor: '#DC0000' },
  { year: '2018', driver: 'George Russell',    team: 'ART Grand Prix', teamColor: '#888888', dest: 'Mercedes',  destColor: '#00D2BE' },
  { year: '2019', driver: 'Nyck de Vries',     team: 'ART Grand Prix', teamColor: '#888888', dest: 'Williams / AlphaTauri', destColor: '#005AFF' },
  { year: '2020', driver: 'Mick Schumacher',   team: 'Prema Racing',   teamColor: '#E8001C', dest: 'Haas',      destColor: '#B6BABD' },
  { year: '2021', driver: 'Oscar Piastri',     team: 'Prema Racing',   teamColor: '#E8001C', dest: 'McLaren',   destColor: '#FF8000' },
  { year: '2022', driver: 'Felipe Drugovich',  team: 'MP Motorsport',  teamColor: '#FF6600', dest: 'Aston Martin (reserve)', destColor: '#006F62' },
  { year: '2023', driver: 'Théo Pourchaire',   team: 'ART Grand Prix', teamColor: '#888888', dest: 'Sauber (reserve)', destColor: '#52E252' },
  { year: '2024', driver: 'Gabriel Bortoleto', team: 'Invicta Racing', teamColor: '#1199CC', dest: 'Sauber/Audi', destColor: '#52E252' },
]

/* ─── F2 landing page ────────────────────────────────────────────────────────── */

function F2LandingPage({ config }: { config: typeof SERIES_CONFIG['2'] }) {
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ── */}
      <header style={{
        padding: '1rem 1.75rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '0.5px solid #1a1a1a',
        background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/" style={{ textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, color: '#fff', letterSpacing: -0.5 }}>
            f(x)
          </Link>
          <span style={{ color: '#1a1a1a', fontFamily: 'var(--font-mono)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color }}>
            F(2) · FORMULA 2
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/f/2/driver/leclerc-f2" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1, textDecoration: 'none' }}>DRIVERS ↗</Link>
          <Link href="/f/2/team/prema" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1, textDecoration: 'none' }}>TEAMS ↗</Link>
          <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1, textDecoration: 'none' }}>← ALL SERIES</Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 1.75rem 4rem', minHeight: '52vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 50%, #00E5FF15 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 30%, #00E5FF08 0%, transparent 50%)', pointerEvents: 'none' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }} aria-hidden="true">
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="#00E5FF" strokeWidth="1" />
          <line x1="-10%" y1="100%" x2="90%" y2="0" stroke="#00E5FF" strokeWidth="0.5" />
          <line x1="10%" y1="100%" x2="110%" y2="0" stroke="#00E5FF" strokeWidth="0.5" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: '#555', margin: '0 0 16px' }}>
              {config.tier}
            </p>
            <h1 style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(72px, 10vw, 130px)',
              fontWeight: 400, color: config.color, letterSpacing: -4, lineHeight: 0.9, margin: '0 0 20px',
            }}>f(2)</h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: '#444', margin: '0 0 16px' }}>
              FIA FORMULA 2 CHAMPIONSHIP
            </p>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16, color: '#777', maxWidth: 420, lineHeight: 1.7, margin: 0 }}>
              {config.description}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a1a1a', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
            {[
              { value: '8', label: 'SEASONS' },
              { value: '8', label: 'CHAMPIONS' },
              { value: '11', label: 'TEAMS' },
              { value: '2017', label: 'INAUGURAL' },
            ].map(s => (
              <div key={s.label} style={{ background: '#060606', padding: '24px 28px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, color: '#fff', letterSpacing: -1, margin: '0 0 6px', lineHeight: 1 }}>
                  {s.value}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 2, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Championship DNA ── */}
      <section style={{ borderTop: '0.5px solid #1a1a1a', borderBottom: '0.5px solid #1a1a1a' }}>
        <div style={{ padding: '14px 1.75rem 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#555', margin: 0 }}>
            CHAMPIONSHIP DNA · 2017–2024
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            EACH BAR = ONE SEASON · COLOR = CHAMPION'S TEAM
          </p>
        </div>
        <div style={{ display: 'flex', height: 32, gap: 2, padding: '0 1.75rem 12px' }}>
          {F2_CHAMPIONS.map(c => (
            <div
              key={c.year}
              title={`${c.year}: ${c.driver} (${c.team})`}
              style={{
                flex: 1, background: c.teamColor, borderRadius: 2, opacity: 0.75,
                cursor: 'default', transition: 'opacity 0.15s',
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Graduate Machine ── */}
      <section style={{ padding: '3rem 1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, borderBottom: '0.5px solid #1a1a1a', paddingBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            THE GRADUATE MACHINE
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            ALL 8 F2 CHAMPIONS REACHED FORMULA 1
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {F2_CHAMPIONS.map(c => (
            <div key={c.year} style={{
              background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8,
              padding: '16px 18px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: c.teamColor, opacity: 0.7 }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1.5, margin: '0 0 8px' }}>
                {c.year} CHAMPION
              </p>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', margin: '0 0 4px', letterSpacing: -0.3 }}>
                {c.driver}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', margin: '0 0 10px', letterSpacing: 0.5 }}>
                {c.team.toUpperCase()}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#444' }}>→</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: c.destColor, letterSpacing: 0.5 }}>
                  {c.dest.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Series Context ── */}
      <section style={{ padding: '0 1.75rem 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, borderBottom: '0.5px solid #1a1a1a', paddingBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            SERIES IDENTITY
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            {
              label: 'SPEC SERIES',
              value: 'Dallara F2 2018',
              sub: '3.4L Mecachrome V6 · 620 hp · identical machinery',
              color: config.color,
            },
            {
              label: 'THE MANDATE',
              value: 'Prove it here',
              sub: 'Every F1 seat secured after a standout F2 campaign since 2017',
              color: '#888',
            },
            {
              label: 'PREMA DYNASTY',
              value: '3 of 8 titles',
              sub: 'Leclerc 2017, Schumacher 2020, Piastri 2021 — most dominant junior team',
              color: '#E8001C',
            },
          ].map(item => (
            <div key={item.label} style={{ background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '20px 22px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1.5, margin: '0 0 10px' }}>{item.label}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: item.color, letterSpacing: -0.5, margin: '0 0 8px', lineHeight: 1 }}>{item.value}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: 0, lineHeight: 1.6 }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Browse ── */}
      <section style={{ padding: '0 1.75rem 4rem', borderTop: '0.5px solid #1a1a1a' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: '2rem 0 16px' }}>
          BROWSE
        </p>
        {[
          { label: 'DRIVERS', items: config.drivers, type: 'DRIVER', seg: 'driver' },
          { label: 'TEAMS',   items: config.teams,   type: 'TEAM',   seg: 'team' },
        ].map(section => (
          <div key={section.label} style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#444', margin: '0 0 10px' }}>
              {section.label}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {section.items.map(item => (
                <EntityCard
                  key={item.slug}
                  href={`/f/2/${section.seg}/${item.slug}`}
                  type={section.type}
                  name={item.name}
                  tagline={item.tagline}
                  entityColor={item.color}
                  seriesColor={config.color}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: '1rem 1.75rem',
        borderTop: '0.5px solid #1a1a1a',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#333',
      }}>
        <span>f(x) · FORMULA 2</span>
        <span>PHASE 3 · DYNAMIC</span>
      </footer>
    </div>
  )
}

/* ─── F3 data ────────────────────────────────────────────────────────────────── */

const F3_CHAMPIONS = [
  { year: '2019', driver: 'Robert Shwartzman',  team: 'Prema Racing',   teamColor: '#E8001C' },
  { year: '2020', driver: 'Oscar Piastri',       team: 'Prema Racing',   teamColor: '#E8001C' },
  { year: '2021', driver: 'Dennis Hauger',       team: 'Prema Racing',   teamColor: '#E8001C' },
  { year: '2022', driver: 'Victor Martins',      team: 'ART Grand Prix', teamColor: '#888888' },
  { year: '2023', driver: 'Gabriel Bortoleto',   team: 'Trident',        teamColor: '#990000' },
  { year: '2024', driver: 'Leonardo Fornaroli',  team: 'Trident',        teamColor: '#990000' },
]

/* ─── F3 landing page ────────────────────────────────────────────────────────── */

function F3LandingPage({ config }: { config: typeof SERIES_CONFIG['3'] }) {
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ── */}
      <header style={{
        padding: '1rem 1.75rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '0.5px solid #1a1a1a',
        background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/" style={{ textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, color: '#fff', letterSpacing: -0.5 }}>
            f(x)
          </Link>
          <span style={{ color: '#1a1a1a', fontFamily: 'var(--font-mono)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color }}>
            F(3) · FORMULA 3
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/f/3/team/prema" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1, textDecoration: 'none' }}>TEAMS ↗</Link>
          <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1, textDecoration: 'none' }}>← ALL SERIES</Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 1.75rem 4rem', minHeight: '52vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 50%, #B026FF15 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 30%, #B026FF08 0%, transparent 50%)', pointerEvents: 'none' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }} aria-hidden="true">
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="#B026FF" strokeWidth="1" />
          <line x1="-10%" y1="100%" x2="90%" y2="0" stroke="#B026FF" strokeWidth="0.5" />
          <line x1="10%" y1="100%" x2="110%" y2="0" stroke="#B026FF" strokeWidth="0.5" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: '#555', margin: '0 0 16px' }}>
              {config.tier}
            </p>
            <h1 style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(72px, 10vw, 130px)',
              fontWeight: 400, color: config.color, letterSpacing: -4, lineHeight: 0.9, margin: '0 0 20px',
            }}>f(3)</h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: '#444', margin: '0 0 16px' }}>
              FIA FORMULA 3 CHAMPIONSHIP
            </p>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16, color: '#777', maxWidth: 420, lineHeight: 1.7, margin: 0 }}>
              {config.description}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a1a1a', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
            {[
              { value: '6', label: 'SEASONS' },
              { value: '6', label: 'CHAMPIONS' },
              { value: '10', label: 'TEAMS' },
              { value: '2019', label: 'INAUGURAL' },
            ].map(s => (
              <div key={s.label} style={{ background: '#060606', padding: '24px 28px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, color: '#fff', letterSpacing: -1, margin: '0 0 6px', lineHeight: 1 }}>
                  {s.value}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 2, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Championship DNA ── */}
      <section style={{ borderTop: '0.5px solid #1a1a1a', borderBottom: '0.5px solid #1a1a1a' }}>
        <div style={{ padding: '14px 1.75rem 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#555', margin: 0 }}>
            CHAMPIONSHIP DNA · 2019–2024
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            EACH BAR = ONE SEASON · COLOR = CHAMPION'S TEAM
          </p>
        </div>
        <div style={{ display: 'flex', height: 32, gap: 2, padding: '0 1.75rem 12px' }}>
          {F3_CHAMPIONS.map(c => (
            <div
              key={c.year}
              title={`${c.year}: ${c.driver} (${c.team})`}
              style={{ flex: 1, background: c.teamColor, borderRadius: 2, opacity: 0.75, cursor: 'default' }}
            />
          ))}
        </div>
      </section>

      {/* ── Champions Roll ── */}
      <section style={{ padding: '3rem 1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, borderBottom: '0.5px solid #1a1a1a', paddingBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            CHAMPIONS ROLL
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>2019 – 2024</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {F3_CHAMPIONS.map(c => (
            <div key={c.year} style={{
              background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8,
              padding: '16px 18px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: c.teamColor, opacity: 0.7 }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1.5, margin: '0 0 8px' }}>
                {c.year} CHAMPION
              </p>
              <p style={{ fontSize: 15, fontWeight: 500, color: '#fff', margin: '0 0 4px', letterSpacing: -0.3 }}>{c.driver}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', margin: 0, letterSpacing: 0.5 }}>
                {c.team.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Series Context ── */}
      <section style={{ padding: '0 1.75rem 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, borderBottom: '0.5px solid #1a1a1a', paddingBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            SERIES IDENTITY
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            {
              label: 'SPEC CHASSIS',
              value: 'Dallara F3 2025',
              sub: '3.4L naturally-aspirated Mecachrome · 30-car grid · 10 teams',
              color: config.color,
            },
            {
              label: 'THE MANDATE',
              value: 'Earn your stripes',
              sub: 'Raw talent vs spec machinery — the only variable is the driver',
              color: '#888',
            },
            {
              label: 'PREMA DOMINANCE',
              value: '3 of 6 titles',
              sub: 'Shwartzman 2019 · Piastri 2020 · Hauger 2021 — early-era dominance',
              color: '#E8001C',
            },
          ].map(item => (
            <div key={item.label} style={{ background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '20px 22px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1.5, margin: '0 0 10px' }}>{item.label}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: item.color, letterSpacing: -0.5, margin: '0 0 8px', lineHeight: 1 }}>{item.value}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: 0, lineHeight: 1.6 }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Browse ── */}
      <section style={{ padding: '0 1.75rem 4rem', borderTop: '0.5px solid #1a1a1a' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: '2rem 0 16px' }}>
          BROWSE
        </p>
        {[
          { label: 'DRIVERS', items: config.drivers, type: 'DRIVER', seg: 'driver' },
          { label: 'TEAMS',   items: config.teams,   type: 'TEAM',   seg: 'team' },
        ].map(section => (
          <div key={section.label} style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#444', margin: '0 0 10px' }}>
              {section.label}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {section.items.map(item => (
                <EntityCard
                  key={item.slug}
                  href={`/f/3/${section.seg}/${item.slug}`}
                  type={section.type}
                  name={item.name}
                  tagline={item.tagline}
                  entityColor={item.color}
                  seriesColor={config.color}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: '1rem 1.75rem',
        borderTop: '0.5px solid #1a1a1a',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#333',
      }}>
        <span>f(x) · FORMULA 3</span>
        <span>PHASE 3 · DYNAMIC</span>
      </footer>
    </div>
  )
}

/* ─── Route ──────────────────────────────────────────────────────────────────── */

export default async function SeriesLandingPage({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params
  const config = SERIES_CONFIG[series as keyof typeof SERIES_CONFIG]
  if (!config) notFound()

  if (series === '1') {
    const standings = await fetchLiveStandings()
    return <F1LandingPage config={config as typeof SERIES_CONFIG['1']} standings={standings} />
  }
  if (series === '2') {
    return <F2LandingPage config={config as typeof SERIES_CONFIG['2']} />
  }
  return <F3LandingPage config={config as typeof SERIES_CONFIG['3']} />
}
