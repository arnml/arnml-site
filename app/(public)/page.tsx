import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { display } from '@/lib/fonts'
import { baseUrl } from '@/lib/constants'
import { ParticleBackground } from '@/components/particle-background'
import { GlassWindow } from '@/components/glass-window'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Arnold Moya — Developer & AI Writer',
  description:
    'Software developer building in public. Working at a Canadian tech company, coding 10h+ a day. Newsletter, TikTok, and Instagram covering AI, tech, and software for developers.',
  keywords: [
    'Arnold Moya',
    'developer',
    'software engineer',
    'AI writer',
    'tech newsletter',
    'building in public',
    'Canada',
    'inteligencia artificial',
  ],
  authors: [{ name: 'Arnold Moya' }],
  creator: 'Arnold Moya',
  openGraph: {
    title: 'Arnold Moya — Developer & AI Writer',
    description:
      'Software developer building in public. Working at a Canadian tech company, writing about AI & tech for developers.',
    siteName: 'Arnold Moya',
    type: 'website',
    url: baseUrl,
  },
  twitter: {
    card: 'summary',
    title: 'Arnold Moya — Developer & AI Writer',
    description: 'Developer building in public. AI & tech content.',
    creator: '@arnoldmoya',
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'en': `${baseUrl}/?lang=en`,
      'es': `${baseUrl}/?lang=es`,
      'pt': `${baseUrl}/?lang=pt`,
      'x-default': baseUrl,
    },
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arnold Moya',
  url: baseUrl,
  sameAs: [
    'https://www.tiktok.com/@_arnoldmoya_',
    'https://www.instagram.com/_arnoldmoya_',
  ],
  jobTitle: 'Software Developer',
  description:
    'Software developer building in public, working at a Canadian tech company. AI & tech writer in Spanish.',
  knowsAbout: [
    'Software Development',
    'Artificial Intelligence',
    'System Design',
    'Web Development',
    'AI Trends',
  ],
}

// ─── i18n ────────────────────────────────────────────────────────────────────

type Lang = 'en' | 'es' | 'pt'

const content: Record<Lang, { about: string[]; newsletter: string; ariaLabel: string }> = {
  en: {
    about: [
      'Software developer at a Canadian tech company.',
      'I write code 10h+ a day and write about AI & tech for developers who want to stay sharp.',
      'Building in public — newsletter, shorts, and deep dives.',
    ],
    newsletter: 'AI & tech in Spanish',
    ariaLabel: 'Arnold Moya — Personal site',
  },
  es: {
    about: [
      'Desarrollador de software en una empresa canadiense.',
      'Escribo código 10h+ al día y escribo sobre AI y tech para developers que quieren mantenerse al día.',
      'Construyendo en público — newsletter, shorts y análisis.',
    ],
    newsletter: 'AI & tech en español',
    ariaLabel: 'Arnold Moya — Sitio personal',
  },
  pt: {
    about: [
      'Desenvolvedor de software em uma empresa canadense.',
      'Escrevo código 10h+ por dia e escrevo sobre AI e tech para devs que querem se manter atualizados.',
      'Construindo em público — newsletter, shorts e análises.',
    ],
    newsletter: 'AI & tech em espanhol',
    ariaLabel: 'Arnold Moya — Site pessoal',
  },
}

function detectLang(acceptLanguage: string, override?: string): Lang {
  if (override) {
    const o = override.toLowerCase()
    if (o === 'es') return 'es'
    if (o === 'pt') return 'pt'
    if (o === 'en') return 'en'
  }
  for (const entry of acceptLanguage.split(',')) {
    const tag = entry.split(';')[0].trim().toLowerCase()
    if (tag.startsWith('es')) return 'es'
    if (tag.startsWith('pt')) return 'pt'
    if (tag.startsWith('en')) return 'en'
  }
  return 'en'
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang: langParam } = await searchParams
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  const lang = detectLang(acceptLanguage, langParam)
  const t = content[lang]

  const projects = [
    { label: 'Newsletter', handle: t.newsletter, href: '/newsletter/es', external: false },
    { label: 'TikTok', handle: '@_arnoldmoya_', href: 'https://www.tiktok.com/@_arnoldmoya_', external: true },
    { label: 'Instagram', handle: '@_arnoldmoya_', href: 'https://www.instagram.com/_arnoldmoya_', external: true },
  ] as const

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="bg-black min-h-screen">
        <ParticleBackground />
        <main
          lang={lang}
          className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20"
          aria-label={t.ariaLabel}
        >
          <div className="w-full max-w-[400px]">
            <GlassWindow>
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                arnoldmoya.com
              </p>
              <h1
                className={`${display.className} mt-5 text-3xl font-semibold leading-tight text-neutral-100`}
              >
                Arnold Moya
              </h1>

              {/* Language switcher */}
              <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
                  {(['en', 'es', 'pt'] as const).map((l) => (
                    <Link
                      key={l}
                      href={`/?lang=${l}`}
                      aria-current={lang === l ? 'true' : undefined}
                      className={`rounded-full px-3.5 py-1 text-[11px] font-medium tracking-widest uppercase transition-all duration-200 ${
                        lang === l
                          ? 'bg-white/[0.10] text-neutral-100 border border-white/[0.15] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                          : 'text-neutral-600 hover:text-neutral-400 border border-transparent'
                      }`}
                    >
                      {l}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1.5">
                {t.about.map((line, i) => (
                  <p
                    key={i}
                    className={`text-sm leading-relaxed ${i < 2 ? 'text-neutral-400' : 'text-neutral-500'}`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              <nav className="mt-8 flex flex-col gap-2.5" aria-label="Projects">
                {projects.map(({ label, handle, href, external }) => {
                  const props = external
                    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
                    : {}
                  return (
                    <Link
                      key={label}
                      href={href}
                      {...props}
                      className="group flex items-center justify-between rounded-[14px] border border-white/[0.08] bg-white/[0.04] px-5 py-3.5 transition-all hover:border-white/[0.16] hover:bg-white/[0.08]"
                    >
                      <div>
                        <p className="text-sm font-semibold text-neutral-100">{label}</p>
                        <p className="text-xs text-neutral-500 mt-0.5">{handle}</p>
                      </div>
                      <span className="text-neutral-600 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-400">
                        →
                      </span>
                    </Link>
                  )
                })}
              </nav>

            </GlassWindow>
          </div>
        </main>
      </div>
    </>
  )
}
