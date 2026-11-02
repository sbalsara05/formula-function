import { notFound } from 'next/navigation'
import { EntityCard } from '@/components/series/EntityCard'
import { PageIntro } from '@/components/series/SectionHeading'
import { CURRENT_F1_TEAMS, type GridEntity } from '@/data/f1-current-grid'
import { SERIES_CONFIG, isSeriesNum } from '@/data/series-config'
import { applyTeamAssets } from '@/lib/f1-team-assets'

export default async function TeamsPage({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params
  if (!isSeriesNum(series)) notFound()
  const config = SERIES_CONFIG[series]
  const teams: GridEntity[] = series === '1' ? applyTeamAssets(CURRENT_F1_TEAMS) : config.teams

  return (
    <>
      <PageIntro
        kicker={config.name.toUpperCase()}
        title="Teams"
        meta={series === '1' ? `CURRENT GRID · 2026 · ${teams.length} TEAMS` : `${teams.length} TEAMS`}
        color={config.color}
      />
      <section style={{ padding: '2rem 1.75rem 4rem', borderTop: '0.5px solid #1a1a1a' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {teams.map(item => (
            <EntityCard
              key={item.slug}
              href={`/f/${series}/team/${item.slug}`}
              type="TEAM"
              name={item.name}
              tagline={item.tagline}
              entityColor={item.color}
              seriesColor={config.color}
              image={item.image}
              imageFallback={item.imageFallback}
              logoImage={item.logoImage}
              logoFallback={item.logoFallback}
            />
          ))}
        </div>
      </section>
    </>
  )
}
