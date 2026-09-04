export function calculateBusinessProfit(revenue, expenses) {
  const r = Number(revenue); const e = Number(expenses)
  if (!Number.isFinite(r) || !Number.isFinite(e) || r < 0 || e < 0) return null
  return { revenue: r, expenses: e, profit: r - e }
}

export function futureValueOfMonthlyContributions(monthly, startAge, endAge, annualReturn) {
  const payment = Number(monthly); const start = Number(startAge); const end = Number(endAge); const rate = Number(annualReturn)
  if (![payment, start, end, rate].every(Number.isFinite) || payment < 0 || start < 0 || end <= start || rate < 0) return null
  const months = Math.round((end - start) * 12); const monthlyRate = rate / 100 / 12
  const value = monthlyRate === 0 ? payment * months : payment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  return { months, value: Math.round(value) }
}

export function compareStartingAges(monthly, endAge, annualReturn, starts = [0, 5, 10]) {
  return starts.map((startAge) => ({ startAge, ...futureValueOfMonthlyContributions(monthly, startAge, endAge, annualReturn) }))
}
