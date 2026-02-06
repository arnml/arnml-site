import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DeleteConfirmButton } from '@/components/delete-confirm-button'
import { SendNewsButton } from '@/components/send-news-button'
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

  await prisma.newsItem.update({
    where: { id },
    data: {
      published,
      publishedAt: published ? new Date() : null,
    },
  })
  revalidatePath('/admin/news')
}

async function deleteNews(id: string) {
  'use server'

  await prisma.newsItem.delete({ where: { id } })
  revalidatePath('/admin/news')
}

export default async function AdminNewsPage() {
  const newsItems = await prisma.newsItem.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      language: true,
      published: true,
      publishedAt: true,
      emailSent: true,
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">News Items</h1>
        <Link href="/admin/news/new">
          <Button>New News Item</Button>
        </Link>
      </div>

      {newsItems.length > 0 ? (
        <div className="rounded border border-neutral-200 dark:border-neutral-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsItems.map((news) => (
                <TableRow key={news.id}>
                  <TableCell className="font-medium">{news.title}</TableCell>
                  <TableCell>{news.language}</TableCell>
                  <TableCell>
                    <Badge variant={news.published ? 'default' : 'secondary'}>
                      {news.published ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {news.publishedAt?.toLocaleDateString() || '—'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={news.emailSent ? 'default' : 'secondary'}>
                      {news.emailSent ? 'Sent' : 'Not sent'}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Link href={`/admin/news/${news.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>

                    <form
                      action={async () => {
                        'use server'
                        await togglePublish(news.id, !news.published)
                      }}
                      className="inline"
                    >
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                      >
                        {news.published ? 'Unpublish' : 'Publish'}
                      </Button>
                    </form>

                    {news.published && (
                      <SendNewsButton newsId={news.id} emailSent={news.emailSent} />
                    )}

                    <form
                      action={async () => {
                        'use server'
                        await deleteNews(news.id)
                      }}
                      className="inline"
                    >
                      <DeleteConfirmButton
                        confirmMessage="Are you sure you want to delete this news item?"
                      />
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-neutral-600 dark:text-neutral-400">No news items yet.</p>
      )}
    </div>
  )
}
