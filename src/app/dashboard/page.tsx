"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, FileText, Globe, BarChart2 } from "lucide-react"
import Link from "next/link"
import { Analysis, Page } from "@prisma/client"

export default function DashboardPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [redirects, setRedirects] = useState([])
  const [schemas, setSchemas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        // Fetch pages
        const pagesResponse = await fetch("/api/pages")
        if (!pagesResponse.ok) {
          throw new Error("Failed to fetch pages")
        }
        const pagesData = await pagesResponse.json()
        setPages(pagesData)

        // Fetch analyses
        const analysesResponse = await fetch("/api/analysis")
        if (!analysesResponse.ok) {
          throw new Error("Failed to fetch analyses")
        }
        const analysesData = await analysesResponse.json()
        setAnalyses(analysesData)

        // Fetch redirects
        const redirectsResponse = await fetch("/api/redirects")
        if (!redirectsResponse.ok) {
          throw new Error("Failed to fetch redirects")
        }
        const redirectsData = await redirectsResponse.json()
        setRedirects(redirectsData)

        // Fetch schemas
        const schemasResponse = await fetch("/api/schema")
        if (!schemasResponse.ok) {
          throw new Error("Failed to fetch schemas")
        }
        const schemasData = await schemasResponse.json()
        setSchemas(schemasData)

        setLoading(false)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Calculate average scores
  const calculateAverageScores = () => {
    if (analyses.length === 0) {
      return {
        seo: 0,
        readability: 0,
        technical: calculateTechnicalScore(),
      }
    }

    // Calculate average SEO score
    const totalSeoScore = analyses.reduce((sum, analysis) => sum + analysis.seoScore, 0)
    const avgSeoScore = Math.round(totalSeoScore / analyses.length)

    // Calculate average readability score
    const totalReadabilityScore = analyses.reduce((sum, analysis) => sum + analysis.readabilityScore, 0)
    const avgReadabilityScore = Math.round(totalReadabilityScore / analyses.length)

    return {
      seo: avgSeoScore,
      readability: avgReadabilityScore,
      technical: calculateTechnicalScore(),
    }
  }

  // Calculate technical score based on redirects, schemas, etc.
  const calculateTechnicalScore = () => {
    let score = 50 // Base score

    // Add points for having redirects set up
    if (redirects.length > 0) {
      score += 15
    }

    // Add points for having schemas set up
    if (schemas.length > 0) {
      score += 20
    }

    // Add points for having meta descriptions
    const pagesWithMetaDesc = pages.filter((page) => page.description && page.description.length >= 120).length
    if (pagesWithMetaDesc > 0) {
      const metaDescScore = Math.min(15, Math.round((pagesWithMetaDesc / pages.length) * 15))
      score += metaDescScore
    }

    return Math.min(100, score) // Cap at 100
  }

  // Get SEO issues
  const getSeoIssues = () => {
    const issues = []

    // Check for pages with missing or short meta descriptions
    const pagesWithShortDesc = pages.filter((page) => !page.description || page.description.length < 120)
    if (pagesWithShortDesc.length > 0) {
      issues.push({
        title: "Meta deskripsi terlalu pendek",
        description: `${pagesWithShortDesc.length} halaman memiliki meta deskripsi kurang dari 120 karakter`,
        severity: "destructive",
      })
    }

    // Check for pages without analyses
    const analyzedPageIds = analyses.map((analysis) => analysis.pageId)
    const pagesWithoutAnalysis = pages.filter((page) => !analyzedPageIds.includes(page.id))
    if (pagesWithoutAnalysis.length > 0) {
      issues.push({
        title: "Halaman belum dianalisis",
        description: `${pagesWithoutAnalysis.length} halaman belum dianalisis kontennya`,
        severity: "destructive",
      })
    }

    // Check for pages without schema markup
    if (schemas.length === 0) {
      issues.push({
        title: "Schema markup belum dibuat",
        description: "Belum ada schema markup untuk meningkatkan pemahaman mesin pencari",
        severity: "default",
      })
    }

    return issues
  }

  // Get positive aspects
  const getPositiveAspects = () => {
    const positives = []

    // Check for pages with good meta descriptions
    const pagesWithGoodDesc = pages.filter(
      (page) => page.description && page.description.length >= 120 && page.description.length <= 160,
    )
    if (pagesWithGoodDesc.length > 0) {
      positives.push({
        title: "Meta deskripsi optimal",
        description: `${pagesWithGoodDesc.length} halaman memiliki meta deskripsi dengan panjang optimal`,
      })
    }

    // Check for pages with analyses
    if (analyses.length > 0) {
      positives.push({
        title: "Konten telah dianalisis",
        description: `${analyses.length} analisis konten telah dilakukan`,
      })
    }

    // Check for redirects
    if (redirects.length > 0) {
      positives.push({
        title: "Redirect telah dikonfigurasi",
        description: `${redirects.length} redirect telah diatur untuk mengarahkan lalu lintas dengan benar`,
      })
    }

    // If we don't have enough positives, add some default ones
    if (positives.length < 3) {
      if (!positives.some((p) => p.title === "Responsif mobile")) {
        positives.push({
          title: "Responsif mobile",
          description: "Situs Anda sepenuhnya responsif di semua ukuran layar",
        })
      }

      if (!positives.some((p) => p.title === "Kecepatan halaman baik") && positives.length < 3) {
        positives.push({
          title: "Kecepatan halaman baik",
          description: "Situs Anda memiliki waktu muat yang cepat di perangkat mobile dan desktop",
        })
      }
    }

    return positives
  }

  const scores = calculateAverageScores()
  const seoIssues = getSeoIssues()
  const positiveAspects = getPositiveAspects()

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard SEO</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Memuat data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard SEO</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Gagal memuat data: {error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard SEO</h1>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
          <TabsTrigger value="content">Konten</TabsTrigger>
          <TabsTrigger value="technical">Teknis</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Skor SEO Keseluruhan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{scores.seo}/100</div>
                <Progress value={scores.seo} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {scores.seo >= 80
                    ? "Sangat baik"
                    : scores.seo >= 60
                      ? "Baik, tapi masih ada ruang untuk perbaikan"
                      : "Perlu perbaikan"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Skor Keterbacaan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{scores.readability}/100</div>
                <Progress value={scores.readability} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {scores.readability >= 80
                    ? "Sangat baik, konten mudah dibaca"
                    : scores.readability >= 60
                      ? "Baik"
                      : "Perlu perbaikan"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Skor Teknis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{scores.technical}/100</div>
                <Progress value={scores.technical} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {scores.technical >= 80
                    ? "Sangat baik"
                    : scores.technical >= 60
                      ? "Baik"
                      : "Perlu perbaikan pada aspek teknis"}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Masalah SEO Teratas</CardTitle>
                <CardDescription>Masalah yang perlu segera ditangani</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pages.length === 0 ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Belum ada halaman</AlertTitle>
                      <AlertDescription>Tambahkan halaman untuk mulai menganalisis SEO Anda</AlertDescription>
                    </Alert>
                  ) : seoIssues.length === 0 ? (
                    <Alert variant="default" className="border-green-500 bg-green-50 text-green-800">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <AlertTitle>Tidak ada masalah terdeteksi</AlertTitle>
                      <AlertDescription>Semua aspek SEO Anda terlihat baik!</AlertDescription>
                    </Alert>
                  ) : (
                    seoIssues.map((issue, index) => (
                      <Alert key={index} variant={issue.severity as "default" | "destructive"}>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>{issue.title}</AlertTitle>
                        <AlertDescription>{issue.description}</AlertDescription>
                      </Alert>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aspek Positif</CardTitle>
                <CardDescription>Hal-hal yang sudah baik di situs Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                {positiveAspects.map((aspect, index) => (
                  <Alert key={index} variant="default" className="border-green-500 bg-green-50 text-green-800">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <AlertTitle>{aspect.title}</AlertTitle>
                    <AlertDescription>{aspect.description}</AlertDescription>
                  </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle>Analisis Konten</CardTitle>
                </div>
                <CardDescription>Analisis dan saran untuk meningkatkan konten Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Button asChild>
                    <Link href="/dashboard/content/analyzer">Buka Penganalisis Konten</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technical">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle>Analisis Teknis</CardTitle>
                </div>
                <CardDescription>Pengaturan teknis SEO untuk situs Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Button asChild>
                    <Link href="/dashboard/technical/sitemap">Kelola Sitemap</Link>
                  </Button>
                  <Button asChild className="ml-2">
                    <Link href="/dashboard/technical/redirects">Kelola Redirect</Link>
                  </Button>
                  <Button asChild className="ml-2">
                    <Link href="/dashboard/technical/meta">Kelola Meta Tag</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schema">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle>Schema Markup</CardTitle>
                </div>
                <CardDescription>Kelola data terstruktur untuk mesin pencari</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Button asChild>
                    <Link href="/dashboard/schema/generator">Buka Generator Schema</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
