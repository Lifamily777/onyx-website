import React from 'react'
import styles from './WatchButton.module.css'

export default function WatchButton({ onClick, size = 'sm', variant = 'dark' }) {
  return (
    <button
      className={`${styles.btn} ${styles[size]} ${styles[variant]}`}
      onClick={onClick}
    >
      <span className={styles.icon}>
        <span className={styles.triangle} />
      </span>
      Watch · 观看
    </button>
  )
}
