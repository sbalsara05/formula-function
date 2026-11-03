import Link from 'next/link'

export function SectionHeading({ label, meta, color, viewAllHref }: {
  label: string
  meta?: string
  color: string
  viewAllHref?: string
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 16, paddingTop: '2rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color, margin: 0 }}>
        {label}
      </p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
        {meta && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            {meta}
          </p>
        )}
        {viewAllHref && (
          <Link href={viewAllHref} style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color,
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            VIEW ALL →
          </Link>
        )}
      </div>
    </div>
  )
}

export function PageIntro({ kicker, title, meta, color }: {
  kicker: string
  title: string
  meta?: string
  color: string
}) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '3.5rem 1.75rem 2.25rem' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 8% 0%, ${color}14 0%, transparent 55%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'relative' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color, margin: '0 0 14px' }}>
          {kicker}
        </p>
        <h1 style={{ fontSize: 'clamp(40px, 5vw, 62px)', fontWeight: 400, color: '#fff', letterSpacing: -2, lineHeight: 0.95, margin: 0 }}>
          {title}
        </h1>
        {meta && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#444', margin: '16px 0 0' }}>
            {meta}
          </p>
        )}
      </div>
    </div>
  )
}
