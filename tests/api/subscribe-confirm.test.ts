import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from '@/app/api/subscribe/confirm/[id]/route'
import { NextRequest } from 'next/server'

// Mock Resend
vi.mock('resend', () => {
  class MockResend {
    emails = {
      send: vi.fn().mockResolvedValue({ success: true }),
    }
  }
  return {
    Resend: MockResend,
  }
})

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    subscriber: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    newsItem: {
      findFirst: vi.fn(),
    },
  },
}))

// Mock marked
vi.mock('marked', () => ({
  marked: vi.fn().mockResolvedValue('<p>HTML content</p>'),
}))

// Mock emailRenderer
vi.mock('@/lib/email-renderer', () => ({
  emailRenderer: {},
}))

const { prisma } = await import('@/lib/prisma')
const { Resend } = await import('resend')

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
    vi.mocked(prisma.newsItem.findFirst).mockResolvedValueOnce(null)

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

  it('sends welcome email if news item exists', async () => {
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
    vi.mocked(prisma.newsItem.findFirst).mockResolvedValueOnce({
      id: 'news-1',
      slug: 'test-news',
      title: 'Test News',
      summary: 'Test summary',
      content: 'Test content',
      language: 'ES',
      published: true,
      publishedAt: new Date(),
      emailSent: false,
      emailSentAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const response = await GET(createRequest(), {
      params: Promise.resolve({ id: 'abc-123' }),
    })

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/confirmed')
    expect(vi.mocked(prisma.newsItem.findFirst)).toHaveBeenCalled()
  })
})
