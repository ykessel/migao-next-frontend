import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function useScrollPreservation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const scrollPositionRef = useRef<number>(0)

  // Save scroll position before navigation
  useEffect(() => {
    const handleBeforeUnload = () => {
      scrollPositionRef.current = window.scrollY
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  // Restore scroll position after navigation
  useEffect(() => {
    const savedPosition = sessionStorage.getItem(`scroll-${pathname}-${searchParams.toString()}`)
    if (savedPosition) {
      const position = parseInt(savedPosition)
      window.scrollTo(0, position)
      sessionStorage.removeItem(`scroll-${pathname}-${searchParams.toString()}`)
    }
  }, [pathname, searchParams])

  const saveScrollPosition = () => {
    const key = `scroll-${pathname}-${searchParams.toString()}`
    sessionStorage.setItem(key, window.scrollY.toString())
  }

  return { saveScrollPosition }
} 