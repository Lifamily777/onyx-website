
import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { strategies, textFor } from '../features/onyxProfile/strategies'
import hero from './HomePage.module.css'
import styles from './PhaseOne.module.css'

export default function HomePage() {
 const { locale, localePath } = useLocale()
 const zh = locale === 'zh'
 const text = value => textFor(value, locale)
 useDocumentMeta(zh ? 'ONYX 黑曜财商 · 了解全貌，规划下一步' : 'ONYX · Know where we are. Build what comes next.', zh ? '帮助 W-2 专业人士、1099 收入者与小企业主理解完整财务图景。' : 'Clarity for W-2 professionals, 1099 earners and small business owners. Understand our financial picture before our next decision.')
 const cta = zh ? '开始填写我们的 ONYX 黑曜财商 概况' : 'Start Our ONYX Profile'
 return <main className={hero.wrap}>
  <section className={`${hero.hero} ${hero.phaseOneHero}`}>
   <p className={hero.heroEyebrow}>{zh ? 'ONYX 黑曜财商 为何存在' : 'Why ONYX exists'}</p>
   <h1 className={hero.heroTitle}>{zh ? '我们不需要更多金融产品。' : 'We don’t need more financial products.'}<span className={hero.heroEmphasis}>{zh ? '我们需要理解它们如何相互配合。' : 'We need to know how they fit together.'}</span></h1>
   <p className={hero.heroSupporting}>{zh ? '为 W-2 专业人士、1099 收入者与小企业主，在下一次财务决策前看清全貌。' : 'For W-2 professionals, 1099 earners and small business owners: see the whole picture before our next financial decision.'}</p>
   <div className={hero.heroLinks}><Link className={hero.btnPrimary} to={localePath('/profile')}>{cta}</Link></div>
  </section>
  <div className={styles.page}>
   <section>
    <p className={styles.eyebrow}>{zh ? '从已有的生活出发' : 'Start with the life we already have'}</p>
    <h2>{zh ? '我们已经拥有一些拼图。' : 'We already have pieces of a financial life.'}</h2>
    <p>{zh ? '一份 W-2 收入、一个 401(k)，也许还有 Roth IRA、寿险、住房、投资、出租物业或副业，以及一些关于下一步的想法。' : 'A W-2 income. A 401(k). Maybe a Roth IRA. Life insurance. A home. Investments. A rental property. A side business. Perhaps a few ideas about what we should be doing next.'}</p>
    <p>{zh ? '问题往往不是缺少选择，而是理解：' : 'The problem is rarely a lack of options. The problem is understanding:'}</p>
    <div className={styles.grid}>{(zh ? ['我们现在处于什么位置？','这些拼图如何相互配合？','哪些策略真正符合我们的情况？','下一步应该做什么？'] : ['Where are we today?','How do these pieces work together?','Which strategies actually fit our situation?','What should we do next?']).map((q,i) => <div className={styles.card} key={q}><p className={styles.eyebrow}>0{i+1}</p><h3>{q}</h3></div>)}</div>
    <p>{zh ? '这就是 ONYX 黑曜财商 存在的原因。ONYX 黑曜财商 帮助我们退后一步，看清收入、税务、退休、保障、投资、房地产、商业机会、现金流与未来目标的全貌，再做下一次财务决策。' : 'That is why ONYX exists. ONYX helps us step back and see the whole picture — income, taxes, retirement, protection, investments, real estate, business opportunities, cash flow and future goals — before making the next financial decision.'}</p>
   </section>
   <section>
    <h2>{zh ? '先了解现状，再理解选择。' : 'First our profile. Then our options.'}</h2>
    <p>{zh ? '我们首先了解自己当前的财务概况，再用一个简单框架整理可探索的策略。并非每种策略都适合每个人。' : 'We begin by understanding our current financial profile. Then we organize the strategies available to explore through a simple framework. Not every strategy belongs in every financial life.'}</p>
    <div className={styles.grid}>{strategies.map(category => <Link className={styles.card} key={category.id} to={localePath('/strategies/' + category.id)}><h3>{text(category.title)} →</h3><p>{text(category.description)}</p></Link>)}</div>
    <p>{zh ? 'ONYX 黑曜财商 的工作不是增加产品选择，而是帮助我们理解选择、看清关联，判断下一笔资金与注意力应投向何处。' : 'ONYX’s role is not to give us more products to choose from. It is to help us understand the choices, see how they connect, and determine what deserves our next dollar — and our attention.'}</p>
   </section>
   <section>
    <h2>{zh ? '了解现状。理解选择。构建未来。' : 'Know where we are. Understand our options. Build what comes next.'}</h2>
    <ol className={styles.steps}>{(zh ? ['概况','策略','实施','持续指导'] : ['Profile','Strategy','Implementation','Ongoing guidance']).map((label,i)=><li key={label}><span>0{i+1}</span>{label}</li>)}</ol>
    <p>{zh ? '清晰优于复杂。教育先于产品。策略先于实施。技术支持人工判断，而不是取代它。' : 'Clarity over complexity. Education before products. Strategy before implementation. Human judgment supported by technology — not replaced by it.'}</p>
    <div className={styles.actions}><Link className={styles.button} to={localePath('/profile')}>{cta}</Link><Link to={localePath('/learn')}>{zh ? '继续学习' : 'Keep learning'} →</Link></div>
   </section>
  </div>
 </main>
}
