import { unstable_cache } from 'next/cache'

export type F1NewsItem = {
  title: string
  url: string
  publishedAt?: string
  thumbnail?: string
}

const F1_LATEST_URL = 'https://www.formula1.com/en/latest/all.html'
const F1_BASE = 'https://www.formula1.com'

const CARD_PATTERN = /ArticleListCard-module_articlecard[\s\S]*?src="([^"]+)"[\s\S]*?href="(\/en\/latest\/article\/[^"]+)"[^>]*>([^<]+)<\/a>/gi
const FALLBACK_PATTERN = /href="(\/en\/latest\/article\/[^"]+)"[^>]*>([^<]+)<\/a>/gi

function decodeHtml(text: string): string {
  return text
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

async function fetchF1NewsUncached(limit = 8): Promise<{ items: F1NewsItem[]; fetchedAt: string }> {
  try {
    const res = await fetch(F1_LATEST_URL, {
      headers: { 'User-Agent': 'formula-function/1.0 (+https://github.com/formula-function)' },
      next: { revalidate: 7200 },
    })
    if (!res.ok) return { items: [], fetchedAt: new Date().toISOString() }

    const html = await res.text()
    const items: F1NewsItem[] = []
    const seen = new Set<string>()

    for (const match of html.matchAll(CARD_PATTERN)) {
      const [, thumbnail, path, rawTitle] = match
      if (seen.has(path)) continue
      seen.add(path)
      items.push({
        title: decodeHtml(rawTitle.trim()),
        url: `${F1_BASE}${path}`,
        thumbnail,
      })
      if (items.length >= limit) break
    }

    if (items.length < limit) {
      for (const match of html.matchAll(FALLBACK_PATTERN)) {
        const [, path, rawTitle] = match
        if (seen.has(path)) continue
        const title = decodeHtml(rawTitle.trim())
        if (!title) continue
        seen.add(path)
        items.push({ title, url: `${F1_BASE}${path}` })
        if (items.length >= limit) break
      }
    }

    return { items, fetchedAt: new Date().toISOString() }
  } catch {
    return { items: [], fetchedAt: new Date().toISOString() }
  }
}

export const fetchF1News = unstable_cache(
  async (limit = 8) => fetchF1NewsUncached(limit),
  ['f1-news'],
  { revalidate: 7200 },
)
