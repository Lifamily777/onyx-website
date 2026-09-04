import test from 'node:test'
import assert from 'node:assert/strict'
import { getReadingPosition, READING_STAGES } from '../navigation.js'
import { getWealthNode } from '../data/nodes.js'
import { getWellnessNode } from '../data/wellnessNodes.js'
import { withChineseWellnessCopy } from '../data/wellnessCopy.zh.js'

test('navigation follows locale-aware routes, not a personal financial assessment', () => {
  for (const prefix of ['', '/zh']) {
    const health = getReadingPosition(`${prefix}/capital-map/wellness/wl1`)
    assert.equal(health.stage, 'survival')
    assert.equal(health.domain, 'wellness')
    const money = getReadingPosition(`${prefix}/capital-map/node/w25`)
    assert.equal(money.stage, getWealthNode('W25').stage)
    assert.equal(money.domain, 'wealth')
    for (const path of ['/survey','/foundation','/capital-assessment']) {
      assert.equal(getReadingPosition(prefix + path).area, 'tools')
      assert.equal(getReadingPosition(prefix + path).stage, undefined)
    }
    const event = getReadingPosition(`${prefix}/capital-map/event/s-corporation-election`)
    assert.equal(event.area, 'events')
    assert.equal(event.stage, undefined)
  }
})

test('every ladder destination is an existing topic in the indicated domain and stage', () => {
  assert.equal(READING_STAGES.length, 6)
  for (const stage of READING_STAGES) {
    assert.equal(getWealthNode(stage.wealth.split('/').at(-1)).stage, stage.id)
    assert.equal(getWellnessNode(stage.wellness.split('/').at(-1)).stage, stage.id)
  }
  assert.equal(getReadingPosition('/guides/second-income-engine').area, 'learn')
  assert.equal(getReadingPosition('/insights/example').area, 'learn')
  assert.equal(getReadingPosition('/zh/').area, 'overview')
})

test('Chinese editorial overrides preserve English, clinical triggers and option identities', () => {
  const original = { id:'WL1', stage:'survival', title:'Original title', question:{prompt:'Original question',options:['Yes','No']}, story:{body:'Original story'}, deeperReview:{body:'Clinical guidance',triggers:['Original trigger']} }
  const saved = JSON.stringify(original)
  const edited = withChineseWellnessCopy(original)
  assert.equal(JSON.stringify(original), saved)
  assert.equal(edited.title, original.title)
  assert.equal(edited.question.prompt, original.question.prompt)
  assert.equal(edited.question.options, original.question.options)
  assert.equal(edited.deeperReview.body, original.deeperReview.body)
  assert.equal(edited.deeperReview.triggers, original.deeperReview.triggers)
  assert.match(edited.titleZh, /就医/)
})
