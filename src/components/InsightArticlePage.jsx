import { useParams, Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { getInsightBySlug, resolveInsightContent } from '../data/insights'
import { getTermsByInsightSlug, resolveTermContent } from '../data/glossary'
import NotFound from './NotFound'
import styles from './InsightArticlePage.module.css'

// Renders a text block's inline content. Most blocks carry plain `text`;
// blocks that need a clickable glossary term instead carry `segments` — a
// mix of plain text runs and { type: 'term', slug, text } runs. Older
// articles only ever use `text`, so this stays fully backward compatible.
function renderInline(block, localePath, styles) {
  if (!block.segments) return block.text
  return block.segments.map((segment, i) => {
    if (segment.type === 'term') {
      return (
        <Link key={i} to={localePath(`/glossary/${segment.slug}`)} className={styles.termLink}>
          {segment.text}
        </Link>
      )
    }
    return <span key={i}>{segment.text}</span>
  })
}

function TableMetaphor() {
  const functions = [
    ['Liquidity', '流动性'],
    ['Growth', '增长'],
    ['Retirement / Tax Efficiency', '退休 / 税务效率'],
    ['Protection', '保障'],
  ]

  return (
    <figure className={styles.tableFigure} aria-label="Four financial functions supporting a stable household plan">
      <div className={styles.tableTop} aria-hidden="true" />
      <div className={styles.tableLegs}>
        {functions.map(([en, zh]) => (
          <div key={en} className={styles.tableLeg}>
            <span>{en}</span>
            <small lang="zh-CN">{zh}</small>
          </div>
        ))}
      </div>
      <figcaption>
        Different functions. Shared stability.
        <span lang="zh-CN">不同的任务，共同支撑一个家庭。</span>
      </figcaption>
    </figure>
  )
}

function BilingualEditorialArticle({ data, t, localePath }) {
  return (
    <div className={`${styles.wrap} ${styles.editorialWrap} page-enter`}>
      <article>
        <header className={styles.editorialHero}>
          <p className={styles.editorialEyebrow}>ONYX INSIGHT</p>
          <h1 className={styles.editorialTitle}>{data.titleEn}</h1>
          <p className={styles.editorialTitleZh} lang="zh-CN">{data.titleZh}</p>
          <div className={styles.editorialSubtitle}>
            <p>{data.subtitleEn}</p>
            <p lang="zh-CN">{data.subtitleZh}</p>
          </div>
          <div className={styles.editorialByline}>
            <strong>{data.author}</strong>
            <span>{data.authorTitle}</span>
            <small>{data.readingTime} {t('insightsPage.minReadSuffix')}</small>
          </div>
        </header>

        <div className={styles.bilingualBody}>
          {data.body.map((block, i) => {
            if (block.type === 'pairHeading') {
              return (
                <section key={i} className={`${styles.pairHeading} ${block.climax ? styles.climaxHeading : ''}`}>
                  <h2>{block.en}</h2>
                  <p lang="zh-CN">{block.zh}</p>
                </section>
              )
            }
            if (block.type === 'tableMetaphor') return <TableMetaphor key={i} />
            return (
              <div
                key={i}
                className={`${styles.pair} ${block.lead ? styles.pairLead : ''} ${block.short ? styles.pairShort : ''} ${block.emphasis ? styles.pairEmphasis : ''}`}
              >
                <p className={styles.pairEn}>{block.en}</p>
                <p className={styles.pairZh} lang="zh-CN">{block.zh}</p>
              </div>
            )
          })}
        </div>

        <blockquote className={styles.editorialQuote}>
          <p>{data.closingQuote.en}</p>
          <p lang="zh-CN">{data.closingQuote.zh}</p>
        </blockquote>

        <footer className={styles.editorialFooter}>
          <div className={styles.authorSignature}>
            <strong>{data.author}</strong>
            <span>{data.authorTitle}</span>
          </div>
          <div className={styles.editorialDisclosure}>
            <p>{data.disclosure.en}</p>
            <p lang="zh-CN">{data.disclosure.zh}</p>
          </div>
          <Link to={localePath('/insights')} className={styles.backLink}>
            {t('insightsPage.backToIndex')}
          </Link>
        </footer>
      </article>
    </div>
  )
}

export default function InsightArticlePage() {
  const { slug } = useParams()
  const { t, locale, localePath } = useLocale()
  const insight = getInsightBySlug(slug)

  if (!insight) return <NotFound />

  const { data, isFallback } = resolveInsightContent(insight, locale)
  const relatedTerms = getTermsByInsightSlug(insight.slug)

  const metaOptions = insight.layout === 'bilingualEditorial'
    ? {
        siteName: t('footer.officialName'),
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.titleEn,
          description: data.seoDescription,
          datePublished: insight.publishDate,
          author: { '@type': 'Person', name: data.author },
          publisher: { '@type': 'Organization', name: 'ONYX Wealth & Wellness Club' },
        },
      }
    : {}

  useDocumentMeta(`${data.title} · ${t('brand.shortName')}`, data.seoDescription, metaOptions)

  if (insight.layout === 'bilingualEditorial') {
    return <BilingualEditorialArticle data={data} t={t} localePath={localePath} />
  }

  return (
    <div className={`${styles.wrap} page-enter`}>
      <article>
        <p className={styles.eyebrow}>{t('insightsPage.eyebrow')}</p>

        {insight.pillarLabel && insight.insightNumber && (
          <p className={styles.badges}>
            <span className={styles.badge}>{insight.pillarLabel}</span>
            <span className={styles.badge}>{t('brand.shortName')} Insight #{String(insight.insightNumber).padStart(3, '0')}</span>
          </p>
        )}

        {isFallback && (
          <p className={styles.languageNotice}>{t('insightsPage.languageNotice')}</p>
        )}

        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
        <p className={styles.meta}>{data.readingTime} {t('insightsPage.minReadSuffix')}</p>

        <div className={styles.body}>
          {data.body.map((block, i) => {
            if (block.type === 'h2') {
              return <h2 key={i} className={styles.h2}>{renderInline(block, localePath, styles)}</h2>
            }
            if (block.type === 'list') {
              return (
                <ul key={i} className={styles.list}>
                  {block.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              )
            }
            if (block.type === 'mission') {
              return <p key={i} className={styles.mission}>{block.text}</p>
            }
            return <p key={i} className={styles.p}>{renderInline(block, localePath, styles)}</p>
          })}
        </div>

        {relatedTerms.length > 0 && (
          <section className={styles.relatedTerms}>
            <p className={styles.sectionLabel}>{t('insightsPage.relatedTermsLabel')}</p>
            <ul className={styles.termList}>
              {relatedTerms.map((term) => {
                const { data: termData } = resolveTermContent(term, locale)
                return (
                  <li key={term.slug}>
                    <Link to={localePath(`/glossary/${term.slug}`)} className={styles.termChip}>
                      {termData.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        <section className={styles.takeaway}>
          <p className={styles.sectionLabel}>{t('insightsPage.takeawayLabel')}</p>
          {data.takeaway.map((line, i) => (
            <p key={i} className={styles.takeawayLine}>{line}</p>
          ))}
        </section>

        <section className={styles.continueLearning}>
          <p className={styles.sectionLabel}>{t('insightsPage.continueLearningLabel')}</p>
          <ul className={styles.clList}>
            {data.continueLearning.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>

        <section className={styles.workWith}>
          <p className={styles.sectionLabel}>{t('insightsPage.workWithOnyxLabel')}</p>
          <p className={styles.workIntro}>{data.workWithOnyx.intro}</p>
          <Link to={localePath('/contact')} className={styles.btnPrimary}>
            {data.workWithOnyx.ctaLabel}
          </Link>
          <ul className={styles.futureList}>
            {data.workWithOnyx.futureOfferings.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>

        <p className={styles.disclaimer}>{data.disclaimer}</p>

        <Link to={localePath('/insights')} className={styles.backLink}>
          {t('insightsPage.backToIndex')}
        </Link>
      </article>
    </div>
  )
}
