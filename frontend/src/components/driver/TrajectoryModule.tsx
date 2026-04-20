import type { TrajectoryPrediction } from '@/lib/types'

const OUTCOME_COLOR: Record<string, string> = {
  F1: '#00E5FF',
  WEC: '#5FB87C',
  IndyCar: '#FFD700',
  FE: '#B026FF',
  Other: '#666',
  Exit: '#444',
}

const OUTCOME_TEXT_COLOR: Record<string, string> = {
  F1: '#002030',
  WEC: '#0a2512',
  IndyCar: '#4a3800',
  FE: '#1a0033',
  Other: '#000',
  Exit: '#000',
}

interface Props {
  prediction: TrajectoryPrediction
  seriesColor: string
}

export default function TrajectoryModule({ prediction, seriesColor }: Props) {
  const { outcomes, cohortAnalogs, featureWeights, confidenceTier, sampleSize, trainingDataRange } = prediction

  return (
    <div style={{ padding: '2rem 1.75rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: seriesColor, margin: 0 }}>
          TRAJECTORY · WHERE THIS ENDS UP
        </p>
        {prediction.statusLabel && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, color: '#FFD700', margin: 0 }}>
            {prediction.statusLabel}
          </p>
        )}
      </div>
      <p style={{ fontSize: 13, color: '#888', margin: '0 0 10px', maxWidth: 560, lineHeight: 1.6 }}>
        A probabilistic view of where this career is most likely to land, derived from cohort-matching against historical F2/F3 drivers at the same stage.
      </p>
      {prediction.calibrationNote && (
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: '#FFD700', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 24px', maxWidth: 560 }}>
          {prediction.calibrationNote}
        </p>
      )}

      <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: 32 }}>

        {/* Probability bar */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 14px' }}>
            PROBABILITY DISTRIBUTION · ULTIMATE CAREER OUTCOME
          </p>
          <div style={{ display: 'flex', height: 42, borderRadius: 4, overflow: 'hidden', gap: 2, marginBottom: 12 }}>
            {outcomes.map((o) => {
              const pct = Math.round(o.probability * 100)
              const bg = OUTCOME_COLOR[o.destination] ?? '#666'
              const fg = OUTCOME_TEXT_COLOR[o.destination] ?? '#000'
              return (
                <div
                  key={o.destination}
                  style={{
                    flex: pct,
                    background: bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: pct >= 15 ? 11 : 9,
                    color: fg, fontWeight: 600, letterSpacing: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {pct >= 10 ? `${o.destination} · ${pct}%` : `${pct}%`}
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', letterSpacing: 0.5 }}>
            <span>N={sampleSize.toLocaleString()} HISTORICAL F2/F3 DRIVERS {trainingDataRange} · MODEL V2.1</span>
            <span style={{ color: '#5FB87C' }}>CONFIDENCE · {confidenceTier}</span>
          </div>
        </div>

        {/* 2-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, paddingTop: 24, borderTop: '0.5px solid #1a1a1a' }}>

          {/* Cohort analogs */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 14px' }}>
              CLOSEST COHORT ANALOGS
            </p>
            <p style={{ fontSize: 13, color: '#888', margin: '0 0 14px', lineHeight: 1.6 }}>
              Drivers whose CV signature and trajectory most resembled this driver's at the same age.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {cohortAnalogs.map((analog) => {
                const matchColor = analog.matchPercentage >= 75
                  ? seriesColor
                  : analog.matchPercentage >= 65
                    ? '#00557a'
                    : '#666'
                const destColor = analog.destination === 'F1' ? '#5FB87C'
                  : analog.destination === 'WEC' ? '#FFD700' : '#888'
                return (
                  <div key={analog.driverId} style={{ background: '#0a0a0a', border: '0.5px solid #1a1a1a', borderRadius: 6, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{analog.driverName}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: matchColor }}>MATCH · {analog.matchPercentage}%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#888', letterSpacing: 0.5 }}>
                      <span>F2 {analog.era} · {analog.academy?.toUpperCase()}</span>
                      <span style={{ color: destColor }}>→ {analog.currentStatus.toUpperCase()}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: '14px 0 0', letterSpacing: 0.5 }}>
              [COHORT MATCHES PLACEHOLDER · MODEL OUTPUT ILLUSTRATIVE]
            </p>
          </div>

          {/* Feature weights */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 14px' }}>
              WHAT THE MODEL WEIGHTS
            </p>
            <p style={{ fontSize: 13, color: '#888', margin: '0 0 14px', lineHeight: 1.6 }}>
              The factors driving the F1 probability upward, and what could pull it down.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {featureWeights.map((fw, i) => {
                const isPos = fw.direction === 'positive'
                const isNeg = fw.direction === 'negative'
                const signColor = isPos ? '#5FB87C' : isNeg ? '#FF1E56' : '#888'
                const sign = isPos ? '+' : isNeg ? '−' : '·'
                return (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', opacity: isNeg ? 0.75 : 1 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: signColor, minWidth: 28 }}>{sign}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, color: isNeg ? '#aaa' : '#ddd', margin: 0, lineHeight: 1.4 }}>{fw.feature}</p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: signColor, margin: '2px 0 0', letterSpacing: 0.5 }}>
                        {fw.humanReadableValue}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', margin: '14px 0 0', letterSpacing: 0.5 }}>
              [FEATURE WEIGHTS ILLUSTRATIVE · NEEDS MODEL VALIDATION]
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
