import { notFound } from 'next/navigation'
import TeamPage from '@/components/team/TeamPage'
import PremaPage from '@/components/team/PremaPage'
import {
  ferrari, ferrariStats, ferrariEras, ferrariSignatureBars,
  ferrariReelSlides, ferrariAcademy, ferrariIconicCars,
  prema, premaStats, premaReelSlides, premaSignatureBars,
  premaGraduates, premaCurrentSeason,
} from '@/data/mock/teams'
import type {
  Series, Team, TeamStats, TeamEngineeringEra, TeamSignatureBar,
  TeamAcademyDriver, TeamIconicCar, ReelSlide,
} from '@/lib/types'

const SERIES_MAP: Record<string, Series> = {
  '1': 'f1',
  '2': 'f2',
  '3': 'f3',
}

interface TeamBundle {
  team: Team
  stats: TeamStats
  eras: TeamEngineeringEra[]
  signatureBars: TeamSignatureBar[]
  reelSlides: ReelSlide[]
  academy: TeamAcademyDriver[]
  iconicCars: TeamIconicCar[]
}

const TEAM_REGISTRY: Partial<Record<Series, Record<string, TeamBundle>>> = {
  f1: {
    ferrari: {
      team: ferrari,
      stats: ferrariStats,
      eras: ferrariEras,
      signatureBars: ferrariSignatureBars,
      reelSlides: ferrariReelSlides,
      academy: ferrariAcademy,
      iconicCars: ferrariIconicCars,
    },
  },
}

export default async function TeamRoute({
  params,
}: {
  params: Promise<{ series: string; slug: string }>
}) {
  const { series: seriesParam, slug } = await params

  const series = SERIES_MAP[seriesParam]
  if (!series) notFound()

  // Prema is available in f2 and f3
  if (slug.toLowerCase() === 'prema' && (series === 'f2' || series === 'f3')) {
    return (
      <PremaPage
        team={prema}
        stats={premaStats}
        reelSlides={premaReelSlides}
        signatureBars={premaSignatureBars}
        graduates={premaGraduates}
        currentSeason={premaCurrentSeason}
        series={series}
      />
    )
  }

  const bundle = TEAM_REGISTRY[series]?.[slug.toLowerCase()]
  if (!bundle) notFound()

  return <TeamPage {...bundle} series={series} />
}
