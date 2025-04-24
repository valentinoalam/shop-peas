"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Copy, Check, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SchemaGenerator() {
  const [pages, setPages] = useState([])
  const [selectedPageId, setSelectedPageId] = useState("")
  const [schemaType, setSchemaType] = useState("article")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [author, setAuthor] = useState("")
  const [datePublished, setDatePublished] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [url, setUrl] = useState("")
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [generatingSchema, setGeneratingSchema] = useState(false)

  // Fetch pages on component mount
  useEffect(() => {
    async function fetchPages() {
      try {
        setLoading(true)
        const response = await fetch("/api/pages")
        if (!response.ok) {
          throw new Error("Failed to fetch pages")
        }
        const data = await response.json()
        setPages(data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching pages:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchPages()
  }, [])

  // Handle page selection
  const handlePageChange = async (pageId) => {
    setSelectedPageId(pageId)

    if (!pageId) {
      setTitle("")
      setDescription("")
      setUrl("")
      return
    }

    try {
      const response = await fetch(`/api/pages/${pageId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch page details")
      }
      const page = await response.json()

      setTitle(page.title || "")
      setDescription(page.description || "")
      setUrl(`https://yourdomain.com${page.path}`)
    } catch (err) {
      console.error("Error fetching page details:", err)
      setError(err.message)
    }
  }

  const generateSchema = async () => {
    if (!schemaType) {
      setError("Schema type is required")
      return
    }

    try {
      setGeneratingSchema(true)
      setError(null)

      // In a real app, you'd save this to the database
      // For now, we'll just simulate the API call

      const schemaData = {
        pageId: selectedPageId,
        type: schemaType,
        data: {
          "@context": "https://schema.org",
          "@type": schemaType.charAt(0).toUpperCase() + schemaType.slice(1),
          headline: title,
          description: description,
          author: {
            "@type": "Person",
            name: author,
          },
          datePublished: datePublished,
          image: imageUrl,
          url: url,
        },
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setGenerated(true)
      setGeneratingSchema(false)
    } catch (err) {
      console.error("Error generating schema:", err)
      setError(err.message)
      setGeneratingSchema(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSchema)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Generate schema markup
  const generatedSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "${schemaType.charAt(0).toUpperCase() + schemaType.slice(1)}",
  "headline": "${title}",
  "description": "${description}",
  "author": {
    "@type": "Person",
    "name": "${author}"
  },
  "datePublished": "${datePublished}",
  "image": "${imageUrl}",
  "url": "${url}"
}
</script>`

  if (loading && pages.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Generator Schema</h1>
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
        <h1 className="text-3xl font-bold">Generator Schema</h1>
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
              <CardTitle>Buat Schema Markup</CardTitle>
              <CardDescription>Buat data terstruktur untuk meningkatkan pemahaman mesin pencari</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="page-select">Pilih Halaman (Opsional)</Label>
                <Select value={selectedPageId} onValueChange={handlePageChange}>
                  <SelectTrigger id="page-select">
                    <SelectValue placeholder="Pilih halaman untuk schema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Tidak ada halaman</SelectItem>
                    {pages.map((page) => (
                      <SelectItem key={page.id} value={page.id}>
                        {page.path}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schema-type">Tipe Schema</Label>
                <Select value={schemaType} onValueChange={setSchemaType}>
                  <SelectTrigger id="schema-type">
                    <SelectValue placeholder="Pilih tipe schema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                    <SelectItem value="localBusiness">Local Business</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  placeholder="Judul artikel atau produk"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  placeholder="Deskripsi singkat"
                  className="resize-none h-20"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Penulis</Label>
                <Input
                  id="author"
                  placeholder="Nama penulis"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-published">Tanggal Publikasi</Label>
                <Input
                  id="date-published"
                  type="date"
                  value={datePublished}
                  onChange={(e) => setDatePublished(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image-url">URL Gambar</Label>
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL Halaman</Label>
                <Input
                  id="url"
                  placeholder="https://example.com/page"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={generateSchema} disabled={generatingSchema}>
                {generatingSchema ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  "Generate Schema"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Schema yang Dihasilkan</CardTitle>
              <CardDescription>Kode JSON-LD untuk ditambahkan ke halaman Anda</CardDescription>
            </CardHeader>
            <CardContent>
              {generated ? (
                <div className="space-y-4">
                  <pre className="bg-muted p-4 rounded-md text-xs overflow-auto whitespace-pre-wrap">
                    {generatedSchema}
                  </pre>
                  <Button variant="outline" className="w-full" onClick={copyToClipboard}>
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Disalin!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Salin ke Clipboard
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Isi formulir dan klik "Generate Schema" untuk melihat hasilnya
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Implementasi di Next.js</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="metadata">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="metadata">Metadata API</TabsTrigger>
                  <TabsTrigger value="script">Script Tag</TabsTrigger>
                </TabsList>

                <TabsContent value="metadata" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-sm">Gunakan Metadata API Next.js untuk menambahkan schema:</p>
                    <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                      {`// app/page.js atau layout.js
export const metadata = {
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': 'Judul Artikel',
      // ...properti lainnya
    }),
  },
}`}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="script" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-sm">Atau gunakan komponen Script:</p>
                    <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                      {`// app/layout.js
import Script from 'next/script'

export default function Layout({ children }) {
  return (
    <html>
      <head>
        <Script
          id="schema-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: \`{
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Judul Artikel",
              // ...properti lainnya
            }\`
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
