"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Plus, Trash2, Info, Check, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MetaTagManagerClient() {
  const [pages, setPages] = useState([])
  const [newPath, setNewPath] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newKeywords, setNewKeywords] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addingPage, setAddingPage] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(null)

  // Fetch pages on component mount
  useEffect(() => {
    fetchPages()
  }, [])

  // Fetch pages from API
  const fetchPages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/pages')
      if (!response.ok) {
        throw new Error('Failed to fetch pages')
      }
      const data = await response.json()
      setPages(data)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching pages:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  // Add new page
  const addPage = async () => {
    if (!newPath || !newTitle) {
      setError('Path and title are required')
      return
    }
    
    try {
      setAddingPage(true)
      setError(null)
      
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: newPath,
          title: newTitle,
          description: newDescription,
          keywords: newKeywords,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add page')
      }
      
      // Reset form and refresh pages
      setNewPath("")
      setNewTitle("")
      setNewDescription("")
      setNewKeywords("")
      await fetchPages()
      setAddingPage(false)
    } catch (err) {
      console.error('Error adding page:', err)
      setError(err.message)
      setAddingPage(false)
    }
  }

  // Remove page
  const removePage = async (id) => {
    try {
      setDeleteLoading(id)
      
      const response = await fetch(`/api/pages/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete page')
      }
      
      // Refresh pages
      await fetchPages()
      setDeleteLoading(null)
    } catch (err) {
      console.error('Error deleting page:', err)
      setError(err.message)
      setDeleteLoading(null)
    }
  }

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
          <h1 className="text-3xl font-bold">Pengelola Meta Tag</h1>
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
        <h1 className="text-3xl font-bold">Pengelola Meta Tag</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Meta Tag Halaman</CardTitle>
              <CardDescription>Kelola meta tag untuk halaman di situs Anda</CardDescription>
            </CardHeader>
            <CardContent>
              {pages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Belum ada halaman. Tambahkan halaman pertama Anda.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Path</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[100px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pages.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell className="font-mono text-sm">{page.path}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{page.title}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{page.description}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removePage(page.id)}
                            disabled={deleteLoading === page.id}
                          >
                            {deleteLoading === page.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tambah Meta Tag Baru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="path">Path Halaman</Label>
                <Input id="path" placeholder="/about-us" value={newPath} onChange={(e) => setNewPath(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="About Us | My Website"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <div className="text-xs text-muted-foreground">{newTitle.length} karakter (ideal: 50-60)</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Meta Description</Label>
                <Textarea
                  id="description"
                  placeholder="Learn more about our company, our mission, and our team."
                  className="resize-none h-20"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <div className="text-xs text-muted-foreground">{newDescription.length} karakter (ideal: 120-160)</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Meta Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="about us, company, mission, team"
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={addPage} disabled={addingPage}>
                {addingPage ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Menambahkan...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Meta Tag
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Implementasi di Next.js</CardTitle>
              <CardDescription>Cara mengimplementasikan meta tag di Next.js 14+</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="static">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="static">Static</TabsTrigger>
                  <TabsTrigger value="dynamic">Dynamic</TabsTrigger>
                </TabsList>

                <TabsContent value="static" className="mt-4">
                  <div className="space-y-4">
                  <div className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Metadata Statis</AlertTitle>
                      <AlertDescription>Gunakan objek metadata untuk menentukan meta tag statis.</AlertDescription>
                    </Alert>

                    <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                      {`// app/about/page.js
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      {/* Konten halaman */}
    </div>
  )
}`}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="dynamic" className="mt-4">
                  <div className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Metadata Dinamis</AlertTitle>
                      <AlertDescription>Gunakan generateMetadata untuk meta tag dinamis.</AlertDescription>
                    </Alert>

                    <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                      {`// app/blog/[slug]/page.js
export default async function BlogPost({ 
  params 
}) {
  return (
    <div>
      <h1>Blog Post</h1>
      {/* Konten blog */}
    </div>
  )
}`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-medium">Praktik Terbaik Meta Tag</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Judul: 50-60 karakter, unik untuk setiap halaman</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Deskripsi: 120-160 karakter, informatif dan menarik</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                    <span>Keywords: Tidak sepenting dulu, tapi masih berguna untuk beberapa mesin pencari</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
