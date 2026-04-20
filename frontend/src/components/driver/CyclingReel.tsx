'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { ReelSlide } from '@/lib/types'

const DWELL_MS = 5000
const TICK_MS = 50

interface Props {
  slides: ReelSlide[]
  traceColor: string // series color hex, used for trace stroke
  left?: string // default '56%'
  borderColor?: string // default '#1a2847'
}

export default function CyclingReel({ slides, traceColor, left = '56%', borderColor = '#1a2847' }: Props) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progressPct, setProgressPct] = useState(0)
  // Increments each time a slide activates → forces trace path remount → restarts animation
  const [traceVersion, setTraceVersion] = useState(0)

  const pausedRef = useRef(paused)
  pausedRef.current = paused

  const show = useCallback((idx: number) => {
    setCurrent(idx)
    setProgressPct(0)
    setTraceVersion((v) => v + 1)
  }, [])

  // Auto-advance interval
  useEffect(() => {
    let pct = 0
    const id = setInterval(() => {
      if (pausedRef.current) return
      pct += (TICK_MS / DWELL_MS) * 100
      setProgressPct(Math.min(pct, 100))
      if (pct >= 100) {
        pct = 0
        setCurrent((c) => {
          const next = (c + 1) % slides.length
          setProgressPct(0)
          setTraceVersion((v) => v + 1)
          return next
        })
      }
    }, TICK_MS)
    return () => clearInterval(id)
  }, [slides.length])

  const handleReelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).dataset.dot) return
    setPaused((p) => !p)
  }

  return (
    <div
      onClick={handleReelClick}
      style={{
        position: 'absolute',
        top: 40, bottom: 120,
        left, right: '5%',
        borderRadius: 12, overflow: 'hidden',
        border: `0.5px solid ${borderColor}`,
        background: '#000',
        cursor: 'pointer',
      }}
    >
      {slides.map((slide, i) => {
        const isActive = i === current
        return (
          <div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.9s ease',
            }}
          >
            {/* Livery glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at 50% 40%, ${slide.glowColor} 0%, ${slide.glowColor} 30%, transparent 68%)`,
              opacity: 0.85,
            }} />
            {/* Vignette */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 50% 50%, transparent 35%, #000 94%)',
            }} />

            {/* Telemetry trace — key={traceVersion} forces remount on slide activation */}
            <svg
              viewBox="0 0 400 300"
              preserveAspectRatio="xMidYMid slice"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              aria-hidden="true"
            >
              <path
                key={isActive ? traceVersion : -1}
                d={slide.svgPath}
                stroke={traceColor}
                strokeWidth={1.8}
                fill="none"
                style={{
                  strokeDasharray: 500,
                  strokeDashoffset: 500,
                  animation: isActive ? 'traceIn 4.5s ease forwards' : 'none',
                }}
              />
              {slide.circles?.map((c, ci) => (
                <circle key={ci} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill} opacity={0.9} />
              ))}
            </svg>

            {/* Top-left slot label */}
            <div style={{
              position: 'absolute', top: 14, left: 16,
              fontFamily: 'var(--font-mono)', fontSize: 9,
              color: '#FFD700', letterSpacing: 1.5,
            }}>
              {slide.slotLabel}
            </div>

            {/* Top-right badge */}
            <div style={{
              position: 'absolute', top: 14, right: 16,
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: '#fff', letterSpacing: 1.5,
              background: 'rgba(0,0,0,0.5)',
              padding: '3px 9px', borderRadius: 3,
              border: '0.5px solid #333',
            }}>
              {slide.badge}
            </div>

            {/* Bottom content */}
            <div style={{ position: 'absolute', bottom: 44, left: 20, right: 20 }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 9,
                color: '#FFD700', letterSpacing: 1.5, margin: '0 0 4px',
              }}>
                {slide.kicker}
              </p>
              <p style={{ fontSize: 24, fontWeight: 400, margin: 0, color: '#fff', letterSpacing: -0.5 }}>
                {slide.headline}
              </p>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                color: '#aaa', margin: '4px 0 0', letterSpacing: 1,
              }}>
                {slide.meta}
              </p>
            </div>
          </div>
        )
      })}

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 2, background: 'rgba(255,255,255,0.08)',
      }}>
        <div style={{
          height: '100%',
          width: `${progressPct}%`,
          background: traceColor,
          transition: `width ${TICK_MS}ms linear`,
        }} />
      </div>

      {/* Slide dots */}
      <div style={{
        position: 'absolute', bottom: 10, left: 20,
        display: 'flex', gap: 4,
      }}>
        {slides.map((_, i) => (
          <span
            key={i}
            data-dot="true"
            onClick={(e) => { e.stopPropagation(); show(i) }}
            style={{
              display: 'block', width: 18, height: 2,
              background: i === current ? '#fff' : 'rgba(255,255,255,0.25)',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
