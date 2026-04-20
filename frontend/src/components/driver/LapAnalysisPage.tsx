'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { LapAnalysis } from '@/lib/types'

interface Props {
  analysis: LapAnalysis
  driverName: string
  driverShortName: string
  driverId: string
  series: string
  seriesNum: string
  entityHex: string
}

const CORNER_LABELS: [number, number, string][] = [
  [0, 10, 'START/FINISH'],
  [10, 25, 'T1–2 ESSES'],
  [25, 40, 'DEGNER COMPLEX'],
  [40, 55, 'HAIRPIN'],
  [55, 70, 'SPOON CURVE'],
  [70, 85, '130R'],
  [85, 100, 'CHICANE · FINISH'],
]

const TRACK_DOT_KEYFRAMES: [number, { cx: number; cy: number }][] = [
  [0, { cx: 40, cy: 170 }],
  [10, { cx: 135, cy: 162 }],
  [25, { cx: 220, cy: 88 }],
  [40, { cx: 170, cy: 168 }],
  [55, { cx: 200, cy: 182 }],
  [70, { cx: 335, cy: 95 }],
  [85, { cx: 200, cy: 194 }],
  [100, { cx: 40, cy: 170 }],
]

function getCornerLabel(pct: number): string {
  for (const [lo, hi, label] of CORNER_LABELS) {
    if (pct >= lo && pct <= hi) return label
  }
  return 'START/FINISH'
}

function interpolateDot(pct: number): { cx: number; cy: number } {
  const frames = TRACK_DOT_KEYFRAMES
  for (let i = 0; i < frames.length - 1; i++) {
    const [a, posA] = frames[i]
    const [b, posB] = frames[i + 1]
    if (pct >= a && pct <= b) {
      const t = (pct - a) / (b - a)
      return {
        cx: posA.cx + (posB.cx - posA.cx) * t,
        cy: posA.cy + (posB.cy - posA.cy) * t,
      }
    }
  }
  return frames[frames.length - 1][1]
}

