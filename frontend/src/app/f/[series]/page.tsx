import { notFound } from 'next/navigation'
import Link from 'next/link'
import FallbackImg from '@/components/ui/FallbackImg'
import { F1NewsSection } from '@/components/home/F1NewsSection'
import { F1EraCard } from '@/components/home/F1EraCard'
import { F1SectionNav } from '@/components/home/F1SectionNav'
import VenueCardTrack from '@/components/venue/VenueCardTrack'
import { CURRENT_F1_DRIVERS, CURRENT_F1_TEAMS, CURRENT_F1_VENUES } from '@/data/f1-current-grid'
import { VENUE_TRACK_PATHS } from '@/data/mock/venues'
import { applyDriverNumbers, fetchF1DriverNumberData, type DriverNumberData } from '@/lib/f1-driver-numbers'
import { applyTeamAssets } from '@/lib/f1-team-assets'
import {
  F1_CHAMPIONS,
  F1_CHAMPIONSHIP_LEGEND,
  TIMELINE_START,
  TIMELINE_END,
  TIMELINE_SPAN,
  TIMELINE_DECADE_MARKERS,
  championBarColor,
} from '@/data/f1-champions'
import { F1_ERAS } from '@/data/f1-eras'
import { fetchF1News, type F1NewsItem } from '@/lib/f1-news'

/* ─── Series config ──────────────────────────────────────────────────────────── */

