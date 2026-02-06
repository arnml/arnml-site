'use client'

import { FormEvent, useMemo, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { randomDigits, slugify } from '@/lib/slug'

interface NewsFormProps {
  news?: {
    id: string
    slug: string
    title: string
    summary: string | null
    content: string
    language: string
  }
  onSubmit: (data: {
    slug: string
    title: string
    summary?: string
    content: string
    language: string
  }) => Promise<void>
  isLoading?: boolean
}

export function NewsForm({ news, onSubmit, isLoading }: Readonly<NewsFormProps>) {
  const isNew = !news
  const initialSuffix = useMemo(() => (isNew ? randomDigits(4) : ''), [isNew])
  const [formData, setFormData] = useState({
    slug: news?.slug || '',
    title: news?.title || '',
    summary: news?.summary || '',
    content: news?.content || '',
    language: news?.language || 'ES',
  })
  const [error, setError] = useState<string | null>(null)
  const [slugTouched, setSlugTouched] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    try {
      await onSubmit(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  let submitLabel = 'Create News'
  if (isLoading) {
    submitLabel = 'Saving...'
  } else if (news) {
    submitLabel = 'Update News'
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => {
            setSlugTouched(true)
            setFormData({ ...formData, slug: e.target.value })
          }}
          placeholder="news-title-1234"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => {
            const nextTitle = e.target.value
            setFormData((prev) => {
              const next = { ...prev, title: nextTitle }
              if (!isNew || slugTouched) return next
              const base = slugify(nextTitle)
              const nextSlug = base ? `${base}-${initialSuffix}` : ''
              if (next.slug !== nextSlug) {
                next.slug = nextSlug
              }
              return next
            })
          }}
          placeholder="News title"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          placeholder="Short summary for email preview (optional)"
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="content">Content (Markdown/MDX)</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Write your news content in Markdown or MDX..."
          required
          rows={10}
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="language">Language</Label>
        <select
          id="language"
          value={formData.language}
          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
          disabled={isLoading}
          className="mt-2 block w-full rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-950"
        >
          <option value="ES">Español</option>
          <option value="EN">English</option>
        </select>
      </div>

      <Button type="submit" disabled={isLoading}>
        {submitLabel}
      </Button>
    </form>
  )
}
