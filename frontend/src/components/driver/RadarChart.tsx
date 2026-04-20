import type { DrivingSignature } from '@/lib/types'

interface Props {
  signature: DrivingSignature
  entityColor: string // resolved hex, e.g. "#1E3A8A"
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

function dataPoints(values: number[]): string {
  return values.map((v, i) => {
    const [x, y] = polarPoint(v, i)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
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

export default function RadarChart({ signature, entityColor }: Props) {
  const driverValues = signature.axes.map((a) => a.value)
  const cohortValues = signature.cohortAverage

  return (
    <svg
      viewBox="0 0 340 340"
      style={{ width: '100%', maxWidth: 420, height: 'auto' }}
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
      <polygon
        points={dataPoints(cohortValues)}
        fill="#444"
        fillOpacity={0.15}
        stroke="#555"
        strokeWidth={0.5}
        strokeDasharray="2,2"
      />

      {/* Driver polygon */}
      <polygon
        points={dataPoints(driverValues)}
        fill={entityColor}
        fillOpacity={0.18}
        stroke={entityColor}
        strokeWidth={1.5}
      />

      {/* Vertex dots */}
      {driverValues.map((v, i) => {
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
        return (
          <text
            key={i}
            x={x.toFixed(1)}
            y={y.toFixed(1)}
            textAnchor={labelAnchor(i)}
            dominantBaseline={labelBaseline(i)}
            fontFamily="monospace"
            fontSize={9}
            fill="#888"
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
        )
      })}
    </svg>
  )
}
