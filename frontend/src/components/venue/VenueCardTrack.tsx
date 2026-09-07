'use client'

import { useLayoutEffect, useRef, useState } from 'react'

type Frame = {
  viewBox: string
  rotate: number
  cx: number
  cy: number
  strokeWidth: number
}

/**
 * Venue browse-card track silhouette.
 * Fits the path with padding (no clipping) and rotates 90° when taller than wide
 * so the long axis reads horizontally in the card.
 */
export default function VenueCardTrack({
  d,
  color,
  flipVertical = false,
  flipHorizontal = false,
}: {
  d: string
  color: string
  flipVertical?: boolean
  flipHorizontal?: boolean
}) {
  const pathRef = useRef<SVGPathElement>(null)
  const [frame, setFrame] = useState<Frame | null>(null)

  useLayoutEffect(() => {
    const path = pathRef.current
    if (!path) return
    const b = path.getBBox()
    if (!b.width || !b.height) return

    const pad = Math.max(b.width, b.height) * 0.12 + 10
    const cx = b.x + b.width / 2
    const cy = b.y + b.height / 2
    const tall = b.height > b.width * 1.05
    const strokeWidth = Math.max(10, Math.min(b.width, b.height) * 0.04)

    if (tall) {
      // After rotate(90), extents swap around the center.
      setFrame({
        viewBox: `${cx - b.height / 2 - pad} ${cy - b.width / 2 - pad} ${b.height + pad * 2} ${b.width + pad * 2}`,
        rotate: 90,
        cx,
        cy,
        strokeWidth,
      })
    } else {
      setFrame({
        viewBox: `${b.x - pad} ${b.y - pad} ${b.width + pad * 2} ${b.height + pad * 2}`,
        rotate: 0,
        cx,
        cy,
        strokeWidth,
      })
    }
  }, [d])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: 10,
        top: 10,
        bottom: 10,
        width: '52%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox={frame?.viewBox ?? '0 0 500 500'}
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%',
          height: '100%',
          opacity: frame ? 0.34 : 0,
          overflow: 'visible',
          transform:
            flipVertical || flipHorizontal
              ? `scale(${flipHorizontal ? -1 : 1}, ${flipVertical ? -1 : 1})`
              : undefined,
        }}
      >
        <g transform={frame && frame.rotate ? `rotate(${frame.rotate} ${frame.cx} ${frame.cy})` : undefined}>
          <path
            ref={pathRef}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={frame?.strokeWidth ?? 12}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  )
}
