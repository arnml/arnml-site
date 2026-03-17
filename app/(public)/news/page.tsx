import type { Metadata } from 'next'
import { display } from '@/lib/fonts'
import { ParticleBackground } from '@/components/particle-background'
import { GlassWindow } from '@/components/glass-window'
import { prisma } from '@/lib/prisma'
import { Language } from '@/app/generated/prisma/client'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Archivo | Arnold Moya',
  description: 'Todas las entregas del boletín de Arnold Moya — AI y tech en español, inglés y portugués.',
  authors: [{ name: 'Arnold Moya' }],
  // Don't index the archive list — it changes daily and creates stale snapshots.
  // Individual /news/[slug] pages are the canonical indexed content.
  robots: { index: false, follow: true },
}

const tabs: { lang: string; label: string; value: Language; locale: string; empty: string }[] = [
  { lang: '',    label: 'Español',   value: Language.ES, locale: 'es-ES', empty: 'Próximamente...' },
  { lang: 'en',  label: 'English',   value: Language.EN, locale: 'en-US', empty: 'Coming soon...' },
  { lang: 'pt',  label: 'Português', value: Language.PT, locale: 'pt-BR', empty: 'Em breve...' },
]

export default async function NewsArchive({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang } = await searchParams
  const normalized = lang?.toLowerCase()
  const activeTab = tabs.find((t) => t.lang === normalized) ?? tabs[0]

  const newsItems = await prisma.newsItem.findMany({
    where: { published: true, language: activeTab.value },
    orderBy: { publishedAt: 'desc' },
    select: { slug: true, title: true, summary: true, publishedAt: true },
  })

  return (
    <div className="bg-black min-h-screen">
      <ParticleBackground />
      <main className="relative z-10 min-h-screen px-6 py-20">
        <div className="mx-auto w-full max-w-[560px]">
          <GlassWindow>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Archivo</p>
                <h1 className={`${display.className} mt-3 text-3xl font-semibold text-neutral-100`}>
                  Todas las entregas
                </h1>
              </div>
              <Link
                href="/newsletter/es"
                className="mt-1 shrink-0 text-xs text-neutral-600 hover:text-neutral-400 transition"
              >
                ← Volver
              </Link>
            </div>

            {/* Language tabs */}
            <div className="mt-6 flex gap-2">
              {tabs.map((tab) => (
                <Link
                  key={tab.lang}
                  href={tab.lang ? `/news?lang=${tab.lang}` : '/news'}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition border ${
                    activeTab.value === tab.value
                      ? 'bg-white/10 text-neutral-100 border-white/20'
                      : 'text-neutral-500 border-transparent hover:text-neutral-300'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>

            {newsItems.length > 0 ? (
              <ul className="mt-6 flex flex-col divide-y divide-white/[0.06]">
                {newsItems.map((item) => (
                  <li key={item.slug} className="py-4 first:pt-0 last:pb-0">
                    <Link href={`/news/${item.slug}`} className="group block">
                      <p className="text-sm font-medium text-neutral-200 transition group-hover:text-white leading-snug">
                        {item.title}
                      </p>
                      {item.summary && (
                        <p className="mt-1 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                          {item.summary}
                        </p>
                      )}
                      {item.publishedAt && (
                        <p className="mt-1.5 text-xs text-neutral-600">
                          {new Date(item.publishedAt).toLocaleDateString(activeTab.locale, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-8 text-sm text-neutral-600">{activeTab.empty}</p>
            )}
          </GlassWindow>
        </div>
      </main>
    </div>
  )
}
