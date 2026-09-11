const sources = [
  { label: 'IRS — Accuracy-related penalty', href: 'https://www.irs.gov/payments/accuracy-related-penalty' },
  { label: 'IRS Internal Revenue Manual 20.1.5 — Return-related penalties', href: 'https://www.irs.gov/irm/part20/irm_20-001-005' },
  { label: '26 U.S.C. § 6662 — Accuracy-related penalty', href: 'https://uscode.house.gov/view.xhtml?req=(title:26%20section:6662%20edition:prelim)' },
  { label: '26 U.S.C. § 6663 — Imposition of fraud penalty', href: 'https://uscode.house.gov/view.xhtml?req=(title:26%20section:6663%20edition:prelim)' },
]

const comparisonEn = [
  { name:'Negligence', trigger:'Careless or unreasonable tax-reporting behavior', rate:'20%', base:'Relevant underpayment' },
  { name:'Substantial Understatement', trigger:'Understatement exceeds the applicable statutory threshold', rate:'20%', base:'Applicable underpayment' },
  { name:'Substantial Valuation Misstatement', trigger:'Reported value or basis generally reaches at least 150% of the correct amount, plus the applicable underpayment threshold', rate:'20%', base:'Underpayment attributable to the valuation misstatement' },
  { name:'Gross Valuation Misstatement', trigger:'Reported value or basis generally reaches at least 200% of the correct amount', rate:'40%', base:'Underpayment attributable to the gross valuation misstatement' },
  { name:'Fraud', trigger:'Intentional tax underpayment', rate:'75%', base:'Underpayment attributable to fraud' },
]

const comparisonZh = [
  { name:'Negligence（疏忽）', trigger:'报税行为粗心或不合理', rate:'20%', base:'与该问题相关的少缴税款' },
  { name:'Substantial Understatement（重大少报）', trigger:'少报税额超过适用的法定门槛', rate:'20%', base:'适用的少缴税款' },
  { name:'Substantial Valuation Misstatement（重大估值错报）', trigger:'申报价值或 basis 通常达到正确金额的至少 150%，并超过适用的少缴税额门槛', rate:'20%', base:'由估值错报造成的少缴税款' },
  { name:'Gross Valuation Misstatement（严重估值错报）', trigger:'申报价值或 basis 通常达到正确金额的至少 200%', rate:'40%', base:'由严重估值错报造成的少缴税款' },
  { name:'Fraud（欺诈）', trigger:'故意少缴税款', rate:'75%', base:'由欺诈造成的少缴税款' },
]

