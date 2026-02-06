import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { NewsForm } from '@/components/news-form'
import { randomDigits, slugify } from '@/lib/slug'
import { parseNewsInput } from '@/lib/validation/news'

export default function NewNewsPage() {
  async function createNews(data: {
    slug: string
    title: string
    summary?: string
    content: string
    language: string
  }) {
    'use server'

    const parsed = parseNewsInput(data)
    const baseInput = parsed.slug || parsed.title
    let baseSlug = slugify(baseInput)

    if (!baseSlug) {
      throw new Error('Slug is required')
    }

    if (!/-\d{4}$/.test(baseSlug)) {
      baseSlug = `${baseSlug}-${randomDigits(4)}`
    }

    let slug = baseSlug
    // Ensure uniqueness by retrying with a new random suffix.
    while (await prisma.newsItem.findUnique({ where: { slug } })) {
      const withoutSuffix = baseSlug.replace(/-\d{4}$/, '')
      slug = `${withoutSuffix}-${randomDigits(4)}`
    }

    await prisma.newsItem.create({
      data: {
        ...parsed,
        slug,
        language: parsed.language as 'ES' | 'EN',
      },
    })

    redirect('/admin/news')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New News Item</h1>

      <div className="max-w-2xl">
        <NewsForm onSubmit={createNews} />
      </div>
    </div>
  )
}
