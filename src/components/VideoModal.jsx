import { useEffect } from 'react'
import styles from './VideoModal.module.css'

export default function VideoModal({ video, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!video) return null

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.box}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <div className={styles.inner}>
          <div className={styles.ey}>{video.ey}</div>
          <div className={styles.title}>{video.title}</div>
          <div className={styles.sub}>{video.sub}</div>

          {/* ── VIDEO AREA ──────────────────────────────────────────
              When youtubeId is set in src/data/content.js,
              the real YouTube player loads automatically.
              Otherwise the "Coming Soon" placeholder is shown.
          ─────────────────────────────────────────────────────── */}
          {video.youtubeId ? (
            <div className={styles.iframeWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                allow="autoplay; fullscreen"
                allowFullScreen
                title={video.title}
              />
            </div>
          ) : (
            <div className={styles.placeholder}>
              <div className={styles.playBtn}>
                <div className={styles.triangle} />
              </div>
              <div className={styles.comingEn}>Video Coming Soon</div>
              <div className={styles.comingZh}>视频即将上线</div>
            </div>
          )}

          <div className={styles.note}>
            {video.youtubeId
              ? 'Click anywhere outside to close · 点击外部关闭'
              : 'Video coming soon — 视频即将上线。\nAdd your YouTube video ID in src/data/content.js to activate.'}
          </div>
        </div>
      </div>
    </div>
  )
}
