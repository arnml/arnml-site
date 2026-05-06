'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function MayuraLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const pendingRef = useRef(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (pendingRef.current) return

    setError('')
    setLoading(true)
    pendingRef.current = true

    try {
      const res = await fetch('/api/mayura/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/mayura')
      } else {
        setError('Contraseña incorrecta')
        setPassword('')
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError(err instanceof Error ? err.message : 'Error al verificar contraseña')
    } finally {
      setLoading(false)
      pendingRef.current = false
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fdf8ef',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          background: '#fffaf1',
          border: '1px solid #e6d8c2',
          borderRadius: '14px',
          padding: '40px',
        }}
      >
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#b25a22',
              marginBottom: '8px',
            }}
          >
            Informe SEO
          </div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 500,
              color: '#1f1410',
              margin: '0 0 8px',
            }}
          >
            Mayura Lounge
          </h1>
          <p
            style={{
              margin: '0',
              fontSize: '14px',
              color: '#7a6356',
            }}
          >
            Acceso protegido
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 500,
              color: '#1f1410',
              marginBottom: '8px',
            }}
          >
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa la contraseña"
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1px solid #e6d8c2',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '16px',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
            disabled={loading}
          />

          {error && (
            <p
              style={{
                color: '#b23a2c',
                fontSize: '13px',
                marginBottom: '16px',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: '#d4773a',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Verificando...' : 'Acceder'}
          </button>
        </form>

        <p style={{ margin: '0', fontSize: '12px', color: '#7a6356', textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              color: '#d4773a',
              textDecoration: 'none',
            }}
          >
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  )
}
