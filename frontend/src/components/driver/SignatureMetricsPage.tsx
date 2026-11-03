import Link from 'next/link'
import CohortRadar from './CohortRadar'
import SignatureMethodology from './SignatureMethodology'
import { AXIS_COPY, BASIS_LABEL, COHORT_COPY, COHORT_ORDER } from '@/lib/signature-copy'
import type { DrivingSignature } from '@/lib/types'
import type {
  SignatureEraDetail,
  SignaturePeer,
  SignatureReference,
  SignatureWeekend,
} from '@/data/signature-details'

const SERIES_HEX = '#FF1E56'
const POSITIVE = '#5FB87C'
const NEGATIVE = '#FF1E56'

const MONO = 'var(--font-mono)'
const LABEL: React.CSSProperties = { fontFamily: MONO, fontSize: 9, letterSpacing: 1.5, color: '#555', margin: 0 }
const CARD: React.CSSProperties = { background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: 28 }
const TH: React.CSSProperties = {
  fontFamily: MONO, fontSize: 9, letterSpacing: 1, color: '#555', fontWeight: 400,
  textAlign: 'left', padding: '0 8px 10px 0', whiteSpace: 'nowrap',
}
const TD: React.CSSProperties = {
  fontFamily: MONO, fontSize: 11, color: '#bbb', padding: '8px 8px 8px 0',
  borderTop: '0.5px solid #141414', whiteSpace: 'nowrap',
}

const SHORT_AXIS: Record<string, string> = {
  'Braking': 'BRAKING', 'Entry Aggression': 'ENTRY', 'Throttle Application': 'THROTTLE',
  'Consistency': 'CONSISTENCY', 'Tyre Management': 'TYRE MGMT', 'Steering Smoothness': 'STEERING',
}

/* ─── Formatting ────────────────────────────────────────────────────────────── */

function signed(v: number | null | undefined, digits = 2): string {
  if (v === null || v === undefined) return '—'
  if (Math.abs(v) < 0.5 * 10 ** -digits) return (0).toFixed(digits)
  return v > 0 ? `+${v.toFixed(digits)}` : v.toFixed(digits)
}

function zColor(v: number | null | undefined): string {
  if (v === null || v === undefined) return '#333'
  if (v > 0.05) return POSITIVE
  if (v < -0.05) return NEGATIVE
  return '#888'
}

function zTint(v: number | null | undefined): string {
  if (v === null || v === undefined) return 'transparent'
  const alpha = (Math.min(Math.abs(v) / 2, 1) * 0.3).toFixed(3)
  return v >= 0 ? `rgba(95, 184, 124, ${alpha})` : `rgba(255, 30, 86, ${alpha})`
}

function teamsLabel(teams: Record<string, number>): string {
  return Object.entries(teams).sort((a, b) => b[1] - a[1]).map(([team]) => team).join(', ')
}

/* ─── Layout pieces ─────────────────────────────────────────────────────────── */

function Section({ label, description, id, children }: {
  label: string; description?: React.ReactNode; id?: string; children: React.ReactNode
}) {
  return (
    <section id={id} style={{ padding: '0 1.75rem 3rem', scrollMarginTop: 24 }}>
      <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: SERIES_HEX, margin: 0 }}>{label}</p>
      {description && (
        <p style={{ fontSize: 13, color: '#888', margin: '6px 0 20px', maxWidth: 620, lineHeight: 1.6 }}>{description}</p>
      )}
      {children}
    </section>
  )
}

