import type {
  Venue,
  VenueStats,
  VenueFingerprint,
  DriverTrackFit,
  Hotspot,
  MomentOverlay,
  VenueIconicMoment,
  VenueWeather,
} from "@/lib/types";

/* ─── Track path data ─────────────────────────────────────────────────────────
   Source: julesr0y/f1-circuits-svg (MIT licence)
   All paths from circuits/minimal/black/ — latest layout variant per circuit.
   All SVGs are 500×500 (width="500" height="500", no explicit viewBox attribute).
   ─────────────────────────────────────────────────────────────────────────── */

// spa-francorchamps-4.svg (2007-present layout)
const SPA_TRACK_PATH =
  "M167.75 20.858c-3.075-5.364-.283-7.034 3.387-5.065 3.669 1.97 49.393 30.95 55.603 35.171 6.21 4.22 10.613 8.816 14.395 13.224 6.116 7.128 29.072 34.701 33.87 40.235 2.327 2.682 4.765 5.265 8.892 6.504.742.223 1.542.375 2.398.53 3.105.563 9.733 2.517 14.112 9.848 4.987 8.348 5.552 11.818 4.705 22.04-.49 5.916.164 11.615 2.258 14.631 5.08 7.316 15.721 22.54 22.956 32.545 8.75 12.099 16.935 28.98 20.322 40.235s41.49 144.622 43.467 152.5c1.975 7.878 4.009 9.705-5.504 15.334-4.516 2.673-8.435 6.431-6.774 13.787 1.27 5.628 9.744 26.446.846 32.639-2.08 1.447-48.41 32.702-57.014 38.265-5.222 3.377-12.385.885-15.242-4.08-2.856-4.964-3.503-11.631 4.093-15.897 5.927-3.329 9.314-5.205 25.685-14.96 3.995-2.38 6.181-7.751 3.198-14.442-2.634-5.909-7.55-20.755-9.972-27.574-5.645-15.897-10.43-48.422-14.254-69.216-1.552-8.44-7.338-16.882-19.193-18.007-2.61-.248-11.29-.844-18.77-.563-7.303.275-20.816 4.787-27.66 22.79-5.08 13.366-15.524 40.095-23.992 62.464-6.59 17.407-22.297 12.661-24.696 10.832-5.53-4.215-19.68-14.49-31.19 1.688-5.503 7.738-16.934 26.59-23.567 36.86-7.403 11.462-15.806 3.657-38.81-13.506-9.759-7.282-7.215-21.806-5.786-27.293 6.586-25.285 18.77-40.094 31.189-50.786s29.919-23.353 50.805-30.669c20.887-7.315 27.2-13.496 33.023-24.197 16.23-29.825 24.133-42.908 22.44-57.54-1.694-14.63-19.053-43.752-22.722-56.413-2.69-9.285-4.774-32.872-5.249-52.615-.083-3.47-.676-7.138 6.096-6.19 10.725 1.5 7.765-7.127 6.21-9.379-7.904-11.442-11.323-16.99-17.782-28.324-7.057-12.38-39.515-71.467-41.773-75.406z";

/* ─── Spa-Francorchamps ─────────────────────────────────────────────────────── */

export const spa: Venue = {
  id: "spa",
  name: "Spa-Francorchamps",
  subLabel: "Circuit de",
  country: "Belgium",
  layoutVersion: "2022-current",
  lengthKm: 7.004,
  corners: 19,
  elevationDeltaM: 102,
  f1Since: 1950,
  entityColor: "spa",
  entityColorHex: "#5FB87C",
  quote:
    "The most beautiful race track in the world — a cliché because it's true. Seven kilometres through the Ardennes, defined by Eau Rouge and weather that moves across it one corner at a time.",
  quoteAttribution: "Circuit de Spa-Francorchamps",
  trackPath: SPA_TRACK_PATH,
  trackLocation: "ARDENNES · BE",
};

export const spaStats: VenueStats = {
  venueId: "spa",
  lengthKm: 7.004,
  corners: 19,
  lapRecord: "1:44.701",
  lapRecordDriver: "Pérez",
  lapRecordYear: 2024,
  elevationDeltaM: 102,
  f1Since: 1950,
};

export const spaFingerprint: VenueFingerprint = {
  venueId: "spa",
  bars: [
    {
      label: "Engine Power",
      rating: "CRITICAL",
      value: 92,
      caption: "Kemmel straight · 320+ km/h",
    },
    {
      label: "Aero Efficiency",
      rating: "HIGH",
      value: 78,
      caption: "Low-drag setup wins",
    },
    {
      label: "Mechanical Grip",
      rating: "MODERATE",
      value: 52,
      caption: "Sector 2 technical",
    },
    {
      label: "Braking Stability",
      rating: "MODERATE",
      value: 48,
      caption: "Les Combes · Bus Stop",
    },
    {
      label: "Tyre Degradation",
      rating: "LOW",
      value: 32,
      caption: "Abrasiveness low",
    },
    {
      label: "Driver Bravery",
      rating: "EXTREME",
      value: 97,
      caption: "Eau Rouge · commitment",
    },
  ],
};

export const spaDriverFit: DriverTrackFit[] = [
  { venueId: "spa", driverId: "senna", driverName: "Ayrton Senna", fitScore: 98, wins: 5, poles: 7 },
  { venueId: "spa", driverId: "schumacher", driverName: "Michael Schumacher", fitScore: 96, wins: 6, poles: 4 },
  { venueId: "spa", driverId: "hamilton", driverName: "Lewis Hamilton", fitScore: 95, wins: 5, poles: 6 },
  { venueId: "spa", driverId: "verstappen", driverName: "Max Verstappen", fitScore: 92, wins: 3, poles: 3 },
  { venueId: "spa", driverId: "vettel", driverName: "Sebastian Vettel", fitScore: 88, wins: 3, poles: 1 },
];

/* ─── Hotspots ────────────────────────────────────────────────────────────────
   x/y are percentages (0–100) of the 500×500 SVG viewBox.
   Positions calibrated to the GPS-derived track path.
   ─────────────────────────────────────────────────────────────────────────── */
