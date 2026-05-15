import type { Series } from './types'

export const SERIES_LABELS: Record<Series, string> = {
  f1: 'Formula 1',
  f2: 'Formula 2',
  f3: 'Formula 3',
}

export const SERIES_COLOR_VAR: Record<Series, string> = {
  f1: 'var(--color-f1)',
  f2: 'var(--color-f2)',
  f3: 'var(--color-f3)',
}

export const SIGNATURE_AXES = [
  'Steering Smoothness',
  'Entry Aggression',
  'Tyre Management',
  'Throttle Application',
  'Braking',
  'Consistency',
] as const

export const PLACEHOLDER = {
  data: 'PLACEHOLDER_DATA',
  image: 'PLACEHOLDER_IMAGE',
  copy: 'PLACEHOLDER_COPY',
} as const

export const SECTION_LABELS = {
  overview: 'Overview',
  eras: 'Eras',
  signature: 'Signature',
  scouting: 'Scouting Report',
  trajectory: 'Trajectory',
} as const
