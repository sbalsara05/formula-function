'use client'

import type { ConstructorStandingEntry, StandingsMeta } from './TeamPage'

export interface GenericTeamStats {
  wins: number
  podiums: number
  poles: number
  wccTitles: number
  seasons: number
}

export interface GenericTeamDriver {
  driverId: string
  givenName: string
  familyName: string
  nationality: string
  permanentNumber?: string
}

export interface TeamSeasonResult {
  season: number
  position: number
  points: number
  wins: number
}

export interface GenericTeamPageProps {
  jolpicaId: string
  name: string
  nationality: string
  color: string
  liveStats: GenericTeamStats | null
  currentDrivers: GenericTeamDriver[]
  currentStandings: ConstructorStandingEntry[]
  standingsMeta: StandingsMeta
  seasonHistory: TeamSeasonResult[]
}

const FLAGS: Record<string, string> = {
  British: '🇬🇧', Italian: '🇮🇹', German: '🇩🇪', Austrian: '🇦🇹', French: '🇫🇷',
  American: '🇺🇸', Swiss: '🇨🇭', Japanese: '🇯🇵', Irish: '🇮🇪', Indian: '🇮🇳',
  Dutch: '🇳🇱', Spanish: '🇪🇸', Brazilian: '🇧🇷', Finnish: '🇫🇮', Monégasque: '🇲🇨',
  Australian: '🇦🇺', Canadian: '🇨🇦', Argentine: '🇦🇷', 'New Zealander': '🇳🇿',
  Belgian: '🇧🇪', Mexican: '🇲🇽', Danish: '🇩🇰', Thai: '🇹🇭', Portuguese: '🇵🇹',
  Icelandic: '🇮🇸', Chinese: '🇨🇳', South_African: '🇿🇦',
}

