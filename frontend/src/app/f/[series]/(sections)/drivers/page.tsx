import { notFound } from 'next/navigation'
import { EntityCard } from '@/components/series/EntityCard'
import { PageIntro } from '@/components/series/SectionHeading'
import { CURRENT_F1_DRIVERS, type GridEntity } from '@/data/f1-current-grid'
import { SERIES_CONFIG, isSeriesNum } from '@/data/series-config'
import { applyDriverNumbers, fetchF1DriverNumberData } from '@/lib/f1-driver-numbers'

export default async function DriversPage({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params
  if (!isSeriesNum(series)) notFound()
  const config = SERIES_CONFIG[series]
  const drivers: GridEntity[] = series === '1'
    ? applyDriverNumbers(CURRENT_F1_DRIVERS, await fetchF1DriverNumberData())
    : config.drivers

  return (
    <>
      <PageIntro
        kicker={config.name.toUpperCase()}
        title="Drivers"
        meta={series === '1' ? `CURRENT GRID · 2026 · ${drivers.length} DRIVERS` : `${drivers.length} DRIVERS`}
        color={config.color}
      />
      <section style={{ padding: '2rem 1.75rem 4rem', borderTop: '0.5px solid #1a1a1a' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {drivers.map(item => (
            <EntityCard
              key={item.slug}
              href={`/f/${series}/driver/${item.slug}`}
              type="DRIVER"
              name={item.name}
              tagline={item.tagline}
              entityColor={item.color}
              seriesColor={config.color}
              image={item.image}
              number={item.number}
              numberImage={item.numberImage}
            />
          ))}
        </div>
      </section>
    </>
  )
}
