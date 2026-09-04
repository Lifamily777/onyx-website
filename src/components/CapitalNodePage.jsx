import LocaleLabel from "./LocaleLabel";
import Localized from "./Localized";
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { getWealthNode, LIFE_CAPITAL_STAGES, getLifeEvent, DOWNLOAD_TEMPLATES, downloadTemplate, calculateEmergencyLiquidity, calculateDebtPaths, calculateMonthlySurplus, summarizeLargeExpenses, calculateConcentration, calculateForcedSale, compareNextDollar, calculateIncomeContinuity, calculateOptionalityRunway, EDUCATIONAL_DISCLAIMER } from '../features/lifeCapitalMap';
import NotFound from './NotFound';
import styles from './CapitalMap.module.css';
const TOOL_FIELDS = {
  W1: [['housing', 'Housing'], ['utilities', 'Utilities'], ['food', 'Food'], ['transportation', 'Transportation'], ['insurance', 'Insurance'], ['care', 'Childcare / eldercare'], ['debt', 'Required debt payments'], ['other', 'Other core costs'], ['reserve', 'Current liquid reserve']],
  W2: [['balance', 'Debt balance'], ['apr', 'APR %'], ['minimum', 'Minimum monthly payment'], ['surplus', 'Available monthly surplus'], ['reserve', 'Current liquid reserve']],
  W8: [['inflow', 'Usable monthly cash inflow'], ['core', 'Core expenses'], ['debt', 'Required debt payments'], ['insurance', 'Necessary insurance'], ['tax', 'Tax reserve'], ['commitments', 'Other essential commitments']],
  W9: [['event', 'Planned expense / life event', 'text'], ['date', 'Target date', 'date'], ['amount', 'Estimated amount'], ['funded', 'Amount already funded'], ['notes', 'Notes / next action', 'text']],
  W13: [['expenses', 'Annual core expenses'], ['debt', 'Debt obligations'], ['years', 'Years of support needed'], ['assets', 'Liquid assets available'], ['coverage', 'Existing coverage'], ['income', 'Reliable continuing income']],
  W18: [['largest', 'Largest single exposure'], ['productive', 'Total productive assets'], ['incomeDependence', 'Annual income tied to that exposure'], ['liabilities', 'Liabilities tied to that exposure'], ['liquidity', 'Liquid assets outside that exposure']],
  W24: [['monthly', 'Monthly core expenses'], ['reserve', 'Liquid reserve'], ['interruption', 'Income interruption months'], ['investments', 'Investment balance'], ['decline', 'Market decline assumption %']],
  W25: [['reserveMonths', 'Reserve months'], ['debtApr', 'Highest debt APR %'], ['expenseGap', 'Known expense funding gap'], ['taxNeed', 'Tax reserve need'], ['horizon', 'Investment horizon (years)'], ['riskCapacity', 'Risk-capacity score (1–5)'], ['monthly', 'Available next dollar']],
  W31: [['essentials', 'Monthly essential spending'], ['reserve', 'Liquid reserve'], ['income', 'Reliable monthly income']]
};
const blankValues = nodeId => Object.fromEntries((TOOL_FIELDS[nodeId] || []).map(([key]) => [key, '']));
function ToolResult({
  result,
  nodeId
}) {
  if (!result) return null;
  if (nodeId === 'W25') return <div className={styles.nextDollarResult}><header><strong><Localized en={<>SEE · Compare six capital jobs</>} zh={<>查看 · 比较六种资本任务</>} /></strong><p><Localized en={<>Blank inputs are treated as zero. These cards stay in a fixed order: there is no ranking, winner, or universal best answer.</>} zh={<>空白输入按零处理。卡片顺序固定，不提供排名、赢家或普遍最佳答案。</>} /></p></header><dl className={styles.assumptions}><div><dt><LocaleLabel value={"Reserve months"} /></dt><dd><LocaleLabel value={result.assumptions.reserveMonths} /></dd></div><div><dt><LocaleLabel value={"Highest APR"} /></dt><dd><LocaleLabel value={result.assumptions.debtApr} />%</dd></div><div><dt><LocaleLabel value={"Known expense gap"} /></dt><dd>$<LocaleLabel value={result.assumptions.knownExpenseGap.toLocaleString('en-US')} /></dd></div><div><dt><LocaleLabel value={"Tax reserve need"} /></dt><dd>$<LocaleLabel value={result.assumptions.taxReserveNeed.toLocaleString('en-US')} /></dd></div><div><dt><LocaleLabel value={"Investment horizon"} /></dt><dd><LocaleLabel value={result.assumptions.investmentHorizon} /><LocaleLabel value={" years"} /></dd></div><div><dt><LocaleLabel value={"Risk-capacity input"} /></dt><dd><LocaleLabel value={result.assumptions.riskCapacity} />/5</dd></div><div><dt><LocaleLabel value={"Available amount"} /></dt><dd>$<LocaleLabel value={result.assumptions.availableAmount.toLocaleString('en-US')} /></dd></div></dl><div className={styles.nextDollarGrid}>{result.jobs.map(job => <article key={job.id}><h3><Localized en={<><LocaleLabel value={job.label} /></>} zh={<><LocaleLabel value={job.labelZh} /></>} /></h3><p><Localized en={<><LocaleLabel value={job.role} /></>} zh={<><LocaleLabel value={job.roleZh} /></>} /></p><div><strong><Localized en={<>Current signal</>} zh={<>当前信号</>} /></strong><p><Localized en={<><LocaleLabel value={job.signal} /></>} zh={<><LocaleLabel value={job.signalZh} /></>} /></p></div><div><strong><Localized en={<>Trade-off</>} zh={<>取舍</>} /></strong><p><Localized en={<><LocaleLabel value={job.tradeoff} /></>} zh={<><LocaleLabel value={job.tradeoffZh} /></>} /></p></div></article>)}</div></div>;
  if (result.paths) return <div className={styles.result}><strong><Localized en={<>Educational comparison</>} zh={<>教育性比较</>} /></strong><p><LocaleLabel value={"No path is ranked as a winner. All amounts use the assumptions entered above."} /></p><div className={styles.pathGrid}>{result.paths.map(path => <article key={path.id}><h3><LocaleLabel value={path.label} /></h3><dl><div><dt><LocaleLabel value={"Debt payment"} /></dt><dd>$<LocaleLabel value={path.debtPayment.toLocaleString('en-US', {
                maximumFractionDigits: 2
              })} /></dd></div><div><dt><LocaleLabel value={"Reserve addition"} /></dt><dd>$<LocaleLabel value={path.reserveAddition.toLocaleString('en-US', {
                maximumFractionDigits: 2
              })} /></dd></div><div><dt><LocaleLabel value={"Estimated first-month interest"} /></dt><dd>$<LocaleLabel value={path.estimatedFirstMonthInterest.toLocaleString('en-US', {
                maximumFractionDigits: 2
              })} /></dd></div></dl></article>)}</div></div>;
  const labels = {
    monthlyCoreExpense: 'Monthly core expense',
    sixMonthReserve: 'Six-month planning benchmark',
    reserveMonths: 'Reserve months',
    monthlySurplus: 'Monthly surplus',
    annualSurplus: 'Annual surplus',
    fiveYearDeployableCapital: 'Five-year capital before return assumptions',
    total: 'Total planned expense',
    funded: 'Amount funded',
    fundingGap: 'Funding gap',
    count: 'Items entered',
    ratio: 'Concentration ratio',
    percentage: 'Concentration percentage',
    band: 'Planning band',
    incomeDependence: 'Income tied to exposure',
    linkedLiabilities: 'Liabilities tied to exposure',
    outsideLiquidity: 'Liquidity outside exposure',
    saleMayBeginMonth: 'Potential sale begins in month',
    stressedAssets: 'Assets after decline assumption',
    remainingAssetsAfterGap: 'Assets remaining after illustrated gap',
    illustratedNeed: 'Illustrated continuity need',
    existingResources: 'Existing illustrated resources',
    educationalGap: 'Educational gap',
    monthlyGap: 'Monthly gap',
    runwayMonths: 'Runway months'
  };
  const entries = Object.entries(result).filter(([, value]) => ['string', 'number'].includes(typeof value) || value === null);
  return <div className={styles.result}><strong><Localized en={<>Educational result</>} zh={<>教育性结果</>} /></strong><dl className={styles.resultList}>{entries.map(([key, value]) => <div key={key}><dt><LocaleLabel value={labels[key] || key} /></dt><dd><LocaleLabel value={value === null ? 'Not triggered' : typeof value === 'number' ? value.toLocaleString('en-US', {
            maximumFractionDigits: 2
          }) : String(value).replaceAll('_', ' ')} /></dd></div>)}</dl><p><LocaleLabel value={"Review the assumptions and trade-offs before acting. This output is not individualized advice."} /></p></div>;
}
function NodeTool({
  node
}) {
  const [values, setValues] = useState(() => blankValues(node.id)),
    [selected, setSelected] = useState([]);
  const result = useMemo(() => {
    if (node.id === 'W1') return calculateEmergencyLiquidity({
      expenses: {
        housing: values.housing,
        utilities: values.utilities,
        food: values.food,
        transportation: values.transportation,
        insurance: values.insurance,
        care: values.care,
        debt: values.debt,
        other: values.other
      },
      currentReserve: values.reserve
    });
    if (node.id === 'W2') return calculateDebtPaths({
      debtBalance: values.balance,
      apr: values.apr,
      minimumPayment: values.minimum,
      monthlySurplus: values.surplus,
      liquidReserve: values.reserve
    });
    if (node.id === 'W8') return calculateMonthlySurplus({
      cashInflow: values.inflow,
      coreExpenses: values.core,
      requiredDebt: values.debt,
      necessaryInsurance: values.insurance,
      taxReserve: values.tax,
      essentialCommitments: values.commitments
    });
    if (node.id === 'W9') return summarizeLargeExpenses([{
      name: values.event,
      targetDate: values.date,
      amount: values.amount,
      fundedAmount: values.funded,
      notes: values.notes
    }]);
    if (node.id === 'W18') return {
      ...calculateConcentration({
        largestExposure: values.largest,
        productiveAssets: values.productive
      }),
      incomeDependence: Number(values.incomeDependence || 0),
      linkedLiabilities: Number(values.liabilities || 0),
      outsideLiquidity: Number(values.liquidity || 0)
    };
    if (node.id === 'W24') return calculateForcedSale({
      monthlyCoreExpenses: values.monthly,
      liquidReserve: values.reserve,
      incomeInterruptionMonths: values.interruption,
      investmentBalance: values.investments,
      marketDeclinePercent: values.decline
    });
    if (node.id === 'W25') return compareNextDollar({
      reserveMonths: Number(values.reserveMonths),
      debtApr: Number(values.debtApr),
      knownExpenseGap: Number(values.expenseGap),
      taxReserveNeed: Number(values.taxNeed),
      investmentHorizon: Number(values.horizon),
      riskCapacity: Number(values.riskCapacity),
      availableAmount: Number(values.monthly),
      longTermInvesting: Number(values.horizon) >= 5
    });
    if (node.id === 'W13') return calculateIncomeContinuity({
      annualCoreExpenses: values.expenses,
      debtObligations: values.debt,
      supportYears: values.years,
      liquidAssets: values.assets,
      existingCoverage: values.coverage,
      reliableIncome: values.income
    });
    if (node.id === 'W31') return calculateOptionalityRunway({
      monthlyEssentials: values.essentials,
      liquidReserve: values.reserve,
      reliableMonthlyIncome: values.income
    });
    return null;
  }, [node.id, values]);
  if (node.id === 'W10') {
    const paths = {
      '1099 / freelance': ['Estimated tax and self-employment tax prompts', 'Start a Business', 'Non-W2 Income Checklist'],
      'Schedule C business': ['Business records and expense classification', 'Start a Business', 'Non-W2 Income Checklist'],
      'Partnership / LLC K-1': ['Outside basis, liabilities, and cash-vs-income timing', 'Add a Partner / Investor', 'The Third Ledger'],
      'S corporation K-1': ['Payroll, reasonable compensation, distributions, and shareholder basis', 'S Corporation Election / Owner Compensation', 'Non-W2 Income Checklist'],
      'Rental property': ['Basis, depreciation, passive activity, and sale windows', 'Sell a Rental Property', 'Non-W2 Income Checklist']
    };
    return <section className={styles.tool}><h2><Localized en={<>TRY</>} zh={<>自己试一试</>} /></h2><p><LocaleLabel value={"Select every income path that applies. “I’m not sure” is a learning prompt, not a negative score."} /></p><div className={styles.checkGrid}>{node.ask.options.map(option => <label key={option}><input type="checkbox" checked={selected.includes(option)} onChange={() => setSelected(items => items.includes(option) ? items.filter(x => x !== option) : [...items, option])} /><LocaleLabel value={option} /></label>)}</div>{selected.filter(x => paths[x]).map(x => <div className={styles.result} key={x}><strong><LocaleLabel value={x} /><LocaleLabel value={" · Things Worth Knowing"} /></strong><p><LocaleLabel value={paths[x][0]} /></p><p><LocaleLabel value={"Related Event: "} /><LocaleLabel value={paths[x][1]} /></p><p><LocaleLabel value={"Tool / Insight: "} /><LocaleLabel value={paths[x][2]} /></p><p><LocaleLabel value={"Ask Sammi context is carried forward below."} /></p></div>)}</section>;
  }
  if (node.id === 'W19') return <section className={styles.tool}><h2><LocaleLabel value={"TRY · Capital Role Classifier"} /></h2><p><LocaleLabel value={"Classify each major asset by its primary job:"} /></p><div className={styles.checkGrid}>{['Stability Capital', 'Protection Capital', 'Productive/Growth Capital', 'Strategic/Opportunity Capital', 'Consumption Asset'].map(x => <label key={x}><input type="checkbox" /><LocaleLabel value={x} /></label>)}</div></section>;
  if (node.id === 'W11') return <section className={styles.tool}><h2><LocaleLabel value={"TRY · Tax Reserve Planning Worksheet"} /></h2><div className={styles.checkGrid}>{['Income sources listed', 'Withholding identified', 'Estimated payments recorded', 'State exposure noted', 'Separate reserve process'].map(x => <label key={x}><input type="checkbox" /><LocaleLabel value={x} /></label>)}</div><p><LocaleLabel value={"This is an educational planning prompt, not a tax-liability calculation."} /></p></section>;
  if (node.id === 'W30') return <section className={styles.tool}><h2><LocaleLabel value={"TRY · Event Radar"} /></h2><p><LocaleLabel value={"Choose an event, mark it Watch, Emerging, or Active, and gather the listed records before choices narrow."} /></p></section>;
  if (!result) return <section className={styles.tool}><h2><Localized en={<>TRY</>} zh={<>自己试一试</>} /></h2><p><LocaleLabel value={"This node’s Phase 1 tool is a structured worksheet rather than a personalized calculator."} /></p></section>;
  return <section className={styles.tool}><h2><Localized en={<>TRY</>} zh={<>自己试一试</>} /></h2><p className={styles.privacyNote}><Localized en={<>Inputs stay only on this page and are not saved or submitted.</>} zh={<>输入只停留在当前页面，不会保存或提交。</>} /></p><div className={styles.inputs}>{TOOL_FIELDS[node.id].map(([key, label, type = 'number']) => <label key={key}><LocaleLabel value={label} /><input type={type} min={type === 'number' ? '0' : undefined} value={values[key]} onChange={e => setValues(current => ({
          ...current,
          [key]: e.target.value
        }))} /></label>)}</div><ToolResult result={result} nodeId={node.id} /></section>;
}
export default function CapitalNodePage() {
  const {
      id
    } = useParams(),
    {
      localePath
    } = useLocale();
  const node = getWealthNode(id);
  const [answer, setAnswer] = useState('');
  useDocumentMeta(node ? `${node.title} | ONYX Life Capital Map` : 'Node not found', node?.shortDescription || '');
  if (!node) return <NotFound />;
  const stage = LIFE_CAPITAL_STAGES.find(s => s.id === node.stage);
  return <main className={`${styles.shell} ${styles.detail} page-enter`}><Link className={styles.back} to={localePath('/capital-map/wealth')}><Localized en={<>← Wealth Map</>} zh={<>财富地图</>} /></Link><header className={styles.detailHero}><p><Localized en={<><LocaleLabel value={node.id} /> · <LocaleLabel value={stage.name} /></>} zh={<><LocaleLabel value={stage.nameZh} /></>} /></p><h1><Localized en={<><LocaleLabel value={node.title} /></>} zh={<><LocaleLabel value={node.titleZh} /></>} /></h1><p><Localized en={<><LocaleLabel value={node.shortDescription} /></>} zh={<><LocaleLabel value={node.shortDescriptionZh} /></>} /></p></header>
<section className={styles.ask}><span><Localized en={<>ASK</>} zh={<>真实问题</>} /></span><h2><Localized en={<><LocaleLabel value={node.ask.question} /></>} zh={<><LocaleLabel value={node.ask.questionZh} /></>} /></h2><div>{node.ask.options.map(x => <button type="button" key={x} aria-pressed={answer === x} onClick={() => setAnswer(x)}><LocaleLabel value={x} /></button>)}</div>{answer && <p className={styles.reflectionResult} aria-live="polite"><Localized en={<>Your reflection: <strong><LocaleLabel value={answer} /></strong>. This does not change an assessment score.</>} zh={<>你的观察：<strong><LocaleLabel value={answer} /></strong>。这不会改变评估分数。</>} /></p>}</section>
<section className={styles.story}><span><Localized en={<>STORY</>} zh={<>生活案例</>} /></span><h2><Localized en={<><LocaleLabel value={node.story.title} /></>} zh={<><LocaleLabel value={node.story.titleZh} /></>} /></h2><p><Localized en={<><LocaleLabel value={node.story.body} /></>} zh={<><LocaleLabel value={node.story.bodyZh} /></>} /></p></section>
<section className={styles.prose}><span><Localized en={<>EXPLAIN</>} zh={<>解释概念</>} /></span><p><Localized en={<><LocaleLabel value={node.explain.body} /></>} zh={<><LocaleLabel value={node.explain.bodyZh} /></>} /></p></section><NodeTool node={node} />
{node.tools.map(tool => DOWNLOAD_TEMPLATES[tool.id] && <section className={styles.keep} key={tool.id}><span><Localized en={<>KEEP</>} zh={<>下载工具</>} /></span><h2><Localized en={<><LocaleLabel value={tool.title} /></>} zh={<><LocaleLabel value={tool.titleZh} /></>} /></h2><button type="button" onClick={() => downloadTemplate(tool.id)}><Localized en={<>Download CSV</>} zh={<>下载CSV</>} /></button><p><LocaleLabel value={"Do not store passwords, PINs, full SSNs, or full account numbers."} /></p></section>)}
<section className={styles.guidance}><article><span><LocaleLabel value={"SELF-MANAGE?"} /></span><h2><Localized en={<>When You May Be Able to Handle This Yourself</>} zh={<>什么情况下你可能可以先自己处理</>} /></h2><p><Localized en={<><LocaleLabel value={node.selfManage.body} /></>} zh={<><LocaleLabel value={node.selfManage.bodyZh} /></>} /></p></article><article><span><LocaleLabel value={"DEEPER REVIEW?"} /></span><h2><Localized en={<>When a Deeper Review May Be Useful</>} zh={<>什么情况下值得进一步梳理</>} /></h2><p><Localized en={<><LocaleLabel value={node.deeperReview.body} /></>} zh={<><LocaleLabel value={node.deeperReview.bodyZh} /></>} /></p><ul>{node.deeperReview.triggers.map(x => <li key={x}><LocaleLabel value={x} /></li>)}</ul></article></section>
{node.relatedEvents.length > 0 && <section className={styles.related}><h2><Localized en={<>Related Events</>} zh={<>相关事件</>} /></h2>{node.relatedEvents.map(id => {
        const event = getLifeEvent(id);
        return event ? <Link key={id} to={localePath(`/capital-map/event/${id}`)}><Localized en={<><LocaleLabel value={event.title} /></>} zh={<><LocaleLabel value={event.titleZh} /></>} /></Link> : null;
      })}</section>}
<section className={styles.insights}><h2><Localized en={<>Insight Seeds</>} zh={<>内容种子</>} /></h2>{node.insightSeeds.map(seed => <div key={seed.type}><span><LocaleLabel value={seed.type} /></span><strong><Localized en={<><LocaleLabel value={seed.title} /></>} zh={<><LocaleLabel value={seed.titleZh} /></>} /></strong><em><Localized en={<>Planned</>} zh={<>计划中</>} /></em></div>)}</section>
<section className={styles.askSammi}><span><LocaleLabel value={"ASK SAMMI"} /></span><h2><Localized en={<>Bring the context, not sensitive documents.</>} zh={<>带上问题背景即可，请不要发送敏感文件。</>} /></h2><Link to={`${localePath('/contact')}?context=${encodeURIComponent(node.askSammiContext)}`}><Localized en={<>Ask Sammi</>} zh={<>联系Sammi</>} /></Link></section><footer className={styles.disclaimer}><p><Localized en={<><LocaleLabel value={EDUCATIONAL_DISCLAIMER.en} /></>} zh={<><LocaleLabel value={EDUCATIONAL_DISCLAIMER.zh} /></>} /></p></footer></main>;
}
