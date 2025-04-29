"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Analysis, Page } from "@prisma/client"

interface AnalysisResults {
  analysis: Analysis;
  details: {
    keyphrase: {
      found: boolean;
      count: number;
      density: number;
    };
    readability: {
      score: number;
      wordCount: number;
      sentenceCount: number;
      avgWordsPerSentence: number;
      longSentences: number;
    };
    seoScore: number;
    readabilityScore: number;
  }
}
export default function ContentAnalyzer() {
  const [pages, setPages] = useState<Page[]>([])
  const [selectedPageId, setSelectedPageId] = useState("")
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [focusKeyphrase, setFocusKeyphrase] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [analyzed, setAnalyzed] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingPages, setLoadingPages] = useState(true)

  // Fetch pages on component mount
  useEffect(() => {
    async function fetchPages() {
      try {
        setLoadingPages(true)
        const response = await fetch("/api/pages")
        if (!response.ok) {
          throw new Error("Failed to fetch pages")
        }
        const data = await response.json()
        setPages(data)
        setLoadingPages(false)
      } catch (err) {
        console.error("Error fetching pages:", err)
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoadingPages(false)
      }
    }

    fetchPages()
  }, [])

  // Handle page selection
  const handlePageChange = async (pageId: string) => {
    setSelectedPageId(pageId)

    if (!pageId) {
      setTitle("")
      setMetaDescription("")
      return
    }

    try {
      const response = await fetch(`/api/pages/${pageId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch page details")
      }
      const page = await response.json()

      setTitle(page.title || "")
      setMetaDescription(page.description || "")

      // If the page has analyses, load the most recent one
      if (page.analyses && page.analyses.length > 0) {
        const latestAnalysis = page.analyses[0]
        setContent(latestAnalysis.content || "")
        setFocusKeyphrase(latestAnalysis.focusKeyphrase || "")
      }
    } catch (err) {
      console.error("Error fetching page details:", err)
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }

  // Analyze content
  const analyzeContent = async () => {
    if (!selectedPageId || !content) {
      setError("Pilih halaman dan masukkan konten untuk dianalisis")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageId: selectedPageId,
          content,
          focusKeyphrase,
          title,
          description: metaDescription,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze content")
      }

      const data = await response.json()
      setAnalysisResults(data)
      setAnalyzed(true)
      setLoading(false)
    } catch (err) {
      console.error("Error analyzing content:", err)
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setLoading(false)
    }
  }

  // Get SEO and readability scores from analysis results
  const getSeoScore = () => {
    return analysisResults?.details?.seoScore || 0
  }

  const getReadabilityScore = () => {
    return analysisResults?.details?.readabilityScore || 0
  }

  if (loadingPages) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Penganalisis Konten</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Memuat halaman...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Penganalisis Konten</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Editor Konten</CardTitle>
              <CardDescription>Masukkan konten Anda untuk dianalisis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="page-select">Pilih Halaman</Label>
                <Select value={selectedPageId} onValueChange={handlePageChange}>
                  <SelectTrigger id="page-select">
                    <SelectValue placeholder="Pilih halaman untuk dianalisis" />
                  </SelectTrigger>
                  <SelectContent>
                    {pages.length === 0 ? (
                      <SelectItem value="" disabled>
                        Tidak ada halaman tersedia
                      </SelectItem>
                    ) : (
                      pages.map((page) => (
                        <SelectItem key={page.id} value={page.id}>
                          {page.path}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul konten"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={!selectedPageId}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="focus-keyphrase">Kata Kunci Fokus</Label>
                <Input
                  id="focus-keyphrase"
                  placeholder="Masukkan kata kunci utama"
                  value={focusKeyphrase}
                  onChange={(e) => setFocusKeyphrase(e.target.value)}
                  disabled={!selectedPageId}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Deskripsi</Label>
                <Textarea
                  id="meta-description"
                  placeholder="Masukkan meta deskripsi (120-160 karakter)"
                  className="resize-none h-20"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  disabled={!selectedPageId}
                />
                <div className="text-xs text-muted-foreground">{metaDescription.length} karakter (ideal: 120-160)</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Konten</Label>
                <Textarea
                  id="content"
                  placeholder="Masukkan konten lengkap Anda di sini"
                  className="min-h-[300px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={!selectedPageId}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={analyzeContent} disabled={!selectedPageId || !content || loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Menganalisis...
                  </>
                ) : (
                  "Analisis Konten"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          {analyzed ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hasil Analisis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Skor SEO</Label>
                      <span className="font-medium">{getSeoScore()}/100</span>
                    </div>
                    <Progress value={getSeoScore()} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Skor Keterbacaan</Label>
                      <span className="font-medium">{getReadabilityScore()}/100</span>
                    </div>
                    <Progress value={getReadabilityScore()} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="seo">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                  <TabsTrigger value="readability">Keterbacaan</TabsTrigger>
                </TabsList>

                <TabsContent value="seo" className="space-y-4 mt-4">
                  <Alert
                    variant={focusKeyphrase && title.includes(focusKeyphrase) ? "default" : "destructive"}
                    className={
                      focusKeyphrase && title.includes(focusKeyphrase)
                        ? "border-green-500 bg-green-50 text-green-800"
                        : ""
                    }
                  >
                    {focusKeyphrase && title.includes(focusKeyphrase) ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>Kata kunci fokus dalam judul</AlertTitle>
                    <AlertDescription>
                      {focusKeyphrase && title.includes(focusKeyphrase)
                        ? "Bagus! Kata kunci fokus ada dalam judul"
                        : "Kata kunci fokus tidak ditemukan dalam judul"}
                    </AlertDescription>
                  </Alert>

                  <Alert
                    variant={metaDescription.length >= 120 && metaDescription.length <= 160 ? "default" : "destructive"}
                    className={
                      metaDescription.length >= 120 && metaDescription.length <= 160
                        ? "border-green-500 bg-green-50 text-green-800"
                        : ""
                    }
                  >
                    {metaDescription.length >= 120 && metaDescription.length <= 160 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>Panjang meta deskripsi</AlertTitle>
                    <AlertDescription>
                      {metaDescription.length >= 120 && metaDescription.length <= 160
                        ? "Bagus! Panjang meta deskripsi optimal"
                        : metaDescription.length < 120
                          ? "Meta deskripsi terlalu pendek (kurang dari 120 karakter)"
                          : "Meta deskripsi terlalu panjang (lebih dari 160 karakter)"}
                    </AlertDescription>
                  </Alert>

                  <Alert
                    variant={focusKeyphrase && content.includes(focusKeyphrase) ? "default" : "destructive"}
                    className={
                      focusKeyphrase && content.includes(focusKeyphrase)
                        ? "border-green-500 bg-green-50 text-green-800"
                        : ""
                    }
                  >
                    {focusKeyphrase && content.includes(focusKeyphrase) ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>Kata kunci fokus dalam konten</AlertTitle>
                    <AlertDescription>
                      {focusKeyphrase && content.includes(focusKeyphrase)
                        ? "Bagus! Kata kunci fokus ditemukan dalam konten"
                        : "Kata kunci fokus tidak ditemukan dalam konten"}
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="readability" className="space-y-4 mt-4">
                  <Alert
                    variant={content.length > 300 ? "default" : "destructive"}
                    className={content.length > 300 ? "border-green-500 bg-green-50 text-green-800" : ""}
                  >
                    {content.length > 300 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>Panjang konten</AlertTitle>
                    <AlertDescription>
                      {content.length > 300
                        ? "Bagus! Konten memiliki panjang yang cukup"
                        : "Konten terlalu pendek, tambahkan lebih banyak informasi"}
                    </AlertDescription>
                  </Alert>

                  <Alert
                    variant={content.split(/[.!?]+/).length > 1 ? "default" : "destructive"}
                    className={content.split(/[.!?]+/).length > 1 ? "border-green-500 bg-green-50 text-green-800" : ""}
                  >
                    {content.split(/[.!?]+/).length > 1 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>Struktur kalimat</AlertTitle>
                    <AlertDescription>
                      {content.split(/[.!?]+/).length > 1
                        ? "Bagus! Konten memiliki variasi kalimat"
                        : "Tambahkan lebih banyak variasi kalimat"}
                    </AlertDescription>
                  </Alert>

                  <Alert
                    variant={
                      content.split(/\s+/).filter((word) => word.length > 6).length / content.split(/\s+/).length < 0.3
                        ? "default"
                        : "destructive"
                    }
                    className={
                      content.split(/\s+/).filter((word) => word.length > 6).length / content.split(/\s+/).length < 0.3
                        ? "border-green-500 bg-green-50 text-green-800"
                        : ""
                    }
                  >
                    {content.split(/\s+/).filter((word) => word.length > 6).length / content.split(/\s+/).length <
                    0.3 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>Penggunaan kata kompleks</AlertTitle>
                    <AlertDescription>
                      {content.split(/\s+/).filter((word) => word.length > 6).length / content.split(/\s+/).length < 0.3
                        ? "Bagus! Penggunaan kata kompleks tidak berlebihan"
                        : "Terlalu banyak kata kompleks, gunakan kata yang lebih sederhana"}
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Hasil Analisis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  {selectedPageId
                    ? 'Masukkan konten dan klik "Analisis Konten" untuk melihat hasil'
                    : "Pilih halaman terlebih dahulu untuk memulai analisis"}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
