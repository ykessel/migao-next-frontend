'use client'

import {SessionProvider} from 'next-auth/react'
import {QueryProvider} from './query-provider'
import {Toaster} from 'sonner'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export function ClientProviders({children, dehydratedState}: { children: React.ReactNode, dehydratedState?: unknown }) {
    return (
        <SessionProvider>
            <QueryProvider dehydratedState={dehydratedState}>
                {children}
                <Toaster position="top-right"/>
                {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false}/>}
            </QueryProvider>
        </SessionProvider>
    )
}