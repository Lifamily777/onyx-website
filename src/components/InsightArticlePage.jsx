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
            <span>{en}</span>
            <small lang="zh-CN">{zh}</small>
          </div>
        ))}
      </div>
      <figcaption>
        Different functions. Shared stability.
        <span lang="zh-CN">不同的任务，共同支撑一个家庭。</span>
      </figcaption>
    </figure>
  )
}

function BilingualEditorialArticle({ data, t, localePath }) {
  return (
    <div className={`${styles.wrap} ${styles.editorialWrap} page-enter`}>
      <article>
        <header className={styles.editorialHero}>
          <p className={styles.editorialEyebrow}>ONYX INSIGHT</p>
          <h1 className={styles.editorialTitle}>{data.titleEn}</h1>
          <p className={styles.editorialTitleZh} lang="zh-CN">{data.titleZh}</p>
          <div className={styles.editorialSubtitle}>
            <p>{data.subtitleEn}</p>
            <p lang="zh-CN">{data.subtitleZh}</p>
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
                  <h2>{block.en}</h2>
                  <p lang="zh-CN">{block.zh}</p>
                </section>
              )
            }
            if (block.type === 'tableMetaphor') return <TableMetaphor key={i} />
            return (
              <div
                key={i}
                className={`${styles.pair} ${block.lead ? styles.pairLead : ''} ${block.short ? styles.pairShort : ''} ${block.emphasis ? styles.pairEmphasis : ''}`}
              >
                <p className={styles.pairEn}>{block.en}</p>
                <p className={styles.pairZh} lang="zh-CN">{block.zh}</p>
              </div>
            )
          })}
        </div>

        <blockquote className={styles.editorialQuote}>
          <p>{data.closingQuote.en}</p>
          <p lang="zh-CN">{data.closingQuote.zh}</p>
        </blockquote>

        <footer className={styles.editorialFooter}>
          <div className={styles.authorSignature}>
            <strong>{data.author}</strong>
            <span>{data.authorTitle}</span>
          </div>
          <div className={styles.editorialDisclosure}>
            <p>{data.disclosure.en}</p>
            <p lang="zh-CN">{data.disclosure.zh}</p>
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
  const labels = insuranceLabels.en
  const labelsZh = insuranceLabels.zh

  if (type === 'jobs') {
    return (
      <figure className={`${styles.jobsVisual} ${block.strong ? styles.jobsStrong : ''}`}>
        {labels.jobs.map(([tool, job], i) => (
          <div key={tool}><strong>{tool}</strong><span>{job}</span><small lang="zh-CN">{labelsZh.jobs[i][1]}</small></div>
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
            <p className={styles.visualTag}>{family.tag}<small lang="zh-CN">{familyZh.tag}</small></p>
            <h3>{family.title}<small lang="zh-CN">{familyZh.title}</small></h3>
            <ul>{family.facts.map((item, j) => <li key={item}>{item}<small lang="zh-CN">{familyZh.facts[j]}</small></li>)}</ul>
            <div className={styles.familyPath}>{family.path.map((item, j) => <span key={item}>{item}<small lang="zh-CN">{familyZh.path[j]}</small></span>)}</div>
          </section>
          )
        })}
      </figure>
    )
  }

  if (type === 'ladder') {
    return (
      <figure className={styles.capitalLadder}>
        <figcaption>{labels.ladderTitle}<small lang="zh-CN">{labelsZh.ladderTitle}</small></figcaption>
        <ol>{labels.ladder.map((item, i) => <li key={item} className={i === labels.ladder.length - 1 ? styles.advancedStep : ''}>{item}<small lang="zh-CN">{labelsZh.ladder[i]}</small></li>)}</ol>
        <p>{labels.advanced}<small lang="zh-CN">{labelsZh.advanced}</small></p>
      </figure>
    )
  }

  return (
    <div className={styles.matrixScroll} role="region" aria-label="Term, GUL and IUL decision matrix / Term、GUL 与 IUL 决策矩阵" tabIndex="0">
      <table className={styles.decisionMatrix}>
        <thead><tr>{labels.columns.map((item, i) => <th key={item}>{item}<small lang="zh-CN">{labelsZh.columns[i]}</small></th>)}</tr></thead>
        <tbody>{labels.matrixRows.map((row, rowIndex) => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={`${row[0]}-${i}`} scope="row">{cell}<small lang="zh-CN">{labelsZh.matrixRows[rowIndex][i]}</small></th> : <td key={`${row[0]}-${i}`}>{cell}<small lang="zh-CN">{labelsZh.matrixRows[rowIndex][i]}</small></td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function InsuranceEditorialArticle({ insight, data, englishData, chineseData, t, localePath, isFallback }) {

  return (
    <div className={`${styles.wrap} ${styles.insuranceWrap} page-enter`}>
      <article lang="en">
        <header className={styles.insuranceHero}>
          <p className={styles.editorialEyebrow}>ONYX INSIGHT #{String(insight.insightNumber).padStart(3, '0')}</p>
          {isFallback && <p className={styles.languageNotice}>{t('insightsPage.languageNotice')}</p>}
          <h1>{englishData.title}</h1>
          <p className={styles.insuranceTitleZh} lang="zh-CN">{chineseData.title}</p>
          <div className={styles.insuranceSubtitle}>
            <p>{englishData.subtitle}</p>
            <p lang="zh-CN">{chineseData.subtitle}</p>
          </div>
          <div className={styles.editorialByline}>
            <strong>{insight.author}</strong><span>{insight.authorTitle}</span>
            <small>{englishData.readingTime} {t('insightsPage.minReadSuffix')}</small>
          </div>
        </header>

        <Link to={localePath(`/insights/${insight.previousSlug}`)} className={styles.previousInsight}>
          <span>{englishData.previousLabel} · <span lang="zh-CN">{chineseData.previousLabel}</span></span>
          <strong>{englishData.previousTitle}</strong>
          <small lang="zh-CN">{chineseData.previousTitle}</small>
        </Link>

        <div className={styles.insuranceBody}>
          {englishData.blocks.map((block, i) => {
            const blockZh = chineseData.blocks[i]
            if (block.type === 'h2') return <section key={i} className={styles.insuranceHeading}><span>{block.eyebrow}</span><h2>{block.title}</h2><p lang="zh-CN">{blockZh.title}</p></section>
            if (['jobs', 'families', 'ladder', 'matrix'].includes(block.type)) return <InsuranceVisual key={i} type={block.type} block={block} />
            if (block.type === 'definitions') return <section key={i} className={styles.definitionGrid}>{block.items.map((item, j) => <article key={item.term}><h2>{item.term}</h2><p>{item.text}</p><h3 lang="zh-CN">{blockZh.items[j].term}</h3><p lang="zh-CN">{blockZh.items[j].text}</p></article>)}</section>
            if (block.type === 'callout') return <aside key={i} className={styles.insuranceCallout}><p>{block.text}</p><p lang="zh-CN">{blockZh.text}</p></aside>
            if (block.type === 'list') return <ul key={i} className={styles.insuranceList}>{block.items.map((item, j) => <li key={item}><span>{item}</span><small lang="zh-CN">{blockZh.items[j]}</small></li>)}</ul>
            if (block.type === 'questions') return <div key={i} className={styles.questionGrid}>{block.items.map((item, j) => <section key={item.q}><span>0{j + 1}</span><h3>{item.q}</h3><p>{item.a}</p><h4 lang="zh-CN">{blockZh.items[j].q}</h4><p lang="zh-CN">{blockZh.items[j].a}</p></section>)}</div>
            if (block.type === 'quote') return <blockquote key={i} className={styles.insuranceQuote}><p>{block.text}</p><p lang="zh-CN">{blockZh.text}</p></blockquote>
            if (block.type === 'closing') return <div key={i} className={styles.insuranceClosing}><p>{block.text}</p><p lang="zh-CN">{blockZh.text}</p></div>
            return <div key={i} className={`${styles.insurancePair} ${block.lead ? styles.insuranceLead : ''}`}><p>{block.text}</p><p lang="zh-CN">{blockZh.text}</p></div>
          })}
        </div>

        <footer className={styles.insuranceFooter}>
          <section className={styles.sourceList}>
            <h2>{englishData.sourcesTitle}<small lang="zh-CN">{chineseData.sourcesTitle}</small></h2>
            <ul>{englishData.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul>
          </section>
          <div className={styles.authorSignature}><strong>{insight.author}</strong><span>{insight.authorTitle}</span></div>
          <div className={styles.insuranceDisclaimer}><p>{englishData.disclaimer}</p><p lang="zh-CN">{chineseData.disclaimer}</p></div>
          <Link to={localePath('/insights')} className={styles.backLink}>{t('insightsPage.backToIndex')}</Link>
        </footer>
      </article>
    </div>
  )
}

function PartnershipVisual({ type }) {
  if (type === 'restaurant') return <figure className={styles.restaurantStory}><div><span>LEE</span><strong>Supplier whisperer</strong><small lang="zh-CN">最会和供应商谈价格</small></div><div><span>MAYA</span><strong>Customer instinct</strong><small lang="zh-CN">客人结账前就知道他会不会再来</small></div><div><span>DAVID</span><strong>Duct-tape confidence</strong><small lang="zh-CN">螺丝刀、胶带，以及不太合理的自信</small></div></figure>
  if (type === 'ledgers') return (
    <figure className={styles.ledgerGrid} aria-label="Three complementary partnership records">
      {[
        ['01', 'Business Books', '经营账', 'How is the business doing?', '公司经营得怎么样？'],
        ['02', 'Capital Account', '资本账户', 'Part of the ownership story', 'ownership story 的一部分'],
        ['03', 'Partner Basis Ledger', 'Partner Basis 记录', 'The Partner’s tax story', '每位 Partner 的税务故事'],
      ].map(([n, en, zh, desc, descZh]) => <section key={n}><span>{n}</span><h3>{en}</h3><h4 lang="zh-CN">{zh}</h4><p>{desc}</p><small lang="zh-CN">{descZh}</small></section>)}
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
    return <figure className={styles.basisRollforward}><figcaption>Lee’s simplified Outside Basis rollforward<small lang="zh-CN">Lee 的简化 Outside Basis 变动表</small></figcaption>{rows.map(([en, zh, amount, tone]) => <div key={en}><p>{en}<small lang="zh-CN">{zh}</small></p><strong className={tone ? styles[tone] : ''}>{amount}</strong></div>)}<div className={styles.basisTotal}><p>Ending Outside Basis<small lang="zh-CN">期末 Outside Basis</small></p><strong>$83,000</strong></div></figure>
  }
  if (type === 'basisRule') return <figure className={styles.basisRule}><div><span>+$30,000</span><strong>Income builds basis.</strong><small lang="zh-CN">Income 在建立 basis。</small></div><div><span>−$10,000</span><strong>Distribution uses basis.</strong><small lang="zh-CN">Distribution 在使用 basis。</small></div></figure>
  if (type === 'consequences') return <figure className={styles.consequenceGrid}>{[['01','Loss deductions','Loss deductions'],['02','Cash distributions','现金 distributions'],['03','Sale or exit','出售或退出'],['04','Debt changes','债务变化']].map(([n,en,zh])=><div key={n}><span>{n}</span><strong>{en}</strong><small lang="zh-CN">{zh}</small></div>)}</figure>
  if (type === 'missingLedger') return <figure className={styles.missingLedgerCard}>{[['Loss deduction','可能报得过高'],['Distribution gain','可能报得过低'],['Sale gain or loss','可能计算错误'],['Historical reconstruction','可能昂贵又费时']].map(([en,zh])=><div key={en}><strong>{en}</strong><small lang="zh-CN">{zh}</small></div>)}<p>Incorrect reporting may mean additional tax, statutory interest, and—depending on the facts—potential penalties.<small lang="zh-CN">错误申报可能带来 additional tax、statutory interest，以及视具体事实而定的 penalties。</small></p></figure>
  if (type === 'transaction') return <figure className={styles.transactionFlow}><div><strong>PARTNER</strong><small lang="zh-CN">合伙人</small></div><p><span>Money · Property · Debt</span><small lang="zh-CN">资金 · 财产 · 债务</small></p><div><strong>PARTNERSHIP</strong><small lang="zh-CN">合伙企业</small></div></figure>
  if (type === 'storyClose') return <figure className={styles.storyClose}><p>Three years later, Lee asks:</p><blockquote>“What is my basis?”</blockquote><p lang="zh-CN">三年后，Lee 再次问：“我的 basis 是多少？”</p><strong>This time, nobody stares at the ceiling.<br />Someone opens the Third Ledger. The history is there.</strong><small lang="zh-CN">这一次，没有人抬头盯着天花板。有人打开第三套账，历史都在那里。</small></figure>
  if (type === 'takeaway') return <figure className={styles.thirdLedgerTakeaway}>{[
    ['Business books tell you what the company did.', '公司的经营账，告诉你公司做了什么。'],
    ['Capital accounts tell you part of the ownership story.', 'Capital accounts，告诉你 ownership story 的一部分。'],
    ["Basis tells you the Partner's tax story.", 'Basis，告诉你每一位 Partner 自己的税务故事。'],
    ['A good Partnership should know where all three stories are being kept.', '一个经营得好的 Partnership，应该知道这三个故事分别被记录在哪里。'],
  ].map(([en,zh])=><div key={en}><p>{en}</p><small lang="zh-CN">{zh}</small></div>)}</figure>
  return null
}

function PartnershipEditorialArticle({ insight, englishData, chineseData, t, localePath, isFallback }) {
  return <div className={`${styles.wrap} ${styles.insuranceWrap} ${styles.partnershipWrap} page-enter`}><article lang="en">
    <header className={styles.insuranceHero}><p className={styles.editorialEyebrow}>ONYX INSIGHT #{String(insight.insightNumber).padStart(3, '0')}</p>{isFallback && <p className={styles.languageNotice}>{t('insightsPage.languageNotice')}</p>}<h1>{englishData.title}</h1><p className={styles.insuranceTitleZh} lang="zh-CN">{chineseData.title}</p><div className={styles.insuranceSubtitle}><p>{englishData.subtitle}</p><p lang="zh-CN">{chineseData.subtitle}</p></div><div className={styles.editorialByline}><strong>{insight.author}</strong><span>{insight.authorTitle}</span><small>{englishData.readingTime} {t('insightsPage.minReadSuffix')}</small></div></header>
    <div className={styles.insuranceBody}>{englishData.blocks.map((block, i) => {
      const zh = chineseData.blocks[i]
      if (block.type === 'h2') return <section key={i} className={styles.insuranceHeading}><span>{block.eyebrow}</span><h2>{block.title}</h2><p lang="zh-CN">{zh.title}</p></section>
      if (['restaurant','ledgers','rollforward','basisRule','consequences','missingLedger','transaction','storyClose','takeaway'].includes(block.type)) return <PartnershipVisual key={i} type={block.type} />
      if (block.type === 'callout') return <aside key={i} className={styles.insuranceCallout}><p>{block.text}</p><p lang="zh-CN">{zh.text}</p></aside>
      if (block.type === 'quote') return <blockquote key={i} className={styles.insuranceQuote}><p>{block.text}</p><p lang="zh-CN">{zh.text}</p></blockquote>
      if (block.type === 'list') return <ul key={i} className={styles.insuranceList}>{block.items.map((item,j)=><li key={item}><span>{item}</span><small lang="zh-CN">{zh.items[j]}</small></li>)}</ul>
      if (block.type === 'cta') return <aside key={i} className={styles.partnershipCta}><p>{block.text}</p><p lang="zh-CN">{zh.text}</p><Link to={localePath('/contact')}>Contact ONYX · 联系黑曜</Link></aside>
      return <div key={i} className={`${styles.insurancePair} ${block.lead ? styles.insuranceLead : ''}`}><p>{block.text}</p><p lang="zh-CN">{zh.text}</p></div>
    })}</div>
    <footer className={styles.insuranceFooter}><section className={styles.sourceList}><h2>{englishData.sourcesTitle}<small lang="zh-CN">{chineseData.sourcesTitle}</small></h2><ul>{englishData.sources.map(source=><li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></section><div className={styles.authorSignature}><strong>{insight.author}</strong><span>{insight.authorTitle}</span></div><div className={styles.insuranceDisclaimer}><p>{englishData.disclaimer}</p><p lang="zh-CN">{chineseData.disclaimer}</p></div><Link to={localePath('/insights')} className={styles.backLink}>{t('insightsPage.backToIndex')}</Link></footer>
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
          headline: data.titleEn || data.title,
          description: data.seoDescription,
          datePublished: insight.publishDate,
          inLanguage: resolvedLocale === 'zh' ? 'zh-CN' : 'en-US',
          author: { '@type': 'Person', name: data.author || insight.author },
          publisher: { '@type': 'Organization', name: 'ONYX Wealth & Wellness Club' },
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
