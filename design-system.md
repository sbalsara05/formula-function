# f(x) — Design System & Build Reference

**Purpose.** This document is the durable specification of the f(x) product design system. It is the authoritative reference for Claude Code (or any developer) implementing the product. The HTML mockup files are concrete ground truth for visual output; this document is the ground truth for the *rules* behind that output.

**Audience.** A fresh Claude Code instance or human developer starting implementation with zero prior context. Read this top-to-bottom once before implementing anything.

**Scope.** Covers product context, design system fundamentals, entity templates, interaction grammar, content/editorial rules, features not yet designed, data model considerations, and Claude Code prompting patterns.

---

## 1. Product Context

### What is f(x)

f(x) is a motorsport analytics web product covering Formula 1, Formula 2, and Formula 3. The name is mathematical function notation (`f(x)`) that doubles as a series indicator: `f(1)` = F1, `f(2)` = F2, `f(3)` = F3. The wordmark is always rendered in monospace lowercase.

### Core thesis

The product's differentiator is **computer-vision-derived telemetry reconstruction from onboard video footage**. Official telemetry for F1 is sparse and for F2/F3 is largely unavailable to the public. f(x) extracts steering, brake, throttle, speed, and racing-line data frame-by-frame from onboard footage using a CV pipeline. This is the product's single most important technical claim and the source of most of its design differentiation.

Everything else — entity pages, comparisons, predictive trajectory modeling — is built on top of this CV-derived data substrate.

### Target users

Motorsport fans with above-casual engagement. Not hardcore F1 Twitter (who demand raw telemetry and live timing), and not casual viewers (who want commentary and highlights). The target is the middle: fans who want to understand *why* drivers are fast, *how* teams succeed, *where* a driver's trajectory is headed. The Athletic's readership adapted for motorsport.

### Strategic emphasis

F2 and F3 coverage is the product's strategic moat. F1 databases already exist; the predictive junior-series analysis with calibrated uncertainty is what nobody else does. F2/F3 pages should be first-class, not afterthoughts.

---

## 2. Design System Fundamentals

### 2.1 Color System

All colors are scoped to entities. The product has *no* global accent color — the accent shifts based on what the user is looking at.

#### Series colors (global identity)

| Series | Color | Hex | Use |
|--------|-------|-----|-----|
| F1 | Red-pink | `#FF1E56` | Section labels, CTAs, interactive elements on F1 pages |
| F2 | Cyan | `#00E5FF` | Same role on F2 pages |
| F3 | Violet | `#B026FF` | Same role on F3 pages |

#### Entity colors (page-specific)

Every entity gets its own signature color that replaces or supplements the series color for accents.

**Drivers** use their peak-era team's livery color:
- Vettel: `#1E3A8A` (Red Bull navy)
- Leclerc: `#DC0000` (Ferrari red)
- Hamilton: `#00D2BE` (Mercedes teal, or McLaren orange `#FF8700` for his McLaren-era page)
- Senna: `#FF8700` (McLaren papaya)

**Venues** use an atmosphere-appropriate color chosen per-track:
- Spa: `#5FB87C` / `#2C5F3E` (forest green — Ardennes)
- Monaco: Mediterranean navy (not yet designed)
- Suzuka: Japanese vermillion (not yet designed)
- Silverstone: British racing green (not yet designed)
- Baku: Caspian teal (not yet designed)

**Teams** use their livery color:
- Ferrari: `#DC0000` (Rosso Corsa) + `#FFD700` accent for golden-era treatments
- Red Bull: `#1E3A8A`
- Mercedes: `#00D2BE`
- McLaren: `#FF8700`
- Aston Martin: `#006F62`
- Prema: Uses the series color of whatever context (F2 cyan + F3 violet for multi-series teams)

#### System / neutral palette

| Purpose | Value |
|---------|-------|
| Background | `#000` (true black, non-negotiable) |
| Surface (cards) | `#080808` |
| Surface hover / elevated | `#0a0a0a` |
| Border subtle | `#1a1a1a` |
| Border visible | `#2a2a2a` |
| Text primary | `#fff` |
| Text secondary | `#aaa` / `#888` |
| Text dim | `#666` / `#555` |
| Text disabled / placeholder flags | `#333` — `#444` |

#### Semantic colors (cross-entity)

| Purpose | Color |
|---------|-------|
| Positive / success / faster | `#5FB87C` (green) |
| Warning / moderate | `#FFD700` (gold) |
| Negative / slower / critical | `#FF1E56` (inherits F1 red, but used semantically) |
| Rain / wet conditions | `#378ADD` (rain blue) |
| Placeholder / illustrative flag | `#555` on `#050505` backdrop |

**Critical rule.** Gold (`#FFD700`) is reserved for *peak* / *achievement* / *title* / *notable* contexts. Don't dilute it by using it for generic highlights. Championship years, title-winning cars, pole positions, first-place callouts.

### 2.2 Typography

The product uses three type registers:

| Register | Stack | Role |
|----------|-------|------|
| Sans-serif | `var(--font-sans)` | Default body, headlines, most UI |
| Monospace | `var(--font-mono)` | Stats, labels, metadata, section headers, technical readouts, breadcrumbs |
| Serif italic | `var(--font-serif)` with `font-style: italic` | Editorial prose, quotes, narrative moments |

CSS custom properties are used (`var(--font-sans)` etc.) rather than concrete font choices, so the production build can swap fonts without touching templates.

**Type scale (desktop).** Not an arbitrary scale — the product uses a deliberately limited set of sizes to enforce rhythm.

| Size | Use |
|------|-----|
| 9px mono | Tiny labels (placeholder flags, legend items, meta-annotations) |
| 10px mono | Section labels ("TRACK FINGERPRINT"), breadcrumbs, filter pills |
| 11px mono | Stat values in compact cards, button text |
| 12–13px sans | Body text |
| 14–15px sans | Module descriptions |
| 15–16px serif italic | Editorial prose in scouting reports, takeaways |
| 20–28px sans | Card headlines, stat numbers |
| 42–68px sans | Hero titles (entity names) |

