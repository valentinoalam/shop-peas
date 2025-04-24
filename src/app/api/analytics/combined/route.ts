import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate") || "7daysAgo"
    const endDate = searchParams.get("endDate") || "today"

    // Fetch Google Analytics data
    const gaResponse = await fetch(`/api/analytics/google?startDate=${startDate}&endDate=${endDate}`, {
      cache: "no-store",
    })

    if (!gaResponse.ok) {
      throw new Error(`Google Analytics API responded with status: ${gaResponse.status}`)
    }

    const gaData = await gaResponse.json()

    // Fetch PostHog data
    const phResponse = await fetch(`/api/analytics/posthog?startDate=${startDate}&endDate=${endDate}`, {
      cache: "no-store",
    })

    if (!phResponse.ok) {
      throw new Error(`PostHog API responded with status: ${phResponse.status}`)
    }

    const phData = await phResponse.json()

    // Fetch Meta Ads data
    const metaResponse = await fetch(`/api/analytics/meta-ads?startDate=${startDate}&endDate=${endDate}`, {
      cache: "no-store",
    })

    let metaData = null
    if (metaResponse.ok) {
      metaData = await metaResponse.json()
    } else {
      console.warn("Meta Ads API not available or returned an error")
    }

    // Fetch Google Ads data
    const googleAdsResponse = await fetch(`/api/analytics/google-ads?startDate=${startDate}&endDate=${endDate}`, {
      cache: "no-store",
    })

    let googleAdsData = null
    if (googleAdsResponse.ok) {
      googleAdsData = await googleAdsResponse.json()
    } else {
      console.warn("Google Ads API not available or returned an error")
    }

    // Combine the data
    return NextResponse.json({
      googleAnalytics: gaData,
      postHog: phData,
      metaAds: metaData,
      googleAds: googleAdsData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching combined analytics data:", error)
    return NextResponse.json({ error: "Failed to fetch combined analytics data" }, { status: 500 })
  }
}

