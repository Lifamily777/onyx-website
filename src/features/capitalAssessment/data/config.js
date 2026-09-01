export const ASSESSMENT_VERSION = '1.1'
export const SCORING_VERSION = '1.0'

export const CAPITAL_LAYERS = [
  { id: 'survival', order: 1, name: 'Survival Capital', nameZh: '生存资本' },
  { id: 'stability', order: 2, name: 'Stability Capital', nameZh: '稳定资本' },
  { id: 'protection', order: 3, name: 'Protection Capital', nameZh: '保护资本' },
  { id: 'growth', order: 4, name: 'Growth Capital', nameZh: '增长资本' },
  { id: 'strategic', order: 5, name: 'Strategic Capital', nameZh: '战略资本' },
  { id: 'legacy', order: 6, name: 'Legacy & Optionality Capital', nameZh: '传承与选择权资本' },
]

export const SCORE_THRESHOLDS = { solid: 4.2, developing: 3 }
export const STRUCTURE_THRESHOLDS = { strong: 4.2, adequate: 3.4, developing: 2.5 }

export const CRITICAL_TAGS = [
  'acute_liquidity_risk', 'high_interest_dependency', 'high_interest_debt_pressure',
  'paycheck_dependency', 'catastrophic_exposure', 'negative_cash_flow',
  'tax_liquidity_risk', 'mortality_income_gap', 'disability_income_gap',
  'medical_liquidity_gap', 'extreme_concentration', 'forced_sale_risk',
  'continuity_failure_risk',
]

export const MODERATE_TAGS = [
  'limited_liquidity', 'thin_reserve', 'reserve_developing', 'volatile_surplus',
  'known_future_cash_need', 'coverage_uncertainty', 'high_concentration',
  'tax_advantaged_underuse', 'asset_location_gap', 'low_optionality',
  'business_succession_gap',
]

export const NEXT_DOLLAR_MAP = {
  survival: { action: 'Stabilize', actionZh: '先稳住' },
  stability: { action: 'Stabilize', actionZh: '稳固现金流' },
  protection: { action: 'Protect', actionZh: '加强保护' },
  growth: { action: 'Grow', actionZh: '让资本增长' },
  strategic: { action: 'Optimize', actionZh: '优化配置' },
  legacy: { action: 'Create Optionality', actionZh: '创造选择权' },
}

export const ALL_SOLID_NEXT_DOLLAR = {
  action: 'Optimize & Create Optionality', actionZh: '优化资本并创造选择权',
}

export const LEGACY_ORIENTATION_MAP = {
  A: 'legacy_undefined', B: 'legacy_asset_focused', C: 'legacy_education_focused',
  D: 'legacy_values_focused', E: 'legacy_governance_focused',
}
