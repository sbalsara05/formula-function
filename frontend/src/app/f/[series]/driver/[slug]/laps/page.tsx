import { notFound } from 'next/navigation'
import LapPickerPage from '@/components/driver/LapPickerPage'
import {
  vettel,
  vettelFeaturedLaps,
  vettelLapRecords,
} from '@/data/mock/drivers'
import type { Series } from '@/lib/types'

const SERIES_MAP: Record<string, Series> = {
  '1': 'f1',
  '2': 'f2',
  '3': 'f3',
}

const ENTITY_COLOR_HEX: Record<string, string> = {
  vettel: '#1E3A8A',
  leclerc: '#DC0000',
  ferrari: '#DC0000',
  redbull: '#1E3A8A',
  prema: '#E8001C',
}

interface LapBundle {
  driverName: string
  driverShortName: string
  driverId: string
  entityHex: string
  totalLaps: number
  featuredLaps: typeof vettelFeaturedLaps
  lapRecords: typeof vettelLapRecords
}

const LAP_REGISTRY: Partial<Record<Series, Record<string, LapBundle>>> = {
  f1: {
    vettel: {
      driverName: vettel.name,
      driverShortName: vettel.shortName,
      driverId: vettel.id,
      entityHex: ENTITY_COLOR_HEX[vettel.entityColor] ?? '#888',
      totalLaps: 847,
      featuredLaps: vettelFeaturedLaps,
      lapRecords: vettelLapRecords,
    },
  },
}

export default async function LapsRoute({
  params,
}: {
  params: Promise<{ series: string; slug: string }>
}) {
  const { series: seriesParam, slug } = await params

  const series = SERIES_MAP[seriesParam]
  if (!series) notFound()

  const bundle = LAP_REGISTRY[series]?.[slug.toLowerCase()]
  if (!bundle) notFound()

  return (
    <LapPickerPage
      {...bundle}
      series={series}
      seriesNum={seriesParam}
    />
  )
}
