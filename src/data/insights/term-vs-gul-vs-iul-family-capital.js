const previousSlug = 'why-chinese-families-love-saving-but-distrust-insurance'

const sources = [
  { label: 'IRS — Life Insurance & Disability Insurance Proceeds', href: 'https://www.irs.gov/faqs/interest-dividends-other-types-of-income/life-insurance-disability-insurance-proceeds/life-insurance-disability-insurance-proceeds' },
  { label: 'IRS Publication 551 — Basis of Assets', href: 'https://www.irs.gov/publications/p551' },
  { label: 'NAIC — Life Insurance Illustrations', href: 'https://content.naic.org/insurance-topics/life-insurance-illustrations' },
  { label: 'NAIC Consumer Guide — Life Insurance', href: 'https://content.naic.org/consumer/life-insurance.htm' },
]

const en = {
  title: 'You Don’t Need the “Best” Life Insurance — You Need the Right Job for Your Money',
  subtitle: 'Term buys time. GUL buys certainty. IUL buys flexibility. The harder question is whether your family has the capital—and the need—to use each one well.',
  seoTitle: 'Term vs GUL vs IUL: Which Life Insurance Fits Your Family Capital Strategy? | ONYX',
  seoDescription: 'Term, GUL and IUL solve different financial problems. Learn how protection needs, cash flow, family banking, long-term capital and opportunity cost can help determine which life insurance structure fits your family.',
  readingTime: 22,
  previousLabel: 'Previous Insight',
  previousTitle: 'Why Chinese Families Love Saving—but Often Distrust Insurance',
  blocks: [
    { type: 'p', lead: true, text: 'In our previous discussion, ONYX explored why many families instinctively distrust insurance. Some believe it costs too much. Some dislike commissions or have encountered aggressive sales. Some feel that money “disappears” if no claim is made.' },
    { type: 'p', text: 'One person hears, “Buy term and invest the difference.” Another hears, “Build your own family bank with permanent life insurance.” Both statements can contain useful ideas. The trouble begins when they are used to compare tools designed for completely different jobs.' },
    { type: 'p', text: 'Imagine walking into a dealership and asking, “Which is better—a pickup truck, a sports car, or a seven-seat SUV?” The responsible answer is not, “The most expensive one.” It is: “What are you trying to do with it?”' },
    { type: 'callout', text: 'Insurance selection is not primarily a product-selection problem. It is a family capital-allocation problem.' },
    { type: 'jobs' },
    { type: 'definitions', items: [
      { term: 'Term Life Insurance (Term)', text: 'Coverage for a defined period—commonly 10, 20 or 30 years. Its main purpose is to provide a large death benefit efficiently during the years a family is most financially exposed. It generally does not build cash value.' },
      { term: 'Guaranteed Universal Life (GUL)', text: 'A form of permanent life insurance designed primarily to keep a stated death benefit in force to a specified age, provided the required premiums and guarantee conditions are satisfied. Cash-value growth is usually not its central goal.' },
      { term: 'Indexed Universal Life (IUL)', text: 'A flexible permanent policy with cash value whose interest crediting is linked to the performance of a market index under contract rules, including caps, participation rates and floors. It does not invest directly in the index, and illustrated performance is not guaranteed.' },
    ] },

    { type: 'h2', eyebrow: '01', title: 'Term — Buying Time' },
    { type: 'p', text: 'Consider a household with a mortgage, young children, one or two primary earners, limited savings and little disposable income. Its immediate problem is probably not how to build an elaborate family-banking system. It is simpler and more urgent: “If I die tomorrow, how does my family continue?”' },
    { type: 'p', text: 'Term life insurance is designed to answer that question efficiently. It can provide a large death benefit for a defined period at a relatively low initial premium. It generally does not build meaningful cash value, because accumulation is not its assignment.' },
    { type: 'callout', text: 'Term is not inferior because it has no cash value. Cash value was never the job it was hired to perform.' },
    { type: 'p', text: 'Its limitation is in the name: the level term eventually ends. A family may later face higher renewal rates, use a conversion option if available, qualify for new coverage, or increasingly rely on accumulated assets to self-insure. Term buys time; it does not promise that the same coverage and premium will last forever.' },

    { type: 'h2', eyebrow: '02', title: 'GUL — Buying Certainty' },
    { type: 'p', text: 'A different household may care less about maximizing policy cash value and more about preserving a defined death benefit for a long time. Guaranteed Universal Life (GUL) is primarily designed around long-duration death-benefit protection and contractual guarantees—provided required premiums are paid and all policy conditions are satisfied.' },
    { type: 'callout', text: 'You are not primarily paying for excitement. You are paying for certainty.' },
    { type: 'p', text: 'That certainty may support legacy or estate planning, depending on the contract and guarantee period. Premiums are generally higher than comparable term coverage. Cash-value growth is usually not the main objective, and family-banking flexibility may be limited compared with a policy designed and funded for cash accumulation. A guarantee is only as good as the exact contract requirements that keep it in force.' },

    { type: 'h2', eyebrow: '03', title: 'IUL — Buying Flexibility' },
    { type: 'p', text: 'Now consider a household with stable income, emergency reserves, manageable debt, retirement savings already underway and additional long-term capital. Its question may be: “Can part of my long-term capital do more than one job?”' },
    { type: 'p', text: 'Indexed Universal Life (IUL) may combine permanent death-benefit protection with potential cash-value accumulation, index-linked crediting, tax-deferred policy-value growth under current tax rules, withdrawals or policy loans under contract rules, and optional living-benefit riders. Depending on design and performance, it may support supplemental retirement, liquidity or legacy planning.' },
    { type: 'p', text: 'But an IUL is not simply “an investment earning 6% or 7%.” Policy economics are closer to: premium, plus credited interest, minus insurance costs, policy expenses, rider charges and any loan effects. The accumulated value and the cash surrender value—not a headline illustration rate—are what ultimately matter.' },
    { type: 'callout', text: 'Flexibility is IUL’s strength—and also the reason it requires more understanding and management.' },

    { type: 'h2', eyebrow: '04', title: 'The Question Most Insurance Conversations Skip: How Much Capital Do You Actually Have?' },
    { type: 'p', text: 'Product suitability cannot be separated from household cash flow. The same contract can be inappropriate for one family and worth investigating for another—not because the product changed, but because the household capital structure did.' },
    { type: 'families' },
    { type: 'callout', text: 'Building a future family bank should not require emptying today’s emergency fund.' },
    { type: 'ladder' },

    { type: 'h2', eyebrow: '05', title: '“Buy Term and Invest the Difference”' },
    { type: 'p', text: 'This deserves to be treated as a serious strategy. Term may cost substantially less than a heavily funded permanent policy. If a household consistently invests the difference in a diversified portfolio over decades, compounding can be powerful.' },
    { type: 'p', text: 'For educational modeling, someone might test a 9% long-term nominal return assumption. That is not a guarantee, and real markets do not deliver a smooth 9% every year. Returns fluctuate—sometimes dramatically—and behavior matters as much as arithmetic.' },
    { type: 'callout', text: 'The strategy is Buy Term AND Invest the Difference—not Buy Term AND Spend the Difference.' },
    { type: 'p', text: 'Will the family actually invest it? Or will the difference gradually become cars, travel, renovations and lifestyle inflation? A sound idea that is not followed is not yet a financial plan.' },

    { type: 'h2', eyebrow: '06', title: 'Don’t Turn an IUL Illustration Rate into an Investment Return' },
    { type: 'p', text: 'A life-insurance illustration is a model, not a promise. The NAIC framework distinguishes guaranteed elements from non-guaranteed elements. Current illustrated values and guaranteed illustrated values can diverge substantially over long periods.' },
    { type: 'p', text: 'Review accumulated value, cash surrender value, guaranteed and current illustrated values, policy charges, insurance costs, surrender periods, loan assumptions and lapse sensitivity. Never reduce the analysis to “premium × illustrated rate = future cash value.”' },
    { type: 'callout', text: 'The illustration is a model, not a promise.' },

    { type: 'h2', eyebrow: '07', title: 'What Does “Family Banking” Actually Mean?' },
    { type: 'p', text: 'Family banking does not mean an insurer gives the policyholder free money. A cash-value policy may allow its value to serve as collateral for a policy loan. Depending on policy mechanics, value may continue to receive crediting under the contract while the loan is outstanding.' },
    { type: 'p', text: 'Loan interest still applies. Loans reduce available policy value and can reduce the death benefit. Excessive borrowing can contribute to lapse, and a lapse or surrender with outstanding debt can create taxable income. Loan rates and crediting rates are not guaranteed to produce a positive spread.' },
    { type: 'callout', text: 'Family banking is a liquidity strategy, not free-money arbitrage.' },
    { type: 'p', text: 'Suppose a household needs $100,000 during a severe market downturn. A brokerage-only household might sell depressed assets, borrow externally or delay the opportunity. A household with sufficient policy value may be able to evaluate a policy loan as another option. That option is not automatically superior. Its value is optionality.' },

    { type: 'h2', eyebrow: '08', title: 'Early Death Changes the Math' },
    { type: 'p', text: 'Comparing only investment balances misses insurance’s first function. If a parent has accumulated $50,000 and dies tomorrow, the brokerage account does not automatically become $1 million. An in-force $1 million life policy may create a $1 million contractual death benefit, subject to its terms.' },
    { type: 'p', text: 'Under current U.S. federal tax rules, death proceeds paid because of the insured’s death are generally excluded from the beneficiary’s gross income, though exceptions and estate-tax considerations can apply. Inherited taxable assets may also generally receive a basis adjustment at death. It is therefore inaccurate to say simply that “insurance is tax-free while inherited stocks are fully taxable.”' },
    { type: 'p', text: 'The more useful distinction is this: insurance creates immediate risk-transfer leverage; investing needs time to accumulate capital. As family assets grow, the household may gradually become more able to self-insure.' },

    { type: 'h2', eyebrow: '09', title: 'The Decision Matrix' },
    { type: 'matrix' },

    { type: 'h2', eyebrow: '10', title: 'Four Questions Before Buying Any of Them' },
    { type: 'questions', items: [
      { q: 'If I died tomorrow, how much capital would my family actually need?', a: 'If the protection need is large but available cash is limited, research Term first.' },
      { q: 'Do I need a defined legacy even if I live to a very advanced age?', a: 'If yes, research guaranteed permanent protection such as GUL, paying close attention to the guarantee period and funding requirements.' },
      { q: 'Do I actually have long-term deployable capital?', a: 'Evaluate emergency reserves, high-interest debt, retirement savings, near-term obligations and cash-flow stability before heavily funding permanent insurance.' },
      { q: 'Do I genuinely need a long-term family capital pool?', a: 'If strong liquidity and external investments already exist—and permanent protection, living benefits and possible policy-loan access are valuable—IUL may deserve deeper investigation.' },
    ] },

    { type: 'h2', eyebrow: '11', title: 'So Which One Is Best?' },
    { type: 'p', text: 'For the most death benefit per premium dollar during a defined period, Term often wins. For guaranteed long-term legacy, GUL may win. For the broadest combination of permanent protection, cash-value flexibility and potential family-banking functionality, a properly designed and adequately funded IUL may have the strongest feature set—and the greatest need for understanding and ongoing management.' },
    { type: 'jobs', strong: true },
    { type: 'callout', text: 'More features do not automatically mean a better financial decision.' },
    { type: 'p', text: 'Insurance is not the beginning of wealth. It is one component in a family capital system. Tax planning helps retain capital. Investing helps capital grow. Insurance transfers risks a household may not be able to absorb alone. Some permanent structures may also add liquidity, legacy and capital-management options. But sequence matters.' },
    { type: 'list', items: ['Do not empty emergency savings to create a “family bank.”', 'Do not ignore essential protection while chasing investment returns.', 'Do not commit scarce capital to large long-term premiums without understanding the opportunity cost.'] },
    { type: 'quote', text: 'The most useful question may not be: “Which insurance product is best?” It may be: “Where is my family today? Where are we trying to go? And what job does each dollar need to do along the way?”' },
    { type: 'closing', text: 'Tools do not have status. Capital has a job. Life has stages.' },
  ],
  sourcesTitle: 'Sources & further reading',
  sources,
  disclaimer: 'Educational content only. This article provides general information about life-insurance concepts and family capital planning. It is not individualized insurance, investment, tax, legal, or financial advice. Policy guarantees, costs, crediting methods, riders, loans, tax treatment and benefits vary by contract, insurer and individual circumstances. Review actual policy documents and illustrations and consult appropriately licensed professionals before making financial decisions.',
}

