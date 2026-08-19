import Link from 'next/link'
import { SectionHeading } from '@/components/site/section-heading'
import { posts } from '@/content/posts/ai-is-leverage'
import { principles, siteCopy } from '@/lib/site/content'
import { isLocale, localePath } from '@/lib/site/locales'
import { notFound } from 'next/navigation'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const copy = siteCopy[locale].home
  const post = posts[locale]
  return <>
    <section className="mx-auto grid max-w-6xl gap-14 px-5 pb-24 pt-20 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:pb-32 lg:pt-32"><div><p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">{copy.eyebrow}</p><h1 className="max-w-4xl text-5xl font-medium leading-[1.02] tracking-[-0.05em] text-zinc-950 sm:text-7xl dark:text-white">{copy.title}</h1><p className="mt-8 max-w-2xl text-xl leading-8 text-zinc-600 dark:text-zinc-400">{copy.intro}</p><div className="mt-10 flex flex-wrap gap-3"><Link href={localePath(locale, '/writing')} className="rounded-full bg-blue-700 px-5 py-3 text-sm font-medium text-white hover:bg-blue-800">{copy.primary} →</Link><Link href={localePath(locale, '/consulting')} className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-300">{copy.secondary}</Link></div></div><div className="self-end border-l-2 border-blue-700 pl-6 text-sm leading-7 text-zinc-600 dark:text-zinc-400"><p className="font-mono text-xs uppercase tracking-widest text-zinc-400">North star</p><p className="mt-4 text-lg text-zinc-800 dark:text-zinc-200">Understand deeply. Build pragmatically. Measure reality. Reduce unnecessary complexity.</p></div></section>
    <section className="border-y border-zinc-200 py-20 dark:border-zinc-800"><div className="mx-auto max-w-6xl px-5 lg:px-8"><SectionHeading title={copy.selected} /><Link href={localePath(locale, `/writing/${post.slug}`)} className="group grid gap-6 md:grid-cols-[1fr_1.3fr]"><div><p className="font-mono text-xs text-blue-700 dark:text-blue-400">{post.tags.join(' · ')}</p><h3 className="mt-3 text-3xl font-medium tracking-tight group-hover:text-blue-700 dark:group-hover:text-blue-400">{post.title}</h3></div><p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">{post.description}</p></Link></div></section>
    <section className="mx-auto grid max-w-6xl gap-16 px-5 py-20 lg:grid-cols-2 lg:px-8"><div><SectionHeading title={copy.services} /><div className="grid gap-4">{siteCopy[locale].work.items.map((item, i) => <div key={item.title} className="border-t border-zinc-200 pt-4 dark:border-zinc-800"><p className="font-mono text-xs text-zinc-400">0{i + 1}</p><h3 className="mt-2 text-xl font-medium">{item.title}</h3><p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-400">{item.body}</p></div>)}</div></div><div><SectionHeading title={copy.principles} /><ul className="space-y-4 text-xl leading-8 text-zinc-700 dark:text-zinc-300">{principles[locale].map((item) => <li key={item} className="border-b border-zinc-200 pb-4 dark:border-zinc-800">{item}</li>)}</ul></div></section>
    <section className="bg-zinc-900 px-5 py-20 text-white dark:bg-zinc-800"><div className="mx-auto max-w-6xl lg:px-3"><h2 className="max-w-2xl text-4xl font-medium tracking-tight">{copy.contactTitle}</h2><p className="mt-4 text-lg text-zinc-300">{copy.contactText}</p><Link href={localePath(locale, '/contact')} className="mt-8 inline-block rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-900">{copy.secondary} →</Link></div></section>
  </>
}
