import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Art Capital | Art Market Intelligence',
    template: '%s | Art Capital',
  },
  description:
    'Art Market Intelligence. Dati di mercato, analisi finanziarie e intelligence per collezionisti e investitori nel mercato dell\'arte.',
  keywords: [
    'arte', 'mercato dell\'arte', 'aste', 'investimenti arte',
    'art market', 'collezionismo', 'art performance index',
    'Christie\'s', 'Sotheby\'s', 'arte contemporanea',
  ],
  authors: [{ name: 'Art Capital' }],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://artcapitaldata.com',
    siteName: 'Art Capital',
    title: 'Art Capital | Art Market Intelligence',
    description: 'Art Market Intelligence. Dati, analisi e intelligence per il mercato dell\'arte.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Art Capital | Art Market Intelligence',
    description: 'Art Market Intelligence.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>
        <Header />
        <div className="pt-[5.5rem]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
