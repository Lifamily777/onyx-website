const pair = (en, zh) => ({ en, zh })

const guide = (data) => ({ version: 'v3.2', sections: ['whatYouAsked','connections','overlookedQuestion','dollars','tradeoffs','beforeActing','nextMoves'], ...data })

export const KNOWLEDGE_GUIDES = [
  guide({
    id:'second-income-engine', pathId:'keep-more', moneyLens:['KEEP','BUILD'],
    title:pair('Should I Build a Second Income Engine?','我是否应该建立第二收入来源？'),
    entry:pair('I earn mostly W-2 income and my taxes feel high.','我的收入主要来自 W-2，而且感觉税负很高。'),
    answer:pair('An LLC or 1099 does not create a tax strategy by itself. A real business can create income, obligations, and planning opportunities.','LLC 或 1099 本身并不会自动形成税务策略。真正的生意会带来收入，也会带来义务与新的规划机会。'),
    officialSources:[{label:'IRS · Small Business and Self-Employed',url:'https://www.irs.gov/businesses/small-businesses-self-employed'}],
    story:pair('Amy earns about $240,000 from W-2 employment. A friend says, “Open an LLC and write things off.” She forms one, but has no meaningful customers, revenue, or substantive activity. Did Amy create an economic engine—or simply an entity?','Amy 的 W-2 年收入约为 $240,000。朋友告诉她：“开个 LLC 就能抵扣。”她注册了 LLC，却没有真正的客户、收入或实质经营。她建立的是经济引擎，还是仅仅一个实体？'),
    signature:pair('Would I still want this business if the tax deduction were removed?','如果没有税务抵扣，我还会想做这门生意吗？'),
    overlooked:pair(['Have I already used legitimate opportunities available through my W-2?','Is there a real customer need and a repeatable way to create value?'],['我是否已经充分了解 W-2 内现有的合法规划机会？','是否存在真实客户需求，以及可重复创造价值的方式？']),
    flow:pair(['Skill / asset / knowledge','Real customer need','Revenue','Legitimate business activity','Ordinary costs & records','Net business result','Tax obligations','Retirement opportunities','Entity / payroll questions'],['技能／资产／知识','真实客户需求','收入','实质经营活动','日常成本与记录','业务净结果','税务义务','退休规划机会','实体与 Payroll 问题']),
    topics:pair(['W-2 income & benefits','Withholding','Second income','Estimated-tax awareness','Business records','Retirement opportunities'],['W-2 收入与福利','预扣税','第二收入','预估税意识','业务记录','退休规划机会']),
    tradeoffs:pair([{title:'Optimize W-2 first',body:'Less complexity; may reveal overlooked benefits and withholding questions.'},{title:'Validate a real opportunity',body:'Tests customer demand before administrative complexity grows.'},{title:'Build clean operations',body:'Records, tax reserve, and retirement questions become relevant as profit becomes meaningful.'}],[{title:'先理顺 W-2',body:'复杂度较低，也可能发现被忽略的福利和预扣税问题。'},{title:'验证真实机会',body:'在管理复杂度增加前，先测试客户需求。'},{title:'建立清晰运营',body:'当利润逐渐显著时，记录、税务储备与退休问题会更重要。'}]),
    gather:pair(['Recent paystub and benefit summary','Expected customers and revenue','Legitimate expense estimate','Current retirement accounts'],['近期工资单与福利摘要','预期客户与收入','合理业务费用估算','现有退休账户']),
    nextMoves:pair(['Optimize the W-2 structure first','Validate genuine customer demand','Establish clean business records','Understand tax-reserve needs','Review retirement opportunities as profit grows','Consider entity/payroll structure only when facts justify it'],['先理顺 W-2 结构','验证真实客户需求','建立清晰业务记录','了解税务储备需要','利润增长后再审视退休机会','仅在事实支持时考虑实体与 Payroll 结构']),
    related:['business-payroll-retirement'], cta:pair('Review My W-2 + 1099 Questions with Sammi','与 Sammi 梳理我的 W-2 与 1099 问题'), tool:'businessProfit',
  }),
  guide({
    id:'business-payroll-retirement', pathId:'build-for-tomorrow', moneyLens:['KEEP','BUILD'],
    title:pair('My Business Is Making Money. What Should I Fix Next?','我的生意开始赚钱了，下一步应该先理顺什么？'),
    entry:pair('Taxes surprise me, I pay myself randomly, or I am considering payroll, an S corporation, retirement benefits, or employees.','税款总让我意外、我随意给自己取钱，或正在考虑 Payroll、S corporation、退休福利或员工。'),
    answer:pair('Start with recurring profit, owner compensation, cash needs, and obligations—not an entity label. Business profit is not the same as cash available to spend.','先理解持续利润、业主报酬、现金需要与合规义务，而不是先选实体标签。业务利润不等于可以随意支出的现金。'),
    entryChoices:pair(['Taxes surprise me every year','I pay myself randomly','I’m considering an S corporation','I need payroll','I want to save more for retirement','I hired or may hire employees'],['每年的税款都让我意外','我随意给自己支付报酬','我在考虑 S corporation','我需要 Payroll','我想为退休储蓄更多','我已经或可能雇用员工']),
    officialSources:[{label:'IRS · Small Business and Self-Employed',url:'https://www.irs.gov/businesses/small-businesses-self-employed'}],
    story:pair('A profitable business can still feel cash-poor when tax reserves, payroll, working capital, and family withdrawals all compete for the same dollars.','一家盈利的企业仍可能现金紧张，因为税务储备、Payroll、营运资金和家庭取用都在争夺同一笔钱。'),
    signature:pair('If I change how I pay myself, could I also change my retirement-plan opportunities?','如果改变给自己支付报酬的方式，会不会也改变退休计划的机会？'),
    overlooked:pair(['What job am I trying to accomplish?','Does added structure create enough value to justify its cost and administration?'],['我真正想完成的任务是什么？','新增结构带来的价值，是否足以抵偿成本与管理工作？']),
    flow:pair(['Business revenue','Business expenses','Business profit','Owner / entity structure','Compensation + cash flow','Payroll / compliance','Retirement plan design','Family capital'],['业务收入','业务费用','业务利润','业主／实体结构','报酬与现金流','Payroll／合规','退休计划设计','家庭资本']),
    topics:pair(['Recurring profit','Owner compensation','Payroll obligations','S corporation awareness','Employee facts','Retirement-plan objectives'],['持续利润','业主报酬','Payroll 义务','S corporation 意识','员工情况','退休计划目标']),
    tradeoffs:pair([{title:'Keep administration simple',body:'Fewer moving parts, but may not address growing payroll or benefit needs.'},{title:'Add payroll/entity complexity',body:'May coordinate compensation and compliance, but creates cost and obligations; S corporation status does not guarantee savings.'},{title:'Design retirement benefits',body:'Plan choices depend on the job to be done, owner goals, employees, eligibility, cost, and administration.'}],[{title:'保持管理简单',body:'环节较少，但可能无法解决不断增长的 Payroll 或福利需求。'},{title:'增加 Payroll／实体复杂度',body:'可能有助于协调报酬与合规，但也增加成本和义务；S corporation 并不保证节税。'},{title:'设计退休福利',body:'计划取决于目标、业主需求、员工、资格、成本与管理要求。'}]),
    gather:pair(['Recent P&L','Entity type','Owner compensation and payroll records','Employee count','Current retirement plans','Approximate business cash needs','Prior-year business return where appropriate'],['近期损益表','实体类型','业主报酬与 Payroll 记录','员工人数','现有退休计划','大致业务现金需要','适当情况下的上年度企业税表']),
    nextMoves:pair(['Understand recurring profit','Map current owner compensation','Identify payroll/compliance obligations','Clarify retirement goals','Test whether complexity creates enough value'],['理解持续利润','梳理目前业主报酬','识别 Payroll 与合规义务','明确退休目标','检验新增复杂度是否创造足够价值']),
    related:['second-income-engine','new-baby-education'], cta:pair('Review My Business, Payroll & Retirement Questions with Sammi','与 Sammi 梳理我的企业、Payroll 与退休问题'),
  }),
  guide({
    id:'new-baby-education', pathId:'fund-their-future', moneyLens:['FUND','PROTECT','BUILD'],
    title:pair('We Had a Baby. What Should We Start Now?','家里有了宝宝，现在最值得开始准备什么？'),
    entry:pair('A new child changed our responsibilities. Where should we begin?','新成员改变了家庭责任，我们应该从哪里开始？'),
    answer:pair("Your child’s greatest financial asset may already exist: time. Begin with family resilience and the job the money needs to perform—not an account or product.",'孩子最大的财务资产也许已经存在：时间。先从家庭韧性和这笔钱需要完成的任务出发，而不是先选账户或产品。'),
    story:pair('The early years create time for compounding, but education funding still depends on household liquidity, income continuity, and protecting the parents’ retirement path.','早期阶段为复利提供时间，但教育资金仍依赖家庭流动性、收入延续能力以及父母退休路径的保护。'),
    signature:pair('Before choosing an account, what job do I want this money to perform?','在选择账户前，我希望这笔钱完成什么任务？'),
    overlooked:pair(['College only, broader education, or flexible future capital?','How much can we contribute without weakening emergency liquidity or retirement?'],['只用于大学、更广泛的教育，还是灵活的未来资本？','在不削弱应急流动性或退休规划的前提下，我们能投入多少？']),
    flow:pair(['Birth','Age 5','Age 10','High school','College','Early adulthood'],['出生','5 岁','10 岁','高中','大学','成年早期']),
    topics:pair(['Family liquidity','Parent income continuity','Beneficiary awareness','Long-term compounding','529 awareness','Financial-aid awareness','Retirement trade-offs'],['家庭流动性','父母收入延续','受益人意识','长期复利','529 意识','助学金意识','退休取舍']),
    tradeoffs:pair([{title:'Education-specific focus',body:'May align clearly with an education goal; rules, costs, ownership, and flexibility need review.'},{title:'Flexible family capital',body:'Broader possible uses, with different tax, ownership, discipline, and aid considerations.'},{title:'Protect retirement first',body:'College support should not be evaluated in isolation from parent retirement security.'}],[{title:'聚焦教育用途',body:'目标清晰，但仍需理解规则、成本、归属与灵活性。'},{title:'灵活家庭资本',body:'用途可能更广，但税务、归属、自律与助学金考量不同。'},{title:'先保护退休',body:'大学资金不能脱离父母退休安全单独评估。'}]),
    gather:pair(['Monthly amount that fits current cash flow','Desired uses for the money','Existing education assets','College timeline','Parent retirement priorities'],['符合当前现金流的月度金额','这笔钱的目标用途','现有教育资产','大学时间线','父母退休优先事项']),
    nextMoves:pair(['Protect household cash flow first','Define the job of the child’s money','Start early if appropriate','Separate planning from product selection','Revisit as college approaches','Protect parent retirement'],['先保护家庭现金流','定义孩子资金的任务','条件合适时尽早开始','把规划与产品选择分开','临近大学时重新审视','保护父母退休']),
    related:['second-income-engine','rental-equity'], cta:pair("Review My Children’s Education Funding Plan with Sammi",'与 Sammi 梳理孩子的教育资金计划'), tool:'costOfWaiting',
    officialSources:[{label:'Federal Student Aid',url:'https://studentaid.gov/'}],
  }),
  guide({
    id:'rental-equity', pathId:'build-for-tomorrow', moneyLens:['BUILD','FUND','OPTIONALITY'],
    title:pair('My Rental Has Equity. What Job Should That Capital Do Next?','出租房已经积累了一笔资产，这笔家庭资本下一步应该做什么？'),
    entry:pair('The rental has meaningful equity, but our family has several competing priorities.','出租房积累了可观权益，但家庭同时有多个优先事项。'),
    answer:pair('Treat the property as one part of family capital. Compare holding, selling, and repositioning by the job the capital needs to perform.','把出租房视为家庭资本的一部分，根据资本需要完成的任务，比较持有、出售与重新配置。'),
    story:pair('A family in its early 40s may be balancing children, retirement, a home mortgage, business income, and rental equity. This is illustrative—not a description of you.','一个四十岁出头的家庭可能同时面对孩子、退休、自住房贷款、业务收入和出租房权益。这只是示例，并不代表你的情况。'),
    signature:pair('If I sell, how much capital actually becomes available for its next job?','如果出售，究竟有多少资本能真正投入下一项任务？'),
    overlooked:pair(['Is this still the best job for this portion of family capital?','What would the proceeds do next—and when would the family need them?'],['这仍然是这部分家庭资本最合适的任务吗？','出售所得下一步做什么，家庭何时需要它？']),
    flow:pair(['Rental property','Current equity','Hold / sell / reposition','Family-capital job'],['出租房','当前权益','持有／出售／重新配置','家庭资本任务']),
    topics:pair(['Rental income','Liquidity','Concentration','College funding','Retirement','Debt reduction','Reinvestment','Opportunity capital'],['租金收入','流动性','集中风险','大学资金','退休','减债','再投资','机会资本']),
    tradeoffs:pair([{title:'Hold',body:'Continued income and real-estate exposure; capital remains illiquid and management/property risk continues.'},{title:'Sell',body:'Creates potential liquidity and reduces management, but involves selling costs, possible tax consequences, and loss of future property economics.'},{title:'Reposition',body:'Capital may move to another job, but transaction and tax consequences matter. Qualifying-exchange concepts have strict requirements and generally need investigation before closing.'}],[{title:'持有',body:'继续获得租金和房地产敞口；资本仍不易变现，管理与物业风险持续。'},{title:'出售',body:'可能释放流动性并减少管理，但涉及交易成本、潜在税务后果以及未来物业收益的放弃。'},{title:'重新配置',body:'资本可以转向其他任务，但交易与税务后果很重要。符合条件的交换概念有严格要求，通常需要在交易完成前调查。'}]),
    gather:pair(['Original purchase information','Major improvement records','Depreciation records','Current debt','Expected selling costs','Estimated sale value','Intended use of proceeds','College and retirement timelines'],['原始购买资料','重大改良记录','折旧记录','当前债务','预计出售成本','预计售价','所得资金用途','大学与退休时间线']),
    nextMoves:pair(['Clarify the capital’s next job','Estimate selling costs and debt payoff','Identify records needed for professional tax review','Compare family priorities and timing','Investigate exchange awareness before acting if potentially relevant'],['明确资本的下一项任务','估算出售成本与债务偿还','找出专业税务审核所需记录','比较家庭优先事项与时间','若可能相关，在行动前了解交换概念']),
    related:['new-baby-education','business-payroll-retirement'], cta:pair('Review Before I Act with Sammi','行动前与 Sammi 一起梳理'),
  }),
]

export const getKnowledgeGuide = (id) => KNOWLEDGE_GUIDES.find((item) => item.id === id)
export const localize = (value, locale) => value?.[locale === 'zh' ? 'zh' : 'en']

export function createGuideResult(guide, exploredTopics = []) {
  return { guideId:guide.id, exploredTopics, connectedTopics:guide.topics.en, planningWindow:'before acting', missingInformation:guide.gather.en, nextMoves:guide.nextMoves.en, moneyLens:guide.moneyLens, relatedGuides:guide.related, sammiReviewContext:`Explored ${guide.title.en}. Connections: ${guide.topics.en.join(', ')}. Useful information: ${guide.gather.en.join(', ')}.` }
}
