import type { CSSProperties } from 'react'
import FallbackImg from '@/components/ui/FallbackImg'
import type { F1NewsItem } from '@/lib/f1-news'

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.max(0, Math.floor(diffMs / 60_000))
  if (mins < 60) return `${mins}M AGO`
  const hours = Math.floor(mins / 60)
  if (hours < 48) return `${hours}H AGO`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }).toUpperCase()
}

function NewsImage({
  src,
  alt,
  style,
}: {
  src?: string
  alt: string
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        background: 'linear-gradient(145deg, #141414 0%, #080808 100%)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {src && (
        <FallbackImg
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
    </div>
  )
}

const cardBase: CSSProperties = {
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  background: '#060606',
  border: '0.5px solid #1a1a1a',
  borderRadius: 8,
  overflow: 'hidden',
}

function FeaturedCard({
  item,
  accentColor,
  spanRows,
}: {
  item: F1NewsItem
  accentColor: string
  spanRows: boolean
}) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...cardBase,
        position: 'relative',
        minHeight: spanRows ? 380 : 320,
        gridRow: spanRows ? 'span 2' : undefined,
      }}
    >
      <NewsImage
        src={item.thumbnail}
        alt={item.title}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.94) 100%)',
      }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '28px 28px 26px' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: 2,
          color: accentColor,
          margin: '0 0 12px',
        }}>
          FEATURED · FORMULA1.COM
        </p>
        <h3 style={{
          fontSize: 'clamp(20px, 2.2vw, 28px)',
          fontWeight: 500,
          color: '#fff',
          margin: '0 0 10px',
          lineHeight: 1.25,
          letterSpacing: -0.4,
        }}>
          {item.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          color: '#888',
          margin: 0,
          letterSpacing: 1,
        }}>
          READ STORY →
        </p>
      </div>
    </a>
  )
}

function SideCard({ item }: { item: F1NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...cardBase,
        display: 'grid',
        gridTemplateColumns: '140px 1fr',
        alignItems: 'stretch',
        flex: 1,
        minHeight: 0,
      }}
    >
      <NewsImage src={item.thumbnail} alt={item.title} style={{ minHeight: 112 }} />
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{
          fontSize: 13,
          fontWeight: 500,
          color: '#ddd',
          margin: '0 0 8px',
          lineHeight: 1.4,
          letterSpacing: -0.2,
        }}>
          {item.title}
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 8,
          color: '#555',
          margin: 0,
          letterSpacing: 1,
        }}>
          READ →
        </p>
      </div>
    </a>
  )
}

function GridCard({ item }: { item: F1NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={cardBase}
    >
      <NewsImage src={item.thumbnail} alt={item.title} style={{ aspectRatio: '16/9' }} />
      <div style={{ padding: '14px 16px 16px' }}>
        <p style={{
          fontSize: 13,
          fontWeight: 500,
          color: '#ddd',
          margin: 0,
          lineHeight: 1.45,
          letterSpacing: -0.2,
        }}>
          {item.title}
        </p>
      </div>
    </a>
  )
}

export function F1NewsSection({
  items,
  fetchedAt,
  accentColor,
}: {
  items: F1NewsItem[]
  fetchedAt: string
  accentColor: string
}) {
  const [featured, ...rest] = items
  const sideStories = rest.slice(0, 2)
  const gridStories = rest.slice(2)

  return (
    <section
      id="news"
      style={{
        padding: '2.5rem 1.75rem 3rem',
        borderTop: '0.5px solid #1a1a1a',
        scrollMarginTop: 64,
        background: '#000',
        isolation: 'isolate',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '0 0 20px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: accentColor, margin: 0 }}>
          LATEST NEWS
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
          UPDATED · {formatRelativeTime(fetchedAt)} · SOURCE · FORMULA1.COM
        </p>
      </div>

      {items.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555', margin: 0, letterSpacing: 0.5 }}>
          News unavailable — check{' '}
          <a href="https://www.formula1.com/en/latest" style={{ color: accentColor, textDecoration: 'none' }}>
            formula1.com/en/latest
          </a>
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Hero row — athletics-style lead + stacked sidebar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: featured && sideStories.length > 0 ? '1.55fr 1fr' : '1fr',
            gridTemplateRows: sideStories.length > 1 ? '1fr 1fr' : 'auto',
            gap: 12,
            minHeight: sideStories.length > 0 ? 380 : undefined,
          }}>
            {featured && (
              <FeaturedCard
                item={featured}
                accentColor={accentColor}
                spanRows={sideStories.length > 1}
              />
            )}
            {sideStories.length > 0 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                gridRow: sideStories.length > 1 ? 'span 2' : undefined,
                height: sideStories.length > 1 ? '100%' : undefined,
              }}>
                {sideStories.map(item => (
                  <SideCard key={item.url} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Lower grid */}
          {gridStories.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 12,
            }}>
              {gridStories.map(item => (
                <GridCard key={item.url} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
