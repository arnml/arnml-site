import { getIronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

export interface MayuraSessionData {
  mayuraAuthenticated: boolean
}

export const mayuraSessionOptions: SessionOptions = {
  // Use SESSION_SECRET (32+ chars) for iron-session encryption
  password: process.env.SESSION_SECRET!,
  cookieName: 'mayura_report_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
}

export async function getMayuraSession() {
  return getIronSession<MayuraSessionData>(await cookies(), mayuraSessionOptions)
}

