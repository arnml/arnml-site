import { getIronSession, type SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type NightcrawlSession = { isAuthenticated?: boolean }

function options(): SessionOptions {
  const password = process.env.NIGHTCRAWL_SESSION_SECRET || process.env.SESSION_SECRET
  if (!password) throw new Error('NIGHTCRAWL_SESSION_SECRET or SESSION_SECRET is not configured')
  return { password, cookieName: 'nightcrawl_session', cookieOptions: { secure: process.env.NODE_ENV === 'production', httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 8 } }
}

export async function getNightcrawlSession() { return getIronSession<NightcrawlSession>(await cookies(), options()) }

export async function requireNightcrawlSession() {
  const session = await getNightcrawlSession()
  if (!session.isAuthenticated) redirect('/nightcrawl/login')
  return session
}

export function isNightcrawlPasswordValid(password: string) { return Boolean(password) && password === process.env.NIGHTCRAWL_PASSWORD }
