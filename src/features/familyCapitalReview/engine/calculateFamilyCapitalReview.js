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

function notApplicableFoundation(id, why, evidenceItems = [], nextStep) {
  return {...foundation(id,'GRAY',why,evidenceItems,nextStep),statusLabel:pair('Not Applicable','不适用'),isNotApplicable:true}
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
  if (businessIncome && estimated === 'no') return foundation('income_tax','YELLOW',pair('1099 or business income was reported without an established estimated-tax review process. Whether estimated payments are required depends on the full income mix, withholding, and applicable tax facts.','已报告1099或企业收入，但尚未建立预估税检查流程。是否需要缴纳预估税，取决于完整的收入结构、预扣税及适用的税务事实。'),ev,pair('Organize income and withholding records, then review whether a tax-reserve or payment process is relevant.','整理收入与预扣税资料，再检查是否需要税款预留或缴税流程。'))
  if (['surprised','high_unclear','mixed_complex','transaction'].includes(tax) || estimated === 'partly' || withholding === 'not_recent') return foundation('income_tax','YELLOW',pair('The reported tax experience or process creates a useful planning window.','目前的税务体验或流程形成了值得把握的规划窗口。'),ev)
  return foundation('income_tax','GREEN',pair('Based only on the reported process, this screening identified no immediate tax-coordination question. Tax compliance, liability, and possible savings were not evaluated.','仅根据已报告的流程，本次初步梳理未发现需要立即处理的税务协调问题；本次梳理未评估税务合规、实际税负或潜在节税。'),ev)
}

function retirementFoundation(answers) {
  const direction = answers.retirement?.direction
  const accounts = arr(answers.retirement?.accounts)
  const ev = direction == null ? [] : [evidence('retirement','direction',direction),evidence('retirement','accounts',accounts)]
  if (unknown(direction) || !accounts.length || unknown(accounts)) return foundation('retirement','GRAY',pair('Retirement direction or current account information is not yet clear enough to assess.','退休方向或现有账户信息还不够清楚，暂时无法判断。'),ev)
  if (direction === 'not_started') return foundation('retirement','RED',pair('Retirement planning has not meaningfully started. This finding is not based on owning or missing any particular account.','退休规划尚未真正开始。本判断不以是否拥有某一种账户为依据。'),ev)
  if (['saving_unsure','uncoordinated'].includes(direction)) return foundation('retirement','YELLOW',pair('Saving exists, but adequacy or coordination remains unresolved.','已有储蓄，但是否足够或如何协调仍未解决。'),ev)
  if (has(accounts,'none')) return foundation('retirement','GRAY',pair('A clear direction was reported, but current retirement resources still need clarification.','目前的退休方向较清楚，但现有退休资金情况仍需进一步确认。'),ev)
  return foundation('retirement','GREEN',pair('Based only on the reported direction, contribution pattern, and account information, this screening identified no immediate coordination question. Retirement adequacy and investment suitability were not evaluated.','仅根据已报告的退休方向、缴款情况和账户信息，本次初步梳理未发现需要立即处理的协调问题；本次梳理未评估退休资金是否充足或投资是否适合。'),ev,pair('Revisit the retirement timeline, contribution approach, and retirement-resource coordination periodically.','定期复核退休时间、缴款方式和退休资源之间的协调情况。'))
}

function educationFoundation(answers) {
  const children = arr(answers.household?.childrenStatus)
  if (!hasAny(children,['dependent','future'])) return notApplicableFoundation('education',pair('The child-focused education review does not apply based on the current household answers. Other personal or family-future goals can be reviewed separately.','根据目前家庭情况，以孩子为重点的教育规划梳理不适用；个人或家庭的其他未来目标仍可另行讨论。'),[evidence('household','childrenStatus',children)],pair('Revisit this area if child-related goals or other family-future priorities change.','如与孩子有关的目标或其他家庭未来重点发生变化，可重新梳理。'))
  const status = answers.education?.savingStatus
  const vehicles = arr(answers.education?.vehicles)
  const goals = arr(answers.education?.goals)
  const desiredJobs = arr(answers.education?.desiredJobs)
  const flexibility = answers.education?.flexibility
  const ev = [evidence('household','childrenStatus',children)]
  if (status != null) ev.push(evidence('education','savingStatus',status),evidence('education','vehicles',vehicles))
  if (unknown(status) || status === 'vehicle_unsure' || !goals.length || unknown(goals) || !desiredJobs.length || unknown(desiredJobs) || unknown(flexibility)) return foundation('education','GRAY',pair('The future goal, timing, or required flexibility needs more information.','未来目标、时间或所需灵活性仍需要更多信息。'),ev)
  if (status === 'not_started') return foundation('education','YELLOW',pair('A future opportunity was identified and a funding approach has not yet been started. This is a planning signal, not a product recommendation.','已识别出一项未来目标，但资金准备尚未开始。这是一项规划提示，并非产品推荐。'),ev)
  if (status === 'irregular') return foundation('education','GRAY',pair('An irregular saving pattern was reported, but this screening does not know whether that pattern is intentional or appropriate for the goal.','已报告不定期储蓄，但本次初步梳理无法判断这种方式是否出于有意安排，或是否适合相关目标。'),ev)
  return foundation('education','GREEN',pair('Based only on the reported saving process and future-use priorities, this screening identified no immediate coordination question. Funding adequacy, account suitability, and student-aid effects were not evaluated.','仅根据已报告的储蓄流程和未来用途，本次初步梳理未发现需要立即处理的协调问题；本次梳理未评估资金是否充足、账户是否适合或对助学金的影响。'),ev,pair('Revisit the goal, timing, contribution pattern, and flexibility as circumstances change.','随着情况变化，定期复核目标、时间、储蓄节奏和灵活性。'))
}

