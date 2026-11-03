import type { DrivingSignature } from '@/lib/types'

interface Props {
  signature: DrivingSignature
  entityColor: string // resolved hex, e.g. "#1E3A8A"
  comparison?: (number | null)[] // dashed comparison polygon; defaults to signature.cohortAverage
}

const R = 140 // outer ring radius
const CX = 170 // center x
const CY = 170 // center y
const R_LABEL = 158 // label placement radius

function polarPoint(value: number, axisIndex: number, radius: number = R): [number, number] {
  const theta = (axisIndex * 60 - 90) * (Math.PI / 180)
  const r = (value / 100) * radius
  return [CX + r * Math.cos(theta), CY + r * Math.sin(theta)]
}

function hexPoints(radius: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const [x, y] = polarPoint(100, i, radius)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

// Null axes are skipped, so the polygon joins the measured neighbours directly.
function dataPoints(values: (number | null)[]): string | null {
  const points = values.flatMap((v, i) => (v === null ? [] : [polarPoint(v, i)]))
  if (points.length < 3) return null
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
}

function labelAnchor(axisIndex: number): 'middle' | 'start' | 'end' {
  if (axisIndex === 0 || axisIndex === 3) return 'middle'
  if (axisIndex === 1 || axisIndex === 2) return 'start'
  return 'end'
}

type DominantBaseline = 'auto' | 'middle' | 'hanging'
function labelBaseline(axisIndex: number): DominantBaseline {
  if (axisIndex === 0) return 'auto'
  if (axisIndex === 3) return 'hanging'
  return 'middle'
}

export default function RadarChart({ signature, entityColor, comparison }: Props) {
  const driverValues = signature.axes.map((a) => a.value)
  const cohortPoints = dataPoints(comparison ?? signature.cohortAverage)
  const driverPoints = dataPoints(driverValues)

  return (
    <svg
      viewBox="-65 -20 470 372"
      style={{ width: '100%', maxWidth: 580, height: 'auto' }}
      role="img"
      aria-label={`Driving signature radar chart`}
    >
      {/* Concentric ring grid */}
      {[R, R * 0.75, R * 0.5, R * 0.25].map((r, i) => (
        <polygon
          key={i}
          points={hexPoints(r)}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={0.5}
        />
      ))}

      {/* Spokes */}
      {Array.from({ length: 6 }, (_, i) => {
        const [x, y] = polarPoint(100, i)
        return (
          <line
            key={i}
            x1={CX} y1={CY}
            x2={x.toFixed(1)} y2={y.toFixed(1)}
            stroke="#222"
            strokeWidth={0.5}
          />
        )
      })}

      {/* Cohort average polygon (dashed gray) */}
      {cohortPoints && (
        <polygon
          points={cohortPoints}
          fill="#444"
          fillOpacity={0.15}
          stroke="#555"
          strokeWidth={0.5}
          strokeDasharray="2,2"
        />
      )}

      {/* Driver polygon */}
      {driverPoints && (
        <polygon
          points={driverPoints}
          fill={entityColor}
          fillOpacity={0.18}
          stroke={entityColor}
          strokeWidth={1.5}
        />
      )}

      {/* Pending axes: dashed spoke with a hollow end marker, no value */}
      {driverValues.map((v, i) => {
        if (v !== null) return null
        const [x, y] = polarPoint(100, i)
        return (
          <g key={`pending-${i}`}>
            <line
              x1={CX} y1={CY}
              x2={x.toFixed(1)} y2={y.toFixed(1)}
              stroke={entityColor}
              strokeOpacity={0.45}
              strokeWidth={1}
              strokeDasharray="3,3"
            />
            <circle cx={x.toFixed(1)} cy={y.toFixed(1)} r={3} fill="#000" stroke={entityColor} strokeWidth={1} />
          </g>
        )
      })}

      {/* Vertex dots */}
      {driverValues.map((v, i) => {
        if (v === null) return null
        const [x, y] = polarPoint(v, i)
        return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={3} fill={entityColor} />
      })}

      {/* Axis labels */}
      {signature.axes.map((axis, i) => {
        const theta = (i * 60 - 90) * (Math.PI / 180)
        // Push labels a bit further than R_LABEL for top/bottom axes to clear the polygon
        const r = i === 0 ? R_LABEL + 6 : i === 3 ? R_LABEL + 8 : R_LABEL - 2
        const x = CX + r * Math.cos(theta)
        const y = CY + r * Math.sin(theta)
        // Split long labels to two tspan lines for the top axis
        const words = axis.label.toUpperCase().split(' ')
        const needsSplit = words.length > 1 && i === 0
        // "PENDING" tag sits between the label and the outer ring
        const pendingY = i === 0 ? y + 16 : i === 3 ? y - 9 : y + 11
        return (
          <g key={i}>
            <text
              x={x.toFixed(1)}
              y={y.toFixed(1)}
              textAnchor={labelAnchor(i)}
              dominantBaseline={labelBaseline(i)}
              fontFamily="monospace"
              fontSize={9}
              fill={axis.value === null ? '#555' : '#888'}
              letterSpacing={0.5}
            >
              {needsSplit ? (
                <>
                  <tspan x={x.toFixed(1)} dy="-0.6em">{words.slice(0, Math.ceil(words.length / 2)).join(' ')}</tspan>
                  <tspan x={x.toFixed(1)} dy="1.2em">{words.slice(Math.ceil(words.length / 2)).join(' ')}</tspan>
                </>
              ) : (
                axis.label.toUpperCase()
              )}
            </text>
            {axis.value === null && (
              <text
                x={x.toFixed(1)}
                y={pendingY.toFixed(1)}
                textAnchor={labelAnchor(i)}
                dominantBaseline="middle"
                fontFamily="monospace"
                fontSize={7}
                fill={entityColor}
                fillOpacity={0.7}
                letterSpacing={1}
              >
                PENDING
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
