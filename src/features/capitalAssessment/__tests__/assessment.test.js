import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ASSESSMENT_STORAGE_KEY, calculateAssessmentResult, clearAssessmentProgress,
  loadAssessmentProgress, saveAssessmentProgress, assessmentQuestions, applyLayerOverrides,
  ASSESSMENT_VERSION, SCORING_VERSION,
} from '../index.js'
import { countAnswered, createFreshProgress } from '../hooks/useCapitalAssessment.js'
import { createCapitalMapViewModel, RISK_COPY } from '../data/resultPresentation.js'

const answersWith = (choice = 'E') => Object.fromEntries(Array.from({ length: 30 }, (_, i) => [`Q${i + 1}`, choice]))

test('all solid uses the all-solid next-dollar result', () => {
  const result = calculateAssessmentResult(answersWith())
  assert.ok(result.layers.every((layer) => layer.status === 'solid'))
  assert.equal(result.primaryPosition, null)
  assert.equal(result.nextDollar.action, 'Optimize & Create Optionality')
})

test('one critical tag downgrades a numerically solid layer', () => {
  const answers = answersWith()
  answers.Q1 = 'A'
  const survival = calculateAssessmentResult(answers).layers[0]
  assert.equal(survival.average, 4.2)
  assert.equal(survival.preliminaryStatus, 'solid')
  assert.equal(survival.status, 'developing')
})

test('two critical tags in one layer force needs attention', () => {
  const answers = answersWith()
  answers.Q1 = answers.Q2 = 'A'
  assert.equal(calculateAssessmentResult(answers).layers[0].status, 'needs_attention')
})

test('three moderate tags downgrade an otherwise solid layer', () => {
  assert.equal(applyLayerOverrides('solid', 0, 3), 'developing')
})

test('primary position follows ladder order, not lowest score', () => {
  const answers = answersWith()
  answers.Q11 = 'A'
  answers.Q18 = answers.Q20 = 'A'
  const result = calculateAssessmentResult(answers)
  assert.equal(result.layers[2].status, 'developing')
  assert.equal(result.layers[3].status, 'needs_attention')
  assert.deepEqual(result.primaryPosition, { layer: 'protection', status: 'developing' })
})

test('not applicable is excluded from average and denominator', () => {
  const answers = answersWith()
  answers.Q1 = 'F'
  const survival = calculateAssessmentResult(answers).layers[0]
  assert.equal(survival.average, 5)
  assert.equal(survival.status, 'solid')
})

test('Q29 changes legacy orientation but never the layer score or status', () => {
  const first = answersWith(); first.Q29 = 'A'
  const second = { ...first, Q29: 'E' }
  const resultA = calculateAssessmentResult(first)
  const resultE = calculateAssessmentResult(second)
  assert.notEqual(resultA.legacyOrientation, resultE.legacyOrientation)
  assert.equal(resultA.layers[5].average, resultE.layers[5].average)
  assert.equal(resultA.layers[5].status, resultE.layers[5].status)
})

test('extreme concentration creates a concentrated risk shape', () => {
  const answers = answersWith(); answers.Q18 = 'A'
  assert.equal(calculateAssessmentResult(answers).riskProfile, 'concentrated')
})

test('temperament returns a hybrid when top scores differ by at most one', () => {
  const answers = answersWith()
  for (const id of ['Q16', 'Q18', 'Q20', 'Q21', 'Q22', 'Q24', 'Q25', 'Q30']) answers[id] = 'F'
  assert.equal(calculateAssessmentResult(answers).temperament.hybrid, true)
})

test('the engine is reproducible', () => {
  const answers = answersWith('C')
  assert.deepEqual(calculateAssessmentResult(answers), calculateAssessmentResult(answers))
})

function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial))
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key) }
}

test('malformed storage safely falls back and clears invalid data', () => {
  const storage = memoryStorage({ [ASSESSMENT_STORAGE_KEY]: '{broken' })
  assert.equal(loadAssessmentProgress(storage), null)
  assert.equal(storage.getItem(ASSESSMENT_STORAGE_KEY), null)
})

test('incompatible stored versions are rejected safely', () => {
  const storage = memoryStorage({ [ASSESSMENT_STORAGE_KEY]: JSON.stringify({ assessmentVersion: '1.0', scoringVersion: '1.0', currentQuestion: 1, answers: { Q1: 'A' }, startedAt: 'now', completedAt: null }) })
  assert.equal(loadAssessmentProgress(storage), null)
  assert.equal(storage.getItem(ASSESSMENT_STORAGE_KEY), null)
  assert.equal(ASSESSMENT_VERSION, '1.1')
  assert.equal(SCORING_VERSION, '1.0')
})

test('valid raw progress round-trips and can be cleared', () => {
  const storage = memoryStorage()
  const progress = { currentQuestion: 12, answers: { Q1: 'D', Q2: 'E' }, startedAt: '2026-08-24T00:00:00.000Z', completedAt: null }
  assert.equal(saveAssessmentProgress(progress, storage), true)
  assert.deepEqual(loadAssessmentProgress(storage).answers, progress.answers)
  assert.equal(clearAssessmentProgress(storage), true)
  assert.equal(loadAssessmentProgress(storage), null)
})

