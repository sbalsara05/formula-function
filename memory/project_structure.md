---
name: f(x) project structure
description: Directory layout and foundational files for the f(x) product
type: project
---

Repo root: /Users/sbalsara/Documents/GitHub/formula-function

- frontend/ — Next.js 16 app
  - src/app/globals.css — ALL design tokens as @theme CSS vars
  - src/lib/types.ts — TypeScript types for all entities (Driver, Team, Venue, Lap, Moment, etc.)
  - src/lib/constants.ts — Product constants: SIGNATURE_AXES (per-series), SERIES_LABELS, PLACEHOLDER flags, SECTION_LABELS, etc.
  - src/data/mock/ — Static mock data for Vettel, Ferrari, Spa (illustrative, flagged with PLACEHOLDER)
  - src/components/primitives/ — Button, Card, etc. (not yet built)
  - src/components/compound/ — LiveryGlowCard, CyclingReel, etc. (not yet built)
  - src/app/f/[series]/ — Series landing + driver/team/venue entity routes
  - src/app/analyze/ — Lap picker + analysis view + processing state
  - src/app/compare/ — Laps / Drivers / Venues comparison pages

- backend/ — FastAPI app
  - app/main.py — FastAPI entrypoint with CORS for localhost:3000
  - app/models/schemas.py — Pydantic models mirroring TypeScript types
  - app/routers/ — drivers, teams, venues, laps (all return 501 until DB connected)
  - requirements.txt — fastapi, uvicorn, pydantic, python-dotenv

**Why:** Scaffolded foundations — tokens, types, constants, mock data — so all components can be built and tested without a real backend.

**How to apply:** Next step is building primitive components (Button, Card, SectionLabel, PlaceholderFlag, StatCard) then compound components (LiveryGlowCard, CyclingReel, StatStrip, RadarChart).
