export const JOURNEY_STEP_COUNT = 8

export function canAdvanceJourney(step, { openingChoice, judgmentChoice }) {
  if (step === 0) return Boolean(openingChoice)
  if (step === 2) return Boolean(judgmentChoice)
  return step >= 0 && step < JOURNEY_STEP_COUNT - 1
}

export function getNextJourneyStep(step, state) {
  return canAdvanceJourney(step, state) ? Math.min(JOURNEY_STEP_COUNT - 1, step + 1) : step
}
