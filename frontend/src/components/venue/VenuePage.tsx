import Link from 'next/link'
import type {
  Venue,
  VenueStats,
  VenueFingerprint,
  DriverTrackFit,
  Hotspot,
  MomentOverlay,
  VenueIconicMoment,
  VenueWeather,
  Series,
} from '@/lib/types'
import { SERIES_LABELS } from '@/lib/constants'
import TrackMap from './TrackMap'

interface Props {
  venue: Venue
  stats: VenueStats
  fingerprint: VenueFingerprint
  driverFit: DriverTrackFit[]
  hotspots: Hotspot[]
  overlays: MomentOverlay[]
  iconicMoments: VenueIconicMoment[]
  weather: VenueWeather
  series: Series
}

const RATING_COLOR: Record<string, string> = {
  EXTREME: '#FF1E56',
  CRITICAL: '#5FB87C',
  HIGH: '#5FB87C',
  MODERATE: '#888',
  LOW: '#555',
  EXCEPTIONAL: '#FFD700',
}

const CONDITION_LABEL_COLOR: Record<string, string> = {
  DRY: '#FFD700',
  MIXED: '#5FB87C',
  WET: '#378ADD',
}

export default function VenuePage({
  venue,
  stats,
  fingerprint,
  driverFit,
  hotspots,
  overlays,
  iconicMoments,
  weather,
  series,
}: Props) {
  const entityHex = venue.entityColorHex

  return (
    <div
      style={{ '--color-entity': entityHex, background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)' } as React.CSSProperties}
    >

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <header style={{
          padding: '1rem 1.75rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '0.5px solid #1a1a1a',
          background: 'rgba(0,0,0,0.85)',
          position: 'sticky', top: 0, zIndex: 50,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, letterSpacing: -0.5 }}>f(x)</span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#555' }}>
              <Link href={`/f/${series.replace('f', '')}`} style={{ textDecoration: 'none', color: '#666' }}>{SERIES_LABELS[series]}</Link>
              <span style={{ color: '#333' }}>/</span>
              <span>VENUES</span>
              <span style={{ color: '#333' }}>/</span>
              <span style={{ color: '#aaa' }}>{venue.name.toUpperCase()}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              background: 'transparent', border: '0.5px solid #2a2a2a',
              color: '#aaa', fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: 1, padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
            }}>
              COMPARE ↗
            </button>
            <button style={{
              background: 'transparent',
              border: `0.5px solid ${entityHex}44`,
              color: entityHex, fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: 1, padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
            }}>
              ANALYZE A LAP ↗
            </button>
            <button style={{
              background: 'transparent', border: '0.5px solid #2a2a2a',
              color: '#aaa', fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: 1, padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
            }}>
              SHARE
            </button>
          </div>
        </header>

        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section style={{ position: 'relative', width: '100%', height: 620, overflow: 'hidden' }}>
          {/* Background */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #000 0%, #0a1a10 25%, #0f2518 50%, #0a1a10 78%, #000 100%)' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 30% 40%, ${entityHex} 0%, ${entityHex} 12%, transparent 50%)`,
            opacity: 0.18,
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 80%, transparent 30%, #000 85%)' }} />

          {/* Left identity */}
          <div style={{ position: 'absolute', top: '50%', left: '5%', transform: 'translateY(-50%)', maxWidth: '40%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: entityHex, display: 'block' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#aaa' }}>
                {SERIES_LABELS[series].toUpperCase()} · {venue.country.toUpperCase()} GP
              </span>
            </div>
            {venue.subLabel && (
              <p style={{ fontSize: 14, color: '#888', margin: '0 0 4px', letterSpacing: 0.5 }}>{venue.subLabel}</p>
            )}
            <h1 style={{ fontSize: 62, fontWeight: 400, margin: 0, letterSpacing: -2, lineHeight: 0.92, color: '#fff' }}>
              {venue.name}
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#888', margin: '18px 0 0', letterSpacing: 1 }}>
              {venue.trackLocation ?? venue.country.toUpperCase()} · EST. {venue.f1Since}
            </p>
            {venue.quote && (
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: '#bbb', fontStyle: 'italic', lineHeight: 1.6, margin: '18px 0 0', maxWidth: 400 }}>
                "{venue.quote}"
              </p>
            )}
            {venue.quoteAttribution && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', margin: '10px 0 0', letterSpacing: 0.5 }}>
                {venue.quoteAttribution}
              </p>
            )}
          </div>

          {/* Interactive track map */}
          {venue.trackPath && (
            <TrackMap
              trackPath={venue.trackPath}
              entityColor={entityHex}
              hotspots={hotspots}
              overlays={overlays}
              trackLocation={venue.trackLocation}
            />
          )}

          {/* Stats strip */}
          <div style={{
            position: 'absolute', bottom: 24, left: 0, right: 0,
            padding: '0 1.75rem', display: 'flex', justifyContent: 'center', gap: 32,
          }}>
            {[
              { label: 'LENGTH', value: `${stats.lengthKm}`, unit: 'km' },
              { label: 'CORNERS', value: `${stats.corners}`, unit: '' },
              { label: 'LAP RECORD', value: stats.lapRecord, sub: `${stats.lapRecordDriver.toUpperCase()} · '${String(stats.lapRecordYear).slice(2)}` },
              { label: 'ELEVATION', value: `${stats.elevationDeltaM}`, unit: 'm' },
              { label: 'F1 SINCE', value: `${stats.f1Since}`, unit: '' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                {i > 0 && <div style={{ width: 0.5, height: 40, background: '#2a2a2a' }} />}
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#888', margin: '0 0 4px' }}>{s.label}</p>
                  <p style={{ fontSize: 24, fontWeight: 400, margin: 0, color: '#fff', letterSpacing: -1 }}>
                    {s.value}
                    {s.unit && <span style={{ fontSize: 13, color: '#888', letterSpacing: 0 }}>{s.unit}</span>}
                  </p>
                  {s.sub && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#666', margin: '2px 0 0' }}>{s.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Track Fingerprint ──────────────────────────────────────────────── */}
        <section style={{ padding: '2rem 1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: entityHex, margin: 0 }}>TRACK FINGERPRINT</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#555' }}>SENSITIVITY PROFILE</p>
          </div>
          <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
            What the car and driver need to excel here. Calibrated against F1 venue averages.
          </p>

          <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: 32 }}>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 4px' }}>
                WHAT MATTERS HERE
              </p>
              <p style={{ fontSize: 15, color: '#ccc', margin: 0, fontWeight: 400 }}>
                {fingerprint.description ?? `${fingerprint.bars.slice(0, 2).map(b => b.label).join(', ')} — the defining demands of ${venue.name}.`}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              {fingerprint.bars.map(bar => {
                const color = RATING_COLOR[bar.rating] ?? '#888'
                return (
                  <div key={bar.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: '#ccc' }}>{bar.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color, letterSpacing: 1 }}>{bar.rating}</span>
                    </div>
                    <div style={{ height: 4, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${bar.value}%`, height: '100%', background: color }} />
                    </div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', margin: '4px 0 0', letterSpacing: 0.5 }}>
                      {bar.caption.toUpperCase()}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Weather ────────────────────────────────────────────────────────── */}
        <section style={{ padding: '0 1.75rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: entityHex, margin: 0 }}>WEATHER · {venue.name.toUpperCase()}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#555' }}>{venue.f1Since}–PRESENT</p>
          </div>
          <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
            {weather.description ?? `Historical weather breakdown across all ${venue.name} Grands Prix since ${venue.f1Since}.`}
          </p>

          <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 16px' }}>CONDITIONS BREAKDOWN</p>
              <div style={{ display: 'flex', gap: 3, height: 48, marginBottom: 14, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ flex: weather.dryPct, background: '#FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4a3800', fontWeight: 500 }}>
                  DRY {weather.dryPct}%
                </div>
                <div style={{ flex: weather.mixedPct, background: '#5FB87C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#0a2512', fontWeight: 500 }}>
                  MIXED {weather.mixedPct}%
                </div>
                <div style={{ flex: weather.wetPct, background: '#378ADD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#042c53', fontWeight: 500 }}>
                  WET {weather.wetPct}%
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: 0, letterSpacing: 0.5 }}>
                OF {weather.totalRaces} F1 RACES SINCE {venue.f1Since}
              </p>

              <div style={{ marginTop: 24 }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 10px' }}>MOST CHAOTIC RACES</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {weather.chaoticRaces.map((r, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '6px 0', borderBottom: i < weather.chaoticRaces.length - 1 ? '0.5px solid #1a1a1a' : undefined }}>
                      <span style={{ color: '#ccc' }}>{r.year} · {r.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: CONDITION_LABEL_COLOR[r.type] ?? '#888', fontSize: 10 }}>{r.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 16px' }}>CIRCUIT OVERVIEW</p>
              <svg viewBox="0 0 500 500" style={{ width: '100%', height: 'auto', marginBottom: 12 }} role="img" aria-label={`${venue.name} track outline`}>
                {venue.trackPath && (
                  <path d={venue.trackPath} fill="none" stroke={entityHex} strokeWidth={10} strokeLinejoin="round" opacity={0.55} />
                )}
                {!venue.trackPath && (
                  <text x={250} y={250} textAnchor="middle" fontFamily="monospace" fontSize={14} fill="#555">NO TRACK PATH</text>
                )}
              </svg>
              <p style={{ fontSize: 12, color: '#aaa', lineHeight: 1.6, margin: 0 }}>
                {weather.circuitNote ?? `${venue.name} — ${venue.corners} corners, ${venue.lengthKm} km. ${weather.dryPct}% dry / ${weather.mixedPct}% mixed / ${weather.wetPct}% wet across ${weather.totalRaces} Grands Prix.`}
              </p>
            </div>
          </div>
        </section>

        {/* ── Driver-Track Fit ───────────────────────────────────────────────── */}
        <section style={{ padding: '0 1.75rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: entityHex, margin: 0 }}>DRIVER-TRACK FIT</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#555' }}>HISTORICAL</p>
          </div>
          <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
            Drivers whose style correlates most strongly with success here. Not the same as most wins — this accounts for car strength.
          </p>

          <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {driverFit.map((d, i) => (
                <div
                  key={d.driverId}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 2.5fr 0.8fr 0.8fr',
                    gap: 16, alignItems: 'center',
                    padding: '10px 14px',
                    background: '#0a0a0a',
                    borderRadius: 6,
                    borderLeft: i === 0 ? `2px solid ${entityHex}` : 'none',
                  }}
                >
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, margin: 0, color: '#fff' }}>{d.driverName}</p>
                  </div>
                  <div style={{ height: 4, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${d.fitScore}%`, height: '100%', background: entityHex }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: entityHex, textAlign: 'right', fontWeight: 500 }}>
                    {d.fitScore}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#888', textAlign: 'right' }}>
                    {d.wins}W {d.poles}P
                  </span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', margin: '16px 0 0', letterSpacing: 0.5, textAlign: 'center' }}>
              FIT SCORES DERIVED FROM WINS · POLES · PODIUMS AT THIS CIRCUIT
            </p>
          </div>
        </section>

        {/* ── Iconic Moments ─────────────────────────────────────────────────── */}
        <section style={{ padding: '0 1.75rem 3rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: entityHex, margin: 0 }}>ICONIC MOMENTS</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#555' }}>THE ARCHIVE</p>
          </div>
          <p style={{ fontSize: 13, color: '#888', margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
            Races and laps that define {venue.name}. Moments that shaped the circuit&apos;s legend.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {iconicMoments.map(m => (
              <div
                key={m.id}
                style={{
                  aspectRatio: '16/10',
                  background: 'linear-gradient(135deg, #0a1a10, #000)',
                  border: `0.5px solid ${entityHex}22`,
                  borderRadius: 6, overflow: 'hidden',
                  position: 'relative', cursor: 'pointer',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse at 45% 50%, ${m.glowColor} 0%, transparent 60%)`,
                  opacity: 0.45,
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(circle at 50% 50%, transparent 35%, #000 92%)',
                }} />
                <div style={{ position: 'absolute', top: 10, left: 12, fontFamily: 'var(--font-mono)', fontSize: 9, color: entityHex, letterSpacing: 1 }}>
                  {m.year}
                </div>
                <div style={{ position: 'absolute', top: 10, right: 12, fontFamily: 'var(--font-mono)', fontSize: 8, color: m.conditionColor, letterSpacing: 1 }}>
                  {m.conditionBadge}
                </div>
                <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
                  <p style={{ fontSize: 12, color: '#fff', margin: 0, fontWeight: 500 }}>{m.title}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#888', margin: '2px 0 0', letterSpacing: 0.5 }}>{m.teamLabel}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', margin: '16px 0 0', letterSpacing: 0.5 }}>
            KEY MOMENTS SELECTED FROM THE RACE ARCHIVE · CONDITIONS VERIFIED
          </p>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────────────── */}
        <footer style={{ padding: '0 1.75rem 2rem', textAlign: 'center', borderTop: '0.5px solid #1a1a1a', paddingTop: 16 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#333' }}>
            SCROLL · CORNER-BY-CORNER · HISTORICAL RACES
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#2a2a2a', letterSpacing: 1, margin: '6px 0 0' }}>
            TRACK MAP: GPS-DERIVED FROM OSM · julesr0y/f1-circuits-svg · 2007–2026 LAYOUT
          </p>
        </footer>

    </div>
  )
}
