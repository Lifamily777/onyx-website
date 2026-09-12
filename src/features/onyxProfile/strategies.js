// Phase 1 educational structures; no suitability or eligibility engine.
export const strategies = [
  {
    "id": "tax-later",
    "title": {
      "en": "Tax Later",
      "zh": "延后纳税"
    },
    "description": {
      "en": "Reduce taxable income today where eligible. Pay tax later.",
      "zh": "符合条件时减少当前应税收入，将纳税延后。"
    },
    "groups": [
      {
        "title": {
          "en": "Retirement strategies",
          "zh": "退休策略"
        },
        "items": [
          {
            "id": "traditional-401k",
            "title": {
              "en": "Traditional 401(k)",
              "zh": "传统 401(k)"
            }
          },
          {
            "id": "traditional-ira",
            "title": {
              "en": "Traditional IRA",
              "zh": "传统 IRA"
            }
          },
          {
            "id": "simple-ira",
            "title": {
              "en": "SIMPLE IRA",
              "zh": "SIMPLE IRA"
            }
          },
          {
            "id": "sep-ira",
            "title": {
              "en": "SEP IRA",
              "zh": "SEP IRA"
            }
          },
          {
            "id": "solo-401k",
            "title": {
              "en": "Solo 401(k)",
              "zh": "个人 401(k)"
            }
          },
          {
            "id": "qualified-plans",
            "title": {
              "en": "Qualified retirement plans",
              "zh": "合格退休计划"
            }
          },
          {
            "id": "cash-balance",
            "title": {
              "en": "Defined Benefit / Cash Balance",
              "zh": "确定给付 / 现金余额计划"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tax-now",
    "title": {
      "en": "Tax Now",
      "zh": "现在纳税"
    },
    "description": {
      "en": "Pay tax today to potentially create more tax-efficient money later.",
      "zh": "现在纳税，为未来可能更具税务效率的资金做准备。"
    },
    "groups": [
      {
        "title": {
          "en": "Retirement strategies",
          "zh": "退休策略"
        },
        "items": [
          {
            "id": "roth-ira",
            "title": {
              "en": "Roth IRA",
              "zh": "Roth IRA"
            }
          },
          {
            "id": "roth-401k",
            "title": {
              "en": "Roth 401(k)",
              "zh": "Roth 401(k)"
            }
          },
          {
            "id": "backdoor-roth",
            "title": {
              "en": "Backdoor Roth",
              "zh": "后门 Roth"
            }
          },
          {
            "id": "roth-conversion",
            "title": {
              "en": "Roth conversions",
              "zh": "Roth 转换"
            }
          }
        ]
      },
      {
        "title": {
          "en": "Insurance-based strategies · separate from retirement accounts",
          "zh": "保险类策略 · 与退休账户分开"
        },
        "items": [
          {
            "id": "iul",
            "title": {
              "en": "Indexed Universal Life (IUL)",
              "zh": "指数型万能寿险（IUL）"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tax-advantage",
    "title": {
      "en": "Tax Advantage",
      "zh": "税务优势"
    },
    "description": {
      "en": "Tax characteristics beyond a simple “pay now” or “pay later” framework.",
      "zh": "理解超越「现在纳税」或「延后纳税」的税务特征。"
    },
    "groups": [
      {
        "title": {
          "en": "Capital and tax characteristics",
          "zh": "资本与税务特征"
        },
        "items": [
          {
            "id": "real-estate",
            "title": {
              "en": "Real Estate Strategies",
              "zh": "房地产策略"
            }
          },
          {
            "id": "hsa",
            "title": {
              "en": "HSA",
              "zh": "健康储蓄账户（HSA）"
            }
          },
          {
            "id": "529",
            "title": {
              "en": "529 education savings",
              "zh": "529 教育储蓄"
            }
          },
          {
            "id": "charitable",
            "title": {
              "en": "Charitable strategies",
              "zh": "慈善策略"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tax-architecture",
    "title": {
      "en": "Tax Architecture",
      "zh": "税务架构"
    },
    "description": {
      "en": "How should my financial life and income-producing activities be structured?",
      "zh": "我的财务生活与创收活动应如何组织？"
    },
    "groups": [
      {
        "title": {
          "en": "Existing business",
          "zh": "现有企业"
        },
        "items": [
          {
            "id": "existing-business",
            "title": {
              "en": "Entity, compensation and business operations",
              "zh": "实体、薪酬与企业运营"
            }
          }
        ]
      },
      {
        "title": {
          "en": "New income engine",
          "zh": "新的收入引擎"
        },
        "items": [
          {
            "id": "new-income",
            "title": {
              "en": "Legitimate business opportunities and infrastructure",
              "zh": "真实商业机会与基础设施"
            }
          },
          {
            "id": "wellness-business",
            "title": {
              "en": "Health & Wellness Business",
              "zh": "健康与养生事业"
            }
          },
          {
            "id": "one-person-company",
            "title": {
              "en": "AI-Powered One-Person Company",
              "zh": "AI 驱动的一人公司"
            }
          }
        ]
      },
      {
        "title": {
          "en": "Trust & estate coordination",
          "zh": "信托与传承协调"
        },
        "items": [
          {
            "id": "trust-estate",
            "title": {
              "en": "Trust & Estate Structure",
              "zh": "信托与传承架构"
            }
          }
        ]
      }
    ]
  }
]
export const realEstateModules = [
  {
    "id": "rental-property",
    "title": {
      "en": "Rental Property",
      "zh": "出租物业"
    }
  },
  {
    "id": "depreciation",
    "title": {
      "en": "Depreciation & Basis",
      "zh": "折旧与税基"
    }
  },
  {
    "id": "cost-segregation",
    "title": {
      "en": "Cost Segregation",
      "zh": "成本分离"
    }
  },
  {
    "id": "1031-exchange",
    "title": {
      "en": "1031 Exchange",
      "zh": "1031 置换"
    }
  },
  {
    "id": "short-term-rental",
    "title": {
      "en": "Short-Term Rental",
      "zh": "短期出租"
    }
  },
  {
    "id": "passive-activity",
    "title": {
      "en": "Passive Activity Rules",
      "zh": "被动活动规则"
    }
  },
  {
    "id": "material-participation",
    "title": {
      "en": "Material Participation",
      "zh": "实质参与"
    }
  },
  {
    "id": "real-estate-professional",
    "title": {
      "en": "Real Estate Professional Status",
      "zh": "房地产专业人士身份"
    }
  }
]
export const learningSections = [
 { en: 'What is it?', zh: '这是什么？' },
 { en: 'Who may qualify?', zh: '谁可能符合条件？' },
 { en: 'How does it affect taxes today?', zh: '如何影响当前税务？' },
 { en: 'Key contribution and framework concepts', zh: '供款与框架概念' },
 { en: 'Important limitations', zh: '重要限制' },
 { en: 'When might it make sense — or not?', zh: '何时可能适合，何时可能不适合？' },
 { en: 'ONYX articles', zh: 'ONYX 文章' },
 { en: 'ONYX videos', zh: 'ONYX 视频' },
 { en: 'Authoritative resources', zh: '权威资源' },
 { en: 'Future setup, review and guidance', zh: '未来的设置、审阅与指导' },
]
export const textFor = (value, locale) => value[locale] || value.en
export function resolveStrategy(categoryId, topicId) {
 const category = strategies.find(item => item.id === categoryId)
 const topic = category?.groups.flatMap(group => group.items).find(item => item.id === topicId)
 return { category, topic }
}

// Educational route metadata only. Published resources stay in the canonical Content Library.
export const trustEstateModules = [
 { id: 'revocable-living-trust', title: { en: 'Revocable Living Trust', zh: '可撤销生前信托' } },
 { id: 'irrevocable-trust', title: { en: 'Irrevocable Trust', zh: '不可撤销信托' } },
 { id: 'ilit', title: { en: 'Irrevocable Life Insurance Trust (ILIT)', zh: '不可撤销寿险信托（ILIT）' } },
 { id: 'special-needs-trust', title: { en: 'Special Needs Trust', zh: '特殊需要信托' } },
 { id: 'beneficiary-estate-coordination', title: { en: 'Beneficiary & Estate Coordination', zh: '受益人与传承安排协调' } },
 { id: 'family-business-asset-transfer', title: { en: 'Family / Business Asset Transfer', zh: '家庭与企业资产传承' } },
]
export const trustLearningSections = [
 { en: 'What is it?', zh: '这是什么？' },
 { en: 'Who might need to understand it?', zh: '谁可能需要了解？' },
 { en: 'What problem may it address?', zh: '可能涉及哪些问题？' },
 { en: 'Ownership and control considerations', zh: '所有权与控制权考量' },
 { en: 'Tax and estate considerations', zh: '税务与传承考量' },
 { en: 'Important limitations', zh: '重要限制' },
 { en: 'When it may fit', zh: '哪些情况值得进一步了解？' },
 { en: 'When it may not fit', zh: '哪些情况可能不适合？' },
 { en: 'Future professional coordination', zh: '未来的专业协调' },
]
export const trustEducationNotice = {
 en: 'These are educational pathways, not trust recommendations or legal drafting services. ONYX does not determine whether a trust is needed, valid or suitable. An attorney qualified in the relevant jurisdiction must review legal documents, ownership and beneficiary arrangements; tax and benefits questions may need separate qualified review. No tax savings, asset protection or benefits eligibility is promised.',
 zh: '这些路径仅供学习，不是信托推荐或法律文件起草服务。ONYX 不判断是否需要信托，也不判断信托的效力或适用性。法律文件、所有权与受益人安排需要由相关司法辖区具备资格的律师审阅；税务与福利问题可能还需另行接受专业审阅。不承诺节税、资产保护或福利资格。',
}
export function strategyModules(categoryId, topicId) {
 if (categoryId === 'tax-advantage' && topicId === 'real-estate') return realEstateModules
 if (categoryId === 'tax-architecture' && topicId === 'trust-estate') return trustEstateModules
 return []
}
