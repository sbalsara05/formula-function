import Link from 'next/link'
import CyclingReel from '@/components/driver/CyclingReel'
import type {
  Team,
  ReelSlide,
  TeamSignatureBar,
  PremaStats,
  PremaGraduate,
  PremaCurrentSeason,
  Series,
} from '@/lib/types'

/* ─── Rating color map ─────────────────────────────────────────────────────── */

const RATING_COLOR: Record<string, string> = {
  STRONG: '#00E5FF',
  HIGH: '#00E5FF',
  EXCEPTIONAL: '#00E5FF',
  'BEST-IN-CLASS': '#FFD700',
  CONSERVATIVE: '#888',
  MODERATE: '#888',
  LOW: '#555',
}

/* ─── Header ───────────────────────────────────────────────────────────────── */

function PremaHeader({ series }: { series: Series }) {
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
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, letterSpacing: -0.5 }}>
            f(x)
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#666' }}>
          <Link href={`/f/${seriesNum}`} style={{ textDecoration: 'none', color: 'inherit' }}>f({seriesNum})</Link>
          <span style={{ color: '#333' }}>/</span>
          <span>TEAMS</span>
          <span style={{ color: '#333' }}>/</span>
          <span style={{ color: '#aaa' }}>PREMA RACING</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{
          background: 'transparent', border: '0.5px solid #2a2a2a', color: '#aaa',
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
          padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
        }}>
          COMPARE ↗
        </button>
        <button style={{
          background: 'transparent',
          border: '0.5px solid #007a8a',
          color: '#00E5FF',
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
          padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
        }}>
          ANALYZE A LAP ↗
        </button>
        <button style={{
          background: 'transparent', border: '0.5px solid #2a2a2a', color: '#aaa',
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
          padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
        }}>
          SHARE
        </button>
      </div>
    </div>
  )
}

/* ─── Hero ─────────────────────────────────────────────────────────────────── */

