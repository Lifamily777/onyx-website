import test from 'node:test'
import assert from 'node:assert/strict'
import {
  familyCapitalReviewQuestions,
  getVisibleReviewQuestions,
  getVisibleReviewFields,
  calculateFamilyCapitalReview,
} from '../index.js'

const organizedBusiness = {
  stage:'ongoing',separated:'yes',tracked:'yes',estimatedTaxes:'yes',entity:'llc',payroll:'na',retirementPlan:'no',employees:'no',profitProcess:'yes',
}

const stable = () => ({
  household:{relationship:'partnered',childrenStatus:['none'],otherDependents:'no'},
  income:{sources:['w2'],range:'100_200k'},
  w2:{employerPlan:'yes',match:'yes',fullMatch:'yes',contributionType:['traditional'],hsa:'no',withholdingReviewed:'recent',recentJobChange:'no'},
  liquidity:{runway:'6_12'}, debt:{types:['mortgage'],interferes:'no'},
  retirement:{direction:'clear',accounts:['401k'],jobs:['GROW','INCOME']},
  protection:{goalsAtRisk:['none'],coverage:['term_life'],lastReview:'under_2'},
  property:{ownership:['home']}, estate:{current:['will','beneficiaries','poa']},
  priorities:{taxExperience:'organized',events:['none'],clientPriority:'understand'},
})

test('question tree has 12 ordered bilingual root questions', () => {
  assert.equal(familyCapitalReviewQuestions.length,12)
  assert.deepEqual(familyCapitalReviewQuestions.map((q)=>q.order),[1,2,3,4,5,6,7,8,9,10,11,12])
  assert.ok(familyCapitalReviewQuestions.every((q)=>q.title.en && q.title.zh && q.prompt.en && q.prompt.zh))
})

test('W-2 only household sees W-2 branch but not business or education branches', () => {
  const answers=stable()
  const ids=getVisibleReviewQuestions(answers).map((q)=>q.id)
  assert.ok(ids.includes('w2')); assert.ok(!ids.includes('business')); assert.ok(!ids.includes('education'))
})

test('W-2 stable household has no needs-attention foundation and no score', () => {
  const result=calculateFamilyCapitalReview(stable())
  assert.equal(result.actionMap.now.length,0)
  assert.equal('score' in result,false); assert.equal('overallScore' in result,false)
  assert.equal(result.foundationMap.cash.status,'green')
})

test('high-income W-2 household with no match gets allocation review, not skip-plan guidance', () => {
  const answers=stable(); answers.income.range='500k_plus'; answers.w2.match='no'; delete answers.w2.fullMatch
  const result=calculateFamilyCapitalReview(answers)
  const connection=result.knowledgeConnections.find((item)=>item.id==='no-employer-match')
  assert.equal(connection.kind,'allocation_review')
  assert.match(connection.reason.en,/does not mean the plan should be skipped/i)
  assert.notEqual(result.foundationMap.retirement.status,'red')
})

test('recent job change with rollover IRA connects to existing Decision Intelligence', () => {
  const answers=stable(); answers.w2.recentJobChange='yes'; answers.w2.oldPlanDestination='rollover_ira'
  const result=calculateFamilyCapitalReview(answers)
  assert.equal(result.knowledgeConnections.find((item)=>item.id==='job-change-old-plan').route,'/decisions/job-change-old-401k')
  const fields=getVisibleReviewFields(familyCapitalReviewQuestions.find((q)=>q.id==='w2'),answers).map((f)=>f.id)
  assert.ok(fields.includes('oldPlanDestination'))
})

test('W-2 plus 1099 activates both conditional branches', () => {
  const answers=stable(); answers.income.sources=['w2','1099']; answers.business=organizedBusiness
  const ids=getVisibleReviewQuestions(answers).map((q)=>q.id)
  assert.ok(ids.includes('w2')); assert.ok(ids.includes('business'))
})

test('growing business without tax and operating structure needs attention without recommending S corporation', () => {
  const answers=stable(); answers.income.sources=['business']; delete answers.w2
  answers.business={...organizedBusiness,stage:'growing',separated:'no',tracked:'no',estimatedTaxes:'no',profitProcess:'no'}
  const result=calculateFamilyCapitalReview(answers)
  assert.equal(result.foundationMap.business_payroll.status,'red')
  assert.match(result.foundationMap.business_payroll.whyFlagged.en,/does not imply that an S corporation is appropriate/i)
})

test('organized business is on track even without a business retirement plan', () => {
  const answers=stable(); answers.income.sources=['business']; delete answers.w2; answers.business=organizedBusiness
  const result=calculateFamilyCapitalReview(answers)
  assert.equal(result.foundationMap.business_payroll.status,'green')
})

test('young child with no education saving creates a planning window, not a product prescription', () => {
  const answers=stable(); answers.household.childrenStatus=['dependent']; answers.household.childAges=['under_6']
  answers.education={goals:['college'],savingStatus:'not_started',desiredJobs:['education_plus'],flexibility:'very',aidAwareness:'no'}
  const result=calculateFamilyCapitalReview(answers)
  assert.equal(result.foundationMap.education.status,'yellow')
  assert.match(result.foundationMap.education.whyFlagged.en,/does not imply that a 529 or any other product is required/i)
})

