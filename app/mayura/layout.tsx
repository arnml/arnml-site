import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  DM_Sans,
  JetBrains_Mono,
  Tenor_Sans,
  Work_Sans,
  Manrope,
} from 'next/font/google'
import './globals.css'

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant-garamond',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

const tenorSans = Tenor_Sans({
  variable: '--font-tenor-sans',
  subsets: ['latin'],
  weight: '400',
})

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Mayura SEO Report',
  description: 'Plan de optimización SEO para Mayura Lounge',
  robots: 'noindex, nofollow',
}

export default function MayuraLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${cormorantGaramond.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${tenorSans.variable} ${workSans.variable} ${manrope.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
