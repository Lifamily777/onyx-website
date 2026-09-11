import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import { queryContentLibrary, presentResource, resourcePath } from '../data/contentLibrary'
import { strategies, textFor } from '../features/onyxProfile/strategies'
import styles from './PhaseOne.module.css'

export default function ContentLibraryView({ categoryId = '', topicId = '', contextual = false }) {
 const { locale, localePath } = useLocale()
 const zh = locale === 'zh'
 const [query, setQuery] = useState('')
 const [category, setCategory] = useState('')
 const [type, setType] = useState('')
 const [language, setLanguage] = useState('')
 const [audience, setAudience] = useState('')
 const [general, setGeneral] = useState(false)
 const resources = queryContentLibrary({ category: categoryId || category, topic: topicId, type, language, audience, general, query, locale })
 const typeLabel = { article: zh ? '文章' : 'Article', video: zh ? '视频' : 'Video', external: zh ? '外部资源' : 'External resource' }
 const languageLabel = code => code === 'en' ? (zh ? '英文' : 'English') : code === 'zh' ? (zh ? '中文' : 'Chinese') : (zh ? '语言尚未核实' : 'Language not verified')
 return <section aria-label={zh ? 'ONYX 教育内容库' : 'ONYX educational content library'}>
  <h2>{contextual ? (zh ? '进一步了解此策略' : 'Learn more about this strategy') : (zh ? 'ONYX 内容库' : 'ONYX Content Library')}</h2>
  <p>{contextual ? (zh ? '这些资源来自同一 ONYX 内容库，并根据当前主题筛选。' : 'These resources come from the ONYX Content Library, filtered for this topic.') : (zh ? '浏览文章、视频及权威资源，涵盖策略与更广泛的教育主题。切换语言不会建立另一个内容库；资源按实际可用语言标注。' : 'Browse articles, videos and authoritative resources across strategies and broader learning. Resources are labeled by their available languages; changing the interface language does not create a separate library.')}</p>
  {!contextual && <div className={styles.filters}>
   <label className={styles.field}><span>{zh ? '搜索内容' : 'Search library'}</span><input type="search" value={query} onChange={event=>setQuery(event.target.value)} /></label>
   <label className={styles.field}><span>{zh ? '策略类别' : 'Strategy category'}</span><select value={category} onChange={event=>setCategory(event.target.value)}><option value="">{zh ? '所有类别' : 'All categories'}</option>{strategies.map(item=><option key={item.id} value={item.id}>{textFor(item.title,locale)}</option>)}</select></label>
   <label className={styles.field}><span>{zh ? '内容类型' : 'Content type'}</span><select value={type} onChange={event=>setType(event.target.value)}><option value="">{zh ? '所有类型' : 'All types'}</option>{Object.entries(typeLabel).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
   <label className={styles.field}><span>{zh ? '资源语言' : 'Resource language'}</span><select value={language} onChange={event=>setLanguage(event.target.value)}><option value="">{zh ? '所有语言' : 'All languages'}</option>{['en','zh','und'].map(code=><option key={code} value={code}>{languageLabel(code)}</option>)}</select></label>
   <label className={styles.field}><span>{zh ? '读者' : 'Audience'}</span><select value={audience} onChange={event=>setAudience(event.target.value)}><option value="">{zh ? '所有读者' : 'All audiences'}</option><option value="w2">W-2</option><option value="1099">1099</option><option value="small-business">{zh ? '小企业主' : 'Small business owner'}</option></select></label>
   <label className={styles.option}><input type="checkbox" checked={general} onChange={event=>setGeneral(event.target.checked)} />{zh ? '仅通识学习' : 'General learning only'}</label>
  </div>}
  <p role="status">{zh ? `${resources.length} 项资源` : `${resources.length} resources`}</p>
  {resources.length ? <div className={styles.grid}>{resources.map(resource => {
   const content = presentResource(resource,locale)
   return <article key={resource.id} className={styles.card} data-resource-id={resource.id}>
    <p className={styles.eyebrow}>{typeLabel[resource.type]} · {resource.languages.map(languageLabel).join(' / ')}</p>
    <h3>{resource.type === 'article' ? <Link to={resourcePath(resource, locale)}>{content.title} →</Link> : <a href={resource.href} target="_blank" rel="noreferrer">{content.title} ↗</a>}</h3>
    {content.description && <p>{content.description}</p>}
    {content.contentLocale !== locale && content.contentLocale !== 'und' && <p>{zh ? '将打开以上标注语言的内容。' : 'Opens in the resource language shown above.'}</p>}
   </article>
  })}</div> : <p className={styles.note}>{contextual ? (zh ? '目前尚无已发布资源与此主题关联。您可以浏览完整内容库。' : 'No published resources are linked to this topic yet. You can browse the full library.') : (zh ? '没有符合条件的资源。请调整搜索或筛选。' : 'No resources match. Try changing the search or filters.')}</p>}
  {contextual && <Link to={localePath('/learn')}>{zh ? '浏览完整内容库' : 'Browse the full Content Library'} →</Link>}
 </section>
}
