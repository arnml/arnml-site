export const locales = ['en', 'es', 'pt'] as const

export type Locale = (typeof locales)[number]

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localeLabel(locale: Locale) {
  return { en: 'English', es: 'Español', pt: 'Português' }[locale]
}

export function localePath(locale: Locale, path = '') {
  return `/${locale}${path ? `/${path.replace(/^\//, '')}` : ''}`
}
