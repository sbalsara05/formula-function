'use client'

import { Fragment, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

/* ─── Types ──────────────────────────────────────────────────────────────────── */

type SeriesKey = 'f1' | 'f2' | 'f3'

interface MomentEntry {
  name: string
  moment: string
  livery: string
  initials: string
  imageUrl: string
}

interface PanelGhostPos {
  top: string
  right: string
  size: number
  rotate: number
  zIndex: number
}

interface SeriesConfig {
  key: SeriesKey
  num: string
  tier: string
  color: string
  wordmark: string
  title: string
  copy: string
  tags: string
  logo: string
}

/* ─── Data ───────────────────────────────────────────────────────────────────── */

const GHOST = '/images/home/ghosts'

const MOMENTS: Record<SeriesKey, MomentEntry[]> = {
  f1: [
    { name: 'Senna',      moment: 'Donington 93',   livery: '#E10600', initials: 'AS', imageUrl: `${GHOST}/f1-senna-donington-1993.jpg` },
    { name: 'Senna',      moment: 'Monaco 91',      livery: '#E10600', initials: 'AS', imageUrl: `${GHOST}/f1-senna-monaco-1991.jpg` },
    { name: 'Prost',      moment: 'Spa 89 podium',  livery: '#E10600', initials: 'AP', imageUrl: `${GHOST}/f1-prost-spa-1989.jpg` },
    { name: 'Schumacher', moment: 'Benetton 94',    livery: '#FFD700', initials: 'MS', imageUrl: `${GHOST}/f1-schumacher-benetton-1994.jpg` },
    { name: 'Schumacher', moment: 'Indianapolis 02',livery: '#DC0000', initials: 'MS', imageUrl: `${GHOST}/f1-schumacher-indianapolis-2002.jpg` },
    { name: 'Vettel',     moment: 'Abu Dhabi 10',   livery: '#1E3A8A', initials: 'SV', imageUrl: `${GHOST}/f1-vettel-abudhabi-2010.jpg` },
    { name: 'Hamilton',   moment: 'Interlagos 08',  livery: '#B0B0B0', initials: 'LH', imageUrl: `${GHOST}/f1-hamilton-brazil-2008.jpg` },
    { name: 'Hamilton',   moment: 'Shanghai 14',    livery: '#00D2BE', initials: 'LH', imageUrl: `${GHOST}/f1-hamilton-china-2014.jpg` },
    { name: 'Senna',      moment: 'Spa 89 podium',  livery: '#E10600', initials: 'AS', imageUrl: `${GHOST}/f1-senna-spa-1989-podium.jpg` },
    { name: 'Vettel',     moment: 'Malaysia 15',    livery: '#DC0000', initials: 'SV', imageUrl: `${GHOST}/f1-vettel-malaysia-2015-podium.jpg` },
  ],
  f2: [
    { name: 'Piastri',    moment: 'Prema · F2 2021', livery: '#FF8700', initials: 'OP', imageUrl: `${GHOST}/f2-piastri-prema-2021.jpg` },
    { name: 'Leclerc',    moment: 'Prema · F2 2017', livery: '#DC0000', initials: 'CL', imageUrl: `${GHOST}/f2-leclerc-prema-2017.jpg` },
    { name: 'Norris',     moment: 'Carlin · F2 2018',livery: '#FFD700', initials: 'LN', imageUrl: `${GHOST}/f2-norris-carlin-2018.jpg` },
    { name: 'Russell',    moment: 'Austria · F2 2018', livery: '#00D2BE', initials: 'GR', imageUrl: `${GHOST}/f2-russell-austria-2018.jpg` },
    { name: 'Podium',     moment: 'Red Bull Ring 18', livery: '#00E5FF', initials: 'F2', imageUrl: `${GHOST}/f2-austria-podium-2018.jpg` },
    { name: 'Schumacher', moment: 'Prema · F2 2019', livery: '#DC143C', initials: 'MS', imageUrl: `${GHOST}/f2-mick-prema-2019.jpg` },
    { name: 'Bortoleto',  moment: 'Invicta · F2 2024', livery: '#00E5FF', initials: 'GB', imageUrl: `${GHOST}/f2-bortoleto-invicta-2024.jpg` },
    { name: 'Bearman',    moment: 'Prema · F2 2024', livery: '#DC0000', initials: 'OB', imageUrl: `${GHOST}/f2-bearman-austria-2024.jpg` },
    { name: 'Norris',     moment: 'Austria · F2 2018', livery: '#FFD700', initials: 'LN', imageUrl: `${GHOST}/f2-norris-austria-2018-trophy-crop.jpg` },
    { name: 'Leclerc',    moment: 'Jerez champion', livery: '#DC0000', initials: 'CL', imageUrl: `${GHOST}/f2-leclerc-jerez-2017-champion-crop.jpg` },
    { name: 'Fuoco',      moment: 'Austria · F2 2018', livery: '#DC0000', initials: 'AF', imageUrl: `${GHOST}/f2-fuoco-austria-2018-trophy-crop.jpg` },
    { name: 'Albon',      moment: 'Silverstone 18', livery: '#1E3A8A', initials: 'AA', imageUrl: `${GHOST}/f2-albon-silverstone-2018-champagne-crop.jpg` },
    { name: 'Bortoleto',  moment: 'Monza · F2 2024', livery: '#FF8700', initials: 'GB', imageUrl: `${GHOST}/f2-bortoleto-monza-2024-official.jpg` },
    { name: 'Colapinto',  moment: 'Imola · F2 2024', livery: '#3156A3', initials: 'FC', imageUrl: `${GHOST}/f2-colapinto-imola-2024-official.jpg` },
    { name: 'Hadjar',     moment: 'Silverstone · F2 2024', livery: '#1E3A8A', initials: 'IH', imageUrl: `${GHOST}/f2-hadjar-silverstone-2024-official.jpg` },
    { name: 'Piastri',    moment: 'Yas Marina · F2 2021', livery: '#2E8BCB', initials: 'OP', imageUrl: `${GHOST}/f2-piastri-yas-marina-2021-official.jpg` },
  ],
  f3: [
    { name: 'Norris',     moment: 'F3 era · 2017',    livery: '#FFD700', initials: 'LN', imageUrl: `${GHOST}/f3-norris-2017.jpg` },
    { name: 'Hadjar',     moment: 'Hitech F3 · 2022', livery: '#2293D1', initials: 'IH', imageUrl: `${GHOST}/f3-hadjar-2022.jpg` },
    { name: 'Antonelli',  moment: 'Prema FREC · 2023', livery: '#A0A0A0', initials: 'KA', imageUrl: `${GHOST}/f3-antonelli-spielberg-2023.jpg` },
    { name: 'Bearman',    moment: 'Prema · F3 2022',  livery: '#DC0000', initials: 'OB', imageUrl: `${GHOST}/f3-bearman-prema-2022.jpg` },
    { name: 'Piastri',    moment: 'Prema F3 · 2020',  livery: '#FF8700', initials: 'OP', imageUrl: `${GHOST}/f3-piastri-prema-2020.jpg` },
    { name: 'Russell',    moment: 'GP3 · ART 2017',   livery: '#00D2BE', initials: 'GR', imageUrl: `${GHOST}/f3-russell-gp3-2017.jpg` },
    { name: 'Schumacher', moment: 'Prema F3 · 2017',  livery: '#DC143C', initials: 'MS', imageUrl: `${GHOST}/f3-mick-prema-2017.jpg` },
    { name: 'Bortoleto',  moment: 'Trident F3 · 2023',livery: '#00E5FF', initials: 'GB', imageUrl: `${GHOST}/f3-bortoleto-trident-2023.jpg` },
    { name: 'Bearman',    moment: 'Spielberg 22',    livery: '#DC0000', initials: 'OB', imageUrl: `${GHOST}/f3-bearman-austria-2022-podium-crop.jpg` },
    { name: 'Podium',     moment: 'Spielberg 22',    livery: '#00E5FF', initials: 'F3', imageUrl: `${GHOST}/f3-austria-2022-podium.jpg` },
    { name: 'Hadjar',     moment: 'Spielberg 22',    livery: '#2293D1', initials: 'IH', imageUrl: `${GHOST}/f3-hadjar-austria-2022-celebrate-crop.jpg` },
    { name: 'Martins',    moment: 'Spielberg 22',    livery: '#0090FF', initials: 'VM', imageUrl: `${GHOST}/f3-martins-austria-2022-podium-crop.jpg` },
    { name: 'De Palo',    moment: 'Silverstone · F3 2026', livery: '#3156A3', initials: 'MD', imageUrl: `${GHOST}/f3-de-palo-silverstone-2026-official.jpg` },
    { name: 'Kato',       moment: 'Monza · F3 2026', livery: '#E10600', initials: 'TK', imageUrl: `${GHOST}/f3-kato-monza-2026-official.jpg` },
    { name: 'Lacorte',    moment: 'Monza · F3 2026', livery: '#00AEEF', initials: 'NL', imageUrl: `${GHOST}/f3-lacorte-monza-2026-official.jpg` },
    { name: 'Inthraphuvasak', moment: 'Monza · F3 2025', livery: '#FF5A1F', initials: 'TI', imageUrl: `${GHOST}/f3-inthraphuvasak-monza-2025-official.jpg` },
  ],
}

function toCutout(entry: MomentEntry): MomentEntry {
  const file = entry.imageUrl.split('/').pop()?.replace(/\.jpg$/, '-cutout.webp')
  return { ...entry, imageUrl: `${GHOST}/cutouts/${file}` }
}

/** Four podium / celebration stills for the cinematic panel. No in-car shots. */
const PANEL_MOMENTS: Record<SeriesKey, MomentEntry[]> = {
  f1: [
    toCutout(MOMENTS.f1[2]),  // Prost Spa 89 podium
    toCutout(MOMENTS.f1[8]),  // Senna Spa 89 podium
    toCutout(MOMENTS.f1[6]),  // Hamilton Interlagos 08
    toCutout(MOMENTS.f1[9]),  // Vettel Malaysia 15
  ],
  f2: [
    toCutout(MOMENTS.f2[14]), // Hadjar Silverstone win
    toCutout(MOMENTS.f2[12]), // Bortoleto Monza win
    toCutout(MOMENTS.f2[13]), // Colapinto Imola win
    toCutout(MOMENTS.f2[15]), // Piastri F2 champion
  ],
  f3: [
    toCutout(MOMENTS.f3[15]), // Inthraphuvasak Monza win
    toCutout(MOMENTS.f3[14]), // Lacorte Monza trophy
    toCutout(MOMENTS.f3[13]), // Kato Monza win
    toCutout(MOMENTS.f3[12]), // De Palo Silverstone win
  ],
}

/** North, east, west, south — full figures, inset from the rounded panel. */
const PANEL_POSITIONS: PanelGhostPos[] = [
  { top: '3%',  right: '16%', size: 200, rotate: -1.4, zIndex: 2 },
  { top: '20%', right: '4%',  size: 214, rotate:  1.8, zIndex: 3 },
  { top: '22%', right: '34%', size: 186, rotate: -1.9, zIndex: 4 },
  { top: '40%', right: '16%', size: 192, rotate:  1.2, zIndex: 5 },
]

const F2_PANEL_POSITIONS: PanelGhostPos[] = [
  { top: '2%',  right: '17%', size: 184, rotate: -1.2, zIndex: 2 },
  { top: '23%', right: '1%',  size: 228, rotate:  1.5, zIndex: 3 },
  { top: '24%', right: '34%', size: 224, rotate: -1.7, zIndex: 4 },
  { top: '43%', right: '17%', size: 194, rotate:  1.0, zIndex: 5 },
]

const F3_PANEL_POSITIONS: PanelGhostPos[] = [
  { top: '2%',  right: '17%', size: 182, rotate: -1.2, zIndex: 2 },
  { top: '22%', right: '2%',  size: 214, rotate:  1.5, zIndex: 3 },
  { top: '24%', right: '34%', size: 216, rotate: -1.7, zIndex: 4 },
  { top: '42%', right: '17%', size: 190, rotate:  1.0, zIndex: 5 },
]

const SERIES: SeriesConfig[] = [
  {
    key: 'f1',
    num: '1',
    tier: 'TIER 1',
    color: '#FF1E56',
    wordmark: 'ONE',
    title: 'FORMULA ONE',
    copy: 'The pinnacle. Six decades of championships, constructors, and the drivers who rewrote what fast means. This is where the function is proven — not guessed.',
    tags: 'CHAMPIONSHIPS · CONSTRUCTORS · SIX DECADES',
    logo: '/images/series/f1.svg',
  },
  {
    key: 'f2',
    num: '2',
    tier: 'TIER 2',
    color: '#00E5FF',
    wordmark: 'TWO',
    title: 'FORMULA TWO',
    copy: 'The proving ground. One season between the call-up and the wilderness. Every graduate who made the grid earned it here — in the wet, in the pack, on the last lap.',
    tags: 'GRADUATES · TITLE FIGHTS · THE CALL-UP',
    logo: '/images/series/f2.svg',
  },
  {
    key: 'f3',
    num: '3',
    tier: 'TIER 3',
    color: '#B026FF',
    wordmark: 'THREE',
    title: 'FORMULA THREE',
    copy: 'The first rung. Raw talent meets the pyramid. Names that will define the next decade start here — before anyone knows their function.',
    tags: 'ALUMNI · FIRST TITLES · THE PYRAMID',
    logo: '/images/series/f3.svg',
  },
]

const MEMORIAL_NAMES = ['Fangio', 'Clark', 'Stewart', 'Lauda', 'Senna', 'Prost', 'Schumacher']

interface FeaturedLink {
  href: string
  series: string
  seriesColor: string
  type: string
  name: string
  tagline: string
  entityColor: string
}

const FEATURED_LINKS: FeaturedLink[] = [
  {
    href: '/f/1/driver/vettel',
    series: 'f(1)', seriesColor: '#FF1E56',
    type: 'DRIVER',
    name: 'Sebastian Vettel',
    tagline: '4× WDC · Red Bull dynasty',
    entityColor: '#1E3A8A',
  },
  {
    href: '/f/1/team/ferrari',
    series: 'f(1)', seriesColor: '#FF1E56',
    type: 'TEAM',
    name: 'Scuderia Ferrari',
    tagline: '16× WCC · oldest constructor',
    entityColor: '#DC0000',
  },
  {
    href: '/f/1/venue/spa',
    series: 'f(1)', seriesColor: '#FF1E56',
    type: 'VENUE',
    name: 'Spa-Francorchamps',
    tagline: '7.004 km · Ardennes, Belgium',
    entityColor: '#5FB87C',
  },
  {
    href: '/f/2/driver/bearman',
    series: 'f(2)', seriesColor: '#00E5FF',
    type: 'DRIVER',
    name: 'Oliver Bearman',
    tagline: 'FDA · Haas F1 2025–26 · P4 Mexico',
    entityColor: '#DC0000',
  },
  {
    href: '/f/2/team/prema',
    series: 'f(2)', seriesColor: '#00E5FF',
    type: 'TEAM',
    name: 'Prema Racing',
    tagline: 'Serial champions · F2 & F3',
    entityColor: '#E8001C',
  },
  {
    href: '/f/3/team/prema',
    series: 'f(3)', seriesColor: '#B026FF',
    type: 'TEAM',
    name: 'Prema Racing',
    tagline: 'F3 powerhouse · graduate machine',
    entityColor: '#E8001C',
  },
]

/* ─── FeaturedCard ───────────────────────────────────────────────────────────── */

function FeaturedCard({ link }: { link: FeaturedLink }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={link.href}
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        background: '#080808',
        border: `0.5px solid ${hovered ? link.entityColor + '66' : '#1a1a1a'}`,
        borderRadius: 8, padding: '16px 18px', overflow: 'hidden', position: 'relative',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow: hovered ? `0 0 20px ${link.entityColor}33` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 0% 50%, ${link.entityColor} 0%, transparent 55%)`,
        opacity: hovered ? 0.08 : 0.04,
        transition: 'opacity 0.25s ease',
        pointerEvents: 'none',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: link.seriesColor, letterSpacing: -0.5, fontWeight: 500 }}>
            {link.series}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 8, color: link.entityColor,
            background: link.entityColor + '18', border: `0.5px solid ${link.entityColor}44`,
            padding: '2px 6px', borderRadius: 3, letterSpacing: 1,
          }}>
            {link.type}
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: hovered ? link.entityColor : '#333', transition: 'color 0.25s ease' }}>→</span>
      </div>
      <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', margin: '0 0 4px', letterSpacing: -0.3 }}>
        {link.name}
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: 0, letterSpacing: 0.5 }}>
        {link.tagline.toUpperCase()}
      </p>
    </Link>
  )
}

/* ─── GhostCard (in-panel) ───────────────────────────────────────────────────── */

function GhostCard({ moment, position, delay }: { moment: MomentEntry; position: PanelGhostPos; delay: number }) {
  return (
    <div
      className="home-ghost-card"
      style={{
        position: 'absolute',
        width: position.size,
        height: Math.round(position.size * 1.48),
        top: position.top,
        right: position.right,
        zIndex: position.zIndex,
        overflow: 'visible',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        ['--ghost-rotate' as string]: `${position.rotate}deg`,
        ['--ghost-delay' as string]: `${delay}s`,
        ['--ghost-outline' as string]: moment.livery,
      }}
    >
      <div className="home-ghost-figure">
        <img
          className="home-ghost-cutout"
          src={moment.imageUrl}
          alt=""
          style={{
            filter: [
              `drop-shadow(1px 0 0 ${moment.livery}88)`,
              `drop-shadow(-1px 0 0 ${moment.livery}88)`,
              `drop-shadow(0 1px 0 ${moment.livery}88)`,
              `drop-shadow(0 -1px 0 ${moment.livery}88)`,
              `drop-shadow(0 0 18px ${moment.livery}55)`,
            ].join(' '),
          }}
        />
      </div>
    </div>
  )
}

/* ─── SeriesRow ──────────────────────────────────────────────────────────────── */

function SeriesRow({
  config,
  selected,
  onHover,
}: {
  config: SeriesConfig
  selected: boolean
  onHover: () => void
}) {
  const router = useRouter()
  const href = `/f/${config.num}`

  return (
    <div
      role="link"
      tabIndex={0}
      data-series={config.key}
      aria-current={selected ? 'true' : undefined}
      className="home-series-row"
      onPointerEnter={onHover}
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={() => router.push(href)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          router.push(href)
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '22px 16px',
        color: 'inherit',
        position: 'relative',
        borderBottom: '0.5px solid #1a1a1a',
        background: selected ? `${config.color}10` : 'transparent',
        transition: 'background 0.25s ease',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', left: 0, top: 10, bottom: 10, width: 2,
          background: config.color,
          opacity: selected ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
        <img
          className="home-series-logo"
          src={config.logo}
          alt={config.title}
          style={{
            opacity: selected ? 1 : 0.32,
            filter: selected ? `drop-shadow(0 0 10px ${config.color}66)` : 'none',
          }}
        />
      </div>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5,
        color: selected ? '#666' : '#333',
        flexShrink: 0,
        transition: 'color 0.25s ease',
      }}>
        {config.tier}
      </span>
    </div>
  )
}

/* ─── CinematicPanel ─────────────────────────────────────────────────────────── */

function CinematicPanel({ config }: { config: SeriesConfig }) {
  const moments = PANEL_MOMENTS[config.key]
  const [ctaHover, setCtaHover] = useState(false)

  return (
    <div style={{
      position: 'relative',
      minHeight: 560,
      overflow: 'hidden',
      background: '#050505',
      border: '0.5px solid #1a1a1a',
      borderRadius: 10,
      isolation: 'isolate',
    }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `radial-gradient(ellipse at 85% 40%, ${config.color}22 0%, transparent 55%)`,
          pointerEvents: 'none',
        }}
      />

      <div
        className="home-ghost-layer"
        style={{
          position: 'absolute',
          top: 28,
          right: 56,
          bottom: 36,
          left: 0,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        {moments.map((moment, i) => (
          <GhostCard
            key={`${config.key}-${moment.name}-${moment.moment}`}
            moment={moment}
            position={(
              config.key === 'f2'
                ? F2_PANEL_POSITIONS
                : config.key === 'f3'
                  ? F3_PANEL_POSITIONS
                  : PANEL_POSITIONS
            )[i]}
            delay={0.04 + i * 0.08}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.78) 32%, rgba(0,0,0,0.22) 54%, transparent 74%)',
        }}
      />

      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 'min(380px, 54%)',
        zIndex: 3,
        padding: '40px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <span style={{
          display: 'block', width: 28, height: 1, background: config.color, marginBottom: 16, opacity: 0.9,
        }} />
        <h2 style={{
          fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 500,
          letterSpacing: 3, color: '#fff', margin: '0 0 16px', lineHeight: 1.15,
        }}>
          {config.title}
        </h2>
        <p style={{
          fontSize: 14, color: '#bbb', lineHeight: 1.65, margin: '0 0 20px',
        }}>
          {config.copy}
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5,
          color: config.color, margin: '0 0 28px',
        }}>
          {config.tags}
        </p>
        <Link
          href={`/f/${config.num}`}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            pointerEvents: 'auto',
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '11px 22px',
            background: ctaHover ? '#fff' : 'transparent',
            color: ctaHover ? '#000' : '#f2f2f2',
            border: '0.5px solid #f2f2f2',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: 1.6,
            fontWeight: 500,
            borderRadius: 2,
            transition: 'background 0.2s ease, color 0.2s ease, transform 0.2s ease',
            transform: ctaHover ? 'translateY(-1px)' : 'none',
          }}
        >
          ENTER f({config.num})
          <span aria-hidden="true" style={{
            display: 'inline-block',
            transform: ctaHover ? 'translateX(3px)' : 'none',
            transition: 'transform 0.2s ease',
          }}>→</span>
        </Link>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function GhostSummonPage() {
  const [selected, setSelected] = useState<SeriesKey>('f1')
  const [heroReady, setHeroReady] = useState(false)
  const active = SERIES.find(s => s.key === selected) ?? SERIES[0]

  const handleHover = useCallback((series: SeriesKey) => {
    setSelected(series)
  }, [])

  useEffect(() => {
    let raf1: number, raf2: number
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setHeroReady(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [])

  return (
    <div style={{ background: '#000', color: '#fff', position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '8%', left: '12%', width: 420, height: 420,
          background: 'radial-gradient(circle, #FF1E5622 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', top: '18%', right: '8%', width: 380, height: 380,
          background: 'radial-gradient(circle, #00E5FF18 0%, transparent 70%)',
          filter: 'blur(48px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '22%', left: '38%', width: 360, height: 360,
          background: 'radial-gradient(circle, #B026FF14 0%, transparent 70%)',
          filter: 'blur(52px)',
        }} />
      </div>

      <svg
        className="home-telemetry"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.3, zIndex: 1 }}
        viewBox="0 0 800 960"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="glow-home">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>
        <g filter="url(#glow-home)">
          <path className="home-telemetry-path" style={{ animationDelay: '0.1s' }} d="M 0 140 Q 200 100, 400 180 T 800 160" stroke="#FF1E56" strokeWidth={1} fill="none" />
          <path className="home-telemetry-path" style={{ animationDelay: '0.35s' }} d="M 0 220 Q 250 280, 500 240 T 800 280" stroke="#00E5FF" strokeWidth={1} fill="none" />
          <path className="home-telemetry-path" style={{ animationDelay: '0.55s' }} d="M 0 560 Q 180 500, 380 580 T 800 540" stroke="#B026FF" strokeWidth={1} fill="none" />
          <path className="home-telemetry-path" style={{ animationDelay: '0.75s' }} d="M 0 820 Q 300 860, 550 800 T 800 840" stroke="#00FF94" strokeWidth={1} fill="none" />
        </g>
      </svg>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          padding: '1.25rem 1.75rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '0.5px solid #1a1a1a',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 500, letterSpacing: -0.5 }}>
            f(x)
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#555' }}>
            FORMULA ANALYTICS
          </span>
        </div>

        <div style={{ padding: '3.25rem 1.75rem 1.75rem', textAlign: 'center', position: 'relative' }}>
          <p
            className="home-hero-line"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: '#666', margin: '0 0 20px',
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.55s ease, transform 0.55s ease',
            }}
          >
            DRIVING STYLE · SETUP · PREDICTIONS
          </p>
          <h1
            className="home-hero-line"
            style={{
              fontSize: 44, fontWeight: 400, margin: '0 0 14px', letterSpacing: -1, lineHeight: 1.05,
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s',
            }}
          >
            The function of<br />the grid.
          </h1>
          <p
            className="home-hero-line"
            style={{
              fontSize: 14, color: '#888', margin: '0 auto', maxWidth: 420, lineHeight: 1.6,
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            Every driver. Every track. Every team. Across three series and six decades of the sport.
          </p>
        </div>

        <div className="home-series-stage">
          <nav
            aria-label="Series"
            onPointerMove={(e) => {
              const row = (e.target as HTMLElement).closest('[data-series]')
              const key = row?.getAttribute('data-series')
              if (key === 'f1' || key === 'f2' || key === 'f3') handleHover(key)
            }}
            style={{
              position: 'relative',
              zIndex: 2,
              background: '#080808',
              border: '0.5px solid #1a1a1a',
              borderRadius: 10,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {SERIES.map(config => (
              <SeriesRow
                key={config.key}
                config={config}
                selected={selected === config.key}
                onHover={() => handleHover(config.key)}
              />
            ))}
          </nav>
          <CinematicPanel key={active.key} config={active} />
        </div>

        <div style={{ padding: '0 1.75rem 3rem', borderTop: '0.5px solid #1a1a1a', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#555', margin: 0 }}>
              WHAT'S LIVE
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#333', margin: 0 }}>
              BLUEPRINT PAGES · PHASE 1
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {FEATURED_LINKS.map(link => (
              <FeaturedCard key={link.href} link={link} />
            ))}
          </div>
        </div>

        <div style={{
          padding: '2.5rem 1.75rem 2rem',
          textAlign: 'center',
          borderTop: '0.5px solid #1a1a1a',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#444', margin: '0 0 24px' }}>
            — IN MEMORY OF THE GREATS WHO WROTE THE FUNCTION —
          </p>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap',
            fontFamily: 'var(--font-serif)', fontSize: 14, color: '#999', fontStyle: 'italic',
          }}>
            {MEMORIAL_NAMES.map((name, i) => (
              <Fragment key={name}>
                <span>{name}</span>
                {i < MEMORIAL_NAMES.length - 1 && <span style={{ color: '#444' }}>·</span>}
              </Fragment>
            ))}
          </div>
        </div>

        <div style={{
          padding: '1rem 1.75rem',
          borderTop: '0.5px solid #1a1a1a',
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#444',
        }}>
          <span>f(x) · v0.1</span>
          <span>EST. 2026</span>
        </div>
      </div>
    </div>
  )
}
