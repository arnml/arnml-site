import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SectionHeading } from '@/components/site/section-heading'
import { siteCopy } from '@/lib/site/content'
import { isLocale } from '@/lib/site/locales'

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; if (!isLocale(rawLocale)) notFound(); const copy = siteCopy[rawLocale].contact; return <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28"><div className="max-w-2xl"><SectionHeading eyebrow="Contact" title={copy.title} /><p className="text-2xl leading-10 text-zinc-700 dark:text-zinc-300">{copy.intro}</p><Link href={`mailto:${copy.email}`} className="mt-10 inline-block border-b-2 border-blue-700 pb-2 text-lg font-medium hover:text-blue-700">{copy.prompt} →</Link></div></div> }
