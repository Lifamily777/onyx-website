// Presentation only: never apply to URLs, persisted answers or internal identifiers.
export function brandText(value) {
  if (typeof value !== 'string') return value
  return value.replace(/ONYX Wealth (?:&|and) Wellness/g, 'Onyx Wealth and Wellness')
    .replace(/黑曜财商/g, '黑曜财康').replace(/\bONYX\b(?! WW)/g, 'ONYX WW')
}
