import React, { useState } from 'react'
import { advisor } from '../data/content'
import styles from './ContactPage.module.css'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className={`${styles.wrap} page-enter`}>
      <div className={styles.grid}>

        {/* ── LEFT ── */}
        <div className={styles.left}>
          <h1 className={styles.h1}>Book Your Free Consultation.</h1>
          <div className={styles.h1Zh}>预约免费咨询</div>
          <p className={styles.pEn}>
            15 minutes. We'll understand your situation and show you exactly what's
            possible across tax planning, insurance, and wellness.
          </p>
          <p className={styles.pZh}>
            15分钟，评估筹税、保障、健康三个维度能做到什么。
          </p>
          <div className={styles.am}>
            <div className={styles.amName}>{advisor.name}</div>
            <div className={styles.amRole}>{advisor.role}</div>
            {[
              { label: <a href={`mailto:${advisor.email}`}>{advisor.email}</a> },
              { label: 'English & Mandarin · 中英文服务' },
              { label: 'Virtual or in-person · 线上或线下均可' },
              { label: 'Response within 24 hours · 24小时内回复' },
            ].map((r, i) => (
              <div key={i} className={styles.amRow}>
                <span className={styles.amDot} />
                {r.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT (form) ── */}
        <div className={styles.right}>
          {submitted ? (
            <div className={styles.thanks}>
              <div className={styles.thanksTitle}>Thank you · 感谢您的预约</div>
              <p className={styles.thanksSub}>
                We'll be in touch within 24 hours.<br />
                我们将在24小时内与您联系。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.fld}>
                <label>Full Name · 姓名</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className={styles.fld}>
                <label>Contact · 联系方式</label>
                <input type="text" placeholder="Email, phone, or WeChat ID" required />
              </div>
              <div className={styles.fld}>
                <label>Preferred Language · 语言偏好</label>
                <select>
                  <option>English</option>
                  <option>中文 (Mandarin)</option>
                  <option>Both / 中英文均可</option>
                </select>
              </div>
              <div className={styles.fld}>
                <label>Your Situation · 您的情况</label>
                <select>
                  <option>Business owner — tax optimization · 企业主，想优化税务</option>
                  <option>Young family — health &amp; protection · 年轻家庭，健康与保障</option>
                  <option>40–55, starting wellness journey · 40+，开始认真养生</option>
                  <option>All three — full planning · 三者都需要，整体规划</option>
                </select>
              </div>
              <div className={styles.fld}>
                <label>Tell Us More · 简单说说（可选）</label>
                <textarea
                  placeholder="e.g. High blood sugar, overpaying taxes, child's immunity... · 例如：血糖偏高、税交太多、孩子免疫力差……"
                />
              </div>
              <button type="submit" className={styles.submit}>
                Submit · 提 交 预 约
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
