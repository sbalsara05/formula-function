import { notFound } from 'next/navigation'
import TeamPage, { type ConstructorStandingEntry, type StandingsMeta, type LiveTeamStats } from '@/components/team/TeamPage'
import PremaPage from '@/components/team/PremaPage'
import {
  ferrari, ferrariStats, ferrariEras, ferrariSignatureBars,
  ferrariReelSlides, ferrariAcademy, ferrariIconicCars,
  redbull, redbullStats, redbullEras, redbullSignatureBars,
  redbullReelSlides, redbullAcademy, redbullIconicCars, redbullKeyMoments,
  mclaren, mclarenStats, mclarenEras, mclarenSignatureBars,
  mclarenReelSlides, mclarenAcademy, mclarenIconicCars,
  mercedes, mercedesStats, mercedesEras, mercedesSignatureBars,
  mercedesReelSlides, mercedesAcademy, mercedesIconicCars,
  prema, premaStats, premaReelSlides, premaSignatureBars,
  premaGraduates, premaCurrentSeason,
  artF2, artF2Stats, artF2Eras, artF2SignatureBars,
  artF2ReelSlides, artF2Academy, artF2IconicCars,
  damsF2, damsF2Stats, damsF2Eras, damsF2SignatureBars,
  damsF2ReelSlides, damsF2Academy, damsF2IconicCars,
  trident, tridentStats, tridentEras, tridentSignatureBars,
  tridentReelSlides, tridentAcademy, tridentIconicCars,
  mpMotorsport, mpMotorsportStats, mpMotorsportEras, mpMotorsportSignatureBars,
  mpMotorsportReelSlides, mpMotorsportAcademy, mpMotorsportIconicCars,
  invicta, invictaStats, invictaEras, invictaSignatureBars,
  invictaReelSlides, invictaAcademy, invictaIconicCars,
  hitechGP, hitechGPStats, hitechGPEras, hitechGPSignatureBars,
  hitechGPReelSlides, hitechGPAcademy, hitechGPIconicCars,
  camposRacing, camposRacingStats, camposRacingEras, camposRacingSignatureBars,
  camposRacingReelSlides, camposRacingAcademy, camposRacingIconicCars,
  rodinMotorsport, rodinMotorsportStats, rodinMotorsportEras, rodinMotorsportSignatureBars,
  rodinMotorsportReelSlides, rodinMotorsportAcademy, rodinMotorsportIconicCars,
  vanAmersfoort, vanAmersfoortStats, vanAmersfoortEras, vanAmersfoortSignatureBars,
  vanAmersfoortReelSlides, vanAmersfoortAcademy, vanAmersfoortIconicCars,
  artF3, artF3Stats, artF3Eras, artF3SignatureBars, artF3ReelSlides, artF3Academy, artF3IconicCars,
  hitechF3, hitechF3Stats, hitechF3Eras, hitechF3SignatureBars, hitechF3ReelSlides, hitechF3Academy, hitechF3IconicCars,
  mpF3, mpF3Stats, mpF3Eras, mpF3SignatureBars, mpF3ReelSlides, mpF3Academy, mpF3IconicCars,
  camposF3, camposF3Stats, camposF3Eras, camposF3SignatureBars, camposF3ReelSlides, camposF3Academy, camposF3IconicCars,
  vafF3, vafF3Stats, vafF3Eras, vafF3SignatureBars, vafF3ReelSlides, vafF3Academy, vafF3IconicCars,
  rodinF3, rodinF3Stats, rodinF3Eras, rodinF3SignatureBars, rodinF3ReelSlides, rodinF3Academy, rodinF3IconicCars,
  haas, haasStats, haasEras, haasSignatureBars, haasReelSlides, haasAcademy, haasIconicCars,
  racingBulls, racingBullsStats, racingBullsEras, racingBullsSignatureBars,
  racingBullsReelSlides, racingBullsAcademy, racingBullsIconicCars,
  williams, williamsStats, williamsEras, williamsSignatureBars,
  williamsReelSlides, williamsAcademy, williamsIconicCars,
  alpine, alpineStats, alpineEras, alpineSignatureBars,
  alpineReelSlides, alpineAcademy, alpineIconicCars,
  astonMartin, astonMartinStats, astonMartinEras, astonMartinSignatureBars,
  astonMartinReelSlides, astonMartinAcademy, astonMartinIconicCars,
  sauber, sauberStats, sauberEras, sauberSignatureBars,
  sauberReelSlides, sauberAcademy, sauberIconicCars,
  cadillac, cadillacStats, cadillacEras, cadillacSignatureBars,
  cadillacReelSlides, cadillacAcademy, cadillacIconicCars,
} from '@/data/mock/teams'
import type {
  Series, Team, TeamStats, TeamEngineeringEra, TeamSignatureBar,
  TeamAcademyDriver, TeamIconicCar, TeamKeyMoment, ReelSlide, TeamLivery,
} from '@/lib/types'

const SERIES_MAP: Record<string, Series> = {
  '1': 'f1',
  '2': 'f2',
  '3': 'f3',
}

interface TeamBundle {
  team: Team
  stats: TeamStats
  eras: TeamEngineeringEra[]
  signatureBars: TeamSignatureBar[]
  reelSlides: ReelSlide[]
  academy: TeamAcademyDriver[]
  iconicCars: TeamIconicCar[]
  keyMoments?: TeamKeyMoment[]
  academyTitle?: string
  academySubtitle?: string
  academyDescription?: string
}

const RACING_BULLS_F1: TeamBundle = {
  team: racingBulls,
  stats: racingBullsStats,
  eras: racingBullsEras,
  signatureBars: racingBullsSignatureBars,
  reelSlides: racingBullsReelSlides,
  academy: racingBullsAcademy,
  iconicCars: racingBullsIconicCars,
  academyTitle: 'DRIVER ROSTER · RBJ',
  academySubtitle: 'FAENZA · RACING BULLS',
  academyDescription: 'Sister team to Red Bull Racing. The Faenza line produced Vettel’s 2008 Monza win, Gasly’s 2020 Monza win, and from 2026 runs a Red Bull Ford power unit. Liam Lawson and Arvid Lindblad in 2026.',
}

const SAUBER_F1: TeamBundle = {
  team: sauber,
  stats: sauberStats,
  eras: sauberEras,
  signatureBars: sauberSignatureBars,
  reelSlides: sauberReelSlides,
  academy: sauberAcademy,
  iconicCars: sauberIconicCars,
  academyTitle: 'DRIVER ROSTER · HINWIL',
  academySubtitle: 'KICK / AUDI · SWISS',
  academyDescription: 'Hinwil operates as Kick Sauber on the grid through 2025; the entry becomes the Audi Revolut F1 Team from 2026 (per Audi and Formula 1 announcements December 2025).',
}

