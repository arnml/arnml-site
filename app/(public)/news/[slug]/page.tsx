import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const newsItem = await prisma.newsItem.findUnique({
    where: { slug },
    select: { title: true, summary: true },
  })

  if (!newsItem) return { title: 'Not Found' }

  return {
    title: newsItem.title,
    description: newsItem.summary || undefined,
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

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const newsItem = await prisma.newsItem.findUnique({
    where: { slug, published: true },
  })

  if (!newsItem) {
    notFound()
  }

  return (
    <article className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{newsItem.title}</h1>
          {newsItem.summary && (
            <p className="mb-4 text-xl text-neutral-600 dark:text-neutral-400">
              {newsItem.summary}
            </p>
          )}
          <div className="text-sm text-neutral-500">
            {newsItem.publishedAt?.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={newsItem.content} />
        </div>
      </div>
    </article>
  )
}
