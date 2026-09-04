import { V3_PATHS } from '../../data/v3Brand.js'
import { KNOWLEDGE_GUIDES } from '../knowledgeGuides/index.js'
import { JOB_CHANGE_EVENT, OLD_401K_DECISION, ROLLOVER_KNOWLEDGE } from '../decisionIntelligence/index.js'
import { LIFE_EVENTS, WEALTH_HERO_NODES, WELLNESS_FOUNDATION_NODES, DOWNLOAD_TEMPLATES } from '../lifeCapitalMap/index.js'
import { getAllInsights } from '../../data/insights/index.js'

const alias = {
  'keep-more':['W2','W-2','1099','side hustle','self employed','withholding','副业','自雇','工资','预扣税'],
  'build-for-tomorrow':['retirement','401k','401(k)','IRA','SEP IRA','SIMPLE IRA','Solo 401k','退休'],
  'fund-their-future':['baby','new baby','529','college','FAFSA','education funding','宝宝','孩子教育','大学','助学金'],
  'protect-the-plan':['life insurance','mortgage protection','family protection','人寿保险','房贷','家庭保障'],
  'business-payroll-retirement':['S Corp','S corporation','payroll','工资','发工资','small business','企业','退休'],
  'second-income-engine':['W2','W-2','1099','side hustle','second income','副业','自雇'],
  'rental-equity':['rental','sell rental','1031','1031 exchange','depreciation','出租房','卖房','1031交换'],
  'new-baby-capital':['baby','new baby','529','college','FAFSA','education funding','宝宝','孩子教育','大学','助学金'],
  'new-baby-education':['baby','new baby','529','college','FAFSA','education funding','宝宝','孩子教育','大学','助学金'],
  'sell-rental-property':['rental','sell rental','1031','1031 exchange','depreciation','basis','出租房','卖房','1031交换','折旧'],
  's-corporation-election':['S Corp','S corporation','payroll','工资','发工资'],
}
const record = data => ({ keywords:[], keywordsZh:[], aliases:[], relatedTopics:[], priority:50, ...data })
const fromPair = (value, key) => value?.[key] || ''

const paths = V3_PATHS.map(item=>record({id:`path:${item.id}`,type:'Knowledge Path',group:'KNOWLEDGE',title:item.title,titleZh:item.titleZh,description:item.description,descriptionZh:item.descriptionZh,keywords:item.topics,keywordsZh:item.topicsZh,aliases:alias[item.id]||[],path:`/${item.id}`,domain:'wealth',priority:75}))

const guides = KNOWLEDGE_GUIDES.map(item=>record({id:`guide:${item.id}`,type:'Knowledge Guide',group:'KNOWLEDGE',title:fromPair(item.title,'en'),titleZh:fromPair(item.title,'zh'),description:fromPair(item.answer,'en'),descriptionZh:fromPair(item.answer,'zh'),keywords:fromPair(item.topics,'en'),keywordsZh:fromPair(item.topics,'zh'),aliases:alias[item.id]||[],relatedTopics:[...fromPair(item.flow,'en'),...fromPair(item.flow,'zh')],path:`/guides/${item.id}`,domain:'wealth',priority:80}))

const decision = record({id:`decision:${OLD_401K_DECISION.id}`,type:'Decision',group:'DECISIONS',title:'Before You Move Your Old 401(k)',titleZh:'转移旧 401(k) 之前，先看清这一步',description:'A rollover destination may affect future IRA and Roth-planning flexibility.',descriptionZh:'Rollover 的去向，可能影响未来 IRA 与 Roth 规划的灵活性。',keywords:['401k','401(k)','old 401k','rollover','IRA','pro rata','pro-rata','Backdoor Roth','Form 8606','job change','new job','leaving my job'],keywordsZh:['换工作','离职','401k怎么办','旧401k','退休账户转换'],aliases:['back door roth','401 k','prorata'],relatedTopics:['Job Change','Retirement','Traditional IRA','Rollover IRA','SEP IRA','SIMPLE IRA','Pro-rata rule','Backdoor Roth','Form 8606'],path:'/decisions/job-change-old-401k',domain:'wealth',priority:100})

const knowledge = ROLLOVER_KNOWLEDGE.map(item=>record({id:`knowledge:${item.id}`,type:'Knowledge',group:'KNOWLEDGE',title:item.title.en,titleZh:item.title.zh,description:item.body.en,descriptionZh:item.body.zh,aliases:item.id==='pro-rata'?['pro rata','pro-rata','prorata']:item.id==='backdoor-roth'?['Backdoor Roth','back door roth']:item.id==='form-8606'?['Form 8606','8606']:[],relatedTopics:['Old 401(k)','Job Change','IRA','Roth planning'],path:'/decisions/job-change-old-401k',domain:'wealth',priority:88}))

