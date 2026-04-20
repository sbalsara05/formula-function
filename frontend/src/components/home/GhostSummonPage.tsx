'use client'

import { Fragment, useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'

/* ─── Types ──────────────────────────────────────────────────────────────────── */

type SeriesKey = 'f1' | 'f2' | 'f3'

interface MomentEntry {
  name: string
  moment: string
  livery: string
  initials: string
}

interface GhostPos {
  side: 'left' | 'right' | 'bottom'
  top?: string
  left?: string
  size: number
}

interface Portrait {
  initials: string
  livery: string
  bg: string
}

interface CardConfig {
  key: SeriesKey
  num: string
  tier: string
  color: string
  description: string
  svgPath: string
  iconLabel: string
  portraits: Portrait[]
}

/* ─── Data ───────────────────────────────────────────────────────────────────── */

const MOMENTS: Record<SeriesKey, MomentEntry[]> = {
  f1: [
    { name: 'Senna', moment: 'Monaco 87', livery: '#FFD700', initials: 'AS' },
    { name: 'Senna', moment: 'Donington 93', livery: '#FFD700', initials: 'AS' },
    { name: 'Senna', moment: 'Interlagos 91', livery: '#FFD700', initials: 'AS' },
    { name: 'Prost', moment: 'Suzuka 89', livery: '#E10600', initials: 'AP' },
    { name: 'Prost', moment: 'Adelaide 86', livery: '#FFFFFF', initials: 'AP' },
    { name: 'Schumacher', moment: 'Spa 92', livery: '#FFD700', initials: 'MS' },
    { name: 'Schumacher', moment: 'Monza 00', livery: '#DC0000', initials: 'MS' },
    { name: 'Schumacher', moment: 'Suzuka 00', livery: '#DC0000', initials: 'MS' },
    { name: 'Vettel', moment: 'Abu Dhabi 10', livery: '#1E3A8A', initials: 'SV' },
    { name: 'Vettel', moment: 'Singapore 13', livery: '#1E3A8A', initials: 'SV' },
    { name: 'Hamilton', moment: 'Interlagos 08', livery: '#B0B0B0', initials: 'LH' },
    { name: 'Hamilton', moment: 'Silverstone 20', livery: '#00D2BE', initials: 'LH' },
  ],
  f2: [
    { name: 'Russell', moment: 'Abu Dhabi 18', livery: '#D4D4D4', initials: 'GR' },
    { name: 'Russell', moment: 'F2 title 18', livery: '#D4D4D4', initials: 'GR' },
    { name: 'Leclerc', moment: 'Monaco 17', livery: '#DC0000', initials: 'CL' },
    { name: 'Leclerc', moment: 'Baku 17', livery: '#DC0000', initials: 'CL' },
    { name: 'Piastri', moment: 'Silverstone 21', livery: '#FF8700', initials: 'OP' },
    { name: 'Piastri', moment: 'F2 title 21', livery: '#FF8700', initials: 'OP' },
    { name: 'M. Schumacher', moment: 'Monza 20', livery: '#0090FF', initials: 'MS' },
    { name: 'M. Schumacher', moment: 'Sochi 20', livery: '#0090FF', initials: 'MS' },
    { name: 'Bortoleto', moment: 'Silverstone 24', livery: '#00FF00', initials: 'GB' },
    { name: 'Bortoleto', moment: 'Monza 24', livery: '#00FF00', initials: 'GB' },
    { name: 'Gasly', moment: 'Suzuka 16', livery: '#2293D1', initials: 'PG' },
    { name: 'Gasly', moment: 'GP2 title 16', livery: '#2293D1', initials: 'PG' },
  ],
  f3: [
    { name: 'Norris', moment: 'Spa 18', livery: '#FFD700', initials: 'LN' },
    { name: 'Norris', moment: 'Monza 18', livery: '#FFD700', initials: 'LN' },
    { name: 'Russell', moment: 'GP3 title 17', livery: '#00FF99', initials: 'GR' },
    { name: 'Piastri', moment: 'F3 title 20', livery: '#FFFFFF', initials: 'OP' },
    { name: 'Piastri', moment: 'Spielberg 20', livery: '#FFFFFF', initials: 'OP' },
    { name: 'Antonelli', moment: 'Monza 23', livery: '#D4D4D4', initials: 'KA' },
    { name: 'Antonelli', moment: 'Spielberg 23', livery: '#D4D4D4', initials: 'KA' },
    { name: 'Lindblad', moment: 'Silverstone 24', livery: '#1E3A8A', initials: 'AL' },
    { name: 'Lindblad', moment: 'Monza 24', livery: '#1E3A8A', initials: 'AL' },
    { name: 'Hadjar', moment: 'Baku 24', livery: '#2293D1', initials: 'IH' },
    { name: 'Hadjar', moment: 'Spa 24', livery: '#2293D1', initials: 'IH' },
    { name: 'Norris', moment: 'F3 podium 17', livery: '#FFD700', initials: 'LN' },
  ],
}

const POSITIONS: GhostPos[] = [
  { side: 'left', top: '8%', size: 110 },
  { side: 'left', top: '28%', size: 95 },
  { side: 'left', top: '50%', size: 120 },
  { side: 'left', top: '72%', size: 100 },
  { side: 'right', top: '6%', size: 105 },
  { side: 'right', top: '26%', size: 115 },
  { side: 'right', top: '48%', size: 95 },
  { side: 'right', top: '70%', size: 110 },
  { side: 'bottom', left: '12%', size: 100 },
  { side: 'bottom', left: '32%', size: 115 },
  { side: 'bottom', left: '54%', size: 95 },
  { side: 'bottom', left: '74%', size: 110 },
  { side: 'left', top: '88%', size: 85 },
]

const CARD_CONFIGS: CardConfig[] = [
  {
    key: 'f1',
    num: '1',
    tier: 'TIER 1',
    color: '#FF1E56',
    description: 'The pinnacle. Championships, constructors, and the drivers who shaped the modern era.',
    svgPath: 'M 0 12 L 40 12 L 50 2 L 80 22 L 110 6 L 140 18 L 170 10 L 200 16 L 240 12',
    iconLabel: 'ICONS',
    portraits: [
      { initials: 'AS', livery: '#FFD700', bg: '#1a1300' },
      { initials: 'AP', livery: '#E10600', bg: '#1a0000' },
      { initials: 'MS', livery: '#DC0000', bg: '#1a0000' },
      { initials: 'SV', livery: '#1E3A8A', bg: '#000814' },
      { initials: 'LH', livery: '#00D2BE', bg: '#001a17' },
    ],
  },
  {
    key: 'f2',
    num: '2',
    tier: 'TIER 2',
    color: '#00E5FF',
    description: 'The proving ground. Where the next generation of F1 talent earns the call-up.',
    svgPath: 'M 0 12 L 30 12 L 45 2 L 70 20 L 100 6 L 130 16 L 160 10 L 195 14 L 240 12',
    iconLabel: 'GRADUATED TO F1',
    portraits: [
      { initials: 'GR', livery: '#00D2BE', bg: '#001a17' },
      { initials: 'CL', livery: '#DC0000', bg: '#1a0000' },
      { initials: 'OP', livery: '#FF8700', bg: '#1a0c00' },
      { initials: 'MS', livery: '#0090FF', bg: '#000a14' },
      { initials: 'GB', livery: '#00FF00', bg: '#001a00' },
    ],
  },
  {
    key: 'f3',
    num: '3',
    tier: 'TIER 3',
    color: '#B026FF',
    description: 'The first rung. Where raw talent meets the pyramid for the first time.',
    svgPath: 'M 0 12 L 25 12 L 40 4 L 65 18 L 95 8 L 125 16 L 155 6 L 190 16 L 240 12',
    iconLabel: 'NOTABLE ALUMNI',
    portraits: [
      { initials: 'LN', livery: '#FFD700', bg: '#1a1300' },
      { initials: 'GR', livery: '#00D2BE', bg: '#001a17' },
      { initials: 'OP', livery: '#FF8700', bg: '#1a0c00' },
      { initials: 'KA', livery: '#00D2BE', bg: '#001a17' },
      { initials: 'AL', livery: '#1E3A8A', bg: '#000814' },
    ],
  },
]

const MEMORIAL_NAMES = ['Fangio', 'Clark', 'Stewart', 'Lauda', 'Senna', 'Prost', 'Schumacher']

/* ─── GhostCard ──────────────────────────────────────────────────────────────── */

function GhostCard({ moment, position }: { moment: MomentEntry; position: GhostPos }) {
  // Lazy init: runs only on mount (client-only — ghost cards never SSR), no hydration mismatch
  const [delay] = useState<number>(() => Math.random() * 0.7)
  const [active, setActive] = useState(false)

  useEffect(() => {
    let raf1: number, raf2: number
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setActive(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [])

  const initTransform =
    position.side === 'left'
      ? 'translateX(-40px)'
      : position.side === 'right'
        ? 'translateX(40px)'
        : 'translateY(40px)'

  const posStyle: React.CSSProperties = {
    position: 'absolute',
    width: position.size,
    height: Math.round(position.size * 1.25),
    opacity: active ? 0.92 : 0,
    transform: active ? 'translate(0,0)' : initTransform,
    transition: `opacity 0.7s ease ${delay}s, transform 0.9s ease ${delay}s`,
  }
  if (position.side === 'left') { posStyle.left = '2%'; posStyle.top = position.top }
  else if (position.side === 'right') { posStyle.right = '2%'; posStyle.top = position.top }
  else { posStyle.left = position.left; posStyle.bottom = '4%' }

  return (
    <div style={posStyle}>
      <div style={{
        width: '100%', height: '100%',
        background: `linear-gradient(135deg, ${moment.livery}22, #000 60%)`,
        border: `0.5px solid ${moment.livery}55`,
        borderRadius: 6, overflow: 'hidden', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 38%, ${moment.livery} 0%, ${moment.livery} 25%, transparent 55%)`,
          opacity: 0.8,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 35%, #000 92%)',
        }} />
        <span style={{
          position: 'absolute', top: 6, right: 6,
          fontFamily: 'var(--font-mono)', fontSize: 7, color: moment.livery, letterSpacing: 1,
        }}>
          {moment.initials}
        </span>
        <span style={{
          position: 'absolute', bottom: 14, left: 0, right: 0,
          textAlign: 'center', fontFamily: 'var(--font-sans)',
          fontSize: 9, fontWeight: 500, color: '#fff', letterSpacing: 0.5,
        }}>
          {moment.name}
        </span>
        <span style={{
          position: 'absolute', bottom: 4, left: 0, right: 0,
          textAlign: 'center', fontFamily: 'var(--font-mono)',
          fontSize: 7, color: '#888', letterSpacing: 1,
        }}>
          {moment.moment.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

/* ─── DriverPortrait ─────────────────────────────────────────────────────────── */

function DriverPortrait({ portrait }: { portrait: Portrait }) {
  return (
    <div style={{
      aspectRatio: '1',
      background: `linear-gradient(135deg, ${portrait.bg}, #000)`,
      border: '0.5px solid #222',
      borderRadius: 4, overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 50% 35%, ${portrait.livery} 0%, ${portrait.livery} 22%, transparent 40%)`,
        opacity: 0.7,
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '40%', background: 'linear-gradient(to top, #000, transparent)',
      }} />
      <span style={{
        position: 'absolute', bottom: 3, left: 4,
        fontFamily: 'var(--font-mono)', fontSize: 7, color: '#888',
      }}>
        {portrait.initials}
      </span>
    </div>
  )
}

/* ─── SeriesCard ─────────────────────────────────────────────────────────────── */

function SeriesCard({
  config,
  onMouseEnter,
  onMouseLeave,
}: {
  config: CardConfig
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const handleEnter = () => { setHovered(true); onMouseEnter() }
  const handleLeave = () => { setHovered(false); onMouseLeave() }

  return (
    <Link
      href={`/f/${config.num}`}
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        position: 'relative', background: '#080808',
        border: `1px solid ${hovered ? config.color : '#1a1a1a'}`,
        borderRadius: 10, padding: '24px 20px',
        overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? `0 0 32px ${config.color}55` : 'none',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 34, fontWeight: 400,
            color: config.color, letterSpacing: -1,
          }}>
            {`f(${config.num})`}
          </span>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            padding: '3px 8px', border: '0.5px solid #2a2a2a',
            borderRadius: 3, lineHeight: 1,
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 1, color: '#666' }}>
              FORMULA
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500,
              color: config.color, fontStyle: 'italic', marginTop: 2,
            }}>
              {config.num}
            </span>
          </div>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#666' }}>
          {config.tier}
        </span>
      </div>

      {/* Telemetry squiggle */}
      <svg viewBox="0 0 240 24" style={{ width: '100%', height: 20, margin: '0 0 16px', display: 'block' }} aria-hidden="true">
        <path d={config.svgPath} stroke={config.color} strokeWidth={1.2} fill="none" opacity={0.9} />
      </svg>

      {/* Description */}
      <p style={{ fontSize: 13, color: '#aaa', margin: '0 0 18px', lineHeight: 1.5 }}>
        {config.description}
      </p>

      {/* Driver portraits */}
      <div style={{ borderTop: '0.5px solid #1a1a1a', paddingTop: 14 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 12px' }}>
          {config.iconLabel}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
          {config.portraits.map((p) => (
            <DriverPortrait key={p.initials} portrait={p} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: config.color, letterSpacing: 1.5, margin: '18px 0 0' }}>
        ENTER →
      </p>
    </Link>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function GhostSummonPage() {
  const [ghostSeries, setGhostSeries] = useState<SeriesKey | null>(null)
  const [ghostVisible, setGhostVisible] = useState(false)
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = useCallback((series: SeriesKey) => {
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
    setGhostSeries(series)
    setGhostVisible(true)
  }, [])

  const handleLeave = useCallback(() => {
    setGhostVisible(false)
    // Keep ghostSeries mounted until the fade-out completes, then unmount
    clearTimerRef.current = setTimeout(() => setGhostSeries(null), 600)
  }, [])

  useEffect(() => {
    return () => { if (clearTimerRef.current) clearTimeout(clearTimerRef.current) }
  }, [])

  return (
    <div style={{ background: '#000', color: '#fff', position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>

      {/* Background decorative telemetry lines */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.3, zIndex: 1 }}
        viewBox="0 0 800 960"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="glow-home">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>
        <g filter="url(#glow-home)">
          <path d="M 0 140 Q 200 100, 400 180 T 800 160" stroke="#FF1E56" strokeWidth={1} fill="none" />
          <path d="M 0 220 Q 250 280, 500 240 T 800 280" stroke="#00E5FF" strokeWidth={1} fill="none" />
          <path d="M 0 560 Q 180 500, 380 580 T 800 540" stroke="#B026FF" strokeWidth={1} fill="none" />
          <path d="M 0 820 Q 300 860, 550 800 T 800 840" stroke="#00FF94" strokeWidth={1} fill="none" />
        </g>
      </svg>

      {/* Ghost layer — pointerEvents none so it never blocks the cards underneath */}
      <div
        style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none', zIndex: 5,
          opacity: ghostVisible ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/*
          key={ghostSeries} forces this subtree to remount when the series changes,
          giving each new set of ghosts a fresh entrance animation.
        */}
        <div key={ghostSeries}>
          {ghostSeries !== null &&
            MOMENTS[ghostSeries].slice(0, POSITIONS.length).map((moment, i) => (
              <GhostCard key={i} moment={moment} position={POSITIONS[i]} />
            ))}
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          opacity: ghostVisible ? 0.2 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* Nav */}
        <div style={{
          padding: '1.25rem 1.75rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '0.5px solid #1a1a1a',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 500, letterSpacing: -0.5 }}>
            f(x)
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#555' }}>
            FORMULA ANALYTICS
          </span>
        </div>

        {/* Hero text */}
        <div style={{ padding: '4rem 1.75rem 2.5rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: '#666', margin: '0 0 20px' }}>
            DRIVING STYLE · SETUP · PREDICTIONS
          </p>
          <h1 style={{ fontSize: 44, fontWeight: 400, margin: '0 0 14px', letterSpacing: -1, lineHeight: 1.05 }}>
            The function of<br />the grid.
          </h1>
          <p style={{ fontSize: 14, color: '#888', margin: '0 auto', maxWidth: 420, lineHeight: 1.6 }}>
            Every driver. Every track. Every team. Across three series and six decades of the sport.
          </p>
        </div>

        {/* Series cards */}
        <div style={{
          padding: '0 1.75rem 3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
        }}>
          {CARD_CONFIGS.map((config) => (
            <SeriesCard
              key={config.key}
              config={config}
              onMouseEnter={() => handleEnter(config.key)}
              onMouseLeave={handleLeave}
            />
          ))}
        </div>

        {/* Memorial strip */}
        <div style={{
          padding: '2.5rem 1.75rem 2rem',
          textAlign: 'center',
          borderTop: '0.5px solid #1a1a1a',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#444', margin: '0 0 24px' }}>
            — IN MEMORY OF THE GREATS WHO WROTE THE FUNCTION —
          </p>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap',
            fontFamily: 'var(--font-serif)', fontSize: 14, color: '#999', fontStyle: 'italic',
          }}>
            {MEMORIAL_NAMES.map((name, i) => (
              <Fragment key={name}>
                <span>{name}</span>
                {i < MEMORIAL_NAMES.length - 1 && <span style={{ color: '#444' }}>·</span>}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.75rem',
          borderTop: '0.5px solid #1a1a1a',
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#444',
        }}>
          <span>f(x) · v0.1</span>
          <span>EST. 2026</span>
        </div>
      </div>
    </div>
  )
}