function protectionFoundation(answers) {
  const risks = arr(answers.protection?.goalsAtRisk)
  const coverage = arr(answers.protection?.coverage)
  const review = answers.protection?.lastReview
  const ev = [evidence('protection','goalsAtRisk',risks),evidence('protection','coverage',coverage)]
  if (review != null) ev.push(evidence('protection','lastReview',review))
  if (!risks.length || unknown(risks) || unknown(coverage) || unknown(review)) return foundation('protection','GRAY',pair('Economic exposure or current resources need clarification before drawing a conclusion.','在得出结论前，需要进一步明确经济风险与现有资源。'),ev)
  const exposed = risks.some((item) => !['none','unsure'].includes(item))
  const noCurrentExposure = has(risks,'none')
  if (exposed && has(coverage,'none')) return foundation('protection','RED',pair('Important goals were reported as depending on earned income, and no listed protection resource was reported. This identifies a needs-analysis question, not insurance inadequacy or a product recommendation.','已报告有重要目标依赖劳动收入，同时未报告任何所列保障资源。这表示需要进一步进行需求分析，并不代表已判断保障不足，也不是产品推荐。'),ev,pair('Quantify obligations, available resources, and the duration of the exposure before comparing insurance and non-insurance alternatives.','比较保险与非保险方案前，先量化家庭责任、可用资源和风险持续时间。'))
  if (exposed && review === 'never') return foundation('protection','RED',pair('Important goals were reported as depending on earned income, and protection needs have never been reviewed. This is a review signal, not a conclusion about insurance adequacy.','已报告有重要目标依赖劳动收入，同时从未梳理过相关保障需要。这是一项需要检查的提示，并不代表已判断保险保障是否充足。'),ev,pair('Review the obligations, available resources, and duration of the exposure before comparing insurance and non-insurance alternatives.','比较保险与非保险方案前，先梳理家庭责任、可用资源和风险持续时间。'))
  if (noCurrentExposure && !exposed) return foundation('protection','GREEN',pair('No current goal was reported as depending on this income. Changes in obligations should prompt another review.','据填写信息，目前没有目标依赖这份收入；家庭责任变化时应重新检查。'),ev,pair('Revisit this area when income dependence or household obligations change.','收入依赖或家庭责任变化时重新检查。'))
  if (exposed) return foundation('protection','YELLOW',pair('Income-dependent goals were reported. The listed resources and review timing do not establish insurance adequacy, so the obligations and available resources still need to be compared.','已报告有依赖收入的目标。所列资源和检查时间不能证明保险保障是否充足，仍需结合家庭责任和可用资源进一步梳理。'),ev,pair('Clarify the period of need, obligations, available resources, and prior review assumptions before comparing alternatives.','比较方案前，先明确需要保障的时间、家庭责任、可用资源和上次梳理所依据的情况。'))
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
  if (!hasAny(sources,['1099','business'])) return notApplicableFoundation('business_payroll',pair('Not applicable because no self-employed or business activity was reported.','未报告自雇或企业经营活动，本项暂不适用。'),[evidence('income','sources',sources)])
  const business = answers.business || {}
  const fields = ['stage','separated','tracked','estimatedTaxes','entity','payroll','retirementPlan','employees','profitProcess']
  const ev = fields.filter((field) => business[field] != null).map((field) => evidence('business',field,business[field]))
  if (fields.some((field) => business[field] == null || unknown(business[field]))) return foundation('business_payroll','GRAY',pair('More reported facts are needed before this screening can identify a business-planning signal.','需要补充更多已知情况，本次初步梳理才能判断是否存在企业规划提示。'),ev)
  const redIssue = business.separated === 'no'
    ? pair('Business and personal finances were reported as not separated.','已报告企业与个人财务尚未分开。')
    : business.tracked === 'no'
      ? pair('Income and expenses were reported as not tracked.','已报告收入与费用尚未记录。')
      : ['ongoing','growing'].includes(business.stage) && business.profitProcess === 'no'
        ? pair('An ongoing or growing activity was reported without a process for deciding how additional profit is used.','已报告业务正在持续或增长，但尚无安排新增利润用途的流程。')
        : null
  if (redIssue) return foundation('business_payroll','RED',pair(`${redIssue.en} This identifies an organization question, not a conclusion about tax, payroll, or legal compliance.`,`${redIssue.zh} 这是一项组织流程提示，并不代表已判断税务、Payroll或法律合规情况。`),ev)
  const yellowIssue = business.estimatedTaxes === 'no'
    ? pair('No estimated-tax review process was reported; whether payments are required depends on the full tax facts.','未报告预估税检查流程；是否需要缴税取决于完整的税务事实。')
    : business.separated === 'partly'
      ? pair('Business and personal finances were reported as only partly separated.','已报告企业与个人财务仅部分分开。')
      : business.tracked === 'partly'
        ? pair('Income and expense tracking was reported as partial.','已报告收入与费用记录尚不完整。')
        : business.estimatedTaxes === 'partly'
          ? pair('The estimated-tax review process was reported as partial.','已报告预估税检查流程仅完成一部分。')
          : business.profitProcess === 'somewhat'
            ? pair('The process for deciding how additional profit is used was reported as partial.','已报告新增利润用途的安排流程仅完成一部分。')
            : null
  if (yellowIssue) return foundation('business_payroll','YELLOW',pair(`${yellowIssue.en} This screening does not determine tax, payroll, or legal compliance.`,`${yellowIssue.zh} 本次初步梳理不判断税务、Payroll或法律合规情况。`),ev)
  return foundation('business_payroll','GREEN',pair('Based only on the reported organization and review processes, this screening identified no immediate coordination question. Tax, payroll, legal compliance, and plan suitability were not evaluated.','仅根据已报告的组织与检查流程，本次初步梳理未发现需要立即处理的协调问题；本次梳理未评估税务、Payroll、法律合规或计划是否适合。'),ev)
}

