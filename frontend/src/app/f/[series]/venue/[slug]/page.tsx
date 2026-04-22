import { notFound } from 'next/navigation'
import VenuePage from '@/components/venue/VenuePage'
import {
  spa, spaStats, spaFingerprint, spaDriverFit,
  spaHotspots, spaMomentOverlays, spaIconicMoments, spaWeather,
  monaco, monacoStats, monacoFingerprint, monacoDriverFit,
  monacoHotspots, monacoMomentOverlays, monacoIconicMoments, monacoWeather,
  monza, monzaStats, monzaFingerprint, monzaDriverFit,
  monzaHotspots, monzaMomentOverlays, monzaIconicMoments, monzaWeather,
  silverstone, silverstoneStats, silverstoneFingerprint, silverstoneDriverFit,
  silverstoneHotspots, silverstoneMomentOverlays, silverstoneIconicMoments, silverstoneWeather,
  suzuka, suzukaStats, suzukaFingerprint, suzukaDriverFit,
  suzukaHotspots, suzukaMomentOverlays, suzukaIconicMoments, suzukaWeather,
  interlagos, interlagosStats, interlagosFingerprint, interlagosDriverFit,
  interlagosHotspots, interlagosMomentOverlays, interlagosIconicMoments, interlagosWeather,
  bahrain, bahrainStats, bahrainFingerprint, bahrainDriverFit,
  bahrainHotspots, bahrainMomentOverlays, bahrainIconicMoments, bahrainWeather,
  abudhabi, abadhabiStats, abuDhabiFingerprint, abuDhabiDriverFit,
  abuDhabiHotspots, abuDhabiMomentOverlays, abuDhabiIconicMoments, abuDhabiWeather,
  // New venues
  jeddah, jeddahStats, jeddahFingerprint, jeddahDriverFit,
  jeddahHotspots, jeddahMomentOverlays, jeddahIconicMoments, jeddahWeather,
  melbourne, melbourneStats, melbourneFingerprint, melbourneDriverFit,
  melbourneHotspots, melbourneMomentOverlays, melbourneIconicMoments, melbourneWeather,
  shanghai, shanghaiStats, shanghaiFingerprint, shanghaiDriverFit,
  shanghaiHotspots, shanghaiMomentOverlays, shanghaiIconicMoments, shanghaiWeather,
  miami, miamiStats, miamiFingerprint, miamiDriverFit,
  miamiHotspots, miamiMomentOverlays, miamiIconicMoments, miamiWeather,
  imola, imolaStats, imolaFingerprint, imolaDriverFit,
  imolaHotspots, imolaMomentOverlays, imolaIconicMoments, imolaWeather,
  montreal, montrealStats, montrealFingerprint, montrealDriverFit,
  montrealHotspots, montrealMomentOverlays, montrealIconicMoments, montrealWeather,
  barcelona, barcelonaStats, barcelonaFingerprint, barcelonaDriverFit,
  barcelonaHotspots, barcelonaMomentOverlays, barcelonaIconicMoments, barcelonaWeather,
  hungaroring, hungaroringStats, hungaroringFingerprint, hungaroringDriverFit,
  hungaroringHotspots, hungaroringMomentOverlays, hungaroringIconicMoments, hungaroringWeather,
  zandvoort, zandvoortStats, zandvoortFingerprint, zandvoortDriverFit,
  zandvoortHotspots, zandvoortMomentOverlays, zandvoortIconicMoments, zandvoortWeather,
  baku, bakuStats, bakuFingerprint, bakuDriverFit,
  bakuHotspots, bakuMomentOverlays, bakuIconicMoments, bakuWeather,
  singapore, singaporeStats, singaporeFingerprint, singaporeDriverFit,
  singaporeHotspots, singaporeMomentOverlays, singaporeIconicMoments, singaporeWeather,
  cota, cotaStats, cotaFingerprint, cotaDriverFit,
  cotaHotspots, cotaMomentOverlays, cotaIconicMoments, cotaWeather,
  mexico, mexicoStats, mexicoFingerprint, mexicoDriverFit,
  mexicoHotspots, mexicoMomentOverlays, mexicoIconicMoments, mexicoWeather,
  lasVegas, lasVegasStats, lasVegasFingerprint, lasVegasDriverFit,
  lasVegasHotspots, lasVegasMomentOverlays, lasVegasIconicMoments, lasVegasWeather,
  qatar, qatarStats, qatarFingerprint, qatarDriverFit,
  qatarHotspots, qatarMomentOverlays, qatarIconicMoments, qatarWeather,
} from '@/data/mock/venues'
import type {
  Series, Venue, VenueStats, VenueFingerprint, DriverTrackFit,
  Hotspot, MomentOverlay, VenueIconicMoment, VenueWeather,
} from '@/lib/types'

