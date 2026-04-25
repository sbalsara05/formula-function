'use client'

import { useMemo, useState } from 'react'
import type { DriverEra } from '@/lib/types'

function isAllowedImageUrl(url: string): boolean {
  return (
    url.startsWith('/') ||
    url.includes('upload.wikimedia.org/') ||
    url.includes('commons.wikimedia.org/wiki/Special:FilePath/') ||
    url.includes('en.wikipedia.org/wiki/Special:FilePath/')
  )
}

function buildEraImageCandidates(era: DriverEra): string[] {
  if (!era.imageUrl || !isAllowedImageUrl(era.imageUrl)) return []
  return [era.imageUrl]
}

export default function EraImage({ era }: { era: DriverEra }) {
  const candidates = useMemo(() => buildEraImageCandidates(era), [era])
  const [candidateIdx, setCandidateIdx] = useState(0)

  if (!candidates.length || candidateIdx >= candidates.length) return null

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={candidates[candidateIdx]}
      alt=""
      aria-hidden="true"
      onError={() => setCandidateIdx((i) => i + 1)}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 30%',
        opacity: 0.45,
      }}
    />
  )
}
