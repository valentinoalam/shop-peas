import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, BarChart2, FileText, Globe } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Next.js SEO Analyzer</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Alat SEO komprehensif untuk aplikasi Next.js yang membantu meningkatkan peringkat dan visibilitas konten Anda
          di mesin pencari.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/dashboard">
              Mulai Analisis SEO <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Analisis Konten</CardTitle>
            <CardDescription>Analisis mendalam tentang keterbacaan dan optimasi konten Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                Analisis kata kunci fokus
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                Skor keterbacaan
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                Saran peningkatan konten
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/content">Lihat Detail</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BarChart2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Analisis Teknis</CardTitle>
            <CardDescription>Optimasi aspek teknis SEO untuk performa yang lebih baik</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                Pembuatan XML sitemap
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                Pengelolaan redirect
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                Optimasi meta tag
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/technical">Lihat Detail</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Schema Markup</CardTitle>
            <CardDescription>Tambahkan data terstruktur untuk meningkatkan pemahaman mesin pencari</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                Schema untuk artikel
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                Schema untuk produk
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                Schema untuk FAQ
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/schema">Lihat Detail</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
