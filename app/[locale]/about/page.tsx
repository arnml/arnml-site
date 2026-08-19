import { notFound } from 'next/navigation'
import { SectionHeading } from '@/components/site/section-heading'
import { siteCopy } from '@/lib/site/content'
import { isLocale } from '@/lib/site/locales'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return isLocale(locale) ? { title: siteCopy[locale].nav.about, description: siteCopy[locale].about.intro } : {} }
export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; if (!isLocale(rawLocale)) notFound(); const copy = siteCopy[rawLocale].about; return <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28"><div className="max-w-3xl"><SectionHeading eyebrow="About" title={copy.title} /><p className="text-2xl leading-10 text-zinc-700 dark:text-zinc-300">{copy.intro}</p></div><div className="mt-20 grid gap-12 border-t border-zinc-200 pt-10 md:grid-cols-3 dark:border-zinc-800">{copy.sections.map((section) => <section key={section.title}><h2 className="text-xl font-medium">{section.title}</h2><p className="mt-4 leading-8 text-zinc-600 dark:text-zinc-400">{section.body}</p></section>)}</div></div> }
