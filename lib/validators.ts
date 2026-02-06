import { z } from 'zod'

export const subscribeSchema = z.object({
  email: z.email('Invalid email address'),
})

export const articleCreateSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.string()).default([]),
  language: z.enum(['ES', 'EN']).default('ES'),
})

export const articleUpdateSchema = articleCreateSchema.partial()

export const newsCreateSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  summary: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  language: z.enum(['ES', 'EN']).default('ES'),
})

export const newsUpdateSchema = newsCreateSchema.partial()

export const publishToggleSchema = z.object({
  published: z.boolean(),
})

export type SubscribeInput = z.infer<typeof subscribeSchema>
export type ArticleCreateInput = z.infer<typeof articleCreateSchema>
export type ArticleUpdateInput = z.infer<typeof articleUpdateSchema>
export type NewsCreateInput = z.infer<typeof newsCreateSchema>
export type NewsUpdateInput = z.infer<typeof newsUpdateSchema>
