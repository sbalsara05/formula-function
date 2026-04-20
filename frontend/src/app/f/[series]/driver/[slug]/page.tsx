import { notFound } from 'next/navigation'
import DriverPage from '@/components/driver/DriverPage'
import {
  vettel, vettelStats, vettelEras, vettelSignature,
  vettelReelSlides, vettelScoutingReport,
  bearman, bearmanStats, bearmanEras, bearmanSignature,
  bearmanReelSlides, bearmanScoutingReport, bearmanTrajectory,
} from '@/data/mock/drivers'
import type {
  Series, Driver, DriverStats, DriverEra, DrivingSignature,
  ReelSlide, ScoutingReport, TrajectoryPrediction,
} from '@/lib/types'

const SERIES_MAP: Record<string, Series> = {
  '1': 'f1',
  '2': 'f2',
  '3': 'f3',
}

interface DriverBundle {
  driver: Driver
  stats: DriverStats
  eras: DriverEra[]
  signature: DrivingSignature
  reelSlides: ReelSlide[]
  scoutingReport: ScoutingReport
  trajectoryPrediction?: TrajectoryPrediction
  heroStatRows?: Array<{ label: string; value: string; sub?: string; accent?: boolean }>
}

const DRIVER_REGISTRY: Partial<Record<Series, Record<string, DriverBundle>>> = {
  f1: {
    vettel: {
      driver: vettel,
      stats: vettelStats,
      eras: vettelEras,
      signature: vettelSignature,
      reelSlides: vettelReelSlides,
      scoutingReport: vettelScoutingReport,
    },
  },
  f2: {
    bearman: {
      driver: bearman,
      stats: bearmanStats,
      eras: bearmanEras,
      signature: bearmanSignature,
      reelSlides: bearmanReelSlides,
      scoutingReport: bearmanScoutingReport,
      trajectoryPrediction: bearmanTrajectory,
      heroStatRows: [
        { label: 'F2 POS', value: 'P4', sub: '2024', accent: true },
        { label: 'F2 WINS', value: '3' },
        { label: 'F1 STARTS', value: '3', sub: 'SUB · 2024' },
        { label: 'F1 POINTS', value: '6', sub: 'JEDDAH P7' },
        { label: '2025', value: 'HAAS', sub: 'FULL-TIME F1' },
      ],
    },
  },
}

export default async function DriverRoute({
  params,
}: {
  params: Promise<{ series: string; slug: string }>
}) {
  const { series: seriesParam, slug } = await params

  const series = SERIES_MAP[seriesParam]
  if (!series) notFound()

  const bundle = DRIVER_REGISTRY[series]?.[slug.toLowerCase()]
  if (!bundle) notFound()

  return <DriverPage {...bundle} series={series} />
}
