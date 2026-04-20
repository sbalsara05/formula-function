import Link from 'next/link'
import CyclingReel from '@/components/driver/CyclingReel'
import type {
  Team,
  TeamStats,
  TeamEngineeringEra,
  TeamSignatureBar,
  TeamAcademyDriver,
  TeamIconicCar,
  ReelSlide,
  Series,
} from '@/lib/types'

/* ─── Live standings types (exported for route to import) ─────────────────── */

export interface ConstructorStandingEntry {
  position: string
  points: string
  wins: string
  Constructor: {
    constructorId: string
    name: string
    nationality: string
  }
}

export interface StandingsMeta {
  season: string
  round: string
}

/* ─── Rating color map ─────────────────────────────────────────────────────── */

const RATING_COLOR: Record<string, string> = {
  EXCEPTIONAL: '#FFD700',
  CRITICAL: '#DC0000',
  HIGH: '#DC0000',
  MODERATE: '#888',
  INCONSISTENT: '#FF1E56',
  STRONG: '#5FB87C',
  CONSERVATIVE: '#4A90D9',
  'BEST-IN-CLASS': '#FFD700',
  LOW: '#555',
}

/* ─── Header ──────────────────────────────────────────────────────────────── */

function TeamHeader({ team, series }: { team: Team; series: Series }) {
  const seriesNum = series.replace('f', '')
  return (
    <div style={{
      padding: '1rem 1.75rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderBottom: '0.5px solid #1a1a1a',
      background: 'rgba(0,0,0,0.7)',
      position: 'relative', zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, letterSpacing: -0.5 }}>f(x)</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#666' }}>
          <Link href={`/f/${seriesNum}`} style={{ textDecoration: 'none', color: 'inherit' }}>f({seriesNum})</Link>
          <span style={{ color: '#333' }}>/</span>
          <span>TEAMS</span>
          <span style={{ color: '#333' }}>/</span>
          <span style={{ color: '#aaa' }}>{team.shortName.toUpperCase()}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{ background: 'transparent', border: '0.5px solid #2a2a2a', color: '#aaa', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>
          COMPARE ↗
        </button>
        <button style={{ background: 'transparent', border: `0.5px solid ${team.liveryHex}88`, color: team.liveryHex, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>
          ANALYZE A CAR ↗
        </button>
        <button style={{ background: 'transparent', border: '0.5px solid #2a2a2a', color: '#aaa', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>
          SHARE
        </button>
      </div>
    </div>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */

function TeamHero({ team, stats, reelSlides, entityHex, isLive }: {
  team: Team; stats: TeamStats; reelSlides: ReelSlide[]; entityHex: string; isLive?: boolean
}) {
  return (
    <div style={{ position: 'relative', width: '100%', height: 620, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #000 0%, #1a0000 25%, #2a0606 50%, #1a0000 78%, #000 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 60% 50%, ${entityHex} 0%, ${entityHex} 10%, transparent 45%)`, opacity: 0.45 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 80%, transparent 30%, #000 85%)' }} />

      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.22 }} viewBox="0 0 800 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><filter id="ferG"><feGaussianBlur stdDeviation="3" /></filter></defs>
        <g filter="url(#ferG)">
          <path d="M 0 140 Q 200 100, 400 180 T 800 160" stroke={entityHex} strokeWidth={1} fill="none" />
          <path d="M 0 480 Q 300 520, 550 460 T 800 500" stroke="#8B0000" strokeWidth={1} fill="none" />
        </g>
      </svg>

      <CyclingReel slides={reelSlides} traceColor={entityHex} left="48%" borderColor={entityHex + '55'} />

      <div style={{ position: 'absolute', top: '50%', left: '5%', transform: 'translateY(-50%)', maxWidth: '40%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: entityHex, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#aaa' }}>
            FORMULA 1 · ACTIVE SINCE {stats.firstSeason}
          </span>
        </div>
        <p style={{ fontSize: 14, color: '#888', margin: '0 0 4px', letterSpacing: 0.5 }}>
          {team.name.replace(team.shortName, '').trim() || 'Scuderia'}
        </p>
        <h1 style={{ fontSize: 68, fontWeight: 400, margin: 0, letterSpacing: -2.5, lineHeight: 0.9, color: '#fff' }}>
          {team.shortName}
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#888', margin: '18px 0 0', letterSpacing: 1 }}>
          {team.country.toUpperCase()} · FOUNDED {team.founded}
        </p>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: '#bbb', fontStyle: 'italic', lineHeight: 1.6, margin: '18px 0 0', maxWidth: 380 }}>
          {team.bio}
        </p>
        {team.quote && (
          <div style={{ margin: '18px 0 0', padding: '10px 0 0', borderTop: `0.5px solid ${entityHex}44` }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: entityHex + 'cc', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
              &ldquo;{team.quote}&rdquo;
            </p>
            {team.quoteContext && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: '6px 0 0', letterSpacing: 1 }}>
                — {team.quoteContext.toUpperCase()}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Stats strip */}
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, padding: '0 1.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 28 }}>
          {[
            { label: 'CONSTRUCTORS', value: stats.constructorsTitles.toString(), sub: 'MOST IN HISTORY', accent: true },
            { label: "DRIVERS' TITLES", value: stats.driversTitles.toString(), sub: `${stats.driversTitles} WORLD CHAMPIONS`, accent: true },
            { label: 'RACE WINS', value: stats.wins.toString(), sub: 'ALL-TIME 1ST' },
            { label: 'PODIUMS', value: stats.podiums.toString(), sub: 'ALL-TIME 1ST' },
            { label: 'SEASONS', value: stats.seasons.toString(), sub: `${stats.firstSeason}–PRESENT` },
          ].map((stat, i) => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              {i > 0 && <div style={{ width: 0.5, height: 40, background: '#2a2a2a', marginRight: -14 }} />}
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#888', margin: '0 0 4px' }}>{stat.label}</p>
                <p style={{ fontSize: 26, fontWeight: 400, margin: 0, letterSpacing: -1, color: stat.accent ? entityHex : '#fff' }}>{stat.value}</p>
                {stat.sub && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#666', margin: '2px 0 0' }}>{stat.sub}</p>}
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 1.5, margin: 0,
          color: isLive ? '#5FB87C' : '#555',
        }}>
          {isLive ? '● FIGURES LIVE VIA JOLPICA API · UPDATES EVERY 24H' : '○ STATIC FIGURES · API UNAVAILABLE'}
        </p>
      </div>
    </div>
  )
}

/* ─── Live standings section ──────────────────────────────────────────────── */

function CurrentSeasonSection({
  standings, meta, jolpicaId, entityHex,
}: {
  standings: ConstructorStandingEntry[]
  meta: StandingsMeta
  jolpicaId: string
  entityHex: string
}) {
  if (!standings.length) return null
  const maxPts = Math.max(...standings.map(s => parseFloat(s.points) || 0), 1)
  const thisEntry = standings.find(s => s.Constructor.constructorId === jolpicaId)

  return (
    <section style={{ padding: '0 1.75rem 2.5rem', borderTop: '0.5px solid #1a1a1a' }}>
      <div style={{ paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: entityHex, margin: 0 }}>
            CURRENT SEASON
          </p>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 1,
            color: '#5FB87C', background: '#5FB87C18', border: '0.5px solid #5FB87C44',
            padding: '2px 7px', borderRadius: 3,
          }}>
            LIVE
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', margin: 0 }}>
          {meta.season} SEASON · AFTER ROUND {meta.round} · JOLPICA API
        </p>
      </div>

      {thisEntry && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '14px 16px', borderRadius: 8, marginBottom: 16,
          background: entityHex + '14', border: `0.5px solid ${entityHex}44`,
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 400, color: entityHex, letterSpacing: -1, lineHeight: 1, minWidth: 52 }}>
            P{thisEntry.position}
          </span>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#777', letterSpacing: 1, margin: '0 0 3px' }}>WCC STANDING</p>
            <p style={{ fontSize: 20, fontWeight: 400, color: '#fff', margin: 0, letterSpacing: -0.5 }}>
              {parseFloat(thisEntry.points)} pts &nbsp;·&nbsp; {thisEntry.wins} wins
            </p>
          </div>
          <div style={{ flex: 1, height: 4, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden', marginLeft: 8 }}>
            <div style={{ width: `${(parseFloat(thisEntry.points) / maxPts) * 100}%`, height: '100%', background: entityHex }} />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {standings.map(s => {
          const isThis = s.Constructor.constructorId === jolpicaId
          const pts = parseFloat(s.points) || 0
          return (
            <div key={s.Constructor.constructorId} style={{
              display: 'grid', gridTemplateColumns: '30px 160px 1fr 56px 28px',
              alignItems: 'center', gap: 10,
              padding: '7px 10px', borderRadius: 5,
              background: isThis ? entityHex + '10' : 'transparent',
              border: `0.5px solid ${isThis ? entityHex + '33' : '#0e0e0e'}`,
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: isThis ? entityHex : '#444', textAlign: 'right' }}>
                P{s.position}
              </span>
              <span style={{ fontSize: 11, color: isThis ? '#fff' : '#666', fontWeight: isThis ? 500 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {s.Constructor.name}
              </span>
              <div style={{ height: 2, background: '#111', borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ width: `${(pts / maxPts) * 100}%`, height: '100%', background: isThis ? entityHex : '#2a2a2a' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: isThis ? '#ccc' : '#444', textAlign: 'right' }}>
                {pts}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#333', textAlign: 'right' }}>
                {s.wins}W
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ─── Eras ────────────────────────────────────────────────────────────────── */

function ErasSection({ eras, entityHex }: { eras: TeamEngineeringEra[]; entityHex: string }) {
  return (
    <div style={{ padding: '2rem 1.75rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: entityHex, margin: 0 }}>
          ENGINEERING ERAS
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#555' }}>
          {eras.length} CHAPTERS · {eras[0]?.seasons?.split('–')[0] ?? ''}–PRESENT
        </p>
      </div>
      <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
        The story told through engineering leadership and the chapters they defined.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${eras.length}, 1fr)`, gap: 10 }}>
        {eras.map((era, idx) => {
          const glowColor = era.golden ? '#FFD700' : entityHex
          const champColor = era.championships === 0 ? '#888' : era.golden ? '#FFD700' : entityHex
          const badgeLabel = era.golden ? `ERA 0${idx + 1} · GOLDEN` : era.current ? `ERA 0${idx + 1} · CURRENT` : `ERA 0${idx + 1}`
          return (
            <div key={era.label} style={{
              aspectRatio: '4/5',
              background: 'linear-gradient(180deg, #1a0000 0%, #000 100%)',
              border: `0.5px solid ${era.golden ? '#FFD70044' : '#3a0000'}`,
              borderRadius: 8, overflow: 'hidden', position: 'relative', padding: 14,
            }}>
              {era.golden && (
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, #FFD700 0%, #FFD700 18%, transparent 55%)', opacity: 0.35 }} />
              )}
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% ${era.golden ? '45%' : '30%'}, ${glowColor} 0%, ${glowColor} 20%, transparent 60%)`, opacity: era.golden ? 0.7 : 0.55 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, transparent 35%, #000 92%)' }} />
              <div style={{ position: 'relative' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#FFD700', letterSpacing: 1, margin: 0 }}>{badgeLabel}</p>
                <p style={{ fontSize: 15, color: '#fff', fontWeight: 500, margin: '8px 0 4px' }}>{era.label}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: era.golden ? '#FFD700' : entityHex, letterSpacing: 0.5, margin: 0 }}>{era.seasons}</p>
              </div>
              <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
                {era.driverNames && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#888', letterSpacing: 0.5, margin: '0 0 4px' }}>
                    {era.driverNames}
                  </p>
                )}
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: champColor, margin: 0, fontWeight: 500 }}>
                  {era.champLabel ?? (era.championships > 0 ? `${era.championships}× WDC` : 'NO TITLES')}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Signature ───────────────────────────────────────────────────────────── */

function SignatureSection({ bars, entityHex }: { bars: TeamSignatureBar[]; entityHex: string }) {
  return (
    <div style={{ padding: '0 1.75rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: entityHex, margin: 0 }}>
          ENGINEERING SIGNATURE
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#555' }}>MODERN ERA · 2014–PRESENT</p>
      </div>
      <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
        The character of the cars built. Aggregated across chassis performance patterns in the hybrid era.
      </p>

      <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: 32 }}>
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 4px' }}>THE CAR CHARACTER</p>
          <p style={{ fontSize: 15, color: '#ccc', margin: 0, fontWeight: 400 }}>
            High-downforce, qualifying-oriented cars. Strong one-lap pace, historically weaker race stint management. Mechanical grip advantage in wet conditions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {bars.map((bar) => {
            const barColor = RATING_COLOR[bar.rating] ?? '#888'
            return (
              <div key={bar.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: '#ccc' }}>{bar.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: barColor, letterSpacing: 1 }}>{bar.rating}</span>
                </div>
                <div style={{ height: 4, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${bar.value}%`, height: '100%', background: barColor }} />
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', margin: '4px 0 0', letterSpacing: 0.5 }}>
                  {bar.caption}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ─── Academy ─────────────────────────────────────────────────────────────── */

function AcademySection({ academy, entityHex }: { academy: TeamAcademyDriver[]; entityHex: string }) {
  const f1Drivers = academy.filter(d => d.tier === 'f1')
  const juniors = academy.filter(d => d.tier === 'junior')
  const alumni = academy.filter(d => d.tier === 'alumni')

  return (
    <div style={{ padding: '0 1.75rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: entityHex, margin: 0 }}>
          DRIVER ACADEMY · FDA
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#555' }}>PIPELINE · 2025</p>
      </div>
      <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
        Ferrari Driver Academy since 2009. Graduates include Leclerc, Bianchi, Bearman, and others who&apos;ve risen through the junior pyramid.
      </p>

      <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: entityHex, margin: '0 0 12px' }}>CURRENT · F1</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {f1Drivers.map((d, i) => (
                <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '6px 0', borderBottom: i < f1Drivers.length - 1 ? '0.5px solid #1a1a1a' : 'none' }}>
                  <span style={{ color: '#fff' }}>{d.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#888', fontSize: 9 }}>{d.note}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#888', margin: '0 0 12px' }}>CURRENT · F2 / F3</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {juniors.map((d, i) => (
                <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '6px 0', borderBottom: i < juniors.length - 1 ? '0.5px solid #1a1a1a' : 'none' }}>
                  <span style={{ color: '#ccc' }}>{d.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#666', fontSize: 9 }}>{d.note}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 12px' }}>NOTABLE ALUMNI</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {alumni.map((d, i) => (
                <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '6px 0', borderBottom: i < alumni.length - 1 ? '0.5px solid #1a1a1a' : 'none' }}>
                  <span style={{ color: '#aaa' }}>{d.deceased ? `${d.name} †` : d.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#666', fontSize: 9 }}>{d.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Iconic Cars ─────────────────────────────────────────────────────────── */

function IconicCarsSection({ cars, entityHex }: { cars: TeamIconicCar[]; entityHex: string }) {
  return (
    <div style={{ padding: '0 1.75rem 3rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: entityHex, margin: 0 }}>ICONIC CARS</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#555' }}>THE CHASSIS ARCHIVE</p>
      </div>
      <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
        {cars.length} chassis that defined an era.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {cars.map((car) => (
          <div key={car.name} style={{
            aspectRatio: '16/10',
            background: 'linear-gradient(135deg, #1a0000, #000)',
            border: `0.5px solid ${car.peak ? '#FFD70044' : '#3a0000'}`,
            borderRadius: 6, overflow: 'hidden', position: 'relative', cursor: 'pointer',
          }}>
            {car.peak && (
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, #FFD700 0%, transparent 50%)', opacity: 0.25 }} />
            )}
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at ${car.peak ? '50% 55%' : '50% 50%'}, ${entityHex} 0%, transparent 60%)`, opacity: car.peak ? 0.65 : 0.55 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, transparent 35%, #000 92%)' }} />
            <div style={{ position: 'absolute', top: 10, left: 12, fontFamily: 'var(--font-mono)', fontSize: 9, color: car.peak ? '#FFD700' : entityHex, letterSpacing: 1 }}>
              {car.peak ? `${car.name} · PEAK` : car.name}
            </div>
            <div style={{ position: 'absolute', top: 10, right: 12, fontFamily: 'var(--font-mono)', fontSize: 8, color: '#FFD700', letterSpacing: 1 }}>
              {car.year}
            </div>
            <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
              <p style={{ fontSize: 12, color: '#fff', margin: 0, fontWeight: 500 }}>{car.subtitle}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#888', margin: '2px 0 0', letterSpacing: 0.5 }}>{car.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── TeamPage ─────────────────────────────────────────────────────────────── */

export interface LiveTeamStats {
  wins: number
  podiums: number
  wccTitles: number
  seasons: number
}

export interface TeamPageProps {
  team: Team
  stats: TeamStats
  eras: TeamEngineeringEra[]
  signatureBars: TeamSignatureBar[]
  reelSlides: ReelSlide[]
  academy: TeamAcademyDriver[]
  iconicCars: TeamIconicCar[]
  series: Series
  liveStats?: LiveTeamStats
  currentStandings?: ConstructorStandingEntry[]
  standingsMeta?: StandingsMeta
  jolpicaId?: string
}

export default function TeamPage({
  team, stats, eras, signatureBars, reelSlides, academy, iconicCars, series,
  liveStats, currentStandings = [], standingsMeta = { season: '', round: '' }, jolpicaId = '',
}: TeamPageProps) {
  const entityHex = team.liveryHex

  // Merge live API stats over static mock — live wins the moment it arrives
  const mergedStats: TeamStats = {
    ...stats,
    wins:               liveStats?.wins       ?? stats.wins,
    podiums:            liveStats?.podiums     ?? stats.podiums,
    constructorsTitles: liveStats?.wccTitles   ?? stats.constructorsTitles,
    seasons:            liveStats?.seasons     ?? stats.seasons,
  }

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', ['--color-entity' as string]: entityHex } as React.CSSProperties}>
      <TeamHeader team={team} series={series} />
      <TeamHero team={team} stats={mergedStats} reelSlides={reelSlides} entityHex={entityHex} isLive={!!liveStats} />
      <CurrentSeasonSection
        standings={currentStandings}
        meta={standingsMeta}
        jolpicaId={jolpicaId}
        entityHex={entityHex}
      />
      <ErasSection eras={eras} entityHex={entityHex} />
      <SignatureSection bars={signatureBars} entityHex={entityHex} />
      <AcademySection academy={academy} entityHex={entityHex} />
      <IconicCarsSection cars={iconicCars} entityHex={entityHex} />

      <div style={{ padding: '1rem 1.75rem 2rem', textAlign: 'center', borderTop: '0.5px solid #1a1a1a' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#333' }}>
          SCROLL · FULL DRIVER LIST · SEASON BY SEASON
        </p>
        <div style={{ width: 1, height: 20, background: 'linear-gradient(to bottom, #333, transparent)', margin: '8px auto 0' }} />
      </div>
    </div>
  )
}
