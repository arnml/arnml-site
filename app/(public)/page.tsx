import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { ParticleBackground } from '@/components/particle-background'
import Link from 'next/link'

const display = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['700'],
})

export const metadata: Metadata = {
  title: 'Arnold Moya',
  description: 'Arnold Moya - Software Developer',
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <ParticleBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-8">
        <h1 className={`${display.className} text-5xl font-bold text-white md:text-7xl`}>
          Arnold Moya
        </h1>
        <Link
          href="/newsletter/es"
          className="inline-flex items-center justify-center rounded-full border border-neutral-600/70 bg-neutral-950 px-6 py-2 text-sm font-semibold text-neutral-100 transition hover:border-neutral-400 hover:text-white"
        >
          Newsletter
        </Link>
      </div>
    </div>
  )
}
