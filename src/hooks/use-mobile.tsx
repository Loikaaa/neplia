
import { useCallback, useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  // Add a debounce function to avoid excessive rerenders
  const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>
    return function(this: any, ...args: any[]) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
  }

  const handleResize = useCallback(
    debounce(() => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
    }, 250),
    []
  )

  useEffect(() => {
    // Initial value setup - important for SSR
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      
      // Add event listener for window resize
      window.addEventListener("resize", handleResize)
      
      // Clean up
      return () => window.removeEventListener("resize", handleResize)
    }
    
    // Default to non-mobile if window is undefined (SSR)
    return () => setIsMobile(false)
  }, [handleResize])

  // Return boolean instead of undefined (for initial render)
  return isMobile === undefined ? false : isMobile
}
