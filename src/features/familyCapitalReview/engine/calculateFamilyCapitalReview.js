import { FAMILY_CAPITAL_REVIEW_VERSION, getActiveReviewAnswers } from '../data/questions.js'
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
    decisionToClarify:definition.decision, tradeoffToConsider:definition.tradeoff,
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
  const businessIncome = hasAny(sources,['1099','business'])
  const nonW2 = businessIncome || has(sources,'rental')
  const tax = answers.priorities?.taxExperience
  const estimated = answers.business?.estimatedTaxes
  const withholding = answers.w2?.withholdingReviewed
  const ev = [evidence('income','sources',sources)]
  if (tax != null) ev.push(evidence('priorities','taxExperience',tax))
  if (businessIncome && estimated != null) ev.push(evidence('business','estimatedTaxes',estimated))
  if (has(sources,'w2') && withholding != null) ev.push(evidence('w2','withholdingReviewed',withholding))
  if (!sources.length || unknown(tax) || (businessIncome && unknown(estimated))) return foundation('income_tax','GRAY',pair('Income or tax-process information is incomplete.','收入或税务流程信息尚不完整。'),ev)
  if (businessIncome && estimated === 'no') return foundation('income_tax','RED',pair('1099 or business income is present and an estimated-tax process has not been addressed. This does not calculate tax liability.','目前存在1099或企业收入，但尚未安排预估税流程。本结果并不计算税负。'),ev,pair('Organize income records and review the tax-reserve process.','整理收入记录并检查税款储备流程。'))
  if (['surprised','high_unclear','mixed_complex','transaction'].includes(tax) || estimated === 'partly' || withholding === 'not_recent') return foundation('income_tax','YELLOW',pair('The reported tax experience or process creates a useful planning window.','目前的税务体验或流程形成了值得把握的规划窗口。'),ev)
  return foundation('income_tax','GREEN',pair('The reported income and tax process appears organized today.','据填写信息，目前收入与税务流程较有条理。'),ev)
}

function retirementFoundation(answers) {
  const direction = answers.retirement?.direction
  const accounts = arr(answers.retirement?.accounts)
  const ev = direction == null ? [] : [evidence('retirement','direction',direction),evidence('retirement','accounts',accounts)]
  if (unknown(direction) || !accounts.length || unknown(accounts)) return foundation('retirement','GRAY',pair('Retirement direction or current account information is not yet clear enough to assess.','退休方向或现有账户信息还不够清楚，暂时无法判断。'),ev)
  if (direction === 'not_started') return foundation('retirement','RED',pair('Retirement planning has not meaningfully started. This finding is not based on owning or missing any particular account.','退休规划尚未真正开始。本判断不以是否拥有某一种账户为依据。'),ev)
  if (['saving_unsure','uncoordinated'].includes(direction)) return foundation('retirement','YELLOW',pair('Saving exists, but adequacy or coordination remains unresolved.','已有储蓄，但是否足够或如何协调仍未解决。'),ev)
  if (has(accounts,'none')) return foundation('retirement','GRAY',pair('A clear direction was reported, but current retirement resources still need clarification.','目前的退休方向较清楚，但现有退休资金情况仍需进一步确认。'),ev)
  return foundation('retirement','GREEN',pair('No immediate planning concern is indicated by the reported direction, saving pattern, and current account information; periodic review still matters.','根据目前填写的方向、储蓄习惯和账户信息，暂未发现需要立即处理的问题；仍应定期复核。'),ev,pair('Revisit the retirement timeline, contribution pattern, and account allocation periodically.','定期复核退休时间、缴款节奏和账户配置。'))
}

