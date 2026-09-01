import { ASSESSMENT_VERSION, SCORING_VERSION } from '../data/config.js'
import { QUESTIONS_BY_ID } from '../data/questions.js'

export const ASSESSMENT_STORAGE_KEY = 'onyx-capital-priority-assessment-v1'

function validAnswers(answers) {
  return answers && typeof answers === 'object' && !Array.isArray(answers) &&
    Object.entries(answers).every(([questionId, optionId]) =>
      QUESTIONS_BY_ID[questionId]?.options.some((option) => option.id === optionId))
}

export function validateStoredProgress(value) {
  const structurallyValid = Boolean(value && typeof value === 'object' &&
    value.assessmentVersion === ASSESSMENT_VERSION && value.scoringVersion === SCORING_VERSION &&
    Number.isInteger(value.currentQuestion) && value.currentQuestion >= 1 && value.currentQuestion <= 30 &&
    validAnswers(value.answers) && typeof value.startedAt === 'string' &&
    (value.completedAt === null || typeof value.completedAt === 'string'))
  if (!structurallyValid) return false
  if (value.completedAt !== null) {
    return Object.keys(QUESTIONS_BY_ID).every((questionId) => Boolean(value.answers[questionId]))
  }
  return true
}

export function saveAssessmentProgress(progress, storage = globalThis.localStorage) {
  const normalized = {
    assessmentVersion: ASSESSMENT_VERSION, scoringVersion: SCORING_VERSION,
    currentQuestion: progress.currentQuestion, answers: progress.answers,
    startedAt: progress.startedAt, completedAt: progress.completedAt ?? null,
  }
  if (!validateStoredProgress(normalized)) return false
  try { storage?.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(normalized)); return true } catch { return false }
}

export function loadAssessmentProgress(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(ASSESSMENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!validateStoredProgress(parsed)) { storage?.removeItem(ASSESSMENT_STORAGE_KEY); return null }
    return parsed
  } catch {
    try { storage?.removeItem(ASSESSMENT_STORAGE_KEY) } catch { /* storage may be unavailable */ }
    return null
  }
}

export function clearAssessmentProgress(storage = globalThis.localStorage) {
  try { storage?.removeItem(ASSESSMENT_STORAGE_KEY); return true } catch { return false }
}