const TEAM_REGISTRY: Partial<Record<Series, Record<string, TeamBundle>>> = {
  f1: {
    ferrari: {
      team: ferrari,
      stats: ferrariStats,
      eras: ferrariEras,
      signatureBars: ferrariSignatureBars,
      reelSlides: ferrariReelSlides,
      academy: ferrariAcademy,
      iconicCars: ferrariIconicCars,
      academyTitle: 'DRIVER ACADEMY · FDA',
      academySubtitle: 'PIPELINE · 2026',
      academyDescription: 'Ferrari Driver Academy founded 2009. Graduates include Leclerc, Bearman, and Mick Schumacher. Current pipeline: Beganovic (F2), Câmara (F3), Taponen (F3).',
    },
    'red-bull': {
      team: redbull,
      stats: redbullStats,
      eras: redbullEras,
      signatureBars: redbullSignatureBars,
      reelSlides: redbullReelSlides,
      academy: redbullAcademy,
      iconicCars: redbullIconicCars,
      keyMoments: redbullKeyMoments,
      academyTitle: 'DRIVER ACADEMY · RBJ',
      academySubtitle: 'PIPELINE · 2026',
      academyDescription: 'Red Bull Junior Team has produced four World Champions. Verstappen, Vettel, Ricciardo, and Gasly all passed through the programme. Hadjar and Lindblad are the latest graduates into F1.',
    },
    mclaren: {
      team: mclaren,
      stats: mclarenStats,
      eras: mclarenEras,
      signatureBars: mclarenSignatureBars,
      reelSlides: mclarenReelSlides,
      academy: mclarenAcademy,
      iconicCars: mclarenIconicCars,
      academyTitle: 'DRIVER ACADEMY · MCA',
      academySubtitle: 'PIPELINE · 2026',
      academyDescription: 'McLaren Automotive young driver programme backed Norris and Piastri through the junior ranks. Ugochukwu leads the current F2 pipeline.',
    },
    mercedes: {
      team: mercedes,
      stats: mercedesStats,
      eras: mercedesEras,
      signatureBars: mercedesSignatureBars,
      reelSlides: mercedesReelSlides,
      academy: mercedesAcademy,
      iconicCars: mercedesIconicCars,
      academyTitle: 'DRIVER ACADEMY · MAF',
      academySubtitle: 'PIPELINE · 2025',
      academyDescription: 'Mercedes-AMG F1 junior programme produced Kimi Antonelli (F1 2025) and continues to develop talent across F2 and the wider feeder series pyramid.',
    },
    haas: {
      team: haas,
      stats: haasStats,
      eras: haasEras,
      signatureBars: haasSignatureBars,
      reelSlides: haasReelSlides,
      academy: haasAcademy,
      iconicCars: haasIconicCars,
      academyTitle: 'DRIVER ROSTER',
      academySubtitle: 'CURRENT · ALUMNI',
      academyDescription: 'Haas has run Ferrari-powered machinery since their 2016 entry. Current drivers Oliver Bearman and Esteban Ocon represent a significant upgrade in raw pace. Key alumni: Grosjean, Magnussen, Hülkenberg, Mick Schumacher.',
    },
    rb: RACING_BULLS_F1,
    'racing-bulls': RACING_BULLS_F1,
    williams: {
      team: williams,
      stats: williamsStats,
      eras: williamsEras,
      signatureBars: williamsSignatureBars,
      reelSlides: williamsReelSlides,
      academy: williamsAcademy,
      iconicCars: williamsIconicCars,
      academyTitle: 'DRIVER ROSTER',
      academySubtitle: 'GROVE · UK',
      academyDescription: 'Carlos Sainz Jr. and Alex Albon in 2025. Williams is rebuilding on nine constructors’ titles of heritage and the Dorilton investment cycle.',
    },
    alpine: {
      team: alpine,
      stats: alpineStats,
      eras: alpineEras,
      signatureBars: alpineSignatureBars,
      reelSlides: alpineReelSlides,
      academy: alpineAcademy,
      iconicCars: alpineIconicCars,
      academyTitle: 'DRIVER ROSTER',
      academySubtitle: 'VIRY · ENSTONE',
      academyDescription: 'Pierre Gasly and Franco Colapinto in 2025. The Enstone team carries Renault’s 2000s titles in spirit while racing as Alpine, with an Audi power partnership from 2026.',
    },
    'aston-martin': {
      team: astonMartin,
      stats: astonMartinStats,
      eras: astonMartinEras,
      signatureBars: astonMartinSignatureBars,
      reelSlides: astonMartinReelSlides,
      academy: astonMartinAcademy,
      iconicCars: astonMartinIconicCars,
      academyTitle: 'DRIVER ROSTER',
      academySubtitle: 'SILVERSTONE · UK',
      academyDescription: 'Lance Stroll and Fernando Alonso through 2025, with the squad expanding around Adrian Newey from 2025 onward.',
    },
    sauber: SAUBER_F1,
    'kick-sauber': SAUBER_F1,
    cadillac: {
      team: cadillac,
      stats: cadillacStats,
      eras: cadillacEras,
      signatureBars: cadillacSignatureBars,
      reelSlides: cadillacReelSlides,
      academy: cadillacAcademy,
      iconicCars: cadillacIconicCars,
      academyTitle: 'DRIVER ROSTER',
      academySubtitle: '2026 · USA',
      academyDescription: 'Cadillac’s 2026 roster per formula1.com/en/teams/cadillac: Bottas and Perez with Zhou as reserve. Ferrari power unit to 2029. Iconic car cards use the livery-glow until we add a verified formula1.com/content/dam press image or Wikimedia direct URL.',
    },
  },
  f2: {
    art: {
      team: artF2,
      stats: artF2Stats,
      eras: artF2Eras,
      signatureBars: artF2SignatureBars,
      reelSlides: artF2ReelSlides,
      academy: artF2Academy,
      iconicCars: artF2IconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'GRADUATES · F1',
      academyDescription: 'ART Grand Prix has produced three F2 champions — Russell, de Vries, Pourchaire — and a conveyor belt of F1 drivers dating back to the GP2 era.',
    },
    dams: {
      team: damsF2,
      stats: damsF2Stats,
      eras: damsF2Eras,
      signatureBars: damsF2SignatureBars,
      reelSlides: damsF2ReelSlides,
      academy: damsF2Academy,
      iconicCars: damsF2IconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'GRADUATES · F1',
      academyDescription: 'DAMS has operated in F2 and GP2 since 2005, launching careers including Alex Albon, Jack Doohan, and numerous Red Bull and Williams-backed juniors.',
    },
    mp: {
      team: mpMotorsport,
      stats: mpMotorsportStats,
      eras: mpMotorsportEras,
      signatureBars: mpMotorsportSignatureBars,
      reelSlides: mpMotorsportReelSlides,
      academy: mpMotorsportAcademy,
      iconicCars: mpMotorsportIconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'GRADUATES · F1',
      academyDescription: 'MP Motorsport claimed their first FIA F2 drivers\' title in 2022 with Felipe Drugovich, a dominant campaign that earned him a reserve role at Aston Martin F1.',
    },
    invicta: {
      team: invicta,
      stats: invictaStats,
      eras: invictaEras,
      signatureBars: invictaSignatureBars,
      reelSlides: invictaReelSlides,
      academy: invictaAcademy,
      iconicCars: invictaIconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'CHAMPIONS · F2',
      academyDescription: 'Invicta Racing (formerly Virtuosi) won back-to-back FIA F2 drivers\' titles in 2024 with Gabriel Bortoleto and 2025, establishing themselves as the dominant F2 force of the era.',
    },
    hitech: {
      team: hitechGP,
      stats: hitechGPStats,
      eras: hitechGPEras,
      signatureBars: hitechGPSignatureBars,
      reelSlides: hitechGPReelSlides,
      academy: hitechGPAcademy,
      iconicCars: hitechGPIconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'PIPELINE · F2',
      academyDescription: 'Hitech TGR (formerly Hitech Grand Prix) is a Silverstone-based outfit competing across F2 and F3, with a Toyota Gazoo Racing partnership underpinning their junior driver programme.',
    },
    campos: {
      team: camposRacing,
      stats: camposRacingStats,
      eras: camposRacingEras,
      signatureBars: camposRacingSignatureBars,
      reelSlides: camposRacingReelSlides,
      academy: camposRacingAcademy,
      iconicCars: camposRacingIconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'HISTORY · SPAIN',
      academyDescription: 'Campos Racing is one of the longest-serving teams in the F2/GP2 paddock, with roots tracing to 1998 and a GP2 championship in 2008 via Timo Glock.',
    },
    rodin: {
      team: rodinMotorsport,
      stats: rodinMotorsportStats,
      eras: rodinMotorsportEras,
      signatureBars: rodinMotorsportSignatureBars,
      reelSlides: rodinMotorsportReelSlides,
      academy: rodinMotorsportAcademy,
      iconicCars: rodinMotorsportIconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'PIPELINE · F2',
      academyDescription: 'Rodin Motorsport (formerly Carlin) rebranded in January 2024 under New Zealand-based Rodin Cars backing, bringing a wealth of Carlin\'s F2 and F3 pedigree into a new identity.',
    },
    vaf: {
      team: vanAmersfoort,
      stats: vanAmersfoortStats,
      eras: vanAmersfoortEras,
      signatureBars: vanAmersfoortSignatureBars,
      reelSlides: vanAmersfoortReelSlides,
      academy: vanAmersfoortAcademy,
      iconicCars: vanAmersfoortIconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'ALUMNI · VERSTAPPEN',
      academyDescription: 'Van Amersfoort Racing was founded in 1975 and entered F2 and F3 in 2022. Their alumni include Max Verstappen and Charles Leclerc from their Formula 4 and Formula 3 years.',
    },
  },
  f3: {
    trident: {
      team: trident,
      stats: tridentStats,
      eras: tridentEras,
      signatureBars: tridentSignatureBars,
      reelSlides: tridentReelSlides,
      academy: tridentAcademy,
      iconicCars: tridentIconicCars,
      academyTitle: 'CHAMPION ALUMNI',
      academySubtitle: 'F3 CHAMPIONS',
      academyDescription: 'Trident produced three consecutive FIA F3 champions: Gabriel Bortoleto (2023), Leonardo Fornaroli (2024), and Rafael Câmara (2025) — the most dominant run in the series\' history.',
    },
    art: {
      team: artF3,
      stats: artF3Stats,
      eras: artF3Eras,
      signatureBars: artF3SignatureBars,
      reelSlides: artF3ReelSlides,
      academy: artF3Academy,
      iconicCars: artF3IconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'GP3 · F3 CHAMPIONS',
      academyDescription: 'ART Grand Prix dominated GP3 with titles including Gasly (2016) and Hubert (2018), then claimed the FIA F3 drivers\' title with Victor Martins in 2022.',
    },
    hitech: {
      team: hitechF3,
      stats: hitechF3Stats,
      eras: hitechF3Eras,
      signatureBars: hitechF3SignatureBars,
      reelSlides: hitechF3ReelSlides,
      academy: hitechF3Academy,
      iconicCars: hitechF3IconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'F3 PIPELINE',
      academyDescription: 'Hitech TGR\'s F3 programme developed Crawford, Armstrong, and Iwasa — all Red Bull or Toyota juniors who progressed to F2 and F1 testing roles.',
    },
    mp: {
      team: mpF3,
      stats: mpF3Stats,
      eras: mpF3Eras,
      signatureBars: mpF3SignatureBars,
      reelSlides: mpF3ReelSlides,
      academy: mpF3Academy,
      iconicCars: mpF3IconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'F3 PIPELINE',
      academyDescription: 'MP Motorsport\'s F3 programme feeds into their F2 operation, with Smolyar and Collet among the drivers developed through the orange Dutch machinery.',
    },
    campos: {
      team: camposF3,
      stats: camposF3Stats,
      eras: camposF3Eras,
      signatureBars: camposF3SignatureBars,
      reelSlides: camposF3ReelSlides,
      academy: camposF3Academy,
      iconicCars: camposF3IconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'F3 TEAMS CHAMPS',
      academyDescription: 'Campos Racing claimed the 2025 FIA F3 Teams Championship — their first F3 title — with Lindblad, Tsolov, and Martí delivering a season-long points effort.',
    },
    vaf: {
      team: vafF3,
      stats: vafF3Stats,
      eras: vafF3Eras,
      signatureBars: vafF3SignatureBars,
      reelSlides: vafF3ReelSlides,
      academy: vafF3Academy,
      iconicCars: vafF3IconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'VERSTAPPEN · LECLERC · COLAPINTO',
      academyDescription: 'Van Amersfoort Racing\'s FIA F3 programme continues their fifty-year legacy — Franco Colapinto (F1 2024) is their most recent graduate from the orange Dutch machinery.',
    },
    rodin: {
      team: rodinF3,
      stats: rodinF3Stats,
      eras: rodinF3Eras,
      signatureBars: rodinF3SignatureBars,
      reelSlides: rodinF3ReelSlides,
      academy: rodinF3Academy,
      iconicCars: rodinF3IconicCars,
      academyTitle: 'DRIVER ALUMNI',
      academySubtitle: 'CARLIN → RODIN · F3',
      academyDescription: 'Rodin (formerly Carlin) brings 28 years of F3 engineering to the grid. Sargeant, O\'Sullivan, and Sharp are the headline names from their F3 programme.',
    },
  },
}

