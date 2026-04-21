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
  side: 'left' | 'right' | 'bottom'
  top?: string
  left?: string
  size: number
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

// Race/era-specific images for ghost moment cards — chosen for visual impact first
const RACE_IMG = {
  // Senna — 1993 British GP paddock, full McLaren suit, portrait (927×1186)
  senna_silverstone93: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Ayrton_Senna_in_the_paddock_before_the_1993_British_Grand_Prix_%2833686752075%29_%28cropped%29.jpg',
  // Senna — McLaren at Donington 1993 European GP
  senna_donington93: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Senna_1993_European_GP.jpg',
  // Senna — McLaren at Monaco 1991
  senna_mclaren91: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Ayrton_Senna_1991_Monaco.jpg',
  // Prost — Spa 89 podium, full body in McLaren suit, portrait (1241×1800)
  prost_spa89: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Alain_Prost_1989_Belgian_GP_podium.jpg',
  // Prost — cropped podium shot (backup)
  prost_mclaren89: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Alain_Prost_1989_Belgian_GP_podium_%28Cropped%29.jpg',
  // Schumacher — Benetton B194 launch 1994, full yellow suit, portrait (1050×1400)
  schumacher_benetton94: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Michael_Schumacher_Benetton_1994_%28cropped%29.jpg',
  // Schumacher — full body Ferrari suit, Indianapolis 2002
  schumacher_ferrari00: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Michael_Schumacher_2002.jpg',
  // Vettel — Red Bull suit, Korea 2010 championship season, portrait (683×1024)
  vettel_korea10: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Sebastian_Vettel_-_Korea_2010_by_LGEPR.jpg',
  // Vettel — Abu Dhabi 2010 championship race
  vettel_abudhabi10: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Vettel_abu_dabi_2010.jpg',
  // Hamilton — Brazil 2008 WDC celebration (McLaren orange, iconic)
  hamilton_brazil08: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Hamilton_Brazil_2008_celebrations.jpg',
  // Hamilton — silver Mercedes suit, China 2014, portrait (2827×3399)
  hamilton_china14: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Lewis_Hamilton_2014_China.jpg',
  // F2 — period-appropriate (all from their F2/GP2 seasons)
  russell_art_f2:  'https://upload.wikimedia.org/wikipedia/commons/b/b7/George_Russell%2C_ART_Grand_Prix_F2_Team_%2842837176685%29.jpg',
  leclerc_prema_f2:'https://upload.wikimedia.org/wikipedia/commons/b/bd/Charles_Leclerc_%28F2%29.jpg',
  piastri_prema_f2:'https://upload.wikimedia.org/wikipedia/commons/e/ee/2021_British_Grand_Prix_%2851349300361%29_%28cropped%29.jpg',
  norris_carlin_f2:'https://upload.wikimedia.org/wikipedia/commons/c/ce/Lando_Norris%2C_Carlin_F2_Team_%2841932838180%29.jpg',
  norris_young:    'https://upload.wikimedia.org/wikipedia/commons/4/40/Norris--05_%2838809756794%29_%28cropped%29.jpg',
  gasly_gp2:       'https://upload.wikimedia.org/wikipedia/commons/d/d4/Pierre_Gasly-crop.jpg',
  mick_f2_era:     'https://upload.wikimedia.org/wikipedia/commons/e/eb/Mick_Schumacher_-_2019202181015_2019-07-21_Champions_for_Charity_-_1500_-_B70I1535.jpg',
  bortoleto_f2_era:'https://upload.wikimedia.org/wikipedia/commons/d/d4/G._Bortoleto_17_Sep_2024.png',
  bearman_f2_era:  'https://upload.wikimedia.org/wikipedia/commons/7/79/Oliver-bearman-silverstone-2024-showing-eurospares-sponsorship.jpg',
  // F3 — period-appropriate
  antonelli_f3:    'https://upload.wikimedia.org/wikipedia/commons/9/9d/Antonelli_Barcelona_2024_%28cropped%29.jpg',
  hadjar_f3_era:   'https://upload.wikimedia.org/wikipedia/commons/f/f9/Isack_Hadjar_2022.JPG',
}

