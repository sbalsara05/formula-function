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
      venue: spa,
      stats: spaStats,
      fingerprint: spaFingerprint,
      driverFit: spaDriverFit,
      hotspots: spaHotspots,
      overlays: spaMomentOverlays,
      iconicMoments: spaIconicMoments,
      weather: spaWeather,
    },
    monaco: {
      venue: monaco,
      stats: monacoStats,
      fingerprint: monacoFingerprint,
      driverFit: monacoDriverFit,
      hotspots: monacoHotspots,
      overlays: monacoMomentOverlays,
      iconicMoments: monacoIconicMoments,
      weather: monacoWeather,
    },
    monza: {
      venue: monza,
      stats: monzaStats,
      fingerprint: monzaFingerprint,
      driverFit: monzaDriverFit,
      hotspots: monzaHotspots,
      overlays: monzaMomentOverlays,
      iconicMoments: monzaIconicMoments,
      weather: monzaWeather,
    },
    silverstone: {
      venue: silverstone,
      stats: silverstoneStats,
      fingerprint: silverstoneFingerprint,
      driverFit: silverstoneDriverFit,
      hotspots: silverstoneHotspots,
      overlays: silverstoneMomentOverlays,
      iconicMoments: silverstoneIconicMoments,
      weather: silverstoneWeather,
    },
    suzuka: {
      venue: suzuka,
      stats: suzukaStats,
      fingerprint: suzukaFingerprint,
      driverFit: suzukaDriverFit,
      hotspots: suzukaHotspots,
      overlays: suzukaMomentOverlays,
      iconicMoments: suzukaIconicMoments,
      weather: suzukaWeather,
    },
    interlagos: {
      venue: interlagos,
      stats: interlagosStats,
      fingerprint: interlagosFingerprint,
      driverFit: interlagosDriverFit,
      hotspots: interlagosHotspots,
      overlays: interlagosMomentOverlays,
      iconicMoments: interlagosIconicMoments,
      weather: interlagosWeather,
    },
    bahrain: {
      venue: bahrain,
      stats: bahrainStats,
      fingerprint: bahrainFingerprint,
      driverFit: bahrainDriverFit,
      hotspots: bahrainHotspots,
      overlays: bahrainMomentOverlays,
      iconicMoments: bahrainIconicMoments,
      weather: bahrainWeather,
    },
    'abu-dhabi': {
      venue: abudhabi,
      stats: abadhabiStats,
      fingerprint: abuDhabiFingerprint,
      driverFit: abuDhabiDriverFit,
      hotspots: abuDhabiHotspots,
      overlays: abuDhabiMomentOverlays,
      iconicMoments: abuDhabiIconicMoments,
      weather: abuDhabiWeather,
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
