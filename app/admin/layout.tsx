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
        className="text-xs text-neutral-600 hover:text-neutral-300 transition"
      >
        Cerrar sesión
      </button>
    </form>
  )
}

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/news', label: 'Newsletter' },
  { href: '/admin/subscribers', label: 'Suscriptores' },
]

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAuth()

  return (
    <div className="flex min-h-screen bg-[#050709]">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-white/[0.07] bg-[rgba(10,13,20,0.98)]">
        <div className="flex flex-col h-full">
          <div className="px-6 py-5 border-b border-white/[0.07]">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">Admin</p>
            <p className="mt-1 text-sm font-semibold text-neutral-200">Arnold Moya</p>
          </div>

          <nav className="flex-1 flex flex-col gap-0.5 p-3">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-sm text-neutral-500 hover:bg-white/[0.05] hover:text-neutral-200 transition"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/[0.07] px-6 py-4">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-[#070a0f] text-neutral-200">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
