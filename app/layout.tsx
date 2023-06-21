import { Providers } from '@/redux/Providers'
import './globals.css'
import localFont from 'next/font/local'

const primaryFont = localFont({
  src: '../public/fonts/IRANSansXV.woff2',
  variable: '--font-sans',
})

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
