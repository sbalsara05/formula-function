import Link from 'next/link'
import type { CSSProperties } from 'react'
import FallbackImg from '@/components/ui/FallbackImg'
import type { F1EraDetail } from '@/data/f1-eras'
import {
  getChampionsInRange,
  championBarColor,
  buildChampionshipLegend,
  normalizeConstructorFamily,
} from '@/data/f1-champions'

const SERIES_ACCENT = '#FF1E56'
const PAGE_MAX = 1200

const shell: CSSProperties = {
  maxWidth: PAGE_MAX,
  margin: '0 auto',
  padding: '0 1.75rem',
}

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p style={{
      fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2,
      color, margin: '0 0 6px',
    }}>
      {children}
    </p>
  )
}

function EraHeader({ era }: { era: F1EraDetail }) {
  return (
    <div style={{
      padding: '1rem 1.75rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderBottom: '0.5px solid #1a1a1a',
      background: 'rgba(0,0,0,0.85)',
      position: 'relative', zIndex: 10,
    }}>
      <div style={{ ...shell, padding: 0, display: 'flex', alignItems: 'center', gap: 20 }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, letterSpacing: -0.5 }}>f(x)</span>
        </Link>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#666',
        }}>
          <Link href="/f/1" style={{ textDecoration: 'none', color: 'inherit' }}>f(1)</Link>
          <span style={{ color: '#333' }}>/</span>
          <Link href="/f/1#eras" style={{ textDecoration: 'none', color: 'inherit' }}>ERAS</Link>
          <span style={{ color: '#333' }}>/</span>
          <span style={{ color: era.color }}>{era.name.toUpperCase()}</span>
        </div>
      </div>
    </div>
  )
}

