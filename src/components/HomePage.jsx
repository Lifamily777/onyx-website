import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { checkup } from '../locales/checkup'
import styles from './HomePage.module.css'

export default function HomePage() {
  const { locale, localePath } = useLocale()
  const c = checkup[locale] || checkup.en
  useDocumentMeta(c.title, c.description, {
    siteName: 'Onyx Wealth and Wellness',
    structuredData: {
      '@context': 'https://schema.org', '@type': 'WebSite',
      name: 'Onyx Wealth and Wellness', alternateName: ['ONYX WW', '黑曜财康'],
      description: c.description, url: `https://onyxww.com${localePath('/')}`,
    },
  })
  return <main className={styles.page} id="home">
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h1>{c.headline}</h1>
        {c.subtitle && <p className={styles.subtitle}>{c.subtitle}</p>}
        <div className={styles.intro}>{c.intro.map(p => <p key={p}>{p}</p>)}</div>
        <Link className={styles.button} to={localePath('/contact')}>{c.cta} <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
    <section className={styles.section} id="who-we-help">
      <p className={styles.eyebrow}>{c.whoLabel}</p><h2>{c.whoTitle}</h2><p className={styles.body}>{c.whoBody}</p>
      <ul className={styles.audience}>{c.whoItems.map(item => <li key={item}>{item}</li>)}</ul>
    </section>
    <section className={`${styles.section} ${styles.approach}`} id="our-approach">
      <p className={styles.eyebrow}>{c.approachLabel}</p><h2>{c.approachTitle}</h2><p className={styles.body}>{c.approachBody}</p>
      <div className={styles.modules}>{c.modules.map(([title, body], i) => <article key={title}><span className={styles.number}>0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>
    <section className={styles.section}>
      <p className={styles.eyebrow}>{c.howLabel}</p><h2>{c.howTitle}</h2>
      <ol className={styles.steps}>{c.steps.map(([title, body]) => <li key={title}><h3>{title}</h3><p>{body}</p></li>)}</ol>
    </section>
    <section className={`${styles.section} ${styles.about}`} id="about">
      <div><p className={styles.eyebrow}>{c.aboutLabel}</p><h2>{c.aboutTitle}</h2></div>
      <div><p>{c.aboutBody}</p><Link to={localePath('/about')}>{c.aboutLink} →</Link><p className={styles.scope}>{c.scope}</p></div>
    </section>
    <section className={`${styles.section} ${styles.contact}`} id="contact">
      <p className={styles.eyebrow}>{c.contactLabel}</p><h2>{c.contactTitle}</h2><p className={styles.body}>{c.contactBody}</p>
      <Link className={styles.button} to={localePath('/contact')}>{c.cta} <span aria-hidden="true">↗</span></Link>
    </section>
  </main>
}
