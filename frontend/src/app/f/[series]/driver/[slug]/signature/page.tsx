import { notFound } from 'next/navigation'
import SignatureMetricsPage from '@/components/driver/SignatureMetricsPage'
import { ENTITY_COLOR_HEX } from '@/components/driver/DriverPage'
import { getSignatureMetrics, getSignatureReference } from '@/data/signature-details'

// Full driving-signature metrics. Only F1 has measured signatures (official timing data).
export default async function SignatureMetricsRoute({
  params,
  searchParams,
}: {
  params: Promise<{ series: string; slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { series, slug } = await params
  if (series !== '1') notFound()

  const lcSlug = slug.toLowerCase()
  const metrics = getSignatureMetrics(lcSlug)
  if (!metrics) notFound()

  const { era } = await searchParams
  const eraId = typeof era === 'string' && metrics.eras[era] ? era : metrics.defaultEra
  const reference = getSignatureReference()
  const eraTabs = reference.eras
    .filter((e) => metrics.eras[e.id])
    .map((e) => ({ id: e.id, label: e.label, seasons: metrics.eras[e.id].era.seasons }))

  return (
    <SignatureMetricsPage
      slug={lcSlug}
      name={metrics.name}
      seriesNum={series}
      entityHex={ENTITY_COLOR_HEX[lcSlug] ?? '#FF1E56'}
      eraId={eraId}
      detail={metrics.eras[eraId]}
      eraTabs={eraTabs}
      reference={reference}
    />
  )
}
