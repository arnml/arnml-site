/**
 * Hardcoded business info used to fill message templates.
 * Not persisted — Night Crawl is a single-brand tool, so this is a constant
 * rather than a DB-backed settings row. Revisit only if it needs to become
 * user-editable.
 */
export const EU_INFO = {
  nome: 'Eu',
  instagram: '@nightcrawlsp',
  whatsapp: '+55 11 90000-0000',
  site: 'nightcrawl.com.br',
}

export type EuInfo = typeof EU_INFO
