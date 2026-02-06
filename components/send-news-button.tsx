'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface SendNewsButtonProps {
  newsId: string
  emailSent: boolean
}

export function SendNewsButton({ newsId, emailSent }: Readonly<SendNewsButtonProps>) {
  const [sending, setSending] = useState(false)
  const router = useRouter()

  if (emailSent) {
    return (
      <Button variant="outline" size="sm" disabled>
        Sent
      </Button>
    )
  }

  async function handleSend() {
    if (!confirm('Send this news item to all confirmed subscribers?')) return

    setSending(true)
    try {
      const response = await fetch(`/api/admin/send/${newsId}`, {
        method: 'POST',
      })
      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to send emails')
        return
      }

      alert(`Emails sent to ${data.sent} subscriber(s)`)
      router.refresh()
    } catch {
      alert('Failed to send emails')
    } finally {
      setSending(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSend}
      disabled={sending}
    >
      {sending ? 'Sending...' : 'Send Email'}
    </Button>
  )
}
