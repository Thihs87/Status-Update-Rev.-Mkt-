import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hub de Projetos — Growth & Revenue Marketing | Gupy',
  description: 'Atualização de projetos de marketing para liderança.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
