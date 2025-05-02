import { PrismaClient } from '@prisma/client'
import { hashPassword } from "@/lib/auth"
import { categories, products } from './data/products.js'
import { pages } from './data/pages'
import { shippingMethods } from './data/shipping.js'
import { paymentMethods } from './data/payment.js'
import { generateArticleSchema, generateFAQSchema, generateProductSchema } from '@/lib/seo-utils.js'
import { analyses } from './data/analyses.js'

const prisma = new PrismaClient()

// Sample user data
const users = [
  {
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
  },
]

async function main() {
  console.log("🌱 Starting seeding...")

  // Clean up existing data
  console.log("🧹 Cleaning up existing data...")
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.shippingMethod.deleteMany({})
  await prisma.paymentMethod.deleteMany({})
  
  await prisma.analysis.deleteMany({})
  await prisma.schemaMarkup.deleteMany({})
  await prisma.redirect.deleteMany({})
  await prisma.page.deleteMany({})

  // Create users
  for (const user of users) {
    const hashedPassword = await hashPassword(user.password)

    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    })
  }

  // Seed categories
  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category.name,
        slug: slugify(category.name),
        description:category.description
      }
    })
  }

  // Seed products
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: slugify(product.name),
        description: product.description,
        weight: product.weight,
        price: product.price,
        image: product.image,
        categoryId: product.category,
        stock: product.stock,
        rating: product.rating,
        // reviews: product.reviews,
        featured: product.featured
      }
    })
  }
  
  // Seed shipping methods
  for (const method of shippingMethods) {
    await prisma.shippingMethod.create({
      data: {
        id: method.id,
        name: method.name,
        price: method.price,
        estimated: method.estimated
      }
    })
  }
  
  // Seed payment methods
  for (const method of paymentMethods) {
    await prisma.paymentMethod.create({
      data: {
        id: method.id,
        name: method.name,
        icon: method.icon
      }
    })
  }
  // Create pages
  console.log("📄 Creating pages...")
  for (const page of pages) {
    await prisma.page.create({
      data: {
        path: page.path,
        title: page.title,
        description: page.description,
        keywords: page.keywords
      }
    })
  }
  // const pages = await Promise.all([
  //   prisma.page.create({
  //     data: {
  //       path: "/",
  //       title: "Home | Next.js SEO Analyzer",
  //       description:
  //         "A comprehensive SEO tool for Next.js applications to improve your search engine rankings and visibility.",
  //       keywords: "seo, next.js, analyzer, search engine optimization",
  //     },
  //   }),
  //   prisma.page.create({
  //     data: {
  //       path: "/about",
  //       title: "About Us | Next.js SEO Analyzer",
  //       description: "Learn more about our SEO analysis tools and how they can help improve your website visibility.",
  //       keywords: "about, seo tools, next.js seo",
  //     },
  //   }),
  //   prisma.page.create({
  //     data: {
  //       path: "/blog",
  //       title: "Blog | Next.js SEO Analyzer",
  //       description: "Read our latest articles about SEO best practices and Next.js optimization techniques.",
  //       keywords: "blog, seo tips, next.js optimization",
  //     },
  //   }),
  //   prisma.page.create({
  //     data: {
  //       path: "/contact",
  //       title: "Contact | Next.js SEO Analyzer",
  //       description: "Get in touch with our team for any questions about our SEO tools.",
  //       keywords: "contact, support, help",
  //     },
  //   }),
  //   prisma.page.create({
  //     data: {
  //       path: "/features",
  //       title: "Features | Next.js SEO Analyzer",
  //       // Intentionally missing description to test UI handling
  //       keywords: "features, seo tools, functionality",
  //     },
  //   }),
  //   prisma.page.create({
  //     data: {
  //       path: "/pricing",
  //       title: "Pricing | Next.js SEO Analyzer",
  //       description: "Affordable plans for businesses of all sizes. Boost your SEO performance today.",
  //       keywords: "pricing, plans, subscription",
  //     },
  //   }),
  //   prisma.page.create({
  //     data: {
  //       path: "/blog/seo-basics",
  //       title: "SEO Basics: Getting Started | Blog",
  //       description: "Learn the fundamentals of SEO and how to implement them in your Next.js application.",
  //       keywords: "seo basics, beginners guide, fundamentals",
  //     },
  //   }),
  //   prisma.page.create({
  //     data: {
  //       path: "/blog/next-js-performance",
  //       title: "Optimizing Next.js Performance | Blog",
  //       description: "Tips and tricks to improve the performance of your Next.js application for better SEO.",
  //       keywords: "next.js, performance, optimization",
  //     },
  //   }),
  // ])

  console.log(`✅ Created ${pages.length} pages`)

  // Create analyses
  console.log("🔍 Creating analyses...")
  const pagesData = await prisma.page.findMany()
  for (const [index, analyse] of analyses.entries()) {
    await prisma.analysis.create({
      data: {
        pageId: pagesData[index].id,
        content: analyse.content,
        focusKeyphrase: analyse.focusKeyphrase,
        seoScore: analyse.seoScore,
        readabilityScore: analyse.readabilityScore
      }
    })
  }

  console.log(`✅ Created ${analyses.length} analyses`)

  // Create redirects
  console.log("↪️ Creating redirects...")
  const redirects = await Promise.all([
    prisma.redirect.create({
      data: {
        source: "/old-home",
        destination: "/",
        permanent: true,
      },
    }),
    prisma.redirect.create({
      data: {
        source: "/articles",
        destination: "/blog",
        permanent: true,
      },
    }),
    prisma.redirect.create({
      data: {
        source: "/get-in-touch",
        destination: "/contact",
        permanent: false,
      },
    }),
    prisma.redirect.create({
      data: {
        source: "/old-blog/seo-tips",
        destination: "/blog/seo-basics",
        permanent: true,
      },
    }),
  ])

  console.log(`✅ Created ${redirects.length} redirects`)

  // Create schema markup
  console.log("🔖 Creating schema markup...")

  // Article schema
  const articleSchemaData = JSON.parse(
    generateArticleSchema({
      title: "SEO Basics: Getting Started",
      description: "Learn the fundamentals of SEO and how to implement them in your Next.js application.",
      author: "SEO Expert",
      datePublished: new Date().toISOString().split("T")[0],
      imageUrl: "https://example.com/images/seo-basics.jpg",
      url: "https://example.com/blog/seo-basics",
    }),
  )

  // Product schema
  const productSchemaData = JSON.parse(
    generateProductSchema({
      name: "Next.js SEO Analyzer Pro",
      description: "Advanced SEO analysis tool for Next.js applications",
      price: 49.99,
      currency: "USD",
      imageUrl: "https://example.com/images/product.jpg",
      url: "https://example.com/pricing",
      availability: "InStock",
    }),
  )

  // FAQ schema
  const faqSchemaData = JSON.parse(
    generateFAQSchema([
      {
        question: "What is Next.js SEO Analyzer?",
        answer: "Next.js SEO Analyzer is a tool that helps you optimize your Next.js applications for search engines.",
      },
      {
        question: "How does it work?",
        answer: "It analyzes your pages, provides recommendations, and helps you implement SEO best practices.",
      },
      {
        question: "Is it compatible with Next.js 14?",
        answer: "Yes, it is fully compatible with Next.js 14 and supports the App Router.",
      },
    ]),
  )

  const schemas = await Promise.all([
    prisma.schemaMarkup.create({
      data: {
        pageId: pagesData[6].id,
        type: "Article",
        data: articleSchemaData,
      },
    }),
    prisma.schemaMarkup.create({
      data: {
        pageId: pagesData[5].id,
        type: "Product",
        data: productSchemaData,
      },
    }),
    prisma.schemaMarkup.create({
      data: {
        pageId: pagesData[0].id,
        type: "FAQPage",
        data: faqSchemaData,
      },
    }),
    prisma.schemaMarkup.create({
      data: {
        pageId: null, // Test schema without a page
        type: "WebSite",
        data: {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Next.js SEO Analyzer",
          url: "https://example.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://example.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        },
      },
    }),
  ])

  console.log(`✅ Created ${schemas.length} schema markup entries`)

  // Create or update sitemap config
  console.log("🗺️ Setting up sitemap config...")

  // Check if sitemap config exists
  const existingConfig = await prisma.$queryRaw`
    SELECT * FROM "SitemapConfig" WHERE id = 'default' LIMIT 1
  `

  if (Array.isArray(existingConfig) && existingConfig.length === 0) {
    // Create the table if it doesn't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "SitemapConfig" (
        "id" TEXT PRIMARY KEY,
        "enabled" BOOLEAN DEFAULT TRUE,
        "excludedPaths" TEXT DEFAULT '',
        "lastGenerated" TIMESTAMP WITH TIME ZONE,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Insert default config
    await prisma.$executeRaw`
      INSERT INTO "SitemapConfig" ("id", "enabled", "excludedPaths")
      VALUES ('default', TRUE, '/admin/*
/private/*')
    `

    console.log("✅ Created sitemap config")
  } else {
    console.log("ℹ️ Sitemap config already exists")
  }
  console.log("🌱 Seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}