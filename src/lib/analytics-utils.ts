// Helper functions for analytics data processing

// Format date strings from YYYYMMDD to MM/DD/YYYY
export function formatGoogleAnalyticsDate(dateString: string): string {
  if (dateString.length === 8) {
    const year = dateString.substring(0, 4)
    const month = dateString.substring(4, 6)
    const day = dateString.substring(6, 8)
    return `${month}/${day}/${year}`
  }
  return dateString
}

// Convert relative date strings to ISO format
export function convertRelativeDateToISO(dateStr: string): string {
  if (dateStr === "today") return new Date().toISOString().split("T")[0]
  if (dateStr === "yesterday") {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    return date.toISOString().split("T")[0]
  }
  if (dateStr === "7daysAgo") {
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return date.toISOString().split("T")[0]
  }
  if (dateStr === "30daysAgo") {
    const date = new Date()
    date.setDate(date.getDate() - 30)
    return date.toISOString().split("T")[0]
  }
  return dateStr
}

// Calculate percentage change between two values
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

// Format large numbers with K, M, B suffixes
export function formatLargeNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B"
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

// Format duration in seconds to a readable format
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.round(seconds % 60)

  if (minutes < 60) {
    return `${minutes}m ${remainingSeconds}s`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${hours}h ${remainingMinutes}m`
}

// Format currency values
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// Format percentage values
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100)
}

// Calculate cost per acquisition
export function calculateCPA(cost: number, conversions: number): number {
  return conversions > 0 ? cost / conversions : 0
}

// Calculate return on ad spend
export function calculateROAS(revenue: number, cost: number): number {
  return cost > 0 ? revenue / cost : 0
}

