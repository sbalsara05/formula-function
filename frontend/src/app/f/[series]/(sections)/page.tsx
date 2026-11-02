import { notFound } from 'next/navigation'
import { F1NewsSection } from '@/components/home/F1NewsSection'
import { F1EraCard } from '@/components/home/F1EraCard'
import { EntityCard } from '@/components/series/EntityCard'
import { SectionHeading } from '@/components/series/SectionHeading'
import { StandingsTables } from '@/components/series/StandingsTables'
import { CURRENT_F1_DRIVERS, CURRENT_F1_TEAMS, CURRENT_F1_VENUES } from '@/data/f1-current-grid'
import { VENUE_TRACK_PATHS } from '@/data/mock/venues'
import { applyDriverNumbers, fetchF1DriverNumberData, type DriverNumberData } from '@/lib/f1-driver-numbers'
import { applyTeamAssets } from '@/lib/f1-team-assets'
import {
  F1_CHAMPIONS,
  F1_CHAMPIONSHIP_LEGEND,
  TIMELINE_START,
  TIMELINE_END,
  TIMELINE_SPAN,
  TIMELINE_DECADE_MARKERS,
  championBarColor,
} from '@/data/f1-champions'
import { F1_ERAS } from '@/data/f1-eras'
import { SERIES_CONFIG, F2_CHAMPIONS, F3_CHAMPIONS, isSeriesNum } from '@/data/series-config'
import { fetchF1News, type F1NewsItem } from '@/lib/f1-news'
import { fetchLiveStandings, type LiveStandings } from '@/lib/f1-standings'

const PREVIEW_NEWS = 3
const PREVIEW_STANDINGS = 5
const PREVIEW_CARDS = 3
const PREVIEW_ERAS = 2

const sectionStyle = { padding: '0 1.75rem 3rem', borderTop: '0.5px solid #1a1a1a' }
const cardGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }

/* ─── F1 overview ────────────────────────────────────────────────────────────── */

