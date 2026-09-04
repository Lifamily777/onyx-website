const LEVELS = {
  W1:['attention','attention','developing','steady','steady','unsure'], W2:['steady','attention','unsure'],
  W8:['attention','developing','developing','steady','unsure'], W9:['topic','topic','unsure'], W10:'topic',
  W11:['steady','developing','attention','unsure'], W12:['steady','developing','attention','unsure'],
  W13:['steady','developing','attention','unsure'], W18:['steady','developing','attention','attention','attention','unsure'],
  W19:['steady','developing','attention','unsure'], W24:['steady','developing','attention','unsure'], W25:'topic', W30:'topic',
  W31:['attention','developing','steady','unsure'], WL1:['steady','developing','attention','unsure'],
  WL2:['steady','developing','attention','unsure'], WL3:['steady','developing','attention','unsure'],
  WL4:['steady','developing','attention','unsure'], WL5:['steady','developing','attention','unsure'], WL6:['steady','developing','attention','unsure'],
}

const TITLES = {
  en:{steady:'What this may suggest',developing:'A useful area to clarify',attention:'Worth organizing sooner',unsure:'Not sure is a useful answer',topic:'Put this item on the map'},
  zh:{steady:'这方面目前比较清楚',developing:'这里还有一些地方值得理清',attention:'这件事值得优先整理',unsure:'暂时不确定，也是一条有用的信息',topic:'把这一项放进整体计划里'},
}

export function getReflectionGuidance(node, option, locale, displayOption = option) {
  if (!node || !option) return null
  const options = node.ask?.options || node.question?.options || []
  const configured = LEVELS[node.id]
  const level = Array.isArray(configured) ? configured[options.indexOf(option)] : configured
  if (!level) return null
  const zh = locale === 'zh'
  const self = (zh ? node.selfManage.bodyZh : node.selfManage.body)
    .replace('without assuming a guaranteed recovery', 'while treating recovery as an assumption rather than a promise')
  const selected = zh ? `你选择了“${displayOption}”。` : `You selected “${displayOption}.” `
  const lead = zh ? {
    steady:'从这次选择看，你已经有一些基础。它不是评分，也不代表这项安排不需要再检查。',
    developing:'这通常意味着情况并非完全空白，但还没有清楚到可以放心忽略。',
    attention:'这不代表一定有问题，但如果近期发生收入、家庭或计划变化，最好不要拖到必须行动时才处理。',
    unsure:'与其凭感觉作答，不如先把事实找出来。看清现状本身就是下一步。',
    topic:`${selected}这里不是在判断好坏，而是提醒你把它与现金流、风险、税务或长期目标一起看。`,
  }[level] : {
    steady:'Your answer suggests there is some foundation here. It is not a score and does not mean the area never needs review.',
    developing:'This usually means the area is not starting from zero, but a few facts may still need to be clarified.',
    attention:'This does not prove there is a problem. If income, family, or plan facts are changing, organize it before a decision becomes urgent.',
    unsure:'Rather than guessing, begin by locating the facts. Knowing what is unclear is already a useful next step.',
    topic:`${selected}This is not a good-or-bad result. Put it beside cash flow, risk, tax, and long-term goals before acting.`,
  }[level]
  return { level, title:TITLES[zh?'zh':'en'][level], body:`${lead} ${zh?'可以先这样做：':'A practical first step: '}${self}` }
}
