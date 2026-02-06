'use client'

import { FormEvent, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setMessage(null)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: '¡Gracias! Revisa tu correo electrónico para confirmar tu suscripción.' })
        setEmail('')
      } else {
        const data = await response.json()
        setMessage({
          type: 'error',
          text: data.error || 'Failed to subscribe. Please try again.',
        })
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={pending}
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? 'Subscribing...' : 'Subscribe'}
      </Button>
      {message && (
        <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}
    </form>
  )
}
