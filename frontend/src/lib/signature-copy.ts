import type { SignatureCohortKey } from './types'

// Shared wording for the driver-page signature module and the full metrics page.
// Definitions must match backend/pipeline/signature/SPEC.md.

export const COHORT_ORDER: SignatureCohortKey[] = ['era', 'allTime', 'champions', 'teammates']

export const COHORT_COPY: Record<SignatureCohortKey, { pill: string; description: string }> = {
  era: {
    pill: 'ERA AVG',
    description: 'The average of every driver scored in the same regulation era. It sits close to 50 on every axis: a typical driver.',
  },
  allTime: {
    pill: 'ALL-TIME',
    description: 'The average of every driver-era in the dataset. Scores are ranks among those same driver-eras, so it sits at 50 on every axis by construction.',
  },
  champions: {
    pill: 'CHAMPIONS',
    description: 'World champions in the eras they won their titles, from the final standings of completed seasons.',
  },
  teammates: {
    pill: 'TEAMMATES',
    description: "The driver's teammates in this era, weighted by sessions shared. Same car, so this is the fairest comparison.",
  },
}

export type AxisBasis = 'quali' | 'race' | 'vision'

export const AXIS_COPY: Record<string, { measures: string; higher: string; basis: AxisBasis }> = {
  'Braking': {
    measures: 'Where the driver starts braking for each corner, and how long the braking zone lasts.',
    higher: 'Brakes later and over a shorter distance than the field.',
    basis: 'quali',
  },
  'Entry Aggression': {
    measures: 'Speed as the driver comes off the brake, and the minimum speed through the corner.',
    higher: 'Carries more speed off the brake and through the slowest point.',
    basis: 'quali',
  },
  'Throttle Application': {
    measures: 'Distance from the slowest point of the corner to full throttle, and the number of throttle lifts in between.',
    higher: 'Reaches full throttle sooner after the apex, with fewer lifts.',
    basis: 'quali',
  },
  'Consistency': {
    measures: 'How much clean lap times vary within a stint once the tyre-wear trend is removed.',
    higher: 'Smaller lap-to-lap variation than the field in the same race.',
    basis: 'race',
  },
  'Tyre Management': {
    measures: 'How fast lap times drop off as the tyres age, corrected for fuel load.',
    higher: 'Loses less time per lap of tyre age than the field on the same compound.',
    basis: 'race',
  },
  'Steering Smoothness': {
    measures: 'How smoothly the driver steers through each corner.',
    higher: 'Not measured yet. No public feed carries steering angle; it will come from onboard video.',
    basis: 'vision',
  },
}

export const BASIS_LABEL: Record<AxisBasis, string> = {
  quali: 'QUALIFYING PUSH LAPS · CORNER BY CORNER',
  race: 'CLEAN RACE LAPS · PER STINT',
  vision: 'NEEDS ONBOARD VIDEO',
}
