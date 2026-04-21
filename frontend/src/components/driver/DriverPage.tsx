import Link from 'next/link'
import CyclingReel from './CyclingReel'
import RadarChart from './RadarChart'
import TrajectoryModule from './TrajectoryModule'
import type {
  Driver,
  DriverStats,
  DriverEra,
  DrivingSignature,
  ReelSlide,
  ScoutingReport,
  TrajectoryPrediction,
  Series,
} from '@/lib/types'
import { SERIES_LABELS, SERIES_COLOR_VAR } from '@/lib/constants'

/* ─── Entity color resolution ───────────────────────────────────────────────── */

const ENTITY_COLOR_HEX: Record<string, string> = {
  // Named drivers
  vettel: '#1E3A8A', leclerc: '#DC0000', hamilton: '#00D2BE',
  senna: '#FF8700', norris: '#FF8000', verstappen: '#1E3A8A',
  piastri: '#FF8000', russell: '#00D2BE', alonso: '#006F62',
  sainz: '#DC0000', albon: '#005AFF', antonelli: '#00D2BE',
  hulkenberg: '#52E252', tsunoda: '#6692FF', gasly: '#0090FF',
  ocon: '#0090FF', stroll: '#006F62', colapinto: '#005AFF',
  hadjar: '#6692FF', lawson: '#1E3A8A', bortoleto: '#52E252',
  doohan: '#0090FF', bearman: '#B6BABD',
  ricciardo: '#1E3A8A', bottas: '#52E252', perez: '#1E3A8A',
  magnussen: '#B6BABD', zhou: '#52E252', schumacher: '#DC0000',
  raikkonen: '#DC0000', rosberg: '#00D2BE', webber: '#1E3A8A',
  button: '#BFFF00', massa: '#DC0000', hakkinen: '#C0C0C0',
  // Current teams
  ferrari: '#DC0000', red_bull: '#1E3A8A', redbull: '#1E3A8A',
  mclaren: '#FF8000', mercedes: '#00D2BE', williams: '#005AFF',
  aston_martin: '#006F62', astonmartin: '#006F62',
  alpine: '#0090FF', haas: '#B6BABD', sauber: '#52E252',
  rb: '#6692FF', cadillac: '#C8A96E',
  // Historical teams
  alphatauri: '#2B4998', toro_rosso: '#C00000',
  force_india: '#FF80C7', racing_point: '#FF80C7',
  alfa_romeo: '#900000', lotus: '#FFD700', team_lotus: '#FFD700',
  renault: '#FFD700', benetton: '#009944', brawn: '#BFFF00',
  jordan: '#F5C400', tyrrell: '#1565C0', brabham: '#4A90D9',
  cooper: '#2E7D32', brm: '#1B5E20', matra: '#1565C0',
  bmw_sauber: '#6699CC', minardi: '#333', bar: '#888800',
  jaguar: '#006600', honda: '#999', toyota: '#CC0000',
  arrows: '#FF6600', ligier: '#003399', stewart: '#C0C0C0',
  prost: '#003399', wolf: '#8B0000', shadow: '#444',
  vanwall: '#006400', prema: '#E8001C',
  // Series
  f1: '#FF1E56', f2: '#00E5FF', f3: '#B026FF',
}

const SERIES_COLOR_HEX: Record<Series, string> = {
  f1: '#FF1E56',
  f2: '#00E5FF',
  f3: '#B026FF',
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function formatCareerSpan(span: string): string {
  const years = span.replace('–present', '–2025').split('–')
  if (years.length !== 2) return span
  const diff = parseInt(years[1]) - parseInt(years[0])
  return `${diff}y`
}

function renderWithHighlights(text: string, highlights: string[], color: string) {
  if (!highlights.length) return text
  const parts: React.ReactNode[] = [text]
  highlights.forEach((term) => {
    const processed: React.ReactNode[] = []
    parts.forEach((part) => {
      if (typeof part !== 'string') { processed.push(part); return }
      const lower = part.toLowerCase()
      const idx = lower.indexOf(term.toLowerCase())
      if (idx === -1) { processed.push(part); return }
      processed.push(
        part.slice(0, idx),
        <span key={term} style={{ color, fontStyle: 'normal', fontFamily: 'var(--font-sans)' }}>
          {part.slice(idx, idx + term.length)}
        </span>,
        part.slice(idx + term.length),
      )
    })
    parts.splice(0, parts.length, ...processed)
  })
  return <>{parts}</>
}

/* ─── Sub-sections ───────────────────────────────────────────────────────────── */

function DriverHeader({ driver, series }: { driver: Driver; series: Series }) {
  const seriesNum = series.replace('f', '')
  const seriesColor = SERIES_COLOR_HEX[series]
  return (
    <div style={{
      padding: '1rem 1.75rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderBottom: '0.5px solid #1a1a1a',
      background: 'rgba(0,0,0,0.7)',
      position: 'relative', zIndex: 10,
    }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, letterSpacing: -0.5 }}>
            f(x)
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#666' }}>
          <Link href={`/f/${seriesNum}`} style={{ textDecoration: 'none', color: 'inherit' }}>f({seriesNum})</Link>
          <span style={{ color: '#333' }}>/</span>
          <span>DRIVERS</span>
          <span style={{ color: '#333' }}>/</span>
          <span style={{ color: '#aaa' }}>{driver.shortName.toUpperCase()}</span>
        </div>
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{
          background: 'transparent', border: '0.5px solid #2a2a2a', color: '#aaa',
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
          padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
        }}>
          COMPARE ↗
        </button>
        <Link href={`/f/${seriesNum}/driver/${driver.id}/laps`} style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'transparent',
            border: `0.5px solid ${seriesColor}`,
            color: seriesColor,
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
            padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
          }}>
            ANALYZE A LAP ↗
          </button>
        </Link>
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

