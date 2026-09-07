export type F1NewsItem = {
  title: string
  url: string
  thumbnail?: string
}

export type F1NewsResult = {
  items: F1NewsItem[]
  fetchedAt: string
}

const LATEST_URL = 'https://www.formula1.com/en/latest'
const ORIGIN = 'https://www.formula1.com'

function decodeEntities(text: string): string {
  return text
    .replace(/&#x27;/gi, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
}

function absolutize(href: string): string {
  if (href.startsWith('http')) return href
  return `${ORIGIN}${href.startsWith('/') ? '' : '/'}${href}`
}

function parseLatestHtml(html: string, limit: number): F1NewsItem[] {
  const items: F1NewsItem[] = []
  const seen = new Set<string>()

  // Prefer full anchor blocks so we can recover title + nearby image.
  const anchorRe =
    /<a[^>]+href="([^"]*\/en\/latest\/article\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi

  let match: RegExpExecArray | null
  while ((match = anchorRe.exec(html)) !== null && items.length < limit) {
    const url = absolutize(match[1])
    if (seen.has(url)) continue

    const inner = match[2]
    const title = stripTags(inner)
    if (!title || title.length < 12) continue

    const imgMatch = inner.match(
      /(?:src|srcSet)=["'](https:\/\/media\.formula1\.com\/image\/upload\/[^"'>\s]+)/i,
    )
    const nearby = html.slice(Math.max(0, match.index - 800), match.index + match[0].length + 400)
    const nearbyImg =
      imgMatch?.[1] ??
      nearby.match(/(https:\/\/media\.formula1\.com\/image\/upload\/[^"'>\s]+)/i)?.[1]

    seen.add(url)
    items.push({
      title,
      url,
      thumbnail: nearbyImg,
    })
  }

  return items
}

/**
 * Fetch latest Formula 1 editorial stories from formula1.com.
 * Falls back to an empty list on network/parse failure so the landing page still renders.
 */
export async function fetchF1News(limit = 8): Promise<F1NewsResult> {
  const fetchedAt = new Date().toISOString()
  try {
    const res = await fetch(LATEST_URL, {
      next: { revalidate: 300 },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; f(x)-news-bot/1.0; +https://github.com/sbalsara05/formula-function)',
        Accept: 'text/html,application/xhtml+xml',
      },
    })
    if (!res.ok) {
      return { items: [], fetchedAt }
    }
    const html = await res.text()
    return { items: parseLatestHtml(html, limit), fetchedAt }
  } catch {
    return { items: [], fetchedAt }
  }
}
