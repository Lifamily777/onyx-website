import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import { groupSearchResults, searchAnalytics, searchOnyx } from '../features/search/index.js'
import styles from './GlobalSearch.module.css'

const GROUP_ORDER = ['DECISIONS', 'KNOWLEDGE', 'LIFE EVENTS', 'TOOLS', 'INSIGHTS']
const COPY = {
  en: {
    open: 'Search ONYX', title: 'Search ONYX knowledge', placeholder: 'Try 401(k), S Corp, 529, job change…',
    hint: 'Search decisions, knowledge, life events, tools, and insights.', close: 'Close search',
    popular: 'Popular searches', noResult: 'No exact match yet.', noResultHelp: 'Explore the full map, check life events, or ask Sammi with this topic attached.',
    map: 'Browse Capital Map', events: 'Browse Event Radar', ask: 'Ask Sammi', matched: 'Matched topics',
    groups: { DECISIONS:'Decisions', KNOWLEDGE:'Knowledge', 'LIFE EVENTS':'Life Events', TOOLS:'Tools', INSIGHTS:'Insights' },
  },
  zh: {
    open: '搜索黑曜', title: '搜索黑曜知识库', placeholder: '试试 401(k)、S Corp、529、换工作…',
    hint: '搜索决策、知识、人生事件、工具和洞察。', close: '关闭搜索',
    popular: '常用搜索', noResult: '暂时没有完全匹配的内容。', noResultHelp: '你可以浏览完整地图、查看人生事件，或带着这个主题联系 Sammi。',
    map: '浏览人生资本地图', events: '浏览事件雷达', ask: '联系 Sammi', matched: '匹配主题',
    groups: { DECISIONS:'决策', KNOWLEDGE:'知识', 'LIFE EVENTS':'人生事件', TOOLS:'工具', INSIGHTS:'洞察' },
  },
}

export default function GlobalSearch() {
  const { locale, localePath } = useLocale()
  const c = COPY[locale] || COPY.en
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)
  const results = useMemo(() => searchOnyx(query), [query])
  const groups = useMemo(() => groupSearchResults(results), [results])

  const close = () => {
    setOpen(false)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(true)
      } else if (event.key === 'Escape' && open) {
        event.preventDefault()
        close()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => { document.body.style.overflow = previousOverflow }
  }, [open])

  const trapFocus = (event) => {
    if (event.key !== 'Tab') return
    const focusable = [...dialogRef.current.querySelectorAll('button, a, input')].filter(el => !el.disabled)
    if (!focusable.length) return
    const first = focusable[0], last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }

  const chooseQuery = value => { setQuery(value); searchAnalytics.recordSearch({ query:value, locale }) }
  const resultLabel = item => locale === 'zh' ? (item.titleZh || item.title) : item.title
  const resultDescription = item => locale === 'zh' ? (item.descriptionZh || item.description) : item.description
  const contactPath = localePath(`/contact?context=${encodeURIComponent(`${locale === 'zh' ? '搜索主题' : 'Search topic'}: ${query}`)}`)

  return <>
    <button ref={triggerRef} type="button" className={styles.trigger} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label={c.open}>
      <span className={styles.searchIcon} aria-hidden="true">⌕</span><span className={styles.triggerText}>{c.open}</span><kbd className={styles.shortcut}>⌘K</kbd>
    </button>
    {open && createPortal(<div className={styles.backdrop} onMouseDown={close}>
      <section ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="onyx-search-title" aria-describedby="onyx-search-hint" onKeyDown={trapFocus} onMouseDown={event => event.stopPropagation()}>
        <header className={styles.header}>
          <div><h2 id="onyx-search-title">{c.title}</h2><p id="onyx-search-hint">{c.hint}</p></div>
          <button type="button" className={styles.close} onClick={close} aria-label={c.close}>×</button>
        </header>
        <label className={styles.inputWrap}>
          <span className={styles.visuallyHidden}>{c.title}</span><span aria-hidden="true">⌕</span>
          <input ref={inputRef} type="search" value={query} maxLength="160" onChange={event => chooseQuery(event.target.value)} placeholder={c.placeholder} autoComplete="off" />
        </label>
        <div className={styles.content} aria-live="polite">
          {!query.trim() && <div className={styles.popular}><h3>{c.popular}</h3><div>{['401(k)','S Corp','529',locale === 'zh' ? '换工作' : 'job change'].map(value => <button type="button" key={value} onClick={() => chooseQuery(value)}>{value}</button>)}</div></div>}
          {query.trim() && results.length > 0 && GROUP_ORDER.map(group => groups[group]?.length ? <section className={styles.group} key={group}>
            <h3>{c.groups[group]}</h3>
            {groups[group].map(item => <Link className={styles.result} key={item.id} to={localePath(item.path)} onClick={() => { searchAnalytics.recordClick({ query, id:item.id, locale }); close() }}>
              <span className={styles.resultTop}><strong>{resultLabel(item)}</strong><small>{locale === 'zh' ? c.groups[item.group] : item.type}</small></span>
              {resultDescription(item) && <span className={styles.description}>{resultDescription(item)}</span>}
              {item.matchedTopics.length > 0 && <span className={styles.topics}><b>{c.matched}:</b> {item.matchedTopics.join(' · ')}</span>}
            </Link>)}
          </section> : null)}
          {query.trim() && results.length === 0 && <div className={styles.empty}>
            <h3>{c.noResult}</h3><p>{c.noResultHelp}</p>
            <div><Link to={localePath('/capital-map')} onClick={close}>{c.map}</Link><Link to={localePath('/capital-map/events')} onClick={close}>{c.events}</Link><Link to={contactPath} onClick={() => { searchAnalytics.recordZeroResult({ query, locale }); close() }}>{c.ask}</Link></div>
          </div>}
        </div>
      </section>
    </div>, document.body)}
  </>
}
