// ─── BRAND ────────────────────────────────────────────────────────────────────
export const brand = {
  name: 'ONYX Entropy Station',
  nameZh: 'ONYX熵减规划站',
  fitCheck: 'ONYX System Scan',
  method: 'The Entropy Protocol',
  methodZh: '熵减协议',
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
    desc: "You built the system. Stop letting it leak — overpaid tax is a design flaw, not a cost of doing business.",
    descZh: '系统是你建的，别让它带着漏洞运行——多交的税不是成本，是没修好的漏洞。',
    tags: ['Tax Strategy', 'Cash Flow', 'Protection'],
    page: 'tax',
  },
  {
    num: '02',
    en: 'Affluent Young Families',
    zh: '轻奢年轻家庭',
    age: "Age 28–42 · Children at home · Quality-focused",
    desc: "Precision, not compromise. Your children's health and your family's financial structure both run on the optimal path.",
    descZh: '不将就。孩子的健康与家庭的资产配置，都按最优解执行，而不是凑合。',
    tags: ['Child Wellness', 'Nutrition', 'Legacy'],
    page: 'health',
  },
  {
    num: '03',
    en: 'Prime-Age Wellness Seekers',
    zh: '年富力强养生族',
    age: 'Age 40–55 · Established · Health-conscious',
    desc: 'Blood pressure, blood sugar, sleep — your vitals are signaling drift. Intervene before the system fails.',
    descZh: '血压、血糖、睡眠——系统已经在报警，趁早介入，代价最低。',
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
    desc: 'A structural audit of your tax exposure — legal, precise, engineered to stop the leak before it compounds.',
    descZh: '对税务结构做系统级审计——合法、精确，把不该交的税找回来，止住漏损。',
  },
  {
    id: 'ins',
    num: 'II',
    en: 'Life Insurance',
    zh: '人寿保险',
    desc: 'Cash value as infrastructure — protection and compounding running on the same rail, not waiting on each other.',
    descZh: '现金值即基础设施。保障与复利在同一套系统里并行运转，不是二选一。',
  },
  {
    id: 'health',
    num: 'III',
    en: 'USANA Wellness',
    zh: 'USANA 健康管理',
    desc: 'Medical-grade nutrition, calibrated to your biological data — routed back through your tax structure as a deduction.',
    descZh: '医疗级营养输入，按个人生理数据校准——支出重新接入税务结构，合规抵扣。',
  },
]

// ─── FLYWHEEL ─────────────────────────────────────────────────────────────────
export const flywheel = [
  {
    num: 'I',
    en: 'Eliminate structural leakage',
    zh: '消除结构性损耗',
    descEn: 'Tax inefficiency is entropy. Every unstructured dollar decays into unnecessary tax.',
    descZh: '税务结构混乱即是熵增。未经规划的每一元，都在悄悄贬值。',
  },
  {
    num: 'II',
    en: 'Compound in a closed loop',
    zh: '建立复利闭环',
    descEn: 'Capital left idle disperses. A structured policy locks value in and compounds it, silently.',
    descZh: '闲置的资金会耗散。结构化保单锁定价值，让复利在沉默中运转。',
  },
  {
    num: 'III',
    en: 'Stabilize the core variable',
    zh: '稳定核心变量',
    descEn: 'Your body is the one system that determines every other system\'s output. Maintain it like infrastructure.',
    descZh: '身体是决定其他一切系统输出的核心变量，要像维护基础设施一样维护它。',
  },
  {
    num: 'IV',
    en: 'Feed the loop back',
    zh: '反哺闭环',
    descEn: 'Wellness spend re-enters the system as a tax offset. Nothing wasted. The loop closes.',
    descZh: '养生支出重新进入系统，成为税务对冲。没有浪费，闭环自洽。',
  },
]

