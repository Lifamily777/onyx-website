import { FAMILY_CAPITAL_REVIEW_VERSION } from '../data/questions.js'
import { FOUNDATION_STATUSES, foundationDefinitions, reviewConnections } from '../data/foundations.js'

const arr = (value) => Array.isArray(value) ? value : []
const has = (value, item) => arr(value).includes(item)
const hasAny = (value, items) => items.some((item) => has(value, item))
const unique = (items) => [...new Set(items)]
const pair = (en, zh) => ({ en, zh })
const evidence = (question, field, value) => ({id:`${question}.${field}:${Array.isArray(value) ? value.join('|') : value}`,question,field,value})
const unknown = (value) => value == null || value === 'unsure' || has(value, 'unsure')

function foundation(id, statusKey, why, evidenceItems = [], nextStep) {
  const definition = foundationDefinitions.find((item) => item.id === id)
  const status = FOUNDATION_STATUSES[statusKey]
  return {
    id, title:definition.title, status:status.id, statusLabel:status.label,
    evidenceIds:evidenceItems.map((item) => item.id), evidence:evidenceItems,
    whyFlagged:why, whatItConnectsTo:definition.connectsTo,
    informationToGather:definition.gather,
    suggestedNextStep:nextStep || pair('Review the available facts and decide whether deeper analysis is useful.','先梳理现有事实，再判断是否需要进一步分析。'),
    route:definition.route, actionBucket:status.actionBucket,
  }
}

function cashFoundation(answers) {
  const runway = answers.liquidity?.runway
  const ev = runway == null ? [] : [evidence('liquidity','runway',runway)]
  if (unknown(runway)) return foundation('cash','GRAY',pair('The available liquidity runway is not yet known.','目前尚不清楚流动资金可以维持多久。'),ev)
  if (['under_1','1_3'].includes(runway)) return foundation('cash','RED',pair('Current liquid resources appear to cover fewer than three months of core expenses. This is a planning indicator, not a universal rule.','现有流动资源似乎不足以覆盖三个月核心支出。这是规划指标，并非普遍规则。'),ev,pair('Clarify core expenses and immediately accessible reserves.','梳理核心支出与可立即使用的储备。'))
  if (runway === '3_6') return foundation('cash','YELLOW',pair('Liquidity appears to be within a planning range that deserves periodic review.','流动性处于值得定期检查的规划区间。'),ev)
  return foundation('cash','GREEN',pair('Reported liquid resources cover at least six months of core expenses.','据填写信息，流动资源可以覆盖至少六个月的核心支出。'),ev)
}

function incomeTaxFoundation(answers) {
  const sources = arr(answers.income?.sources)
  const nonW2 = hasAny(sources,['1099','business','rental'])
  const tax = answers.priorities?.taxExperience
  const estimated = answers.business?.estimatedTaxes
  const withholding = answers.w2?.withholdingReviewed
  const ev = [evidence('income','sources',sources)]
  if (tax != null) ev.push(evidence('priorities','taxExperience',tax))
  if (nonW2 && estimated != null) ev.push(evidence('business','estimatedTaxes',estimated))
  if (has(sources,'w2') && withholding != null) ev.push(evidence('w2','withholdingReviewed',withholding))
  if (!sources.length || unknown(tax) || (nonW2 && unknown(estimated))) return foundation('income_tax','GRAY',pair('Income or tax-process information is incomplete.','收入或税务流程信息尚不完整。'),ev)
  if (nonW2 && estimated === 'no') return foundation('income_tax','RED',pair('Non-W-2 income is present and an estimated-tax process has not been addressed. This does not calculate tax liability.','目前存在非W-2收入，但尚未安排预估税流程。本结果并不计算税负。'),ev,pair('Organize income records and review the tax-reserve process.','整理收入记录并检查税款储备流程。'))
  if (['surprised','high_unclear','mixed_complex','transaction'].includes(tax) || estimated === 'partly' || withholding === 'not_recent') return foundation('income_tax','YELLOW',pair('The reported tax experience or process creates a useful planning window.','目前的税务体验或流程形成了值得把握的规划窗口。'),ev)
  return foundation('income_tax','GREEN',pair('The reported income and tax process appears organized today.','据填写信息，目前收入与税务流程较有条理。'),ev)
}

