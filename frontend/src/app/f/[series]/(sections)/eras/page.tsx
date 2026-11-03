import { notFound } from 'next/navigation'
import { F1EraCard } from '@/components/home/F1EraCard'
import { PageIntro } from '@/components/series/SectionHeading'
import { F1_ERAS } from '@/data/f1-eras'
import { SERIES_CONFIG } from '@/data/series-config'

export default async function ErasPage({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params
  if (series !== '1') notFound()
  const config = SERIES_CONFIG['1']

  return (
    <>
      <PageIntro
        kicker={config.name.toUpperCase()}
        title="Eras"
        meta={`DEFINING CHAPTERS IN THE SPORT'S HISTORY · ${F1_ERAS.length} ERAS`}
        color={config.color}
      />
      <section style={{ padding: '2rem 1.75rem 4rem', borderTop: '0.5px solid #1a1a1a' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {F1_ERAS.map((era, i) => (
            <F1EraCard
              key={era.slug}
              era={era}
              wide={i === F1_ERAS.length - 1}
              href={`/f/1/era/${era.slug}`}
            />
          ))}
        </div>
      </section>
    </>
  )
}
