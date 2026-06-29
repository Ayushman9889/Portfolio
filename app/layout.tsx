import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Ayushman — Full Stack Developer',
  description:
    'Portfolio of Ayushman, full-stack developer based in Ghaziabad, UP.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.className} ${spaceGrotesk.variable} bg-page text-text-secondary antialiased`}
      >
        {children}
      </body>
    </html>
  )
}