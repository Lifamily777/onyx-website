import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { CAPITAL_DOMAINS, LIFE_CAPITAL_STAGES, WEALTH_HERO_NODES, WELLNESS_STAGE_NODES, LIFE_EVENTS, EDUCATIONAL_DISCLAIMER } from '../features/lifeCapitalMap'
import styles from './CapitalMap.module.css'

export default function CapitalMapPage({ view = 'map' }) {
  const { localePath } = useLocale()
  useDocumentMeta('ONYX Life Capital Map · 人生资本地图', 'Explore Wealth and Wellness across six life-capital stages with educational tools, events, and practical next steps.')
  const showWealth = view === 'map' || view === 'wealth'
  const showWellness = view === 'map' || view === 'wellness'
  const showEvents = view === 'events'

  return <main className={`${styles.shell} page-enter`}>
    <header className={styles.hero}>
      <p className={styles.eyebrow}>TRUST BEFORE TRANSACTION</p>
      <h1>ONYX Life Capital Map</h1><p className={styles.heroZh} lang="zh-CN">人生资本地图</p>
      <p>Wealth and Wellness are two forms of life capital operating across the same six stages.</p>
      <p lang="zh-CN">财富与健康，是贯穿同一组六个人生阶段的两种生命资本。</p>
    </header>
    <nav className={styles.axisNav} aria-label="Life Capital Map views">
      <Link to={localePath('/capital-map')} aria-current={view === 'map' ? 'page' : undefined}>Map · 全景</Link>
      {CAPITAL_DOMAINS.map((domain)=><Link key={domain.id} to={localePath(`/capital-map/${domain.id}`)} aria-current={view === domain.id ? 'page' : undefined}>{domain.name} · {domain.nameZh}</Link>)}
      <Link to={localePath('/capital-map/events')} aria-current={showEvents ? 'page' : undefined}>Event Radar · 事件雷达</Link>
    </nav>

    {!showEvents && <section className={styles.road} aria-labelledby="stages-title"><h2 id="stages-title">Six Capital Stages <span lang="zh-CN">六个资本阶段</span></h2>
      {LIFE_CAPITAL_STAGES.map((stage)=><article key={stage.id} className={styles.stage}>
        <header><span>{String(stage.order).padStart(2,'0')}</span><h3>{stage.name}<small lang="zh-CN">{stage.nameZh}</small></h3></header>
        <div className={styles.domainColumns}>
          {showWealth && <section><h4>Wealth <small lang="zh-CN">财富</small></h4><div className={styles.cards}>{WEALTH_HERO_NODES.filter((node)=>node.stage===stage.id).map((node)=><Link key={node.id} to={localePath(`/capital-map/node/${node.id.toLowerCase()}`)}><span>{node.id}</span><strong>{node.title}</strong><small lang="zh-CN">{node.titleZh}</small><p>{node.shortDescription}</p></Link>)}</div></section>}
          {showWellness && <section><h4>Wellness <small lang="zh-CN">健康</small></h4><div className={styles.cards}>{WELLNESS_STAGE_NODES.filter((node)=>node.stage===stage.id).map((node)=><div key={node.id} className={styles.structuralCard}><span>{node.id}</span><strong>{node.title}</strong><small lang="zh-CN">{node.titleZh}</small><p>Education-first pathway · 教育优先路径</p></div>)}</div></section>}
        </div>
      </article>)}
    </section>}

    {showEvents && <section className={styles.eventIndex}><div className={styles.sectionIntro}><h2>Event Radar <span lang="zh-CN">事件雷达</span></h2><p>You do not need to predict the future perfectly. Mark what you are watching, considering, or actively navigating.</p><p lang="zh-CN">无需完美预测未来，只需标记你正在关注、考虑或已经经历的事件。</p></div><div className={styles.eventGrid}>{LIFE_EVENTS.map((event)=><Link key={event.id} to={localePath(`/capital-map/event/${event.id}`)}><span>{event.category.replace('_',' ')}</span><h3>{event.title}</h3><h4 lang="zh-CN">{event.titleZh}</h4><p>{event.description}</p></Link>)}</div></section>}
    <footer className={styles.disclaimer}><p>{EDUCATIONAL_DISCLAIMER.en}</p><p lang="zh-CN">{EDUCATIONAL_DISCLAIMER.zh}</p></footer>
  </main>
}
