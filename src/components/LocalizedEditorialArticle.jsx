import { Link } from 'react-router-dom'
import styles from './InsightArticlePage.module.css'
import localStyles from './LocalizedEditorialArticle.module.css'

// Only emphasis is supported; article content remains text, never injected HTML.
function InlineText({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => (
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  ))
}

export default function LocalizedEditorialArticle({ data, resolvedLocale, isFallback, t, localePath }) {
  return (
    <div className={`${styles.wrap} ${styles.insuranceWrap} ${localStyles.article} page-enter`}>
      <article lang={resolvedLocale === 'zh' ? 'zh-Hans' : 'en'}>
        <header>
          <p className={styles.eyebrow}>ONYX INSIGHT</p>
          <p className={styles.badges}><span className={styles.badge}>{data.category}</span></p>
          {isFallback && <p className={styles.languageNotice}>{t('insightsPage.languageNotice')}</p>}
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.subtitle}>{data.subtitle}</p>
          <p className={styles.meta}>{data.readingTime} {t('insightsPage.minReadSuffix')}</p>
        </header>
        <div className={styles.body}>
          {data.body.map((block, i) => {
            if (block.type === 'h2') return <h2 key={i} className={styles.h2}>{block.text}</h2>
            if (block.type === 'buckets') return (
              <section key={i} aria-labelledby="capital-buckets-title">
                <h3 id="capital-buckets-title" className={styles.h2}>{data.bucketsTitle}</h3>
                <div className={`${styles.questionGrid} ${localStyles.buckets}`}>
                  {data.buckets.map((bucket) => <section key={bucket.title}>
                    <h4>{bucket.title}</h4>
                    {bucket.originalLabel && <p>{bucket.originalLabel}</p>}
                    <p>{bucket.examples}</p>
                    <p>{bucket.description}</p>
                  </section>)}
                </div>
              </section>
            )
            if (block.type === 'questions') return (
              <div key={i} className={styles.questionGrid}>
                {data.questions.map((item) => <section key={item.label}>
                  <h3>{resolvedLocale === 'zh' ? `看到“${item.label}”，问：` : item.label}</h3>
                  <p><strong>{item.question}</strong></p>
                </section>)}
              </div>
            )
            return <p key={i} className={styles.p}><InlineText text={block.text} /></p>
          })}
        </div>
        <aside className={styles.sourceList}>
          <h2>{data.notesTitle}</h2>
          {data.notes.map((note) => <p key={note}>{note}</p>)}
        </aside>
        <footer>
          <section className={styles.sourceList}>
            <h2>{data.sourcesTitle}</h2>
            <ul>{data.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul>
          </section>
          <p className={styles.disclaimer}>{data.disclaimer}</p>
          <Link to={localePath('/insights')} className={styles.backLink}>{t('insightsPage.backToIndex')}</Link>
        </footer>
      </article>
    </div>
  )
}