export const spaHotspots: Hotspot[] = [
  // Legendary (no click overlay)
  { id: "spa-eau-rouge", venueId: "spa", cornerLabel: "Eau Rouge / Raidillon", x: 48, y: 13, type: "legendary" },
  // Iconic — with moment overlays
  { id: "spa-la-source", venueId: "spa", cornerLabel: "La Source", x: 34, y: 3, type: "iconic", momentId: "leclerc-spa-2019" },
  { id: "spa-kemmel", venueId: "spa", cornerLabel: "Kemmel Straight", x: 66, y: 38, type: "iconic", momentId: "hamilton-spa-2008" },
  { id: "spa-les-combes", venueId: "spa", cornerLabel: "Les Combes", x: 70, y: 46, type: "iconic", momentId: "hakkinen-spa-2000" },
  { id: "spa-bus-stop", venueId: "spa", cornerLabel: "Bus Stop", x: 21, y: 83, type: "iconic", momentId: "webber-spa-2011" },
  // Passive — label only
  { id: "spa-pouhon", venueId: "spa", cornerLabel: "Pouhon", x: 76, y: 83, type: "passive" },
  { id: "spa-stavelot", venueId: "spa", cornerLabel: "Stavelot", x: 65, y: 97, type: "passive" },
  { id: "spa-blanchimont", venueId: "spa", cornerLabel: "Blanchimont", x: 69, y: 90, type: "passive" },
];

/* ─── Moment overlays ─────────────────────────────────────────────────────────
   defenderTrace / overtakerTrace: [x, y] points for a 400×300 schematic SVG.
   ─────────────────────────────────────────────────────────────────────────── */
export const spaMomentOverlays: MomentOverlay[] = [
  {
    momentId: "leclerc-spa-2019",
    title: "Leclerc on Hamilton at race start",
    year: 2019,
    driver1Id: "leclerc",
    driver2Id: "hamilton",
    cornerLabel: "La Source",
    description: "FERRARI over MERCEDES",
    defenderTrace: [[40,130],[120,128],[175,122],[225,115],[285,110],[360,116],[390,124]],
    overtakerTrace: [[40,155],[120,151],[175,138],[225,122],[285,113],[360,116],[390,124]],
  },
  {
    momentId: "hamilton-spa-2008",
    title: "Hamilton on Räikkönen — final laps wet",
    year: 2008,
    driver1Id: "hamilton",
    driver2Id: "raikkonen",
    cornerLabel: "Kemmel Straight",
    description: "McLAREN over FERRARI",
    defenderTrace: [[30,145],[130,142],[210,140],[280,143],[340,150],[390,162]],
    overtakerTrace: [[30,168],[130,165],[210,160],[280,158],[340,158],[390,162]],
  },
  {
    momentId: "hakkinen-spa-2000",
    title: "Häkkinen on Schumacher — the Zonta lap",
    year: 2000,
    driver1Id: "hakkinen",
    driver2Id: "schumacher",
    cornerLabel: "Les Combes",
    description: "McLAREN over FERRARI",
    defenderTrace: [[30,125],[110,122],[175,118],[230,118],[290,128],[360,148],[390,155]],
    overtakerTrace: [[30,148],[110,144],[175,133],[230,124],[290,128],[360,148],[390,155]],
  },
  {
    momentId: "webber-spa-2011",
    title: "Webber on Alonso — last-lap pass",
    year: 2011,
    driver1Id: "webber",
    driver2Id: "alonso",
    cornerLabel: "Bus Stop",
    description: "RED BULL over FERRARI",
    defenderTrace: [[30,128],[105,126],[165,118],[225,120],[285,130],[355,145],[390,152]],
    overtakerTrace: [[30,152],[105,148],[165,133],[225,124],[285,130],[355,145],[390,152]],
  },
];

/* ─── Iconic moments (archive grid) ─────────────────────────────────────────── */
export const spaIconicMoments: VenueIconicMoment[] = [
  {
    id: "senna-1992",
    year: 1992,
    title: "Senna's wet masterclass",
    teamLabel: "McLAREN · 5 POSITIONS",
    conditionBadge: "WET",
    conditionColor: "#378ADD",
    glowColor: "#FFD700",
  },
  {
    id: "schumacher-1991",
    year: 1991,
    title: "Schumacher F1 debut",
    teamLabel: "JORDAN · Q7",
    conditionBadge: "DEBUT",
    conditionColor: "#FFD700",
    glowColor: "#FFD700",
  },
  {
    id: "pile-up-1998",
    year: 1998,
    title: "13-car lap 1 pile-up",
    teamLabel: "RED FLAG · RESTART",
    conditionBadge: "RAIN",
    conditionColor: "#378ADD",
    glowColor: "#378ADD",
  },
  {
    id: "hamilton-rosberg-2014",
    year: 2014,
    title: "Hamilton vs. Rosberg",
    teamLabel: "TEAMMATE COLLISION",
    conditionBadge: "CLASH",
    conditionColor: "#FF1E56",
    glowColor: "#00D2BE",
  },
  {
    id: "verstappen-2016",
    year: 2016,
    title: "Young Verstappen's drive",
    teamLabel: "P11 TO P3 · RAIN",
    conditionBadge: "RAIN",
    conditionColor: "#378ADD",
    glowColor: "#0600EF",
  },
  {
    id: "non-race-2021",
    year: 2021,
    title: "The race that wasn't",
    teamLabel: "2 LAPS · SC ONLY",
    conditionBadge: "VOID",
    conditionColor: "#FF1E56",
    glowColor: "#378ADD",
  },
];

/* ─── Weather ────────────────────────────────────────────────────────────────── */
export const spaWeather: VenueWeather = {
  venueId: "spa",
  dryPct: 42,
  mixedPct: 31,
  wetPct: 27,
  totalRaces: 59,
  chaoticRaces: [
    { year: 2021, label: '"The race that wasn\'t"', type: "WET" },
    { year: 1998, label: "Lap-1 13-car pile-up", type: "WET" },
    { year: 1992, label: "Senna wet masterclass", type: "MIXED" },
  ],
};

/* ─── Circuit de Monaco ────────────────────────────────────────────────────── */

export const monaco: Venue = {
  id: "monaco",
  name: "Circuit de Monaco",
  subLabel: "Circuit de",
  country: "Monaco",
  layoutVersion: "1973-current",
  lengthKm: 3.337,
  corners: 19,
  elevationDeltaM: 42,
  f1Since: 1950,
  entityColor: "monaco",
  entityColorHex: "#B5A642",
  quote:
    "The most demanding circuit in the world. No runoff. No margin. Three kilometres of Armco, a harbour, and history around every apex.",
  quoteAttribution: "Circuit de Monaco",
  trackLocation: "MONTE CARLO · MC",
};

