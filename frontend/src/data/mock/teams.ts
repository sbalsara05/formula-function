import type {
  Team,
  TeamStats,
  TeamEngineeringEra,
  TeamSignatureBar,
  TeamAcademyDriver,
  TeamIconicCar,
  TeamKeyMoment,
  ReelSlide,
  PremaStats,
  PremaGraduate,
  PremaCurrentSeason,
} from "@/lib/types";

/* ─── Ferrari ─────────────────────────────────────────────────────────────────── */

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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Jody_Scheckter_1979_Monaco.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Jean_Alesi_Ferrari_1995.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/2002_Austrian_GP.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Kimi_Raikkonen_won_2007_Brazil_GP.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/97/1952-09-07_GP_Italia_Monza_Ferrari_500_F2_Villoresi_Ascari.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/26/Monaco_1975_-_Niky_Lauda.png",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/95/Mansell_in_his_Ferrari_641_-_1990_British_GP.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Michael_Schumacher_2004_Monaco.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/10/Felipe_Massa_2008_Brazilian_Grand_Prix.jpg",
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
    imageUrl: "https://formula1.wordpress.com/wp-content/uploads/2025/03/season2025_race2_saturday_3.webp",
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
  { name: "500 F2", year: 1952, subtitle: "Ascari's dominance", meta: "2 TITLES · 14 WINS", imageUrl: "https://live.staticflickr.com/4610/25113928057_a933b97165.jpg" },
  { name: "312T", year: 1975, subtitle: "Lauda's revival", meta: "TRANSVERSE GEARBOX", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/Lauda_and_Depailler_at_1975_Dutch_Grand_Prix.jpg" },
  { name: "F310B", year: 1997, subtitle: "Schumacher's first WDC fight", meta: "JEREZ '97", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Michael_Schumacher_1997_Italy.jpg" },
  { name: "F2002", year: 2002, subtitle: "Peak dominance begins", meta: "15 WINS FROM 17", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Mschumacher_2002.jpg" },
  { name: "F2004", year: 2004, subtitle: "Arguably the greatest", meta: "DOUBLE TITLE · 15/18 WINS", peak: true, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/Michael_Schumacher_win_2004.jpg" },
  { name: "SF-25", year: 2025, subtitle: "Hamilton era begins", meta: "LECLERC / HAMILTON · 2025", imageUrl: "https://formula1.wordpress.com/wp-content/uploads/2025/03/season2025_race1_friday_3.webp" },
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
  bio: "Eight world championships across two decades. From Newey's aerodynamic revolution in 2010 to Verstappen's dynasty in the 2020s, Red Bull Racing rewrote the record books twice in fifteen active seasons.",
};

export const redbullStats: TeamStats = {
  teamId: "redbull",
  constructorsTitles: 6,
  driversTitles: 8,
  wins: 130,
  podiums: 358,
  seasons: 22,
  firstSeason: 2005,
};

export const redbullEras: TeamEngineeringEra[] = [
  {
    teamId: "redbull",
    label: "Milton Keynes Rising",
    seasons: "2005–2009",
    description: "Jaguar's skeleton reborn under Dietrich Mateschitz and Christian Horner. David Coulthard hands off to Webber. Adrian Newey joins in 2006 and begins reshaping the operation. The RB5 wins six races in 2009 — the foundation is laid.",
    championships: 0,
    driverNames: "COULTHARD · WEBBER · VETTEL",
    champLabel: "NO TITLES · 6W IN 2009",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Sebastian_Vettel_%28Red_Bull_RB5%29_on_Saturday_at_2009_Abu_Dhabi_Grand_Prix2.jpg",
  },
  {
    teamId: "redbull",
    label: "The Newey–Vettel Epoch",
    seasons: "2010–2013",
    description: "Four consecutive Constructors' and Drivers' Championships. Newey's flexible front wings, blown diffusers, and revolutionary downforce concepts produced the most technically sophisticated cars of the naturally-aspirated V8 era. Vettel's 2013 season — 13 wins including nine consecutive — remains one of F1's most dominant single-season performances.",
    championships: 4,
    driverNames: "VETTEL · WEBBER",
    champLabel: "4× WDC · 4× WCC",
    golden: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/91/Sebastian_Vettel_won_2011_Formula_One_World_Drivers_Championship.jpg",
  },
  {
    teamId: "redbull",
    label: "Mercedes Shadow",
    seasons: "2014–2020",
    description: "The hybrid era began and Red Bull's Renault power unit left them exposed. Ricciardo's Monaco and Hungarian victories offered glimpses of old form. Gasly promoted, Albon inserted — neither could match Hamilton. The seeds of the Verstappen era, however, were already being sown in Toro Rosso.",
    championships: 0,
    driverNames: "RICCIARDO · KVYAT · VERSTAPPEN · GASLY · ALBON",
    champLabel: "NO TITLES · 23W",
    imageUrl: "https://formula1.wordpress.com/wp-content/uploads/2016/05/season2016_race5_wallpapers_11.jpg",
  },
  {
    teamId: "redbull",
    label: "Verstappen's Dynasty",
    seasons: "2021–",
    description: "Honda power, Newey's focused attention, and Verstappen at his ceiling. The 2021 finale at Abu Dhabi. The RB18's 17 wins. The RB19's record 21 victories from 22 races. Four consecutive World Championships for Max — equal to Vettel's own record set at this very team.",
    championships: 4,
    driverNames: "VERSTAPPEN · PÉREZ",
    champLabel: "4× WDC · 2× WCC",
    current: true,
    imageUrl: "https://formula1.wordpress.com/wp-content/uploads/2022/11/season2022_race22_sunday_9.jpg",
  },
];

export const redbullSignatureBars: TeamSignatureBar[] = [
  { label: "Downforce concept", rating: "EXCEPTIONAL", value: 97, caption: "NEWEY PHILOSOPHY · INDUSTRY BENCHMARK", sentiment: "strength" },
  { label: "High-speed cornering", rating: "CRITICAL", value: 95, caption: "SUSTAINED Gs THROUGH 130R · MAGGOTTS", sentiment: "strength" },
  { label: "Development pace", rating: "HIGH", value: 84, caption: "SEASON-LONG UPGRADE TRAJECTORY", sentiment: "strength" },
  { label: "Pit stop execution", rating: "STRONG", value: 81, caption: "SUB-2.0s STOPS · WORLD RECORD HOLDERS", sentiment: "strength" },
  { label: "Low-speed performance", rating: "MODERATE", value: 56, caption: "STREET CIRCUIT LIMITATION IN HYBRID ERA", sentiment: "neutral" },
  { label: "Driver retention", rating: "INCONSISTENT", value: 38, caption: "WEBBER · RICCIARDO · GASLY EXITS", sentiment: "weakness" },
];

export const redbullReelSlides: ReelSlide[] = [
  {
    slotLabel: "MV · 03",
    badge: "RECORD",
    glowColor: "#1E41BE",
    kicker: "2023 · 21 WINS FROM 22 STARTS",
    headline: "The RB19",
    meta: "MOST DOMINANT CAR IN F1 HISTORY",
    svgPath: "M 55 172 L 112 166 Q 135 158 148 148 L 182 136 Q 210 134 234 144 L 270 158 Q 285 165 293 168 L 345 168",
    circles: [
      { cx: 108, cy: 183, r: 14, fill: "rgba(30,65,190,0.40)" },
      { cx: 288, cy: 183, r: 14, fill: "rgba(30,65,190,0.40)" },
    ],
    videoId: "fwI_ZN396v8",
    videoStart: 0,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/60/FIA_F1_Austria_2023_Race_%281%29.jpg",
  },
  {
    slotLabel: "MV · 01",
    badge: "1ST WDC",
    glowColor: "#1E41BE",
    kicker: "ABU DHABI · 2021 · FINAL LAP",
    headline: "Verstappen takes F1",
    meta: "RB16B · HAMILTON PITTED · LAST-LAP OVERTAKE",
    svgPath: "M 65 168 L 118 166 Q 138 161 150 153 L 183 143 Q 207 141 228 148 L 262 160 Q 276 165 284 168 L 335 168",
    circles: [
      { cx: 113, cy: 183, r: 14, fill: "rgba(30,65,190,0.35)" },
      { cx: 280, cy: 183, r: 14, fill: "rgba(30,65,190,0.35)" },
    ],
    imageUrl: "https://formula1.wordpress.com/wp-content/uploads/2021/12/season2021_race22_sunday_10.jpg",
  },
  {
    slotLabel: "SV · 01",
    badge: "1ST WDC",
    glowColor: "#1E3A8A",
    kicker: "ABU DHABI · 2010 · YOUNGEST EVER CHAMPION",
    headline: "Vettel, champion",
    meta: "RB6 · AGE 23 · NEWEY'S FIRST TITLE",
    svgPath: "M 68 168 L 118 166 Q 136 162 148 153 L 182 144 Q 206 141 228 148 L 262 160 Q 276 166 284 168 L 332 168",
    circles: [
      { cx: 113, cy: 183, r: 14, fill: "rgba(30,58,138,0.35)" },
      { cx: 278, cy: 183, r: 14, fill: "rgba(30,58,138,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d8/RedBull_Racing_-_Sebastian_Vettel_%285177791003%29.jpg",
  },
  {
    slotLabel: "SV · 04",
    badge: "4TH WDC",
    glowColor: "#1E3A8A",
    kicker: "INDIA · 2013 · 9 CONSECUTIVE WINS",
    headline: "Four in a row",
    meta: "RB9 · 13 WINS · EQUAL TO FANGIO",
    svgPath: "M 58 168 L 114 164 Q 136 158 148 149 L 180 138 Q 208 136 232 145 L 267 158 Q 282 165 290 168 L 342 168",
    circles: [
      { cx: 110, cy: 183, r: 14, fill: "rgba(30,58,138,0.35)" },
      { cx: 285, cy: 183, r: 14, fill: "rgba(30,58,138,0.35)" },
    ],
    imageUrl: "https://formula1.wordpress.com/wp-content/uploads/2013/10/season2013_race16_wallpapers_12.jpg",
  },
  {
    slotLabel: "SV · MW",
    badge: "CONTROVERSY",
    glowColor: "#FF5500",
    kicker: "MALAYSIA · 2013 · LAP 46",
    headline: "Multi 21",
    meta: "VETTEL DEFIES TEAM ORDERS · WEBBER FURIOUS",
    svgPath: "M 60 155 Q 130 155, 185 165 L 215 165 Q 270 172, 340 175 M 60 182 Q 130 182, 185 165 L 215 165 Q 270 155, 340 148",
    circles: [
      { cx: 210, cy: 165, r: 9, fill: "rgba(255,85,0,0.55)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Malaysia_F1_GP_2013_%289165779965%29.jpg",
  },
];

export const redbullAcademy: TeamAcademyDriver[] = [
  { name: "Max Verstappen",   tier: "f1",     note: "RED BULL 2016– · 4× WDC" },
  { name: "Isack Hadjar",     tier: "f1",     note: "RED BULL 2026 · RBJ GRADUATE" },
  { name: "Liam Lawson",      tier: "f1",     note: "RACING BULLS 2025–26 · RBJ" },
  { name: "Arvid Lindblad",   tier: "f1",     note: "RACING BULLS 2026 · RBJ" },
  { name: "Yuki Tsunoda",     tier: "alumni", note: "RACING BULLS 2021–24 · RED BULL 2025" },
  { name: "Sebastian Vettel", tier: "alumni", note: "RBR 2009–14 · 4× WDC" },
  { name: "Daniel Ricciardo", tier: "alumni", note: "2014–18 · 7 WINS" },
  { name: "Mark Webber",      tier: "alumni", note: "2007–13 · 9 WINS" },
  { name: "Pierre Gasly",     tier: "alumni", note: "→ ALPINE 2022" },
  { name: "Carlos Sainz Jr.", tier: "alumni", note: "TORO ROSSO 2015–17" },
  { name: "Alex Albon",       tier: "alumni", note: "→ WILLIAMS 2022" },
];

export const redbullIconicCars: TeamIconicCar[] = [
  {
    name: "RB5",
    year: 2009,
    subtitle: "First victories",
    meta: "VETTEL · WEBBER · 6W · P2 WCC",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/2009_Formula_1_Grand_Prix_of_China_-_Shanghai_Circuit_%283479067883%29.jpg",
  },
  {
    name: "RB6",
    year: 2010,
    subtitle: "First championship",
    meta: "VETTEL 5W · WEBBER 4W · 1ST WCC",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Vettel_abu_dabi_2010.jpg",
  },
  {
    name: "RB9",
    year: 2013,
    subtitle: "Nine straight wins",
    meta: "13W · 9 CONSECUTIVE · 4TH WDC",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3b/2013_Italian_GP_-_Vettel.jpg",
  },
  {
    name: "RB16B",
    year: 2021,
    subtitle: "Verstappen's coronation",
    meta: "11W · ABU DHABI FINAL LAP · 1ST WDC",
    imageUrl: "https://formula1.wordpress.com/wp-content/uploads/2021/12/season2021_race22_sunday_12.jpg",
  },
  {
    name: "RB19",
    year: 2023,
    subtitle: "The destroyer",
    meta: "21W FROM 22 · MOST DOMINANT EVER",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/60/FIA_F1_Austria_2023_Race_%281%29.jpg",
  },
];

export const redbullKeyMoments: TeamKeyMoment[] = [
  {
    videoId: "MTe12fH2xtQ",
    title: "Verstappen overtakes Hamilton on the final lap",
    year: 2021,
    label: "ABU DHABI · FINAL LAP",
    badge: "1ST WDC",
  },
  {
    videoId: "z34G8Qv4ZiM",
    title: "Vettel clinches his maiden world title",
    year: 2010,
    label: "ABU DHABI · YOUNGEST EVER",
    badge: "1ST WDC",
  },
  {
    videoId: "jU_G4fEpaCQ",
    title: "Multi-21 — Vettel defies team orders",
    year: 2013,
    label: "MALAYSIA · LAP 46",
    badge: "CONTROVERSY",
  },
];

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
  f1Graduates: 16,
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
    slotLabel: "GRADUATE · 05",
    badge: "F1 2025",
    glowColor: "#B6BABD",
    kicker: "F2 2024 · FDA · HAAS F1 2025",
    headline: "Oliver Bearman",
    meta: "F2 P4 · HAAS RACE DRIVER FROM ROUND 1",
    svgPath: "",
  },
  {
    slotLabel: "GRADUATE · 06",
    badge: "F1 2025",
    glowColor: "#00D2BE",
    kicker: "F2 2024 P3 · MERC JR · MERCEDES F1 2025",
    headline: "Kimi Antonelli",
    meta: "HAMILTON'S REPLACEMENT AT 18 · YOUNGEST MERCEDES STARTER",
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
  { name: "Oliver Bearman", f3Result: "P3 '22", f2Result: "P4 '24", graduatedTo: "Haas 2025", graduatedToColor: "#B6BABD", current: "Haas F1", currentColor: "#B6BABD", status: "ACTIVE F1", statusColor: "#5FB87C" },
  { name: "Kimi Antonelli", f3Result: "—", f2Result: "P3 '24", graduatedTo: "Mercedes 2025", graduatedToColor: "#00D2BE", current: "Mercedes F1", currentColor: "#00D2BE", status: "ACTIVE F1", statusColor: "#5FB87C" },
  { name: "Frederik Vesti", f3Result: "P4 '21", f2Result: "P2 '23", graduatedTo: "Merc Jr", graduatedToColor: "#00D2BE", current: "WEC / FE", currentColor: "#666", status: "ENDURANCE", statusColor: "#888" },
  { name: "Robert Shwartzman", f3Result: "CHAMP '19", f2Result: "P2 '20", graduatedTo: "Ferrari Reserve", graduatedToColor: "#DC0000", current: "WEC Hypercar", currentColor: "#666", status: "ENDURANCE", statusColor: "#888" },
];

export const premaCurrentSeason: PremaCurrentSeason = {
  f2: [
    { name: "Gabriele Minì", academy: "ALPINE ACADEMY" },
    { name: "Sebastián Montoya", academy: "RED BULL JR" },
  ],
  f3: [
    { name: "Ugo Ugochukwu", academy: "McLAREN ACADEMY" },
    { name: "Brando Badoer", academy: "McLAREN ACADEMY" },
    { name: "Noel Leon", academy: "INDEPENDENT" },
  ],
  f1Academy: [
    { name: "Maya Weug", academy: "FERRARI FDA" },
    { name: "Aurelia Nobels", academy: "FERRARI FDA" },
  ],
};

/* ─── McLaren ─────────────────────────────────────────────────────────────── */

export const mclaren: Team = {
  id: "mclaren",
  name: "McLaren F1 Team",
  shortName: "McLaren",
  country: "United Kingdom",
  series: ["f1"],
  founded: 1966,
  current: true,
  entityColor: "mclaren",
  liveryHex: "#FF8700",
  bio: "Founded by Bruce McLaren and sustained by an obsession with excellence, McLaren has won eight Constructors' Championships and twelve Drivers' titles across six decades. The Senna–Prost era defined team dominance; the 2024 Constructors' title — their first in 26 years — confirmed the Woking renaissance.",
  quote: "Life is measured in achievement, not in years alone.",
  quoteContext: "Bruce McLaren, 1937–1970",
};

export const mclarenStats: TeamStats = {
  teamId: "mclaren",
  constructorsTitles: 8,
  driversTitles: 12,
  wins: 183,
  podiums: 514,
  seasons: 59,
  firstSeason: 1966,
};

export const mclarenEras: TeamEngineeringEra[] = [
  {
    teamId: "mclaren",
    label: "Bruce & Hunt",
    seasons: "1963–1980",
    description:
      "Bruce McLaren built the team that bore his name. Emerson Fittipaldi's 1974 WDC. Then the mythic 1976 season — James Hunt vs. Lauda, a title decided in the Japanese rain at Mount Fuji by half a point.",
    championships: 3,
    driverNames: "BRUCE McLAREN · FITTIPALDI · HUNT",
    champLabel: "3× WDC",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/Hunt_at_1976_Dutch_Grand_Prix.jpg",
  },
  {
    teamId: "mclaren",
    label: "Marlboro Domination",
    seasons: "1981–1993",
    description:
      "The greatest team in Formula 1 history for a ten-year stretch. Lauda's 1984 half-point title. Seven WDCs across a decade. The MP4/4 wins 15 of 16 races in 1988. Senna and Prost: the defining partnership — and rivalry — of the sport.",
    championships: 7,
    driverNames: "LAUDA · PROST · SENNA",
    champLabel: "7× WDC",
    golden: true,
  },
  {
    teamId: "mclaren",
    label: "Häkkinen · Coulthard",
    seasons: "1994–2001",
    description:
      "Mika Häkkinen's comeback from an Adelaide crash that nearly killed him. Back-to-back WDCs in 1998 and 1999. Coulthard's consistent brilliance. A silver and chrome era defined by precision and a rivalry with Ferrari's Schumacher machine.",
    championships: 2,
    driverNames: "HÄKKINEN · COULTHARD",
    champLabel: "2× WDC",
  },
  {
    teamId: "mclaren",
    label: "Hamilton Years",
    seasons: "2007–2013",
    description:
      "Lewis Hamilton arrived as a rookie and nearly won the title. He did in 2008 by one point in the final lap of the final race. Button joined for a complementary partnership. Alonso returned. Never quite dominant again, but never without drama.",
    championships: 2,
    driverNames: "HAMILTON · BUTTON · ALONSO",
    champLabel: "2× WDC",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Lewis_Hamilton_2007.jpg",
  },
  {
    teamId: "mclaren",
    label: "Norris · Piastri",
    seasons: "2021–",
    description:
      "The rebuilding was complete. Norris's maiden win at Miami 2024. Piastri in Hungary. Six race wins between them. The 2024 Constructors' Championship — McLaren's first in 26 years — confirmed the Woking resurgence was real.",
    championships: 1,
    driverNames: "NORRIS · PIASTRI",
    champLabel: "1× WCC",
    current: true,
    imageUrl: "https://formula1.wordpress.com/wp-content/uploads/2024/12/season2024_race24_thursday_6.jpg",
  },
];

export const mclarenSignatureBars: TeamSignatureBar[] = [
  { label: "Qualifying pace", rating: "EXCEPTIONAL", value: 94, caption: "SENNA 65 POLES · NORRIS Q3 CONSISTENCY", sentiment: "strength" },
  { label: "Race pace", rating: "HIGH", value: 82, caption: "RACE CRAFT EXCELLENCE ACROSS ERAS", sentiment: "strength" },
  { label: "Technical philosophy", rating: "HIGH", value: 79, caption: "GORDON MURRAY · NEWEY DEPARTURE LOSS", sentiment: "strength" },
  { label: "Driver quality", rating: "EXCEPTIONAL", value: 96, caption: "SENNA · PROST · HAMILTON · NORRIS", sentiment: "strength" },
  { label: "Strategy execution", rating: "MODERATE", value: 58, caption: "OPERATIONAL ERRORS IN KEY RACES", sentiment: "neutral" },
  { label: "Hybrid era transition", rating: "INCONSISTENT", value: 35, caption: "HONDA DISASTER 2015–17", sentiment: "weakness" },
];

export const mclarenReelSlides: ReelSlide[] = [
  {
    slotLabel: "CHASSIS 01",
    badge: "1976",
    glowColor: "#E07800",
    kicker: "HUNT VS LAUDA · MOUNT FUJI FINALE",
    headline: "M23",
    meta: "HUNT WDC BY 0.5 POINTS · THREE TITLES",
    svgPath: "M 75 168 L 128 166 Q 142 163 152 156 L 180 148 Q 205 146 224 151 L 252 160 Q 262 165 268 168 L 328 168",
    circles: [
      { cx: 122, cy: 183, r: 14, fill: "rgba(224,120,0,0.35)" },
      { cx: 264, cy: 183, r: 14, fill: "rgba(224,120,0,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/James_Hunt_British_GP_1976.jpg",
  },
  {
    slotLabel: "CHASSIS 02 · PEAK",
    badge: "1988",
    glowColor: "#FFD700",
    kicker: "15 WINS FROM 16 · THE GREATEST SEASON",
    headline: "MP4/4",
    meta: "SENNA + PROST · 10 ONE-TWOS",
    svgPath: "M 65 170 L 118 167 Q 138 163 150 155 L 180 146 Q 208 144 228 150 L 260 161 Q 272 166 280 170 L 335 170",
    circles: [
      { cx: 113, cy: 185, r: 14, fill: "rgba(255,215,0,0.35)" },
      { cx: 275, cy: 185, r: 14, fill: "rgba(255,215,0,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/84/Ayrton_Senna_1988_Canada.jpg",
  },
  {
    slotLabel: "CHASSIS 03",
    badge: "1991",
    glowColor: "#FF8700",
    kicker: "SENNA'S FINAL McLAREN TITLE",
    headline: "MP4/6",
    meta: "7 WINS · WDC · HONDA V12",
    svgPath: "M 68 170 L 120 167 Q 140 163 152 155 L 183 146 Q 210 144 230 150 L 262 162 Q 274 167 282 170 L 338 170",
    circles: [
      { cx: 116, cy: 185, r: 14, fill: "rgba(255,135,0,0.35)" },
      { cx: 278, cy: 185, r: 14, fill: "rgba(255,135,0,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Ayrton_Senna_McLaren_MP4-6_1991_United_States.jpg",
  },
  {
    slotLabel: "CHASSIS 04",
    badge: "1998",
    glowColor: "#CC7700",
    kicker: "HÄKKINEN · BACK-TO-BACK WDC",
    headline: "MP4/13",
    meta: "8 WINS · WDC + WCC · DC P2",
    svgPath: "M 62 170 L 116 165 Q 138 160 150 152 L 181 143 Q 210 141 232 148 L 264 160 Q 276 165 284 170 L 340 170",
    circles: [
      { cx: 112, cy: 185, r: 14, fill: "rgba(204,119,0,0.35)" },
      { cx: 280, cy: 185, r: 14, fill: "rgba(204,119,0,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Mika_Hakkinen_in_the_1998_Spanish_Grand_Prix.jpg",
  },
  {
    slotLabel: "CHASSIS 05",
    badge: "2008",
    glowColor: "#E08000",
    kicker: "HAMILTON · LAST LAP · LAST TURN",
    headline: "MP4/23",
    meta: "WDC BY 1 POINT · FINAL LAP BRAZIL",
    svgPath: "M 58 170 L 114 164 Q 136 158 149 149 L 181 140 Q 210 138 234 146 L 266 158 Q 280 164 288 170 L 342 170",
    circles: [
      { cx: 110, cy: 185, r: 14, fill: "rgba(224,128,0,0.35)" },
      { cx: 284, cy: 185, r: 14, fill: "rgba(224,128,0,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/39/Lewis_hamilton_-_2008_Melb_GP.jpg",
  },
  {
    slotLabel: "CHASSIS 06 · CURRENT",
    badge: "2024",
    glowColor: "#FF8700",
    kicker: "WCC CHAMPIONS · 26 YEARS IN THE MAKING",
    headline: "MCL38",
    meta: "NORRIS + PIASTRI · 6 WINS · WCC",
    svgPath: "M 55 170 L 112 164 Q 135 157 149 147 L 181 137 Q 213 135 237 143 L 268 156 Q 283 163 291 168 L 345 170",
    circles: [
      { cx: 108, cy: 185, r: 14, fill: "rgba(255,135,0,0.35)" },
      { cx: 287, cy: 185, r: 14, fill: "rgba(255,135,0,0.35)" },
    ],
    imageUrl: "https://formula1.wordpress.com/wp-content/uploads/2024/05/season2024_race6_sunday_8.jpg",
  },
];

export const mclarenAcademy: TeamAcademyDriver[] = [
  { name: "Lando Norris",          tier: "f1",     note: "McLaren 2019– · WCC '24" },
  { name: "Oscar Piastri",         tier: "f1",     note: "McLaren 2023– · HUN WIN '24" },
  { name: "Ugo Ugochukwu",         tier: "junior", note: "F3 2025 · McLaren ACADEMY" },
  { name: "Brando Badoer",         tier: "junior", note: "F3 2025 · McLaren ACADEMY" },
  { name: "Lewis Hamilton",        tier: "alumni",  note: "2007–12 · 1× WDC" },
  { name: "Jenson Button",         tier: "alumni",  note: "2010–12 · 2009 WDC (BRAWN)" },
  { name: "Fernando Alonso",       tier: "alumni",  note: "2007 · 2× WDC" },
  { name: "Kimi Räikkönen",        tier: "alumni",  note: "2002–06" },
  { name: "Mika Häkkinen",         tier: "alumni",  note: "1993–01 · 2× WDC" },
  { name: "David Coulthard",       tier: "alumni",  note: "1996–04" },
];

export const mclarenIconicCars: TeamIconicCar[] = [
  {
    name: "M23",
    year: 1976,
    subtitle: "Hunt's title fight",
    meta: "3 TITLES ACROSS CAR LIFESPAN",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bb/James_Hunt_and_Jody_Scheckter_1976_Brands_Hatch.jpg",
  },
  {
    name: "MP4/4",
    year: 1988,
    subtitle: "15/16 wins",
    meta: "SENNA + PROST · THE GREATEST F1 CAR",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Alain_Prost_%28McLaren_Honda%29%2C_1988.jpg",
  },
  {
    name: "MP4/13",
    year: 1998,
    subtitle: "Häkkinen's first title",
    meta: "WDC + WCC · BACK-TO-BACK FOLLOWED",
  },
  {
    name: "MP4/23",
    year: 2008,
    subtitle: "Hamilton's WDC",
    meta: "TITLE BY 1 POINT · LAST-LAP DRAMA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Hamilton_Brazil_2008_celebrations.jpg",
  },
  {
    name: "MCL38",
    year: 2024,
    subtitle: "WCC resurgence",
    meta: "NORRIS / PIASTRI · 2024 CONSTRUCTORS",
    imageUrl: "https://formula1.wordpress.com/wp-content/uploads/2024/07/season2024_race14_friday_5.jpg",
  },
];

/* ─── Mercedes ────────────────────────────────────────────────────────────── */

export const mercedes: Team = {
  id: "mercedes",
  name: "Mercedes-AMG Petronas F1 Team",
  shortName: "Mercedes",
  country: "United Kingdom",
  series: ["f1"],
  founded: 2010,
  current: true,
  entityColor: "mercedes",
  liveryHex: "#00D2BE",
  bio: "Eight consecutive Constructors' Championships from 2014 to 2021 — a record that may never be equalled. Built from the ashes of Brawn GP through a revolutionary hybrid power unit concept, Mercedes redefined team dominance in the turbo-hybrid era with Lewis Hamilton and Nico Rosberg.",
  quote: "In this team, there are no excuses. Only solutions.",
  quoteContext: "Toto Wolff",
};

export const mercedesStats: TeamStats = {
  teamId: "mercedes",
  constructorsTitles: 8,
  driversTitles: 7,
  wins: 125,
  podiums: 320,
  seasons: 16,
  firstSeason: 2010,
};

export const mercedesEras: TeamEngineeringEra[] = [
  {
    teamId: "mercedes",
    label: "Schumacher's Return",
    seasons: "2010–2012",
    description:
      "Michael Schumacher came back after three years away. The expectation was a sixth title. What emerged instead was a slow build: Nico Rosberg winning in 2012 at China. Schumacher's pole at Monaco. The power unit concept that would change everything was already in development.",
    championships: 0,
    driverNames: "SCHUMACHER · ROSBERG",
    champLabel: "NO TITLES · FOUNDATION BUILT",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Michael_Schumacher_pole_lap_monaco_2012.JPG",
  },
  {
    teamId: "mercedes",
    label: "Hamilton · Rosberg",
    seasons: "2013–2016",
    description:
      "The 1.6L V6 turbo-hybrid arrived and Mercedes' dominance was instant. Hamilton won the 2014 title as the fastest car on the grid. The rivalry with Rosberg turned corrosive: Malaysia 2016, Spain 2016, Abu Dhabi 2016 — a teammate battle that scarred both. Rosberg's title, then immediate retirement.",
    championships: 3,
    driverNames: "HAMILTON · ROSBERG",
    champLabel: "3× WCC · HAM '14,'15 · ROS '16",
    golden: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nico_Rosberg_2016_Malaysia_FP2.jpg",
  },
  {
    teamId: "mercedes",
    label: "Hamilton's Epoch",
    seasons: "2017–2021",
    description:
      "Four consecutive WDCs for Hamilton. The W11 of 2020 — arguably the most dominant F1 car ever built, winning 13 of 17 races. Hamilton equalled Schumacher's record of seven championships at Istanbul 2020. Abu Dhabi 2021 ended it in unprecedented controversy.",
    championships: 4,
    driverNames: "HAMILTON · BOTTAS",
    champLabel: "4× WCC · 4× WDC",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/Lewis_Hamilton_2020_Tuscan_Grand_Prix_-_race_day.jpg",
  },
  {
    teamId: "mercedes",
    label: "George Russell Era",
    seasons: "2022–",
    description:
      "The zero-pod W13 concept failed spectacularly. Zero wins in 2022. Russell stepped up as team leader while Hamilton's relationship with the team frayed. Kimi Antonelli — 18 years old — replaced Hamilton in 2025. The rebuild is underway.",
    championships: 0,
    driverNames: "RUSSELL · HAMILTON · ANTONELLI",
    champLabel: "NO TITLES · REBUILDING",
    current: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bc/FIA_F1_Austria_2023_George_Russell.jpg",
  },
];

export const mercedesSignatureBars: TeamSignatureBar[] = [
  { label: "Power unit advantage", rating: "EXCEPTIONAL", value: 98, caption: "2014–21 ENGINE BENCHMARK · 50+ HP EDGE", sentiment: "strength" },
  { label: "Aerodynamic efficiency", rating: "EXCEPTIONAL", value: 95, caption: "LOW-DRAG + HIGH-DOWNFORCE BALANCE", sentiment: "strength" },
  { label: "Race strategy", rating: "HIGH", value: 84, caption: "PIT WALL EXCELLENCE OVER EIGHT SEASONS", sentiment: "strength" },
  { label: "Development pace", rating: "HIGH", value: 80, caption: "SEASON-LONG UPGRADE TRAJECTORY", sentiment: "strength" },
  { label: "Driver harmony", rating: "INCONSISTENT", value: 38, caption: "HAMILTON–ROSBERG RIVALRY · TEAM ORDERS", sentiment: "weakness" },
  { label: "Post-dominance rebuild", rating: "INCONSISTENT", value: 42, caption: "ZERO POD CONCEPT FAILURE 2022", sentiment: "weakness" },
];

export const mercedesReelSlides: ReelSlide[] = [
  {
    slotLabel: "CHASSIS 01 · FOUNDATION",
    badge: "2010–12",
    glowColor: "#C0C0C0",
    kicker: "SCHUMACHER RETURNS · FOUNDATION BUILT",
    headline: "W01–W03",
    meta: "SCHUMACHER · ROSBERG · MONACO POLE 2012",
    svgPath: "M 70 170 L 122 166 Q 142 161 154 153 L 184 144 Q 209 142 230 149 L 262 161 Q 274 166 282 170 L 338 170",
    circles: [
      { cx: 118, cy: 185, r: 14, fill: "rgba(192,192,192,0.35)" },
      { cx: 278, cy: 185, r: 14, fill: "rgba(192,192,192,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/78/Michael_Schumacher_2%2C_United_States_Grand_Prix%2C_Austin_2012.jpg",
  },
  {
    slotLabel: "CHASSIS 02",
    badge: "2014",
    glowColor: "#00D2BE",
    kicker: "HYBRID ERA BEGINS · INSTANT DOMINANCE",
    headline: "W05",
    meta: "HAMILTON WDC · 16 WINS · TURBO V6 ERA",
    svgPath: "M 68 170 L 120 166 Q 140 161 153 152 L 183 143 Q 210 141 232 148 L 264 160 Q 276 165 284 170 L 340 170",
    circles: [
      { cx: 116, cy: 185, r: 14, fill: "rgba(0,210,190,0.35)" },
      { cx: 280, cy: 185, r: 14, fill: "rgba(0,210,190,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Lewis_Hamilton_Turn_1_%2815067481393%29.jpg",
  },
  {
    slotLabel: "CHASSIS 04",
    badge: "2016",
    glowColor: "#00D2BE",
    kicker: "ROSBERG vs HAMILTON · TEAMMATE WAR",
    headline: "W07",
    meta: "ROSBERG WDC · 19 WINS · THEN RETIRES",
    svgPath: "M 62 170 L 116 164 Q 138 158 151 149 L 182 140 Q 212 138 235 146 L 268 158 Q 281 165 289 170 L 344 170",
    circles: [
      { cx: 112, cy: 185, r: 14, fill: "rgba(0,210,190,0.35)" },
      { cx: 285, cy: 185, r: 14, fill: "rgba(0,210,190,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Nico_Rosberg_2016_British_GP.jpg",
  },
  {
    slotLabel: "CHASSIS 08 · PEAK",
    badge: "2020",
    glowColor: "#FFD700",
    kicker: "ARGUABLY THE GREATEST F1 CAR EVER BUILT",
    headline: "W11",
    meta: "13 WINS FROM 17 · HAMILTON 7TH WDC",
    svgPath: "M 55 170 L 112 163 Q 136 156 150 146 L 182 136 Q 213 134 238 142 L 270 155 Q 284 162 292 168 L 346 170",
    circles: [
      { cx: 108, cy: 185, r: 14, fill: "rgba(255,215,0,0.35)" },
      { cx: 288, cy: 185, r: 14, fill: "rgba(255,215,0,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/Lewis_Hamilton_2020_Tuscan_Grand_Prix_-_race_day.jpg",
  },
  {
    slotLabel: "CHASSIS 11",
    badge: "2022",
    glowColor: "#007A72",
    kicker: "THE ZERO-POD EXPERIMENT · ZERO WINS",
    headline: "W13",
    meta: "ZERO SIDEPODS · PORPOISING · RESET",
    svgPath: "M 58 170 L 114 164 Q 136 158 148 150 L 179 142 Q 208 141 232 149 L 265 161 Q 278 166 285 170 L 340 170",
    circles: [
      { cx: 110, cy: 185, r: 14, fill: "rgba(0,122,114,0.35)" },
      { cx: 281, cy: 185, r: 14, fill: "rgba(0,122,114,0.35)" },
    ],
    imageUrl: "https://formula1.wordpress.com/wp-content/uploads/2022/03/season2022_race1_thursday_4.jpg",
  },
  {
    slotLabel: "CHASSIS 14 · CURRENT",
    badge: "2024",
    glowColor: "#00D2BE",
    kicker: "RUSSELL ERA · ANTONELLI JOINS 2025",
    headline: "W15",
    meta: "RUSSELL 3 WINS · REBUILDING UNDER WAY",
    svgPath: "M 55 170 L 112 164 Q 135 157 149 147 L 181 137 Q 213 135 237 143 L 268 156 Q 283 163 291 168 L 345 170",
    circles: [
      { cx: 108, cy: 185, r: 14, fill: "rgba(0,210,190,0.35)" },
      { cx: 287, cy: 185, r: 14, fill: "rgba(0,210,190,0.35)" },
    ],
    imageUrl: "https://formula1.wordpress.com/wp-content/uploads/2024/07/season2024_race14_sunday_9.jpg",
  },
];

export const mercedesAcademy: TeamAcademyDriver[] = [
  { name: "George Russell",        tier: "f1",     note: "Mercedes 2022– · 3 WINS 2024" },
  { name: "Kimi Antonelli",        tier: "f1",     note: "Mercedes 2025– · YOUNGEST STARTER" },
  { name: "Lewis Hamilton",        tier: "alumni",  note: "2013–24 · 6× WDC · 103 WINS" },
  { name: "Nico Rosberg",          tier: "alumni",  note: "2010–16 · 1× WDC · THEN RETIRED" },
  { name: "Valtteri Bottas",       tier: "alumni",  note: "2017–21 · 10 WINS" },
  { name: "Michael Schumacher",    tier: "alumni",  note: "2010–12 · 7× WDC (FERRARI)" },
  { name: "Paul Aron",             tier: "junior",  note: "F2 2025 · HITECH · MERC JR" },
  { name: "Frederik Vesti",        tier: "alumni",  note: "MERC JR → WEC / DTM" },
  { name: "Andrea Kimi Antonelli", tier: "alumni",  note: "GRADUATED MERC JR → F1 2025" },
];

export const mercedesIconicCars: TeamIconicCar[] = [
  {
    name: "W03",
    year: 2012,
    subtitle: "Schumacher's farewell",
    meta: "MONACO POLE · ROSBERG 1ST WIN · RETIREMENT",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Michael_Schumacher_pole_lap_monaco_2012.JPG",
  },
  {
    name: "W05",
    year: 2014,
    subtitle: "Hybrid era dominance begins",
    meta: "HAMILTON WDC · 11 WINS",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/Lewis_Hamilton_2014_China_Race.jpg",
  },
  {
    name: "W07",
    year: 2016,
    subtitle: "Rosberg's title fight",
    meta: "19 WINS · HAMILTON vs ROSBERG",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Rosberg_-_2016_Monaco_GP.jpg",
  },
  {
    name: "W11",
    year: 2020,
    subtitle: "The destroyer",
    meta: "13W FROM 17 · HAMILTON 7TH WDC",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Lewis_Hamilton-Mercedes_W11_%284%29.jpg",
  },
  {
    name: "W15",
    year: 2024,
    subtitle: "Russell era opens",
    meta: "RUSSELL 3 WINS · REBUILD IN MOTION",
    imageUrl: "https://formula1.wordpress.com/wp-content/uploads/2024/07/season2024_race14_sunday_8.jpg",
  },
];

/* ─── Export index ────────────────────────────────────────────────────────── */

export const MOCK_TEAMS: Record<string, Team> = {
  ferrari,
  redbull,
  mclaren,
  mercedes,
  prema,
};
