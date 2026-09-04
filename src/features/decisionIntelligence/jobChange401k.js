import { defineDecisionNode, defineEventNode, defineKnowledgeNode, REVERSIBILITY } from './model.js'

const pair = (en, zh) => ({ en, zh })

export const JOB_CHANGE_EVENT = defineEventNode({
  id:'job-change', title:pair('I changed jobs','我换工作了'),
  summary:pair('A job change can open several financial-planning windows.','换工作以后，有几项财务安排值得及时看一遍。'),
  planningWindows:[
    pair('Old retirement money','原公司的退休账户'), pair('New employer benefits','新公司的员工福利'),
    pair('Withholding and compensation','预扣税与薪酬'), pair('Insurance transition','保险衔接'), pair('HSA considerations, where relevant','适用情况下的 HSA 安排'),
  ],
})

export const ROLLOVER_KNOWLEDGE = [
  defineKnowledgeNode({id:'pro-rata',title:pair('What is the pro-rata rule?','什么是 pro-rata rule？'),body:pair('When a person has both after-tax basis and pre-tax amounts in the Traditional IRA system, a distribution or Roth conversion may involve both. Form 8606 is used in relevant situations to track and report IRA basis and related transactions. Personal treatment depends on the facts and tax year.','如果一个人的 Traditional IRA 体系中既有税后 basis，也有税前资金，之后的分配或 Roth conversion 可能同时涉及两部分。符合相关情形时，Form 8606 用于追踪和申报 IRA basis 及相关交易。具体处理取决于个人事实和对应税务年度。')}),
  defineKnowledgeNode({id:'form-8606',title:pair('Why can Form 8606 matter?','为什么 Form 8606 可能很重要？'),body:pair('Form 8606 can report nondeductible Traditional IRA contributions, certain IRA distributions, and conversions from Traditional, SEP, or SIMPLE IRAs to Roth IRAs. This page does not determine whether or how you should file it.','Form 8606 可用于申报不可抵扣的 Traditional IRA contribution、某些 IRA distribution，以及从 Traditional、SEP 或 SIMPLE IRA 到 Roth IRA 的 conversion。本页不判断你是否需要填写，也不计算应如何填写。')}),
  defineKnowledgeNode({id:'backdoor-roth',title:pair('What is a Backdoor Roth?','什么是 Backdoor Roth？'),body:pair('“Backdoor Roth” is an informal planning term, not an account type. It commonly refers to making a nondeductible Traditional IRA contribution and then considering a Roth conversion. Eligibility, reporting, existing IRA balances, timing, and other facts require review.','“Backdoor Roth”是常见的规划说法，并不是一种账户类型。它通常指先向 Traditional IRA 作不可抵扣 contribution，再考虑 Roth conversion。资格、申报、现有 IRA 余额、时间和其他事实都需要核对。')}),
  defineKnowledgeNode({id:'interacting-accounts',title:pair('Which accounts may connect?','哪些账户可能有关联？'),body:pair('Traditional IRAs generally include traditional SEP and SIMPLE IRAs for Form 8606 purposes unless the instructions say otherwise. A 401(k) is an employer qualified plan—not automatically an IRA balance in that calculation. Moving pre-tax plan money into a Rollover IRA can therefore change the IRA structure being reviewed later.','按照 Form 8606 的定义，除非说明另有规定，Traditional IRA 通常包括传统 SEP IRA 和 SIMPLE IRA。401(k) 是雇主 qualified plan，并不会自动作为 IRA 余额进入该项计算。但如果把税前计划资金转入 Rollover IRA，之后需要审视的 IRA 结构可能会改变。')}),
]