Letter-spacing scales inversely with size. Monospace labels are often spaced at `letter-spacing: 1.5px` or `2px` for presence. Large titles use negative tracking (`-1px` to `-2.5px`).

**Casing rule.** Sentence case throughout the product. Monospace labels are ALL CAPS because that's typographically how mono works in this product. No Title Case Headlines Like This, which read as too formal.

### 2.3 Spacing & Layout

**Container padding.** Main page padding is `1.75rem` horizontal (roughly 28px). Section vertical padding is typically `2rem`. Hero sections have taller padding (`2.5–3rem`).

**Card internal padding.** Cards and modules use `20px–32px` padding depending on importance. Small cards `12–16px`. Large hero cards `32px`.

**Module spacing pattern.** Every analytical module follows the same vertical structure:

1. Section label (monospace, entity-color, 10px, letter-spacing 2px)
2. Description paragraph (sans, 13px, `#888`, max-width ~520px)
3. The module itself (in a bordered dark card with `#080808` background)
4. Placeholder flag at the bottom if content needs verification

**Grid system.** The product uses CSS grid for most multi-column layouts. Common patterns:
- `grid-template-columns: 1fr 1fr;` — equal two-column
- `grid-template-columns: 1.5fr 1fr;` — weighted two-column (hero with visual anchor)
- `grid-template-columns: repeat(3, 1fr);` — iconic moments grid
- `grid-template-columns: repeat(4, 1fr);` — era cards, lap library
- `grid-template-columns: repeat(5, 1fr);` — junior career timeline

**Card aspect ratios.** Iconic moment cards and archive grid cards consistently use `aspect-ratio: 16/10;`. Era cards use `aspect-ratio: 4/5;` (taller, more portrait-like). Track-map cards use `aspect-ratio: 4/3;`.

### 2.4 Border & Surface Treatments

**Border radii.** `4px` for small elements (pills, buttons), `6px` for cards in grids, `8px` for hero-embedded elements, `10px` for top-level modules.

**Borders.** Most borders are `0.5px` or `1px` in dark gray (`#1a1a1a` for subtle, `#2a2a2a` for more visible). Colored borders use the entity color at low alpha — e.g., `border: 1px solid #3a1028;` is Vettel-red at reduced saturation.

**Shadows.** The product doesn't use traditional drop shadows. Visual depth comes from radial gradients within cards (the livery-color glow-and-vignette pattern — see Component Patterns below).

---

## 3. Component Patterns

These are recurring visual/functional components that appear across pages. Each has a canonical implementation.

### 3.1 The Livery-Glow Card

A recurring pattern: cards with a radial color glow emerging from the center-top and fading to black at the edges via a circular vignette. Used for:
- Entity-specific cards (iconic moments, eras, cars, graduates)
- Reel slides
- Portrait placeholders

**Structure:**
```html
<div style="background: linear-gradient(135deg, #1a0000, #000); border: 0.5px solid #2a0000; border-radius: 6px; overflow: hidden; position: relative;">
  <!-- Radial livery glow -->
  <div style="position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 40%, [ENTITY_COLOR] 0%, [ENTITY_COLOR] 28%, transparent 60%); opacity: 0.65;"></div>
  <!-- Vignette fading to black -->
  <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, transparent 35%, #000 92%);"></div>
  <!-- Content goes here with position: relative -->
</div>
```

The radial glow + vignette combination produces the product's signature look — entities feel like they're emerging from black rather than sitting on a flat surface.

### 3.2 Cycling Reels

Used for hero visual anchors (driver reel, team reel, Prema graduates reel). Six slides typical, 5-second dwell per slide, 900ms crossfade.

**Behavior:**
- Auto-advances on a timer
- Progress bar at bottom shows dwell time
- Tick-mark dot indicators along the bottom-left, clickable to jump to specific slide
- Click anywhere on the reel (except dots) pauses/unpauses

**Each slide contains:**
- Radial livery-glow background matched to the slide's subject
- Moment number in entity color, top-left (CHASSIS 04, GRADUATE 03, MOMENT 5)
- Context badge top-right (POLE, TITLE, F2 CHAMPION, etc.)
- Primary headline (large sans)
- Metadata line (monospace, dim)

### 3.3 Ghost-Summon (Home Page)

The home page's three series cards (f(1), f(2), f(3)) use an interaction where hovering a card causes floating moment-cards to drift in from the sides with staggered random delays, while the card's center content dims. This is a **signature interaction** — not to be diluted by overuse elsewhere.

If a future page needs a "preview on hover" pattern, it should use a different metaphor (e.g., the corner-hotspot pulse on venue pages) to preserve ghost-summon's specialness.

### 3.4 Stat Strips

Horizontal row of metrics at the bottom of a hero. 5 columns typical, separated by thin vertical lines (`0.5px` `#2a2a2a`). Each column has:
- Mono label (9px, `#888`, letter-spacing 1.5px)
- Large number (24–28px sans)
- Optional sub-label (8px, `#666`)

First stat often uses the entity's accent color; subsequent stats are white.

### 3.5 Sensitivity Bars / Fingerprint Modules

Used on venue pages (track fingerprint) and team pages (engineering/operational signature). Two-column grid of:
- Label
- Badge (CRITICAL / HIGH / MODERATE / LOW / EXTREME / EXCEPTIONAL / INCONSISTENT)
- Thin colored bar (entity color at full strength, or red `#FF1E56` for flagged weaknesses, or dim gray `#888` for neutral)
- Short caption below (9px mono, `#666`)

Bar color encodes meaning: entity color = a strength, gold = peak/best-in-class, red = weakness or flagged issue, gray = neutral/average.

### 3.6 Radar Chart (Driving Signature)

Hexagonal radar with 6 axes. Canonical structure:
- Outer polygon (max values)
- 4 concentric rings for scale reference
- 6 spokes from center
- Entity's polygon filled at ~18% opacity, stroked at full opacity
- Dashed gray polygon behind it showing cohort/era average
- Dots at each vertex of the entity's polygon

Axis labels are the 6 driving dimensions, placed outside the radar. Dimensions *differ by series*:
- F1: steering smoothness / entry aggression / tire mgmt / throttle / braking / consistency
- F2: steering smoothness / entry discipline / tire mgmt / race craft / quali pace / consistency
- F3: steering smoothness / wheel-to-wheel / first-lap / consistency / quali pace / race craft

