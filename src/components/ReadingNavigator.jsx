import { Link, useLocation } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import { getReadingPosition, READING_STAGES, ARCHITECTURE_PATHS, ARCHITECTURE_NODES, ARCHITECTURE_EVENTS, ARCHITECTURE_RESOURCES } from '../features/lifeCapitalMap/navigation'
import { getKnowledgeGuide } from '../features/knowledgeGuides'
import { translateLegacyText } from '../i18n/legacyPresentation'
import styles from './ReadingNavigator.module.css'

export default function ReadingNavigator() {
  const { pathname } = useLocation()
  const { locale, localePath } = useLocale()
  const position = getReadingPosition(pathname)
  const zh = locale === 'zh'
  const text = item => zh ? translateLegacyText(item.zh, 'zh') : item.en
  const guide = position.path.startsWith('/guides/') ? getKnowledgeGuide(position.path.split('/').at(-1)) : null
  const matches = path => position.path === path || position.path.startsWith(path + '/') || Boolean(guide && path === '/' + guide.pathId)
  function tile(item, node = false, active = matches(item.path)) {
    return <Link key={item.path} to={localePath(item.path)} title={text(item)} aria-label={text(item)} aria-current={active ? 'location' : undefined} className={[node ? styles.node : styles.tile, active ? styles.active : ''].join(' ')}>
      {node ? item.id : text(item)}
    </Link>
  }
  return <aside className={styles.panel} aria-label={zh ? '全站架构与当前位置' : 'Site architecture and current position'}>
    <p className={styles.title}>{zh ? '全站架构' : 'The whole ONYX map'}</p>
    <nav aria-label={zh ? '完整架构导航' : 'Full architecture navigation'}>
      <div className={styles.root}>{tile({path:'/',en:'ONYX · Home',zh:'黑曜 · 首页'},false,position.path === '/')}</div>
      <section className={styles.branch}><h2>{zh ? '四个家庭规划方向' : 'Four planning paths'}</h2><div className={styles.paths}>{ARCHITECTURE_PATHS.map(item=>tile(item))}</div></section>
      <section className={styles.branch}><h2>{tile({path:'/capital-map',en:'Life Capital Map',zh:'人生资本地图'},false,position.path === '/capital-map')}</h2>
        <div className={styles.columns}><span>{zh ? '六个层次' : 'Six layers'}</span><span>{zh ? '财富' : 'Wealth'}</span><span>{zh ? '健康' : 'Wellness'}</span></div>
        <ol className={styles.ladder}>{READING_STAGES.map(stage=><li key={stage.id}><span>{text(stage)}</span>{['wealth','wellness'].map(domain=><div className={styles.nodes} key={domain}>{ARCHITECTURE_NODES.filter(node=>node.stage===stage.id&&node.domain===domain).map(node=>tile(node,true,position.path===node.path || Boolean(position.stage===stage.id&&position.domain===domain&&position.path.startsWith('/capital-map/journey/'))))}</div>)}</li>)}</ol>
      </section>
      <section className={styles.branch}><h2>{tile({path:'/capital-map/events',en:'Life events',zh:'生活事件'},false,position.area==='events')}</h2><div className={styles.events}>{ARCHITECTURE_EVENTS.map(item=>tile(item,true))}</div></section>
      {ARCHITECTURE_RESOURCES.map(group=><section className={styles.branch} key={group.en}><h2>{text(group)}</h2><div className={styles.resources}>{group.items.map(item=>tile(item))}</div></section>)}
    </nav>
    <p className={styles.current} aria-live="polite"><span>●</span>{zh ? '当前位置：' : 'Here: '}{text(position)}</p>
    <p className={styles.note}>{zh ? '金色标出当前阅读位置，并非财务评级。' : 'Gold marks your reading location, not a financial rating.'}</p>
  </aside>
}
