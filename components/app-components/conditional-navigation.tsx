'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from './navigation'

export function ConditionalNavigation() {
  const pathname = usePathname()
  
  // Don't show navigation on auth routes
  const isAuthRoute = pathname?.startsWith('/login') || 
                     pathname?.startsWith('/signup') || 
                     pathname?.startsWith('/auth-callback')
  
  if (isAuthRoute) {
    return null
  }
  
  return <Navigation />
} 