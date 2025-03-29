
import * as React from "react"
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
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }, 250),
    []
  )

  useEffect(() => {
    // Set initial value
    handleResize()

    // Add event listener for window resize
    window.addEventListener("resize", handleResize)
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  return !!isMobile
}
