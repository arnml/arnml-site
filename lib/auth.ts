import { getSession } from './session'

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return password === process.env.ADMIN_PASSWORD
}

export async function requireAuth() {
  const session = await getSession()
  if (!session.isAuthenticated) {
    throw new Error('Unauthorized')
  }
  return session
}
