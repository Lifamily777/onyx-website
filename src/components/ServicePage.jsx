import React from 'react'
import WatchButton from './WatchButton'
import styles from './ServicePage.module.css'

export default function ServicePage({ data, setPage, openVideo }) {
  return (
    <div className={`${styles.wrap} page-enter`}>

      <section className={styles.svchero}>
        <div className={styles.badge}>{data.badge}</div>
        <h1 className={styles.h1}>{data.h1}</h1>
        <div className={styles.h1Zh}>{data.h1Zh}</div>
        <p className={styles.pEn}>{data.p}</p>
        <p className={styles.pZh}>{data.pZh}</p>
        <div className={styles.actions}>
          <button className={styles.btnGold} onClick={() => setPage('contact')}>
            {data.cta}
          </button>
          <WatchButton size="md" onClick={() => openVideo(data.video)} />
        </div>

        <div className={styles.audience}>
          <div className={styles.ml}>Who This Serves · 适合人群</div>
          {data.audiences.map((a, i) => (
            <div key={i} className={styles.mi}>
              <span className={styles.miDot} />
              {a.en}
              <span className={styles.miZh}>{a.zh}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.ptsgrid}>
        {data.points.map((pt, i) => (
          <div key={i} className={styles.pt}>
            <div className={styles.ptEn}>{pt.en}</div>
            <div className={styles.ptZh}>{pt.zh}</div>
            <div className={styles.ptDescEn}>{pt.descEn}</div>
            <div className={styles.ptDescZh}>{pt.descZh}</div>
          </div>
        ))}
      </div>

      <div className={styles.hookbox}>
        <div className={styles.hookEy}>Client Story · 真实场景</div>
        <p className={styles.hookEn}>"{data.quote.en}"</p>
        <p className={styles.hookZh}>{data.quote.zh}</p>
      </div>

      <div className={styles.pcta}>
        <button className={styles.btnGold} onClick={() => setPage('contact')}>
          {data.cta}
        </button>
        <WatchButton size="md" onClick={() => openVideo(data.video)} />
      </div>

    </div>
  )
}
