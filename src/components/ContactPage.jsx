import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { advisor } from '../data/content'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './ContactPage.module.css'

export default function ContactPage() {
  const { t, localePath } = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [pending, setPending] = useState(false)
  const [failed, setFailed] = useState(false)
  const inFlight = useRef(false)
  const startedAt = useRef(Date.now())
  const attempt = useRef(null)
  const [searchParams] = useSearchParams()
  const context = (searchParams.get('context') || '').slice(0, 600)
  const eventStatus = (searchParams.get('eventStatus') || '').slice(0, 20)

  useDocumentMeta(`${t('contact.headline')} · ${t('brand.shortName')}`)

  async function handleSubmit(e) {
    e.preventDefault()
    if (inFlight.current || submitted) return
    const fields = Object.fromEntries(new FormData(e.currentTarget))
    const fingerprint = JSON.stringify(fields)
    if (!attempt.current || attempt.current.fingerprint !== fingerprint) {
      attempt.current = { fingerprint, payload: { ...fields, startedAt: startedAt.current, submissionId: crypto.randomUUID() } }
    }
    inFlight.current = true
    setPending(true)
    setFailed(false)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attempt.current.payload), signal: controller.signal,
      })
      const result = await response.json()
      if (!response.ok || result.accepted !== true) throw new Error('not accepted')
      setSubmitted(true)
    } catch {
      setFailed(true)
    } finally {
      clearTimeout(timeout)
      inFlight.current = false
      setPending(false)
    }
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
            <div className={styles.thanks} role="status">
              <div className={styles.thanksTitle}>{t('contact.thanksTitle')}</div>
              <p className={styles.thanksSub}>{t('contact.thanksSub')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} aria-busy={pending}>
              <fieldset disabled={pending} className={styles.fields}>
              <div className={styles.honeypot} aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
              <div className={styles.fld}>
                <label htmlFor="contact-name">{t('contact.form.fullNameLabel')}</label>
                <input id="contact-name" name="name" autoComplete="name" maxLength={100} type="text" placeholder={t('contact.form.fullNamePlaceholder')} required />
              </div>
              <div className={styles.fld}>
                <label htmlFor="contact-email">{t('contact.form.contactLabel')}</label>
                <input id="contact-email" name="email" autoComplete="email" maxLength={254} type="email" placeholder={t('contact.form.contactPlaceholder')} required />
              </div>
              <div className={styles.fld}>
                <label htmlFor="contact-language">{t('contact.form.languageLabel')}</label>
                <select id="contact-language" name="language">
                  {languageOptions.map((opt, i) => <option key={i} value={['en', 'zh', 'both'][i]}>{opt}</option>)}
                </select>
              </div>
              <div className={styles.fld}>
                <label htmlFor="contact-situation">{t('contact.form.situationLabel')}</label>
                <select id="contact-situation" name="situation">
                  {situationOptions.map((opt, i) => <option key={i} value={['business', 'family', 'wellness', 'planning'][i]}>{opt}</option>)}
                </select>
              </div>
              <div className={styles.fld}>
                <label htmlFor="contact-message">{t('contact.form.moreLabel')}</label>
                <textarea id="contact-message" name="message" maxLength={3000}
                  aria-label={t('contact.form.moreLabel')}
                  placeholder={t('contact.form.morePlaceholder')}
                  defaultValue={[context, eventStatus ? `Event status: ${eventStatus}` : ''].filter(Boolean).join('\n')}
                />
              </div>
              <p className={styles.privacy}>{t('contact.privacyNote')} <Link to={localePath('/privacy')}>{t('placeholders.privacy.title')}</Link></p>
              {failed && <p role="alert" className={styles.error}>{t('contact.failure')}</p>}
              <button disabled={pending} type="submit" className={styles.submit}>
                {pending ? t('contact.sending') : t('contact.form.submit')}
              </button>
              </fieldset>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
