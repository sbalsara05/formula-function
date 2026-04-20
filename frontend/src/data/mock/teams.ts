import type {
  Team,
  TeamStats,
  TeamEngineeringEra,
  TeamSignatureBar,
  TeamAcademyDriver,
  TeamIconicCar,
  ReelSlide,
  PremaStats,
  PremaGraduate,
  PremaCurrentSeason,
} from "@/lib/types";

/* ─── Ferrari ─────────────────────────────────────────────────────────────────
   All figures are ILLUSTRATIVE. Verify against official records before use.
   ─────────────────────────────────────────────────────────────────────────── */

export const ferrari: Team = {
  id: "ferrari",
  name: "Scuderia Ferrari",
  shortName: "Ferrari",
  country: "Italy",
  series: ["f1"],
  founded: 1950,
  current: true,
  entityColor: "ferrari",
  liveryHex: "#DC0000",
  bio: "The oldest and most storied constructor in Formula 1. The Scuderia has won more constructor championships than any other team and remains the emotional heart of the sport.",
  quote: "What's behind you doesn't matter.",
  quoteContext: "Enzo Ferrari",
};

export const ferrariStats: TeamStats = {
  teamId: "ferrari",
  constructorsTitles: 16,
  driversTitles: 15,
  wins: 243,
  podiums: 815,
  seasons: 75,
  firstSeason: 1950,
};

export const ferrariEras: TeamEngineeringEra[] = [
  {
    teamId: "ferrari",
    label: "Founding",
    seasons: "1950–1961",
    description:
      "Enzo Ferrari's vision realized. Front-engined dominance giving way to the mid-engined revolution. Championships with Ascari and the early greats.",
    championships: 3,
    driverNames: "ENZO · ASCARI · FANGIO",
    champLabel: "3× WDC",
  },
  {
    teamId: "ferrari",
    label: "Forghieri",
    seasons: "1962–1984",
    description:
      "Mauro Forghieri's engineering genius produced the flat-12 Ferrari — beautiful, powerful, and dominant with Lauda and Scheckter. A technical high-water mark.",
    championships: 4,
    driverNames: "LAUDA · SCHECKTER",
    champLabel: "4× WDC",
  },
  {
    teamId: "ferrari",
    label: "Wilderness",
    seasons: "1985–1995",
    description:
      "A prolonged drought as McLaren and Williams dominated. Barnard's transverse gearbox. Mansell's near-miss. Alesi and Berger fan favourites but silverware elusive.",
    championships: 0,
    driverNames: "PROST · MANSELL · ALESI",
    champLabel: "NO TITLES",
  },
  {
    teamId: "ferrari",
    label: "Todt · Brawn",
    seasons: "1996–2006",
    description:
      "Ross Brawn, Rory Byrne, Jean Todt, and Michael Schumacher. The most complete team in F1 history for a five-year stretch. Five consecutive constructors' titles.",
    championships: 6,
    driverNames: "SCHUMACHER · IRVINE · BARRICHELLO",
    champLabel: "5× WDC · 6× WCC",
    golden: true,
  },
  {
    teamId: "ferrari",
    label: "Post-Schumacher",
    seasons: "2007–",
    description:
      "Near-misses with Alonso (2010, 2012) and Vettel (2017–2018). Leclerc's emergence as an F1 generational talent. 2024: P2 WCC, 5 wins. 2025: Lewis Hamilton joins — the most anticipated partnership in the sport's history.",
    championships: 1,
    driverNames: "RÄIKKÖNEN · ALONSO · VETTEL · LECLERC · HAMILTON",
    champLabel: "1× WDC (RÄIKKÖNEN '07)",
    current: true,
  },
];

export const ferrariSignatureBars: TeamSignatureBar[] = [
  {
    label: "High-downforce bias",
    rating: "HIGH",
    value: 82,
    caption: "MONACO · HUNGARY · SINGAPORE",
    sentiment: "strength",
  },
  {
    label: "Straight-line efficiency",
    rating: "MODERATE",
    value: 58,
    caption: "HISTORICALLY TRAILED MERCEDES",
    sentiment: "neutral",
  },
  {
    label: "Qualifying pace",
    rating: "HIGH",
    value: 88,
    caption: "LECLERC ERA · 20+ POLES",
    sentiment: "strength",
  },
  {
    label: "Race pace conversion",
    rating: "MODERATE",
    value: 62,
    caption: "TIRE MANAGEMENT GAP",
    sentiment: "neutral",
  },
  {
    label: "Strategy execution",
    rating: "INCONSISTENT",
    value: 44,
    caption: "INFAMOUS PITWALL DECISIONS",
    sentiment: "weakness",
  },
  {
    label: "Wet-weather pace",
    rating: "HIGH",
    value: 78,
    caption: "MECHANICAL GRIP ADVANTAGE",
    sentiment: "strength",
  },
];