export const monacoStats: VenueStats = {
  venueId: "monaco",
  lengthKm: 3.337,
  corners: 19,
  lapRecord: "1:12.909",
  lapRecordDriver: "Hamilton",
  lapRecordYear: 2021,
  elevationDeltaM: 42,
  f1Since: 1950,
};

export const monacoFingerprint: VenueFingerprint = {
  venueId: "monaco",
  bars: [
    { label: "Engine Power",      rating: "LOW",     value: 35, caption: "Street circuit · tight turns" },
    { label: "Aero Efficiency",   rating: "LOW",     value: 30, caption: "Maximum downforce required" },
    { label: "Mechanical Grip",   rating: "EXTREME", value: 99, caption: "Walls define the limit" },
    { label: "Braking Stability", rating: "HIGH",    value: 78, caption: "Mirabeau · Casino · Nouvelle Chicane" },
    { label: "Tyre Degradation",  rating: "LOW",     value: 22, caption: "Smooth surface · gentle on rubber" },
    { label: "Driver Bravery",    rating: "EXTREME", value: 99, caption: "Zero runoff · Armco everywhere" },
  ],
};

export const monacoDriverFit: DriverTrackFit[] = [
  { venueId: "monaco", driverId: "senna",              driverName: "Ayrton Senna",       fitScore: 99, wins: 6, poles: 5 },
  { venueId: "monaco", driverId: "michael_schumacher", driverName: "Michael Schumacher", fitScore: 95, wins: 5, poles: 3 },
  { venueId: "monaco", driverId: "hamilton",           driverName: "Lewis Hamilton",      fitScore: 90, wins: 3, poles: 2 },
  { venueId: "monaco", driverId: "max_verstappen",     driverName: "Max Verstappen",      fitScore: 85, wins: 2, poles: 1 },
  { venueId: "monaco", driverId: "norris",             driverName: "Lando Norris",        fitScore: 78, wins: 1, poles: 1 },
];

export const monacoHotspots: Hotspot[] = [
  { id: "monaco-sainte-devote",  venueId: "monaco", cornerLabel: "Sainte-Dévote",     x: 48, y: 82, type: "legendary" },
  { id: "monaco-casino",         venueId: "monaco", cornerLabel: "Casino Square",      x: 66, y: 32, type: "passive" },
  { id: "monaco-tunnel",         venueId: "monaco", cornerLabel: "Tunnel",             x: 74, y: 62, type: "passive" },
  { id: "monaco-nouvelle",       venueId: "monaco", cornerLabel: "Nouvelle Chicane",   x: 62, y: 78, type: "passive" },
  { id: "monaco-rascasse",       venueId: "monaco", cornerLabel: "La Rascasse",        x: 30, y: 82, type: "passive" },
];

export const monacoMomentOverlays: MomentOverlay[] = [];

export const monacoIconicMoments: VenueIconicMoment[] = [
  { id: "senna-monaco-1984",  year: 1984, title: "Senna leads in rain, red-flagged",    teamLabel: "TOLEMAN · LAP 31",         conditionBadge: "WET",    conditionColor: "#378ADD", glowColor: "#FFD700" },
  { id: "senna-monaco-1992",  year: 1992, title: "Senna 0.215s over Mansell",           teamLabel: "McLAREN · LAST LAP PASS",  conditionBadge: "CLASSIC",conditionColor: "#FFD700", glowColor: "#FFD700" },
  { id: "panis-1996",         year: 1996, title: "Panis wins as field decimated",       teamLabel: "LIGIER · 3 FINISHERS",     conditionBadge: "CHAOS",  conditionColor: "#FF1E56", glowColor: "#0090FF" },
  { id: "senna-monaco-1993",  year: 1993, title: "Senna's 6th — all-time record",       teamLabel: "McLAREN · RECORD WIN",     conditionBadge: "LEGEND", conditionColor: "#FFD700", glowColor: "#FFD700" },
  { id: "verstappen-2023-mon",year: 2023, title: "Verstappen wins from pole",           teamLabel: "RED BULL · P1 STANDINGS",  conditionBadge: "WIN",    conditionColor: "#1E3A8A", glowColor: "#1E3A8A" },
  { id: "norris-2025-mon",    year: 2025, title: "Norris first Monaco victory",         teamLabel: "McLAREN · FROM POLE",      conditionBadge: "WIN",    conditionColor: "#FF8000", glowColor: "#FF8000" },
];

export const monacoWeather: VenueWeather = {
  venueId: "monaco",
  dryPct: 68,
  mixedPct: 22,
  wetPct: 10,
  totalRaces: 64,
  chaoticRaces: [
    { year: 1996, label: "Six-car finish in the rain", type: "WET" },
    { year: 1984, label: "Senna leads Toleman, red-flagged", type: "WET" },
    { year: 2021, label: "Multiple crashes, Verstappen barrier in Q3", type: "MIXED" },
  ],
};

/* ─── Autodromo Nazionale Monza ─────────────────────────────────────────────── */

export const monza: Venue = {
  id: "monza",
  name: "Autodromo Nazionale Monza",
  subLabel: "Autodromo",
  country: "Italy",
  layoutVersion: "2000-current",
  lengthKm: 5.793,
  corners: 11,
  elevationDeltaM: 3,
  f1Since: 1950,
  entityColor: "monza",
  entityColorHex: "#C12E2E",
  quote:
    "The Temple of Speed. The highest average lap speeds in Formula 1, defined by slipstreaming and massive braking zones. Ferrari's cathedral — and the loudest grandstands on earth.",
  quoteAttribution: "Autodromo Nazionale Monza",
  trackLocation: "LOMBARDIA · IT",
};

export const monzaStats: VenueStats = {
  venueId: "monza",
  lengthKm: 5.793,
  corners: 11,
  lapRecord: "1:20.901",
  lapRecordDriver: "Norris",
  lapRecordYear: 2025,
  elevationDeltaM: 3,
  f1Since: 1950,
};

export const monzaFingerprint: VenueFingerprint = {
  venueId: "monza",
  bars: [
    { label: "Engine Power",      rating: "EXTREME",  value: 99, caption: "Temple of speed · 340+ km/h" },
    { label: "Aero Efficiency",   rating: "CRITICAL", value: 95, caption: "Minimum wing · straight-line supremacy" },
    { label: "Mechanical Grip",   rating: "LOW",      value: 30, caption: "Limited cornering demand" },
    { label: "Braking Stability", rating: "CRITICAL", value: 92, caption: "Lesmo · Parabolica · Variante del Rettifilo" },
    { label: "Tyre Degradation",  rating: "HIGH",     value: 74, caption: "Hard on fronts under heavy braking" },
    { label: "Driver Bravery",    rating: "MODERATE", value: 55, caption: "Open runoff at most corners" },
  ],
};

