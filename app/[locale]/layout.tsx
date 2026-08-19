import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { siteCopy } from '@/lib/site/content'
import { isLocale, locales, type Locale } from '@/lib/site/locales'

export function generateStaticParams() { return locales.map((locale) => ({ locale })) }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  return { title: { default: 'Arnold Moya — Software Architecture, AI & Technical Strategy', template: `%s — Arnold Moya` }, description: siteCopy[rawLocale].home.intro, alternates: { canonical: `/${rawLocale}`, languages: Object.fromEntries(locales.map((item) => [item, `/${item}`])) } }
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale as Locale
  return <div className="min-h-screen bg-[#f7f6f2] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100"><SiteHeader locale={locale} /><main>{children}</main><SiteFooter locale={locale} /></div>
}
