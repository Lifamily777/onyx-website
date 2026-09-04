import { LIFE_EVENTS, WEALTH_HERO_NODES, WELLNESS_FOUNDATION_NODES, LIFE_CAPITAL_STAGES, LONG_TERM_AREAS, DOWNLOAD_TEMPLATES } from '../features/lifeCapitalMap/index.js'
import { LEGACY_ZH } from './legacyLabels.js'
import { LEGACY_UI_ZH } from './legacyUiLabels.js'
import { CONVERSATIONAL_ZH } from './conversationalZh.js'

const paired = {}
function collect(value) {
  if (!value || typeof value !== 'object') return
  for (const [key, item] of Object.entries(value)) {
    if (key.endsWith('Zh') && typeof item === 'string' && typeof value[key.slice(0,-2)] === 'string') paired[value[key.slice(0,-2)]] = item
    if (typeof item === 'object') collect(item)
  }
}
collect([LIFE_EVENTS, WEALTH_HERO_NODES, WELLNESS_FOUNDATION_NODES, LIFE_CAPITAL_STAGES, LONG_TERM_AREAS, DOWNLOAD_TEMPLATES])
export const LEGACY_TRANSLATIONS = { ...paired, ...LEGACY_ZH, ...LEGACY_UI_ZH, ...CONVERSATIONAL_ZH }

// Chinese source copy previously mixed these English terms into sentences.
// This is presentation-only: identifiers, input values and source data stay intact.
const CHINESE_TERMS = [
  ['Owner Compensation', '业主报酬'], ['S Corporation', 'S型公司'],
  ['S election', 'S型公司税务选择'], ['self-employment tax', '自雇税'],
  ['reasonable compensation', '合理报酬'], ['needs analysis', '需求分析'],
  ['Roth conversion', '罗斯账户转换'], ['Event Radar', '事件雷达'],
  ['Partnership', '合伙企业'], ['Partner', '合伙人'], ['Investor', '投资者'],
  ['Owner', '业主'], ['payroll', '工资核算与申报'], ['compensation', '报酬'],
  ['distributions', '分配款项'], ['distribution', '分配款项'],
  ['depreciation', '折旧'], ['basis', '计税基础'], ['election', '税务选择'],
  ['HVAC', '暖通空调系统'],
]
export function localizeChineseTerms(value) {
  if (typeof value !== 'string' || !/[\u4e00-\u9fff]/.test(value)) return value
  return CHINESE_TERMS.reduce((text, [term, translation]) => text.replaceAll(term, translation), value)
}

export function translateLegacyText(value, locale) {
  if (typeof value !== 'string') return value
  const clean = value.trim()
  const pairedText = clean.match(/^(.+?)\s+[·/]\s+(.+[\u4e00-\u9fff].*)$/)
  if (pairedText) return locale === 'zh' ? localizeChineseTerms(pairedText[2]) : pairedText[1]
  if (locale !== 'zh') return value
  const translated = LEGACY_TRANSLATIONS[clean]
  return localizeChineseTerms(translated === undefined ? value : value.replace(clean, translated))
}