interface StatRow { label: string; value: string; sub?: string; accent?: boolean }

function DriverHero({
  driver, stats, reelSlides, series, entityHex, seriesHex, heroStatRows,
}: {
  driver: Driver
  stats: DriverStats
  reelSlides: ReelSlide[]
  series: Series
  entityHex: string
  seriesHex: string
  heroStatRows?: StatRow[]
}) {
  const nameParts = driver.name.split(' ')
  const firstName = nameParts.slice(0, -1).join(' ')
  const lastName = nameParts[nameParts.length - 1]
  const statusLabel = driver.status === 'active'
    ? `${SERIES_LABELS[series]} · ACTIVE`
    : `${SERIES_LABELS[series]} · RETIRED ${driver.dob.slice(0, 4) ? '2022' : ''}`

  return (
    <div style={{ position: 'relative', width: '100%', height: 620, overflow: 'hidden' }}>
      {/* Hero background */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #000 0%, #000814 25%, #0a1428 50%, #000814 78%, #000 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 60% 50%, ${entityHex} 0%, ${entityHex} 10%, transparent 45%)`, opacity: 0.5 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 80%, transparent 30%, #000 85%)' }} />

      {/* Decorative telemetry lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.2 }} viewBox="0 0 800 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><filter id="g-hero"><feGaussianBlur stdDeviation="3" /></filter></defs>
        <g filter="url(#g-hero)">
          <path d="M 0 120 Q 200 80, 400 160 T 800 140" stroke="#FF1E56" strokeWidth={1} fill="none" />
          <path d={`M 0 480 Q 300 520, 550 460 T 800 500`} stroke={entityHex} strokeWidth={1} fill="none" />
        </g>
      </svg>

      {/* Portrait placeholder — center zone */}
      <div style={{
        position: 'absolute', top: 40, bottom: 120,
        left: '36%', width: '18%',
        borderRadius: 12, overflow: 'hidden',
        border: '0.5px solid #1a2847',
        background: 'linear-gradient(180deg, #0a1428 0%, #000 100%)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 25%, ${entityHex} 0%, ${entityHex} 18%, transparent 50%)`, opacity: 0.75 }} />
        <div style={{ position: 'absolute', inset: '10% 20% 0 20%', background: `radial-gradient(ellipse at 50% 35%, ${entityHex} 0%, ${entityHex} 35%, transparent 70%)`, opacity: 0.55 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, transparent 30%, #000 95%)' }} />
        <div style={{ position: 'absolute', top: 14, left: 14, fontFamily: 'var(--font-mono)', fontSize: 9, color: '#FFD700', letterSpacing: 1.5 }}>
          {driver.initials} · 01
        </div>
        <div style={{ position: 'absolute', top: 14, right: 14, fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', letterSpacing: 1 }}>
          LIVERY REF
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 8, color: '#888', letterSpacing: 2 }}>
          FULL BODY
        </div>
        <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 7, color: '#666', letterSpacing: 1.5 }}>
          PEAK ERA
        </div>
      </div>

      {/* Cycling reel — right zone (client component) */}
      <CyclingReel slides={reelSlides} traceColor={seriesHex} />

      {/* Identity — left zone */}
      <div style={{
        position: 'absolute', top: '50%', left: '5%',
        transform: 'translateY(-50%)', maxWidth: '30%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: entityHex, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#aaa' }}>
            {statusLabel}
          </span>
        </div>
        <p style={{ fontSize: 14, color: '#888', margin: '0 0 4px', letterSpacing: 0.5 }}>
          {firstName}
        </p>
        <h1 style={{ fontSize: 68, fontWeight: 400, margin: 0, letterSpacing: -2.5, lineHeight: 0.88, color: '#fff' }}>
          {lastName}
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#888', margin: '18px 0 0', letterSpacing: 1 }}>
          {driver.nationality.toUpperCase()} · BORN {new Date(driver.dob).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')}
        </p>
        {driver.quote && (
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: '#bbb', fontStyle: 'italic', lineHeight: 1.6, margin: '18px 0 0', maxWidth: 260 }}>
            "{driver.quote}"
          </p>
        )}
      </div>

      {/* Stats strip */}
      <div style={{
        position: 'absolute', bottom: 24, left: 0, right: 0,
        padding: '0 1.75rem',
        display: 'flex', justifyContent: 'center', gap: 40,
      }}>
        {(heroStatRows ?? [
          { label: 'TITLES', value: stats.titles.toString(), accent: true },
          { label: 'WINS', value: stats.wins.toString() },
          { label: 'POLES', value: stats.poles.toString() },
          { label: 'PODIUMS', value: stats.podiums.toString() },
          { label: 'CAREER', value: formatCareerSpan(stats.careerSpan) },
        ] as StatRow[]).map((stat, i) => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            {i > 0 && <div style={{ width: 0.5, height: 40, background: '#2a2a2a', marginRight: -20 }} />}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#888', margin: '0 0 4px' }}>
                {stat.label}
              </p>
              <p style={{ fontSize: 28, fontWeight: 400, margin: 0, letterSpacing: -1, color: stat.accent ? seriesHex : '#fff' }}>
                {stat.value}
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

function ErasStrip({ eras }: { eras: DriverEra[] }) {
  return (
    <div style={{ padding: '0 1.75rem', background: '#000' }}>
      <div style={{ marginTop: -20, position: 'relative', zIndex: 5 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#666', margin: '0 0 10px' }}>
          ERAS
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${eras.length}, 1fr)`, gap: 10 }}>
          {eras.map((era) => (
            <div
              key={era.teamId}
              style={{
                aspectRatio: '16/10',
                background: `linear-gradient(135deg, ${era.teamLiveryHex}18, #000)`,
                border: `0.5px solid ${era.teamLiveryHex}44`,
                borderRadius: 6, overflow: 'hidden', position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 45%, ${era.teamLiveryHex} 0%, ${era.teamLiveryHex} 28%, transparent 60%)`, opacity: 0.65 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, transparent 35%, #000 92%)' }} />
              <div style={{ position: 'absolute', top: 8, left: 10, fontFamily: 'var(--font-mono)', fontSize: 8, color: era.teamAccentHex ?? era.teamLiveryHex, letterSpacing: 1 }}>
                {era.teamName.toUpperCase()}
              </div>
              <div style={{ position: 'absolute', bottom: 8, left: 10, fontFamily: 'var(--font-mono)', fontSize: 9, color: '#fff', letterSpacing: 1 }}>
                {era.seasons}
              </div>
              {era.statLabel && (
                <div style={{ position: 'absolute', bottom: 8, right: 10, fontFamily: 'var(--font-mono)', fontSize: 8, color: era.teamAccentHex ?? '#888' }}>
                  {era.statLabel}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DrivingSignatureModule({
  signature, seriesColor, entityHex,
}: {
  signature: DrivingSignature
  seriesColor: string
  entityHex: string
}) {
  const sampleNote = signature.sampleSize
    ? `Extracted from ${signature.sampleSize.toLocaleString()} onboard laps.`
    : ''

  return (
    <div style={{ padding: '2.5rem 1.75rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: seriesColor, margin: 0 }}>
          DRIVING SIGNATURE
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555' }}>
          <span>COMPARE:</span>
          {['ERA AVG', 'ALL-TIME', 'CHAMPIONS', 'TEAMMATES'].map((pill, i) => (
            <span key={pill} style={{
              padding: '3px 8px',
              border: i === 0 ? '0.5px solid #2a2a2a' : 'none',
              borderRadius: 3,
              color: i === 0 ? '#fff' : '#555',
              background: i === 0 ? '#111' : 'transparent',
              cursor: 'pointer',
            }}>
              {pill}
            </span>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
        The shape of their driving — {sampleNote} Compared against the era cohort.
      </p>

      <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 4px' }}>
              THE FINGERPRINT
            </p>
            <p style={{ fontSize: 15, color: '#ccc', margin: 0, fontWeight: 400 }}>
              Six-axis breakdown: steering smoothness, entry aggression, tyre management, throttle application, braking, and consistency.
            </p>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', letterSpacing: 1 }}>
            vs. ERA AVG
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
          <RadarChart signature={signature} entityColor={entityHex} />
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 10 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, background: entityHex, borderRadius: 1, display: 'inline-block' }} />
            <span style={{ color: '#ccc', letterSpacing: 1 }}>DRIVER</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, border: '1px dashed #888', borderRadius: 1, display: 'inline-block' }} />
            <span style={{ color: '#888', letterSpacing: 1 }}>ERA AVG</span>
          </span>
        </div>

        <div style={{ borderTop: '0.5px solid #1a1a1a', marginTop: 28, paddingTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{
            background: 'transparent', border: '0.5px solid #2a2a2a', color: '#aaa',
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
            padding: '7px 13px', borderRadius: 4, cursor: 'pointer',
          }}>
            FULL METRICS ↗
          </button>
        </div>
      </div>
    </div>
  )
}

function SetupStyleModule({
  report, seriesColor, entityHex,
}: {
  report: ScoutingReport
  seriesColor: string
  entityHex: string
}) {
  return (
    <div style={{ padding: '0 1.75rem 3rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: seriesColor, margin: 0 }}>
          SETUP & STYLE
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#555' }}>
          SCOUTING REPORT
        </p>
      </div>
      <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
        How they set up the car, and the style that emerged from it.
      </p>

      <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: 32, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32 }}>

        {/* Editorial prose */}
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 14px' }}>
            THE REPORT
          </p>
          {report.paragraphs.map((para, i) => (
            <p key={i} style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: '#ddd', lineHeight: 1.75, margin: i < report.paragraphs.length - 1 ? '0 0 16px' : 0 }}>
              {renderWithHighlights(para, report.highlights, entityHex)}
            </p>
          ))}
        </div>

        {/* Setup bars + bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* Setup preference bars */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 10px' }}>
              SETUP PREFERENCE
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {report.setupBars.map((bar) => (
                <div key={bar.leftLabel}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#888', letterSpacing: 0.5, marginBottom: 4 }}>
                    <span>{bar.leftLabel}</span>
                    <span>{bar.rightLabel}</span>
                  </div>
                  <div style={{ height: 2, background: '#1a1a1a', borderRadius: 1, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: `${bar.position}%`, top: -3, width: 2, height: 8, background: entityHex }} />
                  </div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 0.5, margin: '4px 0 0', color: bar.highlight ? entityHex : '#888' }}>
                    {bar.annotation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Excelled at */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 10px' }}>
              EXCELLED AT
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {report.excelledAt.map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#ddd' }}>
                  <span style={{ width: 3, height: 3, background: entityHex, borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Struggled with */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 10px' }}>
              STRUGGLED WITH
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {report.struggledWith.map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#aaa' }}>
                  <span style={{ width: 3, height: 3, background: '#555', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── DriverPage ─────────────────────────────────────────────────────────────── */

export interface DriverPageProps {
  driver: Driver
  stats: DriverStats
  eras: DriverEra[]
  signature: DrivingSignature
  reelSlides: ReelSlide[]
  scoutingReport: ScoutingReport
  series: Series
  trajectoryPrediction?: TrajectoryPrediction
  heroStatRows?: StatRow[]
}

export default function DriverPage({
  driver, stats, eras, signature, reelSlides, scoutingReport, series,
  trajectoryPrediction, heroStatRows,
}: DriverPageProps) {
  const entityHex = ENTITY_COLOR_HEX[driver.entityColor] ?? '#ffffff'
  const seriesHex = SERIES_COLOR_HEX[series]

  return (
    <div
      style={{
        background: '#000',
        color: '#fff',
        minHeight: '100vh',
        // Inject entity color CSS var so all child components can reference var(--color-entity)
        ['--color-entity' as string]: entityHex,
      } as React.CSSProperties}
    >
      <DriverHeader driver={driver} series={series} />
      <DriverHero
        driver={driver}
        stats={stats}
        reelSlides={reelSlides}
        series={series}
        entityHex={entityHex}
        seriesHex={seriesHex}
        heroStatRows={heroStatRows}
      />
      {trajectoryPrediction && (
        <TrajectoryModule prediction={trajectoryPrediction} seriesColor={seriesHex} />
      )}
      <ErasStrip eras={eras} />
      <DrivingSignatureModule
        signature={signature}
        seriesColor={seriesHex}
        entityHex={entityHex}
      />
      <SetupStyleModule
        report={scoutingReport}
        seriesColor={seriesHex}
        entityHex={entityHex}
      />

      {/* Scroll indicator */}
      <div style={{ padding: '0 1.75rem 2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#333' }}>
          MORE BELOW · TRACKS · LAPS
        </p>
        <div style={{ width: 1, height: 20, background: 'linear-gradient(to bottom, #333, transparent)', margin: '8px auto 0' }} />
      </div>
    </div>
  )
}
