import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { FOUNDATION_QUESTIONS, FOUNDATION_SECTIONS, calculateFoundationResult } from '../index.js'

test('Foundation V2 has 18 coherent bilingual questions across six sections', () => {
  assert.equal(FOUNDATION_QUESTIONS.length,18)
  assert.deepEqual(FOUNDATION_QUESTIONS.map((question)=>question.id),Array.from({length:18},(_,index)=>`F${index+1}`))
  assert.deepEqual([...new Set(FOUNDATION_QUESTIONS.map((question)=>question.section))],FOUNDATION_SECTIONS.map((section)=>section.id))
  for(const question of FOUNDATION_QUESTIONS){assert.ok(question.question&&question.questionZh&&question.insight&&question.insightZh);assert.ok(question.options.length>=3);assert.ok(question.options.every((item)=>item.text&&item.textZh))}
})

test('Foundation V2 uses multi-select for income, events, and long-term horizons', () => {
  assert.deepEqual(FOUNDATION_QUESTIONS.filter((question)=>question.type==='multi').map((question)=>question.id),['F5','F14','F16'])
  assert.ok(FOUNDATION_QUESTIONS.find((question)=>question.id==='F14').options.some((item)=>item.id==='none'))
})

test('Foundation result is deterministic, non-numeric, and routes weak foundations to nodes', () => {
  const answers={F1:'under_1',F2:'yes',F3:'negative',F4:'yes',F5:['partnership_k1'],F6:'no',F7:'no',F8:'severe',F9:'no',F10:'high',F11:'60_plus',F12:'no',F13:'no',F14:['sell-rental-property'],F15:'low',F16:['retirement_income','work_flexibility'],F17:'high',F18:'none'}
  const first=calculateFoundationResult(answers),second=calculateFoundationResult(answers)
  assert.deepEqual(first,second)
  assert.equal(first.currentCapitalPosition.stage,'survival')
  assert.ok(first.suggestedNodes.some((node)=>node.id==='W1'))
  assert.ok(first.suggestedNodes.some((node)=>node.id==='W30'))
  assert.deepEqual(first.eventRadarSignals.events,['sell-rental-property'])
  assert.ok(!('score' in first)&&!('percentage' in first))
})

test('none known today remains an explicit event state, not a promise', () => {
  const result=calculateFoundationResult({F14:['none']})
  assert.equal(result.eventRadarSignals.noneKnown,true)
  assert.deepEqual(result.eventRadarSignals.events,[])
})

test('Foundation V2 route is parallel to recoverable V1 and survey', async () => {
  const app=await readFile(new URL('../../../App.jsx',import.meta.url),'utf8')
  for(const route of ['path="foundation"','path="capital-assessment"','path="survey"'])assert.match(app,new RegExp(route))
})