export const monzaDriverFit: DriverTrackFit[] = [
  { venueId: "monza", driverId: "michael_schumacher", driverName: "Michael Schumacher", fitScore: 97, wins: 5, poles: 4 },
  { venueId: "monza", driverId: "hamilton",           driverName: "Lewis Hamilton",      fitScore: 93, wins: 5, poles: 7 },
  { venueId: "monza", driverId: "vettel",             driverName: "Sebastian Vettel",    fitScore: 88, wins: 4, poles: 5 },
  { venueId: "monza", driverId: "senna",              driverName: "Ayrton Senna",        fitScore: 84, wins: 2, poles: 6 },
  { venueId: "monza", driverId: "leclerc",            driverName: "Charles Leclerc",     fitScore: 82, wins: 2, poles: 2 },
];

export const monzaHotspots: Hotspot[] = [
  { id: "monza-rettilifilo",  venueId: "monza", cornerLabel: "Variante del Rettifilo", x: 50, y: 5,  type: "passive" },
  { id: "monza-lesmo1",       venueId: "monza", cornerLabel: "Prima Variante Lesmo",   x: 72, y: 42, type: "passive" },
  { id: "monza-parabolica",   venueId: "monza", cornerLabel: "Parabolica",             x: 78, y: 82, type: "legendary" },
  { id: "monza-roggia",       venueId: "monza", cornerLabel: "Variante della Roggia",  x: 60, y: 22, type: "passive" },
];

export const monzaMomentOverlays: MomentOverlay[] = [];

export const monzaIconicMoments: VenueIconicMoment[] = [
  { id: "peterson-1978",   year: 1978, title: "Peterson fatal crash at start",  teamLabel: "LOTUS · LAP 1",            conditionBadge: "TRAGEDY", conditionColor: "#FF1E56", glowColor: "#FFD700" },
  { id: "vettel-2008",     year: 2008, title: "Vettel's debut win — Toro Rosso",teamLabel: "TORO ROSSO · SHOCK WIN",   conditionBadge: "DEBUT",   conditionColor: "#C00000", glowColor: "#C00000" },
  { id: "leclerc-2019",    year: 2019, title: "Leclerc's maiden F1 victory",    teamLabel: "FERRARI · HOME WIN",       conditionBadge: "WIN",     conditionColor: "#DC0000", glowColor: "#DC0000" },
  { id: "monza-2020",      year: 2020, title: "Gasly wins from 10th — Red Bull  loses pitlane entry", teamLabel: "ALPHATAURI · SHOCK",conditionBadge: "CHAOS", conditionColor: "#FF1E56", glowColor: "#6692FF" },
  { id: "hamilton-2017",   year: 2017, title: "Hamilton lights-to-flag victory", teamLabel: "MERCEDES · CHAMPIONSHIP", conditionBadge: "WIN",     conditionColor: "#00D2BE", glowColor: "#00D2BE" },
  { id: "schumacher-2000", year: 2000, title: "Ferrari 1-2 · Barrichello wins", teamLabel: "FERRARI · HOME TRIUMPH",   conditionBadge: "1-2",     conditionColor: "#DC0000", glowColor: "#DC0000" },
];

export const monzaWeather: VenueWeather = {
  venueId: "monza",
  dryPct: 80,
  mixedPct: 12,
  wetPct: 8,
  totalRaces: 73,
  chaoticRaces: [
    { year: 2020, label: "Gasly wins from P10 in Alphatauri", type: "DRY" },
    { year: 2008, label: "Vettel's shock debut win in Toro Rosso", type: "DRY" },
    { year: 1978, label: "Multi-car accident, Peterson fatal", type: "DRY" },
  ],
};

/* ─── Silverstone Circuit ───────────────────────────────────────────────────── */

export const silverstone: Venue = {
  id: "silverstone",
  name: "Silverstone Circuit",
  subLabel: "Silverstone",
  country: "Great Britain",
  layoutVersion: "2010-current",
  lengthKm: 5.891,
  corners: 18,
  elevationDeltaM: 35,
  f1Since: 1950,
  entityColor: "silverstone",
  entityColorHex: "#005AFF",
  quote:
    "The home of British motor racing. Maggotts, Becketts, Chapel — taken flat at 300 km/h with full fuel — remains the single most demanding sequence of corners in any grand prix.",
  quoteAttribution: "Silverstone Circuit",
  trackLocation: "NORTHAMPTONSHIRE · GB",
};

export const silverstoneStats: VenueStats = {
  venueId: "silverstone",
  lengthKm: 5.891,
  corners: 18,
  lapRecord: "1:27.097",
  lapRecordDriver: "Verstappen",
  lapRecordYear: 2020,
  elevationDeltaM: 35,
  f1Since: 1950,
};

export const silverstoneFingerprint: VenueFingerprint = {
  venueId: "silverstone",
  bars: [
    { label: "Engine Power",      rating: "MODERATE",  value: 65, caption: "Balanced power requirement" },
    { label: "Aero Efficiency",   rating: "CRITICAL",  value: 92, caption: "Maggotts / Becketts at 300+ km/h" },
    { label: "Mechanical Grip",   rating: "EXTREME",   value: 97, caption: "Maggotts · Becketts · Chapel · Copse" },
    { label: "Braking Stability", rating: "HIGH",      value: 75, caption: "Stowe · Vale · Village complex" },
    { label: "Tyre Degradation",  rating: "HIGH",      value: 80, caption: "Abrasive surface · sustained high-G load" },
    { label: "Driver Bravery",    rating: "EXTREME",   value: 96, caption: "Copse flat · Maggotts blind commitment" },
  ],
};

