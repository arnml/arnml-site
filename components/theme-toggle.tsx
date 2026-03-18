'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="rounded-lg px-3 py-2 text-sm text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition flex items-center gap-2 w-full text-left"
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  )
}