**Junior-series pages add an uncertainty envelope** — a dashed outer polygon at wider radii indicating the confidence interval. This is critical: F1 driver signatures are high-confidence; F2/F3 signatures are noisy by sample size and must display that.

### 3.7 Interactive Track Map with Hotspots

Venue pages have a track-layout SVG with:
- Track path drawn as a single stroked SVG path
- Labeled corners at key points
- **Interactive hotspots** for corners with iconic overtakes: filled gold circles, larger than passive dots, with hover-triggered pulse animation and tooltip
- **Legendary corner treatment** (e.g., Eau Rouge): hollow dashed circle + small badge labeled "LEGENDARY", static, non-interactive
- Passive corners: small gray dots with dim labels, no interaction

Clicking a hotspot triggers an overlay over the track area showing the moment — defender trace (gray dashed), overtaker trace (white solid), moment title, year, drivers, color-coded corner label. Close button returns to the map.

### 3.8 Synced Scrubber Modules

Used on Analyze a Lap analysis page and Compare Laps. A master scrubber drives:
- Video player (if video is available)
- Position marker on track map
- Vertical playhead line across all telemetry trace strips
- Live-value readouts that update as you scrub

Behavior rule: **scrubber is master**. User interactions with the video player (pause, seek in the YouTube controls) are allowed but don't drive other elements — only scrubber movements do.

### 3.9 Delta Curves

Used on Compare Laps. A single horizontal chart where the x-axis is lap progress (0% to 100%) and the y-axis is cumulative time delta between the two laps. Line going up = Lap A gaining time; line going down = Lap B catching up. Final y-value is the final delta.

Corner labels along the top axis call out where significant time was won/lost. Colored callout cards below summarize "biggest gain" and "biggest loss" moments.

### 3.10 Probability Distribution Bars

Used on F2/F3 driver pages for trajectory forecasts. Horizontal stacked bar where each segment represents a career outcome with its probability as the segment's width:

```
[  F1 62%  ][ WEC 18% ][ INDY 11% ][ OTHER 9% ]
```

Meta-caption below shows sample size (N=847 drivers), confidence tier (HIGH/MODERATE/LOW), and training data date range.

**F3 pages split this into two bars** — Next Step (F2 / F3 Year 2 / Other / Exit) and Long Horizon (F1 / WEC / Indy / Other). Between them, a "compound probability note" explicitly reconciles the two: unconditional F1 probability vs. conditional-on-reaching-F2 probability.

### 3.11 Cohort Analog Cards

Used with trajectory modules. List of historical drivers whose CV signature most resembled the current subject at the same career stage. Each entry:
- Driver name (sans, bold)
- Match percentage (mono, entity-color)
- Metadata (their era, academy affiliation)
- Where they ended up (arrow notation, colored by destination)

Match percentages degrade visually: 80%+ in entity color, 60–79% in a dimmer entity color, <60% in dim gray. This signals trust: top matches are useful, bottom matches are weaker analogs.

### 3.12 Hero Structure (Three-Zone Template)

All entity pages (driver, venue, team, and their F2/F3 variants) use the same three-zone hero:

| Zone | Width | Content |
|------|-------|---------|
| Left | ~30% | Identity: series/category tag, sub-label (e.g. "Circuit de"), large headline (entity name), location/date metadata, italic serif quote |
| Center | ~18% | Visual anchor: driver portrait, track map, or (for teams with no single visual) a connector/divider |
| Right | ~40% | Cycling reel OR interactive module (track map with hotspots) |

Stats strip runs along the bottom of the hero block.

Hero height is typically `580–620px`. This is load-bearing — every page signals its identity in this block.

---

## 4. Entity Templates

### 4.1 Driver Page (F1)

Structure, top to bottom:

1. **Header** (breadcrumb, COMPARE / ANALYZE A LAP / SHARE buttons)
2. **Hero** (3-zone): identity / portrait / career-reel
3. **Stats strip**: titles, wins, poles, podiums, career length
4. **Eras strip**: team-by-team chapter cards (aspect 16/10)
5. **Driving Signature module**: hex radar vs era average, fingerprint summary, full-metrics link
6. **Setup & Style module**: editorial scouting report prose (serif italic) + setup preference bars + excelled-at/struggled-with bullets
7. **Career Arc module**: line chart of WDC position by year, team eras shaded beneath
8. **Teammate H2H module**: row per teammate, split bars for quali and race percentages, delta column
9. **Track-by-Track module**: two columns (excelled / struggled), bars with win counts
10. **Laps Library module**: 4-wide grid of featured laps, each clickable to Analyze-a-Lap
11. **Footer**: end-of-page marker

For active drivers: add a "Current Season" module between Setup&Style and Career Arc.

For historical/deceased drivers: heritage framing intensifies, editorial prose shifts to past tense, the Laps Library may be smaller (pre-CV-era video availability).

### 4.2 Driver Page (F2)

Same three-zone hero, but with adapted content:
- Series color is cyan throughout
- Stats strip emphasizes junior-series metrics (F2 position, F2 wins, F1 starts if any, graduation context)
- **Trajectory module** replaces Career Arc as the primary post-stats-strip module — this is the new thing
- **Driving signature** uses F2-appropriate axes (entry discipline, race craft)
- Uncertainty must be displayed prominently (sample size disclaimers, confidence tier visible)
- Eras strip becomes a junior-career strip: F4 → FRECA / F3 → F2 → (F1?)

### 4.3 Driver Page (F3)

All of F2's adaptations, plus:
- Series color is violet
- Trajectory module **splits into two distributions** — Next Step and Long Horizon — with a compound-probability explainer between them
- Confidence tier defaults lower (MODERATE or LOW-MODERATE) because sample sizes are smaller
- Radar displays an explicit uncertainty envelope (dashed outer polygon)
- Cohort analogs include F3-specific historical drivers
- F1 outcome is framed as compound probability (F3 → F2 → F1, not F3 → F1)

### 4.4 Venue Page