// Each entry uses a distinct imageUrl — no two consecutive cards share a photo
const MOMENTS: Record<SeriesKey, MomentEntry[]> = {
  f1: [
    { name: 'Senna',      moment: 'Silverstone 93', livery: '#E10600', initials: 'AS', imageUrl: RACE_IMG.senna_silverstone93 },
    { name: 'Senna',      moment: 'Donington 93',   livery: '#E10600', initials: 'AS', imageUrl: RACE_IMG.senna_donington93 },
    { name: 'Senna',      moment: 'Monaco 91',      livery: '#E10600', initials: 'AS', imageUrl: RACE_IMG.senna_mclaren91 },
    { name: 'Prost',      moment: 'Spa 89 podium',  livery: '#E10600', initials: 'AP', imageUrl: RACE_IMG.prost_spa89 },
    { name: 'Prost',      moment: 'McLaren era',    livery: '#FFFFFF', initials: 'AP', imageUrl: RACE_IMG.prost_mclaren89 },
    { name: 'Schumacher', moment: 'Benetton 94',    livery: '#FFD700', initials: 'MS', imageUrl: RACE_IMG.schumacher_benetton94 },
    { name: 'Schumacher', moment: 'Ferrari era',    livery: '#DC0000', initials: 'MS', imageUrl: RACE_IMG.schumacher_ferrari00 },
    { name: 'Schumacher', moment: 'World champion', livery: '#DC0000', initials: 'MS', imageUrl: IMG.mschumacher },
    { name: 'Vettel',     moment: 'Korea 10',       livery: '#1E3A8A', initials: 'SV', imageUrl: RACE_IMG.vettel_korea10 },
    { name: 'Vettel',     moment: 'Abu Dhabi 10',   livery: '#1E3A8A', initials: 'SV', imageUrl: RACE_IMG.vettel_abudhabi10 },
    { name: 'Hamilton',   moment: 'Interlagos 08',  livery: '#B0B0B0', initials: 'LH', imageUrl: RACE_IMG.hamilton_brazil08 },
    { name: 'Hamilton',   moment: 'Shanghai 14',    livery: '#00D2BE', initials: 'LH', imageUrl: RACE_IMG.hamilton_china14 },
  ],
  f2: [
    { name: 'Russell',       moment: 'ART · F2 2018',   livery: '#00D2BE', initials: 'GR', imageUrl: RACE_IMG.russell_art_f2 },
    { name: 'Leclerc',       moment: 'Prema · F2 2017', livery: '#DC0000', initials: 'CL', imageUrl: RACE_IMG.leclerc_prema_f2 },
    { name: 'Piastri',       moment: 'Prema · F2 2021', livery: '#FF8700', initials: 'OP', imageUrl: RACE_IMG.piastri_prema_f2 },
    { name: 'Norris',        moment: 'Carlin · F2 2018',livery: '#FFD700', initials: 'LN', imageUrl: RACE_IMG.norris_carlin_f2 },
    { name: 'Norris',        moment: 'F2 era · 2018',   livery: '#FF8700', initials: 'LN', imageUrl: RACE_IMG.norris_young },
    { name: 'Gasly',         moment: 'DAMS · GP2 2016', livery: '#FFD700', initials: 'PG', imageUrl: RACE_IMG.gasly_gp2 },
    { name: 'Schumacher',    moment: 'Prema · F2 2020', livery: '#DC143C', initials: 'MS', imageUrl: RACE_IMG.mick_f2_era },
    { name: 'Bortoleto',     moment: 'F2 champion 24',  livery: '#00E5FF', initials: 'GB', imageUrl: RACE_IMG.bortoleto_f2_era },
    { name: 'Bearman',       moment: 'Prema · F2 2024', livery: '#DC0000', initials: 'OB', imageUrl: RACE_IMG.bearman_f2_era },
    { name: 'Antonelli',     moment: 'Prema · F2 2024', livery: '#A0A0A0', initials: 'KA', imageUrl: RACE_IMG.antonelli_f3 },
    { name: 'Russell',       moment: 'F2 champion',     livery: '#00D2BE', initials: 'GR', imageUrl: RACE_IMG.russell_art_f2 },
    { name: 'Leclerc',       moment: 'F2 champion',     livery: '#DC0000', initials: 'CL', imageUrl: RACE_IMG.leclerc_prema_f2 },
  ],
  f3: [
    { name: 'Norris',     moment: 'F3 era · 2017',    livery: '#FFD700', initials: 'LN', imageUrl: RACE_IMG.norris_young },
    { name: 'Russell',    moment: 'GP3 title · 2017', livery: '#00D2BE', initials: 'GR', imageUrl: RACE_IMG.russell_art_f2 },
    { name: 'Piastri',    moment: 'F3 title · 2020',  livery: '#FF8700', initials: 'OP', imageUrl: RACE_IMG.piastri_prema_f2 },
    { name: 'Antonelli',  moment: 'Prema F3 · 2023',  livery: '#A0A0A0', initials: 'KA', imageUrl: RACE_IMG.antonelli_f3 },
    { name: 'Hadjar',     moment: 'Hitech F3 · 2022', livery: '#2293D1', initials: 'IH', imageUrl: RACE_IMG.hadjar_f3_era },
    { name: 'Bearman',    moment: 'Prema F2 · 2024',  livery: '#DC0000', initials: 'OB', imageUrl: RACE_IMG.bearman_f2_era },
    { name: 'Lindblad',   moment: 'ART F3 · 2024',    livery: '#1E3A8A', initials: 'AL', imageUrl: IMG.lindblad },
    { name: 'Norris',     moment: 'Carlin F2 · 2018', livery: '#FF8700', initials: 'LN', imageUrl: RACE_IMG.norris_carlin_f2 },
    { name: 'Schumacher', moment: 'Prema F2 · 2020',  livery: '#DC143C', initials: 'MS', imageUrl: RACE_IMG.mick_f2_era },
    { name: 'Bortoleto',  moment: 'F2 champion 24',   livery: '#00E5FF', initials: 'GB', imageUrl: RACE_IMG.bortoleto_f2_era },
    { name: 'Hadjar',     moment: 'F3 podium · 2022', livery: '#2293D1', initials: 'IH', imageUrl: RACE_IMG.hadjar_f3_era },
    { name: 'Antonelli',  moment: 'F2 · Barcelona 24',livery: '#A0A0A0', initials: 'KA', imageUrl: RACE_IMG.antonelli_f3 },
  ],
}

