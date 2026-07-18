export const artificialGeneralIntelligence = {
  slug: 'artificial-general-intelligence',
  term: 'Artificial General Intelligence',
  aliases: ['AGI'],
  status: 'published',
  pillars: ['intelligence'],
  category: 'ai-foundations',
  originalLocale: 'zh',
  relatedInsightSlugs: ['waic-ai-super-node-agent-os-opc-agi'],
  relatedTermSlugs: ['ai-for-science', 'super-node'],
  content: {
    zh: {
      title: 'Artificial General Intelligence（通用人工智能，AGI）',
      shortDefinition:
        '一种尚未实现且定义仍存在争议的人工智能目标，指 AI 能够跨领域学习、迁移知识，并解决广泛的新问题。',
      definition:
        'AGI（Artificial General Intelligence，通用人工智能）指的是一个长期目标：AI 能够像人一样，把在一个领域学到的知识迁移到另一个陌生领域，学习新的技能，并对未见过的问题进行推理和解决。',
      context:
        '今天的大多数 AI，虽然能力越来越强，但仍然依赖训练数据、任务边界和特定的工作环境，与 AGI 所描述的跨领域通用能力之间，仍然存在明显差距。',
      application:
        '理解 AGI 这个概念，有助于区分"当前 AI 能做什么"与"AI 长期可能追求的方向"，避免把行业愿景当作既成事实。',
      // Required framing per ONYX Section 8 (Safety and Professional Boundaries):
      // AGI has no realized implementation and no agreed-upon definition or timeline —
      // this field must stay hedged, not predictive.
      caution:
        'AGI 目前仍然是一个尚未实现、也没有统一定义的目标。不同研究者对它是否会实现、何时实现，以及如何判断它已经实现，仍然存在很大分歧。本词条不对 AGI 的实现时间或最终形态做出预测，任何相关说法都应被视为推测，而非已确定的事实。',
    },
    en: {
      title: 'Artificial General Intelligence (AGI)',
      shortDefinition:
        'A not-yet-achieved, still-debated goal for AI: systems that can learn across domains, transfer knowledge, and solve a broad range of unfamiliar problems.',
      definition:
        'AGI (Artificial General Intelligence) describes a long-term goal: AI that can, like a person, transfer knowledge learned in one domain to an unfamiliar one, learn new skills, and reason through problems it has never seen before.',
      context:
        'Most AI today, however capable, still depends on its training data, defined task boundaries, and a specific operating environment — a clear gap from the cross-domain generality AGI describes.',
      application:
        "Understanding AGI as a concept helps separate what AI can actually do today from the direction the field may be working toward, so industry vision isn't mistaken for settled fact.",
      // Required framing per ONYX Section 8 (Safety and Professional Boundaries) —
      // mirrors the zh caution above; must stay hedged, not predictive.
      caution:
        "AGI has not been achieved and has no agreed-upon definition. Researchers disagree significantly about whether, when, and how it would be recognized as achieved. This entry makes no prediction about AGI's timeline or eventual form — any such claim should be treated as speculation, not established fact.",
    },
  },
}