1. **Header**
2. **Hero** (3-zone): identity / interactive track map / stats
3. **Stats strip**: length, corners, lap record, elevation, F1 since
4. **Track Fingerprint module** (sensitivity bars: engine, aero, mechanical grip, braking, tire deg, driver bravery)
5. **Weather module** (conditions breakdown bar + cross-track microclimate diagram — conditional: only present when a venue has a weather story)
6. **Driver-Track Fit leaderboard** (ranked drivers with fit scores)
7. **Iconic Moments archive** (6-wide grid)

Venues use forest-green-family colors or context-appropriate colors per track.

### 4.5 Team Page (F1)

1. **Header**
2. **Hero** (3-zone): identity / connector / iconic-cars reel
3. **Stats strip**: constructors' titles, drivers' titles, wins, podiums, seasons
4. **Engineering Eras strip** (era cards: founding → Forghieri → wilderness → golden → current)
5. **Engineering Signature module** (car-character bars: downforce bias, straight-line, qualifying, race pace, strategy, wet)
6. **Driver Academy module** (current F1 / current juniors / notable alumni)
7. **Iconic Cars archive** (6-wide grid)

### 4.6 Team Page (F2/F3, Spec-Chassis)

The template adapts substantially:

1. **Hero reel shows iconic graduates, not iconic cars** (no iconic cars exist in spec series)
2. **Stats strip emphasizes F1 graduates and graduation rate** (not constructors' titles)
3. **"Graduate Alumni" table replaces "Iconic Cars" grid** — tabular view of every driver who raced for this team, with their F3/F2 results, destination, current status
4. **"Operational Signature" replaces "Engineering Signature"** — qualifying setup, race pace conversion, strategy aggression, rookie conversion, wet-weather execution, F1 graduation rate
5. **Current Season module is promoted to its own prominent block** (F2 / F3 / F1 Academy lineups)

---

## 5. Interaction Grammar

Reusable behaviors with canonical rules.

### 5.1 Universal CTAs

Three buttons live in the header of almost every entity page:
- **COMPARE ↗** — universal, scoped to current entity
- **ANALYZE A LAP ↗** — scoped to current entity (drivers: their laps; venues: laps at this track; teams: laps in this car)
- **SHARE**

These are ghost-buttons with thin borders (`0.5px solid #2a2a2a`), monospace text at 10px, uppercase, spacing 1px. The ANALYZE A LAP button uses the entity's accent color for its border and text to signal it as the primary action.

### 5.2 Hover Previews

Many interactive elements show a tooltip on hover:
- Corner hotspots → moment name, year, driver
- Driver rows in tables → quick stats preview
- Lap cards → lap time and session context

Tooltip style: `rgba(0,0,0,0.95)` background, `0.5px solid #2a2a2a` border, 10px mono body. Follows cursor with slight offset.

### 5.3 Click-to-Jump

On the Analyze a Lap analysis page, clicking a "notable moment" card causes the scrubber to jump to that moment's timestamp, and all synced elements (video, track dot, trace playhead, live values) update immediately. This is the page's payoff interaction.

### 5.4 Placeholder Indicators

Every module where data is fabricated or needs verification ends with a small monospace note in `#555`, usually centered, saying `[PLACEHOLDER · REASON]`. This is a permanent part of the mockup grammar — not a comment, a visible UI element. In production, these notes should either be removed (once data is verified) or replaced with provenance indicators ("Source: official F1 timing · Updated 2024-07-12").

### 5.5 Contextual Filter Pills

Used on the Analyze a Lap picker. Horizontal row of pills where:
- Active pill uses series color as background, white text
- Inactive pills have `0.5px solid #2a2a2a` border, `#aaa` text
- Click to toggle

---

## 6. Content & Editorial Rules

**This section is non-negotiable and invisible in the HTML.** These rules must survive into production.

### 6.1 Factual claims require sources

Any factual claim in editorial prose, stat, or quote **must** be backed by a source or clearly flagged as placeholder. Not optional. Violating this rule was the single most frequent mistake during design and will get the product mocked by F1 fans the day it ships.

Examples of factual claims:
- "Vettel's first pole was at Monza 2008" — needs verification (it's correct, but verify)
- "Senna's 1992 Spa wet masterclass" — iconic moment, verify the year and race
- "Ferrari's F2004 won 15 of 18 races" — needs verification
- "Hamilton lap record at Spa: 1:46.286 in 2020" — verify both the time and year
- Any quote ever ("The most beautiful race track in the world") — needs attribution

### 6.2 LLM-generated F1 history is a trap

Large language models will confidently invent plausible-sounding F1 facts that didn't happen. Examples caught during design:
- "Schumacher Spa 1995 wet masterclass at Pouhon" — the race and driver are real, the corner-specific framing was fabricated
- "Häkkinen 2000 overtake — the Zonta lap" — the overtake is real, the exact corner attribution needs verification
- Specific lap times, sector splits, win margins — usually fabricated even when the headline event is real

Rule: LLM-generated editorial content can be used for first drafts only. All claims must be verified by a human editor with access to authoritative sources (official timing archives, licensed data providers, published journalism) before publication.

### 6.3 The `[PLACEHOLDER]` convention

Use `[PLACEHOLDER]` labels aggressively during development. Specific forms:

- `[PLACEHOLDER · NEEDS EDITORIAL VERIFICATION]` — for prose
- `[PLACEHOLDER · FIGURES ILLUSTRATIVE]` — for numeric data
- `[PLACEHOLDER · NEEDS LIVE DATA SOURCE]` — for stats that require periodic updates
- `[PLACEHOLDER · ROSTER CHANGES SEASONALLY]` — for current lineups
- `[PLACEHOLDER · TRACK MAP SCHEMATIC · NOT TO SCALE]` — for track SVGs

### 6.4 Prediction framing rules

For F2/F3 trajectory predictions:

- **Always show multi-modal distributions**, not point predictions. "62% F1 likelihood" misleads; "F1 62% / WEC 18% / IndyCar 11% / Other 9%" is honest.
- **Always display confidence tier** (HIGH / MODERATE / LOW) based on sample size.
- **Always surface cohort analogs**. A prediction without "here's who this driver resembles and what happened to them" is not defensible.
- **Always show feature weights**. Why does the model predict what it predicts? If you can't explain the prediction, don't show it.
- For F3, **always decompose compound probabilities**. F1 likelihood via F2 is not the same as F1 likelihood unconditional.

### 6.5 Uncertainty disclosure rules

The product has different confidence levels in different contexts:
- F1 drivers with complete careers: high confidence, no explicit uncertainty disclaimer needed
- F2 drivers with one+ seasons: moderate confidence, include a sample-size note
- F3 drivers with partial seasons: low confidence, include an uncertainty envelope on visualizations + sample-size note + explicit "directional, not definitive" language

Users should be able to tell how much to trust a given page's analytics from visual cues alone (width of uncertainty envelope, confidence tier badge, sample size stat).

### 6.6 Sensitive framing

- Deceased drivers (Bianchi, Hubert, Senna, etc.): Always mark with † in roster lists. Never use them in comparison modules or marketing contexts that feel exploitative. The home-page memorial strip ("IN MEMORY OF THE GREATS WHO WROTE THE FUNCTION") is for drivers who have passed.
- Active drivers should never appear in the memorial strip.
- Never generate predictive statements about active drivers' safety, accidents, or likelihood of career-ending events.

### 6.7 Copyright-sensitive content

Multiple categories require caution:

- **F1/F2/F3 logos** (trademarked by Formula One Licensing BV) — don't reproduce official logos. Use typographic treatments (the "FORMULA 1" / "FORMULA 2" / "FORMULA 3" badges on the home page cards) that *reference* without copying.
- **Driver photos** (personality rights + copyright from Getty/LAT/Motorsport Images) — the mockup uses placeholder portraits (helmet-color radial glow + vignette with driver initials). Production options: license photos, use commissioned illustrations (The Athletic's model), or maintain the abstract placeholder style as an aesthetic choice.
- **Onboard video** (aggressively policed by FOM) — the product's CV-telemetry-reconstruction angle is legally defensible precisely because it's *not* redistributing video. When video is embedded, it should come from official F1 YouTube (stable) or be behind a licensing deal (F1 TV). Fan uploads are fragile (get taken down).
- **Track layouts** — FIA publishes homologation diagrams; licensed mapping providers exist. Use a proper vector source, not schematic approximations, for production.

---

## 7. Features Not Yet Designed

These pieces are *named* in the product but were not designed in detail during the mockup phase. Claude Code should build these *consistent with the design system*, using the closest existing template as a reference.

### 7.1 Section Landings — f(1), f(2), f(3)

**Purpose.** Intermediate navigation layer. Clicking a home-page series card should land here; individual entity pages are children of these.

**Proposed structure:**

1. Header (breadcrumb: just `f(x) / f(1)`)
2. Hero: series identity, current season headline ("2025 Season · Round 14 of 24"), quick links
3. **Current Season module**: drivers' standings (top 10), constructors' standings (top 5), recent race result, next race countdown
4. **Featured entities**: a curated trio of driver / venue / team pages to explore today
5. **Browse by category**: Drivers (A-Z, grid of helmet-glow cards), Teams (logos/livery grid), Venues (track map thumbnails arranged by calendar order)
6. **Recent activity**: newly added laps, newly analyzed drivers, editorial pieces
7. **Historical anchors**: a "this week in F1 history" type module

**Design system requirements:**
- Section color: series color throughout
- Use existing card patterns (livery glow + vignette)
- Respect the 3-zone hero template but adapt: identity left, calendar/standings anchor, featured content right

Claude Code should default to section landings looking like a structurally simpler version of an entity page — same visual language, more navigational, less analytical.

### 7.2 Search / Global Discovery

**Purpose.** Keyboard-first entry point for users who know what they want. "Senna Monaco 1988", "Ferrari 2004", "fastest laps at Spa" should all work.

**Proposed structure:**

1. Triggered by keyboard shortcut (cmd-K / ctrl-K) or persistent search icon in header
2. Full-screen or modal overlay, dim the rest
3. Single input field, large, monospace placeholder: "Driver, track, team, or lap..."
4. Results update as you type, grouped by entity type
5. Each result row shows entity type icon + name + brief context ("2008 F2 Champion · Currently Haas F1")
6. Keyboard navigation with arrow keys, enter to select, esc to close
7. Recent searches saved per-user

**Search quality is product-critical.** The index should understand: "Vettel Suzuka 2009" → specific lap; "Vettel Suzuka" → all Vettel laps at Suzuka; "fastest Suzuka" → lap-time-ranked list; natural queries like "fastest F2 drivers 2024" → leaderboard.

**Design system requirements:**
- Uses the same dark aesthetic (`#000` overlay at 80% opacity over dimmed content)
- Typography matches product (monospace for input, sans for results)
- No series color dominance — search is cross-series, use white/gray palette

### 7.3 Empty & Edge States for Analyze a Lap

**Video unavailable state:**
- Analysis page renders normally but the video panel in the Synced Replay module shows a `#080808` background with a gray placeholder icon and text: "Source footage not available for this lap. Telemetry reconstruction is from archived CV pipeline runs."
- Indicator in Synced Replay header changes from "SOURCE · OFFICIAL F1 CHANNEL" to "TELEMETRY ONLY"
- All other elements (racing line, traces, sectors, notable moments) work normally

**Processing in progress state** (after user upload):
- Redirect to a dedicated `/analyze/processing/{job_id}` page
- Shows upload metadata, progress indicator, estimated completion time
- Periodic status updates ("Extracting frames · 34% of 847 frames", "Classifying corners · 12% of lap")
- When complete, auto-redirects to the analysis page

**Upload flow:**
- Entry: "UPLOAD YOUR OWN ↗" button in the Analyze a Lap picker
- Dedicated upload page with drag-and-drop area + YouTube link input
- File validation: accept MP4 / MOV up to some size cap, validate it looks like onboard footage (first-pass heuristics)
- YouTube link validation: check the URL is reachable and looks like F1-related content
- Submit kicks off processing job, redirects to processing state

**Failed processing state:**
- Soft failure (CV couldn't identify driver/track clearly): page shows what it could extract + flags uncertainty, offers user to provide metadata manually
- Hard failure (video unusable): clear error message, offer suggestions (longer clip, better angle, official source)

**Design system requirements:**
- Empty states use the same dark palette but with more generous negative space
- Processing animations use the series color as accent
- Error states use red `#FF1E56` sparingly — the product is polite, not alarming

### 7.4 Compare Drivers

**Purpose.** The driver-level version of Compare Laps. Teased from driver pages.

**Proposed structure (follows Compare Laps grammar):**

1. Header with COMPARISON TYPE DETECTED badge ("SAME ERA · DIFFERENT TEAMS" / "CROSS-ERA" / "TEAMMATES · HISTORICAL" etc.)
2. Headline: "Two drivers compared" with the two names
3. **Identity cards** for each driver (red vs cyan convention continues)
4. **Career stat bars side by side**: titles, wins, poles, podiums as dual-bar visualizations
5. **Radar overlay**: both drivers' signature radars on one chart, entity colors preserved
6. **Head-to-head at shared venues**: for every track both drivers raced at, who was faster on average
7. **Era context module**: when they raced, what cars they had, what the competitive context was
8. **Takeaway prose**: editorial synthesis

Compare Drivers is mostly a *composition* of existing modules from the Driver page, overlaid. No new component invention needed.

### 7.5 Compare Venues

**Purpose.** Track fingerprints compared, weather patterns, driver-fit leaderboards side by side.

Simpler than Compare Drivers — mostly two stacks of venue-page modules shown side by side with visual diff treatment on the sensitivity bars and fit leaderboards. One new component: a "divergence visualization" showing where the two tracks are most similar and most different across the fingerprint dimensions.

### 7.6 Account / Profile / Settings

Necessary if users can upload laps. Design treatment should be minimal — dark aesthetic, no series color (accounts are cross-series), mostly text lists and form fields in the existing typography. Don't over-design. Users spend ~2 minutes total across their account's lifetime in these pages.

### 7.7 Mobile Responsive Treatments

Everything designed is desktop-first. Mobile requires real per-page rework. Rough principles:

- Hero three-zone template collapses to vertical stack: identity → visual → stats
- Cycling reels stay landscape (mobile is tall but content is aspect-16/10)
- Synced Replay module needs to stack: video full-width, traces below, track map as a small inset
- Compare pages need either tabs (lap A / lap B / overlay) or accordion
- Interactive track maps work but with larger hotspot targets (minimum 44x44 touch area)
- Radar charts scale to max-width and remain legible
- Section landings become vertical scrolls
- Search stays the same — just goes full-screen on mobile

**Mobile is a v2 concern.** Desktop-first is defensible for launch because motorsport fans analyzing telemetry are disproportionately desktop users. But an eventual mobile build will require design work equivalent to perhaps 30–40% of the desktop effort.

---

## 8. Data Model Considerations

The design was built assuming certain data-model realities. These must be true in production for the UI to work.

### 8.1 Entities and relationships

Core entities:

- **Driver** (id, name, nationality, DOB, DOD, status)
- **Team** (id, name, country, series, founded, current)
- **Venue** (id, name, country, layout_version, length, corners)
- **Lap** (id, driver_id, venue_id, session, season, lap_number, time, conditions)
- **Moment** (id, type: overtake/crash/masterclass/debut, corner_id, drivers involved, venue_id, year, description)
- **Chassis** (id, team_id, season, name, power_unit, championship_points)
- **Season** (id, series, year, rounds)
- **Round** (id, season_id, venue_id, date)

### 8.2 Heritage graph (critical)

Moments should be nodes with multiple parents. Senna's Monaco 1988 qualifying belongs to:
- Senna's driver page
- Monaco's venue page
- McLaren's team page
- The "Senna vs Prost" rivalry narrative
- The "wet weather" tag
- The 1988 season

**Do not build moments as children of a single entity.** Build them as standalone records with many-to-many relationships to drivers, venues, teams, and tags.

### 8.3 Per-season versioning (critical)

The following change season to season and must be versioned:

- Team principals
- Driver lineups
- Chassis names (Ferrari SF-24 vs SF-25 vs SF-26)
- Track layouts (Spa's Raidillon was modified in 2022; Silverstone has had multiple reconfigurations)
- Academy rosters (FDA, RB Jr, Mercedes Jr, Alpine Academy, etc.)
- Liveries (they evolve yearly)
- Drivers' current status (active F1, retired, moved series)

UI should default to "current" versions but when displaying historical content (a 1998 Spa page, a 2004 Ferrari lap), should surface the era-appropriate versions. "Which Silverstone layout did Hamilton's 2008 lap run on?" is a real question the system needs to answer.

### 8.4 Live data requirements

Certain stats need near-real-time updates:
- Constructors' and drivers' championship standings (update within hours of race end)
- Cumulative stats (wins, poles, podiums) for active drivers
- Current season round counter ("Round 14 of 24")
- Upcoming race information

Other stats update less frequently:
- Career aggregates for retired drivers (static unless historical corrections)
- Track records (rare but do change)
- Team principal / driver lineup (seasonal or mid-season)

**Live data source should be a single authoritative feed** (a licensed data partner, or a well-maintained scraping pipeline) rather than scattered per-stat sources.

### 8.5 CV pipeline as a data provider

Every lap in the product comes from the CV pipeline. This means:

- Each lap has a `cv_pipeline_version` field — when the pipeline improves, re-process historical laps
- Each lap has `frames_analyzed`, `confidence_score`, `processing_date` metadata
- Raw telemetry traces are stored as time-series arrays (typically 10–50 Hz resolution)
- Derived features (sector times, notable moments, racing-line coordinates) are pre-computed and stored
- Video references are stored as external URLs with availability status (checked periodically)

### 8.6 Trajectory prediction model

F2/F3 trajectory modules require a model that:

- Takes a driver's accumulated CV signature + contextual metadata (academy, age, team, current results) as input
- Outputs a probability distribution over career outcomes (F1, WEC, IndyCar, FE, regional, exit)
- Returns cohort analog matches (top-K historical drivers most similar by signature)
- Returns feature importance (what's driving the prediction up or down)
- Is retrained periodically as the junior-series cohort evolves
- Stores every prediction as a timestamped record so calibration can be measured over time

For F3, the model needs to produce *both* next-step predictions and longer-horizon predictions, with explicit conditional probabilities. The product's credibility depends on this.

---

## 9. What's Illustrative vs. Real

Every HTML mockup file contains fabricated data. Rough inventory of what needs to be real in production:

**Always illustrative / needs real data:**
- All lap times (including Hamilton's Spa record, Vettel's pole times)
- All sector splits
- All telemetry trace shapes (the wave patterns in steering/brake/throttle/speed SVGs)
- All race win counts, pole counts, podium counts (directionally correct, often wrong in specifics)
- All trajectory probabilities (62% F1, 34% F1, etc.)
- All cohort analog match percentages
- All feature weight values
- All team principal names, current driver lineups, academy rosters
- All track map layouts (drawn as schematic approximations, not real geometry)
- Lap counts in filter summaries ("847 laps available")
- CV processing times ("processed in 4.2s")
- Most driver narrative prose (the setup-preference critiques, scouting reports)

**Directionally correct / still verify:**
- Chassis names (F2004, 312T, etc.) — generally real but confirm years
- Team founding years (generally real but confirm)
- Driver birth dates and nationalities
- Championship counts
- Iconic moments (events that happened, usually with the right driver and right era — specific corner attributions and timestamps often wrong)

**Real / still verify:**
- Series color system (deliberate design choice, verified through consistency testing)
- Entity color system (Vettel navy, Ferrari red, etc. — matches real livery)
- Structural template decisions (three-zone hero, cycling reels, etc. — verified through cross-entity application)

**Rule for Claude Code implementation.** Assume everything in the HTML mockups is placeholder until proven otherwise. Build the UI components consistent with the visual design, but treat all data-shaped content as content-to-be-replaced.

---

## 10. Claude Code Prompting Patterns

This section describes how to work effectively with Claude Code on f(x) implementation.

### 10.1 Context that should always be in the prompt

Every Claude Code task related to f(x) should include:

1. **This document** (or the relevant sections)
2. **The most relevant HTML mockup** (paste the file, or provide a reference if Claude Code has filesystem access)
3. **A clear, scoped task** — not "build the product", but "build the driver page template as a React component using [specific framework]"
4. **Technical constraints** — which framework, which CSS approach, which state management, which data fetching library

### 10.2 Task scoping

Claude Code performs best when tasks are single-component-sized. Good prompts:

- "Build a React component that renders the driving signature radar chart. It takes `driverData` (6 axis values 0-100) and `cohortAverage` (6 axis values) as props. Match the visual output of the radar in `/mockups/vettel-driver.html`. Use SVG, not a chart library."

- "Extend the existing `<DriverPage>` component to add the Teammate H2H module. Use the table structure from `/mockups/vettel-below-fold.html` lines 140–280. Data will come from a `teammates` prop (see TeammateData type). Use Tailwind for styling; match the exact visual output."

- "Create the Analyze a Lap picker page. Reuse the `<LapCard>` and `<FilterPill>` components. Scaffold the filter state with useReducer. Match `/mockups/analyze-lap-picker.html`."

Bad prompts:

- "Build the f(x) product." (too big)
- "Make it look like the mockup." (which mockup? what part?)
- "Add features." (what features?)

### 10.3 Tokens vs. data — the first principle of implementation

**This is the single most important distinction when translating the mockups into production code.** The HTML mockup files use inline styles with hardcoded values for *everything* — colors, sizes, driver names, lap times, stat counts, editorial prose. This was appropriate for design artifacts that render in isolation. It is *not* how the production code should be structured.

Production code must cleanly separate two categories of values:

**Tokens (hardcoded, but centralized).** The design language — colors, typography, spacing, border radii, animation timings, component structural patterns. These values are constants in production, but they live in one place (a design tokens file, CSS custom properties, a theme object, a Tailwind config). When a component needs a color, it references the token, not the raw hex. Example:

```css
/* design-tokens.css */
:root {
  --color-series-f1: #FF1E56;
  --color-series-f2: #00E5FF;
  --color-series-f3: #B026FF;
  --color-surface: #080808;
  --color-border-subtle: #1a1a1a;
  --color-text-dim: #666;
  --font-mono: 'IBM Plex Mono', monospace;
  --font-sans: 'Inter', sans-serif;
  --font-serif: 'Spectral', serif;
  --radius-card: 10px;
  --radius-pill: 4px;
  --hero-height: 620px;
}
```

```tsx
// Component references tokens, never raw values
<div style={{ 
  background: 'var(--color-surface)', 
  borderRadius: 'var(--radius-card)' 
}} />
```

This means one edit changes the whole product. Change `--color-series-f1` in one file and every F1 page updates.

**Data (dynamic, never hardcoded in components).** Everything content-shaped — driver names, team names, venue names, lap times, sector splits, stat counts, career arcs, cohort analogs, prediction probabilities, telemetry traces, editorial prose, current rosters. These flow into components as props, fetched from API endpoints, computed from the database, or pulled from a content management system. They are *never* typed directly into component files.

```tsx
// ❌ Wrong: data hardcoded in component
function VettelPage() {
  return <h1>Sebastian Vettel</h1>;  // never do this
}

// ✅ Right: data as props
function DriverPage({ driver }: { driver: DriverData }) {
  return <h1>{driver.name}</h1>;
}
```

This separation means the same component renders Vettel, Leclerc, Hamilton, or any other driver without code changes. Only the data it receives differs.

**The subtle case — entity colors.** Colors like "Vettel's Red Bull navy" or "Ferrari's Rosso Corsa" feel like they could be hardcoded. They aren't. They're looked up dynamically from the data. The *system* is in tokens (`var(--color-team-redbull)`, `var(--color-team-ferrari)` — these are constants). The *rule* for which color applies to which entity is encoded in data (`driver.peakEraTeam.liveryColor → 'redbull'`). The component receives the data and renders:

```tsx
<span style={{ background: `var(--color-team-${driver.peakEraTeam.liveryColor})` }} />
```

Adding a new team to the product means adding a token and a data entry — no component changes.

**What belongs in tokens vs data (reference table):**

| Tokens (hardcoded, centralized) | Data (dynamic, never hardcoded) |
|---|---|
| Series colors (F1 red, F2 cyan, F3 violet) | Driver, team, venue names |
| Neutral palette | Lap times, sector splits |
| Typography scale | Telemetry trace coordinates |
| Spacing rhythm | Stat counts (wins, poles, podiums) |
| Hero height, card aspect ratios | Cohort analog names and match percentages |
| Component structure (three-zone hero) | Prediction probabilities |
| Border radii, gradient patterns | Current driver rosters, team principals |
| Placeholder flag styling | Editorial prose content |
| The *idea* of "livery glow + vignette" | The actual livery colors per entity (token lookup from data) |
| Animation timings (reel dwell, transitions) | Which moments appear in which reels |

**A self-check during implementation.** When building a component, ask: "If I wanted to use this component for a different driver / team / venue / lap, would I need to change the component itself, or just pass different data?" The answer should always be "just pass different data." If the answer is "change the component," you have data hardcoded where tokens should live.

**One more refinement.** Some values sit in a middle zone — they're neither pure design tokens nor pure data. Things like the six default driving signature axis labels ("Steering Smoothness," "Entry Aggression," etc.) are structural — they come from the product's analytical framework — but they're content-adjacent. These belong in a `constants.ts` or similar config file, separate from both tokens and runtime data. This gives you three layers:

1. **Tokens** — design language constants (colors, type, spacing)
2. **Constants** — product-structural strings (axis labels, section headers, series names, confidence tier definitions)
3. **Data** — dynamic content (names, numbers, prose, predictions)

Claude Code should set up all three layers cleanly from the start. Retrofitting this later is painful.

### 10.4 Establishing the system

Before building individual pages, have Claude Code build the primitive components that everything else reuses:

**Suggested build order:**

1. Design tokens (colors, typography, spacing) as CSS variables or Tailwind config
2. Product constants (axis labels, section headers, confidence tiers, series names)
3. TypeScript types for core entities (Driver, Team, Venue, Lap, Moment, Chassis, Season, Prediction)
4. Mock data (static JSON fixtures matching the types — enough to populate one driver page, one team page, one venue page) so components can be built and tested without a backend
5. Primitive components: `<Button>`, `<Card>`, `<StatCard>`, `<SectionLabel>`, `<PlaceholderFlag>`
6. Compound components: `<LiveryGlowCard>`, `<CyclingReel>`, `<StatStrip>`, `<SensitivityBars>`, `<RadarChart>`
7. Layout patterns: `<ThreeZoneHero>`, `<ModuleContainer>`, `<Header>`
8. Pages composed from the above, consuming mock data
9. Interactive features: `<InteractiveTrackMap>`, `<SyncedScrubber>`, `<ComparisonView>`
10. Eventually: replace mock data with real API / CV pipeline output

Each layer can be built and validated before the next. Critically: **steps 1–4 should happen before a single component is written.** Getting these foundations right is worth spending disproportionate time on, because everything else depends on them.

### 10.5 Consistency checks

After Claude Code builds something new, have it verify consistency:

- "Review this component against the design system doc — flag any rule violations"
- "Check that this page uses the three-zone hero correctly"
- "Verify that every factual claim in this prose has a `[PLACEHOLDER]` flag or a source"

Claude Code is capable of self-critique when prompted. Don't skip it.

### 10.6 What to avoid in prompts

- Don't ask Claude Code to invent new design patterns when existing ones could work. "Add a carousel" → "use the existing CyclingReel component pattern"
- Don't ask Claude Code to generate F1 facts from memory. It will confidently invent things. Always provide source data or require placeholder flags.
- Don't ask for "the whole product" at once. Stage implementation.
- Don't mix unrelated tasks in one prompt. "Build the driver page and also fix the search bug and also add auth" — separate these.

### 10.7 When Claude Code drifts from the design system

Symptoms:
- Using accent colors that don't match the series/entity system
- Adding font sizes outside the scale
- Inventing new component patterns that duplicate existing ones
- Generating editorial content without placeholder flags

Response: paste the relevant section of this document, point to the specific HTML mockup that shows the correct pattern, and ask for a revision. Don't accept "close enough" early in the build — drift compounds.

### 10.8 Handoff between Claude Code sessions

Each new Claude Code conversation starts blank. To preserve continuity:

- Commit work to git frequently
- Include clear README files in each component directory explaining the component's role and its place in the design system
- Keep this document updated as decisions evolve
- Create a `DECISIONS.md` file in the repo that tracks notable architectural or design choices made during implementation

---

## 11. Summary & Final Notes

### The shape of the product

f(x) is a motorsport analytics product where:
- The home page is three ghost-summon cards (f(1), f(2), f(3))
- Each series has a landing page with current-season focus
- Each entity (driver, team, venue) has a deep page using variant templates
- F2/F3 drivers get predictive trajectory modules as their defining feature
- Analyze a Lap is the interactive CV-telemetry tool accessible from any page
- Compare Laps, Compare Drivers, Compare Venues provide relational analysis
- The editorial voice is authoritative, understated, honest about uncertainty

### The design system's core commitments

- Pure black backgrounds, neon accents per entity
- Monospace for metadata, sans for body, serif italic for editorial
- Three-zone hero template that adapts across entity types
- Cycling reels as signature visual anchors
- Radial livery glows + vignettes as surface treatment
- `[PLACEHOLDER]` flags as permanent editorial discipline
- Uncertainty surfaced, not hidden — especially for predictions

### What makes f(x) different

Other F1 sites have stats. f(x) has:
1. CV-derived telemetry from onboard video (the technical moat)
2. Predictive trajectory analysis for F2/F3 drivers (the strategic moat)
3. A design system that takes itself seriously without being precious (the aesthetic moat)
4. Editorial discipline around fact and uncertainty (the credibility moat)

Preserve all four through implementation.

---

*Document version: 1.0 · Initial handoff from design phase to implementation. Update this document as implementation reveals new constraints or decisions.*