function educationFoundation(answers) {
  const children = arr(answers.household?.childrenStatus)
  if (!hasAny(children,['dependent','future'])) return foundation('education','GRAY',pair('Not applicable based on the current household stage.','根据目前家庭阶段，本项暂不适用。'),[evidence('household','childrenStatus',children)],pair('Revisit if future opportunities or family responsibilities change.','未来机会或家庭责任变化时再检查。'))
  const status = answers.education?.savingStatus
  const vehicles = arr(answers.education?.vehicles)
  const goals = arr(answers.education?.goals)
  const desiredJobs = arr(answers.education?.desiredJobs)
  const flexibility = answers.education?.flexibility
  const ev = [evidence('household','childrenStatus',children)]
  if (status != null) ev.push(evidence('education','savingStatus',status),evidence('education','vehicles',vehicles))
  if (unknown(status) || status === 'vehicle_unsure' || !goals.length || unknown(goals) || !desiredJobs.length || unknown(desiredJobs) || unknown(flexibility)) return foundation('education','GRAY',pair('The future goal, timing, or required flexibility needs more information.','未来目标、时间或所需灵活性仍需要更多信息。'),ev)
  if (['not_started','irregular'].includes(status)) return foundation('education','YELLOW',pair('A future opportunity is relevant and the funding process is not yet consistent. This does not imply that a 529 or any other product is required.','未来机会与家庭相关，但资金准备尚不稳定。这并不表示必须使用529或任何其他产品。'),ev)
  return foundation('education','GREEN',pair('A consistent funding process and clear future-use priorities were reported. This does not establish that the goal is fully funded, and existing 529 assets, if any, are not treated as a mistake.','据填写信息，资金准备较持续，未来用途和灵活性也较清楚。这并不表示目标已经完全备足；已有529（如有）也不会被视为错误。'),ev,pair('Revisit the goal, timing, contribution pattern, and flexibility as circumstances change.','随着情况变化，定期复核目标、时间、储蓄节奏和灵活性。'))
}

