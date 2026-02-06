import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { marked } from 'marked'
import { prisma } from '@/lib/prisma'
import { NewsEmailTemplate } from '@/components/email/news-email-template'
import { emailRenderer } from '@/lib/email-renderer'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ emailid: string }> }
) {
  try {
    const { emailid } = await params

    const newsItem = await prisma.newsItem.findUnique({
      where: { id: emailid },
    })

    if (!newsItem) {
      return NextResponse.json(
        { error: 'News item not found' },
        { status: 404 }
      )
    }

    if (!newsItem.published) {
      return NextResponse.json(
        { error: 'News item is not published' },
        { status: 400 }
      )
    }

    if (newsItem.emailSent) {
      return NextResponse.json(
        { error: 'Email already sent for this news item' },
        { status: 400 }
      )
    }

    const subscribers = await prisma.subscriber.findMany({
      where: {
        status: 'ACTIVE',
        emailConfirmed: true,
      },
      select: {
        id: true,
        email: true,
      },
    })

    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No confirmed subscribers found' },
        { status: 400 }
      )
    }

    const baseUrl = request.nextUrl.origin
    const date = newsItem.publishedAt
      ? newsItem.publishedAt.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })

    const sanitized = newsItem.content.replaceAll(/:contentReference\[.*?\]\{.*?\}/g, '')
    const htmlContent = await marked(sanitized, { renderer: emailRenderer })

    for (const subscriber of subscribers) {
      const unsubscribeUrl = `${baseUrl}/api/unsubscribe/${subscriber.id}`

      await resend.emails.send({
        from: 'Arnold Moya <news@arnoldmoya.com>',
        to: [subscriber.email],
        subject: newsItem.title,
        react: NewsEmailTemplate({
          title: newsItem.title,
          summary: newsItem.summary ?? '',
          date,
          content: htmlContent,
          unsubscribeUrl,
        }),
      })
    }

    await prisma.newsItem.update({
      where: { id: emailid },
      data: {
        emailSent: true,
        emailSentAt: new Date(),
      },
    })

    return NextResponse.json({ ok: true, sent: subscribers.length })
  } catch (error) {
    console.error('Send news email error:', error)
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    )
  }
}
