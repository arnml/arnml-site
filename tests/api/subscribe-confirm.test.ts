import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from '@/app/api/subscribe/confirm/[id]/route'
import { NextRequest } from 'next/server'

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    subscriber: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}))

const { prisma } = await import('@/lib/prisma')

function createRequest() {
  return new NextRequest('http://localhost/api/subscribe/confirm/abc-123', {
    method: 'GET',
  })
}

describe('GET /api/subscribe/confirm/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('confirms email and redirects to /confirmed', async () => {
    vi.mocked(prisma.subscriber.findUnique).mockResolvedValueOnce({
      id: 'abc-123',
      email: 'user@example.com',
      status: 'ACTIVE',
      emailConfirmed: false,
      emailConfirmedAt: null,
      subscribedAt: new Date(),
      unsubscribedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    vi.mocked(prisma.subscriber.update).mockResolvedValueOnce({
      id: 'abc-123',
      email: 'user@example.com',
      status: 'ACTIVE',
      emailConfirmed: true,
      emailConfirmedAt: new Date(),
      subscribedAt: new Date(),
      unsubscribedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const response = await GET(createRequest(), {
      params: Promise.resolve({ id: 'abc-123' }),
    })

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/confirmed')
    expect(vi.mocked(prisma.subscriber.update)).toHaveBeenCalledWith({
      where: { id: 'abc-123' },
      data: {
        emailConfirmed: true,
        emailConfirmedAt: expect.any(Date),
      },
    })
  })

  it('redirects to /confirmed/error when subscriber not found', async () => {
    vi.mocked(prisma.subscriber.findUnique).mockResolvedValueOnce(null)

    const response = await GET(createRequest(), {
      params: Promise.resolve({ id: 'nonexistent' }),
    })

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/confirmed/error')
    expect(vi.mocked(prisma.subscriber.update)).not.toHaveBeenCalled()
  })

  it('redirects to /confirmed/error on database error', async () => {
    vi.mocked(prisma.subscriber.findUnique).mockRejectedValueOnce(
      new Error('Database error')
    )

    const response = await GET(createRequest(), {
      params: Promise.resolve({ id: 'abc-123' }),
    })

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/confirmed/error')
  })
})