const en = {
  title:'One Tax Mistake, Four Very Different Penalties',
  subtitle:'The missing tax matters. The reason it went missing can matter just as much.',
  seoTitle:'One Tax Mistake, Four Very Different Penalties | ONYX',
  seoDescription:'Understand how negligence, substantial understatement, valuation misstatements, and fraud can lead to different federal tax penalty rates.',
  readingTime:10,
  intro:[
    'Imagine four business owners walking into an IRS office on the same Monday morning.',
    'All four have the same problem: they paid less tax than they should have.',
    'Tom was careless. Mary tried to file correctly, but her tax understatement was large. David got the value or tax basis of an asset seriously wrong. And Jack? Jack knew exactly what he was doing. He intentionally hid income.',
    'They all underpaid tax. But the IRS does not necessarily treat them the same way.',
    'When the IRS looks at an underpayment, it does not just ask, “How much tax is missing?” It also asks, “Why is it missing?” That “why” can mean the difference between 20%, 40%, and 75%.',
  ],
  people:[
    {name:'Tom', label:'Careless records', rate:'20%'}, {name:'Mary', label:'Large understatement', rate:'20%'},
    {name:'David', label:'Valuation problem', rate:'20% or 40%'}, {name:'Jack', label:'Intentional concealment', rate:'75%'},
  ],
  sections:[
    { eyebrow:'BEHAVIOR', title:'1. Tom Was Careless: Negligence', paragraphs:[
      'Tom runs a small business. He did not keep good records, did not really check the tax rules, and basically thought: “It’s probably close enough.”',
      'That attitude is where negligence can become a problem. The IRS is essentially asking whether the taxpayer made a reasonable attempt to comply with the tax law.',
      'If negligence causes an underpayment, the accuracy-related penalty is generally 20% of the portion of the underpayment attributable to negligence.',
      'Suppose Tom’s negligence caused him to underpay $8,000.',
      'Notice what we did not do. We did not multiply his income—or his total tax bill—by 20%. The penalty is tied to the underpayment attributable to the problem.',
      'Negligence is not simply “you made a mistake, therefore you must pay a penalty.” Reasonable cause, good faith, and the taxpayer’s reasonable basis for a tax position can matter.',
    ], formula:'$8,000 × 20% = $1,600', takeaway:'Negligence looks at behavior.'},
    { eyebrow:'SIZE', title:'2. Mary Wasn’t Careless—But the Number Got Too Big', paragraphs:[
      'Mary is different. She kept records and tried to file correctly. But the understatement was large enough to potentially constitute a substantial understatement of income tax.',
      'For an individual, one important test compares the understatement with the greater of 10% of the tax required to be shown on the return or $5,000.',
      'Suppose Mary should have reported $40,000 of tax. Ten percent is $4,000. Compare $4,000 with $5,000; the greater amount is $5,000.',
      'If Mary’s understatement is exactly $5,000, it has not exceeded that threshold. If she understated tax by $8,000, the threshold has been crossed.',
      'Important distinction: 10% helps determine whether the understatement is substantial. 20% is the penalty rate. Different tests can apply, including when a Section 199A deduction is claimed or when the taxpayer is a corporation.',
    ], formula:'$8,000 × 20% = $1,600', takeaway:'Substantial understatement looks at the size of the tax understatement.'},
    { eyebrow:'VALUATION', title:'3. David Got the Valuation Wrong', paragraphs:[
      'An asset has a correct tax basis of $100,000. David reports $160,000. Before calculating any penalty, ask: how wrong is the valuation or basis?',
      '$160,000 divided by $100,000 is 160%. That reaches the 150% threshold associated with a substantial valuation misstatement under the applicable rule.',
      'David is not automatically writing a penalty check yet. We also ask how much tax the valuation error actually caused him to underpay.',
      'For certain substantial valuation misstatements, the attributable underpayment generally must exceed $5,000—or $10,000 for a corporation other than an S corporation or personal holding company.',
      'Suppose the mistake caused an $8,000 underpayment. The $160,000 identifies the valuation problem; the $8,000 underpayment is the amount to which the penalty percentage applies.',
    ], formula:'$8,000 × 20% = $1,600', takeaway:'The valuation ratio identifies the category; the attributable underpayment supplies the penalty base.'},
    { eyebrow:'GROSS MISSTATEMENT', title:'4. What If David’s Valuation Is Really, Really Wrong?', paragraphs:[
      'Suppose the correct basis is still $100,000, but David reports $210,000. Now the reported basis has reached more than 200% of the correct amount.',
      'That can move the issue from a substantial valuation misstatement to a gross valuation misstatement, and the penalty rate can increase from 20% to 40%.',
      'Two useful markers are 150% for substantial and 200% for gross. But the 20% or 40% rate still applies to the relevant underpayment—not the asset’s reported value.',
    ], formula:'$8,000 × 40% = $3,200', takeaway:'A gross valuation misstatement can double the accuracy-related penalty rate.'},
    { eyebrow:'INTENT', title:'5. Then Jack Walks In', paragraphs:[
      'Jack did not misunderstand a complicated rule or accidentally type the wrong number. He intentionally concealed taxable income.',
      'Now we are talking about fraud. Fraud is fundamentally different because intent matters.',
      'For the civil fraud penalty, the rate is 75% of the portion of the underpayment attributable to fraud. Suppose $8,000 of Jack’s underpayment is attributable to fraud.',
      'Same $8,000 underpayment. Possible penalties: 20% means $1,600; 40% means $3,200; 75% means $6,000.',
    ], formula:'$8,000 × 75% = $6,000', takeaway:'The amount missing matters. Why it went missing matters just as much.'},
  ],
  mapTitle:'The ONYX Tax Map',
  mapIntro:'When you encounter an underpayment, do not start by memorizing penalty percentages. Start with four questions:',
  mapItems:['Was the taxpayer careless? → Negligence → 20%','Was the tax understatement large enough? → Substantial understatement → generally 20%','Was value or basis seriously misstated? → Substantial → 20%; Gross → 40%','Was it intentional? → Fraud → 75%'],
  mapRule:'Thresholds tell you whether you crossed the line. Penalty rates tell you what happens after you cross it.',
  mapClose:'That is why 10%, $5,000, 150%, and 200% should not be confused with 20%, 40%, and 75%. The first group helps identify the problem. The second helps calculate the penalty. The percentage generally applies to the relevant underpayment—not income, asset value, or automatically the entire tax bill.',
  comparisonTitle:'One underpayment, different questions', comparison:comparisonEn,
  ending:'Taxes are complicated. Understanding the logic behind them shouldn’t be.',
  sourcesTitle:'Primary sources & further reading', sources,
  disclaimer:'Educational content only. Tax penalties are highly fact-specific, and exceptions, defenses, special rules, and statutory thresholds may apply. This article is not individualized tax or legal advice.',
}

