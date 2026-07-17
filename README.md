# ONYX

ONYX is a multilingual, lifelong-learning platform that helps people understand the systems shaping their money, health, technology, and everyday life — so they can make clearer, more confident decisions.

## Mission

Turning complexity into clarity, across Wealth, Wellness, and Intelligence.

The full brand mission, voice, and philosophy live in [BRAND_BIBLE.md](./BRAND_BIBLE.md).

## Vision

A world where understanding the systems around you — taxes, health, technology, and money — isn't reserved for experts, but is accessible to every family, in plain language, in the language they actually speak.

## Three Pillars

- **Wealth** — taxes, insurance, retirement, estate planning, and family finance.
- **Wellness** — nutrition, prevention, longevity, and everyday health decisions.
- **Intelligence** — AI, automation, and decision-making, with human judgment always at the center.

## Technology Stack

- **React** — UI framework
- **Vite** — build tooling and dev server
- **React Router** — client-side routing, including locale-prefixed paths (`/`, `/zh`, `/es`, `/ko`, `/fr`, `/de`)
- **Cloudflare Pages** — hosting and deployment
- **GitHub** — version control; `origin/main` is the single source of truth for production

## Repository Structure

```
onyx-website/
├── src/
│   ├── components/    Page and layout components (Nav, Footer, HomePage, Insights, etc.)
│   ├── data/           Structured content (service pages, Insights articles)
│   ├── i18n/            Locale routing and context
│   ├── locales/         Per-language UI dictionaries (en, zh, es, ko, fr, de)
│   └── hooks/           Shared React hooks (document meta, canonical, hreflang)
├── public/              Static assets and Cloudflare Pages config
├── README.md            This file
├── ENGINEERING.md       How ONYX software is built
├── BRAND_BIBLE.md       What ONYX is, and how it speaks
└── CONTENT_BIBLE.md     How ONYX content is created
```

## Project Principles

ONYX is built on one idea: reduce complexity, preserve human judgment, build long-term trust. How that plays out day to day is documented separately, so each concern has a single home:

- **[ENGINEERING.md](./ENGINEERING.md)** — how the software gets built, reviewed, and released.
- **[BRAND_BIBLE.md](./BRAND_BIBLE.md)** — who ONYX is, how it looks, and how it speaks.
- **[CONTENT_BIBLE.md](./CONTENT_BIBLE.md)** — how ONYX articles and educational content are created and published.
