import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function unsubscribe(id: string) {
  const subscriber = await prisma.subscriber.findUnique({
    where: { id },
  })

  if (!subscriber) return null

  await prisma.subscriber.update({
    where: { id },
    data: {
      status: 'UNSUBSCRIBED',
      unsubscribedAt: new Date(),
    },
  })

  return subscriber
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const subscriber = await unsubscribe(id)

    if (!subscriber) {
      return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    return NextResponse.redirect(new URL('/unsubscribed', request.nextUrl.origin))
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.redirect(new URL('/', request.nextUrl.origin))
  }
}

// RFC 8058: One-click unsubscribe via POST (used by Gmail/Outlook)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const subscriber = await unsubscribe(id)

    if (!subscriber) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 })
  }
}
