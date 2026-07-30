/**
 * F1 landing page ergonomics probe.
 *
 * Measures:
 *  - Section tab switching (scroll accuracy, active state, hash)
 *  - Driver / team / venue page access from the landing page
 *  - Mobile nav usability (overflow / reachability)
 *
 * Usage: npx tsx scripts/f1-landing-ergonomics.ts
 * Env:   BASE_URL (default http://localhost:3000)
 */

import { chromium, type Page, type Browser } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = process.env.ARTIFACT_DIR ?? '/opt/cursor/artifacts/f1-ergonomics'
const HEADER_OFFSET = 96 // sticky brand + section nav row

type Severity = 'pass' | 'warn' | 'fail'
type Finding = {
  id: string
  severity: Severity
  title: string
  detail: string
  metricMs?: number
}

const findings: Finding[] = []

function record(f: Finding) {
  findings.push(f)
  const icon = f.severity === 'pass' ? '✓' : f.severity === 'warn' ? '!' : '✗'
  console.log(`[${icon}] ${f.id}: ${f.title}${f.metricMs != null ? ` (${f.metricMs}ms)` : ''}`)
  if (f.detail) console.log(`    ${f.detail}`)
}

async function waitForScrollSettle(page: Page, timeoutMs = 4500) {
  const start = Date.now()
  let lastY = await page.evaluate(() => window.scrollY)
  let stable = 0
  while (Date.now() - start < timeoutMs) {
    await page.waitForTimeout(120)
    const y = await page.evaluate(() => window.scrollY)
    if (Math.abs(y - lastY) < 1) {
      stable += 1
      if (stable >= 3) return
    } else {
      stable = 0
      lastY = y
    }
  }
}

async function sectionTop(page: Page, id: string) {
  return page.evaluate(
    ({ id, offset }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const top = el.getBoundingClientRect().top
      return { top, absTop: el.getBoundingClientRect().top + window.scrollY, offset }
    },
    { id, offset: HEADER_OFFSET },
  )
}

async function testTabSwitching(page: Page) {
  await page.goto(`${BASE}/f/1`, { waitUntil: 'networkidle', timeout: 60_000 })
  await page.waitForSelector('nav[aria-label="Page sections"]')

  const navOrder = await page.$$eval('nav[aria-label="Page sections"] a[href^="#"]', (as) =>
    as.map((a) => (a as HTMLAnchorElement).getAttribute('href')!),
  )

  const domOrder = await page.evaluate(() => {
    const ids = ['dna', 'news', 'standings', 'eras', 'teams', 'drivers', 'venues']
    return ids
      .map((id) => {
        const el = document.getElementById(id)
        if (!el) return null
        return { id, y: el.getBoundingClientRect().top + window.scrollY }
      })
      .filter(Boolean)
      .sort((a, b) => a!.y - b!.y)
      .map((x) => `#${x!.id}`)
  })

  const navNormalized = navOrder.join(' → ')
  const domNormalized = domOrder.join(' → ')
  if (navNormalized === domNormalized) {
    record({
      id: 'tabs-order',
      severity: 'pass',
      title: 'Nav tab order matches DOM section order',
      detail: navNormalized,
    })
  } else {
    record({
      id: 'tabs-order',
      severity: 'fail',
      title: 'Nav tab order does not match page section order',
      detail: `nav: ${navNormalized} | dom: ${domNormalized}`,
    })
  }

  await page.screenshot({ path: path.join(OUT, '01-landing-top.png'), fullPage: false })

  for (const href of navOrder) {
    const id = href.slice(1)
    const t0 = Date.now()
    await page.click(`nav[aria-label="Page sections"] a[href="${href}"]`)
    await waitForScrollSettle(page)
    const elapsed = Date.now() - t0

    const pos = await sectionTop(page, id)
    if (!pos) {
      record({
        id: `tab-${id}-exists`,
        severity: 'fail',
        title: `Tab ${href} has no matching section`,
        detail: 'getElementById returned null',
        metricMs: elapsed,
      })
      continue
    }

    const headerH = await page.evaluate(() => {
      const header = document.querySelector('[data-f1-sticky-header]')
      return header?.getBoundingClientRect().height ?? HEADER_OFFSET
    })
    const target = headerH + 4
    const drift = Math.abs(pos.top - target)
    const ok = drift <= 24
    record({
      id: `tab-${id}-scroll`,
      severity: ok ? 'pass' : drift <= 80 ? 'warn' : 'fail',
      title: `Scroll to #${id} lands under sticky header`,
      detail: `viewport top=${pos.top.toFixed(1)}px (target ~${target.toFixed(1)}px, drift ${drift.toFixed(1)}px)`,
      metricMs: elapsed,
    })

    const hash = await page.evaluate(() => location.hash)
    record({
      id: `tab-${id}-hash`,
      severity: hash === href ? 'pass' : 'fail',
      title: `Hash updates to ${href}`,
      detail: `got ${hash || '(empty)'}`,
    })

    const active = await page.getAttribute(
      `nav[aria-label="Page sections"] a[href="${href}"]`,
      'aria-current',
    )
    record({
      id: `tab-${id}-active`,
      severity: active === 'true' ? 'pass' : 'warn',
      title: `Active state on ${href}`,
      detail: `aria-current=${active}`,
    })
  }

  await page.screenshot({ path: path.join(OUT, '02-after-tab-tour.png'), fullPage: false })
}

