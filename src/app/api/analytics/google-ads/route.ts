import { NextResponse } from "next/server"
import { google } from "googleapis"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate") || "7daysAgo"
    const endDate = searchParams.get("endDate") || "today"

    // Format dates for Google Ads API
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

    // Initialize Google Ads API client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/adwords"],
    })

    const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID
    const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN

    if (!customerId || !developerToken) {
      return NextResponse.json({ error: "Google Ads API credentials are missing" }, { status: 500 })
    }

    // Using Google Ads API v14
    const googleAdsApiVersion = "v14"
    const googleAdsClient = google.googleads({
      version: googleAdsApiVersion,
      auth: auth,
    })

    // Set up the query for campaign performance
    const campaignQuery = `
      SELECT
        campaign.id,
        campaign.name,
        campaign.status,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.ctr,
        metrics.average_cpc,
        segments.date
      FROM campaign
      WHERE segments.date BETWEEN '${formattedStartDate}' AND '${formattedEndDate}'
      ORDER BY metrics.impressions DESC
    `

    // Execute the campaign query
    const campaignResponse = await googleAdsClient.customers.googleAds.search(
      {
        customerId,
        query: campaignQuery,
        pageSize: 100,
      },
      {
        headers: {
          "developer-token": developerToken,
        },
      },
    )

    // Query for ad group performance
    const adGroupQuery = `
      SELECT
        ad_group.id,
        ad_group.name,
        campaign.name,
        ad_group.status,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.ctr,
        metrics.average_cpc,
        segments.date
      FROM ad_group
      WHERE segments.date BETWEEN '${formattedStartDate}' AND '${formattedEndDate}'
      ORDER BY metrics.impressions DESC
      LIMIT 50
    `

    // Execute the ad group query
    const adGroupResponse = await googleAdsClient.customers.googleAds.search(
      {
        customerId,
        query: adGroupQuery,
        pageSize: 100,
      },
      {
        headers: {
          "developer-token": developerToken,
        },
      },
    )

    // Query for keyword performance
    const keywordQuery = `
      SELECT
        ad_group_criterion.keyword.text,
        ad_group.name,
        campaign.name,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.ctr,
        metrics.average_cpc,
        segments.date
      FROM keyword_view
      WHERE segments.date BETWEEN '${formattedStartDate}' AND '${formattedEndDate}'
      ORDER BY metrics.impressions DESC
      LIMIT 50
    `

    // Execute the keyword query
    const keywordResponse = await googleAdsClient.customers.googleAds.search(
      {
        customerId,
        query: keywordQuery,
        pageSize: 100,
      },
      {
        headers: {
          "developer-token": developerToken,
        },
      },
    )

    // Process and transform the data
    const campaignData = processCampaignData(campaignResponse.data)
    const adGroupData = processAdGroupData(adGroupResponse.data)
    const keywordData = processKeywordData(keywordResponse.data)

    return NextResponse.json({
      campaigns: campaignData,
      adGroups: adGroupData,
      keywords: keywordData,
    })
  } catch (error) {
    console.error("Error fetching Google Ads data:", error)
    return NextResponse.json({ error: "Failed to fetch Google Ads data" }, { status: 500 })
  }
}

// Helper functions to process the API responses
function processCampaignData(data: any) {
  if (!data || !data.results) return []

  return data.results.map((result: any) => {
    const campaign = result.campaign
    const metrics = result.metrics
    const segments = result.segments

    return {
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
      date: segments.date,
      impressions: Number.parseInt(metrics.impressions),
      clicks: Number.parseInt(metrics.clicks),
      cost: Number.parseInt(metrics.costMicros) / 1000000, // Convert micros to actual currency
      conversions: Number.parseFloat(metrics.conversions),
      ctr: Number.parseFloat(metrics.ctr),
      averageCpc: Number.parseInt(metrics.averageCpc) / 1000000, // Convert micros to actual currency
    }
  })
}

function processAdGroupData(data: any) {
  if (!data || !data.results) return []

  return data.results.map((result: any) => {
    const adGroup = result.adGroup
    const campaign = result.campaign
    const metrics = result.metrics
    const segments = result.segments

    return {
      id: adGroup.id,
      name: adGroup.name,
      campaignName: campaign.name,
      status: adGroup.status,
      date: segments.date,
      impressions: Number.parseInt(metrics.impressions),
      clicks: Number.parseInt(metrics.clicks),
      cost: Number.parseInt(metrics.costMicros) / 1000000,
      conversions: Number.parseFloat(metrics.conversions),
      ctr: Number.parseFloat(metrics.ctr),
      averageCpc: Number.parseInt(metrics.averageCpc) / 1000000,
    }
  })
}

function processKeywordData(data: any) {
  if (!data || !data.results) return []

  return data.results.map((result: any) => {
    const keyword = result.adGroupCriterion.keyword
    const adGroup = result.adGroup
    const campaign = result.campaign
    const metrics = result.metrics
    const segments = result.segments

    return {
      text: keyword.text,
      adGroupName: adGroup.name,
      campaignName: campaign.name,
      date: segments.date,
      impressions: Number.parseInt(metrics.impressions),
      clicks: Number.parseInt(metrics.clicks),
      cost: Number.parseInt(metrics.costMicros) / 1000000,
      conversions: Number.parseFloat(metrics.conversions),
      ctr: Number.parseFloat(metrics.ctr),
      averageCpc: Number.parseInt(metrics.averageCpc) / 1000000,
    }
  })
}

