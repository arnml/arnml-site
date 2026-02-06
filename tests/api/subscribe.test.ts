import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from '@/app/api/subscribe/route'
import { NextRequest } from 'next/server'

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    subscriber: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}))

// Mock Resend
const { mockSend } = vi.hoisted(() => {
  const mockSend = vi.fn().mockResolvedValue({ data: { id: 'email-1' }, error: null })
  return { mockSend }
})
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: mockSend }
  },
}))

const { prisma } = await import('@/lib/prisma')

describe('POST /api/subscribe', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSend.mockResolvedValue({ data: { id: 'email-1' }, error: null })
  })

  it('creates new subscriber and sends confirmation email', async () => {
    const email = 'newuser@example.com'

    vi.mocked(prisma.subscriber.findUnique).mockResolvedValueOnce(null)
    vi.mocked(prisma.subscriber.create).mockResolvedValueOnce({
      id: '1',
      email,
      status: 'ACTIVE',
      emailConfirmed: false,
      emailConfirmedAt: null,
      subscribedAt: new Date(),
      unsubscribedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const request = new NextRequest('http://localhost/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.ok).toBe(true)
    expect(vi.mocked(prisma.subscriber.create)).toHaveBeenCalledWith({
      data: {
        email,
        status: 'ACTIVE',
      },
    })
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: [email],
        subject: 'Confirma tu correo electrónico',
      })
    )
  })

  it('reactivates unsubscribed subscriber and sends confirmation email', async () => {
    const email = 'unsubscribed@example.com'

    vi.mocked(prisma.subscriber.findUnique).mockResolvedValueOnce({
      id: '2',
      email,
      status: 'UNSUBSCRIBED',
      emailConfirmed: false,
      emailConfirmedAt: null,
      subscribedAt: new Date('2024-01-01'),
      unsubscribedAt: new Date('2024-06-01'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-06-01'),
    })
    vi.mocked(prisma.subscriber.update).mockResolvedValueOnce({
      id: '2',
      email,
      status: 'ACTIVE',
      emailConfirmed: false,
      emailConfirmedAt: null,
      subscribedAt: new Date(),
      unsubscribedAt: null,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
    })

    const request = new NextRequest('http://localhost/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.ok).toBe(true)
    expect(vi.mocked(prisma.subscriber.update)).toHaveBeenCalledWith({
      where: { email },
      data: {
        status: 'ACTIVE',
        subscribedAt: expect.any(Date),
        unsubscribedAt: null,
      },
    })
    expect(vi.mocked(prisma.subscriber.create)).not.toHaveBeenCalled()
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: [email],
        subject: 'Confirma tu correo electrónico',
      })
    )
  })

  it('does nothing when subscriber is already active', async () => {
    const email = 'active@example.com'

    vi.mocked(prisma.subscriber.findUnique).mockResolvedValueOnce({
      id: '3',
      email,
      status: 'ACTIVE',
      emailConfirmed: true,
      emailConfirmedAt: new Date(),
      subscribedAt: new Date(),
      unsubscribedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const request = new NextRequest('http://localhost/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.ok).toBe(true)
    expect(vi.mocked(prisma.subscriber.create)).not.toHaveBeenCalled()
    expect(vi.mocked(prisma.subscriber.update)).not.toHaveBeenCalled()
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('returns 400 for invalid email', async () => {
    const request = new NextRequest('http://localhost/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'invalid' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBeDefined()
    expect(vi.mocked(prisma.subscriber.findUnique)).not.toHaveBeenCalled()
  })

  it('returns 400 for missing email', async () => {
    const request = new NextRequest('http://localhost/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
    expect(vi.mocked(prisma.subscriber.findUnique)).not.toHaveBeenCalled()
  })

  it('returns 500 on database error', async () => {
    vi.mocked(prisma.subscriber.findUnique).mockRejectedValueOnce(
      new Error('Database error')
    )

    const request = new NextRequest('http://localhost/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to subscribe')
  })
})
