---
name: Database architecture decision
description: Supabase chosen over MongoDB; backend data flow and seeding approach
type: project
---

Supabase (PostgreSQL) chosen as the database — relational model fits F1 data (seasons → constructors → drivers → laps).

**Why:** User asked about MongoDB too. Chose Supabase because F1 data is deeply relational (standings reference teams+drivers, laps reference sessions, sessions reference venues). MongoDB would require denormalization that fights the data model.

**Stack:**
- Supabase: hosted Postgres, RLS enabled, public read policies
- Schema at: `backend/supabase/schema.sql`
- Python client: `supabase==2.15.2` in requirements.txt
- Backend DB module: `backend/app/database.py` (lazy singleton, needs SUPABASE_URL + SUPABASE_SERVICE_KEY env vars)
- Seeder script: `backend/scripts/seed_from_jolpica.py` — pulls 2018–2025 standings from Jolpica API

**External APIs:**
- Jolpica (Ergast fork): `https://api.jolpi.ca/ergast/f1/` — historical/current WCC + WDC standings. Service at `backend/app/services/jolpica.py`
- OpenF1: `https://api.openf1.org/v1/` — live session/lap data

**Frontend API client:** `frontend/src/lib/api.ts` — `getConstructorStandings`, `getDriverStandings`

**Current endpoints live:**
- `GET /api/v1/teams/standings/current` — live Jolpica WCC
- `GET /api/v1/teams/standings/{season}` — historical WCC
- `GET /api/v1/drivers/standings/current` — live Jolpica WDC
- `GET /api/v1/drivers/standings/{season}` — historical WDC

**How to apply:** All new pages should call the FastAPI first (Supabase or Jolpica), fall back to mock if API unavailable. Run `python -m scripts.seed_from_jolpica` once after setting up Supabase project.
