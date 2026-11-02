# Driving Signature Spec (timing pipeline v0.1)

This document defines what the six-axis driving signature measures, which drivers it is compared against, and how raw telemetry becomes a 0-100 score. The pipeline in this folder implements it. Change this file first, then the code.

## Running it

```bash
cd backend/pipeline
python3.13 -m venv .venv && .venv/bin/pip install -r signature/requirements.txt
cd signature
../.venv/bin/python ingest.py --seasons 2023-2026   # resumable, about 1 minute per weekend
../.venv/bin/python aggregate.py                     # session scores, driver-era scores, comparison groups
../.venv/bin/python export.py                        # writes signatures.json and signature-details.json for the frontend
../.venv/bin/python review.py --drivers leclerc verstappen norris --era 2022-2025
../.venv/bin/python metrics.py                       # optional: recompute measurements offline after a definition change
```

## Data source

The official F1 live-timing feed, read through the **OpenF1 historical API** (`api.openf1.org`, no account, seasons 2023 onwards). Per car it provides:

- Car data at roughly 3.7 Hz: speed, throttle (0-100), brake (on/off only), gear, RPM, DRS.
- Position data at roughly 3.7 Hz: X/Y/Z on track (decimetres).
- Laps (lap and sector times, pit-out flag), stints (compound, tyre age), intervals to the car ahead, race-control messages (flags, safety car, deleted laps).

It does **not** provide steering angle or brake pressure. Sessions used: the main Qualifying and the main Race of each Grand Prix weekend. Sprint sessions are excluded in v0.1.

**Why not FastF1.** The plan was FastF1 for 2018 onwards. Since FastF1 3.9 the live-timing archive (`livetiming.formula1.com/static`) answers 401 unless FastF1 signs in with an F1 account that has an active F1 TV subscription (`F1_USERNAME` / `F1_PASSWORD`), and FastF1's public mirror returns 404. OpenF1 serves the same feed without an account but only from 2023. Seasons 2018-2022 (the whole late-hybrid era and the first ground-effect season) therefore need either F1 TV credentials plus a FastF1 adapter in `ingest.py`, or the vision pipeline.

**Rate limit.** OpenF1 allows 30 requests per minute. `openf1.py` spaces requests 2.2 s apart and honours `retry-after` on 429. Qualifying telemetry is fetched for all cars at once in windows of at most 5 minutes around the selected laps (about 20 requests per weekend).

**Corner labels** come from the MultiViewer circuit API (the same source FastF1 uses for `get_circuit_info()`), one request per weekend. They are cosmetic; corners fall back to `C1..Cn`.

## Unit of measurement: difference from the same-session field

Every metric is measured against the other cars in the same session. This removes the effect of track, car generation, weather and tyre generation.

- For corner metrics, each corner in each session has its own field median and spread. A driver's value becomes a robust z-score: `(x - field median) / (1.4826 * field MAD)`, clipped to [-3, 3]. If the MAD is zero the standard deviation is used; if that is also zero the z-score is 0.
- For race metrics, each race (and compound) has its own field median and spread, standardised the same way.
- Signs are flipped where needed so that **higher always means "more of the labelled trait"**.

Known limitations:

- "The field" includes cars of different performance. A driver in a dominant car will score higher on car-sensitive metrics (minimum corner speed, braking point). The TEAMMATES comparison is where the car is held constant. A car-adjusted variant is a candidate for v0.2.
- The braking point is not adjusted for approach speed. A driver who exits the previous corner faster arrives quicker and must brake earlier, so Braking measures style more than pace. In the v0.1 review gate, Entry Aggression agreed with the teammate qualifying head-to-head in about 90% of teammate pairs, Braking in about 70%. Normalising the braking point by approach speed is a candidate for v0.2.

## Track coordinate and corners

- **Reference lap:** the fastest valid lap of the session. Its X/Y path, resampled to 1 m spacing, defines a track coordinate `s` in metres.
- **Mapping laps onto the reference:** every sample of every analysed lap is mapped onto the nearest point of the reference line. The search is restricted to +/-150 m of the lap's own scaled distance so crossover circuits (Suzuka) do not jump branches. All brake points and apexes are therefore expressed in the same coordinate for every driver.
- **Corners:** local speed minima on the reference lap with a prominence of at least 25 km/h, at least 100 m apart. Flat-out kinks are not corners for this purpose. Each corner is labelled with the nearest official corner number (within 200 m) from the MultiViewer circuit data when available.
- **Corner window:** from the midpoint to the previous corner's apex (at most 800 m before) to the midpoint to the next corner's apex (at most 800 m after).

