import { surveyQuestions, tierProfiles, tierLabels, serviceCatalog, TIER_IDS } from '../data/survey'

function isOlder(answers) {
  return answers.age === '50plus' || answers.age === '40s'
}

function isYoung(answers) {
  return answers.age === 'under30' || answers.age === '30s'
}

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

function hasTightCash(answers) {
  return answers.savings_room === 'tight' || answers.savings_room === 'some'
}

function hasDebt(answers) {
  return answers.debt === 'significant' || answers.debt === 'heavy'
}

function traitApplies(trait, answers) {
  const ctx = trait.context || 'any'
  if (ctx === 'any') return true
  if (ctx === 'hasChildren') return !hasNoDependentChildren(answers)
  if (ctx === 'noChildren') return hasNoDependentChildren(answers)
  if (ctx === 'hasManyMinors') return hasManyMinors(answers)
  if (ctx === 'tightCash') return hasTightCash(answers)
  if (ctx === 'hasDebt') return hasDebt(answers)
  return true
}

function filterTraits(traits, answers) {
  return traits.filter((t) => traitApplies(t, answers))
}

const TIER_SERVICE_KEY = { tax: 'tax', risk: 'ins', wellness: 'health' }

function servicePriority(rank, percentage, serviceId, answers) {
  if (rank === 0) return { priority: 'Primary', priorityZh: '首要' }
  if (rank === 1 && percentage >= 20) return { priority: 'Support', priorityZh: '配合' }
  if (
    serviceId === 'ins' &&
    (answers.protection === 'well' || answers.protection === 'fairly')
  ) {
    return { priority: 'Review', priorityZh: '检视' }
  }
  if (rank === 2 && percentage < 15) {
    return { priority: 'Explore', priorityZh: '了解' }
  }
  return { priority: 'Support', priorityZh: '配合' }
}

function buildRankedServices(percentages, answers) {
  return [...TIER_IDS]
    .sort((a, b) => percentages[b] - percentages[a])
    .map((tier, rank) => {
      const serviceId = TIER_SERVICE_KEY[tier]
      const base = serviceCatalog[serviceId]
      const percentage = percentages[tier]
      const { priority, priorityZh } = servicePriority(rank, percentage, serviceId, answers)
      return {
        ...base,
        tier,
        tierLabel: tierLabels[tier],
        percentage,
        rank,
        priority,
        priorityZh,
      }
    })
}

function buildRankedTiers(percentages, primaryTier) {
  return [...TIER_IDS]
    .sort((a, b) => percentages[b] - percentages[a])
    .map((id, rank) => ({
      id,
      label: tierLabels[id],
      profile: tierProfiles[id],
      percentage: percentages[id],
      rank,
      isPrimary: id === primaryTier,
    }))
}

