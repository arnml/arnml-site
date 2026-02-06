import { describe, it, expect } from 'vitest'
import {
  subscribeSchema,
  articleCreateSchema,
  articleUpdateSchema,
  newsCreateSchema,
  newsUpdateSchema,
} from '@/lib/validators'

describe('Validators', () => {
  describe('subscribeSchema', () => {
    it('accepts valid email', () => {
      const result = subscribeSchema.safeParse({ email: 'test@example.com' })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email', () => {
      const result = subscribeSchema.safeParse({ email: 'invalid' })
      expect(result.success).toBe(false)
      const code = result.error?.issues[0].code
      expect(['invalid_string', 'invalid_format']).toContain(code)
    })

    it('rejects missing email', () => {
      const result = subscribeSchema.safeParse({})
      expect(result.success).toBe(false)
    })
  })

  describe('articleCreateSchema', () => {
    const validData = {
      slug: 'test-article',
      title: 'Test Article',
      content: 'Test content',
    }

    it('accepts valid article data', () => {
      const result = articleCreateSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('accepts article with optional fields', () => {
      const result = articleCreateSchema.safeParse({
        ...validData,
        description: 'A test article',
        tags: ['test', 'article'],
        language: 'EN',
      })
      expect(result.success).toBe(true)
    })

    it('defaults language to ES', () => {
      const result = articleCreateSchema.safeParse(validData)
      expect(result.data?.language).toBe('ES')
    })

    it('rejects invalid slug format', () => {
      const result = articleCreateSchema.safeParse({
        ...validData,
        slug: 'Test Article!', // Contains uppercase and special char
      })
      expect(result.success).toBe(false)
    })

    it('rejects missing required fields', () => {
      const result = articleCreateSchema.safeParse({
        slug: 'test',
        // missing title and content
      })
      expect(result.success).toBe(false)
    })
  })

  describe('newsCreateSchema', () => {
    const validData = {
      slug: 'test-news',
      title: 'Test News',
      content: 'Test content',
    }

    it('accepts valid news data', () => {
      const result = newsCreateSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('accepts news with optional summary', () => {
      const result = newsCreateSchema.safeParse({
        ...validData,
        summary: 'A test news item',
      })
      expect(result.success).toBe(true)
    })

    it('defaults language to ES', () => {
      const result = newsCreateSchema.safeParse(validData)
      expect(result.data?.language).toBe('ES')
    })
  })

  describe('Update schemas', () => {
    it('articleUpdateSchema accepts partial data', () => {
      const result = articleUpdateSchema.safeParse({
        title: 'Updated Title',
      })
      expect(result.success).toBe(true)
    })

    it('newsUpdateSchema accepts partial data', () => {
      const result = newsUpdateSchema.safeParse({
        summary: 'Updated summary',
      })
      expect(result.success).toBe(true)
    })
  })
})
