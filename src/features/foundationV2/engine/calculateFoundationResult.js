const nodeMeta = {
  W1:['Emergency Liquidity','应急流动性','survival'],W2:['High-Cost Debt','高成本债务','survival'],W8:['Monthly Capital Surplus','每月可配置资本','stability'],W9:['Known Large Expenses','已知大额支出','stability'],W10:['Non-W2 Income Map','非W-2收入地图','stability'],W11:['Tax Reserve System','税款储备系统','stability'],W12:['Household Financial Operating System','家庭财务操作系统','stability'],W13:['Income Protection','收入保护','protection'],W18:['Concentration Risk','集中风险','protection'],W19:['Productive Assets','生产性资产','growth'],W24:['Forced-Sale Resilience','被迫卖出风险','growth'],W25:['Next Dollar','下一块钱','strategic'],W30:['Tax Planning Windows','税务筹划窗口','strategic'],W31:['Work Optionality','职业选择权','optionality'],
}
const priority = ['W1','W2','W8','W9','W10','W11','W12','W13','W18','W19','W24','W25','W30','W31']
const nonW2 = new Set(['1099','schedule_c','partnership_k1','s_corp_k1','c_corp','long_rental','short_rental','trust_k1','royalties','foreign','crypto'])
const array = (value) => Array.isArray(value) ? value : []
const unique = (values) => [...new Set(values)]
const add = (condition, id, list) => { if (condition) list.push(id) }

export function calculateFoundationResult(answers = {}) {
  const nodes = []
  add(['under_1','1_3','unsure'].includes(answers.F1),'W1',nodes)
  add(['yes','unsure'].includes(answers.F2),'W2',nodes)
  add(['negative','0_500','variable','unsure'].includes(answers.F3),'W8',nodes)
  add(['yes','unsure'].includes(answers.F4),'W9',nodes)
  add(array(answers.F5).some((id)=>nonW2.has(id)),'W10',nodes)
  add(['partly','no','unsure'].includes(answers.F6),'W11',nodes)
  add(['some','no','unsure'].includes(answers.F7),'W12',nodes)
  add(['meaningful','severe','unsure'].includes(answers.F8)||['partly','no','unsure'].includes(answers.F9),'W13',nodes)
  add(['some','high','unsure'].includes(answers.F10)||['40_60','60_plus','unsure'].includes(answers.F11)||['moderate','high','unsure'].includes(answers.F17),'W18',nodes)
  add(['some','no','unsure'].includes(answers.F13),'W19',nodes)
  add(['maybe','no','unsure'].includes(answers.F12),'W24',nodes)
  add(['low','unsure'].includes(answers.F15),'W30',nodes)
  add(['little','none','unsure'].includes(answers.F18),'W31',nodes)
  if (!nodes.length) nodes.push('W25')
  const suggestedIds = unique(nodes).sort((a,b)=>priority.indexOf(a)-priority.indexOf(b))
  const suggestedNodes = suggestedIds.map((id)=>({id,title:nodeMeta[id][0],titleZh:nodeMeta[id][1],stage:nodeMeta[id][2]}))
  const first = suggestedNodes[0]
  const immediateAttention = suggestedNodes.filter((node)=>['survival','stability','protection'].includes(node.stage)).slice(0,4)
  const events = array(answers.F14).filter((id)=>!['none','other','property_purchase','retirement_distribution'].includes(id))
  const additionalEvents = array(answers.F14).filter((id)=>['other','property_purchase','retirement_distribution'].includes(id))
  const longTermSignals = array(answers.F16)
  const organizationGaps = ['some','no','unsure'].includes(answers.F7) ? [{id:'records',title:'Financial records may need organizing',titleZh:'财务资料可能需要整理',nodeId:'W12'}] : []
  return {
    version:'2.0',
    currentCapitalPosition:{stage:first.stage,title:first.title,titleZh:first.titleZh,summary:`Start by exploring ${first.title}; later priorities may depend on this foundation.`,summaryZh:`可以先探索${first.titleZh}；后续优先事项可能依赖这一基础。`},
    immediateAttention,
    eventRadarSignals:{events,additionalEvents,noneKnown:array(answers.F14).includes('none')},
    longTermSignals,
    organizationGaps,
    suggestedNodes,
    worthExploringNext:suggestedNodes.slice(0,3),
    askSammiContext:`I completed the 18-question Foundation scan. I want to organize these areas: ${suggestedIds.slice(0,4).join(', ')}. I will not send sensitive documents.`,
  }
}
