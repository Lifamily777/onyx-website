import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import {
  LIFE_CAPITAL_STAGES, CAPITAL_DOMAINS, WELLNESS_STAGE_NODES, WEALTH_HERO_NODES, LIFE_EVENTS,
  calculateEmergencyLiquidity, calculateDebtPaths, calculateMonthlySurplus, summarizeLargeExpenses,
  calculateConcentration, calculateForcedSale, compareNextDollar, getWealthNode, getLifeEvent,
  calculateIncomeContinuity, calculateOptionalityRunway,
} from '../index.js'

test('master architecture has six ordered stages and both domains', () => {
  assert.equal(LIFE_CAPITAL_STAGES.length, 6)
  assert.deepEqual(LIFE_CAPITAL_STAGES.map((stage) => stage.order), [1,2,3,4,5,6])
  assert.deepEqual(CAPITAL_DOMAINS.map((domain) => domain.id), ['wealth','wellness'])
  assert.equal(WELLNESS_STAGE_NODES.length, 6)
})

test('all explicitly specified hero nodes and 10 events meet the bilingual quality gate', () => {
  assert.ok(WEALTH_HERO_NODES.length >= 12)
  assert.deepEqual(WEALTH_HERO_NODES.map((node) => node.id), ['W1','W2','W8','W9','W10','W11','W12','W13','W18','W19','W24','W25','W30','W31'])
  assert.equal(LIFE_EVENTS.length, 10)
  for (const node of WEALTH_HERO_NODES) {
    assert.ok(node.title && node.titleZh && node.story.body && node.story.bodyZh)
    assert.ok(node.explain.body && node.explain.bodyZh && node.selfManage.body && node.selfManage.bodyZh)
    assert.ok(node.deeperReview.body && node.deeperReview.bodyZh && node.deeperReview.triggers.length)
    assert.ok(node.askSammiContext)
    assert.ok(node.commercialRelevance)
  }
  for (const event of LIFE_EVENTS) {
    assert.ok(event.title && event.titleZh && event.description && event.descriptionZh)
    assert.ok(event.whyItMatters.body && event.whyItMatters.bodyZh)
    assert.ok(event.planningWindow.body && event.planningWindow.bodyZh)
    assert.ok(event.taxTopics.length && event.recordsNeeded.length && event.questionsWorthAsking.length)
    assert.ok(event.askSammiContext)
  }
})

test('generic lookups support the node and event renderers', () => {
  assert.equal(getWealthNode('w1').id, 'W1')
  assert.equal(getLifeEvent('sell-rental-property').category, 'real_estate')
})

test('W1 emergency liquidity calculation', () => {
  assert.deepEqual(calculateEmergencyLiquidity({ expenses:{housing:2000,food:700,other:300},currentReserve:18000 }), { monthlyCoreExpense:3000,sixMonthReserve:18000,reserveMonths:6 })
})

test('W2 returns three transparent debt paths without a universal winner', () => {
  const result = calculateDebtPaths({ debtBalance:10000,apr:22,minimumPayment:250,monthlySurplus:600,liquidReserve:1000 })
  assert.deepEqual(result.paths.map((path)=>path.id), ['payoff','reserve','hybrid'])
  assert.ok(result.paths.every((path)=>!('winner' in path)))
})

test('W8 monthly surplus and five-year deployable capital', () => {
  assert.deepEqual(calculateMonthlySurplus({cashInflow:10000,coreExpenses:5000,requiredDebt:1000,necessaryInsurance:500,taxReserve:1000,essentialCommitments:500}), {monthlySurplus:2000,annualSurplus:24000,fiveYearDeployableCapital:120000})
})

test('W9 planner summarizes known expenses', () => {
  assert.deepEqual(summarizeLargeExpenses([{amount:8000,funded:true},{amount:12000,funded:false}]), {total:20000,funded:8000,fundingGap:12000,count:2})
})

test('W10 supports multi-select options and four Phase 1 paths', () => {
  const node = getWealthNode('W10')
  for (const option of ['1099 / freelance','Partnership / LLC K-1','S corporation K-1','Rental property']) assert.ok(node.ask.options.includes(option))
})

test('concentration and forced-sale calculations use visible assumptions', () => {
  assert.deepEqual(calculateConcentration({largestExposure:600000,productiveAssets:1000000}), {ratio:.6,percentage:60,band:'very_high'})
  const stress = calculateForcedSale({monthlyCoreExpenses:5000,liquidReserve:15000,incomeInterruptionMonths:6,investmentBalance:200000,marketDeclinePercent:30})
  assert.equal(stress.saleMayBeginMonth, 4)
  assert.equal(stress.remainingAssetsAfterGap, 125000)
})

test('Next Dollar compares jobs without declaring a best answer', () => {
  const result = compareNextDollar({reserveMonths:2,debtApr:18,knownExpenseGap:5000,taxReserveNeed:3000,longTermInvesting:false})
  assert.equal(result.length, 6)
  assert.ok(result.every((item)=>!('best' in item)&&!('winner' in item)))
})

test('income continuity and optionality tools remain educational calculations', () => {
  assert.deepEqual(calculateIncomeContinuity({annualCoreExpenses:60000,debtObligations:100000,supportYears:2,liquidAssets:20000,existingCoverage:100000,reliableIncome:10000}), {illustratedNeed:220000,existingResources:140000,educationalGap:80000})
  assert.deepEqual(calculateOptionalityRunway({monthlyEssentials:5000,liquidReserve:30000,reliableMonthlyIncome:2000}), {monthlyGap:3000,runwayMonths:10})
})

test('Ask Sammi context exists and routes preserve assessment, survey, map, and NS shell', async () => {
  assert.match(getWealthNode('W13').askSammiContext,/income protection/i)
  assert.match(getLifeEvent('sell-rental-property').askSammiContext,/rental-property sale/i)
  const app = await readFile(new URL('../../../App.jsx', import.meta.url),'utf8')
  for (const route of ['path="survey"','path="capital-assessment"','path="capital-map"','path="ns-federation"']) assert.match(app,new RegExp(route))
})
