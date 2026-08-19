import Link from 'next/link'
import { localeLabel, localePath, type Locale } from '@/lib/site/locales'
import { siteCopy } from '@/lib/site/content'

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale].nav
  const links = [
    [copy.writing, '/writing'], [copy.work, '/work'], [copy.about, '/about'], [copy.consulting, '/consulting'], [copy.contact, '/contact'],
  ] as const
  return <header className="border-b border-zinc-200/80 bg-[#f7f6f2]/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
    <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-6 px-5 lg:px-8">
      <Link href={localePath(locale)} className="font-mono text-sm font-bold tracking-tight">arnoldmoya<span className="text-blue-700">.</span>com</Link>
      <nav className="hidden items-center gap-5 text-sm text-zinc-600 md:flex dark:text-zinc-400" aria-label="Primary navigation">
        {links.map(([label, path]) => <Link key={path} href={localePath(locale, path)} className="transition-colors hover:text-blue-700 dark:hover:text-blue-400">{label}</Link>)}
      </nav>
      <div className="flex items-center gap-1 font-mono text-xs" aria-label="Language selector">
        {(['en', 'es', 'pt'] as const).map((item) => <Link key={item} href={localePath(item)} title={localeLabel(item)} aria-current={item === locale ? 'page' : undefined} className={`rounded px-2 py-1 uppercase ${item === locale ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}>{item}</Link>)}
      </div>
    </div>
  </header>
}
