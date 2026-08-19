import { notFound } from 'next/navigation'
import { SectionHeading } from '@/components/site/section-heading'
import { siteCopy } from '@/lib/site/content'
import { isLocale } from '@/lib/site/locales'

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; if (!isLocale(rawLocale)) notFound(); const copy = siteCopy[rawLocale].work; return <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28"><div className="max-w-3xl"><SectionHeading eyebrow="Work" title={copy.title} /><p className="text-2xl leading-10 text-zinc-700 dark:text-zinc-300">{copy.intro}</p></div><div className="mt-20 grid gap-0 border-t border-zinc-200 md:grid-cols-3 dark:border-zinc-800">{copy.items.map((item, i) => <article key={item.title} className="border-b border-zinc-200 py-8 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 dark:border-zinc-800"><p className="font-mono text-xs text-blue-700 dark:text-blue-400">0{i + 1}</p><h2 className="mt-8 text-2xl font-medium tracking-tight">{item.title}</h2><p className="mt-4 leading-8 text-zinc-600 dark:text-zinc-400">{item.body}</p></article>)}</div></div> }
