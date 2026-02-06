import Link from 'next/link'
import { Card } from './ui/card'
import { Badge } from './ui/badge'

interface ArticleCardProps {
  article: {
    slug: string
    title: string
    description: string | null
    publishedAt: Date | null
    tags?: string[]
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <Card className="h-full transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
        <div className="p-6">
          <h3 className="mb-2 text-xl font-semibold">{article.title}</h3>
          {article.description && (
            <p className="mb-4 line-clamp-2 text-neutral-600 dark:text-neutral-400">
              {article.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {article.tags && article.tags.length > 0 ? (
              article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))
            ) : null}
          </div>
          {article.publishedAt && (
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-500">
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
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
