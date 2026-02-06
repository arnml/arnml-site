import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { marked } from 'marked'
import { prisma } from '@/lib/prisma'
import { NewsEmailTemplate } from '@/components/email/news-email-template'
import { emailRenderer } from '@/lib/email-renderer'

const resend = new Resend(process.env.RESEND_API_KEY)

const TEST_EMAIL = 'dev.arn.ml@gmail.com'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const newsItem = await prisma.newsItem.findUnique({
      where: { slug },
    })

    if (!newsItem) {
      return NextResponse.json(
        { error: 'News item not found' },
        { status: 404 }
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

    await resend.emails.send({
      from: 'Arnold Moya <news@arnoldmoya.com>',
      to: [TEST_EMAIL],
      subject: `[TEST] ${newsItem.title}`,
      react: NewsEmailTemplate({
        title: newsItem.title,
        summary: newsItem.summary ?? '',
        date,
        content: htmlContent,
        unsubscribeUrl: `${baseUrl}/api/unsubscribe/test`,
      }),
    })

    return NextResponse.json({ ok: true, sentTo: TEST_EMAIL })
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    )
  }
}
