import { prisma } from '@/lib/prisma'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function SubscribersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams

  const subscribers = await prisma.subscriber.findMany({
    where: status && status !== 'all' ? { status: status as 'ACTIVE' | 'UNSUBSCRIBED' } : undefined,
    orderBy: { subscribedAt: 'desc' },
    select: {
      id: true,
      email: true,
      status: true,
      emailConfirmed: true,
      emailConfirmedAt: true,
      subscribedAt: true,
      unsubscribedAt: true,
    },
  })

  const totalActive = await prisma.subscriber.count({
    where: { status: 'ACTIVE' },
  })
  const totalUnsubscribed = await prisma.subscriber.count({
    where: { status: 'UNSUBSCRIBED' },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Subscribers</h1>

      <div className="flex gap-4">
        <a
          href="/admin/subscribers"
          className={`px-4 py-2 rounded text-sm font-medium ${
            !status || status === 'all'
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
              : 'bg-neutral-200 dark:bg-neutral-800'
          }`}
        >
          All ({totalActive + totalUnsubscribed})
        </a>
        <a
          href="?status=ACTIVE"
          className={`px-4 py-2 rounded text-sm font-medium ${
            status === 'ACTIVE'
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
              : 'bg-neutral-200 dark:bg-neutral-800'
          }`}
        >
          Active ({totalActive})
        </a>
        <a
          href="?status=UNSUBSCRIBED"
          className={`px-4 py-2 rounded text-sm font-medium ${
            status === 'UNSUBSCRIBED'
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
              : 'bg-neutral-200 dark:bg-neutral-800'
          }`}
        >
          Unsubscribed ({totalUnsubscribed})
        </a>
      </div>

      {subscribers.length > 0 ? (
        <div className="rounded border border-neutral-200 dark:border-neutral-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email Confirmed</TableHead>
                <TableHead>Subscribed</TableHead>
                <TableHead>Unsubscribed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="font-medium">{subscriber.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        subscriber.status === 'ACTIVE' ? 'default' : 'secondary'
                      }
                    >
                      {subscriber.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {subscriber.emailConfirmed ? (
                      <Badge variant="default">Confirmed</Badge>
                    ) : (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {subscriber.subscribedAt?.toLocaleDateString() || '—'}
                  </TableCell>
                  <TableCell>
                    {subscriber.unsubscribedAt?.toLocaleDateString() || '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-neutral-600 dark:text-neutral-400">No subscribers found.</p>
      )}
    </div>
  )
}