export const OLD_401K_DECISION = defineDecisionNode({
  id:'job-change-old-401k', eventId:'job-change',
  title:pair('Job Change → Old 401(k)','换工作以后，旧 401(k) 怎么处理？'),
  question:pair('What should I do with my old 401(k)?','旧公司的 401(k)，下一步该怎么安排？'),
  whatPeopleUsuallyDo:pair('Consolidating everything into one IRA can sound convenient.','把账户都放进一个 IRA，听起来最省事。'),
  whatTheyMayNotRealize:pair('Where pre-tax money lands today may change the IRA structure involved in a future Roth-planning review.','今天把税前资金放在哪里，可能会改变以后做 Roth 规划时需要一起考虑的 IRA 结构。'),
  whatItConnectsTo:['old-plan rules','new-plan rules','IRA structure','Roth planning','tax reporting','investment and fee review'],
  moneyLens:['BUILD','OPTIONALITY'],
  decisionTrap:pair('Convenience can hide a future connection. A rollover may be reasonable, but the destination should not be chosen before the wider account structure is understood.','方便不等于已经把问题想完整。Rollover 可能是合理选择，但在了解其他退休账户和未来规划之前，不宜只因为省事就决定资金去向。'),
  planningWindow:{title:pair('Planning window','规划窗口'),body:pair('Review the available destinations, plan documents, account types, tax character, timing, fees, services, protections, and future strategy before initiating a movement. Options depend on the plans and personal facts.','开始转移前，先核对可选去向、计划文件、账户类型、资金的税务属性、时间、费用、服务、相关保护以及未来规划。实际选项取决于计划规则和个人情况。')},
  actionBefore:pair('Pause, gather the account structure, and confirm what each plan permits.','先暂停操作，把账户结构列清楚，并确认两个计划各自允许什么。'),
  actionAfter:pair('Keep confirmations and tax documents, then update the household retirement map.','完成后保存确认文件和税务资料，并更新家庭退休账户清单。'),
  futureFlexibilityImpact:{today:pair('Where should the old 401(k) go?','旧 401(k) 应该转到哪里？'),future:pair('IRA balances → pro-rata considerations → future Backdoor Roth / conversion planning','IRA 余额 → pro-rata considerations → 未来的 Backdoor Roth / conversion 规划'),message:pair('A decision can be reasonable today and still affect choices available tomorrow.','今天看起来合理的决定，仍可能影响明天可以选择的路径。')},
  choices:[
    pair('Leave it in the former employer plan, if permitted','如果原计划允许，可以继续留在原公司的计划中'),
    pair('Consider the new employer plan, if it accepts the rollover','如果新计划接受转入，可以考虑新公司的计划'),
    pair('Consider a Traditional/Rollover IRA','考虑转入 Traditional IRA / Rollover IRA'),
    pair('Review other applicable distribution or conversion paths','了解其他适用的 distribution 或 conversion 路径'),
  ],
  tradeoffs:[
    pair('Plan availability, investment menu, fees, services, creditor protections, withdrawal rules, and account consolidation can differ.','计划是否允许、投资选项、费用、服务、资产保护、提款规则以及账户是否集中管理，都可能不同。'),
    pair('A Traditional/Rollover IRA may simplify account access but can change pre-tax balances held inside the IRA system.','Traditional IRA / Rollover IRA 可能更方便管理，但也会改变 IRA 体系中的税前余额。'),
    pair('Distribution or Roth-conversion paths may produce different tax consequences.','直接领取或进行 Roth conversion，可能产生不同的税务后果。'),
  ],
  beforeYouAct:{considering:pair('Moving an old 401(k)','转移旧 401(k)'),connectsTo:[pair('Traditional/Rollover IRA','Traditional IRA / Rollover IRA'),pair('Pro-rata rule','Pro-rata rule'),pair('Roth planning','Roth 规划'),pair('New employer plan options','新雇主计划的可选安排')]},
  informationToGather:[pair('Old 401(k) statement','旧 401(k) statement'),pair('New employer plan information','新雇主计划资料'),pair('Existing Traditional IRA balances','现有 Traditional IRA 余额'),pair('Existing SEP IRA balances, if applicable','适用情况下的 SEP IRA 余额'),pair('Existing SIMPLE IRA balances, if applicable','适用情况下的 SIMPLE IRA 余额'),pair('Current Roth-planning goals','目前的 Roth 规划目标')],
  knowledgeLinks:ROLLOVER_KNOWLEDGE.map(item=>item.id),
  officialSources:[
    {label:'IRS · Termination of employment',url:'https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-termination-of-employment'},
    {label:'IRS · Rollovers of retirement plan and IRA distributions',url:'https://www.irs.gov/retirement-plans/plan-participant-employee/rollovers-of-retirement-plan-and-ira-distributions'},
    {label:'IRS · Instructions for Form 8606',url:'https://www.irs.gov/instructions/i8606'},
    {label:'IRS · About Form 8606',url:'https://www.irs.gov/forms-pubs/about-form-8606'},
  ],
  reviewTrigger:pair('Your available destinations, IRA basis, existing Traditional/SEP/SIMPLE IRA balances, plan rules, income, timing, or Roth goals need to be applied together.','需要把可选去向、IRA basis、现有 Traditional/SEP/SIMPLE IRA 余额、计划规则、收入、时间和 Roth 目标放在一起判断。'),
  sammiReviewContext:{
    exploring:pair('Job change + old 401(k)','换工作 + 旧 401(k)'), hidden:pair('IRA rollover + future Roth planning','IRA rollover + 未来 Roth 规划'),
    gather:pair('old plan statement; existing IRA structure; new employer plan information','旧计划 statement；现有 IRA 结构；新雇主计划资料'),
    questions:pair('What destinations are actually available? What does each choice preserve or change? What should be understood before initiating the rollover?','实际有哪些可选去向？每种选择会保留或改变什么？开始 rollover 前还要弄清哪些问题？'),
  },
  reversibility:REVERSIBILITY.SENSITIVE,
})

export const DECISION_INTELLIGENCE_LIBRARY = [
  'Job change → 401(k) rollover → pro-rata awareness','W-2 → side business → 1099 / estimated tax / retirement','Business growth → S Corp / payroll / retirement','Add business partner → ownership / tax / control / exit','Sell rental → basis / depreciation / tax / 1031 timing awareness','New baby → protection / compounding / education funding','College approaching → education funding / retirement interaction','Extra cash → liquidity / debt / tax reserve / investment','Insurance purchase → economic-risk analysis before product','Retirement transition → income / tax / longevity interactions',
]
