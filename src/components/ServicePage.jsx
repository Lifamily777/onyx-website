import { Link, useOutletContext } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import WatchButton from './WatchButton'
import styles from './ServicePage.module.css'

export default function ServicePage({ data }) {
  const { openVideo } = useOutletContext()
  const { locale, localePath, t } = useLocale()
  const content = data.content[locale] || data.content.en

  useDocumentMeta(`${content.h1} · ${t('brand.shortName')}`)

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

      {data.channelVideos?.length > 0 && (
        <section className={styles.videoSection}>
          <div className={styles.videoSectionHeader}>
            <div>
              <p className={styles.videoEyebrow}>YouTube · @ONYXWW</p>
              <h2 className={styles.videoHeading}>{t('servicePage.latestVideosLabel')}</h2>
            </div>
            <a
              className={styles.channelLink}
              href={data.channelUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('servicePage.youtubeChannelLabel')}
            </a>
          </div>
          <div className={styles.videoGrid}>
            {data.channelVideos.map((video) => (
              <a
                key={video.id}
                className={styles.videoCard}
                href={`https://www.youtube.com/shorts/${video.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.videoThumb}>
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                  />
                  <span className={styles.playMark} aria-hidden="true">▶</span>
                </span>
                <span className={styles.videoTitle}>{video.title}</span>
              </a>
            ))}
          </div>
        </section>
      )}

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
