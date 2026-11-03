import Link from 'next/link'
import { CONSTRUCTOR_COLORS, type LiveStandings } from '@/lib/f1-standings'

export function StandingsTables({ standings, limit }: { standings: LiveStandings; limit?: number }) {
  const drivers = limit ? standings.driverStandings.slice(0, limit) : standings.driverStandings
  const constructors = limit ? standings.constructorStandings.slice(0, limit) : standings.constructorStandings

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}>
      {/* Driver standings */}
      <div style={{ background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px 10px', borderBottom: '0.5px solid #1a1a1a', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#555' }}>DRIVERS</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333' }}>PTS</span>
        </div>
        {drivers.map((d, i) => {
          const teamColor = CONSTRUCTOR_COLORS[d.constructorId] ?? '#555'
          return (
            <Link
              key={d.driverId}
              href={`/f/1/driver/${d.driverId.replace(/_/g, '-')}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px',
                borderBottom: i < drivers.length - 1 ? '0.5px solid #111' : 'none',
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
      {/* Constructor standings */}
      <div style={{ background: '#060606', border: '0.5px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px 10px', borderBottom: '0.5px solid #1a1a1a', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: '#555' }}>CONSTRUCTORS</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#333' }}>PTS</span>
        </div>
        {constructors.map((c, i) => {
          const teamColor = CONSTRUCTOR_COLORS[c.constructorId] ?? '#555'
          return (
            <Link
              key={c.constructorId}
              href={`/f/1/team/${c.constructorId.replace(/_/g, '-')}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px',
                borderBottom: i < constructors.length - 1 ? '0.5px solid #111' : 'none',
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
  )
}
