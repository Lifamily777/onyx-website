import LocaleLabel from "./LocaleLabel";
import Localized from "./Localized";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { CAPITAL_DOMAINS, LIFE_CAPITAL_STAGES, WEALTH_HERO_NODES, WELLNESS_FOUNDATION_NODES, LIFE_EVENTS, EVENT_CATEGORIES, EVENT_STATUSES, DOWNLOAD_TEMPLATES, downloadTemplate, EDUCATIONAL_DISCLAIMER } from '../features/lifeCapitalMap';
import { HERO_JOURNEYS, localized } from '../features/journeyEngine';
import styles from './CapitalMap.module.css';
export default function CapitalMapPage({
  view = 'map'
}) {
  const {
    locale,
    localePath
  } = useLocale();
  useDocumentMeta('ONYX Life Capital Map · 人生资本地图', 'Explore Wealth and Wellness across six life-capital stages with educational tools, events, and practical next steps.');
  const showEntry = view === 'map';
  const showWealth = view === 'wealth';
  const showWellness = view === 'wellness';
  const showEvents = view === 'events';
  const [eventCategory, setEventCategory] = useState('all');
  const visibleEvents = eventCategory === 'all' ? LIFE_EVENTS : LIFE_EVENTS.filter(event => event.category === eventCategory);
  return <main className={`${styles.shell} page-enter`}>
    <header className={styles.hero}>
      <p className={styles.eyebrow}><LocaleLabel value={"TRUST BEFORE TRANSACTION"} /></p>
      <h1><Localized en={<>ONYX Life Capital Map</>} zh={<>人生资本地图</>} /></h1>
      <p><Localized en={<>Wealth and Wellness are two forms of life capital operating across the same six stages.</>} zh={<>财富与健康，是贯穿同一组六个人生阶段的两种生命资本。</>} /></p>
      {showEntry && <Link className={styles.foundationLink} to={localePath('/capital-map/journey')}><Localized en={<>Explore My Capital Journey</>} zh={<>探索我的资本旅程</>} /></Link>}
    </header>
    <nav className={styles.axisNav} aria-label="Life Capital Map views">
      <Link to={localePath('/capital-map')} aria-current={view === 'map' ? 'page' : undefined}><Localized en={<>Map</>} zh={<>全景</>} /></Link>
      {CAPITAL_DOMAINS.map(domain => <Link key={domain.id} to={localePath(`/capital-map/${domain.id}`)} aria-current={view === domain.id ? 'page' : undefined}><Localized en={<><LocaleLabel value={domain.name} /></>} zh={<><LocaleLabel value={domain.nameZh} /></>} /></Link>)}
      <Link to={localePath('/capital-map/events')} aria-current={showEvents ? 'page' : undefined}><Localized en={<>Event Radar</>} zh={<>事件雷达</>} /></Link>
      <Link to={localePath('/capital-map/long-term')}><Localized en={<>5–10 Year Map</>} zh={<>长期地图</>} /></Link>
    </nav>

    {showEntry && <section className={styles.entryExperience}>
      <div className={styles.entryPaths}>
        <article className={styles.primaryEntry}><span><Localized en={<>PRIMARY PATH</>} zh={<>主要入口</>} /></span><h2><Localized en={<>Explore My Capital Journey</>} zh={<>探索我的资本旅程</>} /></h2><p><Localized en={<>Explore real-life decisions, stories, trade-offs, and planning questions across Wealth and Wellness.</>} zh={<>通过真实生活决定、故事、取舍和规划问题，探索财富与健康。</>} /></p><Link to={localePath('/capital-map/journey')}><Localized en={<>Begin the Journey</>} zh={<>开始旅程 →</>} /></Link></article>
        <article><span><Localized en={<>LIFE EVENT</>} zh={<>生活事件</>} /></span><h2><Localized en={<>Something Changed</>} zh={<>有些事情发生了变化</>} /></h2><p><Localized en={<>A transaction, opportunity, family change, health change, move, or retirement window may need attention now.</>} zh={<>交易、机会、家庭或健康变化、搬迁或退休窗口，可能需要现在开始关注。</>} /></p><Link to={localePath('/capital-map/events')}><Localized en={<>Open Event Radar</>} zh={<>打开事件雷达 →</>} /></Link></article>
        <article><span><Localized en={<>OPTIONAL CHECK</>} zh={<>可选检查</>} /></span><h2><Localized en={<>4-Minute Foundation Check</>} zh={<>4分钟基础检查</>} /></h2><p><Localized en={<>Not sure where to begin? Let ONYX highlight areas worth exploring through the existing 18 questions.</>} zh={<>不确定从哪里开始？通过现有18个问题，让黑曜提示值得探索的领域。</>} /></p><Link to={localePath('/foundation')}><Localized en={<>Take the Foundation Check</>} zh={<>开始基础检查 →</>} /></Link></article>
      </div>
      <div className={styles.heroJourneyPreview}><header><span><LocaleLabel value={"THINK → DISCOVER → UNDERSTAND"} /></span><h2><Localized en={<>Three Journeys to Explore Now</>} zh={<>现在可以探索的三条旅程</>} /></h2></header>{HERO_JOURNEYS.map((journey, index) => <Link key={journey.id} to={localePath(`/capital-map/journey/${journey.id}`)}><b><LocaleLabel value={String(index + 1).padStart(2, '0')} /></b><span><strong><LocaleLabel value={localized(journey.title, locale)} /></strong><small><LocaleLabel value={localized(journey.subtitle, locale)} /></small></span><em>→</em></Link>)}</div>
    </section>}

    {!showEntry && !showEvents && <section className={styles.road} aria-labelledby="stages-title"><h2 id="stages-title"><Localized en={<>Six Capital Stages </>} zh={<>六个资本阶段</>} /></h2>
      {LIFE_CAPITAL_STAGES.map(stage => <article key={stage.id} className={styles.stage}>
        <header><span><LocaleLabel value={String(stage.order).padStart(2, '0')} /></span><div><h3><Localized en={<><LocaleLabel value={stage.name} /></>} zh={<><LocaleLabel value={stage.nameZh} /></>} /></h3><p><Localized en={<><LocaleLabel value={stage.description} /></>} zh={<><LocaleLabel value={stage.descriptionZh} /></>} /></p></div></header>
        <div className={styles.domainColumns}>
          {showWealth && <section><h4><Localized en={<>Wealth </>} zh={<>财富</>} /></h4><div className={styles.cards}>{WEALTH_HERO_NODES.filter(node => node.stage === stage.id).map(node => <Link key={node.id} to={localePath(`/capital-map/node/${node.id.toLowerCase()}`)}><Localized en={<><span><LocaleLabel value={node.id} /></span><strong><LocaleLabel value={node.title} /></strong></>} zh={<><LocaleLabel value={node.titleZh} /></>} /><p><LocaleLabel value={node.shortDescription} /></p></Link>)}</div></section>}
          {showWellness && <section><h4><Localized en={<>Wellness </>} zh={<>健康</>} /></h4><div className={styles.cards}>{WELLNESS_FOUNDATION_NODES.filter(node => node.stage === stage.id).map(node => <Link key={node.id} to={localePath(`/capital-map/wellness/${node.id.toLowerCase()}`)}><Localized en={<><span><LocaleLabel value={node.id} /></span><strong><LocaleLabel value={node.title} /></strong></>} zh={<><LocaleLabel value={node.titleZh} /></>} /><p><LocaleLabel value={node.shortDescription} /></p></Link>)}</div></section>}
        </div>
      </article>)}
    </section>}

    {showEvents && <section className={styles.eventIndex}><div className={styles.sectionIntro}><h2><Localized en={<>Event Radar </>} zh={<>事件雷达</>} /></h2><p><Localized en={<>You do not need to predict the future perfectly. Use the radar to recognize planning windows before choices narrow.</>} zh={<>无需完美预测未来。事件雷达帮助你在选择减少之前识别规划窗口。</>} /></p></div>
      <div className={styles.statusGuide} aria-label="Event status guide">{EVENT_STATUSES.map(status => <article key={status.id}><strong><Localized en={<><LocaleLabel value={status.label} /></>} zh={<><LocaleLabel value={status.labelZh} /></>} /></strong><p><Localized en={<><LocaleLabel value={status.description} /></>} zh={<><LocaleLabel value={status.descriptionZh} /></>} /></p></article>)}</div>
      <div className={styles.eventFilters} aria-label="Filter events by category">{EVENT_CATEGORIES.map(category => <button type="button" key={category.id} aria-pressed={eventCategory === category.id} onClick={() => setEventCategory(category.id)}><Localized en={<><LocaleLabel value={category.label} /></>} zh={<><LocaleLabel value={category.labelZh} /></>} /></button>)}</div>
      <p className={styles.filterCount} aria-live="polite"><Localized en={<>Showing {visibleEvents.length} of {LIFE_EVENTS.length} events</>} zh={<>显示 {visibleEvents.length}/{LIFE_EVENTS.length} 个事件</>} /></p>
      <div className={styles.eventGrid}>{visibleEvents.map(event => <Link key={event.id} to={localePath(`/capital-map/event/${event.id}`)}><Localized en={<><span><LocaleLabel value={event.category.replace('_', ' ')} /></span><h3><LocaleLabel value={event.title} /></h3></>} zh={<><LocaleLabel value={event.titleZh} /></>} /><p><LocaleLabel value={event.description} /></p></Link>)}</div>
      <p className={styles.privacyNote}><Localized en={<>Filters and status reflections are not saved or submitted.</>} zh={<>筛选和状态观察不会保存或提交。</>} /></p>
    </section>}
    {view === 'map' && <section className={styles.downloadLibrary}><div className={styles.sectionIntro}><h2><Localized en={<>Keep a Working Copy </>} zh={<>保留一份工作底稿</>} /></h2><p><Localized en={<>Eight simple CSV templates help organize facts without creating an account. Downloads happen locally in your browser.</>} zh={<>八份简洁CSV模板帮助整理事实，无需注册账户；文件由浏览器本地下载。</>} /></p></div><div>{Object.entries(DOWNLOAD_TEMPLATES).map(([id, template]) => <article key={id}><h3><Localized en={<><LocaleLabel value={template.title} /></>} zh={<><LocaleLabel value={template.titleZh} /></>} /></h3><button type="button" onClick={() => downloadTemplate(id)}><Localized en={<>Download CSV</>} zh={<>下载CSV</>} /></button></article>)}</div><p className={styles.privacyNote}><LocaleLabel value={"Do not store passwords, PINs, full SSNs, or full account numbers in these worksheets."} /></p></section>}
    <footer className={styles.disclaimer}><p><Localized en={<><LocaleLabel value={EDUCATIONAL_DISCLAIMER.en} /></>} zh={<><LocaleLabel value={EDUCATIONAL_DISCLAIMER.zh} /></>} /></p></footer>
  </main>;
}
