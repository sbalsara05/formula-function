'use client'

import { Fragment, useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'

/* ─── Types ──────────────────────────────────────────────────────────────────── */

type SeriesKey = 'f1' | 'f2' | 'f3'

interface MomentEntry {
  name: string
  moment: string
  livery: string
  initials: string
  imageUrl: string
}

interface GhostPos {
  side: 'left' | 'right'
  top: string
  size: number
  /** Distance from side edge in px (negative = peek off-canvas) */
  inset?: number
}

interface Portrait {
  initials: string
  livery: string
  bg: string
  imageUrl: string
}

interface CardConfig {
  key: SeriesKey
  num: string
  tier: string
  color: string
  description: string
  svgPath: string
  iconLabel: string
  wordmark: string
  portraits: Portrait[]
}

/* ─── Data ───────────────────────────────────────────────────────────────────── */

// Portrait-strip images (small square thumbnails, headshots ok)
const IMG = {
  senna:    'https://upload.wikimedia.org/wikipedia/commons/6/65/Ayrton_Senna_9_%28cropped%29.jpg',
  prost:    'https://upload.wikimedia.org/wikipedia/commons/7/74/Festival_automobile_international_2015_-_Photocall_-_065_%28cropped3%29.jpg',
  mschumacher: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/A%C3%A9cio_Neves%2C_Michael_Schumacher_e_Didi_%28Cropped%29.jpg/440px-A%C3%A9cio_Neves%2C_Michael_Schumacher_e_Didi_%28Cropped%29.jpg',
  vettel:   'https://upload.wikimedia.org/wikipedia/commons/4/4c/Sebastian_Vettel_-_2022236172324_2022-08-24_Champions_for_Charity_-_Sven_-_1D_X_MK_II_-_0418_-_B70I2428_%28cropped%29.jpg',
  hamilton: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_%2854566928382%29_%28cropped%29.jpg',
  russell:  'https://upload.wikimedia.org/wikipedia/commons/7/7f/KingsLeonSilverstne040724_%2828_of_112%29_%2853838006028%29_%28cropped%29.jpg',
  leclerc:  'https://upload.wikimedia.org/wikipedia/commons/7/7b/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3978_by_Stepro_%28cropped2%29.jpg',
  piastri:  'https://upload.wikimedia.org/wikipedia/commons/e/e5/2026_Chinese_GP_-_Oscar_Piastri_%28cropped%29_%28cropped%29.jpg',
  mickschumacher: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Mick_Schumacher_2024_WEC_Fuji.jpg',
  bortoleto:'https://upload.wikimedia.org/wikipedia/commons/f/fe/Gabriel_Bortoleto_%28cropped%29.jpg',
  gasly:    'https://upload.wikimedia.org/wikipedia/commons/f/fd/2022_French_Grand_Prix_%2852279065728%29_%28midcrop%29.png',
  norris:   'https://upload.wikimedia.org/wikipedia/commons/9/90/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_%28cropped2%29.jpg',
  antonelli:'https://upload.wikimedia.org/wikipedia/commons/f/f3/Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin%2C_TX_%28cropped%29.jpg',
  lindblad: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Arvid_Lindblad_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7869%29_%28cropped%29.jpg',
  hadjar:   'https://upload.wikimedia.org/wikipedia/commons/7/75/Isack_Hadjar_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8753%29_%28cropped%29.jpg',
  bearman:  'https://upload.wikimedia.org/wikipedia/commons/9/9a/2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_Thursday_%28cropped%29.jpg',
}

// Race/era-specific images for ghost moment cards — homepage-only canonical stills
// (not shared with driver-page /images/drivers/ assets)
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
  ],
}

// Edge collage — same layout for every series
const POSITIONS: GhostPos[] = [
  { side: 'left',  top: '2%',  size: 148 },
  { side: 'left',  top: '26%', size: 156 },
  { side: 'left',  top: '50%', size: 148 },
  { side: 'left',  top: '74%', size: 152 },
  { side: 'right', top: '4%',  size: 152 },
  { side: 'right', top: '28%', size: 148 },
  { side: 'right', top: '52%', size: 156 },
  { side: 'right', top: '76%', size: 148 },
]

