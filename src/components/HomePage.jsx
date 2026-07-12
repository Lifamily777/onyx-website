import React from 'react'
import { brand, advisor, personas, services, flywheel } from '../data/content'
import WatchButton from './WatchButton'
import styles from './HomePage.module.css'

export default function HomePage({ setPage, openVideo, servicePages }) {
  return (
    <div className={`${styles.wrap} page-enter`}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>{brand.name}</p>
        <p className={styles.heroEyebrowZh}>{brand.nameZh}</p>
        <h1 className={styles.heroTitle}>
          Reduce entropy.<br />
          Compound order.
        </h1>
        <p className={styles.heroSub}>
          税务熵减 · 风险熵减 · 生理熵减
        </p>
        <p className={styles.heroDesc}>
          A closed-loop system for families and business owners across North America — minimizing
          tax leakage, engineering lasting protection, and calibrating long-term health, all in
          one structure.
        </p>
        <div className={styles.heroLinks}>
          <button className={styles.linkPrimary} onClick={() => setPage('contact')}>
            Run Free Diagnostic
          </button>
          <button className={styles.linkSecondary} onClick={() => setPage('tax')}>
            Learn more ›
          </button>
        </div>
      </section>

      {/* ── ADVISOR STRIP ── */}
      <section className={styles.advisorStrip}>
        <div className={styles.advisorInner}>
          <div className={styles.advisorInfo}>
            <p className={styles.advisorLabel}>System Architect</p>
            <h2 className={styles.advisorName}>{advisor.name}</h2>
            <p className={styles.advisorRole}>{advisor.role}</p>
          </div>
          <div className={styles.credList}>
            {advisor.credentials.map((c, i) => (
              <div key={i} className={styles.cred}>
                <span className={styles.credEn}>{c.en}</span>
                <span className={styles.credZh}>{c.zh}</span>
              </div>
            ))}
          </div>
          <a className={styles.emailLink} href={`mailto:${advisor.email}`}>
            {advisor.email}
          </a>
        </div>
      </section>

      {/* ── SERVICE TILES (Apple product-style) ── */}
      {services.map((s, i) => (
        <section
          key={s.id}
          className={`${styles.tile} ${i % 2 === 0 ? styles.tileDark : styles.tileLight}`}
        >
          <p className={styles.tileEyebrow}>{s.en} · {s.zh}</p>
          <h2 className={styles.tileTitle}>{s.desc.split('—')[0].trim()}</h2>
          <p className={styles.tileDesc}>{s.descZh}</p>
          <div className={styles.tileLinks}>
            <button className={styles.tileLink} onClick={() => setPage(s.id)}>
              Learn more ›
            </button>
            <WatchButton
              variant={i % 2 === 0 ? 'light' : 'dark'}
              onClick={() => openVideo(servicePages[s.id].video)}
            />
          </div>
        </section>
      ))}

      {/* ── PERSONAS ── */}
      <section className={styles.personas}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Three profiles. One system.</h2>
          <p className={styles.sectionSub}>三类家庭，一套系统闭环</p>
        </div>
        <div className={styles.pgrid}>
          {personas.map((p) => (
            <article key={p.num} className={styles.pcard} onClick={() => setPage(p.page)}>
              <span className={styles.pNum}>{p.num}</span>
              <h3 className={styles.pName}>{p.en}</h3>
              <p className={styles.pNameZh}>{p.zh}</p>
              <p className={styles.pAge}>{p.age}</p>
              <p className={styles.pDesc}>{p.desc}</p>
              <p className={styles.pDescZh}>{p.descZh}</p>
              <div className={styles.pTags}>
                {p.tags.map((t) => <span key={t} className={styles.ptag}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── FLYWHEEL ── */}
      <section className={styles.method}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{brand.method}</h2>
          <p className={styles.sectionSub}>{brand.methodZh} · 输入无序，输出有序</p>
        </div>
        <div className={styles.fwgrid}>
          {flywheel.map((fw) => (
            <div key={fw.num} className={styles.fw}>
              <span className={styles.fwN}>{fw.num}</span>
              <h3 className={styles.fwEn}>{fw.en}</h3>
              <p className={styles.fwZh}>{fw.zh}</p>
              <p className={styles.fwDescEn}>{fw.descEn}</p>
              <p className={styles.fwDescZh}>{fw.descZh}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to close the loop?</h2>
        <p className={styles.ctaSub}>15 minutes. Zero obligation. 系统诊断，即刻启动。</p>
        <button className={styles.ctaBtn} onClick={() => setPage('contact')}>
          Run Free Diagnostic
        </button>
        <a className={styles.ctaEmail} href={`mailto:${advisor.email}`}>
          Or email us at {advisor.email}
        </a>
      </section>

    </div>
  )
}
