import { useNavigate, useLocation } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import { SUPPORTED_LOCALES, LOCALE_LABELS, buildLocalePath, parseLocaleFromPath } from '../i18n/config'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher({ className = '' }) {
  const { locale, t } = useLocale()
  const location = useLocation()
  const navigate = useNavigate()

  function handleChange(e) {
    const nextLocale = e.target.value
    const { subpath } = parseLocaleFromPath(location.pathname)
    navigate(buildLocalePath(nextLocale, subpath))
  }

  return (
    <select
      className={`${styles.select} ${className}`}
      value={locale}
      onChange={handleChange}
      aria-label={t('nav.languageLabel')}
    >
      {SUPPORTED_LOCALES.map((loc) => (
        <option key={loc} value={loc}>
          {LOCALE_LABELS[loc]}
        </option>
      ))}
    </select>
  )
}
