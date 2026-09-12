
import test from 'node:test'
import assert from 'node:assert/strict'
import { profileSections, toggleAnswer, buildCapitalProfile } from '../../onyxProfile/schema.js'
import { strategies, realEstateModules, resolveStrategy } from '../../onyxProfile/strategies.js'

test('discovery preserves missing answers and strips unrecognized fields and values', () => {
 const result = buildCapitalProfile({ w2: '100to200', assets: ['cash','fake'], risk: 'fake', product: 'IUL' })
 assert.equal(result.w2, '100to200')
 assert.deepEqual(result.assets, ['cash'])
 assert.equal(result.risk, '')
 assert.equal(result.product, undefined)
 assert.equal(result.state, '')
 assert.ok(!('score' in result))
})
test('none and privacy answers remain exclusive of positive multi-select answers', () => {
 assert.deepEqual(toggleAnswer(['cash'], 'none'), ['none'])
 assert.deepEqual(toggleAnswer(['private'], 'cash'), ['cash'])
 assert.deepEqual(toggleAnswer(['cash'], 'cash'), [])
 assert.deepEqual(toggleAnswer(['cash'], 'stocks'), ['cash','stocks'])
})
test('all eight discovery areas have unique fields, bilingual choices and explicit opt-outs', () => {
 assert.equal(profileSections.length, 8)
 const fields = profileSections.flatMap(s => s.fields)
 assert.equal(new Set(fields.map(f => f.id)).size, fields.length)
 for (const field of fields) {
  assert.ok(field.label.en && field.label.zh)
  assert.ok(field.options.some(o => o.id === 'unknown'))
  if (['has-trust', 'estate-priority'].includes(field.id)) assert.deepEqual(field.options.map(o => o.id), ['yes', 'no', 'unknown'])
  else assert.ok(field.options.some(o => o.id === 'private'))
  assert.equal(new Set(field.options.map(o => o.id)).size, field.options.length)
  field.options.forEach(o => assert.ok(o.label.en && o.label.zh))
 }
 assert.ok(profileSections.find(s => s.id === 'real-estate').fields.length >= 10)
})
test('strategy hierarchy separates insurance and retirement and resolves real estate under Tax Advantage', () => {
 assert.equal(strategies.length, 4)
 const taxNow = strategies.find(c => c.id === 'tax-now')
 assert.ok(!taxNow.groups[0].items.some(i => i.id === 'iul'))
 assert.ok(taxNow.groups[1].items.some(i => i.id === 'iul'))
 assert.equal(resolveStrategy('tax-advantage','real-estate').topic.id, 'real-estate')
 assert.equal(resolveStrategy('tax-later','real-estate').topic, undefined)
 assert.equal(realEstateModules.length, 8)
})