/* ─── Ferrari reel slides (chassis archive) ──────────────────────────────── */

export const ferrariReelSlides: ReelSlide[] = [
  {
    slotLabel: "CHASSIS 01",
    badge: "1952",
    glowColor: "#B00000",
    kicker: "FIRST ERA · ASCARI DOMINANCE",
    headline: "500 F2",
    meta: "2 TITLES · 14 WINS · 1952–53",
    svgPath:
      "M 88 140 Q 80 140 80 148 L 80 162 Q 80 170 88 170 L 312 170 Q 320 170 320 162 L 320 148 Q 320 140 312 140 Z",
    circles: [
      { cx: 115, cy: 182, r: 16, fill: "rgba(176,0,0,0.35)" },
      { cx: 285, cy: 182, r: 16, fill: "rgba(176,0,0,0.35)" },
    ],
  },
  {
    slotLabel: "CHASSIS 02",
    badge: "1975",
    glowColor: "#C00000",
    kicker: "FORGHIERI ERA · LAUDA REVIVAL",
    headline: "312T",
    meta: "TRANSVERSE GEARBOX · WDC 1975",
    svgPath:
      "M 80 170 L 130 170 Q 140 168 145 160 L 180 145 Q 200 140 220 145 L 255 160 Q 260 168 270 170 L 320 170",
    circles: [
      { cx: 125, cy: 185, r: 15, fill: "rgba(192,0,0,0.35)" },
      { cx: 275, cy: 185, r: 15, fill: "rgba(192,0,0,0.35)" },
    ],
  },
  {
    slotLabel: "CHASSIS 03",
    badge: "1990",
    glowColor: "#CF0000",
    kicker: "PROST ERA · TITLE NEAR-MISS",
    headline: "641",
    meta: "SIX WINS · P2 IN WDC",
    svgPath:
      "M 70 170 L 120 168 Q 135 165 150 155 L 180 140 Q 205 138 225 145 L 260 158 Q 275 165 285 168 L 330 170",
    circles: [
      { cx: 115, cy: 184, r: 14, fill: "rgba(207,0,0,0.35)" },
      { cx: 285, cy: 184, r: 14, fill: "rgba(207,0,0,0.35)" },
    ],
  },
  {
    slotLabel: "CHASSIS 04 · PEAK",
    badge: "2004",
    glowColor: "#FFD700",
    kicker: "ARGUABLY THE GREATEST F1 CAR",
    headline: "F2004",
    meta: "15 WINS FROM 18 · DOUBLE TITLE",
    svgPath:
      "M 60 172 L 110 168 Q 130 162 150 150 L 175 136 Q 205 132 230 140 L 260 155 Q 280 165 295 170 L 340 172",
    circles: [
      { cx: 110, cy: 187, r: 14, fill: "rgba(220,0,0,0.35)" },
      { cx: 290, cy: 187, r: 14, fill: "rgba(220,0,0,0.35)" },
    ],
  },
  {
    slotLabel: "CHASSIS 05",
    badge: "2008",
    glowColor: "#D00000",
    kicker: "LAST CONSTRUCTORS' TITLE · MASSA/RÄIKKÖNEN",
    headline: "F2008",
    meta: "WCC · MASSA LOST WDC BY 1 POINT",
    svgPath:
      "M 60 170 L 115 168 Q 135 163 150 150 L 180 138 Q 210 135 230 142 L 260 156 Q 280 164 295 168 L 340 170",
    circles: [
      { cx: 115, cy: 185, r: 14, fill: "rgba(208,0,0,0.35)" },
      { cx: 290, cy: 185, r: 14, fill: "rgba(208,0,0,0.35)" },
    ],
  },
  {
    slotLabel: "CHASSIS 06 · CURRENT",
    badge: "2025",
    glowColor: "#DC0000",
    kicker: "HAMILTON ERA · LECLERC/HAMILTON",
    headline: "SF-25",
    meta: "99% REDESIGNED · PULL-ROD FRONT SUSPENSION",
    svgPath:
      "M 55 170 L 118 165 Q 140 158 155 145 L 185 130 Q 215 128 238 138 L 268 154 Q 285 164 298 168 L 345 170",
    circles: [
      { cx: 115, cy: 185, r: 14, fill: "rgba(220,0,0,0.35)" },
      { cx: 290, cy: 185, r: 14, fill: "rgba(220,0,0,0.35)" },
    ],
  },
];

/* ─── Ferrari Driver Academy ─────────────────────────────────────────────── */

