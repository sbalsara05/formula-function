'use client'

import { useState } from 'react'
import RadarChart from './RadarChart'
import { COHORT_COPY, COHORT_ORDER } from '@/lib/signature-copy'
import type { DrivingSignature, SignatureCohortKey } from '@/lib/types'

/** Radar with the four comparison buttons, for the full metrics page. */
export default function CohortRadar({ signature, entityHex }: { signature: DrivingSignature; entityHex: string }) {
  const [selected, setSelected] = useState<SignatureCohortKey>('era')
  const values = signature.cohorts?.[selected]
  const comparison = values && values.some((v) => v !== null) ? values : undefined

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 8, fontFamily: 'var(--font-mono)', fontSize: 9 }}>
        {COHORT_ORDER.map((key) => {
          const active = key === selected
          const available = Boolean(signature.cohorts?.[key]?.some((v) => v !== null))
          return (
            <button
              key={key}
              type="button"
              disabled={!available}
              aria-pressed={active}
              onClick={() => setSelected(key)}
              style={{
                padding: '3px 8px', borderRadius: 3, fontFamily: 'inherit', fontSize: 'inherit',
                border: active ? '0.5px solid #2a2a2a' : '0.5px solid transparent',
                color: active ? '#fff' : available ? '#555' : '#2a2a2a',
                background: active ? '#111' : 'transparent',
                cursor: available ? 'pointer' : 'default',
              }}
            >
              {COHORT_COPY[key].pill}
            </button>
          )
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <RadarChart signature={signature} entityColor={entityHex} comparison={comparison} />
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 0.5, color: '#555', textAlign: 'center', lineHeight: 1.6, margin: '10px auto 0', maxWidth: 380 }}>
        DASHED: {COHORT_COPY[selected].pill} — {COHORT_COPY[selected].description}
      </p>
    </div>
  )
}
