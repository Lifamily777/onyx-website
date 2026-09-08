const pair = (en, zh) => ({ en, zh })
const option = (id, en, zh) => ({ id, label:pair(en, zh) })

export const FAMILY_CAPITAL_REVIEW_VERSION = '1.0.0'

export const reviewFieldLabels = {
  'household.relationship':pair('Household','家庭状态'),'household.childrenStatus':pair('Children or future-child goals','孩子或未来生育计划'),'household.childAges':pair('Ages of dependent children','需抚养孩子的年龄'),'household.otherDependents':pair('Other caregiving responsibilities','其他照护责任'),
  'income.sources':pair('Income sources','收入来源'),'income.range':pair('Optional broad household income range','可选的家庭收入区间'),
  'w2.employerPlan':pair('Employer retirement plan','雇主退休计划'),'w2.match':pair('Employer contribution','雇主缴款'),'w2.fullMatch':pair('Current match use, if known','目前是否取得全部match（如知道）'),'w2.contributionType':pair('Contribution type','缴款类型'),'w2.hsa':pair('HSA access, if known','是否可使用HSA（如知道）'),'w2.withholdingReviewed':pair('Withholding review','预扣税检查'),'w2.recentJobChange':pair('Job transition','工作变化'),'w2.oldPlanDestination':pair('Old employer retirement money','原雇主退休资金去向'),
  'business.stage':pair('Activity stage','业务阶段'),'business.separated':pair('Business and personal finances','企业与个人财务'),'business.tracked':pair('Income and expense records','收入与费用记录'),'business.estimatedTaxes':pair('Estimated-tax process','预估税流程'),'business.entity':pair('Current entity or tax form','目前实体或税务形式'),'business.payroll':pair('Payroll','Payroll'),'business.retirementPlan':pair('Business retirement plan','企业退休计划'),'business.employees':pair('Employees','员工'),'business.profitProcess':pair('Process when profit increases','利润增加后的处理流程'),
  'liquidity.runway':pair('Liquid-resource runway','流动资源可维持时间'),'debt.types':pair('Debt types','债务类型'),'debt.interferes':pair('Effect on saving','对储蓄的影响'),
  'retirement.direction':pair('Current direction','目前方向'),'retirement.accounts':pair('Current account types','现有账户类型'),'retirement.jobs':pair('Jobs retirement money may need to perform','退休资金可能需要承担的任务'),
  'education.goals':pair('Possible future uses','未来可能用途'),'education.savingStatus':pair('Current saving pattern','目前储蓄情况'),'education.vehicles':pair('Where money is currently held','资金目前放在哪里'),'education.desiredJobs':pair('What the money should be able to do','希望资金能够完成什么'),'education.flexibility':pair('Importance of flexible use','灵活使用的重要性'),'education.aidAwareness':pair('Student-aid methodology awareness','助学金计算规则认知'),
  'protection.goalsAtRisk':pair('Goals that may be interrupted','可能中断的目标'),'protection.coverage':pair('Current protection resources','现有保障资源'),'protection.lastReview':pair('Last protection review','上次保障检查'),
  'property.ownership':pair('Property owned','现有房产'),'property.rentalChange':pair('Possible rental-property decision','可能的出租物业决定'),'estate.current':pair('Reasonably current documents and designations','目前大致有效的文件与指定'),
  'priorities.taxExperience':pair('Recent tax experience','近期税务体验'),'priorities.events':pair('Possible changes in the next 12–24 months','未来12–24个月可能发生的变化'),'priorities.clientPriority':pair('Most important improvement','最希望改善的事项'),
}

