import { notFound } from 'next/navigation'
import { SeriesHeader } from '@/components/series/SeriesHeader'
import { SERIES_CONFIG, isSeriesNum } from '@/data/series-config'

export default async function SeriesSectionsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ series: string }>
}) {
  const { series } = await params
  if (!isSeriesNum(series)) notFound()
  const config = SERIES_CONFIG[series]

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      <SeriesHeader series={series} />
      {children}
      <footer style={{
        padding: '1rem 1.75rem',
        borderTop: '0.5px solid #1a1a1a',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#333',
      }}>
        <span>f(x) · {config.name.toUpperCase()}</span>
        <span>PHASE 3 · DYNAMIC</span>
      </footer>
    </div>
  )
}