function EraHero({ era }: { era: F1EraDetail }) {
  return (
    <div style={{
      position: 'relative', minHeight: 400, overflow: 'hidden',
      borderBottom: '0.5px solid #1a1a1a',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }}>
        <FallbackImg
          src={era.imageUrl}
          alt=""
          ariaHidden
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: 'center 35%', display: 'block',
            filter: 'saturate(0.95) brightness(0.45)',
          }}
        />
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 0% 0%, ${era.color}35 0%, transparent 55%),
          linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.92) 100%)
        `,
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: era.color,
      }} />
      <div style={{
        position: 'relative', zIndex: 1,
        ...shell,
        paddingTop: '3rem',
        paddingBottom: '2.5rem',
        display: 'grid',
        gridTemplateColumns: '1fr minmax(220px, 320px)',
        gap: 48,
        alignItems: 'end',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, color: era.color,
            letterSpacing: 2, margin: '0 0 12px',
          }}>
            {era.years}
          </p>
          <h1 style={{
            fontSize: 40, fontWeight: 500, color: '#fff',
            margin: '0 0 12px', letterSpacing: -1, lineHeight: 1.05,
          }}>
            {era.name}
          </h1>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, color: '#aaa',
            margin: '0 0 20px', letterSpacing: 0.5,
          }}>
            {era.drivers.toUpperCase()}
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: 16, color: '#ccc', margin: 0, lineHeight: 1.65,
            maxWidth: 560,
          }}>
            {era.flavor}
          </p>
        </div>
        <div style={{
          background: 'rgba(0,0,0,0.55)',
          border: `0.5px solid ${era.color}40`,
          borderRadius: 10,
          padding: '20px 22px',
          backdropFilter: 'blur(8px)',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 8, color: '#666',
            letterSpacing: 1.5, margin: '0 0 16px',
          }}>
            ERA AT A GLANCE
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[era.stat1, era.stat2].map(s => (
              <div key={s.label}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 400,
                  color: era.color, margin: '0 0 4px', letterSpacing: -1, lineHeight: 1,
                }}>
                  {s.value}
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 8, color: '#888',
                  letterSpacing: 1, margin: 0,
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EraChampionshipStrip({
  champions,
}: {
  champions: ReturnType<typeof getChampionsInRange>
}) {
  if (champions.length === 0) return null
  const legend = buildChampionshipLegend(champions)
  const start = champions[0].year
  const end = champions[champions.length - 1].year

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', gap: 2, height: 40, alignItems: 'stretch' }}>
        {champions.map(c => (
          <div
            key={c.year}
            title={`${c.year} · ${c.driver} · ${c.team}`}
            style={{
              flex: 1,
              background: championBarColor(c.team),
              opacity: 0.88,
              borderRadius: 2,
              minWidth: 0,
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555' }}>{start}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555' }}>{end}</span>
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 14 }}>
        {legend.map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', letterSpacing: 0.5 }}>
              {l.label.toUpperCase()} · {l.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface F1EraPageProps {
  era: F1EraDetail
  prev: F1EraDetail | null
  next: F1EraDetail | null
}

export default function F1EraPage({ era, prev, next }: F1EraPageProps) {
  const champions = getChampionsInRange(era.startYear, era.endYear)
  const techStats = [
    era.stat1,
    era.stat2,
    ...(era.techContext ?? []),
  ]

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>
      <EraHeader era={era} />
      <EraHero era={era} />

      {/* Overview + technical context — two columns */}
      <section style={{ padding: '2.5rem 0', borderBottom: '0.5px solid #1a1a1a' }}>
        <div style={{
          ...shell,
          display: 'grid',
          gridTemplateColumns: '1fr minmax(280px, 380px)',
          gap: 48,
          alignItems: 'start',
        }}>
          <div>
            <SectionLabel color={era.color}>OVERVIEW</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 12 }}>
              {era.overview.map((para, i) => (
                <p key={i} style={{ fontSize: 14, color: '#bbb', margin: 0, lineHeight: 1.75 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel color={era.color}>TECHNICAL CONTEXT</SectionLabel>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
              marginTop: 12,
            }}>
              {techStats.map(s => (
                <div key={s.label} style={{
                  background: '#080808', border: `0.5px solid ${era.color}28`,
                  borderRadius: 8, padding: '14px 16px',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: 18, color: era.color,
                    margin: '0 0 4px', letterSpacing: -0.5, lineHeight: 1.1,
                  }}>
                    {s.value}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: 7, color: '#666',
                    letterSpacing: 0.8, margin: 0, lineHeight: 1.3,
                  }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Champions */}
      {champions.length > 0 && (
        <section style={{ padding: '2rem 0', borderBottom: '0.5px solid #1a1a1a' }}>
          <div style={shell}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <SectionLabel color={era.color}>CHAMPIONS IN THIS ERA</SectionLabel>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', margin: 0 }}>
                {champions.length} TITLES · {era.years}
              </p>
            </div>
            <EraChampionshipStrip champions={champions} />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 8,
            }}>
              {champions.map(c => (
                <div key={c.year} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: '#080808', border: '0.5px solid #1a1a1a',
                  borderRadius: 6, padding: '10px 14px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555',
                    width: 36, flexShrink: 0,
                  }}>
                    {c.year}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, color: '#ddd', margin: '0 0 2px', fontWeight: 500 }}>
                      {c.driver}
                    </p>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 0.5,
                      color: championBarColor(c.team),
                    }}>
                      {normalizeConstructorFamily(c.team).toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key figures + defining moments — two columns */}
      {(era.keyDrivers.length > 0 || era.definingMoments.length > 0) && (
        <section style={{ padding: '2rem 0', borderBottom: '0.5px solid #1a1a1a' }}>
          <div style={{
            ...shell,
            display: 'grid',
            gridTemplateColumns: era.keyDrivers.length > 0 && era.definingMoments.length > 0
              ? 'minmax(0, 1fr) minmax(0, 1.2fr)'
              : '1fr',
            gap: 48,
            alignItems: 'start',
          }}>
            {era.keyDrivers.length > 0 && (
              <div>
                <SectionLabel color={era.color}>KEY FIGURES</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                  {era.keyDrivers.map(d => {
                    const inner = (
                      <div style={{
                        background: '#080808', border: `0.5px solid ${d.slug ? era.color + '30' : '#1a1a1a'}`,
                        borderRadius: 8, padding: '14px 16px',
                      }}>
                        <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', margin: '0 0 6px' }}>
                          {d.name}
                        </p>
                        <p style={{ fontSize: 12, color: '#888', margin: 0, lineHeight: 1.5 }}>
                          {d.note}
                        </p>
                      </div>
                    )
                    if (d.slug) {
                      return (
                        <Link
                          key={d.name}
                          href={`/f/1/driver/${d.slug}`}
                          style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                        >
                          {inner}
                        </Link>
                      )
                    }
                    return <div key={d.name}>{inner}</div>
                  })}
                </div>
              </div>
            )}
            {era.definingMoments.length > 0 && (
              <div>
                <SectionLabel color={era.color}>DEFINING MOMENTS</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                  {era.definingMoments.map(m => {
                    const card = (
                      <div style={{
                        background: '#080808', border: '0.5px solid #1a1a1a',
                        borderRadius: 8, padding: '16px 18px',
                        borderLeft: `3px solid ${era.color}`,
                      }}>
                        <p style={{
                          fontFamily: 'var(--font-mono)', fontSize: 9, color: era.color,
                          letterSpacing: 1.5, margin: '0 0 6px',
                        }}>
                          {m.year}
                        </p>
                        <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', margin: '0 0 6px' }}>
                          {m.title}
                        </p>
                        <p style={{ fontSize: 13, color: '#888', margin: 0, lineHeight: 1.55 }}>
                          {m.description}
                        </p>
                      </div>
                    )
                    if (m.venueSlug) {
                      return (
                        <Link
                          key={`${m.year}-${m.title}`}
                          href={`/f/1/venue/${m.venueSlug}`}
                          style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                        >
                          {card}
                        </Link>
                      )
                    }
                    return <div key={`${m.year}-${m.title}`}>{card}</div>
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Dominant teams */}
      {era.dominantTeams && era.dominantTeams.length > 0 && (
        <section style={{ padding: '2rem 0', borderBottom: '0.5px solid #1a1a1a' }}>
          <div style={shell}>
            <SectionLabel color={era.color}>DOMINANT TEAMS</SectionLabel>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(era.dominantTeams.length, 4)}, 1fr)`,
              gap: 10,
              marginTop: 16,
            }}>
              {era.dominantTeams.map(t => {
                const card = (
                  <div style={{
                    background: '#080808', border: `0.5px solid ${t.slug ? era.color + '35' : '#1a1a1a'}`,
                    borderRadius: 8, padding: '16px 18px', height: '100%',
                  }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#ddd', margin: '0 0 6px' }}>
                      {t.name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', margin: 0, lineHeight: 1.4 }}>
                      {t.note}
                    </p>
                  </div>
                )
                if (t.slug) {
                  return (
                    <Link
                      key={t.name}
                      href={`/f/1/team/${t.slug}`}
                      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                    >
                      {card}
                    </Link>
                  )
                }
                return <div key={t.name}>{card}</div>
              })}
            </div>
          </div>
        </section>
      )}

      {/* Prev / next navigation */}
      <section style={{ padding: '2rem 0 3rem' }}>
        <div style={shell}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}>
            {prev ? (
              <Link
                href={`/f/1/era/${prev.slug}`}
                style={{
                  textDecoration: 'none', color: 'inherit',
                  background: '#080808', border: '0.5px solid #1a1a1a',
                  borderRadius: 8, padding: '16px 18px',
                }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', margin: '0 0 6px', letterSpacing: 1 }}>
                  ← PREVIOUS ERA
                </p>
                <p style={{ fontSize: 14, color: '#ddd', margin: '0 0 2px', fontWeight: 500 }}>{prev.name}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: prev.color, margin: 0 }}>{prev.years}</p>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/f/1/era/${next.slug}`}
                style={{
                  textDecoration: 'none', color: 'inherit', textAlign: 'right',
                  background: '#080808', border: '0.5px solid #1a1a1a',
                  borderRadius: 8, padding: '16px 18px',
                }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', margin: '0 0 6px', letterSpacing: 1 }}>
                  NEXT ERA →
                </p>
                <p style={{ fontSize: 14, color: '#ddd', margin: '0 0 2px', fontWeight: 500 }}>{next.name}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: next.color, margin: 0 }}>{next.years}</p>
              </Link>
            ) : <div />}
          </div>
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link
              href="/f/1"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
                color: SERIES_ACCENT, textDecoration: 'none',
              }}
            >
              ← BACK TO F1 HUB
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
