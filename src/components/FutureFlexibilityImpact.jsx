import styles from './DecisionGuidePage.module.css'

export default function FutureFlexibilityImpact({ data, localize }) {
  return <section className={styles.flexibility} aria-labelledby="future-flexibility-title">
    <p className={styles.eyebrow}>FUTURE FLEXIBILITY IMPACT</p>
    <h2 id="future-flexibility-title">{localize(data.message)}</h2>
    <div className={styles.flexFlow}><article><span>{localize({en:"Today's decision",zh:'今天的决定'})}</span><strong>{localize(data.today)}</strong></article><i aria-hidden="true">→</i><article><span>{localize({en:'Potential future connection',zh:'以后可能产生的关联'})}</span><strong>{localize(data.future)}</strong></article></div>
  </section>
}
