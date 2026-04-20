import { notFound } from 'next/navigation'
import VenuePage from '@/components/venue/VenuePage'
import {
  spa, spaStats, spaFingerprint, spaDriverFit,
  spaHotspots, spaMomentOverlays, spaIconicMoments, spaWeather,
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
