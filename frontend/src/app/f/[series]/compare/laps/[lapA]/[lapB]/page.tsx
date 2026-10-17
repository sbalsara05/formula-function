import { notFound } from 'next/navigation'
import ComparePageClient from '@/components/driver/ComparePageClient'
import { vettelWebberSuzuka2009 } from '@/data/mock/drivers'
import type { Series } from '@/lib/types'

const SERIES_MAP: Record<string, Series> = { '1': 'f1', '2': 'f2', '3': 'f3' }

const COMPARISON_REGISTRY: Partial<Record<Series, Record<string, typeof vettelWebberSuzuka2009>>> = {
  f1: {
    [vettelWebberSuzuka2009.id]: vettelWebberSuzuka2009,
  },
}

const COMPARISON_BACK_DRIVER_SLUGS: Record<string, string> = {
  [vettelWebberSuzuka2009.id]: 'vettel',
}

export default async function CompareRoute({
  params,
}: {
  params: Promise<{ series: string; lapA: string; lapB: string }>
}) {
  const { series: seriesParam, lapA, lapB } = await params
  const series = SERIES_MAP[seriesParam]
  if (!series) notFound()

  const key = `${lapA}-vs-${lapB}`
  const data = COMPARISON_REGISTRY[series]?.[key]
  if (!data) notFound()

  const backDriverSlug = COMPARISON_BACK_DRIVER_SLUGS[data.id]
  if (!backDriverSlug) notFound()

  const backHref = `/f/${seriesParam}/driver/${backDriverSlug}/laps/${lapA}`

  return <ComparePageClient data={data} seriesNum={seriesParam} backHref={backHref} />
}
