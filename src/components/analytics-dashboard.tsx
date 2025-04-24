"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, BarChart, LineChart  } from "@/components/ui/chart"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowUpRight, Users, Eye, MousePointerClick, DollarSign, Target, TrendingUp } from "lucide-react"

type AnalyticsDashboardProps = {
  source: "google" | "posthog" | "meta" | "google-ads" | "combined"
}

interface GoogleAnalyticsData {
  overview?: {
    rows: Array<{
      dimensionValues: Array<{ value: string }>
      metricValues: Array<{ value: string }>
    }>
  }
  topPages?: {
    rows: Array<{
      dimensionValues: Array<{ value: string }>
      metricValues: Array<{ value: string }>
    }>
  }
}

interface PageViewsOverTime {
  date: string
  'Page Views': number
}

interface TopPage {
  path: string
  views: number
}

interface PostHogData {
  activeUsers?: number
  totalEvents?: number
  eventsByType?: Array<{
    name: string
    Count: number
  }>
}

interface MetaAdsData {
  accountInsights?: {
    data: Array<{
      date_start: string
      spend: string
      impressions: string
      clicks: string
    }>
  }
  campaigns?: {
    data: Array<{
      name: string
      insights: {
        data: Array<{
          spend: string
          impressions: string
          clicks: string
        }>
      }
    }>
  }
}

interface PerformanceDataPoint {
  date: string
  Spend: number
  Clicks: number
}

interface CampaignPerformance {
  name: string
  Spend: number
}

interface MetaCampaign {
  name: string
  spend: number
  impressions: number
  clicks: number
  ctr: number
  cpc: number
}

interface GoogleAdsData {
  campaigns?: Array<{
    name: string
    cost: number
    impressions: number
    clicks: number
    conversions: number
    date: string
  }>
}

interface GoogleAdsCampaign {
  name: string
  spend: number
  impressions: number
  clicks: number
  ctr: number
  conversions: number
}

