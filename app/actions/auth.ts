'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const secret = process.env.HUB_SECRET
  const users: { email: string; password: string }[] = JSON.parse(process.env.HUB_USERS ?? '[]')
  const valid = users.some(u => u.email === email && u.password === password)

  if (!secret || !valid) {
    redirect('/login?error=1')
  }

  const cookieStore = await cookies()
  cookieStore.set('hub-auth', secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  redirect('/')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('hub-auth')
  redirect('/login')
}