function Header({ slug, seriesNum }: { slug: string; seriesNum: string }) {
  return (
    <div style={{
      padding: '1rem 1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderBottom: '0.5px solid #1a1a1a', background: 'rgba(0,0,0,0.7)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 500, letterSpacing: -0.5 }}>f(x)</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 10, letterSpacing: 1.5, color: '#666' }}>
          <Link href={`/f/${seriesNum}`} style={{ textDecoration: 'none', color: 'inherit' }}>f({seriesNum})</Link>
          <span style={{ color: '#333' }}>/</span>
          <Link href={`/f/${seriesNum}/drivers`} style={{ textDecoration: 'none', color: 'inherit' }}>DRIVERS</Link>
          <span style={{ color: '#333' }}>/</span>
          <Link href={`/f/${seriesNum}/driver/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {slug.replace(/-/g, ' ').toUpperCase()}
          </Link>
          <span style={{ color: '#333' }}>/</span>
          <span style={{ color: '#aaa' }}>SIGNATURE</span>
        </div>
      </div>
      <Link
        href={`/f/${seriesNum}/driver/${slug}`}
        style={{
          border: '0.5px solid #2a2a2a', color: '#aaa', fontFamily: MONO, fontSize: 10, letterSpacing: 1,
          padding: '6px 12px', borderRadius: 4, textDecoration: 'none',
        }}
      >
        ← DRIVER PAGE
      </Link>
    </div>
  )
}

/* ─── Charts ────────────────────────────────────────────────────────────────── */

function FieldChart({ peers, idx, slug, name, mates, p5, p95, eraAvg, value, entityHex }: {
  peers: SignaturePeer[]; idx: number; slug: string; name: string; mates: Set<string>
  p5: number | null; p95: number | null; eraAvg: number | null; value: number; entityHex: string
}) {
  const x = (v: number) => 6 + (v / 100) * 288
  const others = peers.filter((p) => p.slug !== slug && p.values[idx] !== null)
  return (
    <div>
      <svg viewBox="0 0 300 40" style={{ width: '100%', height: 'auto', display: 'block' }} role="img"
        aria-label={`${name} at ${value} out of 100 among the era field`}>
        {p5 !== null && p95 !== null && (
          <rect x={x(p5)} y={7} width={Math.max(x(p95) - x(p5), 1)} height={18} rx={2} fill={entityHex} opacity={0.14} />
        )}
        <line x1={6} x2={294} y1={16} y2={16} stroke="#222" strokeWidth={1} />
        {[0, 25, 50, 75, 100].map((v) => (
          <text key={v} x={x(v)} y={37} textAnchor="middle" fontSize={7} fill="#444" fontFamily="monospace">{v}</text>
        ))}
        {eraAvg !== null && (
          <line x1={x(eraAvg)} x2={x(eraAvg)} y1={5} y2={27} stroke="#777" strokeWidth={0.75} strokeDasharray="2,2" />
        )}
        {others.map((p) => {
          const v = p.values[idx] as number
          const mate = mates.has(p.slug)
          return (
            <circle key={p.slug} cx={x(v)} cy={16} r={mate ? 3.5 : 2.5}
              fill={mate ? '#000' : '#666'} stroke={mate ? '#ddd' : 'none'} strokeWidth={1} opacity={mate ? 1 : 0.6}>
              <title>{`${p.name}${p.team ? ` (${p.team})` : ''}: ${v}`}</title>
            </circle>
          )
        })}
        <circle cx={x(value)} cy={16} r={5} fill={entityHex}>
          <title>{`${name}: ${value}`}</title>
        </circle>
      </svg>
      <p style={{ ...LABEL, fontSize: 8, letterSpacing: 1, margin: '4px 0 0' }}>
        <span style={{ color: entityHex }}>●</span> DRIVER · <span style={{ color: '#ddd' }}>○</span> TEAMMATE · ● REST OF ERA ·
        ┊ ERA AVG · SHADED: 90% RANGE
      </p>
    </div>
  )
}

function TrendChart({ weekends, axis, label }: { weekends: SignatureWeekend[]; axis: string; label: string }) {
  if (!weekends.some((w) => w.values[axis] !== null && w.values[axis] !== undefined)) return null
  const n = weekends.length
  const H = 56, mid = 28, half = 26, clip = 2.5, bw = 0.72
  const seasonStarts = weekends.flatMap((w, i) => (i === 0 || w.season !== weekends[i - 1].season ? [{ season: w.season, i }] : []))
  return (
    <div>
      <div style={{ position: 'relative', height: 12 }}>
        {seasonStarts.map(({ season, i }) => (
          <span key={season} style={{ position: 'absolute', left: `${(i / n) * 100}%`, fontFamily: MONO, fontSize: 8, color: '#555' }}>
            {season}
          </span>
        ))}
      </div>
      {/* Stretched horizontally only, so bar heights stay comparable at any card width */}
      <svg viewBox={`0 0 ${n} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: H, display: 'block' }}
        role="img" aria-label={`${label}, session by session`}>
        <line x1={0} x2={n} y1={mid} y2={mid} stroke="#2a2a2a" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        {seasonStarts.filter(({ i }) => i > 0).map(({ season, i }) => (
          <line key={season} x1={i} x2={i} y1={0} y2={H} stroke="#1f1f1f" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        ))}
        {weekends.map((w, i) => {
          const v = w.values[axis]
          const where = `${w.season} ${w.circuit ?? w.meeting ?? `round ${w.round}`}`
          if (v === null || v === undefined) {
            return (
              <rect key={i} x={i + (1 - bw) / 2} y={mid - 0.5} width={bw} height={1} fill="#333">
                <title>{`${where}: no usable session`}</title>
              </rect>
            )
          }
          const h = Math.max((Math.min(Math.abs(v), clip) / clip) * half, 0.8)
          return (
            <rect key={i} x={i + (1 - bw) / 2} y={v >= 0 ? mid - h : mid} width={bw} height={h}
              fill={v >= 0 ? POSITIVE : NEGATIVE} opacity={0.75}>
              <title>{`${where}: ${signed(v)}`}</title>
            </rect>
          )
        })}
      </svg>
    </div>
  )
}

/* ─── Axis cards ────────────────────────────────────────────────────────────── */

function rawFacts(axis: string, raw: SignatureEraDetail['raw']): string[] {
  const q = raw.quali
  const r = raw.race
  const m = (v: number, digits: number) => Math.abs(v).toFixed(digits)
  const facts: string[] = []
  if (axis === 'Braking' && q?.brakePointDeltaM != null) {
    facts.push(`Starts braking ${m(q.brakePointDeltaM, 1)} m ${q.brakePointDeltaM >= 0 ? 'later' : 'earlier'} than the field median.`)
  }
  if (axis === 'Entry Aggression') {
    if (q?.releaseSpeedDeltaKmh != null) {
      facts.push(`${m(q.releaseSpeedDeltaKmh, 1)} km/h ${q.releaseSpeedDeltaKmh >= 0 ? 'more' : 'less'} speed as the brake comes off.`)
    }
    if (q?.minSpeedDeltaKmh != null) {
      facts.push(`${m(q.minSpeedDeltaKmh, 1)} km/h ${q.minSpeedDeltaKmh >= 0 ? 'higher' : 'lower'} minimum corner speed.`)
    }
  }
  if (axis === 'Throttle Application' && q?.fullThrottleDeltaM != null) {
    facts.push(`Reaches full throttle ${m(q.fullThrottleDeltaM, 1)} m ${q.fullThrottleDeltaM <= 0 ? 'closer to' : 'further from'} the apex than the field median.`)
  }
  if (axis === 'Consistency' && r?.spreadS != null && r.spreadDeltaS != null) {
    facts.push(`Lap times scatter ${r.spreadS.toFixed(3)} s around the stint trend, ${m(r.spreadDeltaS, 3)} s ${r.spreadDeltaS <= 0 ? 'tighter' : 'looser'} than the field median.`)
  }
  if (axis === 'Tyre Management' && r?.degSPerLap != null && r.degDeltaSPerLap != null) {
    facts.push(`Loses ${r.degSPerLap.toFixed(3)} s per lap of tyre age after fuel correction, ${m(r.degDeltaSPerLap, 3)} s/lap ${r.degDeltaSPerLap <= 0 ? 'less' : 'more'} than the race median.`)
  }
  return facts
}

function AxisCard({ axis, idx, slug, name, detail, reference, eraId, entityHex }: {
  axis: string; idx: number; slug: string; name: string
  detail: SignatureEraDetail; reference: SignatureReference; eraId: string; entityHex: string
}) {
  const copy = AXIS_COPY[axis]
  const a = detail.axes[axis]
  const s = reference.methodology.scoring
  const isQuali = copy.basis === 'quali'
  const unit = isQuali ? 'lap-corners' : 'stints'
  const minimum = isQuali
    ? `${s.minQualiSessions} qualifying sessions and ${s.minQualiSamples} lap-corners`
    : `${s.minRaceSessions} races and ${s.minRaceStints} stints`
  const facts = rawFacts(axis, detail.raw)
  const mates = new Set(detail.teammates.map((t) => t.slug))

  return (
    <div style={{ ...CARD, padding: 24, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 1.5, color: '#ddd', margin: 0 }}>{axis.toUpperCase()}</p>
        <p style={{ ...LABEL, fontSize: 8, textAlign: 'right' }}>{BASIS_LABEL[copy.basis]}</p>
      </div>
      <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6, margin: '8px 0 18px' }}>{copy.measures}</p>

      {copy.basis === 'vision' ? (
        <div style={{ border: '0.5px dashed #2a2a2a', borderRadius: 6, padding: '18px 16px' }}>
          <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: entityHex, margin: '0 0 8px' }}>PENDING</p>
          <p style={{ fontSize: 12, color: '#777', lineHeight: 1.6, margin: 0 }}>{copy.higher}</p>
        </div>
      ) : a.percentile === null ? (
        <div style={{ border: '0.5px dashed #2a2a2a', borderRadius: 6, padding: '18px 16px' }}>
          <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: '#888', margin: '0 0 8px' }}>NOT ENOUGH DATA YET</p>
          <p style={{ fontSize: 12, color: '#777', lineHeight: 1.6, margin: 0 }}>
            {a.sessions} sessions and {a.samples} {unit} so far in this era; an axis needs at least {minimum}.
          </p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 44, letterSpacing: -1.5, lineHeight: 1, color: entityHex }}>{a.percentile}</span>
            <span style={{ fontFamily: MONO, fontSize: 10, color: '#555' }}>/ 100</span>
            <div style={{ marginLeft: 'auto', textAlign: 'right', fontFamily: MONO, fontSize: 9, letterSpacing: 1, color: '#888', lineHeight: 1.8 }}>
              {a.rank !== null && <div>RANK {a.rank} OF {a.rankOf} · {detail.era.label.toUpperCase()} FIELD</div>}
              <div style={{ color: '#555' }}>90% RANGE {a.p5}–{a.p95}</div>
            </div>
          </div>
          <p style={{ fontSize: 11, color: '#666', lineHeight: 1.6, margin: '8px 0 16px' }}>Higher means: {copy.higher}</p>

          <FieldChart
            peers={reference.peers[eraId] ?? []} idx={idx} slug={slug} name={name} mates={mates}
            p5={a.p5} p95={a.p95} eraAvg={detail.cohorts.era[idx]} value={a.percentile} entityHex={entityHex}
          />

          {facts.length > 0 && (
            <div style={{ marginTop: 18 }}>
              <p style={{ ...LABEL, margin: '0 0 6px' }}>ON AVERAGE, AGAINST THE SAME-SESSION FIELD</p>
              {facts.map((f) => (
                <p key={f} style={{ fontSize: 12, color: '#ccc', lineHeight: 1.6, margin: '0 0 2px' }}>{f}</p>
              ))}
            </div>
          )}

          <div style={{ marginTop: 18 }}>
            <p style={{ ...LABEL, margin: '0 0 6px' }}>WEEKEND BY WEEKEND · ABOVE THE LINE = BETTER THAN THAT SESSION&apos;S FIELD</p>
            <TrendChart weekends={detail.weekends} axis={axis} label={axis} />
          </div>

          <p style={{ ...LABEL, fontSize: 8, letterSpacing: 1, margin: 'auto 0 0', paddingTop: 16, lineHeight: 1.6 }}>
            {a.sessions} SESSIONS · {a.samples} {unit.toUpperCase()} · MINIMUM {minimum.toUpperCase()}
          </p>
        </>
      )}
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export interface SignatureMetricsPageProps {
  slug: string
  name: string
  seriesNum: string
  entityHex: string
  eraId: string
  detail: SignatureEraDetail
  eraTabs: { id: string; label: string; seasons: string }[]
  reference: SignatureReference
}

