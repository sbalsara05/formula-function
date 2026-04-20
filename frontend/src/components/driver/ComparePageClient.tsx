'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { LapComparisonData } from '@/lib/types'

interface Props {
  data: LapComparisonData
  seriesNum: string
  backHref: string
}

function formatTime(ms: number, pct: number): string {
  const cur = (pct / 100) * ms
  const mins = Math.floor(cur / 60000)
  const secs = (cur % 60000) / 1000
  return `${String(mins).padStart(2, '0')}:${secs.toFixed(3).padStart(6, '0')}`
}

export default function ComparePageClient({ data, seriesNum, backHref }: Props) {
  const [scrubPct, setScrubPct] = useState(35)

  const playheadX = (scrubPct / 100) * 800
  const currentTime = formatTime(data.lapA.lapTimeMs, scrubPct)
  const totalTime = formatTime(data.lapA.lapTimeMs, 100)

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
            <span>COMPARE</span>
            <span style={{ color: '#333' }}>/</span>
            <span style={{ color: '#aaa' }}>LAPS</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            background: 'rgba(0,0,0,0.7)', border: '0.5px solid #2a2a2a', color: '#aaa',
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
            padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
          }}>
            ⇄ SWAP
          </button>
          <button style={{
            background: 'rgba(0,0,0,0.7)', border: '0.5px solid #2a2a2a', color: '#aaa',
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
            padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
          }}>
            + ADD LAP
          </button>
          <button style={{
            background: 'rgba(0,0,0,0.7)', border: '0.5px solid #2a2a2a', color: '#aaa',
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
            padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
          }}>
            SHARE
          </button>
          <Link href={backHref} style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'rgba(0,0,0,0.7)', border: '0.5px solid #2a2a2a', color: '#aaa',
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
              padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
            }}>
              ← BACK
            </button>
          </Link>
        </div>
      </div>

      <div style={{ padding: '3rem 1.75rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: data.colorA, display: 'inline-block' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: data.colorB, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#aaa' }}>
            COMPARING TWO LAPS
          </span>
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 400, margin: '0 0 8px', letterSpacing: -1.5, lineHeight: 1, color: '#fff' }}>
          {data.title}
        </h1>
        <p style={{ fontSize: 32, fontWeight: 300, color: '#666', margin: '0 0 20px', letterSpacing: -0.5 }}>
          {data.subtitle}
        </p>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: '#bbb', lineHeight: 1.7, margin: 0, maxWidth: 680 }}>
          {data.description}
        </p>
      </div>

      <div style={{ padding: '1.5rem 1.75rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{
            background: 'linear-gradient(180deg, #1a0a12 0%, #000 100%)',
            border: '0.5px solid #2a1520',
            borderRadius: 8,
            padding: '22px 24px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: data.colorA }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2,
                background: data.colorA, color: '#fff', padding: '3px 8px', borderRadius: 3,
              }}>
                LAP A
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: data.lapA.teamColor, display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#888', letterSpacing: 1 }}>{data.lapA.teamName}</span>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#aaa', margin: '0 0 6px', letterSpacing: 0.5 }}>
              {data.lapA.name}
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 38, color: '#fff', margin: '0 0 4px', letterSpacing: -1 }}>
              {data.lapA.lapTime}
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: data.lapA.resultColor, margin: '0 0 12px', letterSpacing: 1 }}>
              {data.lapA.result}
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', margin: '0 0 16px', letterSpacing: 1.5 }}>
              {data.lapA.meta}
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {data.lapA.sectors.map((s) => (
                <div key={s.label} style={{ flex: 1, background: 'rgba(255,30,86,0.06)', border: '0.5px solid #2a1520', borderRadius: 4, padding: '8px 10px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#666', margin: '0 0 4px', letterSpacing: 1.5 }}>{s.label}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#fff', margin: 0, letterSpacing: -0.5 }}>{s.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(180deg, #001a20 0%, #000 100%)',
            border: '0.5px solid #0a2530',
            borderRadius: 8,
            padding: '22px 24px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: data.colorB }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2,
                background: data.colorB, color: '#000', padding: '3px 8px', borderRadius: 3,
              }}>
                LAP B
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: data.lapB.teamColor, display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#888', letterSpacing: 1 }}>{data.lapB.teamName}</span>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#aaa', margin: '0 0 6px', letterSpacing: 0.5 }}>
              {data.lapB.name}
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 38, color: '#fff', margin: '0 0 4px', letterSpacing: -1 }}>
              {data.lapB.lapTime}
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: data.lapB.resultColor, margin: '0 0 12px', letterSpacing: 1 }}>
              {data.lapB.result}
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', margin: '0 0 16px', letterSpacing: 1.5 }}>
              {data.lapB.meta}
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {data.lapB.sectors.map((s) => (
                <div key={s.label} style={{ flex: 1, background: 'rgba(0,229,255,0.06)', border: '0.5px solid #0a2530', borderRadius: 4, padding: '8px 10px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#666', margin: '0 0 4px', letterSpacing: 1.5 }}>{s.label}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#fff', margin: 0, letterSpacing: -0.5 }}>{s.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '2rem 1.75rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#FF1E56', margin: '0 0 20px' }}>
          TIME DELTA · WHERE THE GAP CAME FROM
        </p>
        <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '20px 24px', marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 24, height: 2, background: data.colorA }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#888', letterSpacing: 1 }}>VETTEL AHEAD</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 24, height: 2, background: data.colorB }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#888', letterSpacing: 1 }}>WEBBER CATCHING UP</span>
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: data.colorA, letterSpacing: 1 }}>
              FINAL: VETTEL −0.122s
            </span>
          </div>
          <svg viewBox="0 0 800 180" style={{ width: '100%', height: 'auto', display: 'block' }} aria-hidden="true">
            <defs>
              <linearGradient id="deltaGradA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={data.colorA} stopOpacity={0.15} />
                <stop offset="100%" stopColor={data.colorA} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="deltaGradB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={data.colorB} stopOpacity={0} />
                <stop offset="100%" stopColor={data.colorB} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <line x1={0} y1={90} x2={800} y2={90} stroke="#2a2a2a" strokeWidth={1} strokeDasharray="4 4" />
            {[100, 200, 300, 400, 500, 600, 700].map((x) => (
              <line key={x} x1={x} y1={20} x2={x} y2={160} stroke="#1a1a1a" strokeWidth={1} />
            ))}
            <rect x={0} y={20} width={800} height={70} fill="url(#deltaGradA)" />
            <rect x={0} y={90} width={800} height={70} fill="url(#deltaGradB)" />
            <path d={data.deltaPath} stroke={data.colorA} strokeWidth={2} fill="none" />
            <circle cx={264} cy={58} r={4} fill={data.colorA} />
            <circle cx={600} cy={108} r={4} fill={data.colorB} />
            <circle cx={800} cy={58} r={6} fill={data.colorA} opacity={0.9} />
            <text x={50} y={170} fill="#555" fontSize={8} fontFamily="monospace" letterSpacing={1} textAnchor="middle">T1</text>
            <text x={150} y={170} fill="#555" fontSize={8} fontFamily="monospace" letterSpacing={1} textAnchor="middle">S</text>
            <text x={240} y={170} fill="#FFD700" fontSize={8} fontFamily="monospace" letterSpacing={1} textAnchor="middle">DEGNER</text>
            <text x={330} y={170} fill="#555" fontSize={8} fontFamily="monospace" letterSpacing={1} textAnchor="middle">↓S1/S2</text>
            <text x={430} y={170} fill="#555" fontSize={8} fontFamily="monospace" letterSpacing={1} textAnchor="middle">HAIRPIN</text>
            <text x={530} y={170} fill="#555" fontSize={8} fontFamily="monospace" letterSpacing={1} textAnchor="middle">↓S2/S3</text>
            <text x={640} y={170} fill="#FFD700" fontSize={8} fontFamily="monospace" letterSpacing={1} textAnchor="middle">SPOON</text>
            <text x={740} y={170} fill="#555" fontSize={8} fontFamily="monospace" letterSpacing={1} textAnchor="middle">130R</text>
            <text x={6} y={93} fill="#666" fontSize={7} fontFamily="monospace">0.00</text>
            <text x={6} y={67} fill={data.colorA} fontSize={7} fontFamily="monospace">−0.10</text>
            <text x={6} y={37} fill={data.colorA} fontSize={7} fontFamily="monospace">−0.20</text>
            <text x={6} y={127} fill={data.colorB} fontSize={7} fontFamily="monospace">+0.10</text>
            <text x={6} y={157} fill={data.colorB} fontSize={7} fontFamily="monospace">+0.20</text>
          </svg>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 12 }}>
          {data.deltaInsights.map((insight) => (
            <div key={insight.label} style={{
              background: '#080808',
              border: '0.5px solid #1a1a1a',
              borderLeft: `3px solid ${insight.winner === 'a' ? data.colorA : data.colorB}`,
              borderRadius: 6,
              padding: '14px 16px',
            }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: insight.winner === 'a' ? data.colorA : data.colorB, letterSpacing: 1.5, margin: '0 0 6px' }}>
                {insight.label}
              </p>
              <p style={{ fontSize: 12, color: '#aaa', lineHeight: 1.6, margin: '0 0 8px' }}>{insight.description}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', letterSpacing: 1, margin: 0 }}>{insight.note}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 0.5, margin: 0 }}>
          [DELTA CHART SHAPES ILLUSTRATIVE · RECONSTRUCTED FROM VIDEO ANALYSIS · NOT OFFICIAL F1 TIMING]
        </p>
      </div>

      <div style={{ padding: '2rem 1.75rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#FF1E56', margin: '0 0 20px' }}>
          RACING LINES OVERLAID
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32 }}>
          <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: 24, position: 'relative' }}>
            <svg viewBox="0 0 400 300" style={{ width: '100%', height: 'auto', display: 'block' }} aria-hidden="true">
              <path d={data.circuitPath} stroke="#1a1a1a" strokeWidth={14} fill="none" />
              <path d={data.linePathA} stroke={data.colorA} strokeWidth={2} fill="none" opacity={0.9} />
              <path d={data.linePathB} stroke={data.colorB} strokeWidth={1.5} fill="none" opacity={0.8} />
              {data.lineAnnotations.map((ann, i) => (
                <g key={i}>
                  <circle cx={ann.cx} cy={ann.cy} r={4} fill={ann.winner === 'a' ? data.colorA : data.colorB} />
                  <text
                    x={ann.cx + ann.dx}
                    y={ann.cy + ann.dy}
                    fill={ann.winner === 'a' ? data.colorA : data.colorB}
                    fontSize={7}
                    fontFamily="monospace"
                    letterSpacing={0.5}
                    textAnchor={(ann.textAnchor ?? 'start') as 'start' | 'end' | 'middle' | 'inherit'}
                  >
                    {ann.label}
                  </text>
                </g>
              ))}
              <circle cx={40} cy={232} r={5} fill="#FFD700" />
              <text x={48} y={230} fill="#FFD700" fontSize={7} fontFamily="monospace" letterSpacing={1}>START</text>
              <g>
                <rect x={280} y={270} width={112} height={22} fill="#080808" rx={3} />
                <line x1={286} y1={281} x2={304} y2={281} stroke={data.colorA} strokeWidth={2} />
                <text x={308} y={284} fill="#aaa" fontSize={7} fontFamily="monospace">VETTEL</text>
                <line x1={286} y1={289} x2={304} y2={289} stroke={data.colorB} strokeWidth={1.5} />
                <text x={308} y={292} fill="#aaa" fontSize={7} fontFamily="monospace">WEBBER</text>
              </g>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14, color: '#bbb', lineHeight: 1.75, margin: '0 0 20px' }}>
              {data.divergenceDescription}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 6, padding: '12px 16px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1.5, margin: '0 0 4px' }}>MAX DIVERGENCE</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: '#fff', margin: '0 0 2px', letterSpacing: -0.5 }}>
                  {data.divergence.maxM}m
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', letterSpacing: 1, margin: 0 }}>
                  AT {data.divergence.maxLocation}
                </p>
              </div>
              <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 6, padding: '12px 16px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1.5, margin: '0 0 4px' }}>AVG DIVERGENCE</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: '#fff', margin: '0 0 2px', letterSpacing: -0.5 }}>
                  {data.divergence.avgM}m
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', letterSpacing: 1, margin: 0 }}>PER CORNER</p>
              </div>
              <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 6, padding: '12px 16px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1.5, margin: '0 0 4px' }}>OVERLAP</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: '#fff', margin: '0 0 2px', letterSpacing: -0.5 }}>
                  {data.divergence.overlapPct}%
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', letterSpacing: 1, margin: 0 }}>IDENTICAL LINE</p>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 0.5, margin: '16px 0 0' }}>
              {data.divergence.note}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: '2rem 1.75rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#FF1E56', margin: '0 0 20px' }}>
          TELEMETRY OVERLAY
        </p>
        <div style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '16px 20px', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
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
              {currentTime}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#444', flexShrink: 0 }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#666', flexShrink: 0 }}>
              {totalTime}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {data.overlayTraces.map((trace, idx) => (
              <div key={trace.label} style={{ borderTop: idx === 0 ? 'none' : '0.5px solid #111' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0 2px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#aaa', letterSpacing: 1.5 }}>{trace.label}</span>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: data.colorA, letterSpacing: 1 }}>
                      VETTEL
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: data.colorB, letterSpacing: 1 }}>
                      WEBBER
                    </span>
                  </div>
                </div>
                <svg
                  viewBox="0 0 800 60"
                  style={{ width: '100%', height: 40, display: 'block' }}
                  aria-hidden="true"
                >
                  <line
                    x1={0} y1={trace.label === 'STEERING' ? 30 : 50}
                    x2={800} y2={trace.label === 'STEERING' ? 30 : 50}
                    stroke="#1a1a1a" strokeWidth={1}
                  />
                  <path d={trace.pathA} stroke={data.colorA} strokeWidth={1.5} fill="none" />
                  <path d={trace.pathB} stroke={data.colorB} strokeWidth={1.3} fill="none" opacity={0.9} />
                  <line
                    x1={playheadX} y1={0}
                    x2={playheadX} y2={60}
                    stroke="#fff" strokeWidth={0.8} opacity={0.4}
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 0.5, margin: 0 }}>
          [TELEMETRY RECONSTRUCTED FROM VIDEO · NOT OFFICIAL F1 DATA · ILLUSTRATIVE ONLY]
        </p>
      </div>

      <div style={{ padding: '2rem 1.75rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#FF1E56', margin: '0 0 20px' }}>
          SECTOR BY SECTOR
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {data.sectors.map((sector) => (
            <div key={sector.label} style={{ background: '#080808', border: '0.5px solid #1a1a1a', borderRadius: 8, padding: '18px 20px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1.5, margin: '0 0 6px' }}>{sector.label}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: sector.winnerColor, letterSpacing: 1, margin: '0 0 16px' }}>
                {sector.winnerLabel}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: data.colorA, letterSpacing: 1 }}>A</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#fff', letterSpacing: -0.5 }}>{sector.lapA.time}</span>
                  </div>
                  <div style={{ height: 3, background: '#1a1a1a', borderRadius: 1.5, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${sector.lapA.barWidth}%`, background: data.colorA, borderRadius: 1.5 }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: data.colorB, letterSpacing: 1 }}>B</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#fff', letterSpacing: -0.5 }}>{sector.lapB.time}</span>
                  </div>
                  <div style={{ height: 3, background: '#1a1a1a', borderRadius: 1.5, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${sector.lapB.barWidth}%`, background: data.colorB, borderRadius: 1.5 }} />
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#555', letterSpacing: 1, margin: '12px 0 0' }}>{sector.keyNote}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '2rem 1.75rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#FF1E56', margin: '0 0 20px' }}>
          THE TAKEAWAY
        </p>
        <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {data.takeaway.map((paragraph, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 18,
              color: '#ddd',
              lineHeight: 1.75,
              margin: 0,
            }}>
              {paragraph}
            </p>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 0.5, margin: '20px 0 0' }}>
          [EDITORIAL PLACEHOLDER · NEEDS FINAL VOICE REVIEW]
        </p>
      </div>

      <div style={{ padding: '1rem 1.75rem 2rem', borderTop: '0.5px solid #1a1a1a', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', letterSpacing: 1, margin: '0 0 4px' }}>
          CV PIPELINE · {data.totalFrames} FRAMES ANALYZED · RECONSTRUCTED FROM VIDEO
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#444', letterSpacing: 0.5, margin: 0 }}>
          [TELEMETRY RECONSTRUCTED FROM VIDEO · NOT OFFICIAL F1 DATA · ILLUSTRATIVE ONLY]
        </p>
      </div>

    </div>
  )
}
