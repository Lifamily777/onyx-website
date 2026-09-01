import { CAPITAL_LAYERS } from '../features/capitalAssessment'
import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import {
  getExpandedStructureIds, LAYER_STATUS_COPY, LEGACY_COPY, NEXT_DOLLAR_EXPLANATIONS,
  RISK_COPY, STRUCTURE_DIMENSIONS, STRUCTURE_EXPLANATIONS, STRUCTURE_STATUS_COPY,
  TEMPERAMENT_COPY,
} from '../features/capitalAssessment/data/resultPresentation'
import styles from './CapitalAssessmentResult.module.css'

function Pair({ en, zh, className = '' }) {
  return <span className={className}>{en}<span lang="zh-Hans">{zh}</span></span>
}

export default function CapitalAssessmentResult({ result, onRetake }) {
  const { localePath } = useLocale()
  if (!result) return null
  const primaryLayer = result.primaryPosition && CAPITAL_LAYERS.find((layer) => layer.id === result.primaryPosition.layer)
  const expanded = new Set(getExpandedStructureIds(result.capitalStructure))
  const risk = RISK_COPY[result.riskProfile]
  const temperament = TEMPERAMENT_COPY[result.temperament.primary]
  const secondary = result.temperament.hybrid ? TEMPERAMENT_COPY[result.temperament.secondary] : null
  const legacy = LEGACY_COPY[result.legacyOrientation]
  const nextExplanation = NEXT_DOLLAR_EXPLANATIONS[primaryLayer?.id || 'all_solid']

  return <main className={`${styles.resultPage} page-enter`}>
    <header className={styles.hero}>
      <p className={styles.eyebrow}>ONYX Capital Map <span lang="zh-Hans">ONYX 家庭资本地图</span></p>
      <h1>Your Capital Ladder<span lang="zh-Hans">你的家庭资本阶梯</span></h1>
      <p>A structural view of what your household capital may need to do next.<span lang="zh-Hans">从结构出发，看清家庭资本下一步可能最需要完成什么。</span></p>
    </header>

    <div className={styles.resultBody}>
      <section aria-labelledby="ladder-heading" className={styles.section}>
        <h2 id="ladder-heading" className={styles.visuallyHidden}>Your Capital Ladder</h2>
        <ol className={styles.capitalLadder} reversed>
          {[...CAPITAL_LAYERS].reverse().map((layer) => {
            const layerResult = result.layers.find((item) => item.id === layer.id)
            const status = LAYER_STATUS_COPY[layerResult.status]
            const isPrimary = primaryLayer?.id === layer.id
            return <li key={layer.id} className={`${styles.ladderStep} ${styles[layerResult.status]} ${isPrimary ? styles.primaryStep : ''}`}>
              <span className={styles.stepNumber}>{layer.order}</span>
              <Pair className={styles.stepName} en={layer.name} zh={layer.nameZh} />
              <span className={styles.statusMarker} aria-hidden="true">{status.marker}</span>
              <Pair className={styles.stepStatus} en={status.label} zh={status.labelZh} />
              {isPrimary && <Pair className={styles.primaryFlag} en="Primary position" zh="当前优先层级" />}
            </li>
          })}
        </ol>
      </section>

      <section className={`${styles.section} ${styles.primaryPosition}`} aria-labelledby="primary-heading">
        <p className={styles.sectionKicker}>Primary Capital Position <span lang="zh-Hans">家庭资本当前优先层级</span></p>
        {primaryLayer ? <>
          <h2 id="primary-heading"><Pair en={primaryLayer.name} zh={primaryLayer.nameZh} /></h2>
          <Pair className={styles.largeStatus} en={LAYER_STATUS_COPY[result.primaryPosition.status].label} zh={LAYER_STATUS_COPY[result.primaryPosition.status].labelZh} />
        </> : <h2 id="primary-heading"><Pair en="Solid across all six layers" zh="六个层级均较为稳固" /></h2>}
        <Pair className={styles.narrative} en={result.narratives.summary} zh={result.narratives.summaryZh} />
      </section>

      <section className={`${styles.section} ${styles.nextDollar}`} aria-labelledby="next-dollar-heading">
        <p className={styles.sectionKicker}>Capital has an order. <span lang="zh-Hans">资本有先后顺序。</span></p>
        <h2 id="next-dollar-heading">What Should Your Next Dollar Do?<span lang="zh-Hans">你的下一块钱，最应该先做什么？</span></h2>
        <Pair className={styles.action} en={result.nextDollar.action} zh={result.nextDollar.actionZh} />
        <Pair className={styles.narrative} en={nextExplanation.en} zh={nextExplanation.zh} />
      </section>

      <section className={styles.section} aria-labelledby="structure-heading">
        <div className={styles.sectionHeading}><h2 id="structure-heading">Capital Structure<span lang="zh-Hans">家庭资本结构</span></h2><p>No numerical score is shown; each dimension is a directional structural view.<span lang="zh-Hans">这里不显示数字分数；每一项都是方向性的结构观察。</span></p></div>
        <div className={styles.structureGrid}>
          {STRUCTURE_DIMENSIONS.map((dimension) => {
            const value = result.capitalStructure[dimension.id]
            const status = STRUCTURE_STATUS_COPY[value.status]
            return <article key={dimension.id} className={`${styles.structureCard} ${styles[`structure_${value.status}`]}`}>
              <Pair className={styles.cardTitle} en={dimension.name} zh={dimension.nameZh} />
              <Pair className={styles.cardStatus} en={status.label} zh={status.labelZh} />
              {expanded.has(dimension.id) && <Pair className={styles.cardExplanation} en={STRUCTURE_EXPLANATIONS[dimension.id].en} zh={STRUCTURE_EXPLANATIONS[dimension.id].zh} />}
            </article>
          })}
        </div>
      </section>

      <div className={styles.twoColumn}>
        <section className={`${styles.section} ${styles.profileCard}`} aria-labelledby="risk-heading">
          <p className={styles.sectionKicker}>Structural view <span lang="zh-Hans">结构观察</span></p>
          <h2 id="risk-heading">Family &amp; Business Risk<span lang="zh-Hans">家庭与经营风险</span></h2>
          <Pair className={styles.profileLabel} en={risk.label} zh={risk.labelZh} />
          <Pair className={styles.profileExplanation} en={risk.en} zh={risk.zh} />
        </section>

        <section className={`${styles.section} ${styles.profileCard}`} aria-labelledby="temperament-heading">
          <p className={styles.sectionKicker}>Behavioral education <span lang="zh-Hans">行为教育</span></p>
          <h2 id="temperament-heading">Investment Temperament<span lang="zh-Hans">资本决策倾向</span></h2>
          <p className={styles.profileLabel}>{temperament.label}{secondary && <> <span className={styles.withText}>with {secondary.label} tendencies</span></>}<span lang="zh-Hans">{temperament.labelZh}{secondary && `，同时具有${secondary.tendencyZh}`}</span></p>
          <Pair className={styles.profileExplanation} en={temperament.en} zh={temperament.zh} />
          {legacy && <div className={styles.legacy}><p>Legacy Orientation <span lang="zh-Hans">传承关注点</span></p><Pair en={legacy.en} zh={legacy.zh} /></div>}
        </section>
      </div>

      <section className={styles.section} aria-labelledby="exploring-heading">
        <div className={styles.sectionHeading}><h2 id="exploring-heading">Worth Exploring Next<span lang="zh-Hans">接下来值得进一步思考</span></h2><p>Discussion prompts, not product recommendations.<span lang="zh-Hans">这些是讨论提示，不是产品建议。</span></p></div>
        {result.worthExploring.length ? <div className={styles.topicGrid}>{result.worthExploring.slice(0, 3).map((topic, index) => <article key={topic.tag} className={styles.topicCard}>
          <span className={styles.topicNumber}>0{index + 1}</span><h3><Pair en={topic.title} zh={topic.titleZh} /></h3><Pair className={styles.topicQuestion} en={topic.question} zh={topic.questionZh} />
        </article>)}</div> : <Pair className={styles.emptyTopics} en="No single discussion topic currently outranks the others. Continued coordination across the full structure may be most useful." zh="目前没有某一个讨论主题明显优先于其他主题。持续协调整体结构可能更有价值。" />}
      </section>

      <footer className={styles.resultFooter}>
        <h2>Use your Capital Map as a starting point for a deeper financial conversation.<span lang="zh-Hans">把这张家庭资本地图，当作下一次深入财务讨论的起点。</span></h2>
        <Link className={styles.educationLink} to={localePath('/wealth')}>Explore ONYX Wealth Education<span lang="zh-Hans">继续了解 ONYX 财富教育</span></Link>
        <button type="button" className={styles.retakeButton} onClick={onRetake}>Retake Assessment<span lang="zh-Hans">重新自测</span></button>
        <p className={styles.disclaimer}>This assessment is designed for educational and self-reflection purposes. It does not provide individualized investment, tax, legal, or insurance advice.<span lang="zh-Hans">本自测仅用于教育与自我梳理，不构成针对个人情况的投资、税务、法律或保险建议。</span></p>
      </footer>
    </div>
  </main>
}
