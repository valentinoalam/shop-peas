// import "@/styles/globals.css";

// import { Viewport } from "next";
// import { generateMetaData } from '@/lib/metadata';
// import { JsonLd, createOrganizationSchema, createWebsiteSchema } from "@/schema"
// import Head from "next/head";
// import { Providers } from "./providers";

// export async function generateMetadata() {
//   return generateMetaData();
// }

// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
//   themeColor: 'white',
//   // interactiveWidget: 'resizes-visual',
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   // Organization schema that applies to the whole site
//   const organizationSchema = createOrganizationSchema({
//     name: "TinoKarya",
//     url: "https://tinokarya.com",
//     logo: "https://tinokarya.com/logo.png",
//     sameAs: [
//       "https://twitter.com/tonyfranky",
//       "https://facebook.com/yourcompany",
//       "https://linkedin.com/company/yourcompany",
//     ],
//     contactPoint: {
//       telephone: "+1-555-555-5555",
//       contactType: "customer service",
//     },
//   })

//   // Website schema
//   const websiteSchema = createWebsiteSchema({
//     name: "Karya Tino",
//     url: "https://tinokarya.com",
//     searchUrl: "https://tinokarya.com/search",
//   })
  
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <Head>
//         {/* Add global schema markup */}
//         <JsonLd schema={organizationSchema} />
//         <JsonLd schema={websiteSchema} />
//       </Head>
//       <body suppressHydrationWarning
//         className="relative antialiased flex flex-col"
//       >
//         <Providers>{children}</Providers>
//       </body>
//     </html>
//   );
// }

import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import "@/styles/globals.css"
import { Providers } from "./providers";
import { generateMetaData } from "@/lib/metadata"
import { Viewport } from "next"
import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"

export async function generateMetadata() {
  return generateMetaData();
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: 'white',
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className="relative antialiased flex flex-col min-h-screen"
      >
        <Providers>
          <Toaster />
          <Sonner />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>

  )
}
