import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'
import { subscribeSchema } from '@/lib/validators'
import { ConfirmEmailTemplate } from '@/components/email/confirm-email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = subscribeSchema.parse(body)

    const existing = await prisma.subscriber.findUnique({
      where: { email },
    })

    let subscriberId: string

    if (!existing) {
      const subscriber = await prisma.subscriber.create({
        data: {
          email,
          status: 'ACTIVE',
        },
      })
      subscriberId = subscriber.id
    } else if (existing.status === 'UNSUBSCRIBED') {
      await prisma.subscriber.update({
        where: { email },
        data: {
          status: 'ACTIVE',
          subscribedAt: new Date(),
          unsubscribedAt: null,
        },
      })
      subscriberId = existing.id
    } else {
      // Already active — no-op
      return NextResponse.json({ ok: true })
    }

    const baseUrl = request.nextUrl.origin
    const confirmUrl = `${baseUrl}/api/subscribe/confirm/${subscriberId}`

    await resend.emails.send({
      from: 'Arnold Moya <onboarding@arnoldmoya.com>',
      to: [email],
      subject: 'Confirma tu correo electrónico',
      react: ConfirmEmailTemplate({ confirmUrl }),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
