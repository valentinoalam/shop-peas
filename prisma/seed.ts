import { PrismaClient } from '@prisma/client'
import { categories, products } from './data/products.js'
import { shippingMethods } from './data/shipping.js'
import { paymentMethods } from './data/payment.js'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.shippingMethod.deleteMany({})
  await prisma.paymentMethod.deleteMany({})
  
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
  
  console.log('Database has been seeded!')
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