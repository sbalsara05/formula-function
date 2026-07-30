import { notFound } from 'next/navigation'
import DriverPage from '@/components/driver/DriverPage'
import {
  type GenericDriverStats,
  type DriverCareerSeason,
} from '@/components/driver/GenericDriverPage'
import {
  vettel, vettelStats, vettelEras, vettelSignature,
  vettelReelSlides, vettelScoutingReport,
  bearman, bearmanStats, bearmanEras, bearmanSignature,
  bearmanReelSlides, bearmanScoutingReport, bearmanTrajectory,
  bearmanF1Stats, bearmanF1Signature, bearmanF1ReelSlides, bearmanF1ScoutingReport,
  hamilton, hamiltonStats, hamiltonEras, hamiltonSignature,
  hamiltonReelSlides, hamiltonScoutingReport,
  verstappen, verstappenStats, verstappenEras, verstappenSignature,
  verstappenReelSlides, verstappenScoutingReport,
  leclerc, leclerStats, leclerEras, leclerSignature,
  leclerReelSlides, leclerScoutingReport,
  leclercF2, leclercF2Stats, leclercF2Eras, leclercF2Signature,
  leclercF2ReelSlides, leclercF2ScoutingReport,
  russellF2, russellF2Stats, russellF2Eras, russellF2Signature,
  russellF2ReelSlides, russellF2ScoutingReport,
  russellF1, russellF1Stats, russellF1Eras, russellF1Signature,
  russellF1ReelSlides, russellF1ScoutingReport,
  piastriF2, piastriF2Stats, piastriF2Eras, piastriF2Signature,
  piastriF2ReelSlides, piastriF2ScoutingReport,
  piastriF1, piastriF1Stats, piastriF1Eras, piastriF1Signature,
  piastriF1ReelSlides, piastriF1ScoutingReport,
  bortoleto, bortoletoStats, bortoletoEras, bortoletoSignature,
  bortoletoReelSlides, bortoletoScoutingReport,
  bortoletoF1Stats, bortoletoF1Signature, bortoletoF1ReelSlides, bortoletoF1ScoutingReport,
  norris, norrisStats, norrisEras, norrisSignature, norrisReelSlides, norrisScoutingReport,
  antonelli, antonelliStats, antonelliEras, antonelliSignature, antonelliReelSlides, antonelliScoutingReport,
  alonso, alonsoStats, alonsoEras, alonsoSignature, alonsoReelSlides, alonsoScoutingReport,
  stroll, strollStats, strollEras, strollSignature, strollReelSlides, strollScoutingReport,
  gasly, gaslyStats, gaslyEras, gaslySignature, gaslyReelSlides, gaslyScoutingReport,
  colapinto, colapintoStats, colapintoEras, colapintoSignature, colapintoReelSlides, colapintoScoutingReport,
  albon, albonStats, albonEras, albonSignature, albonReelSlides, albonScoutingReport,
  sainz, sainzStats, sainzEras, sainzSignature, sainzReelSlides, sainzScoutingReport,
  ocon, oconStats, oconEras, oconSignature, oconReelSlides, oconScoutingReport,
  hulkenberg, hulkenbergStats, hulkenbergEras, hulkenbergSignature, hulkenbergReelSlides, hulkenbergScoutingReport,
  tsunoda, tsunodaStats, tsunodaEras, tsunodaSignature, tsunodaReelSlides, tsunodaScoutingReport,
  hadjar, hadjarStats, hadjarEras, hadjarSignature, hadjarReelSlides, hadjarScoutingReport,
  lawson, lawsonStats, lawsonEras, lawsonSignature, lawsonReelSlides, lawsonScoutingReport,
  perez, perezStats, perezEras, perezSignature, perezReelSlides, perezScoutingReport,
  bottas, bottasStats, bottasEras, bottasSignature, bottasReelSlides, bottasScoutingReport,
  prost, prostStats, prostEras, prostSignature, prostReelSlides, prostScoutingReport,
  schumacher, schumacherStats, schumacherEras, schumacherSignature, schumacherReelSlides, schumacherScoutingReport,
  senna, sennaStats, sennaEras, sennaSignature, sennaReelSlides, sennaScoutingReport,
  raikkonen, raikkonenStats, raikkonenEras, raikkonenSignature, raikkonenReelSlides, raikkonenScoutingReport,
  button, buttonStats, buttonEras, buttonSignature, buttonReelSlides, buttonScoutingReport,
  hakkinen, hakkinenStats, hakkinenEras, hakkinenSignature, hakkinenReelSlides, hakkinenScoutingReport,
  damonHill, damonHillStats, damonHillEras, damonHillSignature, damonHillReelSlides, damonHillScoutingReport,
  mansell, mansellStats, mansellEras, mansellSignature, mansellReelSlides, mansellScoutingReport,
  nicoRosberg, nicoRosbergStats, nicoRosbergEras, nicoRosbergSignature, nicoRosbergReelSlides, nicoRosbergScoutingReport,
  ricciardo, ricciardoStats, ricciardoEras, ricciardoSignature, ricciardoReelSlides, ricciardoScoutingReport,
  lindblad, lindbladStats, lindbladEras, lindbladSignature, lindbladReelSlides, lindbladScoutingReport,
  magnussen, magnussenStats, magnussenEras, magnussenSignature, magnussenReelSlides, magnussenScoutingReport,
} from '@/data/mock/drivers'
import type {
  Series, Driver, DriverStats, DriverEra, DrivingSignature,
  ReelSlide, ScoutingReport, TrajectoryPrediction,
} from '@/lib/types'

const SERIES_MAP: Record<string, Series> = {
  '1': 'f1',
  '2': 'f2',
  '3': 'f3',
}

interface DriverBundle {
  driver: Driver
  stats: DriverStats
  eras: DriverEra[]
  signature: DrivingSignature
  reelSlides: ReelSlide[]
  scoutingReport: ScoutingReport
  trajectoryPrediction?: TrajectoryPrediction
  heroStatRows?: Array<{ label: string; value: string; sub?: string; accent?: boolean }>
}

const VERSTAPPEN_F1: DriverBundle = {
  driver: verstappen, stats: verstappenStats, eras: verstappenEras,
  signature: verstappenSignature, reelSlides: verstappenReelSlides,
  scoutingReport: verstappenScoutingReport,
}

