import { useLocale } from '../i18n/LocaleContext'
import styles from './WatchButton.module.css'

export default function WatchButton({ onClick, size = 'sm', variant = 'dark' }) {
  const { t } = useLocale()
  return (
    <button
      className={`${styles.btn} ${styles[size]} ${styles[variant]}`}
      onClick={onClick}
    >
      <span className={styles.icon}>
        <span className={styles.triangle} />
      </span>
      {t('common.watchLabel')}
    </button>
  )
}
