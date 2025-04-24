"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2 } from "lucide-react"

interface OverviewStats {
  activeUsers: number
  dailyActiveUsers: {
    date: string
    activeUsers: number
  }
  topArticles: {
    articleId: number
    views: number
  }[]
  trafficSources: {
    source: string
    count: number
  }[]
  deviceInfo: {
    deviceType: string
    count: number
  }[]
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<OverviewStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOverviewStats() {
      try {
        setLoading(true)

        // Fetch active users
        const activeUsersRes = await fetch("/api/analytics?action=active-users")
        const activeUsersData = await activeUsersRes.json()

        // Fetch daily active users
        const dailyActiveUsersRes = await fetch("/api/analytics?action=daily-active-users")
        const dailyActiveUsersData = await dailyActiveUsersRes.json()

        // Fetch top articles
        const topArticlesRes = await fetch("/api/analytics?action=top-articles&limit=5")
        const topArticlesData = await topArticlesRes.json()

        // Fetch traffic sources
        const trafficSourcesRes = await fetch("/api/analytics?action=traffic-sources")
        const trafficSourcesData = await trafficSourcesRes.json()

        // Fetch device info
        const deviceInfoRes = await fetch("/api/analytics?action=device-info")
        const deviceInfoData = await deviceInfoRes.json()

        setStats({
          activeUsers: activeUsersData.data.activeUsers,
          dailyActiveUsers: dailyActiveUsersData.data,
          topArticles: topArticlesData.data,
          trafficSources: trafficSourcesData.data,
          deviceInfo: deviceInfoData.data,
        })
      } catch (err) {
        console.error("Failed to fetch overview stats:", err)
        setError("Failed to load dashboard data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchOverviewStats()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2">Loading dashboard data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeUsers || 0}</div>
            <p className="text-xs text-muted-foreground">Users active in the last 5 minutes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.dailyActiveUsers?.activeUsers || 0}</div>
            <p className="text-xs text-muted-foreground">Users active today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Article Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.topArticles?.[0]?.views || 0}</div>
            <p className="text-xs text-muted-foreground">Views on most popular article</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.trafficSources?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Unique traffic sources</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="articles">
        <TabsList>
          <TabsTrigger value="articles">Top Articles</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="devices">Device Types</TabsTrigger>
        </TabsList>
        <TabsContent value="articles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Articles</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              {stats?.topArticles && stats.topArticles.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.topArticles.map((article) => ({
                      name: `Article ${article.articleId}`,
                      views: article.views,
                    }))}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No article data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              {stats?.trafficSources && stats.trafficSources.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.trafficSources.map((source) => ({
                      name: source.source || "Unknown",
                      count: source.count,
                    }))}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No traffic source data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Device Types</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              {stats?.deviceInfo && stats.deviceInfo.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.deviceInfo.map((device) => ({
                      name: device.deviceType || "Unknown",
                      count: device.count,
                    }))}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No device data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
