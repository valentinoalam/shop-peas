import { Suspense } from "react"
import AnalyticsDashboard from "@/components/analytics-dashboard"
import { DateRangePicker } from "@/components/date-range-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <div className="flex items-center space-x-2">
            <DateRangePicker />
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="google-analytics">Google Analytics</TabsTrigger>
            <TabsTrigger value="posthog">PostHog</TabsTrigger>
            <TabsTrigger value="meta-ads">Meta Ads</TabsTrigger>
            <TabsTrigger value="google-ads">Google Ads</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Suspense fallback={<DashboardSkeleton />}>
              <AnalyticsDashboard source="combined" />
            </Suspense>
          </TabsContent>

          <TabsContent value="google-analytics" className="space-y-4">
            <Suspense fallback={<DashboardSkeleton />}>
              <AnalyticsDashboard source="google" />
            </Suspense>
          </TabsContent>

          <TabsContent value="posthog" className="space-y-4">
            <Suspense fallback={<DashboardSkeleton />}>
              <AnalyticsDashboard source="posthog" />
            </Suspense>
          </TabsContent>

          <TabsContent value="meta-ads" className="space-y-4">
            <Suspense fallback={<DashboardSkeleton />}>
              <AnalyticsDashboard source="meta" />
            </Suspense>
          </TabsContent>

          <TabsContent value="google-ads" className="space-y-4">
            <Suspense fallback={<DashboardSkeleton />}>
              <AnalyticsDashboard source="google-ads" />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Skeleton className="h-4 w-[150px]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[120px]" />
            <Skeleton className="mt-4 h-[150px] w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