export const ferrariAcademy: TeamAcademyDriver[] = [
  { name: "Charles Leclerc",     tier: "f1",     note: "FDA '16 · RACE SEAT" },
  { name: "Lewis Hamilton",      tier: "f1",     note: "EXTERNAL · 7× WDC" },
  { name: "Oliver Bearman",      tier: "f1",     note: "FDA · HAAS 2025" },
  { name: "Dino Beganovic",      tier: "junior", note: "F2 2025 · HITECH" },
  { name: "Rafael Câmara",       tier: "junior", note: "F3 CHAMP 2025 · TRIDENT" },
  { name: "Tuukka Taponen",      tier: "junior", note: "F3 2025 · ART" },
  { name: "Maya Weug",           tier: "junior", note: "F1 ACADEMY 2025" },
  { name: "Jules Bianchi",       tier: "alumni", note: "'09–'15", deceased: true },
  { name: "Mick Schumacher",     tier: "alumni", note: "FDA '15–'17" },
  { name: "Lance Stroll",        tier: "alumni", note: "'10–'15" },
];

/* ─── Ferrari iconic cars ────────────────────────────────────────────────── */

export const ferrariIconicCars: TeamIconicCar[] = [
  { name: "500 F2", year: 1952, subtitle: "Ascari's dominance", meta: "2 TITLES · 14 WINS" },
  { name: "312T", year: 1975, subtitle: "Lauda's revival", meta: "TRANSVERSE GEARBOX" },
  { name: "F310B", year: 1997, subtitle: "Schumacher's first WDC fight", meta: "JEREZ '97" },
  { name: "F2002", year: 2002, subtitle: "Peak dominance begins", meta: "15 WINS FROM 17" },
  { name: "F2004", year: 2004, subtitle: "Arguably the greatest", meta: "DOUBLE TITLE · 15/18 WINS", peak: true },
  { name: "SF-25", year: 2025, subtitle: "Hamilton era begins", meta: "LECLERC / HAMILTON · 2025" },
];

/* ─── Red Bull ─────────────────────────────────────────────────────────────── */

export const redbull: Team = {
  id: "redbull",
  name: "Red Bull Racing",
  shortName: "Red Bull",
  country: "United Kingdom",
  series: ["f1"],
  founded: 2005,
  current: true,
  entityColor: "redbull",
  liveryHex: "#1E3A8A",
  bio: "The dominant force of the V8 turbo era and again through the 2020s. Adrian Newey's aerodynamic genius combined with Vettel's precision and later Verstappen's aggression.",
};

/* ─── Prema ────────────────────────────────────────────────────────────────── */

export const prema: Team = {
  id: "prema",
  name: "Prema Racing",
  shortName: "Prema",
  country: "Italy",
  series: ["f2", "f3"],
  founded: 1983,
  current: true,
  entityColor: "prema",
  liveryHex: "#E8001C",
  bio: "The dominant junior motorsport team of the modern era. Prema's F2 and F3 programs have produced more F1 graduates than any other junior team in the past decade.",
};

export const premaStats: PremaStats = {
  f2Titles: 6,
  f3TitlesSince2019: 5,
  f1Graduates: 14,
  f2Wins: 72,
  graduationRatePct: 44,
};

export const premaReelSlides: ReelSlide[] = [
  {
    slotLabel: "GRADUATE · 01",
    badge: "F2 CHAMPION",
    glowColor: "#DC0000",
    kicker: "F2 2017 · FDA · → FERRARI F1",
    headline: "Charles Leclerc",
    meta: "7 WINS · DOMINANT ROOKIE F2 SEASON",
    svgPath: "",
  },
  {
    slotLabel: "GRADUATE · 02",
    badge: "F2 CHAMPION",
    glowColor: "#00D2BE",
    kicker: "F2 2018 · MERC JR · → WILLIAMS · MERCEDES F1",
    headline: "George Russell",
    meta: "ROOKIE TITLE · WIRE-TO-WIRE",
    svgPath: "",
  },
  {
    slotLabel: "GRADUATE · 03",
    badge: "F2 CHAMPION",
    glowColor: "#FF8700",
    kicker: "F2 2021 · ALPINE ACADEMY · → McLAREN F1",
    headline: "Oscar Piastri",
    meta: "F3 '20 · F2 '21 · BACK-TO-BACK TITLES",
    svgPath: "",
  },
  {
    slotLabel: "GRADUATE · 04",
    badge: "F2 CHAMPION",
    glowColor: "#DC0000",
    kicker: "F2 2020 · FDA · → HAAS · WILLIAMS F1",
    headline: "Mick Schumacher",
    meta: "F3 '18 · F2 '20 · BACK-TO-BACK TITLES",
    svgPath: "",
  },
  {
    slotLabel: "GRADUATE · 05 · CURRENT",
    badge: "2024",
    glowColor: "#DC0000",
    kicker: "F2 2024 · FDA · → HAAS F1 2025",
    headline: "Oliver Bearman",
    meta: "F1 DEBUT SUB · SIGNED FOR 2025",
    svgPath: "",
  },
  {
    slotLabel: "GRADUATE · 06 · CURRENT",
    badge: "2025",
    glowColor: "#00D2BE",
    kicker: "F2 2024 P3 · MERC JR · → MERCEDES F1 2025",
    headline: "Kimi Antonelli",
    meta: "HAMILTON'S REPLACEMENT AT 18",
    svgPath: "",
  },
];

