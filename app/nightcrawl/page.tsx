import type { Metadata } from 'next'
import { getNightCrawlDb } from '@/lib/nightcrawl/data'
import { isoOf } from '@/lib/nightcrawl/utils'
import { NightCrawlApp } from '@/components/nightcrawl/night-crawl-app'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Night Crawl — Mesa de parcerias',
  description: 'CRM interno de parcerias para pub crawls.',
  robots: { index: false, follow: false },
}

const CRAWL_NAME = 'Night Crawl — São Paulo'
const CITY = 'São Paulo, Brasil'

export default async function NightCrawlPage() {
  const today = isoOf(new Date())
  const db = await getNightCrawlDb()
  const hojeTxt = new Date(today + 'T00:00:00').toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return <NightCrawlApp db={db} crawlName={CRAWL_NAME} city={CITY} today={today} hojeTxt={hojeTxt} />
}
