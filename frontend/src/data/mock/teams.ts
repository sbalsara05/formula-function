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
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Scuderia Ferrari team quote memorable\"]",
  quoteContext: "",
};

export const ferrariStats: TeamStats = {
  teamId: "ferrari",
  constructorsTitles: 16, // source: formula1.com — 1961, 1964, 1975–1977, 1979, 1982–1983, 1999–2004, 2007–2008
  driversTitles: 15, // source: Wikipedia — Ascari ×2, Fangio, Hawthorn, P.Hill, Surtees, Lauda ×2, Scheckter, Schumacher ×5, Räikkönen
  wins: 248, // updated: 243 pre-2024 + 5 wins in 2024 (Australia/Sainz, Monaco/Leclerc, Italy/Leclerc, COTA/Leclerc, Mexico/Sainz); 0 wins in 2025 · source: formula1.com constructor records
  podiums: 815, // [VERIFY · source: formula1.com/en/results/constructor/ferrari]
  seasons: 75, // source: 1950–2024, every season
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/1952_Ferrari_500_F2.jpg",
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
    imageUrl: "/cars/ferrari-sf25-2025.png",
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
  { name: "500 F2", year: 1952, subtitle: "Ascari's dominance", meta: "2 TITLES · 14 WINS", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/97/1952-09-07_GP_Italia_Monza_Ferrari_500_F2_Villoresi_Ascari.jpg" },
  { name: "312T", year: 1975, subtitle: "Lauda's revival", meta: "TRANSVERSE GEARBOX · WDC '75", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/Lauda_and_Depailler_at_1975_Dutch_Grand_Prix.jpg" },
  { name: "F2004", year: 2004, subtitle: "Arguably the greatest", meta: "15/18 WINS · DOUBLE TITLE", peak: true, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/Michael_Schumacher_win_2004.jpg" },
  { name: "SF71H", year: 2018, subtitle: "Vettel's title fight", meta: "6 WINS · ITALY POLE", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/71/2018_Spanish_Grand_Prix_Vettel_%281%29.jpg" },
  { name: "SF-24", year: 2024, subtitle: "Leclerc / Sainz", meta: "5 WINS · 2024 SEASON", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/FIA_F1_Austria_2024_Nr._16_Leclerc.jpg" },
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
  constructorsTitles: 6, // source: Wikipedia — 2010–2013, 2022–2023
  driversTitles: 8, // source: Wikipedia — Vettel ×4 (2010–2013), Verstappen ×4 (2021–2024)
  wins: 130, // source: Wikipedia / gpracingstats.com — verified through end 2025
  podiums: 297, // corrected from 358; source: Wikipedia infobox + gpracingstats.com
  seasons: 22, // source: 2005–2026
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Daniel_Ricciardo_2014_Singapore_FP2.jpg",
  },
  {
    teamId: "redbull",
    label: "Verstappen's Dynasty",
    seasons: "2021–",
    description: "Honda power, Newey's focused attention, and Verstappen at his ceiling. The 2021 finale at Abu Dhabi. The RB18's 17 wins. The RB19's record 21 victories from 22 races. Four consecutive World Championships for Max — equal to Vettel's own record set at this very team.",
    championships: 4,
    driverNames: "VERSTAPPEN · HADJAR",
    champLabel: "4× WDC · 2× WCC",
    current: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/79/FIA_F1_Austria_2023_Nr._1_%281%29.jpg",
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
    subtitle: "First constructors' title run",
    meta: "VETTEL / WEBBER · 6W · P2 WCC",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/2009_Formula_1_Grand_Prix_of_China_-_Shanghai_Circuit_%283479067883%29.jpg",
  },
  {
    name: "RB9",
    year: 2013,
    subtitle: "Vettel's 13-win season",
    meta: "9 CONSECUTIVE WINS · 4TH WDC",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3b/2013_Italian_GP_-_Vettel.jpg",
  },
  {
    name: "RB19",
    year: 2023,
    subtitle: "21 wins from 22 races",
    meta: "VERSTAPPEN WDC · DOMINANT HYBRID ERA",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/60/FIA_F1_Austria_2023_Race_%281%29.jpg",
  },
  {
    name: "RB20",
    year: 2024,
    subtitle: "Verstappen / Pérez",
    meta: "2024 WCC · CONTINUED RED BULL REIGN",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/42/FIA_F1_Austria_2024_Nr._1_Verstappen.jpg",
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

/* ─── ART Grand Prix (F2 / F3) ────────────────────────────────────────────── */

export const artF2: Team = {
  id: "art",
  name: "ART Grand Prix",
  shortName: "ART",
  country: "France",
  series: ["f2", "f3"],
  founded: 1996,
  current: true,
  entityColor: "art",
  liveryHex: "#888888",
  bio: "Founded in 1996 as ASM and rebranded ART in 2005, ART Grand Prix quickly established themselves as the benchmark F2/GP2 operation. Lewis Hamilton won their maiden GP2 title in 2006. In the F2 era (2017–present) they have three driver championships — Russell (2018), de Vries (2019), Pourchaire (2023) — making them the second most successful team behind Prema. In F3, Victor Martins took the 2022 title.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"ART Grand Prix team quote memorable\"]",
  quoteContext: "",
};

export const artF2Stats: TeamStats = {
  teamId: "art",
  constructorsTitles: 6,
  driversTitles: 6,
  wins: 84,
  podiums: 210,
  seasons: 20,
  firstSeason: 2005,
};

export const artF2Eras: TeamEngineeringEra[] = [
  {
    teamId: "art",
    label: "GP2 Dominance",
    seasons: "2005–2016",
    description:
      "ART entered the brand-new GP2 Series in 2005 and became its most successful team. Hamilton won the inaugural title in 2006, Rosberg in 2008, and Vandoorne in 2015. Over 12 seasons they collected three GP2 driver championships, establishing the blueprint for factory-backed junior talent development.",
    championships: 3,
    driverNames: "HAMILTON · ROSBERG · VANDOORNE",
    champLabel: "3× GP2",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Art-grosjean-spain-2008-lrg.jpg",
  },
  {
    teamId: "art",
    label: "F2 Era I — Back-to-Back",
    seasons: "2018–2019",
    description:
      "The F2 era opened with ART delivering consecutive driver titles. George Russell ran a tactically immaculate 2018 campaign for Mercedes junior — wire-to-wire. Nyck de Vries followed in 2019 with one of the most consistent seasons the series had seen, amassing 12 podiums across the rounds.",
    championships: 2,
    driverNames: "RUSSELL · DE VRIES",
    champLabel: "2× F2",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/George_Russell%2C_ART_Grand_Prix_F2_Team_%2842837176685%29.jpg",
  },
  {
    teamId: "art",
    label: "F2 Era II — Resurgence",
    seasons: "2020–2024",
    description:
      "After a run of Prema dominance from 2020–2022, ART returned to the top with Théo Pourchaire in 2023. The Sauber-backed Frenchman clinched the title at Yas Marina with Victor Martins as a strong team-mate. ART also took the 2022 FIA F3 title with Martins, underlining their dual-series capability.",
    championships: 2,
    driverNames: "POURCHAIRE · MARTINS",
    champLabel: "F2 + F3",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/FIA_F2_Austria_2024_Nr._1_Martins.jpg",
  },
];

export const artF2SignatureBars: TeamSignatureBar[] = [
  { label: "Qualifying performance",      rating: "STRONG",      value: 84, caption: "3 F2 CHAMPIONS BUILT ON Q PACE",      sentiment: "strength" },
  { label: "Race setup conversion",       rating: "HIGH",        value: 80, caption: "GRID → PODIUM CONVERSION RATE +0.6",   sentiment: "strength" },
  { label: "Driver academy partnerships", rating: "EXCEPTIONAL", value: 90, caption: "MERCEDES · ALPINE · RED BULL JUNIORS", sentiment: "strength" },
  { label: "Strategy adaptability",       rating: "STRONG",      value: 74, caption: "RESPONSIVE TO SAFETY CAR WINDOWS",     sentiment: "neutral"  },
  { label: "Tyre management culture",     rating: "HIGH",        value: 77, caption: "LONG-RUN PACE CONSISTENT",             sentiment: "neutral"  },
  { label: "F1 graduation rate",          rating: "EXCEPTIONAL", value: 88, caption: "RUSSELL · DE VRIES · POURCHAIRE → F1", sentiment: "strength" },
];

export const artF2ReelSlides: ReelSlide[] = [
  {
    slotLabel: "2018 TITLE",
    badge: "F2 CHAMPION",
    glowColor: "#00D2BE",
    kicker: "ART · GEORGE RUSSELL · WIRE-TO-WIRE",
    headline: "Russell wins F2 2018",
    meta: "ABU DHABI · MERCEDES JR · 4 WINS · 12 PODIUMS",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/George_Russell%2C_ART_Grand_Prix_F2_Team_%2842837176685%29.jpg",
  },
  {
    slotLabel: "2019 TITLE",
    badge: "F2 CHAMPION",
    glowColor: "#005AFF",
    kicker: "ART · NYCK DE VRIES · CONSISTENCY",
    headline: "De Vries wins F2 2019",
    meta: "ART · 12 PODIUMS · RECORD CONSISTENCY AT THE TIME",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c9/FIA_F2_Austria_2019_Nr._4_de_Vries_2.jpg",
  },
  {
    slotLabel: "2023 TITLE",
    badge: "F2 CHAMPION",
    glowColor: "#52E252",
    kicker: "ART · THÉO POURCHAIRE · SAUBER JR",
    headline: "Pourchaire wins F2 2023",
    meta: "YAS MARINA · SAUBER JUNIOR · THIRD ART F2 TITLE",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/91/FIA_F2_Austria_2023_Nr._5_Pourchaire_%281%29.jpg",
  },
  {
    slotLabel: "2024 SEASON",
    badge: "RACE WIN",
    glowColor: "#888888",
    kicker: "ART · VICTOR MARTINS · AUSTRIA 2024",
    headline: "Martins Austria",
    meta: "SPRINT WIN · ALPINE ACADEMY · 2024 CAMPAIGN",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/FIA_F2_Austria_2024_Nr._1_Martins.jpg",
  },
];

export const artF2Academy: TeamAcademyDriver[] = [
  { name: "Lewis Hamilton",     tier: "alumni", note: "GP2 2006 champion → McLaren → Mercedes F1 · 7× WDC" },
  { name: "Nico Rosberg",       tier: "alumni", note: "GP2 2008 champion → Williams → Mercedes F1 · 2016 WDC" },
  { name: "Stoffel Vandoorne",  tier: "alumni", note: "GP2 2015 champion → McLaren F1 · Formula E champion" },
  { name: "George Russell",     tier: "alumni", note: "F2 2018 champion → Williams → Mercedes F1" },
  { name: "Nyck de Vries",      tier: "alumni", note: "F2 2019 champion → AlphaTauri F1 2023" },
  { name: "Théo Pourchaire",    tier: "alumni", note: "F2 2023 champion → Sauber reserve driver" },
  { name: "Victor Martins",     tier: "alumni", note: "F3 2022 champion · ART · Alpine academy" },
  { name: "Lando Norris",       tier: "alumni", note: "GP2/F2 2018 runner-up · → McLaren F1 · 2025 WDC" },
];

export const artF2IconicCars: TeamIconicCar[] = [
  {
    name: "ART Dallara GP2/05",
    year: 2006,
    subtitle: "Hamilton's championship car",
    meta: "GP2 CHAMPION 2006 · LEWIS HAMILTON · INAUGURAL ERA",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Art-grosjean-spain-2008-lrg.jpg",
  },
  {
    name: "ART Dallara F2 2018",
    year: 2018,
    subtitle: "Russell's title car",
    meta: "F2 CHAMPION 2018 · GEORGE RUSSELL · WIRE-TO-WIRE",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/George_Russell%2C_ART_Grand_Prix_F2_Team_%2842837176685%29.jpg",
  },
  {
    name: "ART Dallara F2 2024",
    year: 2024,
    subtitle: "Victor Martins' car",
    meta: "2024 · VICTOR MARTINS · ALPINE ACADEMY",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/FIA_F2_Austria_2024_Nr._1_Martins.jpg",
  },
];

/* ─── DAMS Lucas Oil (F2) ─────────────────────────────────────────────────── */

export const damsF2: Team = {
  id: "dams",
  name: "DAMS Lucas Oil",
  shortName: "DAMS",
  country: "France",
  series: ["f2"],
  founded: 1988,
  current: true,
  entityColor: "dams",
  liveryHex: "#CC2200",
  bio: "Founded in 1988 near Le Mans by Jean-Paul Driot and Hugues de Chaunac, DAMS (Driot-Arnoux Motorsport) is one of the most storied names in European junior motorsport. Two GP2 driver titles — Davide Valsecchi (2012) and Jolyon Palmer (2014) — anchor their legacy. In the F2 era they have developed Alex Albon, Jack Doohan, and a string of Red Bull and Williams-backed juniors without yet adding to their title count.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"DAMS Lucas Oil team quote memorable\"]",
  quoteContext: "",
};

export const damsF2Stats: TeamStats = {
  teamId: "dams",
  constructorsTitles: 2,
  driversTitles: 2,
  wins: 48,
  podiums: 140,
  seasons: 20,
  firstSeason: 2005,
};

export const damsF2Eras: TeamEngineeringEra[] = [
  {
    teamId: "dams",
    label: "GP2 Champion Seasons",
    seasons: "2012 & 2014",
    description:
      "DAMS produced GP2's two most clinical champions in their title-winning years. Davide Valsecchi in 2012 went wire-to-wire with a dominant run; Jolyon Palmer in 2014 was relentless over a full season, culminating in the Yas Marina title. Both became the template DAMS car: disciplined, consistent, hard to beat across a full campaign.",
    championships: 2,
    driverNames: "VALSECCHI · PALMER",
    champLabel: "2× GP2",
    golden: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Prove_GP2_-_83%C2%B0_Gran_Premio_d%27Italia_2012_-_Monza_-07-09-2012_%287960926896%29.jpg",
  },
  {
    teamId: "dams",
    label: "F2 Modern Era",
    seasons: "2017–present",
    description:
      "The F2 rebrand has seen DAMS attract talent from Red Bull, Williams, and Renault/Alpine academies. Alex Albon's 2018–19 stint was a high point — race wins and consistent scoring before his Red Bull call-up. More recently Jack Doohan (2023–24) and Jak Crawford represent DAMS's role as a trusted launchpad rather than a championship operation.",
    championships: 0,
    driverNames: "ALBON · DOOHAN · CRAWFORD",
    champLabel: "F2 ERA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/2021_British_Grand_Prix_%2851349281236%29.jpg",
  },
];

export const damsF2SignatureBars: TeamSignatureBar[] = [
  { label: "Engineering depth",         rating: "STRONG",       value: 80, caption: "35+ YEARS JUNIOR MOTORSPORT EXPERIENCE", sentiment: "strength" },
  { label: "Qualifying setup",          rating: "HIGH",         value: 73, caption: "TOP-6 AVERAGE GRID POSITION F2 ERA",      sentiment: "neutral"  },
  { label: "Race strategy",             rating: "CONSERVATIVE", value: 66, caption: "MEASURED, LOW-VARIANCE PIT CALLS",         sentiment: "neutral"  },
  { label: "Driver development",        rating: "STRONG",       value: 82, caption: "ALBON · DOOHAN · CRAWFORD DEVELOPED",      sentiment: "strength" },
  { label: "Wet-weather execution",     rating: "MODERATE",     value: 70, caption: "SOLID IN VARIABLE CONDITIONS",             sentiment: "neutral"  },
  { label: "Academy partnerships",      rating: "EXCEPTIONAL",  value: 85, caption: "RED BULL · WILLIAMS · RENAULT JUNIORS",    sentiment: "strength" },
];

export const damsF2ReelSlides: ReelSlide[] = [
  {
    slotLabel: "GP2 2012",
    badge: "GP2 CHAMPION",
    glowColor: "#CC2200",
    kicker: "DAMS · VALSECCHI · GP2 2012 TITLE",
    headline: "Valsecchi wins GP2",
    meta: "2012 · DAVIDE VALSECCHI · WIRE-TO-WIRE GP2 CHAMPION",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Prove_GP2_-_83%C2%B0_Gran_Premio_d%27Italia_2012_-_Monza_-07-09-2012_%287960926896%29.jpg",
  },
  {
    slotLabel: "GP2 2014",
    badge: "GP2 CHAMPION",
    glowColor: "#CC2200",
    kicker: "DAMS · JOLYON PALMER · GP2 2014",
    headline: "Palmer wins GP2",
    meta: "2014 · JOLYON PALMER · DAMS BACK-TO-BACK GP2 HERITAGE",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Jolyon_Palmer_GP2_2014_Silverstone_001.jpg",
  },
  {
    slotLabel: "F2 2018",
    badge: "F2 WIN",
    glowColor: "#3B48E0",
    kicker: "DAMS · ALEX ALBON · F2 RACE WIN",
    headline: "Albon breakthrough",
    meta: "2018–19 · ALEX ALBON · PRE–RED BULL F1 CALL-UP",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/2021_British_Grand_Prix_%2851349281236%29.jpg",
  },
];

export const damsF2Academy: TeamAcademyDriver[] = [
  { name: "Davide Valsecchi",    tier: "alumni", note: "GP2 champion 2012 · DAMS · Italian driver, later pundit" },
  { name: "Jolyon Palmer",       tier: "alumni", note: "GP2 champion 2014 · DAMS · → Renault F1 2016–17" },
  { name: "Romain Grosjean",     tier: "alumni", note: "GP2 2011 runner-up · DAMS · → Lotus/Haas F1" },
  { name: "Alex Albon",          tier: "alumni", note: "F2 race wins 2018–19 · DAMS · → Red Bull F1 · Williams F1" },
  { name: "Jack Doohan",         tier: "alumni", note: "DAMS F2 2023–24 · → Alpine F1 2025" },
  { name: "Jak Crawford",        tier: "junior", note: "Red Bull junior · DAMS F2 2025 · race winner" },
];

export const damsF2IconicCars: TeamIconicCar[] = [
  {
    name: "DAMS Dallara GP2/11",
    year: 2012,
    subtitle: "Valsecchi's GP2 champion car",
    meta: "GP2 CHAMPION 2012 · DAVIDE VALSECCHI · WIRE-TO-WIRE",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Prove_GP2_-_83%C2%B0_Gran_Premio_d%27Italia_2012_-_Monza_-07-09-2012_%287960926896%29.jpg",
  },
  {
    name: "DAMS Dallara F2 2018",
    year: 2018,
    subtitle: "Albon's breakthrough car",
    meta: "F2 2018–19 · ALEX ALBON · PRE–RED BULL LAUNCHPAD",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/2021_British_Grand_Prix_%2851349281236%29.jpg",
  },
];

/* ─── Trident (F2 / F3) ──────────────────────────────────────────────────── */

export const trident: Team = {
  id: "trident",
  name: "Trident",
  shortName: "Trident",
  country: "Italy",
  series: ["f2", "f3"],
  founded: 2006,
  current: true,
  entityColor: "trident",
  liveryHex: "#990000",
  bio: "Founded in 2006 in San Pietro Mosezzo, Piedmont, Trident is the privateer powerhouse of the FIA F3 era. Three consecutive F3 driver championships — Gabriel Bortoleto (2023), Leonardo Fornaroli (2024), Rafael Câmara (2025) — are the most dominant run in the series' history. Bortoleto's immediate follow-up F2 title with Invicta in 2024 further validates Trident's driver development culture. They run in F2 as well, though their F3 identity defines them.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Trident team quote memorable\"]",
  quoteContext: "",
};

export const tridentStats: TeamStats = {
  teamId: "trident",
  constructorsTitles: 3,
  driversTitles: 3,
  wins: 18,
  podiums: 55,
  seasons: 7,
  firstSeason: 2019,
};

export const tridentEras: TeamEngineeringEra[] = [
  {
    teamId: "trident",
    label: "F3 Building Phase",
    seasons: "2019–2022",
    description:
      "Trident entered the rebranded FIA F3 in 2019 and spent four seasons building engineering competency in the spec-chassis era. Clément Novalak was a consistent scorer; they regularly placed drivers in the top ten. The foundations were laid for what was to come.",
    championships: 0,
    driverNames: "NOVALAK · PERONI · HAUGER",
    champLabel: "FOUNDATIONS",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/FIA_F3_Austria_2021_Nr._5_Novalak.jpg",
  },
  {
    teamId: "trident",
    label: "F3 Dynasty",
    seasons: "2023–2025",
    description:
      "Three consecutive FIA F3 driver championships cemented Trident as the series' dominant force. Gabriel Bortoleto (2023) was the first South American F3 champion; Leonardo Fornaroli (2024) became the first champion never to have won an F3 race in the conventional sense; Rafael Câmara (2025) continued the streak as a Ferrari junior. An unprecedented achievement for an Italian independent.",
    championships: 3,
    driverNames: "BORTOLETO · FORNAROLI · CÂMARA",
    champLabel: "3× F3",
    golden: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/70th_MACAU_GRAND_PRIX_%28181%29.jpg",
  },
];

export const tridentSignatureBars: TeamSignatureBar[] = [
  { label: "Spec chassis mastery",      rating: "EXCEPTIONAL",  value: 90, caption: "EXTRACTED MAXIMUM ACROSS 3 SEASONS", sentiment: "strength" },
  { label: "Qualifying pace",           rating: "STRONG",       value: 82, caption: "TOP-4 GRID AVERAGE IN TITLE YEARS",   sentiment: "strength" },
  { label: "Race execution",            rating: "HIGH",         value: 80, caption: "LOW INCIDENT RATE · CLEAN WEEKENDS",  sentiment: "neutral"  },
  { label: "Driver talent identification",rating: "BEST-IN-CLASS",value: 94, caption: "3 CONSECUTIVE F3 TITLE DRIVERS",   sentiment: "strength" },
  { label: "Wet-weather strategy",      rating: "STRONG",       value: 75, caption: "FLEXIBLE SETUP IN MIXED CONDITIONS",  sentiment: "neutral"  },
  { label: "Independent identity",      rating: "EXCEPTIONAL",  value: 92, caption: "NO FACTORY BACKING · BEAT THEM ALL",  sentiment: "strength" },
];

export const tridentReelSlides: ReelSlide[] = [
  {
    slotLabel: "2023 F3",
    badge: "F3 CHAMPION",
    glowColor: "#990000",
    kicker: "TRIDENT · BORTOLETO · F3 2023",
    headline: "Bortoleto champion",
    meta: "FIRST SOUTH AMERICAN FIA F3 CHAMPION · TRIDENT",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/70th_MACAU_GRAND_PRIX_%28181%29.jpg",
  },
  {
    slotLabel: "2024 F3",
    badge: "F3 CHAMPION",
    glowColor: "#990000",
    kicker: "TRIDENT · FORNAROLI · F3 2024",
    headline: "Fornaroli champion",
    meta: "BACK-TO-BACK · ITALIAN PRODIGY · TRIDENT DYNASTY",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/FIA_F3_Austria_2024_Nr._4_Fornaroli.jpg",
  },
  {
    slotLabel: "2025 F3",
    badge: "F3 CHAMPION",
    glowColor: "#DC0000",
    kicker: "TRIDENT · CÂMARA · F3 2025",
    headline: "Câmara champion",
    meta: "THREE CONSECUTIVE F3 TITLES · FERRARI JUNIOR · UNPRECEDENTED",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/26/FIA_F3_Austria_2025_Nr._5_C%C3%A2mara.jpg",
  },
];

export const tridentAcademy: TeamAcademyDriver[] = [
  { name: "Gabriel Bortoleto",  tier: "alumni", note: "F3 2023 champion → F2 2024 champion (Invicta) → Sauber F1 2025" },
  { name: "Leonardo Fornaroli", tier: "alumni", note: "F3 2024 champion · Italian · → F2 2025 with Invicta" },
  { name: "Rafael Câmara",      tier: "junior", note: "F3 2025 champion · Ferrari junior · youngest in 2023 F4 Italia" },
  { name: "Clément Novalak",    tier: "alumni", note: "Multiple F3 seasons · Trident stalwart · F2 with ART" },
  { name: "Roman Staněk",       tier: "alumni", note: "F3 with Trident · Macau GP 2023 · Czech Republic" },
];

export const tridentIconicCars: TeamIconicCar[] = [
  {
    name: "Trident Dallara F3 2023",
    year: 2023,
    subtitle: "Bortoleto's championship car",
    meta: "FIA F3 CHAMPION 2023 · GABRIEL BORTOLETO · FIRST SOUTH AMERICAN TITLE",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/70th_MACAU_GRAND_PRIX_%28181%29.jpg",
  },
  {
    name: "Trident Dallara F3 2024",
    year: 2024,
    subtitle: "Fornaroli's championship car",
    meta: "FIA F3 CHAMPION 2024 · LEONARDO FORNAROLI · BACK-TO-BACK",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/FIA_F3_Austria_2024_Nr._4_Fornaroli.jpg",
  },
  {
    name: "Trident Dallara F3 2025",
    year: 2025,
    subtitle: "Câmara's championship car",
    meta: "FIA F3 CHAMPION 2025 · RAFAEL CÂMARA · THREE IN A ROW",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/26/FIA_F3_Austria_2025_Nr._5_C%C3%A2mara.jpg",
  },
];

/* ─── MP Motorsport (F2 / F3) ────────────────────────────────────────────── */

export const mpMotorsport: Team = {
  id: "mp",
  name: "MP Motorsport",
  shortName: "MP",
  country: "Netherlands",
  series: ["f2", "f3"],
  founded: 1995,
  current: true,
  entityColor: "mp",
  liveryHex: "#FF6600",
  bio: "Founded in 1995 as MultiPromo in the Netherlands, MP Motorsport arrived in the GP2 Series and steadily built toward their breakthrough. Their defining moment came in 2022 when Felipe Drugovich delivered the FIA F2 driver and teams championships — the first Brazilian F2 champion since the modern era. Based in Westmaas, they run both F2 and F3 programmes and are recognised as a competitive mid-field team with genuine championship potential.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"MP Motorsport team quote memorable\"]",
  quoteContext: "",
};

export const mpMotorsportStats: TeamStats = {
  teamId: "mp",
  constructorsTitles: 1,
  driversTitles: 1,
  wins: 22,
  podiums: 64,
  seasons: 8,
  firstSeason: 2017,
};

export const mpMotorsportEras: TeamEngineeringEra[] = [
  {
    teamId: "mp",
    label: "F2 Entry & Growth",
    seasons: "2017–2021",
    description:
      "MP entered the rebranded F2 in 2017 as a competitive but non-championship outfit. Consistent points scoring and occasional podiums built team infrastructure and recruited a string of junior-academy-backed drivers from across Europe and South America.",
    championships: 0,
    driverNames: "DELETRAZ · BOSCHUNG · VERSCHOOR",
    champLabel: "GROWING",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/2021_British_Grand_Prix_%2851349281236%29.jpg",
  },
  {
    teamId: "mp",
    label: "Championship Year",
    seasons: "2022",
    description:
      "Felipe Drugovich delivered the defining season. The Brazilian dominated large parts of the 2022 campaign, winning 5 races and accumulating 265 championship points to win both the driver and teams titles. It was the first time a Dutchbased team had won an F2 or GP2 championship, and the first Brazilian title since the early GP2 era.",
    championships: 1,
    driverNames: "DRUGOVICH",
    champLabel: "F2 CHAMPION",
    golden: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/74/FIA_F2_Austria_2022_Nr._11_Drugovich.jpg",
  },
  {
    teamId: "mp",
    label: "Post-Championship Build",
    seasons: "2023–present",
    description:
      "Following their title year, MP continued to attract competitive drivers. Richard Verschoor — a multi-year MP stalwart — has become a consistent race winner. Their F3 programme has produced strong junior results as the team builds toward a second championship challenge.",
    championships: 0,
    driverNames: "VERSCHOOR · GOETHE",
    champLabel: "COMPETITIVE",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/FIA_F2_Austria_2023_Nr._22_Verschoor_%282%29.jpg",
  },
];

export const mpMotorsportSignatureBars: TeamSignatureBar[] = [
  { label: "Race pace consistency",   rating: "STRONG",      value: 78, caption: "COMPETITIVE THROUGHOUT 2022 TITLE RUN",  sentiment: "strength" },
  { label: "Qualifying setup",        rating: "HIGH",        value: 72, caption: "TOP-6 AVERAGE IN CHAMPIONSHIP SEASON",    sentiment: "neutral"  },
  { label: "Strategy execution",      rating: "STRONG",      value: 74, caption: "DRUGOVICH CLEAN STRATEGIC CALLS",         sentiment: "strength" },
  { label: "Driver development",      rating: "STRONG",      value: 76, caption: "VERSCHOOR MULTI-YEAR RACE WINNER",        sentiment: "strength" },
  { label: "Wet-weather adaptability",rating: "MODERATE",    value: 68, caption: "SETUP RANGE COVERS MIXED CONDITIONS",     sentiment: "neutral"  },
  { label: "Championship pedigree",   rating: "HIGH",        value: 80, caption: "2022 DOUBLE CHAMPION — DRIVER + TEAMS",   sentiment: "strength" },
];

export const mpMotorsportReelSlides: ReelSlide[] = [
  {
    slotLabel: "2022 CHAMPION",
    badge: "F2 CHAMPION",
    glowColor: "#FF6600",
    kicker: "MP MOTORSPORT · DRUGOVICH · DOMINANT",
    headline: "Drugovich 2022",
    meta: "5 WINS · 265 POINTS · FIRST DUTCH-TEAM F2 TITLE",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/74/FIA_F2_Austria_2022_Nr._11_Drugovich.jpg",
  },
  {
    slotLabel: "VERSCHOOR",
    badge: "RACE WIN",
    glowColor: "#FF6600",
    kicker: "MP · RICHARD VERSCHOOR · MULTIPLE WINS",
    headline: "Verschoor wins",
    meta: "2024–25 · DUTCH DRIVER · CONSISTENT RACE WINNER",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/FIA_F2_Austria_2023_Nr._22_Verschoor_%282%29.jpg",
  },
];

export const mpMotorsportAcademy: TeamAcademyDriver[] = [
  { name: "Felipe Drugovich",    tier: "alumni", note: "F2 2022 champion → Aston Martin F1 reserve/development 2023–24" },
  { name: "Richard Verschoor",   tier: "junior", note: "Multi-year MP driver · Netherlands · consistent F2 race winner" },
  { name: "Jordan King",         tier: "alumni", note: "F2 with MP 2019 · Manor F1 2016–17 · British driver" },
  { name: "Oliver Goethe",       tier: "junior", note: "German junior · F2 2025 with MP" },
];

export const mpMotorsportIconicCars: TeamIconicCar[] = [
  {
    name: "MP Dallara F2 2022",
    year: 2022,
    subtitle: "Drugovich's championship car",
    meta: "FIA F2 CHAMPION 2022 · FELIPE DRUGOVICH · 5 WINS · 265 PTS",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/74/FIA_F2_Austria_2022_Nr._11_Drugovich.jpg",
  },
  {
    name: "MP Dallara F2 2019",
    year: 2019,
    subtitle: "King/Albon era",
    meta: "MP MOTORSPORT · F2 2019 · ORANGE DUTCH LIVERY",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/2021_British_Grand_Prix_%2851349281236%29.jpg",
  },
];

/* ─── Invicta Racing (F2) ─────────────────────────────────────────────────── */

export const invicta: Team = {
  id: "invicta",
  name: "Invicta Racing",
  shortName: "Invicta",
  country: "United Kingdom",
  series: ["f2"],
  founded: 2017,
  current: true,
  entityColor: "invicta",
  liveryHex: "#1199CC",
  bio: "Formerly Virtuosi Racing, the team was rebranded as Invicta Racing in 2024 following acquisition by the Invicta Watch Group. Their F2 history stretches back to 2017 when they entered as Virtuosi. Zhou Guanyu, Callum Ilott, and Felipe Drugovich all scored wins with the team before Bortoleto delivered their first and only driver championship in 2024. Leonardo Fornaroli followed with the 2025 title, making Invicta back-to-back F2 champions.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Invicta Racing team quote memorable\"]",
  quoteContext: "",
};

export const invictaStats: TeamStats = {
  teamId: "invicta",
  constructorsTitles: 2,
  driversTitles: 2,
  wins: 36,
  podiums: 92,
  seasons: 8,
  firstSeason: 2017,
};

export const invictaEras: TeamEngineeringEra[] = [
  {
    teamId: "invicta",
    label: "Virtuosi Era",
    seasons: "2017–2023",
    description:
      "As Virtuosi Racing, the team was a consistent front-runner without landing a title. Callum Ilott (2020 runner-up), Zhou Guanyu (2021 runner-up), and Felipe Drugovich (briefly with the team) all showed the car was capable. Race wins came regularly — but the championship repeatedly eluded them under the Virtuosi name.",
    championships: 0,
    driverNames: "ILOTT · ZHOU · DRUGOVICH",
    champLabel: "RUNNER-UP ERA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/FIA_F2_Austria_2019_Nr._7_Zhou.jpg",
  },
  {
    teamId: "invicta",
    label: "Invicta — Back-to-Back",
    seasons: "2024–2025",
    description:
      "Gabriel Bortoleto's arrival at the freshly rebranded Invicta team proved transformative. The Brazilian, fresh from his 2023 FIA F3 title with Trident, dominated the 2024 F2 season to win the driver and constructors championships. Leonardo Fornaroli — 2024 F3 champion — then stepped up and took the 2025 F2 title, completing an unprecedented back-to-back at the same team.",
    championships: 2,
    driverNames: "BORTOLETO · FORNAROLI",
    champLabel: "2× F2",
    golden: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/82/FIA_F2_Austria_2024_Nr._10_Bortoleto.jpg",
  },
];

export const invictaSignatureBars: TeamSignatureBar[] = [
  { label: "Car preparation",       rating: "EXCEPTIONAL",  value: 88, caption: "BACK-TO-BACK CHAMPIONSHIPS 2024–25",  sentiment: "strength" },
  { label: "Qualifying setup",      rating: "HIGH",         value: 82, caption: "FRONT-ROW REGULARS IN TITLE YEARS",    sentiment: "strength" },
  { label: "Race execution",        rating: "HIGH",         value: 84, caption: "LOW-ATTRITION CLEAN RACE WEEKENDS",    sentiment: "strength" },
  { label: "Driver progression",    rating: "EXCEPTIONAL",  value: 90, caption: "F3 CHAMPION → F2 CHAMPION PIPELINE",   sentiment: "strength" },
  { label: "Strategy calls",        rating: "STRONG",       value: 76, caption: "AGGRESSIVE WHEN OPPORTUNITY ARISES",   sentiment: "neutral"  },
  { label: "Team identity clarity", rating: "STRONG",       value: 74, caption: "REBRAND 2024 → IMMEDIATE TITLES",      sentiment: "strength" },
];

export const invictaReelSlides: ReelSlide[] = [
  {
    slotLabel: "2024 TITLE",
    badge: "F2 CHAMPION",
    glowColor: "#1199CC",
    kicker: "INVICTA · GABRIEL BORTOLETO · F2 2024",
    headline: "Bortoleto 2024",
    meta: "FIRST INVICTA F2 TITLE · BACK-TO-BACK JUNIOR CHAMPION",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/82/FIA_F2_Austria_2024_Nr._10_Bortoleto.jpg",
  },
  {
    slotLabel: "2025 TITLE",
    badge: "F2 CHAMPION",
    glowColor: "#1199CC",
    kicker: "INVICTA · FORNAROLI · F2 2025",
    headline: "Fornaroli 2025",
    meta: "BACK-TO-BACK F2 TITLES · TRIDENT → INVICTA PIPELINE",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bc/FIA_F2_Austria_2025_Nr._1_Fornaroli.jpg",
  },
];

export const invictaAcademy: TeamAcademyDriver[] = [
  { name: "Gabriel Bortoleto",   tier: "alumni", note: "F2 2024 champion → Sauber/Audi F1 2025" },
  { name: "Leonardo Fornaroli",  tier: "alumni", note: "F2 2025 champion · Italian · Trident F3 2024 champion" },
  { name: "Callum Ilott",        tier: "alumni", note: "F2 2020 runner-up · Virtuosi · → Ferrari reserve · IndyCar" },
  { name: "Zhou Guanyu",         tier: "alumni", note: "F2 2021 runner-up · Virtuosi · → Sauber F1 2022–24" },
  { name: "Roman Staněk",        tier: "junior", note: "Czech driver · Invicta 2025 · Trident F3 alumni" },
];

export const invictaIconicCars: TeamIconicCar[] = [
  {
    name: "Invicta Dallara F2 2024",
    year: 2024,
    subtitle: "Bortoleto's championship car",
    meta: "FIA F2 CHAMPION 2024 · GABRIEL BORTOLETO · BACK-TO-BACK JUNIOR",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/82/FIA_F2_Austria_2024_Nr._10_Bortoleto.jpg",
  },
  {
    name: "Invicta Dallara F2 2025",
    year: 2025,
    subtitle: "Fornaroli's championship car",
    meta: "FIA F2 CHAMPION 2025 · LEONARDO FORNAROLI · INVICTA DYNASTY",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bc/FIA_F2_Austria_2025_Nr._1_Fornaroli.jpg",
  },
];

/* ─── Hitech Grand Prix (F2 / F3) ────────────────────────────────────────── */

export const hitechGP: Team = {
  id: "hitech",
  name: "Hitech TGR",
  shortName: "Hitech",
  country: "United Kingdom",
  series: ["f2", "f3"],
  founded: 2002,
  current: true,
  entityColor: "hitech",
  liveryHex: "#CC0022",
  bio: "Silverstone-based Hitech Grand Prix entered F3 and F2 from 2018 onwards, becoming a regular fixture on both grids. Their partnership with Toyota Gazoo Racing (TGR) — reflected in the TGR suffix — provides manufacturer resources for driver development. The team has operated as a reliable midfield-to-front-running operation, attracting Red Bull and TOYOTA junior drivers, without yet landing an F2 or F3 driver championship.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Hitech TGR team quote memorable\"]",
  quoteContext: "",
};

export const hitechGPStats: TeamStats = {
  teamId: "hitech",
  constructorsTitles: 0,
  driversTitles: 0,
  wins: 10,
  podiums: 38,
  seasons: 7,
  firstSeason: 2018,
};

export const hitechGPEras: TeamEngineeringEra[] = [
  {
    teamId: "hitech",
    label: "Early Years",
    seasons: "2018–2020",
    description:
      "Hitech entered F2 and F3 in 2018 and quickly established front-running pace. Nikita Mazepin (2020, P5 in F2) and other Red Bull juniors showed the team could compete at the front. Results were promising but inconsistent.",
    championships: 0,
    driverNames: "MAZEPIN · VIPS · ARMSTRONG",
    champLabel: "ESTABLISHING",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ef/FIA_F3_Austria_2019_Nr._20_Pulcini.jpg",
  },
  {
    teamId: "hitech",
    label: "TGR Partnership",
    seasons: "2021–present",
    description:
      "The Toyota Gazoo Racing partnership brought additional resources and a pipeline of TOYOTA-backed drivers from Asia and Europe. Ritomo Miyata (2025) leads the current programme. The team operates across both F2 and F3 grids, making them one of the more active organisations in the junior ladder.",
    championships: 0,
    driverNames: "MIYATA · HERTA · VIPS",
    champLabel: "TGR ERA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/70th_MACAU_GRAND_PRIX_%28101%29.jpg",
  },
];

export const hitechGPSignatureBars: TeamSignatureBar[] = [
  { label: "Front-end setup quality", rating: "STRONG",    value: 74, caption: "COMPETITIVE IN DRY QUALIFYING",      sentiment: "neutral"  },
  { label: "Race setup",              rating: "MODERATE",  value: 68, caption: "VARIABLE ACROSS CIRCUIT TYPES",     sentiment: "neutral"  },
  { label: "Manufacturer support",    rating: "STRONG",    value: 80, caption: "TOYOTA GAZOO RACING PARTNERSHIP",   sentiment: "strength" },
  { label: "Driver pipeline",         rating: "HIGH",      value: 76, caption: "RED BULL + TOYOTA JUNIOR DRIVERS",  sentiment: "strength" },
  { label: "Consistency",             rating: "MODERATE",  value: 66, caption: "RACE-BY-RACE VARIABILITY",          sentiment: "neutral"  },
  { label: "Championship threat",     rating: "MODERATE",  value: 62, caption: "FRONT-ROW PACE WITHOUT F2 TITLE",   sentiment: "neutral"  },
];

export const hitechGPReelSlides: ReelSlide[] = [
  {
    slotLabel: "F3 MACAU 2023",
    badge: "F3 ACTION",
    glowColor: "#CC0022",
    kicker: "HITECH · MACAU GRAND PRIX 2023",
    headline: "Macau 2023",
    meta: "70TH MACAU GRAND PRIX · HITECH · F3 COMPETITION",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/70th_MACAU_GRAND_PRIX_%28101%29.jpg",
  },
  {
    slotLabel: "MIYATA",
    badge: "F2 RACE",
    glowColor: "#CC0022",
    kicker: "HITECH TGR · RITOMO MIYATA · 2025",
    headline: "Miyata 2025",
    meta: "TOYOTA JUNIOR · F2 2025 · JAPANESE PRODIGY",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8e/2024_FIA_Formula_2_Silverstone_%2854042745964%29.jpg",
  },
];

export const hitechGPAcademy: TeamAcademyDriver[] = [
  { name: "Nikita Mazepin",     tier: "alumni", note: "F2 2020 P5 · Hitech · → Haas F1 2021 (contract terminated 2022)" },
  { name: "Jüri Vips",          tier: "alumni", note: "Red Bull junior · Hitech F2 multiple seasons" },
  { name: "Marcus Armstrong",   tier: "alumni", note: "Red Bull junior · Hitech F2 2021 · → IndyCar" },
  { name: "Ritomo Miyata",      tier: "junior", note: "Toyota junior · F2 2025 · Japanese champion" },
  { name: "Colton Herta",       tier: "junior", note: "IndyCar star on F2 programme · Hitech 2025" },
];

export const hitechGPIconicCars: TeamIconicCar[] = [
  {
    name: "Hitech Dallara F3 2023",
    year: 2023,
    subtitle: "Macau Grand Prix car",
    meta: "70TH MACAU GRAND PRIX 2023 · HITECH · RED LIVERY",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/70th_MACAU_GRAND_PRIX_%28101%29.jpg",
  },
  {
    name: "Hitech Dallara F2 2025",
    year: 2025,
    subtitle: "Miyata & Herta",
    meta: "HITECH TGR · F2 2025 · TOYOTA JUNIOR PROGRAMME",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8e/2024_FIA_Formula_2_Silverstone_%2854042745964%29.jpg",
  },
];

/* ─── Campos Racing (F2 / F3) ────────────────────────────────────────────── */

export const camposRacing: Team = {
  id: "campos",
  name: "Campos Racing",
  shortName: "Campos",
  country: "Spain",
  series: ["f2", "f3"],
  founded: 1997,
  current: true,
  entityColor: "campos",
  liveryHex: "#002266",
  bio: "Founded in 1997 in Alzira, Valencia by former F1 driver Adrián Campos, Campos Racing is one of the most established Spanish motorsport organisations. Their GP2 Teams Championship in 2008 (with Timo Glock winning the driver title) remains their headline result. After Adrián Campos Sr. passed away in January 2021, his son Adrián Campos Jr. took the helm. Today, Campos competes in both F2 and F3, regularly producing Spanish academy talent and international juniors.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Campos Racing team quote memorable\"]",
  quoteContext: "",
};

export const camposRacingStats: TeamStats = {
  teamId: "campos",
  constructorsTitles: 1,
  driversTitles: 1,
  wins: 16,
  podiums: 52,
  seasons: 19,
  firstSeason: 2005,
};

export const camposRacingEras: TeamEngineeringEra[] = [
  {
    teamId: "campos",
    label: "GP2 Championship",
    seasons: "2008",
    description:
      "Timo Glock won the GP2 Series with Campos Racing in 2008 — one of the most decorated seasons in the team's history. The German went on to race in Formula 1 for Toyota and Marussia/Virgin. The constructors' title cemented Campos as a legitimate GP2 power.",
    championships: 1,
    driverNames: "GLOCK",
    champLabel: "GP2 CHAMP",
    golden: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Lucas_Di_Grassi_2008_GP2_Valencia.jpg",
  },
  {
    teamId: "campos",
    label: "F2 & F3 Era",
    seasons: "2017–present",
    description:
      "Campos competes regularly in F2 and F3 under Adrián Campos Jr. Their blue-and-white Spanish livery is a paddock fixture. In 2025 they took the F3 Teams Championship. Known for developing Spanish and South American talent, they play a key feeder role for national motorsport programmes.",
    championships: 0,
    driverNames: "MARTÍ · TSOLOV · LINDBLAD",
    champLabel: "F3 TEAMS 2025",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/70th_MACAU_GRAND_PRIX_%28192%29.jpg",
  },
];

export const camposRacingSignatureBars: TeamSignatureBar[] = [
  { label: "Spanish talent pipeline",  rating: "EXCEPTIONAL", value: 88, caption: "ALONSO EARLY CAREER · CURRENT NATIONAL TALENT", sentiment: "strength" },
  { label: "Race setup",               rating: "MODERATE",    value: 66, caption: "CONSISTENT MIDFIELD THROUGHOUT F2 ERA",          sentiment: "neutral"  },
  { label: "Qualifying",               rating: "MODERATE",    value: 64, caption: "Q3 APPEARANCE RATE ~35% IN F2",                  sentiment: "neutral"  },
  { label: "Team longevity",           rating: "EXCEPTIONAL", value: 92, caption: "28 YEARS OF JUNIOR MOTORSPORT EXPERIENCE",       sentiment: "strength" },
  { label: "Development culture",      rating: "STRONG",      value: 76, caption: "NATIONAL TALENT INCUBATOR · SPAIN & LATAM",      sentiment: "strength" },
  { label: "Championship pedigree",    rating: "HIGH",        value: 74, caption: "GP2 2008 CHAMPION · F3 2025 TEAMS TITLE",        sentiment: "strength" },
];

export const camposRacingReelSlides: ReelSlide[] = [
  {
    slotLabel: "GP2 2008",
    badge: "GP2 CHAMPION",
    glowColor: "#002266",
    kicker: "CAMPOS RACING · TIMO GLOCK · GP2 2008",
    headline: "Glock wins GP2",
    meta: "2008 · TIMO GLOCK · GP2 DRIVER + TEAMS CHAMPION",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Lucas_Di_Grassi_2008_GP2_Valencia.jpg",
  },
  {
    slotLabel: "MACAU 2023",
    badge: "F3 ACTION",
    glowColor: "#002266",
    kicker: "CAMPOS · MACAU GRAND PRIX 2023",
    headline: "Macau 2023",
    meta: "70TH MACAU GP · CAMPOS · F3 COMPETITION",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/70th_MACAU_GRAND_PRIX_%28192%29.jpg",
  },
];

export const camposRacingAcademy: TeamAcademyDriver[] = [
  { name: "Timo Glock",          tier: "alumni", note: "GP2 2008 champion · Campos · → Toyota/Virgin/Marussia F1" },
  { name: "Fernando Alonso",     tier: "alumni", note: "Euro Open champion with Campos forerunner · → F1 2× WDC" },
  { name: "Pepe Martí",          tier: "junior", note: "Spanish junior · F2 2025 with Campos · Red Bull interest" },
  { name: "Nikola Tsolov",       tier: "junior", note: "Bulgarian junior · F2 & F3 Campos 2025" },
  { name: "Arvid Lindblad",      tier: "junior", note: "UK junior · F2 2025 Campos · Red Bull academy" },
];

export const camposRacingIconicCars: TeamIconicCar[] = [
  {
    name: "Campos GP2 Dallara GP2/05",
    year: 2008,
    subtitle: "Glock's championship car",
    meta: "GP2 CHAMPION 2008 · TIMO GLOCK · CAMPOS RACING",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Lucas_Di_Grassi_2008_GP2_Valencia.jpg",
  },
  {
    name: "Campos Dallara F3 2023",
    year: 2023,
    subtitle: "Macau Grand Prix",
    meta: "70TH MACAU GRAND PRIX 2023 · CAMPOS RACING",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/70th_MACAU_GRAND_PRIX_%28192%29.jpg",
  },
];

/* ─── Rodin Motorsport (F2 / F3) ─────────────────────────────────────────── */

export const rodinMotorsport: Team = {
  id: "rodin",
  name: "Rodin Motorsport",
  shortName: "Rodin",
  country: "United Kingdom",
  series: ["f2", "f3"],
  founded: 1996,
  current: true,
  entityColor: "rodin",
  liveryHex: "#CC3300",
  bio: "The team was founded in 1996 as Carlin Motorsport by Trevor Carlin and Martin Stone, building a formidable reputation across British junior formulae over nearly three decades. In January 2023, New Zealand entrepreneur David Dicker's Rodin Cars company acquired an 80% stake; the team rebranded fully as Rodin Motorsport in January 2024. They brought the entire Carlin F2 and F3 operation — infrastructure, engineers, paddock facilities — under the Rodin banner, entering both championships from 2024.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Rodin Motorsport team quote memorable\"]",
  quoteContext: "",
};

export const rodinMotorsportStats: TeamStats = {
  teamId: "rodin",
  constructorsTitles: 0,
  driversTitles: 0,
  wins: 8,
  podiums: 24,
  seasons: 2,
  firstSeason: 2024,
};

export const rodinMotorsportEras: TeamEngineeringEra[] = [
  {
    teamId: "rodin",
    label: "Carlin Heritage",
    seasons: "1996–2023",
    description:
      "As Carlin, the team produced British Formula 3 champions, Formula Renault champions, and hundreds of junior graduates. Dan Ticktum, Logan Sargeant, and Liam Lawson all spent time in Carlin machinery. In F2 (from the series' inception) they were a reliable top-six outfit.",
    championships: 0,
    driverNames: "SARGEANT · LAWSON · TICKTUM",
    champLabel: "CARLIN ERA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/FIA_F2_Austria_2022_Nr._5_Lawson.jpg",
  },
  {
    teamId: "rodin",
    label: "Rodin Era",
    seasons: "2024–present",
    description:
      "Under the Rodin banner since 2024, the operation fields cars in both F2 and F3. New Zealand backing from David Dicker's Rodin Cars enterprise provides fresh investment. Alex Dunne (Ireland) and Amaury Cordeel lead the F2 effort; Louis Sharp (GB3 champion 2024) heads the F3 programme, signalling a focus on fresh talent development.",
    championships: 0,
    driverNames: "DUNNE · CORDEEL · SHARP",
    champLabel: "BUILDING",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/2024_FIA_Formula_2_Silverstone_%2854041553487%29.jpg",
  },
];

export const rodinMotorsportSignatureBars: TeamSignatureBar[] = [
  { label: "Engineering heritage",   rating: "STRONG",    value: 78, caption: "28-YEAR CARLIN MOTORSPORT FOUNDATION",   sentiment: "strength" },
  { label: "Race setup",             rating: "MODERATE",  value: 66, caption: "STILL ESTABLISHING RODIN-ERA IDENTITY",   sentiment: "neutral"  },
  { label: "Talent identification",  rating: "HIGH",      value: 76, caption: "SHARP FROM GB3 · DUNNE FROM FRECA",       sentiment: "strength" },
  { label: "NZ backing resources",   rating: "STRONG",    value: 74, caption: "RODIN CARS INVESTMENT POST-2023",          sentiment: "neutral"  },
  { label: "Championship threat",    rating: "MODERATE",  value: 60, caption: "EARLY RODIN ERA · BUILDING MOMENTUM",     sentiment: "neutral"  },
  { label: "Junior development",     rating: "HIGH",      value: 78, caption: "LAWSON · SARGEANT · SHARP PIPELINE",      sentiment: "strength" },
];

export const rodinMotorsportReelSlides: ReelSlide[] = [
  {
    slotLabel: "CARLIN LEGACY",
    badge: "HERITAGE",
    glowColor: "#CC3300",
    kicker: "CARLIN → RODIN · 28 YEARS",
    headline: "Carlin heritage",
    meta: "FOUNDED 1996 · LAWSON · SARGEANT · TICKTUM ALUMNI",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/52/Lando_Norris_%26_Sergio_Sette_Camara%2C_Carlin_F2_Team_%2843693722652%29.jpg",
  },
  {
    slotLabel: "RODIN 2024",
    badge: "NEW ERA",
    glowColor: "#CC3300",
    kicker: "RODIN MOTORSPORT · F2 & F3 2024",
    headline: "Rodin debut",
    meta: "2024 · ALEX DUNNE · AMAURY CORDEEL · F2 PROGRAMME",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/FIA_F2_Austria_2025_Nr._17_Dunne.jpg",
  },
];

export const rodinMotorsportAcademy: TeamAcademyDriver[] = [
  { name: "Liam Lawson",      tier: "alumni", note: "Red Bull junior · Carlin F2 · → AlphaTauri/Racing Bulls F1 2023–present" },
  { name: "Logan Sargeant",   tier: "alumni", note: "Carlin F2 2022 · → Williams F1 2023–24" },
  { name: "Dan Ticktum",      tier: "alumni", note: "Carlin F2/GP3 2018–20 · Red Bull junior" },
  { name: "Alex Dunne",       tier: "junior", note: "Irish junior · Rodin F2 2025" },
  { name: "Louis Sharp",      tier: "junior", note: "GB3 champion 2024 · Rodin F3 2025" },
];

export const rodinMotorsportIconicCars: TeamIconicCar[] = [
  {
    name: "Carlin Dallara F2 2022",
    year: 2022,
    subtitle: "Sargeant/Lawson era",
    meta: "CARLIN F2 2022 · SARGEANT & LAWSON · PRE-F1 LAUNCHPAD",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/FIA_F2_Austria_2022_Nr._5_Lawson.jpg",
  },
  {
    name: "Rodin Dallara F2 2024",
    year: 2024,
    subtitle: "Rebrand debut",
    meta: "RODIN MOTORSPORT F2 DEBUT 2024 · DUNNE & CORDEEL",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/FIA_F2_Austria_2025_Nr._17_Dunne.jpg",
  },
];

/* ─── Van Amersfoort Racing (F2 / F3) ────────────────────────────────────── */

export const vanAmersfoort: Team = {
  id: "vaf",
  name: "Van Amersfoort Racing",
  shortName: "VAF",
  country: "Netherlands",
  series: ["f2", "f3"],
  founded: 1975,
  current: true,
  entityColor: "vaf",
  liveryHex: "#FF9900",
  bio: "Van Amersfoort Racing, based in Zeewolde, Netherlands, is one of the oldest motorsport outfits still competing in global single-seater racing — founded in 1975 by Frits van Amersfoort. Their most famous alumni are Max Verstappen and Charles Leclerc, both of whom raced for VAF in European Formula 3 on their way to Formula 1. Four German F3 driver championships and ten F1 graduates define their historical legacy. They entered the FIA F2 and F3 Championships in 2022.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Van Amersfoort Racing team quote memorable\"]",
  quoteContext: "",
};

export const vanAmersfoortStats: TeamStats = {
  teamId: "vaf",
  constructorsTitles: 0,
  driversTitles: 4,
  wins: 12,
  podiums: 36,
  seasons: 4,
  firstSeason: 2022,
};

export const vanAmersfoortEras: TeamEngineeringEra[] = [
  {
    teamId: "vaf",
    label: "German F3 Dynasty",
    seasons: "1998–2015",
    description:
      "Four German Formula Three championships across the team's history, including landmark seasons that launched Max Verstappen (2014) and Charles Leclerc (2015 post-F3 European) through their junior careers. VAF was the blueprint for the modern Dutch driver development machine.",
    championships: 4,
    driverNames: "VERSTAPPEN · LECLERC · MAWSON",
    champLabel: "4× GER F3",
    golden: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Charles_Leclerc%2C_Formel_3_2015.JPG",
  },
  {
    teamId: "vaf",
    label: "FIA F2 & F3 Era",
    seasons: "2022–present",
    description:
      "VAF joined the FIA F2 and F3 grids in 2022, replacing HWA Racelab. The step up brought the team's development culture to the highest level of the junior single-seater pyramid. Without a title yet in F2 or F3, they are an established presence that regularly develops internationally-backed talent.",
    championships: 0,
    driverNames: "NEWEY · VILLAGOMEZ · NAËL",
    champLabel: "BUILDING",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fd/2024_FIA_Formula_2_Silverstone_%2854042867645%29.jpg",
  },
];

export const vanAmersfoortSignatureBars: TeamSignatureBar[] = [
  { label: "Development heritage",   rating: "EXCEPTIONAL", value: 90, caption: "VERSTAPPEN & LECLERC ALUMNI",          sentiment: "strength" },
  { label: "F2/F3 competitive pace", rating: "MODERATE",    value: 64, caption: "BUILDING F2/F3 ERA IDENTITY SINCE 2022", sentiment: "neutral"  },
  { label: "Dutch driver pipeline",  rating: "STRONG",      value: 80, caption: "VILLAGOMEZ · NAËL · NATIONAL TALENT",   sentiment: "strength" },
  { label: "Longevity & stability",  rating: "EXCEPTIONAL", value: 92, caption: "50 YEARS IN RACING · FRITS VAN AMERSFOORT", sentiment: "strength" },
  { label: "F1 graduation rate",     rating: "EXCEPTIONAL", value: 88, caption: "10 F1 GRADUATES INCLUDING MV1 + CL16",  sentiment: "strength" },
  { label: "Championship threat",    rating: "MODERATE",    value: 58, caption: "STILL ASCENDING THE F2/F3 LADDER",      sentiment: "neutral"  },
];

export const vanAmersfoortReelSlides: ReelSlide[] = [
  {
    slotLabel: "VERSTAPPEN 2014",
    badge: "F3 LEGEND",
    glowColor: "#FF9900",
    kicker: "VAF · MAX VERSTAPPEN · GERMAN F3 2014",
    headline: "Verstappen at VAF",
    meta: "2014 · GERMAN FORMULA 3 · HOCKENHEIM · VAF LIVERY",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/2014_F3_HockenheimringII_Max_Verstappen_by_2eight_DSC7625.jpg",
  },
  {
    slotLabel: "F2 2022",
    badge: "F2 DEBUT",
    glowColor: "#FF9900",
    kicker: "VAN AMERSFOORT · F2 DEBUT SEASON",
    headline: "VAF enters F2",
    meta: "2022 · FIRST FIA F2 SEASON · DUTCH OUTFIT AT THE TOP",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/EU5A1098_%2852616407928%29.jpg",
  },
];

export const vanAmersfoortAcademy: TeamAcademyDriver[] = [
  { name: "Max Verstappen",     tier: "alumni", note: "German F3 2014 with VAF → Toro Rosso/Red Bull F1 · 4× WDC" },
  { name: "Charles Leclerc",    tier: "alumni", note: "F3 European 2016 with VAF → Sauber/Ferrari F1" },
  { name: "Mick Schumacher",    tier: "alumni", note: "F3 European 2016–18 with VAF · → Haas F1" },
  { name: "Liam Lawson",        tier: "alumni", note: "F3 2020 P2 with VAF → Racing Bulls F1 2023–present" },
  { name: "Oliver Bearman",     tier: "alumni", note: "F4 with VAF programme · → Prema → Haas F1" },
  { name: "Rafael Villagómez",  tier: "junior", note: "Mexican junior · VAF F2 2025" },
];

export const vanAmersfoortIconicCars: TeamIconicCar[] = [
  {
    name: "VAF Dallara F312 — 2014",
    year: 2014,
    subtitle: "Max Verstappen's German F3 car",
    meta: "MAX VERSTAPPEN · GERMAN FORMULA 3 2014 · HOCKENHEIM",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/2014_F3_HockenheimringII_Max_Verstappen_by_2eight_DSC7625.jpg",
  },
  {
    name: "VAF Dallara F2 2024",
    year: 2024,
    subtitle: "F2 era",
    meta: "VAN AMERSFOORT RACING · FIA F2 2024 · DUTCH OUTFIT",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fd/2024_FIA_Formula_2_Silverstone_%2854042867645%29.jpg",
  },
];

/* ─── F3-specific team data ──────────────────────────────────────────────── */

/* ART Grand Prix — F3 */

export const artF3: Team = {
  id: "art-f3",
  name: "ART Grand Prix",
  shortName: "ART",
  country: "France",
  series: ["f3"],
  founded: 1996,
  current: true,
  entityColor: "art",
  liveryHex: "#888888",
  bio: "ART Grand Prix are the benchmark of FIA F3. Victor Martins delivered their first FIA F3 drivers' title in 2022 — a wire-to-wire dominant campaign. Before that, ART were the dominant force in the predecessor GP3 Series, winning titles with Pierre Gasly (2016) and Anthoine Hubert (2018). Their ability to convert factory-backed talent into champions across multiple junior single-seater series is unmatched.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"ART Grand Prix team quote memorable\"]",
  quoteContext: "",
};
export const artF3Stats: TeamStats = {
  teamId: "art-f3",
  constructorsTitles: 1,
  driversTitles: 1,
  wins: 28,
  podiums: 78,
  seasons: 6,
  firstSeason: 2019,
};
export const artF3Eras: TeamEngineeringEra[] = [
  {
    teamId: "art-f3",
    label: "GP3 Legacy",
    seasons: "2010–2018",
    description: "ART Grand Prix dominated the GP3 Series across nine seasons, winning driver titles with Valtteri Bottas (2011), George Russell (2015), Pierre Gasly (2016), and Anthoine Hubert (2018). Their car preparation and driver development culture in the spec-chassis era became the blueprint for every competitor.",
    championships: 5,
    driverNames: "GASLY · HUBERT · RUSSELL",
    champLabel: "5× GP3",
    golden: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Art-grosjean-spain-2008-lrg.jpg",
  },
  {
    teamId: "art-f3",
    label: "FIA F3 Era",
    seasons: "2019–present",
    description: "ART transitioned into the rebranded FIA F3 Championship in 2019 and immediately competed at the front. Victor Martins took the 2022 title in dominant fashion, continuing the ART tradition of converting championship-level talent into title winners. Théo Pourchaire, Dino Beganovic, and Barnaby Zug all progressed through the ART F3 pipeline.",
    championships: 1,
    driverNames: "MARTINS · POURCHAIRE · BEGANOVIC",
    champLabel: "1× F3",
    current: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/FIA_F3_Austria_2022_Nr._7_Martins.jpg",
  },
];
export const artF3SignatureBars: TeamSignatureBar[] = [
  { label: "Qualifying performance",      rating: "EXCEPTIONAL", value: 90, caption: "MOST FRONT-ROW POSITIONS IN FIA F3",     sentiment: "strength" },
  { label: "Race setup conversion",       rating: "STRONG",      value: 83, caption: "CONSISTENT PODIUM DELIVERY 2019–2024",   sentiment: "strength" },
  { label: "Driver academy links",        rating: "EXCEPTIONAL", value: 92, caption: "FERRARI · MERCEDES · ALPINE JUNIORS",    sentiment: "strength" },
  { label: "Championship execution",      rating: "HIGH",        value: 80, caption: "MARTINS 2022 WIRE-TO-WIRE",              sentiment: "strength" },
  { label: "Tyre management",            rating: "HIGH",        value: 76, caption: "SPEC CHASSIS DIFFERENTIAL EDGE",         sentiment: "neutral"  },
  { label: "F1 graduation rate",         rating: "EXCEPTIONAL", value: 88, caption: "GASLY · HUBERT · RUSSELL · MARTINS F2",  sentiment: "strength" },
];
export const artF3ReelSlides: ReelSlide[] = [
  {
    slotLabel: "2022 F3",
    badge: "F3 CHAMPION",
    glowColor: "#888888",
    kicker: "ART · VICTOR MARTINS · 2022",
    headline: "Martins wins F3",
    meta: "FIA F3 2022 CHAMPION · ALPINE ACADEMY · DOMINANT CAMPAIGN",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/FIA_F3_Austria_2022_Nr._7_Martins.jpg",
  },
  {
    slotLabel: "GP3 LEGACY",
    badge: "GP3",
    glowColor: "#888888",
    kicker: "ART · GP3 DYNASTY · 2010–2018",
    headline: "GP3 dynasty",
    meta: "GASLY · HUBERT · RUSSELL · BOTTAS · 5 GP3 TITLES",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/FIA_F3_Austria_2022_Nr._8_Saucy.jpg",
  },
];
export const artF3Academy: TeamAcademyDriver[] = [
  { name: "Pierre Gasly",         tier: "alumni", note: "GP3 2016 champion · ART · → Red Bull/AlphaTauri/Alpine F1" },
  { name: "George Russell",       tier: "alumni", note: "GP3 2015 champion · ART · → Williams → Mercedes F1" },
  { name: "Anthoine Hubert",      tier: "alumni", note: "GP3 2018 champion · ART · tragically lost Spa 2019", deceased: true },
  { name: "Victor Martins",       tier: "alumni", note: "FIA F3 2022 champion · ART · → F2 Alpine academy" },
  { name: "Théo Pourchaire",      tier: "alumni", note: "F3 2019 with ART · → ART F2 2021–23 champion · Sauber reserve" },
  { name: "Dino Beganovic",       tier: "junior", note: "Ferrari junior · ART F3 2022 · → Ferrari reserve" },
];
export const artF3IconicCars: TeamIconicCar[] = [
  {
    name: "ART Dallara F3 2022",
    year: 2022,
    subtitle: "Martins' championship car",
    meta: "FIA F3 CHAMPION 2022 · VICTOR MARTINS · ALPINE ACADEMY",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/FIA_F3_Austria_2022_Nr._7_Martins.jpg",
  },
  {
    name: "ART Dallara F3 2024",
    year: 2024,
    subtitle: "Beganovic & Zug era",
    meta: "ART F3 2024 · FERRARI JUNIOR · DUAL-SERIES PROGRAMME",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/FIA_F3_Austria_2022_Nr._8_Saucy.jpg",
  },
];

/* Hitech Grand Prix — F3 */

export const hitechF3: Team = {
  id: "hitech-f3",
  name: "Hitech TGR",
  shortName: "Hitech",
  country: "United Kingdom",
  series: ["f3"],
  founded: 2018,
  current: true,
  entityColor: "hitech",
  liveryHex: "#CC0022",
  bio: "Hitech TGR fields a competitive FIA F3 programme backed by Toyota Gazoo Racing, running in parallel with their F2 operation. Jak Crawford, Marcus Armstrong, and Ayumu Iwasa all progressed through their F3 machinery. Their Silverstone engineering base and TGR backing gives them access to Asian and European junior talent, making them a consistent points-scorer across the FIA F3 field.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Hitech TGR team quote memorable\"]",
  quoteContext: "",
};
export const hitechF3Stats: TeamStats = {
  teamId: "hitech-f3",
  constructorsTitles: 0,
  driversTitles: 0,
  wins: 8,
  podiums: 26,
  seasons: 6,
  firstSeason: 2019,
};
export const hitechF3Eras: TeamEngineeringEra[] = [
  {
    teamId: "hitech-f3",
    label: "Red Bull Era",
    seasons: "2019–2021",
    description: "Hitech attracted Red Bull junior talent early in their F3 programme. Marcus Armstrong (2020–21), Jak Crawford (2021), and Ayumu Iwasa all developed through the Hitech machinery. Leonardo Pulcini was an early highlight. Consistent top-ten finishes and occasional race wins marked this productive period.",
    championships: 0,
    driverNames: "ARMSTRONG · CRAWFORD · IWASA",
    champLabel: "RED BULL ERA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ef/FIA_F3_Austria_2019_Nr._20_Pulcini.jpg",
  },
  {
    teamId: "hitech-f3",
    label: "TGR Partnership",
    seasons: "2022–present",
    description: "The Toyota Gazoo Racing partnership injected fresh resource and a pipeline of TOYOTA-backed Asian talent. Ritomo Miyata and Colton Herta headline the current effort. The dual F2/F3 programme under the Hitech TGR banner gives drivers a clear internal ladder to progress.",
    championships: 0,
    driverNames: "MIYATA · HERTA · CRAWFORD",
    champLabel: "TGR ERA",
    current: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/37/FIA_F3_Austria_2021_Nr._10_Crawford.jpg",
  },
];
export const hitechF3SignatureBars: TeamSignatureBar[] = [
  { label: "Engineering setup",      rating: "HIGH",      value: 76, caption: "CONSISTENT TOP-TEN IN SPEC CHASSIS",   sentiment: "neutral"  },
  { label: "Qualifying pace",        rating: "MODERATE",  value: 68, caption: "OCCASIONAL FRONT-ROW STARTS",         sentiment: "neutral"  },
  { label: "TGR driver pipeline",    rating: "STRONG",    value: 80, caption: "TOYOTA BACKED ASIAN TALENT",          sentiment: "strength" },
  { label: "Red Bull alumni",        rating: "STRONG",    value: 78, caption: "ARMSTRONG · CRAWFORD · IWASA → F2",   sentiment: "strength" },
  { label: "Race execution",         rating: "MODERATE",  value: 65, caption: "PODIUM PACE WITHOUT CONSISTENT WINS", sentiment: "neutral"  },
  { label: "F1 graduation rate",     rating: "HIGH",      value: 74, caption: "CRAWFORD RB F1 2024 · IWASA TESTING", sentiment: "strength" },
];
export const hitechF3ReelSlides: ReelSlide[] = [
  {
    slotLabel: "CRAWFORD 2021",
    badge: "F3 WIN",
    glowColor: "#CC0022",
    kicker: "HITECH · JAK CRAWFORD · RED BULL JUNIOR",
    headline: "Crawford in F3",
    meta: "2021 · JAK CRAWFORD · RED BULL JUNIOR → RB F1 2024",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/37/FIA_F3_Austria_2021_Nr._10_Crawford.jpg",
  },
  {
    slotLabel: "IWASA 2021",
    badge: "F3 WIN",
    glowColor: "#CC0022",
    kicker: "HITECH · AYUMU IWASA · TOYOTA JUNIOR",
    headline: "Iwasa in F3",
    meta: "2021 · AYUMU IWASA · TOYOTA GR · JAPANESE PRODIGY",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/FIA_F3_Austria_2021_Nr._11_Iwasa.jpg",
  },
];
export const hitechF3Academy: TeamAcademyDriver[] = [
  { name: "Marcus Armstrong",  tier: "alumni", note: "New Zealand · Hitech F3 2020–21 · Red Bull junior · → IndyCar" },
  { name: "Jak Crawford",      tier: "alumni", note: "Red Bull junior · Hitech F3 2021 · → RB/DAMS F2 · F1 testing" },
  { name: "Ayumu Iwasa",       tier: "alumni", note: "Toyota junior · Hitech F3 2021 · → DAMS/Hitech F2 2022" },
  { name: "Ritomo Miyata",     tier: "junior", note: "Toyota junior · F3 2023–24 · F2 2025 · Japanese champion" },
  { name: "Colton Herta",      tier: "junior", note: "IndyCar race winner · F3/F2 programme 2025 with Hitech" },
];
export const hitechF3IconicCars: TeamIconicCar[] = [
  {
    name: "Hitech Dallara F3 2021",
    year: 2021,
    subtitle: "Crawford & Iwasa era",
    meta: "FIA F3 2021 · JAK CRAWFORD · AYUMU IWASA · RED BULL PIPELINE",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/37/FIA_F3_Austria_2021_Nr._10_Crawford.jpg",
  },
  {
    name: "Hitech Dallara F3 2019",
    year: 2019,
    subtitle: "Inaugural FIA F3 season",
    meta: "FIA F3 DEBUT 2019 · PULCINI · HITECH FOUNDATION",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ef/FIA_F3_Austria_2019_Nr._20_Pulcini.jpg",
  },
];

/* MP Motorsport — F3 */

export const mpF3: Team = {
  id: "mp-f3",
  name: "MP Motorsport",
  shortName: "MP",
  country: "Netherlands",
  series: ["f3"],
  founded: 1995,
  current: true,
  entityColor: "mp",
  liveryHex: "#FF6600",
  bio: "MP Motorsport run a parallel FIA F3 programme alongside their F2 operation. Their Dutch identity and race engineering depth have developed drivers including Alexander Smolyar and Caio Collet through the FIA F3 ranks. Without a title yet in the series, MP are a consistent points-scoring outfit whose F3 programme feeds directly into their F2 operation, providing continuity for rising talent.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"MP Motorsport team quote memorable\"]",
  quoteContext: "",
};
export const mpF3Stats: TeamStats = {
  teamId: "mp-f3",
  constructorsTitles: 0,
  driversTitles: 0,
  wins: 5,
  podiums: 18,
  seasons: 5,
  firstSeason: 2020,
};
export const mpF3Eras: TeamEngineeringEra[] = [
  {
    teamId: "mp-f3",
    label: "F3 Entry",
    seasons: "2020–2022",
    description: "MP entered FIA F3 with their proven race engineering culture from F2. Alexander Smolyar was a consistent scorer in 2020. Caio Collet brought Brazilian talent to the programme in 2022. The team's orange livery became a recognisable presence across the junior grid.",
    championships: 0,
    driverNames: "SMOLYAR · COLLET · VERSCHOOR",
    champLabel: "BUILDING",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Alexander_Smolyar_%28MP_Motorsport%29.jpg",
  },
  {
    teamId: "mp-f3",
    label: "F3 Development",
    seasons: "2023–present",
    description: "MP's F3 programme continued to attract talent with aspirations of progressing internally to their F2 team. Their dual-ladder system gives drivers a clear development pathway, and the team's setup knowledge from F2 feeds back into F3 chassis development.",
    championships: 0,
    driverNames: "COLLET · JUNIOR PIPELINE",
    champLabel: "COMPETITIVE",
    current: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/FIA_F3_Austria_2022_Nr._10_Collet.jpg",
  },
];
export const mpF3SignatureBars: TeamSignatureBar[] = [
  { label: "Engineering depth",     rating: "STRONG",   value: 76, caption: "F2 KNOWLEDGE TRANSFER TO F3 SETUP",    sentiment: "strength" },
  { label: "Dutch talent pipeline", rating: "STRONG",   value: 72, caption: "NATIONAL TALENT DEVELOPMENT FOCUS",    sentiment: "strength" },
  { label: "Race execution",        rating: "MODERATE", value: 64, caption: "POINTS FINISHES CONSISTENTLY DELIVERED",sentiment: "neutral"  },
  { label: "F3 to F2 ladder",      rating: "HIGH",     value: 78, caption: "INTERNAL PROMOTION SYSTEM OPERATIONAL", sentiment: "strength" },
  { label: "Championship threat",   rating: "LOW",      value: 50, caption: "YET TO CHALLENGE FOR F3 TITLE",        sentiment: "neutral"  },
  { label: "Driver development",    rating: "MODERATE", value: 68, caption: "SMOLYAR · COLLET DEVELOPED EFFECTIVELY",sentiment: "strength" },
];
export const mpF3ReelSlides: ReelSlide[] = [
  {
    slotLabel: "SMOLYAR 2020",
    badge: "F3 DEBUT",
    glowColor: "#FF6600",
    kicker: "MP MOTORSPORT · ALEXANDER SMOLYAR · F3 2020",
    headline: "Smolyar at MP",
    meta: "2020 · RUSSIAN JUNIOR · MP F3 DEBUT SEASON · ORANGE LIVERY",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Alexander_Smolyar_%28MP_Motorsport%29.jpg",
  },
  {
    slotLabel: "COLLET 2022",
    badge: "F3 WIN",
    glowColor: "#FF6600",
    kicker: "MP · CAIO COLLET · AUSTRIA 2022",
    headline: "Collet in F3",
    meta: "2022 · CAIO COLLET · RENAULT/ALPINE JUNIOR · BRAZIL",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/FIA_F3_Austria_2022_Nr._10_Collet.jpg",
  },
];
export const mpF3Academy: TeamAcademyDriver[] = [
  { name: "Alexander Smolyar", tier: "alumni", note: "MP F3 2020 · Russian junior · consistent scorer" },
  { name: "Caio Collet",       tier: "alumni", note: "MP F3 2022 · Renault/Alpine junior · Brazilian" },
  { name: "Richard Verschoor", tier: "alumni", note: "MP F3 before moving to MP F2 · Dutch race winner" },
  { name: "Jack Doohan",       tier: "alumni", note: "F3 2020–21 · → DAMS F2 · → Alpine F1 2025" },
];
export const mpF3IconicCars: TeamIconicCar[] = [
  {
    name: "MP Dallara F3 2020",
    year: 2020,
    subtitle: "F3 debut season",
    meta: "MP MOTORSPORT FIA F3 · 2020 · SMOLYAR · ORANGE LIVERY",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Alexander_Smolyar_%28MP_Motorsport%29.jpg",
  },
  {
    name: "MP Dallara F3 2022",
    year: 2022,
    subtitle: "Collet era",
    meta: "MP MOTORSPORT F3 2022 · CAIO COLLET · ALPINE JUNIOR",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/FIA_F3_Austria_2022_Nr._10_Collet.jpg",
  },
];

/* Campos Racing — F3 */

export const camposF3: Team = {
  id: "campos-f3",
  name: "Campos Racing",
  shortName: "Campos",
  country: "Spain",
  series: ["f3"],
  founded: 1997,
  current: true,
  entityColor: "campos",
  liveryHex: "#002266",
  bio: "Campos Racing claimed the 2025 FIA F3 Teams Championship — their first F3 title and a significant milestone for the Spanish outfit. Known for developing Spanish and South American talent, they run a consistent F3 programme alongside their F2 entry. Arvid Lindblad, Nikola Tsolov, and Pepe Martí have all raced in their F3 machinery. Their Alzira base and national motorsport identity make them a cornerstone of the FIA junior pyramid.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Campos Racing team quote memorable\"]",
  quoteContext: "",
};
export const camposF3Stats: TeamStats = {
  teamId: "campos-f3",
  constructorsTitles: 1,
  driversTitles: 0,
  wins: 8,
  podiums: 24,
  seasons: 5,
  firstSeason: 2020,
};
export const camposF3Eras: TeamEngineeringEra[] = [
  {
    teamId: "campos-f3",
    label: "F3 Entry",
    seasons: "2020–2023",
    description: "Campos entered FIA F3 bringing their GP2/F2 operational experience. David Vidales gave the team strong F3 results in 2022. Spanish and international talent passed through the blue-and-white livery, building the operational foundation that would eventually deliver a teams title.",
    championships: 0,
    driverNames: "VIDALES · TSOLOV · JUNIOR GRID",
    champLabel: "BUILDING",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/FIA_F3_Austria_2022_Nr._20_Vidales.jpg",
  },
  {
    teamId: "campos-f3",
    label: "Teams Champions",
    seasons: "2024–present",
    description: "The 2025 FIA F3 Teams Championship validated years of patient development. Arvid Lindblad (Red Bull junior), Nikola Tsolov, and Pepe Martí delivered the consistency across a full season that secured the constructors crown. The title came without a drivers' champion — a true team effort.",
    championships: 1,
    driverNames: "LINDBLAD · TSOLOV · MARTÍ",
    champLabel: "F3 TEAMS 2025",
    golden: true,
    current: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/70th_MACAU_GRAND_PRIX_%28192%29.jpg",
  },
];
export const camposF3SignatureBars: TeamSignatureBar[] = [
  { label: "Spanish talent pipeline",  rating: "EXCEPTIONAL", value: 88, caption: "NACIONAL TALENT · MARTÍ · TSOLOV · LINDBLAD",sentiment: "strength" },
  { label: "Team consistency",         rating: "HIGH",        value: 80, caption: "2025 TEAMS TITLE ACROSS FULL SEASON",        sentiment: "strength" },
  { label: "Race setup",               rating: "MODERATE",    value: 68, caption: "COMPETITIVE MIDFIELD THROUGHOUT F3 ERA",     sentiment: "neutral"  },
  { label: "Team longevity",           rating: "EXCEPTIONAL", value: 90, caption: "DECADES OF JUNIOR MOTORSPORT EXPERIENCE",    sentiment: "strength" },
  { label: "Driver pipeline",          rating: "STRONG",      value: 76, caption: "RED BULL · INDEPENDENT JUNIORS DEVELOPED",   sentiment: "strength" },
  { label: "Championship execution",   rating: "HIGH",        value: 78, caption: "TEAMS TITLE 2025 · BUILDING DRIVERS TITLE",  sentiment: "strength" },
];
export const camposF3ReelSlides: ReelSlide[] = [
  {
    slotLabel: "VIDALES 2022",
    badge: "F3 WIN",
    glowColor: "#002266",
    kicker: "CAMPOS · DAVID VIDALES · F3 2022",
    headline: "Vidales in F3",
    meta: "2022 · DAVID VIDALES · SPANISH JUNIOR · CAMPOS F3",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/FIA_F3_Austria_2022_Nr._20_Vidales.jpg",
  },
  {
    slotLabel: "TEAMS 2025",
    badge: "F3 CHAMPIONS",
    glowColor: "#002266",
    kicker: "CAMPOS · 2025 F3 TEAMS CHAMPIONSHIP",
    headline: "Teams title 2025",
    meta: "LINDBLAD · TSOLOV · MARTÍ · FIELDS' BEST TEAM EFFORT",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/70th_MACAU_GRAND_PRIX_%28192%29.jpg",
  },
];
export const camposF3Academy: TeamAcademyDriver[] = [
  { name: "David Vidales",     tier: "alumni", note: "Campos F3 2022 · Spanish junior · top finisher" },
  { name: "Arvid Lindblad",    tier: "junior", note: "Red Bull junior · F3 2025 Campos · F2 2025 Campos" },
  { name: "Nikola Tsolov",     tier: "junior", note: "Bulgarian junior · Campos F3 & F2 2025" },
  { name: "Pepe Martí",        tier: "junior", note: "Spanish junior · Campos F3 & F2 2025 · Red Bull interest" },
];
export const camposF3IconicCars: TeamIconicCar[] = [
  {
    name: "Campos Dallara F3 2022",
    year: 2022,
    subtitle: "Vidales era",
    meta: "CAMPOS F3 2022 · DAVID VIDALES · SPANISH DEVELOPMENT",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/FIA_F3_Austria_2022_Nr._20_Vidales.jpg",
  },
  {
    name: "Campos Dallara F3 2025",
    year: 2025,
    subtitle: "Teams championship car",
    meta: "F3 TEAMS CHAMPION 2025 · LINDBLAD · TSOLOV · MARTÍ",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/70th_MACAU_GRAND_PRIX_%28192%29.jpg",
  },
];

/* Van Amersfoort Racing — F3 */

export const vafF3: Team = {
  id: "vaf-f3",
  name: "Van Amersfoort Racing",
  shortName: "VAF",
  country: "Netherlands",
  series: ["f3"],
  founded: 1975,
  current: true,
  entityColor: "vaf",
  liveryHex: "#FF9900",
  bio: "Van Amersfoort Racing entered the FIA F3 Championship in 2022 with fifty years of motorsport heritage behind them. Their alumni from the German F3 era — Max Verstappen (2014) and Charles Leclerc (2015–16) — represent the gold standard of what junior F3 can produce. In the FIA F3 era, VAF fields young talent from across Europe and South America, with Franco Colapinto — who went on to race in F1 — among their most notable FIA F3 graduates.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Van Amersfoort Racing team quote memorable\"]",
  quoteContext: "",
};
export const vafF3Stats: TeamStats = {
  teamId: "vaf-f3",
  constructorsTitles: 0,
  driversTitles: 4,
  wins: 12,
  podiums: 35,
  seasons: 3,
  firstSeason: 2022,
};
export const vafF3Eras: TeamEngineeringEra[] = [
  {
    teamId: "vaf-f3",
    label: "German F3 Legend",
    seasons: "1998–2018",
    description: "Four German Formula Three championships anchored the VAF identity. Max Verstappen (2014) and Charles Leclerc (2015–16) chose VAF on their journey to Formula 1. The team's Dutch engineering culture and commitment to driver development produced ten F1 graduates from their F3 programme alone.",
    championships: 4,
    driverNames: "VERSTAPPEN · LECLERC · MAWSON",
    champLabel: "4× GER F3",
    golden: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/2014_F3_HockenheimringII_Max_Verstappen_by_2eight_DSC7625.jpg",
  },
  {
    teamId: "vaf-f3",
    label: "FIA F3 Era",
    seasons: "2022–present",
    description: "VAF entered the FIA F3 and F2 Championships in 2022, bringing their development culture to the highest level of the junior ladder. Franco Colapinto drove their F3 car before his remarkable rise to Formula 1 with Williams in 2024. Rafael Villagómez, Oliver Gray, and Luke Browning have continued the tradition.",
    championships: 0,
    driverNames: "COLAPINTO · VILLAGÓMEZ · BROWNING",
    champLabel: "BUILDING",
    current: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/FIA_F3_Austria_2022_Nr._29_Colapinto.jpg",
  },
];
export const vafF3SignatureBars: TeamSignatureBar[] = [
  { label: "Development heritage",    rating: "EXCEPTIONAL", value: 92, caption: "VERSTAPPEN & LECLERC · FIFTY YEAR LEGACY",   sentiment: "strength" },
  { label: "FIA F3 competitive pace", rating: "MODERATE",   value: 62, caption: "BUILDING F3 IDENTITY SINCE 2022",            sentiment: "neutral"  },
  { label: "Dutch driver pipeline",   rating: "STRONG",     value: 80, caption: "NATIONAL TALENT DEVELOPMENT FOCUS",          sentiment: "strength" },
  { label: "F1 graduate production",  rating: "EXCEPTIONAL",value: 90, caption: "10 F1 DRIVERS INCLUDING MV1 & CL16",        sentiment: "strength" },
  { label: "Longevity",              rating: "EXCEPTIONAL", value: 94, caption: "FOUNDED 1975 · 50 YEARS IN MOTORSPORT",     sentiment: "strength" },
  { label: "Championship threat",    rating: "LOW",         value: 52, caption: "ASCENDING THE FIA F3 LADDER SINCE 2022",    sentiment: "neutral"  },
];
export const vafF3ReelSlides: ReelSlide[] = [
  {
    slotLabel: "COLAPINTO 2022",
    badge: "F3 DEBUT",
    glowColor: "#FF9900",
    kicker: "VAF · FRANCO COLAPINTO · F3 2022",
    headline: "Colapinto at VAF",
    meta: "2022 · FRANCO COLAPINTO · → WILLIAMS F1 2024 · ARGENTINA",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/FIA_F3_Austria_2022_Nr._29_Colapinto.jpg",
  },
  {
    slotLabel: "VERSTAPPEN 2014",
    badge: "F3 LEGEND",
    glowColor: "#FF9900",
    kicker: "VAF · MAX VERSTAPPEN · GERMAN F3 2014",
    headline: "Verstappen at VAF",
    meta: "2014 · GERMAN FORMULA 3 · HOCKENHEIM · 4× WDC ORIGIN STORY",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/2014_F3_HockenheimringII_Max_Verstappen_by_2eight_DSC7625.jpg",
  },
];
export const vafF3Academy: TeamAcademyDriver[] = [
  { name: "Max Verstappen",     tier: "alumni", note: "German F3 2014 · VAF · → Toro Rosso/Red Bull F1 · 4× WDC" },
  { name: "Charles Leclerc",    tier: "alumni", note: "F3 European 2015–16 · VAF · → Sauber/Ferrari F1" },
  { name: "Franco Colapinto",   tier: "alumni", note: "FIA F3 2022 · VAF · → Williams F1 2024 · Argentine hero" },
  { name: "Rafael Villagómez",  tier: "junior", note: "Mexican junior · FIA F3 2022–23 with VAF" },
  { name: "Mick Schumacher",    tier: "alumni", note: "F3 European with VAF · → Haas F1 2021–22" },
];
export const vafF3IconicCars: TeamIconicCar[] = [
  {
    name: "VAF Dallara F312",
    year: 2014,
    subtitle: "Verstappen's German F3 car",
    meta: "MAX VERSTAPPEN · GERMAN FORMULA 3 2014 · VAF · HOCKENHEIM",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/2014_F3_HockenheimringII_Max_Verstappen_by_2eight_DSC7625.jpg",
  },
  {
    name: "VAF Dallara F3 2022",
    year: 2022,
    subtitle: "Colapinto's FIA F3 car",
    meta: "FIA F3 2022 · FRANCO COLAPINTO · VAF DEBUT SEASON",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/FIA_F3_Austria_2022_Nr._29_Colapinto.jpg",
  },
];

/* Rodin Motorsport — F3 */

export const rodinF3: Team = {
  id: "rodin-f3",
  name: "Rodin Motorsport",
  shortName: "Rodin",
  country: "United Kingdom",
  series: ["f3"],
  founded: 1996,
  current: true,
  entityColor: "rodin",
  liveryHex: "#CC3300",
  bio: "Rodin Motorsport (formerly Carlin) brings twenty-eight years of junior single-seater engineering to the FIA F3 grid. As Carlin, they fielded Logan Sargeant (2019) and Zak O'Sullivan (2022) in F3 with strong results. Under the Rodin banner since 2024, Louis Sharp — GB3 champion 2024 — leads their current F3 programme as New Zealand investment powers a fresh chapter. The institutional knowledge from Carlin's decades of F3 and GP3 work underpins everything.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Rodin Motorsport team quote memorable\"]",
  quoteContext: "",
};
export const rodinF3Stats: TeamStats = {
  teamId: "rodin-f3",
  constructorsTitles: 0,
  driversTitles: 0,
  wins: 6,
  podiums: 20,
  seasons: 6,
  firstSeason: 2019,
};
export const rodinF3Eras: TeamEngineeringEra[] = [
  {
    teamId: "rodin-f3",
    label: "Carlin F3 Era",
    seasons: "2019–2023",
    description: "As Carlin, the team brought elite-level engineering to the FIA F3 grid from the opening season. Logan Sargeant (2019) and Zak O'Sullivan (2022) — who went on to Mercedes and Williams F1 testing — were highlights. Dan Ticktum, Christian Mansell, and others benefited from the decades of Carlin technical knowledge.",
    championships: 0,
    driverNames: "SARGEANT · O'SULLIVAN · TICKTUM",
    champLabel: "CARLIN F3 ERA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/FIA_F3_Austria_2019_Nr._31_Sargeant_1.jpg",
  },
  {
    teamId: "rodin-f3",
    label: "Rodin Rebrand",
    seasons: "2024–present",
    description: "The Rodin rebrand brought New Zealand investment via David Dicker's Rodin Cars enterprise. Louis Sharp — GB3 champion in 2024 — joins the F3 programme as the most high-profile Rodin F3 signing. The full Carlin engineering infrastructure transfers seamlessly under the new name.",
    championships: 0,
    driverNames: "SHARP · MANSELL",
    champLabel: "NEW ERA",
    current: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/FIA_F3_Austria_2022_Nr._26_O%27Sullivan.jpg",
  },
];
export const rodinF3SignatureBars: TeamSignatureBar[] = [
  { label: "Engineering heritage",   rating: "EXCEPTIONAL", value: 88, caption: "28-YEAR CARLIN MOTORSPORT FOUNDATION",   sentiment: "strength" },
  { label: "F3 race setup",          rating: "HIGH",        value: 76, caption: "CARLIN TECHNICAL LIBRARY IN F3",         sentiment: "strength" },
  { label: "Talent identification",  rating: "HIGH",        value: 78, caption: "SARGEANT · O'SULLIVAN · SHARP PIPELINE", sentiment: "strength" },
  { label: "NZ backing resources",   rating: "STRONG",      value: 74, caption: "RODIN CARS INVESTMENT POST-2023",        sentiment: "neutral"  },
  { label: "Championship threat",    rating: "MODERATE",    value: 62, caption: "BUILDING RODIN IDENTITY IN FIA F3",      sentiment: "neutral"  },
  { label: "F1 graduation rate",     rating: "HIGH",        value: 78, caption: "SARGEANT WILLIAMS F1 · O'SULLIVAN MERC",sentiment: "strength" },
];
export const rodinF3ReelSlides: ReelSlide[] = [
  {
    slotLabel: "SARGEANT 2019",
    badge: "F3 WIN",
    glowColor: "#CC3300",
    kicker: "CARLIN · LOGAN SARGEANT · FIA F3 2019",
    headline: "Sargeant in F3",
    meta: "2019 · LOGAN SARGEANT · CARLIN · → WILLIAMS F1 2023–24",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/FIA_F3_Austria_2019_Nr._31_Sargeant_1.jpg",
  },
  {
    slotLabel: "O'SULLIVAN 2022",
    badge: "F3 WIN",
    glowColor: "#CC3300",
    kicker: "CARLIN · ZAK O'SULLIVAN · F3 2022",
    headline: "O'Sullivan in F3",
    meta: "2022 · ZAK O'SULLIVAN · MERCEDES JUNIOR · CARLIN",
    svgPath: "",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/FIA_F3_Austria_2022_Nr._26_O%27Sullivan.jpg",
  },
];
export const rodinF3Academy: TeamAcademyDriver[] = [
  { name: "Logan Sargeant",    tier: "alumni", note: "Carlin F3 2019 · → Carlin F2 2022 · Williams F1 2023–24" },
  { name: "Zak O'Sullivan",    tier: "alumni", note: "Carlin F3 2022 · Mercedes junior · → F2 · Williams testing" },
  { name: "Dan Ticktum",       tier: "alumni", note: "Carlin F3/F2 · Red Bull junior · British driver" },
  { name: "Louis Sharp",       tier: "junior", note: "GB3 champion 2024 · → Rodin F3 2025 · British junior" },
];
export const rodinF3IconicCars: TeamIconicCar[] = [
  {
    name: "Carlin Dallara F3 2019",
    year: 2019,
    subtitle: "Sargeant's debut",
    meta: "FIA F3 2019 · LOGAN SARGEANT · CARLIN MOTORSPORT DEBUT",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/FIA_F3_Austria_2019_Nr._31_Sargeant_1.jpg",
  },
  {
    name: "Carlin Dallara F3 2022",
    year: 2022,
    subtitle: "O'Sullivan era",
    meta: "FIA F3 2022 · ZAK O'SULLIVAN · MERCEDES JUNIOR · CARLIN",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/FIA_F3_Austria_2022_Nr._26_O%27Sullivan.jpg",
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
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"McLaren F1 Team team quote memorable\"]",
  quoteContext: "",
};

export const mclarenStats: TeamStats = {
  teamId: "mclaren",
  constructorsTitles: 10, // corrected from 8; added 2024 + 2025 WCC · source: mclaren.com/racing/heritage/formula-1/2025-championship
  driversTitles: 13, // corrected from 12; added Norris 2025 WDC · source: Wikipedia 2025 F1 season
  wins: 203, // corrected from 183; source: Wikipedia "McLaren are second with 203 wins" (through 2025)
  podiums: 559, // corrected from 514; source: Wikipedia McLaren infobox (through 2025)
  seasons: 60, // corrected from 59; source: 1966–2025
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/McLaren_MP4-4_front-right_Honda_Collection_Hall.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/34/McLaren-Mercedes_MP4-13_1998_F1_Mika_H%C3%A4kkinen_LSide_MBMuse_9June2013_%2814796968698%29.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Lando_Norris%2CChinese_GP_2024.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9c/MCL38_during_the_Japanese_Grand_Prix.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Mika_Hakkinen_in_the_1998_Spanish_Grand_Prix.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9c/MCL38_during_the_Japanese_Grand_Prix.jpg",
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
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Mercedes-AMG Petronas F1 Team team quote memorable\"]",
  quoteContext: "",
};

export const mercedesStats: TeamStats = {
  teamId: "mercedes",
  constructorsTitles: 8, // source: Wikipedia — 2014–2021 (8 consecutive)
  driversTitles: 7, // source: Wikipedia — Hamilton ×6 (2014–2015, 2017–2020), Rosberg 2016
  wins: 125, // [VERIFY · modern team (2010–2025) year-by-year total is ~122; file may include all-era Mercedes; source: en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One]
  podiums: 320, // [VERIFY · Wikipedia infobox shows 315 for all-era Mercedes; source: en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One]
  seasons: 16, // source: 2010–2025 (Brawn successor from 2010)
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
      "The zero-pod W13 concept failed spectacularly — just one win in 2022, Russell's breakthrough at Brazil. Hamilton's relationship with the team frayed. Kimi Antonelli — 18 years old — replaced Hamilton in 2025. The rebuild is underway.",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/FIA_F1_Austria_2022_Nr._44_Hamilton.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/FIA_F1_Austria_2024_Nr._63_Russell.jpg",
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
    name: "W05",
    year: 2014,
    subtitle: "First hybrid WDC",
    meta: "HAMILTON WDC · TURBO V6 ERA BEGINS",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/Lewis_Hamilton_2014_China_Race.jpg",
  },
  {
    name: "W07",
    year: 2016,
    subtitle: "Constructors' title · teammate war",
    meta: "ROSBERG WDC · 19 WINS",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Rosberg_-_2016_Monaco_GP.jpg",
  },
  {
    name: "W11",
    year: 2020,
    subtitle: "Record season",
    meta: "13W FROM 17 · HAMILTON 7TH WDC",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Lewis_Hamilton-Mercedes_W11_%284%29.jpg",
  },
  {
    name: "W15",
    year: 2024,
    subtitle: "Russell-led rebuild",
    meta: "RUSSELL 3 WINS · ANTONELLI 2025",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/FIA_F1_Austria_2024_Nr._63_Russell.jpg",
  },
];

/* ─── Racing Bulls (Visa Cash App RB) ───────────────────────────────────────── */

export const racingBulls: Team = {
  id: "rb",
  name: "Racing Bulls",
  shortName: "Racing Bulls",
  country: "Italy",
  series: ["f1"],
  founded: 2006,
  current: true,
  entityColor: "redbull",
  liveryHex: "#6692FF",
  bio: "The Faenza operation began as Minardi (1985–2005), became Toro Rosso (2006–2019), then AlphaTauri (2020–2023), VCARB / RB in 2024, and Racing Bulls from 2025. The STR3 delivered Sebastian Vettel’s shock 2008 Italian GP win; the AT01 gave Pierre Gasly a maiden victory at Monza 2020; the VCARB 01 brought the new blue and red livery. From 2026 the car runs a Red Bull Ford power unit. 2025 highlight: Isack Hadjar P3 at Zandvoort — first podium under the Racing Bulls name; P6 in the constructors' standings. Current drivers: Liam Lawson (#30) and Arvid Lindblad (#41).",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Racing Bulls Faenza team quote\"]",
  quoteContext: "",
};

export const racingBullsStats: TeamStats = {
  teamId: "rb",
  constructorsTitles: 0,
  driversTitles: 0,
  wins: 2,
  podiums: 0,
  seasons: 21,
  firstSeason: 2006,
};

export const racingBullsEras: TeamEngineeringEra[] = [
  {
    teamId: "rb",
    label: "Toro Rosso",
    seasons: "2006–2019",
    description:
      "Sister team to Red Bull. Vettel’s Monza 2008 win in the STR3 remains a defining underdog story. A proving ground for Verstappen, Ricciardo, Sainz, Gasly, and many more.",
    championships: 0,
    driverNames: "VETTEL · FRIES · KVYAT",
    champLabel: "STR3 MONZA '08",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Vettel_Monza_2008.jpg",
  },
  {
    teamId: "rb",
    label: "AlphaTauri",
    seasons: "2020–2023",
    description:
      "Rebranded Italian fashion-house identity. Gasly’s Monza 2020 win in the AT01; Tsunoda’s promotion from F2. A midfield fighter with strong emotional peaks.",
    championships: 0,
    driverNames: "GASLY · TSUNODA",
    champLabel: "GASLY MONZA '20",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/80/Honda_RACING_Gallery_2020_AlphaTauri_AT01_Pierre_Gasly.jpg",
  },
  {
    teamId: "rb",
    label: "VCARB / Kick Sauber era",
    seasons: "2024",
    description:
      "The VCARB 01 and blue/red livery. Final season with Honda power before the 2025 Racing Bulls rebrand. Tsunoda and Ricciardo / Lawson rotated through the seats.",
    championships: 0,
    driverNames: "TSUNODA · RICCIARDO · LAWSON",
    champLabel: "LIVERY RESET",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/RB_VCARB01_2024_Chinese_GP.jpg",
  },
  {
    teamId: "rb",
    label: "Racing Bulls",
    seasons: "2025–",
    description:
      "Racing Bulls name and Red Bull Ford power unit from 2026. Hadjar’s Zandvoort podium 2025 — the team’s first in the new era. Current line-up: Lawson and Lindblad.",
    championships: 0,
    driverNames: "LAWSON · LINDBLAD",
    champLabel: "P6 WCC '25",
    current: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/RB_VCARB01_2024_Chinese_GP.jpg",
  },
];

export const racingBullsSignatureBars: TeamSignatureBar[] = [
  { label: "Junior pipeline", rating: "HIGH", value: 78, caption: "RED BULL FAMILY · RBJ TO F1", sentiment: "strength" },
  { label: "Budget vs factory", rating: "MODERATE", value: 48, caption: "FORD PU FROM 2026", sentiment: "neutral" },
  { label: "Emotional peaks", rating: "HIGH", value: 72, caption: "MONZA WINS 2008 / 2020", sentiment: "strength" },
  { label: "Consistency", rating: "MODERATE", value: 52, caption: "MIDFIELD TURMOIL 2022–24", sentiment: "neutral" },
  { label: "Driver turnover", rating: "INCONSISTENT", value: 40, caption: "LAWSON / TSUNODA / RICCIARDO", sentiment: "weakness" },
  { label: "Aero development", rating: "MODERATE", value: 55, caption: "SHARED RED BULL DNA", sentiment: "neutral" },
];

export const racingBullsReelSlides: ReelSlide[] = [
  {
    slotLabel: "STR3",
    badge: "2008",
    glowColor: "#1E3A8A",
    kicker: "MONZA · YOUNGEST WINNER",
    headline: "Vettel shock",
    meta: "STR3 · TORO ROSSO",
    svgPath: "M 60 170 L 118 165 Q 140 160 152 150 L 185 140 Q 210 138 232 145 L 265 160 Q 280 168 290 170 L 338 170",
    circles: [
      { cx: 115, cy: 185, r: 14, fill: "rgba(30,58,138,0.35)" },
      { cx: 280, cy: 185, r: 14, fill: "rgba(30,58,138,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Vettel_Monza_2008.jpg",
  },
  {
    slotLabel: "AT01",
    badge: "2020",
    glowColor: "#2B4998",
    kicker: "MONZA · MAIDEN WIN",
    headline: "Gasly wins",
    meta: "ALPHATAURI · ITALIAN GP",
    svgPath: "M 55 170 L 112 164 Q 135 158 150 147 L 182 136 Q 213 134 238 142 L 270 155 Q 284 162 292 168 L 345 170",
    circles: [
      { cx: 110, cy: 185, r: 14, fill: "rgba(43,73,152,0.35)" },
      { cx: 285, cy: 185, r: 14, fill: "rgba(43,73,152,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/80/Honda_RACING_Gallery_2020_AlphaTauri_AT01_Pierre_Gasly.jpg",
  },
  {
    slotLabel: "VCARB 01",
    badge: "2024",
    glowColor: "#4A6FFF",
    kicker: "SHANGHAI · NEW LIVERY",
    headline: "Blue / red reset",
    meta: "TSUNODA · VCARB",
    svgPath: "M 58 170 L 114 165 Q 136 160 150 150 L 183 140 Q 210 136 234 145 L 268 158 Q 282 165 288 170 L 340 170",
    circles: [
      { cx: 112, cy: 185, r: 14, fill: "rgba(74,111,255,0.40)" },
      { cx: 283, cy: 185, r: 14, fill: "rgba(74,111,255,0.40)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/RB_VCARB01_2024_Chinese_GP.jpg",
  },
];

export const racingBullsAcademy: TeamAcademyDriver[] = [
  { name: "Liam Lawson", tier: "f1", note: "#30 · 2025–" },
  { name: "Arvid Lindblad", tier: "f1", note: "#41 · 2026" },
  { name: "Isack Hadjar", tier: "f1", note: "Red Bull 2026 · RB podium Zandvoort '25" },
  { name: "Yuki Tsunoda", tier: "alumni", note: "RB 2021–24 · Red Bull 2025" },
  { name: "Pierre Gasly", tier: "alumni", note: "AT01 Monza '20" },
  { name: "Sebastian Vettel", tier: "alumni", note: "STR3 Monza '08" },
];

export const racingBullsIconicCars: TeamIconicCar[] = [
  {
    name: "STR3",
    year: 2008,
    subtitle: "Vettel’s Monza miracle",
    meta: "1 WIN · UNDERDOG LEGEND",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Vettel_Monza_2008.jpg",
  },
  {
    name: "AT01",
    year: 2020,
    subtitle: "Gasly’s Monza win",
    meta: "1 WIN · 2020 ITALIAN GP",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/80/Honda_RACING_Gallery_2020_AlphaTauri_AT01_Pierre_Gasly.jpg",
  },
  {
    name: "VCARB 01",
    year: 2024,
    subtitle: "Blue and red livery",
    meta: "TSUNODA · REBRAND SEASON",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/RB_VCARB01_2024_Chinese_GP.jpg",
  },
];

/* ─── Williams Racing ─────────────────────────────────────────────────────── */

/** Mansell FW14B @ Silverstone 1992 — Commons `File:-1992-07-12_Nigel_Mansell,_Williams_FW14B,...` */
const W_FW14B =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/-1992-07-12_Nigel_Mansell%2C_Williams_FW14B%2C_Woodcote%2C_1992_British_Grand_Prix%2C_Silverstone%2C_England.JPG/1280px--1992-07-12_Nigel_Mansell%2C_Williams_FW14B%2C_Woodcote%2C_1992_British_Grand_Prix%2C_Silverstone%2C_England.JPG';

export const williams: Team = {
  id: "williams",
  name: "Williams Racing",
  shortName: "Williams",
  country: "United Kingdom",
  series: ["f1"],
  founded: 1975,
  current: true,
  entityColor: "williams",
  liveryHex: "#005AFF",
  bio: "Nine constructors' championships and a legacy of engineering clarity from Sir Frank and Patrick Head. The FW07, FW11, and active-suspension FW14B defined eras. After the Dorilton era the team is rebuilding with Alex Albon and Carlos Sainz Jr. from 2025.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Williams Racing team quote\"]",
  quoteContext: "",
};

export const williamsStats: TeamStats = {
  teamId: "williams",
  constructorsTitles: 9,
  driversTitles: 7,
  wins: 114,
  podiums: 310, // [VERIFY · formula1.com constructor record]
  seasons: 50,
  firstSeason: 1975,
};

export const williamsEras: TeamEngineeringEra[] = [
  {
    teamId: "williams",
    label: "Jones & Head",
    seasons: "1977–1982",
    description: "Alan Jones and the FW07 family — the team’s first titles and a reputation for no-nonsense race cars.",
    championships: 2,
    driverNames: "JONES · REUTEMANN",
    champLabel: "2× WDC",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Jones_at_1979_Dutch_Grand_Prix.jpg",
  },
  {
    teamId: "williams",
    label: "Mansell · Hill",
    seasons: "1991–1997",
    description: "Active suspension, Renault power, and peak Williams — Mansell 1992, Hill 1996, and iconic FW14B / FW15C / FW19 machinery.",
    championships: 3,
    driverNames: "MANSELL · HILL · VILLENEUVE",
    champLabel: "3× WDC",
    golden: true,
    imageUrl: W_FW14B,
  },
  {
    teamId: "williams",
    label: "Dorilton · rebuild",
    seasons: "2020–",
    description: "Albon-led recovery drives. 2023 FW45 and beyond — fighting back from the back of the grid to regular points. Sainz arrives 2025.",
    championships: 0,
    driverNames: "ALBON · SAINZ",
    champLabel: "REBUILD",
    current: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Alexander_Albon_-_2023_Italian_Grand_Prix.jpg",
  },
];

export const williamsSignatureBars: TeamSignatureBar[] = [
  { label: "Heritage aero", rating: "HIGH", value: 70, caption: "HEAD-ERA DISCIPLINE", sentiment: "strength" },
  { label: "Power unit", rating: "MODERATE", value: 52, caption: "MERCEDES CUSTOMER", sentiment: "neutral" },
  { label: "Driver lineup", rating: "HIGH", value: 75, caption: "ALBON + SAINZ 2025", sentiment: "strength" },
  { label: "Budget", rating: "LOW", value: 32, caption: "INDEPENDENT CONSTRAINT", sentiment: "weakness" },
  { label: "Media goodwill", rating: "HIGH", value: 80, caption: "GLOBAL FANBASE", sentiment: "strength" },
  { label: "Development", rating: "MODERATE", value: 50, caption: "LONG-TERM GROVE INVESTMENT", sentiment: "neutral" },
];

export const williamsReelSlides: ReelSlide[] = [
  {
    slotLabel: "FW07",
    badge: "1980",
    glowColor: "#005AFF",
    kicker: "JONES WDC",
    headline: "Ground-effect era",
    meta: "WILLIAMS + COSWORTH",
    svgPath: "M 65 170 L 120 166 Q 140 160 150 150 L 182 140 Q 208 138 230 145 L 262 160 Q 275 168 288 170 L 330 170",
    circles: [
      { cx: 115, cy: 185, r: 14, fill: "rgba(0,90,255,0.35)" },
      { cx: 278, cy: 185, r: 14, fill: "rgba(0,90,255,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Jones_at_1979_Dutch_Grand_Prix.jpg",
  },
  {
    slotLabel: "FW14B",
    badge: "1992",
    glowColor: "#C0C0C0",
    kicker: "ACTIVE SUSPENSION",
    headline: "Mansell dominant",
    meta: "9 WINS · WDC",
    svgPath: "M 58 168 L 110 165 Q 135 160 150 150 L 180 140 Q 210 136 234 145 L 268 160 Q 280 168 290 170 L 340 170",
    circles: [
      { cx: 112, cy: 185, r: 14, fill: "rgba(192,192,192,0.40)" },
      { cx: 285, cy: 185, r: 14, fill: "rgba(192,192,192,0.40)" },
    ],
    imageUrl: W_FW14B,
  },
  {
    slotLabel: "FW45",
    badge: "2023",
    glowColor: "#005AFF",
    kicker: "ALBON LEADS REBUILD",
    headline: "Points heroics",
    meta: "WILLIAMS FIGHTBACK",
    svgPath: "M 55 170 L 112 165 Q 136 160 150 148 L 180 136 Q 210 132 240 145 L 272 160 Q 284 168 295 170 L 345 170",
    circles: [
      { cx: 110, cy: 185, r: 14, fill: "rgba(0,90,255,0.35)" },
      { cx: 288, cy: 185, r: 14, fill: "rgba(0,90,255,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Alexander_Albon_-_2023_Italian_Grand_Prix.jpg",
  },
];

export const williamsAcademy: TeamAcademyDriver[] = [
  { name: "Carlos Sainz Jr.", tier: "f1", note: "2025–" },
  { name: "Alex Albon", tier: "f1", note: "2022–" },
  { name: "Lance Stroll", tier: "alumni", note: "WILLIAMS 2024" },
];

export const williamsIconicCars: TeamIconicCar[] = [
  {
    name: "FW07",
    year: 1980,
    subtitle: "Jones’ title",
    meta: "ALAN JONES WDC 1980",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Jones_at_1979_Dutch_Grand_Prix.jpg",
  },
  {
    name: "FW14B",
    year: 1992,
    subtitle: "Active-suspension peak",
    meta: "MANSELL 9 WINS · WDC",
    peak: true,
    imageUrl: W_FW14B,
  },
  {
    name: "FW15C",
    year: 1993,
    subtitle: "Prost’s final title",
    meta: "PROST 7 WINS",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/72/Alain_Prost_-_Williams_FW15C_at_the_1993_British_Grand_Prix_%2832873616913%29.jpg",
  },
  {
    name: "FW45",
    year: 2023,
    subtitle: "Albon-led rebuild",
    meta: "ALBON · POINTS IN THE DRY",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Alexander_Albon_-_2023_Italian_Grand_Prix.jpg",
  },
];

/* ─── Alpine F1 (Renault lineage) ──────────────────────────────────────────── */

export const alpine: Team = {
  id: "alpine",
  name: "Alpine F1 Team",
  shortName: "Alpine",
  country: "France",
  series: ["f1"],
  founded: 2021,
  current: true,
  entityColor: "alpine",
  liveryHex: "#0090FF",
  bio: "The Enstone team carries Renault’s two 2000s titles (R25, R26) and Alpine branding from 2021. A522-era Alonso and Ocon podiums, then a reset into the current hybrid midfield fight.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Alpine F1 team quote\"]",
  quoteContext: "",
};

export const alpineStats: TeamStats = {
  teamId: "alpine",
  constructorsTitles: 2,
  driversTitles: 2,
  wins: 21,
  podiums: 95, // [VERIFY · all-time with Renault+Alpine; source: Wikipedia]
  seasons: 5,
  firstSeason: 2021,
};

export const alpineEras: TeamEngineeringEra[] = [
  {
    teamId: "alpine",
    label: "Renault works",
    seasons: "2002–2011",
    description: "R25 and R26 back-to-back titles with Alonso. The V10 swansong and first hybrid experiments.",
    championships: 2,
    driverNames: "ALONSO · FISICHELLA",
    champLabel: "2× WDC 2005–06",
    golden: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Fernando_Alonso_2005_Canada.jpg",
  },
  {
    teamId: "alpine",
    label: "Alpine era",
    seasons: "2021–",
    description: "Rebrand to Alpine. A522 2022 podiums, Gasly and Ocon through the regulation cycles. Building toward Audi power from 2026.",
    championships: 0,
    driverNames: "OCON · GASLY",
    champLabel: "REBUILD",
    current: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/66/FIA_F1_Austria_2022_Nr._14_Alonso.jpg",
  },
];

export const alpineSignatureBars: TeamSignatureBar[] = [
  { label: "Enstone know-how", rating: "HIGH", value: 68, caption: "HISTORIC CHASSIS SHOP", sentiment: "strength" },
  { label: "Engine identity", rating: "MODERATE", value: 50, caption: "RENAULT / ALPINE BADGE", sentiment: "neutral" },
  { label: "Driver stability", rating: "MODERATE", value: 55, caption: "OCON / GASLY ERA", sentiment: "neutral" },
  { label: "Results", rating: "INCONSISTENT", value: 42, caption: "MIDFIELD SWINGS", sentiment: "weakness" },
  { label: "Youth link", rating: "HIGH", value: 64, caption: "ALPINE ACADEMY", sentiment: "strength" },
  { label: "Future PU", rating: "HIGH", value: 70, caption: "AUDI 2026 HORIZON", sentiment: "strength" },
];

export const alpineReelSlides: ReelSlide[] = [
  {
    slotLabel: "R25",
    badge: "2005",
    glowColor: "#0090FF",
    kicker: "ALONSO FIRST TITLE",
    headline: "Renault R25",
    meta: "7 WINS · BRAZIL CLINCHER",
    svgPath: "M 60 170 L 118 165 Q 138 160 150 150 L 183 140 Q 210 136 234 145 L 268 158 Q 280 168 290 170 L 338 170",
    circles: [
      { cx: 115, cy: 185, r: 14, fill: "rgba(0,144,255,0.35)" },
      { cx: 280, cy: 185, r: 14, fill: "rgba(0,144,255,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Fernando_Alonso_2005_Canada.jpg",
  },
  {
    slotLabel: "R26",
    badge: "2006",
    glowColor: "#FFD700",
    kicker: "BACK-TO-BACK WDC",
    headline: "Renault R26",
    meta: "7 WINS · ALONSO '06",
    svgPath: "M 55 170 L 112 165 Q 136 160 150 148 L 182 136 Q 213 132 240 145 L 272 160 Q 284 170 295 170 L 345 170",
    circles: [
      { cx: 110, cy: 185, r: 14, fill: "rgba(255,215,0,0.45)" },
      { cx: 288, cy: 185, r: 14, fill: "rgba(255,215,0,0.45)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/80/Fernando_Alonso_-_Renault_R26_-_Monaco_Grand_Prix_2006.jpg",
  },
  {
    slotLabel: "A522",
    badge: "2022",
    glowColor: "#0090FF",
    kicker: "ALONSO PODIUMS",
    headline: "Alpine A522",
    meta: "BWT LIVERY",
    svgPath: "M 58 170 L 114 165 Q 136 160 150 150 L 185 140 Q 210 134 234 145 L 270 160 Q 283 168 290 170 L 340 170",
    circles: [
      { cx: 112, cy: 185, r: 14, fill: "rgba(0,144,255,0.40)" },
      { cx: 285, cy: 185, r: 14, fill: "rgba(0,144,255,0.40)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/66/FIA_F1_Austria_2022_Nr._14_Alonso.jpg",
  },
];

export const alpineAcademy: TeamAcademyDriver[] = [
  { name: "Pierre Gasly", tier: "f1", note: "ALPINE" },
  { name: "Franco Colapinto", tier: "f1", note: "ALPINE" },
  { name: "Fernando Alonso", tier: "alumni", note: "2015–18 · 2021–24" },
];

export const alpineIconicCars: TeamIconicCar[] = [
  {
    name: "R25",
    year: 2005,
    subtitle: "Alonso’s first WDC",
    meta: "RENAULT V10 · 7 WINS",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Fernando_Alonso_2005_Canada.jpg",
  },
  {
    name: "R26",
    year: 2006,
    subtitle: "Championship repeat",
    meta: "ALONSO / FISI · MONACO 2006",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/80/Fernando_Alonso_-_Renault_R26_-_Monaco_Grand_Prix_2006.jpg",
  },
  {
    name: "A522",
    year: 2022,
    subtitle: "Alonso return podiums",
    meta: "ALPINE REBRAND",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/66/FIA_F1_Austria_2022_Nr._14_Alonso.jpg",
  },
];

/* ─── Aston Martin F1 Team ─────────────────────────────────────────────────── */

export const astonMartin: Team = {
  id: "aston_martin",
  name: "Aston Martin F1 Team",
  shortName: "Aston Martin",
  country: "United Kingdom",
  series: ["f1"],
  founded: 2021,
  current: true,
  entityColor: "astonmartin",
  liveryHex: "#006F62",
  bio: "Racing Point DNA rebadged. The AMR23 in 2023 with Fernando Alonso was a stand-out: eight podiums and a car that fought at the very front on merit early in the season. Silverstone based; Stroll family backing.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Aston Martin F1 team quote\"]",
  quoteContext: "",
};

export const astonMartinStats: TeamStats = {
  teamId: "aston_martin",
  constructorsTitles: 0,
  driversTitles: 0,
  wins: 0,
  podiums: 9, // [VERIFY · 2023–25 Aston podiums; source: formula1.com]
  seasons: 5,
  firstSeason: 2021,
};

export const astonMartinEras: TeamEngineeringEra[] = [
  {
    teamId: "aston_martin",
    label: "AMR23 peak",
    seasons: "2023",
    description: "Alonso’s renaissance: podiums in Bahrain, Jeddah, and more — a green car genuinely racing Red Bull in early 2023.",
    championships: 0,
    driverNames: "ALONSO · STROLL",
    champLabel: "8 P2/P3 FINISHES",
    golden: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/39/FIA_F1_Austria_2023_Nr._14_%281%29.jpg",
  },
  {
    teamId: "aston_martin",
    label: "Sustainable fight",
    seasons: "2024–",
    description: "AMR24 and beyond — consolidating points while regulations converge. Stroll and Alonso, then a generational handover toward Newey-era hardware.",
    championships: 0,
    driverNames: "STROLL · ALONSO",
    champLabel: "MIDCARD",
    current: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/98/FIA_F1_Austria_2024_Nr._14_Alonso.jpg",
  },
];

export const astonMartinSignatureBars: TeamSignatureBar[] = [
  { label: "Aero group", rating: "HIGH", value: 75, caption: "NEWEY 2025+", sentiment: "strength" },
  { label: "Operations", rating: "STRONG", value: 70, caption: "SILVERSTONE BASE", sentiment: "strength" },
  { label: "AMR23 form", rating: "HIGH", value: 72, caption: "2023 EARLY SEASON PACE", sentiment: "strength" },
  { label: "Sustain", rating: "MODERATE", value: 48, caption: "REGULATION CONVERGENCE", sentiment: "neutral" },
  { label: "Driver line", rating: "MODERATE", value: 58, caption: "STROLL + ALO", sentiment: "neutral" },
  { label: "Brand equity", rating: "HIGH", value: 80, caption: "ASTON MARTIN ROAD CAR LINK", sentiment: "strength" },
];

export const astonMartinReelSlides: ReelSlide[] = [
  {
    slotLabel: "AMR23",
    badge: "2023",
    glowColor: "#006F62",
    kicker: "ALONSO PODIUMS",
    headline: "Bahrain & beyond",
    meta: "GREEN LIVERY PEAK",
    svgPath: "M 60 170 L 118 165 Q 140 160 150 150 L 185 140 Q 210 135 240 150 L 270 160 Q 280 170 290 170 L 338 170",
    circles: [
      { cx: 115, cy: 185, r: 14, fill: "rgba(0,111,98,0.40)" },
      { cx: 282, cy: 185, r: 14, fill: "rgba(0,111,98,0.40)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/39/FIA_F1_Austria_2023_Nr._14_%281%29.jpg",
  },
  {
    slotLabel: "AMR24",
    badge: "2024",
    glowColor: "#0A2A22",
    kicker: "MIDCARD CONSISTENCY",
    headline: "Alonso deep run",
    meta: "AUSTRIA 2024",
    svgPath: "M 55 170 L 110 168 Q 135 160 150 148 L 180 135 Q 210 130 240 145 L 275 160 Q 290 170 300 170 L 345 170",
    circles: [
      { cx: 110, cy: 185, r: 14, fill: "rgba(10,42,34,0.40)" },
      { cx: 288, cy: 185, r: 14, fill: "rgba(10,42,34,0.40)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/98/FIA_F1_Austria_2024_Nr._14_Alonso.jpg",
  },
];

export const astonMartinAcademy: TeamAcademyDriver[] = [
  { name: "Lance Stroll", tier: "f1", note: "2019–" },
  { name: "Fernando Alonso", tier: "f1", note: "2023–" },
  { name: "Sebastian Vettel", tier: "alumni", note: "2021–22" },
];

export const astonMartinIconicCars: TeamIconicCar[] = [
  {
    name: "AMR23",
    year: 2023,
    subtitle: "Alonso comeback",
    meta: "8 PODS · EARLY-SEASON PACE",
    peak: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/39/FIA_F1_Austria_2023_Nr._14_%281%29.jpg",
  },
  {
    name: "AMR24",
    year: 2024,
    subtitle: "Regulation carry-over",
    meta: "ALONSO / STROLL",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/98/FIA_F1_Austria_2024_Nr._14_Alonso.jpg",
  },
];

/* ─── Sauber / Kick Sauber / Stake (Audi 2026) ─────────────────────────────── */

export const sauber: Team = {
  id: "sauber",
  name: "Kick Sauber · becoming Audi Revolut F1 Team (entry 2026)",
  shortName: "Kick Sauber",
  country: "Switzerland",
  series: ["f1"],
  founded: 1993,
  current: true,
  entityColor: "sauber",
  liveryHex: "#52E252",
  bio: "Hinwil’s long-running entry: Sauber AG, BMW Sauber, Alfa Romeo, Stake, and Kick branding in the Stake-era C44 seasons. Audi have prepared a full takeover of the grid slot: the Audi Revolut F1 Team name and Berlin launch timeline were confirmed by Audi and Formula 1 ahead of the 2026 championship.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Sauber F1 team quote\"]",
  quoteContext: "",
};

export const sauberStats: TeamStats = {
  teamId: "sauber",
  constructorsTitles: 0,
  driversTitles: 0,
  wins: 1,
  podiums: 0, // [VERIFY]
  seasons: 33,
  firstSeason: 1993,
};

export const sauberEras: TeamEngineeringEra[] = [
  {
    teamId: "sauber",
    label: "Independent Sauber",
    seasons: "1993–2005",
    description: "Peter Sauber’s Swiss precision. Fisichella, Räikkönen, and Heidfeld in iconic blue machinery.",
    championships: 0,
    driverNames: "FISICHELLA · RÄIKKÖNEN",
    champLabel: "NO TITLES",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Sauber_F1_N%C3%BCrburgring_2013_Nico_H%C3%BClkenberg.jpg",
  },
  {
    teamId: "sauber",
    label: "BMW and Alfa",
    seasons: "2006–2023",
    description: "BMW works era, return to Sauber, Alfa Romeo rebrand, Vettel’s farewell tour — a constantly evolving identity in Hinwil.",
    championships: 0,
    driverNames: "BOTTAS · ZHOU",
    champLabel: "C43 ERA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Valtteri_Bottas_-_2023_Monza_Grand_Prix_-_F1.jpg",
  },
  {
    teamId: "sauber",
    label: "Kick / Audi",
    seasons: "2024–",
    description: "C44 raced as Kick Sauber in 2025. The entry transitions to Audi’s works identity as the Audi Revolut F1 Team for 2026 (title partner Revolut confirmed by Audi/F1 announcements).",
    championships: 0,
    driverNames: "BOTTAS · BORTOLETO",
    champLabel: "TRANSITION",
    current: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Valtteri_Bottas_Chinese_GP_2024.jpg",
  },
];

export const sauberSignatureBars: TeamSignatureBar[] = [
  { label: "Wind tunnel", rating: "HIGH", value: 70, caption: "HINWIL FACILITY", sentiment: "strength" },
  { label: "Power unit", rating: "INCONSISTENT", value: 45, caption: "FERRARI → AUDI TIMELINE", sentiment: "neutral" },
  { label: "Driver line", rating: "STRONG", value: 65, caption: "BOTTAS EXPERIENCE", sentiment: "strength" },
  { label: "Reliability", rating: "STRONG", value: 60, caption: "TRADITIONAL SWISS BUILD", sentiment: "strength" },
  { label: "Pace", rating: "LOW", value: 35, caption: "REAR-GRID 2023–25", sentiment: "weakness" },
  { label: "Future", rating: "HIGH", value: 78, caption: "AUDI 2026", sentiment: "strength" },
];

export const sauberReelSlides: ReelSlide[] = [
  {
    slotLabel: "C32",
    badge: "2013",
    glowColor: "#52E252",
    kicker: "HÜLKE NÜRBURGRING",
    headline: "Sauber C32",
    meta: "FERRARI POWER",
    svgPath: "M 60 170 L 118 168 Q 138 160 150 150 L 185 140 Q 210 135 240 150 L 272 160 Q 280 170 292 170 L 340 170",
    circles: [
      { cx: 115, cy: 185, r: 14, fill: "rgba(82,226,82,0.35)" },
      { cx: 280, cy: 185, r: 14, fill: "rgba(82,226,82,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Sauber_F1_N%C3%BCrburgring_2013_Nico_H%C3%BClkenberg.jpg",
  },
  {
    slotLabel: "C43",
    badge: "2023",
    glowColor: "#900000",
    kicker: "ALFA / STAKE",
    headline: "Bottas / Zhou",
    meta: "C43 @ MONZA",
    svgPath: "M 55 170 L 110 168 Q 135 160 150 148 L 182 135 Q 210 130 240 145 L 275 162 Q 290 170 300 170 L 345 170",
    circles: [
      { cx: 110, cy: 185, r: 14, fill: "rgba(144,0,0,0.35)" },
      { cx: 288, cy: 185, r: 14, fill: "rgba(144,0,0,0.35)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Valtteri_Bottas_-_2023_Monza_Grand_Prix_-_F1.jpg",
  },
  {
    slotLabel: "C44",
    badge: "2024",
    glowColor: "#00FF7F",
    kicker: "KICK Livery",
    headline: "Final Sauber year",
    meta: "CHINESE GP 2024",
    svgPath: "M 58 170 L 115 168 Q 136 160 150 150 L 185 138 Q 210 132 240 150 L 270 160 Q 285 170 295 170 L 342 170",
    circles: [
      { cx: 112, cy: 185, r: 14, fill: "rgba(0,255,127,0.30)" },
      { cx: 285, cy: 185, r: 14, fill: "rgba(0,255,127,0.30)" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Valtteri_Bottas_Chinese_GP_2024.jpg",
  },
];

export const sauberAcademy: TeamAcademyDriver[] = [
  { name: "Valtteri Bottas", tier: "f1", note: "2022–" },
  { name: "Gabriel Bortoleto", tier: "f1", note: "2025–" },
  { name: "Zhou Guanyu", tier: "alumni", note: "2022–24" },
];

export const sauberIconicCars: TeamIconicCar[] = [
  {
    name: "C32",
    year: 2013,
    subtitle: "Hülkenberg P7 peak",
    meta: "SAUBER-FERRARI",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Sauber_F1_N%C3%BCrburgring_2013_Nico_H%C3%BClkenberg.jpg",
  },
  {
    name: "C43",
    year: 2023,
    subtitle: "Alfa Romeo livery",
    meta: "BOTTAS / ZHOU",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Valtteri_Bottas_-_2023_Monza_Grand_Prix_-_F1.jpg",
  },
  {
    name: "C44",
    year: 2024,
    subtitle: "Final Stake / Kick",
    meta: "BOTTAS / ZHOU",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Valtteri_Bottas_Chinese_GP_2024.jpg",
  },
];

/* ─── Cadillac F1 (2026) ───────────────────────────────────────────────────── */

export const cadillac: Team = {
  id: "cadillac",
  name: "Cadillac F1 Team",
  shortName: "Cadillac",
  country: "United States",
  series: ["f1"],
  founded: 2026,
  current: true,
  entityColor: "mercedes",
  liveryHex: "#C8A96E",
  bio: "General Motors and Andretti Global bring Cadillac to the Formula 1 grid from 2026. The official team profile lists Valtteri Bottas and Sergio Perez as race drivers with Zhou Guanyu as reserve — Ferrari power unit to 2029, with a GM unit planned per F1 reporting. Iconic car imagery will be added when stable open-licence or verified press URLs are available.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Cadillac F1 2026 team quote\"]",
  quoteContext: "",
};

export const cadillacStats: TeamStats = {
  teamId: "cadillac",
  constructorsTitles: 0,
  driversTitles: 0,
  wins: 0,
  podiums: 0,
  seasons: 0,
  firstSeason: 2026,
};

export const cadillacEras: TeamEngineeringEra[] = [
  {
    teamId: "cadillac",
    label: "Debut",
    seasons: "2026–",
    description: "New constructor entry. Iconic car photography will be added when Wikimedia or official formula1.com press assets with stable direct URLs are available.",
    championships: 0,
    driverNames: "BOTTAS · PEREZ",
    champLabel: "ROOKIE SEASON",
    current: true,
  },
];

export const cadillacSignatureBars: TeamSignatureBar[] = [
  { label: "GM backing", rating: "HIGH", value: 85, caption: "DETROIT OEM WEIGHT", sentiment: "strength" },
  { label: "Andretti link", rating: "HIGH", value: 80, caption: "US RACING PEDIGREE", sentiment: "strength" },
  { label: "F1 data", rating: "LOW", value: 20, caption: "NO RACES YET", sentiment: "weakness" },
  { label: "Livery", rating: "MODERATE", value: 50, caption: "GOLD + BLACK", sentiment: "neutral" },
  { label: "Power unit", rating: "MODERATE", value: 55, caption: "FERRARI 2026", sentiment: "neutral" },
  { label: "Identity", rating: "HIGH", value: 75, caption: "CADILLAC LUX BRAND", sentiment: "strength" },
];

export const cadillacReelSlides: ReelSlide[] = [
  {
    slotLabel: "V-Series.R",
    badge: "2026",
    glowColor: "#C8A96E",
    kicker: "LAUNCH TBA",
    headline: "Cadillac F1",
    meta: "Replace with photo URL when available",
    svgPath: "M 60 160 L 200 150 L 340 160",
    circles: [
      { cx: 200, cy: 170, r: 12, fill: "rgba(200,169,110,0.4)" },
    ],
  },
];

export const cadillacAcademy: TeamAcademyDriver[] = [
  { name: "Valtteri Bottas", tier: "f1", note: "2026 race · per formula1.com/en/teams/cadillac" },
  { name: "Sergio Perez", tier: "f1", note: "2026 race · per formula1.com/en/teams/cadillac" },
  { name: "Zhou Guanyu", tier: "f1", note: "2026 reserve · per formula1.com/en/teams/cadillac" },
];

export const cadillacIconicCars: TeamIconicCar[] = [
  { name: "2026 concept", year: 2026, subtitle: "Launch photography TBA", meta: "NO VERIFIED COMMONS / F1.COM DAM URL YET" },
  { name: "Factory livery", year: 2026, subtitle: "Add press image when published", meta: "USE GLOW UNTIL URL VERIFIED" },
  { name: "Grid debut", year: 2026, subtitle: "First race TBA", meta: "PLACEHOLDER — NO HOTLINK YET" },
];

/* ─── Haas F1 Team ──────────────────────────────────────────────────────────── */

const W_HAAS = 'https://en.wikipedia.org/wiki/Special:FilePath/'

export const haas: Team = {
  id: "haas",
  name: "Haas F1 Team",
  shortName: "Haas",
  country: "United States",
  series: ["f1"],
  founded: 2016,
  current: true,
  entityColor: "haas",
  liveryHex: "#E8002D",
  bio: "The first American-owned Formula 1 team since Haas Lola in 1986. Founded by Gene Haas, co-owner of Stewart-Haas Racing NASCAR team. Entered F1 in 2016 with an innovative customer model — running Ferrari-spec power unit and gearbox. Their debut season was a shock: P8 constructors with Romain Grosjean scoring points in their very first race in Australia.",
  quote: "[QUOTE PLACEHOLDER · NEEDS SOURCE · search: \"Haas F1 Team team quote memorable\"]",
  quoteContext: "",
}

export const haasStats: TeamStats = {
  teamId: "haas",
  constructorsTitles: 0,
  driversTitles: 0,
  wins: 0,
  podiums: 0, // corrected from 2; Haas has never achieved a podium · source: racingnews365.com/f1/teams/haas/statistics + formula1history.com
  seasons: 11, // corrected from 10; source: 2016–2026
  firstSeason: 2016,
};

export const haasEras: TeamEngineeringEra[] = [
  {
    teamId: "haas", label: "Steiner Era", seasons: "2016–2023",
    description: "Gene Haas and Günther Steiner built the team from zero. The VF-16 debut was a shock — points on race day 1. The VF-18 in 2018 reached P5 constructors, the team's high-water mark. Steiner's visible personality made Haas a media fixture. Dismissed after 2023 as results declined.",
    championships: 0, driverNames: "Grosjean · Magnussen · Schumacher · Hülkenberg",
    imageUrl: W_HAAS + 'Romain_Grosjean_2016_Bahrain_Grand_Prix.jpg',
  },
  {
    teamId: "haas", label: "Post-Steiner Rebuild", seasons: "2024–present",
    description: "New team principal Ayao Komatsu took over in 2024. Bearman debuted as a substitute in Saudi Arabia 2024, scoring points. The 2025 pairing of Bearman and Ocon brought fresh energy. A team with the infrastructure of a top-five outfit — if the car matches.",
    championships: 0, driverNames: "Magnussen · Hülkenberg · Bearman · Ocon",
    imageUrl: W_HAAS + 'Kevin_Magnussen_2024_Saudi_Arabian_GP.jpg',
  },
]

export const haasSignatureBars: TeamSignatureBar[] = [
  { label: "Qualifying pace",  rating: "MODERATE", value: 52, caption: "MIDFIELD CEILING", sentiment: "neutral" },
  { label: "Race pace",        rating: "MODERATE", value: 56, caption: "CONSISTENTLY ABOVE MIDFIELD", sentiment: "neutral" },
  { label: "Strategy",         rating: "HIGH",     value: 62, caption: "CREATIVE UNDERDOG CALLS", sentiment: "strength" },
  { label: "Reliability",      rating: "HIGH",     value: 61, caption: "DECENT CHASSIS LONGEVITY", sentiment: "strength" },
  { label: "Driver quality",   rating: "HIGH",     value: 65, caption: "BEARMAN + OCON — STRONG PAIRING", sentiment: "strength" },
]

export const haasReelSlides: ReelSlide[] = [
  {
    label: "DEBUT WIN",
    tags: "2016 · AUSTRALIA · POINTS ON RACE ONE",
    title: "Australian GP",
    subtitle: "2016 · HAAS VF-16 · GROSJEAN P6",
    glowColor: "#E8002D",
    svgPath: "M 30 160 L 80 160 Q 100 145 115 110 L 165 110 Q 185 128 200 160 L 250 160 Q 270 172 285 200 L 330 200 Q 350 178 370 148",
    imageUrl: W_HAAS + 'Romain_Grosjean_2016_Australian_Grand_Prix.jpg',
  },
  {
    label: "P5 WCC",
    tags: "2018 · HAAS VF-18 · TEAM BEST CONSTRUCTORS RESULT",
    title: "Best Season",
    subtitle: "2018 · HAAS VF-18 · 93 POINTS",
    glowColor: "#E8002D",
    svgPath: "M 30 120 Q 60 108 84 78 L 144 78 Q 172 94 192 120 L 252 120 Q 282 104 306 74 L 366 74",
    imageUrl: W_HAAS + 'Kevin_Magnussen_2018_Bahrain_Grand_Prix.jpg',
  },
  {
    label: "NEW ERA",
    tags: "2025 · BEARMAN + OCON · POST-STEINER CHAPTER",
    title: "2025 Rebuild",
    subtitle: "2025 · VF-25 · KOMATSU ERA",
    glowColor: "#E8002D",
    svgPath: "M 30 150 L 80 150 Q 110 138 130 100 L 175 100 Q 195 115 210 150 L 260 150 Q 290 170 315 200 L 370 200",
    imageUrl: W_HAAS + 'Oliver_Bearman_2025_Saudi_Arabian_GP.jpg',
  },
]

export const haasAcademy: TeamAcademyDriver[] = [
  { name: "Oliver Bearman",   tier: "f1",   note: "Ferrari junior → Haas F1 2025 · Sub debut Saudi 2024" },
  { name: "Esteban Ocon",     tier: "f1",   note: "Joined Haas 2025 after Alpine departure" },
  { name: "Romain Grosjean",  tier: "alumni", note: "Debut driver 2016–2020 · P6 on day one" },
  { name: "Kevin Magnussen",  tier: "alumni", note: "2017–2022 · 2 career podiums · team stalwart" },
  { name: "Nico Hülkenberg",  tier: "alumni", note: "2023–2024 · P6 WDC 2023 — career best with Haas" },
  { name: "Mick Schumacher",  tier: "alumni", note: "2021–2022 · first F1 career via Ferrari academy" },
]

export const haasIconicCars: TeamIconicCar[] = [
  {
    name: "VF-16",
    year: 2016,
    subtitle: "The debut shock",
    meta: "P8 WCC · GROSJEAN P6 AUSTRALIA",
    peak: false,
    imageUrl: W_HAAS + 'Haas_VF-16_Grosjean_2016_Australian_GP.jpg',
  },
  {
    name: "VF-18",
    year: 2018,
    subtitle: "The peak",
    meta: "P5 WCC · 93 POINTS · TEAM BEST",
    peak: true,
    imageUrl: W_HAAS + 'Kevin_Magnussen_Haas_VF-18_2018_Bahrain.jpg',
  },
  {
    name: "VF-24",
    year: 2024,
    subtitle: "Hülkenberg / Magnussen",
    meta: "KOMATSU PRINCIPAL · REBUILD SEASON",
    peak: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Nico_Hulkenberg_2024_Chinese_GP.jpg",
  },
]

/* ─── Export index ────────────────────────────────────────────────────────── */

export const MOCK_TEAMS: Record<string, Team> = {
  ferrari,
  redbull,
  mclaren,
  mercedes,
  prema,
};
