'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import type { Hotspot, MomentOverlay } from '@/lib/types'

/** Subject box, as percentages of the source photo (x/y is the center). */
type ImageFocus = { x: number; y: number; w: number; h: number }
type PhotoBox = { url: string; w: number; h: number; x: number; y: number }

const DEFAULT_FOCUS: ImageFocus = { x: 50, y: 48, w: 80, h: 72 }

// Boxes are the car or driver plus a little context. The photo box
// scales until that box fills it, with the caption sitting underneath.
const IMAGE_FOCUS: Record<string, ImageFocus> = {
  '/images/venues/spa-schumacher-2011.jpg': { x: 58, y: 52, w: 76, h: 58 },
  '/images/venues/spa-busstop-2008.jpg': { x: 44, y: 58, w: 40, h: 30 },
  '/images/venues/monaco-senna-1992.jpg': { x: 50, y: 46, w: 52, h: 72 },
  '/images/venues/silverstone-hamilton-2021.jpg': { x: 52, y: 76, w: 22, h: 16 },
  '/images/venues/silverstone-mansell-1987.jpg': { x: 50, y: 48, w: 78, h: 70 },
  '/images/venues/suzuka-senna-prost-1989.jpg': { x: 48, y: 58, w: 84, h: 52 },
  '/images/venues/interlagos-vettel-2012.jpg': { x: 64, y: 40, w: 44, h: 68 },
  '/images/venues/interlagos-2008-wet.jpg': { x: 48, y: 62, w: 68, h: 46 },
  '/images/venues/abu-dhabi-mercedes-2021.jpg': { x: 50, y: 58, w: 78, h: 54 },
  '/images/venues/abu-dhabi-rosberg-2016.jpg': { x: 48, y: 58, w: 76, h: 52 },
  '/images/venues/jeddah-verstappen-2022.jpg': { x: 42, y: 48, w: 48, h: 72 },
  '/images/venues/albert-park-ralf-2002.jpg': { x: 44, y: 42, w: 68, h: 52 },
  '/images/venues/albert-park-ferrari-2003.jpg': { x: 50, y: 38, w: 82, h: 48 },
  '/images/venues/shanghai-hamilton-2007.jpg': { x: 66, y: 72, w: 26, h: 20 },
  '/images/venues/shanghai-hamilton-2011.jpg': { x: 50, y: 52, w: 86, h: 68 },
  '/images/venues/imola-senna-1994.jpg': { x: 44, y: 42, w: 52, h: 62 },
  '/images/venues/canada-button-2011.jpg': { x: 40, y: 50, w: 42, h: 68 },
  '/images/venues/barcelona-senna-mansell-1991.jpg': { x: 52, y: 72, w: 34, h: 24 },
  '/images/venues/barcelona-verstappen-2016.jpg': { x: 42, y: 46, w: 68, h: 72 },
  '/images/venues/barcelona-verstappen-2021.jpg': { x: 50, y: 54, w: 74, h: 62 },
  '/images/venues/hungary-ocon-2021.jpg': { x: 56, y: 74, w: 56, h: 32 },
  '/images/venues/hungary-hamilton-2020.jpg': { x: 48, y: 46, w: 68, h: 72 },
  '/images/venues/zandvoort-verstappen-2021.jpg': { x: 48, y: 44, w: 62, h: 70 },
  '/images/venues/baku-verstappen-tyre-2021.jpg': { x: 48, y: 54, w: 84, h: 68 },
  '/images/venues/baku-hamilton-2021.jpg': { x: 40, y: 74, w: 24, h: 28 },
  '/images/venues/baku-perez-2021.jpg': { x: 52, y: 60, w: 62, h: 48 },
  '/images/venues/singapore-sainz-2023.jpg': { x: 66, y: 46, w: 36, h: 62 },
  '/images/venues/singapore-alonso-vettel-2012.jpg': { x: 32, y: 40, w: 52, h: 64 },
  '/images/venues/cota-hamilton-2012.jpg': { x: 48, y: 54, w: 74, h: 54 },
  '/images/venues/mexico-verstappen-2017.jpg': { x: 48, y: 58, w: 84, h: 52 },
  '/images/venues/mexico-verstappen-2022.jpg': { x: 42, y: 48, w: 52, h: 72 },
  '/images/venues/las-vegas-drain-2023.jpg': { x: 50, y: 46, w: 84, h: 68 },
  '/images/venues/las-vegas-verstappen-2023.jpg': { x: 56, y: 42, w: 46, h: 58 },
}

