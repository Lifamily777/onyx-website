export const LAYER_STATUS_COPY = {
  solid: { label: 'Solid', labelZh: '稳固', marker: '◆' },
  developing: { label: 'Developing', labelZh: '正在建立', marker: '◇' },
  needs_attention: { label: 'Needs Attention', labelZh: '值得关注', marker: '○' },
}

export const STRUCTURE_DIMENSIONS = [
  { id: 'liquidity', name: 'Liquidity', nameZh: '流动性' },
  { id: 'protection', name: 'Protection', nameZh: '保护结构' },
  { id: 'productiveAssets', name: 'Productive Assets', nameZh: '生产性资产' },
  { id: 'debtExposure', name: 'Debt Exposure', nameZh: '债务敞口' },
  { id: 'taxStructure', name: 'Tax Structure', nameZh: '税务结构' },
  { id: 'incomeDiversification', name: 'Income Diversification', nameZh: '收入多元化' },
]

export const STRUCTURE_STATUS_COPY = {
  strong: { label: 'Strong', labelZh: '较强' },
  adequate: { label: 'Adequate', labelZh: '基本充足' },
  developing: { label: 'Developing', labelZh: '正在建立' },
  exposed: { label: 'Exposed', labelZh: '风险敞口较明显' },
}

export const STRUCTURE_EXPLANATIONS = {
  liquidity: { en: 'Available liquidity may deserve coordination with short-term obligations and the long-term plan.', zh: '现有流动性可能值得与短期责任和长期计划进一步协调。' },
  protection: { en: 'The protection structure may deserve review around major income, medical, liability, and continuity exposures.', zh: '保护结构可能值得围绕重大收入、医疗、责任与连续性风险进一步梳理。' },
  productiveAssets: { en: 'Long-term capital deployment may benefit from greater consistency, clarity, or diversification.', zh: '长期资本投入可能受益于更强的一致性、清晰度或多元化。' },
  debtExposure: { en: 'Debt may deserve a more coordinated view across cost, liquidity, and cash-flow flexibility.', zh: '债务可能值得从成本、流动性与现金流弹性角度进行更协调的审视。' },
  taxStructure: { en: 'Tax structure may benefit from a more coordinated review across accounts and future cash flows.', zh: '税务结构可能受益于对不同账户与未来现金流的协调审视。' },
  incomeDiversification: { en: 'This is a directional view based on your broader cash-flow and concentration answers.', zh: '这一项主要根据现金流与资产集中度等回答进行方向性判断。' },
}

export const RISK_COPY = {
  low: { label: 'Low', labelZh: '较低', en: 'Your responses do not currently point to a dominant family or business risk pattern. Continued coordination can help preserve that resilience.', zh: '当前回答未显示某一种家庭或经营风险占据主导。持续协调有助于保持这种韧性。' },
  moderate: { label: 'Moderate', labelZh: '中等', en: 'Several manageable exposures appear to deserve coordination, even though no single risk pattern dominates the structure.', zh: '目前有若干可管理的风险敞口值得协调，但没有单一风险形态主导整体结构。' },
  elevated: { label: 'Elevated', labelZh: '较高', en: 'One or more structural exposures may deserve attention before they place pressure on other layers of family capital.', zh: '一项或多项结构性风险可能值得优先关注，以免对家庭资本的其他层级形成压力。' },
  concentrated: { label: 'Concentrated', labelZh: '集中型', en: "Your primary risk does not appear to come from a lack of assets. It comes from too much of the family's economic future depending on a small number of assets, income sources, or decision-makers.", zh: '你的主要风险未必来自资产不足，而是家庭未来较多地依赖少数资产、收入来源或关键决策者。' },
}

export const TEMPERAMENT_COPY = {
  capital_preserver: { label: 'Capital Preserver', labelZh: '资本守护型', tendencyZh: '资本守护倾向', en: 'You appear to place meaningful value on liquidity, stability, and preserving a margin of safety.', zh: '你似乎比较重视流动性、稳定性，以及为不确定性保留安全边际。' },
  balanced_builder: { label: 'Balanced Builder', labelZh: '平衡积累型', tendencyZh: '平衡积累倾向', en: 'You appear to value disciplined growth while keeping risk, liquidity, and diversification in view.', zh: '你似乎重视有纪律的增长，同时会兼顾风险、流动性与多元化。' },
  growth_seeker: { label: 'Growth Seeker', labelZh: '增长导向型', tendencyZh: '增长导向倾向', en: 'You appear comfortable giving long-term capital time to compound through consistent deployment.', zh: '你似乎愿意通过持续投入，让长期资本获得足够时间发挥复利作用。' },
  concentrated_operator: { label: 'Concentrated Operator', labelZh: '集中经营型', tendencyZh: '集中经营倾向', en: 'You appear drawn to assets or enterprises where conviction, knowledge, and control can play a meaningful role.', zh: '你似乎更关注能够发挥判断、知识与控制力的资产或经营机会。' },
  optionality_builder: { label: 'Optionality Builder', labelZh: '选择权导向型', tendencyZh: '选择权倾向', en: 'You appear to value flexibility and the ability to change direction as circumstances evolve.', zh: '你似乎重视灵活性，以及在环境变化时调整方向的能力。' },
}

