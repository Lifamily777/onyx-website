import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './TaxPenaltyArticlePage.module.css'
import ctaStyles from './TaxPenaltyCta.module.css'

export default function TaxPenaltyArticlePage({ insight }) {
  const { locale, localePath, t } = useLocale()
  const data = insight.content[locale === 'zh' ? 'zh' : 'en']
  const familyLabels = insight.layout === 'taxStoryEditorial'
  useDocumentMeta(data.seoTitle, data.seoDescription, {siteName:'ONYX Wealth & Wellness',structuredData:{'@context':'https://schema.org','@type':'Article',headline:data.title,description:data.seoDescription,datePublished:insight.publishDate,inLanguage:locale==='zh'?'zh-CN':'en-US',author:{'@type':'Person',name:insight.author},publisher:{'@type':'Organization',name:'ONYX Wealth & Wellness'}}})

  return <main className={`${styles.wrap} page-enter`}><article>
    <header className={styles.hero}><p className={styles.eyebrow}>{insight.category} · ONYX INSIGHT #{String(insight.insightNumber).padStart(3,'0')}</p><h1>{data.title}</h1><p className={styles.subtitle}>{data.subtitle}</p><div className={styles.byline}><strong>{insight.author}</strong><span>{insight.authorTitle}</span><small>{data.readingTime} {t('insightsPage.minReadSuffix')}</small></div></header>
    <section className={styles.intro}>{data.intro.map((p,i)=><p key={i}>{p}</p>)}</section>
    <section className={styles.people} aria-label={locale==='zh'?'四个案例人物':'Four example taxpayers'}>{data.people.map(person=><article key={person.name}><span>{person.name}</span><p>{person.label}</p><strong>{person.rate}</strong></article>)}</section>
    <div className={styles.body}>{data.sections.map(section=><section className={styles.section} key={section.title}><p className={styles.sectionEyebrow}>{section.eyebrow}</p><h2>{section.title}</h2>{section.paragraphs.map((p,i)=><p key={i}>{p}</p>)}<div className={styles.formula}>{section.formula}</div><aside>{section.takeaway}</aside></section>)}</div>
    <section className={styles.taxMap}><p className={styles.sectionEyebrow}>ONYX TAX MAP</p><h2>{data.mapTitle}</h2><p>{data.mapIntro}</p><ol>{data.mapItems.map(item=><li key={item}>{item}</li>)}</ol><blockquote>{data.mapRule}</blockquote><p>{data.mapClose}</p></section>
    <section className={styles.comparison}><h2>{data.comparisonTitle}</h2><div>{data.comparison.map(item=><article key={item.name}><h3>{item.name}</h3><dl><dt>{locale==='zh'?(familyLabels?'需要检查':'触发条件'):(familyLabels?'Situation to check':'Trigger')}</dt><dd>{item.trigger}</dd><dt>{locale==='zh'?(familyLabels?'可能处理':'罚金比例'):(familyLabels?'Possible treatment':'Penalty rate')}</dt><dd className={styles.rate}>{item.rate}</dd><dt>{locale==='zh'?(familyLabels?'税务概念':'计算基数'):(familyLabels?'Tax concept':'Base')}</dt><dd>{item.base}</dd></dl></article>)}</div></section>
    <p className={styles.ending}>{data.ending}</p>
    {data.cta&&<aside className={ctaStyles.cta}><h2>{data.cta.title}</h2><p>{data.cta.body}</p><Link to={localePath(data.cta.path)}>{data.cta.label}</Link></aside>}
    <footer className={styles.footer}><section><h2>{data.sourcesTitle}</h2><ul>{data.sources.map(source=><li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></section><p>{data.disclaimer}</p><Link to={localePath('/insights')}>{t('insightsPage.backToIndex')}</Link></footer>
  </article></main>
}
