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
  const jobs = [
    ['reserve', 'Build Reserve', inputs.reserveMonths < 6 ? 5 : 2, 5, 1, 3, 5],
    ['debt', 'Pay High-Cost Debt', inputs.debtApr >= 15 ? 5 : inputs.debtApr >= 10 ? 4 : 2, 2, 5, 2, 3],
    ['expense', 'Fund Known Expense', inputs.knownExpenseGap > 0 ? 5 : 1, 5, 1, 3, 4],
    ['tax', 'Build Tax Reserve', inputs.taxReserveNeed > 0 ? 5 : 1, 4, 1, 5, 4],
    ['growth', 'Invest for Growth', inputs.longTermInvesting ? 4 : 3, 1, 1, 2, 3],
    ['opportunity', 'Preserve Opportunity Capital', 3, 4, 1, 2, 5],
  ]
  return jobs.map(([id, label, relevance, liquidity, interestCostReduction, taxReadiness, optionality]) => ({ id, label, relevance, liquidity, interestCostReduction, growthPotential: id === 'growth' ? 5 : 2, taxReadiness, optionality }))
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