function estateFoundation(answers) {
  const current = arr(answers.estate?.current)
  const ev = [evidence('estate','current',current)]
  if (!current.length || unknown(current)) return foundation('estate','GRAY',pair('Current document and beneficiary information is not yet known.','目前尚不清楚文件与受益人指定状况。'),ev)
  if (has(current,'none')) return foundation('estate','YELLOW',pair('No foundational documents or beneficiary designations were reported. This screening does not determine what is legally required.','未报告任何基础文件或受益人指定；本次初步梳理不判断法律上需要哪些文件或指定。'),ev,pair('Discuss with qualified legal counsel which documents or designations may be relevant.','向具备资质的法律专业人士了解哪些文件或指定可能与家庭情况相关。'))
  const coreKnown = has(current,'beneficiaries') && has(current,'poa') && has(current,'healthcare') && hasAny(current,['will','trust'])
  if (!coreKnown) return foundation('estate','YELLOW',pair('Some foundational documents or designations were reported. Their legal effectiveness, coordination, and continued suitability were not evaluated.','已报告部分基础文件或指定；本次梳理未评估其法律效力、相互协调情况或是否仍然适合。'),ev,pair('Discuss with qualified legal counsel whether any reported or missing item warrants review.','向具备资质的法律专业人士了解已报告或未报告的项目是否需要审核。'))
  return foundation('estate','GREEN',pair('Several foundational documents and designations were reported. Their legal effectiveness, coordination, completeness, and continued suitability were not evaluated by this screening.','已报告多项基础文件和指定；本次初步梳理未评估其法律效力、相互协调、完整性或是否仍然适合。'),ev,pair('Consider qualified legal review after material family or financial changes.','家庭或财务情况发生重大变化后，可考虑请具备资质的法律专业人士审核。'))
}

const capitalJobLabels = {
  GROW:pair('Grow long-term capital','增长长期资本'), KEEP:pair('Coordinate taxes and avoid preventable surprises','协调税务并减少可避免的意外'),
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
  return {principle:pair('Desired jobs, current resources, and the next dollar are three distinct questions. One tool does not need to perform every job.','希望资金完成什么、现有资源有哪些，以及下一块钱做什么，是三个不同的问题。一个工具不需要承担所有任务。'),desiredJobs,existingMoney,nextDollar:jobs,jobs}
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
  const isNotApplicable = (item) => item.isNotApplicable === true
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
    sammiConversationContext:{reviewVersion:FAMILY_CAPITAL_REVIEW_VERSION,clientPriority:clientPriorityId,focusFoundationIds:unique([...byBucket('now'),...byBucket('next_12_months')].map((item) => item.foundationId)),connectionIds:knowledgeConnections.map((item) => item.id),notice:pair('Review context stays on this page. The contact link includes no answers, financial findings, or personal details.','梳理背景仅保留在本页面；联系链接不包含回答、财务发现或个人信息。')},
  }
}