const LINDBLAD_F1: DriverBundle = {
  driver: lindblad, stats: lindbladStats, eras: lindbladEras,
  signature: lindbladSignature, reelSlides: lindbladReelSlides,
  scoutingReport: lindbladScoutingReport,
}

const SCHUMACHER_F1: DriverBundle = {
  driver: schumacher, stats: schumacherStats, eras: schumacherEras,
  signature: schumacherSignature, reelSlides: schumacherReelSlides,
  scoutingReport: schumacherScoutingReport,
}

const MAGNUSSEN_F1: DriverBundle = {
  driver: magnussen, stats: magnussenStats, eras: magnussenEras,
  signature: magnussenSignature, reelSlides: magnussenReelSlides,
  scoutingReport: magnussenScoutingReport,
}

const DRIVER_REGISTRY: Partial<Record<Series, Record<string, DriverBundle>>> = {
  f1: {
    vettel:      { driver: vettel,      stats: vettelStats,      eras: vettelEras,      signature: vettelSignature,      reelSlides: vettelReelSlides,      scoutingReport: vettelScoutingReport },
    hamilton:    { driver: hamilton,    stats: hamiltonStats,    eras: hamiltonEras,    signature: hamiltonSignature,    reelSlides: hamiltonReelSlides,    scoutingReport: hamiltonScoutingReport },
    verstappen:  VERSTAPPEN_F1,
    // Jolpica driverId max_verstappen → live standings slug max-verstappen
    'max-verstappen': VERSTAPPEN_F1,
    leclerc:     { driver: leclerc,     stats: leclerStats,      eras: leclerEras,      signature: leclerSignature,      reelSlides: leclerReelSlides,      scoutingReport: leclerScoutingReport },
    norris:      { driver: norris,      stats: norrisStats,      eras: norrisEras,      signature: norrisSignature,      reelSlides: norrisReelSlides,      scoutingReport: norrisScoutingReport },
    piastri:     { driver: piastriF1,   stats: piastriF1Stats,   eras: piastriF1Eras,   signature: piastriF1Signature,   reelSlides: piastriF1ReelSlides,   scoutingReport: piastriF1ScoutingReport },
    russell:     { driver: russellF1,   stats: russellF1Stats,   eras: russellF1Eras,   signature: russellF1Signature,   reelSlides: russellF1ReelSlides,   scoutingReport: russellF1ScoutingReport },
    antonelli:   { driver: antonelli,   stats: antonelliStats,   eras: antonelliEras,   signature: antonelliSignature,   reelSlides: antonelliReelSlides,   scoutingReport: antonelliScoutingReport },
    alonso:      { driver: alonso,      stats: alonsoStats,      eras: alonsoEras,      signature: alonsoSignature,      reelSlides: alonsoReelSlides,      scoutingReport: alonsoScoutingReport },
    stroll:      { driver: stroll,      stats: strollStats,      eras: strollEras,      signature: strollSignature,      reelSlides: strollReelSlides,      scoutingReport: strollScoutingReport },
    gasly:       { driver: gasly,       stats: gaslyStats,       eras: gaslyEras,       signature: gaslySignature,       reelSlides: gaslyReelSlides,       scoutingReport: gaslyScoutingReport },
    colapinto:   { driver: colapinto,   stats: colapintoStats,   eras: colapintoEras,   signature: colapintoSignature,   reelSlides: colapintoReelSlides,   scoutingReport: colapintoScoutingReport },
    albon:       { driver: albon,       stats: albonStats,       eras: albonEras,       signature: albonSignature,       reelSlides: albonReelSlides,       scoutingReport: albonScoutingReport },
    sainz:       { driver: sainz,       stats: sainzStats,       eras: sainzEras,       signature: sainzSignature,       reelSlides: sainzReelSlides,       scoutingReport: sainzScoutingReport },
    bearman:     { driver: bearman,     stats: bearmanF1Stats,   eras: bearmanEras,     signature: bearmanF1Signature,   reelSlides: bearmanF1ReelSlides,   scoutingReport: bearmanF1ScoutingReport },
    ocon:        { driver: ocon,        stats: oconStats,        eras: oconEras,        signature: oconSignature,        reelSlides: oconReelSlides,        scoutingReport: oconScoutingReport },
    hulkenberg:  { driver: hulkenberg,  stats: hulkenbergStats,  eras: hulkenbergEras,  signature: hulkenbergSignature,  reelSlides: hulkenbergReelSlides,  scoutingReport: hulkenbergScoutingReport },
    bortoleto:   { driver: bortoleto,   stats: bortoletoF1Stats, eras: bortoletoEras,   signature: bortoletoF1Signature, reelSlides: bortoletoF1ReelSlides, scoutingReport: bortoletoF1ScoutingReport },
    tsunoda:     { driver: tsunoda,     stats: tsunodaStats,     eras: tsunodaEras,     signature: tsunodaSignature,     reelSlides: tsunodaReelSlides,     scoutingReport: tsunodaScoutingReport },
    hadjar:      { driver: hadjar,      stats: hadjarStats,      eras: hadjarEras,      signature: hadjarSignature,      reelSlides: hadjarReelSlides,      scoutingReport: hadjarScoutingReport },
    lawson:      { driver: lawson,      stats: lawsonStats,      eras: lawsonEras,      signature: lawsonSignature,      reelSlides: lawsonReelSlides,      scoutingReport: lawsonScoutingReport },
    lindblad:    LINDBLAD_F1,
    // Jolpica driverId arvid_lindblad → live standings slug arvid-lindblad
    'arvid-lindblad': LINDBLAD_F1,
    // Jolpica short id "magnussen" is Jan; Kevin is kevin_magnussen
    magnussen:   MAGNUSSEN_F1,
    'kevin-magnussen': MAGNUSSEN_F1,
    perez:       { driver: perez,       stats: perezStats,       eras: perezEras,       signature: perezSignature,       reelSlides: perezReelSlides,       scoutingReport: perezScoutingReport },
    bottas:      { driver: bottas,      stats: bottasStats,      eras: bottasEras,      signature: bottasSignature,      reelSlides: bottasReelSlides,      scoutingReport: bottasScoutingReport },
    prost:       { driver: prost,       stats: prostStats,       eras: prostEras,       signature: prostSignature,       reelSlides: prostReelSlides,       scoutingReport: prostScoutingReport },
    schumacher:  SCHUMACHER_F1,
    'michael-schumacher': SCHUMACHER_F1,
    senna:       { driver: senna,       stats: sennaStats,       eras: sennaEras,       signature: sennaSignature,       reelSlides: sennaReelSlides,       scoutingReport: sennaScoutingReport },
    raikkonen:   { driver: raikkonen,   stats: raikkonenStats,   eras: raikkonenEras,   signature: raikkonenSignature,   reelSlides: raikkonenReelSlides,   scoutingReport: raikkonenScoutingReport },
    button:      { driver: button,      stats: buttonStats,      eras: buttonEras,      signature: buttonSignature,      reelSlides: buttonReelSlides,      scoutingReport: buttonScoutingReport },
    hakkinen:    { driver: hakkinen,    stats: hakkinenStats,    eras: hakkinenEras,    signature: hakkinenSignature,    reelSlides: hakkinenReelSlides,    scoutingReport: hakkinenScoutingReport },
    hill:        { driver: damonHill,   stats: damonHillStats,   eras: damonHillEras,   signature: damonHillSignature,   reelSlides: damonHillReelSlides,   scoutingReport: damonHillScoutingReport },
    mansell:     { driver: mansell,     stats: mansellStats,     eras: mansellEras,     signature: mansellSignature,     reelSlides: mansellReelSlides,     scoutingReport: mansellScoutingReport },
    rosberg:     { driver: nicoRosberg, stats: nicoRosbergStats, eras: nicoRosbergEras, signature: nicoRosbergSignature, reelSlides: nicoRosbergReelSlides, scoutingReport: nicoRosbergScoutingReport },
    ricciardo:   { driver: ricciardo,   stats: ricciardoStats,   eras: ricciardoEras,   signature: ricciardoSignature,   reelSlides: ricciardoReelSlides,   scoutingReport: ricciardoScoutingReport },
  },
  f2: {
    bearman: {
      driver: bearman,
      stats: bearmanStats,
      eras: bearmanEras,
      signature: bearmanSignature,
      reelSlides: bearmanReelSlides,
      scoutingReport: bearmanScoutingReport,
      trajectoryPrediction: bearmanTrajectory,
      heroStatRows: [
        { label: '2025 WDC', value: 'P13', sub: 'HAAS', accent: true },
        { label: '2025 PTS', value: '41' },
        { label: 'F1 STARTS', value: '27', sub: '3 SUB + 24 HAAS' },
        { label: 'BEST RESULT', value: 'P4', sub: 'MEXICO 2025' },
        { label: '2026', value: 'HAAS', sub: 'F1 ONGOING' },
      ],
    },
    'leclerc-f2': {
      driver: leclercF2,
      stats: leclercF2Stats,
      eras: leclercF2Eras,
      signature: leclercF2Signature,
      reelSlides: leclercF2ReelSlides,
      scoutingReport: leclercF2ScoutingReport,
      heroStatRows: [
        { label: 'F2 TITLE', value: '2017', sub: 'PREMA', accent: true },
        { label: 'F2 WINS', value: '7', sub: '1 SEASON' },
        { label: 'F2 POLES', value: '5' },
        { label: 'DEST', value: 'Ferrari', sub: 'F1 2019–' },
        { label: 'F1 STATUS', value: 'ACTIVE', sub: 'FERRARI' },
      ],
    },
    'russell-f2': {
      driver: russellF2,
      stats: russellF2Stats,
      eras: russellF2Eras,
      signature: russellF2Signature,
      reelSlides: russellF2ReelSlides,
      scoutingReport: russellF2ScoutingReport,
      heroStatRows: [
        { label: 'F2 TITLE', value: '2018', sub: 'ART', accent: true },
        { label: 'F2 WINS', value: '4', sub: 'WIRE-TO-WIRE' },
        { label: 'F2 PODIUMS', value: '12' },
        { label: 'DEST', value: 'Mercedes', sub: 'F1 2022–' },
        { label: 'F1 STATUS', value: 'ACTIVE', sub: 'MERCEDES' },
      ],
    },
    'piastri-f2': {
      driver: piastriF2,
      stats: piastriF2Stats,
      eras: piastriF2Eras,
      signature: piastriF2Signature,
      reelSlides: piastriF2ReelSlides,
      scoutingReport: piastriF2ScoutingReport,
      heroStatRows: [
        { label: 'F2 TITLE', value: '2021', sub: 'PREMA', accent: true },
        { label: 'F2 WINS', value: '5', sub: 'ROOKIE SEASON' },
        { label: 'F2 PODIUMS', value: '14' },
        { label: 'F3 TITLE', value: '2020', sub: 'PREMA' },
        { label: 'DEST', value: 'McLaren', sub: 'F1 2023–' },
      ],
    },
    bortoleto: {
      driver: bortoleto,
      stats: bortoletoStats,
      eras: bortoletoEras,
      signature: bortoletoSignature,
      reelSlides: bortoletoReelSlides,
      scoutingReport: bortoletoScoutingReport,
      heroStatRows: [
        { label: 'F2 TITLE', value: '2024', sub: 'INVICTA', accent: true },
        { label: 'F3 TITLE', value: '2023', sub: 'TRIDENT' },
        { label: 'F2 WINS', value: '5' },
        { label: 'DEST', value: 'Sauber', sub: 'F1 2025–' },
        { label: 'F1 STATUS', value: 'ACTIVE', sub: 'SAUBER/AUDI' },
      ],
    },
  },
}

