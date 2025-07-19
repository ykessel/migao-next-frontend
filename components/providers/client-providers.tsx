'use client'

import { SessionProvider } from 'next-auth/react'
import { QueryProvider } from './query-provider'
import { Toaster } from 'sonner'

export function ClientProviders({ children, dehydratedState }: { children: React.ReactNode, dehydratedState?: unknown }) {
  return (
    <SessionProvider>
      <QueryProvider dehydratedState={dehydratedState}>
        {children}
        <Toaster position="top-right" />
      </QueryProvider>
    </SessionProvider>
  )
}