export const silverstoneDriverFit: DriverTrackFit[] = [
  { venueId: "silverstone", driverId: "hamilton",           driverName: "Lewis Hamilton",      fitScore: 98, wins: 8, poles: 9 },
  { venueId: "silverstone", driverId: "michael_schumacher", driverName: "Michael Schumacher",  fitScore: 90, wins: 4, poles: 6 },
  { venueId: "silverstone", driverId: "mansell",            driverName: "Nigel Mansell",        fitScore: 89, wins: 5, poles: 4 },
  { venueId: "silverstone", driverId: "verstappen",         driverName: "Max Verstappen",       fitScore: 85, wins: 3, poles: 3 },
  { venueId: "silverstone", driverId: "vettel",             driverName: "Sebastian Vettel",     fitScore: 82, wins: 3, poles: 4 },
];

export const silverstoneHotspots: Hotspot[] = [
  { id: "silverstone-copse",    venueId: "silverstone", cornerLabel: "Copse",              x: 74, y: 8,  type: "legendary" },
  { id: "silverstone-maggotts", venueId: "silverstone", cornerLabel: "Maggotts / Becketts",x: 62, y: 38, type: "legendary" },
  { id: "silverstone-stowe",    venueId: "silverstone", cornerLabel: "Stowe",              x: 84, y: 72, type: "passive" },
  { id: "silverstone-vale",     venueId: "silverstone", cornerLabel: "Vale / Club",        x: 68, y: 86, type: "passive" },
];

export const silverstoneMomentOverlays: MomentOverlay[] = [];

export const silverstoneIconicMoments: VenueIconicMoment[] = [
  { id: "mansell-1987",      year: 1987, title: "Mansell tyre blowout at 300 km/h",   teamLabel: "WILLIAMS · LAP 63",         conditionBadge: "BLOWOUT", conditionColor: "#FF1E56", glowColor: "#005AFF" },
  { id: "senna-1992",        year: 1992, title: "Senna–Mansell last-lap battle",       teamLabel: "McLAREN vs WILLIAMS",       conditionBadge: "BATTLE",  conditionColor: "#FF1E56", glowColor: "#FFD700" },
  { id: "hamilton-2008",     year: 2008, title: "Hamilton charges through the field",  teamLabel: "McLAREN · 9 POSITIONS",     conditionBadge: "WET",     conditionColor: "#378ADD", glowColor: "#C0C0C0" },
  { id: "verstappen-2021-sil",year: 2021, title: "Hamilton vs Verstappen T1 crash",   teamLabel: "RED BULL vs MERCEDES",      conditionBadge: "CRASH",   conditionColor: "#FF1E56", glowColor: "#1E3A8A" },
  { id: "hamilton-2016",     year: 2016, title: "Hamilton's 4th Silverstone win",      teamLabel: "MERCEDES · DOMINANT",       conditionBadge: "WIN",     conditionColor: "#00D2BE", glowColor: "#00D2BE" },
  { id: "norris-2024",       year: 2024, title: "Norris first British GP victory",     teamLabel: "McLAREN · HOME WIN",        conditionBadge: "WIN",     conditionColor: "#FF8000", glowColor: "#FF8000" },
];

export const silverstoneWeather: VenueWeather = {
  venueId: "silverstone",
  dryPct: 48,
  mixedPct: 30,
  wetPct: 22,
  totalRaces: 70,
  chaoticRaces: [
    { year: 2021, label: "Hamilton–Verstappen first-lap collision", type: "DRY" },
    { year: 2008, label: "Hamilton charges through the field in the wet", type: "WET" },
    { year: 1987, label: "Mansell tyre failure at 300 km/h", type: "DRY" },
  ],
};

/* ─── Suzuka International Racing Course ────────────────────────────────────── */

export const suzuka: Venue = {
  id: "suzuka",
  name: "Suzuka International Racing Course",
  subLabel: "Suzuka",
  country: "Japan",
  layoutVersion: "1987-current",
  lengthKm: 5.807,
  corners: 18,
  elevationDeltaM: 40,
  f1Since: 1987,
  entityColor: "suzuka",
  entityColorHex: "#FF6B35",
  quote:
    "Suzuka has everything — the figure-eight layout, the S-curves, 130R, the Esses. The circuit that most drivers name as their favourite in the world. And a graveyard of championships.",
  quoteAttribution: "Suzuka International Racing Course",
  trackLocation: "MIE PREFECTURE · JP",
};

export const suzukaStats: VenueStats = {
  venueId: "suzuka",
  lengthKm: 5.807,
  corners: 18,
  lapRecord: "1:30.965",
  lapRecordDriver: "Antonelli",
  lapRecordYear: 2025,
  elevationDeltaM: 40,
  f1Since: 1987,
};

export const suzukaFingerprint: VenueFingerprint = {
  venueId: "suzuka",
  bars: [
    { label: "Engine Power",      rating: "HIGH",     value: 72, caption: "Back straight · 130R at speed" },
    { label: "Aero Efficiency",   rating: "HIGH",     value: 80, caption: "130R taken flat in qualifying" },
    { label: "Mechanical Grip",   rating: "EXTREME",  value: 97, caption: "S-curves · figure-eight layout" },
    { label: "Braking Stability", rating: "HIGH",     value: 75, caption: "Spoon curve · chicane complex" },
    { label: "Tyre Degradation",  rating: "HIGH",     value: 78, caption: "Demanding on all four compounds" },
    { label: "Driver Bravery",    rating: "EXTREME",  value: 97, caption: "130R · blind crests · S-curves flat" },
  ],
};

export const suzukaDriverFit: DriverTrackFit[] = [
  { venueId: "suzuka", driverId: "schumacher",         driverName: "Michael Schumacher",  fitScore: 97, wins: 6, poles: 6 },
  { venueId: "suzuka", driverId: "senna",              driverName: "Ayrton Senna",         fitScore: 96, wins: 3, poles: 5 },
  { venueId: "suzuka", driverId: "hamilton",           driverName: "Lewis Hamilton",       fitScore: 92, wins: 4, poles: 5 },
  { venueId: "suzuka", driverId: "max_verstappen",     driverName: "Max Verstappen",       fitScore: 88, wins: 2, poles: 3 },
  { venueId: "suzuka", driverId: "vettel",             driverName: "Sebastian Vettel",     fitScore: 85, wins: 3, poles: 4 },
];

export const suzukaHotspots: Hotspot[] = [
  { id: "suzuka-s-curves",  venueId: "suzuka", cornerLabel: "S-Curves",        x: 30, y: 12, type: "legendary" },
  { id: "suzuka-130r",      venueId: "suzuka", cornerLabel: "130R",             x: 20, y: 72, type: "legendary" },
  { id: "suzuka-spoon",     venueId: "suzuka", cornerLabel: "Spoon Curve",      x: 12, y: 55, type: "passive" },
  { id: "suzuka-chicane",   venueId: "suzuka", cornerLabel: "Final Chicane",    x: 34, y: 78, type: "passive" },
];

