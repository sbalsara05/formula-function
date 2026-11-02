import { AXIS_COPY, BASIS_LABEL, COHORT_COPY, COHORT_ORDER } from '@/lib/signature-copy'
import type { SignatureReference } from '@/data/signature-details'

const MONO = 'var(--font-mono)'
const SERIES_HEX = '#FF1E56'
const SUBHEAD: React.CSSProperties = { fontFamily: MONO, fontSize: 9, letterSpacing: 1.5, color: '#666', margin: '0 0 12px' }
const BODY: React.CSSProperties = { fontSize: 13, color: '#aaa', lineHeight: 1.7, margin: '0 0 10px', maxWidth: 760 }
const TH: React.CSSProperties = {
  fontFamily: MONO, fontSize: 9, letterSpacing: 1, color: '#555', fontWeight: 400,
  textAlign: 'left', padding: '0 16px 10px 0', verticalAlign: 'bottom',
}
const TD: React.CSSProperties = {
  fontSize: 12, color: '#aaa', lineHeight: 1.6, padding: '12px 16px 12px 0',
  borderTop: '0.5px solid #141414', verticalAlign: 'top',
}

function seasonsList(seasons: number[]): string {
  if (seasons.length === 0) return ''
  const runs: string[] = []
  let start = seasons[0]
  let prev = seasons[0]
  for (const s of [...seasons.slice(1), Number.NaN]) {
    if (s === prev + 1) { prev = s; continue }
    runs.push(start === prev ? String(start) : `${start}–${prev}`)
    start = s
    prev = s
  }
  return runs.join(', ')
}

function skipReason(detail: string): string {
  const dry = detail.match(/^only (\d+) drivers with dry push laps/)
  if (dry) return dry[1] === '0' ? 'wet' : `mixed conditions, ${dry[1]} drivers on dry tyres`
  if (detail === 'no laps') return 'no lap data in the public feed'
  return detail
}

function Block({ title, first, children }: { title: string; first?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ padding: '24px 0', borderTop: first ? 'none' : '0.5px solid #1a1a1a' }}>
      <p style={SUBHEAD}>{title}</p>
      {children}
    </div>
  )
}

