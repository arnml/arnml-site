import { notFound } from 'next/navigation'
import { SectionHeading } from '@/components/site/section-heading'
import { siteCopy } from '@/lib/site/content'
import { isLocale } from '@/lib/site/locales'

export default async function ConsultingPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; if (!isLocale(rawLocale)) notFound(); const copy = siteCopy[rawLocale].consulting; return <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28"><div className="max-w-3xl"><SectionHeading eyebrow="Consulting" title={copy.title} /><p className="text-2xl leading-10 text-zinc-700 dark:text-zinc-300">{copy.intro}</p></div><div className="mt-20 grid gap-6 md:grid-cols-3">{copy.items.map((item) => <article key={item.title} className="rounded-2xl border border-zinc-200 bg-white/50 p-7 dark:border-zinc-800 dark:bg-zinc-900/40"><h2 className="text-xl font-medium">{item.title}</h2><p className="mt-4 leading-8 text-zinc-600 dark:text-zinc-400">{item.body}</p></article>)}</div></div> }
