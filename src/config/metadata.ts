import type { Metadata } from 'next'
 
interface MetadataConfig {
    [key: string]: Metadata
  }

export const METADATA: MetadataConfig = {
  global: {
      title: {
        template: '%s | E-Commerce Store',
        default: 'E-Commerce Store | Home', // Used when a page doesn't provide its own title
      },
      category: 'web agency',
      description: 'Welcome to our e-commerce store',
      keywords: ['web design agency', 'website development', 'UI/UX design', 'responsive web design', 'custom website', 'digital agency'],
      icons: {
        icon: [
          { url: '/favicon.ico' },
          { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
          { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
          { url: '/icon.png', sizes: '96x96', type: 'image/png' },
          { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
          { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
          
        ],
        apple: [
          { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
        ],
      },
      manifest: '/site.webmanifest',
      // Open Graph protocol for social media sharing
      openGraph: {
        title: "TinoKarya - Creative Digital Agency",
        description: "Creative web developer creating stunning, high-performance websites that drive results.  Build your website differently good.",
        url: "https://tinokarya.com/",
        siteName: "TinoKarya",
        images: [
          {
            url: `/web/Untitled.png`,
            width: 1200,
            height: 630,
            alt: "Descriptive alt text for your OG image",
          },
        ],
        locale: "id_ID",
        type: "website",
      },
      // Twitter Card
      twitter: {
        card: "summary_large_image",
        title: "Tino Karya | Creative Web Design & Development Agency",
        description: "Elevate your brand with stunning websites that perform. See how our design expertise can transform your online presence.",
        creator: "@tinokarya",
        images: [`${process.env.NEXT_PUBLIC_APP_URL}/twitter-image.jpg`],
      },
      formatDetection: {
          email: false,
          address: false,
          telephone: false,
      },
      // Robots directives
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      facebook: {
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string,
      },
      // Verification for search console
      verification: {
        google: "vSFYaEggfnytcEL9EtcnsbdMc8ch0HdGRss9q61PZVY",
        yandex: "5764870d5ade92ea",
      },
      other: {
        "msvalidate.01": 'CA30825DF3B8624FAC725A8A6C9862AF',
        "p:domain_verify": '72cd7ffd6979d8a1b6796fdd260040f4',

      },
    
      // App link metadata (if applicable)
      // appLinks: {
      //   ios: {
      //     url: "https://yourapp.com/ios",
      //     appStoreId: "123456789",
      //   },
      //   android: {
      //     package: "com.yourapp.android",
      //     url: "https://yourapp.com/android",
      //   },
      // },
    
      // Additional metadata
      authors: [{ 
          name: "Valentino Alam", 
          url: "https://tinokarya.com" }],
      creator: 'Tino Karya Team',
      publisher: 'Tino Karya Agency',
  },
  default: {
    // Basic metadata
    title: "Web Design & Development Agency",
    // 150-160 characters. Include relevant keywords naturally while focusing on value proposition
    description: "Elevate your brand with stunning, conversion-focused websites. We build stunning websites and applications that drive results.",
    
    // Additional metadata
    keywords: [
      'web design agency', 
      'digital agency',
      'web design',
      'professional website design', 
      'web development',
      'custom web development', 
      'responsive design', 
      'UI/UX design', 
      'branding agency', 
      'creative agency',
      'ecommerce websites'
    ],
  
    // Open Graph protocol for social media sharing
    // openGraph: {
    //   title: "Studio Design | Award-Winning Web Design & Development Agency",
    //   description: "Partner with a creative team that understands your vision. Beautiful, functional websites that engage visitors and drive business growth.",
    //   url: "https://tinokarya.com/", //"https://tinokarya.com/landing-page"
    //   siteName: "Tino Karya Web Agency",
    //   images: [
    //     {
    //       url: "https://tinokarya.com/og-image.jpg",
    //       width: 1200,
    //       height: 630,
    //       alt: "Studio Design - Web Design Excellence",
    //     },
    //   ],
    //   locale: "id_ID",
    //   type: "website",
    // },
      
    // Landing page specific Twitter Card
    // twitter: {
    //   title: 'Studio Design | Award-Winning Web Design Agency',
    //   description: 'Websites that wow. Designs that convert. See how our agency can transform your online presence.',
    //   images: ['/images/twitter-agency-hero.jpg'],
    // },
  
    // Canonical URL 
    alternates: {
      canonical: "https://tinokarya.com/",
    },
  },
  about: {
      title: "About Us | My Awesome App",
      description: "Learn about our mission and vision",
      keywords: ["about", "company", "history"],
  }
  // Add more page entries
};