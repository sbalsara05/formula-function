Playwright visual regression loop for SVG track map hotspot positioning. Argument: venue name(s).

Usage: `/track-map-fix "Spa-Francorchamps"` or `/track-map-fix "Spa, Monza, Silverstone"`

## How to run this

1. **Parse** the argument into a list of venue names.

2. **Locate the venue data**
   - grep `frontend/src/data/mock/` for the venue id.
   - Read the SVG path data and current hotspot (x, y) coordinates from the venue file.

3. **Compute coordinate anchors**
   - Read the SVG viewBox dimensions.
   - For each hotspot, calculate its position as a percentage of the viewBox width/height.
   - Print a table: `hotspot name | current (x,y) | % of viewBox | approximate landmark description`
   - Wait for user confirmation: "Do these look right? Reply 'go' to start the fix loop."

4. **Set up Playwright** (if not already installed)
   - Check: `ls frontend/node_modules/.bin/playwright 2>/dev/null`
   - If missing: `cd frontend && npx playwright install chromium --with-deps`
   - Create a test file at `frontend/playwright/track-map.spec.ts` if it doesn't exist.

5. **Write a visual snapshot test**
   - The test navigates to `/f/f1/venues/[venueId]` and screenshots the hotspot overlay.
   - It compares against a stored fixture (PNG) in `frontend/playwright/fixtures/[venueId]-hotspots.png`.
   - If no fixture exists yet, the first run saves the current state as the fixture.

6. **Enter the fix loop** (max 10 iterations per venue)
   - Run: `cd frontend && npx playwright test track-map --reporter=list`
   - On failure: read the diff output to determine which hotspot(s) are mispositioned.
   - Adjust the (x, y) coordinates in the venue data file.
   - Re-run. Repeat until the test passes or 10 iterations are exhausted.

7. **Report**
   - For each venue: PASS / FAIL (with iteration count).
   - If failed after 10 iterations: print the last known (x,y) values and the expected values from the diff, so the user can make a manual call.

## Notes
- Never guess coordinates from memory — always derive from the SVG path data in the file
- The loop is self-contained: it runs, fails, adjusts, re-runs without user intervention
- If the dev server isn't running, start it first: `cd frontend && npx next dev &` then wait 5s
- Fixtures are committed to git so regressions are caught on future runs