function retirementFoundation(answers) {
  const direction = answers.retirement?.direction
  const accounts = arr(answers.retirement?.accounts)
  const ev = direction == null ? [] : [evidence('retirement','direction',direction),evidence('retirement','accounts',accounts)]
  if (unknown(direction)) return foundation('retirement','GRAY',pair('Retirement direction is not yet clear enough to assess.','退休方向尚不够清楚，无法判断。'),ev)
  if (direction === 'not_started') return foundation('retirement','RED',pair('Retirement planning has not meaningfully started. This finding is not based on owning or missing any particular account.','退休规划尚未真正开始。本判断不以是否拥有某一种账户为依据。'),ev)
  if (['saving_unsure','uncoordinated'].includes(direction)) return foundation('retirement','YELLOW',pair('Saving exists, but adequacy or coordination remains unresolved.','已有储蓄，但是否足够或如何协调仍未解决。'),ev)
  return foundation('retirement','GREEN',pair('A clear direction and consistent saving were reported.','据填写信息，已有清晰方向并持续储蓄。'),ev)
}

function educationFoundation(answers) {
  const children = arr(answers.household?.childrenStatus)
  if (!hasAny(children,['dependent','future'])) return foundation('education','GRAY',pair('Not applicable based on the current household stage.','根据目前家庭阶段，本项暂不适用。'),[evidence('household','childrenStatus',children)],pair('Revisit if future opportunities or family responsibilities change.','未来机会或家庭责任变化时再检查。'))
  const status = answers.education?.savingStatus
  const vehicles = arr(answers.education?.vehicles)
  const ev = [evidence('household','childrenStatus',children)]
  if (status != null) ev.push(evidence('education','savingStatus',status),evidence('education','vehicles',vehicles))
  if (unknown(status) || status === 'vehicle_unsure') return foundation('education','GRAY',pair('The future goal or funding approach needs more information.','未来目标或资金安排仍需要更多信息。'),ev)
  if (['not_started','irregular'].includes(status)) return foundation('education','YELLOW',pair('A future opportunity is relevant and the funding process is not yet consistent. This does not imply that a 529 or any other product is required.','未来机会与家庭相关，但资金准备尚不稳定。这并不表示必须使用529或任何其他产品。'),ev)
  return foundation('education','GREEN',pair('A consistent education or future-opportunity funding process was reported. Existing 529 assets, if any, are not treated as a mistake.','据填写信息，教育或未来机会资金正在持续准备。已有529（如有）不会被视为错误。'),ev)
}

function protectionFoundation(answers) {
  const risks = arr(answers.protection?.goalsAtRisk)
  const coverage = arr(answers.protection?.coverage)
  const review = answers.protection?.lastReview
  const ev = [evidence('protection','goalsAtRisk',risks),evidence('protection','coverage',coverage)]
  if (review != null) ev.push(evidence('protection','lastReview',review))
  if (!risks.length || unknown(risks) || unknown(coverage) || unknown(review)) return foundation('protection','GRAY',pair('Economic exposure or current resources need clarification before drawing a conclusion.','在得出结论前，需要进一步明确经济风险与现有资源。'),ev)
  const exposed = risks.some((item) => !['none','unsure'].includes(item))
  if (exposed && (has(coverage,'none') || review === 'never')) return foundation('protection','RED',pair('Important goals depend on earned income, while current protection is absent or has never been reviewed. This identifies a needs-analysis question, not a product recommendation.','重要目标依赖劳动收入，而现有保障为空或从未检查。这表示需要进行需求分析，并非产品推荐。'),ev,pair('Quantify obligations, existing resources, and the duration of the exposure before comparing alternatives.','比较工具前，先量化责任、现有资源与风险持续时间。'))
  if (exposed && ['over_5','2_5'].includes(review)) return foundation('protection','YELLOW',pair('Economic exposure exists and the protection review may be aging.','目前存在经济风险，保障检查可能需要更新。'),ev)
  return foundation('protection','GREEN',pair('The household reports adequate coverage or a recent review relative to identified goals.','相对于已识别目标，家庭报告已有充分安排或近期完成检查。'),ev)
}

function debtPropertyFoundation(answers) {
  const types = arr(answers.debt?.types)
  const interferes = answers.debt?.interferes
  const rentalChange = answers.property?.rentalChange
  const ev = [evidence('debt','types',types)]
  if (interferes != null) ev.push(evidence('debt','interferes',interferes))
  if (rentalChange != null) ev.push(evidence('property','rentalChange',rentalChange))
  if (unknown(interferes)) return foundation('debt_property','GRAY',pair('The effect of debt on saving is not yet known.','债务对储蓄的影响尚不清楚。'),ev)
  if (interferes === 'yes') return foundation('debt_property','RED',pair('Debt is reported as difficult to manage or as interfering with saving. A mortgage alone does not create this status.','据填写信息，债务难以管理或正在影响储蓄。仅有房贷不会产生这一状态。'),ev)
  if (interferes === 'sometimes' || ['yes','maybe'].includes(rentalChange)) return foundation('debt_property','YELLOW',pair(rentalChange ? 'A rental-property decision may occur within 24 months, creating a review-before-acting window.' : 'Debt sometimes interferes with saving and deserves a planned review.','未来24个月内可能发生出租物业决定，形成行动前检查窗口。'),ev)
  return foundation('debt_property','GREEN',pair('Debt is not reported as interfering with saving, and no near-term rental decision was identified.','据填写信息，债务未影响储蓄，且没有识别到近期出租物业决定。'),ev)
}

