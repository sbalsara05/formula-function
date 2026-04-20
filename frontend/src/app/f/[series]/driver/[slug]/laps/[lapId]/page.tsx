import { notFound } from 'next/navigation'
import LapAnalysisPage from '@/components/driver/LapAnalysisPage'
import { vettelSuzuka2009Analysis, vettel } from '@/data/mock/drivers'
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

const ANALYSIS_REGISTRY: Partial<Record<Series, Record<string, Record<string, typeof vettelSuzuka2009Analysis>>>> = {
  f1: {
    vettel: {
      'vtl-suzuka-2009-q3': vettelSuzuka2009Analysis,
    },
  },
}

const DRIVER_REGISTRY: Record<string, { name: string; shortName: string; entityColor: string }> = {
  vettel: {
    name: vettel.name,
    shortName: vettel.shortName,
    entityColor: vettel.entityColor,
  },
}

export default async function LapAnalysisRoute({
  params,
}: {
  params: Promise<{ series: string; slug: string; lapId: string }>
}) {
  const { series: seriesParam, slug, lapId } = await params

  const series = SERIES_MAP[seriesParam]
  if (!series) notFound()

  const analysis = ANALYSIS_REGISTRY[series]?.[slug.toLowerCase()]?.[lapId]
  if (!analysis) notFound()

  const driverInfo = DRIVER_REGISTRY[slug.toLowerCase()]
  if (!driverInfo) notFound()

  const entityHex = ENTITY_COLOR_HEX[slug.toLowerCase()] ?? ENTITY_COLOR_HEX[driverInfo.entityColor] ?? '#888'

  return (
    <LapAnalysisPage
      analysis={analysis}
      driverName={driverInfo.name}
      driverShortName={driverInfo.shortName}
      driverId={slug.toLowerCase()}
      series={series}
      seriesNum={seriesParam}
      entityHex={entityHex}
    />
  )
}
