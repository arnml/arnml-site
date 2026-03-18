import { cache } from 'react'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { baseUrl } from '@/lib/constants'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import type { Metadata } from 'next'
import styles from './page.module.css'
import { HomeSubscribeForm, type FormMessages } from '@/components/home-subscribe-form'
import { ThemeToggle } from '@/components/theme-toggle'

// React.cache deduplicates this query within a single request —
// generateMetadata and the page component share the same DB call.
const getNewsItem = cache((slug: string) =>
  prisma.newsItem.findUnique({ where: { slug, published: true } })
)

type Lang = 'ES' | 'EN' | 'PT'

const langConfig: Record<Lang, {
  locale: string
  inLanguage: string
  ogLocale: string
  titleSuffix: string
  fallbackDescription: string
  keywords: string[]
  subscribeText: string
  subscribeButton: string
  formMessages: Required<FormMessages>
}> = {
  ES: {
    locale: 'es-ES',
    inLanguage: 'es-ES',
    ogLocale: 'es_ES',
    titleSuffix: 'Newsletter de IA, Software y Startups',
    fallbackDescription: 'Análisis de tendencias en inteligencia artificial, software y startups para developers.',
    keywords: ['inteligencia artificial', 'IA', 'startups', 'desarrollo de software', 'AI trends', 'developers', 'Arnold Moya', 'newsletter tecnología'],
    subscribeText: 'Suscríbete a mi boletín para recibir más contenido como este',
    subscribeButton: 'Suscríbete gratis',
    formMessages: {
      placeholder: 'tu@email.com',
      loading: 'Enviando...',
      success: '¡Gracias! Revisa tu correo para confirmar tu suscripción.',
      errorDefault: 'No se pudo suscribir. Intenta de nuevo.',
      errorConnection: 'Error de conexión. Intenta de nuevo.',
    },
  },
  EN: {
    locale: 'en-US',
    inLanguage: 'en-US',
    ogLocale: 'en_US',
    titleSuffix: 'AI, Software & Startups Newsletter',
    fallbackDescription: 'Analysis of trends in artificial intelligence, software and startups for developers.',
    keywords: ['artificial intelligence', 'AI', 'startups', 'software development', 'AI trends', 'developers', 'Arnold Moya', 'tech newsletter'],
    subscribeText: 'Subscribe to my newsletter for more content like this',
    subscribeButton: 'Subscribe for free',
    formMessages: {
      placeholder: 'you@email.com',
      loading: 'Sending...',
      success: 'Thanks! Check your email to confirm your subscription.',
      errorDefault: 'Could not subscribe. Please try again.',
      errorConnection: 'Connection error. Please try again.',
    },
  },
  PT: {
    locale: 'pt-BR',
    inLanguage: 'pt-BR',
    ogLocale: 'pt_BR',
    titleSuffix: 'Newsletter de IA, Software e Startups',
    fallbackDescription: 'Análise de tendências em inteligência artificial, software e startups para desenvolvedores.',
    keywords: ['inteligência artificial', 'IA', 'startups', 'desenvolvimento de software', 'AI trends', 'desenvolvedores', 'Arnold Moya', 'newsletter tecnologia'],
    subscribeText: 'Inscreva-se na minha newsletter para receber mais conteúdo como este',
    subscribeButton: 'Inscrever-se gratuitamente',
    formMessages: {
      placeholder: 'voce@email.com',
      loading: 'Enviando...',
      success: 'Obrigado! Verifique seu e-mail para confirmar a inscrição.',
      errorDefault: 'Não foi possível se inscrever. Tente novamente.',
      errorConnection: 'Erro de conexão. Tente novamente.',
    },
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const newsItem = await getNewsItem(slug)

  if (!newsItem) return { title: 'Not Found' }

  const pageUrl = `${baseUrl}/news/${slug}`
  const lang = (newsItem.language as Lang) ?? 'ES'
  const c = langConfig[lang]

  return {
    title: `${newsItem.title} — ${c.titleSuffix}`,
    description: newsItem.summary || c.fallbackDescription,
    keywords: c.keywords,
    authors: [{ name: 'Arnold Moya' }],
    creator: 'Arnold Moya',
    publisher: 'Arnold Moya',
    robots: { index: true, follow: true },

    openGraph: {
      title: newsItem.title,
      description: newsItem.summary || undefined,
      url: pageUrl,
      siteName: 'Arnold Moya — Newsletter',
      locale: c.ogLocale,
      type: 'article',
      publishedTime: newsItem.publishedAt?.toISOString(),
      authors: ['Arnold Moya'],
    },

    twitter: {
      card: 'summary_large_image',
      title: newsItem.title,
      description: newsItem.summary || undefined,
      creator: '@arnoldmoya',
    },

    alternates: { canonical: pageUrl },
  }
}

export async function generateStaticParams() {
  const newsItems = await prisma.newsItem.findMany({
    where: { published: true },
    select: { slug: true },
  })
  return newsItems.map((news) => ({ slug: news.slug }))
}

/** Strip ChatGPT citation artifacts that break MDX compilation */
function sanitizeMDX(source: string) {
  return source.replaceAll(/:contentReference\[.*?\]\{.*?\}/g, '')
}

/** Custom MDX components to preserve link URLs exactly */
const mdxComponents = {
  a: ({ href, children, ...props }: { href?: string; children?: React.ReactNode; [key: string]: unknown }) => (
    <a href={href || '#'} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ),
}

export default async function NewsDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>
}>) {
  const { slug } = await params
  const newsItem = await getNewsItem(slug)

  if (!newsItem) notFound()

  const pageUrl = `${baseUrl}/news/${slug}`
  const lang = (newsItem.language as Lang) ?? 'ES'
  const c = langConfig[lang]

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: newsItem.title,
    description: newsItem.summary || undefined,
    // abstract gives Google a rich understanding of the summary as distinct from body content
    ...(newsItem.summary && { abstract: newsItem.summary }),
    datePublished: newsItem.publishedAt?.toISOString(),
    dateModified: newsItem.updatedAt.toISOString(),
    inLanguage: c.inLanguage,
    url: pageUrl,
    isAccessibleForFree: true,
    // speakable targets for featured snippets and voice search
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#article-title', '#article-summary'],
    },
    author: { '@type': 'Person', name: 'Arnold Moya', url: baseUrl },
    publisher: { '@type': 'Person', name: 'Arnold Moya', url: baseUrl },
    isPartOf: {
      '@type': 'Periodical',
      name: 'Arnold Moya Newsletter',
      url: `${baseUrl}/newsletter/es`,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Arnold Moya', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Newsletter', item: `${baseUrl}/newsletter/es` },
      { '@type': 'ListItem', position: 3, name: newsItem.title, item: pageUrl },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className={styles.article}>
        <div className={styles.container}>
          {/* Header — p not h1 to keep a single h1 per page */}
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.headerTitleWrapper}>
                <p className={styles.headerTitle}>Arnold Moya</p>
                <p className={styles.headerSubtitle}>Newsletter</p>
              </div>
              <div className={styles.themeToggleWrapper}>
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Date Bar */}
          <div className={styles.dateBar}>
            <p className={styles.dateText}>
              {newsItem.publishedAt && (
                <time dateTime={newsItem.publishedAt.toISOString()}>
                  {newsItem.publishedAt.toLocaleDateString(c.locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}
            </p>
          </div>

          {/* Title + Summary — IDs used by speakable schema */}
          <div className={styles.titleSection}>
            <h1 id="article-title" className={styles.title}>{newsItem.title}</h1>
            {newsItem.summary && (
              <p id="article-summary" className={styles.summary}>{newsItem.summary}</p>
            )}
          </div>

          {/* Subscribe prompt after summary */}
          <div className={styles.subscribeButtonArea}>
            <p className={styles.footerText}>{c.subscribeText}</p>
            <HomeSubscribeForm buttonText={c.subscribeButton} messages={c.formMessages} />
          </div>

          {/* Content */}
          <div className={styles.content}>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <MDXRemote source={sanitizeMDX(newsItem.content)} components={mdxComponents} />
            </div>
          </div>

          {/* Footer subscribe */}
          <div className={styles.footerSubscribe}>
            <p className={styles.footerText}>{c.subscribeText}</p>
            <HomeSubscribeForm buttonText={c.subscribeButton} messages={c.formMessages} />
          </div>
        </div>
      </article>
    </>
  )
}