const SERIES_CONFIG = {
  '1': {
    label: 'f(1)', name: 'Formula 1', color: '#FF1E56',
    tier: 'TIER 1 · THE PINNACLE',
    description: 'The pinnacle of motorsport. Championships, constructors, and the drivers who shaped the modern era.',
    drivers: [
      { slug: 'verstappen',        name: 'Max Verstappen',    tagline: '4× WDC · Red Bull · 2021–2024',        color: '#1E3A8A' },
      { slug: 'hamilton',          name: 'Lewis Hamilton',    tagline: '7× WDC · Mercedes dynasty · Ferrari',   color: '#00D2BE' },
      { slug: 'leclerc',           name: 'Charles Leclerc',   tagline: 'Ferrari · Monaco native · 2019–',       color: '#DC0000' },
      { slug: 'norris',            name: 'Lando Norris',      tagline: 'McLaren · 2025 WDC · 1× Monaco win',    color: '#FF8000' },
      { slug: 'piastri',           name: 'Oscar Piastri',     tagline: 'McLaren · 2024 WDC runner-up',          color: '#FF8000' },
      { slug: 'alonso',            name: 'Fernando Alonso',   tagline: '2× WDC · Renault · Ferrari · 2001–',    color: '#006F62' },
      { slug: 'russell',           name: 'George Russell',    tagline: 'Mercedes · Williams graduate · 2020–',  color: '#00D2BE' },
      { slug: 'sainz',             name: 'Carlos Sainz Jr.',  tagline: 'Williams · 2024 Australian GP winner',  color: '#005AFF' },
      { slug: 'vettel',            name: 'Sebastian Vettel',  tagline: '4× WDC · Red Bull dynasty · 2010–2013',color: '#1E3A8A' },
      { slug: 'schumacher',        name: 'Michael Schumacher',tagline: '7× WDC · Ferrari · Benetton · 1991–',  color: '#DC0000' },
      { slug: 'senna',             name: 'Ayrton Senna',      tagline: '3× WDC · Monaco legend · 1984–1994',   color: '#E10600' },
      { slug: 'prost',             name: 'Alain Prost',       tagline: '4× WDC · McLaren · Williams · 1980–93', color: '#FF8000' },
      { slug: 'raikkonen',         name: 'Kimi Räikkönen',    tagline: '1× WDC · Ferrari · McLaren · 2001–21', color: '#DC0000' },
      { slug: 'button',            name: 'Jenson Button',     tagline: '1× WDC · Brawn GP · 2009',             color: '#BFFF00' },
      { slug: 'hakkinen',          name: 'Mika Häkkinen',     tagline: '2× WDC · McLaren · 1998–1999',         color: '#E8E8E8' },
      { slug: 'hill',              name: 'Damon Hill',        tagline: '1× WDC · Williams · 1996',             color: '#005AFF' },
      { slug: 'mansell',           name: 'Nigel Mansell',     tagline: '1× WDC · Williams · 1992',             color: '#005AFF' },
      { slug: 'rosberg',           name: 'Nico Rosberg',      tagline: '1× WDC · Mercedes · 2016',             color: '#00D2BE' },
      { slug: 'ricciardo',         name: 'Daniel Ricciardo',  tagline: 'McLaren · Red Bull · 2011–2023',       color: '#1E3A8A' },
    ],
    teams: [
      { slug: 'ferrari',       name: 'Scuderia Ferrari',    tagline: '16× WCC · most storied constructor',    color: '#DC0000' },
      { slug: 'red-bull',      name: 'Red Bull Racing',     tagline: '6× WCC · 8× WDC · Verstappen dynasty',  color: '#1E3A8A' },
      { slug: 'mclaren',       name: 'McLaren',             tagline: '8× WCC · 2024 Constructors\' Champions', color: '#FF8000' },
      { slug: 'mercedes',      name: 'Mercedes',            tagline: '8× WCC · Hamilton dynasty · 2014–2021', color: '#00D2BE' },
      { slug: 'williams',      name: 'Williams Racing',     tagline: '9× WCC · constructors legend',           color: '#005AFF' },
      { slug: 'aston-martin',  name: 'Aston Martin',        tagline: 'Alonso · British racing green',          color: '#006F62' },
      { slug: 'alpine',        name: 'Alpine F1 Team',      tagline: 'Renault lineage · 2× WCC',              color: '#0090FF' },
      { slug: 'haas',          name: 'Haas F1 Team',        tagline: 'American constructor · 2016–',          color: '#B6BABD' },
      { slug: 'lotus',         name: 'Team Lotus',          tagline: '7× WCC · Clark · Hill · Senna',         color: '#FFD700' },
      { slug: 'benetton',      name: 'Benetton Formula',    tagline: '1× WCC · Schumacher · 1994–1995',       color: '#009944' },
      { slug: 'brawn',         name: 'Brawn GP',            tagline: '1× WCC · Button · 2009',               color: '#BFFF00' },
      { slug: 'brabham',       name: 'Brabham',             tagline: '2× WCC · Brabham · Piquet',             color: '#4A90D9' },
    ],
    venues: [
      { slug: 'spa',          name: 'Spa-Francorchamps',   tagline: '7.004 km · Ardennes, Belgium',            color: '#5FB87C' },
      { slug: 'monaco',       name: 'Circuit de Monaco',   tagline: '3.337 km · Monte Carlo',                  color: '#B5A642' },
      { slug: 'monza',        name: 'Monza',               tagline: '5.793 km · Temple of Speed, Italy',       color: '#C12E2E' },
      { slug: 'silverstone',  name: 'Silverstone',         tagline: '5.891 km · Northamptonshire, GB',         color: '#005AFF' },
      { slug: 'suzuka',       name: 'Suzuka',              tagline: '5.807 km · Mie Prefecture, Japan',        color: '#FF6B35' },
      { slug: 'interlagos',   name: 'Interlagos',          tagline: '4.309 km · São Paulo, Brazil',            color: '#00A651' },
      { slug: 'bahrain',      name: 'Bahrain',             tagline: '5.412 km · Sakhir, Bahrain',              color: '#E0891A' },
      { slug: 'abu-dhabi',    name: 'Abu Dhabi',           tagline: '5.281 km · Yas Marina, UAE',              color: '#9B59B6' },
      { slug: 'jeddah',       name: 'Jeddah',              tagline: '6.174 km · Corniche Street Circuit, KSA', color: '#1E8A4C' },
      { slug: 'melbourne',    name: 'Melbourne',           tagline: '5.278 km · Albert Park, Australia',       color: '#003580' },
      { slug: 'shanghai',     name: 'Shanghai',            tagline: '5.451 km · China · since 2004',           color: '#DE2910' },
      { slug: 'miami',        name: 'Miami',               tagline: '5.412 km · Hard Rock Stadium, USA',       color: '#00B4D8' },
      { slug: 'imola',        name: 'Imola',               tagline: '4.909 km · Emilia-Romagna, Italy',        color: '#CC3300' },
      { slug: 'montreal',     name: 'Montreal',            tagline: '4.361 km · Circuit Gilles Villeneuve',    color: '#FF0000' },
      { slug: 'barcelona',    name: 'Barcelona',           tagline: '4.657 km · Catalunya, Spain',             color: '#FFCC00' },
      { slug: 'hungaroring',  name: 'Hungaroring',         tagline: '4.381 km · Mogyoród, Hungary',            color: '#CC0000' },
      { slug: 'zandvoort',    name: 'Zandvoort',           tagline: '4.259 km · North Holland, Netherlands',   color: '#FF6600' },
      { slug: 'baku',         name: 'Baku',                tagline: '6.003 km · Azerbaijan Street Circuit',    color: '#009999' },
      { slug: 'singapore',    name: 'Singapore',           tagline: '4.927 km · Marina Bay Street Circuit',    color: '#FF3300' },
      { slug: 'cota',         name: 'Circuit of the Americas', tagline: '5.513 km · Austin, Texas, USA',      color: '#003366' },
      { slug: 'mexico',       name: 'Mexico City',         tagline: '4.304 km · Hermanos Rodriguez, 2,238m alt',color: '#006847' },
      { slug: 'las-vegas',    name: 'Las Vegas',           tagline: '6.201 km · Las Vegas Strip Circuit',      color: '#CC9900' },
      { slug: 'qatar',        name: 'Qatar',               tagline: '5.419 km · Lusail International Circuit', color: '#8C1C13' },
    ],
  },
  '2': {
    label: 'f(2)', name: 'Formula 2', color: '#00E5FF',
    tier: 'TIER 2 · THE PROVING GROUND',
    description: 'Where the next generation earns the call-up. Every F1 champion must pass through.',
    drivers: [
      { slug: 'leclerc-f2',   name: 'Charles Leclerc',   tagline: 'F2 champion 2017 · Prema · → Ferrari F1',     color: '#DC0000' },
      { slug: 'russell-f2',   name: 'George Russell',    tagline: 'F2 champion 2018 · ART · wire-to-wire',       color: '#00D2BE' },
      { slug: 'schumacher-f2',name: 'Mick Schumacher',   tagline: 'F2 champion 2020 · Prema · Haas F1',          color: '#E8001C' },
      { slug: 'piastri-f2',   name: 'Oscar Piastri',     tagline: 'F2 champion 2021 · Prema · rookie title',     color: '#FF8000' },
      { slug: 'bortoleto',    name: 'Gabriel Bortoleto', tagline: 'F2 champion 2024 · Invicta · Sauber F1 2025', color: '#52E252' },
      { slug: 'bearman',      name: 'Oliver Bearman',    tagline: 'Haas F1 2025 · Prema F2 2023–24 · FDA',       color: '#B6BABD' },
      { slug: 'antonelli',    name: 'Kimi Antonelli',    tagline: 'Mercedes F1 2025 · Prema F2 2024 · P3',       color: '#00D2BE' },
      { slug: 'hadjar',       name: 'Isack Hadjar',      tagline: 'Red Bull F1 2025 · F2 runner-up 2024',        color: '#1E3A8A' },
      { slug: 'pourchaire',   name: 'Théo Pourchaire',   tagline: 'F2 champion 2023 · ART · Sauber reserve',     color: '#52E252' },
      { slug: 'drugovich',    name: 'Felipe Drugovich',  tagline: 'F2 champion 2022 · MP Motorsport',            color: '#006F62' },
    ],
    teams: [
      { slug: 'prema',           name: 'Prema Racing',        tagline: '6× F2 champion · graduate machine · Italy',    color: '#E8001C' },
      { slug: 'art',             name: 'ART Grand Prix',      tagline: '3× F2 champion · Russell · de Vries · Pourchaire', color: '#888888' },
      { slug: 'dams',            name: 'DAMS Lucas Oil',      tagline: 'French outfit · GP2 powerhouse · 2004–',        color: '#CC2200' },
      { slug: 'mp',              name: 'MP Motorsport',       tagline: 'Drugovich 2022 champion · Dutch squad',         color: '#FF6600' },
      { slug: 'invicta',         name: 'Invicta Racing',      tagline: 'Bortoleto 2024 champion · rebranded Virtuosi',   color: '#1199CC' },
      { slug: 'hitech',          name: 'Hitech TGR',          tagline: 'Red Bull partnership · F2 & F3 outfit',         color: '#CC0022' },
      { slug: 'trident',         name: 'Trident',             tagline: 'Italian outfit · F2 & F3 regular',              color: '#990000' },
      { slug: 'campos',          name: 'Campos Racing',       tagline: 'Spanish constructor · GP2 veteran',             color: '#002266' },
      { slug: 'rodin',           name: 'Rodin Motorsport',    tagline: 'New Zealand-backed outfit · F2 & F3',           color: '#CC3300' },
      { slug: 'vaf',             name: 'Van Amersfoort Racing', tagline: 'Dutch outfit · F2 & F3 · 2022–',              color: '#FF9900' },
    ],
    venues: [] as { slug: string; name: string; tagline: string; color: string }[],
  },
  '3': {
    label: 'f(3)', name: 'Formula 3', color: '#B026FF',
    tier: 'TIER 3 · THE FIRST RUNG',
    description: 'Where raw talent meets the pyramid for the first time. 30 drivers, 10 teams, zero margin.',
    drivers: [
      { slug: 'shwartzman-f3',  name: 'Robert Shwartzman',  tagline: 'F3 champion 2019 · Prema · Ferrari reserve',   color: '#DC0000' },
      { slug: 'piastri-f3',     name: 'Oscar Piastri',      tagline: 'F3 champion 2020 · Prema · → F2 → F1',        color: '#FF8000' },
      { slug: 'hauger-f3',      name: 'Dennis Hauger',      tagline: 'F3 champion 2021 · Prema · Red Bull Junior',   color: '#1E3A8A' },
      { slug: 'martins-f3',     name: 'Victor Martins',     tagline: 'F3 champion 2022 · ART · Alpine Academy',      color: '#0090FF' },
      { slug: 'bortoleto',      name: 'Gabriel Bortoleto',  tagline: 'F3 champion 2023 · Trident · → F2 champion',   color: '#52E252' },
      { slug: 'fornaroli-f3',   name: 'Leonardo Fornaroli', tagline: 'F3 champion 2024 · Trident · Italian prodigy', color: '#990000' },
    ],
    teams: [
      { slug: 'prema',   name: 'Prema Racing',   tagline: 'F3 dynasty · 4 titles 2019–2021, 2022 · Italy', color: '#E8001C' },
      { slug: 'trident', name: 'Trident',         tagline: '3× F3 champion · Bortoleto · Fornaroli · Câmara', color: '#990000' },
      { slug: 'art',     name: 'ART Grand Prix',  tagline: 'Martins 2022 · F3 & F2 · Belgian-French',       color: '#888888' },
      { slug: 'hitech',  name: 'Hitech TGR',      tagline: 'UK-based · F3 & F2 regular since 2018',          color: '#CC0022' },
      { slug: 'mp',      name: 'MP Motorsport',   tagline: 'Dutch outfit · F3 & F2 · Drugovich 2022',         color: '#FF6600' },
      { slug: 'campos',  name: 'Campos Racing',   tagline: 'Spanish veterans · F3 & F2 since 2010s',          color: '#002266' },
      { slug: 'vaf',     name: 'Van Amersfoort',  tagline: 'Dutch outfit · Verstappen alumni · F2 2022–',     color: '#FF9900' },
      { slug: 'rodin',   name: 'Rodin Motorsport',tagline: 'Formerly Carlin · NZ-backed · F3 & F2 2024–',     color: '#CC3300' },
    ],
    venues: [] as { slug: string; name: string; tagline: string; color: string }[],
  },
}

