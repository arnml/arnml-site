import { z } from 'zod'

export const newsInputSchema = z.object({
  slug: z.string().trim().min(1, 'Slug is required'),
  title: z.string().trim().min(1, 'Title is required'),
  summary: z.string().trim().optional(),
  content: z.string().trim().min(1, 'Content is required'),
  language: z.enum(['ES', 'EN']),
})

export function parseNewsInput(input: unknown) {
  const result = newsInputSchema.safeParse(input)
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? 'Invalid news data')
  }
  return result.data
}
