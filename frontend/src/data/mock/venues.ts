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

/* ─── Accurate track path ─────────────────────────────────────────────────────
   Source: julesr0y/f1-circuits-svg · spa-francorchamps-4.svg (2007–2026 layout)
   GPS-derived via OSM. ViewBox 500×500.
   ─────────────────────────────────────────────────────────────────────────── */
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

/* ─── Export index ────────────────────────────────────────────────────────── */

export const MOCK_VENUES: Record<string, Venue> = {
  spa,
};
