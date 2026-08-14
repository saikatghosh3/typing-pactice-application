import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Loader } from '@/components/loader'
import './globals.css'

export const metadata: Metadata = {
  title: 'Typely — Type with intention',
  description: 'A focused typing studio for building speed, accuracy, and lasting muscle memory.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
  userScalable: false,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background" data-scroll-behavior="smooth" suppressHydrationWarning><body className="antialiased" suppressHydrationWarning>{children}{process.env.NODE_ENV === 'production' && <Analytics />}<ScrollToTop /><Loader /></body></html>
}
