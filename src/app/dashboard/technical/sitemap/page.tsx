"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Info, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SitemapManager() {
  const [sitemapEnabled, setSitemapEnabled] = useState(true)
  const [excludedPaths, setExcludedPaths] = useState("")
  const [sitemapGenerated, setSitemapGenerated] = useState(false)
  const [generating, setGenerating] = useState(false)

  const generateSitemap = async () => {
    // In a real app, this would call an API to generate the sitemap
    setGenerating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSitemapGenerated(true)
    setGenerating(false)
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
        <h1 className="text-3xl font-bold">Pengelola Sitemap</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Konfigurasi Sitemap</CardTitle>
              <CardDescription>Atur pengaturan untuk XML sitemap Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sitemap-enabled" className="text-base">
                    Aktifkan XML Sitemap
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan untuk membuat sitemap.xml otomatis untuk situs Anda
                  </p>
                </div>
                <Switch id="sitemap-enabled" checked={sitemapEnabled} onCheckedChange={setSitemapEnabled} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excluded-paths">Jalur yang Dikecualikan</Label>
                <Textarea
                  id="excluded-paths"
                  placeholder="/admin/*, /private/*, /draft/*"
                  className="resize-none h-20"
                  value={excludedPaths}
                  onChange={(e) => setExcludedPaths(e.target.value)}
                  disabled={!sitemapEnabled}
                />
                <p className="text-xs text-muted-foreground">
                  Masukkan jalur yang ingin Anda kecualikan dari sitemap, satu per baris. Mendukung wildcard (*).
                </p>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Tentang Sitemap</AlertTitle>
                <AlertDescription>
                  Next.js 14+ mendukung pembuatan sitemap otomatis. Sitemap akan dibuat berdasarkan rute di aplikasi
                  Anda dan akan tersedia di /sitemap.xml.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button onClick={generateSitemap} disabled={!sitemapEnabled || generating}>
                {generating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Membuat Sitemap...
                  </>
                ) : (
                  "Buat Sitemap"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Implementasi Next.js</CardTitle>
              <CardDescription>Cara mengimplementasikan sitemap di Next.js 14+</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="auto">Otomatis</TabsTrigger>
                  <TabsTrigger value="manual">Manual</TabsTrigger>
                </TabsList>

                <TabsContent value="auto" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-sm">
                      Next.js 14+ mendukung pembuatan sitemap otomatis. Buat file <code>app/sitemap.js</code> atau{" "}
                      <code>app/sitemap.ts</code>:
                    </p>
                    <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                      {`// app/sitemap.js
export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
    },
    // ...
  ]
}`}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-sm">
                      Untuk sitemap yang lebih kompleks, gunakan <code>generateSitemaps</code> untuk membuat beberapa
                      sitemap:
                    </p>
                    <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                      {`// app/sitemap.js
export async function generateSitemaps() {
  // Ambil total halaman dan hitung jumlah sitemap
  return [
    { id: 0 },
    { id: 1 },
    // ...
  ]
}

export default async function sitemap({ id }) {
  // Ambil data untuk sitemap dengan ID ini
  const routes = await getRoutes(id)
  
  return routes.map((route) => ({
    url: \`https://example.com\${route.path}\`,
    lastModified: route.updatedAt,
  }))
}`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {sitemapGenerated && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Status Sitemap</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert variant="success" className="border-green-500 bg-green-50 text-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertTitle>Sitemap Berhasil Dibuat</AlertTitle>
                  <AlertDescription>
                    Sitemap Anda telah berhasil dibuat dan tersedia di:
                    <div className="mt-2 font-mono text-xs bg-muted p-2 rounded">
                      https://yourdomain.com/sitemap.xml
                    </div>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
