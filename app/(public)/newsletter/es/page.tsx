import type { Metadata } from 'next'
import styles from './page.module.css'
import { JetBrains_Mono, Inter } from 'next/font/google'
import { ParticleBackground } from '@/components/particle-background'
import { HomeSubscribeForm } from '@/components/home-subscribe-form'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

const display = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Arnold Moya | Boletín',
  description:
    'Boletín / Newsletter de Arnold Moya - Mantente informado con las últimas novedades en desarrollo web, tecnología y más. Suscríbete para recibir contenido exclusivo directamente en tu correo electrónico.',
  keywords: ['newsletter', 'desarrollo web', 'tecnología', 'Arnold Moya', 'boletín'],
  authors: [{ name: 'Arnold Moya' }],
  creator: 'Arnold Moya',
  openGraph: {
    title: 'Arnold Moya | Boletín',
    description:
      'Mantente informado con las últimas novedades en desarrollo web y tecnología.',
    siteName: 'Arnold Moya',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arnold Moya | Boletín',
    description:
      'Mantente informado con las últimas novedades en desarrollo web y tecnología.',
  },
}

export default async function NewsletterES() {
  const newsItems = await prisma.newsItem.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    select: {
      slug: true,
      title: true,
      summary: true,
      publishedAt: true,
    },
  })

  return (
    <div className={`${styles.page} ${body.className}`}>
      <ParticleBackground />
      <section className={`${styles.hero} min-h-screen w-full px-6 py-20`}>
        <div className={`${styles.mobileFrame} mx-auto flex w-full flex-col justify-center`}>
          <div className={styles.codeWindow}>
            <div className={styles.windowBar}>
              <div className={styles.windowDots}>
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className={styles.windowBody}>
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
                Suscríbete a mi boletín
              </p>
              <h1
                className={`${display.className} mt-6 text-4xl font-semibold leading-tight text-neutral-100`}
              >
                Lo más relevante en AI y tech, directo a tu inbox.
              </h1>
              <h2 className="mt-5 max-w-2xl text-lg font-medium text-neutral-300">
                Las novedades clave en software, AI y startups seleccionadas a mano.
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#suscribirse"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-600/70 bg-neutral-950 px-6 py-2 text-sm font-semibold text-neutral-100 transition hover:border-neutral-400 hover:text-white"
                >
                  Suscribirme gratis
                </a>
                <a
                  href="#noticias"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-600/60 bg-neutral-200/10 px-6 py-2 text-sm font-medium text-neutral-100 transition hover:bg-neutral-200/20 hover:border-neutral-400"
                >
                  Explorar archivo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="noticias"
        className={`${styles.hero} min-h-screen w-full px-6 py-20`}
      >
        <div className={`${styles.mobileFrame} mx-auto flex w-full flex-col justify-center`}>
          <div className={styles.codeWindow}>
            <div className={styles.windowBar}>
              <div className={styles.windowDots}>
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className={styles.windowBody}>
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
                Últimas noticias
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {newsItems.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/news/${item.slug}`}
                      className="group block"
                    >
                      <h3 className="text-lg font-medium text-neutral-100 transition group-hover:text-white">
                        {item.title}
                      </h3>
                      {item.summary && (
                        <p className="mt-1 text-sm text-neutral-400 line-clamp-2">
                          {item.summary}
                        </p>
                      )}
                      {item.publishedAt && (
                        <p className="mt-2 text-xs text-neutral-500">
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
              {newsItems.length === 0 && (
                <p className="mt-6 text-neutral-400">
                  Próximamente...
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="suscribirse"
        className={`${styles.hero} min-h-screen w-full px-6 py-20`}
      >
        <div className={`${styles.mobileFrame} mx-auto flex w-full flex-col justify-center`}>
          <div className={styles.codeWindow}>
            <div className={styles.windowBar}>
              <div className={styles.windowDots}>
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className={styles.windowBody}>
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
                Únete al boletín
              </p>
              <h2
                className={`${display.className} mt-6 text-4xl font-semibold leading-tight text-neutral-100`}
              >
                Recibe las novedades en tu correo.
              </h2>
              <p className="mt-5 max-w-2xl text-lg font-medium text-neutral-300">
                Sin spam, solo contenido relevante. Cancela cuando quieras.
              </p>
              <HomeSubscribeForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