export default function GenericTeamPage({
  jolpicaId,
  name,
  nationality,
  color,
  liveStats,
  currentDrivers,
  currentStandings,
  standingsMeta,
  seasonHistory,
}: GenericTeamPageProps) {
  const thisStanding = currentStandings.find(
    s => s.Constructor?.constructorId === jolpicaId,
  )
  const maxPts = Math.max(...currentStandings.map(s => parseFloat(s.points ?? '0')), 1)
  const isActive = currentDrivers.length > 0 || !!thisStanding

  const statItems = liveStats
    ? [
        { label: 'WINS',    value: liveStats.wins.toLocaleString() },
        { label: 'PODIUMS', value: liveStats.podiums.toLocaleString() },
        { label: 'POLES',   value: liveStats.poles.toLocaleString() },
        { label: 'WCC',     value: liveStats.wccTitles > 0 ? `×${liveStats.wccTitles}` : '—' },
        { label: 'SEASONS', value: liveStats.seasons.toLocaleString() },
      ]
    : []

  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#e0e0e0', fontFamily: 'var(--font-mono)' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <header style={{ padding: '64px 40px 44px', borderBottom: `1px solid ${color}28` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 10, letterSpacing: '0.2em', color: color, marginBottom: 14, opacity: 0.8 }}>
            FORMULA 1 · {nationality.toUpperCase()} {FLAGS[nationality] ?? ''}
          </p>
          <h1 style={{
            fontSize: 'clamp(34px, 5vw, 62px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            margin: '0 0 10px',
            lineHeight: 1.05,
          }}>
            {name.toUpperCase()}
          </h1>
          {(liveStats?.wccTitles ?? 0) > 0 && (
            <p style={{ fontSize: 11, letterSpacing: '0.15em', color: color, margin: '8px 0 0' }}>
              {liveStats!.wccTitles}× WORLD CONSTRUCTORS&apos; CHAMPION
            </p>
          )}
          <div style={{ height: 3, background: color, width: 72, marginTop: 28, borderRadius: 1 }} />
        </div>
      </header>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
      {statItems.length > 0 && (
        <section style={{ borderBottom: '1px solid #181818', padding: '24px 40px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap' }}>
            {statItems.map((s, i) => (
              <div key={s.label} style={{
                flex: '1 0 110px',
                padding: '12px 22px',
                borderLeft: i === 0 ? '1px solid #222' : undefined,
                borderRight: '1px solid #222',
              }}>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#555', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.value}</div>
              </div>
            ))}
            <div style={{ flex: '1 0 110px', padding: '12px 22px', borderRight: '1px solid #222' }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#555', marginBottom: 6 }}>SOURCE</div>
              <div style={{ fontSize: 9, color: '#2ecc71', letterSpacing: '0.1em' }}>● JOLPICA · LIVE</div>
            </div>
          </div>
        </section>
      )}

      {/* ── Main grid: standings + drivers ────────────────────────────────── */}
      {isActive && (
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '40px 40px',
          display: 'grid',
          gridTemplateColumns: currentDrivers.length > 0 ? '2fr 1fr' : '1fr',
          gap: 40,
        }}>

          {/* Current season standings */}
          {currentStandings.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
                <p style={{ fontSize: 9, letterSpacing: '0.2em', color: '#555', margin: 0 }}>
                  {standingsMeta.season} CONSTRUCTORS&apos; CHAMPIONSHIP
                </p>
                <span style={{ fontSize: 9, color: '#2ecc71', letterSpacing: '0.1em' }}>
                  ● LIVE · R{standingsMeta.round}
                </span>
              </div>
              <div style={{ border: '1px solid #1c1c1c', borderRadius: 4, overflow: 'hidden' }}>
                {currentStandings.map((s, i) => {
                  const isThis = s.Constructor?.constructorId === jolpicaId
                  const pts = parseFloat(s.points ?? '0')
                  const pct = (pts / maxPts) * 100
                  return (
                    <div
                      key={s.Constructor?.constructorId ?? i}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '36px 1fr 64px',
                        alignItems: 'center',
                        padding: '10px 16px',
                        background: isThis ? `${color}14` : i % 2 === 0 ? '#0e0e0e' : '#0a0a0a',
                        borderLeft: isThis ? `3px solid ${color}` : '3px solid transparent',
                        borderBottom: i < currentStandings.length - 1 ? '1px solid #141414' : 'none',
                      }}
                    >
                      <span style={{ fontSize: 11, color: isThis ? color : '#444', fontWeight: isThis ? 700 : 400 }}>
                        P{s.position}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          fontSize: 11,
                          color: isThis ? '#fff' : '#bbb',
                          fontWeight: isThis ? 700 : 400,
                          letterSpacing: '0.05em',
                          marginBottom: 5,
                        }}>
                          {s.Constructor?.name?.toUpperCase()}
                        </div>
                        <div style={{ height: 2, background: isThis ? color : '#252525', width: `${pct}%`, borderRadius: 1 }} />
                      </div>
                      <span style={{ fontSize: 12, color: isThis ? '#fff' : '#777', textAlign: 'right', fontWeight: isThis ? 700 : 400 }}>
                        {s.points}
                      </span>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Current drivers */}
          {currentDrivers.length > 0 && (
            <section>
              <p style={{ fontSize: 9, letterSpacing: '0.2em', color: '#555', marginBottom: 18 }}>
                {standingsMeta.season} DRIVERS
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {currentDrivers.map(d => (
                  <div
                    key={d.driverId}
                    style={{
                      padding: '16px 20px',
                      border: `1px solid ${color}28`,
                      borderRadius: 4,
                      background: `${color}07`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                    }}
                  >
                    {d.permanentNumber && (
                      <span style={{ fontSize: 20, fontWeight: 700, color: color, minWidth: 32, opacity: 0.9 }}>
                        {d.permanentNumber}
                      </span>
                    )}
                    <div>
                      <div style={{ fontSize: 12, color: '#fff', letterSpacing: '0.06em', fontWeight: 600 }}>
                        {d.givenName.toUpperCase()} {d.familyName.toUpperCase()}
                      </div>
                      <div style={{ fontSize: 9, color: '#555', marginTop: 3, letterSpacing: '0.12em' }}>
                        {FLAGS[d.nationality] ?? ''} {d.nationality.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* ── Season history grid ────────────────────────────────────────────── */}
      {seasonHistory.length > 0 && (
        <section style={{ padding: isActive ? '0 40px 64px' : '40px 40px 64px', maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 9, letterSpacing: '0.2em', color: '#555', marginBottom: 18 }}>
            WCC SEASON HISTORY · {seasonHistory.length} SEASONS
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 6 }}>
            {seasonHistory.map(s => (
              <div
                key={s.season}
                style={{
                  padding: '10px 14px',
                  background: s.position === 1 ? `${color}16` : '#0d0d0d',
                  border: `1px solid ${s.position === 1 ? color + '38' : '#1a1a1a'}`,
                  borderRadius: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 11, color: '#666' }}>{s.season}</span>
                <span style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: s.position === 1 ? color : s.position <= 3 ? '#fff' : '#555',
                }}>
                  P{s.position || '—'}
                </span>
                <span style={{ fontSize: 10, color: '#444' }}>{s.points}pts</span>
              </div>
            ))}
          </div>
        </section>
      )}

    </main>
  )
}
