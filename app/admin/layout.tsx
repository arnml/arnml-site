import Link from 'next/link'
import { ReactNode } from 'react'
import { requireAuth } from '@/lib/auth'
import { ThemeToggle } from '@/components/theme-toggle'

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
        className="text-xs text-sidebar-foreground/40 hover:text-sidebar-foreground transition"
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
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-sidebar-border bg-sidebar">
        <div className="flex flex-col h-full">
          <div className="px-6 py-5 border-b border-sidebar-border">
            <p className="text-[10px] uppercase tracking-[0.3em] text-sidebar-foreground/40">Admin</p>
            <p className="mt-1 text-sm font-semibold text-sidebar-foreground">Arnold Moya</p>
          </div>

          <nav className="flex-1 flex flex-col gap-0.5 p-3">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-sm text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition"
              >
                {label}
              </Link>
            ))}
            <div className="mt-1 pt-1 border-t border-sidebar-border">
              <ThemeToggle />
            </div>
          </nav>

          <div className="border-t border-sidebar-border px-6 py-4">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-background text-foreground">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
