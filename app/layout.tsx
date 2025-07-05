import { Metadata } from 'next'
import { ClientProviders } from '@/components/providers/client-providers'
import { Navigation } from '@/components/app-components/navigation'
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
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  )
}
