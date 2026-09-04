import styles from './DecisionGuidePage.module.css'

export default function BeforeYouAct({ decision, localize }) {
  return <section className={styles.before} aria-labelledby="before-you-act-title">
    <p className={styles.eyebrow}>{localize({en:'BEFORE YOU ACT',zh:'行动之前'})}</p>
    <h2 id="before-you-act-title">{localize({en:'This decision may affect another part of your financial plan.',zh:'这一步，可能会影响财务计划里的另一项安排。'})}</h2>
    <div className={styles.beforeGrid}><article><span>{localize({en:"You're considering",zh:'你正在考虑'})}</span><strong>{localize(decision.beforeYouAct.considering)}</strong></article><article><span>{localize({en:'This may connect to',zh:'它可能关联到'})}</span><ul>{decision.beforeYouAct.connectsTo.map(item=><li key={localize(item)}>{localize(item)}</li>)}</ul></article></div>
    <h3>{localize({en:'Information worth gathering',zh:'先把这些资料找出来'})}</h3>
    <ul className={styles.gather}>{decision.informationToGather.map(item=><li key={localize(item)}>{localize(item)}</li>)}</ul>
    <p className={styles.privacy}>{localize({en:'Do not enter or upload Social Security numbers, full account numbers, passwords, credentials, or sensitive documents.',zh:'不要在这里填写或上传社会安全号码、完整账号、密码、登录信息或敏感文件。'})}</p>
  </section>
}
