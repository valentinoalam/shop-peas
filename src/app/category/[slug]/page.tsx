// app/category/[slug]/page.tsx
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/products/product-card';
import { unstable_cache } from 'next/cache';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const getCategoryWithProducts = unstable_cache(
  async (categorySlug: string) => {
    console.log(categorySlug)
  return prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      product: {
        // where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          reviews: {      // Needed ONLY if you calculate review count here
            select: { id: true } // Select only 'id' for counting to be efficient
         },
        }
      }
    }
  });     
})

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  if (!slug || typeof slug !== 'string') {
    notFound()
  }

  try {
    // Fetch the category and its products
    const category = await getCategoryWithProducts(slug);
    if (!category || !category.product?.length) {
      notFound();
    }
    const products = category.product;
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
        
        {category.description && (
          <p className="text-gray-600 mb-8">{category.description}</p>
        )}
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching category products:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>Failed to load category products. Please try again later.</p>
      </div>
    );
  }
}

// Generate static params for common categories at build time
export async function generateStaticParams() {
  // This would typically fetch your categories from an API or database
  const categories = [
    { slug: 'electronics' },
    { slug: 'clothing' },
    { slug: 'accessories' },
    // Add more common categories
  ];
  
  return categories;
}