export const premaSignatureBars: TeamSignatureBar[] = [
  { label: "Qualifying setup", rating: "STRONG", value: 86, caption: "AVG Q POSITION P3.2", sentiment: "strength" },
  { label: "Race pace conversion", rating: "HIGH", value: 78, caption: "GAIN P0.4 AVG FROM GRID", sentiment: "strength" },
  { label: "Strategy aggression", rating: "CONSERVATIVE", value: 38, caption: "LOW-VARIANCE PIT CALLS", sentiment: "neutral" },
  { label: "Rookie conversion", rating: "EXCEPTIONAL", value: 92, caption: "ROOKIES REACH P5+ IN YEAR 1", sentiment: "strength" },
  { label: "Wet-weather execution", rating: "STRONG", value: 74, caption: "SETUP FLEX IN CHANGING CONDITIONS", sentiment: "neutral" },
  { label: "F1 graduation rate", rating: "BEST-IN-CLASS", value: 96, caption: "44% F2 GRADUATES REACH F1", sentiment: "strength" },
];

export const premaGraduates: PremaGraduate[] = [
  { name: "Charles Leclerc", f3Result: "—", f2Result: "CHAMP '17", graduatedTo: "Ferrari", graduatedToColor: "#DC0000", current: "Ferrari F1", currentColor: "#DC0000", status: "ACTIVE F1", statusColor: "#5FB87C" },
  { name: "George Russell", f3Result: "—", f2Result: "CHAMP '18", graduatedTo: "Williams", graduatedToColor: "#005AFF", current: "Mercedes F1", currentColor: "#00D2BE", status: "ACTIVE F1", statusColor: "#5FB87C" },
  { name: "Oscar Piastri", f3Result: "CHAMP '20", f2Result: "CHAMP '21", graduatedTo: "McLaren", graduatedToColor: "#FF8700", current: "McLaren F1", currentColor: "#FF8700", status: "ACTIVE F1", statusColor: "#5FB87C" },
  { name: "Mick Schumacher", f3Result: "CHAMP '18", f2Result: "CHAMP '20", graduatedTo: "Haas", graduatedToColor: "#B6BABD", current: "Merc Reserve", currentColor: "#00D2BE", status: "WEC", statusColor: "#FFD700" },
  { name: "Oliver Bearman", f3Result: "P3 '22", f2Result: "P4 '24", graduatedTo: "Haas 2025", graduatedToColor: "#B6BABD", current: "Haas F1", currentColor: "#B6BABD", status: "F1 ROOKIE", statusColor: "#5FB87C" },
  { name: "Kimi Antonelli", f3Result: "—", f2Result: "P3 '24", graduatedTo: "Mercedes 2025", graduatedToColor: "#00D2BE", current: "Mercedes F1", currentColor: "#00D2BE", status: "F1 ROOKIE", statusColor: "#5FB87C" },
  { name: "Frederik Vesti", f3Result: "P4 '21", f2Result: "P2 '23", graduatedTo: "Merc Jr", graduatedToColor: "#00D2BE", current: "WEC / FE", currentColor: "#666", status: "ENDURANCE", statusColor: "#888" },
  { name: "Robert Shwartzman", f3Result: "CHAMP '19", f2Result: "P2 '20", graduatedTo: "Ferrari Reserve", graduatedToColor: "#DC0000", current: "WEC Hypercar", currentColor: "#666", status: "ENDURANCE", statusColor: "#888" },
];

export const premaCurrentSeason: PremaCurrentSeason = {
  f2: [
    { name: "Gabriele Minì", academy: "ALPINE ACADEMY" },
    { name: "Dino Beganovic", academy: "FERRARI FDA" },
  ],
  f3: [
    { name: "Rafael Câmara", academy: "FERRARI FDA" },
    { name: "Sebastián Montoya", academy: "RED BULL JR" },
  ],
  f1Academy: [
    { name: "Maya Weug", academy: "FERRARI FDA" },
    { name: "Aurelia Nobels", academy: "FERRARI FDA" },
  ],
};

/* ─── Export index ────────────────────────────────────────────────────────── */

export const MOCK_TEAMS: Record<string, Team> = {
  ferrari,
  redbull,
  prema,
};
