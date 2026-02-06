import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArticleForm } from '@/components/article-form'
import { randomDigits, slugify } from '@/lib/slug'
import { parseArticleInput } from '@/lib/validation/article'

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const article = await prisma.article.findUnique({
    where: { id },
  })

  if (!article) {
    notFound()
  }

  const currentArticle = article

  async function updateArticle(data: {
    slug: string
    title: string
    description?: string
    content: string
    tags: string[]
    language: string
  }) {
    'use server'

    const parsed = parseArticleInput(data)
    // Check if slug changed and is already used
    let slug = parsed.slug
    if (parsed.slug !== currentArticle.slug) {
      let baseSlug = slugify(parsed.slug || parsed.title)
      if (!baseSlug) {
        throw new Error('Slug is required')
      }
      if (!/-\d{4}$/.test(baseSlug)) {
        baseSlug = `${baseSlug}-${randomDigits(4)}`
      }
      slug = baseSlug
      while (await prisma.article.findUnique({ where: { slug } })) {
        const withoutSuffix = baseSlug.replace(/-\d{4}$/, '')
        slug = `${withoutSuffix}-${randomDigits(4)}`
      }
    }

    await prisma.article.update({
      where: { id },
      data: {
        ...parsed,
        slug,
        language: parsed.language as 'ES' | 'EN',
      },
    })

    redirect('/admin/blog')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Article</h1>

      <div className="max-w-2xl">
        <ArticleForm article={article} onSubmit={updateArticle} />
      </div>
    </div>
  )
}
