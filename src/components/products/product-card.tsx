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
//       <Link to={`/products/${product.id}`}>
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
//         <Link to={`/products/${product.id}`}>
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
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ShoppingCart, Star } from "lucide-react"
// import { formatCurrency } from '@/lib/utils'
// import Link from "next/link"
// import { useCart } from "@/context/cart-context"
// import Image from 'next/image'
// import { Product } from "@prisma/client"
// interface ProductCardProps {
//   product: Product
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   const { addToCart } = useCart()
//   return (
//     <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
//       <Link href={`/products/${product.id}`}>
//           <div className="relative aspect-square overflow-hidden">
//             {product.image && (
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 fill
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//               />
//             )}
//             {product.featured && (
//               <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
//                 Featured
//               </span>
//             )}
//             {product.discountPercentage && product.discountPercentage > 0 && (
//               <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
//                 {product.discountPercentage}% OFF
//               </div>
//             )}
//           </div>
//       </Link>
      
//       <CardContent className="p-4">
//         <div className="text-sm text-gray-500 mb-1">{product.category}</div>
//         <Link href={`/products/${product.id}`}>
//             <h3 className="font-medium text-foreground hover:text-primary mb-1 line-clamp-1">
//               {product.name}
//             </h3>
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
        
//         <div className="flex items-center mb-2">
//           <div className="flex items-center">
//             {Array(5).fill(0).map((_, i) => (
//               <Star 
//                 key={i}
//                 size={14}
//                 className={i < Math.round(product.rating) 
//                   ? "fill-yellow-400 text-yellow-400" 
//                   : "fill-gray-200 text-gray-200"
//                 }
//               />
//             ))}
//           </div>
//           <span className="text-xs text-gray-500 ml-2">
//             ({product.reviews})
//           </span>
//         </div>
        
//         <div className="flex items-center justify-between">
//           <div>
//             {product.discountPercentage && product.discountPercentage > 0 ? (
//               <div className="flex items-center gap-2">
//                 <span className="font-medium text-gray-900">
//                   {formatCurrency(product.price * (1 - product.discountPercentage / 100))}
//                 </span>
//                 <span className="text-xs text-gray-500 line-through">
//                   {formatCurrency(product.price)}
//                 </span>
//               </div>
//             ) : (
//               <span className="font-medium text-gray-900">
//                 {formatCurrency(product.price)}
//               </span>
//             )}
//           </div>
          
//           <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
//             {product.category}
//           </div>
//         </div>
//       </CardContent>
      
//       <CardFooter className="p-4 pt-0">
//         <Button 
//           className="w-full" 
//           onClick={(e) => {
//             e.preventDefault()
//             addToCart(product)
//           }}
//         >
//           <ShoppingCart className="h-4 w-4 mr-2" />
//           Add to Cart
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }

// export default ProductCard

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import { formatCurrency } from '@/lib/utils'
import Link from "next/link"
import { useCart } from "@/context/cart-context" // Assuming you have this context
import { Prisma } from "@prisma/client" // Import Prisma namespace for types
import ImageWithFallback from "../image";
/**
 * // Import Category dan Review types karena kita akan mengakses relasi tersebut
import { Product, Category, Review, Rating } from "@prisma/client"

// Perluas tipe Product untuk mencakup relasi yang di-include saat fetching data
interface ProductWithRelations extends Product {
  category: Category; // Mengasumsikan category selalu disertakan
  reviews: Review[];   // Mengasumsikan reviews selalu disertakan (untuk menghitung)
  // Jika Anda menggunakan _count di query Prisma, sesuaikan interface ini:
  // _count?: {
  //   reviews: number;
  //   ratings: number;
  // }
}
 */
// Define a more specific type for the product including relations
// Adjust includes based on your actual Prisma query
type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    category: true;
    reviews: { select: { id: true } }; // Include reviews just for counting
    // Include other relations if needed by the card, e.g., ratings if 'rating' field isn't populated
  }
}>

interface ProductCardProps {
  product: ProductWithDetails // ProductWithRelations
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Fallback in case category is somehow not loaded (though it should be with the type)
  const categoryName = product.category?.name ?? 'Uncategorized';
  // Calculate review count from the included relation
  const reviewCount = product.reviews?.length ?? 0;
  // Use the pre-calculated average rating, default to 0 if null/undefined
  const averageRating = product.rating ?? 0;

  const { addToCart } = useCart(); // Assuming useCart context hook

  const calculateDiscountedPrice = (price: number, discount?: number | null): number => {
    if (discount && discount > 0) {
      return price * (1 - discount / 100);
    }
    return price;
  };

  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          {product.image ? (
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" // Adjust sizes as needed
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              priority={product.featured} // Prioritize loading featured images
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.featured && (
              <span className="bg-blue-600 text-primary-foreground text-xs px-2 py-0.5 rounded-full shadow">
                Featured
              </span>
            )}
            {hasDiscount && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>
      </Link>

      <CardContent className="p-4 flex-grow flex flex-col">
        {/* Category */}
        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
          {categoryName}
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.id}`} className="block mb-2">
          <h3 className="font-medium text-foreground hover:text-primary line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3 mt-auto pt-2"> {/* mt-auto pushes rating/price down */}
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300" // Use a neutral fill for empty stars
                  }
                />
              ))}
          </div>
          <span className="font-medium text-foreground">{averageRating.toFixed(1)}</span>
          <span>({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-lg text-foreground">
            {formatCurrency(discountedPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t mt-auto"> {/* Ensure footer is at the bottom */}
        <Button
          variant="outline"
          className="w-full"
          onClick={(e) => {
            e.preventDefault(); // Prevent link navigation if card is wrapped in Link
            // Ensure you pass the correct product structure if addToCart expects it
            // const productToAdd = {
            //   id: product.id,
            //   name: product.name,
            //   price: discountedPrice, // Pass discounted price to cart
            //   image: product.image,
            //   // Add any other fields needed by your cart context
            // };
            addToCart(product, 1); // Pass product and quantity
          }}
          disabled={product.stock <= 0} // Disable button if out of stock
        >
           {product.stock > 0 ? (
             <>
               <ShoppingCart className="h-4 w-4 mr-2" />
               Add to Cart
             </>
           ) : (
             "Out of Stock"
           )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;