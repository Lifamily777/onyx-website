import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import { checkup } from '../locales/checkup'
import LanguageSwitcher from './LanguageSwitcher'
import GlobalSearch from './GlobalSearch'
import styles from './Nav.module.css'

export default function Nav() {
  const { locale, localePath } = useLocale()
  const c = checkup[locale] || checkup.en
  const targets = ['', '#who-we-help', '#our-approach', '#about', '#contact']
  return <nav className={styles.nav} aria-label={locale === 'zh' ? '主导航' : 'Main navigation'}>
    <div className={styles.inner}>
      <Link to={localePath('/')} className={styles.logo}>
        <span className={styles.logoName}>ONYX WW</span>
        <span className={styles.officialName}>{locale === 'zh' ? '黑曜财康' : 'Onyx Wealth and Wellness'}</span>
      </Link>
      <div className={styles.links}>{c.nav.map((label, i) => <Link key={label} className={styles.nb} to={`${localePath('/')}${targets[i]}`}>{label}</Link>)}</div>
      <div className={styles.actions}><GlobalSearch /><LanguageSwitcher /></div>
    </div>
  </nav>
}
