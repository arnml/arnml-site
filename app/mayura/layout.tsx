import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mayura SEO Report',
  description: 'Plan de optimización SEO para Mayura Lounge',
  robots: 'noindex, nofollow',
}

export default function MayuraLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Tenor+Sans&family=Work+Sans:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
