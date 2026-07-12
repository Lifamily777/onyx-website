import React from 'react'
import { brand, navItems } from '../data/content'
import styles from './Nav.module.css'

export default function Nav({ page, setPage }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => setPage('home')}>
          <span className={styles.logoEn}>{brand.name}</span>
          <span className={styles.logoZh}>{brand.nameZh}</span>
        </button>
        <div className={styles.links}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.nb} ${page === item.id ? styles.on : ''}`}
              onClick={() => setPage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={styles.actions}>
          <button
            className={`${styles.fit} ${page === 'survey' ? styles.fitOn : ''}`}
            onClick={() => setPage('survey')}
          >
            <span className={styles.fitMain}>System Scan</span>
            <span className={styles.fitSub}>免费熵值测评</span>
          </button>
          <button className={styles.cta} onClick={() => setPage('contact')}>
            Run Diagnostic
          </button>
        </div>
      </div>
    </nav>
  )
}
