export const agentOs = {
  slug: 'agent-os',
  term: 'Agent OS',
  aliases: [],
  status: 'published',
  pillars: ['intelligence'],
  category: 'ai-agents',
  originalLocale: 'zh',
  relatedInsightSlugs: ['waic-ai-super-node-agent-os-opc-agi'],
  relatedTermSlugs: ['super-node', 'one-person-company'],
  content: {
    zh: {
      title: 'Agent OS（智能体操作系统）',
      shortDefinition:
        '负责组织、协调和管理多个 AI Agent 的系统层，包括任务规划、工具调用、权限、记忆、协作与结果检查。',
      definition:
        'Agent OS 是管理一组 AI Agent 的操作系统或协调层。当用户只给出一个目标，而不是逐步指令时，Agent OS 负责让多个 AI Agent 自主规划步骤、调用工具、查找资料、执行任务并检查结果。',
      context:
        '过去，大多数人使用 AI 的方式是提出一个问题、等待一个答案。Agent 正在把这种方式变成：给出一个目标，由系统自主拆解和执行。',
      application:
        '未来，人的工作方式可能会逐渐从"亲自完成每项任务"，转向"定义目标、配置资源并管理多个 AI Agent"。',
    },
    en: {
      title: 'Agent OS',
      shortDefinition:
        'The system layer that organizes, coordinates, and manages multiple AI agents — handling task planning, tool use, permissions, memory, collaboration, and result checking.',
      definition:
        'Agent OS is the operating system or coordination layer that manages a group of AI agents. When a user gives a single goal instead of step-by-step instructions, Agent OS lets multiple agents plan their own steps, call tools, gather information, execute tasks, and check results.',
      context:
        'Most people still use AI the old way: ask a question, get an answer. Agents are changing that into: state a goal, and let the system break it down and execute it.',
      application:
        'Over time, work may shift from "personally completing every task" to "defining goals, allocating resources, and managing a team of AI agents."',
    },
  },
}