const zh = {
  title: '你需要的不是“最好的保险”，而是最适合你家庭的钱',
  subtitle: 'Term 买时间，GUL 买确定性，IUL 买灵活性。真正困难的问题，是你的家庭现在需要什么，以及有没有足够的资本去承担它。',
  seoTitle: 'Term、GUL、IUL 怎么选？从家庭资本配置重新理解人寿保险 | ONYX',
  seoDescription: 'Term、GUL 和 IUL 并没有绝对的好坏。ONYX 从保障、现金流、长期资本、家庭银行和机会成本出发，帮助普通家庭真正理解三类人寿保险的优缺点与适用场景。',
  readingTime: 24,
  previousLabel: '上一篇 Insight',
  previousTitle: '为什么华人如此重视储蓄，却常常不信任保险？',
  blocks: [
    { type: 'p', lead: true, text: '上一篇文章里，我们谈到，为什么很多家庭一听到“保险”就会本能地后退一步。有人觉得贵，有人不喜欢佣金，也有人曾经被过度推销。还有人觉得：如果一辈子没有理赔，这笔钱是不是就白交了？' },
    { type: 'p', text: '与此同时，我们又不断听到两种声音。一种说：“买 Term，把差额拿去投资。”另一种说：“用永久寿险建立自己的家庭银行。”两句话都可能有道理，但它们常常把原本承担不同任务的工具，硬放在同一张排行榜里。' },
    { type: 'p', text: '这就像走进车行，问销售：“皮卡、跑车和七座 SUV，到底哪一个最好？”负责任的回答不会是“最贵的那台”，而应该是：“你打算用它做什么？”' },
    { type: 'callout', text: '保险选择的本质，不只是产品选择，而是家庭资本配置。' },
    { type: 'jobs' },
    { type: 'definitions', items: [
      { term: '定期寿险（Term Life / Term）', text: '在明确期限内提供保障，常见期限为 10 年、20 年或 30 年。它的主要任务，是在家庭财务风险最高的阶段，用较高效率提供大额身故保障；通常不积累现金价值。' },
      { term: '保证型万能寿险（Guaranteed Universal Life / GUL）', text: '一种以长期身故保障为核心的永久寿险。只要按要求缴纳保费并满足保证条件，保障可维持至合同约定的高龄；现金价值增长通常不是它的主要目标。' },
      { term: '指数型万能寿险（Indexed Universal Life / IUL）', text: '一种具有现金价值的灵活型永久寿险，其计息与市场指数表现挂钩，但受参与率、上限和保底等合同规则约束。保单资金并不直接投资指数，演示表现也不等于保证回报。' },
    ] },

    { type: 'h2', eyebrow: '01', title: 'Term：买时间' },
    { type: 'p', text: '想象一个正在养育孩子的家庭：有房贷，主要收入来自一两个人，储蓄还不多，每个月能留下的钱也有限。这个家庭最急迫的问题，通常不是怎样建立一套复杂的“家庭银行”，而是：“如果我明天突然不在了，这个家怎么继续？”' },
    { type: 'p', text: '定期寿险（Term Life）最擅长处理的，就是这类明确而集中的风险。它用相对较低的初始保费，在一定年限内提供较高的身故赔偿（Death Benefit）。它通常不会积累有意义的现金价值，因为那本来就不是它的任务。' },
    { type: 'callout', text: 'Term 没有现金价值，并不代表它不好，因为积累现金本来就不是它被请来完成的工作。' },
    { type: 'p', text: '它的局限也写在名字里：保障期限终究会结束。之后可能面临更高的续保费率，也可能使用合同允许的转换权、重新申请保障，或随着资产积累逐渐提高自保能力。Term 买的是一段关键时间，不是永远不变的价格。' },

    { type: 'h2', eyebrow: '02', title: 'GUL：买确定性' },
    { type: 'p', text: '另一个家庭也许并不在意保单里的现金价值能不能“长得最快”。他们更关心的是：只要按合同要求缴费、满足相关条件，一笔明确的身故保障能否维持到很高的年龄。保证型万能寿险（Guaranteed Universal Life / GUL）的核心，正是长期保障与合同保证。' },
    { type: 'callout', text: '你买的不是惊喜，而是确定性。' },
    { type: 'p', text: '这种确定性可能用于传承或遗产规划，具体取决于合同与保证期限。它的保费通常高于相近保额的 Term，现金价值也往往不是重点。与以现金价值为目标、并得到适当设计和资金支持的保单相比，它用于“家庭银行”的灵活性可能有限。更重要的是，任何保证都建立在严格遵守合同要求的前提上。' },

    { type: 'h2', eyebrow: '03', title: 'IUL：买灵活性' },
    { type: 'p', text: '再来看一个已经拥有稳定收入、应急储备、可控债务，并且退休储蓄也在正常推进的家庭。此时，他们可能开始问：“有没有一部分长期资本，可以同时承担不止一个任务？”' },
    { type: 'p', text: '指数型万能寿险（Indexed Universal Life / IUL）可能把永久保障、潜在现金价值（Cash Value）积累、与指数挂钩的计息机制、现行税法下的延税增长、提款或保单贷款（Policy Loan），以及合同提供的生前福利（Living Benefits）放在同一个结构里。设计与实际表现合适时，它可能用于退休补充、流动性或传承规划。' },
    { type: 'p', text: '但 IUL 绝不是一项“每年稳定赚 6% 或 7% 的投资”。真实的保单经济更接近：保费，加上实际计息，再减去保险成本、管理费用、附加保障费用，以及可能产生的贷款影响。最终真正重要的是累计价值与退保现金价值，而不是演示书封面上的假设计息率。' },
    { type: 'callout', text: '灵活，是 IUL 最大的优势；也正因为灵活，它更需要理解和管理。' },

    { type: 'h2', eyebrow: '04', title: '大多数保险对话跳过的问题：你到底有多少可以长期配置的资本？' },
    { type: 'p', text: '任何产品都不能脱离家庭现金流谈“适合”。同一份 IUL，对一个家庭可能并不合适，对另一个家庭却值得认真研究。变化的不是产品，而是家庭的资本结构。' },
    { type: 'families' },
    { type: 'callout', text: '建立未来的家庭银行，不应该以掏空今天的应急现金为代价。' },
    { type: 'ladder' },

    { type: 'h2', eyebrow: '05', title: '认真理解“买 Term，把差额拿去投资”' },
    { type: 'p', text: '这不是一句应该被轻率否定的话。Term 的成本可能显著低于一份大额投入的永久寿险。如果一个家庭几十年如一日，把差额投入分散化的投资组合，复利的力量可能非常可观。' },
    { type: 'p', text: '做教育性测算时，有人会使用 9% 的长期名义回报假设。但 9% 绝不是保证，真实市场也不会每年平滑上涨。波动可能很大，而家庭能否坚持执行，往往和计算公式同样重要。' },
    { type: 'callout', text: '策略的全名是：买 Term，并且投资差额。不是：买 Term，然后花掉差额。' },
    { type: 'p', text: '这笔差额最后真的进入投资账户了吗？还是慢慢变成了新车、旅行、装修和生活方式升级？一个逻辑正确却从未执行的方案，还不能算真正的财务计划。' },

    { type: 'h2', eyebrow: '06', title: '也不要把 IUL 的 Illustration 当成投资回报' },
    { type: 'p', text: 'Illustration 是模型，不是承诺。NAIC 的演示规范明确区分保证项目与非保证项目。时间越长，Current Illustrated Values 与 Guaranteed Illustrated Values 之间可能出现非常大的差异。' },
    { type: 'p', text: '阅读演示书时，要看累计价值、退保现金价值、保证值、当前演示值、保险成本、各项费用、退保期、贷款假设与失效敏感度。不能用“保费 × 演示利率”直接推算未来现金价值。' },
    { type: 'callout', text: 'Illustration 是模型，不是承诺。' },

    { type: 'h2', eyebrow: '07', title: '“家庭银行”到底是什么？' },
    { type: 'p', text: '家庭银行（Family Banking）并不是保险公司送给你一笔免费的钱。现金价值型永久寿险可能允许保单持有人以保单价值作为担保申请贷款。根据合同机制，即使存在贷款，保单价值仍可能按规则获得计息。' },
    { type: 'p', text: '但贷款利息不会消失。贷款会减少可用保单价值，也可能降低身故赔偿；借款过多可能导致保单失效。带着未偿贷款失效或退保，还可能产生应税收入。贷款利率与保单计息率之间，也没有保证一定存在正利差。' },
    { type: 'callout', text: '家庭银行是一种流动性策略，不是免费的套利机器。' },
    { type: 'p', text: '假设市场大跌时，一个家庭突然需要 10 万美元。只有证券账户的家庭，可能要在低位卖出资产、向外部借款，或放弃机会。拥有足够保单现金价值的家庭，也许可以把保单贷款列为另一个选项。它不一定更好；它的价值在于多一种选择。' },

    { type: 'h2', eyebrow: '08', title: '如果过早离世，数学会立刻改变' },
    { type: 'p', text: '只比较投资账户余额，会漏掉保险最核心的功能。一个家长刚积累了 5 万美元，如果明天意外离世，证券账户不会自动变成 100 万美元；一份有效的 100 万美元寿险，则可能按照合同产生 100 万美元的身故赔偿。' },
    { type: 'p', text: '按照现行美国联邦税法，因被保险人死亡而支付的寿险赔偿，通常不计入受益人的联邦总收入，但存在例外，也可能涉及遗产税问题。与此同时，应税投资资产在继承时通常也可能获得成本基础调整。因此，“保险免税、股票继承后全部纳税”并不准确。' },
    { type: 'p', text: '真正的区别往往是：保险立即提供风险转移杠杆；投资需要时间积累资本。几十年后，随着家庭资产增长，自保能力也可能逐步提高。' },

    { type: 'h2', eyebrow: '09', title: '决策矩阵' },
    { type: 'matrix' },

    { type: 'h2', eyebrow: '10', title: '购买任何一种保险前，先问四个问题' },
    { type: 'questions', items: [
      { q: '如果我明天离世，家庭到底需要多少资本？', a: '如果保障缺口很大，但现金有限，可以先研究 Term。' },
      { q: '即使活到很高龄，我是否仍需要一笔明确的传承资金？', a: '如果需要，可以研究 GUL 等强调保证的永久保障，同时仔细核对保证期限与缴费要求。' },
      { q: '我真的拥有可以长期配置的资本吗？', a: '大额投入永久寿险前，先检查应急储备、高息债务、退休储蓄、近期责任与现金流稳定性。' },
      { q: '我的家庭真的需要一个长期资本池吗？', a: '如果家庭已经拥有较强流动性与外部投资，同时重视永久保障、生前福利和潜在贷款通道，IUL 才可能值得进一步研究。' },
    ] },

    { type: 'h2', eyebrow: '11', title: '所以，到底哪一个最好？' },
    { type: 'p', text: '如果问题是“在一定期限内，每一美元保费能买到多少身故保障”，Term 往往更有优势。如果问题是“怎样强调长期保证与传承”，GUL 可能更合适。如果问题是“如何同时获得永久保障、现金价值灵活性与潜在家庭银行功能”，一份设计合理、资金充足的 IUL 可能拥有更完整的功能，但也最需要理解、持续投入与管理。' },
    { type: 'jobs', strong: true },
    { type: 'callout', text: '功能更多，并不自动等于财务决策更好。' },
    { type: 'p', text: '保险不是财富的起点，而是家庭资本系统中的一个组成部分。税务规划帮助家庭保留资本，投资帮助资本增长，保险转移家庭无法独自承受的风险。某些永久寿险还可能提供流动性、传承与资本管理选择。但顺序非常重要。' },
    { type: 'list', items: ['不要为了建立“家庭银行”，掏空应急储备。', '不要为了追逐回报，忽略最基本的保障缺口。', '不要在没有理解机会成本（Opportunity Cost）之前，把稀缺资本锁进长期大额保费。'] },
    { type: 'quote', text: '真正值得问的，也许不是：“哪一种保险最好？”而是：“我的家庭现在在哪里？下一阶段要去哪里？在这段路上，我手里的每一美元，最应该承担什么任务？”' },
    { type: 'closing', text: '工具没有等级，资本有任务，人生有阶段。' },
  ],
  sourcesTitle: '资料来源与延伸阅读',
  sources,
  disclaimer: '本文仅用于教育与信息分享，不构成针对任何个人的保险、投资、税务、法律或财务建议。不同保险公司的合同条款、保证内容、费用结构、计息方式、附加保障、保单贷款及税务处理均可能不同，个人情况也会影响产品适用性。在作出重要财务决定前，应仔细阅读正式保单及 Illustration，并根据需要咨询具备相应资质的专业人士。',
}

export const termVsGulVsIulFamilyCapital = {
  slug: 'term-vs-gul-vs-iul-family-capital',
  publishDate: '2026-08-10',
  status: 'published',
  layout: 'insuranceEditorial',
  pillars: ['wealth'],
  insightNumber: 4,
  pillarLabel: 'Wealth',
  pillarNumber: 3,
  keywords: ['Term vs GUL vs IUL', 'family capital allocation', 'life insurance', 'family banking', 'policy loans', 'cash value', '保险选择', '家庭资本配置', '家庭银行'],
  relatedSlugs: [previousSlug],
  originalLocale: 'en',
  previousSlug,
  author: 'Sammi Q',
  authorTitle: 'Initiator, ONYX Wealth & Wellness Club',
  content: { en, zh },
}
