import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId") || process.env.POSTHOG_PROJECT_ID
    const startDate = searchParams.get("startDate") || "7daysAgo"
    const endDate = searchParams.get("endDate") || "today"

    if (!projectId) {
      return NextResponse.json({ error: "PostHog Project ID is required" }, { status: 400 })
    }

    const apiKey = process.env.POSTHOG_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "PostHog API Key is missing" }, { status: 500 })
    }

    // Format dates for PostHog API
    const formatDate = (dateStr: string) => {
      if (dateStr === "today") return new Date().toISOString().split("T")[0]
      if (dateStr === "7daysAgo") {
        const date = new Date()
        date.setDate(date.getDate() - 7)
        return date.toISOString().split("T")[0]
      }
      return dateStr
    }

    const formattedStartDate = formatDate(startDate)
    const formattedEndDate = formatDate(endDate)

    // Fetch insights data from PostHog
    const insightsResponse = await fetch(
      `https://app.posthog.com/api/projects/${projectId}/insights/trend/?date_from=${formattedStartDate}&date_to=${formattedEndDate}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!insightsResponse.ok) {
      throw new Error(`PostHog API responded with status: ${insightsResponse.status}`)
    }

    const insightsData = await insightsResponse.json()

    // Fetch events data
    const eventsResponse = await fetch(
      `https://app.posthog.com/api/projects/${projectId}/events/?date_from=${formattedStartDate}&date_to=${formattedEndDate}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!eventsResponse.ok) {
      throw new Error(`PostHog API responded with status: ${eventsResponse.status}`)
    }

    const eventsData = await eventsResponse.json()

    // Fetch page views
    const pageViewsResponse = await fetch(
      `https://app.posthog.com/api/projects/${projectId}/insights/trend/?date_from=${formattedStartDate}&date_to=${formattedEndDate}&events=[{"id":"$pageview","name":"$pageview","type":"events","order":0}]`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!pageViewsResponse.ok) {
      throw new Error(`PostHog API responded with status: ${pageViewsResponse.status}`)
    }

    const pageViewsData = await pageViewsResponse.json()

    return NextResponse.json({
      insights: insightsData,
      events: eventsData,
      pageViews: pageViewsData,
    })
  } catch (error) {
    console.error("Error fetching PostHog data:", error)
    return NextResponse.json({ error: "Failed to fetch PostHog data" }, { status: 500 })
  }
}

