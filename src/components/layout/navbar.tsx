'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-shop-primary">
            ShopEase
          </Link>
          
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex relative w-1/3">
            <Input
              type="text"
              placeholder="Search products..."
              className="pr-10"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-shop-primary font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-shop-primary font-medium">
              Products
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-shop-primary font-medium">
              Blog
            </Link>
            <ModeToggle />
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-shop-primary" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-shop-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-shop-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <div className="flex items-center mb-4">
              <Input
                type="text"
                placeholder="Search products..."
                className="pr-10"
              />
              <Search className="absolute right-7 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-shop-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-shop-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
