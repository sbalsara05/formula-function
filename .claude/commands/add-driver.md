Add a new F1 driver to the site. Argument: driver name (e.g. `/add-driver Oscar Piastri`).

Steps — execute in order, do not proceed if a step fails:

1. **Check if already exists**
   - grep `src/data/mock/drivers.ts` for the driver id. If found, stop and report.

2. **Fetch career stats from Jolpica API**
   - Base URL: `https://api.jolpi.ca/ergast/f1/drivers/{driverId}/`
   - Fetch race results with full pagination: `https://api.jolpi.ca/ergast/f1/drivers/{driverId}/results.json?limit=100&offset=0`
   - Check `MRData.total` — if total > 100, loop with offset increments until all races fetched.
   - Log: `fetched X of Y races` before writing any data.
   - Derive: titles (championship wins), wins, poles (from qualifying endpoint), podiums (P1/P2/P3 finishes), career span, races entered, fastest laps, points scored.

3. **Find a portrait image**
   - Try Wikimedia Commons first: search `[driver name] F1 portrait`
   - Download to `frontend/public/images/drivers/[lastname]-portrait.jpg`
   - Verify with `file` command — must be JPEG/PNG, under 400KB
   - If blocked, try Tier 2–7 from EDITING_PROTOCOL.md

4. **Find era card images** (one per team era)
   - One image per team the driver raced for, downloaded to `frontend/public/images/drivers/[lastname]-[team]-[year].jpg`
   - Verify each with `file` command before adding to data

5. **Write the driver entry**
   - Add to `frontend/src/data/mock/drivers.ts` following the existing pattern:
     - `Driver` object
     - `DriverStats` object  
     - `DriverEra[]` array — one entry per team, all imageUrls self-hosted
     - `DrivingSignature` object
     - `ReelSlide[]` array — 3 slides minimum
     - `ScoutingReport` object

6. **Wire into registry**
   - Check how other drivers are registered (grep for `driverId` pattern in pages/registry files)
   - Add the new driver to the registry

7. **Verify**
   - Run `cd frontend && npx tsc --noEmit`
   - Report zero errors before declaring done
   - If errors, fix them before finishing
