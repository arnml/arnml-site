'use client'

import { FormEvent, useState } from 'react'

export interface FormMessages {
  placeholder?: string
  loading?: string
  success?: string
  errorDefault?: string
  errorConnection?: string
}

interface HomeSubscribeFormProps {
  readonly buttonText?: string
  readonly messages?: FormMessages
}

const defaultMessages: Required<FormMessages> = {
  placeholder: 'tu@email.com',
  loading: 'Enviando...',
  success: '¡Gracias! Revisa tu correo electrónico para confirmar tu suscripción.',
  errorDefault: 'No se pudo suscribir. Intenta de nuevo.',
  errorConnection: 'Error de conexión. Intenta de nuevo.',
}

export function HomeSubscribeForm({
  buttonText = 'Suscribirme',
  messages,
}: Readonly<HomeSubscribeFormProps>) {
  const m = { ...defaultMessages, ...messages }
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
        setMessage({ type: 'success', text: m.success })
        setEmail('')
      } else {
        const data = await response.json()
        setMessage({ type: 'error', text: data.error || m.errorDefault })
      }
    } catch {
      setMessage({ type: 'error', text: m.errorConnection })
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={m.placeholder}
          required
          disabled={pending}
          className="flex-1 rounded-full border border-neutral-600/70 bg-neutral-900/50 px-5 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition focus:border-neutral-400 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full border border-neutral-600/70 bg-neutral-950 px-6 py-2.5 text-sm font-semibold text-neutral-100 transition hover:border-neutral-400 hover:text-white disabled:opacity-50"
        >
          {pending ? m.loading : buttonText}
        </button>
      </div>
      {message && (
        <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message.text}
        </p>
      )}
    </form>
  )
}
