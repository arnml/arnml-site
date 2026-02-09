import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import type { Metadata } from 'next'
import styles from './page.module.css'
import { HomeSubscribeForm } from '@/components/home-subscribe-form'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const newsItem = await prisma.newsItem.findUnique({
    where: { slug },
    select: { title: true, summary: true, publishedAt: true, language: true },
  })

  if (!newsItem) return { title: 'Not Found' }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arnoldmoya.com'
  const pageUrl = `${baseUrl}/news/${slug}`
  const titlePattern = `${newsItem.title} - Newsletter IA, Software, Startups`

  return {
    title: titlePattern,
    description:
      newsItem.summary ||
      'Análisis de tendencias en inteligencia artificial, software y startups para developers.',
    keywords: [
      'inteligencia artificial',
      'IA',
      'startups',
      'software development',
      'AI trends',
      'developers',
    ],
    authors: [{ name: 'Arnold Moya' }],
    creator: 'Arnold Moya',
    publisher: 'Arnold Moya',

    // OpenGraph
    openGraph: {
      title: newsItem.title,
      description: newsItem.summary || undefined,
      url: pageUrl,
      siteName: 'Arnold Moya - Newsletter',
      locale: newsItem.language === 'EN' ? 'en_US' : 'es_ES',
      type: 'article',
      publishedTime: newsItem.publishedAt?.toISOString(),
      authors: ['Arnold Moya'],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: newsItem.title,
      description: newsItem.summary || undefined,
      creator: '@arnoldmoya',
    },

    // Canonical URL
    alternates: {
      canonical: pageUrl,
    },
  }
}

export async function generateStaticParams() {
  const newsItems = await prisma.newsItem.findMany({
    where: { published: true },
    select: { slug: true },
  })

  return newsItems.map((news) => ({
    slug: news.slug,
  }))
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

  const newsItem = await prisma.newsItem.findUnique({
    where: { slug, published: true },
  })

  if (!newsItem) {
    notFound()
  }

  // Generate Article Schema
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arnoldmoya.com'
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: newsItem.title,
    description: newsItem.summary || undefined,
    datePublished: newsItem.publishedAt?.toISOString(),
    dateModified: newsItem.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: 'Arnold Moya',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Arnold Moya',
      url: baseUrl,
    },
    inLanguage: newsItem.language === 'EN' ? 'en-US' : 'es-ES',
    url: `${baseUrl}/news/${slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/news/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className={styles.article}>
        <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>Arnold Moya</h1>
          <p className={styles.headerSubtitle}>Newsletter</p>
        </header>

        {/* Date Bar */}
        <div className={styles.dateBar}>
          <p className={styles.dateText}>
            {newsItem.publishedAt?.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Title + Summary */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{newsItem.title}</h1>
          {newsItem.summary && (
            <p className={styles.summary}>{newsItem.summary}</p>
          )}
        </div>

        {/* Subscribe Button After Summary */}
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

        {/* Footer Subscribe */}
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
