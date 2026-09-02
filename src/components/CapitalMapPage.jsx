import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { CAPITAL_DOMAINS, LIFE_CAPITAL_STAGES, WEALTH_HERO_NODES, WELLNESS_FOUNDATION_NODES, LIFE_EVENTS, EVENT_CATEGORIES, EVENT_STATUSES, DOWNLOAD_TEMPLATES, downloadTemplate, EDUCATIONAL_DISCLAIMER } from '../features/lifeCapitalMap'
import { HERO_JOURNEYS, localized } from '../features/journeyEngine'
import styles from './CapitalMap.module.css'

export default function CapitalMapPage({ view = 'map' }) {
  const { locale, localePath } = useLocale()
  useDocumentMeta('ONYX Life Capital Map · 人生资本地图', 'Explore Wealth and Wellness across six life-capital stages with educational tools, events, and practical next steps.')
  const showEntry = view === 'map'
  const showWealth = view === 'wealth'
  const showWellness = view === 'wellness'
  const showEvents = view === 'events'
  const [eventCategory, setEventCategory] = useState('all')
  const visibleEvents = eventCategory === 'all' ? LIFE_EVENTS : LIFE_EVENTS.filter((event) => event.category === eventCategory)

  return <main className={`${styles.shell} page-enter`}>
    <header className={styles.hero}>
      <p className={styles.eyebrow}>TRUST BEFORE TRANSACTION</p>
      <h1>ONYX Life Capital Map</h1><p className={styles.heroZh} lang="zh-CN">人生资本地图</p>
      <p>Wealth and Wellness are two forms of life capital operating across the same six stages.</p>
      <p lang="zh-CN">财富与健康，是贯穿同一组六个人生阶段的两种生命资本。</p>
      {showEntry && <Link className={styles.foundationLink} to={localePath('/capital-map/journey')}>Explore My Capital Journey · 探索我的资本旅程</Link>}
    </header>
    <nav className={styles.axisNav} aria-label="Life Capital Map views">
      <Link to={localePath('/capital-map')} aria-current={view === 'map' ? 'page' : undefined}>Map · 全景</Link>
      {CAPITAL_DOMAINS.map((domain)=><Link key={domain.id} to={localePath(`/capital-map/${domain.id}`)} aria-current={view === domain.id ? 'page' : undefined}>{domain.name} · {domain.nameZh}</Link>)}
      <Link to={localePath('/capital-map/events')} aria-current={showEvents ? 'page' : undefined}>Event Radar · 事件雷达</Link>
      <Link to={localePath('/capital-map/long-term')}>5–10 Year Map · 长期地图</Link>
    </nav>

    {showEntry && <section className={styles.entryExperience}>
      <div className={styles.entryPaths}>
        <article className={styles.primaryEntry}><span>PRIMARY PATH · 主要入口</span><h2>Explore My Capital Journey<small lang="zh-CN">探索我的资本旅程</small></h2><p>Explore real-life decisions, stories, trade-offs, and planning questions across Wealth and Wellness.</p><p lang="zh-CN">通过真实生活决定、故事、取舍和规划问题，探索财富与健康。</p><Link to={localePath('/capital-map/journey')}>Begin the Journey · 开始旅程 →</Link></article>
        <article><span>LIFE EVENT · 生活事件</span><h2>Something Changed<small lang="zh-CN">有些事情发生了变化</small></h2><p>A transaction, opportunity, family change, health change, move, or retirement window may need attention now.</p><p lang="zh-CN">交易、机会、家庭或健康变化、搬迁或退休窗口，可能需要现在开始关注。</p><Link to={localePath('/capital-map/events')}>Open Event Radar · 打开事件雷达 →</Link></article>
        <article><span>OPTIONAL CHECK · 可选检查</span><h2>4-Minute Foundation Check<small lang="zh-CN">4分钟基础检查</small></h2><p>Not sure where to begin? Let ONYX highlight areas worth exploring through the existing 18 questions.</p><p lang="zh-CN">不确定从哪里开始？通过现有18个问题，让黑曜提示值得探索的领域。</p><Link to={localePath('/foundation')}>Take the Foundation Check · 开始基础检查 →</Link></article>
      </div>
      <div className={styles.heroJourneyPreview}><header><span>THINK → DISCOVER → UNDERSTAND</span><h2>Three Journeys to Explore Now<small lang="zh-CN">现在可以探索的三条旅程</small></h2></header>{HERO_JOURNEYS.map((journey,index)=><Link key={journey.id} to={localePath(`/capital-map/journey/${journey.id}`)}><b>{String(index+1).padStart(2,'0')}</b><span><strong>{localized(journey.title,locale)}</strong><small>{localized(journey.subtitle,locale)}</small></span><em>→</em></Link>)}</div>
    </section>}

    {!showEntry && !showEvents && <section className={styles.road} aria-labelledby="stages-title"><h2 id="stages-title">Six Capital Stages <span lang="zh-CN">六个资本阶段</span></h2>
      {LIFE_CAPITAL_STAGES.map((stage)=><article key={stage.id} className={styles.stage}>
        <header><span>{String(stage.order).padStart(2,'0')}</span><div><h3>{stage.name}<small lang="zh-CN">{stage.nameZh}</small></h3><p>{stage.description}<br/><small lang="zh-CN">{stage.descriptionZh}</small></p></div></header>
        <div className={styles.domainColumns}>
          {showWealth && <section><h4>Wealth <small lang="zh-CN">财富</small></h4><div className={styles.cards}>{WEALTH_HERO_NODES.filter((node)=>node.stage===stage.id).map((node)=><Link key={node.id} to={localePath(`/capital-map/node/${node.id.toLowerCase()}`)}><span>{node.id}</span><strong>{node.title}</strong><small lang="zh-CN">{node.titleZh}</small><p>{node.shortDescription}</p></Link>)}</div></section>}
          {showWellness && <section><h4>Wellness <small lang="zh-CN">健康</small></h4><div className={styles.cards}>{WELLNESS_FOUNDATION_NODES.filter((node)=>node.stage===stage.id).map((node)=><Link key={node.id} to={localePath(`/capital-map/wellness/${node.id.toLowerCase()}`)}><span>{node.id}</span><strong>{node.title}</strong><small lang="zh-CN">{node.titleZh}</small><p>{node.shortDescription}</p></Link>)}</div></section>}
        </div>
      </article>)}
    </section>}

    {showEvents && <section className={styles.eventIndex}><div className={styles.sectionIntro}><h2>Event Radar <span lang="zh-CN">事件雷达</span></h2><p>You do not need to predict the future perfectly. Use the radar to recognize planning windows before choices narrow.</p><p lang="zh-CN">无需完美预测未来。事件雷达帮助你在选择减少之前识别规划窗口。</p></div>
      <div className={styles.statusGuide} aria-label="Event status guide">{EVENT_STATUSES.map((status)=><article key={status.id}><strong>{status.label}<small lang="zh-CN">{status.labelZh}</small></strong><p>{status.description}</p><p lang="zh-CN">{status.descriptionZh}</p></article>)}</div>
      <div className={styles.eventFilters} aria-label="Filter events by category">{EVENT_CATEGORIES.map((category)=><button type="button" key={category.id} aria-pressed={eventCategory===category.id} onClick={()=>setEventCategory(category.id)}>{category.label}<small lang="zh-CN">{category.labelZh}</small></button>)}</div>
      <p className={styles.filterCount} aria-live="polite">Showing {visibleEvents.length} of {LIFE_EVENTS.length} events · 显示 {visibleEvents.length}/{LIFE_EVENTS.length} 个事件</p>
      <div className={styles.eventGrid}>{visibleEvents.map((event)=><Link key={event.id} to={localePath(`/capital-map/event/${event.id}`)}><span>{event.category.replace('_',' ')}</span><h3>{event.title}</h3><h4 lang="zh-CN">{event.titleZh}</h4><p>{event.description}</p></Link>)}</div>
      <p className={styles.privacyNote}>Filters and status reflections are not saved or submitted. · <span lang="zh-CN">筛选和状态观察不会保存或提交。</span></p>
    </section>}
    {view === 'map' && <section className={styles.downloadLibrary}><div className={styles.sectionIntro}><h2>Keep a Working Copy <span lang="zh-CN">保留一份工作底稿</span></h2><p>Eight simple CSV templates help organize facts without creating an account. Downloads happen locally in your browser.</p><p lang="zh-CN">八份简洁CSV模板帮助整理事实，无需注册账户；文件由浏览器本地下载。</p></div><div>{Object.entries(DOWNLOAD_TEMPLATES).map(([id,template])=><article key={id}><h3>{template.title}<small lang="zh-CN">{template.titleZh}</small></h3><button type="button" onClick={()=>downloadTemplate(id)}>Download CSV · 下载CSV</button></article>)}</div><p className={styles.privacyNote}>Do not store passwords, PINs, full SSNs, or full account numbers in these worksheets.</p></section>}
    <footer className={styles.disclaimer}><p>{EDUCATIONAL_DISCLAIMER.en}</p><p lang="zh-CN">{EDUCATIONAL_DISCLAIMER.zh}</p></footer>
  </main>
}
