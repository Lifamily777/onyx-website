const pair = (en, zh) => ({ en, zh })

export const FOUNDATION_STATUSES = {
  RED:{id:'red',label:pair('Needs Attention','需要关注'),actionBucket:'now'},
  YELLOW:{id:'yellow',label:pair('Planning Window','规划窗口'),actionBucket:'next_12_months'},
  GREEN:{id:'green',label:pair('On Track','进展良好'),actionBucket:'on_track'},
  GRAY:{id:'gray',label:pair('Not Applicable / Need More Information','不适用／需要更多信息'),actionBucket:null},
}

export const foundationDefinitions = [
  {id:'cash',title:pair('Cash & Emergency','现金与应急'),route:'/capital-map/node/w1',connectsTo:pair('Income continuity, debt, and the ability to avoid forced decisions.','收入连续性、债务，以及避免被迫决策的能力。'),gather:pair('Core monthly expenses and liquid resources.','核心月支出与可用流动资源。')},
  {id:'income_tax',title:pair('Income & Tax','收入与税务'),route:'/keep-more',connectsTo:pair('Withholding, tax reserves, business cash flow, and retirement choices.','预扣税、税款储备、企业现金流与退休选择。'),gather:pair('Recent pay records, prior return, and non-W-2 income records.','近期工资资料、往年税表与非W-2收入记录。')},
  {id:'retirement',title:pair('Retirement','退休'),route:'/build-for-tomorrow',connectsTo:pair('Current saving, future income, taxes, access, and flexibility.','当前储蓄、未来收入、税务、可用性与灵活性。'),gather:pair('Plan summaries, contribution elections, and account statements.','计划说明、缴款选择与账户资料。')},
  {id:'education',title:pair('Education & Future Opportunity','教育与未来机会'),route:'/fund-their-future',connectsTo:pair('Time horizon, flexibility, family protection, and retirement trade-offs.','时间跨度、灵活性、家庭保障与退休取舍。'),gather:pair('Goals, timing, current balances, ownership, and contribution pattern.','目标、时间、现有余额、所有权与缴款方式。')},
  {id:'protection',title:pair('Protection','保障'),route:'/protect-the-plan',connectsTo:pair('Income continuity, family obligations, business continuity, and insurability.','收入连续性、家庭责任、企业延续与可保性。'),gather:pair('Current coverage summaries, obligations, and available resources.','现有保障摘要、家庭责任与可用资源。')},
  {id:'debt_property',title:pair('Debt & Property','债务与房产'),route:'/capital-map/node/w2',connectsTo:pair('Cash flow, saving capacity, liquidity, and transaction timing.','现金流、储蓄能力、流动性与交易时机。'),gather:pair('Debt balances and terms; property basis records when relevant.','债务余额与条款；适用时准备房产basis记录。')},
  {id:'business_payroll',title:pair('Business & Payroll','企业与Payroll'),route:'/guides/business-payroll-retirement',connectsTo:pair('Owner pay, taxes, cash flow, employees, and retirement planning.','业主薪酬、税务、现金流、员工与退休规划。'),gather:pair('Entity records, books, payroll records, and benefit-plan information.','企业文件、账簿、Payroll记录与福利计划资料。')},
  {id:'estate',title:pair('Family & Estate Basics','家庭与遗产基础'),route:'/capital-map/long-term',connectsTo:pair('Decision authority, beneficiary intent, care, and continuity.','决策授权、受益安排、照护与延续性。'),gather:pair('Current documents and beneficiary designations; do not upload sensitive originals.','现有文件与受益人指定；不要上传敏感原件。')},
]

export const reviewConnections = {
  oldPlanDestination:{route:'/decisions/job-change-old-401k',reason:pair('A recent job change can create an old-plan decision and future IRA coordination questions.','近期换工作会带来旧计划资金去向及未来IRA协调问题。')},
  rentalChange:{route:'/capital-map/event/sell-rental-property',reason:pair('Review records and choices before a rental transaction becomes difficult to change.','在出租物业交易难以改变前梳理资料与选择。')},
  noMatch:{route:'/build-for-tomorrow',reason:pair('No employer match creates an allocation-review question; it does not mean the plan should be skipped.','没有雇主match会带来资金配置问题，并不表示应跳过该计划。')},
}