export const LEGACY_COPY = {
  legacy_undefined: { en: 'Your legacy orientation is still open for definition; the purpose of future excess capital may be worth exploring.', zh: '你的传承方向仍有待定义；未来额外资本应服务什么目的，可能值得进一步思考。' },
  legacy_asset_focused: { en: 'Your legacy orientation currently centers primarily on transferring assets to the next generation.', zh: '你目前的传承关注点，主要集中在把资产本身留给下一代。' },
  legacy_education_focused: { en: 'Your legacy orientation includes both asset transfer and the financial knowledge needed to steward it.', zh: '你的传承关注点既包括资产，也包括管理这些资产所需要的财务知识。' },
  legacy_values_focused: { en: 'Your legacy orientation appears to extend beyond asset transfer. Financial knowledge and family values seem to be part of what you want capital to carry forward.', zh: '你的传承关注点似乎不只是资产本身。财务知识与家庭价值观，也属于你希望资本能够继续承载的一部分。' },
  legacy_governance_focused: { en: 'Your legacy orientation includes assets, values, education, and a framework for responsible stewardship across generations.', zh: '你的传承关注点包括资产、价值观、教育，以及跨代负责管理资本的框架。' },
}

export const NEXT_DOLLAR_EXPLANATIONS = {
  survival: { en: 'The first opportunity is to strengthen the liquidity and resilience that keep short-term disruption from forcing long-term decisions.', zh: '当前首要机会，是加强流动性与韧性，避免短期波动迫使家庭改变长期决定。' },
  stability: { en: 'The next structural opportunity is to create more dependable cash-flow margin and protect long-term capital from short-term demands.', zh: '下一项结构性机会，是建立更稳定的现金流余量，并减少短期资金需求对长期资本的干扰。' },
  protection: { en: 'The next structural opportunity appears to be strengthening protection around the income and capital your household has already built.', zh: '下一项结构性机会，似乎是加强对家庭现有收入能力与已积累资本的保护。' },
  growth: { en: 'With earlier layers taking shape, the next opportunity is to give long-term productive capital greater consistency and time.', zh: '在前几层逐步成形后，下一项机会是让长期生产性资本获得更稳定的投入与更多时间。' },
  strategic: { en: 'The next opportunity is to coordinate return, taxes, liquidity, risk, and opportunity cost across the whole balance sheet.', zh: '下一项机会，是在整个家庭资产负债表中协调回报、税务、流动性、风险与机会成本。' },
  legacy: { en: 'The next opportunity is to turn accumulated capital into greater flexibility, continuity, and purpose across time.', zh: '下一项机会，是让已积累的资本进一步转化为长期灵活性、连续性与明确目的。' },
  all_solid: { en: 'Your foundational capital structure appears strong across all six layers. Continued optimization can help preserve flexibility and create new choices.', zh: '你的家庭资本基础目前在六个层级上都表现得较为完整。持续优化有助于保留灵活性并创造新的选择。' },
}

export function getExpandedStructureIds(capitalStructure) {
  const severity = { exposed: 0, developing: 1, adequate: 2, strong: 3 }
  return STRUCTURE_DIMENSIONS.map(({ id }, index) => ({ id, index, rank: severity[capitalStructure[id].status] }))
    .sort((a, b) => a.rank - b.rank || a.index - b.index).slice(0, 3).map(({ id }) => id)
}

export function createCapitalMapViewModel(result) {
  const primaryLayer = result.primaryPosition
    ? CAPITAL_LAYERS.find((layer) => layer.id === result.primaryPosition.layer)
    : null
  return {
    layers: result.layers.map((layer) => ({ id: layer.id, status: LAYER_STATUS_COPY[layer.status] })),
    primaryLayer,
    nextDollar: result.nextDollar,
    structure: STRUCTURE_DIMENSIONS.map((dimension) => ({
      ...dimension, status: STRUCTURE_STATUS_COPY[result.capitalStructure[dimension.id].status],
    })),
    risk: RISK_COPY[result.riskProfile],
    temperament: {
      primary: TEMPERAMENT_COPY[result.temperament.primary],
      secondary: result.temperament.hybrid ? TEMPERAMENT_COPY[result.temperament.secondary] : null,
      hybrid: result.temperament.hybrid,
    },
    legacy: LEGACY_COPY[result.legacyOrientation] || null,
    topics: result.worthExploring.slice(0, 3),
  }
}
import { CAPITAL_LAYERS } from './config.js'
