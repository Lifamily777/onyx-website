import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { EDUCATIONAL_DISCLAIMER, getWellnessNode, LIFE_CAPITAL_STAGES } from '../features/lifeCapitalMap'
import NotFound from './NotFound'
import styles from './CapitalMap.module.css'

export default function WellnessNodePage() {
  const { id } = useParams()
  const { localePath } = useLocale()
  const node = getWellnessNode(id)
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState([])
  useDocumentMeta(node ? `${node.title} | ONYX Wellness Map` : 'Wellness node not found', node?.shortDescription || '')
  if (!node) return <NotFound />

  const stage = LIFE_CAPITAL_STAGES.find((item) => item.id === node.stage)
  const toggle = (item) => setChecked((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])

  return <main className={`${styles.shell} ${styles.detail} page-enter`}>
    <Link className={styles.back} to={localePath('/capital-map/wellness')}>← Wellness Map · 健康地图</Link>
    <header className={styles.detailHero}><p>{node.id} · {stage.name} · <span lang="zh-CN">{stage.nameZh}</span></p><h1>{node.title}</h1><h2 lang="zh-CN">{node.titleZh}</h2><p>{node.shortDescription}</p><p lang="zh-CN">{node.shortDescriptionZh}</p></header>

    <section className={styles.ask}><span>QUESTION · 真实问题</span><h2>{node.question.prompt}</h2><p lang="zh-CN">{node.question.promptZh}</p><div>{node.question.options.map((option) => <button type="button" key={option} aria-pressed={answer === option} onClick={() => setAnswer(option)}>{option}</button>)}</div>{answer && <p className={styles.reflectionResult}>Your reflection: <strong>{answer}</strong>. This is not a score or diagnosis.<br /><span lang="zh-CN">你的观察：<strong>{answer}</strong>。这不是评分或诊断。</span></p>}</section>
    <section className={styles.story}><span>STORY · 生活案例</span><h2>{node.story.title}</h2><h3 lang="zh-CN">{node.story.titleZh}</h3><p>{node.story.body}</p><p lang="zh-CN">{node.story.bodyZh}</p></section>
    <section className={styles.prose}><span>EXPLAIN · 解释概念</span><p>{node.explain.body}</p><p lang="zh-CN">{node.explain.bodyZh}</p></section>

    <section className={styles.tool}><span>TRY · 自己试一试</span><h2>Private reflection checklist <small lang="zh-CN">私人观察清单</small></h2><p>Selections stay only on this page and are not submitted or saved.</p><p lang="zh-CN">选择仅保留在当前页面，不会提交或保存。</p><div className={styles.checkGrid}>{node.tryItems.map((item) => <label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={() => toggle(item)} />{item}</label>)}</div><div className={styles.progressText} aria-live="polite">{checked.length} of {node.tryItems.length} reflected on · 已观察 {checked.length}/{node.tryItems.length}</div></section>
    <section className={styles.keep}><span>KEEP · 留下工具</span><h2>{node.keep.title}<small lang="zh-CN">{node.keep.titleZh}</small></h2><p>{node.keep.note}</p><p lang="zh-CN">{node.keep.noteZh}</p></section>
    <section className={styles.guidance}><article><span>SELF-MANAGE?</span><h2>What you may organize yourself</h2><h3 lang="zh-CN">可以先自行整理什么</h3><p>{node.selfManage.body}</p><p lang="zh-CN">{node.selfManage.bodyZh}</p></article><article><span>DEEPER REVIEW?</span><h2>When qualified review may help</h2><h3 lang="zh-CN">何时值得寻求合格专业意见</h3><p>{node.deeperReview.body}</p><p lang="zh-CN">{node.deeperReview.bodyZh}</p><ul>{node.deeperReview.triggers.map((trigger) => <li key={trigger}>{trigger}</li>)}</ul></article></section>
    <section className={styles.askSammi}><span>ASK SAMMI</span><h2>Organize the question before sharing information.</h2><p lang="zh-CN">先整理问题，再决定需要分享什么信息。</p><Link to={`${localePath('/contact')}?context=${encodeURIComponent(node.askSammiContext)}`}>Ask Sammi with context · 带背景联系Sammi</Link></section>
    <footer className={styles.disclaimer}><p>Wellness content is educational and does not diagnose, treat, or replace care from qualified health professionals.</p><p lang="zh-CN">健康内容仅用于教育，不提供诊断或治疗，也不能替代合格医疗专业人员的照护。</p><p>{EDUCATIONAL_DISCLAIMER.en}</p><p lang="zh-CN">{EDUCATIONAL_DISCLAIMER.zh}</p></footer>
  </main>
}
