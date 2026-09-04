import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { JOB_CHANGE_EVENT, OLD_401K_DECISION, ROLLOVER_KNOWLEDGE } from '../../decisionIntelligence/index.js'
import { localizeDecision } from '../../decisionIntelligence/model.js'

test('job-change event and old-401k decision are complete in EN and ZH', () => {
  assert.equal(JOB_CHANGE_EVENT.id, 'job-change')
  assert.equal(OLD_401K_DECISION.eventId, JOB_CHANGE_EVENT.id)
  for (const item of [JOB_CHANGE_EVENT.title,JOB_CHANGE_EVENT.summary,OLD_401K_DECISION.title,OLD_401K_DECISION.question,OLD_401K_DECISION.decisionTrap,OLD_401K_DECISION.reviewTrigger]) {
    assert.ok(localizeDecision(item,'en'))
    assert.ok(localizeDecision(item,'zh'))
  }
  assert.equal(OLD_401K_DECISION.choices.length, 4)
  assert.ok(JOB_CHANGE_EVENT.planningWindows.length >= 4)
})

test('decision model exposes map, flexibility, before-action and contextual handoff', () => {
  const d=OLD_401K_DECISION
  assert.deepEqual(d.moneyLens,['BUILD','OPTIONALITY'])
  assert.equal(d.reversibility,'planning-sensitive')
  assert.ok(d.futureFlexibilityImpact.today && d.futureFlexibilityImpact.future)
  assert.ok(d.beforeYouAct.connectsTo.length >= 4)
  assert.ok(d.informationToGather.length >= 6)
  assert.match(d.sammiReviewContext.hidden.en,/Roth/i)
  assert.ok(d.officialSources.every(source=>source.url.startsWith('https://www.irs.gov/')))
  assert.equal(ROLLOVER_KNOWLEDGE.length,4)
})

test('prototype avoids scoring, persistence and individualized recommendations', () => {
  const data=JSON.stringify(OLD_401K_DECISION)
  assert.doesNotMatch(data,/best for you|we recommend|guaranteed tax|tax savings/i)
  const page=readFileSync(new URL('../../../components/DecisionGuidePage.jsx',import.meta.url),'utf8')
  assert.match(page,/No branch is recommended/)
  assert.match(page,/does not determine the best destination/)
  assert.doesNotMatch(page,/localStorage|sessionStorage|fetch\(|score\s*[=:]/)
})

test('EN/ZH route and contextual entries preserve existing routes', () => {
  const app=readFileSync(new URL('../../../App.jsx',import.meta.url),'utf8')
  assert.match(app,/path="decisions\/job-change-old-401k"/)
  for (const route of ['survey','capital-assessment','capital-map','guides/:guideId']) assert.match(app,new RegExp(`path="${route.replace('/','\\/')}"`))
  const capitalMap=readFileSync(new URL('../../../components/CapitalMapPage.jsx',import.meta.url),'utf8')
  const knowledgePath=readFileSync(new URL('../../../components/KnowledgePathPage.jsx',import.meta.url),'utf8')
  assert.match(capitalMap,/DecisionEntryCard/)
  assert.match(knowledgePath,/build-for-tomorrow.*DecisionEntryCard/s)
})
