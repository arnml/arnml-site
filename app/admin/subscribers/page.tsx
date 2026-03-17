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
          className={`px-4 py-2 rounded text-sm font-medium transition ${
            !status || status === 'all'
              ? 'bg-foreground text-background'
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          All ({totalActive + totalUnsubscribed})
        </a>
        <a
          href="?status=ACTIVE"
          className={`px-4 py-2 rounded text-sm font-medium transition ${
            status === 'ACTIVE'
              ? 'bg-foreground text-background'
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          Active ({totalActive})
        </a>
        <a
          href="?status=UNSUBSCRIBED"
          className={`px-4 py-2 rounded text-sm font-medium transition ${
            status === 'UNSUBSCRIBED'
              ? 'bg-foreground text-background'
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          Unsubscribed ({totalUnsubscribed})
        </a>
      </div>

      {subscribers.length > 0 ? (
        <div className="rounded border border-border">
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
        <p className="text-muted-foreground">No subscribers found.</p>
      )}
    </div>
  )
}