/* ─── Slug → Jolpica driver ID ───────────────────────────────────────────── */

const DRIVER_SLUG_TO_JOLPICA: Record<string, string> = {
  // Current grid
  norris: 'norris',
  piastri: 'piastri',
  verstappen: 'max_verstappen',
  leclerc: 'leclerc',
  hamilton: 'hamilton',
  russell: 'russell',
  alonso: 'alonso',
  stroll: 'stroll',
  gasly: 'gasly',
  ocon: 'ocon',
  albon: 'albon',
  sainz: 'sainz',
  bearman: 'bearman',
  tsunoda: 'tsunoda',
  hulkenberg: 'hulkenberg',
  lawson: 'lawson',
  antonelli: 'antonelli',
  doohan: 'doohan',
  hadjar: 'hadjar',
  bortoleto: 'bortoleto',
  colapinto: 'colapinto',
  lindblad: 'arvid_lindblad',
  // Recent retired
  vettel: 'vettel',
  ricciardo: 'ricciardo',
  bottas: 'bottas',
  perez: 'perez',
  // Jolpica: magnussen = Jan; kevin_magnussen = Kevin (curated /f/1/driver/magnussen)
  magnussen: 'kevin_magnussen',
  'kevin-magnussen': 'kevin_magnussen',
  'jan-magnussen': 'magnussen',
  zhou: 'zhou',
  'de-vries': 'de_vries',
  mick_schumacher: 'mick_schumacher',
  'mick-schumacher': 'mick_schumacher',
  latifi: 'latifi',
  kubica: 'kubica',
  // Champions and all-time greats
  schumacher: 'michael_schumacher',
  'michael-schumacher': 'michael_schumacher',
  'ralf-schumacher': 'ralf_schumacher',
  senna: 'senna',
  prost: 'prost',
  lauda: 'lauda',
  button: 'button',
  raikkonen: 'raikkonen',
  rosberg: 'rosberg',
  'nico-rosberg': 'rosberg',
  'keke-rosberg': 'keke_rosberg',
  webber: 'webber',
  massa: 'massa',
  hakkinen: 'hakkinen',
  hill: 'damon_hill',
  'damon-hill': 'damon_hill',
  'graham-hill': 'hill',
  mansell: 'mansell',
  piquet: 'piquet',
  coulthard: 'coulthard',
  barrichello: 'barrichello',
  montoya: 'montoya',
  alesi: 'alesi',
  berger: 'berger',
  andretti: 'andretti',
  hunt: 'hunt',
  // Jolpica short id is Christian; Emerson is emerson_fittipaldi
  fittipaldi: 'emerson_fittipaldi',
  'emerson-fittipaldi': 'emerson_fittipaldi',
  'christian-fittipaldi': 'fittipaldi',
  stewart: 'stewart',
  clark: 'clark',
  fangio: 'fangio',
  ascari: 'ascari',
  moss: 'moss',
  villeneuve: 'villeneuve',
  'gilles-villeneuve': 'gilles_villeneuve',
  'jacques-villeneuve': 'villeneuve',
  scheckter: 'scheckter',
  jones: 'jones',
  // Jolpica short id is David; Jack (3× WDC) is jack_brabham
  brabham: 'jack_brabham',
  'jack-brabham': 'jack_brabham',
  'david-brabham': 'brabham',
  hulme: 'hulme',
  rindt: 'rindt',
  ickx: 'ickx',
  regazzoni: 'regazzoni',
  reutemann: 'reutemann',
  patrese: 'patrese',
  arnoux: 'arnoux',
  pironi: 'pironi',
  laffite: 'laffite',
  trulli: 'trulli',
  fisichella: 'fisichella',
  irvine: 'irvine',
  // Jolpica id is "rosa", not de_la_rosa
  'de-la-rosa': 'rosa',
  rosa: 'rosa',
  button2: 'button',
}

/* ─── Driver portrait / action image map ─────────────────────────────────── */
// Filenames verified against Wikipedia infobox images (Special:FilePath redirect)

const W = 'https://en.wikipedia.org/wiki/Special:FilePath/'

const DRIVER_IMAGE_MAP: Record<string, string> = {
  // Current grid
  max_verstappen:     '/images/drivers/verstappen-redbull-portrait-2024.jpg',
  hamilton:           'https://upload.wikimedia.org/wikipedia/commons/d/d3/Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_%2854566928382%29_%28cropped%29.jpg',
  leclerc:            'https://upload.wikimedia.org/wikipedia/commons/7/7b/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3978_by_Stepro_%28cropped2%29.jpg',
  norris:             'https://upload.wikimedia.org/wikipedia/commons/9/90/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_%28cropped2%29.jpg',
  piastri:            'https://upload.wikimedia.org/wikipedia/commons/e/e5/2026_Chinese_GP_-_Oscar_Piastri_%28cropped%29_%28cropped%29.jpg',
  alonso:             'https://upload.wikimedia.org/wikipedia/commons/9/97/Alonso-68_%2824710447098%29.jpg',
  russell:            'https://upload.wikimedia.org/wikipedia/commons/7/7f/KingsLeonSilverstne040724_%2828_of_112%29_%2853838006028%29_%28cropped%29.jpg',
  sainz:              'https://upload.wikimedia.org/wikipedia/commons/c/ce/Formula1Gabelhofen2022_%2804%29_%28cropped2%29.jpg',
  bottas:             'https://upload.wikimedia.org/wikipedia/commons/9/93/Valtteri_Bottas_at_the_2026_Adelaide_Motorsport_Festival_%28028A7567%29.jpg',
  ricciardo:          'https://upload.wikimedia.org/wikipedia/commons/c/c0/Daniel_Ricciardo_January_2024.jpg',
  bearman:            'https://upload.wikimedia.org/wikipedia/commons/f/f8/FIA_F1_Austria_2025_Nr._87_Bearman.jpg',
  tsunoda:            'https://upload.wikimedia.org/wikipedia/commons/a/a5/FIA_F1_Austria_2024_Nr._22_Tsunoda.jpg',
  hulkenberg:         'https://upload.wikimedia.org/wikipedia/commons/d/db/H%C3%BClkenberg_2024_BelgiumGP.jpg',
  albon:              'https://upload.wikimedia.org/wikipedia/commons/7/7d/FIA_F1_Austria_2025_Nr._23_Albon.jpg',
  gasly:              'https://upload.wikimedia.org/wikipedia/commons/7/70/2022_French_Grand_Prix_%2852279065728%29_%28cropped%29.png',
  stroll:             'https://upload.wikimedia.org/wikipedia/commons/a/ae/FIA_F1_Austria_2024_Nr._18_Stroll.jpg',
  ocon:               'https://upload.wikimedia.org/wikipedia/commons/7/7e/FIA_F1_Austria_2024_Nr._31_Ocon.jpg',
  // Legends / retired
  michael_schumacher: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Michael_Schumacher_2006_Indianapolis.jpg',
  vettel:             'https://upload.wikimedia.org/wikipedia/commons/4/4c/Sebastian_Vettel_-_2022236172324_2022-08-24_Champions_for_Charity_-_Sven_-_1D_X_MK_II_-_0418_-_B70I2428_%28cropped%29.jpg',
  senna:              'https://upload.wikimedia.org/wikipedia/commons/6/65/Ayrton_Senna_9_%28cropped%29.jpg',
  prost:              'https://upload.wikimedia.org/wikipedia/commons/c/c4/Alain_Prost_2008_%28cropped%29.jpg',
  raikkonen:          'https://upload.wikimedia.org/wikipedia/commons/f/ff/F12019_Schloss_Gabelhofen_%2822%29_%28cropped%29.jpg',
  rosberg:            'https://upload.wikimedia.org/wikipedia/commons/3/31/Nico_Rosberg_2016.jpg',
  button:             'https://upload.wikimedia.org/wikipedia/commons/0/0c/Jenson_Button_2024_WEC_Fuji.jpg',
  hakkinen:           'https://upload.wikimedia.org/wikipedia/commons/a/a6/Mika_H%C3%A4kkinen_Champions_for_Charity_2016-07-27.jpg',
  mansell:            'https://upload.wikimedia.org/wikipedia/commons/e/e4/Nigel_Mansell_-_Mexican_Grand_Prix_01_%28cropped%29.jpeg',
  lauda:              W + 'Niki_Lauda_2013_%28cropped%29.jpg',
  barrichello:        W + 'Rubens_Barrichello_2011_British_GP_%28cropped%29.jpg',
  webber:             W + 'Mark_Webber_2013_Malaysia_%28cropped%29.jpg',
  massa:              W + 'Felipe_Massa_2017_%28cropped%29.jpg',
  coulthard:          W + 'David_Coulthard_Goodwood_2012_%28cropped%29.jpg',
  damon_hill:         'https://upload.wikimedia.org/wikipedia/commons/3/31/Damon_Hill_at_the_Atlassian_Williams_Racing_Fan_Zone_of_2026_%28028A8247%29.jpg',
  keke_rosberg:       W + 'Anefo_932-2378_Keke_Rosberg%2C_Zandvoort%2C_03-07-1982_-_Restoration.jpg',
  mick_schumacher:    W + 'Mick_Schumacher_2024_WEC_Fuji.jpg',
  hunt:               W + 'James_Hunt_1976_British_GP_%28cropped%29.jpg',
  stewart:            W + 'Jackie_Stewart_Goodwood_2012_%28cropped%29.jpg',
  fangio:             W + 'Juan_Manuel_Fangio_1952_%28cropped%29.jpg',
  clark:              W + 'Jim_Clark_1965_%28cropped%29.jpg',
  antonelli:          'https://upload.wikimedia.org/wikipedia/commons/f/f3/Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin%2C_TX_%28cropped%29.jpg',
  hadjar:             'https://upload.wikimedia.org/wikipedia/commons/7/75/Isack_Hadjar_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8753%29_%28cropped%29.jpg',
  colapinto:          'https://upload.wikimedia.org/wikipedia/commons/a/a0/Franco_Colapinto_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8704%29_%28cropped%29.jpg',
  lawson:             'https://upload.wikimedia.org/wikipedia/commons/5/53/Liam_Lawson_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7793%29.jpg',
  bortoleto:          'https://upload.wikimedia.org/wikipedia/commons/f/fe/Gabriel_Bortoleto_%28cropped%29.jpg',
  perez:              'https://upload.wikimedia.org/wikipedia/commons/5/55/2021_US_GP_driver_parade_%28cropped2%29.jpg',
  arvid_lindblad:     'https://upload.wikimedia.org/wikipedia/commons/0/03/Arvid_Lindblad_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7727%29.jpg',
  doohan:             'https://upload.wikimedia.org/wikipedia/commons/8/8d/2025_Japan_GP_-_Alpine_-_Jack_Doohan_-_FP3.jpg',
  kevin_magnussen:    'https://upload.wikimedia.org/wikipedia/commons/5/5b/FIA_F1_Austria_2022_Nr._20_Magnussen.jpg',
}

/* ─── Team color lookup ───────────────────────────────────────────────────── */

const TEAM_COLORS: Record<string, string> = {
  ferrari: '#DC0000', mclaren: '#FF8000', mercedes: '#00D2BE',
  red_bull: '#1E3A8A', williams: '#005AFF', aston_martin: '#006F62',
  alpine: '#0090FF', haas: '#B6BABD', sauber: '#52E252', rb: '#6692FF',
  audi: '#BB1C2A', cadillac: '#C8A951',
  lotus: '#FFD700', renault: '#FFD700', benetton: '#009944', brawn: '#BFFF00',
  tyrrell: '#1565C0', brabham: '#4A90D9', cooper: '#2E7D32', brm: '#1B5E20',
  jordan: '#FFD700', force_india: '#FF80C7', racing_point: '#FF80C7',
  alfa_romeo: '#900000', toro_rosso: '#C00000', minardi: '#333',
}

/* ─── Jolpica helpers ─────────────────────────────────────────────────────── */

async function jolpicaTotal(url: string): Promise<number> {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } })
    if (!res.ok) return 0
    const d = await res.json()
    if (!d?.MRData) return 0
    return parseInt(d.MRData.total ?? '0', 10)
  } catch {
    return 0
  }
}

interface JolpicaDriverInfo {
  givenName: string
  familyName: string
  nationality: string
  permanentNumber?: string
  dateOfBirth?: string
}

async function fetchDriverInfo(jolpicaId: string): Promise<JolpicaDriverInfo | null> {
  try {
    const res = await fetch(
      `https://api.jolpi.ca/ergast/f1/drivers/${jolpicaId}.json`,
      { next: { revalidate: 86400 } },
    )
    if (!res.ok) return null
    const data = await res.json()
    const d = data?.MRData?.DriverTable?.Drivers?.[0]
    if (!d) return null
    return {
      givenName: d.givenName,
      familyName: d.familyName,
      nationality: d.nationality,
      permanentNumber: d.permanentNumber,
      dateOfBirth: d.dateOfBirth,
    }
  } catch {
    return null
  }
}

async function fetchDriverAllTimeStats(jolpicaId: string): Promise<GenericDriverStats | null> {
  const base = `https://api.jolpi.ca/ergast/f1/drivers/${jolpicaId}`
  try {
    const [races, wins, p2, p3, poles, seasons] = await Promise.all([
      jolpicaTotal(`${base}/results.json?limit=1`),
      jolpicaTotal(`${base}/results/1.json?limit=1`),
      jolpicaTotal(`${base}/results/2.json?limit=1`),
      jolpicaTotal(`${base}/results/3.json?limit=1`),
      jolpicaTotal(`${base}/qualifying/1.json?limit=1`),
      jolpicaTotal(`${base}/seasons.json?limit=1`),
    ])
    return { races, wins, poles, podiums: wins + p2 + p3, championships: 0, seasons }
  } catch {
    return null
  }
}

async function fetchDriverCurrentStanding(jolpicaId: string): Promise<{
  position: number
  points: string
  wins: string
  season: string
  constructorId: string
  constructorName: string
} | null> {
  try {
    const res = await fetch(
      'https://api.jolpi.ca/ergast/f1/current/driverstandings.json',
      { next: { revalidate: 300 } },
    )
    if (!res.ok) return null
    const data = await res.json()
    const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]
    if (!list) return null
    const entry = list.DriverStandings?.find(
      (s: Record<string, unknown>) => (s.Driver as Record<string, string>)?.driverId === jolpicaId,
    )
    if (!entry) return null
    const constructor = (entry.Constructors as Array<Record<string, string>>)?.[0]
    return {
      position: parseInt(entry.position),
      points: entry.points,
      wins: entry.wins,
      season: list.season,
      constructorId: constructor?.constructorId ?? '',
      constructorName: constructor?.name ?? '',
    }
  } catch {
    return null
  }
}

async function fetchDriverCareerHistory(jolpicaId: string): Promise<DriverCareerSeason[]> {
  try {
    const seasonsRes = await fetch(
      `https://api.jolpi.ca/ergast/f1/drivers/${jolpicaId}/seasons.json?limit=100`,
      { next: { revalidate: 86400 } },
    )
    if (!seasonsRes.ok) return []
    const seasonsData = await seasonsRes.json()
    const allYears: string[] = (seasonsData?.MRData?.SeasonTable?.Seasons ?? []).map((s: { season: string }) => s.season)
    if (!allYears.length) return []

    const BATCH = 8
    const history: DriverCareerSeason[] = []

    for (let i = 0; i < allYears.length; i += BATCH) {
      const batch = allYears.slice(i, i + BATCH)
      const settled = await Promise.allSettled(
        batch.map(async (year) => {
          const res = await fetch(
            `https://api.jolpi.ca/ergast/f1/${year}/drivers/${jolpicaId}/driverstandings.json`,
            { next: { revalidate: 86400 } },
          )
          if (!res.ok) return null
          const data = await res.json()
          const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]
          if (!list) return null
          const s = list.DriverStandings?.[0]
          if (!s) return null
          const constructor = (s.Constructors as Array<Record<string, string>>)?.[0]
          return {
            season: parseInt(year),
            position: parseInt(s.position ?? '0'),
            points: parseFloat(s.points ?? '0'),
            wins: parseInt(s.wins ?? '0'),
            constructorId: constructor?.constructorId ?? 'unknown',
            constructorName: constructor?.name ?? 'Unknown',
          } as DriverCareerSeason
        }),
      )
      for (const r of settled) {
        if (r.status === 'fulfilled' && r.value) history.push(r.value)
      }
    }

    return history.filter(r => r.season > 0 && r.position > 0).sort((a, b) => a.season - b.season)
  } catch {
    return []
  }
}

/* ─── Generic driver bundle builder ─────────────────────────────────────────── */

const REEL_PATHS = [
  'M 30 160 L 80 160 Q 100 145, 115 110 L 160 110 Q 180 125, 195 160 L 235 160 Q 255 175, 270 205 L 310 205 Q 330 185, 350 155 L 380 155',
  'M 30 120 L 90 120 Q 112 108, 130 70 L 180 70 Q 210 88, 230 120 L 290 120 Q 310 104, 325 72 L 370 72',
  'M 30 140 L 60 140 Q 75 130, 85 90 L 120 90 Q 140 105, 155 140 L 195 140 Q 215 155, 230 195 L 260 198 Q 275 180, 290 140 L 330 140 Q 345 120, 360 80 L 380 80',
  'M 30 120 Q 60 110, 85 85 L 145 85 Q 175 98, 195 120 L 255 120 Q 285 105, 310 80 L 370 80',
  'M 30 150 L 80 150 Q 110 138, 130 100 L 175 100 Q 195 115, 210 150 L 260 150 Q 290 170, 315 200 L 370 200',
]

function groupCareerByTeam(history: DriverCareerSeason[]) {
  if (!history.length) return []
  const sorted = [...history].sort((a, b) => a.season - b.season)
  const groups: Array<{ constructorId: string; constructorName: string; startYear: number; endYear: number; seasons: DriverCareerSeason[] }> = []
  let cur = { constructorId: sorted[0].constructorId, constructorName: sorted[0].constructorName, startYear: sorted[0].season, endYear: sorted[0].season, seasons: [sorted[0]] }
  for (let i = 1; i < sorted.length; i++) {
    const s = sorted[i]
    if (s.constructorId === cur.constructorId) { cur.seasons.push(s); cur.endYear = s.season }
    else { groups.push(cur); cur = { constructorId: s.constructorId, constructorName: s.constructorName, startYear: s.season, endYear: s.season, seasons: [s] } }
  }
  groups.push(cur)
  return groups
}

function buildErasFromHistory(driverId: string, careerHistory: DriverCareerSeason[]): DriverEra[] {
  return groupCareerByTeam(careerHistory).map(g => {
    const titles = g.seasons.filter(s => s.position === 1).length
    const wins = g.seasons.reduce((sum, s) => sum + s.wins, 0)
    const bestPos = Math.min(...g.seasons.map(s => s.position || 99))
    const statLabel = titles > 0 ? `${titles}× WDC` : wins > 0 ? `${wins}W` : bestPos <= 3 ? `P${bestPos}` : undefined
    const color = TEAM_COLORS[g.constructorId] ?? '#888'
    return {
      driverId, teamId: g.constructorId, teamName: g.constructorName,
      seasons: g.startYear === g.endYear ? `${g.startYear}` : `${g.startYear}–${g.endYear}`,
      highlights: [], titles, wins, teamLiveryHex: color,
      teamAccentHex: titles > 0 ? '#FFD700' : undefined, statLabel,
    } as DriverEra
  })
}

function buildSignatureFromStats(driverId: string, stats: GenericDriverStats): DrivingSignature {
  const w = stats.races > 0 ? stats.wins / stats.races : 0
  const p = stats.races > 0 ? stats.poles / stats.races : 0
  const pod = stats.races > 0 ? stats.podiums / stats.races : 0
  const c = stats.championships
  return {
    driverId, series: 'f1',
    axes: [
      { label: 'Steering Smoothness',   value: Math.min(95, Math.round(73 + c * 2.5 + p * 10)) },
      { label: 'Entry Aggression',      value: Math.min(97, Math.round(65 + w * 80 + pod * 10)) },
      { label: 'Tyre Management',       value: Math.min(93, Math.round(72 + pod * 18 + c * 2)) },
      { label: 'Throttle Application',  value: Math.min(95, Math.round(70 + w * 50 + p * 10)) },
      { label: 'Braking',               value: Math.min(97, Math.round(68 + p * 90 + c * 2)) },
      { label: 'Consistency',           value: Math.min(96, Math.round(68 + pod * 28 + c * 3)) },
    ],
    cohortAverage: [74, 72, 74, 73, 75, 74],
    confidenceScore: 0.55,
    sampleSize: stats.races * 45,
  }
}

function buildReelSlidesFromHistory(
  initials: string, stats: GenericDriverStats,
  careerHistory: DriverCareerSeason[], teamColor: string,
  portraitUrl?: string,
): ReelSlide[] {
  const sorted = [...careerHistory].sort((a, b) => a.season - b.season)
  const y2 = (y: number) => String(y).slice(2)
  const slides: ReelSlide[] = []
  const used = new Set<number>()

  const img = (idx: number) => idx === 0 ? portraitUrl : undefined

  for (const s of sorted.filter(s => s.position === 1)) {
    if (slides.length >= 5) break
    used.add(s.season)
    slides.push({ slotLabel: `${initials} · ${y2(s.season)}`, label: 'WORLD CHAMPION', glowColor: TEAM_COLORS[s.constructorId] ?? teamColor, tags: `${s.season} · ${s.constructorName.toUpperCase()} · WDC`, title: s.constructorName.toUpperCase(), subtitle: `${s.wins}W · ${s.points}PTS · P1`, svgPath: REEL_PATHS[slides.length % REEL_PATHS.length], imageUrl: img(slides.length) })
  }
  for (const s of [...sorted].sort((a, b) => b.wins - a.wins)) {
    if (slides.length >= 5) break
    if (used.has(s.season) || s.wins === 0) continue
    used.add(s.season)
    slides.push({ slotLabel: `${initials} · ${y2(s.season)}`, label: `${s.wins} WIN${s.wins > 1 ? 'S' : ''}`, glowColor: TEAM_COLORS[s.constructorId] ?? teamColor, tags: `${s.season} · ${s.constructorName.toUpperCase()}`, title: s.constructorName.toUpperCase(), subtitle: `${s.wins}W · ${s.points}PTS · P${s.position}`, svgPath: REEL_PATHS[slides.length % REEL_PATHS.length], imageUrl: img(slides.length) })
  }
  for (const s of [...sorted].reverse()) {
    if (slides.length >= 5) break
    if (used.has(s.season)) continue
    used.add(s.season)
    slides.push({ slotLabel: `${initials} · ${y2(s.season)}`, label: `P${s.position} ${s.season}`, glowColor: TEAM_COLORS[s.constructorId] ?? teamColor, tags: `${s.season} · ${s.constructorName.toUpperCase()}`, title: s.constructorName.toUpperCase(), subtitle: `P${s.position} · ${s.points}PTS${s.wins > 0 ? ` · ${s.wins}W` : ''}`, svgPath: REEL_PATHS[slides.length % REEL_PATHS.length], imageUrl: img(slides.length) })
  }

  if (!slides.length) {
    slides.push({ slotLabel: `${initials}`, label: 'F1', glowColor: teamColor, tags: 'FORMULA 1', title: 'CAREER', subtitle: `${stats.races}R · ${stats.wins}W · ${stats.poles}P`, svgPath: REEL_PATHS[0], imageUrl: portraitUrl })
  }
  return slides.slice(0, 5)
}

function buildScoutingReportFromStats(
  firstName: string, lastName: string,
  stats: GenericDriverStats, careerHistory: DriverCareerSeason[],
  currentStanding: { constructorName: string } | null,
): ScoutingReport {
  const winPct  = stats.races > 0 ? ((stats.wins   / stats.races) * 100).toFixed(1) : '0'
  const polePct = stats.races > 0 ? ((stats.poles  / stats.races) * 100).toFixed(1) : '0'
  const podPct  = stats.races > 0 ? ((stats.podiums / stats.races) * 100).toFixed(1) : '0'
  const champYears = careerHistory.filter(s => s.position === 1).map(s => s.season).sort((a, b) => a - b)
  const sorted = [...careerHistory].sort((a, b) => a.season - b.season)
  const firstYear = sorted[0]?.season ?? ''
  const isActive = !!currentStanding
  const champLine = champYears.length > 0 ? ` World champion in ${champYears.join(', ')}.` : ''
  const statusLine = isActive ? ` Currently racing for ${currentStanding.constructorName}.` : ' Now retired from Formula 1.'

  const p1 = `${firstName} ${lastName} has competed in Formula 1 across ${stats.seasons} season${stats.seasons !== 1 ? 's' : ''}, accumulating ${stats.wins} win${stats.wins !== 1 ? 's' : ''}, ${stats.poles} pole position${stats.poles !== 1 ? 's' : ''} and ${stats.podiums} podium${stats.podiums !== 1 ? 's' : ''} from ${stats.races} starts since ${firstYear}.${champLine}${statusLine}`
  const p2 = `A win rate of ${winPct}% and podium conversion of ${podPct}% characterise ${lastName}'s approach — ${parseFloat(polePct) > 15 ? 'elite single-lap pace and strong qualifying ability' : 'consistent race-day execution'} ${parseFloat(winPct) > 15 ? 'combined with championship-level ruthlessness at the front' : 'across a sustained career at the top level'}.`

  return {
    paragraphs: [p1, p2],
    highlights: [lastName, champYears.length > 0 ? 'World champion' : ''].filter(Boolean),
    setupBars: [
      { leftLabel: 'MECHANICAL GRIP', rightLabel: 'AERO BALANCE',   position: 52, annotation: 'Balanced preference',       highlight: false },
      { leftLabel: 'LOW DOWNFORCE',   rightLabel: 'HIGH DOWNFORCE',  position: 58, annotation: 'Corner-speed oriented',     highlight: false },
      { leftLabel: 'EARLY THROTTLE', rightLabel: 'LATE THROTTLE',   position: 55, annotation: 'Mid-corner commitment',     highlight: false },
    ],
    excelledAt: [
      stats.wins > 30 ? 'Race management and tyre conservation' : 'Racecraft and wheel-to-wheel battles',
      parseFloat(polePct) > 20 ? 'Single-lap pace · Qualifying supremacy' : 'Race consistency and points accumulation',
      champYears.length > 0 ? 'Pressure management · Championship mentality' : 'Development driving and car feedback',
    ],
    struggledWith: [
      stats.seasons < 4 ? 'Career still developing — full picture emerging' : 'Requires telemetry access for deeper analysis',
    ],
  }
}

function buildDriverBundle(
  jolpicaId: string,
  info: JolpicaDriverInfo,
  stats: GenericDriverStats,
  currentStanding: { position: number; points: string; wins: string; season: string; constructorId: string; constructorName: string } | null,
  careerHistory: DriverCareerSeason[],
  teamColor: string,
  portraitUrl?: string,
): { driver: Driver; stats: DriverStats; eras: DriverEra[]; signature: DrivingSignature; reelSlides: ReelSlide[]; scoutingReport: ScoutingReport } {
  const firstName = info.givenName
  const lastName  = info.familyName
  const initials  = `${firstName[0]}${lastName[0]}`
  const isActive  = !!currentStanding
  const sorted    = [...careerHistory].sort((a, b) => a.season - b.season)
  const firstYear = sorted[0]?.season ?? 2000
  const lastYear  = sorted[sorted.length - 1]?.season ?? new Date().getFullYear()
  const careerSpan = isActive ? `${firstYear}–present` : `${firstYear}–${lastYear}`

  const teamWins: Record<string, number> = {}
  for (const s of careerHistory) teamWins[s.constructorId] = (teamWins[s.constructorId] ?? 0) + s.wins
  const peakTeamId = Object.entries(teamWins).sort(([, a], [, b]) => b - a)[0]?.[0] ?? (currentStanding?.constructorId ?? 'unknown')
  const entityColor = currentStanding?.constructorId ?? peakTeamId

  const driver: Driver = {
    id: jolpicaId, name: `${firstName} ${lastName}`, shortName: lastName, initials,
    nationality: info.nationality, dob: info.dateOfBirth ?? '1990-01-01',
    status: isActive ? 'active' : 'retired', series: ['f1'], peakEraTeamId: peakTeamId,
    entityColor,
    portraitUrl,
    bio: `${firstName} ${lastName} — Formula 1 driver.${stats.championships > 0 ? ` ${stats.championships}× World Champion.` : ''} ${stats.wins} wins, ${stats.poles} poles, ${stats.podiums} podiums.`,
  }
  const driverStats: DriverStats = {
    driverId: jolpicaId, series: 'f1', titles: stats.championships, wins: stats.wins,
    poles: stats.poles, podiums: stats.podiums, careerSpan, racesEntered: stats.races,
  }

  return {
    driver, stats: driverStats,
    eras:          buildErasFromHistory(jolpicaId, careerHistory),
    signature:     buildSignatureFromStats(jolpicaId, stats),
    reelSlides:    buildReelSlidesFromHistory(initials, stats, careerHistory, teamColor, portraitUrl),
    scoutingReport: buildScoutingReportFromStats(firstName, lastName, stats, careerHistory, currentStanding),
  }
}

/* ─── Route ───────────────────────────────────────────────────────────────── */

export default async function DriverRoute({
  params,
}: {
  params: Promise<{ series: string; slug: string }>
}) {
  const { series: seriesParam, slug } = await params

  const series = SERIES_MAP[seriesParam]
  if (!series) notFound()

  const lcSlug = slug.toLowerCase()

  // Use curated blueprints when available (including F1), then fall back to generic pages.
  const bundle = DRIVER_REGISTRY[series]?.[lcSlug]
  if (bundle) {
    return <DriverPage {...bundle} series={series} routeSlug={lcSlug} />
  }

  // Generic F1 driver pages
  if (series === 'f1') {
    const jolpicaId = DRIVER_SLUG_TO_JOLPICA[lcSlug] ?? lcSlug.replace(/-/g, '_')

    const [info, liveStats, currentStanding, careerHistory] = await Promise.all([
      fetchDriverInfo(jolpicaId),
      fetchDriverAllTimeStats(jolpicaId),
      fetchDriverCurrentStanding(jolpicaId),
      fetchDriverCareerHistory(jolpicaId),
    ])

    if (!info) notFound()

    const teamColor = currentStanding
      ? (TEAM_COLORS[currentStanding.constructorId] ?? '#888')
      : careerHistory.length
        ? (TEAM_COLORS[careerHistory.reduce((a, b) => (a.season > b.season ? a : b)).constructorId] ?? '#888')
        : '#888'

    const championsFromHistory = careerHistory.filter(s => s.position === 1).length
    const effectiveStats: GenericDriverStats = {
      ...(liveStats ?? { races: 0, wins: 0, poles: 0, podiums: 0, championships: 0, seasons: 0 }),
      championships: championsFromHistory,
    }
    const portraitUrl = DRIVER_IMAGE_MAP[jolpicaId] ?? DRIVER_IMAGE_MAP[lcSlug]
    const built = buildDriverBundle(jolpicaId, info, effectiveStats, currentStanding, careerHistory, teamColor, portraitUrl)

    return <DriverPage {...built} series={series} routeSlug={lcSlug} />
  }

  notFound()
}