const zh = {
  title:'同样是少交税，为什么有人罚20%，有人却罚75%？',
  subtitle:'少交多少当然重要，但为什么少交，同样重要。',
  seoTitle:'同样是少交税，为什么罚金可能是20%、40%或75%？｜黑曜',
  seoDescription:'用四个小企业主的例子，理解 negligence、重大少报、估值错报与 fraud 为什么可能对应不同的联邦税务罚金。',
  readingTime:10,
  intro:['想象一下，星期一早上，四个小企业主一起走进 IRS 办公室。','他们都有同一个问题：他们都少交税了。','Tom 是粗心。Mary 很认真，但最后少报的税太多。David 把资产价值或者 tax basis 报得离谱了。至于 Jack？他心里清楚得很，是故意把收入藏起来了。','四个人都是少交税，但 IRS 看他们的方式可能完全不同。','因为 IRS 面对一笔少缴税款时，并不只问：“你少交了多少钱？”它还会问：“你为什么会少交？”这个“为什么”，可能就是 20%、40% 和 75% 的区别。'],
  people:[{name:'Tom',label:'凭证和申报粗心',rate:'20%'},{name:'Mary',label:'少报税额过大',rate:'20%'},{name:'David',label:'资产估值或 basis 错报',rate:'20% 或 40%'},{name:'Jack',label:'故意隐瞒收入',rate:'75%'}],
  sections:[
    {eyebrow:'看行为',title:'1. Tom 粗心了：Negligence',paragraphs:['Tom 经营一家小公司。他没好好保存凭证，也没认真查税法，心里想着：“应该差不多吧。”','这就是 negligence——疏忽可能出现的地方。IRS 真正关心的是：纳税人有没有作出合理努力去遵守税法？','如果 negligence 导致少缴税款，accuracy-related penalty 通常是因疏忽造成的少缴税款的 20%。假设 Tom 因此少交 $8,000。','注意，不是“收入 × 20%”，也不是“全部税款 × 20%”。它针对的是由这个问题造成的少缴税款。','而且 negligence 也不是“只要报错，就一定罚”。是否存在 reasonable cause、good faith，以及报税立场是否具有 reasonable basis，都可能影响结果。'],formula:'$8,000 × 20% = $1,600',takeaway:'疏忽，看的是行为。'},
    {eyebrow:'看规模',title:'2. Mary 并不粗心——但她少报得太多了',paragraphs:['Mary 有保存资料，也认真报税。但检查后发现，她少报的税额已经大到可能构成 substantial understatement of income tax。','对于个人，一个重要判断标准，是把少报税额与正确应纳税额的 10% 或 $5,000 中的较大者比较。','假设 Mary 正确应该申报 $40,000 的税。10% 是 $4,000；与 $5,000 比较，较大的是 $5,000。','如果她正好少报 $5,000，还没有“超过”这个门槛；如果少报 $8,000，就越线了。','重点区别：10% 用来判断少报是否达到“重大”的程度，20% 才是 penalty rate。涉及 Section 199A deduction 或 corporation 时，判断标准可能不同。'],formula:'$8,000 × 20% = $1,600',takeaway:'重大少报，看的是少报税额的规模。'},
    {eyebrow:'看估值',title:'3. David 把资产估值报错了',paragraphs:['某项资产正确的 tax basis 是 $100,000，David 却报成 $160,000。算罚金前，先问：这个估值或者 basis 到底错了多少？','$160,000 ÷ $100,000 = 160%。这达到相关规则下 150% 的 substantial valuation misstatement 门槛。','但 David 还不是马上就要掏钱。还要问：这个估值错误最终让他少交了多少税？','对于这类错报，相关 underpayment 通常还要超过 $5,000；某些 corporation 则是 $10,000。','假设错误造成 $8,000 的少缴税款。$160,000 用来判断估值错误程度，真正拿来乘罚金比例的是 $8,000。'],formula:'$8,000 × 20% = $1,600',takeaway:'估值比例判断类别；相关少缴税款才是罚金基数。'},
    {eyebrow:'看严重程度',title:'4. 如果 David 错得更加离谱呢？',paragraphs:['假设正确 basis 仍是 $100,000，但 David 报成 $210,000。这次已经达到正确金额的 200% 以上。','这可能从 substantial valuation misstatement 升级为 gross valuation misstatement，罚金比例也可能从 20% 升到 40%。','可以记住两个数字：150% 对应 substantial，200% 对应 gross。但 20% 或 40% 最终乘的仍是相关 underpayment，不是资产价值。'],formula:'$8,000 × 40% = $3,200',takeaway:'严重估值错报可能使 accuracy-related penalty 的比例翻倍。'},
    {eyebrow:'看故意',title:'5. 最后，Jack 进来了',paragraphs:['Jack 不是没搞懂复杂税法，也不是不小心敲错数字。他明知有应税收入，却故意把它藏起来。','这时候讨论的是 fraud——欺诈。Fraud 与前面情况最大的不同，是这里开始看 intent——故意。','Civil fraud penalty 是因 fraud 导致的少缴税款的 75%。假设 Jack 有 $8,000 少缴税款来自 fraud。','同样是 $8,000 少缴税款：20% 是 $1,600；40% 是 $3,200；75% 是 $6,000。'],formula:'$8,000 × 75% = $6,000',takeaway:'少交多少钱重要，为什么少交同样重要。'},
  ],
  mapTitle:'ONYX 一张图记住整个逻辑',mapIntro:'以后再看到 underpayment，不要一上来就背 20%、40%、75%。先问四个问题：',
  mapItems:['是不是疏忽？→ Negligence → 20%','是不是少报税额太大？→ Substantial understatement → 通常 20%','是不是资产价值或 basis 报得太离谱？→ Substantial → 20%；Gross → 40%','是不是故意的？→ Fraud → 75%'],
  mapRule:'门槛数字决定有没有“越线”；罚金比例决定越线以后罚多少。',
  mapClose:'所以 10%、$5,000、150%、200%，不要和 20%、40%、75% 混在一起。前一组帮助判断属于什么问题，后一组才用来计算罚金。比例通常针对相关少缴税款——不是收入，不是资产价值，也不是简单拿全部税款来乘。',
  comparisonTitle:'同一笔少缴税款，不同的判断问题',comparison:comparisonZh,
  ending:'税法条例看起来很复杂，让我们一起在实例中轻松化解。',sourcesTitle:'主要资料来源与延伸阅读',sources,
  disclaimer:'本文仅用于税务知识教育。实际罚金取决于具体事实，并可能涉及例外、抗辩及特殊规则，不构成针对个人情况的税务或法律意见。',
}

export const taxUnderpaymentPenalties = {
  learning: {"categories": [], "topics": [], "audiences": ["w2", "1099", "small-business"], "generalLearning": true},
  slug:'tax-underpayment-penalties', publishDate:'2026-09-04', status:'published', layout:'taxPenaltyEditorial',
  category:'Tax & Compliance', pillars:['wealth'], insightNumber:6, pillarLabel:'Tax & Compliance',
  keywords:['tax underpayment','accuracy-related penalty','negligence','substantial understatement','valuation misstatement','civil fraud penalty','税务罚金','少缴税款'],
  originalLocale:'en', author:'Sammi Q', authorTitle:'Founder of ONYX Wealth & Wellness', content:{en,zh},
}
