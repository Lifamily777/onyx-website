import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { CAPITAL_DOMAINS, LIFE_CAPITAL_STAGES, WEALTH_HERO_NODES, WELLNESS_FOUNDATION_NODES, LIFE_EVENTS, EVENT_CATEGORIES, EVENT_STATUSES, DOWNLOAD_TEMPLATES, downloadTemplate, EDUCATIONAL_DISCLAIMER } from '../features/lifeCapitalMap'
import styles from './CapitalMap.module.css'

export default function CapitalMapPage({ view = 'map' }) {
  const { localePath } = useLocale()
  useDocumentMeta('ONYX Life Capital Map · 人生资本地图', 'Explore Wealth and Wellness across six life-capital stages with educational tools, events, and practical next steps.')
  const showWealth = view === 'map' || view === 'wealth'
  const showWellness = view === 'map' || view === 'wellness'
  const showEvents = view === 'events'
  const [eventCategory, setEventCategory] = useState('all')
  const visibleEvents = eventCategory === 'all' ? LIFE_EVENTS : LIFE_EVENTS.filter((event) => event.category === eventCategory)

  return <main className={`${styles.shell} page-enter`}>
    <header className={styles.hero}>
      <p className={styles.eyebrow}>TRUST BEFORE TRANSACTION</p>
      <h1>ONYX Life Capital Map</h1><p className={styles.heroZh} lang="zh-CN">人生资本地图</p>
      <p>Wealth and Wellness are two forms of life capital operating across the same six stages.</p>
      <p lang="zh-CN">财富与健康，是贯穿同一组六个人生阶段的两种生命资本。</p>
      <Link className={styles.foundationLink} to={localePath('/foundation')}>Take the 18-Question Foundation Scan · 完成18题基础扫描</Link>
    </header>
    <nav className={styles.axisNav} aria-label="Life Capital Map views">
      <Link to={localePath('/capital-map')} aria-current={view === 'map' ? 'page' : undefined}>Map · 全景</Link>
      {CAPITAL_DOMAINS.map((domain)=><Link key={domain.id} to={localePath(`/capital-map/${domain.id}`)} aria-current={view === domain.id ? 'page' : undefined}>{domain.name} · {domain.nameZh}</Link>)}
      <Link to={localePath('/capital-map/events')} aria-current={showEvents ? 'page' : undefined}>Event Radar · 事件雷达</Link>
      <Link to={localePath('/capital-map/long-term')}>5–10 Year Map · 长期地图</Link>
    </nav>

    {!showEvents && <section className={styles.road} aria-labelledby="stages-title"><h2 id="stages-title">Six Capital Stages <span lang="zh-CN">六个资本阶段</span></h2>
      {LIFE_CAPITAL_STAGES.map((stage)=><article key={stage.id} className={styles.stage}>
        <header><span>{String(stage.order).padStart(2,'0')}</span><h3>{stage.name}<small lang="zh-CN">{stage.nameZh}</small></h3></header>
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
