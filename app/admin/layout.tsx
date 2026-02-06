import Link from 'next/link'
import { ReactNode } from 'react'
import { requireAuth } from '@/lib/auth'

async function LogoutButton() {
  async function logout() {
    'use server'
    const { getSession } = await import('@/lib/session')
    const session = await getSession()
    session.destroy()
  }

  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        Logout
      </button>
    </form>
  )
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAuth()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
            <h1 className="text-xl font-bold">Admin</h1>
          </div>

          <nav className="flex-1 space-y-2 p-6">
            <Link
              href="/admin"
              className="block rounded px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/blog"
              className="block rounded px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              Blog Articles
            </Link>
            <Link
              href="/admin/news"
              className="block rounded px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              News Items
            </Link>
            <Link
              href="/admin/subscribers"
              className="block rounded px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              Subscribers
            </Link>
          </nav>

          <div className="border-t border-neutral-200 p-6 dark:border-neutral-800">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
