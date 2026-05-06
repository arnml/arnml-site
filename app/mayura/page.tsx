import { redirect } from 'next/navigation'
import { getMayuraSession } from '@/lib/mayura-session'
import { SeoReport } from '@/components/mayura/seo-report'

export const metadata = {
  title: 'Informe SEO | Mayura Lounge',
  description: 'Plan de optimización SEO a 6 meses para Mayura Lounge',
  robots: 'noindex, nofollow',
}

export default async function MayuraPage() {
  const session = await getMayuraSession()

  if (!session.mayuraAuthenticated) {
    redirect('/mayura/login')
  }

  return (
    <div style={{ background: '#fdf8ef', minHeight: '100vh' }}>
      <SeoReport />
    </div>
  )
}