export const suzukaMomentOverlays: MomentOverlay[] = [];

export const suzukaIconicMoments: VenueIconicMoment[] = [
  { id: "senna-prost-1989",   year: 1989, title: "Senna–Prost chicane collision",   teamLabel: "McLAREN vs McLAREN",     conditionBadge: "CLASH",   conditionColor: "#FF1E56", glowColor: "#FFD700" },
  { id: "senna-prost-1990",   year: 1990, title: "Senna takes Prost out at T1",     teamLabel: "McLAREN vs FERRARI",     conditionBadge: "TITLE",   conditionColor: "#FF1E56", glowColor: "#FFD700" },
  { id: "schumacher-2000-suz",year: 2000, title: "Schumacher wins 3rd title",       teamLabel: "FERRARI · WDC TITLE",    conditionBadge: "TITLE",   conditionColor: "#DC0000", glowColor: "#DC0000" },
  { id: "verstappen-2022-suz",year: 2022, title: "Verstappen wins WDC in rain",     teamLabel: "RED BULL · HALF POINTS", conditionBadge: "RAIN",    conditionColor: "#378ADD", glowColor: "#1E3A8A" },
  { id: "hamilton-2015-suz",  year: 2015, title: "Hamilton clinches 3rd WDC title", teamLabel: "MERCEDES · WDC",         conditionBadge: "TITLE",   conditionColor: "#00D2BE", glowColor: "#00D2BE" },
  { id: "antonelli-2025-suz", year: 2025, title: "Antonelli sets lap record on debut year", teamLabel: "MERCEDES · POLE RECORD", conditionBadge: "RECORD", conditionColor: "#00D2BE", glowColor: "#00D2BE" },
];

export const suzukaWeather: VenueWeather = {
  venueId: "suzuka",
  dryPct: 65,
  mixedPct: 20,
  wetPct: 15,
  totalRaces: 37,
  chaoticRaces: [
    { year: 2022, label: "Verstappen wins title in wet — half points", type: "WET" },
    { year: 1989, label: "Senna–Prost chicane collision", type: "DRY" },
    { year: 1990, label: "Senna takes Prost out at Turn 1", type: "DRY" },
  ],
};

/* ─── Autódromo José Carlos Pace (Interlagos) ──────────────────────────────── */

export const interlagos: Venue = {
  id: "interlagos",
  name: "Autódromo José Carlos Pace",
  subLabel: "Interlagos",
  country: "Brazil",
  layoutVersion: "1990-current",
  lengthKm: 4.309,
  corners: 15,
  elevationDeltaM: 42,
  f1Since: 1973,
  entityColor: "interlagos",
  entityColorHex: "#00A651",
  quote:
    "Interlagos is anti-clockwise, bumpy, humid, and unpredictable. The crowd arrives for Senna's ghost, and stays for the drama that only São Paulo can produce.",
  quoteAttribution: "Autódromo José Carlos Pace",
  trackLocation: "SÃO PAULO · BR",
};

export const interlagosStats: VenueStats = {
  venueId: "interlagos",
  lengthKm: 4.309,
  corners: 15,
  lapRecord: "1:10.540",
  lapRecordDriver: "Bottas",
  lapRecordYear: 2018,
  elevationDeltaM: 42,
  f1Since: 1973,
};

export const interlagosFingerprint: VenueFingerprint = {
  venueId: "interlagos",
  bars: [
    { label: "Engine Power",      rating: "HIGH",     value: 72, caption: "Back straight · Junção exit speed" },
    { label: "Aero Efficiency",   rating: "MODERATE", value: 60, caption: "Medium downforce · balanced circuit" },
    { label: "Mechanical Grip",   rating: "HIGH",     value: 82, caption: "Anti-clockwise · sustained lateral load" },
    { label: "Braking Stability", rating: "HIGH",     value: 78, caption: "Senna S braking zone · Turn 4" },
    { label: "Tyre Degradation",  rating: "HIGH",     value: 84, caption: "Abrasive surface · anti-clockwise stress" },
    { label: "Driver Bravery",    rating: "HIGH",     value: 85, caption: "High-energy lap · unpredictable conditions" },
  ],
};

export const interlagosDriverFit: DriverTrackFit[] = [
  { venueId: "interlagos", driverId: "senna",          driverName: "Ayrton Senna",       fitScore: 99, wins: 3, poles: 5 },
  { venueId: "interlagos", driverId: "hamilton",       driverName: "Lewis Hamilton",     fitScore: 94, wins: 5, poles: 5 },
  { venueId: "interlagos", driverId: "schumacher",     driverName: "Michael Schumacher", fitScore: 88, wins: 4, poles: 3 },
  { venueId: "interlagos", driverId: "vettel",         driverName: "Sebastian Vettel",   fitScore: 84, wins: 3, poles: 2 },
  { venueId: "interlagos", driverId: "max_verstappen", driverName: "Max Verstappen",     fitScore: 80, wins: 2, poles: 2 },
];

export const interlagosHotspots: Hotspot[] = [
  { id: "interlagos-senna-s", venueId: "interlagos", cornerLabel: "Senna S",          x: 48, y: 10, type: "legendary" },
  { id: "interlagos-curva4",  venueId: "interlagos", cornerLabel: "Curva do Sol",     x: 72, y: 42, type: "passive" },
  { id: "interlagos-junção",  venueId: "interlagos", cornerLabel: "Junção",           x: 24, y: 78, type: "passive" },
  { id: "interlagos-subida",  venueId: "interlagos", cornerLabel: "Subida dos Boxes", x: 52, y: 82, type: "passive" },
];

export const interlagosMomentOverlays: MomentOverlay[] = [];

