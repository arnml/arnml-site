import type { Metadata } from 'next'
import styles from './page.module.css'
import { display } from '@/lib/fonts'
import { ParticleBackground } from '@/components/particle-background'
import { GlassWindow } from '@/components/glass-window'
import { HomeSubscribeForm } from '@/components/home-subscribe-form'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Arnold Moya | Boletín de AI & Tech',
  description:
    'Boletín semanal de Arnold Moya — Lo más relevante en AI y tech, curado a mano, en español. Suscríbete gratis.',
  keywords: ['newsletter', 'AI', 'inteligencia artificial', 'tech', 'Arnold Moya', 'boletín'],
  authors: [{ name: 'Arnold Moya' }],
  creator: 'Arnold Moya',
  openGraph: {
    title: 'Arnold Moya | Boletín de AI & Tech',
    description: 'Lo más relevante en AI y tech, curado a mano, en español.',
    siteName: 'Arnold Moya',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arnold Moya | Boletín de AI & Tech',
    description: 'Lo más relevante en AI y tech, curado a mano, en español.',
  },
}

const valueProps = [
  'Seleccionado a mano cada semana',
  'Gratis, siempre',
  'Sin spam — cancela cuando quieras',
]

export default async function NewsletterES() {
  const newsItems = await prisma.newsItem.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 5,
    select: { slug: true, title: true, publishedAt: true },
  })

  return (
    <div className={styles.page}>
      <ParticleBackground />

      {/* Hero — traditional landing page above the fold */}
      <section className={`${styles.hero} min-h-screen w-full px-6 py-20`}>
        <div className="relative z-10 mx-auto w-full max-w-[520px] flex flex-col justify-center">
          <GlassWindow>
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
              Boletín semanal
            </p>
            <h1
              className={`${display.className} mt-5 text-4xl font-semibold leading-tight text-neutral-100`}
            >
              Lo más relevante en AI y tech, cada semana.
            </h1>
            <p className="mt-4 text-base text-neutral-300 leading-relaxed">
              Curado a mano, en español, directo al punto. Sin ruido, sin hype vacío.
            </p>

            <ul className="mt-6 flex flex-col gap-2">
              {valueProps.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-neutral-400">
                  <span className="text-[#27c93f] text-xs font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <HomeSubscribeForm buttonText="Suscribirme gratis" />
            </div>

            {newsItems.length > 0 && (
              <p className="mt-5 text-center text-xs text-neutral-600">
                <a
                  href="#noticias"
                  className="text-neutral-500 hover:text-neutral-300 transition"
                >
                  Ver últimas entregas ↓
                </a>
              </p>
            )}
          </GlassWindow>
        </div>
      </section>

      {/* Latest news — nosnippet + nofollow so Google doesn't index this rotating list */}
      {newsItems.length > 0 && (
        <section id="noticias" className="relative z-10 w-full px-6 pb-24">
          <div className="mx-auto w-full max-w-[520px]">
            <GlassWindow bodyClassName="px-8 py-8 sm:px-8">
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
                Últimas entregas
              </p>
              {/* data-nosnippet: prevents Google from using this list in search snippets */}
              <ul
                data-nosnippet
                className="mt-6 flex flex-col divide-y divide-white/[0.06]"
              >
                {newsItems.map((item) => (
                  <li key={item.slug} className="py-4 first:pt-0 last:pb-0">
                    {/* rel="nofollow": don't follow these rotating links from the landing page */}
                    <Link
                      href={`/news/${item.slug}`}
                      rel="nofollow"
                      className="group block"
                    >
                      <p className="text-sm font-medium text-neutral-200 transition group-hover:text-white leading-snug">
                        {item.title}
                      </p>
                      {item.publishedAt && (
                        <p className="mt-1 text-xs text-neutral-600">
                          {new Date(item.publishedAt).toLocaleDateString('es-ES', {
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
              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <Link
                  href="/news"
                  className="text-xs text-neutral-500 hover:text-neutral-300 transition"
                >
                  Ver todo el archivo →
                </Link>
              </div>
            </GlassWindow>
          </div>
        </section>
      )}
    </div>
  )
}
