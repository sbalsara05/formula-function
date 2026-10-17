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

export const SERIES_COLOR_HEX: Record<Series, string> = {
  f1: '#FF1E56',
  f2: '#00E5FF',
  f3: '#B026FF',
}
