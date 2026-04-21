'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { FeaturedLap, LapRecord } from '@/lib/types'

interface Props {
  driverName: string
  driverShortName: string
  driverId: string
  series: string
  seriesNum: string
  entityHex: string
  totalLaps: number
  featuredLaps: FeaturedLap[]
  lapRecords: LapRecord[]
}

const ERA_CHIPS = ["'07–'08 TR", "'09–'14 RB", "'15–'20 FER", "'21–'22 AM"]
const SESSION_CHIPS = ['QUALI', 'RACE', 'PRACTICE']
const CONDITIONS_CHIPS = ['DRY', 'WET', 'MIXED']

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 9, padding: '3px 7px',
      background: `${color}26`, border: `0.5px solid ${color}66`,
      borderRadius: 3, color, letterSpacing: 1.5,
    }}>
      {label}
    </span>
  )
}

function FilterChip({ label, active, color, onClick }: { label: string; active: boolean; color: string; onClick: () => void }) {
  return (
    <span
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 8px',
        borderRadius: 3, cursor: 'pointer',
        background: active ? color : 'transparent',
        border: active ? `0.5px solid ${color}` : '0.5px solid #2a2a2a',
        color: active ? '#fff' : '#aaa',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </span>
  )
}

export default function LapPickerPage({
  driverName, driverShortName, driverId, series, seriesNum,
  entityHex, totalLaps, featuredLaps, lapRecords,
}: Props) {
  const [seasonFilter, setSeasonFilter] = useState('ALL')
  const [sessionFilter, setSessionFilter] = useState('ALL')
  const [conditionsFilter, setConditionsFilter] = useState('ALL')
  const [trackSearch, setTrackSearch] = useState('')
  const [sortMode, setSortMode] = useState<'FEATURED' | 'CHRONOLOGICAL' | 'FASTEST'>('FEATURED')

  const filtered = useMemo(() => {
    let rows = [...lapRecords]
    if (seasonFilter !== 'ALL') rows = rows.filter(r => r.era === seasonFilter)
    if (sessionFilter !== 'ALL') {
      const st = sessionFilter.toLowerCase() as 'qualifying' | 'race' | 'practice'
      rows = rows.filter(r => r.sessionType === st)
    }
    if (conditionsFilter !== 'ALL') {
      const ct = conditionsFilter.toLowerCase() as 'dry' | 'wet' | 'mixed'
      rows = rows.filter(r => r.conditions === ct)
    }
    if (trackSearch.trim()) {
      const q = trackSearch.toLowerCase()
      rows = rows.filter(r => r.track.toLowerCase().includes(q))
    }
    if (sortMode === 'CHRONOLOGICAL') rows.sort((a, b) => a.year - b.year)
    else if (sortMode === 'FASTEST') rows.sort((a, b) => a.timeMs - b.timeMs)
    return rows
  }, [lapRecords, seasonFilter, sessionFilter, conditionsFilter, trackSearch, sortMode])

  const activeColor = '#FF1E56'

  return (
    <div style={{ background: '#000', color: '#fff', margin: '-1rem -1.25rem', padding: 0, minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>

      {/* Header */}
      <div style={{
        padding: '1rem 1.75rem', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: '0.5px solid #1a1a1a',
        background: 'rgba(0,0,0,0.7)', position: 'relative', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, letterSpacing: -0.5 }}>f(x)</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#666' }}>
            <Link href={`/f/${seriesNum}`} style={{ textDecoration: 'none', color: 'inherit' }}>f({seriesNum})</Link>
            <span style={{ color: '#333' }}>/</span>
            <span>DRIVERS</span>
            <span style={{ color: '#333' }}>/</span>
            <Link href={`/f/${seriesNum}/driver/${driverId}`} style={{ textDecoration: 'none', color: '#666' }}>
              {driverShortName.toUpperCase()}
            </Link>
            <span style={{ color: '#333' }}>/</span>
            <span style={{ color: '#aaa' }}>ANALYZE A LAP</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            background: 'transparent', border: '0.5px solid #2a2a2a', color: '#aaa',
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
            padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
          }}>
            UPLOAD YOUR OWN ↗
          </button>
          <Link href={`/f/${seriesNum}/driver/${driverId}`} style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'transparent', border: '0.5px solid #2a2a2a', color: '#aaa',
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
              padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
            }}>
              ← BACK
            </button>
          </Link>
        </div>
      </div>

      {/* Intro */}
      <div style={{ padding: '3rem 1.75rem 2rem' }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: entityHex, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#aaa' }}>
              ANALYZE A LAP · {driverName.toUpperCase()}
            </span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 400, margin: '0 0 14px', letterSpacing: -1.5, lineHeight: 1, color: '#fff' }}>
            Pick a lap to reconstruct.
          </h1>
          <p style={{ fontSize: 14, color: '#888', lineHeight: 1.7, margin: '0 0 8px', maxWidth: 540 }}>
            {totalLaps.toLocaleString()} {driverShortName} laps have been analyzed from onboard video using computer vision. Steering, braking, throttle, and racing-line data reconstructed frame-by-frame. Pick one to see the full breakdown.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#555', letterSpacing: 1 }}>
            CV PIPELINE · V2.3 · UPDATED BI-WEEKLY
          </p>
        </div>
      </div>

      {/* Filter panel */}
      <div style={{ padding: '0 1.75rem 1.5rem' }}>
        <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: 20 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 14px' }}>FILTERS</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>

            {/* Season */}
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#888', letterSpacing: 0.5, margin: '0 0 8px' }}>SEASON</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <FilterChip label="ALL" active={seasonFilter === 'ALL'} color={activeColor} onClick={() => setSeasonFilter('ALL')} />
                {ERA_CHIPS.map(era => (
                  <FilterChip key={era} label={era} active={seasonFilter === era} color={activeColor} onClick={() => setSeasonFilter(era)} />
                ))}
              </div>
            </div>

            {/* Session */}
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#888', letterSpacing: 0.5, margin: '0 0 8px' }}>SESSION</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <FilterChip label="ALL" active={sessionFilter === 'ALL'} color={activeColor} onClick={() => setSessionFilter('ALL')} />
                {SESSION_CHIPS.map(s => (
                  <FilterChip key={s} label={s} active={sessionFilter === s} color={activeColor} onClick={() => setSessionFilter(s)} />
                ))}
              </div>
            </div>

            {/* Conditions */}
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#888', letterSpacing: 0.5, margin: '0 0 8px' }}>CONDITIONS</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <FilterChip label="ALL" active={conditionsFilter === 'ALL'} color={activeColor} onClick={() => setConditionsFilter('ALL')} />
                {CONDITIONS_CHIPS.map(c => (
                  <FilterChip key={c} label={c} active={conditionsFilter === c} color={activeColor} onClick={() => setConditionsFilter(c)} />
                ))}
              </div>
            </div>

            {/* Track search */}
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#888', letterSpacing: 0.5, margin: '0 0 8px' }}>TRACK</p>
              <input
                type="text"
                placeholder="Search track..."
                value={trackSearch}
                onChange={e => setTrackSearch(e.target.value)}
                style={{
                  width: '100%', fontSize: 11, padding: '4px 8px',
                  background: '#0a0a0a', border: '0.5px solid #2a2a2a',
                  borderRadius: 3, color: '#fff', fontFamily: 'var(--font-mono)',
                  boxSizing: 'border-box', outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Count + sort */}
          <div style={{ borderTop: '0.5px solid #1a1a1a', marginTop: 16, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#888', margin: 0, letterSpacing: 0.5 }}>
              {totalLaps.toLocaleString()} LAPS AVAILABLE · SHOWING {filtered.length}
            </p>
            <div style={{ display: 'flex', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 10 }}>
              <span style={{ color: '#666' }}>SORT:</span>
              {(['FEATURED', 'CHRONOLOGICAL', 'FASTEST'] as const).map((mode, i) => (
                <>
                  {i > 0 && <span key={`sep-${mode}`} style={{ color: '#333' }}>·</span>}
                  <span
                    key={mode}
                    onClick={() => setSortMode(mode)}
                    style={{ color: sortMode === mode ? activeColor : '#aaa', cursor: 'pointer' }}
                  >
                    {mode}
                  </span>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured laps */}
      <div style={{ padding: '0 1.75rem 2rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: activeColor, margin: '0 0 6px' }}>FEATURED LAPS</p>
        <p style={{ fontSize: 13, color: '#888', margin: '0 0 18px', maxWidth: 520, lineHeight: 1.6 }}>
          Career-defining laps, curated. Each has been analyzed in depth — click to see the reconstruction.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 12 }}>
          {featuredLaps.map((lap, idx) => (
            <Link
              key={lap.id}
              href={`/f/${seriesNum}/driver/${driverId}/laps/${lap.id}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block', ...(lap.featured ? { gridRow: 'span 2' } : {}) }}
            >
            <div
              style={{
                aspectRatio: '16/10',
                background: `linear-gradient(135deg, #000814, #000)`,
                border: `${idx === 0 ? '1px' : '0.5px'} solid ${lap.borderColor}`,
                borderRadius: 8, overflow: 'hidden', position: 'relative',
                cursor: 'pointer',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 40% 40%, ${lap.glowColor} 0%, transparent 60%)`, opacity: 0.55 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, transparent 35%, #000 92%)' }} />
              <svg
                viewBox={lap.svgViewBox ?? '0 0 400 225'}
                preserveAspectRatio="xMidYMid slice"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                aria-hidden="true"
              >
                <path d={lap.svgPath} stroke="#FF1E56" strokeWidth={lap.featured ? 1.8 : 1.5} fill="none" opacity={lap.featured ? 0.85 : 0.8} />
              </svg>
              <div style={{ position: 'absolute', top: lap.featured ? 14 : 12, left: 14, display: 'flex', gap: 6 }}>
                {lap.badges.map(b => <Badge key={b.label} label={b.label} color={b.color} />)}
              </div>
              <div style={{ position: 'absolute', bottom: lap.featured ? 14 : 12, left: lap.featured ? 18 : 14, right: lap.featured ? 18 : 14 }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#FFD700', letterSpacing: 1.5, margin: '0 0 4px' }}>{lap.kicker}</p>
                <p style={{ fontSize: lap.featured ? 22 : 15, fontWeight: lap.featured ? 400 : 500, margin: 0, color: '#fff', letterSpacing: lap.featured ? -0.5 : 0 }}>{lap.headline}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: lap.featured ? 10 : 9, color: '#aaa', margin: '4px 0 0', letterSpacing: 1 }}>{lap.meta}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>

      {/* All analyzed laps */}
      <div style={{ padding: '0 1.75rem 2rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: activeColor, margin: '0 0 6px' }}>ALL ANALYZED LAPS</p>
        <p style={{ fontSize: 13, color: '#888', margin: '0 0 18px', maxWidth: 520, lineHeight: 1.6 }}>
          Scroll or filter the full library. Every lap opens into the analysis page.
        </p>
        <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, overflow: 'hidden' }}>
          {/* Column headers */}
          <div style={{
            display: 'grid', gridTemplateColumns: '0.7fr 1.6fr 1.2fr 1fr 0.8fr 0.8fr 0.5fr',
            padding: '12px 20px', borderBottom: '0.5px solid #1a1a1a',
            fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1.5,
          }}>
            <span>YEAR</span><span>TRACK</span><span>TEAM</span><span>SESSION</span><span>TIME</span><span>RESULT</span><span />
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: '24px 20px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#444' }}>
              NO LAPS MATCH CURRENT FILTERS
            </div>
          ) : (
            filtered.map((row, idx) => (
              <Link
                key={row.id}
                href={`/f/${seriesNum}/driver/${driverId}/laps/${row.id}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{
                  display: 'grid', gridTemplateColumns: '0.7fr 1.6fr 1.2fr 1fr 0.8fr 0.8fr 0.5fr',
                  padding: '14px 20px',
                  borderBottom: idx < filtered.length - 1 ? '0.5px solid #1a1a1a' : 'none',
                  fontSize: 12, alignItems: 'center', cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,30,86,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#888' }}>{row.year}</span>
                  <span style={{ color: '#fff' }}>{row.track}</span>
                  <span style={{ color: '#aaa' }}>
                    <span style={{ width: 6, height: 6, background: row.teamColor, borderRadius: '50%', display: 'inline-block', marginRight: 6 }} />
                    {row.team}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#aaa', fontSize: 10, letterSpacing: 0.5 }}>{row.session}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#fff', fontSize: 11 }}>{row.timeFormatted}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: row.resultColor, fontSize: 10, letterSpacing: 0.5 }}>{row.result}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: activeColor, fontSize: 10, letterSpacing: 1 }}>→</span>
                </div>
              </Link>
            ))
          )}

          <div style={{ padding: '12px 20px', textAlign: 'center', borderTop: '0.5px solid #1a1a1a' }}>
            <button style={{
              background: 'transparent', border: '0.5px solid #2a2a2a', color: '#aaa',
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
              padding: '8px 16px', borderRadius: 4, cursor: 'pointer',
            }}>
              LOAD MORE · {(totalLaps - lapRecords.length).toLocaleString()} REMAINING ↗
            </button>
          </div>
        </div>
      </div>

      {/* Upload CTA */}
      <div style={{ padding: '0 1.75rem 2rem' }}>
        <div style={{
          background: '#050505', border: '0.5px solid #1a1a1a', borderRadius: 10,
          padding: 20, display: 'flex', gap: 20, alignItems: 'center',
        }}>
          <div style={{
            width: 50, height: 50, borderRadius: 8, flexShrink: 0,
            background: 'linear-gradient(135deg, #1a0d00, #000)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '0.5px solid #3a2a00',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M 3 17 L 11 6 L 19 17 Z" stroke="#FFD700" strokeWidth={1.2} fill="none" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#FFD700', letterSpacing: 1.5, margin: '0 0 4px' }}>HAVE YOUR OWN ONBOARD?</p>
            <p style={{ fontSize: 13, color: '#ccc', margin: '0 0 2px' }}>Upload a video, we'll run the CV pipeline on it.</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#666', margin: 0, letterSpacing: 0.5 }}>MP4 · MOV · YOUTUBE LINK · PROCESSING ~8 MIN</p>
          </div>
          <button style={{
            background: 'transparent', border: '0.5px solid #3a2a00', color: '#FFD700',
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5,
            padding: '10px 18px', borderRadius: 4, cursor: 'pointer', flexShrink: 0,
          }}>
            UPLOAD ↗
          </button>
        </div>
      </div>

      {/* Footer note */}
      <div style={{ padding: '0 1.75rem 2rem', textAlign: 'center', borderTop: '0.5px solid #1a1a1a', paddingTop: 16 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1 }}>
          LAP LIBRARY · DEMO BUILD · FILTER STATE ILLUSTRATIVE
        </p>
      </div>

    </div>
  )
}
