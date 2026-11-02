import { notFound } from 'next/navigation'
import { PageIntro } from '@/components/series/SectionHeading'
import { StandingsTables } from '@/components/series/StandingsTables'
import { SERIES_CONFIG } from '@/data/series-config'
import { fetchLiveStandings } from '@/lib/f1-standings'

export default async function StandingsPage({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params
  if (series !== '1') notFound()
  const config = SERIES_CONFIG['1']
  const standings = await fetchLiveStandings()
  const hasStandings = standings && (standings.driverStandings.length > 0 || standings.constructorStandings.length > 0)

  return (
    <>
      <PageIntro
        kicker={config.name.toUpperCase()}
        title="Standings"
        meta={standings ? `${standings.season} · ROUND ${standings.round}` : undefined}
        color={config.color}
      />
      <section style={{ padding: '2rem 1.75rem 4rem', borderTop: '0.5px solid #1a1a1a' }}>
        {hasStandings ? (
          <StandingsTables standings={standings} />
        ) : (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555', margin: 0, letterSpacing: 0.5 }}>
            Live standings unavailable right now.
          </p>
        )}
      </section>
    </>
  )
}