function protectionFoundation(answers) {
  const risks = arr(answers.protection?.goalsAtRisk)
  const coverage = arr(answers.protection?.coverage)
  const review = answers.protection?.lastReview
  const ev = [evidence('protection','goalsAtRisk',risks),evidence('protection','coverage',coverage)]
  if (review != null) ev.push(evidence('protection','lastReview',review))
  if (!risks.length || unknown(risks) || unknown(coverage) || unknown(review)) return foundation('protection','GRAY',pair('Economic exposure or current resources need clarification before drawing a conclusion.','在得出结论前，需要进一步明确经济风险与现有资源。'),ev)
  const exposed = risks.some((item) => !['none','adequately_covered','unsure'].includes(item))
  const noCurrentExposure = has(risks,'none')
  const reportsAdequate = has(risks,'adequately_covered')
  if (exposed && (has(coverage,'none') || review === 'never')) return foundation('protection','RED',pair('Important goals depend on earned income, while current protection is absent or has never been reviewed. This identifies a needs-analysis question, not a product recommendation.','重要目标依赖劳动收入，而现有保障为空或从未检查。这表示需要进行需求分析，并非产品推荐。'),ev,pair('Quantify obligations, existing resources, and the duration of the exposure before comparing alternatives.','比较工具前，先量化责任、现有资源与风险持续时间。'))
  if (noCurrentExposure && !exposed) return foundation('protection','GREEN',pair('No current goal was reported as depending on this income. Changes in obligations should prompt another review.','据填写信息，目前没有目标依赖这份收入；家庭责任变化时应重新检查。'),ev,pair('Revisit this area when income dependence or household obligations change.','收入依赖或家庭责任变化时重新检查。'))
  if (reportsAdequate && !exposed && review === 'under_2') return foundation('protection','GREEN',pair('The household reports that identified goals appear covered and the review is recent; actual adequacy still depends on a separate needs analysis.','家庭报告相关目标似乎已有安排，且近期完成过检查；实际是否充分仍需另行进行需求分析。'),ev,pair('Keep the review current as income, obligations, and available resources change.','收入、家庭责任或可用资源变化时及时复核。'))
  if (exposed || reportsAdequate) return foundation('protection','YELLOW',pair('Income-dependent goals exist or reported protection still needs to be confirmed against current obligations and resources.','目前存在依赖收入的目标，或现有保障仍需结合家庭责任和可用资源进一步确认。'),ev,pair('Confirm the protection period, obligations, existing resources, and current review assumptions.','确认需要保障的期限、家庭责任、现有资源和上次检查所依据的情况。'))
  return foundation('protection','GRAY',pair('Current economic exposure and protection resources are not clear enough to assess.','目前的经济责任和保障资源还不够清楚，暂时无法判断。'),ev)
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
  if (has(current,'none')) return foundation('estate','YELLOW',pair('No current foundational documents or beneficiary designations were reported. This is an education and legal-review prompt, not legal advice.','目前没有报告有效的基础文件或受益人指定。本项仅用于教育和法律专业审核提示，不构成法律意见。'),ev,pair('Confirm which documents and beneficiary designations may require legal review.','确认哪些文件和受益人指定可能需要法律专业人士审核。'))
  const coreKnown = has(current,'beneficiaries') && has(current,'poa') && has(current,'healthcare') && hasAny(current,['will','trust'])
  if (!coreKnown) return foundation('estate','YELLOW',pair('Some foundational items were reported, but the overall document and beneficiary picture is not yet complete. This is not legal advice.','已经有部分基础安排，但文件与受益人指定的整体情况仍需补充确认。本项不构成法律意见。'),ev,pair('Confirm which documents and beneficiary designations are current and which need professional review.','确认哪些文件和受益人指定仍然有效，哪些需要专业审核。'))
  return foundation('estate','GREEN',pair('No immediate gap is indicated across the reported core documents and beneficiary designations; legal relevance still depends on household facts.','根据目前填写的核心文件和受益人指定，暂未发现明显缺口；法律上的适用性仍取决于家庭实际情况。'),ev,pair('Revisit documents and beneficiary designations after material family or financial changes.','家庭或财务情况发生重大变化后，重新检查相关文件和受益人指定。'))
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
  const foundationForJob = {GROW:'retirement',KEEP:'income_tax',ACCESS:'cash',PROTECT:'protection',INCOME:'retirement',FUND:'education',LEGACY:'estate'}
  const desiredJobs = ['GROW','KEEP','ACCESS','PROTECT','INCOME','FUND','LEGACY'].map((id) => ({id,label:capitalJobLabels[id],state:selected.includes(id) ? 'desired' : selected.includes('unsure') || !selected.length ? 'unclear' : 'not_selected',evidenceIds:selected.length ? [`retirement.jobs:${selected.join('|')}`] : []}))
  const existingMoney = ['GROW','KEEP','ACCESS','PROTECT','INCOME','FUND','LEGACY'].map((id) => {
    const foundationId = foundationForJob[id]
    const status = statusOf(foundationId)
    return {id,label:capitalJobLabels[id],state:status === 'green' ? 'represented' : status === 'gray' ? 'unclear' : 'needs_review',evidenceIds:[`foundation.${foundationId}:${status}`]}
  })
  const jobs = ['GROW','KEEP','ACCESS','PROTECT','INCOME','FUND','LEGACY'].map((id) => {
    let state = 'not_selected'
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
  return {principle:pair('Desired jobs, current coverage, and the next dollar are three distinct questions. One tool does not need to perform every job.','希望资金完成什么、现有资源覆盖什么，以及下一块钱做什么，是三个不同的问题。一个工具不需要承担所有任务。'),desiredJobs,existingMoney,nextDollar:jobs,jobs}
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
  const answers = getActiveReviewAnswers(inputAnswers)
  const foundations = [cashFoundation(answers),incomeTaxFoundation(answers),retirementFoundation(answers),educationFoundation(answers),protectionFoundation(answers),debtPropertyFoundation(answers),businessFoundation(answers),estateFoundation(answers)]
  const byBucket = (bucket) => foundations.filter((item) => item.actionBucket === bucket).map((item) => ({foundationId:item.id,title:item.title,action:item.suggestedNextStep,why:item.whyFlagged,route:item.route,evidenceIds:item.evidenceIds}))
  const clientPriorityId = answers.priorities?.clientPriority || 'unsure'
  const priorityFoundation = {keep:'income_tax',retirement:'retirement',future:'education',protect:'protection',debt:'debt_property',business:'business_payroll',flexibility:'cash',understand:null}[clientPriorityId]
  const also = foundations.find((item) => ['red','yellow'].includes(item.status) && item.id !== priorityFoundation)
  const knowledgeConnections = deriveKnowledgeConnections(answers)
  const healthy = foundations.filter((item) => item.status === 'green')
  const needsAttention = foundations.filter((item) => item.status === 'red')
  const decisionsApproaching = foundations.filter((item) => item.status === 'yellow')
  const isNotApplicable = (item) => /Not applicable|不适用/.test(`${item.whyFlagged.en}${item.whyFlagged.zh}`)
  const missingInformation = foundations.filter((item) => item.status === 'gray' && !isNotApplicable(item))
  const decisionIntelligence = foundations.filter((item) => item.status !== 'green' && !isNotApplicable(item))
  const capitalJobs = deriveCapitalJobs(answers,foundations)
  const underservedCapitalJobs = capitalJobs.nextDollar.filter((item) => ['needs_review','unclear'].includes(item.state))
  const questionForJob = {
    GROW:pair('What retirement timeline should current and future saving support?','目前和未来的储蓄需要支持怎样的退休时间？'),
    KEEP:pair('Which parts of the current income and tax process feel least predictable?','目前收入和税务流程中，哪一部分最难预估？'),
    ACCESS:pair('How much capital may need to remain available within the next one to three years?','未来一到三年内，可能需要保留多少随时可用的资金？'),
    PROTECT:pair('If one income stopped, what would the household most want to preserve?','如果一份收入中断，家庭最希望先保住哪些安排？'),
    INCOME:pair('At what point would the household like earned work to become optional?','家庭希望从什么时候开始，可以不再完全依赖劳动收入？'),
    FUND:pair('How much flexibility is needed if the future path changes?','如果未来选择发生变化，这笔资金需要保留多大灵活性？'),
    LEGACY:pair('Which decisions or family intentions should remain clear if someone cannot act personally?','如果本人无法亲自作决定，哪些安排或家庭意愿需要保持清楚？'),
  }
  const followUpQuestions = unique(underservedCapitalJobs.map((job) => job.id)).slice(0,5).map((id) => ({id,question:questionForJob[id]}))
  return {
    reviewVersion:FAMILY_CAPITAL_REVIEW_VERSION,
    answers,
    foundations,
    foundationMap:Object.fromEntries(foundations.map((item) => [item.id,item])),
    capitalJobs,
    actionMap:{now:byBucket('now'),next12Months:byBucket('next_12_months'),onTrack:byBucket('on_track')},
    clientPriority:{id:clientPriorityId,label:priorityLabels[clientPriorityId] || priorityLabels.unsure},
    onyxAlsoNoticed:also ? {foundationId:also.id,title:also.title,why:also.whyFlagged,evidenceIds:also.evidenceIds} : null,
    planningWindows:foundations.filter((item) => item.status === 'yellow').map((item) => item.id),
    decisionIntelligence,
    knowledgeConnections,
    sammiReview:{healthy:healthy.map((item)=>({foundationId:item.id,title:item.title,evidenceIds:item.evidenceIds})),needsAttention:needsAttention.map((item)=>({foundationId:item.id,title:item.title,why:item.whyFlagged,evidenceIds:item.evidenceIds})),decisionsApproaching:decisionsApproaching.map((item)=>({foundationId:item.id,title:item.title,why:item.whyFlagged,evidenceIds:item.evidenceIds})),missingInformation:missingInformation.map((item)=>({foundationId:item.id,title:item.title,informationToGather:item.informationToGather})),underservedCapitalJobs,followUpQuestions,conversationTopics:unique([...needsAttention,...decisionsApproaching].map((item)=>item.id)).slice(0,5)},
    sammiConversationContext:{reviewVersion:FAMILY_CAPITAL_REVIEW_VERSION,clientPriority:clientPriorityId,focusFoundationIds:unique([...byBucket('now'),...byBucket('next_12_months')].map((item) => item.foundationId)),connectionIds:knowledgeConnections.map((item) => item.id),notice:pair('Context only; no sensitive documents or product recommendation.','仅提供背景；不包含敏感文件或产品推荐。')},
  }
}