export default function SignatureMetricsPage({
  slug, name, seriesNum, entityHex, eraId, detail, eraTabs, reference,
}: SignatureMetricsPageProps) {
  const axes = reference.axes
  const measured = axes.filter((axis) => AXIS_COPY[axis]?.basis !== 'vision')
  const cardOrder = [...measured, ...axes.filter((axis) => AXIS_COPY[axis]?.basis === 'vision')]
  const scored = axes.filter((axis) => detail.axes[axis].percentile !== null).length
  const era = detail.era
  const radarSignature: DrivingSignature = {
    driverId: slug,
    series: 'f1',
    axes: axes.map((label) => ({ label, value: detail.axes[label].percentile })),
    cohortAverage: detail.cohorts.era,
    cohorts: detail.cohorts,
    confidenceScore: detail.confidence,
    sampleSize: detail.sampleSize,
    era,
    source: 'timing',
  }
  const stats = [
    { label: 'LAPS USED', value: detail.sampleSize.toLocaleString('en-US') },
    { label: 'QUALIFYING', value: String(detail.qualiSessions) },
    { label: 'RACES', value: String(detail.raceSessions) },
    { label: 'AXES SCORED', value: `${scored}/${axes.length}` },
    { label: 'CONFIDENCE', value: detail.confidence === null ? '—' : detail.confidence.toFixed(2) },
  ]

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Header slug={slug} seriesNum={seriesNum} />

      {/* Title */}
      <div style={{ padding: '2.5rem 1.75rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 15% 0%, ${entityHex} 0%, transparent 55%)`, opacity: 0.18 }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: SERIES_HEX, margin: 0 }}>DRIVING SIGNATURE · FULL METRICS</p>
          <h1 style={{ fontSize: 52, fontWeight: 400, letterSpacing: -2, lineHeight: 1, margin: '14px 0 10px' }}>{name}</h1>
          <p style={{ fontSize: 14, color: '#999', margin: 0, lineHeight: 1.6 }}>
            {era.label} era ({era.span ?? era.seasons}) · data from {era.seasons} · {teamsLabel(detail.teams)}
          </p>

          {eraTabs.length > 1 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              {eraTabs.map((tab) => {
                const active = tab.id === eraId
                return (
                  <Link
                    key={tab.id}
                    href={`/f/${seriesNum}/driver/${slug}/signature?era=${encodeURIComponent(tab.id)}`}
                    aria-current={active ? 'page' : undefined}
                    style={{
                      fontFamily: MONO, fontSize: 10, letterSpacing: 1, textDecoration: 'none',
                      padding: '6px 12px', borderRadius: 4,
                      border: `0.5px solid ${active ? entityHex : '#2a2a2a'}`,
                      color: active ? '#fff' : '#777', background: active ? '#0d0d0d' : 'transparent',
                    }}
                  >
                    {tab.label.toUpperCase()} · {tab.seasons}
                  </Link>
                )
              })}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`, marginTop: 32, maxWidth: 820 }}>
            {stats.map((stat, i) => (
              <div key={stat.label} style={{ borderLeft: i > 0 ? '0.5px solid #2a2a2a' : 'none', paddingLeft: i > 0 ? 20 : 0 }}>
                <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: 1.5, color: '#888', margin: '0 0 4px' }}>{stat.label}</p>
                <p style={{ fontSize: 28, fontWeight: 400, letterSpacing: -1, margin: 0, color: i === 0 ? entityHex : '#fff' }}>{stat.value}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#666', margin: '18px 0 0' }}>
            <a href="#method" style={{ color: '#999' }}>How this is calculated</a> — the era, the field, the comparison groups and every threshold.
          </p>
        </div>
      </div>

      {/* Overview */}
      <Section
        label="OVERVIEW"
        description={<>
          Each axis is a 0–100 rank among every driver-era in the dataset, built from differences to the same-session field.
          The 90% range is where nine in ten resampled scores land. Rank is within the {era.label.toLowerCase()} field.
        </>}
      >
        <div style={{ ...CARD, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))', gap: 36, alignItems: 'center' }}>
          <CohortRadar signature={radarSignature} entityHex={entityHex} />
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={TH}>AXIS</th>
                  <th style={TH}>SCORE</th>
                  <th style={TH}>90% RANGE</th>
                  <th style={TH}>RANK</th>
                  {COHORT_ORDER.map((key) => <th key={key} style={TH}>{COHORT_COPY[key].pill}</th>)}
                </tr>
              </thead>
              <tbody>
                {axes.map((axis, i) => {
                  const a = detail.axes[axis]
                  return (
                    <tr key={axis}>
                      <td style={{ ...TD, color: '#ddd' }}>{SHORT_AXIS[axis] ?? axis.toUpperCase()}</td>
                      <td style={{ ...TD, color: a.percentile === null ? '#444' : entityHex, fontSize: 13 }}>
                        {a.percentile ?? (AXIS_COPY[axis]?.basis === 'vision' ? 'PENDING' : '—')}
                      </td>
                      <td style={{ ...TD, color: '#777' }}>{a.p5 === null ? '—' : `${a.p5}–${a.p95}`}</td>
                      <td style={{ ...TD, color: '#777' }}>{a.rank === null ? '—' : `${a.rank}/${a.rankOf}`}</td>
                      {COHORT_ORDER.map((key) => {
                        const v = detail.cohorts[key]?.[i]
                        return <td key={key} style={{ ...TD, color: '#666' }}>{v === null || v === undefined ? '—' : Math.round(v)}</td>
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Axis cards */}
      <Section
        label="AXIS BY AXIS"
        description="What each axis measures, where the driver sits among this era's drivers, the raw differences behind the score, and how it moved from weekend to weekend."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 16 }}>
          {cardOrder.map((axis) => (
            <AxisCard key={axis} axis={axis} idx={axes.indexOf(axis)} slug={slug} name={name}
              detail={detail} reference={reference} eraId={eraId} entityHex={entityHex} />
          ))}
        </div>
      </Section>

      {/* Teammates */}
      <Section
        label="TEAMMATES"
        description={<>
          Same car, same sessions. Each cell is the average difference over the sessions they shared, in field-spread
          units: +0.30 means 0.3 of a typical field spread better on that axis. Qualifying H2H is the share of shared
          qualifying sessions where {name.split(' ').slice(-1)[0]}&apos;s best lap was faster.
        </>}
      >
        <div style={CARD}>
          {detail.teammates.length === 0 ? (
            <p style={{ fontSize: 13, color: '#777', margin: 0 }}>No teammate has a scored signature in this era yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={TH}>TEAMMATE</th>
                    <th style={TH}>SHARED</th>
                    <th style={TH}>QUALI H2H</th>
                    {measured.map((axis) => <th key={axis} style={TH}>{SHORT_AXIS[axis]}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {detail.teammates.map((t) => (
                    <tr key={t.slug}>
                      <td style={{ ...TD, color: '#ddd' }}>
                        <Link href={`/f/${seriesNum}/driver/${t.slug}/signature?era=${encodeURIComponent(eraId)}`}
                          style={{ color: 'inherit', textDecoration: 'none', borderBottom: '0.5px solid #333' }}>
                          {t.name}
                        </Link>
                      </td>
                      <td style={TD}>
                        {t.sharedSessions}
                        <div style={{ fontSize: 9, color: '#555', marginTop: 2 }}>{t.sharedQuali} Q · {t.sharedRaces} R</div>
                      </td>
                      <td style={{ ...TD, color: t.qualiH2hPct === null ? '#444' : t.qualiH2hPct > 50 ? POSITIVE : t.qualiH2hPct < 50 ? NEGATIVE : '#888' }}>
                        {t.qualiH2hPct === null ? '—' : `${Math.round(t.qualiH2hPct)}%`}
                      </td>
                      {measured.map((axis) => (
                        <td key={axis} style={{ ...TD, color: zColor(t.diffs[axis]) }}>{signed(t.diffs[axis])}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Section>

      {/* Session log */}
      <Section
        label="SESSION LOG"
        description="Every weekend in this era. Values are the difference from that session's field in field-spread units, green better and red worse. A dash means the session was skipped (wet, or no data) or the driver had no usable laps."
      >
        <div style={{ ...CARD, padding: 0 }}>
          <div style={{ maxHeight: 520, overflowY: 'auto', padding: '20px 24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['WEEKEND', 'CIRCUIT', 'TEAM', 'Q LAPS', ...reference.axisGroups.quali.map((a) => SHORT_AXIS[a]),
                    'RACE LAPS', ...reference.axisGroups.race.map((a) => SHORT_AXIS[a])].map((h) => (
                    <th key={h} style={{ ...TH, position: 'sticky', top: -20, background: '#080808', padding: '4px 8px 10px 0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detail.weekends.map((w) => (
                  <tr key={`${w.season}-${w.round}`}>
                    <td style={{ ...TD, color: '#777' }}>{w.season} R{String(w.round).padStart(2, '0')}</td>
                    <td style={{ ...TD, color: '#ddd' }}>{w.circuit ?? w.meeting ?? '—'}</td>
                    <td style={{ ...TD, color: '#777' }}>{w.team ?? '—'}</td>
                    <td style={{ ...TD, color: '#777' }}>{w.qualiLaps ?? '—'}</td>
                    {reference.axisGroups.quali.map((axis) => (
                      <td key={axis} style={{ ...TD, background: zTint(w.values[axis]), color: w.values[axis] == null ? '#333' : '#ddd' }}>
                        {signed(w.values[axis])}
                      </td>
                    ))}
                    <td style={{ ...TD, color: '#777' }}>{w.raceLaps ?? '—'}</td>
                    {reference.axisGroups.race.map((axis) => (
                      <td key={axis} style={{ ...TD, background: zTint(w.values[axis]), color: w.values[axis] == null ? '#333' : '#ddd' }}>
                        {signed(w.values[axis])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <SignatureMethodology reference={reference} eraId={eraId} entityHex={entityHex} />

      <div style={{ padding: '0 1.75rem 3rem' }}>
        <p style={{ ...LABEL, fontSize: 8, letterSpacing: 1 }}>
          PIPELINE {reference.pipelineVersion.toUpperCase()} · GENERATED {reference.generatedAt.slice(0, 10)} · {reference.source.toUpperCase()}
        </p>
      </div>
    </div>
  )
}