/* ─── Slug → Jolpica constructor ID ──────────────────────────────────────── */

const SLUG_TO_JOLPICA: Record<string, string> = {
  // Current 2026 grid
  ferrari: 'ferrari', mclaren: 'mclaren', mercedes: 'mercedes',
  'red-bull': 'red_bull', williams: 'williams', 'aston-martin': 'aston_martin',
  alpine: 'alpine', haas: 'haas', sauber: 'sauber', rb: 'rb',
  'kick-sauber': 'sauber', 'racing-bulls': 'rb', cadillac: 'cadillac',
  // 2000s–2020s
  alphatauri: 'alphatauri', 'alpha-tauri': 'alphatauri',
  'bmw-sauber': 'bmw_sauber', bmwsauber: 'bmw_sauber',
  'super-aguri': 'super_aguri', 'super-aguri-f1': 'super_aguri',
  hrt: 'hrt', caterham: 'caterham', marussia: 'marussia',
  manor: 'manor', virgin: 'virgin', 'virgin-racing': 'virgin',
  'lotus-f1': 'lotus_f1', 'lotus-racing': 'lotus_racing',
  spyker: 'spyker',
  // 1990s
  jordan: 'jordan', stewart: 'stewart', prost: 'prost',
  'force-india': 'force_india', 'racing-point': 'racing_point',
  'alfa-romeo': 'alfa_romeo', 'toro-rosso': 'toro_rosso', minardi: 'minardi',
  bar: 'bar', jaguar: 'jaguar', honda: 'honda', toyota: 'toyota',
  arrows: 'arrows', footwork: 'footwork',
  dallara: 'dallara', pacific: 'pacific', simtek: 'simtek',
  forti: 'forti', coloni: 'coloni', rial: 'rial', onyx: 'onyx',
  eurobrun: 'eurobrun', moda: 'moda', 'andrea-moda': 'moda',
  // 1980s
  benetton: 'benetton', renault: 'renault', brawn: 'brawn',
  toleman: 'toleman', zakspeed: 'zakspeed', ags: 'ags', osella: 'osella',
  life: 'life', ram: 'ram', spirit: 'spirit',
  larrousse: 'larrousse', 'leyton-house': 'leyton', leyton: 'leyton',
  // 1970s
  ligier: 'ligier', wolf: 'wolf', fittipaldi: 'fittipaldi',
  hesketh: 'hesketh', shadow: 'shadow', surtees: 'surtees',
  ensign: 'ensign', penske: 'penske', lola: 'lola',
  'iso-marlboro': 'iso_marlboro', merzario: 'merzario', theodore: 'theodore',
  // 1960s
  march: 'march', brabham: 'brabham', tyrrell: 'tyrrell',
  eagle: 'eagle-weslake', matra: 'matra',
  // Historical champions
  lotus: 'team_lotus', 'team-lotus': 'team_lotus',
  cooper: 'cooper', brm: 'brm', vanwall: 'vanwall',
  lancia: 'lancia', maserati: 'maserati',
  gordini: 'gordini',
}

