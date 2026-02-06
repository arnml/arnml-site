import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { Badge } from '@/components/ui/badge'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug },
    select: { title: true, description: true },
  })

  if (!article) return { title: 'Not Found' }

  return {
    title: article.title,
    description: article.description || undefined,
  }
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true },
  })

  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const article = await prisma.article.findUnique({
    where: { slug, published: true },
  })

  if (!article) {
    notFound()
  }

  return (
    <article className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{article.title}</h1>
          {article.description && (
            <p className="mb-4 text-xl text-neutral-600 dark:text-neutral-400">
              {article.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
            <span>
              {article.publishedAt?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span>{article.language}</span>
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={article.content} />
        </div>
      </div>
    </article>
  )
}
