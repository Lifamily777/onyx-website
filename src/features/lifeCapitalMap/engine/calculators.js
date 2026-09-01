const number = (value) => Number.isFinite(Number(value)) ? Number(value) : 0
const sum = (values) => values.reduce((total, value) => total + number(value), 0)

export function calculateEmergencyLiquidity(inputs) {
  const monthlyCoreExpense = sum(Object.values(inputs.expenses || {}))
  const currentReserve = number(inputs.currentReserve)
  return { monthlyCoreExpense, sixMonthReserve: monthlyCoreExpense * 6, reserveMonths: monthlyCoreExpense > 0 ? currentReserve / monthlyCoreExpense : 0 }
}

export function calculateDebtPaths({ debtBalance, apr, minimumPayment, monthlySurplus, liquidReserve }) {
  const balance = number(debtBalance), rate = number(apr) / 100 / 12, surplus = number(monthlySurplus)
  const monthlyInterest = balance * rate
  return {
    inputs: { debtBalance: balance, apr: number(apr), minimumPayment: number(minimumPayment), monthlySurplus: surplus, liquidReserve: number(liquidReserve) },
    paths: [
      { id: 'payoff', label: 'Aggressive payoff', debtPayment: number(minimumPayment) + surplus, reserveAddition: 0, estimatedFirstMonthInterest: monthlyInterest },
      { id: 'reserve', label: 'Reserve first', debtPayment: number(minimumPayment), reserveAddition: surplus, estimatedFirstMonthInterest: monthlyInterest },
      { id: 'hybrid', label: 'Hybrid', debtPayment: number(minimumPayment) + surplus / 2, reserveAddition: surplus / 2, estimatedFirstMonthInterest: monthlyInterest },
    ],
  }
}

export function calculateMonthlySurplus(inputs) {
  const monthlySurplus = number(inputs.cashInflow) - sum([inputs.coreExpenses, inputs.requiredDebt, inputs.necessaryInsurance, inputs.taxReserve, inputs.essentialCommitments])
  return { monthlySurplus, annualSurplus: monthlySurplus * 12, fiveYearDeployableCapital: monthlySurplus * 60 }
}

export function summarizeLargeExpenses(items = []) {
  const total = items.reduce((value, item) => value + number(item.amount), 0)
  const funded = items.reduce((value, item) => value + (item.fundedAmount !== undefined ? number(item.fundedAmount) : item.funded ? number(item.amount) : 0), 0)
  return { total, funded, fundingGap: Math.max(0, total - funded), count: items.length }
}

export function calculateConcentration({ largestExposure, productiveAssets }) {
  const ratio = number(productiveAssets) > 0 ? number(largestExposure) / number(productiveAssets) : 0
  const band = ratio >= .75 ? 'extreme' : ratio >= .6 ? 'very_high' : ratio >= .4 ? 'high' : ratio >= .25 ? 'moderate' : 'low'
  return { ratio, percentage: ratio * 100, band }
}

export function calculateForcedSale({ monthlyCoreExpenses, liquidReserve, incomeInterruptionMonths, investmentBalance, marketDeclinePercent }) {
  const monthly = number(monthlyCoreExpenses), reserve = number(liquidReserve), interruption = number(incomeInterruptionMonths)
  const reserveMonths = monthly > 0 ? reserve / monthly : 0
  const saleMayBeginMonth = monthly > 0 && interruption > reserveMonths ? Math.floor(reserveMonths) + 1 : null
  const stressedAssets = number(investmentBalance) * (1 - number(marketDeclinePercent) / 100)
  const uncovered = Math.max(0, interruption * monthly - reserve)
  return { reserveMonths, saleMayBeginMonth, stressedAssets, remainingAssetsAfterGap: Math.max(0, stressedAssets - uncovered) }
}

