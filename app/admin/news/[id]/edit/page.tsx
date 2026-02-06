import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { NewsForm } from '@/components/news-form'
import { randomDigits, slugify } from '@/lib/slug'
import { parseNewsInput } from '@/lib/validation/news'

export default async function EditNewsPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params

  const news = await prisma.newsItem.findUnique({
    where: { id },
  })

  if (!news) {
    notFound()
  }

  const currentNews = news

  async function updateNews(data: {
    slug: string
    title: string
    summary?: string
    content: string
    language: string
  }) {
    'use server'

    const parsed = parseNewsInput(data)
    // Check if slug changed and is already used
    let slug = parsed.slug
    if (parsed.slug !== currentNews.slug) {
      let baseSlug = slugify(parsed.slug || parsed.title)
      if (!baseSlug) {
        throw new Error('Slug is required')
      }
      if (!/-\d{4}$/.test(baseSlug)) {
        baseSlug = `${baseSlug}-${randomDigits(4)}`
      }
      slug = baseSlug
      while (await prisma.newsItem.findUnique({ where: { slug } })) {
        const withoutSuffix = baseSlug.replace(/-\d{4}$/, '')
        slug = `${withoutSuffix}-${randomDigits(4)}`
      }
    }

    await prisma.newsItem.update({
      where: { id },
      data: {
        ...parsed,
        slug,
        language: parsed.language,
      },
    })

    revalidatePath('/newsletter/es')
    revalidatePath('/news')
    redirect('/admin/news')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit News Item</h1>

      <div className="max-w-2xl">
        <NewsForm news={news} onSubmit={updateNews} />
      </div>
    </div>
  )
}
