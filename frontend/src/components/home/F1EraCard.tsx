import Link from 'next/link'
import type { CSSProperties } from 'react'
import FallbackImg from '@/components/ui/FallbackImg'
import type { F1EraDetail } from '@/data/f1-eras'

export type F1Era = F1EraDetail

function EraCardInner({ era, wide }: { era: F1EraDetail; wide?: boolean }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }}>
        <FallbackImg
          src={era.imageUrl}
          alt=""
          ariaHidden
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: wide ? 'center 40%' : 'center center',
            display: 'block',
            filter: 'saturate(0.9) brightness(0.5)',
          }}
        />
      </div>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at 0% 0%, ${era.color}30 0%, transparent 50%),
          linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.92) 100%)
        `,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: era.color, opacity: 0.85,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: wide ? '32px 36px 28px' : '28px 28px 24px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 16,
          gap: 16,
        }}>
          <div style={{ maxWidth: wide ? '62%' : undefined }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, color: era.color,
              letterSpacing: 2, margin: '0 0 8px',
            }}>
              {era.years}
            </p>
            <h3 style={{
              fontSize: wide ? 24 : 20,
              fontWeight: 500,
              color: '#fff',
              margin: '0 0 8px',
              letterSpacing: -0.5,
              textShadow: '0 1px 12px rgba(0,0,0,0.6)',
            }}>
              {era.name}
            </h3>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, color: '#aaa',
              margin: 0, letterSpacing: 0.5,
            }}>
              {era.drivers.toUpperCase()}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
            {[era.stat1, era.stat2].map(s => (
              <div key={s.label} style={{ textAlign: 'right' }}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 400,
                  color: era.color, margin: '0 0 2px', letterSpacing: -1, lineHeight: 1,
                  textShadow: '0 1px 10px rgba(0,0,0,0.5)',
                }}>
                  {s.value}
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 8, color: '#888',
                  letterSpacing: 1, margin: 0,
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: wide ? 14 : 13, color: '#bbb', margin: 0, lineHeight: 1.6,
          maxWidth: wide ? '72%' : undefined,
          textShadow: '0 1px 8px rgba(0,0,0,0.7)',
        }}>
          {era.flavor}
        </p>
      </div>
    </>
  )
}

const cardBaseStyle: CSSProperties = {
  gridColumn: undefined,
  background: '#080808',
  border: '0.5px solid #1a1a1a',
  borderRadius: 10,
  position: 'relative',
  overflow: 'hidden',
}

export function F1EraCard({
  era,
  wide,
  href,
}: {
  era: F1EraDetail
  wide?: boolean
  href?: string
}) {
  const style: CSSProperties = {
    ...cardBaseStyle,
    gridColumn: wide ? '1 / -1' : undefined,
    minHeight: wide ? 280 : 248,
    display: 'block',
  }

  if (href) {
    return (
      <Link href={href} className="era-card-link" style={{ ...style, textDecoration: 'none', color: 'inherit' }}>
        <EraCardInner era={era} wide={wide} />
      </Link>
    )
  }

  return (
    <div style={style}>
      <EraCardInner era={era} wide={wide} />
    </div>
  )
}