export function compareNextDollar(inputs) {
  const assumptions = {
    reserveMonths: number(inputs.reserveMonths), debtApr: number(inputs.debtApr),
    knownExpenseGap: number(inputs.knownExpenseGap), taxReserveNeed: number(inputs.taxReserveNeed),
    investmentHorizon: number(inputs.investmentHorizon), riskCapacity: number(inputs.riskCapacity),
    availableAmount: number(inputs.availableAmount),
  }
  const jobs = [
    { id:'reserve',label:'Build Reserve',labelZh:'建立储备',role:'Keep capital available for interruption and surprise.',roleZh:'为收入中断与意外保留可用资本。',signal:assumptions.reserveMonths<6?'Current reserve is below the six-month planning benchmark.':'Current reserve meets or exceeds the six-month planning benchmark.',signalZh:assumptions.reserveMonths<6?'当前储备低于六个月规划基准。':'当前储备达到或超过六个月规划基准。',tradeoff:'Liquidity may improve, while long-term growth or debt reduction waits.',tradeoffZh:'流动性可能提高，但长期增长或减债需要等待。'},
    { id:'debt',label:'Pay High-Cost Debt',labelZh:'偿还高成本债务',role:'Reduce a known financing cost and future required payments.',roleZh:'减少明确的融资成本和未来必要还款。',signal:assumptions.debtApr>=15?'The entered APR is in ONYX’s very-high-cost planning band.':assumptions.debtApr>=10?'The entered APR is in ONYX’s high-cost planning band.':'The entered APR is below ONYX’s high-cost planning band.',signalZh:assumptions.debtApr>=15?'输入APR处于黑曜的很高成本规划区间。':assumptions.debtApr>=10?'输入APR处于黑曜的高成本规划区间。':'输入APR低于黑曜的高成本规划区间。',tradeoff:'Interest cost may fall, while the dollar becomes unavailable for emergencies.',tradeoffZh:'利息成本可能下降，但这笔钱将无法用于紧急情况。'},
    { id:'expense',label:'Fund Known Expense',labelZh:'准备已知支出',role:'Reserve capital for a dated obligation already visible.',roleZh:'为已经可见且有日期的责任预留资本。',signal:assumptions.knownExpenseGap>0?`The entered known-expense gap is $${assumptions.knownExpenseGap.toLocaleString('en-US')}.`:'No known-expense gap was entered.',signalZh:assumptions.knownExpenseGap>0?`输入的已知支出缺口为 $${assumptions.knownExpenseGap.toLocaleString('en-US')}。`:'未输入已知支出缺口。',tradeoff:'Funding certainty may improve, while other capital jobs receive less.',tradeoffZh:'支出确定性可能提高，但其他资本任务获得的资金会减少。'},
    { id:'tax',label:'Build Tax Reserve',labelZh:'建立税款储备',role:'Separate money with a likely tax job from spendable cash.',roleZh:'把可能承担税务任务的资金与可消费现金分开。',signal:assumptions.taxReserveNeed>0?`The entered tax-reserve need is $${assumptions.taxReserveNeed.toLocaleString('en-US')}.`:'No tax-reserve need was entered; this tool does not calculate tax liability.',signalZh:assumptions.taxReserveNeed>0?`输入的税款储备需要为 $${assumptions.taxReserveNeed.toLocaleString('en-US')}。`:'未输入税款储备需要；本工具不计算税负。',tradeoff:'Tax readiness may improve, while the reserved cash has less flexibility.',tradeoffZh:'税务准备度可能提高，但被预留现金的灵活性会降低。'},
    { id:'growth',label:'Invest for Growth',labelZh:'用于长期增长',role:'Give capital time to participate in long-term growth and uncertainty.',roleZh:'让资本有时间参与长期增长并承受不确定性。',signal:assumptions.investmentHorizon>=5?'The entered horizon is at least five years; risk capacity still matters.':'The entered horizon is under five years or blank; timing risk deserves attention.',signalZh:assumptions.investmentHorizon>=5?'输入期限至少五年，但风险承受能力仍然重要。':'输入期限少于五年或为空，需要关注时间风险。',tradeoff:'Growth potential may rise, while near-term value and liquidity can be uncertain.',tradeoffZh:'增长潜力可能提高，但近期价值和流动性可能不确定。'},
    { id:'opportunity',label:'Preserve Opportunity Capital',labelZh:'保留机会资本',role:'Keep room to act when a valuable option appears.',roleZh:'保留在重要机会出现时采取行动的空间。',signal:assumptions.availableAmount>0?`The next available amount entered is $${assumptions.availableAmount.toLocaleString('en-US')}.`:'No available amount was entered; compare the role before choosing an amount.',signalZh:assumptions.availableAmount>0?`输入的下一笔可用资金为 $${assumptions.availableAmount.toLocaleString('en-US')}。`:'未输入可用金额；可以先比较任务角色，再决定金额。',tradeoff:'Optionality may improve, while cash may have a lower expected return than long-term assets.',tradeoffZh:'选择权可能提高，但现金的预期回报可能低于长期资产。'},
  ]
  return { assumptions, jobs }
}

export function calculateIncomeContinuity({ annualCoreExpenses, debtObligations, supportYears, liquidAssets, existingCoverage, reliableIncome }) {
  const need = number(annualCoreExpenses) * number(supportYears) + number(debtObligations)
  const resources = sum([liquidAssets, existingCoverage, number(reliableIncome) * number(supportYears)])
  return { illustratedNeed: need, existingResources: resources, educationalGap: Math.max(0, need - resources) }
}

export function calculateOptionalityRunway({ monthlyEssentials, liquidReserve, reliableMonthlyIncome }) {
  const monthlyGap = Math.max(0, number(monthlyEssentials) - number(reliableMonthlyIncome))
  return { monthlyGap, runwayMonths: monthlyGap > 0 ? number(liquidReserve) / monthlyGap : null }
}
