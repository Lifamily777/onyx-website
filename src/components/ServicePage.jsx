import { Link, useOutletContext } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import WatchButton from './WatchButton'
import styles from './ServicePage.module.css'

export default function ServicePage({ data }) {
  const { openVideo } = useOutletContext()
  const { locale, localePath, t } = useLocale()
  const content = data.content[locale] || data.content.en

  useDocumentMeta(`${content.h1} · ONYX`)

  function handleWatch() {
    openVideo({ ...content.video, youtubeId: data.videoId })
  }

  return (
    <div className={`${styles.wrap} page-enter`}>

      <section className={styles.svchero}>
        <div className={styles.badge}>{content.badge}</div>
        <h1 className={styles.h1}>{content.h1}</h1>
        <p className={styles.pEn}>{content.p}</p>
        <div className={styles.actions}>
          <Link className={styles.btnGold} to={localePath('/contact')}>
            {content.cta}
          </Link>
          <WatchButton size="md" onClick={handleWatch} />
          {data.channelUrl && (
            <a
              className={styles.channelLink}
              href={data.channelUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('servicePage.youtubeChannelLabel')}
            </a>
          )}
        </div>

        <div className={styles.audience}>
          <div className={styles.ml}>{t('servicePage.targetProfileLabel')}</div>
          {content.audiences.map((a, i) => (
            <div key={i} className={styles.mi}>
              <span className={styles.miDot} />
              {a}
            </div>
          ))}
        </div>
      </section>

      <div className={styles.ptsgrid}>
        {content.points.map((pt, i) => (
          <div key={i} className={styles.pt}>
            <div className={styles.ptEn}>{pt.title}</div>
            <div className={styles.ptDescEn}>{pt.desc}</div>
          </div>
        ))}
      </div>

      <div className={styles.hookbox}>
        <div className={styles.hookEy}>{t('servicePage.fieldDataLabel')}</div>
        <p className={styles.hookEn}>"{content.quote}"</p>
      </div>

      <div className={styles.pcta}>
        <Link className={styles.btnGold} to={localePath('/contact')}>
          {content.cta}
        </Link>
        <WatchButton size="md" onClick={handleWatch} />
        {data.channelUrl && (
          <a
            className={styles.channelLink}
            href={data.channelUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t('servicePage.youtubeChannelLabel')}
          </a>
        )}
      </div>

    </div>
  )
}
