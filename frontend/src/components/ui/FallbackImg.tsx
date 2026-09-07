'use client'

import type { CSSProperties } from 'react'

interface Props {
  src: string
  alt: string
  style?: CSSProperties
  ariaHidden?: boolean
  fallbackSrc?: string
}

export default function FallbackImg({ src, alt, style, ariaHidden, fallbackSrc }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      aria-hidden={ariaHidden ? true : undefined}
      onError={(e) => {
        const img = e.target as HTMLImageElement
        if (fallbackSrc && !img.dataset.fallbackTried) {
          img.dataset.fallbackTried = '1'
          img.src = fallbackSrc
          return
        }
        img.style.display = 'none'
      }}
      style={style}
    />
  )
}
