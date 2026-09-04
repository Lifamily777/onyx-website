import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { EDUCATIONAL_GUIDANCE_DISCLAIMER, V3_PATHS } from '../data/v3Brand'
import styles from './KnowledgePathPage.module.css'

export default function KnowledgePathPage({ pathId }) {
  const { locale, localePath } = useLocale()
  const zh = locale === 'zh'
  const path = V3_PATHS.find((item) => item.id === pathId)
  const otherPaths = V3_PATHS.filter((item) => item.id !== pathId)
  useDocumentMeta(`${zh ? path.eyebrowZh : path.eyebrow} · ONYX Wealth & Wellness`, zh ? path.descriptionZh : path.description)

  return <main className={`${styles.page} page-enter`}>
    <header className={styles.hero}>
      <p>{zh ? path.subtitleZh : path.subtitle}</p>
      <h1>{zh ? path.eyebrowZh : path.eyebrow}</h1>
      <h2>{zh ? path.titleZh : path.title}</h2>
      <p className={styles.lede}>{zh ? path.descriptionZh : path.description}</p>
      <Link className={styles.primary} to={`${localePath('/contact')}?context=${encodeURIComponent(zh ? path.ctaZh : path.cta)}`}>{zh ? path.ctaZh : path.cta}</Link>
    </header>
    <section className={styles.connects}>
      <p className={styles.eyebrow}>{zh ? '它连接到什么' : 'WHAT IT CONNECTS TO'}</p>
      <h2>{zh ? '先看见结构，再选择下一步。' : 'See the structure before choosing the next move.'}</h2>
      <div>{(zh ? path.topicsZh : path.topics).map((topic) => <span key={topic}>{topic}</span>)}</div>
    </section>
    <section className={styles.method}>
      {[['Discover','发现'],['Understand','理解'],['Decide','决定']].map(([en,cn], index) => <article key={en}><b>0{index + 1}</b><h3>{zh ? cn : en}</h3><p>{zh ? ['发现容易忽略的问题。','理解问题之间的联系与取舍。','在行动仍可逆时作出更清晰的决定。'][index] : ['Surface the question that is easy to overlook.','Understand the connections and trade-offs around it.','Decide with clarity while choices are still open.'][index]}</p></article>)}
    </section>
    <section className={styles.tools}>
      <div><p className={styles.eyebrow}>{zh ? '继续探索' : 'KEEP EXPLORING'}</p><h2>{zh ? '把知识放回你自己的资本地图。' : 'Put the knowledge back into your own Capital Map.'}</h2></div>
      <div className={styles.actions}><Link to={localePath('/capital-map')}>{zh ? '探索我的资本地图' : 'Explore My Capital Map'}</Link><Link to={localePath('/capital-map/events')}>{zh ? '最近发生了变化' : 'Something Changed'}</Link></div>
    </section>
    <nav className={styles.related} aria-label={zh ? '其他知识路径' : 'Other knowledge paths'}>{otherPaths.map((item) => <Link key={item.id} to={localePath(`/${item.id}`)}>{zh ? item.eyebrowZh : item.eyebrow}<small>{zh ? item.subtitleZh : item.subtitle}</small></Link>)}</nav>
    <footer className={styles.disclaimer}>{zh ? EDUCATIONAL_GUIDANCE_DISCLAIMER.zh : EDUCATIONAL_GUIDANCE_DISCLAIMER.en}</footer>
  </main>
}
