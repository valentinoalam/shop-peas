
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { Product } from "@/data/products";
// import { useToast } from "@/components/ui/use-toast";

// interface CartItem {
//   product: Product;
//   quantity: number;
// }

// interface CartContextType {
//   items: CartItem[];
//   addToCart: (product: Product, quantity?: number) => void;
//   removeFromCart: (productId: string) => void;
//   updateQuantity: (productId: string, quantity: number) => void;
//   clearCart: () => void;
//   subtotal: number;
//   itemCount: number;
//   shippingMethod: string;
//   setShippingMethod: (method: string) => void;
//   shippingCost: number;
//   paymentMethod: string;
//   setPaymentMethod: (method: string) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [shippingMethod, setShippingMethod] = useState("standard");
//   const [shippingCost, setShippingCost] = useState(5.99);
//   const [paymentMethod, setPaymentMethod] = useState("credit");
//   const { toast } = useToast();

//   // Calculate subtotal
//   const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
//   // Calculate total number of items
//   const itemCount = items.reduce((count, item) => count + item.quantity, 0);

//   // Load cart from localStorage
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       try {
//         setItems(JSON.parse(savedCart));
//       } catch (e) {
//         console.error("Error loading cart from localStorage:", e);
//       }
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(items));
//   }, [items]);

//   // Update shipping cost when shipping method or cart changes
//   useEffect(() => {
//     if (shippingMethod === "standard") {
//       // Free shipping on orders over $100
//       setShippingCost(subtotal >= 100 ? 0 : 5.99);
//     } else if (shippingMethod === "express") {
//       setShippingCost(12.99);
//     } else if (shippingMethod === "overnight") {
//       setShippingCost(24.99);
//     }
    
//     // Add extra fee for many items
//     if (itemCount > 5) {
//       setShippingCost(prev => prev + 3.99);
//     }
//   }, [shippingMethod, subtotal, itemCount]);

//   const addToCart = (product: Product, quantity = 1) => {
//     setItems(prevItems => {
//       const existingItem = prevItems.find(item => item.product.id === product.id);
      
//       if (existingItem) {
//         // Check if adding would exceed available stock
//         if (existingItem.quantity + quantity > product.stock) {
//           toast({
//             title: "Maximum stock reached",
//             description: `Sorry, only ${product.stock} items available.`,
//             variant: "destructive"
//           });
//           return prevItems.map(item => 
//             item.product.id === product.id 
//               ? { ...item, quantity: product.stock } 
//               : item
//           );
//         }

//         // Update quantity if item exists
//         toast({
//           title: "Cart updated",
//           description: `${product.name} quantity updated in your cart.`
//         });
//         return prevItems.map(item => 
//           item.product.id === product.id 
//             ? { ...item, quantity: item.quantity + quantity } 
//             : item
//         );
//       } else {
//         // Add new item if it doesn't exist
//         toast({
//           title: "Added to cart",
//           description: `${product.name} added to your cart.`
//         });
//         return [...prevItems, { product, quantity }];
//       }
//     });
//   };

//   const removeFromCart = (productId: string) => {
//     setItems(prevItems => {
//       const product = prevItems.find(item => item.product.id === productId)?.product;
//       if (product) {
//         toast({
//           title: "Removed from cart",
//           description: `${product.name} removed from your cart.`
//         });
//       }
//       return prevItems.filter(item => item.product.id !== productId);
//     });
//   };

//   const updateQuantity = (productId: string, quantity: number) => {
//     if (quantity < 1) {
//       return removeFromCart(productId);
//     }
    
//     setItems(prevItems => {
//       const item = prevItems.find(item => item.product.id === productId);
      
//       if (item && quantity > item.product.stock) {
//         toast({
//           title: "Maximum stock reached",
//           description: `Sorry, only ${item.product.stock} items available.`,
//           variant: "destructive"
//         });
//         return prevItems.map(item => 
//           item.product.id === productId 
//             ? { ...item, quantity: item.product.stock } 
//             : item
//         );
//       }
      
//       return prevItems.map(item => 
//         item.product.id === productId ? { ...item, quantity } : item
//       );
//     });
//   };

//   const clearCart = () => {
//     setItems([]);
//     toast({
//       title: "Cart cleared",
//       description: "All items have been removed from your cart."
//     });
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         subtotal,
//         itemCount,
//         shippingMethod,
//         setShippingMethod,
//         shippingCost,
//         paymentMethod,
//         setPaymentMethod
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
'use client'
import React, { createContext, useContext, useState, useEffect } from "react"

import { useToast } from "@/hooks/use-toast"
import { Product } from "@prisma/client"

interface CartItem {
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  itemCount: number
  shippingMethod: string
  setShippingMethod: (method: string) => void
  shippingCost: number
  paymentMethod: string
  setPaymentMethod: (method: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [shippingCost, setShippingCost] = useState(5.99)
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const { toast } = useToast()

  // Queue for toast notifications
  const [toastQueue, setToastQueue] = useState<Array<{
    variant?: 'destructive',
    title: string,
    description: string
  }>>([]);
   // Process toast queue
   useEffect(() => {
    if (toastQueue.length > 0) {
      const nextToast = toastQueue[0];
      toast(nextToast);
      setToastQueue(prev => prev.slice(1));
    }
  }, [toastQueue, toast]);
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  
  // Calculate total number of items
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Error loading cart from localStorage:", e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  // Update shipping cost when shipping method or cart changes
  useEffect(() => {
    if (shippingMethod === "standard") {
      // Free shipping on orders over $100
      setShippingCost(subtotal >= 100 ? 0 : 5.99)
    } else if (shippingMethod === "express") {
      setShippingCost(12.99)
    } else if (shippingMethod === "overnight") {
      setShippingCost(24.99)
    }
    
    // Add extra fee for many items
    if (itemCount > 5) {
      setShippingCost(prev => prev + 3.99)
    }
  }, [shippingMethod, subtotal, itemCount])
  const addToCart = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        if (existingItem.quantity + quantity > product.stock) {
          setToastQueue(prev => [...prev, {
            variant: 'destructive',
            title: "Maximum stock reached",
            description: `Sorry, only ${product.stock} items available.`
          }]);
          return prevItems.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: product.stock } 
              : item
          );
        }

        setToastQueue(prev => [...prev, {
          title: "Cart updated",
          description: `${product.name} quantity updated in your cart.`
        }]);
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        setToastQueue(prev => [...prev, {
          title: "Added to cart",
          description: `${product.name} added to your cart.`
        }]);
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const product = prevItems.find(item => item.product.id === productId)?.product;
      if (product) {
        setToastQueue(prev => [...prev, {
          title: "Removed from cart",
          description: `${product.name} removed from your cart.`
        }]);
      }
      return prevItems.filter(item => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);
    
    setItems(prevItems => {
      const item = prevItems.find(item => item.product.id === productId);
      
      if (item && quantity > item.product.stock) {
        setToastQueue(prev => [...prev, {
          variant: 'destructive',
          title: "Maximum stock reached",
          description: `Sorry, only ${item.product.stock} items available.`
        }]);
        return prevItems.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: item.product.stock } 
            : item
        );
      }
      
      return prevItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    setToastQueue(prev => [...prev, {
      title: "Cart cleared",
      description: "All items have been removed from your cart."
    }]);
  };
  
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        shippingMethod,
        setShippingMethod,
        shippingCost,
        paymentMethod,
        setPaymentMethod
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
