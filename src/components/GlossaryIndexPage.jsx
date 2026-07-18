import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { getPublishedTerms, resolveTermContent } from '../data/glossary'
import styles from './GlossaryIndexPage.module.css'

const ALL = 'all'

export default function GlossaryIndexPage() {
  const { t, locale, localePath } = useLocale()
  const terms = getPublishedTerms()

  useDocumentMeta(`${t('glossaryPage.indexTitle')} · ONYX`, t('glossaryPage.indexSubtitle'))

  const [activePillar, setActivePillar] = useState(ALL)
  const [activeCategory, setActiveCategory] = useState(ALL)

  // Derived from published terms only — the pillar/category shape reflects
  // whatever is actually published, so this never has to be hardcoded to
  // Intelligence/AI as Wealth and Wellness terms are added later.
  const pillarIds = useMemo(
    () => [...new Set(terms.flatMap((term) => term.pillars))],
    [terms]
  )
  const categories = useMemo(
    () => [...new Set(terms.map((term) => term.category))],
    [terms]
  )

  const resolved = useMemo(
    () => terms.map((term) => ({ term, ...resolveTermContent(term, locale) })),
    [terms, locale]
  )

  const filtered = resolved
    .filter(({ term }) => activePillar === ALL || term.pillars.includes(activePillar))
    .filter(({ term }) => activeCategory === ALL || term.category === activeCategory)
    .sort((a, b) => a.data.title.localeCompare(b.data.title, locale))

  return (
    <div className={`${styles.wrap} page-enter`}>
      <p className={styles.eyebrow}>{t('glossaryPage.eyebrow')}</p>
      <h1 className={styles.title}>{t('glossaryPage.indexTitle')}</h1>
      <p className={styles.subtitle}>{t('glossaryPage.indexSubtitle')}</p>

      {pillarIds.length > 0 && (
        <div className={styles.filterGroup}>
          <p className={styles.filterSectionLabel}>{t('glossaryPage.pillarSectionLabel')}</p>
          <div className={styles.filterRow} role="group" aria-label={t('glossaryPage.pillarFilterLabel')}>
            <button
              type="button"
              className={activePillar === ALL ? styles.filterActive : styles.filter}
              onClick={() => setActivePillar(ALL)}
            >
              {t('glossaryPage.allPillarsLabel')}
            </button>
            {pillarIds.map((id) => (
              <button
                key={id}
                type="button"
                className={activePillar === id ? styles.filterActive : styles.filter}
                onClick={() => setActivePillar(id)}
              >
                {t(`nav.${id}`)}
              </button>
            ))}
          </div>
        </div>
      )}

      {categories.length > 1 && (
        <div className={styles.filterGroup}>
          <p className={styles.filterSectionLabel}>{t('glossaryPage.categorySectionLabel')}</p>
          <div className={styles.filterRow} role="group" aria-label={t('glossaryPage.categoryFilterLabel')}>
            <button
              type="button"
              className={activeCategory === ALL ? styles.filterActive : styles.filter}
              onClick={() => setActiveCategory(ALL)}
            >
              {t('glossaryPage.allCategoriesLabel')}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? styles.filterActive : styles.filter}
                onClick={() => setActiveCategory(category)}
              >
                {t(`glossaryPage.categories.${category}`)}
              </button>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className={styles.empty}>
          {terms.length === 0 ? t('glossaryPage.indexEmpty') : t('glossaryPage.noResultsLabel')}
        </p>
      ) : (
        <>
          <p className={styles.filterSectionLabel}>{t('glossaryPage.browseByLetterLabel')}</p>
          <ul className={styles.list}>
            {filtered.map(({ term, data, isFallback }) => (
              <li key={term.slug} className={styles.item}>
                <Link to={localePath(`/glossary/${term.slug}`)} className={styles.itemLink}>
                  <p className={styles.itemCategory}>{t(`glossaryPage.categories.${term.category}`)}</p>
                  <h2 className={styles.itemTitle}>{data.title}</h2>
                  <p className={styles.itemDef}>{data.shortDefinition}</p>
                  {isFallback && (
                    <p className={styles.itemMeta}>{t('insightsPage.languageNoticeShort')}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