/* ─── Static meta: display name, short name, color, nationality ───────────── */

// wcc/wdc = historical titles (hardcoded — Jolpica multi-season standings endpoint is broken)
// founded = first F1 season as a constructor
const TEAM_META: Record<string, { name: string; short: string; color: string; nat: string; wcc: number; wdc: number; founded: number }> = {
  // ── Current 2026 grid ─────────────────────────────────────────────────────
  ferrari:       { name: 'Scuderia Ferrari',          short: 'Ferrari',       color: '#DC0000', nat: 'Italian',   wcc: 16, wdc: 15, founded: 1950 },
  mclaren:       { name: 'McLaren',                   short: 'McLaren',       color: '#FF8000', nat: 'British',   wcc: 10, wdc: 13, founded: 1966 },
  mercedes:      { name: 'Mercedes-AMG Petronas',     short: 'Mercedes',      color: '#00D2BE', nat: 'German',    wcc:  8, wdc:  7, founded: 2010 },
  red_bull:      { name: 'Red Bull Racing',           short: 'Red Bull',      color: '#1E3A8A', nat: 'Austrian',  wcc:  6, wdc:  8, founded: 2005 },
  williams:      { name: 'Williams Racing',           short: 'Williams',      color: '#005AFF', nat: 'British',   wcc:  9, wdc:  7, founded: 1975 },
  aston_martin:  { name: 'Aston Martin',              short: 'Aston Martin',  color: '#006F62', nat: 'British',   wcc:  0, wdc:  0, founded: 2021 },
  alpine:        { name: 'Alpine F1 Team',            short: 'Alpine',        color: '#0090FF', nat: 'French',    wcc:  0, wdc:  0, founded: 2021 },
  haas:          { name: 'Haas F1 Team',              short: 'Haas',          color: '#B6BABD', nat: 'American',  wcc:  0, wdc:  0, founded: 2016 },
  sauber:        { name: 'Kick Sauber · becoming Audi Revolut F1 Team (entry 2026)', short: 'Kick Sauber', color: '#52E252', nat: 'Swiss',     wcc:  0, wdc:  0, founded: 1993 },
  rb:            { name: 'Racing Bulls',              short: 'Racing Bulls',  color: '#6692FF', nat: 'Italian',   wcc:  0, wdc:  0, founded: 2006 },
  cadillac:      { name: 'Cadillac F1 Team',          short: 'Cadillac',      color: '#C8A96E', nat: 'American',  wcc:  0, wdc:  0, founded: 2026 },
  // ── 2000s–2020s ────────────────────────────────────────────────────────────
  alphatauri:    { name: 'Scuderia AlphaTauri',       short: 'AlphaTauri',    color: '#2B4998', nat: 'Italian',   wcc:  0, wdc:  0, founded: 2020 },
  bmw_sauber:    { name: 'BMW Sauber F1',             short: 'BMW Sauber',    color: '#1E90FF', nat: 'German',    wcc:  0, wdc:  0, founded: 2006 },
  super_aguri:   { name: 'Super Aguri F1',            short: 'Super Aguri',   color: '#CC0000', nat: 'Japanese',  wcc:  0, wdc:  0, founded: 2006 },
  hrt:           { name: 'HRT F1 Team',               short: 'HRT',           color: '#666666', nat: 'Spanish',   wcc:  0, wdc:  0, founded: 2010 },
  caterham:      { name: 'Caterham F1 Team',          short: 'Caterham',      color: '#004225', nat: 'British',   wcc:  0, wdc:  0, founded: 2012 },
  marussia:      { name: 'Marussia F1 Team',          short: 'Marussia',      color: '#CC0000', nat: 'British',   wcc:  0, wdc:  0, founded: 2012 },
  manor:         { name: 'Manor Marussia F1',         short: 'Manor',         color: '#CC0000', nat: 'British',   wcc:  0, wdc:  0, founded: 2015 },
  virgin:        { name: 'Virgin Racing',             short: 'Virgin',        color: '#CC0000', nat: 'British',   wcc:  0, wdc:  0, founded: 2010 },
  lotus_f1:      { name: 'Lotus F1 Team',             short: 'Lotus F1',      color: '#FFD700', nat: 'British',   wcc:  0, wdc:  0, founded: 2012 },
  lotus_racing:  { name: 'Lotus Racing',              short: 'Lotus Racing',  color: '#FFD700', nat: 'British',   wcc:  0, wdc:  0, founded: 2010 },
  spyker:        { name: 'Spyker F1',                 short: 'Spyker',        color: '#FF6600', nat: 'Dutch',     wcc:  0, wdc:  0, founded: 2007 },
  force_india:   { name: 'Force India',               short: 'Force India',   color: '#FF80C7', nat: 'Indian',    wcc:  0, wdc:  0, founded: 2008 },
  racing_point:  { name: 'Racing Point',              short: 'Racing Point',  color: '#FF80C7', nat: 'British',   wcc:  0, wdc:  0, founded: 2019 },
  alfa_romeo:    { name: 'Alfa Romeo Racing',         short: 'Alfa Romeo',    color: '#900000', nat: 'Swiss',     wcc:  0, wdc:  0, founded: 2019 },
  toro_rosso:    { name: 'Scuderia Toro Rosso',       short: 'Toro Rosso',    color: '#C00000', nat: 'Italian',   wcc:  0, wdc:  0, founded: 2006 },
  // ── 1990s ─────────────────────────────────────────────────────────────────
  jordan:        { name: 'Jordan Grand Prix',         short: 'Jordan',        color: '#FFD700', nat: 'Irish',     wcc:  0, wdc:  0, founded: 1991 },
  stewart:       { name: 'Stewart Grand Prix',        short: 'Stewart',       color: '#DDDDDD', nat: 'British',   wcc:  0, wdc:  0, founded: 1997 },
  prost:         { name: 'Prost Grand Prix',          short: 'Prost',         color: '#003399', nat: 'French',    wcc:  0, wdc:  0, founded: 1997 },
  bar:           { name: 'BAR',                       short: 'BAR',           color: '#800080', nat: 'British',   wcc:  0, wdc:  0, founded: 1999 },
  jaguar:        { name: 'Jaguar Racing',             short: 'Jaguar',        color: '#006600', nat: 'British',   wcc:  0, wdc:  0, founded: 2000 },
  honda:         { name: 'Honda Racing F1',           short: 'Honda',         color: '#999999', nat: 'Japanese',  wcc:  0, wdc:  0, founded: 2006 },
  toyota:        { name: 'Toyota F1',                 short: 'Toyota',        color: '#CC0000', nat: 'Japanese',  wcc:  0, wdc:  0, founded: 2002 },
  minardi:       { name: 'Minardi',                   short: 'Minardi',       color: '#222222', nat: 'Italian',   wcc:  0, wdc:  0, founded: 1985 },
  arrows:        { name: 'Arrows',                    short: 'Arrows',        color: '#FF6600', nat: 'British',   wcc:  0, wdc:  0, founded: 1978 },
  footwork:      { name: 'Footwork Arrows',           short: 'Footwork',      color: '#FF6600', nat: 'British',   wcc:  0, wdc:  0, founded: 1991 },
  dallara:       { name: 'Scuderia Italia',           short: 'Dallara',       color: '#003366', nat: 'Italian',   wcc:  0, wdc:  0, founded: 1988 },
  pacific:       { name: 'Pacific Grand Prix',        short: 'Pacific',       color: '#004488', nat: 'British',   wcc:  0, wdc:  0, founded: 1994 },
  simtek:        { name: 'Simtek Grand Prix',         short: 'Simtek',        color: '#444444', nat: 'British',   wcc:  0, wdc:  0, founded: 1994 },
  forti:         { name: 'Forti Corse',               short: 'Forti',         color: '#FFCC00', nat: 'Italian',   wcc:  0, wdc:  0, founded: 1995 },
  coloni:        { name: 'Coloni',                    short: 'Coloni',        color: '#CC0000', nat: 'Italian',   wcc:  0, wdc:  0, founded: 1987 },
  rial:          { name: 'Rial Racing',               short: 'Rial',          color: '#444444', nat: 'German',    wcc:  0, wdc:  0, founded: 1988 },
  onyx:          { name: 'Onyx Grand Prix',           short: 'Onyx',          color: '#336699', nat: 'British',   wcc:  0, wdc:  0, founded: 1989 },
  eurobrun:      { name: 'EuroBrun Racing',           short: 'EuroBrun',      color: '#CC0000', nat: 'Italian',   wcc:  0, wdc:  0, founded: 1988 },
  moda:          { name: 'Andrea Moda Formula',       short: 'Moda',          color: '#222222', nat: 'Italian',   wcc:  0, wdc:  0, founded: 1992 },
  // ── 1980s ─────────────────────────────────────────────────────────────────
  benetton:      { name: 'Benetton Formula',          short: 'Benetton',      color: '#009944', nat: 'British',   wcc:  1, wdc:  2, founded: 1986 },
  renault:       { name: 'Renault F1 Team',           short: 'Renault',       color: '#FFD700', nat: 'French',    wcc:  2, wdc:  2, founded: 2002 },
  brawn:         { name: 'Brawn GP',                  short: 'Brawn',         color: '#BFFF00', nat: 'British',   wcc:  1, wdc:  1, founded: 2009 },
  toleman:       { name: 'Toleman Motorsport',        short: 'Toleman',       color: '#CC0000', nat: 'British',   wcc:  0, wdc:  0, founded: 1981 },
  zakspeed:      { name: 'Zakspeed',                  short: 'Zakspeed',      color: '#CC0000', nat: 'German',    wcc:  0, wdc:  0, founded: 1985 },
  ags:           { name: 'AGS',                       short: 'AGS',           color: '#555555', nat: 'French',    wcc:  0, wdc:  0, founded: 1986 },
  osella:        { name: 'Osella Squadra Corse',      short: 'Osella',        color: '#0033AA', nat: 'Italian',   wcc:  0, wdc:  0, founded: 1980 },
  life:          { name: 'Life Racing Engines',       short: 'Life',          color: '#333333', nat: 'Italian',   wcc:  0, wdc:  0, founded: 1990 },
  ram:           { name: 'RAM Racing',                short: 'RAM',           color: '#CC0000', nat: 'British',   wcc:  0, wdc:  0, founded: 1983 },
  spirit:        { name: 'Spirit Racing',             short: 'Spirit',        color: '#CC0000', nat: 'British',   wcc:  0, wdc:  0, founded: 1983 },
  leyton:        { name: 'Leyton House Racing',       short: 'Leyton House',  color: '#00AACC', nat: 'British',   wcc:  0, wdc:  0, founded: 1987 },
  larrousse:     { name: 'Larrousse F1',              short: 'Larrousse',     color: '#FFCC00', nat: 'French',    wcc:  0, wdc:  0, founded: 1987 },
  // ── 1970s ─────────────────────────────────────────────────────────────────
  ligier:        { name: 'Ligier',                    short: 'Ligier',        color: '#003399', nat: 'French',    wcc:  0, wdc:  0, founded: 1976 },
  wolf:          { name: 'Wolf Racing',               short: 'Wolf',          color: '#8B0000', nat: 'Canadian',  wcc:  0, wdc:  1, founded: 1977 },
  fittipaldi:    { name: 'Fittipaldi Automotive',     short: 'Fittipaldi',    color: '#006600', nat: 'Brazilian', wcc:  0, wdc:  0, founded: 1975 },
  hesketh:       { name: 'Hesketh Racing',            short: 'Hesketh',       color: '#DDDDDD', nat: 'British',   wcc:  0, wdc:  0, founded: 1974 },
  shadow:        { name: 'Shadow Racing Cars',        short: 'Shadow',        color: '#222222', nat: 'British',   wcc:  0, wdc:  0, founded: 1973 },
  surtees:       { name: 'Team Surtees',              short: 'Surtees',       color: '#CC6600', nat: 'British',   wcc:  0, wdc:  0, founded: 1970 },
  ensign:        { name: 'Ensign Racing',             short: 'Ensign',        color: '#0033AA', nat: 'British',   wcc:  0, wdc:  0, founded: 1973 },
  penske:        { name: 'Penske Racing',             short: 'Penske',        color: '#003399', nat: 'American',  wcc:  0, wdc:  0, founded: 1974 },
  lola:          { name: 'Lola Cars',                 short: 'Lola',          color: '#555555', nat: 'British',   wcc:  0, wdc:  0, founded: 1962 },
  iso_marlboro:  { name: 'Iso Marlboro',              short: 'Iso Marlboro',  color: '#CC0000', nat: 'British',   wcc:  0, wdc:  0, founded: 1973 },
  merzario:      { name: 'Merzario',                  short: 'Merzario',      color: '#CC0000', nat: 'Italian',   wcc:  0, wdc:  0, founded: 1978 },
  theodore:      { name: 'Theodore Racing',           short: 'Theodore',      color: '#CC0000', nat: 'British',   wcc:  0, wdc:  0, founded: 1978 },
  march:         { name: 'March Engineering',         short: 'March',         color: '#CC0000', nat: 'British',   wcc:  0, wdc:  0, founded: 1970 },
  // ── Historical champions ──────────────────────────────────────────────────
  team_lotus:    { name: 'Team Lotus',                short: 'Lotus',         color: '#FFD700', nat: 'British',   wcc:  7, wdc:  6, founded: 1958 },
  tyrrell:       { name: 'Tyrrell Racing',            short: 'Tyrrell',       color: '#1565C0', nat: 'British',   wcc:  1, wdc:  1, founded: 1970 },
  brabham:       { name: 'Brabham',                   short: 'Brabham',       color: '#4A90D9', nat: 'British',   wcc:  2, wdc:  2, founded: 1962 },
  matra:         { name: 'Matra',                     short: 'Matra',         color: '#1565C0', nat: 'French',    wcc:  1, wdc:  1, founded: 1966 },
  cooper:        { name: 'Cooper',                    short: 'Cooper',        color: '#2E7D32', nat: 'British',   wcc:  2, wdc:  2, founded: 1950 },
  brm:           { name: 'BRM',                       short: 'BRM',           color: '#1B5E20', nat: 'British',   wcc:  1, wdc:  1, founded: 1951 },
  vanwall:       { name: 'Vanwall',                   short: 'Vanwall',       color: '#006400', nat: 'British',   wcc:  1, wdc:  0, founded: 1954 },
  lancia:        { name: 'Lancia',                    short: 'Lancia',        color: '#003399', nat: 'Italian',   wcc:  0, wdc:  0, founded: 1954 },
  maserati:      { name: 'Maserati',                  short: 'Maserati',      color: '#1A3A5C', nat: 'Italian',   wcc:  0, wdc:  0, founded: 1950 },
  gordini:       { name: 'Gordini',                   short: 'Gordini',       color: '#003399', nat: 'French',    wcc:  0, wdc:  0, founded: 1950 },
  'eagle-weslake': { name: 'Eagle',                   short: 'Eagle',         color: '#003366', nat: 'American',  wcc:  0, wdc:  0, founded: 1966 },
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

interface FullTeamStats {
  races: number
  wins: number
  podiums: number
  poles: number
  driverTitles: number
  wccTitles: number
  seasons: number
}

interface RaceStats {
  races: number
  wins: number
  podiums: number
  poles: number
}

interface TeamSeasonResult {
  season: number
  position: number
  points: number
  wins: number
}

interface GenericTeamDriver {
  driverId: string
  givenName: string
  familyName: string
  nationality: string
  permanentNumber?: string
}

async function fetchRaceStats(jolpicaId: string): Promise<RaceStats> {
  const base = `https://api.jolpi.ca/ergast/f1/constructors/${jolpicaId}`
  const [races, wins, p2, p3, poles] = await Promise.all([
    jolpicaTotal(`${base}/results.json?limit=1`),
    jolpicaTotal(`${base}/results/1.json?limit=1`),
    jolpicaTotal(`${base}/results/2.json?limit=1`),
    jolpicaTotal(`${base}/results/3.json?limit=1`),
    jolpicaTotal(`${base}/qualifying/1.json?limit=1`),
  ])
  return { races, wins, podiums: wins + p2 + p3, poles }
}

async function fetchCurrentStandings(): Promise<{
  standings: ConstructorStandingEntry[]
  meta: StandingsMeta
}> {
  try {
    const res = await fetch(
      'https://api.jolpi.ca/ergast/f1/current/constructorstandings.json',
      { next: { revalidate: 300 } },
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]
    if (!list) throw new Error('No standings')
    return { standings: list.ConstructorStandings ?? [], meta: { season: list.season, round: list.round } }
  } catch {
    return { standings: [], meta: { season: '', round: '' } }
  }
}

async function fetchCurrentDrivers(jolpicaId: string): Promise<GenericTeamDriver[]> {
  try {
    const res = await fetch(
      `https://api.jolpi.ca/ergast/f1/current/constructors/${jolpicaId}/drivers.json`,
      { next: { revalidate: 300 } },
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data?.MRData?.DriverTable?.Drivers ?? []).map((d: Record<string, string>) => ({
      driverId: d.driverId, givenName: d.givenName, familyName: d.familyName,
      nationality: d.nationality, permanentNumber: d.permanentNumber,
    }))
  } catch { return [] }
}

interface SeasonHistoryResult {
  history: TeamSeasonResult[]
  totalSeasons: number
  firstSeason: number
}

async function fetchTeamSeasonHistory(jolpicaId: string): Promise<SeasonHistoryResult> {
  try {
    // Jolpica broke the multi-season endpoint — fetch seasons list then per-year standings
    const seasonsRes = await fetch(
      `https://api.jolpi.ca/ergast/f1/constructors/${jolpicaId}/seasons.json?limit=100`,
      { next: { revalidate: 86400 } },
    )
    if (!seasonsRes.ok) return { history: [], totalSeasons: 0, firstSeason: 0 }
    const seasonsData = await seasonsRes.json()
    const allYears: string[] = (seasonsData?.MRData?.SeasonTable?.Seasons ?? [])
      .map((s: { season: string }) => s.season)
    if (!allYears.length) return { history: [], totalSeasons: 0, firstSeason: 0 }

    const totalSeasons = parseInt(seasonsData?.MRData?.total ?? '0') || allYears.length
    const firstSeason = parseInt(allYears[0])

    // Fetch last 35 seasons for carousel/eras display — full stats come from TEAM_META
    const years = allYears.slice(-35)
    const BATCH = 7
    const history: TeamSeasonResult[] = []

    for (let i = 0; i < years.length; i += BATCH) {
      const batch = years.slice(i, i + BATCH)
      const settled = await Promise.allSettled(
        batch.map(async (year) => {
          const res = await fetch(
            `https://api.jolpi.ca/ergast/f1/${year}/constructors/${jolpicaId}/constructorstandings.json`,
            { next: { revalidate: 86400 } },
          )
          if (!res.ok) return null
          const data = await res.json()
          const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]
          if (!list) return null
          const s = list.ConstructorStandings?.[0]
          if (!s) return null
          return {
            season: parseInt(year),
            position: parseInt(s.position ?? '0'),
            points: parseFloat(s.points ?? '0'),
            wins: parseInt(s.wins ?? '0'),
          }
        }),
      )
      for (const r of settled) {
        if (r.status === 'fulfilled' && r.value) history.push(r.value)
      }
    }

    return {
      history: history.filter(r => r.season > 0 && r.position > 0).sort((a, b) => a.season - b.season),
      totalSeasons,
      firstSeason,
    }
  } catch { return { history: [], totalSeasons: 0, firstSeason: 0 } }
}