function businessFoundation(answers) {
  const sources = arr(answers.income?.sources)
  if (!hasAny(sources,['1099','business'])) return foundation('business_payroll','GRAY',pair('Not applicable because no 1099 or business income was reported.','未报告1099或企业收入，本项暂不适用。'),[evidence('income','sources',sources)])
  const business = answers.business || {}
  const fields = ['stage','separated','tracked','estimatedTaxes','entity','payroll','retirementPlan','employees','profitProcess']
  const ev = fields.filter((field) => business[field] != null).map((field) => evidence('business',field,business[field]))
  if (fields.some((field) => business[field] == null || unknown(business[field]))) return foundation('business_payroll','GRAY',pair('Business organization information is incomplete.','企业组织信息尚不完整。'),ev)
  const severe = ['no'].includes(business.separated) || business.tracked === 'no' || business.estimatedTaxes === 'no' || (['ongoing','growing'].includes(business.stage) && business.profitProcess === 'no')
  if (severe) return foundation('business_payroll','RED',pair('An active business has unresolved recordkeeping, tax, or owner-pay processes. This does not imply that an S corporation is appropriate.','活跃企业仍有记录、税务或业主薪酬流程未解决。本结果不表示S Corporation一定适合。'),ev)
  if (['partly'].includes(business.separated) || business.tracked === 'partly' || business.estimatedTaxes === 'partly' || business.profitProcess === 'somewhat') return foundation('business_payroll','YELLOW',pair('Core business processes exist but are not yet fully coordinated.','企业核心流程已有基础，但尚未完全协调。'),ev)
  return foundation('business_payroll','GREEN',pair('The reported business, tax, and owner-pay processes appear organized.','据填写信息，企业、税务与业主薪酬流程较有条理。'),ev)
}

function estateFoundation(answers) {
  const current = arr(answers.estate?.current)
  const ev = [evidence('estate','current',current)]
  if (!current.length || unknown(current)) return foundation('estate','GRAY',pair('Current document and beneficiary information is not yet known.','目前尚不清楚文件与受益人指定状况。'),ev)
  if (has(current,'none')) return foundation('estate','YELLOW',pair('No current foundational documents or beneficiary designations were reported. This is an education and legal-review prompt, not legal advice.','未报告现行基础文件或受益人指定。本项仅作教育和法律审核提示，不构成法律意见。'),ev)
  return foundation('estate','GREEN',pair('At least one current foundational document or designation was reported; relevance still depends on household facts.','据填写信息，至少有一项基础文件或指定；具体是否充分仍取决于家庭事实。'),ev)
}

const capitalJobLabels = {
  GROW:pair('Grow long-term capital','增长长期资本'), KEEP:pair('Keep more through organized tax decisions','通过有序税务决策留住更多'),
  ACCESS:pair('Maintain access and flexibility','保持可用性与灵活性'), PROTECT:pair('Protect people and obligations','保障人员与责任'),
  INCOME:pair('Create future income','形成未来收入'), FUND:pair('Fund education and future opportunities','支持教育与未来机会'),
  LEGACY:pair('Carry intent forward','延续家庭意愿'),
}

