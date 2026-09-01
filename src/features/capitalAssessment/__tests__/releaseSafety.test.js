import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ASSESSMENT_STORAGE_KEY, ASSESSMENT_VERSION, SCORING_VERSION,
  calculateAssessmentResult,
  configureCapitalAssessmentAnalytics, loadAssessmentProgress,
  questionProgressBucket, saveAssessmentProgress, trackCapitalAssessmentEvent,
} from '../index.js'

function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial))
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key) }
}

const completeAnswers = () => Object.fromEntries(Array.from({ length: 30 }, (_, index) => [`Q${index + 1}`, 'E']))
const stored = (overrides = {}) => ({
  assessmentVersion: ASSESSMENT_VERSION, scoringVersion: SCORING_VERSION,
  currentQuestion: 30, answers: completeAnswers(), startedAt: 'start', completedAt: 'complete',
  ...overrides,
})

test('incomplete completed progress is rejected and cleared before result recovery', () => {
  const invalid = stored({ answers: { Q1: 'E', Q30: 'E' } })
  const storage = memoryStorage({ [ASSESSMENT_STORAGE_KEY]: JSON.stringify(invalid) })
  assert.equal(loadAssessmentProgress(storage), null)
  assert.equal(storage.getItem(ASSESSMENT_STORAGE_KEY), null)
})

test('malformed stored answer IDs and values recover safely', () => {
  for (const answers of [{ Q31: 'A' }, { Q1: 'Z' }]) {
    const storage = memoryStorage({ [ASSESSMENT_STORAGE_KEY]: JSON.stringify(stored({ answers, completedAt: null })) })
    assert.equal(loadAssessmentProgress(storage), null)
  }
})

test('valid completed progress remains available for deterministic refresh recovery', () => {
  const progress = stored()
  const storage = memoryStorage()
  assert.equal(saveAssessmentProgress(progress, storage), true)
  assert.deepEqual(loadAssessmentProgress(storage), progress)
})

test('storage write failure preserves safe in-session fallback contract', () => {
  const unavailable = { getItem: () => null, setItem: () => { throw new Error('quota') }, removeItem: () => { throw new Error('blocked') } }
  assert.equal(saveAssessmentProgress(stored({ completedAt: null, currentQuestion: 1, answers: {} }), unavailable), false)
  assert.equal(loadAssessmentProgress(unavailable), null)
})

test('pilot analytics is no-op until explicitly connected', () => {
  configureCapitalAssessmentAnalytics(null)
  assert.equal(trackCapitalAssessmentEvent('capital_assessment_started'), false)
})

test('pilot analytics strips raw answers and diagnostic properties', () => {
  const events = []
  configureCapitalAssessmentAnalytics((name, properties) => events.push({ name, properties }))
  assert.equal(trackCapitalAssessmentEvent('capital_assessment_question_progress', {
    questionBucket: '1-5', layer: 'survival', answer: 'A', Q1: 'A',
    tags: ['acute_liquidity_risk'], riskProfile: 'elevated', localStorage: 'raw',
  }), true)
  assert.deepEqual(events, [{ name: 'capital_assessment_question_progress', properties: { questionBucket: '1-5', layer: 'survival' } }])
  configureCapitalAssessmentAnalytics(null)
})

test('unknown analytics events and non-string properties are rejected', () => {
  const events = []
  configureCapitalAssessmentAnalytics((name, properties) => events.push({ name, properties }))
  assert.equal(trackCapitalAssessmentEvent('raw_answer_submitted', { answer: 'A' }), false)
  trackCapitalAssessmentEvent('capital_assessment_layer_reached', { layer: ['survival'] })
  assert.deepEqual(events, [{ name: 'capital_assessment_layer_reached', properties: {} }])
  configureCapitalAssessmentAnalytics(null)
})

test('question progress uses five-question buckets only', () => {
  assert.equal(questionProgressBucket(1), '1-5')
  assert.equal(questionProgressBucket(6), '6-10')
  assert.equal(questionProgressBucket(30), '26-30')
  assert.equal(questionProgressBucket(500), '26-30')
})

test('invalid and incomplete result inputs remain deterministic and non-throwing', () => {
  for (const input of [null, [], { Q1: 'Z' }, { missing_question: 'A' }, { Q30: 'E' }]) {
    assert.doesNotThrow(() => calculateAssessmentResult(input))
    assert.deepEqual(calculateAssessmentResult(input), calculateAssessmentResult(input))
  }
})
