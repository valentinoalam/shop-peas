"use client"

import { trackEvent } from "@/lib/utils"
import { useEffect } from "react"

export const usePerformanceTracking = () => {
  useEffect(() => {
    if (typeof window === "undefined" || !("performance" in window)) return

    const trackPageLoad = () => {
      setTimeout(() => {
        try {
          const [entry] = performance.getEntriesByType("navigation")
          if (entry && entry.entryType === "navigation") {
            const navigationEntry = entry as PerformanceNavigationTiming
            const pageLoadTime = Math.round(navigationEntry.loadEventEnd - navigationEntry.startTime)
            trackEvent({
              category: "Performance",
              action: "Page Load Time",
              label: `${pageLoadTime}ms`,
            })
          }
        } catch (error) {
          console.error("Error tracking page load:", error)
        }
      }, 0)
    }

    window.addEventListener("load", trackPageLoad)
    return () => window.removeEventListener("load", trackPageLoad)
  }, [])
}

