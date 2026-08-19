import Link from 'next/link'
import { localePath, type Locale } from '@/lib/site/locales'

export function SiteFooter({ locale }: { locale: Locale }) {
  return <footer className="border-t border-zinc-200 px-5 py-10 text-sm text-zinc-500 dark:border-zinc-800 lg:px-8"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row"><p>© {new Date().getFullYear()} Arnold Moya</p><div className="flex gap-4"><Link href={localePath(locale, '/about')}>About</Link><Link href={localePath(locale, '/contact')}>Contact</Link></div></div></footer>
}
