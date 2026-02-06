'use client'

import { useEffect } from 'react'

export default function PublicError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h2 className="mb-4 text-2xl font-bold">
        Sorry, algo falló en nuestro servidor.
      </h2>
      <p className="mb-8 text-neutral-600 dark:text-neutral-400">
        Ocurrió un error inesperado. Por favor, intenta de nuevo.
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-neutral-900 px-6 py-2 text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
