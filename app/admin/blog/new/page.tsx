import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArticleForm } from '@/components/article-form'
import { randomDigits, slugify } from '@/lib/slug'
import { parseArticleInput } from '@/lib/validation/article'

export default function NewArticlePage() {
  async function createArticle(data: {
    slug: string
    title: string
    description?: string
    content: string
    tags: string[]
    language: string
  }) {
    'use server'

    const parsed = parseArticleInput(data)
    const baseInput = parsed.slug || parsed.title
    let baseSlug = slugify(baseInput)

    if (!baseSlug) {
      throw new Error('Slug is required')
    }

    if (!/-\d{4}$/.test(baseSlug)) {
      baseSlug = `${baseSlug}-${randomDigits(4)}`
    }

    let slug = baseSlug
    while (await prisma.article.findUnique({ where: { slug } })) {
      const withoutSuffix = baseSlug.replace(/-\d{4}$/, '')
      slug = `${withoutSuffix}-${randomDigits(4)}`
    }

    await prisma.article.create({
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
      <h1 className="text-3xl font-bold">Create New Article</h1>

      <div className="max-w-2xl">
        <ArticleForm onSubmit={createArticle} />
      </div>
    </div>
  )
}