const SERIES_MAP: Record<string, Series> = {
  '1': 'f1',
  '2': 'f2',
  '3': 'f3',
}

interface VenueBundle {
  venue: Venue
  stats: VenueStats
  fingerprint: VenueFingerprint
  driverFit: DriverTrackFit[]
  hotspots: Hotspot[]
  overlays: MomentOverlay[]
  iconicMoments: VenueIconicMoment[]
  weather: VenueWeather
}

// Registry: series → slug → bundle
const VENUE_REGISTRY: Partial<Record<Series, Record<string, VenueBundle>>> = {
  f1: {
    spa: {
      venue: spa, stats: spaStats, fingerprint: spaFingerprint, driverFit: spaDriverFit,
      hotspots: spaHotspots, overlays: spaMomentOverlays, iconicMoments: spaIconicMoments, weather: spaWeather,
    },
    monaco: {
      venue: monaco, stats: monacoStats, fingerprint: monacoFingerprint, driverFit: monacoDriverFit,
      hotspots: monacoHotspots, overlays: monacoMomentOverlays, iconicMoments: monacoIconicMoments, weather: monacoWeather,
    },
    monza: {
      venue: monza, stats: monzaStats, fingerprint: monzaFingerprint, driverFit: monzaDriverFit,
      hotspots: monzaHotspots, overlays: monzaMomentOverlays, iconicMoments: monzaIconicMoments, weather: monzaWeather,
    },
    silverstone: {
      venue: silverstone, stats: silverstoneStats, fingerprint: silverstoneFingerprint, driverFit: silverstoneDriverFit,
      hotspots: silverstoneHotspots, overlays: silverstoneMomentOverlays, iconicMoments: silverstoneIconicMoments, weather: silverstoneWeather,
    },
    suzuka: {
      venue: suzuka, stats: suzukaStats, fingerprint: suzukaFingerprint, driverFit: suzukaDriverFit,
      hotspots: suzukaHotspots, overlays: suzukaMomentOverlays, iconicMoments: suzukaIconicMoments, weather: suzukaWeather,
    },
    interlagos: {
      venue: interlagos, stats: interlagosStats, fingerprint: interlagosFingerprint, driverFit: interlagosDriverFit,
      hotspots: interlagosHotspots, overlays: interlagosMomentOverlays, iconicMoments: interlagosIconicMoments, weather: interlagosWeather,
    },
    bahrain: {
      venue: bahrain, stats: bahrainStats, fingerprint: bahrainFingerprint, driverFit: bahrainDriverFit,
      hotspots: bahrainHotspots, overlays: bahrainMomentOverlays, iconicMoments: bahrainIconicMoments, weather: bahrainWeather,
    },
    'abu-dhabi': {
      venue: abudhabi, stats: abadhabiStats, fingerprint: abuDhabiFingerprint, driverFit: abuDhabiDriverFit,
      hotspots: abuDhabiHotspots, overlays: abuDhabiMomentOverlays, iconicMoments: abuDhabiIconicMoments, weather: abuDhabiWeather,
    },
    jeddah: {
      venue: jeddah, stats: jeddahStats, fingerprint: jeddahFingerprint, driverFit: jeddahDriverFit,
      hotspots: jeddahHotspots, overlays: jeddahMomentOverlays, iconicMoments: jeddahIconicMoments, weather: jeddahWeather,
    },
    melbourne: {
      venue: melbourne, stats: melbourneStats, fingerprint: melbourneFingerprint, driverFit: melbourneDriverFit,
      hotspots: melbourneHotspots, overlays: melbourneMomentOverlays, iconicMoments: melbourneIconicMoments, weather: melbourneWeather,
    },
    shanghai: {
      venue: shanghai, stats: shanghaiStats, fingerprint: shanghaiFingerprint, driverFit: shanghaiDriverFit,
      hotspots: shanghaiHotspots, overlays: shanghaiMomentOverlays, iconicMoments: shanghaiIconicMoments, weather: shanghaiWeather,
    },
    miami: {
      venue: miami, stats: miamiStats, fingerprint: miamiFingerprint, driverFit: miamiDriverFit,
      hotspots: miamiHotspots, overlays: miamiMomentOverlays, iconicMoments: miamiIconicMoments, weather: miamiWeather,
    },
    imola: {
      venue: imola, stats: imolaStats, fingerprint: imolaFingerprint, driverFit: imolaDriverFit,
      hotspots: imolaHotspots, overlays: imolaMomentOverlays, iconicMoments: imolaIconicMoments, weather: imolaWeather,
    },
    montreal: {
      venue: montreal, stats: montrealStats, fingerprint: montrealFingerprint, driverFit: montrealDriverFit,
      hotspots: montrealHotspots, overlays: montrealMomentOverlays, iconicMoments: montrealIconicMoments, weather: montrealWeather,
    },
    barcelona: {
      venue: barcelona, stats: barcelonaStats, fingerprint: barcelonaFingerprint, driverFit: barcelonaDriverFit,
      hotspots: barcelonaHotspots, overlays: barcelonaMomentOverlays, iconicMoments: barcelonaIconicMoments, weather: barcelonaWeather,
    },
    hungaroring: {
      venue: hungaroring, stats: hungaroringStats, fingerprint: hungaroringFingerprint, driverFit: hungaroringDriverFit,
      hotspots: hungaroringHotspots, overlays: hungaroringMomentOverlays, iconicMoments: hungaroringIconicMoments, weather: hungaroringWeather,
    },
    zandvoort: {
      venue: zandvoort, stats: zandvoortStats, fingerprint: zandvoortFingerprint, driverFit: zandvoortDriverFit,
      hotspots: zandvoortHotspots, overlays: zandvoortMomentOverlays, iconicMoments: zandvoortIconicMoments, weather: zandvoortWeather,
    },
    baku: {
      venue: baku, stats: bakuStats, fingerprint: bakuFingerprint, driverFit: bakuDriverFit,
      hotspots: bakuHotspots, overlays: bakuMomentOverlays, iconicMoments: bakuIconicMoments, weather: bakuWeather,
    },
    singapore: {
      venue: singapore, stats: singaporeStats, fingerprint: singaporeFingerprint, driverFit: singaporeDriverFit,
      hotspots: singaporeHotspots, overlays: singaporeMomentOverlays, iconicMoments: singaporeIconicMoments, weather: singaporeWeather,
    },
    cota: {
      venue: cota, stats: cotaStats, fingerprint: cotaFingerprint, driverFit: cotaDriverFit,
      hotspots: cotaHotspots, overlays: cotaMomentOverlays, iconicMoments: cotaIconicMoments, weather: cotaWeather,
    },
    'austin': {
      venue: cota, stats: cotaStats, fingerprint: cotaFingerprint, driverFit: cotaDriverFit,
      hotspots: cotaHotspots, overlays: cotaMomentOverlays, iconicMoments: cotaIconicMoments, weather: cotaWeather,
    },
    mexico: {
      venue: mexico, stats: mexicoStats, fingerprint: mexicoFingerprint, driverFit: mexicoDriverFit,
      hotspots: mexicoHotspots, overlays: mexicoMomentOverlays, iconicMoments: mexicoIconicMoments, weather: mexicoWeather,
    },
    'mexico-city': {
      venue: mexico, stats: mexicoStats, fingerprint: mexicoFingerprint, driverFit: mexicoDriverFit,
      hotspots: mexicoHotspots, overlays: mexicoMomentOverlays, iconicMoments: mexicoIconicMoments, weather: mexicoWeather,
    },
    'las-vegas': {
      venue: lasVegas, stats: lasVegasStats, fingerprint: lasVegasFingerprint, driverFit: lasVegasDriverFit,
      hotspots: lasVegasHotspots, overlays: lasVegasMomentOverlays, iconicMoments: lasVegasIconicMoments, weather: lasVegasWeather,
    },
    qatar: {
      venue: qatar, stats: qatarStats, fingerprint: qatarFingerprint, driverFit: qatarDriverFit,
      hotspots: qatarHotspots, overlays: qatarMomentOverlays, iconicMoments: qatarIconicMoments, weather: qatarWeather,
    },
    lusail: {
      venue: qatar, stats: qatarStats, fingerprint: qatarFingerprint, driverFit: qatarDriverFit,
      hotspots: qatarHotspots, overlays: qatarMomentOverlays, iconicMoments: qatarIconicMoments, weather: qatarWeather,
    },
  },
}

export default async function VenueRoute({
  params,
}: {
  params: Promise<{ series: string; slug: string }>
}) {
  const { series: seriesParam, slug } = await params

  const series = SERIES_MAP[seriesParam]
  if (!series) notFound()

  const bundle = VENUE_REGISTRY[series]?.[slug.toLowerCase()]
  if (!bundle) notFound()

  return <VenuePage {...bundle} series={series} />
}
