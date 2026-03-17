'use client'

import { useSyncExternalStore } from 'react'
import { Sun, Moon } from 'lucide-react'

function subscribe(cb: () => void) {
  const observer = new MutationObserver(cb)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

const getTheme = () =>
  document.documentElement.classList.contains('dark') ? ('dark' as const) : ('light' as const)

const getServerSnapshot = () => 'dark' as const

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerSnapshot)

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    localStorage.setItem('theme', next)
  }

  return (
    <button
      onClick={toggle}
      className="rounded-lg px-3 py-2 text-sm text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition flex items-center gap-2 w-full text-left"
    >
      {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  )
}
