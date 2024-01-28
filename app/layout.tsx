import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MainProvider } from '@/providers/MainProvider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'SmartOs - DevSmart Soluções',
  description: 'DevSmart soluções empresariais',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-Br" suppressHydrationWarning>
      <body className={inter.variable}>
        <MainProvider>
          {children}
          <Toaster />
        </MainProvider>
      </body>
    </html>
  )
}
