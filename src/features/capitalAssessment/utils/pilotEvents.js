const EVENT_NAMES = new Set([
  'capital_assessment_viewed',
  'capital_assessment_started',
  'capital_assessment_resumed',
  'capital_assessment_question_progress',
  'capital_assessment_layer_reached',
  'capital_assessment_completed',
  'capital_assessment_result_viewed',
  'capital_assessment_retake_started',
])

const ALLOWED_PROPERTIES = new Set(['questionBucket', 'layer'])
let eventSink = null

export function configureCapitalAssessmentAnalytics(sink) {
  eventSink = typeof sink === 'function' ? sink : null
}

export function trackCapitalAssessmentEvent(name, properties = {}) {
  if (!EVENT_NAMES.has(name) || !eventSink) return false
  const safeProperties = Object.fromEntries(
    Object.entries(properties).filter(([key, value]) =>
      ALLOWED_PROPERTIES.has(key) && typeof value === 'string'),
  )
  try {
    eventSink(name, safeProperties)
    return true
  } catch {
    return false
  }
}

export function questionProgressBucket(questionNumber) {
  const safeNumber = Math.max(1, Math.min(30, Number(questionNumber) || 1))
  const start = Math.floor((safeNumber - 1) / 5) * 5 + 1
  return `${start}-${Math.min(start + 4, 30)}`
}
