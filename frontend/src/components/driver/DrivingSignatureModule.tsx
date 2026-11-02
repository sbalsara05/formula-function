'use client'

import { useState } from 'react'
import Link from 'next/link'
import RadarChart from './RadarChart'
import { COHORT_COPY, COHORT_ORDER } from '@/lib/signature-copy'
import type { DrivingSignature, Series, SignatureCohortKey } from '@/lib/types'

const COHORT_OPTIONS = COHORT_ORDER.map((key) => ({ key, pill: COHORT_COPY[key].pill }))

const VISION_ONLY_AXES = new Set(['Steering Smoothness'])

const MONO_LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 8px',
}
const EXPLAINER_TEXT: React.CSSProperties = { fontSize: 12, color: '#999', lineHeight: 1.65, margin: '0 0 8px' }

function CalculationExplainer({ signature, selected, metricsHref }: {
  signature: DrivingSignature; selected: SignatureCohortKey; metricsHref: string | null
}) {
  const era = signature.era
  return (
    <div style={{ border: '0.5px solid #1a1a1a', borderRadius: 6, padding: '20px 22px', margin: '0 0 20px', background: '#050505' }}>
      {era && (
        <div style={{ marginBottom: 16 }}>
          <p style={MONO_LABEL}>
            THE ERA · <span style={{ color: '#ccc' }}>{era.label.toUpperCase()} · {(era.span ?? era.seasons).toUpperCase()}</span>
          </p>
          {era.rules && <p style={{ ...EXPLAINER_TEXT, maxWidth: 760 }}>{era.rules}</p>}
          {era.caveat && <p style={{ ...EXPLAINER_TEXT, maxWidth: 760, color: '#666', margin: 0 }}>{era.caveat}</p>}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 28, borderTop: '0.5px solid #1a1a1a', paddingTop: 16 }}>
        <div>
          <p style={MONO_LABEL}>WHY ERAS</p>
          <p style={EXPLAINER_TEXT}>
            A rule change alters how every car brakes, turns and wears its tyres, so signatures are computed separately
            for each regulation era. This one uses {era?.seasons ?? 'all available'} data.
          </p>
        </div>
        <div>
          <p style={MONO_LABEL}>THE FIELD</p>
          <p style={EXPLAINER_TEXT}>
            Each measurement is a difference from the other cars in the same session (same track, weather and tyres),
            then ranked 0–100 against every driver-era in the dataset. 50 is typical; 90 is ahead of nine in ten.
          </p>
        </div>
        <div>
          <p style={MONO_LABEL}>THE COMPARISON · {COHORT_COPY[selected].pill}</p>
          <p style={EXPLAINER_TEXT}>{COHORT_COPY[selected].description} Drawn as the dashed shape.</p>
        </div>
      </div>
      {metricsHref && (
        <Link
          href={`${metricsHref}#method`}
          style={{ display: 'inline-block', marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#aaa', textDecoration: 'none' }}
        >
          FULL METHOD AND THRESHOLDS ↗
        </Link>
      )}
    </div>
  )
}

function shortSeasons(seasons: string): string {
  const [from, to] = seasons.split('–')
  return to ? `${from}–${to.slice(-2)}` : from
}

function cohortValues(signature: DrivingSignature, key: SignatureCohortKey): (number | null)[] | null {
  const values = key === 'era' ? (signature.cohorts?.era ?? signature.cohortAverage) : signature.cohorts?.[key]
  return values && values.some((v) => v !== null) ? values : null
}

export default function DrivingSignatureModule({
  signature, series, seriesColor, entityHex,
}: {
  signature: DrivingSignature | null
  series: Series
  seriesColor: string
  entityHex: string
}) {
  const [selected, setSelected] = useState<SignatureCohortKey>('era')
  const [explainerOpen, setExplainerOpen] = useState(false)
  const comparison = signature ? cohortValues(signature, selected) : null
  const selectedPill = COHORT_COPY[selected].pill
  const metricsHref = signature
    ? `/f/${series.replace('f', '')}/driver/${signature.driverId}/signature${signature.era ? `?era=${encodeURIComponent(signature.era.id)}` : ''}`
    : null

  const laps = signature?.sampleSize?.toLocaleString('en-US')
  const fieldNote = signature?.era ? ` · vs. ${shortSeasons(signature.era.seasons)} field` : ''
  const sourceNote = !signature
    ? ''
    : signature.source === 'vision'
      ? `extracted from ${laps} onboard laps${fieldNote}.`
      : `computed from ${laps} laps of official timing data${fieldNote}.`
  const unmeasured = signature?.axes.filter((a) => a.value === null) ?? []

  return (
    <div style={{ padding: '2.5rem 1.75rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: seriesColor, margin: 0 }}>
          DRIVING SIGNATURE
        </p>
        {signature && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555' }}>
            <span>COMPARE:</span>
            {COHORT_OPTIONS.map(({ key, pill }) => {
              const active = key === selected
              const available = cohortValues(signature, key) !== null
              return (
                <button
                  key={key}
                  type="button"
                  disabled={!available}
                  aria-pressed={active}
                  onClick={() => setSelected(key)}
                  style={{
                    padding: '3px 8px',
                    border: active ? '0.5px solid #2a2a2a' : '0.5px solid transparent',
                    borderRadius: 3,
                    color: active ? '#fff' : available ? '#555' : '#2a2a2a',
                    background: active ? '#111' : 'transparent',
                    cursor: available ? 'pointer' : 'default',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                  }}
                >
                  {pill}
                </button>
              )
            })}
          </div>
        )}
      </div>
      <p style={{ fontSize: 13, color: '#888', margin: signature ? '0 0 10px' : '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>
        {signature
          ? `The shape of their driving — ${sourceNote}`
          : 'The shape of their driving, measured corner by corner against the rest of the grid.'}
      </p>
      {signature && (
        <button
          type="button"
          aria-expanded={explainerOpen}
          onClick={() => setExplainerOpen((open) => !open)}
          style={{
            background: 'transparent', border: 'none', padding: 0, margin: '0 0 18px', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: explainerOpen ? '#aaa' : '#666',
          }}
        >
          HOW IS THIS CALCULATED? {explainerOpen ? '−' : '+'}
        </button>
      )}
      {signature && explainerOpen && <CalculationExplainer signature={signature} selected={selected} metricsHref={metricsHref} />}

      <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: 32 }}>
        {signature ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginBottom: 16 }}>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: '#555', margin: '0 0 4px' }}>
                  THE FINGERPRINT
                </p>
                <p style={{ fontSize: 15, color: '#ccc', margin: 0, fontWeight: 400 }}>
                  Six-axis breakdown: steering smoothness, entry aggression, tyre management, throttle application, braking, and consistency.
                </p>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#666', letterSpacing: 1, whiteSpace: 'nowrap' }}>
                vs. {selectedPill}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
              <RadarChart signature={signature} entityColor={entityHex} comparison={comparison ?? undefined} />
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 10 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, background: entityHex, borderRadius: 1, display: 'inline-block' }} />
                <span style={{ color: '#ccc', letterSpacing: 1 }}>DRIVER</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, border: '1px dashed #888', borderRadius: 1, display: 'inline-block' }} />
                <span style={{ color: '#888', letterSpacing: 1 }}>{selectedPill}</span>
              </span>
            </div>

            {unmeasured.length > 0 && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 0.5, color: '#555', textAlign: 'center', margin: '14px auto 0', maxWidth: 460, lineHeight: 1.6 }}>
                {unmeasured.map((a) => (
                  `${a.label.toUpperCase()} PENDING — ${VISION_ONLY_AXES.has(a.label)
                    ? 'needs steering-angle data from onboard video'
                    : 'not enough sessions in this era yet'}`
                )).join(' · ')}
              </p>
            )}

            {metricsHref && (
              <div style={{ borderTop: '0.5px solid #1a1a1a', marginTop: 28, paddingTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
                <Link
                  href={metricsHref}
                  style={{
                    background: 'transparent', border: '0.5px solid #2a2a2a', color: '#aaa',
                    fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
                    padding: '7px 13px', borderRadius: 4, textDecoration: 'none',
                  }}
                >
                  FULL METRICS ↗
                </Link>
              </div>
            )}
          </>
        ) : (
          <div style={{ padding: '24px 0', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#666', margin: '0 0 10px' }}>
              SIGNATURE PENDING
            </p>
            <p style={{ fontSize: 13, color: '#777', margin: '0 auto', maxWidth: 460, lineHeight: 1.6 }}>
              {series === 'f1'
                ? 'Official timing telemetry covers Formula 1 from 2023 onwards, and a signature needs at least five sessions in one regulation era. Earlier careers will come from the onboard vision pipeline.'
                : `There is no public telemetry for ${series.toUpperCase()}. This signature will come from the onboard vision pipeline.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
