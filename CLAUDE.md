@EDITING_PROTOCOL.md

## TypeScript Verification
After any multi-file edit, run `cd frontend && npx tsc --noEmit` before declaring work complete. Report the result explicitly. Never declare a session done with outstanding type errors.

## Next.js Component Boundaries
Never attach event handlers (`onError`, `onClick`, `onLoad`) to server components. If an interactive prop is needed on an image or element, extract it into a `'use client'` component first. The app uses the App Router — check `"use client"` presence before adding any interactivity.

## Bulk Edits
Avoid blanket `replace_all` across schema or data files. For multi-field updates, edit one field at a time or use targeted Edit calls with surrounding context. Always re-read the affected section after bulk changes to verify integrity before moving on.

## External API Calls
When fetching from paginated APIs (Jolpica, Wikimedia, etc.), always check for pagination metadata and loop until complete. Default page sizes (often 30–100) will silently truncate large datasets like driver race history. Log `total` vs `fetched` counts before writing any data.

## Long-Running Scripts
Before running any download or batch script, check whether an instance is already running (`ps aux | grep <script-name>`). Never spawn parallel instances of network-bound scripts — they cause rate limiting. Sequential execution with delays (4–8s between requests) is required for Wikimedia downloads.
