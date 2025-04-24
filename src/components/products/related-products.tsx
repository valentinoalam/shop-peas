// import Link from 'next/link'
// import Image from 'next/image'
import { Product } from '@prisma/client'
import ProductCard from './product-card'

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
        //   <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
        //     <Link href={`/products/${product.id}`}>
        //       <div className="h-48 relative overflow-hidden">
        //         <Image 
        //           fill 
        //           src={product.image} 
        //           alt={product.name}
        //           className="object-cover transition-transform hover:scale-110"
        //         />
        //       </div>
        //       <div className="p-4">
        //         <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
        //         <p className="font-bold">${product.price.toFixed(2)}</p>
        //       </div>
        //     </Link>
        //   </div>
        <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}