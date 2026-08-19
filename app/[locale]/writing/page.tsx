import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SectionHeading } from '@/components/site/section-heading'
import { posts } from '@/content/posts/ai-is-leverage'
import { siteCopy } from '@/lib/site/content'
import { isLocale, localePath } from '@/lib/site/locales'

export default async function WritingPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; if (!isLocale(rawLocale)) notFound(); const post = posts[rawLocale]; return <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28"><div className="max-w-3xl"><SectionHeading eyebrow="Writing" title={siteCopy[rawLocale].home.selected} /><p className="text-xl leading-8 text-zinc-600 dark:text-zinc-400">Essays, experiments, architecture notes, and research about systems that have to work in the real world.</p></div><div className="mt-16 border-t border-zinc-200 dark:border-zinc-800"><Link href={localePath(rawLocale, `/writing/${post.slug}`)} className="group grid gap-8 border-b border-zinc-200 py-10 md:grid-cols-[180px_1fr] dark:border-zinc-800"><p className="font-mono text-xs text-zinc-500">{post.date}</p><div><p className="font-mono text-xs uppercase tracking-widest text-blue-700 dark:text-blue-400">{post.tags.join(' · ')}</p><h2 className="mt-3 text-3xl font-medium tracking-tight group-hover:text-blue-700 dark:group-hover:text-blue-400">{post.title}</h2><p className="mt-4 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">{post.description}</p></div></Link></div></div> }
