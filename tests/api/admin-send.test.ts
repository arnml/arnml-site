import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from '@/app/api/admin/send/[emailid]/route'
import { NextRequest } from 'next/server'

const { mockSend } = vi.hoisted(() => ({
  mockSend: vi.fn().mockResolvedValue({ id: 'email-id' }),
}))

// Mock Resend
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: mockSend }
  },
}))

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    newsItem: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    subscriber: {
      findMany: vi.fn(),
    },
  },
}))

// Mock email template
vi.mock('@/components/email/news-email-template', () => ({
  NewsEmailTemplate: vi.fn().mockReturnValue('<div>email</div>'),
}))

const { prisma } = await import('@/lib/prisma')

function createRequest() {
  return new NextRequest('http://localhost/api/admin/send/news-123', {
    method: 'POST',
  })
}

const mockNewsItem = {
  id: 'news-123',
  slug: 'test-news',
  title: 'Test News',
  summary: 'Summary',
  content: '<p>Content</p>',
  language: 'ES' as const,
  published: true,
  publishedAt: new Date('2026-01-15'),
  emailSent: false,
  emailSentAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockSubscribers = [
  { id: 'sub-1', email: 'user1@example.com' },
  { id: 'sub-2', email: 'user2@example.com' },
]

describe('POST /api/admin/send/[emailid]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sends emails to all confirmed subscribers', async () => {
    vi.mocked(prisma.newsItem.findUnique).mockResolvedValueOnce(mockNewsItem)
    vi.mocked(prisma.subscriber.findMany).mockResolvedValueOnce(mockSubscribers)
    vi.mocked(prisma.newsItem.update).mockResolvedValueOnce({
      ...mockNewsItem,
      emailSent: true,
      emailSentAt: new Date(),
    })

    const response = await POST(createRequest(), {
      params: Promise.resolve({ emailid: 'news-123' }),
    })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.ok).toBe(true)
    expect(data.sent).toBe(2)
    expect(mockSend).toHaveBeenCalledTimes(2)
    expect(vi.mocked(prisma.newsItem.update)).toHaveBeenCalledWith({
      where: { id: 'news-123' },
      data: {
        emailSent: true,
        emailSentAt: expect.any(Date),
      },
    })
  })

  it('returns 404 when news item not found', async () => {
    vi.mocked(prisma.newsItem.findUnique).mockResolvedValueOnce(null)

    const response = await POST(createRequest(), {
      params: Promise.resolve({ emailid: 'nonexistent' }),
    })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.error).toBe('News item not found')
  })

  it('returns 400 when news item is not published', async () => {
    vi.mocked(prisma.newsItem.findUnique).mockResolvedValueOnce({
      ...mockNewsItem,
      published: false,
    })

    const response = await POST(createRequest(), {
      params: Promise.resolve({ emailid: 'news-123' }),
    })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('News item is not published')
  })

  it('returns 400 when email already sent', async () => {
    vi.mocked(prisma.newsItem.findUnique).mockResolvedValueOnce({
      ...mockNewsItem,
      emailSent: true,
      emailSentAt: new Date(),
    })

    const response = await POST(createRequest(), {
      params: Promise.resolve({ emailid: 'news-123' }),
    })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Email already sent for this news item')
  })

  it('returns 400 when no confirmed subscribers', async () => {
    vi.mocked(prisma.newsItem.findUnique).mockResolvedValueOnce(mockNewsItem)
    vi.mocked(prisma.subscriber.findMany).mockResolvedValueOnce([])

    const response = await POST(createRequest(), {
      params: Promise.resolve({ emailid: 'news-123' }),
    })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('No confirmed subscribers found')
  })

  it('returns 500 on error', async () => {
    vi.mocked(prisma.newsItem.findUnique).mockRejectedValueOnce(
      new Error('Database error')
    )

    const response = await POST(createRequest(), {
      params: Promise.resolve({ emailid: 'news-123' }),
    })
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to send emails')
  })
})
