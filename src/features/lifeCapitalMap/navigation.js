import { LIFE_CAPITAL_STAGES } from './data/architecture.js'
import { WEALTH_HERO_NODES, getWealthNode } from './data/nodes.js'
import { WELLNESS_FOUNDATION_NODES, getWellnessNode } from './data/wellnessNodes.js'
import { getLifeEvent, LIFE_EVENTS } from './data/events.js'
import { getHeroJourney } from '../journeyEngine/index.js'
import { getKnowledgeGuide } from '../knowledgeGuides/index.js'
import { V3_PATHS } from '../../data/v3Brand.js'
import { parseLocaleFromPath } from '../../i18n/config.js'

export const ARCHITECTURE_PATHS = V3_PATHS.map(item => ({path:`/${item.id}`, en:item.eyebrow, zh:item.eyebrowZh}))
export const ARCHITECTURE_NODES = [...WEALTH_HERO_NODES, ...WELLNESS_FOUNDATION_NODES].map(node => ({id:node.id,stage:node.stage,domain:node.domain || 'wealth',en:node.title,zh:node.titleZh,path:`/capital-map/${node.domain === 'wellness' ? 'wellness' : 'node'}/${node.id.toLowerCase()}`}))
export const ARCHITECTURE_EVENTS = LIFE_EVENTS.map((event,index) => ({id:String(index+1),en:event.title,zh:event.titleZh,path:`/capital-map/event/${event.id}`}))
export const ARCHITECTURE_RESOURCES = [
  {en:'Tools',zh:'自测与工具',items:[{path:'/foundation',en:'Foundation',zh:'基础自测'},{path:'/capital-assessment',en:'Assessment',zh:'资本自测'},{path:'/survey',en:'Start here',zh:'需求问卷'}]},
  {en:'Library',zh:'阅读与规划',items:[{path:'/insights',en:'Insights',zh:'洞察文章'},{path:'/glossary',en:'Glossary',zh:'知识词典'},{path:'/capital-map/journey',en:'Journeys',zh:'案例旅程'},{path:'/capital-map/long-term',en:'Long term',zh:'长期规划'}]},
  {en:'Connect',zh:'关于与联系',items:[{path:'/about',en:'About',zh:'关于'},{path:'/contact',en:'Contact',zh:'联系'},{path:'/ns-federation',en:'Resources',zh:'专业资源'}]},
  {en:'Policies',zh:'法律与隐私',items:[{path:'/privacy',en:'Privacy',zh:'隐私'},{path:'/terms',en:'Terms',zh:'条款'},{path:'/disclosures',en:'Disclosures',zh:'披露'}]},
]

const names = {
  survival: ['Cover the essentials', '先顾好眼前'],
  stability: ['Build a steady base', '把基础做稳'],
  protection: ['Protect the household', '做好家庭保障'],
  growth: ['Build for the future', '为将来积累'],
  strategic: ['Coordinate the plan', '把各项安排理顺'],
  optionality: ['Choice & legacy', '退休、选择与传承'],
}
export const READING_STAGES = LIFE_CAPITAL_STAGES.map(stage => ({
  id: stage.id, en: names[stage.id][0], zh: names[stage.id][1],
  wealth: `/capital-map/node/${WEALTH_HERO_NODES.find(node => node.stage === stage.id).id.toLowerCase()}`,
  wellness: `/capital-map/wellness/${WELLNESS_FOUNDATION_NODES.find(node => node.stage === stage.id).id.toLowerCase()}`,
}))
export const READING_AREAS = [
  {id:'overview', en:'The whole picture', zh:'全局地图', path:'/capital-map'},
  {id:'events', en:'Life changes', zh:'生活发生变化', path:'/capital-map/events'},
  {id:'tools', en:'Questions & tools', zh:'自测与工具', path:'/foundation'},
  {id:'learn', en:'Read & explore', zh:'阅读与学习', path:'/insights'},
  {id:'site', en:'About & contact', zh:'关于与联系', path:'/about'},
]
const pageNames = {
  '/':['Home','首页'], '/capital-map':['Family financial map','家庭财务地图'],
  '/capital-map/wealth':['Wealth map','财富地图'], '/capital-map/wellness':['Wellness map','健康地图'],
  '/capital-map/events':['Event Radar','生活事件'], '/capital-map/long-term':['Long-term planning','长期规划'],
  '/capital-map/journey':['Learning journeys','案例学习'], '/foundation':['Foundation check','基础自测'],
  '/capital-assessment':['Capital assessment','家庭资本自测'], '/capital-assessment-preview':['Sample result','结果示例'],
  '/survey':['Getting started','了解你的问题'], '/insights':['Insights','洞察文章'],
  '/glossary':['Glossary','知识词典'], '/about':['About Sammi','关于 Sammi'], '/contact':['Contact','联系'],
  '/privacy':['Privacy','隐私政策'], '/terms':['Terms','使用条款'], '/disclosures':['Disclosures','信息披露'],
  '/ns-federation':['Professional resources','专业资源'],
  '/tax':['Tax education','税务知识'], '/ins':['Protection education','保障知识'], '/health':['Health education','健康知识'],
  '/wealth':['Wealth','财富'], '/wellness':['Wellness','健康'], '/intelligence':['Intelligence','智能'],
}

// Reading position only. Never derive a financial stage from browsing or answers.
export function getReadingPosition(pathname) {
  const { subpath: raw } = parseLocaleFromPath(pathname)
  const path = raw.replace(/\/+$/, '') || '/'
  const parts = path.split('/')
  if (parts[1] === 'capital-map' && ['node','wellness'].includes(parts[2]) && parts[3]) {
    const node = parts[2] === 'node' ? getWealthNode(parts[3]) : getWellnessNode(parts[3])
    if (node) return {area:'overview', stage:node.stage, domain:node.domain || 'wealth', en:node.title, zh:node.titleZh, path}
  }
  if (parts[1] === 'capital-map' && parts[2] === 'event') {
    const event = getLifeEvent(parts[3])
    if (event) return {area:'events', en:event.title, zh:event.titleZh, path}
  }
  if (parts[1] === 'capital-map' && parts[2] === 'journey' && parts[3]) {
    const journey = getHeroJourney(parts[3])
    if (journey) return {area:'learn', stage:journey.stage, domain:journey.domain, ...journey.title, path}
  }
  if (parts[1] === 'guides') {
    const guide = getKnowledgeGuide(parts[2])
    if (guide) return {area:'learn', ...guide.title, path}
  }
  if (parts[1] === 'decisions' && parts[2] === 'job-change-old-401k') return {area:'events',stage:'strategic',domain:'wealth',en:'Job Change → Old 401(k)',zh:'换工作 → 旧 401(k)',path}
  const primary = V3_PATHS.find(item => `/${item.id}` === path)
  if (primary) return {area:'learn', en:primary.title, zh:primary.titleZh, path}
  const title = pageNames[path] || (parts[1] === 'insights' ? ['Insight article','洞察文章'] : parts[1] === 'glossary' ? ['Glossary entry','词条阅读'] : ['Page not found','未找到页面'])
  const area = path === '/capital-map/events' ? 'events' : /^\/(foundation|survey|capital-assessment)/.test(path) ? 'tools' : /^\/(insights|glossary|capital-map\/journey|tax|ins|health|wealth|wellness|intelligence)/.test(path) ? 'learn' : path === '/' || path.startsWith('/capital-map') ? 'overview' : 'site'
  return {area, en:title[0], zh:title[1], path}
}