function focusFor(src: string): ImageFocus {
  try {
    const path = src.startsWith('http') ? new URL(src).pathname : src
    return IMAGE_FOCUS[decodeURIComponent(path)] ?? DEFAULT_FOCUS
  } catch {
    return DEFAULT_FOCUS
  }
}

function measurePhoto(img: HTMLImageElement, frame: HTMLElement): Omit<PhotoBox, 'url'> | null {
  const box = frame.getBoundingClientRect()
  if (box.width < 2 || box.height < 2 || !img.naturalWidth) return null
  const focus = focusFor(img.currentSrc || img.src)
  const nw = img.naturalWidth
  const nh = img.naturalHeight
  const sw = Math.max(1, (nw * focus.w) / 100)
  const sh = Math.max(1, (nh * focus.h) / 100)
  const cover = Math.max(box.width / nw, box.height / nh)
  const usableH = box.height * 0.94
  const fitSubject = Math.min(box.width / sw, usableH / sh)
  const scale = Math.min(Math.max(cover, fitSubject), cover * 3)
  const dw = nw * scale
  const dh = nh * scale
  let left = box.width * 0.5 - dw * (focus.x / 100)
  let top = box.height * 0.5 - dh * (focus.y / 100)
  left = Math.min(0, Math.max(box.width - dw, left))
  top = Math.min(0, Math.max(box.height - dh, top))
  return { w: dw, h: dh, x: left, y: top }
}

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

