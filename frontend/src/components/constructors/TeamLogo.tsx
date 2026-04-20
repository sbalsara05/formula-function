'use client'
import { useState } from 'react'

export function TeamLogo({
  logo,
  abbr,
  color,
  size = 36,
}: {
  logo?: string
  abbr: string
  color: string
  size?: number
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div style={{
      width: size, height: size,
      background: color + '18',
      borderRadius: 4,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', flexShrink: 0,
    }}>
      {logo && !failed ? (
        <img
          src={logo}
          alt={abbr}
          width={size - 8}
          height={size - 8}
          style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.85 }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: Math.max(7, Math.round(size * 0.24)),
          color, fontWeight: 500, letterSpacing: 0, textAlign: 'center', lineHeight: 1,
        }}>
          {abbr}
        </span>
      )}
    </div>
  )
}
