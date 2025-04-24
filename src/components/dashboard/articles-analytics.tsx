"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Loader2, Search } from "lucide-react"

interface ArticleEngagement {
  views: number
  likes: number
  shares: number
  comments: number
}

interface ArticleCTR {
  clickCount: number
  impressionCount: number
  ctr: number
}

interface WeeklyViews {
  articleId: number
  views: number
}

export default function ArticlesAnalytics() {
  const [articleId, setArticleId] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [engagement, setEngagement] = useState<ArticleEngagement | null>(null)
  const [ctr, setCtr] = useState<ArticleCTR | null>(null)
  const [weeklyViews, setWeeklyViews] = useState<WeeklyViews | null>(null)

  const fetchArticleData = async () => {
    if (!articleId || isNaN(Number.parseInt(articleId))) {
      setError("Please enter a valid article ID")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Fetch article engagement
      const engagementRes = await fetch(`/api/analytics/articles/${articleId}?action=engagement`)
      const engagementData = await engagementRes.json()

      // Fetch article CTR
      const ctrRes = await fetch(`/api/analytics/articles/${articleId}?action=ctr`)
      const ctrData = await ctrRes.json()

      // Fetch weekly views
      const weeklyViewsRes = await fetch(`/api/analytics/articles/${articleId}?action=weekly-views`)
      const weeklyViewsData = await weeklyViewsRes.json()

      setEngagement(engagementData.data)
      setCtr(ctrData.data)
      setWeeklyViews(weeklyViewsData.data)
    } catch (err) {
      console.error("Failed to fetch article data:", err)
      setError("Failed to load article data. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const engagementData = engagement
    ? [
        { name: "Views", value: engagement.views },
        { name: "Likes", value: engagement.likes },
        { name: "Shares", value: engagement.shares },
        { name: "Comments", value: engagement.comments },
      ]
    : []

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Article Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Enter Article ID"
              value={articleId}
              onChange={(e) => setArticleId(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={fetchArticleData} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>

          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>

      {engagement && ctr && weeklyViews && (
        <Tabs defaultValue="engagement">
          <TabsList>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="ctr">CTR</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Views</TabsTrigger>
          </TabsList>
          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Article Engagement</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ctr" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Click-Through Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Clicks</p>
                    <p className="text-2xl font-bold">{ctr.clickCount}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Impressions</p>
                    <p className="text-2xl font-bold">{ctr.impressionCount}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">CTR</p>
                    <p className="text-2xl font-bold">{ctr.ctr}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Views in the last 7 days</p>
                  <p className="text-2xl font-bold">{weeklyViews.views}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
