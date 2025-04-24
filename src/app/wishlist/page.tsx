// import { Skeleton } from '@/components/ui/skeleton'
// import { Heart } from 'lucide-react'
// import type { GetStaticPropsContext } from 'next'
// src/pages/Wishlist.jsx
"use client"
import { useState, useEffect } from 'react';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductWithDetails } from '@/components/products/product-details';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<ProductWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the user's wishlist items
    const fetchWishlist = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be a fetch to your API
        const response = await fetch('/api/user/wishlist');
        
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }
        
        const data = await response.json();
        setWishlistItems(data);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId: string) => {
    try {
      // In a real app, this would be a fetch to your API
      const response = await fetch(`/api/user/wishlist/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from wishlist');
      }

      // Remove the item from local state
      setWishlistItems(wishlistItems.filter(item => item.id !== productId));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      // In a real app, this would be a fetch to your API
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      // Show success message or update UI
      alert('Item added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Heart className="text-red-500 mr-2" size={24} />
        <h1 className="text-2xl font-bold">My Wishlist</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600 mb-4">Your wishlist is empty</p>
          <Link 
            href="/products" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-gray-200">
                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No image available
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.category.name}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  {product.stock > 0 ? (
                    <span className="text-green-600 text-sm">In Stock</span>
                  ) : (
                    <span className="text-red-600 text-sm">Out of Stock</span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={product.stock <= 0}
                    className={`flex items-center justify-center px-3 py-2 rounded text-sm flex-1 ${
                      product.stock > 0
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={16} className="mr-1" />
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}