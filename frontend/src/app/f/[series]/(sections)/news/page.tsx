import { notFound } from 'next/navigation'
import { F1NewsSection } from '@/components/home/F1NewsSection'
import { PageIntro } from '@/components/series/SectionHeading'
import { SERIES_CONFIG } from '@/data/series-config'
import { fetchF1News } from '@/lib/f1-news'

export default async function NewsPage({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params
  if (series !== '1') notFound()
  const config = SERIES_CONFIG['1']
  const news = await fetchF1News(24)

  return (
    <>
      <PageIntro
        kicker={config.name.toUpperCase()}
        title="News"
        meta={`${news.items.length} STORIES · SOURCE · FORMULA1.COM`}
        color={config.color}
      />
      <F1NewsSection items={news.items} fetchedAt={news.fetchedAt} accentColor={config.color} />
    </>
  )
}
