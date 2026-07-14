import { surveyQuestions, TIER_IDS } from '../data/survey'

// ─── Demographic helpers — preserved from the original scoring engine ─────
function hasNoDependentChildren(answers) {
  return answers.children_count === 'none' || answers.children_ages === 'na'
}

function hasManyMinors(answers) {
  return (
    answers.children_count === 'three_plus' ||
    answers.children_ages === 'three_plus_all_minors'
  )
}

function hasYoungChildren(answers) {
  return (
    answers.children_ages === 'all_young' ||
    answers.children_ages === 'mixed_ages' ||
    answers.children_count === 'one' ||
    answers.children_count === 'two'
  )
}

function buildRankedTiers(percentages, primaryTier) {
  return [...TIER_IDS]
    .sort((a, b) => percentages[b] - percentages[a])
    .map((id, rank) => ({
      id,
      percentage: percentages[id],
      rank,
      isPrimary: id === primaryTier,
    }))
}

// Computes the winning tier + score breakdown from raw answers.
// This is the same weighting, bonus, and tie-break logic as the original
// assessment — only the personalized-text generation was removed, since
// result copy now comes from the locale files instead of hardcoded
// English/Chinese paragraphs.
export function calculateSurveyResult(answers) {
  const totals = { tax: 0, risk: 0, wellness: 0 }

  for (const q of surveyQuestions) {
    const choice = answers[q.id]
    if (!choice) continue
    const option = q.options.find((o) => o.id === choice)
    if (!option) continue
    totals.tax += option.scores.tax
    totals.risk += option.scores.risk
    totals.wellness += option.scores.wellness
  }

  if (answers.children_ages === 'three_plus_all_minors') {
    totals.tax += 3
  } else if (answers.children_count === 'three_plus' && answers.children_ages !== 'na') {
    totals.tax += 2
  }

  if (hasNoDependentChildren(answers)) {
    totals.wellness += 2
  }

  if (
    answers.children_ages === 'all_young' &&
    (answers.children_count === 'one' || answers.children_count === 'two')
  ) {
    totals.risk += 3
  }

  const maxScore = Math.max(totals.tax, totals.risk, totals.wellness)
  const leaders = TIER_IDS.filter((t) => totals[t] === maxScore)

  let tier = leaders[0]
  if (leaders.length > 1) {
    const { priority } = answers
    if (priority === 'tax' && leaders.includes('tax')) tier = 'tax'
    else if (priority === 'protect' && leaders.includes('risk')) tier = 'risk'
    else if (priority === 'health' && leaders.includes('wellness')) tier = 'wellness'
    else if (hasManyMinors(answers) && leaders.includes('tax')) tier = 'tax'
    else if (hasNoDependentChildren(answers) && leaders.includes('wellness')) tier = 'wellness'
    else if (hasYoungChildren(answers) && leaders.includes('risk')) tier = 'risk'
    else if (answers.age === '50plus' && leaders.includes('wellness')) tier = 'wellness'
    else tier = leaders[0]
  }

  if (
    answers.age === '50plus' &&
    tier === 'risk' &&
    !hasYoungChildren(answers) &&
    totals.wellness >= totals.risk - 2
  ) {
    tier = 'wellness'
  }

  const totalPoints = totals.tax + totals.risk + totals.wellness || 1
  const percentages = {
    tax: Math.round((totals.tax / totalPoints) * 100),
    risk: Math.round((totals.risk / totalPoints) * 100),
    wellness: Math.round((totals.wellness / totalPoints) * 100),
  }

  const rankedTiers = buildRankedTiers(percentages, tier)

  return {
    tier,
    scores: totals,
    percentages,
    rankedTiers,
  }
}

