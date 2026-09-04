import test from 'node:test'
import assert from 'node:assert/strict'
import { WEALTH_HERO_NODES, WELLNESS_FOUNDATION_NODES } from '../index.js'
import { getReflectionGuidance } from '../reflectionGuidance.js'

test('every visible reflection option produces EN and ZH educational feedback', () => {
  for (const node of [...WEALTH_HERO_NODES,...WELLNESS_FOUNDATION_NODES]) {
    const options=node.ask?.options || node.question?.options
    for (const option of options) {
      for (const locale of ['en','zh']) {
        const result=getReflectionGuidance(node,option,locale)
        assert.ok(result?.title,`${node.id} ${option} ${locale} title`)
        assert.ok(result?.body,`${node.id} ${option} ${locale} body`)
        assert.doesNotMatch(result.body,/best product|guaranteed|you should buy/i)
      }
    }
  }
})

test('feedback is absent until a choice exists and does not mutate source nodes', () => {
  const node=WEALTH_HERO_NODES[0], before=JSON.stringify(node)
  assert.equal(getReflectionGuidance(node,'','zh'),null)
  getReflectionGuidance(node,node.ask.options[0],'zh')
  assert.equal(JSON.stringify(node),before)
})