// ─── SERVICE PAGES ────────────────────────────────────────────────────────────
export const servicePages = {
  tax: {
    badge: 'PROTOCOL I · TAX ENTROPY · 税务熵减',
    h1: "Your tax structure is leaking capital.",
    h1Zh: '税务结构存在漏损，金额比你想象的更多',
    p: 'As an IRS Enrolled Agent, Sammi Q runs a systems-level audit on income structure, deductible expense flow, and wellness-linked planning — closing leaks before they compound.',
    pZh: '作为注册税务师（EA），Sammi Q 对收入结构、费用抵扣与健康投资节税进行系统级审计——在漏损扩大之前，逐项修补。',
    cta: 'Run Free Tax Audit · 启动免费税务诊断',
    audiences: [
      { en: 'Business Owner Families', zh: '小企业主家庭' },
      { en: 'Affluent Young Families', zh: '轻奢年轻家庭' },
      { en: 'Prime-Age Wellness Seekers', zh: '年富力强养生族' },
    ],
    points: [
      { en: 'Income Structure Calibration', zh: '收入结构校准', descEn: 'Salary vs. dividends, recalibrated. The right split compounds into thousands saved annually.', descZh: '薪资与分红重新校准，配比正确，每年可省下数千美元。' },
      { en: 'Expense Flow Recovery', zh: '费用抵扣回收', descEn: 'Most owners leave deductions unclaimed. We trace the flow and recover what\'s legally yours.', descZh: '多数老板遗漏了可抵扣项，我们追踪费用流，把合法该拿回的部分找回来。' },
      { en: 'Wellness-Linked Tax Structuring', zh: '健康支出税务结构化', descEn: 'Nutrition and health spend, re-engineered into compliant, legitimate deductions.', descZh: '营养与健康支出，通过合规架构转化为可抵扣项。' },
      { en: 'Multi-Generational Transfer Design', zh: '跨代资产转移设计', descEn: 'Wealth moves to the next generation on a structured path — minimal tax drag, no leakage.', descZh: '财富沿结构化路径传给下一代——税务损耗降到最低。' },
    ],
    quote: {
      en: "Three years into running my business, I found I'd been overpaying by nearly $8,000 a year — not because I broke a rule, but because no one showed me the system.",
      zh: '创业三年才发现，每年多缴了近 $8,000 的税——不是违规，是没人告诉我系统怎么运作。',
    },
    video: {
      ey: 'Tax Entropy · 税务熵减',
      title: 'Stop the Leak Before It Compounds',
      sub: 'Sammi Q breaks down the tax structure most business owners never see — in plain English and Mandarin.',
      youtubeId: '', // ← paste YouTube video ID here when ready
    },
  },

  ins: {
    badge: 'PROTOCOL II · RISK ENTROPY · 风险熵减',
    h1: 'Idle capital is a design flaw.',
    h1Zh: '保单不该只是意外发生时才启动的备用系统',
    p: 'As a licensed life insurance agent, Sammi Q engineers policy cash value into an active financial subsystem — protection and compounding running in parallel, not sequence.',
    pZh: '作为持牌寿险顾问，Sammi Q 将保单现金值设计为主动运行的财务子系统——保障与复利并行运转，而非彼此等待。',
    cta: 'Activate Your Policy · 启动保单系统',
    audiences: [
      { en: 'Business Owner Families', zh: '小企业主家庭' },
      { en: 'Affluent Young Families', zh: '轻奢年轻家庭' },
      { en: 'Prime-Age Wellness Seekers', zh: '年富力强养生族' },
    ],
    points: [
      { en: 'Full-System Family Protection', zh: '全家人身保障系统', descEn: 'If the unexpected hits, the system holds — education funded, household stable, no gaps.', descZh: '意外发生时，系统不崩溃——教育有保障，家庭运转不中断。' },
      { en: 'Volatility-Immune Compounding', zh: '抗波动复利机制', descEn: 'Cash value ignores market noise. A quiet subsystem, compounding on its own schedule.', descZh: '现金值不受市场噪音干扰，按自身节奏静默复利。' },
      { en: 'On-Demand Liquidity', zh: '即时流动性通道', descEn: 'Borrow against the policy directly — no bank queue, no approval lag, coverage stays live.', descZh: '直接抵押保单借款——无需排队审批，保障持续在线。' },
      { en: 'Critical Illness Failsafe', zh: '重疾故障保护层', descEn: 'Past 40, the system starts throwing warnings. Pre-installed coverage costs a fraction of a post-failure fix.', descZh: '40岁后，系统开始报警。提前安装的保障，远比故障后维修便宜。' },
    ],
    quote: {
      en: "I treat my policy's cash value like a second, faster subsystem. When capital was needed, I didn't queue at a bank — I executed the same week.",
      zh: '我把保单现金值当成第二套更快的系统。资金需要周转时，不用去银行排队——当周直接执行。',
    },
    video: {
      ey: 'Risk Entropy · 风险熵减',
      title: "A Policy That Runs While You Don't",
      sub: 'How to turn life insurance cash value into an active financial subsystem — explained plainly.',
      youtubeId: '', // ← paste YouTube video ID here when ready
    },
  },

  health: {
    badge: 'PROTOCOL III · BIOLOGICAL ENTROPY · 生理熵减',
    h1: 'Your body is broadcasting failure signals.',
    h1Zh: '身体系统已发出预警信号',
    p: 'As a certified NMNA nutritionist and USANA advisor, Sammi Q calibrates medical-grade nutrition to your biological data — and routes the spend back through your tax structure.',
    pZh: '作为NMNA认证营养师与USANA顾问，Sammi Q 按你的生理数据校准医疗级营养方案——并将支出重新接入税务结构。',
    cta: 'Calibrate Your System · 启动健康校准',
    audiences: [
      { en: 'Prime-Age Wellness Seekers', zh: '年富力强养生族' },
      { en: 'Affluent Young Families', zh: '轻奢年轻家庭' },
      { en: 'Business Owner Families', zh: '小企业主家庭' },
    ],
    points: [
      { en: 'Chronic Failure Prevention (40+)', zh: '40+ 慢性故障预防', descEn: 'Blood sugar, blood pressure, sleep — early intervention costs a fraction of managing system failure later.', descZh: '血糖、血压、睡眠——早期介入的成本，是系统故障后维修成本的零头。' },
      { en: 'Immune System Hardening', zh: '儿童免疫系统强化', descEn: 'Targeted nutrition builds resilience at the source — prevention engineered in, not patched on after.', descZh: '靶向营养从源头构建抵抗力——预防内建，而非事后修补。' },
      { en: 'Output Performance Management', zh: '精力输出管理', descEn: 'Morning energy state determines every downstream decision. Your body is infrastructure — maintain it as such.', descZh: '晨间精力状态决定后续所有决策质量。身体即基础设施，须按设施标准维护。' },
      { en: 'Wellness-to-Tax Feedback Loop', zh: '健康-税务反馈闭环', descEn: 'Structured correctly, nutrition spend re-enters the system as a compliant deduction. Nothing wasted.', descZh: '结构正确时，营养支出重新进入系统，成为合规抵扣项——没有浪费。' },
    ],
    quote: {
      en: "At 45, my markers were drifting the wrong direction. Six months of targeted supplementation and every reading was back in range — the entire program written off, system fully closed-loop.",
      zh: '45岁体检，各项指标开始偏离正常区间。靶向补充六个月后，指标全部回正——而这套方案还全额合规抵税，系统完全闭环。',
    },
    video: {
      ey: 'Biological Entropy · 生理熵减',
      title: 'Your Body Is Broadcasting Failure Signals',
      sub: "Sammi Q on medical-grade nutrition, early intervention, and closing the loop with your tax strategy.",
      youtubeId: '', // ← paste YouTube video ID here when ready
    },
  },
}
