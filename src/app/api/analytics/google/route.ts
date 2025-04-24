import { NextResponse } from "next/server"
import { google } from "googleapis"

// Initialize the Analytics Data API client
const analyticsDataClient = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  })

  const analyticsData = google.analyticsdata({
    version: "v1beta",
    auth,
  })

  return analyticsData
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get("propertyId") || process.env.GA_PROPERTY_ID
    const startDate = searchParams.get("startDate") || "7daysAgo"
    const endDate = searchParams.get("endDate") || "today"

    if (!propertyId) {
      return NextResponse.json({ error: "Google Analytics Property ID is required" }, { status: 400 })
    }

    const analyticsData = await analyticsDataClient()

    // Basic report for pageviews, users, and sessions
    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "totalUsers" },
          { name: "sessions" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
        ],
      },
    })

    // Get top pages
    const topPagesResponse = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 10,
      },
    })

    // Get traffic sources
    const sourcesResponse = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 10,
      },
    })

    return NextResponse.json({
      overview: response.data,
      topPages: topPagesResponse.data,
      sources: sourcesResponse.data,
    })
  } catch (error) {
    console.error("Error fetching Google Analytics data:", error)
    return NextResponse.json({ error: "Failed to fetch Google Analytics data" }, { status: 500 })
  }
}

