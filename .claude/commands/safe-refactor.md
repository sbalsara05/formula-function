Schema-safe refactor using Zod schemas, property tests, and a git worktree sandbox. Argument: description of the refactor to perform.

Usage: `/safe-refactor "rename FeaturedLap.sectorTimes to FeaturedLap.sectors across the codebase"`

## How to run this

1. **Establish baseline**
   - Run `cd frontend && npx tsc --noEmit` and confirm zero errors before touching anything.
   - If there are pre-existing errors, STOP and report them — don't proceed.

2. **Derive Zod schemas from existing data**
   - Read the relevant type definitions from `frontend/src/types/` or wherever the TypeScript interfaces live.
   - For each affected type (Driver, Team, Venue, FeaturedLap, LapAnalysis, etc.), write a matching Zod schema that describes the current shape.
   - Save schemas to `frontend/src/lib/schemas/[type].schema.ts` (create the directory if needed).

3. **Write property tests**
   - For each schema, write a test that:
     - Parses every existing data entry through the schema (real data, not generated)
     - Asserts no parse errors on the current data
   - Save tests to `frontend/src/__tests__/schemas/[type].schema.test.ts`
   - Run the tests: `cd frontend && npx jest src/__tests__/schemas/ --no-coverage`
   - All must pass before proceeding. If any fail, the schema doesn't match the data — fix the schema.

4. **Create a git worktree**
   - Run `git worktree add /tmp/safe-refactor-worktree -b safe-refactor-$(date +%s)`
   - All refactor edits go in the worktree, not the main working tree.

5. **Perform the refactor in the worktree**
   - Apply the requested change (rename, restructure, etc.) one file at a time.
   - After each file: `cd /tmp/safe-refactor-worktree/frontend && npx tsc --noEmit 2>&1 | head -20`
   - Never proceed to the next file if there are type errors.

6. **Run the property tests in the worktree**
   - `cd /tmp/safe-refactor-worktree/frontend && npx jest src/__tests__/schemas/ --no-coverage`
   - All tests must pass.

7. **Merge if green**
   - If tsc + tests both pass: copy the changed files back to the main working tree.
   - Run tsc and tests one final time in the main tree to confirm.
   - Clean up the worktree: `git worktree remove /tmp/safe-refactor-worktree`

8. **Report**
   - Files changed, test results (before/after), tsc result.
   - If anything failed at any step, report the exact error and stop — do NOT merge partial changes.

## Notes
- The worktree is a safety net: bad refactors never touch main working tree state
- Property tests against real data (not generated) catch schema drift that unit tests miss
- Never use `replace_all` across schema or data files — edit field by field with surrounding context
