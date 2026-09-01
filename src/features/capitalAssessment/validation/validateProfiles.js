import { CAPITAL_LAYERS, CRITICAL_TAGS } from '../data/config.js'
import { calculateAssessmentResult } from '../engine/calculateAssessmentResult.js'

const concentrationSignals = new Set(['extreme_concentration', 'high_concentration', 'moderate_concentration'])

export function findContradictions(result) {
  const issues = []
  const status = Object.fromEntries(result.layers.map((layer) => [layer.id, layer.status]))
  const criticalCount = result.tags.filter((tag) => CRITICAL_TAGS.includes(tag)).length

  if (result.primaryPosition?.layer === 'survival' && result.capitalStructure.liquidity.status === 'strong') issues.push('Primary is Survival while Liquidity is Strong')
  if (result.primaryPosition?.layer === 'protection' && result.capitalStructure.protection.status === 'strong') issues.push('Primary is Protection while Protection structure is Strong')
  if (result.riskProfile === 'low' && criticalCount >= 2) issues.push('Risk is Low with two or more critical tags')
  if (result.riskProfile === 'low' && result.layers.slice(0, 3).some((layer) => layer.status === 'needs_attention')) issues.push('Risk is Low while a foundational layer Needs Attention')
  if (result.nextDollar.action === 'Grow' && (status.survival !== 'solid' || status.stability !== 'solid')) issues.push('Next Dollar is Grow before Survival and Stability are Solid')
  if (result.nextDollar.action === 'Optimize' && (status.protection !== 'solid' || status.growth !== 'solid')) issues.push('Next Dollar is Optimize before Protection and Growth are Solid')
  if (result.nextDollar.action === 'Create Optionality' && result.layers.slice(0, 5).some((layer) => layer.status !== 'solid')) issues.push('Next Dollar is Create Optionality while an earlier layer is not Solid')
  if (result.layers.every((layer) => layer.status === 'solid') && result.nextDollar.action !== 'Optimize & Create Optionality') issues.push('All layers are Solid but the all-solid Next Dollar action is absent')
  if (result.riskProfile === 'concentrated' && !result.tags.some((tag) => concentrationSignals.has(tag))) issues.push('Concentrated risk has no concentration-related signal')
  return issues
}

function temperamentMatches(result, expected) {
  return expected.includes(result.temperament.primary) ||
    (result.temperament.hybrid && expected.includes(result.temperament.secondary))
}

export function validateProfile(profile) {
  const result = calculateAssessmentResult(profile.answers)
  const reasons = findContradictions(result)
  const expected = profile.expected
  const primary = result.primaryPosition?.layer ?? null

  if (expected.primaryPositions && !expected.primaryPositions.includes(primary)) reasons.push(`Primary ${primary ?? 'none'} is outside expected range: ${expected.primaryPositions.join(', ')}`)
  if (expected.nextDollar && result.nextDollar.action !== expected.nextDollar) reasons.push(`Next Dollar is ${result.nextDollar.action}; expected ${expected.nextDollar}`)
  if (expected.nextDollarNot?.includes(result.nextDollar.action)) reasons.push(`Next Dollar unexpectedly resolves to ${result.nextDollar.action}`)
  if (expected.riskProfiles && !expected.riskProfiles.includes(result.riskProfile)) reasons.push(`Risk ${result.riskProfile} is outside expected range: ${expected.riskProfiles.join(', ')}`)
  if (expected.likelyTemperaments && !temperamentMatches(result, expected.likelyTemperaments)) reasons.push(`Temperament ${result.temperament.primary}${result.temperament.hybrid ? ` + ${result.temperament.secondary}` : ''} is outside the plausible set`)
  Object.entries(expected.preferredLayerStatuses || {}).forEach(([layerId, statuses]) => {
    const actual = result.layers.find((layer) => layer.id === layerId)?.status
    if (!statuses.includes(actual)) reasons.push(`${layerId} status is ${actual}; expected intuition favored ${statuses.join(' or ')}`)
  })

  return { profile, result, status: reasons.length ? 'REVIEW' : 'PASS', reasons }
}

export function formatValidationReport(validations) {
  const lines = ['ONYX CAPITAL PRIORITY ASSESSMENT — V1 VALIDATION REPORT', '']
  validations.forEach(({ profile, result, status, reasons }) => {
    lines.push(`PROFILE: ${profile.name}`, `家庭类型: ${profile.nameZh}`, '', 'LAYERS:')
    CAPITAL_LAYERS.forEach((layer) => lines.push(`${layer.name}: ${result.layers.find((item) => item.id === layer.id).status}`))
    lines.push('', `PRIMARY: ${result.primaryPosition?.layer || 'None'}`, `NEXT DOLLAR: ${result.nextDollar.action}`, '', 'CAPITAL STRUCTURE:')
    Object.entries(result.capitalStructure).forEach(([id, value]) => lines.push(`${id}: ${value.status}`))
    lines.push('', `RISK: ${result.riskProfile}`, `TEMPERAMENT: ${result.temperament.primary}${result.temperament.hybrid ? ` + ${result.temperament.secondary}` : ''}`, `LEGACY: ${result.legacyOrientation || 'None'}`, '', 'PRIORITY TAGS:', ...(result.priorityTags.length ? result.priorityTags.map((tag, index) => `${index + 1}. ${tag}`) : ['None']), '', 'TOPICS:', ...(result.worthExploring.length ? result.worthExploring.map((topic, index) => `${index + 1}. ${topic.title} / ${topic.titleZh}`) : ['None']), '', `VALIDATION: ${status}`, 'REASONS:', ...(reasons.length ? reasons : ['No contradiction or invariant failure detected.']), '', '---', '')
  })
  return lines.join('\n')
}