export const familyCapitalReviewQuestions = [
  {
    id:'household', order:1, title:pair('Household and family stage','家庭与人生阶段'),
    prompt:pair('Who is part of the household and who depends on its resources?','家庭由哪些人组成？目前有哪些人依赖家庭资源？'),
    fields:[
      {id:'relationship',type:'single',options:[option('single','Single','单身'),option('partnered','Married or partnered','已婚或有伴侣')]},
      {id:'childrenStatus',type:'multi',options:[option('none','No dependent children','没有需抚养的孩子'),option('dependent','Dependent children','有需抚养的孩子'),option('future','Preparing for a baby or future child','正在准备迎接宝宝或计划未来要孩子')]},
      {id:'childAges',type:'multi',when:{field:'childrenStatus',includes:'dependent'},options:[option('under_6','Under 6','6岁以下'),option('6_12','6–12','6–12岁'),option('13_17','13–17','13–17岁'),option('18_plus','18+ and still dependent','18岁以上且仍需支持')]},
      {id:'otherDependents',type:'single',options:[option('yes','Caring for parents or other dependents','需要照护父母或其他家属'),option('no','No','没有'),option('unsure','Not sure','不确定')]},
    ],
  },
  {
    id:'income', order:2, title:pair('Income sources','收入来源'),
    prompt:pair('Which income sources currently support the household?','家庭目前依靠哪些收入来源？'),
    fields:[
      {id:'sources',type:'multi',options:[option('w2','W-2 wages','W-2工资'),option('1099','1099 or freelance','1099或自由职业'),option('business','Own business','自有企业'),option('rental','Rental income','出租收入'),option('investment','Investment income','投资收入'),option('other','Other','其他')]},
      {id:'range',type:'single',optional:true,options:[option('under_100k','Under $100k','低于10万美元'),option('100_200k','$100k–$200k','10万–20万美元'),option('200_350k','$200k–$350k','20万–35万美元'),option('350_500k','$350k–$500k','35万–50万美元'),option('500k_plus','$500k+','50万美元以上'),option('prefer_not','Prefer not to say','不愿透露')]},
    ],
  },
  {
    id:'w2', order:3, title:pair('W-2 benefits and transitions','W-2福利与工作变化'), when:{question:'income',field:'sources',includes:'w2'},
    prompt:pair('What is already known about employer benefits, withholding, and recent job changes?','目前对雇主福利、预扣税和近期工作变化了解多少？'),
    fields:[
      {id:'employerPlan',type:'single',options:[option('yes','Employer retirement plan available','有雇主退休计划'),option('no','No employer retirement plan','没有雇主退休计划'),option('unsure','Not sure','不确定')]},
      {id:'match',type:'single',when:{field:'employerPlan',equals:'yes'},options:[option('yes','Employer match or contribution','有雇主match或contribution'),option('no','No employer match','没有雇主match'),option('unsure','Not sure','不确定')]},
      {id:'fullMatch',type:'single',when:{field:'match',equals:'yes'},options:[option('yes','Receiving the full match','已获得全部match'),option('no','Not receiving the full match','尚未获得全部match'),option('unsure','Not sure','不确定')]},
      {id:'contributionType',type:'multi',when:{field:'employerPlan',equals:'yes'},options:[option('traditional','Traditional','Traditional'),option('roth','Roth','Roth'),option('both','Both','两者都有'),option('unsure','Not sure','不确定')]},
      {id:'hsa',type:'single',options:[option('yes','HSA access','可以使用HSA'),option('no','No HSA access','不能使用HSA'),option('unsure','Not sure','不确定')]},
      {id:'withholdingReviewed',type:'single',options:[option('recent','Reviewed recently','近期检查过'),option('not_recent','Not reviewed recently','近期没有检查'),option('unsure','Not sure','不确定')]},
      {id:'recentJobChange',type:'single',options:[option('yes','Changed jobs or may leave soon','近期换工作或可能离职'),option('no','No recent change','近期没有变化')]},
      {id:'oldPlanDestination',type:'single',when:{field:'recentJobChange',equals:'yes'},options:[option('old_plan','Still in old plan','仍在原计划'),option('new_plan','Moved to new employer plan','转入新雇主计划'),option('rollover_ira','Traditional or Rollover IRA','Traditional或Rollover IRA'),option('elsewhere','Converted or moved elsewhere','转换或转至其他地方'),option('cashed_out','Cashed out','已取现'),option('unsure','Do not know','不清楚')]},
    ],
  },
  {
    id:'business', order:4, title:pair('1099 and business organization','1099与企业组织'), when:{question:'income',field:'sources',includesAny:['1099','business']},
    prompt:pair('When the business earns more, is there already a process for taxes, owner pay, and retirement saving?','业务收入增加时，税款、业主薪酬和退休储蓄是否已有明确流程？'),
    fields:[
      {id:'stage',type:'single',options:[option('occasional','Occasional','偶尔发生'),option('ongoing','Ongoing','持续经营'),option('growing','Growing','正在增长')]},
      {id:'separated',type:'single',options:[option('yes','Business and personal finances separated','企业与个人财务已分开'),option('partly','Partly','部分分开'),option('no','No','没有'),option('unsure','Not sure','不确定')]},
      {id:'tracked',type:'single',options:[option('yes','Income and expenses tracked','收入与费用有记录'),option('partly','Partly','部分记录'),option('no','No','没有'),option('unsure','Not sure','不确定')]},
      {id:'estimatedTaxes',type:'single',options:[option('yes','Estimated taxes addressed','已安排预估税'),option('partly','Partly','部分安排'),option('no','No','没有'),option('unsure','Not sure','不确定')]},
      {id:'entity',type:'single',options:[option('sole_prop','Sole proprietor','独资经营'),option('llc','LLC','LLC'),option('s_corp','S corporation','S Corporation'),option('partnership','Partnership','Partnership'),option('corporation','Corporation','Corporation'),option('unsure','Not sure','不确定')]},
      {id:'payroll',type:'single',options:[option('yes','Payroll in place','已有Payroll'),option('no','No payroll','没有Payroll'),option('na','Not applicable or not yet','不适用或尚未需要'),option('unsure','Not sure','不确定')]},
      {id:'retirementPlan',type:'single',options:[option('yes','Business retirement plan','已有企业退休计划'),option('no','No business retirement plan','没有企业退休计划'),option('unsure','Not sure','不确定')]},
      {id:'employees',type:'single',options:[option('yes','Employees besides self or spouse','有本人或配偶以外的员工'),option('no','No','没有')]},
      {id:'profitProcess',type:'single',options:[option('yes','Yes','有'),option('somewhat','Somewhat','有一些'),option('no','No','没有')]},
    ],
  },
  {
    id:'liquidity', order:5, title:pair('Emergency liquidity','应急流动性'),
    prompt:pair('If primary earned income stopped, how long could liquid resources support core expenses?','如果主要劳动收入中断，现有流动资源可以维持多久的核心支出？'),
    fields:[{id:'runway',type:'single',options:[option('under_1','Less than 1 month','少于1个月'),option('1_3','1–3 months','1–3个月'),option('3_6','3–6 months','3–6个月'),option('6_12','6–12 months','6–12个月'),option('12_plus','More than 12 months','12个月以上'),option('unsure','Not sure','不确定')]}],
    note:pair('This is a planning indicator, not a universal financial rule.','这是规划指标，不是适用于所有人的硬性规则。'),
  },
  {
    id:'debt', order:6, title:pair('Debt and mortgage','债务与房贷'),
    prompt:pair('What debt exists, and does it interfere with saving?','目前有哪些债务？它们是否影响储蓄？'),
    fields:[
      {id:'types',type:'multi',options:[option('mortgage','Mortgage','房贷'),option('heloc','HELOC','HELOC'),option('credit_cards','Credit cards','信用卡'),option('student','Student loans','学生贷款'),option('auto','Auto loans','汽车贷款'),option('business','Business debt','企业债务'),option('rental','Rental or investment debt','出租或投资债务'),option('none','None','没有')]},
      {id:'interferes',type:'single',options:[option('yes','Difficult to manage or interferes with saving','难以管理或影响储蓄'),option('sometimes','Sometimes','有时'),option('no','No','没有'),option('unsure','Not sure','不确定')]},
    ],
  },
  {
    id:'retirement', order:7, title:pair('Retirement direction','退休方向'),
    prompt:pair('How clear and coordinated is the current retirement direction?','目前的退休方向有多清晰、协调？'),
    fields:[
      {id:'direction',type:'single',options:[option('clear','Clear plan and consistent saving','计划清晰并持续储蓄'),option('saving_unsure','Saving but unsure whether enough','正在储蓄但不确定是否足够'),option('uncoordinated','Multiple accounts without a coordinated plan','多个账户但没有协调规划'),option('not_started','Not really started','尚未真正开始'),option('unsure','Not sure','不确定')]},
      {id:'accounts',type:'multi',options:[option('401k','401(k)','401(k)'),option('403b','403(b)','403(b)'),option('traditional_ira','Traditional IRA','Traditional IRA'),option('roth_ira','Roth IRA','Roth IRA'),option('sep_ira','SEP IRA','SEP IRA'),option('simple_ira','SIMPLE IRA','SIMPLE IRA'),option('solo_401k','Solo 401(k)','Solo 401(k)'),option('pension','Pension','养老金'),option('other','Other','其他'),option('none','None','没有')]},
      {id:'jobs',type:'multi',options:[option('GROW','Long-term growth','长期增长'),option('KEEP','Current tax management','当前税务管理'),option('ACCESS','Future access or liquidity','未来可用性或流动性'),option('PROTECT','Family protection','家庭保障'),option('INCOME','Future retirement income','未来退休收入'),option('LEGACY','Leave assets to family','留给家人'),option('SIMPLICITY','Minimize active management','减少主动管理'),option('unsure','Not sure','不确定')]},
    ],
  },
  {
    id:'education', order:8, title:pair('Education and future opportunity','教育与未来机会'), when:{question:'household',field:'childrenStatus',includesAny:['dependent','future']},
    prompt:pair('What future opportunities might this capital need to support?','这笔资金未来可能需要支持哪些机会？'),
    fields:[
      {id:'goals',type:'multi',options:[option('college','College','大学'),option('graduate','Graduate school','研究生教育'),option('first_home','First home','第一套住房'),option('business','Starting a business','创业'),option('general','General future opportunity','其他未来机会'),option('unsure','Not sure','不确定')]},
      {id:'savingStatus',type:'single',options:[option('consistent','Saving consistently','持续储蓄'),option('irregular','Saving irregularly','不定期储蓄'),option('not_started','Not yet','尚未开始'),option('vehicle_unsure','Not sure what vehicle to use','不确定使用什么工具')]},
      {id:'vehicles',type:'multi',when:{field:'savingStatus',includesAny:['consistent','irregular']},options:[option('529','529','529'),option('cash_cd','Cash or CD','现金或CD'),option('brokerage','Taxable brokerage','应税投资账户'),option('utma_ugma','UTMA or UGMA','UTMA或UGMA'),option('permanent_life','Permanent life insurance','永久寿险'),option('other','Other','其他'),option('unsure','Not sure','不确定')]},
      {id:'desiredJobs',type:'multi',options:[option('education_only','Education only','仅用于教育'),option('education_plus','Education and other opportunities','教育及其他机会'),option('parent_access','Remain accessible to parents','父母仍可灵活使用'),option('other_goals','Support other future goals','支持其他未来目标'),option('protection','Family protection also matters','也需要家庭保障'),option('unsure','Not sure','不确定')]},
      {id:'flexibility',type:'single',options:[option('very','Very important','非常重要'),option('somewhat','Somewhat important','比较重要'),option('not','Not important','不重要'),option('never_considered','Never considered this','从未考虑')]},
      {id:'aidAwareness',type:'single',options:[option('yes','Yes','了解'),option('somewhat','Somewhat','了解一些'),option('no','No','不了解'),option('assumed_same','Assumed everything counted the same','以为所有资产处理相同')]},
    ],
  },
  {
    id:'protection', order:9, title:pair('Protection','保障'),
    prompt:pair('If a primary earner died or could no longer earn, which goals would be difficult to continue?','如果主要收入者去世或无法继续工作，哪些目标会难以维持？'),
    fields:[
      {id:'goalsAtRisk',type:'multi',options:[option('mortgage','Mortgage','房贷'),option('living','Living expenses','生活支出'),option('education','Education','教育'),option('retirement','Retirement saving','退休储蓄'),option('business','Business obligations','企业责任'),option('care','Care for family','家庭照护'),option('none','None or adequately covered','没有或已有充分安排'),option('unsure','Not sure','不确定')]},
      {id:'coverage',type:'multi',options:[option('employer_life','Employer life','雇主寿险'),option('term_life','Individual term life','个人定期寿险'),option('permanent_life','Permanent life insurance','永久寿险'),option('disability','Disability coverage','伤残收入保障'),option('business','Business coverage','企业保障'),option('none','None','没有'),option('unsure','Not sure','不确定')]},
      {id:'lastReview',type:'single',options:[option('under_2','Within 2 years','两年内'),option('2_5','2–5 years','2–5年'),option('over_5','More than 5 years','超过5年'),option('never','Never','从未'),option('unsure','Not sure','不确定')]},
    ],
  },
  {
    id:'property', order:10, title:pair('Property and rental decisions','房产与出租物业'),
    prompt:pair('What property is owned, and is a rental decision approaching?','目前拥有哪些房产？是否正在考虑出租物业相关决定？'),
    fields:[
      {id:'ownership',type:'multi',options:[option('home','Primary home','自住房'),option('rental','Rental property','出租房'),option('multiple_rentals','Multiple rentals','多套出租房'),option('none','None','没有')]},
      {id:'rentalChange',type:'single',when:{field:'ownership',includesAny:['rental','multiple_rentals']},options:[option('yes','Selling, refinancing, or major change within 24 months','24个月内可能出售、再融资或重大调整'),option('maybe','Maybe','可能'),option('no','No','没有')]},
    ],
  },
  {
    id:'estate', order:11, title:pair('Family and estate basics','家庭与遗产基础'),
    prompt:pair('Which foundational documents and designations are reasonably current?','哪些基础文件和指定目前大致有效？'),
    fields:[{id:'current',type:'multi',options:[option('will','Will','遗嘱'),option('beneficiaries','Beneficiary designations','受益人指定'),option('poa','Power of attorney','授权委托书'),option('healthcare','Healthcare directive','医疗指示'),option('guardian','Guardian planning where relevant','适用时的监护安排'),option('trust','Trust where applicable','适用时的信托'),option('none','None','没有'),option('unsure','Not sure','不确定')]}],
    note:pair('This routes education and possible legal review; it does not provide legal advice.','本项仅用于教育与必要时的法律审核提示，不构成法律意见。'),
  },
  {
    id:'priorities', order:12, title:pair('Taxes, changes, and your priority','税务、变化与你的重点'),
    prompt:pair('What has changed, and what would matter most to improve in the next 12 months?','最近发生了什么变化？未来12个月最希望改善什么？'),
    fields:[
      {id:'taxExperience',type:'single',options:[option('organized','Predictable and organized','可预期且有条理'),option('surprised','Surprised at tax time','报税时常有意外'),option('high_unclear','Feels high; opportunities unclear','感觉税负高但机会不清楚'),option('mixed_complex','W-2 plus 1099 or business feels complicated','W-2加1099或企业收入较复杂'),option('transaction','Major transaction may happen soon','可能即将发生重大交易'),option('unsure','Not sure','不确定')]},
      {id:'events',type:'multi',options:[option('new_job','New job','新工作'),option('leaving_job','Leaving a job','离职'),option('income_change','Income increase or decrease','收入变化'),option('side_business','Side business','副业'),option('business_profit','Business becoming profitable','企业开始盈利'),option('hiring','Hiring employees','招聘员工'),option('new_baby','New baby','新宝宝'),option('home_purchase','Home purchase','购房'),option('rental_sale','Rental sale','出售出租房'),option('college','Child approaching college','孩子临近大学'),option('marriage_divorce','Marriage or divorce','结婚或离婚'),option('retirement','Retirement approaching','临近退休'),option('gift_inheritance','Inheritance or gift','继承或赠与'),option('none','None','没有')]},
      {id:'clientPriority',type:'single',options:[option('keep','Keep more of what we earn','更好地留住收入'),option('retirement','Build retirement intentionally','更有计划地准备退休'),option('future','Prepare for future opportunities','为未来机会做准备'),option('protect','Protect the family','保障家庭'),option('debt','Reduce debt','减少债务'),option('business','Organize or grow a business','组织或发展企业'),option('flexibility','Create more flexibility','增加灵活性'),option('understand','Understand where we stand','了解目前状况'),option('unsure','Not sure','不确定')]},
    ],
  },
]

const valueMatches = (value, condition) => {
  if ('equals' in condition) return value === condition.equals
  if ('includes' in condition) return Array.isArray(value) && value.includes(condition.includes)
  if ('includesAny' in condition) return Array.isArray(value) && condition.includesAny.some((item) => value.includes(item))
  return true
}

export function conditionMatches(condition, answers = {}, localAnswer = {}) {
  if (!condition) return true
  const source = condition.question ? answers[condition.question] || {} : localAnswer
  return valueMatches(source[condition.field], condition)
}

export function getVisibleReviewQuestions(answers = {}) {
  return familyCapitalReviewQuestions.filter((question) => conditionMatches(question.when, answers))
}

export function getVisibleReviewFields(question, answers = {}) {
  const localAnswer = answers[question.id] || {}
  return question.fields.filter((field) => conditionMatches(field.when, answers, localAnswer))
}
