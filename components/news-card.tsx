import Link from 'next/link'
import { Card } from './ui/card'

interface NewsCardProps {
  news: {
    slug: string
    title: string
    summary: string | null
    publishedAt: Date | null
  }
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={`/news/${news.slug}`}>
      <Card className="h-full transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
        <div className="p-6">
          <h3 className="mb-2 text-lg font-semibold">{news.title}</h3>
          {news.summary && (
            <p className="mb-4 line-clamp-2 text-neutral-600 dark:text-neutral-400">
              {news.summary}
            </p>
          )}
          {news.publishedAt && (
            <p className="text-sm text-neutral-500 dark:text-neutral-500">
              {new Date(news.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      </Card>
    </Link>
  )
}
