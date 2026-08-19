import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getNightcrawlSession, isNightcrawlPasswordValid } from '@/lib/nightcrawl/session'

export const metadata: Metadata = { title: 'Night Crawl login', robots: { index: false, follow: false } }

async function loginAction(formData: FormData) {
  'use server'
  if (!isNightcrawlPasswordValid(String(formData.get('password') || ''))) redirect('/nightcrawl/login?error=1')
  const session = await getNightcrawlSession()
  session.isAuthenticated = true
  await session.save()
  redirect('/nightcrawl')
}

export default async function NightcrawlLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-5 text-white"><div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8"><p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Private client area</p><h1 className="mt-4 text-3xl font-medium">Night Crawl</h1><form action={loginAction} className="mt-8 space-y-4"><label className="block text-sm text-zinc-400" htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-3 outline-none focus:border-blue-500" />{error ? <p className="text-sm text-red-400">Invalid password.</p> : null}<button className="w-full rounded-lg bg-white px-4 py-3 font-medium text-zinc-950 hover:bg-zinc-200" type="submit">Enter</button></form></div></main>
}
