import Link from 'next/link'
import { SERIES_CONFIG, SERIES_SECTIONS, SECTION_LABELS, type SeriesNum } from '@/data/series-config'
import { SeriesNav } from './SeriesNav'

export function SeriesHeader({ series }: { series: SeriesNum }) {
  const config = SERIES_CONFIG[series]
  const basePath = `/f/${series}`
  const links = [
    { href: basePath, label: 'OVERVIEW' },
    ...SERIES_SECTIONS[series].map(section => ({ href: `${basePath}/${section}`, label: SECTION_LABELS[section] })),
  ]

  return (
    <header style={{
      padding: '1rem 1.75rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      gap: 20,
      borderBottom: '0.5px solid #1a1a1a',
      background: '#000',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
        <Link href="/" style={{ textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, color: '#fff', letterSpacing: -0.5 }}>
          f(x)
        </Link>
        <span style={{ color: '#1a1a1a', fontFamily: 'var(--font-mono)' }}>/</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color }}>
          F({series}) · {config.name.toUpperCase()}
        </span>
      </div>
      <SeriesNav basePath={basePath} links={links} accentColor={config.color} />
    </header>
  )
}
