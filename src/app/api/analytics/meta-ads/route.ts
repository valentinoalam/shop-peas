import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate") || "7daysAgo"
    const endDate = searchParams.get("endDate") || "today"

    // Format dates for Meta API
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

    const accessToken = process.env.META_ACCESS_TOKEN
    const adAccountId = process.env.META_AD_ACCOUNT_ID

    if (!accessToken || !adAccountId) {
      return NextResponse.json({ error: "Meta API credentials are missing" }, { status: 500 })
    }

    // Fetch campaign insights
    const campaignsResponse = await fetch(
      `https://graph.facebook.com/v18.0/act_${adAccountId}/campaigns?fields=name,objective,status,insights.time_range({"since":"${formattedStartDate}","until":"${formattedEndDate}"}).level(campaign){impressions,clicks,spend,cpc,ctr,reach,frequency,actions,action_values,cost_per_action_type}&limit=25`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (!campaignsResponse.ok) {
      throw new Error(`Meta API responded with status: ${campaignsResponse.status}`)
    }

    const campaignsData = await campaignsResponse.json()

    // Fetch ad account insights (overall performance)
    const accountInsightsResponse = await fetch(
      `https://graph.facebook.com/v18.0/act_${adAccountId}/insights?time_range={"since":"${formattedStartDate}","until":"${formattedEndDate}"}&level=account&fields=impressions,clicks,spend,cpc,ctr,reach,frequency,actions,action_values,cost_per_action_type&time_increment=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (!accountInsightsResponse.ok) {
      throw new Error(`Meta API responded with status: ${accountInsightsResponse.status}`)
    }

    const accountInsightsData = await accountInsightsResponse.json()

    // Fetch ad sets for more detailed targeting information
    const adSetsResponse = await fetch(
      `https://graph.facebook.com/v18.0/act_${adAccountId}/ad_sets?fields=name,targeting,status,insights.time_range({"since":"${formattedStartDate}","until":"${formattedEndDate}"}).level(ad_set){impressions,clicks,spend,cpc,ctr,reach,frequency}&limit=25`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (!adSetsResponse.ok) {
      throw new Error(`Meta API responded with status: ${adSetsResponse.status}`)
    }

    const adSetsData = await adSetsResponse.json()

    return NextResponse.json({
      campaigns: campaignsData,
      accountInsights: accountInsightsData,
      adSets: adSetsData,
    })
  } catch (error) {
    console.error("Error fetching Meta Ads data:", error)
    return NextResponse.json({ error: "Failed to fetch Meta Ads data" }, { status: 500 })
  }
}

