// Ranges are discovery bands, not legal thresholds or tax estimates.
export const profileSections = [
  {
    "id": "income",
    "title": {
      "en": "Income & tax profile",
      "zh": "收入与税务概况"
    },
    "fields": [
      {
        "id": "filing",
        "label": {
          "en": "Filing status",
          "zh": "报税身份"
        },
        "type": "select",
        "options": [
          {
            "id": "single",
            "label": {
              "en": "Single",
              "zh": "单身"
            }
          },
          {
            "id": "joint",
            "label": {
              "en": "Married filing jointly",
              "zh": "已婚联合报税"
            }
          },
          {
            "id": "separate",
            "label": {
              "en": "Married filing separately",
              "zh": "已婚分开报税"
            }
          },
          {
            "id": "head",
            "label": {
              "en": "Head of household",
              "zh": "户主"
            }
          },
          {
            "id": "surviving",
            "label": {
              "en": "Qualifying surviving spouse",
              "zh": "符合条件的生存配偶"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "w2",
        "label": {
          "en": "Annual household W-2 income",
          "zh": "家庭年度 W-2 收入"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "None",
              "zh": "无"
            }
          },
          {
            "id": "under50",
            "label": {
              "en": "Under $50,000",
              "zh": "低于 $50,000"
            }
          },
          {
            "id": "50to100",
            "label": {
              "en": "$50,000–$99,999",
              "zh": "$50,000–$99,999"
            }
          },
          {
            "id": "100to200",
            "label": {
              "en": "$100,000–$199,999",
              "zh": "$100,000–$199,999"
            }
          },
          {
            "id": "200to400",
            "label": {
              "en": "$200,000–$399,999",
              "zh": "$200,000–$399,999"
            }
          },
          {
            "id": "400plus",
            "label": {
              "en": "$400,000+",
              "zh": "$400,000 及以上"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "1099",
        "label": {
          "en": "Annual 1099 income",
          "zh": "年度 1099 收入"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "None",
              "zh": "无"
            }
          },
          {
            "id": "under50",
            "label": {
              "en": "Under $50,000",
              "zh": "低于 $50,000"
            }
          },
          {
            "id": "50to100",
            "label": {
              "en": "$50,000–$99,999",
              "zh": "$50,000–$99,999"
            }
          },
          {
            "id": "100to200",
            "label": {
              "en": "$100,000–$199,999",
              "zh": "$100,000–$199,999"
            }
          },
          {
            "id": "200to400",
            "label": {
              "en": "$200,000–$399,999",
              "zh": "$200,000–$399,999"
            }
          },
          {
            "id": "400plus",
            "label": {
              "en": "$400,000+",
              "zh": "$400,000 及以上"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "business",
        "label": {
          "en": "Annual business income (excluding amounts already counted)",
          "zh": "年度企业收入（不重复计算已填金额）"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "None",
              "zh": "无"
            }
          },
          {
            "id": "under50",
            "label": {
              "en": "Under $50,000",
              "zh": "低于 $50,000"
            }
          },
          {
            "id": "50to100",
            "label": {
              "en": "$50,000–$99,999",
              "zh": "$50,000–$99,999"
            }
          },
          {
            "id": "100to200",
            "label": {
              "en": "$100,000–$199,999",
              "zh": "$100,000–$199,999"
            }
          },
          {
            "id": "200to400",
            "label": {
              "en": "$200,000–$399,999",
              "zh": "$200,000–$399,999"
            }
          },
          {
            "id": "400plus",
            "label": {
              "en": "$400,000+",
              "zh": "$400,000 及以上"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "other-income",
        "label": {
          "en": "Other annual income",
          "zh": "其他年度收入"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "None",
              "zh": "无"
            }
          },
          {
            "id": "under50",
            "label": {
              "en": "Under $50,000",
              "zh": "低于 $50,000"
            }
          },
          {
            "id": "50to100",
            "label": {
              "en": "$50,000–$99,999",
              "zh": "$50,000–$99,999"
            }
          },
          {
            "id": "100to200",
            "label": {
              "en": "$100,000–$199,999",
              "zh": "$100,000–$199,999"
            }
          },
          {
            "id": "200to400",
            "label": {
              "en": "$200,000–$399,999",
              "zh": "$200,000–$399,999"
            }
          },
          {
            "id": "400plus",
            "label": {
              "en": "$400,000+",
              "zh": "$400,000 及以上"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "bracket",
        "label": {
          "en": "Approximate federal marginal tax bracket, if known (self-reported)",
          "zh": "如已知，大致联邦边际税率档（自行提供）"
        },
        "type": "select",
        "options": [
          {
            "id": "under20",
            "label": {
              "en": "Below 20%",
              "zh": "低于 20%"
            }
          },
          {
            "id": "20to30",
            "label": {
              "en": "20%–30%",
              "zh": "20%–30%"
            }
          },
          {
            "id": "over30",
            "label": {
              "en": "Above 30%",
              "zh": "高于 30%"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "state",
        "label": {
          "en": "State of residence (US abbreviation)",
          "zh": "居住州（美国州缩写）"
        },
        "type": "select",
        "options": [
          {
            "id": "AL",
            "label": {
              "en": "AL",
              "zh": "AL"
            }
          },
          {
            "id": "AK",
            "label": {
              "en": "AK",
              "zh": "AK"
            }
          },
          {
            "id": "AZ",
            "label": {
              "en": "AZ",
              "zh": "AZ"
            }
          },
          {
            "id": "AR",
            "label": {
              "en": "AR",
              "zh": "AR"
            }
          },
          {
            "id": "CA",
            "label": {
              "en": "CA",
              "zh": "CA"
            }
          },
          {
            "id": "CO",
            "label": {
              "en": "CO",
              "zh": "CO"
            }
          },
          {
            "id": "CT",
            "label": {
              "en": "CT",
              "zh": "CT"
            }
          },
          {
            "id": "DE",
            "label": {
              "en": "DE",
              "zh": "DE"
            }
          },
          {
            "id": "DC",
            "label": {
              "en": "DC",
              "zh": "DC"
            }
          },
          {
            "id": "FL",
            "label": {
              "en": "FL",
              "zh": "FL"
            }
          },
          {
            "id": "GA",
            "label": {
              "en": "GA",
              "zh": "GA"
            }
          },
          {
            "id": "HI",
            "label": {
              "en": "HI",
              "zh": "HI"
            }
          },
          {
            "id": "ID",
            "label": {
              "en": "ID",
              "zh": "ID"
            }
          },
          {
            "id": "IL",
            "label": {
              "en": "IL",
              "zh": "IL"
            }
          },
          {
            "id": "IN",
            "label": {
              "en": "IN",
              "zh": "IN"
            }
          },
          {
            "id": "IA",
            "label": {
              "en": "IA",
              "zh": "IA"
            }
          },
          {
            "id": "KS",
            "label": {
              "en": "KS",
              "zh": "KS"
            }
          },
          {
            "id": "KY",
            "label": {
              "en": "KY",
              "zh": "KY"
            }
          },
          {
            "id": "LA",
            "label": {
              "en": "LA",
              "zh": "LA"
            }
          },
          {
            "id": "ME",
            "label": {
              "en": "ME",
              "zh": "ME"
            }
          },
          {
            "id": "MD",
            "label": {
              "en": "MD",
              "zh": "MD"
            }
          },
          {
            "id": "MA",
            "label": {
              "en": "MA",
              "zh": "MA"
            }
          },
          {
            "id": "MI",
            "label": {
              "en": "MI",
              "zh": "MI"
            }
          },
          {
            "id": "MN",
            "label": {
              "en": "MN",
              "zh": "MN"
            }
          },
          {
            "id": "MS",
            "label": {
              "en": "MS",
              "zh": "MS"
            }
          },
          {
            "id": "MO",
            "label": {
              "en": "MO",
              "zh": "MO"
            }
          },
          {
            "id": "MT",
            "label": {
              "en": "MT",
              "zh": "MT"
            }
          },
          {
            "id": "NE",
            "label": {
              "en": "NE",
              "zh": "NE"
            }
          },
          {
            "id": "NV",
            "label": {
              "en": "NV",
              "zh": "NV"
            }
          },
          {
            "id": "NH",
            "label": {
              "en": "NH",
              "zh": "NH"
            }
          },
          {
            "id": "NJ",
            "label": {
              "en": "NJ",
              "zh": "NJ"
            }
          },
          {
            "id": "NM",
            "label": {
              "en": "NM",
              "zh": "NM"
            }
          },
          {
            "id": "NY",
            "label": {
              "en": "NY",
              "zh": "NY"
            }
          },
          {
            "id": "NC",
            "label": {
              "en": "NC",
              "zh": "NC"
            }
          },
          {
            "id": "ND",
            "label": {
              "en": "ND",
              "zh": "ND"
            }
          },
          {
            "id": "OH",
            "label": {
              "en": "OH",
              "zh": "OH"
            }
          },
          {
            "id": "OK",
            "label": {
              "en": "OK",
              "zh": "OK"
            }
          },
          {
            "id": "OR",
            "label": {
              "en": "OR",
              "zh": "OR"
            }
          },
          {
            "id": "PA",
            "label": {
              "en": "PA",
              "zh": "PA"
            }
          },
          {
            "id": "RI",
            "label": {
              "en": "RI",
              "zh": "RI"
            }
          },
          {
            "id": "SC",
            "label": {
              "en": "SC",
              "zh": "SC"
            }
          },
          {
            "id": "SD",
            "label": {
              "en": "SD",
              "zh": "SD"
            }
          },
          {
            "id": "TN",
            "label": {
              "en": "TN",
              "zh": "TN"
            }
          },
          {
            "id": "TX",
            "label": {
              "en": "TX",
              "zh": "TX"
            }
          },
          {
            "id": "UT",
            "label": {
              "en": "UT",
              "zh": "UT"
            }
          },
          {
            "id": "VT",
            "label": {
              "en": "VT",
              "zh": "VT"
            }
          },
          {
            "id": "VA",
            "label": {
              "en": "VA",
              "zh": "VA"
            }
          },
          {
            "id": "WA",
            "label": {
              "en": "WA",
              "zh": "WA"
            }
          },
          {
            "id": "WV",
            "label": {
              "en": "WV",
              "zh": "WV"
            }
          },
          {
            "id": "WI",
            "label": {
              "en": "WI",
              "zh": "WI"
            }
          },
          {
            "id": "WY",
            "label": {
              "en": "WY",
              "zh": "WY"
            }
          },
          {
            "id": "outside",
            "label": {
              "en": "Outside the US / other",
              "zh": "美国境外 / 其他"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "retirement",
    "title": {
      "en": "Retirement & tax accounts",
      "zh": "退休与税务账户"
    },
    "fields": [
      {
        "id": "401k",
        "label": {
          "en": "Traditional 401(k)",
          "zh": "传统 401(k)"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "Do not have",
              "zh": "未持有"
            }
          },
          {
            "id": "employer-active",
            "label": {
              "en": "Employer-sponsored · contributing",
              "zh": "雇主计划 · 供款中"
            }
          },
          {
            "id": "employer-inactive",
            "label": {
              "en": "Employer-sponsored · not contributing",
              "zh": "雇主计划 · 未供款"
            }
          },
          {
            "id": "self-active",
            "label": {
              "en": "Business/self-employed · contributing",
              "zh": "企业 / 自雇计划 · 供款中"
            }
          },
          {
            "id": "self-inactive",
            "label": {
              "en": "Business/self-employed · not contributing",
              "zh": "企业 / 自雇计划 · 未供款"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "roth401k",
        "label": {
          "en": "Roth 401(k)",
          "zh": "Roth 401(k)"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "Do not have",
              "zh": "未持有"
            }
          },
          {
            "id": "employer-active",
            "label": {
              "en": "Employer-sponsored · contributing",
              "zh": "雇主计划 · 供款中"
            }
          },
          {
            "id": "employer-inactive",
            "label": {
              "en": "Employer-sponsored · not contributing",
              "zh": "雇主计划 · 未供款"
            }
          },
          {
            "id": "self-active",
            "label": {
              "en": "Business/self-employed · contributing",
              "zh": "企业 / 自雇计划 · 供款中"
            }
          },
          {
            "id": "self-inactive",
            "label": {
              "en": "Business/self-employed · not contributing",
              "zh": "企业 / 自雇计划 · 未供款"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "ira",
        "label": {
          "en": "Traditional IRA",
          "zh": "传统 IRA"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "Do not have",
              "zh": "未持有"
            }
          },
          {
            "id": "individual-active",
            "label": {
              "en": "Individual · contributing",
              "zh": "个人账户 · 供款中"
            }
          },
          {
            "id": "individual-inactive",
            "label": {
              "en": "Individual · not contributing",
              "zh": "个人账户 · 未供款"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "rothira",
        "label": {
          "en": "Roth IRA",
          "zh": "Roth IRA"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "Do not have",
              "zh": "未持有"
            }
          },
          {
            "id": "individual-active",
            "label": {
              "en": "Individual · contributing",
              "zh": "个人账户 · 供款中"
            }
          },
          {
            "id": "individual-inactive",
            "label": {
              "en": "Individual · not contributing",
              "zh": "个人账户 · 未供款"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "sep",
        "label": {
          "en": "SEP IRA",
          "zh": "SEP IRA"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "Do not have",
              "zh": "未持有"
            }
          },
          {
            "id": "employer-active",
            "label": {
              "en": "Employer-sponsored · contributing",
              "zh": "雇主计划 · 供款中"
            }
          },
          {
            "id": "employer-inactive",
            "label": {
              "en": "Employer-sponsored · not contributing",
              "zh": "雇主计划 · 未供款"
            }
          },
          {
            "id": "self-active",
            "label": {
              "en": "Business/self-employed · contributing",
              "zh": "企业 / 自雇计划 · 供款中"
            }
          },
          {
            "id": "self-inactive",
            "label": {
              "en": "Business/self-employed · not contributing",
              "zh": "企业 / 自雇计划 · 未供款"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "simple",
        "label": {
          "en": "SIMPLE IRA",
          "zh": "SIMPLE IRA"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "Do not have",
              "zh": "未持有"
            }
          },
          {
            "id": "employer-active",
            "label": {
              "en": "Employer-sponsored · contributing",
              "zh": "雇主计划 · 供款中"
            }
          },
          {
            "id": "employer-inactive",
            "label": {
              "en": "Employer-sponsored · not contributing",
              "zh": "雇主计划 · 未供款"
            }
          },
          {
            "id": "self-active",
            "label": {
              "en": "Business/self-employed · contributing",
              "zh": "企业 / 自雇计划 · 供款中"
            }
          },
          {
            "id": "self-inactive",
            "label": {
              "en": "Business/self-employed · not contributing",
              "zh": "企业 / 自雇计划 · 未供款"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "solo",
        "label": {
          "en": "Solo 401(k)",
          "zh": "个人 401(k)"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "Do not have",
              "zh": "未持有"
            }
          },
          {
            "id": "self-active",
            "label": {
              "en": "Business/self-employed · contributing",
              "zh": "企业 / 自雇计划 · 供款中"
            }
          },
          {
            "id": "self-inactive",
            "label": {
              "en": "Business/self-employed · not contributing",
              "zh": "企业 / 自雇计划 · 未供款"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "hsa",
        "label": {
          "en": "HSA",
          "zh": "健康储蓄账户"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "Do not have",
              "zh": "未持有"
            }
          },
          {
            "id": "employer-active",
            "label": {
              "en": "Employer-sponsored · contributing",
              "zh": "雇主计划 · 供款中"
            }
          },
          {
            "id": "employer-inactive",
            "label": {
              "en": "Employer-sponsored · not contributing",
              "zh": "雇主计划 · 未供款"
            }
          },
          {
            "id": "self-active",
            "label": {
              "en": "Business/self-employed · contributing",
              "zh": "企业 / 自雇计划 · 供款中"
            }
          },
          {
            "id": "self-inactive",
            "label": {
              "en": "Business/self-employed · not contributing",
              "zh": "企业 / 自雇计划 · 未供款"
            }
          },
          {
            "id": "individual-active",
            "label": {
              "en": "Individual · contributing",
              "zh": "个人账户 · 供款中"
            }
          },
          {
            "id": "individual-inactive",
            "label": {
              "en": "Individual · not contributing",
              "zh": "个人账户 · 未供款"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "other-account",
        "label": {
          "en": "Other retirement accounts",
          "zh": "其他退休账户"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "Do not have",
              "zh": "未持有"
            }
          },
          {
            "id": "employer-active",
            "label": {
              "en": "Employer-sponsored · contributing",
              "zh": "雇主计划 · 供款中"
            }
          },
          {
            "id": "employer-inactive",
            "label": {
              "en": "Employer-sponsored · not contributing",
              "zh": "雇主计划 · 未供款"
            }
          },
          {
            "id": "self-active",
            "label": {
              "en": "Business/self-employed · contributing",
              "zh": "企业 / 自雇计划 · 供款中"
            }
          },
          {
            "id": "self-inactive",
            "label": {
              "en": "Business/self-employed · not contributing",
              "zh": "企业 / 自雇计划 · 未供款"
            }
          },
          {
            "id": "individual-active",
            "label": {
              "en": "Individual · contributing",
              "zh": "个人账户 · 供款中"
            }
          },
          {
            "id": "individual-inactive",
            "label": {
              "en": "Individual · not contributing",
              "zh": "个人账户 · 未供款"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "protection",
    "title": {
      "en": "Protection",
      "zh": "保障"
    },
    "fields": [
      {
        "id": "coverage",
        "label": {
          "en": "Which coverage do you currently have?",
          "zh": "目前拥有哪些保障？"
        },
        "type": "multi",
        "options": [
          {
            "id": "term",
            "label": {
              "en": "Term life",
              "zh": "定期寿险"
            }
          },
          {
            "id": "permanent",
            "label": {
              "en": "Permanent life",
              "zh": "永久寿险"
            }
          },
          {
            "id": "employer",
            "label": {
              "en": "Employer life",
              "zh": "雇主寿险"
            }
          },
          {
            "id": "medical",
            "label": {
              "en": "Health / medical",
              "zh": "医疗保险"
            }
          },
          {
            "id": "disability",
            "label": {
              "en": "Disability",
              "zh": "失能保障"
            }
          },
          {
            "id": "liability",
            "label": {
              "en": "Liability / umbrella",
              "zh": "责任 / 伞式保险"
            }
          },
          {
            "id": "other",
            "label": {
              "en": "Other protection",
              "zh": "其他保障"
            }
          },
          {
            "id": "none",
            "label": {
              "en": "None",
              "zh": "无"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "has-trust",
        "label": {
          "en": "Do you currently have a trust?",
          "zh": "您目前是否已有信托？"
        },
        "type": "select",
        "options": [
          {
            "id": "yes",
            "label": {
              "en": "Yes",
              "zh": "是"
            }
          },
          {
            "id": "no",
            "label": {
              "en": "No",
              "zh": "否"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          }
        ]
      },
      {
        "id": "estate-priority",
        "label": {
          "en": "Is estate / inheritance planning currently a priority?",
          "zh": "遗产与传承规划目前是否是您关注的重点？"
        },
        "type": "select",
        "options": [
          {
            "id": "yes",
            "label": {
              "en": "Yes",
              "zh": "是"
            }
          },
          {
            "id": "no",
            "label": {
              "en": "No",
              "zh": "否"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "assets",
    "title": {
      "en": "Assets & investments",
      "zh": "资产与投资"
    },
    "fields": [
      {
        "id": "assets",
        "label": {
          "en": "Current asset categories",
          "zh": "当前资产类别"
        },
        "type": "multi",
        "options": [
          {
            "id": "home",
            "label": {
              "en": "Primary residence",
              "zh": "主要住宅"
            }
          },
          {
            "id": "brokerage",
            "label": {
              "en": "Brokerage / investment accounts",
              "zh": "证券 / 投资账户"
            }
          },
          {
            "id": "stocks",
            "label": {
              "en": "Stock-market exposure, including retirement accounts",
              "zh": "股票市场敞口（含退休账户）"
            }
          },
          {
            "id": "cash",
            "label": {
              "en": "Cash / cash equivalents",
              "zh": "现金 / 现金等价物"
            }
          },
          {
            "id": "business",
            "label": {
              "en": "Business ownership",
              "zh": "企业所有权"
            }
          },
          {
            "id": "other",
            "label": {
              "en": "Other major assets",
              "zh": "其他主要资产"
            }
          },
          {
            "id": "none",
            "label": {
              "en": "None",
              "zh": "无"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "real-estate",
    "title": {
      "en": "Real estate profile",
      "zh": "房地产概况"
    },
    "fields": [
      {
        "id": "residence",
        "label": {
          "en": "Do you own your primary residence?",
          "zh": "是否拥有主要住宅？"
        },
        "type": "select",
        "options": [
          {
            "id": "yes",
            "label": {
              "en": "Yes",
              "zh": "是"
            }
          },
          {
            "id": "no",
            "label": {
              "en": "No",
              "zh": "否"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "property-count",
        "label": {
          "en": "Existing investment properties",
          "zh": "现有投资物业数量"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "None",
              "zh": "无"
            }
          },
          {
            "id": "one",
            "label": {
              "en": "1",
              "zh": "1"
            }
          },
          {
            "id": "two-three",
            "label": {
              "en": "2–3",
              "zh": "2–3"
            }
          },
          {
            "id": "fourplus",
            "label": {
              "en": "4+",
              "zh": "4 处及以上"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "property-types",
        "label": {
          "en": "Existing investment property types",
          "zh": "现有投资物业类型"
        },
        "type": "multi",
        "options": [
          {
            "id": "residential",
            "label": {
              "en": "Residential",
              "zh": "住宅"
            }
          },
          {
            "id": "commercial",
            "label": {
              "en": "Commercial",
              "zh": "商业"
            }
          },
          {
            "id": "land",
            "label": {
              "en": "Land / other",
              "zh": "土地 / 其他"
            }
          },
          {
            "id": "none",
            "label": {
              "en": "None",
              "zh": "无"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "property-interests",
        "label": {
          "en": "Real estate interests",
          "zh": "房地产兴趣"
        },
        "type": "multi",
        "options": [
          {
            "id": "residential",
            "label": {
              "en": "Residential",
              "zh": "住宅"
            }
          },
          {
            "id": "commercial",
            "label": {
              "en": "Commercial",
              "zh": "商业"
            }
          },
          {
            "id": "long-term",
            "label": {
              "en": "Long-term rentals",
              "zh": "长期出租"
            }
          },
          {
            "id": "short-term",
            "label": {
              "en": "Short-term rentals",
              "zh": "短期出租"
            }
          },
          {
            "id": "none",
            "label": {
              "en": "None",
              "zh": "无"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "purchase",
        "label": {
          "en": "May purchase investment real estate in 1–3 years?",
          "zh": "未来 1–3 年可能购买投资物业？"
        },
        "type": "select",
        "options": [
          {
            "id": "yes",
            "label": {
              "en": "Yes",
              "zh": "是"
            }
          },
          {
            "id": "no",
            "label": {
              "en": "No",
              "zh": "否"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "sale",
        "label": {
          "en": "May sell an existing investment property?",
          "zh": "可能出售现有投资物业？"
        },
        "type": "select",
        "options": [
          {
            "id": "yes",
            "label": {
              "en": "Yes",
              "zh": "是"
            }
          },
          {
            "id": "no",
            "label": {
              "en": "No",
              "zh": "否"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "exchange",
        "label": {
          "en": "Interested in learning about 1031 exchange concepts?",
          "zh": "是否想了解 1031 置换概念？"
        },
        "type": "select",
        "options": [
          {
            "id": "yes",
            "label": {
              "en": "Yes",
              "zh": "是"
            }
          },
          {
            "id": "no",
            "label": {
              "en": "No",
              "zh": "否"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "property-goal",
        "label": {
          "en": "Cash flow or appreciation preference",
          "zh": "现金流或增值偏好"
        },
        "type": "select",
        "options": [
          {
            "id": "cashflow",
            "label": {
              "en": "Cash flow",
              "zh": "现金流"
            }
          },
          {
            "id": "appreciation",
            "label": {
              "en": "Appreciation",
              "zh": "增值"
            }
          },
          {
            "id": "both",
            "label": {
              "en": "Both",
              "zh": "两者兼顾"
            }
          },
          {
            "id": "neither",
            "label": {
              "en": "No current preference",
              "zh": "暂无偏好"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "leverage",
        "label": {
          "en": "Comfort with mortgage / leverage",
          "zh": "对按揭 / 杠杆的接受程度"
        },
        "type": "select",
        "options": [
          {
            "id": "low",
            "label": {
              "en": "Prefer little or no borrowing",
              "zh": "倾向少借或不借"
            }
          },
          {
            "id": "moderate",
            "label": {
              "en": "Comfortable with moderate borrowing",
              "zh": "可接受适度借款"
            }
          },
          {
            "id": "high",
            "label": {
              "en": "Comfortable with substantial borrowing",
              "zh": "可接受较高借款"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "property-preference",
        "label": {
          "en": "Overall real estate investment preference",
          "zh": "整体房地产投资偏好"
        },
        "type": "select",
        "options": [
          {
            "id": "low",
            "label": {
              "en": "Low",
              "zh": "低"
            }
          },
          {
            "id": "moderate",
            "label": {
              "en": "Moderate",
              "zh": "中等"
            }
          },
          {
            "id": "high",
            "label": {
              "en": "High",
              "zh": "高"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "debt",
    "title": {
      "en": "Debt",
      "zh": "债务"
    },
    "fields": [
      {
        "id": "debts",
        "label": {
          "en": "Meaningful liabilities",
          "zh": "主要负债"
        },
        "type": "multi",
        "options": [
          {
            "id": "mortgage",
            "label": {
              "en": "Home mortgage",
              "zh": "住房按揭"
            }
          },
          {
            "id": "property-loan",
            "label": {
              "en": "Investment-property loans",
              "zh": "投资物业贷款"
            }
          },
          {
            "id": "auto",
            "label": {
              "en": "Auto loans",
              "zh": "汽车贷款"
            }
          },
          {
            "id": "student",
            "label": {
              "en": "Student loans",
              "zh": "学生贷款"
            }
          },
          {
            "id": "personal",
            "label": {
              "en": "Personal / credit-card loans",
              "zh": "个人 / 信用卡债务"
            }
          },
          {
            "id": "business",
            "label": {
              "en": "Business debt",
              "zh": "企业债务"
            }
          },
          {
            "id": "other",
            "label": {
              "en": "Other liabilities",
              "zh": "其他负债"
            }
          },
          {
            "id": "none",
            "label": {
              "en": "None",
              "zh": "无"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "preferences",
    "title": {
      "en": "Investment & capital preferences",
      "zh": "投资与资本偏好"
    },
    "fields": [
      {
        "id": "risk",
        "label": {
          "en": "Comfort with investment uncertainty and potential losses",
          "zh": "对投资不确定性与潜在损失的接受程度"
        },
        "type": "select",
        "options": [
          {
            "id": "conservative",
            "label": {
              "en": "Conservative",
              "zh": "保守"
            }
          },
          {
            "id": "moderate",
            "label": {
              "en": "Moderate",
              "zh": "稳健"
            }
          },
          {
            "id": "growth",
            "label": {
              "en": "Growth-oriented / aggressive",
              "zh": "成长型 / 积极"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "stock-interest",
        "label": {
          "en": "Stock-market investing interest",
          "zh": "股票市场投资兴趣"
        },
        "type": "select",
        "options": [
          {
            "id": "low",
            "label": {
              "en": "Low",
              "zh": "低"
            }
          },
          {
            "id": "moderate",
            "label": {
              "en": "Moderate",
              "zh": "中等"
            }
          },
          {
            "id": "high",
            "label": {
              "en": "High",
              "zh": "高"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "real-estate-interest",
        "label": {
          "en": "Real-estate investing interest",
          "zh": "房地产投资兴趣"
        },
        "type": "select",
        "options": [
          {
            "id": "low",
            "label": {
              "en": "Low",
              "zh": "低"
            }
          },
          {
            "id": "moderate",
            "label": {
              "en": "Moderate",
              "zh": "中等"
            }
          },
          {
            "id": "high",
            "label": {
              "en": "High",
              "zh": "高"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "business-interest",
        "label": {
          "en": "Entrepreneurship / business opportunities interest",
          "zh": "创业 / 商业机会兴趣"
        },
        "type": "select",
        "options": [
          {
            "id": "low",
            "label": {
              "en": "Low",
              "zh": "低"
            }
          },
          {
            "id": "moderate",
            "label": {
              "en": "Moderate",
              "zh": "中等"
            }
          },
          {
            "id": "high",
            "label": {
              "en": "High",
              "zh": "高"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "liquidity",
    "title": {
      "en": "Cash flow & liquidity",
      "zh": "现金流与流动性"
    },
    "fields": [
      {
        "id": "allocation",
        "label": {
          "en": "Available for longer-term strategies without affecting near-term needs",
          "zh": "不影响近期需求，可用于长期策略的金额"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "None currently",
              "zh": "目前没有"
            }
          },
          {
            "id": "under10",
            "label": {
              "en": "Under $10,000",
              "zh": "低于 $10,000"
            }
          },
          {
            "id": "10to50",
            "label": {
              "en": "$10,000–$49,999",
              "zh": "$10,000–$49,999"
            }
          },
          {
            "id": "50to100",
            "label": {
              "en": "$50,000–$99,999",
              "zh": "$50,000–$99,999"
            }
          },
          {
            "id": "100plus",
            "label": {
              "en": "$100,000+",
              "zh": "$100,000 及以上"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "monthly",
        "label": {
          "en": "Approximate investable monthly cash flow",
          "zh": "大致每月可投资现金流"
        },
        "type": "select",
        "options": [
          {
            "id": "none",
            "label": {
              "en": "None / negative",
              "zh": "无 / 为负"
            }
          },
          {
            "id": "under500",
            "label": {
              "en": "Under $500",
              "zh": "低于 $500"
            }
          },
          {
            "id": "500to2k",
            "label": {
              "en": "$500–$1,999",
              "zh": "$500–$1,999"
            }
          },
          {
            "id": "2to5k",
            "label": {
              "en": "$2,000–$4,999",
              "zh": "$2,000–$4,999"
            }
          },
          {
            "id": "5kplus",
            "label": {
              "en": "$5,000+",
              "zh": "$5,000 及以上"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "emergency",
        "label": {
          "en": "Emergency liquidity concerns",
          "zh": "应急流动性顾虑"
        },
        "type": "select",
        "options": [
          {
            "id": "concern",
            "label": {
              "en": "Concerned about emergency reserves",
              "zh": "担忧应急储备不足"
            }
          },
          {
            "id": "building",
            "label": {
              "en": "Building reserves",
              "zh": "正在建立储备"
            }
          },
          {
            "id": "comfortable",
            "label": {
              "en": "Comfortable with current reserves",
              "zh": "当前储备较充足"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      },
      {
        "id": "expenses",
        "label": {
          "en": "Major anticipated expenses in the next 12–24 months",
          "zh": "未来 12–24 个月预计大额支出"
        },
        "type": "multi",
        "options": [
          {
            "id": "home",
            "label": {
              "en": "Housing / moving",
              "zh": "住房 / 搬迁"
            }
          },
          {
            "id": "education",
            "label": {
              "en": "Education",
              "zh": "教育"
            }
          },
          {
            "id": "medical",
            "label": {
              "en": "Medical / caregiving",
              "zh": "医疗 / 照护"
            }
          },
          {
            "id": "business",
            "label": {
              "en": "Business investment",
              "zh": "企业投入"
            }
          },
          {
            "id": "family",
            "label": {
              "en": "Family changes",
              "zh": "家庭变化"
            }
          },
          {
            "id": "other",
            "label": {
              "en": "Other major expenses",
              "zh": "其他大额支出"
            }
          },
          {
            "id": "none",
            "label": {
              "en": "None anticipated",
              "zh": "暂无"
            }
          },
          {
            "id": "unknown",
            "label": {
              "en": "Not sure",
              "zh": "不确定"
            }
          },
          {
            "id": "private",
            "label": {
              "en": "Prefer not to say",
              "zh": "暂不回答"
            }
          }
        ]
      }
    ]
  }
]
export function toggleAnswer(current = [], value) {
 const exclusive = ['none', 'unknown', 'private']
 if (current.includes(value)) return current.filter(item => item !== value)
 if (exclusive.includes(value)) return [value]
 return [...current.filter(item => !exclusive.includes(item)), value]
}
// Only known field and option IDs enter the profile. No scores or recommendations.
export function buildCapitalProfile(answers = {}) {
 const source = answers && typeof answers === 'object' && !Array.isArray(answers) ? answers : {}
 return Object.fromEntries(profileSections.flatMap(section => section.fields).map(field => {
  const raw = source[field.id]
  const values = [...new Set((Array.isArray(raw) ? raw : [raw]).filter(value => typeof value === 'string' && field.options.some(option => option.id === value)))]
  const exclusive = values.find(value => ['none', 'unknown', 'private'].includes(value))
  return [field.id, field.type === 'multi' ? (exclusive ? [exclusive] : values) : values[0] || '']
 }))
}
