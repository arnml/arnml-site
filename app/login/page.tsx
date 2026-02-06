import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { verifyAdminPassword } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

async function loginAction(formData: FormData) {
  'use server'

  const password = formData.get('password') as string

  if (!password) {
    throw new Error('Password is required')
  }

  const isValid = await verifyAdminPassword(password)

  if (isValid) {
    const session = await getSession()
    session.isAuthenticated = true
    await session.save()
    redirect('/admin')
  }

  throw new Error('Invalid password')
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 dark:bg-neutral-950">
      <div className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="mb-6 text-2xl font-bold">Admin Login</h1>

        <form action={loginAction} className="space-y-6">
          <div>
            <Label htmlFor="password">Admin Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter admin password"
              required
              autoComplete="off"
              className="mt-2"
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Contact your administrator if you forgot the password.
        </p>
      </div>
    </div>
  )
}
