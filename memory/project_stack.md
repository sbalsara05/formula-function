---
name: f(x) tech stack
description: Confirmed technology choices for the f(x) motorsport analytics product
type: project
---

Next.js 16.2.4 (App Router) + React 19 + Tailwind CSS v4 (CSS-first, @theme block) for the frontend. FastAPI (Python) for the backend. Both confirmed and scaffolded as of 2026-04-19.

**Why:** Next.js for SSR on entity pages (SEO + initial paint); Tailwind v4 CSS-first config; FastAPI for async Python backend that will integrate with the CV pipeline.

**How to apply:** Always use @theme blocks in globals.css for Tailwind tokens (no tailwind.config.ts). Entity colors are dynamic CSS vars (--color-entity), not Tailwind classes. Backend runs on http://localhost:8000, frontend on http://localhost:3000.
