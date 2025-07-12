import { Metadata } from 'next'
import { ClientProviders } from '@/components/providers/client-providers'
import { ConditionalNavigation } from '@/components/app-components/conditional-navigation'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'MiGao - Encuentra tu hogar ideal en Cuba',
    template: '%s | MiGao'
  },
  description: 'Plataforma líder para encontrar propiedades en alquiler en Cuba',
  keywords: ['alquiler', 'propiedades', 'Cuba', 'vivienda'],
  openGraph: {
    title: 'MiGao - Encuentra tu hogar ideal en Cuba',
    description: 'Plataforma líder para encontrar propiedades en alquiler en Cuba',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'MiGao - Plataforma de propiedades en Cuba',
      },
    ],
    siteName: 'MiGao',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiGao - Encuentra tu hogar ideal en Cuba',
    description: 'Plataforma líder para encontrar propiedades en alquiler en Cuba',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <ClientProviders>
          <ConditionalNavigation />
          <main className='mt-16'>
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  )
}