## Qualifying laps used for corner metrics

Per driver per session, up to 3 laps that are all of the following:

- within 1% of that driver's best lap in the session, and within 107% of the session's fastest lap (the sporting regulations' own test for a representative qualifying lap; a tighter 105% cut removed the slowest teams from the field, 19 driver-sessions in 2026 alone)
- not deleted by race control (track limits), not a pit-out lap, with a recorded lap time
- not overlapping a red flag or any yellow / double-yellow period (see "Flag periods")
- on a dry compound (SOFT, MEDIUM, HARD); intermediate and wet laps are excluded
- with at least 70% of the expected car-data samples (3.7 per second of lap time) and at least 56% of the expected position samples

A corner needs at least 8 field laps to be scored in that session.

### Flag periods

Parsed from race-control messages.

- **Red flag:** from the red flag until a track-wide green flag or a "SESSION STARTED / RESUMED" message.
- **Safety car / VSC (race only):** from "DEPLOYED" until the safety car comes in (+120 s for the restart lap) or the VSC ends (+20 s).
- **Yellow / double yellow:** from the flag in a marshal sector until that sector is cleared, the whole track is cleared, goes green or red, or the session ends, capped at 10 minutes. There is no public mapping from a car's position to a marshal sector for race laps, so a yellow anywhere excludes every lap that overlaps it. This is conservative: it costs one or two laps per car per incident.

## Per-lap corner measurements

All distances are in the track coordinate `s`.

| Measurement | Definition |
|---|---|
| `apex_s`, `min_speed` | Lowest speed within +/-100 m of the reference apex (narrower if the neighbouring corner is closer). |
| `brake_on_s` | Start of the main braking application before the apex: of the brake-on runs that start inside the corner window, the one with the largest speed drop. The onset is the midpoint between the last brake-off sample and the first brake-on sample. A braking application must last at least two samples or drop speed by 15 km/h. |
| `brake_off_s`, `brake_release_speed` | First brake-off point after `brake_on_s`; speed interpolated at that point. |
| `brake_len_m` | `brake_off_s - brake_on_s`. |
| `apex_to_full_throttle_m` | Distance from `apex_s` to the first sample with throttle >= 98%, searched up to the end of the corner window. Empty if full throttle is never reached. |
| `throttle_lifts` | Number of sample-to-sample throttle drops of 10 points or more between the apex and full throttle. |

Braking measurements are only scored at corners where at least half the field's laps brake. Lift-only corners still contribute to minimum speed and throttle.

## Axis definitions (F1)

Each axis is the mean of its component z-scores for a lap-corner, after sign alignment.

| Axis | Components | Higher means |
|---|---|---|
| Braking | `+z(brake_on_s)`, `-z(brake_len_m)` | Brakes later and over a shorter distance than the field |
| Entry Aggression | `+z(brake_release_speed)`, `+z(min_speed)` | Carries more speed off the brake and through the slowest point |
| Throttle Application | `-z(apex_to_full_throttle_m)`, `-z(throttle_lifts)` | Reaches full throttle sooner after the apex, with fewer lifts |
| Consistency | `-z(stint residual spread)` | Smaller lap-to-lap variation within a stint than the field |
| Tyre Management | `-z(degradation slope)` | Loses less lap time per lap of tyre age than the field on the same compound |
| Steering Smoothness | none | Needs steering angle; **pending the vision pipeline, never estimated** |

### Race laps for Consistency and Tyre Management

A race lap is clean when it is all of the following:

- not lap 1, not an in-lap or out-lap
- not overlapping a red flag, safety car, virtual safety car or yellow / double-yellow period
- on a dry compound
- at least 1.5 s behind the car ahead at the end of the lap (no traffic or DRS trains). The leader (gap to leader of 0) and lapped gaps count as clear air; laps with no interval reading in the previous 30 s are kept
- within 107% of the median of that driver's stint

Stint measurements:

- **Fuel correction:** `lap time - 0.055 s * (laps remaining in the race)`. It cancels in field comparisons but keeps the absolute degradation numbers honest.
- **Residual spread (Consistency):** fit a straight line of corrected lap time against tyre age within the stint, then take the robust spread of the residuals (1.4826 * MAD). Requires at least 6 clean laps in the stint.
- **Degradation slope (Tyre Management):** the slope of that same line in seconds per lap. Requires at least 8 clean laps. Compared with stints on the same compound in the same race when at least 4 such stints exist, otherwise with all stints in the race.

## Regulation eras

These are separate from the storytelling eras in `frontend/src/data/f1-eras.ts`.

| Era id | Seasons | Label |
|---|---|---|
| `2018-2021` | 2018-2021 | Late hybrid |
| `2022-2025` | 2022-2025 | Ground effect |
| `2026-` | 2026 onwards | Active aero |

Signatures are computed per driver per era. The driver page shows the driver's most recent era that has at least one scored axis.

Each era in `eras.py` also carries `rules` (what defines the era's car regulations) and an optional `caveat`, shown in the driver page's "How is this calculated?" panel and on the full metrics page. Sources: formula1.com regulation explainers (the 2022 car; the 2026 rule changes and power units) and the F1 2026 terminology update (corp.formula1.com). The 2026 caveat matters for reading the axes: energy recovery (lifting before braking, harvesting at full throttle) shows up in throttle and braking traces. With OpenF1 as the source, `2018-2021` has no data and `2022-2025` is built from 2023-2025 only; the exported era carries the seasons it actually covers.

## From measurements to a 0-100 score

1. **Per driver per session:** mean of the lap-corner axis z-scores (qualifying axes) or the stint z-scores weighted by clean laps (race axes). The sample count is kept.
2. **Per driver per era:** weighted mean of the session values, weighted by sample count.
3. **Minimum samples:** an axis is scored only if the driver-era has at least 5 sessions and 150 lap-corners (qualifying axes), or at least 5 races and 8 stints (race axes). Otherwise it is `null`.
4. **Scale:** the 0-100 value is the mid-rank percentile of the driver-era score among all driver-eras in the dataset with a score on that axis: `100 * (rank - 0.5) / N`, rounded.
5. **Confidence:** resample the driver's sessions with replacement 400 times, recompute the driver-era score, and convert each replicate to a percentile against the same reference set.
   - `uncertaintyEnvelope` is the 95th percentile of those replicates per axis.
   - `confidenceScore` is the mean over scored axes of `1 - (p95 - p5) / 100`, clamped to [0, 1].
6. **`sampleSize`:** the number of distinct laps actually used (qualifying laps plus clean race laps).

## Comparison groups (the four buttons)

Each group is a polygon of mean percentiles over its members, per axis.

| Button | Members |
|---|---|
| ERA AVG | Every driver-era in the same regulation era |
| TEAMMATES | Drivers who shared a team with the subject in that era, weighted by sessions shared |
| CHAMPIONS | Driver-eras of world champions in the eras they won titles (from final Jolpica standings of completed seasons) |
| ALL-TIME | Every driver-era in the dataset (2023 onwards until F1 TV access or the vision pipeline extends it back) |

Because every measurement is relative to the field, ERA AVG and ALL-TIME sit near 50 on every axis: a "typical driver" reference ring. TEAMMATES and CHAMPIONS are where the comparison shape moves.

## Outputs

- `data/raw/<season>/` (gitignored): per-session raw measurements, so scoring can change without re-downloading.
- `data/coverage.json` (gitignored): sessions expected, loaded, failed, and laps total vs usable.
- `data/driver_coverage.csv` (gitignored): per driver-era, sessions and samples per axis and how many axes are scored.
- `frontend/src/data/generated/signatures.json`: one `DrivingSignature` per driver-era, plus era and comparison metadata (driver page).
- `frontend/src/data/generated/signature-details.json`: the full metrics page (`/f/1/driver/<slug>/signature`). Per driver-era: axis percentiles, 90% ranges, rank within the era, raw differences from the field, teammate head-to-heads and axis differences, and a weekend-by-weekend log. Shared: the era table, the methodology thresholds (read from the pipeline constants, so the page never disagrees with the code), season coverage and the champions list. Server-only on the frontend.

## Out of scope for v0.1

- Steering Smoothness (vision pipeline).
- Seasons 2018-2022 (need F1 TV credentials for FastF1, see "Why not FastF1").
- Seasons before 2018, F2 and F3 (no public telemetry; vision pipeline).
- Sprint sessions.
- F2/F3 axis sets (Race Craft, Quali Pace, Wheel-to-Wheel, First-Lap Aggression).
