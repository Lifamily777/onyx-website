import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { KNOWLEDGE_GUIDES, calculateBusinessProfit, compareStartingAges, createGuideResult, getKnowledgeGuide } from '../index.js'

test('all four Hero Guides satisfy the bilingual seven-concept schema',()=>{
  assert.equal(KNOWLEDGE_GUIDES.length,4)
  assert.equal(new Set(KNOWLEDGE_GUIDES.map((guide)=>guide.id)).size,4)
  const required=['whatYouAsked','connections','overlookedQuestion','dollars','tradeoffs','beforeActing','nextMoves']
  for(const guide of KNOWLEDGE_GUIDES){
    assert.deepEqual(guide.sections,required)
    for(const key of ['title','entry','answer','story','signature','overlooked','flow','topics','tradeoffs','gather','nextMoves','cta']){assert.ok(guide[key]?.en);assert.ok(guide[key]?.zh)}
    assert.ok(guide.moneyLens.length>0);assert.equal(guide.score,undefined);assert.equal(guide.correctAnswer,undefined)
  }
})

test('business-profit lens is transparent and rejects invalid values',()=>{
  assert.deepEqual(calculateBusinessProfit(50000,12000),{revenue:50000,expenses:12000,profit:38000})
  assert.equal(calculateBusinessProfit('',-1),null)
})

test('cost-of-waiting calculator rewards more contribution time under equal assumptions',()=>{
  const rows=compareStartingAges(250,18,5)
  assert.equal(rows.length,3);assert.ok(rows[0].value>rows[1].value);assert.ok(rows[1].value>rows[2].value)
  assert.equal(rows[0].months,216);assert.equal(rows[2].months,96)
})

test('result objects are Phase 3-ready without raw answers or persistence',()=>{
  const guide=getKnowledgeGuide('second-income-engine');const result=createGuideResult(guide,['Withholding'])
  for(const key of ['guideId','exploredTopics','connectedTopics','planningWindow','missingInformation','nextMoves','moneyLens','relatedGuides','sammiReviewContext'])assert.ok(key in result)
  assert.equal(result.answers,undefined);assert.equal(result.score,undefined)
  const page=readFileSync(new URL('../../../components/KnowledgeGuidePage.jsx',import.meta.url),'utf8')
  assert.doesNotMatch(page,/localStorage|sessionStorage/)
})

test('guide routes, related navigation, and retained V1/V2 routes remain present',()=>{
  const app=readFileSync(new URL('../../../App.jsx',import.meta.url),'utf8')
  assert.match(app,/path="guides\/:guideId"/)
  for(const route of ['capital-map','foundation','survey','capital-assessment'])assert.match(app,new RegExp(`path="${route}"`))
  for(const guide of KNOWLEDGE_GUIDES)for(const related of guide.related)assert.ok(getKnowledgeGuide(related),`${guide.id} related guide ${related}`)
})
