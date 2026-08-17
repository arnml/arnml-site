import type { Metadata } from 'next'
import { seedNightCrawl } from '@/lib/nightcrawl/seed'
import { isoOf } from '@/lib/nightcrawl/utils'
import { NightCrawlApp } from '@/components/nightcrawl/night-crawl-app'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Night Crawl — Mesa de parcerias',
  description: 'Demo interna de CRM de parcerias para pub crawls — dados fictícios.',
  robots: { index: false, follow: false },
}

const CRAWL_NAME = 'Night Crawl — São Paulo'
const CITY = 'São Paulo, Brasil'

export default function NightCrawlPage() {
  const today = isoOf(new Date())
  const db = seedNightCrawl(today)
  const hojeTxt = new Date(today + 'T00:00:00').toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return <NightCrawlApp initialDb={db} crawlName={CRAWL_NAME} city={CITY} today={today} hojeTxt={hojeTxt} />
}
