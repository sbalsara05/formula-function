import { notFound } from 'next/navigation'
import F1EraPage from '@/components/era/F1EraPage'
import { F1_ERA_BY_SLUG, getEraNeighbors } from '@/data/f1-eras'

const SERIES_MAP: Record<string, string> = {
  '1': 'f1',
  '2': 'f2',
  '3': 'f3',
}

interface Props {
  params: Promise<{ series: string; slug: string }>
}

export default async function EraDetailPage({ params }: Props) {
  const { series, slug } = await params

  if (SERIES_MAP[series] !== 'f1') notFound()

  const era = F1_ERA_BY_SLUG[slug]
  if (!era) notFound()

  const { prev, next } = getEraNeighbors(slug)

  return <F1EraPage era={era} prev={prev} next={next} />
}