function PremaHero({
  team, stats, reelSlides,
}: {
  team: Team
  stats: PremaStats
  reelSlides: ReelSlide[]
}) {
  return (
    <div style={{ position: 'relative', width: '100%', height: 620, overflow: 'hidden' }}>
      {/* Hero background — dark teal gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #000 0%, #001a20 25%, #002a35 50%, #001a20 78%, #000 100%)' }} />
      {/* Cyan glow at 60% 50% */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 50%, #00E5FF 0%, #00E5FF 10%, transparent 45%)', opacity: 0.35 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 80%, transparent 30%, #000 85%)' }} />

      {/* Decorative lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} viewBox="0 0 800 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><filter id="premaG"><feGaussianBlur stdDeviation="3" /></filter></defs>
        <g filter="url(#premaG)">
          <path d="M 0 140 Q 200 100, 400 180 T 800 160" stroke="#00E5FF" strokeWidth={1} fill="none" />
          <path d="M 0 480 Q 300 520, 550 460 T 800 500" stroke="#9B59B6" strokeWidth={1} fill="none" />
        </g>
      </svg>

      {/* Cycling reel */}
      <CyclingReel
        slides={reelSlides}
        traceColor="#00E5FF"
        left="48%"
        borderColor="#003a47"
      />

      {/* Identity — left zone */}
      <div style={{
        position: 'absolute', top: '50%', left: '5%',
        transform: 'translateY(-50%)', maxWidth: '40%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E5FF', display: 'inline-block' }} />
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#9B59B6', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#aaa' }}>
            FORMULA 2 · FORMULA 3 · ACTIVE SINCE 1983
          </span>
        </div>
        <p style={{ fontSize: 14, color: '#888', margin: '0 0 4px', letterSpacing: 0.5 }}>
          Scuderia
        </p>
        <h1 style={{ fontSize: 68, fontWeight: 400, margin: 0, letterSpacing: -2.5, lineHeight: 0.9, color: '#fff' }}>
          Prema
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#888', margin: '18px 0 0', letterSpacing: 1 }}>
          ITALY · FOUNDED 1983
        </p>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: '#bbb', fontStyle: 'italic', lineHeight: 1.6, margin: '18px 0 0', maxWidth: 380 }}>
          {team.bio}
        </p>
      </div>

      {/* Stats strip */}
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, padding: '0 1.75rem', display: 'flex', justifyContent: 'center', gap: 28 }}>
        {[
          { label: 'F2 TITLES', value: stats.f2Titles.toString(), sub: 'DOMINANT PIPELINE', accent: true, accentColor: '#00E5FF' },
          { label: 'F3 TITLES', value: stats.f3TitlesSince2019.toString(), sub: 'SINCE 2019', accent: true, accentColor: '#9B59B6' },
          { label: 'F1 GRADUATES', value: stats.f1Graduates.toString(), sub: 'ALUMNI IN F1', accent: true, accentColor: '#FFD700' },
          { label: 'F2 WINS', value: stats.f2Wins.toString(), sub: 'ALL-TIME' },
          { label: 'GRADUATION RATE', value: stats.graduationRatePct.toString(), sub: 'F2 → F1 %', valueSuffix: '%' },
        ].map((stat, i) => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {i > 0 && <div style={{ width: 0.5, height: 40, background: '#2a2a2a', marginRight: -14 }} />}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#888', margin: '0 0 4px' }}>
                {stat.label}
              </p>
              <p style={{ fontSize: 26, fontWeight: 400, margin: 0, letterSpacing: -1, color: stat.accent ? stat.accentColor : '#fff' }}>
                {stat.value}{stat.valueSuffix && <span style={{ fontSize: 14 }}>{stat.valueSuffix}</span>}
              </p>
              {stat.sub && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#666', margin: '2px 0 0' }}>
                  {stat.sub}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Graduate Alumni ──────────────────────────────────────────────────────── */

function GraduateAlumniSection({ graduates }: { graduates: PremaGraduate[] }) {
  return (
    <div style={{ padding: '2rem 1.75rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#00E5FF', margin: 0 }}>
          GRADUATE ALUMNI
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#555' }}>F1 PIPELINE · 2017–PRESENT</p>
      </div>
      <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
        Prema has produced more F1-bound graduates than any other junior team in the modern era.
      </p>

      <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 0.8fr 0.8fr 1fr 1fr 0.6fr',
          padding: '10px 20px',
          borderBottom: '0.5px solid #1a1a1a',
          background: '#0a0a0a',
        }}>
          {['DRIVER', 'F3', 'F2', 'GRADUATED TO', 'CURRENT', 'STATUS'].map((col) => (
            <span key={col} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555' }}>
              {col}
            </span>
          ))}
        </div>

        {/* Data rows */}
        {graduates.map((g, i) => (
          <div
            key={g.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 0.8fr 0.8fr 1fr 1fr 0.6fr',
              padding: '12px 20px',
              borderBottom: i < graduates.length - 1 ? '0.5px solid #111' : 'none',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 13, color: '#fff' }}>{g.name}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#888' }}>{g.f3Result}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#888' }}>{g.f2Result}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: g.graduatedToColor, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#ccc' }}>{g.graduatedTo}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: g.currentColor, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#ccc' }}>{g.current}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: g.statusColor, letterSpacing: 0.5 }}>{g.status}</span>
          </div>
        ))}

        {/* Show all button */}
        <div style={{ padding: '12px 20px', borderTop: '0.5px solid #1a1a1a', textAlign: 'center' }}>
          <button style={{
            background: 'transparent',
            border: '0.5px solid #2a2a2a',
            color: '#00E5FF',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: 1,
            padding: '8px 20px',
            borderRadius: 4,
            cursor: 'pointer',
          }}>
            Show all graduates ↗
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Operational Signature ────────────────────────────────────────────────── */

function OperationalSignatureSection({ bars }: { bars: TeamSignatureBar[] }) {
  return (
    <div style={{ padding: '0 1.75rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#00E5FF', margin: 0 }}>
          OPERATIONAL SIGNATURE
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#555' }}>F2 / F3 · 2019–PRESENT</p>
      </div>
      <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
        The character of how Prema operates. Aggregated from F2 and F3 telemetry and team performance data across the modern era.
      </p>

      <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: 32 }}>
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 4px' }}>THE TEAM CHARACTER</p>
          <p style={{ fontSize: 15, color: '#ccc', margin: 0, fontWeight: 400 }}>
            Excellent qualifying setup, strong race pace conversion, and unmatched rookie development. Conservative strategy approach prioritizes consistency over gamble. Best-in-class F1 graduation rate speaks to pipeline quality above all else.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: '10px 0 0', letterSpacing: 0.5 }}>
            SIGNATURE AXES DERIVED FROM 2019–2025 F2 AND F3 SEASON DATA
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
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: '16px 0 0', letterSpacing: 0.5, textAlign: 'center' }}>
          SIX-AXIS OPERATIONAL FINGERPRINT · 2019–2025 AVERAGE
        </p>
      </div>
    </div>
  )
}

