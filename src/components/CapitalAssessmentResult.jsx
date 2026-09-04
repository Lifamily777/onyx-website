import LocaleLabel from "./LocaleLabel";
import Localized from "./Localized";
import { CAPITAL_LAYERS } from '../features/capitalAssessment';
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import { getExpandedStructureIds, LAYER_STATUS_COPY, LEGACY_COPY, NEXT_DOLLAR_EXPLANATIONS, RISK_COPY, STRUCTURE_DIMENSIONS, STRUCTURE_EXPLANATIONS, STRUCTURE_STATUS_COPY, TEMPERAMENT_COPY } from '../features/capitalAssessment/data/resultPresentation';
import styles from './CapitalAssessmentResult.module.css';
function Pair({
  en,
  zh,
  className = ''
}) {
  return <span className={className}><Localized en={<><LocaleLabel value={en} /></>} zh={<><LocaleLabel value={zh} /></>} /></span>;
}
export default function CapitalAssessmentResult({
  result,
  onRetake
}) {
  const {
    localePath
  } = useLocale();
  if (!result) return null;
  const primaryLayer = result.primaryPosition && CAPITAL_LAYERS.find(layer => layer.id === result.primaryPosition.layer);
  const expanded = new Set(getExpandedStructureIds(result.capitalStructure));
  const risk = RISK_COPY[result.riskProfile];
  const temperament = TEMPERAMENT_COPY[result.temperament.primary];
  const secondary = result.temperament.hybrid ? TEMPERAMENT_COPY[result.temperament.secondary] : null;
  const legacy = LEGACY_COPY[result.legacyOrientation];
  const nextExplanation = NEXT_DOLLAR_EXPLANATIONS[primaryLayer?.id || 'all_solid'];
  return <main className={`${styles.resultPage} page-enter`}>
    <header className={styles.hero}>
      <p className={styles.eyebrow}><Localized en={<>ONYX Capital Map </>} zh={<>ONYX 家庭资本地图</>} /></p>
      <h1><Localized en={<>Your Capital Ladder</>} zh={<>你的家庭资本阶梯</>} /></h1>
      <p><Localized en={<>A structural view of what your household capital may need to do next.</>} zh={<>从结构出发，看清家庭资本下一步可能最需要完成什么。</>} /></p>
    </header>

    <div className={styles.resultBody}>
      <section aria-labelledby="ladder-heading" className={styles.section}>
        <h2 id="ladder-heading" className={styles.visuallyHidden}><LocaleLabel value={"Your Capital Ladder"} /></h2>
        <ol className={styles.capitalLadder} reversed>
          {[...CAPITAL_LAYERS].reverse().map(layer => {
            const layerResult = result.layers.find(item => item.id === layer.id);
            const status = LAYER_STATUS_COPY[layerResult.status];
            const isPrimary = primaryLayer?.id === layer.id;
            return <li key={layer.id} className={`${styles.ladderStep} ${styles[layerResult.status]} ${isPrimary ? styles.primaryStep : ''}`}>
              <span className={styles.stepNumber}><LocaleLabel value={layer.order} /></span>
              <Pair className={styles.stepName} en={layer.name} zh={layer.nameZh} />
              <span className={styles.statusMarker} aria-hidden="true"><LocaleLabel value={status.marker} /></span>
              <Pair className={styles.stepStatus} en={status.label} zh={status.labelZh} />
              {isPrimary && <Pair className={styles.primaryFlag} en="Primary position" zh="当前优先层级" />}
            </li>;
          })}
        </ol>
      </section>

      <section className={`${styles.section} ${styles.primaryPosition}`} aria-labelledby="primary-heading">
        <p className={styles.sectionKicker}><Localized en={<>Primary Capital Position </>} zh={<>家庭资本当前优先层级</>} /></p>
        {primaryLayer ? <>
          <h2 id="primary-heading"><Pair en={primaryLayer.name} zh={primaryLayer.nameZh} /></h2>
          <Pair className={styles.largeStatus} en={LAYER_STATUS_COPY[result.primaryPosition.status].label} zh={LAYER_STATUS_COPY[result.primaryPosition.status].labelZh} />
        </> : <h2 id="primary-heading"><Pair en="Solid across all six layers" zh="六个层级均较为稳固" /></h2>}
        <Pair className={styles.narrative} en={result.narratives.summary} zh={result.narratives.summaryZh} />
      </section>

      <section className={`${styles.section} ${styles.nextDollar}`} aria-labelledby="next-dollar-heading">
        <p className={styles.sectionKicker}><Localized en={<>Capital has an order. </>} zh={<>资本有先后顺序。</>} /></p>
        <h2 id="next-dollar-heading"><Localized en={<>What Should Your Next Dollar Do?</>} zh={<>你的下一块钱，最应该先做什么？</>} /></h2>
        <Pair className={styles.action} en={result.nextDollar.action} zh={result.nextDollar.actionZh} />
        <Pair className={styles.narrative} en={nextExplanation.en} zh={nextExplanation.zh} />
      </section>

      <section className={styles.section} aria-labelledby="structure-heading">
        <div className={styles.sectionHeading}><h2 id="structure-heading"><Localized en={<>Capital Structure</>} zh={<>家庭资本结构</>} /></h2><p><Localized en={<>No numerical score is shown; each dimension is a directional structural view.</>} zh={<>这里不显示数字分数；每一项都是方向性的结构观察。</>} /></p></div>
        <div className={styles.structureGrid}>
          {STRUCTURE_DIMENSIONS.map(dimension => {
            const value = result.capitalStructure[dimension.id];
            const status = STRUCTURE_STATUS_COPY[value.status];
            return <article key={dimension.id} className={`${styles.structureCard} ${styles[`structure_${value.status}`]}`}>
              <Pair className={styles.cardTitle} en={dimension.name} zh={dimension.nameZh} />
              <Pair className={styles.cardStatus} en={status.label} zh={status.labelZh} />
              {expanded.has(dimension.id) && <Pair className={styles.cardExplanation} en={STRUCTURE_EXPLANATIONS[dimension.id].en} zh={STRUCTURE_EXPLANATIONS[dimension.id].zh} />}
            </article>;
          })}
        </div>
      </section>

      <div className={styles.twoColumn}>
        <section className={`${styles.section} ${styles.profileCard}`} aria-labelledby="risk-heading">
          <p className={styles.sectionKicker}><Localized en={<>Structural view </>} zh={<>结构观察</>} /></p>
          <h2 id="risk-heading"><Localized en={<>Family &amp; Business Risk</>} zh={<>家庭与经营风险</>} /></h2>
          <Pair className={styles.profileLabel} en={risk.label} zh={risk.labelZh} />
          <Pair className={styles.profileExplanation} en={risk.en} zh={risk.zh} />
        </section>

        <section className={`${styles.section} ${styles.profileCard}`} aria-labelledby="temperament-heading">
          <p className={styles.sectionKicker}><Localized en={<>Behavioral education </>} zh={<>行为教育</>} /></p>
          <h2 id="temperament-heading"><Localized en={<>Investment Temperament</>} zh={<>资本决策倾向</>} /></h2>
          <p className={styles.profileLabel}><Localized en={<><LocaleLabel value={temperament.label} />{secondary && <> <span className={styles.withText}>with <LocaleLabel value={secondary.label} /> tendencies</span></>}</>} zh={<><LocaleLabel value={temperament.labelZh} />{secondary && `，同时具有${secondary.tendencyZh}`}</>} /></p>
          <Pair className={styles.profileExplanation} en={temperament.en} zh={temperament.zh} />
          {legacy && <div className={styles.legacy}><p><Localized en={<>Legacy Orientation </>} zh={<>传承关注点</>} /></p><Pair en={legacy.en} zh={legacy.zh} /></div>}
        </section>
      </div>

      <section className={styles.section} aria-labelledby="exploring-heading">
        <div className={styles.sectionHeading}><h2 id="exploring-heading"><Localized en={<>Worth Exploring Next</>} zh={<>接下来值得进一步思考</>} /></h2><p><Localized en={<>Discussion prompts, not product recommendations.</>} zh={<>这些是讨论提示，不是产品建议。</>} /></p></div>
        {result.worthExploring.length ? <div className={styles.topicGrid}>{result.worthExploring.slice(0, 3).map((topic, index) => <article key={topic.tag} className={styles.topicCard}>
          <span className={styles.topicNumber}>0<LocaleLabel value={index + 1} /></span><h3><Pair en={topic.title} zh={topic.titleZh} /></h3><Pair className={styles.topicQuestion} en={topic.question} zh={topic.questionZh} />
        </article>)}</div> : <Pair className={styles.emptyTopics} en="No single discussion topic currently outranks the others. Continued coordination across the full structure may be most useful." zh="目前没有某一个讨论主题明显优先于其他主题。持续协调整体结构可能更有价值。" />}
      </section>

      <footer className={styles.resultFooter}>
        <h2><Localized en={<>Use your Capital Map as a starting point for a deeper financial conversation.</>} zh={<>把这张家庭资本地图，当作下一次深入财务讨论的起点。</>} /></h2>
        <Link className={styles.educationLink} to={localePath('/wealth')}><Localized en={<>Explore ONYX Wealth Education</>} zh={<>继续了解 ONYX 财富教育</>} /></Link>
        <button type="button" className={styles.retakeButton} onClick={onRetake}><Localized en={<>Retake Assessment</>} zh={<>重新自测</>} /></button>
        <p className={styles.disclaimer}><Localized en={<>This assessment is designed for educational and self-reflection purposes. It does not provide individualized investment, tax, legal, or insurance advice.</>} zh={<>本自测仅用于教育与自我梳理，不构成针对个人情况的投资、税务、法律或保险建议。</>} /></p>
      </footer>
    </div>
  </main>;
}
