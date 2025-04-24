import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma

// API functions
export async function getCategories() {
    return prisma.category.findMany();
  }
  
  export async function getCategory(slug: string) {
    return prisma.category.findUnique({
      where: { slug }
    });
  }
  
  export async function getProductsByCategory(categorySlug: string) {
    return prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug
        }
      },
      include: {
        category: true
      }
    });
  }
  
  export async function getAllProducts() {
    return prisma.product.findMany({
      include: {
        category: true
      }
    });
  }
  
  export async function getProduct(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true
      }
    });
  }
  
  // For generating static params
  export async function getAllCategorySlugs() {
    const categories = await prisma.category.findMany({
      select: { slug: true }
    });
    
    return categories;
  }