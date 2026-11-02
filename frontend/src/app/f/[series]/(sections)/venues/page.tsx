import { notFound } from 'next/navigation'
import { EntityCard } from '@/components/series/EntityCard'
import { PageIntro } from '@/components/series/SectionHeading'
import { CURRENT_F1_VENUES } from '@/data/f1-current-grid'
import { VENUE_TRACK_PATHS } from '@/data/mock/venues'
import { SERIES_CONFIG } from '@/data/series-config'

export default async function VenuesPage({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params
  if (series !== '1') notFound()
  const config = SERIES_CONFIG['1']

  return (
    <>
      <PageIntro
        kicker={config.name.toUpperCase()}
        title="Venues"
        meta={`2026 CALENDAR · ${CURRENT_F1_VENUES.length} CIRCUITS`}
        color={config.color}
      />
      <section style={{ padding: '2rem 1.75rem 4rem', borderTop: '0.5px solid #1a1a1a' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {CURRENT_F1_VENUES.map(item => (
            <EntityCard
              key={item.slug}
              href={`/f/1/venue/${item.slug}`}
              type="VENUE"
              name={item.name}
              tagline={item.tagline}
              entityColor={item.color}
              seriesColor={config.color}
              image={item.image}
              trackPath={VENUE_TRACK_PATHS[item.slug]}
            />
          ))}
        </div>
      </section>
    </>
  )
}
