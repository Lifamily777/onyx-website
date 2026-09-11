import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import LanguageSwitcher from './LanguageSwitcher'
import { instagramUrl, youtubeChannelUrl } from '../data/content'
import styles from './Footer.module.css'

export default function Footer() {
  const { t, locale, localePath } = useLocale()

  const columns = [
    { label: locale === 'zh' ? '了解现状' : 'Assess', to: localePath('/profile') },
    { label: locale === 'zh' ? '理解策略' : 'Strategize', to: localePath('/strategies') },
    { label: locale === 'zh' ? '构建未来' : 'Build', to: localePath('/build') },
    { label: locale === 'zh' ? '持续学习' : 'Learn', to: localePath('/learn') },
    { label: t('footer.columns.about'), to: localePath('/about') },
    { label: t('footer.columns.insights'), to: localePath('/insights') },
    { label: t('footer.columns.assessment'), to: localePath('/capital-map') },
    { label: t('footer.columns.wellness'), to: localePath('/capital-map/wellness') },
    { label: t('footer.columns.contact'), to: localePath('/contact') },
  ]

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
            <span className={styles.descriptor}>{locale === 'zh' ? '为 W-2 专业人士、1099 收入者与小企业主提供以教育为先的指导。' : 'Education-first guidance for W-2 professionals, 1099 earners and small business owners.'}</span>
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

          <nav className={styles.columns} aria-label="Footer">
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

        <p className={styles.disclaimer}>{t('footer.disclaimer')}</p>

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