function formatTime(ms: number): string {
  const totalMs = Math.round(ms)
  const minutes = Math.floor(totalMs / 60000)
  const seconds = Math.floor((totalMs % 60000) / 1000)
  const millis = totalMs % 1000
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(3, '0')}`
}

export default function LapAnalysisPage({
  analysis,
  driverName,
  driverShortName,
  driverId,
  series,
  seriesNum,
  entityHex,
}: Props) {
  const [scrubPct, setScrubPct] = useState(35)

  const derived = useMemo(() => {
    const playheadX = (scrubPct / 100) * 800
    const elapsedMs = analysis.lapTimeMs * (scrubPct / 100)
    const currentTime = formatTime(elapsedMs)
    const cornerLabel = getCornerLabel(scrubPct)
    const distance = Math.round((scrubPct / 100) * analysis.trackLengthM)
    const dotPos = interpolateDot(scrubPct)
    return { playheadX, currentTime, cornerLabel, distance, dotPos }
  }, [scrubPct, analysis.lapTimeMs, analysis.trackLengthM])

  return (
    <div style={{ background: '#000', color: '#fff', margin: '-1rem -1.25rem', padding: 0, minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>

      <div style={{
        padding: '1rem 1.75rem', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: '0.5px solid #1a1a1a',
        background: 'rgba(0,0,0,0.7)', position: 'relative', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, letterSpacing: -0.5 }}>f(x)</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, color: '#666' }}>
            <Link href={`/f/${seriesNum}`} style={{ textDecoration: 'none', color: 'inherit' }}>f({seriesNum})</Link>
            <span style={{ color: '#333' }}>/</span>
            <span>DRIVERS</span>
            <span style={{ color: '#333' }}>/</span>
            <Link href={`/f/${seriesNum}/driver/${driverId}`} style={{ textDecoration: 'none', color: '#666' }}>
              {driverShortName.toUpperCase()}
            </Link>
            <span style={{ color: '#333' }}>/</span>
            <span>ANALYZE</span>
            <span style={{ color: '#333' }}>/</span>
            <span style={{ color: '#aaa' }}>SUZUKA 2009 Q3</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href={`/f/${seriesNum}/compare/laps/${analysis.lapId}/webber-suzuka-2009-q3`} style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'transparent', border: '0.5px solid #FF1E56', color: '#FF1E56',
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
              padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
            }}>
              COMPARE WITH ANOTHER LAP ↗
            </button>
          </Link>
          <button style={{
            background: 'transparent', border: '0.5px solid #2a2a2a', color: '#aaa',
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
            padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
          }}>
            SHARE
          </button>
          <Link href={`/f/${seriesNum}/driver/${driverId}/laps`} style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'transparent', border: '0.5px solid #2a2a2a', color: '#aaa',
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
              padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
            }}>
              ← BACK
            </button>
          </Link>
        </div>
      </div>

      <div style={{ padding: '3rem 1.75rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: entityHex, display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#aaa' }}>
                CV RECONSTRUCTION · SOURCE VIDEO AVAILABLE
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#888', margin: '0 0 10px', letterSpacing: 0.5 }}>
              {driverName}
            </p>
            <h1 style={{ fontSize: 48, fontWeight: 400, margin: '0 0 12px', letterSpacing: -1.5, lineHeight: 1, color: '#fff' }}>
              {analysis.headline}
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#888', margin: '0 0 20px', letterSpacing: 1.5 }}>
              {analysis.metaLine}
            </p>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: '#bbb', lineHeight: 1.7, margin: '0 0 10px' }}>
              "{analysis.narrative}"
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1 }}>
              [NARRATIVE PLACEHOLDER · NEEDS EDITORIAL VOICE]
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '18px 20px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1.5, margin: '0 0 10px' }}>LAP TIME</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 28, color: '#fff', margin: '0 0 4px', letterSpacing: -1 }}>
                {analysis.lapTimeFormatted}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#FFD700', letterSpacing: 1.5, margin: 0 }}>
                {analysis.lapTimeSub}
              </p>
            </div>
            <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '18px 20px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1.5, margin: '0 0 10px' }}>VS TEAMMATE</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 28, color: '#5FB87C', margin: '0 0 4px', letterSpacing: -1 }}>
                {analysis.vTeammate}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', letterSpacing: 1.5, margin: 0 }}>
                {analysis.vTeammateSub}
              </p>
            </div>
            <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '18px 20px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1.5, margin: '0 0 10px' }}>TOP SPEED</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 28, color: '#fff', margin: '0 0 4px', letterSpacing: -1 }}>
                {analysis.topSpeedKmh} <span style={{ fontSize: 12, color: '#666' }}>KM/H</span>
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', letterSpacing: 1.5, margin: 0 }}>
                {analysis.topSpeedSub}
              </p>
            </div>
            <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '18px 20px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1.5, margin: '0 0 10px' }}>AVG THROTTLE</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 28, color: '#fff', margin: '0 0 4px', letterSpacing: -1 }}>
                {analysis.avgThrottlePct}<span style={{ fontSize: 12, color: '#666' }}>%</span>
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', letterSpacing: 1.5, margin: 0 }}>
                {analysis.avgThrottleSub}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '2rem 1.75rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#FF1E56', margin: '0 0 20px' }}>THE RACING LINE</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32 }}>
          <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: 24, position: 'relative' }}>
            <svg
              viewBox="0 0 400 300"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="speedGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#378ADD" />
                  <stop offset="40%" stopColor="#5FB87C" />
                  <stop offset="70%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FF1E56" />
                </linearGradient>
              </defs>
              <path
                d={analysis.racingLinePath}
                stroke="url(#speedGrad)"
                strokeWidth={2}
                fill="none"
                opacity={0.85}
              />
              <circle cx={195} cy={125} r={4} fill="#fff" />
              <circle cx={40} cy={230} r={5} fill="#FFD700" />
              <text x={48} y={228} fill="#FFD700" fontSize={8} fontFamily="monospace" letterSpacing={1}>START/FINISH</text>
              <g>
                <rect x={295} y={270} width={100} height={22} fill="#080808" rx={3} />
                <circle cx={303} cy={281} r={3} fill="#378ADD" />
                <text x={310} y={284} fill="#aaa" fontSize={7} fontFamily="monospace">SLOW</text>
                <circle cx={335} cy={281} r={3} fill="#5FB87C" />
                <circle cx={355} cy={281} r={3} fill="#FFD700" />
                <circle cx={375} cy={281} r={3} fill="#FF1E56" />
                <text x={382} y={284} fill="#aaa" fontSize={7} fontFamily="monospace">FAST</text>
              </g>
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {analysis.sectors.map((sector) => (
                <div key={sector.label} style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 6, padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1.5 }}>{sector.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: sector.positive ? '#5FB87C' : '#888', letterSpacing: 1 }}>{sector.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: '#fff', letterSpacing: -0.5 }}>{sector.time}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: sector.positive ? '#5FB87C' : '#888', letterSpacing: 0.5 }}>{sector.delta}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 6, padding: '14px 16px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1.5, margin: '0 0 8px' }}>OBSERVATION</p>
              <p style={{ fontSize: 12, color: '#aaa', lineHeight: 1.6, margin: 0 }}>{analysis.sectorObservation}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '2rem 1.75rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#FF1E56', margin: '0 0 20px' }}>SYNCED REPLAY · VIDEO + TELEMETRY</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg, #001030, #000814)',
              border: '0.5px solid #1a1a1a',
              borderRadius: 8,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 0 40px #1E3A8A55',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, #1E3A8A33 0%, transparent 70%)' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555', letterSpacing: 2 }}>◉ PLACEHOLDER · VIDEO EMBED</span>
              </div>
              <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.7)', padding: '4px 10px', borderRadius: 4, border: '0.5px solid #2a2a2a' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5FB87C', display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#5FB87C', letterSpacing: 1.5 }}>LIVE SYNC</span>
              </div>
            </div>
          </div>

          <div>
            <div style={{
              aspectRatio: '16/9',
              background: '#080808',
              border: '0.5px solid #1a1a1a',
              borderRadius: 8,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <svg
                viewBox="0 0 400 225"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                aria-hidden="true"
              >
                <path
                  d={analysis.racingLinePath}
                  stroke="#333"
                  strokeWidth={1.5}
                  fill="none"
                  opacity={0.6}
                />
                <circle
                  cx={derived.dotPos.cx}
                  cy={derived.dotPos.cy}
                  r={5}
                  fill="#FF1E56"
                />
                <circle
                  cx={derived.dotPos.cx}
                  cy={derived.dotPos.cy}
                  r={10}
                  fill="none"
                  stroke="#FF1E56"
                  strokeWidth={1}
                  opacity={0.3}
                />
              </svg>
              <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', letterSpacing: 1.5, margin: '0 0 3px' }}>◉ POSITION ON TRACK</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#fff', letterSpacing: 1, margin: '0 0 2px' }}>{derived.cornerLabel}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', letterSpacing: 0.5, margin: 0 }}>{derived.distance.toLocaleString()}m</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '16px 20px', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <button style={{
              background: '#FF1E56', border: 'none', color: '#fff',
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1,
              padding: '8px 16px', borderRadius: 4, cursor: 'pointer', flexShrink: 0,
            }}>
              ▶ PLAY
            </button>
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={scrubPct}
              onChange={(e) => setScrubPct(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: '#FF1E56', cursor: 'pointer' }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff', flexShrink: 0 }}>
              {derived.currentTime}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#444', flexShrink: 0 }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#666', flexShrink: 0 }}>
              01:32.160
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {analysis.telemetry.map((trace, idx) => (
              <div key={trace.label} style={{ borderTop: idx === 0 ? 'none' : '0.5px solid #111' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0 2px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: trace.color, letterSpacing: 1.5 }}>{trace.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 1 }}>
                    {trace.label === 'SPEED' ? `${analysis.topSpeedKmh} KM/H PEAK` :
                     trace.label === 'THROTTLE' ? `${analysis.avgThrottlePct}% AVG` :
                     trace.label === 'BRAKE' ? 'ZONE DATA' : 'INPUT TRACE'}
                  </span>
                </div>
                <svg
                  viewBox="0 0 800 50"
                  style={{ width: '100%', height: 36, display: 'block' }}
                  aria-hidden="true"
                >
                  <line x1={0} y1={trace.label === 'STEERING' ? 25 : 42} x2={800} y2={trace.label === 'STEERING' ? 25 : 42} stroke="#1a1a1a" strokeWidth={1} />
                  <path
                    d={trace.svgPath}
                    stroke={trace.color}
                    strokeWidth={1.5}
                    fill="none"
                  />
                  <line
                    x1={derived.playheadX}
                    y1={0}
                    x2={derived.playheadX}
                    y2={50}
                    stroke="#FF1E56"
                    strokeWidth={1}
                    opacity={trace.label === 'STEERING' ? 1 : 0.5}
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 0.5, margin: 0 }}>
          [VIDEO PLACEHOLDER · IN PROD: EMBED FROM OFFICIAL F1 SOURCE OR LICENSED ARCHIVE · TELEMETRY SHAPES ILLUSTRATIVE]
        </p>
      </div>

      <div style={{ padding: '2rem 1.75rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#FF1E56', margin: '0 0 20px' }}>NOTABLE MOMENTS</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {analysis.moments.map((moment) => {
            const accentColor = moment.accent === 'gold' ? '#FFD700' : '#FF1E56'
            return (
              <div
                key={moment.id}
                onClick={() => setScrubPct(moment.jumpPct)}
                style={{
                  background: '#080808',
                  border: '0.5px solid #1a1a1a',
                  borderLeft: `2px solid ${accentColor}`,
                  borderRadius: 6,
                  padding: '14px 16px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: accentColor, letterSpacing: 1.5 }}>
                    {moment.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', letterSpacing: 0.5 }}>
                    {moment.timestamp} · JUMP ↗
                  </span>
                </div>
                <p style={{ fontSize: 12, color: '#aaa', lineHeight: 1.6, margin: '0 0 8px' }}>{moment.description}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', letterSpacing: 0.5, margin: 0 }}>{moment.stat}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ padding: '2rem 1.75rem' }}>
        <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '24px 28px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#FF1E56', letterSpacing: 2, margin: '0 0 10px' }}>
            NEXT UP · COMPARE THIS LAP
          </p>
          <p style={{ fontSize: 14, color: '#ccc', margin: '0 0 14px', lineHeight: 1.6 }}>
            Overlay this lap against another to see exactly where time was gained or lost.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#666', letterSpacing: 0.5, margin: '0 0 20px' }}>
            SUGGESTED: VETTEL 2013 SUZUKA Q3 · WEBBER 2009 SUZUKA Q3 · HAMILTON 2009 SUZUKA Q3
          </p>
          <Link href={`/f/${seriesNum}/compare/laps/${analysis.lapId}/webber-suzuka-2009-q3`} style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'transparent', border: '0.5px solid #FF1E56', color: '#FF1E56',
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5,
              padding: '10px 20px', borderRadius: 4, cursor: 'pointer',
            }}>
              COMPARE ↗
            </button>
          </Link>
        </div>
      </div>

      <div style={{ padding: '1rem 1.75rem 2rem', borderTop: '0.5px solid #1a1a1a', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1, margin: '0 0 4px' }}>
          CV PIPELINE · {analysis.framesAnalyzed} FRAMES · PROCESSED IN {analysis.processingTimeS}s · VIDEO VIA {analysis.videoSource}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 0.5, margin: 0 }}>
          [TELEMETRY RECONSTRUCTED FROM VIDEO · NOT OFFICIAL F1 DATA · ILLUSTRATIVE ONLY]
        </p>
      </div>

    </div>
  )
}
