import { Providers } from '@/redux/Providers'
import './globals.css'
import localFont from 'next/font/local'
import AuthProvider from '@/components/AuthProvider'

const primaryFont = localFont({
  src: '../public/fonts/IRANSansXV.woff2',
  variable: '--font-sans',
})

export const metadata = {
  title: 'Clinic Training',
  description: 'Listen to music',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className="font-farsi">
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
