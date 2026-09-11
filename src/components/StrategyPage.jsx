import ContentLibraryView from './ContentLibraryView'

import { Link, useParams } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { strategies, realEstateModules, learningSections, resolveStrategy, textFor } from '../features/onyxProfile/strategies'
import NotFound from './NotFound'
import styles from './PhaseOne.module.css'

const topics = {
 'existing-business': ['Entity structure · Compensation · Ordinary and necessary expenses · Retirement-plan integration · Recordkeeping · Tax compliance', '实体结构 · 薪酬 · 普通且必要的费用 · 退休计划整合 · 记录保存 · 税务合规'],
 'new-income': ['Legitimate business opportunities · Business infrastructure · Income expansion · Expense discipline · Recordkeeping · Technology and automation', '真实商业机会 · 企业基础设施 · 拓展收入 · 费用管理 · 记录保存 · 技术与自动化'],
 'wellness-business': ['Business model and opportunity overview · Wellness and product education · Startup considerations · Recordkeeping · Income opportunity. A future optional resource may include USANA; no business or product is an assumed answer.', '商业模式与机会概览 · 健康与产品教育 · 创业考量 · 记录保存 · 收入机会。未来可选资源可能包含 USANA；不预设任何企业或产品为答案。'],
 'one-person-company': ['One-person business concepts · AI tools · Website and business infrastructure · Setup education · Marketing and content · Automation · Bookkeeping · Recordkeeping · Tax basics · Courses · Potential affiliate ecosystem', '一人公司概念 · AI 工具 · 网站与企业基础设施 · 创业教育 · 营销与内容 · 自动化 · 簿记 · 记录保存 · 税务基础 · 课程 · 潜在联盟合作生态'],
 'rental-property': ['Rental income · Operating expenses · Financing and leverage · Cash flow · Appreciation', '租金收入 · 运营费用 · 融资与杠杆 · 现金流 · 增值'],
 'depreciation': ['Depreciation and basis concepts', '折旧与税基概念'],
 'cost-segregation': ['Future education on cost segregation and professional review; no automatic savings claims.', '未来介绍成本分离与专业审阅；不作自动节税承诺。'],
 '1031-exchange': ['Qualifying investment or business real estate · Timing · Ownership · Qualified intermediaries · Professional review', '符合条件的投资或商业房地产 · 时间要求 · 所有权 · 合格中介 · 专业审阅'],
 'short-term-rental': ['Short-term rental tax considerations. Ownership alone does not establish deductible W-2 offsets.', '短期出租的税务考量。仅持有物业不能确定亏损可抵减 W-2 收入。'],
 'passive-activity': ['Passive and nonpassive activity concepts', '被动与非被动活动概念'],
 'material-participation': ['Participation requirements and supporting records', '参与要求与支持记录'],
 'real-estate-professional': ['Advanced education on status requirements. Rental ownership alone does not establish qualification.', '进阶身份要求教育。仅拥有出租物业不代表符合资格。'],
}
export default function StrategyPage() {
 const { categoryId, topicId, moduleId } = useParams()
 const { locale, localePath } = useLocale()
 const zh = locale === 'zh'
 const text = value => textFor(value, locale)
 const { category, topic } = resolveStrategy(categoryId, topicId)
 const module = realEstateModules.find(item => item.id === moduleId)
 const isRealEstate = categoryId === 'tax-advantage' && topicId === 'real-estate'
 const title = moduleId && isRealEstate && module ? text(module.title) : topic ? text(topic.title) : category ? text(category.title) : (zh ? '税务策略中心' : 'Tax Strategy Hub')
 useDocumentMeta(title + ' · ONYX', zh ? '先理解选择，再讨论适合自己的策略。' : 'Understand the choices before discussing what fits your situation.')
 if ((categoryId && !category) || (topicId && !topic) || (moduleId && (!isRealEstate || !module))) return <NotFound />
 const base = '/strategies/' + categoryId
 const outlineId = moduleId || topicId
 return <main className={styles.page}>
  <p className={styles.eyebrow}>{zh ? '策略 · 教育先于实施' : 'Strategize · Education before implementation'}</p>
  {category && <Link to={localePath(moduleId ? base + '/real-estate' : topicId ? base : '/strategies')}>← {moduleId ? (zh ? '房地产策略' : 'Real Estate Strategies') : topicId ? text(category.title) : (zh ? '策略中心' : 'Strategy Hub')}</Link>}
  <h1>{title}</h1>
  {!category ? <>
   <p>{zh ? '四类策略可以同时发挥不同作用，而不是四种互斥的产品选择。先理解每一类的任务，再结合完整情况与专业人士讨论。' : 'Four categories can do different jobs at the same time. They are not mutually exclusive product choices. Understand each role, then discuss it in the context of your whole financial life.'}</p>
   <div className={styles.grid}>{strategies.map(item => <Link className={styles.card} key={item.id} to={localePath('/strategies/' + item.id)}><h2>{text(item.title)} →</h2><p>{text(item.description)}</p></Link>)}</div>
   <h2>{zh ? '同一个家庭，不同的任务。' : 'One household. Different jobs.'}</h2>
   <p>{zh ? '仅用于说明关联，并非建议：一个家庭可能同时拥有以下几部分。' : 'An illustration of relationships, not a recommendation: one household could have all of these pieces.'}</p>
   <ol className={styles.steps}>{(zh ? ['W-2 收入 → 传统 401(k) → 延后纳税','Roth IRA → 现在纳税','出租物业 → 税务优势','1099 业务 → 税务架构'] : ['W-2 income → Traditional 401(k) → Tax Later','Roth IRA → Tax Now','Rental property → Tax Advantage','1099 business → Tax Architecture']).map(value => <li key={value}>{value}</li>)}</ol>
  </> : !topic ? <>
   <p>{text(category.description)}</p>
   {category.id === 'tax-now' && <p className={styles.note}>{zh ? '退休账户与保险解决不同问题。IUL 属于寿险，不是 Roth、退休账户、投资账户或 Roth 的直接替代品。' : 'Retirement accounts and insurance address different needs. IUL is life insurance, not a Roth account, retirement account, investment account or direct Roth substitute.'}</p>}
   {category.groups.map(group => <section key={group.title.en}><h2>{text(group.title)}</h2><div className={styles.grid}>{group.items.map(item => <Link className={styles.card} to={localePath(base + '/' + item.id)} key={item.id}><h3>{text(item.title)} →</h3><p>{zh ? '查看教育主题纲要' : 'Explore the educational outline'}</p></Link>)}</div></section>)}
  </> : isRealEstate && !moduleId ? <>
   <p>{zh ? '房地产首先是一种资本配置选择：考虑现金流、增值、融资与管理责任。实际税务待遇取决于个人事实与适用法律；不能仅凭问卷判断。' : 'Real estate is first a capital allocation choice: consider cash flow, appreciation, financing and management responsibilities. Its actual tax treatment depends on individual facts and applicable law; a questionnaire cannot determine it.'}</p>
   <div className={styles.grid}>{realEstateModules.map(item => <Link className={styles.card} to={localePath(base + '/real-estate/' + item.id)} key={item.id}><h2>{text(item.title)} →</h2><p>{zh ? '未来教育路径 · 查看纲要' : 'Future learning pathway · View outline'}</p></Link>)}</div>

  </> : <>
   <p>{zh ? '教育纲要 · 详细内容尚未发布。以下主题将在核实资料并完成专业审阅后逐步补充。' : 'Educational outline · Detailed guidance is not yet published. These topics will be developed after source verification and professional review.'}</p>
   {topics[outlineId] && <div className={styles.note}><h2>{zh ? '计划涵盖的主题' : 'Planned learning topics'}</h2><p>{topics[outlineId][zh ? 1 : 0]}</p></div>}
   {topicId === 'iul' && <div className={styles.note}><p>{zh ? 'IUL 是寿险，而不是 Roth、退休账户、投资账户或 Roth 的直接替代品。未来内容先从风险、需求与替代方案开始，再讨论产品、成本与保单风险。' : 'IUL is life insurance, not a Roth account, retirement account, investment account or direct Roth substitute. Future education begins with risk, needs and alternatives before products, costs and policy risks.'}</p><h2>{zh ? '探索演示方案' : 'Explore an Illustration'}</h2><p>{zh ? '未来功能，尚未开放。没有接入保险公司或演示引擎。' : 'Future feature, not yet available. No carrier or illustration engine is connected.'}</p></div>}
   <div className={styles.grid}>{learningSections.filter(item => !['ONYX articles', 'ONYX videos', 'Authoritative resources'].includes(item.en)).map(item => <section className={styles.card} key={item.en}><h2>{text(item)}</h2><p>{zh ? '教育内容筹备中。' : 'Educational content forthcoming.'}</p>{item.en === 'ONYX articles' && <Link to={localePath('/insights')}>{zh ? '浏览现有 Insights' : 'Browse existing Insights'} →</Link>}{item.en === 'Authoritative resources' && <Link to={localePath('/learn')}>{zh ? '浏览资源目录' : 'Browse the resource directory'} →</Link>}</section>)}</div>
  </>}
  {category && <ContentLibraryView key={`${categoryId}/${topicId || ''}/${moduleId || ''}`} contextual categoryId={categoryId} topicId={moduleId || topicId || ''} />}
  {categoryId === 'tax-architecture' && <div className={styles.note}><p>{zh ? '商业路径应以真实经营与盈利目的为出发点，不能用于制造扣除。设立 LLC、发生费用或出现亏损，不会自动产生抵减 W-2 收入的资格。未来内容将讨论普通且必要的费用、盈利动机、被动活动、税基、风险承担限制及其他适用要求。' : 'Business pathways begin with genuine activity and a profit motive, not manufactured deductions. Forming an LLC, incurring expenses or having losses does not automatically establish W-2 offsets. Future education will address ordinary and necessary expenses, profit motive, passive activity, basis, at-risk limits and other applicable requirements.'}</p></div>}
  <p className={styles.note}>{zh ? '这是教育框架，不是个性化财务、税务或投资建议。适用性、资格与限制需要结合事实及现行规则审阅。' : 'This is an educational framework, not personalized financial, tax or investment advice. Fit, eligibility and limitations require review of your facts and current rules.'}</p>
  <div className={styles.actions}><Link className={styles.button} to={localePath('/profile')}>{zh ? '了解我的概况' : 'Understand my profile'}</Link><Link to={localePath('/learn')}>{zh ? '继续学习' : 'Keep learning'} →</Link></div>
 </main>
}
