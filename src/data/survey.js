// ─── FIT CHECK SURVEY ─────────────────────────────────────────────────────────
// 10 questions · ~5–8 min · no legally restricted personal data

import { brand } from './content'

export const surveyIntro = {
  title: 'Find Your Fit',
  titleZh: '了解您的规划阶段',
  subtitle:
    `Ten quick questions to understand where you are today — and which ${brand.name} services fit best. Takes about 5–8 minutes. No sensitive personal identifiers required.`,
  subtitleZh: '十个简短问题，了解您当下的阶段与最匹配的服务方向。约 5–8 分钟，无需提供身份证号、精确收入等敏感信息。',
  privacy:
    'We only ask about general life stage, priorities, and self-assessed wellness — never SSN, bank details, or exact financial figures.',
  privacyZh: '仅询问生活阶段、关注重点与自我健康感受，不涉及社保号、银行账户或精确财务数字。',
}

export const TIER_IDS = ['tax', 'risk', 'wellness']

export const tierLabels = {
  tax: { en: 'Tax Efficiency', zh: '节税' },
  risk: { en: 'Risk Protection', zh: '避险' },
  wellness: { en: 'Wellness', zh: '养生' },
}

export const surveyQuestions = [
  {
    id: 'age',
    question: 'Which age range are you in?',
    questionZh: '您的年龄段是？',
    options: [
      {
        id: 'under30',
        label: 'Under 30',
        labelZh: '30 岁以下',
        scores: { tax: 2, risk: 2, wellness: 0 },
      },
      {
        id: '30s',
        label: '30–39',
        labelZh: '30–39 岁',
        scores: { tax: 1, risk: 3, wellness: 1 },
      },
      {
        id: '40s',
        label: '40–49',
        labelZh: '40–49 岁',
        scores: { tax: 0, risk: 2, wellness: 3 },
      },
      {
        id: '50plus',
        label: '50 or above',
        labelZh: '50 岁及以上',
        scores: { tax: 0, risk: 1, wellness: 5 },
      },
    ],
  },
  {
    id: 'children_count',
    question: 'How many dependent children do you currently support at home?',
    questionZh: '目前同住、仍需您抚养的孩子有几个？',
    options: [
      {
        id: 'none',
        label: 'None — or all my children are adults and financially independent',
        labelZh: '没有 / 孩子已全部成年且经济独立',
        scores: { tax: 0, risk: 0, wellness: 4 },
      },
      {
        id: 'one',
        label: '1 child',
        labelZh: '1 个孩子',
        scores: { tax: 0, risk: 3, wellness: 1 },
      },
      {
        id: 'two',
        label: '2 children',
        labelZh: '2 个孩子',
        scores: { tax: 1, risk: 4, wellness: 0 },
      },
      {
        id: 'three_plus',
        label: '3 or more children',
        labelZh: '3 个及以上',
        scores: { tax: 3, risk: 3, wellness: 0 },
      },
      {
        id: 'planning',
        label: 'No children yet — planning within 2 years',
        labelZh: '暂无孩子，两年内计划要',
        scores: { tax: 1, risk: 4, wellness: 0 },
      },
    ],
  },
  {
    id: 'children_ages',
    question: 'If you have dependent children at home, what are their age ranges?',
    questionZh: '若有需抚养的孩子，他们的年龄段是？（可多档情况，选最接近的一项）',
    options: [
      {
        id: 'na',
        label: 'Not applicable — no dependent children at home',
        labelZh: '不适用 — 无需抚养的孩子',
        scores: { tax: 0, risk: 0, wellness: 3 },
      },
      {
        id: 'all_young',
        label: 'All under 12 — or only 1–2 children, youngest under 12',
        labelZh: '全部未满 12 岁，或 1–2 个孩子且最小的未满 12 岁',
        scores: { tax: 0, risk: 6, wellness: 0 },
      },
      {
        id: 'mixed_ages',
        label: 'Mixed — some under 12 and some aged 12–17',
        labelZh: '年龄混合 — 有未满 12 岁的，也有 12–17 岁的',
        scores: { tax: 1, risk: 5, wellness: 1 },
      },
      {
        id: 'all_teens',
        label: 'All aged 12–17 (none under 12)',
        labelZh: '均在 12–17 岁（无未满 12 岁）',
        scores: { tax: 1, risk: 3, wellness: 2 },
      },
      {
        id: 'three_plus_all_minors',
        label: '3 or more children — all still under 18',
        labelZh: '3 个及以上 — 全部未满 18 岁（节税优势显著）',
        scores: { tax: 8, risk: 2, wellness: 0 },
      },
    ],
  },
  {
    id: 'income_stage',
    question: 'How would you describe your current income stage?',
    questionZh: '您如何描述目前的收入阶段？',
    options: [
      {
        id: 'building',
        label: 'Still building — every dollar counts',
        labelZh: '仍在积累，现金流偏紧',
        scores: { tax: 4, risk: 0, wellness: 0 },
      },
      {
        id: 'steady',
        label: 'Stable income source',
        labelZh: '有稳定收入源',
        scores: { tax: 2, risk: 2, wellness: 1 },
      },
      {
        id: 'growing',
        label: 'Growing business or self-employed income',
        labelZh: '生意或自由职业上升期',
        scores: { tax: 1, risk: 2, wellness: 2 },
      },
      {
        id: 'established',
        label: 'Established and financially comfortable',
        labelZh: '已较稳定宽裕',
        scores: { tax: 0, risk: 1, wellness: 4 },
      },
    ],
  },
  {
    id: 'savings_room',
    question: 'After essentials, how much room do you have for financial planning each month?',
    questionZh: '扣除必要开支后，每月可用于规划的空间？',
    options: [
      {
        id: 'tight',
        label: 'Very tight — little left over',
        labelZh: '非常紧张，几乎无余力',
        scores: { tax: 4, risk: 0, wellness: 0 },
      },
      {
        id: 'some',
        label: 'Some, but I need to be careful',
        labelZh: '有一些，需精打细算',
        scores: { tax: 3, risk: 1, wellness: 0 },
      },
      {
        id: 'comfortable',
        label: 'Comfortable buffer each month',
        labelZh: '有稳定结余',
        scores: { tax: 0, risk: 3, wellness: 2 },
      },
      {
        id: 'substantial',
        label: 'Substantial — ready to deploy strategically',
        labelZh: '充裕，可策略性配置',
        scores: { tax: 0, risk: 2, wellness: 3 },
      },
    ],
  },
  {
    id: 'debt',
    question: 'How would you describe your overall debt load (mortgage, loans, etc.)?',
    questionZh: '整体负债情况（房贷、贷款等）如何？',
    options: [
      {
        id: 'minimal',
        label: 'Minimal or none',
        labelZh: '很少或没有',
        scores: { tax: 2, risk: 0, wellness: 2 },
      },
      {
        id: 'manageable',
        label: 'Manageable — on track',
        labelZh: '可控，按计划偿还',
        scores: { tax: 2, risk: 2, wellness: 1 },
      },
      {
        id: 'significant',
        label: 'Significant — takes a meaningful share of income',
        labelZh: '占收入比例较高',
        scores: { tax: 1, risk: 4, wellness: 0 },
      },
      {
        id: 'heavy',
        label: 'Heavy — a major monthly pressure',
        labelZh: '压力较大，是重要负担',
        scores: { tax: 0, risk: 5, wellness: 0 },
      },
    ],
  },
  {
    id: 'health',
    question: 'How do you feel about your energy and health lately?',
    questionZh: '最近您的精力与健康状态如何？',
    options: [
      {
        id: 'excellent',
        label: 'Excellent — no concerns',
        labelZh: '很好，暂无顾虑',
        scores: { tax: 2, risk: 1, wellness: 0 },
      },
      {
        id: 'good',
        label: 'Generally good',
        labelZh: '总体不错',
        scores: { tax: 1, risk: 2, wellness: 1 },
      },
      {
        id: 'fatigue',
        label: 'Some fatigue, poor sleep, or minor issues',
        labelZh: '有时疲劳、睡眠不佳或小问题',
        scores: { tax: 0, risk: 1, wellness: 3 },
      },
      {
        id: 'subhealth',
        label: 'Managing subhealth or a chronic condition',
        labelZh: '亚健康或需管理基础病症',
        scores: { tax: 0, risk: 0, wellness: 5 },
      },
    ],
  },
  {
    id: 'workload',
    question: 'How demanding is your work or daily routine?',
    questionZh: '工作或日常节奏有多紧张？',
    options: [
      {
        id: 'predictable',
        label: 'Predictable and balanced',
        labelZh: '规律、相对平衡',
        scores: { tax: 2, risk: 1, wellness: 0 },
      },
      {
        id: 'occasional',
        label: 'Occasionally busy',
        labelZh: '偶尔忙碌',
        scores: { tax: 1, risk: 2, wellness: 1 },
      },
      {
        id: 'travel',
        label: 'Often overtime, travel, or irregular hours',
        labelZh: '经常加班、出差或作息不规律',
        scores: { tax: 0, risk: 1, wellness: 4 },
      },
      {
        id: 'high_stress',
        label: 'High-stress — always on, little recovery time',
        labelZh: '高压连轴转，很少恢复',
        scores: { tax: 0, risk: 2, wellness: 5 },
      },
    ],
  },
  {
    id: 'protection',
    question: 'If a major unexpected event hit tomorrow, how prepared would your household be?',
    questionZh: '若明天发生较大意外，家庭财务准备程度如何？',
    questionHint:
      'For example: income stopped for 6+ months, or $50,000+ in medical or emergency costs · 例如：收入中断 6 个月以上，或需承担 $50,000 以上的医疗/紧急支出',
    options: [
      {
        id: 'not_ready',
        label: 'Not very prepared',
        labelZh: '准备不足',
        scores: { tax: 1, risk: 4, wellness: 0 },
      },
      {
        id: 'somewhat',
        label: 'Somewhat — gaps remain',
        labelZh: '有一些，但仍有缺口',
        scores: { tax: 0, risk: 4, wellness: 1 },
      },
      {
        id: 'fairly',
        label: 'Fairly prepared',
        labelZh: '较充分',
        scores: { tax: 1, risk: 1, wellness: 2 },
      },
      {
        id: 'well',
        label: 'Well protected — basics are covered',
        labelZh: '基本保障已具备',
        scores: { tax: 0, risk: 0, wellness: 4 },
      },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you right now?',
    questionZh: '当下对您最重要的是？',
    options: [
      {
        id: 'tax',
        label: 'Keep more of what I earn — tax efficiency',
        labelZh: '合法少交税、留住辛苦钱',
        scores: { tax: 5, risk: 0, wellness: 0 },
      },
      {
        id: 'protect',
        label: 'Protect my family and build long-term security',
        labelZh: '保障家人、做长期安全规划',
        scores: { tax: 0, risk: 5, wellness: 0 },
      },
      {
        id: 'health',
        label: 'Rebuild energy, health, and daily performance',
        labelZh: '提升精力、健康与状态',
        scores: { tax: 0, risk: 0, wellness: 5 },
      },
      {
        id: 'balance',
        label: 'Balance all three — tax, protection, and wellness',
        labelZh: '三者兼顾，整体规划',
        scores: { tax: 1, risk: 2, wellness: 2 },
      },
    ],
  },
]

export const serviceCatalog = {
  tax: {
    id: 'tax',
    tier: 'tax',
    title: 'Tax Planning',
    titleZh: '筹税规划',
    desc: 'Income structure, deductible expenses, and legal strategies to keep more of what you earn.',
    descZh: '收入结构优化、费用合理入账、合法节税策略。',
  },
  ins: {
    id: 'ins',
    tier: 'risk',
    title: 'Life Insurance',
    titleZh: '人寿保险',
    desc: 'Family protection, cash value growth, legacy planning, and liquidity when life changes.',
    descZh: '家庭保障、现金值增值、传承规划，需要时可灵活周转。',
  },
  health: {
    id: 'health',
    tier: 'wellness',
    title: 'USANA Wellness',
    titleZh: 'USANA 健康管理',
    desc: 'Medical-grade nutrition tailored to your age, stress level, and health profile.',
    descZh: '按年龄、压力与健康状态定制医疗级营养方案。',
  },
}

export const TIER_SERVICE_KEY = { tax: 'tax', risk: 'ins', wellness: 'health' }

export const tierProfiles = {
  tax: {
    id: 'tax',
    name: 'Tax Efficiency',
    nameZh: '节税档',
    color: '#fdf2f6',
    accent: '#c76b8a',
    badge: 'Tax & Asset Building',
    badgeZh: '筹税节税 · 原始资产积累',
    headline: 'Your focus: keep more of what you earn.',
    headlineZh: '当前重点：合法筹税节税，积累原始资产',
    summary:
      'Your profile points to building financial foundation through smart tax structure — optimizing what you keep from each dollar earned.',
    summaryZh:
      '您的画像指向通过合理税务结构夯实财务基础——让辛苦赚来的每一分钱都发挥更大作用。',
    traits: [
      { en: 'Tax-efficient structure can free cash flow for other goals', zh: '合规税务结构能释放现金流，支撑其他目标', context: 'any' },
      { en: 'Dependent children create additional legitimate tax-planning opportunities', zh: '未成年子女可带来额外的合规节税空间', context: 'hasChildren' },
      { en: 'Tight cash flow means each dollar saved through tax strategy has outsized impact', zh: '现金流偏紧时，通过节税省下的每一分钱都格外有价值', context: 'tightCash' },
      { en: 'Ideal time to establish compliant deduction and income strategies', zh: '越早建立正确的费用与收入结构，长期复利越明显', context: 'any' },
      { en: 'Protection and wellness can layer in as assets grow', zh: '保障与养生可在资产积累后逐步叠加', context: 'any' },
    ],
    services: [],
  },
  risk: {
    id: 'risk',
    name: 'Risk Protection',
    nameZh: '避险档',
    color: '#eef4fc',
    accent: '#4a8fd4',
    badge: 'Risk & Family Planning',
    badgeZh: '风险规划 · 长期保障与传承',
    headline: 'Your focus: protect your family and build long-term security.',
    headlineZh: '当前重点：避险规划，保险理财与长期传承',
    summary:
      'Debt, income disruption, or family obligations would significantly impact your household. Long-term protection, cash value growth, and estate planning deserve attention now.',
    summaryZh:
      '负债、收入中断或家庭责任一旦遇险，对家庭冲击较大。现阶段应关注长期保障、保单现金值复利与传承布局。',
    traits: [
      { en: 'Young or school-age children increase protection urgency', zh: '年幼子女使家庭保障需求更紧迫', context: 'hasChildren' },
      { en: 'Household relies on your income continuity — protection closes the gap', zh: '家庭依赖您的收入连续性，保障规划可填补风险缺口', context: 'noChildren' },
      { en: 'Debt load makes income continuity critical', zh: '负债较高时，收入连续性尤为关键', context: 'hasDebt' },
      { en: 'Cash value policies can compound while protecting the family', zh: '保单现金值可在保障家人的同时稳健复利', context: 'any' },
      { en: 'Tax structure supports premium and planning efficiency', zh: '税务结构可让保费与规划成本发挥更大效益', context: 'any' },
    ],
    services: [],
  },
  wellness: {
    id: 'wellness',
    name: 'Wellness',
    nameZh: '养生档',
    color: '#eef8f0',
    accent: '#4a9d6e',
    badge: 'Wellness & Performance',
    badgeZh: '身体养护 · 精力与形象管理',
    headline: 'Your focus: invest in the health that supports everything else.',
    headlineZh: '当前重点：保养身体，保持精力与专业形象',
    summary:
      'With fewer dependent-child obligations — or children already independent — your priority shifts to sustaining energy, managing subhealth, and maintaining the performance your career and life demand.',
    summaryZh:
      '随着孩子独立或家庭抚养负担减轻，重心转向维持精力、管理亚健康，以及支撑事业与生活状态的身体资本。',
    traits: [
      { en: 'Economic foundation or career phase allows focus beyond basic survival', zh: '经济基础或事业阶段已允许关注健康投资', context: 'any' },
      { en: 'Fatigue, travel, or health signals deserve proactive attention', zh: '疲劳、出差或健康指标宜尽早干预', context: 'any' },
      { en: 'With fewer child-rearing duties, resources can shift to your own vitality', zh: '抚养负担减轻后，资源可以更集中地投向自身健康', context: 'noChildren' },
      { en: 'Wellness spending can integrate with compliant tax strategy', zh: '养生投入可通过结构规划合理节税', context: 'any' },
      { en: 'Existing protection can be reviewed rather than built from scratch', zh: '现有保障可检视优化，而非从零开始', context: 'any' },
    ],
    services: [],
  },
}