const events = LIFE_EVENTS.map(item=>record({id:`event:${item.id}`,type:'Life Event',group:'LIFE EVENTS',title:item.title,titleZh:item.titleZh,description:item.description,descriptionZh:item.descriptionZh,keywords:item.taxTopics,keywordsZh:[],aliases:alias[item.id]||[],relatedTopics:item.relatedNodes,path:`/capital-map/event/${item.id}`,domain:'wealth',priority:70}))
events.push(record({id:'event:job-change',type:'Life Event',group:'LIFE EVENTS',title:JOB_CHANGE_EVENT.title.en,titleZh:JOB_CHANGE_EVENT.title.zh,description:JOB_CHANGE_EVENT.summary.en,descriptionZh:JOB_CHANGE_EVENT.summary.zh,aliases:['job change','new job','leaving my job','换工作','离职'],relatedTopics:JOB_CHANGE_EVENT.planningWindows.flatMap(item=>[item.en,item.zh]),path:'/decisions/job-change-old-401k',domain:'wealth',priority:92}))

const nodes = [...WEALTH_HERO_NODES,...WELLNESS_FOUNDATION_NODES].map(item=>record({id:`node:${item.id}`,type:item.domain==='wellness'?'Wellness Resource':'Knowledge',group:'KNOWLEDGE',title:item.title,titleZh:item.titleZh,description:item.shortDescription,descriptionZh:item.shortDescriptionZh,keywords:item.keyIssues||[],aliases:item.id==='W25'?['Next Dollar Planner','extra cash','next dollar','闲钱','下一块钱']:item.id==='W10'?['W2','W-2','1099','side hustle','副业','自雇']:[],relatedTopics:item.relatedEvents||item.relatedWealthNodes||[],path:`/capital-map/${item.domain==='wellness'?'wellness':'node'}/${item.id.toLowerCase()}`,domain:item.domain||'wealth',priority:55}))

const tools = [
  record({id:'tool:capital-map',type:'Tool',group:'TOOLS',title:'ONYX Life Capital Map',titleZh:'人生资本地图',description:'Explore Wealth and Wellness across six capital stages.',descriptionZh:'从六个资本层次探索财富与健康。',aliases:['capital map','financial map','财务地图','资本地图'],path:'/capital-map',priority:70}),
  record({id:'tool:foundation',type:'Tool',group:'TOOLS',title:'4-Minute Foundation Check',titleZh:'4分钟基础检查',description:'Find areas worth exploring through 18 questions.',descriptionZh:'通过18个问题找到值得进一步了解的领域。',aliases:['foundation check','assessment','checkup','自测','评估'],path:'/foundation',priority:65}),
  record({id:'tool:next-dollar',type:'Tool',group:'TOOLS',title:'Next Dollar Planner',titleZh:'下一块钱比较工具',description:'Compare six possible jobs for the next available dollar.',descriptionZh:'比较下一块可用资金可能承担的六种任务。',aliases:['extra cash','next dollar','闲钱','多余的钱'],path:'/capital-map/node/w25',priority:85}),
  record({id:'tool:long-term',type:'Planning Window',group:'TOOLS',title:'5–10 Year Planning Map',titleZh:'5–10年长期规划地图',description:'Connect retirement, health, business, legacy, and work optionality.',descriptionZh:'连接退休、健康、企业、传承与职业选择权。',aliases:['long term plan','retirement planning','长期规划','退休'],path:'/capital-map/long-term',priority:65}),
  ...Object.entries(DOWNLOAD_TEMPLATES).map(([id,item])=>record({id:`tool:${id}`,type:'Tool',group:'TOOLS',title:item.title,titleZh:item.titleZh,description:'A private local-download working template.',descriptionZh:'一份在浏览器本地下载的工作底稿。',path:'/capital-map',priority:35})),
]

const insights = getAllInsights().map(item=>{
  const en=item.content.en||{}, zh=item.content.zh||{}
  return record({id:`insight:${item.slug}`,type:'Insight',group:'INSIGHTS',title:en.title||en.titleEn||item.title||item.slug,titleZh:zh.title||zh.titleZh||en.titleZh||'',description:en.subtitle||en.subtitleEn||en.seoDescription||'',descriptionZh:zh.subtitle||zh.subtitleZh||zh.seoDescription||'',keywords:item.keywords||[],keywordsZh:item.keywordsZh||[],aliases:[],relatedTopics:item.pillars||[],path:`/insights/${item.slug}`,domain:item.pillars?.[0],priority:45})
})

export const ONYX_SEARCH_INDEX = Object.freeze([...paths,...guides,decision,...knowledge,...events,...nodes,...tools,...insights])
