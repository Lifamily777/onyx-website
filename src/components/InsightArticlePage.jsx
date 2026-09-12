import { useParams, Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { getInsightBySlug, resolveInsightContent } from '../data/insights'
import { getTermsByInsightSlug, resolveTermContent } from '../data/glossary'
import NotFound from './NotFound'
import styles from './InsightArticlePage.module.css'

// Renders a text block's inline content. Most blocks carry plain `text`;
// blocks that need a clickable glossary term instead carry `segments` — a
// mix of plain text runs and { type: 'term', slug, text } runs. Older
// articles only ever use `text`, so this stays fully backward compatible.
function renderInline(block, localePath, styles) {
  if (!block.segments) return block.text
  return block.segments.map((segment, i) => {
    if (segment.type === 'term') {
      return (
        <Link key={i} to={localePath(`/glossary/${segment.slug}`)} className={styles.termLink}>
          {segment.text}
        </Link>
      )
    }
    return <span key={i}>{segment.text}</span>
  })
}

function TableMetaphor() {
  const { locale } = useLocale()
  const isChinese = locale === 'zh'
  const functions = [
    ['Liquidity', '流动性'],
    ['Growth', '增长'],
    ['Retirement / Tax Efficiency', '退休 / 税务效率'],
    ['Protection', '保障'],
  ]

  return (
    <figure className={styles.tableFigure} aria-label="Four financial functions supporting a stable household plan">
      <div className={styles.tableTop} aria-hidden="true" />
      <div className={styles.tableLegs}>
        {functions.map(([en, zh]) => (
          <div key={en} className={styles.tableLeg}>
            <span>{isChinese ? zh : en}</span>
          </div>
        ))}
      </div>
      <figcaption>{isChinese ? <>不同的任务，共同支撑一个家庭。</> : <>
        Different functions. Shared stability.
        </>}
      </figcaption>
    </figure>
  )
}

function BilingualEditorialArticle({ data, t, localePath }) {
  const { locale } = useLocale()
  const isChinese = locale === 'zh'
  return (
    <div className={`${styles.wrap} ${styles.editorialWrap} page-enter`}>
      <article>
        <header className={styles.editorialHero}>
          <p className={styles.editorialEyebrow}>ONYX INSIGHT</p>
          <h1 className={styles.editorialTitle}>{isChinese ? data.titleZh : data.titleEn}</h1>
          <div className={styles.editorialSubtitle}>
            <p>{isChinese ? data.subtitleZh : data.subtitleEn}</p>
          </div>
          <div className={styles.editorialByline}>
            <strong>{data.author}</strong>
            <span>{data.authorTitle}</span>
            <small>{data.readingTime} {t('insightsPage.minReadSuffix')}</small>
          </div>
        </header>

        <div className={styles.bilingualBody}>
          {data.body.map((block, i) => {
            if (block.type === 'pairHeading') {
              return (
                <section key={i} className={`${styles.pairHeading} ${block.climax ? styles.climaxHeading : ''}`}>
                  <h2>{isChinese ? block.zh : block.en}</h2>
                </section>
              )
            }
            if (block.type === 'tableMetaphor') return <TableMetaphor key={i} />
            return (
              <div
                key={i}
                className={`${styles.pair} ${block.lead ? styles.pairLead : ''} ${block.short ? styles.pairShort : ''} ${block.emphasis ? styles.pairEmphasis : ''}`}
              >
                <p className={styles.pairEn}>{isChinese ? block.zh : block.en}</p>
              </div>
            )
          })}
        </div>

        <blockquote className={styles.editorialQuote}>
          <p>{isChinese ? data.closingQuote.zh : data.closingQuote.en}</p>
        </blockquote>

        <footer className={styles.editorialFooter}>
          <div className={styles.authorSignature}>
            <strong>{data.author}</strong>
            <span>{data.authorTitle}</span>
          </div>
          <div className={styles.editorialDisclosure}>
            <p>{isChinese ? data.disclosure.zh : data.disclosure.en}</p>
          </div>
          <Link to={localePath('/insights')} className={styles.backLink}>
            {t('insightsPage.backToIndex')}
          </Link>
        </footer>
      </article>
    </div>
  )
}

const insuranceLabels = {
  en: {
    jobs: [['TERM', 'TIME'], ['GUL', 'CERTAINTY'], ['IUL', 'FLEXIBILITY']],
    families: [
      { title: 'Family A', tag: 'Cash constrained', facts: ['$8,000 after-tax monthly income', '$7,500 essential spending', '$10,000 emergency savings', 'High-interest debt; limited retirement savings'], path: ['Protection first', 'Liquidity first', 'Debt and emergency reserve', 'Term may fit'] },
      { title: 'Family B', tag: 'Capital surplus', facts: ['Stable income and healthy reserves', 'No material high-interest debt', 'Retirement savings progressing', '$50,000–$100,000+ annual deployable capital'], path: ['Protection addressed', 'Long-term deployable capital', 'Liquidity strategy', 'Permanent insurance may deserve analysis'] },
    ],
    ladderTitle: 'Capital Priority Ladder',
    ladder: ['Daily cash flow', 'Emergency reserve', 'High-interest debt management', 'Core protection', 'Retirement / long-term investing', 'Advanced capital strategies'],
    matrixRows: [
      ['Primary job', 'Temporary large protection', 'Long-duration legacy protection', 'Protection + flexible cash value'],
      ['Initial affordability', 'Usually lowest', 'Higher than Term', 'Often highest when heavily funded'],
      ['Death-benefit duration', 'Defined term', 'Specified advanced age, by contract', 'Permanent if adequately funded and maintained'],
      ['Cash-value objective', 'Generally none', 'Usually secondary', 'Often central'],
      ['Guarantee emphasis', 'During stated term', 'High', 'Varies; performance has non-guaranteed elements'],
      ['Index participation', 'No', 'Generally no', 'Yes, through contract crediting rules'],
      ['Family-banking potential', 'No', 'Limited', 'Potentially meaningful'],
      ['Living benefits', 'May be available', 'May be available', 'May be available'],
      ['Complexity / management', 'Low', 'Moderate', 'High'],
      ['Best-fit profile', 'Large need; limited cash', 'Legacy certainty priority', 'Stable surplus capital; multiple long-term needs'],
      ['Major trade-off', 'Coverage ends', 'Less accumulation flexibility', 'Charges, complexity and non-guaranteed performance'],
    ],
    columns: ['Question', 'Term', 'GUL', 'IUL'],
    advanced: 'Heavily funded cash-value insurance belongs here—not at the base.',
  },
  zh: {
    jobs: [['TERM', '时间'], ['GUL', '确定性'], ['IUL', '灵活性']],
    families: [
      { title: '家庭 A', tag: '现金受限', facts: ['税后月收入 $8,000', '必要支出 $7,500', '应急储蓄 $10,000', '有高息债务；退休储蓄有限'], path: ['先解决保障', '先保留流动性', '处理债务与应急储备', 'Term 可能更合适'] },
      { title: '家庭 B', tag: '资本有余量', facts: ['收入稳定，应急储备健康', '没有重大高息债务', '退休储蓄正常推进', '每年有 $50,000–$100,000+ 长期资本'], path: ['基本保障已解决', '拥有长期可配置资本', '开始考虑流动性策略', '永久寿险可能值得分析'] },
    ],
    ladderTitle: '家庭资本优先级',
    ladder: ['日常现金流', '应急储备', '高息债务管理', '核心保障', '退休与长期投资', '进阶资本策略'],
    matrixRows: [
      ['首要任务', '阶段性大额保障', '长期传承保障', '保障 + 灵活现金价值'],
      ['初始负担', '通常最低', '高于 Term', '大额投入时通常最高'],
      ['保障期限', '明确年限', '按合同保证至特定高龄', '资金充足且妥善管理时可长期维持'],
      ['现金价值目标', '通常没有', '通常不是重点', '往往是核心目标'],
      ['保证重点', '保证期内', '较强', '视合同而定；包含非保证表现'],
      ['指数参与', '没有', '通常没有', '按合同计息规则参与'],
      ['家庭银行潜力', '没有', '有限', '可能较强'],
      ['生前福利', '可能提供', '可能提供', '可能提供'],
      ['复杂度 / 管理', '低', '中等', '高'],
      ['较适合的家庭', '保障缺口大、现金有限', '重视确定传承', '资本有余量且有多重长期需求'],
      ['主要代价', '期限会结束', '积累灵活性较弱', '费用、复杂度与非保证表现'],
    ],
    columns: ['比较维度', 'Term', 'GUL', 'IUL'],
    advanced: '大额投入的现金价值保险，应放在进阶层，而不是家庭资本的地基。',
  },
}

function InsuranceVisual({ type, block }) {
  const { locale } = useLocale()
  const isChinese = locale === 'zh'
  const labels = insuranceLabels.en
  const labelsZh = insuranceLabels.zh

  if (type === 'jobs') {
    return (
      <figure className={`${styles.jobsVisual} ${block.strong ? styles.jobsStrong : ''}`}>
        {labels.jobs.map(([tool, job], i) => (
          <div key={tool}><strong>{tool}</strong><span>{isChinese ? labelsZh.jobs[i][1] : job}</span></div>
        ))}
      </figure>
    )
  }

  if (type === 'families') {
    return (
      <figure className={styles.familyComparison}>
        {labels.families.map((family, i) => {
          const familyZh = labelsZh.families[i]
          return (
          <section key={family.title}>
            <p className={styles.visualTag}>{isChinese ? familyZh.tag : family.tag}</p>
            <h3>{isChinese ? familyZh.title : family.title}</h3>
            <ul>{family.facts.map((item, j) => <li key={item}>{isChinese ? familyZh.facts[j] : item}</li>)}</ul>
            <div className={styles.familyPath}>{family.path.map((item, j) => <span key={item}>{isChinese ? familyZh.path[j] : item}</span>)}</div>
          </section>
          )
        })}
      </figure>
    )
  }

  if (type === 'ladder') {
    return (
      <figure className={styles.capitalLadder}>
        <figcaption>{isChinese ? labelsZh.ladderTitle : labels.ladderTitle}</figcaption>
        <ol>{labels.ladder.map((item, i) => <li key={item} className={i === labels.ladder.length - 1 ? styles.advancedStep : ''}>{isChinese ? labelsZh.ladder[i] : item}</li>)}</ol>
        <p>{isChinese ? labelsZh.advanced : labels.advanced}</p>
      </figure>
    )
  }

  return (
    <div className={styles.matrixScroll} role="region" aria-label="Term, GUL and IUL decision matrix / Term、GUL 与 IUL 决策矩阵" tabIndex="0">
      <table className={styles.decisionMatrix}>
        <thead><tr>{labels.columns.map((item, i) => <th key={item}>{isChinese ? labelsZh.columns[i] : item}</th>)}</tr></thead>
        <tbody>{labels.matrixRows.map((row, rowIndex) => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={`${row[0]}-${i}`} scope="row">{isChinese ? labelsZh.matrixRows[rowIndex][i] : cell}</th> : <td key={`${row[0]}-${i}`}>{isChinese ? labelsZh.matrixRows[rowIndex][i] : cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function InsuranceEditorialArticle({ insight, data, englishData, chineseData, t, localePath, isFallback }) {
  const { locale } = useLocale()
  const isChinese = locale === 'zh'

  return (
    <div className={`${styles.wrap} ${styles.insuranceWrap} page-enter`}>
      <article lang={isChinese ? 'zh-CN' : 'en'}>
        <header className={styles.insuranceHero}>
          <p className={styles.editorialEyebrow}>ONYX INSIGHT #{String(insight.insightNumber).padStart(3, '0')}</p>
          {isFallback && <p className={styles.languageNotice}>{t('insightsPage.languageNotice')}</p>}
          <h1>{isChinese ? chineseData.title : englishData.title}</h1>
          <div className={styles.insuranceSubtitle}>
            <p>{isChinese ? chineseData.subtitle : englishData.subtitle}</p>
          </div>
          <div className={styles.editorialByline}>
            <strong>{insight.author}</strong><span>{insight.authorTitle}</span>
            <small>{(isChinese ? chineseData : englishData).readingTime} {t('insightsPage.minReadSuffix')}</small>
          </div>
        </header>

        <Link to={localePath(`/insights/${insight.previousSlug}`)} className={styles.previousInsight}>
          <span>{isChinese ? <>{chineseData.previousLabel}</> : <>{englishData.previousLabel} · </>}</span>
          <strong>{isChinese ? chineseData.previousTitle : englishData.previousTitle}</strong>
        </Link>

        <div className={styles.insuranceBody}>
          {englishData.blocks.map((block, i) => {
            const blockZh = chineseData.blocks[i]
            if (block.type === 'h2') return <section key={i} className={styles.insuranceHeading}><span>{block.eyebrow}</span><h2>{isChinese ? blockZh.title : block.title}</h2></section>
            if (['jobs', 'families', 'ladder', 'matrix'].includes(block.type)) return <InsuranceVisual key={i} type={block.type} block={block} />
            if (block.type === 'definitions') return <section key={i} className={styles.definitionGrid}>{block.items.map((item, j) => <article key={item.term}><h2>{isChinese ? blockZh.items[j].term : item.term}</h2><p>{isChinese ? blockZh.items[j].text : item.text}</p></article>)}</section>
            if (block.type === 'callout') return <aside key={i} className={styles.insuranceCallout}><p>{isChinese ? blockZh.text : block.text}</p></aside>
            if (block.type === 'list') return <ul key={i} className={styles.insuranceList}>{block.items.map((item, j) => <li key={item}><span>{isChinese ? blockZh.items[j] : item}</span></li>)}</ul>
            if (block.type === 'questions') return <div key={i} className={styles.questionGrid}>{block.items.map((item, j) => <section key={item.q}><span>0{j + 1}</span><h3>{isChinese ? blockZh.items[j].q : item.q}</h3><p>{isChinese ? blockZh.items[j].a : item.a}</p></section>)}</div>
            if (block.type === 'quote') return <blockquote key={i} className={styles.insuranceQuote}><p>{isChinese ? blockZh.text : block.text}</p></blockquote>
            if (block.type === 'closing') return <div key={i} className={styles.insuranceClosing}><p>{isChinese ? blockZh.text : block.text}</p></div>
            return <div key={i} className={`${styles.insurancePair} ${block.lead ? styles.insuranceLead : ''}`}><p>{isChinese ? blockZh.text : block.text}</p></div>
          })}
        </div>

        <footer className={styles.insuranceFooter}>
          <section className={styles.sourceList}>
            <h2>{isChinese ? chineseData.sourcesTitle : englishData.sourcesTitle}</h2>
            <ul>{englishData.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul>
          </section>
          <div className={styles.authorSignature}><strong>{insight.author}</strong><span>{insight.authorTitle}</span></div>
          <div className={styles.insuranceDisclaimer}><p>{isChinese ? chineseData.disclaimer : englishData.disclaimer}</p></div>
          <Link to={localePath('/insights')} className={styles.backLink}>{t('insightsPage.backToIndex')}</Link>
        </footer>
      </article>
    </div>
  )
}

function PartnershipVisual({ type }) {
  const { locale } = useLocale()
  const isChinese = locale === 'zh'
  if (type === 'restaurant') return <figure className={styles.restaurantStory}><div><span>LEE</span><strong>{isChinese ? <>最会和供应商谈价格</> : <>Supplier whisperer</>}</strong></div><div><span>MAYA</span><strong>{isChinese ? <>客人结账前就知道他会不会再来</> : <>Customer instinct</>}</strong></div><div><span>DAVID</span><strong>{isChinese ? <>螺丝刀、胶带，以及不太合理的自信</> : <>Duct-tape confidence</>}</strong></div></figure>
  if (type === 'ledgers') return (
    <figure className={styles.ledgerGrid} aria-label="Three complementary partnership records">
      {[
        ['01', 'Business Books', '经营账', 'How is the business doing?', '公司经营得怎么样？'],
        ['02', 'Capital Account', '资本账户', 'Part of the ownership story', 'ownership story 的一部分'],
        ['03', 'Partner Basis Ledger', 'Partner Basis 记录', 'The Partner’s tax story', '每位 Partner 的税务故事'],
      ].map(([n, en, zh, desc, descZh]) => <section key={n}><span>{n}</span><h3>{isChinese ? zh : en}</h3><p>{isChinese ? descZh : desc}</p></section>)}
    </figure>
  )
  if (type === 'rollforward') {
    const rows = [
      ['Beginning Outside Basis', '期初 Outside Basis', '$50,000', ''],
      ['Cash Contribution', '现金投入', '+$10,000', 'up'],
      ['Property Contribution — adjusted tax basis', 'Property Contribution——adjusted tax basis', '+$4,000', 'up'],
      ['Allocated Partnership Income', '分配到的 Partnership Income', '+$20,000', 'up'],
      ['Increase in qualifying Partnership liabilities', 'qualifying Partnership liabilities 份额增加', '+$12,000', 'up'],
      ['Cash Distribution', '现金 Distribution', '−$8,000', 'down'],
      ['Allocated Partnership Loss', '分配到的 Partnership Loss', '−$5,000', 'down'],
    ]
    return <figure className={styles.basisRollforward}><figcaption>{isChinese ? <>Lee 的简化 Outside Basis 变动表</> : <>Lee’s simplified Outside Basis rollforward</>}</figcaption>{rows.map(([en, zh, amount, tone]) => <div key={en}><p>{isChinese ? zh : en}</p><strong className={tone ? styles[tone] : ''}>{amount}</strong></div>)}<div className={styles.basisTotal}><p>{isChinese ? <>期末 Outside Basis</> : <>Ending Outside Basis</>}</p><strong>$83,000</strong></div></figure>
  }
  if (type === 'basisRule') return <figure className={styles.basisRule}><div><span>+$30,000</span><strong>{isChinese ? <>Income 在建立 basis。</> : <>Income builds basis.</>}</strong></div><div><span>−$10,000</span><strong>{isChinese ? <>Distribution 在使用 basis。</> : <>Distribution uses basis.</>}</strong></div></figure>
  if (type === 'consequences') return <figure className={styles.consequenceGrid}>{[['01','Loss deductions','Loss deductions'],['02','Cash distributions','现金 distributions'],['03','Sale or exit','出售或退出'],['04','Debt changes','债务变化']].map(([n,en,zh])=><div key={n}><span>{n}</span><strong>{isChinese ? zh : en}</strong></div>)}</figure>
  if (type === 'missingLedger') return <figure className={styles.missingLedgerCard}>{[['Loss deduction','可能报得过高'],['Distribution gain','可能报得过低'],['Sale gain or loss','可能计算错误'],['Historical reconstruction','可能昂贵又费时']].map(([en,zh])=><div key={en}><strong>{en}</strong>{isChinese && <small>{zh}</small>}</div>)}<p>{isChinese ? <>错误申报可能带来 additional tax、statutory interest，以及视具体事实而定的 penalties。</> : <>Incorrect reporting may mean additional tax, statutory interest, and—depending on the facts—potential penalties.</>}</p></figure>
  if (type === 'transaction') return <figure className={styles.transactionFlow}><div><strong>{isChinese ? <>合伙人</> : <>PARTNER</>}</strong></div><p><span>{isChinese ? <>资金 · 财产 · 债务</> : <>Money · Property · Debt</>}</span></p><div><strong>{isChinese ? <>合伙企业</> : <>PARTNERSHIP</>}</strong></div></figure>
  if (type === 'storyClose') return <figure className={styles.storyClose}>{!isChinese && <p>Three years later, Lee asks:</p>}<blockquote>{isChinese ? <>三年后，Lee 再次问：“我的 basis 是多少？”</> : <>“What is my basis?”</>}</blockquote><strong>{isChinese ? <>这一次，没有人抬头盯着天花板。有人打开第三套账，历史都在那里。</> : <>This time, nobody stares at the ceiling.<br />Someone opens the Third Ledger. The history is there.</>}</strong></figure>
  if (type === 'takeaway') return <figure className={styles.thirdLedgerTakeaway}>{[
    ['Business books tell you what the company did.', '公司的经营账，告诉你公司做了什么。'],
    ['Capital accounts tell you part of the ownership story.', 'Capital accounts，告诉你 ownership story 的一部分。'],
    ["Basis tells you the Partner's tax story.", 'Basis，告诉你每一位 Partner 自己的税务故事。'],
    ['A good Partnership should know where all three stories are being kept.', '一个经营得好的 Partnership，应该知道这三个故事分别被记录在哪里。'],
  ].map(([en,zh])=><div key={en}><p>{isChinese ? zh : en}</p></div>)}</figure>
  return null
}

function PartnershipEditorialArticle({ insight, englishData, chineseData, t, localePath, isFallback }) {
  const { locale } = useLocale()
  const isChinese = locale === 'zh'
  return <div className={`${styles.wrap} ${styles.insuranceWrap} ${styles.partnershipWrap} page-enter`}><article lang={isChinese ? 'zh-CN' : 'en'}>
    <header className={styles.insuranceHero}><p className={styles.editorialEyebrow}>ONYX INSIGHT #{String(insight.insightNumber).padStart(3, '0')}</p>{isFallback && <p className={styles.languageNotice}>{t('insightsPage.languageNotice')}</p>}<h1>{isChinese ? chineseData.title : englishData.title}</h1><div className={styles.insuranceSubtitle}><p>{isChinese ? chineseData.subtitle : englishData.subtitle}</p></div><div className={styles.editorialByline}><strong>{insight.author}</strong><span>{insight.authorTitle}</span><small>{(isChinese ? chineseData : englishData).readingTime} {t('insightsPage.minReadSuffix')}</small></div></header>
    <div className={styles.insuranceBody}>{englishData.blocks.map((block, i) => {
      const zh = chineseData.blocks[i]
      if (block.type === 'h2') return <section key={i} className={styles.insuranceHeading}><span>{block.eyebrow}</span><h2>{isChinese ? zh.title : block.title}</h2></section>
      if (['restaurant','ledgers','rollforward','basisRule','consequences','missingLedger','transaction','storyClose','takeaway'].includes(block.type)) return <PartnershipVisual key={i} type={block.type} />
      if (block.type === 'callout') return <aside key={i} className={styles.insuranceCallout}><p>{isChinese ? zh.text : block.text}</p></aside>
      if (block.type === 'quote') return <blockquote key={i} className={styles.insuranceQuote}><p>{isChinese ? zh.text : block.text}</p></blockquote>
      if (block.type === 'list') return <ul key={i} className={styles.insuranceList}>{block.items.map((item,j)=><li key={item}><span>{isChinese ? zh.items[j] : item}</span></li>)}</ul>
      if (block.type === 'cta') return <aside key={i} className={styles.partnershipCta}><p>{isChinese ? zh.text : block.text}</p><Link to={localePath('/contact')}>{isChinese ? '联系黑曜财商' : 'Contact ONYX'}</Link></aside>
      return <div key={i} className={`${styles.insurancePair} ${block.lead ? styles.insuranceLead : ''}`}><p>{isChinese ? zh.text : block.text}</p></div>
    })}</div>
    <footer className={styles.insuranceFooter}><section className={styles.sourceList}><h2>{isChinese ? chineseData.sourcesTitle : englishData.sourcesTitle}</h2><ul>{englishData.sources.map(source=><li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></section><div className={styles.authorSignature}><strong>{insight.author}</strong><span>{insight.authorTitle}</span></div><div className={styles.insuranceDisclaimer}><p>{isChinese ? chineseData.disclaimer : englishData.disclaimer}</p></div><Link to={localePath('/insights')} className={styles.backLink}>{t('insightsPage.backToIndex')}</Link></footer>
  </article></div>
}

export default function InsightArticlePage() {
  const { slug } = useParams()
  const { t, locale, localePath } = useLocale()
  const insight = getInsightBySlug(slug)

  if (!insight) return <NotFound />

  const { data, isFallback, resolvedLocale } = resolveInsightContent(insight, locale)
  const relatedTerms = getTermsByInsightSlug(insight.slug)

  const isEditorialLayout = ['bilingualEditorial', 'insuranceEditorial', 'partnershipEditorial'].includes(insight.layout)
  const metaOptions = isEditorialLayout
    ? {
        siteName: t('footer.officialName'),
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: (locale === 'zh' ? data.titleZh : data.titleEn) || data.title,
          description: data.seoDescription,
          datePublished: insight.publishDate,
          inLanguage: resolvedLocale === 'zh' ? 'zh-CN' : 'en-US',
          author: { '@type': 'Person', name: data.author || insight.author },
          publisher: { '@type': 'Organization', name: t('footer.officialName') },
        },
      }
    : {}

  useDocumentMeta(data.seoTitle || `${data.title} · ${t('brand.shortName')}`, data.seoDescription, metaOptions)

  if (insight.layout === 'insuranceEditorial') {
    return <InsuranceEditorialArticle insight={insight} data={data} englishData={insight.content.en} chineseData={insight.content.zh} t={t} localePath={localePath} isFallback={isFallback} />
  }

  if (insight.layout === 'partnershipEditorial') {
    return <PartnershipEditorialArticle insight={insight} englishData={insight.content.en} chineseData={insight.content.zh} t={t} localePath={localePath} isFallback={isFallback} />
  }

  if (insight.layout === 'bilingualEditorial') {
    return <BilingualEditorialArticle data={data} t={t} localePath={localePath} />
  }

  return (
    <div className={`${styles.wrap} page-enter`}>
      <article>
        <p className={styles.eyebrow}>{t('insightsPage.eyebrow')}</p>

        {insight.pillarLabel && insight.insightNumber && (
          <p className={styles.badges}>
            <span className={styles.badge}>{insight.pillarLabel}</span>
            <span className={styles.badge}>{t('brand.shortName')} Insight #{String(insight.insightNumber).padStart(3, '0')}</span>
          </p>
        )}

        {isFallback && (
          <p className={styles.languageNotice}>{t('insightsPage.languageNotice')}</p>
        )}

        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
        <p className={styles.meta}>{data.readingTime} {t('insightsPage.minReadSuffix')}</p>

        <div className={styles.body}>
          {data.body.map((block, i) => {
            if (block.type === 'h2') {
              return <h2 key={i} className={styles.h2}>{renderInline(block, localePath, styles)}</h2>
            }
            if (block.type === 'list') {
              return (
                <ul key={i} className={styles.list}>
                  {block.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              )
            }
            if (block.type === 'mission') {
              return <p key={i} className={styles.mission}>{block.text}</p>
            }
            return <p key={i} className={styles.p}>{renderInline(block, localePath, styles)}</p>
          })}
        </div>

        {relatedTerms.length > 0 && (
          <section className={styles.relatedTerms}>
            <p className={styles.sectionLabel}>{t('insightsPage.relatedTermsLabel')}</p>
            <ul className={styles.termList}>
              {relatedTerms.map((term) => {
                const { data: termData } = resolveTermContent(term, locale)
                return (
                  <li key={term.slug}>
                    <Link to={localePath(`/glossary/${term.slug}`)} className={styles.termChip}>
                      {termData.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        <section className={styles.takeaway}>
          <p className={styles.sectionLabel}>{t('insightsPage.takeawayLabel')}</p>
          {data.takeaway.map((line, i) => (
            <p key={i} className={styles.takeawayLine}>{line}</p>
          ))}
        </section>

        <section className={styles.continueLearning}>
          <p className={styles.sectionLabel}>{t('insightsPage.continueLearningLabel')}</p>
          <ul className={styles.clList}>
            {data.continueLearning.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>

        <section className={styles.workWith}>
          <p className={styles.sectionLabel}>{t('insightsPage.workWithOnyxLabel')}</p>
          <p className={styles.workIntro}>{data.workWithOnyx.intro}</p>
          <Link to={localePath('/contact')} className={styles.btnPrimary}>
            {data.workWithOnyx.ctaLabel}
          </Link>
          <ul className={styles.futureList}>
            {data.workWithOnyx.futureOfferings.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>

        <p className={styles.disclaimer}>{data.disclaimer}</p>

        <Link to={localePath('/insights')} className={styles.backLink}>
          {t('insightsPage.backToIndex')}
        </Link>
      </article>
    </div>
  )
}
