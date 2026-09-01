import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateAssessmentResult } from '../engine/calculateAssessmentResult.js'
import { validationProfiles } from './fixtures/validationProfiles.js'
import { findContradictions, formatValidationReport, validateProfile } from '../validation/validateProfiles.js'

const byId = Object.fromEntries(validationProfiles.map((profile) => [profile.id, profile]))

test('validation pack has at least five complete Q1-Q30 profiles', () => {
  assert.ok(validationProfiles.length >= 5)
  const expectedIds = Array.from({ length: 30 }, (_, index) => `Q${index + 1}`)
  validationProfiles.forEach((profile) => assert.deepEqual(Object.keys(profile.answers), expectedIds))
})

test('validation pack identifies passes and product-review cases deterministically', () => {
  const validations = validationProfiles.map(validateProfile)
  assert.deepEqual(validations.map(({ profile, status }) => [profile.id, status]), [
    ['high-income-fragile-cash-flow', 'PASS'],
    ['stable-middle-income-builder', 'REVIEW'],
    ['concentrated-business-owner', 'REVIEW'],
    ['high-assets-low-protection', 'PASS'],
    ['mature-high-net-worth-household', 'PASS'],
  ])
})

test('fragile cash flow remains foundational despite solid Growth', () => {
  const result = calculateAssessmentResult(byId['high-income-fragile-cash-flow'].answers)
  assert.ok(['survival', 'stability'].includes(result.primaryPosition.layer))
  assert.equal(result.nextDollar.action, 'Stabilize')
  assert.notEqual(result.capitalStructure.liquidity.status, 'strong')
  assert.notEqual(result.capitalStructure.debtExposure.status, 'strong')
  assert.equal(result.layers.find((layer) => layer.id === 'growth').status, 'solid')
  assert.notEqual(result.riskProfile, 'low')
})

test('stable builder remains moderate with Strategic still developing', () => {
  const result = calculateAssessmentResult(byId['stable-middle-income-builder'].answers)
  assert.notEqual(result.layers[0].status, 'needs_attention')
  assert.equal(result.layers.find((layer) => layer.id === 'strategic').status, 'needs_attention')
  assert.equal(result.riskProfile, 'moderate')
  assert.notEqual(result.nextDollar.action, 'Create Optionality')
  assert.equal(result.temperament.primary, 'balanced_builder')
})

test('business owner has concentrated risk and concentration/succession topics', () => {
  const result = calculateAssessmentResult(byId['concentrated-business-owner'].answers)
  assert.equal(result.riskProfile, 'concentrated')
  assert.ok(result.priorityTags.includes('extreme_concentration'))
  assert.ok(result.priorityTags.includes('business_succession_gap'))
  assert.ok(result.worthExploring.some((topic) => /Concentration|Business Continuity/.test(topic.title)))
  assert.equal(findContradictions(result).length, 0)
})

test('high assets cannot mask the earliest Protection weakness', () => {
  const result = calculateAssessmentResult(byId['high-assets-low-protection'].answers)
  assert.deepEqual(result.primaryPosition, { layer: 'protection', status: 'needs_attention' })
  assert.equal(result.nextDollar.action, 'Protect')
  assert.equal(result.layers.find((layer) => layer.id === 'growth').status, 'solid')
  assert.equal(result.layers.find((layer) => layer.id === 'strategic').status, 'solid')
  assert.notEqual(result.riskProfile, 'low')
})

test('mature household uses the all-solid path without implying completion', () => {
  const result = calculateAssessmentResult(byId['mature-high-net-worth-household'].answers)
  assert.ok(result.layers.every((layer) => layer.status === 'solid'))
  assert.equal(result.primaryPosition, null)
  assert.equal(result.nextDollar.action, 'Optimize & Create Optionality')
  assert.notEqual(result.riskProfile, 'elevated')
  assert.doesNotMatch(JSON.stringify(result.narratives), /completed the ladder|passed all|perfect financial health/i)
})

test('Q29 changes orientation only, never Primary Position or Legacy score', () => {
  const base = byId['stable-middle-income-builder'].answers
  const first = calculateAssessmentResult({ ...base, Q29: 'A' })
  const second = calculateAssessmentResult({ ...base, Q29: 'E' })
  assert.notEqual(first.legacyOrientation, second.legacyOrientation)
  assert.deepEqual(first.primaryPosition, second.primaryPosition)
  assert.equal(first.layers[5].average, second.layers[5].average)
  assert.equal(first.layers[5].status, second.layers[5].status)
})

test('contradiction detector flags suspicious combinations without mutating results', () => {
  const source = calculateAssessmentResult(byId['mature-high-net-worth-household'].answers)
  const suspicious = {
    ...source,
    primaryPosition: { layer: 'survival', status: 'developing' },
    nextDollar: { action: 'Grow', actionZh: '让资本增长' },
    layers: source.layers.map((layer) => layer.id === 'stability' ? { ...layer, status: 'developing' } : layer),
  }
  const before = structuredClone(suspicious)
  const issues = findContradictions(suspicious)
  assert.ok(issues.some((issue) => /Survival.*Liquidity.*Strong/.test(issue)))
  assert.ok(issues.some((issue) => /Grow/.test(issue)))
  assert.deepEqual(suspicious, before)
})

test('human-readable validation report is deterministic and complete', () => {
  const validations = validationProfiles.map(validateProfile)
  const first = formatValidationReport(validations)
  const second = formatValidationReport(validationProfiles.map(validateProfile))
  assert.equal(first, second)
  validationProfiles.forEach((profile) => assert.match(first, new RegExp(`PROFILE: ${profile.name}`)))
  assert.equal((first.match(/VALIDATION: PASS/g) || []).length, 3)
  assert.equal((first.match(/VALIDATION: REVIEW/g) || []).length, 2)
})
