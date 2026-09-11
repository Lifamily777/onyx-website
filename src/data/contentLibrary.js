import { buildLocalePath } from '../i18n/config.js'
import { getAllInsights, resolveInsightContent } from './insights/index.js'
import { servicePages } from './content.js'

// The existing article and video records remain the sources of truth.
// Library entries reference them; they do not copy article bodies or create strategy-specific collections.
const externalResources = [
 { id: 'irs-retirement', type: 'external', languages: ['en'], categories: ['tax-later', 'tax-now'], topics: ['traditional-401k','traditional-ira','simple-ira','sep-ira','solo-401k','qualified-plans','cash-balance','roth-ira','roth-401k','backdoor-roth','roth-conversion'], audiences: ['w2','1099','small-business'], generalLearning: true, href: 'https://www.irs.gov/retirement-plans', title: { en: 'IRS: Retirement plans', zh: 'IRS：退休计划' }, description: { en: 'Official retirement-plan resource directory. A starting point, not a substitute for topic-specific guidance.', zh: '官方退休计划资源目录。作为学习起点，不替代具体主题的指导。' } },
 { id: 'irs-rentals', type: 'external', languages: ['en'], categories: ['tax-advantage'], topics: ['real-estate','rental-property','depreciation','passive-activity','short-term-rental'], audiences: [], generalLearning: true, href: 'https://www.irs.gov/taxtopics/tc414', title: { en: 'IRS: Rental income and expenses', zh: 'IRS：出租收入与费用' }, description: { en: 'Official rental income and expense overview.', zh: '出租收入与费用的官方概览。' } },
 { id: 'irs-business', type: 'external', languages: ['en'], categories: ['tax-architecture'], topics: ['existing-business','business-structure','new-income','wellness-business','one-person-company'], audiences: ['1099','small-business'], generalLearning: true, href: 'https://www.irs.gov/businesses/small-businesses-self-employed', title: { en: 'IRS: Small business and self-employed', zh: 'IRS：小企业与自雇' }, description: { en: 'Official business tax, recordkeeping and structure resources.', zh: '企业税务、记录保存与结构的官方资源。' } },
]

const defaultTags = { categories: [], topics: [], audiences: [], generalLearning: true }
const articles = getAllInsights().map(source => ({ id: `insight:${source.slug}`, type: 'article', source, languages: Object.keys(source.content), ...defaultTags, ...source.learning, href: `/insights/${source.slug}` }))
const seenVideos = new Set()
const videos = Object.values(servicePages).flatMap(page => page.channelVideos || []).filter(source => {
 if (seenVideos.has(source.id)) return false
 seenVideos.add(source.id)
 return true
}).map(source => ({ id: `video:${source.id}`, type: 'video', source, languages: source.languages || ['und'], ...defaultTags, ...source.learning, href: `https://www.youtube.com/shorts/${source.id}` }))
const library = Object.freeze([...articles, ...videos, ...externalResources])
export const getContentLibrary = () => library

export function presentResource(resource, locale = 'en') {
 if (resource.type === 'article') {
  const { data, resolvedLocale } = resolveInsightContent(resource.source, locale)
  return { title: data.title || data.titleEn || data.titleZh, description: data.subtitle || data.subtitleEn || data.subtitleZh || data.seoDescription || '', contentLocale: resolvedLocale }
 }
 if (resource.type === 'video') return { title: resource.source.title, description: '', contentLocale: resource.languages[0] }
 return { title: resource.title[locale] || resource.title.en, description: resource.description[locale] || resource.description.en, contentLocale: resource.languages[0] }
}
const normalize = text => String(text || '').normalize('NFKC').toLocaleLowerCase().trim()
export function queryContentLibrary({ category = '', topic = '', type = '', language = '', audience = '', general = false, query = '', locale = 'en' } = {}) {
 const needle = normalize(query)
 return library.filter(resource => {
  if (category && !resource.categories.includes(category)) return false
  if (topic && !resource.topics.includes(topic)) return false
  if (type && resource.type !== type) return false
  if (language && !resource.languages.includes(language)) return false
  if (audience && !resource.audiences.includes(audience)) return false
  if (general && !resource.generalLearning) return false
  if (!needle) return true
  const text = presentResource(resource, locale)
  const alternate = presentResource(resource, locale === 'zh' ? 'en' : 'zh')
  return normalize([text.title, text.description, alternate.title, ...resource.topics, ...resource.categories, ...(resource.source?.keywords || [])].join(' ')).includes(needle)
 })
}

export function resourcePath(resource, locale = 'en') {
 if (resource.type !== 'article') return resource.href
 const contentLocale = resource.source.content[locale] ? locale : resource.source.originalLocale
 return buildLocalePath(contentLocale, resource.href)
}
