import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { HERO_JOURNEYS, calculateRunway, canAdvanceJourney, getHeroJourney, getNextJourneyStep, localized } from '../index.js'
import { getLifeEvent, getWealthNode } from '../../lifeCapitalMap/index.js'

test('three Hero Journeys satisfy the reusable bilingual schema', () => {
  assert.deepEqual(HERO_JOURNEYS.map((item)=>item.id), ['emergency-liquidity','sell-rental-property','work-optionality'])
  for (const journey of HERO_JOURNEYS) {
    for (const field of ['title','subtitle','openingQuestion','story','judgmentQuestion','capitalConclusion','principle','selfManageGuidance','deeperReviewGuidance']) {
      assert.ok(journey[field].en && journey[field].zh, `${journey.id}.${field}`)
    }
    assert.ok(journey.openingChoices.length >= 4)
    assert.ok(journey.judgmentChoices.length >= 4)
    assert.ok(journey.consequencePaths.length >= 1)
    for (const option of journey.judgmentChoices) assert.ok(journey.judgmentFeedback[option.id]?.en && journey.judgmentFeedback[option.id]?.zh)
    for (const nodeId of journey.relatedNodes) assert.ok(getWealthNode(nodeId), `${journey.id} references ${nodeId}`)
    for (const eventId of journey.relatedEvents) assert.ok(getLifeEvent(eventId), `${journey.id} references ${eventId}`)
  }
  assert.equal(localized(getHeroJourney('work-optionality').principle,'zh'),'说“不”的能力，也是一种资本。')
})

test('journey progression requires opening and judgment choices without scoring', () => {
  assert.equal(canAdvanceJourney(0,{openingChoice:'',judgmentChoice:''}),false)
  assert.equal(getNextJourneyStep(0,{openingChoice:'',judgmentChoice:''}),0)
  assert.equal(getNextJourneyStep(0,{openingChoice:'1-3',judgmentChoice:''}),1)
  assert.equal(getNextJourneyStep(2,{openingChoice:'1-3',judgmentChoice:''}),2)
  assert.equal(getNextJourneyStep(2,{openingChoice:'1-3',judgmentChoice:'liquidity'}),3)
  assert.ok(HERO_JOURNEYS.every((item)=>!('score' in item)&&!('correctAnswer' in item)))
})

test('runway tool handles empty, invalid, and valid inputs transparently', () => {
  assert.deepEqual(calculateRunway({monthlyExpense:'',liquidReserve:'',knownExpenses:''}).valid,false)
  assert.deepEqual(calculateRunway({monthlyExpense:-1,liquidReserve:1000,knownExpenses:0}).valid,false)
  assert.deepEqual(calculateRunway({monthlyExpense:5000,liquidReserve:35000,knownExpenses:5000}),{valid:true,availableReserve:30000,runwayMonths:6,benchmarkMonths:6})
})

test('routes and renderer expose locale-aware Journey progression and non-persistence', async () => {
  const app=await readFile(new URL('../../../App.jsx',import.meta.url),'utf8')
  const page=await readFile(new URL('../../../components/JourneyScenarioPage.jsx',import.meta.url),'utf8')
  for (const route of ['path="capital-map/journey"','path="capital-map/journey/:id"']) assert.match(app,new RegExp(route))
  assert.match(page,/Inputs stay on this page only and are not saved or submitted/)
  assert.match(page,/role="radiogroup"/)
  assert.match(page,/aria-checked/)
  assert.doesNotMatch(page,/localStorage|sessionStorage/)
})
