# f(x) Editing Protocol

## 1. Scope Lock
- Default scope: data files only (driver data, team data, venue data)
- Do NOT touch: routing, shared components, animation logic, reel timing, 
  layout/CSS, the three-zone hero structure, or page selection/fallback logic
- If a fix requires touching shared components, STOP and ask first

## 2. No Architecture Changes
- Do not change page selection, URL structure, or fallback logic unless 
  explicitly authorized in that prompt
- Do not rename files, move imports, or refactor component structure 
  during a data pass

## 3. Source Hierarchy (in order)
1. the-race.com
2. autosport.com  
3. motorsport.com
4. formula1.com (official stats)
5. Wikipedia (raw stats only — wins, poles, podiums, teams, years)
- Never use: invented/hallucinated facts, WordPress-hosted images, 
  hotlink-blocked CDNs

## 4. Output Policy for Missing Data
- Missing quote → `[QUOTE PLACEHOLDER · NEEDS SOURCE]`
- Unverified stat → `[VERIFY]`
- Missing image → livery-glow gradient (no broken img tag)
- Uncertain narrative → `[NARRATIVE PLACEHOLDER · SEARCH: "driver + event + year"]`
- Never infer or invent. If unsure, placeholder.

## 5. Image Rules

### Philosophy
A gradient placeholder is a build failure, not an acceptable outcome.
Work down the tier chain until an image is found.
Only use the gradient if every tier has been exhausted and documented.

### Source Priority Chain

**Tier 1 — Wikimedia Commons**
`upload.wikimedia.org/wikipedia/commons/`
Best for: pre-2018 cars, historic moments, venue shots
Search: `site:commons.wikimedia.org "[driver] [team] [year]"`

**Tier 2 — Download and self-host in /public/images/**
For any image that can't be hotlinked, download it directly into the repo.
- Save to `frontend/public/images/[entity]/[descriptive-name].jpg`
  e.g. `frontend/public/images/drivers/russell-mercedes-sakhir-2020.jpg`
- Reference in code as `/images/drivers/russell-mercedes-sakhir-2020.jpg`
- Naming convention: `[driver/team]-[car/context]-[year].jpg`
- Max file size: 400KB per image — compress with sharp or imagemin if needed
- This is the preferred solution for any image where hotlinking is unreliable
Download: `curl -L -A "Mozilla/5.0" -o frontend/public/images/drivers/[name].jpg "[url]"`
Verify type: `file frontend/public/images/drivers/[name].jpg` — must be JPEG/PNG

**Tier 3 — Official F1/team press CDNs**
These are stable and freely embeddable:
- `media.formula1.com/image/upload/` — search formula1.com article pages,
  right-click the image → copy image address
- `www.mercedesamgf1.com` press releases — right-click → copy image URL
- `www.redbull.com/int-en/` articles — same method
- `www.mclaren.com/racing/` press — same method
- `resources.formula1.com/` — official F1 CDN assets

**Tier 4 — Flickr Creative Commons**
`live.staticflickr.com/` URLs are hotlink-friendly
Search: `site:flickr.com "[driver] [race] [year]" creative commons`
Filter to CC-licensed photos only (license=1,2,3,4,5,6)
Direct URL pattern: `https://live.staticflickr.com/[server]/[id]_[secret]_b.jpg`

**Tier 5 — Unsplash**
`images.unsplash.com/`
Good for: circuit atmosphere, crowd shots, generic race action
Not suitable for specific driver/livery moments

**Tier 6 — Reddit r/formula1 or Twitter/X via direct image CDN**
Reddit image CDN: `i.redd.it/` URLs are stable and hotlink-friendly
Search: `site:reddit.com/r/formula1 "[driver] [race] [year]"`
Twitter/X: `pbs.twimg.com/media/` URLs are hotlink-friendly
Search: `[driver] [race] [year] site:twitter.com`

**Tier 7 — Team/driver official social media**
Mercedes F1, Ferrari, Red Bull, McLaren all post race photos on
Instagram and Twitter. Their CDN URLs (pbs.twimg.com, cdninstagram.com)
are hotlink-friendly.

**Tier 8 — Gradient placeholder (last resort only)**
Only acceptable if ALL of Tiers 1–7 have been tried and documented.
When using gradient, add a comment in the code:
`// imageUrl: "" — exhausted T1-T7: [date] [what was searched]`
This makes the gap visible and searchable for future fixing.

### What to NEVER use
- Any URL containing `wp-content` or `.wordpress.com`
- motorsport-images.com, Getty, LAT, Sutton — block hotlinking
- cdn.motorsport.com — blocks hotlinking
- autosport.com or the-race.com image CDNs — block hotlinking
- Any URL that redirects to a homepage rather than serving an image

### Validation rule (non-negotiable)
Before hardcoding ANY image URL:
1. Open it in an incognito browser tab
2. Confirm it loads the correct image (right driver, right livery, right year)
3. Confirm no redirect, no watermark, no login wall
For self-hosted images: run `file [path]` to confirm JPEG/PNG before committing.

### Display rules
- `object-fit: cover` on all image elements
- `object-position: center 15%` for portrait/driver shots
- `object-position: center 30%` for car/action shots
- `onerror="this.style.display='none'"` on every `<img>` tag

## 6. Slide Data Structure (non-negotiable)
Every carousel slide must be ONE self-contained object:
{
  badge: string,       // e.g. "RACE WINNER"
  tags: string,        // e.g. "MONZA 2020 · ALPHATAURI · SHOCK WIN"
  headline: string,    // e.g. "Italian GP"
  meta: string,        // e.g. "2020 · ALPHATAURI · MAIDEN VICTORY"
  image: string        // verified wikimedia URL or ""
}
Never populate image and caption from separate arrays.

## 7. Review Cadence
- For any systemic change affecting 5+ pages: show planned edits for 
  3 drivers first, wait for approval, then batch the rest
- For single-driver fixes: proceed, then summarize what changed

## 8. Acceptance Criteria (per driver/team/venue)
- [ ] Every slide: event real, team correct, result correct, image matches
- [ ] Every quote: sourced from real interview, or placeholder
- [ ] Every stat: cross-checked against Wikipedia/formula1.com
- [ ] Every image URL: loads in browser, correct livery/year
- [ ] No WordPress URLs, no hotlink-blocked URLs

## 9. Do-Not-Touch List
- /components/* (shared UI)
- Routing and navigation logic
- Animation timing and reel behavior  
- Three-zone hero layout and CSS
- Stats strip layout
- Header/breadcrumb/CTA buttons
- Any file not directly related to the current task scope

## 10. Before Starting Any Pass
State out loud:
1. Which files you will edit
2. What you will NOT touch
3. Your source for each fact you're about to write

Commit this file. Reference it at the start of every future editing session with: "Following EDITING_PROTOCOL.md — scope is [X], sources are [Y]."
