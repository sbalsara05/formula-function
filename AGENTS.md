# AGENTS.md

## Cursor Cloud specific instructions

This repo is **f(x)**, an F1/F2/F3 motorsport analytics app. There are two services:

- `frontend/` — Next.js 16 (App Router, React 19, Tailwind v4). The primary product. Dev server on port 3000. Scripts live in `frontend/package.json` (`npm run dev`, `npm run lint`; type-check with `npx tsc --noEmit`).
- `backend/` — FastAPI scaffold on port 8000. Deps in `backend/requirements.txt`. Most CRUD routers intentionally return `501 Not implemented — use Supabase`; only the Jolpica-backed endpoints work without a database: `/`, `/health`, `/api/v1/standings/current`, `/api/v1/drivers/standings/{season|current}`.

### Running the services

- Frontend: `cd frontend && npm run dev`.
- Backend: `cd backend && . .venv/bin/activate && uvicorn app.main:app --reload --port 8000` (the virtualenv lives at `backend/.venv`).

### Non-obvious gotchas

- **Placeholder Supabase env is required for the frontend.** `middleware.ts` runs `createServerClient` on every request, which throws if `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are empty — even though `getUser()` is never called. `frontend/.env.local` holds placeholder values so pages render. It is gitignored (`.env*`); recreate it if missing.
- **`src/lib/types.ts` and `src/lib/constants.ts` are missing from the repo.** As a result the driver/team/venue detail routes (`/f/[series]/driver|team|venue/...`) fail to compile with `Module not found: Can't resolve '@/lib/...'` and return HTTP 500. The working routes are the home page (`/`) and the series landing pages (`/f/1`, `/f/2`, `/f/3`), which include live standings fetched from `api.jolpi.ca`. This is a pre-existing source gap, not an environment problem — do not add these files as part of environment setup.
- **Turbopack error stickiness:** once a broken route (e.g. a driver page) has been compiled, the dev server serves 500 for *all* routes until restarted. Recover with `rm -rf frontend/.next` then `npm run dev`.
- **Pre-existing lint/tsc failures:** `npm run lint` and `npx tsc --noEmit` already report errors (unescaped entities, implicit `any`, and the missing `@/lib/*` modules). These are not caused by environment setup.
- **Live data needs outbound network** to `api.jolpi.ca` (Ergast mirror). If egress is blocked, standings sections silently render empty but pages still load.
