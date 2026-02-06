import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/card'

export default async function AdminDashboard() {
  const [articleCount, articlePublished, newsCount, newsPublished, subscriberCount, subscriberActive] =
    await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { published: true } }),
      prisma.newsItem.count(),
      prisma.newsItem.count({ where: { published: true } }),
      prisma.subscriber.count(),
      prisma.subscriber.count({ where: { status: 'ACTIVE' } }),
    ])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h2 className="mb-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
            Articles
          </h2>
          <p className="text-3xl font-bold">{articleCount}</p>
          <p className="text-xs text-neutral-500">{articlePublished} published</p>
        </Card>

        <Card className="p-6">
          <h2 className="mb-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
            News Items
          </h2>
          <p className="text-3xl font-bold">{newsCount}</p>
          <p className="text-xs text-neutral-500">{newsPublished} published</p>
        </Card>

        <Card className="p-6">
          <h2 className="mb-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
            Subscribers
          </h2>
          <p className="text-3xl font-bold">{subscriberCount}</p>
          <p className="text-xs text-neutral-500">{subscriberActive} active</p>
        </Card>
      </div>

      <div className="rounded border border-neutral-200 bg-blue-50 p-4 text-blue-800 dark:border-neutral-800 dark:bg-blue-900/20 dark:text-blue-400">
        <p className="text-sm">
          Welcome to the admin panel. Use the sidebar to manage articles, news items, and subscribers.
        </p>
      </div>
    </div>
  )
}
