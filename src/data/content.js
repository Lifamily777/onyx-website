// ─── BRAND ────────────────────────────────────────────────────────────────────
export const brand = {
  name: 'ONYX Wealth & Wellness',
  nameZh: '三生元财富健康规划',
  fitCheck: 'ONYX Fit Check',
  method: 'The ONYX Method',
  methodZh: '三生元方法',
}

// ─── ADVISOR ──────────────────────────────────────────────────────────────────
export const advisor = {
  name: 'Sammi Q',
  role: 'EA · Licensed Insurance Agent · NMNA Nutritionist',
  email: 'contact@onyxww.net',
  credentials: [
    {
      en: 'Enrolled Agent (EA)',
      zh: 'IRS 注册税务师 · 美国国税局认证',
    },
    {
      en: 'Licensed Life Insurance Agent',
      zh: '持牌寿险顾问 · 北美执照',
    },
    {
      en: 'NMNA Certified Nutritionist',
      zh: 'NMNA 营养师认证 · USANA 合作顾问',
    },
  ],
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
export const navItems = [
  { id: 'home',    label: 'Home' },
  { id: 'tax',     label: 'Tax Planning' },
  { id: 'ins',     label: 'Insurance' },
  { id: 'health',  label: 'Wellness' },
]

// ─── PERSONAS ─────────────────────────────────────────────────────────────────
export const personas = [
  {
    num: '01',
    en: 'Business Owner Families',
    zh: '小企业主家庭',
    age: 'Age 30–50 · $150k+ household income',
    desc: "You've built something real. Now it's time to stop overpaying taxes and start protecting what you've earned.",
    descZh: '生意做得扎实，不想多交税，想把财务结构做好。',
    tags: ['Tax Strategy', 'Cash Flow', 'Protection'],
    page: 'tax',
  },
  {
    num: '02',
    en: 'Affluent Young Families',
    zh: '轻奢年轻家庭',
    age: "Age 28–42 · Children at home · Quality-focused",
    desc: "You don't settle. Your children's health, your family's nutrition, and your lifestyle reflect your values.",
    descZh: '消费有品位，孩子的健康和全家营养都不妥协。',
    tags: ['Child Wellness', 'Nutrition', 'Legacy'],
    page: 'health',
  },
  {
    num: '03',
    en: 'Prime-Age Wellness Seekers',
    zh: '年富力强养生族',
    age: 'Age 40–55 · Established · Health-conscious',
    desc: 'Blood pressure, blood sugar, sleep quality — your body is sending signals. Time to act before problems deepen.',
    descZh: '身体开始发信号，决定认真对待健康，提前布局。',
    tags: ['Prevention', 'Anti-Aging', 'Chronic Care'],
    page: 'health',
  },
]

// ─── SERVICES (home cards) ────────────────────────────────────────────────────
export const services = [
  {
    id: 'tax',
    num: 'I',
    en: 'Tax Planning',
    zh: '筹税规划',
    desc: 'Legal tax strategies for business owners and families — income structuring, deductible expenses, wellness-integrated planning.',
    descZh: '合法合规，把本不该交的税留在您口袋里，让现金流真正活起来。',
  },
  {
    id: 'ins',
    num: 'II',
    en: 'Life Insurance',
    zh: '人寿保险',
    desc: 'Policy cash value as an active financial tool — family protection and asset growth working at the same time.',
    descZh: '保单现金值做财务工具，保障与增值同时实现，不是二选一。',
  },
  {
    id: 'health',
    num: 'III',
    en: 'USANA Wellness',
    zh: 'USANA 健康管理',
    desc: 'Medical-grade nutrition tailored by age and health profile — structured to reduce your tax bill at the same time.',
    descZh: '医疗级营养素，针对不同年龄定制方案，养生开销还能合理节税。',
  },
]

// ─── FLYWHEEL ─────────────────────────────────────────────────────────────────
export const flywheel = [
  {
    num: 'I',
    en: 'Save on taxes first',
    zh: '先把税省下来',
    descEn: 'Legally reduce your tax burden. That freed cash flow makes everything else possible.',
    descZh: '合法省税，现金流才有空间做下一步。',
  },
  {
    num: 'II',
    en: 'Put your money to work',
    zh: '让钱为你工作',
    descEn: 'A well-structured life policy protects your family and compounds quietly over time.',
    descZh: '保单保障家人，现金值持续增值。',
  },
  {
    num: 'III',
    en: 'Protect your most valuable asset',
    zh: '保住最贵的资产',
    descEn: 'Your health determines everything. Medical-grade nutrition keeps you performing at your best.',
    descZh: '身体是最贵的资产，营养素保你持续在线。',
  },
  {
    num: 'IV',
    en: 'Your wellness reduces your taxes',
    zh: '养生开销，税务上拿回来',
    descEn: 'With the right structure, your health investment becomes a legitimate tax deduction.',
    descZh: '健康投资合规节税，闭环形成，循环往复。',
  },
]

// ─── SERVICE PAGES ────────────────────────────────────────────────────────────
export const servicePages = {
  tax: {
    badge: 'I · Tax Planning · 筹税规划',
    h1: "You're probably paying more tax than you should.",
    h1Zh: '您每年多交的税，比您想的还多',
    p: 'As an IRS Enrolled Agent, Sammi Q specializes in legal tax strategies for business owners and families — income structuring, deductible expenses, and wellness-integrated planning.',
    pZh: '作为注册税务师（EA），Sammi Q 专为企业主和家庭提供合法节税方案——收入结构、费用入账、健康投资节税。',
    cta: 'Book Free Tax Review · 预约筹税分析',
    audiences: [
      { en: 'Business Owner Families', zh: '小企业主家庭' },
      { en: 'Affluent Young Families', zh: '轻奢年轻家庭' },
      { en: 'Prime-Age Wellness Seekers', zh: '年富力强养生族' },
    ],
    points: [
      { en: 'Income Structure Optimization', zh: '收入结构优化', descEn: 'Salary vs. dividends — the right split can save thousands annually.', descZh: '薪资与分红的最优配比，每年可省数千元税款。' },
      { en: 'Business Expense Deductions', zh: '业务费用合理入账', descEn: 'Most business owners are leaving deductions on the table. We find them.', descZh: '很多老板一直在漏报可扣除项，我们帮您找回来。' },
      { en: 'Wellness as a Tax Strategy', zh: '健康投资节税', descEn: 'Nutrition and health programs structured as legitimate, compliant tax deductions.', descZh: '营养素和健康方案，通过正确规划合规抵税。' },
      { en: 'Family Wealth & Legacy Planning', zh: '家庭财富传承', descEn: 'Transfer wealth to the next generation efficiently, minimizing tax exposure.', descZh: '财富有序传给下一代，减少不必要的税务损耗。' },
    ],
    quote: {
      en: "Three years into running my business, I discovered I'd been overpaying by nearly $8,000 a year — not because I was doing anything wrong, just because nobody told me what was legally available.",
      zh: '做了三年生意才发现，每年多交了将近 $8,000 的税——不是因为违规，是因为没人告诉我哪些钱可以合法少交。',
    },
    video: {
      ey: 'Tax Planning · 筹税规划',
      title: 'How to Stop Overpaying Taxes',
      sub: 'Sammi Q explains legal tax strategies for business owners and families — in plain English and Mandarin.',
      youtubeId: '', // ← paste YouTube video ID here when ready
    },
  },

  ins: {
    badge: 'II · Life Insurance · 人寿保险',
    h1: 'Your policy should work while you sleep.',
    h1Zh: '保险不只是万一用得上的备胎',
    p: 'As a licensed life insurance agent, Sammi Q helps families and business owners use policy cash value as an active financial tool — protection and growth, working in parallel.',
    pZh: '作为持牌寿险顾问，Sammi Q 帮助家庭和企业主把保单现金值变成活的财务工具——保障与增值同步实现。',
    cta: 'Explore Options · 了解方案',
    audiences: [
      { en: 'Business Owner Families', zh: '小企业主家庭' },
      { en: 'Affluent Young Families', zh: '轻奢年轻家庭' },
      { en: 'Prime-Age Wellness Seekers', zh: '年富力强养生族' },
    ],
    points: [
      { en: 'Comprehensive Family Protection', zh: '全家人身保障', descEn: "If the unexpected happens, your children's education and your family's life remain secure.", descZh: '万一发生意外，孩子的教育和家人的生活不受影响。' },
      { en: 'Cash Value Growth', zh: '现金值稳健增值', descEn: 'Immune to market volatility — a quietly compounding account working in your favor.', descZh: '不受市场波动，像一个安静生息的账户持续积累。' },
      { en: 'Liquidity When You Need It', zh: '流动性随时可用', descEn: 'Borrow against your policy for business needs — no bank approval, coverage stays intact.', descZh: '需要周转，可抵押保单借款，保障同时继续生效。' },
      { en: 'Critical Illness Coverage', zh: '重疾与慢性病保障', descEn: 'After 40, the body starts sending signals. Planning now costs a fraction of waiting.', descZh: '40岁后提前布局，比事后补救便宜得多。' },
    ],
    quote: {
      en: "I treat my policy's cash value like a second bank account. When my business needed capital, I didn't wait in line at the bank — I handled it myself, same week.",
      zh: '我把保单现金值当成第二个银行。生意需要周转时，不用去银行排队审批，当周自己就解决了。',
    },
    video: {
      ey: 'Life Insurance · 人寿保险',
      title: 'Make Your Policy Work While You Sleep',
      sub: 'A plain-language introduction to using life insurance cash value as an active financial tool.',
      youtubeId: '', // ← paste YouTube video ID here when ready
    },
  },

  health: {
    badge: 'III · USANA Wellness · 健康管理',
    h1: 'Your body is sending signals. Time to listen.',
    h1Zh: '身体开始发信号，这次认真对待',
    p: 'As a certified NMNA nutritionist and USANA advisor, Sammi Q designs medical-grade wellness programs for every life stage — and integrates them into your overall tax strategy.',
    pZh: '作为NMNA认证营养师和USANA顾问，Sammi Q 为不同年龄定制方案，养生开销同步纳入税务规划。',
    cta: 'Start Wellness Plan · 了解健康方案',
    audiences: [
      { en: 'Prime-Age Wellness Seekers', zh: '年富力强养生族' },
      { en: 'Affluent Young Families', zh: '轻奢年轻家庭' },
      { en: 'Business Owner Families', zh: '小企业主家庭' },
    ],
    points: [
      { en: 'Chronic Disease Prevention (40+)', zh: '40+ 慢性病预防', descEn: 'Blood sugar, blood pressure, sleep — intervening early costs a fraction of managing illness later.', descZh: '血糖、血压、睡眠——苗头阶段干预，比生病后补救便宜十倍。' },
      { en: "Children's Immunity & Development", zh: '儿童免疫与发育', descEn: 'Targeted nutrition builds resilience from within — prevention, not reaction.', descZh: '从根本提升免疫力，不是治病，是预防。' },
      { en: 'Energy & Stress Performance', zh: '精力与抗压管理', descEn: 'How you feel each morning shapes every decision you make. Your body is your most valuable business asset.', descZh: '身体是最贵的资产，每天的精力状态决定决策质量。' },
      { en: 'Wellness as a Tax Deduction', zh: '养生开销合理节税', descEn: 'With the right structure, your nutrition investment becomes a legitimate, compliant tax strategy.', descZh: '通过正确规划，健康投资合规抵税，聪明的钱一分不浪费。' },
    ],
    quote: {
      en: "At 45, my doctor told me my blood sugar was heading in the wrong direction. Six months of targeted supplementation later, every marker was back in range — and the entire program was written off on my taxes.",
      zh: '45岁体检发现血糖偏高，认真补充营养素半年后指标全回正常——而且这笔养生开销全部合规节税了。',
    },
    video: {
      ey: 'USANA Wellness · 健康管理',
      title: 'Your Body Is Sending Signals. Time to Listen.',
      sub: 'Sammi Q on medical-grade nutrition, chronic disease prevention, and how wellness can reduce your taxes.',
      youtubeId: '', // ← paste YouTube video ID here when ready
    },
  },
}
