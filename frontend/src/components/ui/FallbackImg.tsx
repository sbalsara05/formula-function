'use client'

import type { CSSProperties } from 'react'

interface Props {
  src: string
  alt: string
  style?: CSSProperties
  ariaHidden?: boolean
}

export default function FallbackImg({ src, alt, style, ariaHidden }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      aria-hidden={ariaHidden ? true : undefined}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      style={style}
    />
  )
}
