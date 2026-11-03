import Link from 'next/link'
import FallbackImg from '@/components/ui/FallbackImg'
import VenueCardTrack from '@/components/venue/VenueCardTrack'

export function EntityCard({ href, type, name, tagline, entityColor, seriesColor, image, imageFallback, number, numberImage, logoImage, logoFallback, trackPath, flipTrackVertical, flipTrackHorizontal }: {
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
