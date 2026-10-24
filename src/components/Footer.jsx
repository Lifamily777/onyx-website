import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import LanguageSwitcher from './LanguageSwitcher'
import { instagramUrl, youtubeChannelUrl } from '../data/content'
import styles from './Footer.module.css'
import { checkup } from '../locales/checkup'

export default function Footer() {
  const { t, locale, localePath } = useLocale()

  const c = checkup[locale] || checkup.en
  const columns = ['/profile', '/strategies', '/build', '/learn', '/survey', '/capital-assessment', '/capital-map'].map((path, i) => ({ label: c.resourceLabels[i], to: localePath(path) }))


  const legal = [
    { label: t('footer.legal.privacy'), to: localePath('/privacy') },
    { label: t('footer.legal.terms'), to: localePath('/terms') },
    { label: t('footer.legal.disclosures'), to: localePath('/disclosures') },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <span className={styles.officialName}>{t('footer.officialName')}</span>
            <span className={styles.descriptor}>{c.description}</span>
            <span className={styles.domain}>ONYXWW.com</span>
            <div className={styles.socialLinks}>
              <a
                className={styles.socialLink}
                href={youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
              >
                YouTube · @ONYXWW ↗
              </a>
              <a
                className={styles.socialLink}
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                Instagram · @onyxwealthandwellness ↗
              </a>
            </div>
          </div>

          <nav className={styles.columns} aria-label={c.resources}>
            {columns.map((item) => (
              <Link key={item.to} to={item.to} className={styles.link}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.langBlock}>
            <span className={styles.langLabel}>{t('nav.languageLabel')}</span>
            <LanguageSwitcher className={styles.footerSelect} />
          </div>
        </div>

        <p className={styles.disclaimer}>{c.scope}</p>

        <div className={styles.bottom}>
          <span className={styles.brandLine}>{t('footer.brandLine')}</span>
          <div className={styles.legalLinks}>
            {legal.map((item) => (
              <Link key={item.to} to={item.to} className={styles.legalLink}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
