import { PrismaClient } from '@prisma/client'
import { products } from './data/products.js'
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
  
  // Seed products
  for (const product of products) {
    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        stock: product.stock,
        rating: product.rating,
        reviews: product.reviews,
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