test('fresh UI progress starts at Q1 without derived result state', () => {
  assert.deepEqual(createFreshProgress('now'), {
    currentQuestion: 1, answers: {}, startedAt: 'now', completedAt: null,
  })
  assert.equal(countAnswered({ Q1: 'D', Q2: 'F' }), 2)
})

test('approved question bank is complete, unique, and contains no temporary copy markers', () => {
  assert.equal(assessmentQuestions.length, 30)
  assert.deepEqual(assessmentQuestions.map((question) => question.id), Array.from({ length: 30 }, (_, index) => `Q${index + 1}`))
  const userCopy = assessmentQuestions.flatMap((question) => [
    question.question, question.questionZh, question.insight, question.insightZh,
    ...question.options.flatMap((option) => [option.text, option.textZh]),
  ]).join(' ')
  const temporaryMarker = new RegExp([
    ['place', 'holder'], ['pen', 'ding'], ['TO', 'DO'], ['T', 'BD'], ['approved copy', ' unavailable'],
  ].map((parts) => parts.join('')).join('|'), 'i')
  assert.doesNotMatch(userCopy, temporaryMarker)
})

test('every question and scoring option has normalized approved content', () => {
  assessmentQuestions.forEach((question, index) => {
    assert.equal(question.order, index + 1)
    assert.ok(question.layer && question.question && question.questionZh && question.insight && question.insightZh)
    assert.ok(question.options.length >= 5)
    question.options.forEach((option) => {
      assert.ok(option.id && option.text && option.textZh && Array.isArray(option.tags))
      if (question.profileOnly || option.id === 'F') {
        assert.equal(option.score, null)
        assert.equal(option.excludedFromAverage, true)
      } else assert.ok(Number.isInteger(option.score) && option.score >= 1 && option.score <= 5)
    })
  })
  assert.equal(assessmentQuestions[28].profileOnly, true)
})

test('every approved answer and diagnostic tag passes safely through the result engine', () => {
  const baseline = answersWith()
  assessmentQuestions.forEach((question) => question.options.forEach((option) => {
    const result = calculateAssessmentResult({ ...baseline, [question.id]: option.id })
    assert.equal(result.assessmentVersion, '1.1')
    assert.ok(Array.isArray(result.tags) && Array.isArray(result.priorityTags) && Array.isArray(result.worthExploring))
    result.worthExploring.forEach((topic) => assert.ok(topic.title && topic.titleZh && topic.question && topic.questionZh))
  }))
})

test('Capital Map presentation includes six layers, primary position, next dollar, and six dimensions', () => {
  const answers = answersWith(); answers.Q1 = answers.Q2 = 'A'
  const result = calculateAssessmentResult(answers)
  const view = createCapitalMapViewModel(result)
  assert.equal(view.layers.length, 6)
  assert.equal(view.primaryLayer.id, 'survival')
  assert.equal(view.layers[0].status.label, 'Needs Attention')
  assert.equal(view.nextDollar.action, 'Stabilize')
  assert.equal(view.structure.length, 6)
  assert.ok(RISK_COPY[result.riskProfile])
})

test('Capital Map presentation handles all-solid and concentrated cases without raw engine fields', () => {
  const allSolid = createCapitalMapViewModel(calculateAssessmentResult(answersWith()))
  assert.equal(allSolid.primaryLayer, null)
  assert.equal(allSolid.nextDollar.action, 'Optimize & Create Optionality')
  const concentratedAnswers = answersWith(); concentratedAnswers.Q18 = 'A'; concentratedAnswers.Q29 = 'D'
  const concentrated = createCapitalMapViewModel(calculateAssessmentResult(concentratedAnswers))
  assert.equal(concentrated.risk.label, 'Concentrated')
  assert.match(concentrated.risk.en, /small number of assets/i)
  assert.ok(concentrated.legacy.en)
  assert.doesNotMatch(concentrated.legacy.en, /legacy_values_focused/)
  assert.ok(concentrated.topics.length <= 3)
  assert.doesNotMatch(JSON.stringify(concentrated), /"average"|"criticalCount"|"moderateCount"|acute_liquidity_risk/)
})

test('Capital Map temperament presentation supports a bilingual hybrid', () => {
  const answers = answersWith()
  for (const id of ['Q16', 'Q18', 'Q20', 'Q21', 'Q22', 'Q24', 'Q25', 'Q30']) answers[id] = 'F'
  const view = createCapitalMapViewModel(calculateAssessmentResult(answers))
  assert.equal(view.temperament.hybrid, true)
  assert.ok(view.temperament.primary.label && view.temperament.primary.labelZh)
  assert.ok(view.temperament.secondary.label && view.temperament.secondary.labelZh)
})
