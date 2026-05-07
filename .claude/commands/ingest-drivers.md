Bulk-ingest multiple drivers using focused sub-agents. Argument: comma-separated driver names.

Usage: `/ingest-drivers "Lando Norris, Oscar Piastri, George Russell"`

## How to run this

1. **Parse** the argument into a list of driver names.

2. **Dedup check** — grep `frontend/src/data/mock/drivers.ts` for each name. Skip any already present.

3. **Spawn one Agent per driver** (use the Agent tool, subagent_type general-purpose). Each agent's prompt should be self-contained:
   - Fetch all Jolpica career stats with pagination (check MRData.total, loop with offset until all races fetched)
   - Download portrait + era images **sequentially with 5s delays** — no parallel downloads, Wikimedia rate-limits
   - Write the full driver entry to `frontend/src/data/mock/drivers.ts` (Driver, DriverStats, DriverEra[], DrivingSignature, ReelSlide[], ScoutingReport)
   - Run `cd frontend && npx tsc --noEmit` and return pass/fail

4. **Image download sequencing** — run agents for different drivers sequentially, not all at once, to avoid Wikimedia rate limits. Batch into groups of 2 max.

5. **Merge** — after each agent completes, wire the new driver into the registry, then run a final `npx tsc --noEmit`. Only merge entries that passed the type check.

6. **Report** — X of Y drivers ingested successfully, list any failures.

## Notes
- Each driver entry must follow the pattern in EDITING_PROTOCOL.md
- All imageUrls must be self-hosted `/images/drivers/` paths
- Never write a driver entry that fails `tsc --noEmit`
