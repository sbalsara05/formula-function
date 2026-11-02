'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SeriesNav({ basePath, links, accentColor }: {
  basePath: string
  links: { href: string; label: string }[]
  accentColor: string
}) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Series sections"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        minWidth: 0,
      }}
    >
      {links.map(link => {
        const isActive = link.href === basePath
          ? pathname === basePath
          : pathname === link.href || pathname.startsWith(`${link.href}/`)
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: isActive ? accentColor : '#888',
              letterSpacing: 1.5,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'color 0.25s ease',
            }}
          >
            {link.label}
          </Link>
        )
      })}
      <Link href="/" style={{
        fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1,
        textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 4,
      }}>
        ← ALL SERIES
      </Link>
    </nav>
  )
}
