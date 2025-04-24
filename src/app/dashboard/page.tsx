"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, FileText, Globe, BarChart2 } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [pages, setPages] = useState([])
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

        // In a real app, you might fetch more data here
        // For now, we'll just simulate some analysis data
        setAnalyses([])

        setLoading(false)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Calculate average scores
  const calculateAverageScores = () => {
    if (pages.length === 0) {
      return {
        seo: 0,
        readability: 0,
        technical: 0,
      }
    }

    // In a real app, you'd calculate this from actual analysis data
    // For now, we'll use some placeholder logic
    return {
      seo: 72,
      readability: 85,
      technical: 65,
    }
  }

  const scores = calculateAverageScores()

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
                  ) : (
                    <>
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Meta deskripsi terlalu pendek</AlertTitle>
                        <AlertDescription>
                          {pages.filter((page) => !page.description || page.description.length < 120).length} halaman
                          memiliki meta deskripsi kurang dari 120 karakter
                        </AlertDescription>
                      </Alert>

                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Sitemap belum dibuat</AlertTitle>
                        <AlertDescription>XML sitemap belum dikonfigurasi untuk situs Anda</AlertDescription>
                      </Alert>

                      <Alert variant="default">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Kata kunci fokus tidak optimal</AlertTitle>
                        <AlertDescription>
                          Beberapa halaman tidak menggunakan kata kunci fokus dengan baik
                        </AlertDescription>
                      </Alert>
                    </>
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
                  <Alert variant="success" className="border-green-500 bg-green-50 text-green-800">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <AlertTitle>Kecepatan halaman baik</AlertTitle>
                    <AlertDescription>
                      Situs Anda memiliki waktu muat yang cepat di perangkat mobile dan desktop
                    </AlertDescription>
                  </Alert>

                  <Alert variant="success" className="border-green-500 bg-green-50 text-green-800">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <AlertTitle>Struktur heading optimal</AlertTitle>
                    <AlertDescription>
                      Struktur heading (H1, H2, H3) sudah diimplementasikan dengan baik
                    </AlertDescription>
                  </Alert>

                  <Alert variant="success" className="border-green-500 bg-green-50 text-green-800">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <AlertTitle>Responsif mobile</AlertTitle>
                    <AlertDescription>Situs Anda sepenuhnya responsif di semua ukuran layar</AlertDescription>
                  </Alert>
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
