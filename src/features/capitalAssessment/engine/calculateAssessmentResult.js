import {
  ALL_SOLID_NEXT_DOLLAR, ASSESSMENT_VERSION, CAPITAL_LAYERS, CRITICAL_TAGS,
  LEGACY_ORIENTATION_MAP, MODERATE_TAGS, NEXT_DOLLAR_MAP, SCORE_THRESHOLDS,
  SCORING_VERSION, STRUCTURE_THRESHOLDS,
} from '../data/config.js'
import { assessmentQuestions, QUESTIONS_BY_ID } from '../data/questions.js'
import { TOPIC_MAP } from '../data/topics.js'

const criticalSet = new Set(CRITICAL_TAGS)
const moderateSet = new Set(MODERATE_TAGS)
const temperamentOrder = ['capital_preserver', 'balanced_builder', 'growth_seeker', 'concentrated_operator', 'optionality_builder']

function collectAnswerRecords(answers) {
  return assessmentQuestions.flatMap((question) => {
    const option = question.options.find((candidate) => candidate.id === answers[question.id])
    return option ? [{ question, option }] : []
  })
}

function preliminaryStatus(average) {
  if (average >= SCORE_THRESHOLDS.solid) return 'solid'
  if (average >= SCORE_THRESHOLDS.developing) return 'developing'
  return 'needs_attention'
}

export function applyLayerOverrides(preliminary, criticalCount, moderateCount) {
  let status = preliminary
  if (criticalCount >= 2) status = 'needs_attention'
  else if (criticalCount === 1 && status === 'solid') status = 'developing'
  if (moderateCount >= 3 && status === 'solid') status = 'developing'
  return status
}

export function calculateLayers(answers) {
  const records = collectAnswerRecords(answers)
  return CAPITAL_LAYERS.map((layer) => {
    const layerRecords = records.filter(({ question }) => question.layer === layer.id)
    const valid = layerRecords.filter(({ question, option }) =>
      !question.profileOnly && !option.excludedFromAverage && Number.isFinite(option.score))
    const average = valid.length ? valid.reduce((sum, { option }) => sum + option.score, 0) / valid.length : null
    const tags = layerRecords.flatMap(({ option }) => option.tags).filter((tag) => !tag.startsWith('temperament_') && !tag.startsWith('legacy_orientation:'))
    const criticalCount = tags.filter((tag) => criticalSet.has(tag)).length
    const moderateCount = tags.filter((tag) => moderateSet.has(tag)).length
    const initial = preliminaryStatus(average)
    const status = applyLayerOverrides(initial, criticalCount, moderateCount)
    return { id: layer.id, average, preliminaryStatus: initial, status, criticalCount, moderateCount, tags }
  })
}

function averageFor(records, ids) {
  const values = records
    .filter(({ question, option }) => ids.includes(question.id) && !option.excludedFromAverage && Number.isFinite(option.score))
    .map(({ option }) => option.score)
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null
}

function structureStatus(average) {
  if (average === null) return 'developing'
  if (average >= STRUCTURE_THRESHOLDS.strong) return 'strong'
  if (average >= STRUCTURE_THRESHOLDS.adequate) return 'adequate'
  if (average >= STRUCTURE_THRESHOLDS.developing) return 'developing'
  return 'exposed'
}

export function calculateCapitalStructure(answers, tags = []) {
  const records = collectAnswerRecords(answers)
  const dimension = (ids) => ({ status: structureStatus(averageFor(records, ids)) })
  const liquidity = tags.includes('acute_liquidity_risk') ? { status: 'exposed' } : dimension(['Q1', 'Q2', 'Q6', 'Q9', 'Q10'])
  return {
    liquidity,
    protection: dimension(['Q5', 'Q11', 'Q12', 'Q13', 'Q14', 'Q15']),
    productiveAssets: dimension(['Q16', 'Q17', 'Q18', 'Q19', 'Q20']),
    debtExposure: dimension(['Q3', 'Q10', 'Q24']),
    taxStructure: dimension(['Q8', 'Q17', 'Q23']),
    incomeDiversification: { ...dimension(['Q1', 'Q7', 'Q12', 'Q18', 'Q30']), confidence: 'medium' },
  }
}