function deriveCapitalJobs(answers, foundations) {
  const selected = arr(answers.retirement?.jobs)
  const statusOf = (id) => foundations.find((item) => item.id === id)?.status
  const jobs = ['GROW','KEEP','ACCESS','PROTECT','INCOME','FUND','LEGACY'].map((id) => {
    let state = selected.includes(id) ? 'represented' : 'not_selected'
    const reasons = []
    if (id === 'GROW' && ['red','yellow'].includes(statusOf('retirement'))) { state='needs_review'; reasons.push('retirement.direction') }
    if (id === 'KEEP' && ['red','yellow'].includes(statusOf('income_tax'))) { state='needs_review'; reasons.push('priorities.taxExperience') }
    if (id === 'ACCESS' && ['red','yellow'].includes(statusOf('cash'))) { state='needs_review'; reasons.push('liquidity.runway') }
    if (id === 'PROTECT' && ['red','yellow'].includes(statusOf('protection'))) { state='needs_review'; reasons.push('protection.goalsAtRisk') }
    if (id === 'INCOME' && ['not_started','unsure'].includes(answers.retirement?.direction)) { state=answers.retirement?.direction === 'unsure' ? 'unclear' : 'needs_review'; reasons.push('retirement.direction') }
    if (id === 'FUND' && ['red','yellow'].includes(statusOf('education'))) { state='needs_review'; reasons.push('education.savingStatus') }
    if (id === 'LEGACY' && ['gray','yellow'].includes(statusOf('estate'))) { state=statusOf('estate') === 'gray' ? 'unclear' : 'needs_review'; reasons.push('estate.current') }
    return {id,label:capitalJobLabels[id],state,evidenceIds:reasons}
  })
  return {principle:pair('Different tools perform different jobs. Household facts determine which trade-offs matter.','不同工具承担不同任务。家庭事实决定哪些取舍最重要。'),jobs}
}

const priorityLabels = {
  keep:pair('Keep more of what we earn','更好地留住收入'),retirement:pair('Build retirement intentionally','更有计划地准备退休'),future:pair('Prepare for future opportunities','为未来机会做准备'),protect:pair('Protect the family','保障家庭'),debt:pair('Reduce debt','减少债务'),business:pair('Organize or grow a business','组织或发展企业'),flexibility:pair('Create more flexibility','增加灵活性'),understand:pair('Understand where we stand','了解目前状况'),unsure:pair('Not sure yet','暂不确定'),
}

function deriveKnowledgeConnections(answers) {
  const connections = []
  if (answers.w2?.recentJobChange === 'yes') connections.push({...reviewConnections.oldPlanDestination,id:'job-change-old-plan',evidenceIds:[`w2.oldPlanDestination:${answers.w2.oldPlanDestination || 'unsure'}`]})
  if (answers.w2?.match === 'no') connections.push({...reviewConnections.noMatch,id:'no-employer-match',kind:'allocation_review',evidenceIds:['w2.match:no']})
  if (['yes','maybe'].includes(answers.property?.rentalChange)) connections.push({...reviewConnections.rentalChange,id:'rental-change',evidenceIds:[`property.rentalChange:${answers.property.rentalChange}`]})
  return connections
}

export function calculateFamilyCapitalReview(inputAnswers = {}) {
  const answers = structuredClone(inputAnswers)
  const foundations = [cashFoundation(answers),incomeTaxFoundation(answers),retirementFoundation(answers),educationFoundation(answers),protectionFoundation(answers),debtPropertyFoundation(answers),businessFoundation(answers),estateFoundation(answers)]
  const byBucket = (bucket) => foundations.filter((item) => item.actionBucket === bucket).map((item) => ({foundationId:item.id,title:item.title,why:item.whyFlagged,route:item.route,evidenceIds:item.evidenceIds}))
  const clientPriorityId = answers.priorities?.clientPriority || 'unsure'
  const priorityFoundation = {keep:'income_tax',retirement:'retirement',future:'education',protect:'protection',debt:'debt_property',business:'business_payroll',flexibility:'cash',understand:null}[clientPriorityId]
  const also = foundations.find((item) => ['red','yellow'].includes(item.status) && item.id !== priorityFoundation)
  const knowledgeConnections = deriveKnowledgeConnections(answers)
  return {
    reviewVersion:FAMILY_CAPITAL_REVIEW_VERSION,
    answers,
    foundations,
    foundationMap:Object.fromEntries(foundations.map((item) => [item.id,item])),
    capitalJobs:deriveCapitalJobs(answers,foundations),
    actionMap:{now:byBucket('now'),next12Months:byBucket('next_12_months'),onTrack:byBucket('on_track')},
    clientPriority:{id:clientPriorityId,label:priorityLabels[clientPriorityId] || priorityLabels.unsure},
    onyxAlsoNoticed:also ? {foundationId:also.id,title:also.title,why:also.whyFlagged,evidenceIds:also.evidenceIds} : null,
    planningWindows:foundations.filter((item) => item.status === 'yellow').map((item) => item.id),
    knowledgeConnections,
    sammiConversationContext:{reviewVersion:FAMILY_CAPITAL_REVIEW_VERSION,clientPriority:clientPriorityId,focusFoundationIds:unique([...byBucket('now'),...byBucket('next_12_months')].map((item) => item.foundationId)),connectionIds:knowledgeConnections.map((item) => item.id),notice:pair('Context only; no sensitive documents or product recommendation.','仅提供背景；不包含敏感文件或产品推荐。')},
  }
}
