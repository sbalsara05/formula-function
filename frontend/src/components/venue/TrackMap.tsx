'use client'

import { useState, useRef, useCallback } from 'react'
import type { Hotspot, MomentOverlay } from '@/lib/types'

interface Props {
  trackPath: string
  entityColor: string
  hotspots: Hotspot[]
  overlays: MomentOverlay[]
  trackLocation?: string
}

interface TooltipState {
  label: string
  overlay: MomentOverlay | null
  x: number
  y: number
}

function traceToPath(points: [number, number][]): string {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]},${p[1]}`)
    .join(' ')
}

export default function TrackMap({ trackPath, entityColor, hotspots, overlays, trackLocation }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [activeOverlay, setActiveOverlay] = useState<MomentOverlay | null>(null)
  const [animKey, setAnimKey] = useState(0)

  const overlayMap = new Map(overlays.map(o => [o.momentId, o]))

  const handleMouseEnter = useCallback((h: Hotspot) => {
    if (h.type === 'passive') return
    const ov = h.momentId ? (overlayMap.get(h.momentId) ?? null) : null
    setTooltip({ label: h.cornerLabel, overlay: ov, x: 0, y: 0 })
  }, [overlays])

  const handleMouseMove = useCallback((e: React.MouseEvent, h: Hotspot) => {
    if (h.type === 'passive' || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setTooltip(prev => prev ? { ...prev, x: e.clientX - rect.left + 14, y: e.clientY - rect.top + 14 } : null)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTooltip(null)
  }, [])

  const handleClick = useCallback((h: Hotspot) => {
    if (h.type !== 'iconic' || !h.momentId) return
    const ov = overlayMap.get(h.momentId)
    if (!ov) return
    setTooltip(null)
    setActiveOverlay(ov)
    setAnimKey(k => k + 1)
  }, [overlays])

  const closeOverlay = useCallback(() => {
    setActiveOverlay(null)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 40, bottom: 120,
        left: '52%', right: '4%',
        borderRadius: 12, overflow: 'hidden',
        border: '0.5px solid #1a3a24',
        background: 'linear-gradient(180deg, #0a1a10 0%, #000 100%)',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 30%, ${entityColor} 0%, ${entityColor} 20%, transparent 55%)`,
        opacity: 0.18,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 50%, transparent 40%, #000 95%)',
        pointerEvents: 'none',
      }} />

      {/* Map layer */}
      <div
        style={{
          position: 'absolute', inset: 0,
          opacity: activeOverlay ? 0.15 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        <svg
          viewBox="0 0 500 500"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          role="img"
          aria-label={trackLocation ? `${trackLocation} circuit map with interactive hotspots` : 'Circuit map with interactive hotspots'}
        >
          {/* Accurate GPS-derived track path */}
          <path
            d={trackPath}
            fill="none"
            stroke={entityColor}
            strokeWidth={7}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.65}
          />

          {/* Hotspots */}
          {hotspots.map(h => {
            const cx = (h.x / 100) * 500
            const cy = (h.y / 100) * 500
            const label = h.cornerLabel.toUpperCase()
            const labelW = Math.max(label.length * 5.2, 44)
            if (h.type === 'legendary') {
              return (
                <g key={h.id}>
                  <circle cx={cx} cy={cy} r={5} fill="none" stroke="#FF1E56" strokeWidth={1} strokeDasharray="1.5,1.5" opacity={0.85} />
                  <text
                    x={cx}
                    y={cy - 10}
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize={8}
                    fill="#FF1E56"
                    letterSpacing={0.5}
                  >
                    {label}
                  </text>
                  <rect
                    x={cx - 22} y={cy + 2}
                    width={labelW} height={9}
                    rx={2}
                    fill="rgba(255,30,86,0.12)"
                    stroke="#FF1E56" strokeWidth={0.5}
                    opacity={0.9}
                  />
                  <text
                    x={cx}
                    y={cy + 8}
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize={6}
                    fill="#FF1E56"
                    letterSpacing={1}
                  >
                    LEGENDARY
                  </text>
                </g>
              )
            }
            if (h.type === 'passive') {
              return (
                <g key={h.id}>
                  <circle cx={cx} cy={cy} r={2.5} fill="#444" />
                  <text
                    x={cx + 5} y={cy + 3}
                    fontFamily="monospace"
                    fontSize={7}
                    fill="#555"
                    letterSpacing={0.3}
                  >
                    {h.cornerLabel.toUpperCase()}
                  </text>
                </g>
              )
            }
            // iconic
            return (
              <g
                key={h.id}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => handleMouseEnter(h)}
                onMouseMove={e => handleMouseMove(e, h)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(h)}
              >
                <circle cx={cx} cy={cy} r={7} fill="rgba(255,215,0,0.08)" />
                <circle cx={cx} cy={cy} r={5} fill="#FFD700" />
                <text
                  x={cx + 9} y={cy + 3}
                  fontFamily="monospace"
                  fontSize={7}
                  fill="#aaa"
                  letterSpacing={0.3}
                >
                  {h.cornerLabel.toUpperCase()}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Corner labels */}
        <div style={{ position: 'absolute', bottom: 14, left: 14, fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', letterSpacing: 1 }}>
          CLICK CORNERS FOR OVERTAKES
        </div>
        {trackLocation && (
          <div style={{ position: 'absolute', top: 14, right: 14, fontFamily: 'var(--font-mono)', fontSize: 8, color: entityColor, letterSpacing: 1 }}>
            {trackLocation}
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 7, height: 7, background: '#FFD700', borderRadius: '50%', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: '#FFD700', letterSpacing: 1 }}>OVERTAKE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 7, height: 7, border: '1px solid #FF1E56', borderRadius: '50%', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: '#FF1E56', letterSpacing: 1 }}>LEGENDARY</span>
          </div>
        </div>
      </div>

      {/* Moment overlay */}
      {activeOverlay && (
        <div style={{ position: 'absolute', inset: 0, background: '#000' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 40%, #FFD700 0%, #FFD700 22%, transparent 60%)',
            opacity: 0.65,
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 50%, transparent 30%, #000 92%)',
          }} />

          {/* Animated racing lines */}
          <svg
            viewBox="0 0 400 300"
            preserveAspectRatio="xMidYMid slice"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            aria-hidden="true"
          >
            {activeOverlay.defenderTrace && (
              <path
                key={`def-${animKey}`}
                d={traceToPath(activeOverlay.defenderTrace as [number, number][])}
                stroke="#666"
                strokeWidth={1.5}
                fill="none"
                strokeDasharray="4,3"
                style={{
                  strokeDashoffset: 600,
                  animation: 'traceIn 2.4s ease forwards',
                  opacity: 0,
                }}
              />
            )}
            {activeOverlay.overtakerTrace && (
              <path
                key={`ov-${animKey}`}
                d={traceToPath(activeOverlay.overtakerTrace as [number, number][])}
                stroke="#fff"
                strokeWidth={1.8}
                fill="none"
                style={{
                  strokeDasharray: 600,
                  strokeDashoffset: 600,
                  animation: 'traceIn 1.9s 0.4s ease forwards',
                  opacity: 0,
                }}
              />
            )}
          </svg>

          {/* Close button */}
          <button
            onClick={closeOverlay}
            style={{
              position: 'absolute', top: 14, right: 14,
              background: 'rgba(0,0,0,0.6)', border: '0.5px solid #333',
              color: '#aaa', fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: 1, padding: '6px 12px', borderRadius: 4,
              cursor: 'pointer', zIndex: 20,
            }}
          >
            × CLOSE
          </button>

          {/* Overlay header */}
          <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 8, color: '#FFD700',
              background: 'rgba(255,215,0,0.1)', padding: '3px 7px',
              borderRadius: 3, border: '0.5px solid rgba(255,215,0,0.3)', letterSpacing: 1.5,
            }}>
              OVERTAKE
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#FFD700', letterSpacing: 1.5 }}>
              {activeOverlay.cornerLabel.toUpperCase()}
            </span>
          </div>

          {/* Overlay content */}
          <div style={{ position: 'absolute', bottom: 60, left: 22, right: 22 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#FFD700', letterSpacing: 1.5, margin: '0 0 6px' }}>
              {activeOverlay.year} · {activeOverlay.description}
            </p>
            <p style={{ fontSize: 22, fontWeight: 400, margin: 0, color: '#fff', letterSpacing: -0.5, lineHeight: 1.15 }}>
              {activeOverlay.title}
            </p>
          </div>

          {/* Legend */}
          <div style={{ position: 'absolute', bottom: 14, left: 22, right: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14, fontFamily: 'var(--font-mono)', fontSize: 8, color: '#777', letterSpacing: 1 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 1.5, background: '#fff', display: 'block' }} />
                OVERTAKER
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 1.5, background: '#666', borderTop: '1px dashed #666', display: 'block' }} />
                DEFENDER
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#444' }}>
              [SCHEMATIC · NOT VERIFIED]
            </span>
          </div>
        </div>
      )}

      {/* Tooltip */}
      {tooltip && !activeOverlay && (
        <div
          style={{
            position: 'absolute',
            left: Math.min(tooltip.x, 240),
            top: Math.min(tooltip.y, 260),
            background: 'rgba(0,0,0,0.95)',
            border: '0.5px solid #2a2a2a',
            borderRadius: 6, padding: '10px 12px',
            fontFamily: 'var(--font-mono)', fontSize: 10, color: '#fff',
            pointerEvents: 'none', zIndex: 15, minWidth: 180,
          }}
        >
          <div style={{ color: '#FFD700', letterSpacing: 1, fontSize: 8, marginBottom: 4 }}>
            {tooltip.label.toUpperCase()}
          </div>
          {tooltip.overlay && (
            <>
              <div style={{ color: '#fff', fontSize: 11, marginBottom: 4 }}>
                {tooltip.overlay.title}
              </div>
              <div style={{ color: '#888', letterSpacing: 1, fontSize: 8 }}>
                {tooltip.overlay.year} · {tooltip.overlay.description}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