// 4 per column, sizes that fill the space — slight clipping at viewport edge is intentional
const POSITIONS: GhostPos[] = [
  { side: 'left',   top: '-3%',  size: 210 },
  { side: 'left',   top: '23%',  size: 220 },
  { side: 'left',   top: '49%',  size: 210 },
  { side: 'left',   top: '72%',  size: 215 },
  { side: 'right',  top: '2%',   size: 215 },
  { side: 'right',  top: '26%',  size: 210 },
  { side: 'right',  top: '51%',  size: 220 },
  { side: 'right',  top: '74%',  size: 210 },
  { side: 'bottom', left: '7%',  size: 215 },
  { side: 'bottom', left: '29%', size: 210 },
  { side: 'bottom', left: '54%', size: 220 },
  { side: 'bottom', left: '76%', size: 210 },
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
  const [delay] = useState<number>(() => Math.random() * 0.7)
  const [rotation] = useState<number>(() => (Math.random() - 0.5) * 8) // ±4° for collage energy
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
    position.side === 'left'
      ? 'translateX(-80px)'
      : position.side === 'right'
        ? 'translateX(80px)'
        : 'translateY(80px)'

  const posStyle: React.CSSProperties = {
    position: 'absolute',
    width: position.size,
    height: Math.round(position.size * 1.55),
    opacity: active ? 1 : 0,
    transform: active ? `rotate(${rotation}deg)` : `${initTransform} rotate(${rotation}deg)`,
    transition: `opacity 0.7s ease ${delay}s, transform 0.9s ease ${delay}s`,
  }
  if (position.side === 'left') { posStyle.left = 0; posStyle.top = position.top }
  else if (position.side === 'right') { posStyle.right = 0; posStyle.top = position.top }
  else { posStyle.left = position.left; posStyle.bottom = 0 }

  return (
    <div style={{ ...posStyle, overflow: 'visible' }}>
      {/* Livery color glow blob — extends outside card bounds, no hard edge */}
      <div style={{
        position: 'absolute', inset: '-35%',
        background: `radial-gradient(ellipse at 50% 55%, ${moment.livery}70 0%, ${moment.livery}25 35%, transparent 65%)`,
        filter: 'blur(28px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Photo — no border, vignette fades edges to black creating soft cutout */}
      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1, overflow: 'hidden' }}>
        <img
          src={moment.imageUrl}
          alt={moment.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
        {/* Edge vignette — blacks out corners/sides so figure bleeds into background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 45%, transparent 38%, rgba(0,0,0,0.7) 68%, rgba(0,0,0,0.97) 88%)',
        }} />
        {/* Subtle livery tint at top */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 15%, ${moment.livery}30 0%, transparent 55%)`,
        }} />
        {/* Bottom gradient for text legibility */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '48%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.6) 45%, transparent 100%)',
        }} />
      </div>

      {/* Initials badge */}
      <span style={{
        position: 'absolute', top: 8, right: 8, zIndex: 2,
        fontFamily: 'var(--font-mono)', fontSize: 9, color: moment.livery,
        background: 'rgba(0,0,0,0.55)', padding: '3px 6px', borderRadius: 3, letterSpacing: 1.5,
      }}>
        {moment.initials}
      </span>
      {/* Name */}
      <span style={{
        position: 'absolute', bottom: 22, left: 0, right: 0, zIndex: 2,
        textAlign: 'center', fontFamily: 'var(--font-sans)',
        fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: 0.3,
      }}>
        {moment.name}
      </span>
      {/* Caption */}
      <span style={{
        position: 'absolute', bottom: 8, left: 0, right: 0, zIndex: 2,
        textAlign: 'center', fontFamily: 'var(--font-mono)',
        fontSize: 9, color: `${moment.livery}cc`, letterSpacing: 1.5,
      }}>
        {moment.moment.toUpperCase()}
      </span>
    </div>
  )
}

/* ─── DriverPortrait ─────────────────────────────────────────────────────────── */

function DriverPortrait({ portrait }: { portrait: Portrait }) {
  return (
    <div style={{
      aspectRatio: '1',
      background: '#000',
      border: '0.5px solid #222',
      borderRadius: 4, overflow: 'hidden', position: 'relative',
    }}>
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
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        position: 'relative', background: '#080808',
        border: `1px solid ${hovered ? config.color : '#1a1a1a'}`,
        borderRadius: 10, padding: '24px 20px',
        overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? `0 0 32px ${config.color}55` : 'none',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 34, fontWeight: 400,
            color: config.color, letterSpacing: -1,
          }}>
            {`f(${config.num})`}
          </span>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            padding: '3px 8px', border: '0.5px solid #2a2a2a',
            borderRadius: 3, lineHeight: 1,
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 1, color: '#666' }}>
              FORMULA
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500,
              color: config.color, fontStyle: 'italic', marginTop: 2,
            }}>
              {config.num}
            </span>
          </div>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#666' }}>
          {config.tier}
        </span>
      </div>

      {/* Telemetry squiggle */}
      <svg viewBox="0 0 240 24" style={{ width: '100%', height: 20, margin: '0 0 16px', display: 'block' }} aria-hidden="true">
        <path d={config.svgPath} stroke={config.color} strokeWidth={1.2} fill="none" opacity={0.9} />
      </svg>

      {/* Description */}
      <p style={{ fontSize: 13, color: '#aaa', margin: '0 0 18px', lineHeight: 1.5 }}>
        {config.description}
      </p>

      {/* Driver portraits */}
      <div style={{ borderTop: '0.5px solid #1a1a1a', paddingTop: 14 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 12px' }}>
          {config.iconLabel}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
          {config.portraits.map((p) => (
            <DriverPortrait key={p.initials} portrait={p} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: config.color, letterSpacing: 1.5, margin: '18px 0 0' }}>
        ENTER →
      </p>
    </Link>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function GhostSummonPage() {
  const [ghostSeries, setGhostSeries] = useState<SeriesKey | null>(null)
  const [ghostVisible, setGhostVisible] = useState(false)
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
    return () => { if (clearTimerRef.current) clearTimeout(clearTimerRef.current) }
  }, [])

  return (
    <div style={{ background: '#000', color: '#fff', position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>

      {/* Background decorative telemetry lines */}
      <svg
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
          <path d="M 0 140 Q 200 100, 400 180 T 800 160" stroke="#FF1E56" strokeWidth={1} fill="none" />
          <path d="M 0 220 Q 250 280, 500 240 T 800 280" stroke="#00E5FF" strokeWidth={1} fill="none" />
          <path d="M 0 560 Q 180 500, 380 580 T 800 540" stroke="#B026FF" strokeWidth={1} fill="none" />
          <path d="M 0 820 Q 300 860, 550 800 T 800 840" stroke="#00FF94" strokeWidth={1} fill="none" />
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
        }}
      >
        {/*
          key={ghostSeries} forces this subtree to remount when the series changes,
          giving each new set of ghosts a fresh entrance animation.
        */}
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
          opacity: ghostVisible ? 0.2 : 1,
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
        <div style={{ padding: '4rem 1.75rem 2.5rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: '#666', margin: '0 0 20px' }}>
            DRIVING STYLE · SETUP · PREDICTIONS
          </p>
          <h1 style={{ fontSize: 44, fontWeight: 400, margin: '0 0 14px', letterSpacing: -1, lineHeight: 1.05 }}>
            The function of<br />the grid.
          </h1>
          <p style={{ fontSize: 14, color: '#888', margin: '0 auto', maxWidth: 420, lineHeight: 1.6 }}>
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
