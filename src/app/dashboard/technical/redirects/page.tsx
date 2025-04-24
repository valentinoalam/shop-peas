"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Plus, Trash2, Info } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RedirectManager() {
  const [redirects, setRedirects] = useState([])
  const [newSource, setNewSource] = useState("")
  const [newDestination, setNewDestination] = useState("")
  const [newPermanent, setNewPermanent] = useState("true")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addingRedirect, setAddingRedirect] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(null)

  // Fetch redirects on component mount
  useEffect(() => {
    fetchRedirects()
  }, [])

  // Fetch redirects from API
  const fetchRedirects = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/redirects")
      if (!response.ok) {
        throw new Error("Failed to fetch redirects")
      }
      const data = await response.json()
      setRedirects(data)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching redirects:", err)
      setError(err.message)
      setLoading(false)
    }
  }

  // Add new redirect
  const addRedirect = async () => {
    if (!newSource || !newDestination) {
      setError("Source and destination are required")
      return
    }

    try {
      setAddingRedirect(true)
      setError(null)

      const response = await fetch("/api/redirects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: newSource,
          destination: newDestination,
          permanent: newPermanent === "true",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add redirect")
      }

      // Reset form and refresh redirects
      setNewSource("")
      setNewDestination("")
      setNewPermanent("true")
      await fetchRedirects()
      setAddingRedirect(false)
    } catch (err) {
      console.error("Error adding redirect:", err)
      setError(err.message)
      setAddingRedirect(false)
    }
  }

  // Remove redirect
  const removeRedirect = async (id) => {
    try {
      setDeleteLoading(id)

      const response = await fetch(`/api/redirects/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete redirect")
      }

      // Refresh redirects
      await fetchRedirects()
      setDeleteLoading(null)
    } catch (err) {
      console.error("Error deleting redirect:", err)
      setError(err.message)
      setDeleteLoading(null)
    }
  }

  if (loading && redirects.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Pengelola Redirect</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Memuat redirect...</p>
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
        <h1 className="text-3xl font-bold">Pengelola Redirect</h1>
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
              <CardTitle>Daftar Redirect</CardTitle>
              <CardDescription>Kelola redirect untuk situs Anda</CardDescription>
            </CardHeader>
            <CardContent>
              {redirects.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Belum ada redirect. Tambahkan redirect pertama Anda.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sumber</TableHead>
                      <TableHead>Tujuan</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead className="w-[100px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {redirects.map((redirect) => (
                      <TableRow key={redirect.id}>
                        <TableCell className="font-mono text-sm">{redirect.source}</TableCell>
                        <TableCell className="font-mono text-sm">{redirect.destination}</TableCell>
                        <TableCell>{redirect.permanent ? "301 (Permanen)" : "302 (Sementara)"}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeRedirect(redirect.id)}
                            disabled={deleteLoading === redirect.id}
                          >
                            {deleteLoading === redirect.id ? (
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
              <CardTitle>Tambah Redirect Baru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source">URL Sumber</Label>
                  <Input
                    id="source"
                    placeholder="/old-page"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">URL Tujuan</Label>
                  <Input
                    id="destination"
                    placeholder="/new-page"
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="permanent">Tipe Redirect</Label>
                <Select value={newPermanent} onValueChange={setNewPermanent}>
                  <SelectTrigger id="permanent">
                    <SelectValue placeholder="Pilih tipe redirect" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">301 - Permanen</SelectItem>
                    <SelectItem value="false">302 - Sementara</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={addRedirect} disabled={addingRedirect}>
                {addingRedirect ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Menambahkan...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Redirect
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
              <CardDescription>Cara mengimplementasikan redirect di Next.js 14+</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Tentang Redirect</AlertTitle>
                <AlertDescription>
                  Next.js mendukung redirect melalui konfigurasi di next.config.js atau melalui middleware.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <p className="text-sm font-medium">Menggunakan next.config.js:</p>
                <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                  {`// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/shop',
        permanent: false,
      },
    ]
  },
}`}
                </pre>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Menggunakan middleware:</p>
                <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                  {`// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Redirect /old-blog ke /blog
  if (request.nextUrl.pathname === '/old-blog') {
    return NextResponse.redirect(
      new URL('/blog', request.url),
      { status: 301 }
    )
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
