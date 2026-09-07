'use client'

import { useEffect, useState, type MouseEvent } from 'react'
import Link from 'next/link'

const LINKS = [
  { href: '#dna', label: 'DNA' },
  { href: '#news', label: 'NEWS' },
  { href: '#standings', label: 'STANDINGS' },
  { href: '#teams', label: 'TEAMS' },
  { href: '#drivers', label: 'DRIVERS' },
  { href: '#eras', label: 'ERAS' },
  { href: '#venues', label: 'VENUES' },
] as const

const HEADER_OFFSET = 64

export function F1SectionNav({ accentColor }: { accentColor: string }) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const sectionIds = LINKS.map(l => l.href.slice(1))
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActive(`#${visible[0].target.id}`)
        }
      },
      {
        rootMargin: '-72px 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.55],
      },
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function handleNavClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    setActive(href)
    const el = document.getElementById(href.slice(1))
    if (!el) return

    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
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
