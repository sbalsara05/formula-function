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
- Every image URL must be verified to load before committing (paste in browser)
- Acceptable sources: upload.wikimedia.org/wikipedia/commons/ only
- Image must match caption: correct driver, correct team livery, correct year
- Portrait slot: driver face visible, object-position: center 15%
- Car/race slot: object-fit: cover, object-position: center 30%
- onerror="this.style.display='none'" on every img tag

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