export function calculateRiskProfile(layers, tags) {
  if (tags.includes('extreme_concentration') || (tags.includes('high_concentration') && tags.includes('business_succession_gap'))) return 'concentrated'
  const critical = tags.filter((tag) => criticalSet.has(tag))
  const protection = layers.find((layer) => layer.id === 'protection')
  const liquidityWeak = layers.slice(0, 2).some((layer) => layer.status !== 'solid')
  if (critical.length >= 2 || (protection?.criticalCount > 0) ||
      (tags.includes('negative_cash_flow') && liquidityWeak) ||
      tags.includes('forced_sale_risk') || tags.includes('continuity_failure_risk')) return 'elevated'
  const foundationalWeak = layers.slice(0, 3).some((layer) => layer.status !== 'solid')
  if (critical.length || foundationalWeak || tags.some((tag) => moderateSet.has(tag))) return 'moderate'
  return 'low'
}

export function calculateTemperament(answers) {
  const scores = Object.fromEntries(temperamentOrder.map((id) => [id, 0]))
  collectAnswerRecords(answers).forEach(({ option }) => option.tags.forEach((tag) => {
    const match = tag.match(/^temperament_(.+):(1|2)$/)
    if (match && Object.hasOwn(scores, match[1])) scores[match[1]] += Number(match[2])
  }))
  const ranked = temperamentOrder.map((id) => ({ id, score: scores[id] }))
    .sort((a, b) => b.score - a.score || temperamentOrder.indexOf(a.id) - temperamentOrder.indexOf(b.id))
  return { primary: ranked[0].id, secondary: ranked[1].id, hybrid: ranked[0].score - ranked[1].score <= 1 }
}

export function selectPriorityTags(layers, limit = 4) {
  const entries = layers.flatMap((layer, layerIndex) => layer.tags.map((tag, tagIndex) => ({ tag, layerIndex, tagIndex })))
  return entries
    .filter(({ tag }) => criticalSet.has(tag) || moderateSet.has(tag))
    .sort((a, b) => Number(criticalSet.has(b.tag)) - Number(criticalSet.has(a.tag)) || a.layerIndex - b.layerIndex || a.tagIndex - b.tagIndex)
    .filter(({ tag }, index, all) => all.findIndex((item) => item.tag === tag) === index)
    .slice(0, limit).map(({ tag }) => tag)
}

function createNarratives(primaryPosition, capitalStructure, riskProfile) {
  const primary = primaryPosition
    ? `Your ${CAPITAL_LAYERS.find((layer) => layer.id === primaryPosition.layer).name} layer may deserve review before later priorities.`
    : 'Your current responses show solid footing across all six capital layers; continued coordination may preserve flexibility.'
  return {
    summary: primary,
    summaryZh: primaryPosition ? `${CAPITAL_LAYERS.find((layer) => layer.id === primaryPosition.layer).nameZh}可能值得在后续优先事项之前先行审视。` : '当前回答显示六层资本基础均较稳固；持续协调可能有助于保留灵活性。',
    structure: capitalStructure.liquidity.status === 'exposed' ? 'Your liquidity may not yet fully support your long-term investment horizon.' : 'Your capital structure reflects areas to preserve and areas worth coordinating.',
    risk: riskProfile === 'concentrated' ? 'Your household appears highly concentrated; the shape of that concentration may deserve review.' : `Your family and business risk profile appears ${riskProfile}.`,
  }
}

export function calculateAssessmentResult(answers = {}) {
  const safeAnswers = answers && typeof answers === 'object' && !Array.isArray(answers) ? answers : {}
  const layers = calculateLayers(safeAnswers)
  const firstWeak = layers.find((layer) => layer.status !== 'solid')
  const primaryPosition = firstWeak ? { layer: firstWeak.id, status: firstWeak.status } : null
  const tags = layers.flatMap((layer) => layer.tags)
  const priorityTags = selectPriorityTags(layers)
  const capitalStructure = calculateCapitalStructure(safeAnswers, tags)
  const riskProfile = calculateRiskProfile(layers, tags)
  const legacyAnswer = QUESTIONS_BY_ID.Q29.options.some((option) => option.id === safeAnswers.Q29) ? safeAnswers.Q29 : null
  return {
    assessmentVersion: ASSESSMENT_VERSION,
    scoringVersion: SCORING_VERSION,
    layers,
    primaryPosition,
    nextDollar: primaryPosition ? NEXT_DOLLAR_MAP[primaryPosition.layer] : ALL_SOLID_NEXT_DOLLAR,
    capitalStructure,
    riskProfile,
    temperament: calculateTemperament(safeAnswers),
    legacyOrientation: LEGACY_ORIENTATION_MAP[legacyAnswer] || null,
    tags,
    priorityTags,
    worthExploring: priorityTags.flatMap((tag) => TOPIC_MAP[tag] ? [{ tag, ...TOPIC_MAP[tag] }] : []).slice(0, 3),
    narratives: createNarratives(primaryPosition, capitalStructure, riskProfile),
  }
}