export default function TrackMap({ trackPath, entityColor, hotspots, overlays, trackLocation }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [activeOverlay, setActiveOverlay] = useState<MomentOverlay | null>(null)
  const [photoFailed, setPhotoFailed] = useState(false)
  const [photoBox, setPhotoBox] = useState<PhotoBox | null>(null)
  const hasIconic = hotspots.some(h => h.type === 'iconic')
  const hasLegendary = hotspots.some(h => h.type === 'legendary')

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
    setPhotoFailed(false)
    setActiveOverlay(ov)
  }, [overlays])

  const closeOverlay = useCallback(() => {
    setActiveOverlay(null)
  }, [])

  const framePhoto = useCallback(() => {
    const img = photoRef.current
    const frame = frameRef.current
    if (!img || !frame) return
    const next = measurePhoto(img, frame)
    if (!next) return
    const url = img.getAttribute('src') ?? ''
    setPhotoBox(prev => {
      if (
        prev &&
        prev.url === url &&
        Math.abs(prev.w - next.w) < 0.5 &&
        Math.abs(prev.h - next.h) < 0.5 &&
        Math.abs(prev.x - next.x) < 0.5 &&
        Math.abs(prev.y - next.y) < 0.5
      ) return prev
      return { ...next, url }
    })
  }, [])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame || !activeOverlay?.imageUrl || photoFailed) return
    const observer = new ResizeObserver(() => framePhoto())
    observer.observe(frame)
    framePhoto()
    return () => observer.disconnect()
  }, [activeOverlay, photoFailed, framePhoto])

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
            const labelLeft = h.x > 72
            if (h.type === 'passive') {
              return (
                <g key={h.id}>
                  <circle cx={cx} cy={cy} r={2.5} fill="#444" />
                  <text
                    x={labelLeft ? cx - 6 : cx + 5}
                    y={cy + 3}
                    textAnchor={labelLeft ? 'end' : 'start'}
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
                  x={labelLeft ? cx - 8 : cx + 9}
                  y={cy + 3}
                  textAnchor={labelLeft ? 'end' : 'start'}
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

        {hasIconic && (
          <div style={{ position: 'absolute', bottom: 14, left: 14, fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', letterSpacing: 1 }}>
            CLICK CORNERS FOR THE MOMENT
          </div>
        )}
        {trackLocation && (
          <div style={{ position: 'absolute', top: 14, right: 14, fontFamily: 'var(--font-mono)', fontSize: 8, color: entityColor, letterSpacing: 1 }}>
            {trackLocation}
          </div>
        )}
        {(hasIconic || hasLegendary) && (
          <div style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            {hasIconic && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 7, height: 7, background: '#FFD700', borderRadius: '50%', display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: '#FFD700', letterSpacing: 1 }}>MOMENT</span>
              </div>
            )}
            {hasLegendary && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 7, height: 7, border: '1px solid #FF1E56', borderRadius: '50%', display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: '#FF1E56', letterSpacing: 1 }}>LEGENDARY</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Moment overlay */}
      {activeOverlay && (
        <div data-moment-panel style={{ position: 'absolute', inset: 0, background: '#000', display: 'flex', flexDirection: 'column' }}>
          <div ref={frameRef} style={{ position: 'relative', flex: '1 1 56%', minHeight: '52%', overflow: 'hidden' }}>
            {activeOverlay.imageUrl && !photoFailed ? (
              <img
                key={activeOverlay.imageUrl}
                ref={photoRef}
                src={activeOverlay.imageUrl}
                alt=""
                onLoad={framePhoto}
                onError={() => setPhotoFailed(true)}
                style={{
                  position: 'absolute',
                  top: photoBox?.url === activeOverlay.imageUrl ? photoBox.y : 0,
                  left: photoBox?.url === activeOverlay.imageUrl ? photoBox.x : 0,
                  width: photoBox?.url === activeOverlay.imageUrl ? photoBox.w : '100%',
                  height: photoBox?.url === activeOverlay.imageUrl ? photoBox.h : '100%',
                  maxWidth: 'none',
                  objectFit: 'fill',
                  opacity: photoBox?.url === activeOverlay.imageUrl ? 1 : 0,
                }}
              />
            ) : (
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at 50% 40%, ${entityColor} 0%, ${entityColor} 18%, transparent 60%)`,
                opacity: 0.55,
              }} />
            )}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 28%)',
              pointerEvents: 'none',
            }} />
            <button
              onClick={closeOverlay}
              style={{
                position: 'absolute', top: 10, right: 10,
                background: 'rgba(0,0,0,0.6)', border: '0.5px solid #333',
                color: '#aaa', fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: 1, padding: '6px 10px', borderRadius: 4,
                cursor: 'pointer', zIndex: 20,
              }}
            >
              × CLOSE
            </button>
            <div style={{ position: 'absolute', top: 12, left: 12 }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 8, color: '#FFD700',
                background: 'rgba(255,215,0,0.1)', padding: '3px 7px',
                borderRadius: 3, border: '0.5px solid rgba(255,215,0,0.3)', letterSpacing: 1.5,
              }}>
                MOMENT
              </span>
            </div>
          </div>

          <div style={{ flex: '0 1 auto', maxHeight: '46%', overflow: 'auto', padding: '12px 16px 14px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#FFD700', letterSpacing: 1.2, margin: '0 0 6px' }}>
              {activeOverlay.year} · {activeOverlay.cornerLabel.toUpperCase()} · {activeOverlay.description}
            </p>
            <p style={{ fontSize: 20, fontWeight: 400, margin: 0, color: '#fff', letterSpacing: -0.4, lineHeight: 1.15 }}>
              {activeOverlay.title}
            </p>
            <p style={{ fontSize: 13, color: '#ddd', lineHeight: 1.4, margin: '8px 0 0' }}>
              {activeOverlay.body}
            </p>
            {activeOverlay.imageNote && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#888', letterSpacing: 0.3, margin: '8px 0 0' }}>
                {activeOverlay.imageNote}
              </p>
            )}
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