export const interlagosIconicMoments: VenueIconicMoment[] = [
  { id: "senna-1991-bra",    year: 1991, title: "Senna wins in Sao Paulo — last gear", teamLabel: "McLAREN · ONE GEAR",      conditionBadge: "LEGEND", conditionColor: "#FFD700", glowColor: "#FFD700" },
  { id: "schumi-1994-bra",   year: 1994, title: "Schumacher wins inaugural WDC race",  teamLabel: "BENETTON · START",         conditionBadge: "WIN",    conditionColor: "#009944", glowColor: "#009944" },
  { id: "glock-2008-bra",    year: 2008, title: "Glock overtaken — Hamilton wins title",teamLabel: "McLAREN · 1 POINT TITLE", conditionBadge: "TITLE",  conditionColor: "#FF1E56", glowColor: "#C0C0C0" },
  { id: "vettel-2012-bra",   year: 2012, title: "Vettel hit L1 · fights back to P6 title",teamLabel: "RED BULL · CHAMPION",  conditionBadge: "TITLE",  conditionColor: "#1E3A8A", glowColor: "#1E3A8A" },
  { id: "verstappen-2022-bra",year: 2022, title: "Verstappen ignores team orders",     teamLabel: "RED BULL vs PEREZ",       conditionBadge: "DRAMA",  conditionColor: "#FF1E56", glowColor: "#1E3A8A" },
  { id: "norris-2024-bra",   year: 2024, title: "Norris Sprint win · WDC battle",      teamLabel: "McLAREN · TITLE FIGHT",   conditionBadge: "SPRINT", conditionColor: "#FF8000", glowColor: "#FF8000" },
];

export const interlagosWeather: VenueWeather = {
  venueId: "interlagos",
  dryPct: 55,
  mixedPct: 25,
  wetPct: 20,
  totalRaces: 52,
  chaoticRaces: [
    { year: 2008, label: "Glock drops positions final lap, Hamilton title", type: "DRY" },
    { year: 2012, label: "Vettel hit first lap, fights back to title", type: "DRY" },
    { year: 1991, label: "Senna wins home race on one gear", type: "DRY" },
  ],
};

/* ─── Bahrain International Circuit ─────────────────────────────────────────── */

export const bahrain: Venue = {
  id: "bahrain",
  name: "Bahrain International Circuit",
  subLabel: "Bahrain",
  country: "Bahrain",
  layoutVersion: "2004-current",
  lengthKm: 5.412,
  corners: 15,
  elevationDeltaM: 10,
  f1Since: 2004,
  entityColor: "bahrain",
  entityColorHex: "#E0891A",
  quote:
    "The season opener. A desert circuit where tyre degradation is the highest in the championship and the dust never fully settles. Circuits don't rubber in — they get grittier.",
  quoteAttribution: "Bahrain International Circuit",
  trackLocation: "SAKHIR · BH",
};

export const bahrainStats: VenueStats = {
  venueId: "bahrain",
  lengthKm: 5.412,
  corners: 15,
  lapRecord: "1:31.447",
  lapRecordDriver: "de la Rosa",
  lapRecordYear: 2005,
  elevationDeltaM: 10,
  f1Since: 2004,
};

export const bahrainFingerprint: VenueFingerprint = {
  venueId: "bahrain",
  bars: [
    { label: "Engine Power",      rating: "MODERATE", value: 65, caption: "Medium-length straights" },
    { label: "Aero Efficiency",   rating: "MODERATE", value: 58, caption: "Medium downforce configuration" },
    { label: "Mechanical Grip",   rating: "HIGH",     value: 76, caption: "Traction out of hairpin complex" },
    { label: "Braking Stability", rating: "CRITICAL", value: 90, caption: "Turn 1 · Turn 4 · heavy anchor" },
    { label: "Tyre Degradation",  rating: "EXTREME",  value: 96, caption: "Abrasive desert surface · thermal deg" },
    { label: "Driver Bravery",    rating: "MODERATE", value: 50, caption: "Large runoff areas throughout" },
  ],
};

export const bahrainDriverFit: DriverTrackFit[] = [
  { venueId: "bahrain", driverId: "hamilton",       driverName: "Lewis Hamilton",     fitScore: 94, wins: 5, poles: 5 },
  { venueId: "bahrain", driverId: "max_verstappen", driverName: "Max Verstappen",     fitScore: 92, wins: 4, poles: 3 },
  { venueId: "bahrain", driverId: "vettel",         driverName: "Sebastian Vettel",   fitScore: 86, wins: 3, poles: 4 },
  { venueId: "bahrain", driverId: "alonso",         driverName: "Fernando Alonso",    fitScore: 82, wins: 3, poles: 2 },
  { venueId: "bahrain", driverId: "leclerc",        driverName: "Charles Leclerc",    fitScore: 78, wins: 2, poles: 3 },
];

export const bahrainHotspots: Hotspot[] = [
  { id: "bahrain-t1",    venueId: "bahrain", cornerLabel: "Turn 1–2 complex",  x: 52, y: 8,  type: "passive" },
  { id: "bahrain-t4",    venueId: "bahrain", cornerLabel: "Turn 4 hairpin",    x: 76, y: 36, type: "passive" },
  { id: "bahrain-t10",   venueId: "bahrain", cornerLabel: "Turn 10 chicane",   x: 68, y: 72, type: "passive" },
  { id: "bahrain-t14",   venueId: "bahrain", cornerLabel: "Turn 14 hairpin",   x: 28, y: 58, type: "legendary" },
];

export const bahrainMomentOverlays: MomentOverlay[] = [];

export const bahrainIconicMoments: VenueIconicMoment[] = [
  { id: "bahrain-2004",       year: 2004, title: "Inaugural Bahrain Grand Prix",     teamLabel: "FERRARI · FIRST RACE",      conditionBadge: "DEBUT",  conditionColor: "#E0891A", glowColor: "#DC0000" },
  { id: "grosjean-2020",      year: 2020, title: "Grosjean fireball — survives",     teamLabel: "HAAS · BARRIER FIRE",        conditionBadge: "FIRE",   conditionColor: "#FF1E56", glowColor: "#FF1E56" },
  { id: "hamilton-2014-bhr",  year: 2014, title: "Hamilton vs Rosberg last-lap duel",teamLabel: "MERCEDES TEAMMATES",         conditionBadge: "BATTLE", conditionColor: "#00D2BE", glowColor: "#00D2BE" },
  { id: "verstappen-2021-bhr",year: 2021, title: "Verstappen vs Hamilton season opener",teamLabel: "RED BULL vs MERCEDES",    conditionBadge: "BATTLE", conditionColor: "#1E3A8A", glowColor: "#1E3A8A" },
  { id: "sainz-2024-bhr",     year: 2024, title: "Verstappen dominant in season opener",teamLabel: "RED BULL · FASTEST",      conditionBadge: "WIN",    conditionColor: "#1E3A8A", glowColor: "#1E3A8A" },
  { id: "leclerc-2022-bhr",   year: 2022, title: "Leclerc wins season opener — Ferrari lead",teamLabel: "FERRARI · P1",       conditionBadge: "WIN",    conditionColor: "#DC0000", glowColor: "#DC0000" },
];

