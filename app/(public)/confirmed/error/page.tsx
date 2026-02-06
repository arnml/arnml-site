import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { ParticleBackground } from '@/components/particle-background'
import Link from 'next/link'

const display = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Error | Arnold Moya',
  description: 'Hubo un problema al confirmar tu correo electrónico.',
}

export default function ConfirmErrorPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <ParticleBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p
          className={`${display.className} text-sm uppercase tracking-[0.35em] text-red-400`}
        >
          Error
        </p>
        <h1
          className={`${display.className} text-4xl font-bold text-white md:text-5xl`}
        >
          Algo fue mal
        </h1>
        <p className="max-w-md text-lg text-neutral-300">
          No pudimos confirmar tu correo electrónico. Es posible que el enlace
          haya expirado o sea inválido.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-neutral-600/70 bg-neutral-950 px-6 py-2 text-sm font-semibold text-neutral-100 transition hover:border-neutral-400 hover:text-white"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
