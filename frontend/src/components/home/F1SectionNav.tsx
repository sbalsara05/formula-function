'use client'

import { useEffect, useState, type MouseEvent } from 'react'
import Link from 'next/link'

const LINKS = [
  { href: '#dna', label: 'DNA' },
  { href: '#news', label: 'NEWS' },
  { href: '#standings', label: 'STANDINGS' },
  { href: '#eras', label: 'ERAS' },
  { href: '#teams', label: 'TEAMS' },
  { href: '#drivers', label: 'DRIVERS' },
  { href: '#venues', label: 'VENUES' },
] as const

function headerOffsetPx(): number {
  const header = document.querySelector<HTMLElement>('[data-f1-sticky-header]')
  const h = header?.getBoundingClientRect().height
  return h && h > 0 ? Math.round(h) + 4 : 72
}

export function F1SectionNav({ accentColor }: { accentColor: string }) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const sectionIds = LINKS.map(l => l.href.slice(1))
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null)

    if (elements.length === 0) return

    const updateActiveFromScroll = () => {
      const offset = headerOffsetPx()
      // Pick the last section whose top has crossed the sticky header line.
      let current = ''
      for (const el of elements) {
        const top = el.getBoundingClientRect().top
        if (top - offset <= 12) current = `#${el.id}`
      }
      if (current) setActive(current)
    }

    updateActiveFromScroll()
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true })
    window.addEventListener('resize', updateActiveFromScroll)
    return () => {
      window.removeEventListener('scroll', updateActiveFromScroll)
      window.removeEventListener('resize', updateActiveFromScroll)
    }
  }, [])

  function handleNavClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    setActive(href)
    const el = document.getElementById(href.slice(1))
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffsetPx()
    window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' })
    window.history.pushState(null, '', href)
  }

  return (
    <nav
      aria-label="Page sections"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        minWidth: 0,
        width: '100%',
      }}
    >
      {LINKS.map(link => {
        const isActive = active === link.href
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={e => handleNavClick(e, link.href)}
            aria-current={isActive ? 'true' : undefined}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: isActive ? accentColor : '#888',
              letterSpacing: 1.5,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'color 0.25s ease',
              padding: '4px 0',
            }}
          >
            {link.label}
          </a>
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