function personalizeProfile(tier, answers) {
  const base = tierProfiles[tier]
  const profile = {
    ...base,
    traits: filterTraits(base.traits, answers),
  }

  if (tier === 'tax') {
    if (hasManyMinors(answers)) {
      profile.summary =
        'Supporting three or more dependent children creates significant, legitimate tax-planning opportunities. Structuring income, deductions, and family-related expenses now can keep substantially more in your household.'
      profile.summaryZh =
        '抚养三名及以上未成年子女，往往具备显著的合规节税空间。现在优化收入结构、家庭相关费用与扣除项，能把更多钱留在家庭内部。'
    } else if (hasNoDependentChildren(answers) && hasTightCash(answers)) {
      profile.summary =
        'Without dependent-child expenses but with tight monthly cash flow, tax-efficient structure delivers immediate, tangible savings — the fastest way to strengthen your foundation.'
      profile.summaryZh =
        '暂无抚养子女的开支，但月度现金流偏紧——合规节税能立刻带来可见的节省，是夯实基础最直接的方式。'
    } else if (hasNoDependentChildren(answers)) {
      profile.summary =
        'Your profile points to tax structure as the lead strategy — freeing cash flow and building assets without the complexity of large-family deductions.'
      profile.summaryZh =
        '您的画像以税务结构为先——在无多名子女扣除的情况下，通过合法节税释放现金流、积累资产。'
    } else if (isYoung(answers) && answers.income_stage === 'building') {
      profile.summary =
        'You are in an asset-building phase with limited cash flow. Establishing smart tax habits early — before responsibilities compound — gives every future dollar a stronger foundation.'
      profile.summaryZh =
        '您处于原始资产积累期，现金流偏紧。在家庭责任进一步加重之前，尽早建立合规节税习惯，能让未来的每一分钱起点更高。'
    } else if (isOlder(answers)) {
      profile.summary =
        'Even in a mature life stage, tax-efficient structure still matters — especially if you run a business or want to redirect savings toward wellness and legacy goals.'
      profile.summaryZh =
        '即使人生阶段已较成熟，合理税务结构依然重要——尤其若您有生意，或希望把节省下来的资源投向养生与传承。'
    }
  }

  if (tier === 'risk') {
    if (isOlder(answers)) {
      profile.summary =
        'At your life stage, protecting family wealth and ensuring continuity still matters — through updated coverage, cash value strategies, or legacy planning — especially if debt would feel a sudden income loss.'
      profile.summaryZh =
        '在您的人生阶段，家庭财富保护与传承布局依然关键——通过更新保障、现金值策略或遗产规划，避免负债或收入中断时受到重大冲击。'
    } else if (hasYoungChildren(answers)) {
      profile.summary =
        'With young children at home, your household depends on your income continuity. Now is the ideal window for long-term protection, policy cash value growth, and estate planning — before costs rise with age.'
      profile.summaryZh =
        '家中有年幼孩子，家庭高度依赖您的收入连续性。趁年龄和保费窗口尚优，重点布局长期保障、保单现金值复利与传承规划。'
    } else if (hasNoDependentChildren(answers)) {
      profile.summary =
        'Even without children at home, debt and income continuity risks remain — insurance and cash value strategies protect your household and long-term financial plan.'
      profile.summaryZh =
        '即使家中无未成年孩子，负债与收入中断风险依然存在——保险与现金值策略可保护您的家庭与长期财务安排。'
    }
  }

  if (tier === 'wellness') {
    if (answers.age === '50plus') {
      profile.summary =
        'In your 50s and beyond, the body’s signals — energy, sleep, chronic markers — deserve structured attention. Investing in medical-grade wellness protects the asset that supports everything else: you.'
      profile.summaryZh =
        '50 岁及以上，精力、睡眠与慢性指标更需系统管理。把资源投入医疗级养生，是在保护支撑一切的核心资产——您的身体。'
    } else if (hasNoDependentChildren(answers)) {
      profile.summary =
        'Without dependent children at home, your planning center of gravity naturally shifts toward your own energy, health performance, and long-term vitality — especially if career pressure or subhealth is already showing.'
      profile.summaryZh =
        '家中无需抚养的孩子，规划重心自然转向您自身的精力、健康表现与长期活力——尤其若事业压力或亚健康信号已经出现。'
    } else if (isYoung(answers)) {
      profile.summary =
        'You may still have family responsibilities, but your answers suggest health and sustained performance are the bottleneck right now — worth addressing before they limit your earning power and quality of life.'
      profile.summaryZh =
        '您可能仍有家庭责任，但问卷显示精力与健康状态是当前瓶颈——宜在影响收入与生活质量之前主动干预。'
    }
  }

  return profile
}

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

  const profile = personalizeProfile(tier, answers)
  const rankedServices = buildRankedServices(percentages, answers)
  const rankedTiers = buildRankedTiers(percentages, tier)

  return {
    tier,
    profile,
    scores: totals,
    percentages,
    rankedServices,
    rankedTiers,
  }
}
