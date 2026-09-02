const copy = (en, zh) => ({ en, zh })
const choice = (id, en, zh) => ({ id, label: copy(en, zh) })

const journey = (data) => ({
  type: 'hero',
  relatedNodes: [],
  relatedEvents: [],
  relatedInsights: [],
  ...data,
})

export const HERO_JOURNEYS = [
  journey({
    id: 'emergency-liquidity', stage: 'survival', domain: 'wealth',
    title: copy('Emergency Liquidity', '应急流动性'),
    subtitle: copy('When time protects what you wanted to keep', '当时间保护你想保留的资产'),
    openingQuestion: copy('If household income stopped tomorrow, how long could your current liquid resources support core expenses without borrowing or selling long-term assets?', '如果家庭收入明天停止，目前的流动资源能在不借款、不出售长期资产的情况下，支持核心支出多久？'),
    openingChoices: [choice('under-1','Less than 1 month','少于1个月'),choice('1-3','1–3 months','1–3个月'),choice('3-6','3–6 months','3–6个月'),choice('6-plus','6 months or more','6个月以上'),choice('unsure','I’m not sure','不确定')],
    story: copy('Maya and Daniel each have about $300,000 of net worth. Maya has most of it in a business and retirement accounts, with two weeks of cash. Daniel holds six months of core expenses in liquid reserves. When both households lose income for three months, their balance sheets still look similar—but their choices do not.', 'Maya和Daniel的净资产都约为30万美元。Maya的大部分资产在企业和退休账户中，现金只能支持两周；Daniel则保留了六个月核心支出的流动储备。当两个家庭都经历三个月收入中断时，账面财富仍然相近，能做出的选择却完全不同。'),
    storyCharacters: ['Maya','Daniel'],
    storyFacts: [copy('Similar net worth','净资产相近'),copy('Different liquid reserves','流动储备不同'),copy('Same three-month interruption','同样经历三个月收入中断')],
    judgmentQuestion: copy('What created the biggest difference between these two households?', '这两个家庭之间最大的差异来自什么？'),
    judgmentChoices: [choice('return','Investment return','投资回报'),choice('net-worth','Total net worth','净资产总额'),choice('liquidity','Liquidity and time','流动性与时间'),choice('prediction','Ability to predict markets','预测市场的能力')],
    judgmentFeedback: {
      return: copy('Returns matter over time, but they do not make an illiquid asset available for tomorrow’s bills. The missing dimension is time supported by liquidity.', '长期回报很重要，但不能让非流动资产立即支付明天的账单。这里缺少的维度，是流动性所争取的时间。'),
      'net-worth': copy('Net worth shows what is owned after liabilities. It does not show how long the household can operate without selling.', '净资产显示扣除负债后拥有什么，却没有说明家庭可以在不出售资产的情况下维持多久。'),
      liquidity: copy('That reasoning reveals the core principle: liquidity buys time, and time preserves choice.', '这个判断抓住了核心：流动性争取时间，而时间保留选择。'),
      prediction: copy('Market prediction is not the source of resilience here. The stronger position comes from having time without needing a prediction to be right.', '这里的韧性并不来自预测市场，而来自无需依赖预测正确也能拥有的时间。'),
    },
    consequencePaths: [
      { id:'fragile', label:copy('Low-liquidity path','低流动性路径'), steps:[copy('Income interruption','收入中断'),copy('Cash shortage','现金不足'),copy('Borrow or sell','借款或出售资产'),copy('Poor timing','时机不利'),copy('Permanent capital damage','永久资本损伤')] },
      { id:'resilient', label:copy('Liquidity path','流动性路径'), steps:[copy('Income interruption','收入中断'),copy('Liquid reserve','流动储备'),copy('Time','时间'),copy('Choice','选择'),copy('Long-term assets remain intact','长期资产得以保留')] },
    ],
    capitalConclusion: copy('Wealth is not only how much you own. It is also how long you can avoid selling something you wanted to keep.', '财富不只是你拥有多少，也包括你能有多久不必卖掉原本想保留的东西。'),
    principle: copy('Net worth does not automatically create liquidity.', '净资产不会自动转化为流动性。'),
    tool: { kind:'runway', title:copy('Calculate My Runway','计算我的资金跑道'), description:copy('Use three planning inputs. Nothing is saved or submitted.','使用三个规划输入；数据不会保存或提交。') },
    relatedNodes:['W1','W2','W13','W24'], relatedEvents:['retirement-approaching'],
    relatedInsights:[copy('Why liquidity is a form of time','为什么流动性也是一种时间'),copy('The forced-sale risk most balance sheets hide','资产负债表容易忽略的被迫出售风险')],
    selfManageGuidance: copy('List core monthly expenses, available liquid reserves, and known near-term expenses. Test several conservative interruption periods.', '列出每月核心支出、可用流动储备和近期已知支出，并用保守假设测试不同的收入中断期。'),
    deeperReviewGuidance: copy('A deeper review may help when income is volatile, assets are illiquid, debt is expensive, or business and household cash are mixed.', '当收入波动、资产缺乏流动性、债务成本较高，或企业与家庭现金混在一起时，进一步梳理可能有帮助。'),
    askSammiContext:'I explored the Emergency Liquidity Journey and want to organize my household runway questions.',
  }),
  journey({
    id:'sell-rental-property', stage:'strategic', domain:'event',
    title:copy('Sell a Rental Property','出售出租房'), subtitle:copy('Sale price is not available capital','售价不等于可用资本'),
    openingQuestion:copy('A buyer makes a strong offer for a rental property you bought years ago. What would you want to know first?','买家为你多年前购入的出租房提出了很有吸引力的报价。你最先想知道什么？'),
    openingChoices:[choice('cash','How much cash will I receive?','我会收到多少现金？'),choice('tax','How much tax might be involved?','可能涉及多少税？'),choice('debt','Should I pay off debt?','是否应该偿还债务？'),choice('next','What should I do with the money next?','接下来如何安排这笔钱？'),choice('unsure','I’m not sure','不确定')],
    story:copy('A family bought a rental for $330,000. Years later, a buyer offers $520,000 and the mortgage balance is $185,000. The offer feels like a $190,000 gain—and perhaps $335,000 of cash. But neither number tells the family what capital will actually become available.','一个家庭以33万美元买入出租房。多年后，买家报价52万美元，房贷余额为18.5万美元。看起来像赚了19万美元，也似乎会拿到33.5万美元现金。但这两个数字都不能说明最终真正可用的资本是多少。'),
    storyCharacters:['A rental-property household'], storyFacts:[copy('Original purchase: $330,000','原始购价：33万美元'),copy('Possible sale: $520,000','可能售价：52万美元'),copy('Mortgage: $185,000','房贷：18.5万美元')],
    judgmentQuestion:copy('How much capital will actually become available after the sale?','出售后，真正可用的资本会是多少？'),
    judgmentChoices:[choice('335','$335,000','$335,000'),choice('300','Around $300,000','约30万美元'),choice('250','Around $250,000','约25万美元'),choice('unknown','Not enough information','信息不足')],
    judgmentFeedback:{
      '335':copy('That subtracts only the mortgage. Selling costs, adjusted basis, depreciation history, and potential tax consequences are still missing.','这个答案只减去了房贷，仍缺少出售成本、调整后计税基础、折旧历史和潜在税务影响。'),
      '300':copy('That may be plausible in some illustrations, but the facts supplied cannot support it. Several transaction and tax inputs are still unknown.','在某些示例中可能接近，但现有事实不足以支持这个数字，仍缺少多项交易与税务信息。'),
      '250':copy('That may be plausible in some illustrations, but choosing a round estimate hides the missing records and assumptions.','在某些示例中可能接近，但采用整数估计会掩盖缺失的资料与假设。'),
      unknown:copy('Correct as a planning judgment: there is not enough information. The next move is to organize records and questions—not invent a precise tax result.','作为规划判断，这是合理的：信息还不够。下一步应整理资料与问题，而不是虚构精确税务结果。'),
    },
    consequencePaths:[{id:'sale-capital',label:copy('From price to available capital','从售价到可用资本'),steps:[copy('Sale price','售价'),copy('Selling costs','出售成本'),copy('Adjusted basis','调整后计税基础'),copy('Depreciation history','折旧历史'),copy('Potential tax consequences','潜在税务影响'),copy('Mortgage payoff','偿还房贷'),copy('Available capital','可用资本')]}],
    capitalConclusion:copy('The important question is not only “How much can I sell it for?” It is “What capital may actually become available—and what should I consider before the transaction becomes difficult to reverse?”','重要的问题不只是“能卖多少钱”，而是“最终可能有多少资本真正可用，以及在交易变得难以撤回之前，应先考虑哪些问题？”'),
    principle:copy('Sale price is not the same as available capital.','售价不等于可用资本。'),
    tool:{kind:'records',title:copy('Prepare the Sale Review','准备出售梳理'),items:[copy('Original closing documents and improvements','原始交割文件与改良支出'),copy('Depreciation records and prior returns','折旧记录与往年申报资料'),copy('Mortgage payoff information','房贷清偿信息'),copy('Offer, expected selling costs, and timing','报价、预计出售成本与时间'),copy('Questions about what happens next','关于售后资本安排的问题')]},
    relatedNodes:['W10','W11','W18','W25','W30'],relatedEvents:['sell-rental-property','move-state'],relatedInsights:[copy('Why sale price is not spendable capital','为什么售价不是可直接使用的资本'),copy('Questions to organize before a property closing','房产交割前值得整理的问题')],
    selfManageGuidance:copy('Gather records, separate known facts from estimates, and write down the decisions that remain reversible.','收集资料，把已知事实与估算分开，并写下目前仍可改变的决定。'),
    deeperReviewGuidance:copy('Qualified tax and legal review may help before closing when basis, depreciation, ownership, residency, or reinvestment choices interact. Current law and individual facts must be verified.','当计税基础、折旧、所有权、居住州或后续资本安排相互影响时，交割前可能值得寻求合格税务与法律意见；应核实当时有效的规则与个人事实。'),
    askSammiContext:'I explored the Sell a Rental Property Journey and want to organize records and planning questions before the transaction becomes difficult to reverse.',
  }),
  journey({
    id:'work-optionality',stage:'optionality',domain:'wealth',title:copy('Work Optionality','工作选择权'),subtitle:copy('The capital behind “I can choose not to do this”','“我可以选择不做”背后的资本'),
    openingQuestion:copy('If an undesirable job change arrived this month, how much room would your household have to negotiate, wait, or change direction?','如果本月出现不理想的工作变化，你的家庭有多大空间去谈判、等待或转换方向？'),
    openingChoices:[choice('little','Very little','很少'),choice('some','Some room','有一些空间'),choice('meaningful','Meaningful flexibility','有明显选择空间'),choice('unsure','I’m not sure','不确定')],
    story:copy('Two households earn the same income. Household A has high fixed obligations, one concentrated income source, and little liquidity. Household B has lower mandatory expenses, adequate reserves, manageable debt, and several economic resources. Both receive the same undesirable job change.','两个家庭收入相同。家庭A固定责任较高、收入来源集中、流动性很少；家庭B必要支出较低、储备充足、债务可控，并拥有多种经济资源。两个家庭同时遇到不理想的工作变化。'),
    storyCharacters:['Household A','Household B'],storyFacts:[copy('Same current income','当前收入相同'),copy('Different obligations and reserves','责任与储备不同'),copy('Same undesirable job change','同样的不理想工作变化')],
    judgmentQuestion:copy('Who has more negotiating power?','谁拥有更大的谈判空间？'),judgmentChoices:[choice('a','Household A','家庭A'),choice('b','Household B','家庭B'),choice('wealth','Whichever has higher net worth','净资产更高的一方'),choice('unknown','Not enough information','信息不足')],
    judgmentFeedback:{a:copy('Current income alone does not create room to wait. High obligations and low liquidity can turn a choice into a requirement.','当前收入本身并不能创造等待空间。高责任和低流动性可能把选择变成不得不接受。'),b:copy('That reasoning recognizes optionality: manageable obligations, liquidity, and multiple resources create time to negotiate or change direction.','这个判断看见了选择权：可控责任、流动性和多种资源共同创造谈判或转向的时间。'),wealth:copy('Net worth can help, but only when its structure can support the decision. Illiquid or concentrated wealth may not create immediate negotiating power.','净资产可能有帮助，但前提是资产结构能够支持决定。缺乏流动性或高度集中的财富未必能立即创造谈判空间。'),unknown:copy('More facts always help, but the story already reveals the decisive pattern: obligations, liquidity, diversity, protection, and time—not income alone.','更多事实当然有帮助，但故事已经显示关键结构：责任、流动性、多样性、保护与时间，而不只是收入。')},
    consequencePaths:[{id:'low',label:copy('Low optionality','较低选择权'),steps:[copy('Job pressure','工作压力'),copy('Must accept','不得不接受'),copy('Limited time','时间有限'),copy('Fewer choices','选择更少')]},{id:'higher',label:copy('Higher optionality','较高选择权'),steps:[copy('Job pressure','工作压力'),copy('Financial runway','财务跑道'),copy('Time','时间'),copy('Negotiate, wait, or change direction','谈判、等待或转换方向')]}],
    capitalConclusion:copy('Optionality can come from liquidity, manageable obligations, income diversity, productive assets, protection, and time—not income alone.','选择权可以来自流动性、可控责任、收入多样性、生产性资产、保护与时间，而不只是收入。'),principle:copy('The ability to say no is a form of capital.','说“不”的能力，也是一种资本。'),
    tool:{kind:'reflection',title:copy('Map My Sources of Optionality','梳理我的选择权来源'),items:[copy('Liquid runway','流动资金跑道'),copy('Mandatory obligations','必要责任'),copy('Income diversity','收入多样性'),copy('Productive assets','生产性资产'),copy('Protection and benefits','保障与福利'),copy('Time-sensitive decisions','有时间窗口的决定')]},
    relatedNodes:['W1','W2','W8','W13','W18','W19','W31'],relatedEvents:['retirement-approaching','sell-business','move-state'],relatedInsights:[copy('Why the ability to say no is capital','为什么说“不”的能力也是资本'),copy('Income is not the same as optionality','收入不等于选择权')],
    selfManageGuidance:copy('Estimate essential obligations, liquid runway, reliable income, and which parts of a work decision remain reversible.','估算必要责任、流动资金跑道、可靠收入，以及工作决定中哪些部分仍可改变。'),deeperReviewGuidance:copy('A coordinated review may help when a job decision also changes taxes, benefits, healthcare, retirement saving, business value, or family responsibilities.','当工作决定还会影响税务、福利、医疗保障、退休储蓄、企业价值或家庭责任时，跨领域梳理可能有帮助。'),askSammiContext:'I explored the Work Optionality Journey and want to organize the capital behind a possible work decision.',
  }),
]

export const getHeroJourney = (id) => HERO_JOURNEYS.find((item) => item.id === id)
export const localized = (value, locale) => value?.[locale === 'zh' ? 'zh' : 'en'] || value?.en || ''