export const bahrainWeather: VenueWeather = {
  venueId: "bahrain",
  dryPct: 95,
  mixedPct: 4,
  wetPct: 1,
  totalRaces: 22,
  chaoticRaces: [
    { year: 2020, label: "Grosjean crash and fire — miraculous escape", type: "DRY" },
    { year: 2021, label: "Hamilton–Verstappen season-opening battle", type: "DRY" },
    { year: 2022, label: "Ferrari 1-2 in season opener, Red Bull DNF × 2", type: "DRY" },
  ],
};

/* ─── Yas Marina Circuit (Abu Dhabi) ────────────────────────────────────────── */

export const abudhabi: Venue = {
  id: "abu-dhabi",
  name: "Yas Marina Circuit",
  subLabel: "Yas Marina",
  country: "Abu Dhabi",
  layoutVersion: "2021-current",
  lengthKm: 5.281,
  corners: 16,
  elevationDeltaM: 5,
  f1Since: 2009,
  entityColor: "abu-dhabi",
  entityColorHex: "#9B59B6",
  quote:
    "The season finale. A purpose-built circuit under floodlights, redesigned in 2021 to produce closer racing. The venue for three world titles decided on the final lap.",
  quoteAttribution: "Yas Marina Circuit",
  trackLocation: "ABU DHABI · AE",
};

export const abadhabiStats: VenueStats = {
  venueId: "abu-dhabi",
  lengthKm: 5.281,
  corners: 16,
  lapRecord: "1:25.637",
  lapRecordDriver: "Magnussen",
  lapRecordYear: 2024,
  elevationDeltaM: 5,
  f1Since: 2009,
};

export const abuDhabiFingerprint: VenueFingerprint = {
  venueId: "abu-dhabi",
  bars: [
    { label: "Engine Power",      rating: "HIGH",     value: 78, caption: "DRS zone S1 · long back straight" },
    { label: "Aero Efficiency",   rating: "MODERATE", value: 65, caption: "Medium-low downforce setting" },
    { label: "Mechanical Grip",   rating: "HIGH",     value: 75, caption: "Sector 3 slow hairpin sequence" },
    { label: "Braking Stability", rating: "HIGH",     value: 72, caption: "Turn 5 · Turn 11 braking zones" },
    { label: "Tyre Degradation",  rating: "MODERATE", value: 55, caption: "Smooth surface · careful degradation" },
    { label: "Driver Bravery",    rating: "LOW",      value: 38, caption: "Large runoff · safe circuit design" },
  ],
};

export const abuDhabiDriverFit: DriverTrackFit[] = [
  { venueId: "abu-dhabi", driverId: "max_verstappen", driverName: "Max Verstappen",     fitScore: 96, wins: 5, poles: 4 },
  { venueId: "abu-dhabi", driverId: "hamilton",       driverName: "Lewis Hamilton",     fitScore: 90, wins: 5, poles: 6 },
  { venueId: "abu-dhabi", driverId: "vettel",         driverName: "Sebastian Vettel",   fitScore: 85, wins: 2, poles: 3 },
  { venueId: "abu-dhabi", driverId: "rosberg",        driverName: "Nico Rosberg",       fitScore: 80, wins: 2, poles: 3 },
  { venueId: "abu-dhabi", driverId: "leclerc",        driverName: "Charles Leclerc",    fitScore: 76, wins: 1, poles: 2 },
];

export const abuDhabiHotspots: Hotspot[] = [
  { id: "abudhabi-t5",   venueId: "abu-dhabi", cornerLabel: "Turn 5 chicane",    x: 72, y: 22, type: "passive" },
  { id: "abudhabi-t9",   venueId: "abu-dhabi", cornerLabel: "Turn 9 hairpin",    x: 80, y: 62, type: "passive" },
  { id: "abudhabi-t14",  venueId: "abu-dhabi", cornerLabel: "Turn 14–16 marina", x: 32, y: 78, type: "legendary" },
];

export const abuDhabiMomentOverlays: MomentOverlay[] = [];

export const abuDhabiIconicMoments: VenueIconicMoment[] = [
  { id: "alonso-2010-petrov", year: 2010, title: "Alonso trapped behind Petrov",    teamLabel: "FERRARI vs RENAULT · TITLE", conditionBadge: "DRAMA",  conditionColor: "#FF1E56", glowColor: "#DC0000" },
  { id: "rosberg-2016-abu",   year: 2016, title: "Rosberg wins title then retires", teamLabel: "MERCEDES · FINAL ACT",       conditionBadge: "TITLE",  conditionColor: "#00D2BE", glowColor: "#00D2BE" },
  { id: "masi-2021-abu",      year: 2021, title: "Final-lap restart — Verstappen",  teamLabel: "RED BULL vs MERCEDES",       conditionBadge: "TITLE",  conditionColor: "#FF1E56", glowColor: "#1E3A8A" },
  { id: "norris-2024-abu",    year: 2024, title: "Season finale — Norris WDC race", teamLabel: "McLAREN · CHAMPIONSHIP",     conditionBadge: "TITLE",  conditionColor: "#FF8000", glowColor: "#FF8000" },
  { id: "hamilton-2014-abu",  year: 2014, title: "Hamilton wins first Abu Dhabi",   teamLabel: "MERCEDES · DOMINANT",        conditionBadge: "WIN",    conditionColor: "#00D2BE", glowColor: "#00D2BE" },
];

export const abuDhabiWeather: VenueWeather = {
  venueId: "abu-dhabi",
  dryPct: 97,
  mixedPct: 2,
  wetPct: 1,
  totalRaces: 17,
  chaoticRaces: [
    { year: 2021, label: "Safety car restart, Verstappen wins title final lap", type: "DRY" },
    { year: 2010, label: "Alonso stranded behind Petrov, Vettel wins title", type: "DRY" },
    { year: 2016, label: "Rosberg wraps up title, retires from F1 days later", type: "DRY" },
  ],
};

/* ─── Export index ────────────────────────────────────────────────────────── */

export const MOCK_VENUES: Record<string, Venue> = {
  spa,
  monaco,
  monza,
  silverstone,
  suzuka,
  interlagos,
  bahrain,
  "abu-dhabi": abudhabi,
};
