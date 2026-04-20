'use client'

export interface GenericDriverStats {
  races: number
  wins: number
  poles: number
  podiums: number
  championships: number
  seasons: number
}

export interface DriverCareerSeason {
  season: number
  position: number
  points: number
  wins: number
  constructorId: string
  constructorName: string
}

export interface GenericDriverPageProps {
  jolpicaId: string
  givenName: string
  familyName: string
  nationality: string
  permanentNumber?: string
  dateOfBirth?: string
  currentTeamName?: string
  currentTeamColor?: string
  liveStats: GenericDriverStats | null
  currentStanding?: {
    position: number
    points: string
    wins: string
    season: string
  }
  careerHistory: DriverCareerSeason[]
}

const FLAGS: Record<string, string> = {
  British: '🇬🇧', Italian: '🇮🇹', German: '🇩🇪', Austrian: '🇦🇹', French: '🇫🇷',
  American: '🇺🇸', Swiss: '🇨🇭', Japanese: '🇯🇵', Irish: '🇮🇪', Indian: '🇮🇳',
  Dutch: '🇳🇱', Spanish: '🇪🇸', Brazilian: '🇧🇷', Finnish: '🇫🇮', Monégasque: '🇲🇨',
  Australian: '🇦🇺', Canadian: '🇨🇦', Argentine: '🇦🇷', 'New Zealander': '🇳🇿',
  Belgian: '🇧🇪', Mexican: '🇲🇽', Danish: '🇩🇰', Thai: '🇹🇭', Portuguese: '🇵🇹',
  Icelandic: '🇮🇸', Chinese: '🇨🇳', 'South African': '🇿🇦',
}

const TEAM_COLORS: Record<string, string> = {
  ferrari: '#DC0000', mclaren: '#FF8000', mercedes: '#00D2BE',
  red_bull: '#1E3A8A', williams: '#005AFF', aston_martin: '#006F62',
  alpine: '#0090FF', haas: '#B6BABD', sauber: '#52E252', rb: '#6692FF',
  lotus: '#FFD700', renault: '#FFD700', benetton: '#009944', brawn: '#BFFF00',
  tyrrell: '#1565C0', brabham: '#4A90D9', cooper: '#2E7D32', matra: '#1565C0',
  brm: '#1B5E20', maserati: '#1A3A5C', jordan: '#FFD700', force_india: '#FF80C7',
  racing_point: '#FF80C7', alfa_romeo: '#900000', toro_rosso: '#C00000',
  minardi: '#222', bar: '#800080', jaguar: '#006600', honda: '#999',
  toyota: '#CC0000', arrows: '#FF6600', ligier: '#003399', wolf: '#8B0000',
  march: '#CC0000', stewart: '#FFFFFF', prost: '#003399',
}

function groupByTeam(history: DriverCareerSeason[]) {
  if (!history.length) return []
  const sorted = [...history].sort((a, b) => a.season - b.season)
  const groups: Array<{
    constructorId: string
    constructorName: string
    startYear: number
    endYear: number
    seasons: DriverCareerSeason[]
  }> = []

  let cur = {
    constructorId: sorted[0].constructorId,
    constructorName: sorted[0].constructorName,
    startYear: sorted[0].season,
    endYear: sorted[0].season,
    seasons: [sorted[0]],
  }

  for (let i = 1; i < sorted.length; i++) {
    const s = sorted[i]
    if (s.constructorId === cur.constructorId) {
      cur.seasons.push(s)
      cur.endYear = s.season
    } else {
      groups.push(cur)
      cur = {
        constructorId: s.constructorId,
        constructorName: s.constructorName,
        startYear: s.season,
        endYear: s.season,
        seasons: [s],
      }
    }
  }
  groups.push(cur)
  return groups.reverse()
}

