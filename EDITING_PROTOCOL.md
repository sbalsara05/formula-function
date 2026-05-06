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

### Source Priority Chain
Try sources in this order. Move to the next only if the previous yields nothing usable.

**Tier 1 — Wikimedia Commons (preferred for historic/era shots)**
URL pattern: `upload.wikimedia.org/wikipedia/commons/`
Best for: pre-2015 cars, classic era drivers, venue shots, historic moments
Search: `site:commons.wikimedia.org "[driver] [team] [year]"`
Verify: paste direct image URL in browser tab before using

**Tier 2 — Official team/series press assets (preferred for current grid)**
These URLs are stable and freely embeddable:
- `media.formula1.com/image/upload/` — F1 official press
- `www.mercedes-amg-f1.com/content/` — Mercedes press
- `www.mclaren.com/racing/` — McLaren press
- `www.redbull.com/img/` — Red Bull content
- `www.ferrari.com/` press section
Search: "[team name] press kit [year]" or "[driver] official photo [year]"

**Tier 3 — Unsplash (atmosphere/venue shots only)**
URL: `images.unsplash.com/`
Free to hotlink, no attribution required
Good for: circuit atmosphere, crowd shots, generic race action
NOT suitable for: specific driver moments, specific car liveries
Search: `unsplash.com/s/photos/formula-1`

**Tier 4 — Wikimedia fallback**
If Tiers 1–3 yield nothing for a specific moment, use the best available
Wikimedia image even if not perfect, with a comment noting it's approximate

**Tier 5 — Livery-glow gradient**
If no verified image can be found: `imageUrl: ""` — never a broken or
mismatched image. The gradient is intentional and looks correct.

### What to NEVER use
- Any URL containing `wp-content` or `.wordpress.com`
- motorsport-images.com, Getty, LAT, Sutton — all block hotlinking
- autosport.com, the-race.com image CDNs — block hotlinking
- Any URL that redirects rather than serving a direct image
- cdn.motorsport.com — blocks hotlinking (use Wikimedia equivalent instead)

### Validation rule (non-negotiable)
Before hardcoding ANY image URL:
1. Paste it in a browser tab in an incognito window
2. Confirm it loads the correct image (right driver, right livery, right year)
3. Confirm it does NOT redirect to a homepage or show a watermark
Only then add it to the codebase.

### Display rules
- `object-fit: cover` on all image elements
- `object-position: center 15%` for portrait/driver shots (keeps face in frame)
- `object-position: center 30%` for car/action shots
- `onerror="this.style.display='none'"` on every `<img>` tag
- Fallback: livery-glow radial gradient always underneath

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
