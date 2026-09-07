export type F1EraDetail = {
  slug: string
  name: string
  years: string
  startYear: number
  endYear?: number
  color: string
  accent: string
  imageUrl: string
  drivers: string
  stat1: { label: string; value: string }
  stat2: { label: string; value: string }
  flavor: string
  overview: string[]
  techContext?: { label: string; value: string }[]
  keyDrivers: { name: string; slug?: string; note: string }[]
  definingMoments: { year: number; title: string; description: string; venueSlug?: string }[]
  dominantTeams?: { name: string; slug?: string; note: string }[]
  flagship?: boolean
}

export const F1_ERAS: F1EraDetail[] = [
  {
    slug: 'italian-supremacy',
    name: 'The Italian Supremacy',
    years: '1950–1961',
    startYear: 1950,
    endYear: 1961,
    color: '#DC0000',
    accent: '#9C0000',
    drivers: 'Fangio · Ascari · Hawthorn · Moss',
    stat1: { label: 'FANGIO', value: '5×' },
    stat2: { label: 'FERRARI TITLES', value: '4' },
    flavor: 'Alfa Romeo, Ferrari, Maserati — the championship born in Italian blood.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/1952-09-07_GP_Italia_Monza_Ferrari_500_F2_Villoresi_Ascari.jpg',
    overview: [
      'The first twelve seasons of the world championship were defined by Italian engineering and Latin flair. Alfa Romeo set the template in 1950–51; Ferrari became the permanent standard-bearer from 1952; Maserati and Cooper briefly interrupted the red hegemony before the era closed with Phil Hill\'s 1961 title.',
      'Fangio\'s five championships across four marques remain the statistical spine of this period — but the cultural spine is Ferrari at Monza, Ascari\'s back-to-back crowns, and a grid where nationality and constructor identity were inseparable.',
    ],
    keyDrivers: [
      { name: 'Juan Manuel Fangio', slug: 'fangio', note: '5× world champion · Alfa Romeo, Mercedes, Ferrari, Maserati' },
      { name: 'Alberto Ascari', note: 'Back-to-back titles 1952–53 · Ferrari' },
      { name: 'Stirling Moss', note: 'Never champion, but the era\'s benchmark privateer' },
    ],
    definingMoments: [
      { year: 1950, title: 'The first championship', description: 'Giuseppe Farina wins the inaugural title at Monza in an Alfa Romeo 158 — the sport\'s origin point.', venueSlug: 'monza' },
      { year: 1952, title: 'Ascari\'s Ferrari sweep', description: 'Alberto Ascari wins every race he finishes in the Ferrari 500, establishing Scuderia dominance.', venueSlug: 'monza' },
    ],
    dominantTeams: [
      { name: 'Ferrari', slug: 'ferrari', note: '4 drivers\' titles in this era' },
      { name: 'Alfa Romeo', note: 'Inaugural champions 1950–51' },
    ],
  },
  {
    slug: 'turbo-war',
    name: 'The Turbo War',
    years: '1977–1988',
    startYear: 1977,
    endYear: 1988,
    color: '#FF8700',
    accent: '#CC5500',
    drivers: 'Prost · Lauda · Piquet · Mansell',
    stat1: { label: 'TURBO TEAMS', value: '8' },
    stat2: { label: 'HP PEAK', value: '1,500+' },
    flavor: 'Forced induction chaos. Qualifying engines producing 1,500 horsepower. Never replicated.',
    imageUrl: '/images/drivers/prost-netherlands-1981.jpg',
    overview: [
      'Renault introduced the turbocharged V6 in 1977; by the mid-1980s, horsepower had escalated beyond anything the sport had seen before or since. Qualifying engines ran in "grenade" mode — full boost, minimal reliability, lap times that exist outside normal physics.',
      'Lauda, Prost, Piquet, and Mansell traded titles across Ferrari, McLaren, Williams, and Brabham. The era ended when McLaren\'s naturally aspirated Honda V10 annihilated the turbos in 1988 — Senna and Prost winning all but one race.',
    ],
    techContext: [
      { label: 'ENGINE TYPE', value: 'Turbo V6 / V8' },
      { label: 'QUALI HP PEAK', value: '~1,400–1,500' },
      { label: 'BOOST BAN', value: '1989' },
    ],
    keyDrivers: [
      { name: 'Alain Prost', slug: 'prost', note: '3 titles in turbo era · McLaren, Williams' },
      { name: 'Niki Lauda', slug: 'lauda', note: 'Comeback champion 1984 · McLaren' },
      { name: 'Nelson Piquet', note: '2 titles · Brabham, Williams' },
      { name: 'Nigel Mansell', slug: 'mansell', note: 'Williams dominance 1987, 1992' },
    ],
    definingMoments: [
      { year: 1984, title: 'Lauda beats Prost by half a point', description: 'Niki Lauda\'s final title — the closest margin in championship history.', venueSlug: 'monaco' },
      { year: 1986, title: 'Mansell\'s exploding tyre', description: 'Adelaide decider: Mansell\'s left-rear explodes at 180 mph, handing Prost the title.' },
      { year: 1988, title: 'McLaren\'s perfect season', description: 'Senna and Prost win 15 of 16 races — the turbo era\'s last rites.', venueSlug: 'monza' },
    ],
    dominantTeams: [
      { name: 'McLaren', slug: 'mclaren', note: 'Senna–Prost partnership 1988' },
      { name: 'Williams', slug: 'williams', note: 'Honda-powered titles 1987, 1992' },
      { name: 'Ferrari', slug: 'ferrari', note: 'Lauda titles 1977, 1979' },
    ],
  },
  {
    slug: 'schumacher-epoch',
    name: 'The Schumacher Epoch',
    years: '1994–2006',
    startYear: 1994,
    endYear: 2006,
    color: '#DC0000',
    accent: '#880000',
    drivers: 'Schumacher',
    stat1: { label: 'CONSECUTIVE TITLES', value: '5' },
    stat2: { label: 'CAREER WINS', value: '91' },
    flavor: 'Benetton. Then Ferrari. The most statistically dominant individual in motorsport history.',
    imageUrl: '/images/venues/monza-schumacher-2000.jpg',
    flagship: true,
    overview: [
      'Michael Schumacher arrived as a raw talent at Benetton and left as the reference point against which every subsequent champion is measured. Two titles with Benetton (1994, 1995) proved he could win anywhere; five consecutive Ferrari crowns (2000–2004) proved he could rebuild the sport\'s most famous team from a wilderness decade.',
      'The numbers are almost absurd: 91 grand prix wins, seven world championships, five straight titles with Ferrari — a run that included the F2002 and F2004, cars so dominant they redefined what "unbeatable" meant. Rivals like Häkkinen, Coulthard, and later Alonso and Räikkönen were not slow; they were simply in the wrong era.',
      'Schumacher\'s Ferrari years were as much about culture as car. Ross Brawn, Rory Byrne, and Jean Todt built a machine around one driver\'s relentless standards. Team orders, pit strategy, and qualifying discipline became weapons. When he retired the first time in 2006, he had already rewritten the record book.',
    ],
    techContext: [
      { label: 'SCHUMACHER TITLES', value: '7' },
      { label: 'FERRARI STREAK', value: '5 (2000–04)' },
      { label: 'CAREER WINS', value: '91' },
      { label: 'POLE POSITIONS', value: '68' },
    ],
    keyDrivers: [
      { name: 'Michael Schumacher', slug: 'schumacher', note: '7× world champion · Benetton, Ferrari' },
      { name: 'Fernando Alonso', slug: 'alonso', note: 'Ended the Ferrari streak · Renault 2005–06' },
      { name: 'Mika Häkkinen', note: 'McLaren champion 1998–99 · Schumacher\'s first great rival' },
    ],
    definingMoments: [
      { year: 1994, title: 'Adelaide collision', description: 'Schumacher and Hill collide at the final corner — Schumacher\'s first title by a single point.' },
      { year: 2000, title: 'Ferrari\'s drought ends', description: 'Schumacher wins at Suzuka to deliver Ferrari\'s first drivers\' title since 1979.', venueSlug: 'suzuka' },
      { year: 2002, title: 'The Austrian team orders', description: 'Barrichello yields at the line — the most controversial win of the five-year streak.' },
      { year: 2004, title: 'The F2004', description: '15 wins from 18 races. Arguably the most dominant single-season car in F1 history.', venueSlug: 'monza' },
    ],
    dominantTeams: [
      { name: 'Ferrari', slug: 'ferrari', note: '5 consecutive drivers\' titles 2000–04' },
      { name: 'Benetton', slug: 'benetton', note: 'Back-to-back titles 1994–95' },
      { name: 'Renault', slug: 'renault', note: 'Alonso interrupts the streak 2005–06' },
    ],
  },
  {
    slug: 'hybrid-dynasty',
    name: 'The Hybrid Dynasty',
    years: '2014–2020',
    startYear: 2014,
    endYear: 2020,
    color: '#00D2BE',
    accent: '#007A73',
    drivers: 'Hamilton · Rosberg',
    stat1: { label: 'MERCEDES TITLES', value: '7' },
    stat2: { label: 'HAMILTON WINS', value: '73' },
    flavor: 'Mercedes locked the hybrid formula. Seven consecutive constructors\' titles and six drivers\' crowns in seven seasons.',
    imageUrl: '/images/venues/bahrain-hamilton-2014.jpg',
    flagship: true,
    overview: [
      'The 2014 power-unit regulations were supposed to open the field. Instead, Mercedes-AMG built a turbo-hybrid so far ahead of the grid that the next seven seasons became a study in inevitability. Seven consecutive constructors\' championships, six drivers\' titles in seven years — all Mercedes.',
      'Lewis Hamilton won six of those drivers\' crowns, matching and then surpassing Schumacher\'s record. Nico Rosberg\'s 2016 title was the only interruption — won by three points after a season-long civil war that ended with Rosberg\'s shock retirement days later.',
      'The hybrid era was not just dominance; it was optimization. Mercedes mastered energy deployment, tyre management, and race strategy so thoroughly that "fight for P2" became the sport\'s running joke. Ferrari and Red Bull closed the gap by 2018–19 but could never sustain a full-season challenge.',
    ],
    techContext: [
      { label: 'POWER UNIT', value: '1.6L V6 Turbo-Hybrid' },
      { label: 'MERCEDES WCC', value: '7 straight (2014–20)' },
      { label: 'HAMILTON TITLES', value: '6 in era' },
      { label: 'FUEL FLOW LIMIT', value: '100 kg/hr' },
    ],
    keyDrivers: [
      { name: 'Lewis Hamilton', slug: 'hamilton', note: '6 titles in era · Mercedes' },
      { name: 'Nico Rosberg', slug: 'rosberg', note: '2016 champion · retired days after title' },
      { name: 'Sebastian Vettel', slug: 'vettel', note: 'Ferrari\'s closest challenger 2017–18' },
    ],
    definingMoments: [
      { year: 2014, title: 'Hamilton\'s hybrid coronation', description: 'Mercedes wins 16 of 19 races in the first turbo-hybrid season. Hamilton takes his second title.', venueSlug: 'bahrain' },
      { year: 2016, title: 'Rosberg vs Hamilton', description: 'Teammates collide in Spain; Rosberg wins the title in Abu Dhabi and immediately retires.', venueSlug: 'abu-dhabi' },
      { year: 2019, title: 'Hamilton\'s sixth', description: 'Hamilton seals title in Austin — one away from Schumacher\'s record of seven.', venueSlug: 'cota' },
    ],
    dominantTeams: [
      { name: 'Mercedes', slug: 'mercedes', note: '7× constructors\' champion 2014–20' },
      { name: 'Ferrari', slug: 'ferrari', note: 'Closest challenger, never sustained' },
      { name: 'Red Bull', slug: 'red-bull', note: 'Verstappen\'s rise begins 2016' },
    ],
  },
  {
    slug: 'red-bull-supremacy',
    name: 'Red Bull Supremacy',
    years: '2021–2023',
    startYear: 2021,
    endYear: 2023,
    color: '#1E3A8A',
    accent: '#0F2347',
    drivers: 'Verstappen',
    stat1: { label: 'VERSTAPPEN TITLES', value: '3' },
    stat2: { label: 'MAX WINS IN ERA', value: '54' },
    flavor: 'Ground-effect regulations. Verstappen\'s record-breaking 2023 season — 19 wins from 22 races.',
    imageUrl: '/images/venues/qatar-verstappen-wdc3-2023.jpg',
    overview: [
      'The 2022 ground-effect regulations were designed to promote closer racing. Red Bull Racing interpreted them better than anyone else on the grid. Max Verstappen seized a tense 2021 title fight with Hamilton, then proceeded to annihilate the record books.',
      '2023 was the statistical peak: 19 wins from 22 races, a 575-point margin in the championship, and a season so one-sided it prompted another round of regulatory soul-searching. Adrian Newey\'s RB19 was the car of the ground-effect era.',
    ],
    keyDrivers: [
      { name: 'Max Verstappen', slug: 'verstappen', note: '3× champion in era · Red Bull' },
      { name: 'Lewis Hamilton', slug: 'hamilton', note: '2021 title rival · Mercedes' },
      { name: 'Sergio Pérez', slug: 'perez', note: 'Supporting role · one win in 2023' },
    ],
    definingMoments: [
      { year: 2021, title: 'Abu Dhabi finale', description: 'Controversial late Safety Car restart — Verstappen passes Hamilton on the final lap for his first title.', venueSlug: 'abu-dhabi' },
      { year: 2023, title: '19 wins', description: 'Verstappen breaks his own win record in a season of near-total dominance.', venueSlug: 'qatar' },
    ],
    dominantTeams: [
      { name: 'Red Bull', slug: 'red-bull', note: '3× constructors\' champion 2022–24' },
      { name: 'Mercedes', slug: 'mercedes', note: '2021 title fight, then decline' },
    ],
  },
  {
    slug: 'mclaren-resurgence',
    name: 'The McLaren Resurgence',
    years: '2024–2025',
    startYear: 2024,
    endYear: 2025,
    color: '#FF8700',
    accent: '#CC5500',
    drivers: 'Norris · Piastri',
    stat1: { label: '2024 WCC', value: 'MCL' },
    stat2: { label: '2025 WDC', value: 'NOR' },
    flavor: 'McLaren reclaimed the front row — constructors\' champions in 2024, Norris drivers\' champion in 2025.',
    imageUrl: '/images/venues/miami-norris-2024.jpg',
    overview: [
      'After a decade in the wilderness, McLaren\'s wind-tunnel correction and aggressive development curve culminated in 2024 constructors\' championship — their first since 1998. Lando Norris and Oscar Piastri formed the grid\'s most balanced pairing.',
      'Norris\'s 2025 drivers\' title ended Red Bull\'s individual dominance and delivered McLaren their first drivers\' crown since Lewis Hamilton in 2008. The papaya era had fully returned.',
    ],
    keyDrivers: [
      { name: 'Lando Norris', slug: 'norris', note: '2025 world champion · McLaren' },
      { name: 'Oscar Piastri', slug: 'piastri', note: '2024 constructors\' co-architect' },
      { name: 'Max Verstappen', slug: 'verstappen', note: '2024 champion · pushed McLaren all season' },
    ],
    definingMoments: [
      { year: 2024, title: 'Miami breakthrough', description: 'Norris wins McLaren\'s first race since 2021 — the resurgence becomes real.', venueSlug: 'miami' },
      { year: 2024, title: 'Constructors\' champions', description: 'McLaren clinches their first WCC in 26 years.', venueSlug: 'singapore' },
      { year: 2025, title: 'Norris crowned', description: 'Lando Norris wins the drivers\' championship — McLaren\'s first since Hamilton 2008.' },
    ],
    dominantTeams: [
      { name: 'McLaren', slug: 'mclaren', note: '2024 WCC · 2025 WDC' },
      { name: 'Red Bull', slug: 'red-bull', note: '2024 WDC · Verstappen' },
    ],
  },
  {
    slug: '2026-regulations',
    name: 'The 2026 Regulations',
    years: '2026–',
    startYear: 2026,
    color: '#FF1E56',
    accent: '#CC0044',
    drivers: 'New grid · Cadillac',
    stat1: { label: 'NEW ENTRANT', value: 'CAD' },
    stat2: { label: 'ACTIVE AERO', value: 'ON' },
    flavor: 'Smaller cars, 50/50 power split, movable aerodynamics — and Cadillac\'s arrival as the 11th team on the grid.',
    imageUrl: '/images/drivers/perez-cadillac-2026.jpg',
    flagship: true,
    overview: [
      'The 2026 ruleset is the most radical technical reset since the hybrid introduction. Cars are shorter and narrower. Power units split electrical and combustion output roughly 50/50. Active aerodynamics — movable front and rear wings — replace the static downforce maps of the ground-effect era.',
      'Cadillac\'s arrival as the 11th team ends a decade of grid stability. Sergio Pérez leads the American entry alongside a field reshaped by Audi\'s takeover of Sauber, new driver line-ups, and a regulatory philosophy aimed at closer racing and lighter machinery.',
      'Whether the reset compresses the field or creates a new dynasty remains the central question of the era\'s opening seasons. The regulations are designed to reward energy management and adaptability — traits that may favour different teams than the ground-effect formula did.',
    ],
    techContext: [
      { label: 'CAR WIDTH', value: '-10 cm vs 2025' },
      { label: 'POWER SPLIT', value: '~50% electric' },
      { label: 'ACTIVE AERO', value: 'Front + rear' },
      { label: 'GRID TEAMS', value: '11' },
      { label: 'NEW ENTRANT', value: 'Cadillac' },
    ],
    keyDrivers: [
      { name: 'Sergio Pérez', slug: 'perez', note: 'Cadillac lead driver · 2026' },
      { name: 'Gabriel Bortoleto', slug: 'bortoleto', note: 'Audi F1 debutant' },
      { name: 'Max Verstappen', slug: 'verstappen', note: 'Red Bull continuity' },
      { name: 'Lando Norris', slug: 'norris', note: 'Defending champion' },
    ],
    definingMoments: [
      { year: 2026, title: 'Cadillac on the grid', description: 'Formula 1 returns to the United States as a full constructor for the first time since 2008.', venueSlug: 'miami' },
      { year: 2026, title: 'Active aero debut', description: 'Movable wings enter race trim — drivers manage drag and downforce lap by lap.' },
      { year: 2026, title: 'Audi era begins', description: 'Audi F1 Team joins the grid as a works manufacturer for the new regulation cycle.' },
    ],
    dominantTeams: [
      { name: 'Cadillac', slug: 'cadillac', note: 'New entrant · Pérez, Bottas' },
      { name: 'Audi F1 Team', slug: 'audi', note: 'Works debut · Bortoleto & Hülkenberg' },
      { name: 'McLaren', slug: 'mclaren', note: 'Defending constructors\' champions' },
    ],
  },
]

export const F1_ERA_BY_SLUG: Record<string, F1EraDetail> = Object.fromEntries(
  F1_ERAS.map(era => [era.slug, era]),
)

export function getEraNeighbors(slug: string) {
  const idx = F1_ERAS.findIndex(e => e.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? F1_ERAS[idx - 1] : null,
    next: idx < F1_ERAS.length - 1 ? F1_ERAS[idx + 1] : null,
  }
}
