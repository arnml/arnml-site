import { ReactNode } from 'react'

export default function PublicLayout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

    </div>
  )
}
