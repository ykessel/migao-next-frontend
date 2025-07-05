'use client'

import { SessionProvider } from 'next-auth/react'
import { QueryProvider } from './query-provider'
import { Toaster } from 'sonner'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        {children}
        <Toaster position="top-right" />
      </QueryProvider>
    </SessionProvider>
  )
}