function F1OverviewPage({ config, standings, news, driverNumberData }: {
  config: typeof SERIES_CONFIG['1']
  standings: LiveStandings | null
  news: { items: F1NewsItem[]; fetchedAt: string }
  driverNumberData: DriverNumberData
}) {
  const f1Drivers = applyDriverNumbers(CURRENT_F1_DRIVERS, driverNumberData)
  const f1Teams = applyTeamAssets(CURRENT_F1_TEAMS)

  return (
    <>
      {/* ── DNA: hero + championship timeline ── */}
      <section style={{ background: '#000' }}>
      {/* ── Hero ── */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        padding: '5rem 1.75rem 4rem',
        minHeight: '55vh',
        display: 'flex',
        alignItems: 'center',
        background: '#000',
      }}>
        {/* Background glows */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 50%, #FF1E5615 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 30%, #FF1E5608 0%, transparent 50%)', pointerEvents: 'none' }} />
        {/* Diagonal rule lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }} aria-hidden="true">
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="#FF1E56" strokeWidth="1" />
          <line x1="-10%" y1="100%" x2="90%" y2="0" stroke="#FF1E56" strokeWidth="0.5" />
          <line x1="10%" y1="100%" x2="110%" y2="0" stroke="#FF1E56" strokeWidth="0.5" />
        </svg>

        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          {/* Left: identity */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: '#555', margin: '0 0 16px' }}>
              {config.tier}
            </p>
            <h1 style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(72px, 10vw, 130px)',
              fontWeight: 400, color: config.color, letterSpacing: -4, lineHeight: 0.9, margin: '0 0 20px',
            }}>
              f(1)
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: '#444', margin: '0 0 16px' }}>
              FORMULA 1 WORLD CHAMPIONSHIP
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 16, color: '#777', maxWidth: 420, lineHeight: 1.7, margin: 0,
            }}>
              {config.description}
            </p>
          </div>

          {/* Right: key stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a1a1a', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
            {[
              { value: '77', label: 'SEASONS' },
              { value: '35', label: 'CHAMPIONS' },
              { value: '1,171', label: 'GRANDS PRIX' },
              { value: '1950', label: 'INAUGURAL' },
            ].map(s => (
              <div key={s.label} style={{ background: '#060606', padding: '24px 28px' }}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 'clamp(28px, 3vw, 42px)',
                  fontWeight: 400, color: '#fff', letterSpacing: -1, margin: '0 0 6px', lineHeight: 1,
                }}>
                  {s.value}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 2, margin: 0 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Championship DNA strip ── */}
      <div
        style={{
          borderTop: '0.5px solid #1a1a1a',
          borderBottom: '0.5px solid #1a1a1a',
          background: '#000',
          isolation: 'isolate',
          paddingBottom: '3.5rem',
        }}
      >
        <div style={{ padding: '14px 1.75rem 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            CHAMPIONSHIP DNA · {TIMELINE_START}–{TIMELINE_END}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            EACH BAR = ONE SEASON · COLOR = CONSTRUCTOR THAT WON THE DRIVERS&apos; TITLE THAT SEASON
          </p>
        </div>
        <div style={{ padding: '0 1.75rem 0', position: 'relative' }}>
          {/* Year bars */}
          <div style={{ display: 'flex', gap: 2, height: 48, alignItems: 'stretch' }}>
            {F1_CHAMPIONS.map(c => (
              <div
                key={c.year}
                title={`${c.year} · ${c.driver} · ${c.team}`}
                style={{
                  flex: 1, background: championBarColor(c.team),
                  opacity: 0.85,
                  borderRadius: 1,
                  minWidth: 0,
                }}
              />
            ))}
          </div>
          {/* Decade markers */}
          <div style={{ display: 'flex', position: 'relative', height: 20, marginTop: 4 }}>
            {TIMELINE_DECADE_MARKERS.map(yr => {
              const idx = yr - TIMELINE_START
              const pct = (idx / TIMELINE_SPAN) * 100
              return (
                <span
                  key={yr}
                  style={{
                    position: 'absolute',
                    left: `${pct}%`,
                    fontFamily: 'var(--font-mono)', fontSize: 8,
                    color: '#444', letterSpacing: 0.5,
                    transform: 'translateX(-50%)',
                  }}
                >
                  {yr}
                </span>
              )
            })}
          </div>
        </div>
        {/* Legend */}
        <div style={{ padding: '12px 1.75rem 0', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {F1_CHAMPIONSHIP_LEGEND.map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#444', letterSpacing: 1 }}>
                {l.label.toUpperCase()} · {l.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      </section>

      <F1NewsSection items={news.items} fetchedAt={news.fetchedAt} accentColor={config.color} viewAllHref="/f/1/news" />

      {/* ── Live Standings ── */}
      {standings && (standings.driverStandings.length > 0 || standings.constructorStandings.length > 0) && (
        <section style={sectionStyle}>
          <SectionHeading
            label="LIVE STANDINGS"
            meta={`${standings.season} · ROUND ${standings.round} · TOP ${PREVIEW_STANDINGS}`}
            color={config.color}
            viewAllHref="/f/1/standings"
          />
          <StandingsTables standings={standings} limit={PREVIEW_STANDINGS} />
        </section>
      )}

      {/* ── Teams ── */}
      <section style={sectionStyle}>
        <SectionHeading
          label="TEAMS"
          meta={`CURRENT GRID · 2026 · ${f1Teams.length} TEAMS`}
          color={config.color}
          viewAllHref="/f/1/teams"
        />
        <div style={cardGridStyle}>
          {f1Teams.slice(0, PREVIEW_CARDS).map(item => (
            <EntityCard
              key={item.slug}
              href={`/f/1/team/${item.slug}`}
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

      {/* ── Drivers ── */}
      <section style={sectionStyle}>
        <SectionHeading
          label="DRIVERS"
          meta={`CURRENT GRID · 2026 · ${f1Drivers.length} DRIVERS`}
          color={config.color}
          viewAllHref="/f/1/drivers"
        />
        <div style={cardGridStyle}>
          {f1Drivers.slice(0, PREVIEW_CARDS).map(item => (
            <EntityCard
              key={item.slug}
              href={`/f/1/driver/${item.slug}`}
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

      {/* ── Eras ── */}
      <section style={sectionStyle}>
        <SectionHeading
          label="ERAS"
          meta={`DEFINING CHAPTERS IN THE SPORT'S HISTORY · ${F1_ERAS.length} ERAS`}
          color={config.color}
          viewAllHref="/f/1/eras"
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {F1_ERAS.slice(0, PREVIEW_ERAS).map(era => (
            <F1EraCard
              key={era.slug}
              era={era}
              href={`/f/1/era/${era.slug}`}
            />
          ))}
        </div>
      </section>

      {/* ── Venues ── */}
      <section style={sectionStyle}>
        <SectionHeading
          label="VENUES"
          meta={`2026 CALENDAR · ${CURRENT_F1_VENUES.length} CIRCUITS`}
          color={config.color}
          viewAllHref="/f/1/venues"
        />
        <div style={cardGridStyle}>
          {CURRENT_F1_VENUES.slice(0, PREVIEW_CARDS).map(item => (
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

      {/* ── Memorial ── */}
      <section style={{ padding: '2rem 1.75rem 3rem', borderTop: '0.5px solid #111', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#333', margin: '0 0 14px' }}>
          — IN MEMORIAM —
        </p>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, color: '#444', lineHeight: 2, margin: 0 }}>
          {['Bandini', 'Rindt', 'Peterson', 'Villeneuve', 'Paletti', 'Senna', 'Ratzenberger', 'Bianchi'].join('  ·  ')}
        </p>
      </section>
    </>
  )
}

/* ─── F2/F3 browse previews ──────────────────────────────────────────────────── */

function FeederBrowsePreviews({ series, config }: {
  series: '2' | '3'
  config: typeof SERIES_CONFIG['2'] | typeof SERIES_CONFIG['3']
}) {
  return (
    <>
      {[
        { label: 'TEAMS',   items: config.teams,   type: 'TEAM',   seg: 'team',   page: 'teams' },
        { label: 'DRIVERS', items: config.drivers, type: 'DRIVER', seg: 'driver', page: 'drivers' },
      ].map(section => (
        <section key={section.label} style={sectionStyle}>
          <SectionHeading
            label={section.label}
            meta={`${section.items.length} ${section.label}`}
            color={config.color}
            viewAllHref={`/f/${series}/${section.page}`}
          />
          <div style={cardGridStyle}>
            {section.items.slice(0, PREVIEW_CARDS).map(item => (
              <EntityCard
                key={item.slug}
                href={`/f/${series}/${section.seg}/${item.slug}`}
                type={section.type}
                name={item.name}
                tagline={item.tagline}
                entityColor={item.color}
                seriesColor={config.color}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  )
}

/* ─── F2 overview ────────────────────────────────────────────────────────────── */

function F2OverviewPage({ config }: { config: typeof SERIES_CONFIG['2'] }) {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 1.75rem 4rem', minHeight: '52vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 50%, #00E5FF15 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 30%, #00E5FF08 0%, transparent 50%)', pointerEvents: 'none' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }} aria-hidden="true">
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="#00E5FF" strokeWidth="1" />
          <line x1="-10%" y1="100%" x2="90%" y2="0" stroke="#00E5FF" strokeWidth="0.5" />
          <line x1="10%" y1="100%" x2="110%" y2="0" stroke="#00E5FF" strokeWidth="0.5" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: '#555', margin: '0 0 16px' }}>
              {config.tier}
            </p>
            <h1 style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(72px, 10vw, 130px)',
              fontWeight: 400, color: config.color, letterSpacing: -4, lineHeight: 0.9, margin: '0 0 20px',
            }}>f(2)</h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: '#444', margin: '0 0 16px' }}>
              FIA FORMULA 2 CHAMPIONSHIP
            </p>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16, color: '#777', maxWidth: 420, lineHeight: 1.7, margin: 0 }}>
              {config.description}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a1a1a', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
            {[
              { value: '8', label: 'SEASONS' },
              { value: '8', label: 'CHAMPIONS' },
              { value: '11', label: 'TEAMS' },
              { value: '2017', label: 'INAUGURAL' },
            ].map(s => (
              <div key={s.label} style={{ background: '#060606', padding: '24px 28px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, color: '#fff', letterSpacing: -1, margin: '0 0 6px', lineHeight: 1 }}>
                  {s.value}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 2, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Championship DNA ── */}
      <section style={{ borderTop: '0.5px solid #1a1a1a', borderBottom: '0.5px solid #1a1a1a' }}>
        <div style={{ padding: '14px 1.75rem 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#555', margin: 0 }}>
            CHAMPIONSHIP DNA · 2017–2024
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            EACH BAR = ONE SEASON · COLOR = CHAMPION&apos;S TEAM
          </p>
        </div>
        <div style={{ display: 'flex', height: 32, gap: 2, padding: '0 1.75rem 12px' }}>
          {F2_CHAMPIONS.map(c => (
            <div
              key={c.year}
              title={`${c.year}: ${c.driver} (${c.team})`}
              style={{
                flex: 1, background: c.teamColor, borderRadius: 2, opacity: 0.75,
                cursor: 'default', transition: 'opacity 0.15s',
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Graduate Machine ── */}
      <section style={{ padding: '3rem 1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, borderBottom: '0.5px solid #1a1a1a', paddingBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            THE GRADUATE MACHINE
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            ALL 8 F2 CHAMPIONS REACHED FORMULA 1
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {F2_CHAMPIONS.map(c => (
            <div key={c.year} style={{
              background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8,
              padding: '16px 18px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: c.teamColor, opacity: 0.7 }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1.5, margin: '0 0 8px' }}>
                {c.year} CHAMPION
              </p>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', margin: '0 0 4px', letterSpacing: -0.3 }}>
                {c.driver}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', margin: '0 0 10px', letterSpacing: 0.5 }}>
                {c.team.toUpperCase()}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#444' }}>→</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: c.destColor, letterSpacing: 0.5 }}>
                  {c.dest.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Series Context ── */}
      <section style={{ padding: '0 1.75rem 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, borderBottom: '0.5px solid #1a1a1a', paddingBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            SERIES IDENTITY
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            {
              label: 'SPEC SERIES',
              value: 'Dallara F2 2018',
              sub: '3.4L Mecachrome V6 · 620 hp · identical machinery',
              color: config.color,
            },
            {
              label: 'THE MANDATE',
              value: 'Prove it here',
              sub: 'Every F1 seat secured after a standout F2 campaign since 2017',
              color: '#888',
            },
            {
              label: 'PREMA DYNASTY',
              value: '3 of 8 titles',
              sub: 'Leclerc 2017, Schumacher 2020, Piastri 2021 — most dominant junior team',
              color: '#E8001C',
            },
          ].map(item => (
            <div key={item.label} style={{ background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '20px 22px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1.5, margin: '0 0 10px' }}>{item.label}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: item.color, letterSpacing: -0.5, margin: '0 0 8px', lineHeight: 1 }}>{item.value}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: 0, lineHeight: 1.6 }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <FeederBrowsePreviews series="2" config={config} />
    </>
  )
}

/* ─── F3 overview ────────────────────────────────────────────────────────────── */

function F3OverviewPage({ config }: { config: typeof SERIES_CONFIG['3'] }) {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 1.75rem 4rem', minHeight: '52vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 50%, #B026FF15 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 30%, #B026FF08 0%, transparent 50%)', pointerEvents: 'none' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }} aria-hidden="true">
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="#B026FF" strokeWidth="1" />
          <line x1="-10%" y1="100%" x2="90%" y2="0" stroke="#B026FF" strokeWidth="0.5" />
          <line x1="10%" y1="100%" x2="110%" y2="0" stroke="#B026FF" strokeWidth="0.5" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: '#555', margin: '0 0 16px' }}>
              {config.tier}
            </p>
            <h1 style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(72px, 10vw, 130px)',
              fontWeight: 400, color: config.color, letterSpacing: -4, lineHeight: 0.9, margin: '0 0 20px',
            }}>f(3)</h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: '#444', margin: '0 0 16px' }}>
              FIA FORMULA 3 CHAMPIONSHIP
            </p>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16, color: '#777', maxWidth: 420, lineHeight: 1.7, margin: 0 }}>
              {config.description}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a1a1a', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
            {[
              { value: '6', label: 'SEASONS' },
              { value: '6', label: 'CHAMPIONS' },
              { value: '10', label: 'TEAMS' },
              { value: '2019', label: 'INAUGURAL' },
            ].map(s => (
              <div key={s.label} style={{ background: '#060606', padding: '24px 28px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, color: '#fff', letterSpacing: -1, margin: '0 0 6px', lineHeight: 1 }}>
                  {s.value}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 2, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Championship DNA ── */}
      <section style={{ borderTop: '0.5px solid #1a1a1a', borderBottom: '0.5px solid #1a1a1a' }}>
        <div style={{ padding: '14px 1.75rem 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#555', margin: 0 }}>
            CHAMPIONSHIP DNA · 2019–2024
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            EACH BAR = ONE SEASON · COLOR = CHAMPION&apos;S TEAM
          </p>
        </div>
        <div style={{ display: 'flex', height: 32, gap: 2, padding: '0 1.75rem 12px' }}>
          {F3_CHAMPIONS.map(c => (
            <div
              key={c.year}
              title={`${c.year}: ${c.driver} (${c.team})`}
              style={{ flex: 1, background: c.teamColor, borderRadius: 2, opacity: 0.75, cursor: 'default' }}
            />
          ))}
        </div>
      </section>

      {/* ── Champions Roll ── */}
      <section style={{ padding: '3rem 1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, borderBottom: '0.5px solid #1a1a1a', paddingBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            CHAMPIONS ROLL
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>2019 – 2024</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {F3_CHAMPIONS.map(c => (
            <div key={c.year} style={{
              background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8,
              padding: '16px 18px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: c.teamColor, opacity: 0.7 }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1.5, margin: '0 0 8px' }}>
                {c.year} CHAMPION
              </p>
              <p style={{ fontSize: 15, fontWeight: 500, color: '#fff', margin: '0 0 4px', letterSpacing: -0.3 }}>{c.driver}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', margin: 0, letterSpacing: 0.5 }}>
                {c.team.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Series Context ── */}
      <section style={{ padding: '0 1.75rem 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, borderBottom: '0.5px solid #1a1a1a', paddingBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            SERIES IDENTITY
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            {
              label: 'SPEC CHASSIS',
              value: 'Dallara F3 2025',
              sub: '3.4L naturally-aspirated Mecachrome · 30-car grid · 10 teams',
              color: config.color,
            },
            {
              label: 'THE MANDATE',
              value: 'Earn your stripes',
              sub: 'Raw talent vs spec machinery — the only variable is the driver',
              color: '#888',
            },
            {
              label: 'PREMA DOMINANCE',
              value: '3 of 6 titles',
              sub: 'Shwartzman 2019 · Piastri 2020 · Hauger 2021 — early-era dominance',
              color: '#E8001C',
            },
          ].map(item => (
            <div key={item.label} style={{ background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '20px 22px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1.5, margin: '0 0 10px' }}>{item.label}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: item.color, letterSpacing: -0.5, margin: '0 0 8px', lineHeight: 1 }}>{item.value}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: 0, lineHeight: 1.6 }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <FeederBrowsePreviews series="3" config={config} />
    </>
  )
}

/* ─── Route ──────────────────────────────────────────────────────────────────── */

export default async function SeriesOverviewPage({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params
  if (!isSeriesNum(series)) notFound()

  if (series === '1') {
    const [standings, news, driverNumberData] = await Promise.all([
      fetchLiveStandings(),
      fetchF1News(PREVIEW_NEWS),
      fetchF1DriverNumberData(),
    ])
    return (
      <F1OverviewPage
        config={SERIES_CONFIG['1']}
        standings={standings}
        news={news}
        driverNumberData={driverNumberData}
      />
    )
  }
  if (series === '2') {
    return <F2OverviewPage config={SERIES_CONFIG['2']} />
  }
  return <F3OverviewPage config={SERIES_CONFIG['3']} />
}
