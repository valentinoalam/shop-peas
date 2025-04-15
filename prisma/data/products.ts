export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 40-hour battery life.",
    price: 249.99,
    image: "/placeholder.svg",
    category: "Electronics",
    stock: 25,
    rating: 4.8,
    reviews: 120,
    featured: true
  },
  {
    id: "2",
    name: "Smartwatch Pro",
    description: "Advanced smartwatch with health tracking, GPS, and water resistance.",
    price: 199.99,
    image: "/placeholder.svg",
    category: "Electronics",
    stock: 15,
    rating: 4.5,
    reviews: 85,
    featured: true
  },
  {
    id: "3",
    name: "Digital Camera",
    description: "Professional-grade digital camera with 24MP sensor and 4K video recording.",
    price: 599.99,
    image: "/placeholder.svg",
    category: "Electronics",
    stock: 10,
    rating: 4.7,
    reviews: 65,
    featured: false
  },
  {
    id: "4",
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection.",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Accessories",
    stock: 50,
    rating: 4.6,
    reviews: 210,
    featured: true
  },
  {
    id: "5",
    name: "Running Shoes",
    description: "Lightweight running shoes with responsive cushioning.",
    price: 129.99,
    image: "/placeholder.svg",
    category: "Footwear",
    stock: 30,
    rating: 4.4,
    reviews: 95,
    featured: false
  },
  {
    id: "6",
    name: "Backpack",
    description: "Durable backpack with laptop compartment and anti-theft pockets.",
    price: 79.99,
    image: "/placeholder.svg",
    category: "Accessories",
    stock: 40,
    rating: 4.3,
    reviews: 75,
    featured: false
  },
  {
    id: "7",
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe and multiple brewing options.",
    price: 149.99,
    image: "/placeholder.svg",
    category: "Home",
    stock: 20,
    rating: 4.5,
    reviews: 110,
    featured: true
  },
  {
    id: "8",
    name: "Yoga Mat",
    description: "Non-slip yoga mat made from eco-friendly materials.",
    price: 39.99,
    image: "/placeholder.svg",
    category: "Fitness",
    stock: 60,
    rating: 4.2,
    reviews: 150,
    featured: false
  },
  {
    id: "9",
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360° sound and 24-hour battery life.",
    price: 89.99,
    image: "/placeholder.svg",
    category: "Electronics",
    stock: 35,
    rating: 4.4,
    reviews: 130,
    featured: false
  },
  {
    id: "10",
    name: "Desk Lamp",
    description: "Adjustable desk lamp with multiple brightness levels and USB charging port.",
    price: 59.99,
    image: "/placeholder.svg",
    category: "Home",
    stock: 45,
    rating: 4.1,
    reviews: 70,
    featured: false
  },
  {
    id: "11",
    name: "Water Bottle",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours.",
    price: 34.99,
    image: "/placeholder.svg",
    category: "Fitness",
    stock: 100,
    rating: 4.6,
    reviews: 180,
    featured: false
  },
  {
    id: "12",
    name: "Sunglasses",
    description: "Polarized sunglasses with UV protection and durable frames.",
    price: 89.99,
    image: "/placeholder.svg",
    category: "Accessories",
    stock: 30,
    rating: 4.3,
    reviews: 95,
    featured: true
  }
];

export const categories = Array.from(new Set(products.map(product => product.category)));

export const priceRanges = [
  { min: 0, max: 50, label: "Under $50" },
  { min: 50, max: 100, label: "$50 - $100" },
  { min: 100, max: 200, label: "$100 - $200" },
  { min: 200, max: Infinity, label: "$200+" }
];

export const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" }
];