/* ─── Data builders ───────────────────────────────────────────────────────── */

const REEL_PATHS = [
  'M 20 150 C 80 80, 130 220, 200 140 S 310 60, 380 100',
  'M 20 180 C 60 90, 140 230, 220 130 S 330 80, 380 150',
  'M 20 200 C 100 60, 160 240, 240 120 S 340 100, 380 80',
  'M 30 160 C 90 70, 150 200, 210 140 T 380 120',
  'M 20 130 C 70 200, 150 80, 230 170 S 320 110, 380 140',
]

function buildReelSlides(
  history: TeamSeasonResult[],
  shortName: string,
  color: string,
): ReelSlide[] {
  const sorted = [...history].sort((a, b) => b.season - a.season)
  const abbr = shortName.slice(0, 3).toUpperCase()
  const champSeasons = [...history].filter(s => s.position === 1)
    .sort((a, b) => b.wins - a.wins).slice(0, 3)
  const recent = sorted.filter(s => !champSeasons.some(c => c.season === s.season)).slice(0, 3)

  const slides: ReelSlide[] = []

  champSeasons.forEach((s, i) => slides.push({
    slotLabel: `${abbr} · ${s.season}`,
    badge: 'WCC',
    glowColor: color,
    kicker: `${s.season} WORLD CONSTRUCTORS' CHAMPION`,
    headline: `${s.wins} WINS`,
    meta: `${s.points} PTS · P1 FINAL STANDINGS`,
    svgPath: REEL_PATHS[i % REEL_PATHS.length],
  }))

  recent.forEach((s, i) => slides.push({
    slotLabel: `${abbr} · ${s.season}`,
    badge: s.season.toString(),
    glowColor: color,
    kicker: `${s.season} SEASON · P${s.position} FINAL`,
    headline: `${s.wins > 0 ? `${s.wins} WINS` : 'SEASON RECAP'}`,
    meta: `${s.points} PTS`,
    svgPath: REEL_PATHS[(champSeasons.length + i) % REEL_PATHS.length],
  }))

  if (!slides.length) slides.push({
    slotLabel: abbr,
    badge: 'F1',
    glowColor: color,
    kicker: 'FORMULA 1',
    headline: shortName.toUpperCase(),
    meta: 'CHAMPIONSHIP ARCHIVE',
    svgPath: REEL_PATHS[0],
  })

  return slides.slice(0, 5)
}

function buildEras(history: TeamSeasonResult[], jolpicaId: string): TeamEngineeringEra[] {
  if (!history.length) return []
  const sorted = [...history].sort((a, b) => a.season - b.season)
  const total = sorted.length
  const count = Math.min(4, Math.max(1, Math.ceil(total / 12)))
  const lastSeason = sorted[sorted.length - 1].season
  const isActive = lastSeason >= 2024

  if (count === 1) {
    const champs = sorted.filter(s => s.position === 1).length
    return [{
      teamId: jolpicaId,
      label: `${sorted[0].season}s Era`,
      seasons: `${sorted[0].season}–${isActive ? 'PRESENT' : lastSeason}`,
      description: 'Full team history',
      championships: champs,
      champLabel: champs > 0 ? `${champs}× WCC` : 'NO TITLES',
      current: isActive,
    }]
  }

  const chunkSize = Math.floor(total / count)
  return Array.from({ length: count }, (_, i) => {
    const isLast = i === count - 1
    const chunk = sorted.slice(i * chunkSize, isLast ? total : (i + 1) * chunkSize)
    const champs = chunk.filter(s => s.position === 1).length
    const first = chunk[0].season
    const last = chunk[chunk.length - 1].season
    return {
      teamId: jolpicaId,
      label: `${first}s Era`,
      seasons: `${first}–${isLast && isActive ? 'PRESENT' : last}`,
      description: `${chunk.length} seasons`,
      championships: champs,
      champLabel: champs > 0 ? `${champs}× WCC` : 'NO TITLES',
      golden: champs >= 3,
      current: isLast && isActive,
    }
  })
}

function buildSignatureBars(stats: FullTeamStats): TeamSignatureBar[] {
  const safe = (n: number) => (!isFinite(n) || isNaN(n) ? 0 : n)
  const races = Math.max(stats.races, 1)
  const winPct    = safe((stats.wins    / races) * 100)
  const podPct    = safe((stats.podiums / races) * 100)
  const polePct   = safe((stats.poles   / races) * 100)
  const champRate = safe((stats.wccTitles / Math.max(stats.seasons, 1)) * 100)

  const rate = (pct: number, th: number[]): TeamSignatureBar['rating'] => {
    if (pct >= th[0]) return 'EXCEPTIONAL'
    if (pct >= th[1]) return 'STRONG'
    if (pct >= th[2]) return 'HIGH'
    if (pct >= th[3]) return 'MODERATE'
    return 'LOW'
  }

  return [
    { label: 'Race Win Rate',        rating: rate(winPct,    [25, 15,  8, 3]),  value: Math.min(winPct  * 3.5, 100), caption: `${stats.wins} wins from ${races} entries`,            sentiment: 'strength' },
    { label: 'Podium Conversion',    rating: rate(podPct,    [50, 35, 20, 10]), value: Math.min(podPct  * 1.5, 100), caption: `${stats.podiums} podium finishes recorded`,           sentiment: 'strength' },
    { label: 'Pole Position Rate',   rating: rate(polePct,   [20, 12,  6,  2]), value: Math.min(polePct * 4,   100), caption: `${stats.poles} poles from the front row`,            sentiment: 'neutral'  },
    { label: 'Championship Success', rating: rate(champRate, [30, 15,  8,  2]), value: Math.min(champRate * 5, 100), caption: `${stats.wccTitles} WCC in ${stats.seasons} seasons`, sentiment: 'strength' },
  ]
}

function buildAcademy(drivers: GenericTeamDriver[]): TeamAcademyDriver[] {
  return drivers.map(d => ({
    name: `${d.givenName} ${d.familyName}`,
    tier: 'f1' as const,
    note: d.permanentNumber ? `#${d.permanentNumber}` : d.nationality,
  }))
}

/* ─── Season car photo map (Wikimedia Commons) ───────────────────────────── */
// Keys: `${constructorId}:${year}` → imageUrl

const W = 'https://en.wikipedia.org/wiki/Special:FilePath/'

const TEAM_CAR_PHOTO_MAP: Record<string, string> = {
  // Ferrari championship cars
  'ferrari:2000': W + 'Ferrari_F2002_Michael_Schumacher_2002_British_GP.jpg',
  'ferrari:2002': W + 'Ferrari_F2002_Michael_Schumacher_2002_British_GP.jpg',
  'ferrari:2004': W + 'Ferrari_F2004_Michael_Schumacher_2004_Bahrain_GP.jpg',
  'ferrari:2007': W + 'Kimi_R%C3%A4ikk%C3%B6nen_2007_Australia_(3).jpg',
  // Red Bull championship cars
  'red_bull:2010': W + 'Sebastian_Vettel_2010_Bahrain_Grand_Prix.jpg',
  'red_bull:2011': W + 'Red_Bull_RB7_Vettel_2011_Silverstone.jpg',
  'red_bull:2023': W + 'Max_Verstappen_(52620570717)_(cropped).jpg',
  // McLaren championship cars
  'mclaren:1988': W + 'Ayrton_Senna_1991_Canadian_GP.jpg',
  'mclaren:1998': W + 'Mika_H%C3%A4kkinen_1998_Canadian_GP.jpg',
  'mclaren:2024': W + '2024_Chinese_GP_-_Oscar_Piastri_(cropped).jpg',
  // Mercedes championship cars
  'mercedes:2014': W + 'Lewis_Hamilton_2014_Malaysia_(cropped).jpg',
  'mercedes:2019': W + 'Lewis_Hamilton_2019_German_GP_(cropped).jpg',
  'mercedes:2020': W + 'Lewis_Hamilton_2020_Bahrain_GP.jpg',
  // Williams championship cars
  'williams:1992': W + 'Nigel_Mansell_1992_Britain_(cropped).jpg',
  'williams:1996': W + 'Damon_Hill_1996_Canadian_GP.jpg',
  // Haas seasons
  'haas:2016': W + 'Romain_Grosjean_2016_Australian_Grand_Prix.jpg',
  'haas:2018': W + 'Kevin_Magnussen_2018_Bahrain_Grand_Prix.jpg',
  'haas:2024': W + 'Kevin_Magnussen_2024_Bahrain_Grand_Prix.jpg',
}

function buildIconicCars(constructorId: string, history: TeamSeasonResult[]): TeamIconicCar[] {
  const champs = [...history].filter(s => s.position === 1).sort((a, b) => b.wins - a.wins).slice(0, 3)
  const recent = [...history].sort((a, b) => b.season - a.season)
    .filter(s => !champs.some(c => c.season === s.season)).slice(0, 3)

  const seen = new Set<number>()
  return [
    ...champs.map(s => ({
      name: `${s.season}`,
      year: s.season,
      subtitle: `${s.wins} victories`,
      meta: `WORLD CONSTRUCTORS' CHAMPION`,
      peak: champs[0]?.season === s.season,
      imageUrl: TEAM_CAR_PHOTO_MAP[`${constructorId}:${s.season}`],
    })),
    ...recent.map(s => ({
      name: `${s.season}`,
      year: s.season,
      subtitle: `P${s.position} · ${s.wins} wins`,
      meta: `${s.points} POINTS`,
      peak: false,
      imageUrl: TEAM_CAR_PHOTO_MAP[`${constructorId}:${s.season}`],
    })),
  ].filter(n => {
    if (seen.has(n.year)) return false
    seen.add(n.year)
    return true
  }).slice(0, 6)
}

/* ─── Route ───────────────────────────────────────────────────────────────── */

export default async function TeamRoute({
  params,
}: {
  params: Promise<{ series: string; slug: string }>
}) {
  const { series: seriesParam, slug } = await params
  const series = SERIES_MAP[seriesParam]
  if (!series) notFound()

  const lcSlug = slug.toLowerCase()

  // Prema (F2/F3)
  if (lcSlug === 'prema' && (series === 'f2' || series === 'f3')) {
    return (
      <PremaPage
        team={prema} stats={premaStats} reelSlides={premaReelSlides}
        signatureBars={premaSignatureBars} graduates={premaGraduates}
        currentSeason={premaCurrentSeason} series={series}
      />
    )
  }

  // Blueprint pages (Ferrari)
  const bundle = TEAM_REGISTRY[series]?.[lcSlug]
  if (bundle) {
    const jolpicaId = SLUG_TO_JOLPICA[lcSlug] ?? lcSlug
    const [raceStats, { standings, meta }] = await Promise.all([
      series === 'f1' ? fetchRaceStats(jolpicaId) : Promise.resolve({ races: 0, wins: 0, podiums: 0, poles: 0 }),
      series === 'f1' ? fetchCurrentStandings() : Promise.resolve({ standings: [], meta: { season: '', round: '' } }),
    ])
    // Blueprint pages have accurate mock data for WCC/seasons — only update race-derived counts
    const simpleLive: LiveTeamStats | undefined = raceStats.races > 0
      ? {
          wins: raceStats.wins || bundle.stats.wins,
          podiums: raceStats.podiums || bundle.stats.podiums,
          wccTitles: bundle.stats.constructorsTitles,
          seasons: bundle.stats.seasons,
        }
      : undefined
    return (
      <TeamPage
        {...bundle} series={series}
        keyMoments={bundle.keyMoments ?? []}
        liveStats={simpleLive}
        currentStandings={standings} standingsMeta={meta} jolpicaId={jolpicaId}
        academyTitle={bundle.academyTitle}
        academySubtitle={bundle.academySubtitle}
        academyDescription={bundle.academyDescription}
      />
    )
  }

  // Generic F1 team — build full TeamPage data from Jolpica
  const jolpicaId = SLUG_TO_JOLPICA[lcSlug]
  if (series === 'f1' && jolpicaId) {
    const meta = TEAM_META[jolpicaId]
    if (!meta) notFound()

    const [raceStats, { standings, standingsMeta }, currentDrivers, { history: seasonHistory, totalSeasons, firstSeason: apiFirstSeason }] = await Promise.all([
      fetchRaceStats(jolpicaId),
      fetchCurrentStandings().then(r => ({ standings: r.standings, standingsMeta: r.meta })),
      fetchCurrentDrivers(jolpicaId),
      fetchTeamSeasonHistory(jolpicaId),
    ])

    // Use hardcoded TEAM_META for titles/founded — Jolpica multi-season standings endpoint is broken
    const wccTitles = meta.wcc
    const seasons   = totalSeasons || seasonHistory.length
    const firstSeason = meta.founded || apiFirstSeason || 1950

    const fullStats: FullTeamStats = {
      races:        raceStats.races,
      wins:         raceStats.wins,
      podiums:      raceStats.podiums,
      poles:        raceStats.poles,
      driverTitles: meta.wdc,
      wccTitles,
      seasons,
    }

    const lastSeason = seasonHistory.length
      ? Math.max(...seasonHistory.map(s => s.season))
      : firstSeason
    const isActive = lastSeason >= 2024
    const currentYear = standingsMeta.season || new Date().getFullYear().toString()

    const team: Team = {
      id: jolpicaId,
      name: meta.name,
      shortName: meta.short,
      country: meta.nat,
      series: ['f1'],
      founded: firstSeason,
      current: isActive,
      entityColor: 'ferrari' as TeamLivery,
      liveryHex: meta.color,
      bio: wccTitles > 0
        ? `${meta.name} has won ${wccTitles} World Constructors' Championship${wccTitles > 1 ? 's' : ''} and ${raceStats.wins} races across ${seasons} Formula 1 seasons since ${firstSeason}.`
        : `${meta.name} has competed in ${seasons} Formula 1 seasons since ${firstSeason}, accumulating ${raceStats.wins} race wins and ${fullStats.podiums} podium finishes.`,
    }

    const teamStats: TeamStats = {
      teamId: jolpicaId,
      constructorsTitles: wccTitles,
      driversTitles: meta.wdc,
      wins: raceStats.wins,
      podiums: fullStats.podiums,
      seasons,
      firstSeason,
    }

    const simpleLive: LiveTeamStats = {
      wins: raceStats.wins,
      podiums: fullStats.podiums,
      wccTitles,
      seasons,
    }

    const reelSlides   = buildReelSlides(seasonHistory, meta.short, meta.color)
    const eras         = buildEras(seasonHistory, jolpicaId)
    const sigBars      = buildSignatureBars(fullStats)
    const academy      = buildAcademy(currentDrivers)
    const iconicCars   = buildIconicCars(jolpicaId, seasonHistory)

    const sigDescription = wccTitles > 0
      ? `${meta.name} has claimed ${wccTitles} Constructors' title${wccTitles > 1 ? 's' : ''} with a ${((raceStats.wins / Math.max(raceStats.races, 1)) * 100).toFixed(1)}% win rate and ${((raceStats.poles / Math.max(raceStats.races, 1)) * 100).toFixed(1)}% pole rate across ${seasons} seasons.`
      : `${meta.name} has entered ${raceStats.races} races across ${seasons} seasons, taking ${raceStats.wins} wins, ${fullStats.podiums} podiums, and ${raceStats.poles} pole positions.`

    const academyTitle = isActive
      ? `CURRENT LINEUP · ${currentYear}`
      : `DRIVER HISTORY · ${firstSeason}–${lastSeason}`
    const academySubtitle = `${meta.nat.toUpperCase()} · ${meta.short.toUpperCase()}`
    const academyDescription = isActive
      ? `${currentDrivers.length} driver${currentDrivers.length !== 1 ? 's' : ''} representing ${meta.name} in the ${currentYear} Formula 1 season.`
      : `${meta.name} competed in Formula 1 from ${firstSeason} to ${lastSeason}, fielding drivers across ${seasons} seasons.`

    return (
      <TeamPage
        team={team} stats={teamStats} eras={eras} signatureBars={sigBars}
        reelSlides={reelSlides} academy={academy} iconicCars={iconicCars}
        series={series}
        liveStats={simpleLive}
        currentStandings={standings} standingsMeta={standingsMeta} jolpicaId={jolpicaId}
        signatureDescription={sigDescription}
        academyTitle={academyTitle}
        academySubtitle={academySubtitle}
        academyDescription={academyDescription}
      />
    )
  }

  notFound()
}
