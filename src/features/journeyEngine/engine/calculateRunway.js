const finite = (value) => value !== '' && Number.isFinite(Number(value))

export function calculateRunway({ monthlyExpense, liquidReserve, knownExpenses }) {
  const values = [monthlyExpense, liquidReserve, knownExpenses]
  if (!values.every(finite) || values.some((value) => Number(value) < 0) || Number(monthlyExpense) <= 0) {
    return { valid:false, runwayMonths:null, availableReserve:null, reason:'Enter a monthly expense above zero and non-negative reserve and expense amounts.' }
  }
  const availableReserve = Math.max(0, Number(liquidReserve) - Number(knownExpenses))
  return { valid:true, availableReserve, runwayMonths:availableReserve / Number(monthlyExpense), benchmarkMonths:6 }
}
