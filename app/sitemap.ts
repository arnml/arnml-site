import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arnoldmoya.com'
  const pages = ['', '/about', '/work', '/consulting', '/contact', '/writing']
  return ['en', 'es', 'pt'].flatMap((locale) => pages.map((page) => ({
    url: `${baseUrl}/${locale}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'weekly' as const : 'monthly' as const,
    priority: page === '' ? 1 : 0.7,
  })))
}