async function testEntityAccess(page: Page, kind: 'driver' | 'team' | 'venue', preferredSlug?: string) {
  await page.goto(`${BASE}/f/1`, { waitUntil: 'networkidle', timeout: 60_000 })

  // Prefer browse EntityCards for drivers/venues; teams grid for teams.
  let selector: string
  if (kind === 'team') {
    selector = preferredSlug
      ? `a[href="/f/1/team/${preferredSlug}"]`
      : '#teams a[href^="/f/1/team/"]'
  } else if (kind === 'driver') {
    selector = preferredSlug
      ? `a[href="/f/1/driver/${preferredSlug}"]`
      : '#drivers a[href^="/f/1/driver/"]'
  } else {
    selector = preferredSlug
      ? `a[href="/f/1/venue/${preferredSlug}"]`
      : '#venues a[href^="/f/1/venue/"]'
  }

  // Scroll section into view first (ergonomics: can user reach it via tab?)
  const sectionId = kind === 'team' ? 'teams' : kind === 'driver' ? 'drivers' : 'venues'
  const tab = page.locator(`nav[aria-label="Page sections"] a[href="#${sectionId}"]`)
  const tTab = Date.now()
  await tab.click()
  await waitForScrollSettle(page)
  const tabMs = Date.now() - tTab

  const link = page.locator(selector).first()
  const visible = await link.isVisible().catch(() => false)
  if (!visible) {
    // Fallback: any matching entity link on the page
    const fallback = page.locator(`a[href^="/f/1/${kind}/"]`).first()
    const fbVisible = await fallback.isVisible().catch(() => false)
    record({
      id: `${kind}-link-visible`,
      severity: fbVisible ? 'warn' : 'fail',
      title: `${kind} entry point visibility after tab click`,
      detail: fbVisible
        ? `Primary selector ${selector} not visible; using first /f/1/${kind}/ link`
        : `No ${kind} links visible after navigating to #${sectionId}`,
      metricMs: tabMs,
    })
    if (!fbVisible) return
  } else {
    record({
      id: `${kind}-link-visible`,
      severity: 'pass',
      title: `${kind} entry point visible after tab → #${sectionId}`,
      detail: selector,
      metricMs: tabMs,
    })
  }

  const target = (await link.isVisible()) ? link : page.locator(`a[href^="/f/1/${kind}/"]`).first()
  const href = await target.getAttribute('href')
  await page.screenshot({
    path: path.join(OUT, `03-${kind}-entry.png`),
    fullPage: false,
  })

  const t0 = Date.now()
  await Promise.all([
    page.waitForURL(`**/f/1/${kind}/**`, { timeout: 30_000 }),
    target.click(),
  ])
  await page.waitForLoadState('domcontentloaded')
  const navMs = Date.now() - t0

  const statusOk = await page.evaluate(() => {
    // Soft check: page rendered something meaningful
    const body = document.body?.innerText ?? ''
    return body.length > 200 && !/404|not found/i.test(document.title)
  })

  const title = await page.title()
  const h1 = await page.locator('h1').first().textContent().catch(() => null)

  record({
    id: `${kind}-page-load`,
    severity: statusOk ? 'pass' : 'fail',
    title: `Open ${kind} page from landing`,
    detail: `href=${href} title="${title}" h1="${(h1 ?? '').trim().slice(0, 80)}"`,
    metricMs: navMs,
  })

  // Back navigation ergonomics
  const tBack = Date.now()
  await page.goBack({ waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(400)
  const backUrl = page.url()
  const backOk = backUrl.includes('/f/1') && !backUrl.includes(`/${kind}/`)
  record({
    id: `${kind}-back-nav`,
    severity: backOk ? 'pass' : 'warn',
    title: `Browser back returns toward F1 landing from ${kind}`,
    detail: `url=${backUrl}`,
    metricMs: Date.now() - tBack,
  })

  await page.screenshot({
    path: path.join(OUT, `04-${kind}-page.png`),
    fullPage: false,
  })
}

async function testMobileNav(page: Page) {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${BASE}/f/1`, { waitUntil: 'networkidle', timeout: 60_000 })

  const nav = page.locator('nav[aria-label="Page sections"]')
  const box = await nav.boundingBox()
  const metrics = await page.evaluate(() => {
    const n = document.querySelector('nav[aria-label="Page sections"]') as HTMLElement | null
    if (!n) return null
    return {
      scrollWidth: n.scrollWidth,
      clientWidth: n.clientWidth,
      overflowX: getComputedStyle(n).overflowX,
      links: Array.from(n.querySelectorAll('a')).map((a) => ({
        label: a.textContent?.trim(),
        href: a.getAttribute('href'),
        right: a.getBoundingClientRect().right,
      })),
    }
  })

  if (!metrics || !box) {
    record({
      id: 'mobile-nav',
      severity: 'fail',
      title: 'Mobile section nav missing',
      detail: 'nav not found at 390px',
    })
    return
  }

  const needsScroll = metrics.scrollWidth > metrics.clientWidth + 4
  const last = metrics.links[metrics.links.length - 1]
  const lastFullyVisible = last && last.right <= box.x + box.width + 2

  record({
    id: 'mobile-nav-overflow',
    severity: needsScroll ? 'pass' : 'warn',
    title: needsScroll
      ? 'Mobile nav is horizontally scrollable (expected for many tabs)'
      : 'Mobile nav fits without scroll',
    detail: `scrollWidth=${metrics.scrollWidth} clientWidth=${metrics.clientWidth} overflowX=${metrics.overflowX}`,
  })

  // Ensure venues tab is reachable by scrolling the nav
  const venues = page.locator('nav[aria-label="Page sections"] a[href="#venues"]')
  await venues.evaluate((el) => (el as HTMLElement).scrollIntoView({ inline: 'nearest', block: 'nearest' }))
  const venuesVisible = await venues.isVisible()
  await venues.click()
  await waitForScrollSettle(page)
  const pos = await sectionTop(page, 'venues')
  // Measure against actual sticky header height on mobile (brand + nav row).
  const headerH = await page.evaluate(() => {
    const header = document.querySelector('[data-f1-sticky-header]')
    return header?.getBoundingClientRect().height ?? HEADER_OFFSET
  })
  const drift = pos ? Math.abs(pos.top - headerH) : Infinity
  record({
    id: 'mobile-venues-reach',
    severity: venuesVisible && pos && drift <= 40 ? 'pass' : venuesVisible && pos ? 'warn' : 'fail',
    title: 'Mobile: VENUES tab reachable and scrolls to section',
    detail: `visible=${venuesVisible} top=${pos?.top?.toFixed?.(1)} headerH=${headerH.toFixed?.(1) ?? headerH} drift=${Number.isFinite(drift) ? drift.toFixed(1) : 'n/a'} lastFullyVisibleWithoutScroll=${lastFullyVisible}`,
  })

  await page.screenshot({ path: path.join(OUT, '05-mobile-nav.png'), fullPage: false })
}

async function testDuplicateTeamsConfusion(page: Page) {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(`${BASE}/f/1`, { waitUntil: 'domcontentloaded', timeout: 60_000 })
  const counts = await page.evaluate(() => {
    const teamsSection = document.getElementById('teams')
    const browseTeams = document.getElementById('browse-teams')
    const teamLinksInTeams = teamsSection
      ? teamsSection.querySelectorAll('a[href^="/f/1/team/"]').length
      : 0
    const teamLinksInBrowse = browseTeams
      ? browseTeams.querySelectorAll('a[href^="/f/1/team/"]').length
      : 0
    return { teamLinksInTeams, teamLinksInBrowse, hasBrowseTeams: !!browseTeams }
  })

  if (counts.hasBrowseTeams && counts.teamLinksInBrowse > 0 && counts.teamLinksInTeams > 0) {
    record({
      id: 'teams-duplicate',
      severity: 'warn',
      title: 'Teams appear in two landing sections',
      detail: `#teams has ${counts.teamLinksInTeams} links; #browse-teams has ${counts.teamLinksInBrowse}. Tab "TEAMS" only targets the first.`,
    })
  } else {
    record({
      id: 'teams-duplicate',
      severity: 'pass',
      title: 'Single clear teams entry section',
      detail: JSON.stringify(counts),
    })
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true })
  const browser: Browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  try {
    await testTabSwitching(page)
    await testEntityAccess(page, 'driver', 'leclerc')
    await testEntityAccess(page, 'team', 'ferrari')
    await testEntityAccess(page, 'venue', 'monaco')
    await testDuplicateTeamsConfusion(page)
    await testMobileNav(page)
  } finally {
    await browser.close()
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE,
    counts: {
      pass: findings.filter((f) => f.severity === 'pass').length,
      warn: findings.filter((f) => f.severity === 'warn').length,
      fail: findings.filter((f) => f.severity === 'fail').length,
    },
    findings,
  }

  const reportPath = path.join(OUT, 'report.json')
  fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2))

  // Markdown report for PR / walkthrough
  const md = [
    '# F1 landing ergonomics report',
    '',
    `Base URL: \`${BASE}\``,
    `Generated: ${summary.generatedAt}`,
    '',
    `**${summary.counts.pass} pass · ${summary.counts.warn} warn · ${summary.counts.fail} fail**`,
    '',
    '| ID | Severity | Title | Detail | ms |',
    '|----|----------|-------|--------|----|',
    ...findings.map(
      (f) =>
        `| ${f.id} | ${f.severity} | ${f.title.replace(/\|/g, '/')} | ${f.detail.replace(/\|/g, '/').slice(0, 160)} | ${f.metricMs ?? ''} |`,
    ),
    '',
  ].join('\n')
  fs.writeFileSync(path.join(OUT, 'report.md'), md)
  fs.writeFileSync(path.join(process.cwd(), 'test-results/f1-ergonomics/report.md'), md)
  fs.writeFileSync(path.join(process.cwd(), 'test-results/f1-ergonomics/report.json'), JSON.stringify(summary, null, 2))

  console.log('\n=== SUMMARY ===')
  console.log(summary.counts)
  console.log(`Wrote ${reportPath}`)

  if (summary.counts.fail > 0) process.exitCode = 1
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
