export const superNode = {
  slug: 'super-node',
  term: 'Super Node',
  aliases: [],
  status: 'published',
  pillars: ['intelligence'],
  category: 'ai-infrastructure',
  originalLocale: 'zh',
  relatedInsightSlugs: ['waic-ai-super-node-agent-os-opc-agi'],
  relatedTermSlugs: ['agent-os', 'artificial-general-intelligence'],
  content: {
    zh: {
      title: '超节点（Super Node）',
      shortDefinition:
        '将大量 AI 芯片通过高速互联组成一个统一计算系统，使其像一台超级计算机一样协同完成模型训练和推理。',
      definition:
        '超节点是一种新型算力基础设施：通过高速互联网络，把大量 GPU 或其他 AI 芯片连接在一起，使它们能够像一台统一的超级计算机一样协同工作，而不是彼此独立运行的孤立芯片。',
      context:
        '大型人工智能模型的训练和推理，早已不是一块芯片能够独立完成的工作。超节点解决的核心问题，不只是"拥有多少芯片"，还包括芯片之间能否快速通信、数据能否高效传输，以及整个系统能否稳定运行。',
      application:
        '这意味着未来 AI 的竞争，不仅是模型和算法的竞争，也会是算力、网络、能源和数据中心基础设施的竞争。',
    },
    en: {
      title: 'Super Node',
      shortDefinition:
        'A large cluster of AI chips connected through high-speed interconnects into one unified computing system, so they train and run models together like a single supercomputer.',
      definition:
        'A super node is a new class of AI compute infrastructure: high-speed interconnects link large numbers of GPUs or other AI chips together so they operate as one unified supercomputer rather than as isolated, independent chips.',
      context:
        'Training and running large AI models has long outgrown what any single chip can do alone. What a super node solves isn\'t just "how many chips" — it also covers whether those chips can communicate quickly, move data efficiently, and keep the whole system running reliably.',
      application:
        'This means the AI race ahead is not only about models and algorithms — it is increasingly a race in compute, networking, energy, and data-center infrastructure.',
    },
  },
}