test('existing 529 with flexible goals is not automatically negative', () => {
  const answers=stable(); answers.household.childrenStatus=['dependent']; answers.household.childAges=['6_12']
  answers.education={goals:['college','general'],savingStatus:'consistent',vehicles:['529'],desiredJobs:['education_plus'],flexibility:'very',aidAwareness:'somewhat'}
  const result=calculateFamilyCapitalReview(answers)
  assert.equal(result.foundationMap.education.status,'green')
  assert.match(result.foundationMap.education.whyFlagged.en,/not treated as a mistake/i)
})

test('no 529, Roth IRA, annuity, IUL, or maxed 401(k) never creates product-based status', () => {
  const answers=stable(); answers.retirement.accounts=['401k']; answers.w2.fullMatch='no'
  const result=calculateFamilyCapitalReview(answers)
  assert.equal(result.foundationMap.retirement.status,'green')
  assert.equal(result.foundations.some((item)=>/IUL|annuity|max(ed)? 401|Roth IRA/i.test(item.whyFlagged.en)),false)
})

test('protection need comes from economic exposure and current resources', () => {
  const answers=stable(); answers.protection={goalsAtRisk:['mortgage','living'],coverage:['none'],lastReview:'never'}
  const result=calculateFamilyCapitalReview(answers)
  assert.equal(result.foundationMap.protection.status,'red')
  assert.match(result.foundationMap.protection.whyFlagged.en,/needs-analysis question, not a product recommendation/i)
})

test('rental sale creates a review-before-acting planning window', () => {
  const answers=stable(); answers.property={ownership:['rental'],rentalChange:'yes'}
  const result=calculateFamilyCapitalReview(answers)
  assert.equal(result.foundationMap.debt_property.status,'yellow')
  assert.ok(result.knowledgeConnections.some((item)=>item.route==='/capital-map/event/sell-rental-property'))
})

test('no children makes education not applicable rather than negative', () => {
  const result=calculateFamilyCapitalReview(stable())
  assert.equal(result.foundationMap.education.status,'gray')
  assert.match(result.foundationMap.education.whyFlagged.en,/Not applicable/i)
})

test('no business makes business foundation not applicable', () => {
  const result=calculateFamilyCapitalReview(stable())
  assert.equal(result.foundationMap.business_payroll.status,'gray')
  assert.match(result.foundationMap.business_payroll.whyFlagged.en,/Not applicable/i)
})

test('unknown information is gray, never a false red', () => {
  const result=calculateFamilyCapitalReview({liquidity:{runway:'unsure'},retirement:{direction:'unsure'},protection:{goalsAtRisk:['unsure'],coverage:['unsure'],lastReview:'unsure'},debt:{types:[],interferes:'unsure'},estate:{current:['unsure']}})
  assert.equal(result.foundations.some((item)=>item.status==='red'),false)
  assert.equal(result.foundationMap.cash.status,'gray'); assert.equal(result.foundationMap.protection.status,'gray')
})

test('debt that interferes with saving needs attention while a mortgage alone does not', () => {
  const answers=stable(); answers.debt={types:['mortgage','credit_cards'],interferes:'yes'}
  assert.equal(calculateFamilyCapitalReview(answers).foundationMap.debt_property.status,'red')
  answers.debt={types:['mortgage'],interferes:'no'}
  assert.equal(calculateFamilyCapitalReview(answers).foundationMap.debt_property.status,'green')
})

test('Capital Jobs derive explainable review states without scoring products', () => {
  const answers=stable(); answers.liquidity.runway='1_3'; answers.protection={goalsAtRisk:['living'],coverage:['none'],lastReview:'never'}
  const jobs=calculateFamilyCapitalReview(answers).capitalJobs.jobs
  assert.equal(jobs.find((job)=>job.id==='ACCESS').state,'needs_review')
  assert.equal(jobs.find((job)=>job.id==='PROTECT').state,'needs_review')
  assert.ok(jobs.every((job)=>Array.isArray(job.evidenceIds)))
})

test('client priority remains distinct from ONYX also noticed', () => {
  const answers=stable(); answers.priorities.clientPriority='retirement'; answers.protection={goalsAtRisk:['living'],coverage:['none'],lastReview:'never'}
  const result=calculateFamilyCapitalReview(answers)
  assert.equal(result.clientPriority.id,'retirement')
  assert.equal(result.onyxAlsoNoticed.foundationId,'protection')
})

test('result exposes no product recommendation or mechanical aggregate', () => {
  const result=calculateFamilyCapitalReview(stable())
  assert.equal('productRecommendation' in result,false)
  assert.equal('recommendedProduct' in result,false)
  assert.equal('average' in result,false)
  assert.ok(result.foundations.every((item)=>item.evidenceIds.length>0))
})

test('answers round-trip only in the in-memory result and input is not mutated', () => {
  const answers=stable(); const before=structuredClone(answers)
  const result=calculateFamilyCapitalReview(answers)
  assert.deepEqual(result.answers,before); assert.deepEqual(answers,before)
  assert.equal(JSON.stringify(result).includes('localStorage'),false)
})
