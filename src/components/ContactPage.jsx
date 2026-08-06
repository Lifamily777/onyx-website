import { useState } from 'react'
import { advisor } from '../data/content'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './ContactPage.module.css'

export default function ContactPage() {
  const { t } = useLocale()
  const [submitted, setSubmitted] = useState(false)

  useDocumentMeta(`${t('contact.headline')} · ${t('brand.shortName')}`)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  const languageOptions = t('contact.form.languageOptions')
  const situationOptions = t('contact.form.situationOptions')

  return (
    <div className={`${styles.wrap} page-enter`}>
      <div className={styles.grid}>

        {/* ── LEFT ── */}
        <div className={styles.left}>
          <h1 className={styles.h1}>{t('contact.headline')}</h1>
          <p className={styles.pEn}>{t('contact.supporting')}</p>
          <div className={styles.am}>
            <div className={styles.amName}>{advisor.name}</div>
            <div className={styles.amRole}>{t('contact.sammiRole')}</div>
            {[
              t('contact.languagesLine'),
              t('contact.modalityLine'),
              t('contact.responseLine'),
            ].map((label, i) => (
              <div key={i} className={styles.amRow}>
                <span className={styles.amDot} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT (form) ── */}
        <div className={styles.right}>
          {submitted ? (
            <div className={styles.thanks}>
              <div className={styles.thanksTitle}>{t('contact.thanksTitle')}</div>
              <p className={styles.thanksSub}>{t('contact.thanksSub')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.fld}>
                <label>{t('contact.form.fullNameLabel')}</label>
                <input type="text" placeholder={t('contact.form.fullNamePlaceholder')} required />
              </div>
              <div className={styles.fld}>
                <label>{t('contact.form.contactLabel')}</label>
                <input type="text" placeholder={t('contact.form.contactPlaceholder')} required />
              </div>
              <div className={styles.fld}>
                <label>{t('contact.form.languageLabel')}</label>
                <select>
                  {languageOptions.map((opt, i) => <option key={i}>{opt}</option>)}
                </select>
              </div>
              <div className={styles.fld}>
                <label>{t('contact.form.situationLabel')}</label>
                <select>
                  {situationOptions.map((opt, i) => <option key={i}>{opt}</option>)}
                </select>
              </div>
              <div className={styles.fld}>
                <label>{t('contact.form.moreLabel')}</label>
                <textarea placeholder={t('contact.form.morePlaceholder')} />
              </div>
              <button type="submit" className={styles.submit}>
                {t('contact.form.submit')}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