/* ─── Current Season ───────────────────────────────────────────────────────── */

function CurrentSeasonSection({ season }: { season: PremaCurrentSeason }) {
  const columns = [
    { key: 'f2' as const, label: 'F2 LINEUP', dotColor: '#00E5FF', drivers: season.f2 },
    { key: 'f3' as const, label: 'F3 LINEUP', dotColor: '#9B59B6', drivers: season.f3 },
    { key: 'f1Academy' as const, label: 'F1 ACADEMY', dotColor: '#FF1E8C', drivers: season.f1Academy },
  ]

  return (
    <div style={{ padding: '0 1.75rem 3rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#00E5FF', margin: 0 }}>
          2025 SEASON
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#555' }}>PREMA DRIVER LINEUP</p>
      </div>
      <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
        Prema's active programs spanning Formula 2, Formula 3, and the F1 Academy in the 2025 season.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {columns.map((col) => (
          <div key={col.key} style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: col.dotColor, display: 'inline-block', flexShrink: 0 }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: col.dotColor, margin: 0 }}>
                {col.label}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.drivers.map((driver, i) => (
                <div
                  key={driver.name}
                  style={{
                    padding: '10px 12px',
                    background: '#0a0a0a',
                    border: '0.5px solid #1a1a1a',
                    borderRadius: 6,
                  }}
                >
                  <p style={{ fontSize: 13, color: '#fff', margin: '0 0 4px', fontWeight: 400 }}>
                    {driver.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: 0, letterSpacing: 1 }}>
                    {driver.academy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── PremaPage ────────────────────────────────────────────────────────────── */

export interface PremaPageProps {
  team: Team
  stats: PremaStats
  reelSlides: ReelSlide[]
  signatureBars: TeamSignatureBar[]
  graduates: PremaGraduate[]
  currentSeason: PremaCurrentSeason
  series: Series
}

export default function PremaPage({
  team, stats, reelSlides, signatureBars, graduates, currentSeason, series,
}: PremaPageProps) {
  return (
    <div
      style={{
        background: '#000',
        color: '#fff',
        minHeight: '100vh',
        ['--color-entity' as string]: '#00E5FF',
      } as React.CSSProperties}
    >
      <PremaHeader series={series} />
      <PremaHero team={team} stats={stats} reelSlides={reelSlides} />

      <div style={{ padding: '1rem 1.75rem 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 0.5 }}>
          STATISTICS VERIFIED TO 2025 SEASON · F2 TITLES INCLUDE GP2 ERA PREDECESSOR WINS
        </p>
      </div>

      <GraduateAlumniSection graduates={graduates} />
      <OperationalSignatureSection bars={signatureBars} />
      <CurrentSeasonSection season={currentSeason} />

      <div style={{ padding: '0 1.75rem 2rem', textAlign: 'center', borderTop: '0.5px solid #1a1a1a', paddingTop: '16px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#333' }}>
          SCROLL · FULL DRIVER LIST · SEASON BY SEASON
        </p>
        <div style={{ width: 1, height: 20, background: 'linear-gradient(to bottom, #333, transparent)', margin: '8px auto 0' }} />
      </div>
    </div>
  )
}
