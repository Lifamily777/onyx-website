export const REVERSIBILITY = Object.freeze({
  EASY: 'easy-to-revisit',
  SENSITIVE: 'planning-sensitive',
  HARDER: 'harder-to-reverse',
})

const required = (value, label) => {
  if (!value) throw new Error(`Decision Intelligence requires ${label}`)
  return value
}

export function defineEventNode(data) {
  required(data.id, 'EventNode.id')
  required(data.title?.en && data.title?.zh, 'bilingual EventNode.title')
  return Object.freeze({ type:'EventNode', planningWindows:[], connections:[], ...data })
}

export function defineDecisionNode(data) {
  for (const key of ['id','eventId','title','question','whatPeopleUsuallyDo','whatTheyMayNotRealize','whatItConnectsTo','moneyLens','decisionTrap','planningWindow','actionBefore','actionAfter','futureFlexibilityImpact','choices','tradeoffs','beforeYouAct','informationToGather','knowledgeLinks','officialSources','reviewTrigger','sammiReviewContext','reversibility']) required(data[key], `DecisionNode.${key}`)
  if (!Object.values(REVERSIBILITY).includes(data.reversibility)) throw new Error('DecisionNode.reversibility is invalid')
  return Object.freeze({ type:'DecisionNode', ...data })
}

export function defineKnowledgeNode(data) {
  required(data.id, 'KnowledgeNode.id')
  return Object.freeze({ type:'KnowledgeNode', ...data })
}

const typed = (type, data) => Object.freeze({ type, ...data })
export const definePlanningWindow = data => typed('PlanningWindow', data)
export const defineDecisionTrap = data => typed('DecisionTrap', data)
export const defineFutureFlexibilityImpact = data => typed('FutureFlexibilityImpact', data)
export const defineBeforeYouAct = data => typed('BeforeYouAct', data)
export const defineOfficialSource = data => typed('OfficialSource', data)
export const defineReviewTrigger = data => typed('ReviewTrigger', data)

export const localizeDecision = (value, locale) => value?.[locale === 'zh' ? 'zh' : 'en'] ?? value?.en ?? value
