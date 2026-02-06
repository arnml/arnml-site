import { z } from 'zod'

export const articleInputSchema = z.object({
  slug: z.string().trim().min(1, 'Slug is required'),
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().optional(),
  content: z.string().trim().min(1, 'Content is required'),
  tags: z.array(z.string().trim()).default([]),
  language: z.enum(['ES', 'EN']),
})

export function parseArticleInput(input: unknown) {
  const result = articleInputSchema.safeParse(input)
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? 'Invalid article data')
  }
  return result.data
}