const CARD_CONFIGS: CardConfig[] = [
  {
    key: 'f1',
    num: '1',
    tier: 'TIER 1',
    color: '#FF1E56',
    description: 'The pinnacle. Championships, constructors, and the drivers who shaped the modern era.',
    svgPath: 'M 0 12 L 40 12 L 50 2 L 80 22 L 110 6 L 140 18 L 170 10 L 200 16 L 240 12',
    iconLabel: 'ICONS',
    wordmark: 'ONE',
    portraits: [
      { initials: 'AS', livery: '#FFD700', bg: '#1a1300', imageUrl: IMG.senna },
      { initials: 'AP', livery: '#E10600', bg: '#1a0000', imageUrl: IMG.prost },
      { initials: 'MS', livery: '#DC0000', bg: '#1a0000', imageUrl: IMG.mschumacher },
      { initials: 'SV', livery: '#1E3A8A', bg: '#000814', imageUrl: IMG.vettel },
      { initials: 'LH', livery: '#00D2BE', bg: '#001a17', imageUrl: IMG.hamilton },
    ],
  },
  {
    key: 'f2',
    num: '2',
    tier: 'TIER 2',
    color: '#00E5FF',
    description: 'The proving ground. Where the next generation of F1 talent earns the call-up.',
    svgPath: 'M 0 12 L 30 12 L 45 2 L 70 20 L 100 6 L 130 16 L 160 10 L 195 14 L 240 12',
    iconLabel: 'GRADUATED TO F1',
    wordmark: 'TWO',
    portraits: [
      { initials: 'GR', livery: '#00D2BE', bg: '#001a17', imageUrl: IMG.russell },
      { initials: 'CL', livery: '#DC0000', bg: '#1a0000', imageUrl: IMG.leclerc },
      { initials: 'OP', livery: '#FF8700', bg: '#1a0c00', imageUrl: IMG.piastri },
      { initials: 'MS', livery: '#0090FF', bg: '#000a14', imageUrl: IMG.mickschumacher },
      { initials: 'GB', livery: '#00FF00', bg: '#001a00', imageUrl: IMG.bortoleto },
    ],
  },
  {
    key: 'f3',
    num: '3',
    tier: 'TIER 3',
    color: '#B026FF',
    description: 'The first rung. Where raw talent meets the pyramid for the first time.',
    svgPath: 'M 0 12 L 25 12 L 40 4 L 65 18 L 95 8 L 125 16 L 155 6 L 190 16 L 240 12',
    iconLabel: 'NOTABLE ALUMNI',
    wordmark: 'THREE',
    portraits: [
      { initials: 'LN', livery: '#FFD700', bg: '#1a1300', imageUrl: IMG.norris },
      { initials: 'GR', livery: '#00D2BE', bg: '#001a17', imageUrl: IMG.russell },
      { initials: 'OP', livery: '#FF8700', bg: '#1a0c00', imageUrl: IMG.piastri },
      { initials: 'KA', livery: '#00D2BE', bg: '#001a17', imageUrl: IMG.antonelli },
      { initials: 'AL', livery: '#1E3A8A', bg: '#000814', imageUrl: IMG.lindblad },
    ],
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

/* ─── GhostCard ──────────────────────────────────────────────────────────────── */

function GhostCard({ moment, position }: { moment: MomentEntry; position: GhostPos }) {
  const [delay] = useState<number>(() => Math.random() * 0.45)
  const [rotation] = useState<number>(() => (Math.random() - 0.5) * 4) // ±2°
  const [active, setActive] = useState(false)

  useEffect(() => {
    let raf1: number, raf2: number
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setActive(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [])

  const initTransform =
    position.side === 'left' ? 'translateX(-60px)' : 'translateX(60px)'

  const posStyle: React.CSSProperties = {
    position: 'absolute',
    width: position.size,
    height: Math.round(position.size * 1.5),
    top: position.top,
    opacity: active ? 0.88 : 0,
    transform: active ? `rotate(${rotation}deg)` : `${initTransform} rotate(${rotation}deg)`,
    transition: `opacity 0.65s ease ${delay}s, transform 0.8s ease ${delay}s`,
  }
  if (position.side === 'left') posStyle.left = position.inset ?? -36
  else posStyle.right = position.inset ?? -36

  return (
    <div style={{ ...posStyle, overflow: 'visible' }}>
      <div style={{
        position: 'absolute', inset: '-30%',
        background: `radial-gradient(ellipse at 50% 55%, ${moment.livery}55 0%, ${moment.livery}18 35%, transparent 65%)`,
        filter: 'blur(24px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1, overflow: 'hidden', borderRadius: 4 }}>
        <img
          src={moment.imageUrl}
          alt={moment.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 45%, transparent 38%, rgba(0,0,0,0.7) 68%, rgba(0,0,0,0.97) 88%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 15%, ${moment.livery}30 0%, transparent 55%)`,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '48%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.6) 45%, transparent 100%)',
        }} />
      </div>

      <span style={{
        position: 'absolute', top: 8, right: 8, zIndex: 2,
        fontFamily: 'var(--font-mono)', fontSize: 8, color: moment.livery,
        background: 'rgba(0,0,0,0.55)', padding: '2px 5px', borderRadius: 3, letterSpacing: 1.5,
      }}>
        {moment.initials}
      </span>
      <span style={{
        position: 'absolute', bottom: 20, left: 0, right: 0, zIndex: 2,
        textAlign: 'center', fontFamily: 'var(--font-sans)',
        fontSize: 12, fontWeight: 600, color: '#fff', letterSpacing: 0.3,
      }}>
        {moment.name}
      </span>
      <span style={{
        position: 'absolute', bottom: 6, left: 0, right: 0, zIndex: 2,
        textAlign: 'center', fontFamily: 'var(--font-mono)',
        fontSize: 8, color: `${moment.livery}cc`, letterSpacing: 1.5,
      }}>
        {moment.moment.toUpperCase()}
      </span>
    </div>
  )
}

/* ─── DriverPortrait ─────────────────────────────────────────────────────────── */

function DriverPortrait({
  portrait,
  cardHovered,
  index,
}: {
  portrait: Portrait
  cardHovered: boolean
  index: number
}) {
  return (
    <div
      style={{
        aspectRatio: '1',
        background: '#000',
        border: '0.5px solid #222',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        transform: cardHovered ? 'scale(1.04)' : 'scale(1)',
        filter: cardHovered ? 'brightness(1.08)' : 'brightness(1)',
        transition: `transform 0.35s ease ${index * 40}ms, filter 0.35s ease ${index * 40}ms`,
      }}
    >
      <img
        src={portrait.imageUrl}
        alt={portrait.initials}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
      />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '50%', background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
      }} />
      <span style={{
        position: 'absolute', bottom: 3, left: 4,
        fontFamily: 'var(--font-mono)', fontSize: 7, color: '#ccc',
      }}>
        {portrait.initials}
      </span>
    </div>
  )
}

/* ─── SeriesCard ─────────────────────────────────────────────────────────────── */

function SeriesCard({
  config,
  onMouseEnter,
  onMouseLeave,
}: {
  config: CardConfig
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const handleEnter = () => { setHovered(true); onMouseEnter() }
  const handleLeave = () => { setHovered(false); onMouseLeave() }

  return (
    <Link
      href={`/f/${config.num}`}
      className="home-series-card"
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        position: 'relative', background: '#080808',
        border: `1px solid ${hovered ? config.color : '#1a1a1a'}`,
        borderRadius: 10, padding: '24px 20px',
        overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        boxShadow: hovered ? `0 0 32px ${config.color}55` : 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Corner radial wash */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 0% 0%, ${config.color} 0%, transparent 55%)`,
          opacity: hovered ? 0.12 : 0.05,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />
      {/* Top accent bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: config.color,
          opacity: hovered ? 0.9 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 34, fontWeight: 400,
            color: config.color, letterSpacing: -1,
            filter: hovered ? 'brightness(1.1)' : 'none',
            transition: 'filter 0.3s ease',
          }}>
            {`f(${config.num})`}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3, lineHeight: 1 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 2,
              color: hovered ? '#888' : '#555',
              transition: 'color 0.3s ease',
            }}>
              FORMULA
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500,
              color: config.color, letterSpacing: 3,
              opacity: hovered ? 1 : 0.85,
              transition: 'opacity 0.3s ease',
            }}>
              {config.wordmark}
            </span>
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                height: 1,
                marginTop: 2,
                background: config.color,
                width: hovered ? '100%' : '40%',
                opacity: hovered ? 0.9 : 0.45,
                transition: 'width 0.35s ease, opacity 0.3s ease',
                alignSelf: 'stretch',
              }}
            />
          </div>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5,
          color: hovered ? '#888' : '#666',
          transition: 'color 0.3s ease',
        }}>
          {config.tier}
        </span>
      </div>

      {/* Telemetry squiggle */}
      <svg viewBox="0 0 240 24" style={{ width: '100%', height: 20, margin: '0 0 16px', display: 'block', position: 'relative' }} aria-hidden="true">
        <path
          d={config.svgPath}
          stroke={config.color}
          strokeWidth={1.2}
          fill="none"
          opacity={0.9}
          className={hovered ? 'home-sparkline-draw' : undefined}
          style={{
            strokeDasharray: 500,
            strokeDashoffset: hovered ? 0 : 120,
            transition: 'stroke-dashoffset 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </svg>

      {/* Description */}
      <p style={{ fontSize: 13, color: '#aaa', margin: '0 0 18px', lineHeight: 1.5, position: 'relative' }}>
        {config.description}
      </p>

      {/* Driver portraits */}
      <div style={{ borderTop: '0.5px solid #1a1a1a', paddingTop: 14, position: 'relative' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 12px' }}>
          {config.iconLabel}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
          {config.portraits.map((p, i) => (
            <DriverPortrait key={p.initials} portrait={p} cardHovered={hovered} index={i} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, color: config.color,
        letterSpacing: 1.5, margin: '18px 0 0', position: 'relative',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span>ENTER</span>
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          →
        </span>
      </p>
    </Link>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function GhostSummonPage() {
  const [ghostSeries, setGhostSeries] = useState<SeriesKey | null>(null)
  const [ghostVisible, setGhostVisible] = useState(false)
  const [heroReady, setHeroReady] = useState(false)
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = useCallback((series: SeriesKey) => {
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
    setGhostSeries(series)
    setGhostVisible(true)
  }, [])

  const handleLeave = useCallback(() => {
    setGhostVisible(false)
    // Keep ghostSeries mounted until the fade-out completes, then unmount
    clearTimerRef.current = setTimeout(() => setGhostSeries(null), 600)
  }, [])

  useEffect(() => {
    let raf1: number, raf2: number
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setHeroReady(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
    }
  }, [])

  return (
    <div style={{ background: '#000', color: '#fff', position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>

      {/* Soft ambient series-color orbs */}
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

      {/* Background decorative telemetry lines */}
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

      {/* Ghost layer — fixed to viewport so it never causes scroll */}
      <div
        style={{
          position: 'fixed', inset: 0,
          pointerEvents: 'none', zIndex: 50,
          opacity: ghostVisible ? 1 : 0,
          transition: 'opacity 0.5s ease',
          overflow: 'hidden',
          WebkitMaskImage: 'radial-gradient(ellipse 42% 70% at 50% 48%, transparent 0%, transparent 55%, black 82%)',
          maskImage: 'radial-gradient(ellipse 42% 70% at 50% 48%, transparent 0%, transparent 55%, black 82%)',
        }}
      >
        <div key={ghostSeries}>
          {ghostSeries !== null &&
            MOMENTS[ghostSeries].slice(0, POSITIONS.length).map((moment, i) => (
              <GhostCard key={i} moment={moment} position={POSITIONS[i]} />
            ))}
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          opacity: ghostVisible ? 0.55 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* Nav */}
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

        {/* Hero text */}
        <div style={{ padding: '4rem 1.75rem 2.5rem', textAlign: 'center', position: 'relative' }}>
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

        {/* Series cards */}
        <div style={{
          padding: '0 1.75rem 3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
        }}>
          {CARD_CONFIGS.map((config) => (
            <SeriesCard
              key={config.key}
              config={config}
              onMouseEnter={() => handleEnter(config.key)}
              onMouseLeave={handleLeave}
            />
          ))}
        </div>

        {/* Featured pages */}
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

        {/* Memorial strip */}
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

        {/* Footer */}
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
