function answers(values) {
  if (values.length !== 30) throw new Error(`Validation profile requires 30 answers; received ${values.length}`)
  return Object.fromEntries(values.map((value, index) => [`Q${index + 1}`, value]))
}

export const validationProfiles = [
  {
    id: 'high-income-fragile-cash-flow',
    name: 'High Income, Fragile Cash Flow',
    nameZh: '高收入但现金流脆弱型',
    description: 'Strong earnings and investments sit above thin reserves, revolving debt, and tight monthly cash flow.',
    answers: answers([
      'B','A','B','B','D', 'B','B','D','B','A', 'D','C','D','D','D',
      'E','E','D','D','D', 'D','D','D','C','B', 'C','C','F','D','B',
    ]),
    expected: {
      primaryPositions: ['survival', 'stability'], nextDollar: 'Stabilize',
      likelyTemperaments: ['balanced_builder', 'growth_seeker', 'optionality_builder'],
      requiredConditions: ['Liquidity is not strong', 'Debt Exposure is not strong', 'Growth remains solid'],
      prohibitedConditions: ['Risk Profile is low'],
    },
  },
  {
    id: 'stable-middle-income-builder',
    name: 'Stable Middle-Income Builder',
    nameZh: '稳定中产积累型',
    description: 'A steady builder with sound foundations and less-developed strategic and legacy coordination.',
    answers: answers([
      'D','E','E','D','D', 'C','D','D','D','D', 'D','D','D','D','C',
      'D','C','D','C','D', 'C','C','B','C','C', 'B','C','F','C','C',
    ]),
    expected: {
      primaryPositions: ['stability', 'protection', 'growth', 'strategic'],
      nextDollarNot: ['Create Optionality', 'Optimize & Create Optionality'],
      riskProfiles: ['moderate'],
      likelyTemperaments: ['balanced_builder', 'growth_seeker', 'optionality_builder'],
      preferredLayerStatuses: { strategic: ['developing'] },
      requiredConditions: ['Survival is not needs attention', 'Strategic is developing'],
      prohibitedConditions: ['Risk Profile is elevated'],
    },
  },
  {
    id: 'concentrated-business-owner',
    name: 'Concentrated Business Owner',
    nameZh: '企业主集中型',
    description: 'Strong liquidity and operating capacity with wealth concentrated in one business and weak succession.',
    answers: answers([
      'E','E','E','E','D', 'D','E','E','D','E', 'D','D','D','D','C',
      'E','D','A','D','D', 'E','E','C','E','D', 'D','B','A','E','D',
    ]),
    expected: {
      riskProfiles: ['concentrated'],
      likelyTemperaments: ['concentrated_operator'],
      requiredConditions: ['Concentration or succession appears in priority output', 'Primary follows ladder order'],
      prohibitedConditions: ['Concentration is framed as liquidity poverty'],
    },
  },
  {
    id: 'high-assets-low-protection',
    name: 'High Assets, Low Protection',
    nameZh: '高资产低保护型',
    description: 'Strong liquidity, growth, and strategic capital with gaps in disability, liability, and continuity protection.',
    answers: answers([
      'E','E','E','E','C', 'D','E','E','E','E', 'C','A','D','B','B',
      'E','E','E','E','E', 'E','E','E','D','E', 'C','C','F','D','D',
    ]),
    expected: {
      primaryPositions: ['protection'], nextDollar: 'Protect',
      riskProfiles: ['elevated', 'moderate'],
      likelyTemperaments: ['balanced_builder', 'growth_seeker', 'optionality_builder'],
      requiredConditions: ['Protection is not solid', 'Growth remains solid', 'Strategic remains solid'],
      prohibitedConditions: ['Risk Profile is low'],
    },
  },
  {
    id: 'mature-high-net-worth-household',
    name: 'Mature High-Net-Worth Household',
    nameZh: '成熟高净值型',
    description: 'Coordinated liquidity, protection, productive assets, tax structure, optionality, and continuity.',
    answers: answers(Array(30).fill('E')),
    expected: {
      primaryPositions: [null], nextDollar: 'Optimize & Create Optionality',
      riskProfiles: ['low'],
      likelyTemperaments: ['balanced_builder', 'growth_seeker', 'optionality_builder'],
      requiredConditions: ['All layers are solid', 'Result continues to emphasize optimization and optionality'],
      prohibitedConditions: ['Risk Profile is elevated', 'Result implies planning is finished'],
    },
  },
]
