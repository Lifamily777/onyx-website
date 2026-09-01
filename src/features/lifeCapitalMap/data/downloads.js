export const DOWNLOAD_TEMPLATES = {
  'financial-inventory': { title:'Family Financial Inventory', titleZh:'家庭财务清单', filename:'onyx-family-financial-inventory.csv', headers:['Institution','Account nickname','Last four digits','Owner','Beneficiary','Approximate value','Document location','Contact person','Important date'] },
  'core-expense': { title:'6-Month Core Expense Worksheet', titleZh:'6个月核心支出表', filename:'onyx-core-expense-worksheet.csv', headers:['Category','Monthly amount','Essential?','Notes'] },
  'debt-paths': { title:'High-Cost Debt Planner', titleZh:'高成本债务规划表', filename:'onyx-high-cost-debt-planner.csv', headers:['Creditor nickname','Balance','APR','Minimum payment','Due date','Notes'] },
  'large-expenses': { title:'12-Month Large Expense Planner', titleZh:'12个月大额支出规划表', filename:'onyx-12-month-large-expense-planner.csv', headers:['Event','Amount','Expected date','Funded?','Funding source','Notes'] },
  'income-map': { title:'Non-W2 Income Checklist', titleZh:'非W-2收入清单', filename:'onyx-non-w2-income-checklist.csv', headers:['Income source','Tax form expected','Payer','Deposit account nickname','Record location','Tax reserve process','Notes'] },
  'tax-reserve': { title:'Tax Reserve Worksheet', titleZh:'税款储备表', filename:'onyx-tax-reserve-worksheet.csv', headers:['Income source nickname','Payment or withholding date','Amount received','Amount reserved','Payment recorded?','State exposure to verify','Notes'] },
  'concentration': { title:'Concentration & Dependency Worksheet', titleZh:'集中度与依赖表', filename:'onyx-concentration-dependency-worksheet.csv', headers:['Exposure','Approximate value','Income dependency','Leverage dependency','Key-person dependency','Notes'] },
  'event-preparation': { title:'Event Preparation Checklist', titleZh:'事件准备清单', filename:'onyx-event-preparation-checklist.csv', headers:['Event','Status: Watch / Emerging / Active','Expected window','Decision already made?','Records available','Questions to verify','Professional review needed?','Next action'] },
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
