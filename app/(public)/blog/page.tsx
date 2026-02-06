import { prisma } from '@/lib/prisma'
import { ArticleCard } from '@/components/article-card'

export const metadata = {
  title: 'Blog - ARNML',
  description: 'Read the latest articles from ARNML',
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; page?: string }>
}) {
  const { lang = 'ES', page = '1' } = await searchParams
  const currentPage = parseInt(page)
  const itemsPerPage = 20

  const articles = await prisma.article.findMany({
    where: {
      published: true,
      language: lang === 'EN' ? 'EN' : 'ES',
    },
    orderBy: { publishedAt: 'desc' },
    take: itemsPerPage,
    skip: (currentPage - 1) * itemsPerPage,
    select: {
      slug: true,
      title: true,
      description: true,
      publishedAt: true,
      tags: true,
    },
  })

  const totalCount = await prisma.article.count({
    where: {
      published: true,
      language: lang === 'EN' ? 'EN' : 'ES',
    },
  })

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Blog</h1>

        {/* Language filter */}
        <div className="mb-8 flex gap-4">
          <a
            href="?lang=ES"
            className={`px-4 py-2 rounded ${
              lang === 'ES' || !lang
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                : 'bg-neutral-200 dark:bg-neutral-800'
            }`}
          >
            Español
          </a>
          <a
            href="?lang=EN"
            className={`px-4 py-2 rounded ${
              lang === 'EN'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                : 'bg-neutral-200 dark:bg-neutral-800'
            }`}
          >
            English
          </a>
        </div>

        {articles.length > 0 ? (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-4">
                {currentPage > 1 && (
                  <a
                    href={`?lang=${lang}&page=${currentPage - 1}`}
                    className="px-4 py-2 rounded bg-neutral-200 dark:bg-neutral-800"
                  >
                    Previous
                  </a>
                )}
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                {currentPage < totalPages && (
                  <a
                    href={`?lang=${lang}&page=${currentPage + 1}`}
                    className="px-4 py-2 rounded bg-neutral-200 dark:bg-neutral-800"
                  >
                    Next
                  </a>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-neutral-600 dark:text-neutral-400">No articles found.</p>
        )}
      </div>
    </div>
  )
}