export default function GenericDriverPage({
  jolpicaId: _id,
  givenName,
  familyName,
  nationality,
  permanentNumber,
  dateOfBirth,
  currentTeamName,
  currentTeamColor,
  liveStats,
  currentStanding,
  careerHistory,
}: GenericDriverPageProps) {
  const color = currentTeamColor ?? '#888'
  const teamGroups = groupByTeam(careerHistory)
  const flag = FLAGS[nationality] ?? ''
  const birthYear = dateOfBirth ? new Date(dateOfBirth).getFullYear() : null
  const isRetired = !currentStanding && !currentTeamName

  const statItems = liveStats
    ? [
        { label: 'RACES',   value: liveStats.races.toLocaleString() },
        { label: 'WINS',    value: liveStats.wins.toLocaleString() },
        { label: 'POLES',   value: liveStats.poles.toLocaleString() },
        { label: 'PODIUMS', value: liveStats.podiums.toLocaleString() },
        { label: 'WDC',     value: liveStats.championships > 0 ? `×${liveStats.championships}` : '—' },
      ]
    : []

  const latestSeason = careerHistory.length
    ? careerHistory.reduce((a, b) => (a.season > b.season ? a : b))
    : null

  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#e0e0e0', fontFamily: 'var(--font-mono)' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <header style={{ padding: '64px 40px 44px', borderBottom: `1px solid ${color}28` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 10, letterSpacing: '0.2em', color: color, marginBottom: 14, opacity: 0.8 }}>
            {isRetired ? 'FORMULA 1 · RETIRED' : 'FORMULA 1 DRIVER'} · {nationality.toUpperCase()} {flag}
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
            <h1 style={{
              fontSize: 'clamp(30px, 5vw, 58px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: 0,
              lineHeight: 1.05,
            }}>
              {givenName.toUpperCase()} {familyName.toUpperCase()}
            </h1>
            {permanentNumber && (
              <span style={{
                fontSize: 'clamp(28px, 4vw, 50px)',
                fontWeight: 700,
                color: color,
                opacity: 0.55,
                lineHeight: 1.1,
                marginBottom: 2,
              }}>
                #{permanentNumber}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {currentTeamName && (
              <p style={{ fontSize: 11, letterSpacing: '0.15em', color: color, margin: 0 }}>
                {currentTeamName.toUpperCase()}
              </p>
            )}
            {(liveStats?.championships ?? 0) > 0 && (
              <p style={{ fontSize: 11, letterSpacing: '0.15em', color: '#999', margin: 0 }}>
                {liveStats!.championships}× WORLD CHAMPION
              </p>
            )}
            {birthYear && (
              <p style={{ fontSize: 11, letterSpacing: '0.15em', color: '#444', margin: 0 }}>
                B. {birthYear}
              </p>
            )}
          </div>
          <div style={{ height: 3, background: color, width: 72, marginTop: 28, borderRadius: 1 }} />
        </div>
      </header>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
      {statItems.length > 0 && (
        <section style={{ borderBottom: '1px solid #181818', padding: '24px 40px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap' }}>
            {statItems.map((s, i) => (
              <div key={s.label} style={{
                flex: '1 0 100px',
                padding: '12px 22px',
                borderLeft: i === 0 ? '1px solid #222' : undefined,
                borderRight: '1px solid #222',
              }}>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#555', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.value}</div>
              </div>
            ))}
            <div style={{ flex: '1 0 100px', padding: '12px 22px', borderRight: '1px solid #222' }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#555', marginBottom: 6 }}>SOURCE</div>
              <div style={{ fontSize: 9, color: '#2ecc71', letterSpacing: '0.1em' }}>● JOLPICA · LIVE</div>
            </div>
          </div>
        </section>
      )}

      {/* ── Season card + team groups ─────────────────────────────────────── */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '40px 40px',
        display: 'grid',
        gridTemplateColumns: teamGroups.length > 0 ? '1fr 1fr' : '1fr',
        gap: 40,
      }}>

        {/* Current / latest season */}
        {(currentStanding || latestSeason) && (
          <section>
            <p style={{ fontSize: 9, letterSpacing: '0.2em', color: '#555', marginBottom: 18 }}>
              {currentStanding ? currentStanding.season : latestSeason!.season} SEASON
            </p>
            <div style={{
              padding: '24px',
              border: `1px solid ${color}38`,
              borderRadius: 4,
              background: `${color}07`,
            }}>
              <div style={{ fontSize: 9, color: '#555', letterSpacing: '0.15em', marginBottom: 8 }}>
                CHAMPIONSHIP POSITION
              </div>
              <div style={{ fontSize: 46, fontWeight: 700, color: color, lineHeight: 1, marginBottom: 14 }}>
                P{currentStanding?.position ?? latestSeason?.position ?? '—'}
              </div>
              <div style={{ display: 'flex', gap: 28 }}>
                <div>
                  <div style={{ fontSize: 9, color: '#444', letterSpacing: '0.15em', marginBottom: 4 }}>POINTS</div>
                  <div style={{ fontSize: 18, color: '#ccc' }}>
                    {currentStanding?.points ?? latestSeason?.points ?? '—'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: '#444', letterSpacing: '0.15em', marginBottom: 4 }}>WINS</div>
                  <div style={{ fontSize: 18, color: '#ccc' }}>
                    {currentStanding?.wins ?? latestSeason?.wins ?? '—'}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Career team stints */}
        {teamGroups.length > 0 && (
          <section>
            <p style={{ fontSize: 9, letterSpacing: '0.2em', color: '#555', marginBottom: 18 }}>
              CAREER · TEAM STINTS
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {teamGroups.map(g => {
                const bestPos = Math.min(...g.seasons.map(s => s.position || 99))
                const totalWins = g.seasons.reduce((sum, s) => sum + (s.wins || 0), 0)
                const isChamp = bestPos === 1
                const stintColor = TEAM_COLORS[g.constructorId] ?? '#888'
                return (
                  <div
                    key={`${g.constructorId}-${g.startYear}`}
                    style={{
                      padding: '11px 14px',
                      background: isChamp ? `${stintColor}10` : '#0d0d0d',
                      border: `1px solid ${isChamp ? stintColor + '30' : '#1c1c1c'}`,
                      borderRadius: 3,
                      display: 'grid',
                      gridTemplateColumns: '90px 1fr auto',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <span style={{ fontSize: 10, color: '#555' }}>
                      {g.startYear === g.endYear ? g.startYear : `${g.startYear}–${g.endYear}`}
                    </span>
                    <span style={{
                      fontSize: 10,
                      color: isChamp ? '#fff' : '#888',
                      letterSpacing: '0.05em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {g.constructorName.toUpperCase()}
                    </span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      {isChamp && (
                        <span style={{ fontSize: 9, color: stintColor, letterSpacing: '0.1em' }}>WDC ★</span>
                      )}
                      {totalWins > 0 && (
                        <span style={{ fontSize: 9, color: '#555' }}>{totalWins}W</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>

      {/* ── Season-by-season grid ─────────────────────────────────────────── */}
      {careerHistory.length > 0 && (
        <section style={{ padding: '0 40px 64px', maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 9, letterSpacing: '0.2em', color: '#555', marginBottom: 18 }}>
            SEASON-BY-SEASON · WDC FINISHES
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 5 }}>
            {[...careerHistory].sort((a, b) => b.season - a.season).map(s => (
              <div
                key={s.season}
                style={{
                  padding: '9px 13px',
                  background: s.position === 1 ? `${TEAM_COLORS[s.constructorId] ?? color}14` : '#0d0d0d',
                  border: `1px solid ${s.position === 1 ? (TEAM_COLORS[s.constructorId] ?? color) + '35' : '#191919'}`,
                  borderRadius: 3,
                  display: 'grid',
                  gridTemplateColumns: '38px 1fr 30px',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 10, color: '#555' }}>{s.season}</span>
                <span style={{
                  fontSize: 9,
                  color: s.position <= 3 ? '#888' : '#444',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {s.constructorName}
                </span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: s.position === 1
                    ? (TEAM_COLORS[s.constructorId] ?? color)
                    : s.position <= 3 ? '#fff' : '#555',
                  textAlign: 'right',
                }}>
                  {s.position ? `P${s.position}` : '—'}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

    </main>
  )
}