type AnalyticsData = MetaAdsData | GoogleAnalyticsData | PostHogData | GoogleAdsData
export default function AnalyticsDashboard({ source }: AnalyticsDashboardProps) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let endpoint = ""

        switch (source) {
          case "google":
            endpoint = "/api/analytics/google"
            break
          case "posthog":
            endpoint = "/api/analytics/posthog"
            break
          case "meta":
            endpoint = "/api/analytics/meta-ads"
            break
          case "google-ads":
            endpoint = "/api/analytics/google-ads"
            break
          case "combined":
            endpoint = "/api/analytics/combined"
            break
        }

        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        console.error("Error fetching analytics data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [source])

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading analytics data...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load analytics data: {error}</AlertDescription>
      </Alert>
    )
  }

  // Transform data based on the source
  const gaData = source === "google" || source === "combined" ? transformGoogleAnalyticsData(data as GoogleAnalyticsData ) : null
  const phData = source === "posthog" || source === "combined" ? transformPostHogData(data as PostHogData) : null
  const metaData = source === "meta" || source === "combined" ? transformMetaAdsData(data as MetaAdsData) : null
  const googleAdsData = source === "google-ads" || source === "combined" ? transformGoogleAdsData(data as GoogleAdsData) : null

  return (
    <div className="space-y-4">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Google Analytics Metrics */}
        {(source === "google" || source === "combined") && gaData && (
          <>
            <MetricCard
              title="Total Users"
              value={gaData.totalUsers || 0}
              description="Last 7 days"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="Page Views"
              value={gaData.pageViews || 0}
              description="Last 7 days"
              icon={<Eye className="h-4 w-4 text-muted-foreground" />}
            />
          </>
        )}

        {/* PostHog Metrics */}
        {(source === "posthog" || source === "combined") && phData && (
          <>
            <MetricCard
              title="Active Users"
              value={phData.activeUsers || 0}
              description="Last 7 days"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="Events"
              value={phData.totalEvents || 0}
              description="Last 7 days"
              icon={<MousePointerClick className="h-4 w-4 text-muted-foreground" />}
            />
          </>
        )}

        {/* Meta Ads Metrics */}
        {(source === "meta" || source === "combined") && metaData && (
          <>
            <MetricCard
              title="Ad Spend"
              value={metaData.totalSpend || 0}
              description="Last 7 days"
              prefix="$"
              icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="Impressions"
              value={metaData.totalImpressions || 0}
              description="Last 7 days"
              icon={<Eye className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="Clicks"
              value={metaData.totalClicks || 0}
              description="Last 7 days"
              icon={<MousePointerClick className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="CTR"
              value={metaData.averageCTR || 0}
              description="Last 7 days"
              suffix="%"
              icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            />
          </>
        )}

        {/* Google Ads Metrics */}
        {(source === "google-ads" || source === "combined") && googleAdsData && (
          <>
            <MetricCard
              title="Ad Spend"
              value={googleAdsData.totalSpend || 0}
              description="Last 7 days"
              prefix="$"
              icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="Impressions"
              value={googleAdsData.totalImpressions || 0}
              description="Last 7 days"
              icon={<Eye className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="Clicks"
              value={googleAdsData.totalClicks || 0}
              description="Last 7 days"
              icon={<MousePointerClick className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="Conversions"
              value={googleAdsData.totalConversions || 0}
              description="Last 7 days"
              icon={<Target className="h-4 w-4 text-muted-foreground" />}
            />
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Google Analytics Charts */}
        {(source === "google" || source === "combined") && gaData && (
          <Card>
            <CardHeader>
              <CardTitle>Page Views Over Time</CardTitle>
              <CardDescription>Daily page views for the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer>
                <LineChart 
                  data={gaData.pageViewsOverTime as unknown as Record<string, string | number>[] || []}
                  categories={["Page Views"]}
                  index="date"
                  colors={["#0ea5e9"]}
                  valueFormatter={(value: { toLocaleString: () => string }) => `${value.toLocaleString()}`}
                  showLegend={false}
                  showGridLines={false}
                />
                <ChartTooltip/>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {/* PostHog Charts */}
        {(source === "posthog" || source === "combined") && phData && (
          <Card>
            <CardHeader>
              <CardTitle>Events by Type</CardTitle>
              <CardDescription>Distribution of events by type</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer>
                <BarChart
                  data={phData.eventsByType || []}
                  categories={["Count"]}
                  index="name"
                  colors={["#8b5cf6"]}
                  valueFormatter={(value: { toLocaleString: () => string }) => `${value.toLocaleString()}`}
                  showLegend={false}
                  showGridLines={false}
                />
                <ChartTooltip />
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {/* Meta Ads Charts */}
        {(source === "meta" || source === "combined") && metaData && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Meta Ads Performance</CardTitle>
                <CardDescription>Daily spend and results</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer>
                  <LineChart
                    data={metaData.performanceOverTime as unknown as Record<string, string | number>[] || []}
                    categories={["Spend", "Clicks"]}
                    index="date"
                    colors={["#f97316", "#06b6d4"]}
                    valueFormatter={(value: { toLocaleString: () => string }) => `${value.toLocaleString()}`}
                    showLegend={true}
                    showGridLines={false}
                  />
                  <ChartTooltip />
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Top campaigns by spend</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer>
                  <BarChart
                    data={metaData.campaignPerformance as unknown as Record<string, string | number>[] || []}
                    categories={["Spend"]}
                    index="name"
                    colors={["#f97316"]}
                    valueFormatter={(value: { toLocaleString: () => string }) => `$${value.toLocaleString()}`}
                    showLegend={false}
                    showGridLines={false}
                  />
                  <ChartTooltip />
                </ChartContainer>
              </CardContent>
            </Card>
          </>
        )}

        {/* Google Ads Charts */}
        {(source === "google-ads" || source === "combined") && googleAdsData && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Google Ads Performance</CardTitle>
                <CardDescription>Daily spend and clicks</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer>
                  <LineChart
                    data={googleAdsData.performanceOverTime as unknown as Record<string, string | number>[] || []}
                    categories={["Spend", "Clicks"]}
                    index="date"
                    colors={["#10b981", "#3b82f6"]}
                    valueFormatter={(value: { toLocaleString: () => string }) => `${value.toLocaleString()}`}
                    showLegend={true}
                    showGridLines={false}
                  />
                  <ChartTooltip />
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Top campaigns by spend</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer>
                  <BarChart
                    data={googleAdsData.campaignPerformance as unknown as Record<string, string | number>[] || []}
                    categories={["Spend"]}
                    index="name"
                    colors={["#10b981"]}
                    valueFormatter={(value: { toLocaleString: () => string }) => `$${value.toLocaleString()}`}
                    showLegend={false}
                    showGridLines={false}
                  />
                  <ChartTooltip />
                </ChartContainer>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Tables */}
      {/* Google Analytics Top Pages */}
      {(source === "google" || source === "combined") && gaData && (
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most viewed pages in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {gaData.topPages?.map((page: TopPage, i: number) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <div className="font-medium">{page.path}</div>
                  <div className="flex items-center">
                    <span>{page.views.toLocaleString()}</span>
                    <ArrowUpRight className="ml-2 h-4 w-4 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Meta Ads Campaigns */}
      {(source === "meta" || source === "combined") && metaData && (
        <Card>
          <CardHeader>
            <CardTitle>Meta Ad Campaigns</CardTitle>
            <CardDescription>Performance by campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-2">Campaign</th>
                    <th className="text-right font-medium p-2">Spend</th>
                    <th className="text-right font-medium p-2">Impressions</th>
                    <th className="text-right font-medium p-2">Clicks</th>
                    <th className="text-right font-medium p-2">CTR</th>
                    <th className="text-right font-medium p-2">CPC</th>
                  </tr>
                </thead>
                <tbody>
                  {metaData.campaigns?.map((campaign: MetaCampaign, i: number) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{campaign.name}</td>
                      <td className="text-right p-2">${campaign.spend.toFixed(2)}</td>
                      <td className="text-right p-2">{campaign.impressions.toLocaleString()}</td>
                      <td className="text-right p-2">{campaign.clicks.toLocaleString()}</td>
                      <td className="text-right p-2">{campaign.ctr.toFixed(2)}%</td>
                      <td className="text-right p-2">${campaign.cpc.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Google Ads Campaigns */}
      {(source === "google-ads" || source === "combined") && googleAdsData && (
        <Card>
          <CardHeader>
            <CardTitle>Google Ad Campaigns</CardTitle>
            <CardDescription>Performance by campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-2">Campaign</th>
                    <th className="text-right font-medium p-2">Spend</th>
                    <th className="text-right font-medium p-2">Impressions</th>
                    <th className="text-right font-medium p-2">Clicks</th>
                    <th className="text-right font-medium p-2">CTR</th>
                    <th className="text-right font-medium p-2">Conversions</th>
                  </tr>
                </thead>
                <tbody>
                  {googleAdsData.campaigns?.map((campaign: GoogleAdsCampaign, i: number) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{campaign.name}</td>
                      <td className="text-right p-2">${campaign.spend.toFixed(2)}</td>
                      <td className="text-right p-2">{campaign.impressions.toLocaleString()}</td>
                      <td className="text-right p-2">{campaign.clicks.toLocaleString()}</td>
                      <td className="text-right p-2">{campaign.ctr.toFixed(2)}%</td>
                      <td className="text-right p-2">{campaign.conversions.toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function MetricCard({
  title,
  value,
  description,
  icon,
  prefix = "",
  suffix = "",
}: {
  title: string
  value: number
  description: string
  icon: React.ReactNode
  prefix?: string
  suffix?: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

// Helper functions to transform API data for charts
function transformGoogleAnalyticsData(data: GoogleAnalyticsData) {
  // This is a simplified example - you would need to adapt this to your actual API response
  // if (!data || (!data.googleAnalytics && !data.overview)) {
  //   return {
  //     totalUsers: 0,
  //     pageViews: 0,
  //     pageViewsOverTime: [],
  //     topPages: [],
  //   }
  // }

  // const gaData = data.googleAnalytics || data

  // Extract metrics from the overview report
  const overviewRows = data.overview?.rows || []
  const totalUsers = overviewRows.reduce((sum, row) => sum + parseInt(row.metricValues[1]?.value || '0'), 0)
  const pageViews = overviewRows.reduce((sum, row) => sum + parseInt(row.metricValues[0]?.value || '0'), 0)
  
  // Format data for the page views chart
  const pageViewsOverTime: PageViewsOverTime[] = overviewRows.map((row) => ({
    date: formatDate(row.dimensionValues[0].value),
    "Page Views": Number.parseInt(row.metricValues[0].value),
  }))

  // Format data for the top pages table
  const topPages: TopPage[] = (data.topPages?.rows || []).map(row => ({
    path: row.dimensionValues[0]?.value || '',
    views: parseInt(row.metricValues[0]?.value || '0')
  }))

  return {
    totalUsers,
    pageViews,
    pageViewsOverTime,
    topPages,
  }
}

function transformPostHogData(data: PostHogData) {
  // This is a simplified example - you would need to adapt this to your actual API response
  // if (!data || (!data.postHog && !data.events)) {
  //   return {
  //     activeUsers: 0,
  //     totalEvents: 0,
  //     eventsByType: [],
  //   }
  // }

  // const phData = data.postHog || data

  // Example data transformation - adjust based on actual PostHog API response
  // const activeUsers = 1234 // Replace with actual data extraction
  // const totalEvents = 5678 // Replace with actual data extraction

  // Example data for events by type chart
  // const eventsByType = [
  //   { name: "pageview", Count: 3245 },
  //   { name: "click", Count: 1876 },
  //   { name: "form_submit", Count: 543 },
  //   { name: "purchase", Count: 214 },
  // ]

  return {
    activeUsers: data.activeUsers || 0,
    totalEvents: data.totalEvents || 0,
    eventsByType: data.eventsByType || []
  }
}

function transformMetaAdsData(data: MetaAdsData) {
  // if (!data || (!data.metaAds && !data.campaigns)) {
  //   return {
  //     totalSpend: 0,
  //     totalImpressions: 0,
  //     totalClicks: 0,
  //     averageCTR: 0,
  //     performanceOverTime: [],
  //     campaignPerformance: [],
  //     campaigns: [],
  //   }
  // }

  // const metaData = data.metaAds || data

  // Extract account insights for overall metrics
  const accountInsights = data.accountInsights?.data || []

  // Calculate totals
  const totalSpend = accountInsights.reduce((sum, day) => sum + parseFloat(day.spend || '0'), 0)
  const totalImpressions = accountInsights.reduce((sum, day) => sum + parseInt(day.impressions || '0'), 0)
  const totalClicks = accountInsights.reduce((sum, day) => sum + parseInt(day.clicks || '0'), 0)
  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0


  // Format data for performance over time chart
  const performanceOverTime: PerformanceDataPoint[] = accountInsights.map(day => ({
    date: new Date(day.date_start).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
    Spend: parseFloat(day.spend || '0'),
    Clicks: parseInt(day.clicks || '0')
  }))

  // Format data for campaign performance chart
  const campaigns = data.campaigns?.data || []
  const campaignPerformance: CampaignPerformance[] = campaigns
  .filter(campaign => campaign.insights?.data?.[0])
  .map(campaign => ({
    name: truncateName(campaign.name),
    Spend: parseFloat(campaign.insights.data[0].spend || '0')
  }))
  .sort((a, b) => b.Spend - a.Spend)
  .slice(0, 5)

  // Format campaign data for table
  const campaignData: MetaCampaign[] = (data.campaigns?.data || [])
    .filter(campaign => campaign.insights?.data?.[0])
    .map(campaign => {
      const insights = campaign.insights.data[0]
      const impressions = parseInt(insights.impressions || '0')
      const clicks = parseInt(insights.clicks || '0')
      const spend = parseFloat(insights.spend || '0')

      return {
        name: campaign.name,
        spend,
        impressions,
        clicks,
        ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
        cpc: clicks > 0 ? spend / clicks : 0
      }
    })
    .sort((a, b) => b.spend - a.spend)

  return {
    totalSpend,
    totalImpressions,
    totalClicks,
    averageCTR,
    performanceOverTime,
    campaignPerformance,
    campaigns: campaignData,
  }
}

function transformGoogleAdsData(data: GoogleAdsData) {
  if (!data || !data.campaigns) {
    return {
      totalSpend: 0,
      totalImpressions: 0,
      totalClicks: 0,
      totalConversions: 0,
      performanceOverTime: [],
      campaignPerformance: [],
      campaigns: [],
    }
  }

  // Extract campaign data
  const campaigns = data.campaigns || []

  const totalSpend = campaigns.reduce((sum, campaign) => sum + campaign.cost, 0)
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0)
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0)
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0)

  const performanceOverTime: PerformanceDataPoint[] = Object.entries(
    campaigns.reduce((acc: Record<string, PerformanceDataPoint>, campaign) => {
      const date = campaign.date
      if (!acc[date]) {
        acc[date] = { date, Spend: 0, Clicks: 0 }
      }
      acc[date].Spend += campaign.cost
      acc[date].Clicks += campaign.clicks
      return acc
    }, {})
  ).map(([, values]) => values)

  const campaignPerformance: CampaignPerformance[] = Object.entries(
    campaigns.reduce((acc: Record<string, CampaignPerformance>, campaign) => {
      if (!acc[campaign.name]) {
        acc[campaign.name] = { name: campaign.name, Spend: 0 }
      }
      acc[campaign.name].Spend += campaign.cost
      return acc
    }, {})
  )
    .map(([, values]) => values)
    .sort((a, b) => b.Spend - a.Spend)
    .slice(0, 5)

  const campaignData: GoogleAdsCampaign[] = campaigns.map(campaign => ({
    name: campaign.name,
    spend: campaign.cost,
    impressions: campaign.impressions,
    clicks: campaign.clicks,
    ctr: campaign.impressions > 0 ? (campaign.clicks / campaign.impressions) * 100 : 0,
    conversions: campaign.conversions
  }))

  return {
    totalSpend,
    totalImpressions,
    totalClicks,
    totalConversions,
    performanceOverTime,
    campaignPerformance,
    campaigns: campaignData
  }
}

function truncateName(name: string, maxLength = 15): string {
  return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name
}

function formatDate(dateString: string) {
  // Convert YYYYMMDD to a more readable format
  if (dateString.length === 8) {
    const year = dateString.substring(0, 4)
    const month = dateString.substring(4, 6)
    const day = dateString.substring(6, 8)
    return `${month}/${day}/${year}`
  }
  return dateString
}