/* ─── Shared EntityCard ──────────────────────────────────────────────────────── */

function EntityCard({ href, type, name, tagline, entityColor, seriesColor, image, imageFallback, number, numberImage, logoImage, logoFallback, trackPath, flipTrackVertical, flipTrackHorizontal }: {
  href: string; type: string; name: string; tagline: string; entityColor: string; seriesColor: string
  image?: string; imageFallback?: string; number?: string; numberImage?: string; logoImage?: string; logoFallback?: string
  trackPath?: string
  flipTrackVertical?: boolean
  flipTrackHorizontal?: boolean
}) {
  const isDriver = type === 'DRIVER'
  const isTeam = type === 'TEAM'
  const isVenue = type === 'VENUE'
  const hasPhoto = Boolean(image)
  const hasHero = hasPhoto && (isDriver || isTeam)
  const teamUsesPhoto = isTeam && Boolean(image?.startsWith('/images/'))
  const showNumber = isDriver && Boolean(numberImage || number)
  const showLogo = isTeam && Boolean(logoImage || logoFallback)
  const showTrack = isVenue && Boolean(trackPath)
  return (
    <Link href={href} className="entity-card-link" style={{
      display: 'block', textDecoration: 'none', color: 'inherit',
      background: '#080808', border: '0.5px solid #1a1a1a',
      borderRadius: 10, position: 'relative', overflow: 'hidden',
    }}>
      {hasHero && isTeam ? (
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: 300,
          background: `linear-gradient(165deg, ${entityColor}40 0%, ${entityColor}18 38%, #070707 100%)`,
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.85) 1px, transparent 1px)',
            backgroundSize: '10px 10px',
          }} />
          {teamUsesPhoto ? (
            <FallbackImg
              src={image!}
              alt={name}
              fallbackSrc={imageFallback}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: '42% 58%',
                opacity: 0.92,
                zIndex: 1,
              }}
            />
          ) : (
            <div style={{
              position: 'absolute', left: '-8%', right: '-8%', bottom: -6, height: '70%',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              zIndex: 1, pointerEvents: 'none',
            }}>
              <FallbackImg
                src={image!}
                alt={name}
                fallbackSrc={imageFallback}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  opacity: 0.96,
                }}
              />
            </div>
          )}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
            background: teamUsesPhoto
              ? `linear-gradient(165deg, ${entityColor}55 0%, transparent 42%), linear-gradient(to bottom, transparent 40%, rgba(8,8,8,0.7) 82%, #080808 100%)`
              : 'linear-gradient(to bottom, transparent 48%, rgba(8,8,8,0.55) 78%, #080808 100%)',
          }} />
          <div style={{
            position: 'absolute', top: 10, left: 12, right: 12, zIndex: 3,
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 8, color: entityColor,
              background: 'rgba(0,0,0,0.45)', border: `0.5px solid ${entityColor}55`,
              padding: '2px 7px', borderRadius: 3, letterSpacing: 1.5,
            }}>{type}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {showLogo && (
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(255,255,255,0.1)', border: '0.5px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 9,
                }}>
                  {logoImage ? (
                    <FallbackImg
                      src={logoImage}
                      alt={`${name} logo`}
                      fallbackSrc={logoFallback}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  ) : logoFallback ? (
                    <FallbackImg
                      src={logoFallback}
                      alt={`${name} logo`}
                      style={{
                        width: '100%', height: '100%', objectFit: 'contain',
                        filter: 'brightness(0) invert(1)', opacity: 0.9,
                      }}
                    />
                  ) : null}
                </div>
              )}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: seriesColor }}>→</span>
            </div>
          </div>
        </div>
      ) : hasHero && isDriver ? (
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#050505',
          height: 300,
        }}>
          <FallbackImg
            src={image!}
            alt={name}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              opacity: 0.92,
              position: 'relative',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 50%, #080808 100%)',
          }} />
          {showNumber && (
            <div style={{
              position: 'absolute',
              right: 6,
              top: '18%',
              bottom: '12%',
              width: '40%',
              maxWidth: 130,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}>
              {numberImage ? (
                <FallbackImg
                  src={numberImage}
                  alt={number ? `#${number}` : ''}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
              ) : (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 52,
                  fontWeight: 500,
                  lineHeight: 1,
                  letterSpacing: -2,
                  color: 'rgba(255,255,255,0.85)',
                }}>
                  {number}
                </span>
              )}
            </div>
          )}
          <div style={{ position: 'absolute', top: 10, left: 12, right: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 8, color: entityColor,
              background: 'rgba(0,0,0,0.55)', border: `0.5px solid ${entityColor}55`,
              padding: '2px 7px', borderRadius: 3, letterSpacing: 1.5,
            }}>{type}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: seriesColor }}>→</span>
          </div>
        </div>
      ) : hasPhoto ? (
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#050505',
          height: 152,
        }}>
          <FallbackImg
            src={image!}
            alt={name}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              opacity: 0.92,
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(120% 90% at 50% 22%, transparent 32%, #080808 92%)',
          }} />
          <div style={{ position: 'absolute', top: 10, left: 12, right: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 8, color: entityColor,
              background: 'rgba(0,0,0,0.55)', border: `0.5px solid ${entityColor}55`,
              padding: '2px 7px', borderRadius: 3, letterSpacing: 1.5,
            }}>{type}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: seriesColor }}>→</span>
          </div>
        </div>
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 0% 50%, ${entityColor} 0%, transparent 50%)`,
          opacity: 0.06, pointerEvents: 'none',
        }} />
      )}
      {showTrack && trackPath && (
        <VenueCardTrack
          d={trackPath}
          color={entityColor}
          flipVertical={flipTrackVertical}
          flipHorizontal={flipTrackHorizontal}
        />
      )}
      <div style={{ padding: hasHero || hasPhoto ? '14px 18px 18px' : '20px 22px', position: 'relative', zIndex: 1 }}>
        {!hasHero && !hasPhoto && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 8, color: entityColor,
              background: entityColor + '18', border: `0.5px solid ${entityColor}44`,
              padding: '2px 7px', borderRadius: 3, letterSpacing: 1.5,
            }}>{type}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: seriesColor }}>→</span>
          </div>
        )}
        <p style={{ fontSize: 18, fontWeight: 400, color: '#fff', margin: '0 0 6px', letterSpacing: -0.5 }}>{name}</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: 0, letterSpacing: 0.5 }}>
          {tagline.toUpperCase()}
        </p>
      </div>
    </Link>
  )
}

/* ─── Live standings helpers ─────────────────────────────────────────────────── */

interface DriverStandingRow {
  position: number
  driverId: string
  firstName: string
  lastName: string
  nationality: string
  permanentNumber?: string
  constructorId: string
  constructorName: string
  points: string
  wins: string
}

interface ConstructorStandingRow {
  position: number
  constructorId: string
  name: string
  nationality: string
  points: string
  wins: string
}

interface LiveStandings {
  season: string
  round: string
  driverStandings: DriverStandingRow[]
  constructorStandings: ConstructorStandingRow[]
}

async function fetchLiveStandings(): Promise<LiveStandings | null> {
  try {
    const [dRes, cRes] = await Promise.all([
      fetch('https://api.jolpi.ca/ergast/f1/current/driverstandings.json', { next: { revalidate: 300 } }),
      fetch('https://api.jolpi.ca/ergast/f1/current/constructorstandings.json', { next: { revalidate: 300 } }),
    ])
    if (!dRes.ok || !cRes.ok) return null
    const [dData, cData] = await Promise.all([dRes.json(), cRes.json()])

    const dList = dData?.MRData?.StandingsTable?.StandingsLists?.[0]
    const cList = cData?.MRData?.StandingsTable?.StandingsLists?.[0]
    if (!dList || !cList) return null

    const season = dList.season as string
    const round = dList.round as string

    const driverStandings: DriverStandingRow[] = (dList.DriverStandings ?? []).map((s: Record<string, unknown>) => {
      const d = s.Driver as Record<string, string>
      const c = (s.Constructors as Array<Record<string, string>>)?.[0]
      return {
        position: parseInt(s.position as string),
        driverId: d?.driverId ?? '',
        firstName: d?.givenName ?? '',
        lastName: d?.familyName ?? '',
        nationality: d?.nationality ?? '',
        permanentNumber: d?.permanentNumber,
        constructorId: c?.constructorId ?? '',
        constructorName: c?.name ?? '',
        points: s.points as string,
        wins: s.wins as string,
      }
    })

    const constructorStandings: ConstructorStandingRow[] = (cList.ConstructorStandings ?? []).map((s: Record<string, unknown>) => {
      const c = s.Constructor as Record<string, string>
      return {
        position: parseInt(s.position as string),
        constructorId: c?.constructorId ?? '',
        name: c?.name ?? '',
        nationality: c?.nationality ?? '',
        points: s.points as string,
        wins: s.wins as string,
      }
    })

    return { season, round, driverStandings, constructorStandings }
  } catch {
    return null
  }
}

const CONSTRUCTOR_COLORS: Record<string, string> = {
  ferrari: '#DC0000', mclaren: '#FF8000', mercedes: '#00D2BE', red_bull: '#1E3A8A',
  williams: '#005AFF', aston_martin: '#006F62', alpine: '#0090FF', haas: '#B6BABD',
  sauber: '#52E252', audi: '#BB1C2A', rb: '#6692FF', cadillac: '#C8A96E',
}

/* ─── F1 heritage page ───────────────────────────────────────────────────────── */

function F1LandingPage({ config, standings, news, driverNumberData }: {
  config: typeof SERIES_CONFIG['1']
  standings: LiveStandings | null
  news: { items: F1NewsItem[]; fetchedAt: string }
  driverNumberData: DriverNumberData
}) {
  const f1Drivers = applyDriverNumbers(CURRENT_F1_DRIVERS, driverNumberData)
  const f1Teams = applyTeamAssets(CURRENT_F1_TEAMS)

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ── */}
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
            F(1) · FORMULA 1
          </span>
        </div>
        <F1SectionNav accentColor={config.color} />
      </header>

      {/* ── DNA: hero + championship timeline ── */}
      <section id="dna" style={{ scrollMarginTop: 64, background: '#000' }}>
      {/* ── Hero ── */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        padding: '5rem 1.75rem 4rem',
        minHeight: '55vh',
        display: 'flex',
        alignItems: 'center',
        background: '#000',
      }}>
        {/* Background glows */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 50%, #FF1E5615 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 30%, #FF1E5608 0%, transparent 50%)', pointerEvents: 'none' }} />
        {/* Diagonal rule lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }} aria-hidden="true">
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="#FF1E56" strokeWidth="1" />
          <line x1="-10%" y1="100%" x2="90%" y2="0" stroke="#FF1E56" strokeWidth="0.5" />
          <line x1="10%" y1="100%" x2="110%" y2="0" stroke="#FF1E56" strokeWidth="0.5" />
        </svg>

        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          {/* Left: identity */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: '#555', margin: '0 0 16px' }}>
              {config.tier}
            </p>
            <h1 style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(72px, 10vw, 130px)',
              fontWeight: 400, color: config.color, letterSpacing: -4, lineHeight: 0.9, margin: '0 0 20px',
            }}>
              f(1)
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: '#444', margin: '0 0 16px' }}>
              FORMULA 1 WORLD CHAMPIONSHIP
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 16, color: '#777', maxWidth: 420, lineHeight: 1.7, margin: 0,
            }}>
              {config.description}
            </p>
          </div>

          {/* Right: key stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a1a1a', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
            {[
              { value: '77', label: 'SEASONS' },
              { value: '35', label: 'CHAMPIONS' },
              { value: '1,171', label: 'GRANDS PRIX' },
              { value: '1950', label: 'INAUGURAL' },
            ].map(s => (
              <div key={s.label} style={{ background: '#060606', padding: '24px 28px' }}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 'clamp(28px, 3vw, 42px)',
                  fontWeight: 400, color: '#fff', letterSpacing: -1, margin: '0 0 6px', lineHeight: 1,
                }}>
                  {s.value}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 2, margin: 0 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Championship DNA strip ── */}
      <div
        style={{
          borderTop: '0.5px solid #1a1a1a',
          borderBottom: '0.5px solid #1a1a1a',
          background: '#000',
          isolation: 'isolate',
          paddingBottom: '3.5rem',
        }}
      >
        <div style={{ padding: '14px 1.75rem 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            CHAMPIONSHIP DNA · {TIMELINE_START}–{TIMELINE_END}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            EACH BAR = ONE SEASON · COLOR = CONSTRUCTOR THAT WON THE DRIVERS&apos; TITLE THAT SEASON
          </p>
        </div>
        <div style={{ padding: '0 1.75rem 0', position: 'relative' }}>
          {/* Year bars */}
          <div style={{ display: 'flex', gap: 2, height: 48, alignItems: 'stretch' }}>
            {F1_CHAMPIONS.map(c => (
              <div
                key={c.year}
                title={`${c.year} · ${c.driver} · ${c.team}`}
                style={{
                  flex: 1, background: championBarColor(c.team),
                  opacity: 0.85,
                  borderRadius: 1,
                  minWidth: 0,
                }}
              />
            ))}
          </div>
          {/* Decade markers */}
          <div style={{ display: 'flex', position: 'relative', height: 20, marginTop: 4 }}>
            {TIMELINE_DECADE_MARKERS.map(yr => {
              const idx = yr - TIMELINE_START
              const pct = (idx / TIMELINE_SPAN) * 100
              return (
                <span
                  key={yr}
                  style={{
                    position: 'absolute',
                    left: `${pct}%`,
                    fontFamily: 'var(--font-mono)', fontSize: 8,
                    color: '#444', letterSpacing: 0.5,
                    transform: 'translateX(-50%)',
                  }}
                >
                  {yr}
                </span>
              )
            })}
          </div>
        </div>
        {/* Legend */}
        <div style={{ padding: '12px 1.75rem 0', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {F1_CHAMPIONSHIP_LEGEND.map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#444', letterSpacing: 1 }}>
                {l.label.toUpperCase()} · {l.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      </section>

      <F1NewsSection items={news.items} fetchedAt={news.fetchedAt} accentColor={config.color} />

      {/* ── Live Standings ── */}
      {standings && (standings.driverStandings.length > 0 || standings.constructorStandings.length > 0) && (
        <section id="standings" style={{ padding: '0 1.75rem 3rem', borderTop: '0.5px solid #1a1a1a', scrollMarginTop: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '2rem 0 20px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
              LIVE STANDINGS
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
              {standings.season} · ROUND {standings.round}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {/* Driver standings */}
            <div style={{ background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px 10px', borderBottom: '0.5px solid #1a1a1a', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#555' }}>DRIVERS</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333' }}>PTS</span>
              </div>
              <div style={{ maxHeight: 460, overflowY: 'auto' }}>
                {standings.driverStandings.map((d, i) => {
                  const teamColor = CONSTRUCTOR_COLORS[d.constructorId] ?? '#555'
                  return (
                    <Link
                      key={d.driverId}
                      href={`/f/1/driver/${d.driverId.replace(/_/g, '-')}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px',
                        borderBottom: i < standings.driverStandings.length - 1 ? '0.5px solid #111' : 'none',
                        textDecoration: 'none', color: 'inherit',
                        background: i === 0 ? teamColor + '0a' : 'transparent',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: i < 3 ? teamColor : '#444', minWidth: 20 }}>
                        P{d.position}
                      </span>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: i === 0 ? '#fff' : '#ccc' }}>
                          {d.lastName}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#444', marginLeft: 8, letterSpacing: 0.5 }}>
                          {d.constructorName.toUpperCase()}
                        </span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: i === 0 ? teamColor : '#666', fontWeight: i === 0 ? 500 : 400 }}>
                        {d.points}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
            {/* Constructor standings */}
            <div style={{ background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px 10px', borderBottom: '0.5px solid #1a1a1a', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#555' }}>CONSTRUCTORS</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333' }}>PTS</span>
              </div>
              {standings.constructorStandings.map((c, i) => {
                const teamColor = CONSTRUCTOR_COLORS[c.constructorId] ?? '#555'
                return (
                  <Link
                    key={c.constructorId}
                    href={`/f/1/team/${c.constructorId.replace(/_/g, '-')}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px',
                      borderBottom: i < standings.constructorStandings.length - 1 ? '0.5px solid #111' : 'none',
                      textDecoration: 'none', color: 'inherit',
                      background: i === 0 ? teamColor + '0a' : 'transparent',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: i < 3 ? teamColor : '#444', minWidth: 20 }}>
                      P{c.position}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ width: 3, height: 12, background: teamColor, display: 'inline-block', borderRadius: 1, marginRight: 8, verticalAlign: 'middle' }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: i === 0 ? '#fff' : '#ccc' }}>
                        {c.name}
                      </span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: i === 0 ? teamColor : '#666', fontWeight: i === 0 ? 500 : 400 }}>
                      {c.points}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Teams ── */}
      <section id="teams" style={{ padding: '0 1.75rem 3rem', borderTop: '0.5px solid #1a1a1a', scrollMarginTop: 64 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16, paddingTop: '2rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            TEAMS
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            CURRENT GRID · 2026 · {f1Teams.length} TEAMS
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {f1Teams.map(item => (
            <EntityCard
              key={item.slug}
              href={`/f/1/team/${item.slug}`}
              type="TEAM"
              name={item.name}
              tagline={item.tagline}
              entityColor={item.color}
              seriesColor={config.color}
              image={item.image}
              imageFallback={item.imageFallback}
              logoImage={item.logoImage}
              logoFallback={item.logoFallback}
            />
          ))}
        </div>
      </section>

      {/* ── Drivers ── */}
      <section id="drivers" style={{ padding: '0 1.75rem 3rem', borderTop: '0.5px solid #1a1a1a', scrollMarginTop: 64 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16, paddingTop: '2rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            DRIVERS
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            CURRENT GRID · 2026 · {f1Drivers.length} DRIVERS
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {f1Drivers.map(item => (
            <EntityCard
              key={item.slug}
              href={`/f/1/driver/${item.slug}`}
              type="DRIVER"
              name={item.name}
              tagline={item.tagline}
              entityColor={item.color}
              seriesColor={config.color}
              image={item.image}
              number={item.number}
              numberImage={item.numberImage}
            />
          ))}
        </div>
      </section>

      {/* ── Eras ── */}
      <section id="eras" style={{ padding: '3rem 1.75rem', scrollMarginTop: 64, background: '#000', borderTop: '0.5px solid #1a1a1a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            ERAS
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            DEFINING CHAPTERS IN THE SPORT&apos;S HISTORY
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {F1_ERAS.map((era, i) => (
            <F1EraCard
              key={era.slug}
              era={era}
              wide={i === F1_ERAS.length - 1}
              href={`/f/1/era/${era.slug}`}
            />
          ))}
        </div>
      </section>

      {/* ── Venues ── */}
      <section id="venues" style={{ padding: '0 1.75rem 4rem', borderTop: '0.5px solid #1a1a1a', scrollMarginTop: 64 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16, paddingTop: '2rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            VENUES
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            2026 CALENDAR · {CURRENT_F1_VENUES.length} CIRCUITS
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {CURRENT_F1_VENUES.map(item => (
            <EntityCard
              key={item.slug}
              href={`/f/1/venue/${item.slug}`}
              type="VENUE"
              name={item.name}
              tagline={item.tagline}
              entityColor={item.color}
              seriesColor={config.color}
              image={item.image}
              trackPath={VENUE_TRACK_PATHS[item.slug]}
              flipTrackVertical={item.slug === 'spa' || item.slug === 'monza'}
              flipTrackHorizontal={item.slug === 'spa' || item.slug === 'monza'}
            />
          ))}
        </div>
      </section>

      {/* ── Memorial ── */}
      <section style={{ padding: '2rem 1.75rem 3rem', borderTop: '0.5px solid #111', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#333', margin: '0 0 14px' }}>
          — IN MEMORIAM —
        </p>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, color: '#444', lineHeight: 2, margin: 0 }}>
          {['Bandini', 'Rindt', 'Peterson', 'Villeneuve', 'Paletti', 'Senna', 'Ratzenberger', 'Bianchi'].join('  ·  ')}
        </p>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: '1rem 1.75rem',
        borderTop: '0.5px solid #1a1a1a',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#333',
      }}>
        <span>f(x) · FORMULA 1</span>
        <span>PHASE 3 · DYNAMIC</span>
      </footer>
    </div>
  )
}

/* ─── F2 data ────────────────────────────────────────────────────────────────── */

const F2_CHAMPIONS = [
  { year: '2017', driver: 'Charles Leclerc',   team: 'Prema Racing',   teamColor: '#E8001C', dest: 'Ferrari',   destColor: '#DC0000' },
  { year: '2018', driver: 'George Russell',    team: 'ART Grand Prix', teamColor: '#888888', dest: 'Mercedes',  destColor: '#00D2BE' },
  { year: '2019', driver: 'Nyck de Vries',     team: 'ART Grand Prix', teamColor: '#888888', dest: 'Williams / AlphaTauri', destColor: '#005AFF' },
  { year: '2020', driver: 'Mick Schumacher',   team: 'Prema Racing',   teamColor: '#E8001C', dest: 'Haas',      destColor: '#B6BABD' },
  { year: '2021', driver: 'Oscar Piastri',     team: 'Prema Racing',   teamColor: '#E8001C', dest: 'McLaren',   destColor: '#FF8000' },
  { year: '2022', driver: 'Felipe Drugovich',  team: 'MP Motorsport',  teamColor: '#FF6600', dest: 'Aston Martin (reserve)', destColor: '#006F62' },
  { year: '2023', driver: 'Théo Pourchaire',   team: 'ART Grand Prix', teamColor: '#888888', dest: 'Sauber (reserve)', destColor: '#52E252' },
  { year: '2024', driver: 'Gabriel Bortoleto', team: 'Invicta Racing', teamColor: '#1199CC', dest: 'Sauber/Audi', destColor: '#52E252' },
]

/* ─── F2 landing page ────────────────────────────────────────────────────────── */

function F2LandingPage({ config }: { config: typeof SERIES_CONFIG['2'] }) {
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ── */}
      <header style={{
        padding: '1rem 1.75rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '0.5px solid #1a1a1a',
        background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/" style={{ textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, color: '#fff', letterSpacing: -0.5 }}>
            f(x)
          </Link>
          <span style={{ color: '#1a1a1a', fontFamily: 'var(--font-mono)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color }}>
            F(2) · FORMULA 2
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/f/2/driver/leclerc-f2" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1, textDecoration: 'none' }}>DRIVERS ↗</Link>
          <Link href="/f/2/team/prema" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1, textDecoration: 'none' }}>TEAMS ↗</Link>
          <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1, textDecoration: 'none' }}>← ALL SERIES</Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 1.75rem 4rem', minHeight: '52vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 50%, #00E5FF15 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 30%, #00E5FF08 0%, transparent 50%)', pointerEvents: 'none' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }} aria-hidden="true">
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="#00E5FF" strokeWidth="1" />
          <line x1="-10%" y1="100%" x2="90%" y2="0" stroke="#00E5FF" strokeWidth="0.5" />
          <line x1="10%" y1="100%" x2="110%" y2="0" stroke="#00E5FF" strokeWidth="0.5" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: '#555', margin: '0 0 16px' }}>
              {config.tier}
            </p>
            <h1 style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(72px, 10vw, 130px)',
              fontWeight: 400, color: config.color, letterSpacing: -4, lineHeight: 0.9, margin: '0 0 20px',
            }}>f(2)</h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: '#444', margin: '0 0 16px' }}>
              FIA FORMULA 2 CHAMPIONSHIP
            </p>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16, color: '#777', maxWidth: 420, lineHeight: 1.7, margin: 0 }}>
              {config.description}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a1a1a', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
            {[
              { value: '8', label: 'SEASONS' },
              { value: '8', label: 'CHAMPIONS' },
              { value: '11', label: 'TEAMS' },
              { value: '2017', label: 'INAUGURAL' },
            ].map(s => (
              <div key={s.label} style={{ background: '#060606', padding: '24px 28px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, color: '#fff', letterSpacing: -1, margin: '0 0 6px', lineHeight: 1 }}>
                  {s.value}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 2, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Championship DNA ── */}
      <section style={{ borderTop: '0.5px solid #1a1a1a', borderBottom: '0.5px solid #1a1a1a' }}>
        <div style={{ padding: '14px 1.75rem 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#555', margin: 0 }}>
            CHAMPIONSHIP DNA · 2017–2024
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            EACH BAR = ONE SEASON · COLOR = CHAMPION'S TEAM
          </p>
        </div>
        <div style={{ display: 'flex', height: 32, gap: 2, padding: '0 1.75rem 12px' }}>
          {F2_CHAMPIONS.map(c => (
            <div
              key={c.year}
              title={`${c.year}: ${c.driver} (${c.team})`}
              style={{
                flex: 1, background: c.teamColor, borderRadius: 2, opacity: 0.75,
                cursor: 'default', transition: 'opacity 0.15s',
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Graduate Machine ── */}
      <section style={{ padding: '3rem 1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, borderBottom: '0.5px solid #1a1a1a', paddingBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            THE GRADUATE MACHINE
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            ALL 8 F2 CHAMPIONS REACHED FORMULA 1
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {F2_CHAMPIONS.map(c => (
            <div key={c.year} style={{
              background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8,
              padding: '16px 18px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: c.teamColor, opacity: 0.7 }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1.5, margin: '0 0 8px' }}>
                {c.year} CHAMPION
              </p>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', margin: '0 0 4px', letterSpacing: -0.3 }}>
                {c.driver}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', margin: '0 0 10px', letterSpacing: 0.5 }}>
                {c.team.toUpperCase()}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#444' }}>→</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: c.destColor, letterSpacing: 0.5 }}>
                  {c.dest.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Series Context ── */}
      <section style={{ padding: '0 1.75rem 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, borderBottom: '0.5px solid #1a1a1a', paddingBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            SERIES IDENTITY
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            {
              label: 'SPEC SERIES',
              value: 'Dallara F2 2018',
              sub: '3.4L Mecachrome V6 · 620 hp · identical machinery',
              color: config.color,
            },
            {
              label: 'THE MANDATE',
              value: 'Prove it here',
              sub: 'Every F1 seat secured after a standout F2 campaign since 2017',
              color: '#888',
            },
            {
              label: 'PREMA DYNASTY',
              value: '3 of 8 titles',
              sub: 'Leclerc 2017, Schumacher 2020, Piastri 2021 — most dominant junior team',
              color: '#E8001C',
            },
          ].map(item => (
            <div key={item.label} style={{ background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '20px 22px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1.5, margin: '0 0 10px' }}>{item.label}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: item.color, letterSpacing: -0.5, margin: '0 0 8px', lineHeight: 1 }}>{item.value}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: 0, lineHeight: 1.6 }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Browse ── */}
      <section style={{ padding: '0 1.75rem 4rem', borderTop: '0.5px solid #1a1a1a' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: '2rem 0 16px' }}>
          BROWSE
        </p>
        {[
          { label: 'DRIVERS', items: config.drivers, type: 'DRIVER', seg: 'driver' },
          { label: 'TEAMS',   items: config.teams,   type: 'TEAM',   seg: 'team' },
        ].map(section => (
          <div key={section.label} style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#444', margin: '0 0 10px' }}>
              {section.label}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {section.items.map(item => (
                <EntityCard
                  key={item.slug}
                  href={`/f/2/${section.seg}/${item.slug}`}
                  type={section.type}
                  name={item.name}
                  tagline={item.tagline}
                  entityColor={item.color}
                  seriesColor={config.color}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: '1rem 1.75rem',
        borderTop: '0.5px solid #1a1a1a',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#333',
      }}>
        <span>f(x) · FORMULA 2</span>
        <span>PHASE 3 · DYNAMIC</span>
      </footer>
    </div>
  )
}

/* ─── F3 data ────────────────────────────────────────────────────────────────── */

const F3_CHAMPIONS = [
  { year: '2019', driver: 'Robert Shwartzman',  team: 'Prema Racing',   teamColor: '#E8001C' },
  { year: '2020', driver: 'Oscar Piastri',       team: 'Prema Racing',   teamColor: '#E8001C' },
  { year: '2021', driver: 'Dennis Hauger',       team: 'Prema Racing',   teamColor: '#E8001C' },
  { year: '2022', driver: 'Victor Martins',      team: 'ART Grand Prix', teamColor: '#888888' },
  { year: '2023', driver: 'Gabriel Bortoleto',   team: 'Trident',        teamColor: '#990000' },
  { year: '2024', driver: 'Leonardo Fornaroli',  team: 'Trident',        teamColor: '#990000' },
]

/* ─── F3 landing page ────────────────────────────────────────────────────────── */

function F3LandingPage({ config }: { config: typeof SERIES_CONFIG['3'] }) {
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ── */}
      <header style={{
        padding: '1rem 1.75rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '0.5px solid #1a1a1a',
        background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/" style={{ textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, color: '#fff', letterSpacing: -0.5 }}>
            f(x)
          </Link>
          <span style={{ color: '#1a1a1a', fontFamily: 'var(--font-mono)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color }}>
            F(3) · FORMULA 3
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/f/3/team/prema" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1, textDecoration: 'none' }}>TEAMS ↗</Link>
          <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1, textDecoration: 'none' }}>← ALL SERIES</Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 1.75rem 4rem', minHeight: '52vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 50%, #B026FF15 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 30%, #B026FF08 0%, transparent 50%)', pointerEvents: 'none' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }} aria-hidden="true">
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="#B026FF" strokeWidth="1" />
          <line x1="-10%" y1="100%" x2="90%" y2="0" stroke="#B026FF" strokeWidth="0.5" />
          <line x1="10%" y1="100%" x2="110%" y2="0" stroke="#B026FF" strokeWidth="0.5" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: '#555', margin: '0 0 16px' }}>
              {config.tier}
            </p>
            <h1 style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(72px, 10vw, 130px)',
              fontWeight: 400, color: config.color, letterSpacing: -4, lineHeight: 0.9, margin: '0 0 20px',
            }}>f(3)</h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: '#444', margin: '0 0 16px' }}>
              FIA FORMULA 3 CHAMPIONSHIP
            </p>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16, color: '#777', maxWidth: 420, lineHeight: 1.7, margin: 0 }}>
              {config.description}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a1a1a', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
            {[
              { value: '6', label: 'SEASONS' },
              { value: '6', label: 'CHAMPIONS' },
              { value: '10', label: 'TEAMS' },
              { value: '2019', label: 'INAUGURAL' },
            ].map(s => (
              <div key={s.label} style={{ background: '#060606', padding: '24px 28px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, color: '#fff', letterSpacing: -1, margin: '0 0 6px', lineHeight: 1 }}>
                  {s.value}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 2, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Championship DNA ── */}
      <section style={{ borderTop: '0.5px solid #1a1a1a', borderBottom: '0.5px solid #1a1a1a' }}>
        <div style={{ padding: '14px 1.75rem 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#555', margin: 0 }}>
            CHAMPIONSHIP DNA · 2019–2024
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>
            EACH BAR = ONE SEASON · COLOR = CHAMPION'S TEAM
          </p>
        </div>
        <div style={{ display: 'flex', height: 32, gap: 2, padding: '0 1.75rem 12px' }}>
          {F3_CHAMPIONS.map(c => (
            <div
              key={c.year}
              title={`${c.year}: ${c.driver} (${c.team})`}
              style={{ flex: 1, background: c.teamColor, borderRadius: 2, opacity: 0.75, cursor: 'default' }}
            />
          ))}
        </div>
      </section>

      {/* ── Champions Roll ── */}
      <section style={{ padding: '3rem 1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, borderBottom: '0.5px solid #1a1a1a', paddingBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            CHAMPIONS ROLL
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333', margin: 0 }}>2019 – 2024</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {F3_CHAMPIONS.map(c => (
            <div key={c.year} style={{
              background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8,
              padding: '16px 18px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: c.teamColor, opacity: 0.7 }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1.5, margin: '0 0 8px' }}>
                {c.year} CHAMPION
              </p>
              <p style={{ fontSize: 15, fontWeight: 500, color: '#fff', margin: '0 0 4px', letterSpacing: -0.3 }}>{c.driver}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', margin: 0, letterSpacing: 0.5 }}>
                {c.team.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Series Context ── */}
      <section style={{ padding: '0 1.75rem 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, borderBottom: '0.5px solid #1a1a1a', paddingBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: 0 }}>
            SERIES IDENTITY
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            {
              label: 'SPEC CHASSIS',
              value: 'Dallara F3 2025',
              sub: '3.4L naturally-aspirated Mecachrome · 30-car grid · 10 teams',
              color: config.color,
            },
            {
              label: 'THE MANDATE',
              value: 'Earn your stripes',
              sub: 'Raw talent vs spec machinery — the only variable is the driver',
              color: '#888',
            },
            {
              label: 'PREMA DOMINANCE',
              value: '3 of 6 titles',
              sub: 'Shwartzman 2019 · Piastri 2020 · Hauger 2021 — early-era dominance',
              color: '#E8001C',
            },
          ].map(item => (
            <div key={item.label} style={{ background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '20px 22px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1.5, margin: '0 0 10px' }}>{item.label}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: item.color, letterSpacing: -0.5, margin: '0 0 8px', lineHeight: 1 }}>{item.value}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: 0, lineHeight: 1.6 }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Browse ── */}
      <section style={{ padding: '0 1.75rem 4rem', borderTop: '0.5px solid #1a1a1a' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: config.color, margin: '2rem 0 16px' }}>
          BROWSE
        </p>
        {[
          { label: 'DRIVERS', items: config.drivers, type: 'DRIVER', seg: 'driver' },
          { label: 'TEAMS',   items: config.teams,   type: 'TEAM',   seg: 'team' },
        ].map(section => (
          <div key={section.label} style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#444', margin: '0 0 10px' }}>
              {section.label}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {section.items.map(item => (
                <EntityCard
                  key={item.slug}
                  href={`/f/3/${section.seg}/${item.slug}`}
                  type={section.type}
                  name={item.name}
                  tagline={item.tagline}
                  entityColor={item.color}
                  seriesColor={config.color}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: '1rem 1.75rem',
        borderTop: '0.5px solid #1a1a1a',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#333',
      }}>
        <span>f(x) · FORMULA 3</span>
        <span>PHASE 3 · DYNAMIC</span>
      </footer>
    </div>
  )
}

/* ─── Route ──────────────────────────────────────────────────────────────────── */

export default async function SeriesLandingPage({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params
  const config = SERIES_CONFIG[series as keyof typeof SERIES_CONFIG]
  if (!config) notFound()

  if (series === '1') {
    const [standings, news, driverNumberData] = await Promise.all([
      fetchLiveStandings(),
      fetchF1News(8),
      fetchF1DriverNumberData(),
    ])
    return (
      <F1LandingPage
        config={config as typeof SERIES_CONFIG['1']}
        standings={standings}
        news={news}
        driverNumberData={driverNumberData}
      />
    )
  }
  if (series === '2') {
    return <F2LandingPage config={config as typeof SERIES_CONFIG['2']} />
  }
  return <F3LandingPage config={config as typeof SERIES_CONFIG['3']} />
}
