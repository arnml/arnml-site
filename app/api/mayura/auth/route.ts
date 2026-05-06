import { NextRequest, NextResponse } from 'next/server'
import { getMayuraSession } from '@/lib/mayura-session'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password === process.env.MAYURA_PASSWORD) {
    const session = await getMayuraSession()
    session.mayuraAuthenticated = true
    await session.save()

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
