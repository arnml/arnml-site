import { cache } from 'react'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { baseUrl } from '@/lib/constants'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import type { Metadata } from 'next'
import styles from './page.module.css'
import { HomeSubscribeForm } from '@/components/home-subscribe-form'

// React.cache deduplicates this query within a single request —
// generateMetadata and the page component share the same DB call.
const getNewsItem = cache((slug: string) =>
  prisma.newsItem.findUnique({ where: { slug, published: true } })
)

const isES = (language: string) => language !== 'EN'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const newsItem = await getNewsItem(slug)

  if (!newsItem) return { title: 'Not Found' }

  const pageUrl = `${baseUrl}/news/${slug}`
  const es = isES(newsItem.language)
  const titleSuffix = es
    ? 'Newsletter de IA, Software y Startups'
    : 'AI, Software & Startups Newsletter'
  const fallbackDescription = es
    ? 'Análisis de tendencias en inteligencia artificial, software y startups para developers.'
    : 'Analysis of trends in artificial intelligence, software and startups for developers.'

  return {
    title: `${newsItem.title} — ${titleSuffix}`,
    description: newsItem.summary || fallbackDescription,
    keywords: es
      ? ['inteligencia artificial', 'IA', 'startups', 'desarrollo de software', 'AI trends', 'developers', 'Arnold Moya', 'newsletter tecnología']
      : ['artificial intelligence', 'AI', 'startups', 'software development', 'AI trends', 'developers', 'Arnold Moya', 'tech newsletter'],
    authors: [{ name: 'Arnold Moya' }],
    creator: 'Arnold Moya',
    publisher: 'Arnold Moya',
    robots: { index: true, follow: true },

    openGraph: {
      title: newsItem.title,
      description: newsItem.summary || undefined,
      url: pageUrl,
      siteName: 'Arnold Moya — Newsletter',
      locale: es ? 'es_ES' : 'en_US',
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
  const es = isES(newsItem.language)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: newsItem.title,
    description: newsItem.summary || undefined,
    // abstract gives Google a rich understanding of the summary as distinct from body content
    ...(newsItem.summary && { abstract: newsItem.summary }),
    datePublished: newsItem.publishedAt?.toISOString(),
    dateModified: newsItem.updatedAt.toISOString(),
    inLanguage: es ? 'es-ES' : 'en-US',
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
            <p className={styles.headerTitle}>Arnold Moya</p>
            <p className={styles.headerSubtitle}>Newsletter</p>
          </header>

          {/* Date Bar */}
          <div className={styles.dateBar}>
            <p className={styles.dateText}>
              {newsItem.publishedAt && (
                <time dateTime={newsItem.publishedAt.toISOString()}>
                  {newsItem.publishedAt.toLocaleDateString(es ? 'es-ES' : 'en-US', {
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
            <p className={styles.footerText}>
              Suscríbete a mi boletín para recibir más contenido como este
            </p>
            <HomeSubscribeForm buttonText="Suscríbete gratis" />
          </div>

          {/* Content */}
          <div className={styles.content}>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <MDXRemote source={sanitizeMDX(newsItem.content)} components={mdxComponents} />
            </div>
          </div>

          {/* Footer subscribe */}
          <div className={styles.footerSubscribe}>
            <p className={styles.footerText}>
              Suscríbete a mi boletín para recibir más contenido como este
            </p>
            <HomeSubscribeForm buttonText="Suscríbete gratis" />
          </div>
        </div>
      </article>
    </>
  )
}
