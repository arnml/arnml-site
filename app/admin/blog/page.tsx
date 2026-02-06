import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DeleteConfirmButton } from '@/components/delete-confirm-button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

async function togglePublish(id: string, published: boolean) {
  'use server'

  await prisma.article.update({
    where: { id },
    data: {
      published,
      publishedAt: published ? new Date() : null,
    },
  })
  revalidatePath('/admin/blog')
}

async function deleteArticle(id: string) {
  'use server'

  await prisma.article.delete({ where: { id } })
  revalidatePath('/admin/blog')
}

export default async function AdminBlogPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      language: true,
      published: true,
      publishedAt: true,
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Articles</h1>
        <Link href="/admin/blog/new">
          <Button>New Article</Button>
        </Link>
      </div>

      {articles.length > 0 ? (
        <div className="rounded border border-neutral-200 dark:border-neutral-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.language}</TableCell>
                  <TableCell>
                    <Badge variant={article.published ? 'default' : 'secondary'}>
                      {article.published ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {article.publishedAt?.toLocaleDateString() || '—'}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Link href={`/admin/blog/${article.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>

                    <form
                      action={async () => {
                        'use server'
                        await togglePublish(article.id, !article.published)
                      }}
                      className="inline"
                    >
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                      >
                        {article.published ? 'Unpublish' : 'Publish'}
                      </Button>
                    </form>

                    <form
                      action={async () => {
                        'use server'
                        await deleteArticle(article.id)
                      }}
                      className="inline"
                    >
                      <DeleteConfirmButton
                        confirmMessage="Are you sure you want to delete this article?"
                      />
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-neutral-600 dark:text-neutral-400">No articles yet.</p>
      )}
    </div>
  )
}
