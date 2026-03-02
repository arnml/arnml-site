import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { Button } from '@/components/ui/button'
import styles from '@/app/(public)/news/[slug]/page.module.css'
import { HomeSubscribeForm } from '@/components/home-subscribe-form'

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

export default async function AdminNewsPreviewPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params

  const newsItem = await prisma.newsItem.findUnique({
    where: { id },
  })

  if (!newsItem) {
    notFound()
  }

  return (
    <>
      {/* Draft banner */}
      {!newsItem.published && (
        <div className="sticky top-0 z-50 flex items-center justify-between bg-yellow-400 px-4 py-2 text-sm font-medium text-yellow-900">
          <span>DRAFT PREVIEW — This news item is not published yet</span>
          <Link href="/admin/news">
            <Button variant="outline" size="sm" className="border-yellow-700 text-yellow-900 hover:bg-yellow-300">
              ← Back to list
            </Button>
          </Link>
        </div>
      )}

      {/* Published banner */}
      {newsItem.published && (
        <div className="sticky top-0 z-50 flex items-center justify-between bg-green-500 px-4 py-2 text-sm font-medium text-white">
          <span>PREVIEW — This news item is published</span>
          <Link href="/admin/news">
            <Button variant="outline" size="sm" className="border-green-700 text-white hover:bg-green-400">
              ← Back to list
            </Button>
          </Link>
        </div>
      )}

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
              {(newsItem.publishedAt ?? newsItem.createdAt).toLocaleDateString('en-US', {
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
