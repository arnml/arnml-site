import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { marked } from 'marked'
import { prisma } from '@/lib/prisma'
import { emailRenderer } from '@/lib/email-renderer'
import { NewsEmailTemplate } from '@/components/email/news-email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

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
      return NextResponse.redirect(new URL('/confirmed/error', request.nextUrl.origin))
    }

    await prisma.subscriber.update({
      where: { id },
      data: {
        emailConfirmed: true,
        emailConfirmedAt: new Date(),
      },
    })

    // Send the latest published news item as a welcome email
    try {
      const latestNews = await prisma.newsItem.findFirst({
        where: { published: true },
        orderBy: { publishedAt: 'desc' },
      })

      if (latestNews) {
        const baseUrl = request.nextUrl.origin
        const unsubscribeUrl = `${baseUrl}/api/unsubscribe/${subscriber.id}`

        const date = latestNews.publishedAt
          ? latestNews.publishedAt.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })

        const sanitized = latestNews.content.replaceAll(
          /:contentReference\[.*?\]\{.*?\}/g,
          ''
        )
        const htmlContent = await marked(sanitized, { renderer: emailRenderer })

        await resend.emails.send({
          from: 'Arnold Moya <news@arnoldmoya.com>',
          to: [subscriber.email],
          subject: latestNews.title,
          react: NewsEmailTemplate({
            title: latestNews.title,
            summary: latestNews.summary ?? '',
            date,
            content: htmlContent,
            unsubscribeUrl,
          }),
        })
      }
    } catch (emailError) {
      console.error('Failed to send welcome news email:', emailError)
    }

    return NextResponse.redirect(new URL('/confirmed', request.nextUrl.origin))
  } catch (error) {
    console.error('Confirm email error:', error)
    return NextResponse.redirect(new URL('/confirmed/error', request.nextUrl.origin))
  }
}
