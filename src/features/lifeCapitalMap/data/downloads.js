export const DOWNLOAD_TEMPLATES = {
  'financial-inventory': { filename:'onyx-family-financial-inventory.csv', headers:['Institution','Account nickname','Last four digits','Owner','Beneficiary','Approximate value','Document location','Contact person','Important date'] },
  'core-expense': { filename:'onyx-core-expense-worksheet.csv', headers:['Category','Monthly amount','Essential?','Notes'] },
  'debt-paths': { filename:'onyx-high-cost-debt-planner.csv', headers:['Creditor nickname','Balance','APR','Minimum payment','Due date','Notes'] },
  'large-expenses': { filename:'onyx-12-month-large-expense-planner.csv', headers:['Event','Amount','Expected date','Funded?','Funding source','Notes'] },
  'income-map': { filename:'onyx-non-w2-income-checklist.csv', headers:['Income source','Tax form expected','Payer','Deposit account nickname','Record location','Tax reserve process','Notes'] },
  'concentration': { filename:'onyx-concentration-dependency-worksheet.csv', headers:['Exposure','Approximate value','Income dependency','Leverage dependency','Key-person dependency','Notes'] },
}

export function downloadTemplate(id) {
  const template = DOWNLOAD_TEMPLATES[id]
  if (!template || typeof document === 'undefined') return false
  const warning = ['Do not store passwords, PINs, full SSNs, or full account numbers.']
  const csv = [template.headers, warning].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type:'text/csv;charset=utf-8' }))
  const link = document.createElement('a'); link.href = url; link.download = template.filename; link.click(); URL.revokeObjectURL(url)
  return true
}