export default function SignatureMethodology({ reference, eraId, entityHex }: {
  reference: SignatureReference; eraId: string; entityHex: string
}) {
  const { quali, race, scoring } = reference.methodology
  const titles = new Map<string, number[]>()
  reference.champions.forEach((c) => titles.set(c.name, [...(titles.get(c.name) ?? []), c.season]))
  const firstSeason = Math.min(...reference.seasons)

  return (
    <section id="method" style={{ padding: '0 1.75rem 3rem', scrollMarginTop: 24 }}>
      <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: SERIES_HEX, margin: 0 }}>HOW THIS IS CALCULATED</p>
      <p style={{ fontSize: 13, color: '#888', margin: '6px 0 20px', maxWidth: 620, lineHeight: 1.6 }}>
        The definitions behind every number on this page. The full specification lives with the pipeline code
        (backend/pipeline/signature/SPEC.md).
      </p>

      <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, padding: '4px 28px 8px' }}>
        <Block title="REGULATION ERAS" first>
          <p style={BODY}>
            An era is a period under one set of technical rules. When the rules change, every car brakes, turns and
            wears its tyres differently, so a driver&apos;s style relative to the field can shift too. Signatures are
            therefore computed separately for each era, and the driver page shows the most recent era with at least one
            scored axis. These eras are defined by the car rules, separate from the storytelling eras elsewhere on the site.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ ...TH, width: '18%' }}>ERA</th>
                  <th style={TH}>WHAT DEFINES IT</th>
                  <th style={{ ...TH, width: '24%' }}>DATA IN THIS DATASET</th>
                </tr>
              </thead>
              <tbody>
                {reference.eras.map((era) => {
                  const current = era.id === eraId
                  return (
                    <tr key={era.id}>
                      <td style={{ ...TD, borderLeft: current ? `2px solid ${entityHex}` : '2px solid transparent', padding: '12px 16px 12px 10px' }}>
                        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 1, color: current ? '#fff' : '#ccc' }}>
                          {era.label.toUpperCase()}
                        </div>
                        <div style={{ fontFamily: MONO, fontSize: 9, color: '#666', marginTop: 4 }}>{era.span}</div>
                        {current && <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: 1, color: entityHex, marginTop: 6 }}>THIS PAGE</div>}
                      </td>
                      <td style={TD}>
                        {era.rules}
                        {era.caveat && <div style={{ color: '#666', marginTop: 6 }}>{era.caveat}</div>}
                      </td>
                      <td style={TD}>
                        {era.seasonsCovered.length > 0 ? (
                          <>
                            <div style={{ color: '#ddd' }}>{seasonsList(era.seasonsCovered)}</div>
                            <div style={{ color: '#666' }}>{era.scoredDriverEras} drivers scored</div>
                          </>
                        ) : (
                          <div style={{ color: '#777' }}>No data yet</div>
                        )}
                        {era.seasonsMissing.length > 0 && (
                          <div style={{ color: '#666', marginTop: 4 }}>
                            Not covered: {seasonsList(era.seasonsMissing)}. Official timing data is public from {firstSeason};
                            earlier seasons need F1 TV access or onboard video.
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Block>

        <Block title="THE FIELD">
          <p style={BODY}>
            Every measurement is a difference from the other cars in the same session. Comparing within a session cancels
            out the track, the weather, the tyre generation and the overall speed of that year&apos;s cars, which is what
            makes different weekends comparable. For each corner, or each race, the driver&apos;s value has the field
            median subtracted and is divided by the field&apos;s spread (a robust z-score, capped at ±{scoring.zClip}).
            A value of +1 means one typical field spread better than the median driver.
          </p>
        </Block>

        <Block title="FROM LAPS TO A SCORE">
          <ol style={{ ...BODY, paddingLeft: 18, margin: 0 }}>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: '#ddd', fontWeight: 500 }}>Pick the laps.</strong> Qualifying: up to {quali.lapsPerDriver} push
              laps per driver, within {quali.personalCutoffPct}% of their own best and {quali.sessionCutoffPct}% of the fastest lap,
              on dry tyres, not deleted for track limits and not run under red or yellow flags. Race: clean laps only, meaning
              not lap 1, no pit laps, no safety car, virtual safety car, red or yellow flag, dry tyres, at
              least {race.minGapAheadS} s behind the car ahead, and within {race.stintPaceCutoffPct}% of the driver&apos;s stint median.
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: '#ddd', fontWeight: 500 }}>Measure.</strong> Corners are the slowest points of the
              session&apos;s fastest lap (dips of at least {quali.cornerProminenceKmh} km/h). Every lap is mapped onto that
              lap&apos;s line, so all drivers&apos; brake points and apexes share one distance scale. Full throttle means
              {' '}{quali.fullThrottlePct}% pedal or more, and a lift is a drop of {quali.throttleLiftPct} points. In the race, each
              stint&apos;s lap times are corrected for fuel ({race.fuelEffectSPerLap} s per lap of fuel still on board) and fitted
              against tyre age: the slope is degradation (at least {race.minLapsDegradation} clean laps), and the scatter
              around the line is consistency (at least {race.minLapsConsistency}).
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: '#ddd', fontWeight: 500 }}>Compare with the field.</strong> Each corner needs at
              least {quali.minFieldLapsPerCorner} field laps; tyre degradation is compared on the same compound when at
              least {race.minCompoundStints} stints used it.
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: '#ddd', fontWeight: 500 }}>Combine over the era.</strong> A weighted average of the
              session values. An axis is only scored with at least {scoring.minQualiSessions} qualifying sessions
              and {scoring.minQualiSamples} lap-corners, or {scoring.minRaceSessions} races and {scoring.minRaceStints} stints;
              otherwise it stays empty rather than guessed.
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: '#ddd', fontWeight: 500 }}>Rank.</strong> The 0–100 score is the driver-era&apos;s
              percentile among every driver-era in the dataset, so 50 is typical.
            </li>
            <li>
              <strong style={{ color: '#ddd', fontWeight: 500 }}>Confidence.</strong> The driver&apos;s sessions are
              resampled {scoring.bootstrapN} times and re-ranked. The 90% range runs from the 5th to the 95th percentile of
              those ranks, and confidence is 1 minus the average width of the ranges.
            </li>
          </ol>
        </Block>

        <Block title="COMPARISON GROUPS">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '14px 32px' }}>
            {COHORT_ORDER.map((key) => (
              <div key={key}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 1, color: '#ddd', marginBottom: 4 }}>{COHORT_COPY[key].pill}</div>
                <p style={{ ...BODY, margin: 0 }}>
                  {COHORT_COPY[key].description}
                  {key === 'champions' && titles.size > 0 && (
                    <> In the dataset: {[...titles.entries()].map(([n, s]) => `${n} (${s.join(', ')})`).join(', ')}.</>
                  )}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="AXES">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ ...TH, width: '18%' }}>AXIS</th>
                  <th style={TH}>MEASURES</th>
                  <th style={TH}>HIGHER MEANS</th>
                  <th style={{ ...TH, width: '20%' }}>DATA</th>
                </tr>
              </thead>
              <tbody>
                {reference.axes.map((axis) => (
                  <tr key={axis}>
                    <td style={{ ...TD, fontFamily: MONO, fontSize: 10, letterSpacing: 1, color: '#ddd' }}>{axis.toUpperCase()}</td>
                    <td style={TD}>{AXIS_COPY[axis]?.measures}</td>
                    <td style={TD}>{AXIS_COPY[axis]?.higher}</td>
                    <td style={{ ...TD, fontFamily: MONO, fontSize: 9, color: '#666' }}>{AXIS_COPY[axis] && BASIS_LABEL[AXIS_COPY[axis].basis]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>

        <Block title="DATA AND COVERAGE">
          <p style={BODY}>
            Source: the official F1 live-timing feed, read through the OpenF1 historical API: car data (speed, throttle,
            brake on/off, gear) about 3.7 times a second, car positions, laps, tyre stints, gaps and race-control messages.
            It does not carry steering angle or brake pressure. {reference.sessions.quali} qualifying sessions
            and {reference.sessions.race} races are scored.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={TH}>SEASON</th>
                  <th style={TH}>WEEKENDS</th>
                  <th style={TH}>QUALIFYING</th>
                  <th style={TH}>RACES</th>
                  <th style={TH}>NOT SCORED</th>
                </tr>
              </thead>
              <tbody>
                {reference.coverage.map((c) => (
                  <tr key={c.season}>
                    <td style={{ ...TD, fontFamily: MONO, color: '#ddd' }}>{c.season}</td>
                    <td style={TD}>{c.weekends}{c.pending > 0 && <span style={{ color: '#666' }}> (+{c.pending} still to run)</span>}</td>
                    <td style={TD}>{c.qualiOk}/{c.weekends}</td>
                    <td style={TD}>{c.raceOk}/{c.weekends}</td>
                    <td style={TD}>
                      {c.skipped.length === 0 ? '—' : c.skipped.map((s) => (
                        <div key={`${s.round}-${s.part}`}>
                          {s.meeting.replace(' Grand Prix', '')} {s.part === 'quali' ? 'qualifying' : 'race'}: {skipReason(s.detail)}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>

        <Block title="KNOWN LIMITATIONS">
          <ul style={{ ...BODY, paddingLeft: 18, margin: 0 }}>
            <li style={{ marginBottom: 6 }}>
              The field includes faster and slower cars, so a driver in a quick car scores higher on car-sensitive
              measures such as minimum corner speed. The teammate comparison is where the car is held constant.
            </li>
            <li style={{ marginBottom: 6 }}>
              The braking point is not adjusted for approach speed: a driver who exits the previous corner faster arrives
              quicker and has to brake earlier. Braking describes style more than pace.
            </li>
            <li style={{ marginBottom: 6 }}>
              Tyre management cannot tell tyre wear apart from a driver deliberately controlling pace, so its ranges are wide.
            </li>
            <li style={{ marginBottom: 6 }}>
              From 2026, throttle and braking traces also reflect energy recovery (lifting before braking, harvesting at
              full throttle), not only driving style.
            </li>
            <li>
              Steering smoothness needs steering angle, which no public feed carries. It is never estimated and will come
              from onboard video, along with seasons before {firstSeason}.
            </li>
          </ul>
        </Block>
      </div>
    </section>
  )
}
