"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2, Search } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"

interface UserVisits {
  totalVisits: number
  visitsPerDay: Record<string, number>
}

export default function UsersAnalytics() {
  const [userId, setUserId] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [userVisits, setUserVisits] = useState<UserVisits | null>(null)
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    to: new Date(),
  })

  const fetchUserVisits = async () => {
    if (!userId) {
      setError("Please enter a user ID")
      return
    }

    if (!date?.from || !date?.to) {
      setError("Please select a date range")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const startDate = format(date.from, "yyyy-MM-dd")
      const endDate = format(date.to, "yyyy-MM-dd")

      const visitsRes = await fetch(
        `/api/analytics/users/${userId}?action=visits&startDate=${startDate}&endDate=${endDate}`,
      )
      const visitsData = await visitsRes.json()

      setUserVisits(visitsData.data)
    } catch (err) {
      console.error("Failed to fetch user visits:", err)
      setError("Failed to load user visits. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const visitsChartData = userVisits
    ? Object.entries(userVisits.visitsPerDay).map(([date, count]) => ({
        date,
        visits: count,
      }))
    : []

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">User ID</label>
              <Input
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mt-1">
              <label className="text-sm font-medium">Date Range</label>
              <DateRangePicker onUpdate={(values) => setDate(values.range)} />
            </div>
          </div>
          <Button onClick={fetchUserVisits} disabled={loading} className="mt-4">
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

          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>

      {userVisits && (
        <Tabs defaultValue="visits">
          <TabsList>
            <TabsTrigger value="visits">Visits</TabsTrigger>
          </TabsList>
          <TabsContent value="visits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Visits</p>
                  <p className="text-2xl font-bold">{userVisits.totalVisits}</p>
                </div>

                <div className="h-[300px]">
                  {visitsChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={visitsChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="visits" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-muted-foreground">No visit data available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
