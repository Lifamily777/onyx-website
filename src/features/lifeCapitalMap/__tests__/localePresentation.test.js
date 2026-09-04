import test from 'node:test'
import assert from 'node:assert/strict'
import { SUPPORTED_LOCALES, parseLocaleFromPath, buildLocalePath } from '../../../i18n/config.js'
import { translateLegacyText } from '../../../i18n/legacyPresentation.js'
import { LIFE_EVENTS, WEALTH_HERO_NODES, WELLNESS_FOUNDATION_NODES } from '../index.js'

test('only English and Chinese are active; locale links preserve the page', () => {
  assert.deepEqual(SUPPORTED_LOCALES, ['en','zh'])
  assert.deepEqual(parseLocaleFromPath('/zh/survey'), {locale:'zh',subpath:'/survey'})
  assert.equal(buildLocalePath('zh','/capital-map'),'/zh/capital-map')
  assert.equal(buildLocalePath('en','/capital-map'),'/capital-map')
  assert.equal(buildLocalePath('es','/survey'),'/survey')
})

test('paired labels select one language without changing option values', () => {
  assert.equal(translateLegacyText('Watch · 关注','en'),'Watch')
  assert.equal(translateLegacyText('Watch · 关注','zh'),'关注')
  assert.equal(translateLegacyText('Monthly core expense','zh'),'每月核心支出')
  assert.equal(translateLegacyText('Monthly core expense','en'),'Monthly core expense')
  assert.equal(translateLegacyText('把payroll和basis一起梳理。','zh'),'把工资核算与申报和计税基础一起梳理。')
  assert.equal(translateLegacyText(0,'zh'),0)
})

test('legacy event lists and reflection choices have Chinese presentation', () => {
  const inputs = [
    ...LIFE_EVENTS.flatMap(event => [event.taxTopics,event.recordsNeeded,event.questionsWorthAsking,event.blindSpots,event.deeperReview.triggers]).flat(),
    ...WEALTH_HERO_NODES.flatMap(node => node.ask.options),
    ...WELLNESS_FOUNDATION_NODES.flatMap(node => [...node.question.options,...node.tryItems]),
  ]
  for (const value of inputs) {
    if (!/[a-z]{3}/i.test(value)) continue
    assert.notEqual(translateLegacyText(value,'zh'),value, `Missing Chinese label: ${value}`)
  }
})
