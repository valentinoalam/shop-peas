// import { Product } from "@/data/products";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, Star } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useCart } from "@/context/CartContext";

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   const { addToCart } = useCart();
  
//   return (
//     <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
//       <Link to={`/product/${product.id}`}>
//         <div className="relative aspect-square overflow-hidden">
//           <img 
//             src={product.image} 
//             alt={product.name}
//             className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//           />
//           {product.featured && (
//             <span className="absolute top-2 left-2 bg-shop-primary text-white text-xs px-2 py-1 rounded-full">
//               Featured
//             </span>
//           )}
//         </div>
//       </Link>
      
//       <CardContent className="p-4">
//         <div className="text-sm text-gray-500 mb-1">{product.category}</div>
//         <Link to={`/product/${product.id}`}>
//           <h3 className="font-medium text-gray-900 hover:text-shop-primary mb-1 line-clamp-1">
//             {product.name}
//           </h3>
//         </Link>
        
//         <div className="flex items-center mb-2">
//           <div className="flex items-center">
//             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//             <span className="ml-1 text-sm font-medium">{product.rating}</span>
//           </div>
//           <span className="mx-2 text-gray-300">|</span>
//           <span className="text-sm text-gray-500">{product.reviews} reviews</span>
//         </div>
        
//         <div className="font-semibold text-lg">${product.price.toFixed(2)}</div>
//       </CardContent>
      
//       <CardFooter className="p-4 pt-0">
//         <Button 
//           className="w-full" 
//           onClick={(e) => {
//             e.preventDefault();
//             addToCart(product);
//           }}
//         >
//           <ShoppingCart className="h-4 w-4 mr-2" />
//           Add to Cart
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default ProductCard;
'use client';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import { formatCurrency } from '@/lib/utils'
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import Image from 'next/image'
import { Product } from "@prisma/client"
interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart()
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
      <Link href={`/product/${product.id}`}>
          <div className="relative aspect-square overflow-hidden">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}
            {product.featured && (
              <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Featured
              </span>
            )}
            {product.discountPercentage && product.discountPercentage > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                {product.discountPercentage}% OFF
              </div>
            )}
          </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="text-sm text-gray-500 mb-1">{product.category}</div>
        <Link href={`/product/${product.id}`}>
            <h3 className="font-medium text-foreground hover:text-primary mb-1 line-clamp-1">
              {product.name}
            </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-sm text-gray-500">{product.reviews} reviews</span>
        </div>
        
        <div className="font-semibold text-lg">${product.price.toFixed(2)}</div>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {Array(5).fill(0).map((_, i) => (
              <Star 
                key={i}
                size={14}
                className={i < Math.round(product.rating) 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "fill-gray-200 text-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">
            ({product.reviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            {product.discountPercentage && product.discountPercentage > 0 ? (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">
                  {formatCurrency(product.price * (1 - product.discountPercentage / 100))}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  {formatCurrency(product.price)}
                </span>
              </div>
            ) : (
              <span className="font-medium text-gray-900">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          
          <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
            {product.category}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={(e) => {
            e.preventDefault()
            addToCart(product)
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard