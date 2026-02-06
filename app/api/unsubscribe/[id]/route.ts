import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const subscriber = await prisma.subscriber.findUnique({
      where: { id },
    })

    if (!subscriber) {
      return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    await prisma.subscriber.update({
      where: { id },
      data: {
        status: 'UNSUBSCRIBED',
        unsubscribedAt: new Date(),
      },
    })

    return NextResponse.redirect(new URL('/unsubscribed', request.nextUrl.origin))
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.redirect(new URL('/', request.nextUrl.origin))
  }
}
