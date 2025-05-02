// 'use client'
// import React, { createContext, useContext, useState, useEffect } from "react"

// import { useToast } from "@/hooks/use-toast"
// import { Product } from "@prisma/client"

// interface CartItem {
//   product: Product
//   quantity: number
// }

// interface CartContextType {
//   items: CartItem[]
//   addToCart: (product: Product, quantity?: number) => void
//   removeFromCart: (productId: string) => void
//   updateQuantity: (productId: string, quantity: number) => void
//   clearCart: () => void
//   subtotal: number
//   itemCount: number
//   shippingMethod: string
//   setShippingMethod: (method: string) => void
//   shippingCost: number
//   paymentMethod: string
//   setPaymentMethod: (method: string) => void
// }

// const CartContext = createContext<CartContextType | undefined>(undefined)

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [items, setItems] = useState<CartItem[]>([])
//   const [shippingMethod, setShippingMethod] = useState("standard")
//   const [shippingCost, setShippingCost] = useState(5.99)
//   const [paymentMethod, setPaymentMethod] = useState("credit")
//   const { toast } = useToast()

//   // Queue for toast notifications
//   const [toastQueue, setToastQueue] = useState<Array<{
//     variant?: 'destructive',
//     title: string,
//     description: string
//   }>>([]);
//    // Process toast queue
//    useEffect(() => {
//     if (toastQueue.length > 0) {
//       const nextToast = toastQueue[0];
//       toast(nextToast);
//       setToastQueue(prev => prev.slice(1));
//     }
//   }, [toastQueue, toast]);
//   // Calculate subtotal
//   const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  
//   // Calculate total number of items
//   const itemCount = items.reduce((count, item) => count + item.quantity, 0)

//   // Load cart from localStorage
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart")
//     if (savedCart) {
//       try {
//         setItems(JSON.parse(savedCart))
//       } catch (e) {
//         console.error("Error loading cart from localStorage:", e)
//       }
//     }
//   }, [])

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(items))
//   }, [items])

//   // Update shipping cost when shipping method or cart changes
//   useEffect(() => {
//     if (shippingMethod === "standard") {
//       // Free shipping on orders over $100
//       setShippingCost(subtotal >= 100 ? 0 : 5.99)
//     } else if (shippingMethod === "express") {
//       setShippingCost(12.99)
//     } else if (shippingMethod === "overnight") {
//       setShippingCost(24.99)
//     }
    
//     // Add extra fee for many items
//     if (itemCount > 5) {
//       setShippingCost(prev => prev + 3.99)
//     }
//   }, [shippingMethod, subtotal, itemCount])
//   const addToCart = (product: Product, quantity = 1) => {
//     setItems(prevItems => {
//       const existingItem = prevItems.find(item => item.product.id === product.id);
      
//       if (existingItem) {
//         if (existingItem.quantity + quantity > product.stock) {
//           setToastQueue(prev => [...prev, {
//             variant: 'destructive',
//             title: "Maximum stock reached",
//             description: `Sorry, only ${product.stock} items available.`
//           }]);
//           return prevItems.map(item => 
//             item.product.id === product.id 
//               ? { ...item, quantity: product.stock } 
//               : item
//           );
//         }

//         setToastQueue(prev => [...prev, {
//           title: "Cart updated",
//           description: `${product.name} quantity updated in your cart.`
//         }]);
//         return prevItems.map(item => 
//           item.product.id === product.id 
//             ? { ...item, quantity: item.quantity + quantity } 
//             : item
//         );
//       } else {
//         setToastQueue(prev => [...prev, {
//           title: "Added to cart",
//           description: `${product.name} added to your cart.`
//         }]);
//         return [...prevItems, { product, quantity }];
//       }
//     });
//   };

//   const removeFromCart = (productId: string) => {
//     setItems(prevItems => {
//       const product = prevItems.find(item => item.product.id === productId)?.product;
//       if (product) {
//         setToastQueue(prev => [...prev, {
//           title: "Removed from cart",
//           description: `${product.name} removed from your cart.`
//         }]);
//       }
//       return prevItems.filter(item => item.product.id !== productId);
//     });
//   };

//   const updateQuantity = (productId: string, quantity: number) => {
//     if (quantity < 1) return removeFromCart(productId);
    
//     setItems(prevItems => {
//       const item = prevItems.find(item => item.product.id === productId);
      
//       if (item && quantity > item.product.stock) {
//         setToastQueue(prev => [...prev, {
//           variant: 'destructive',
//           title: "Maximum stock reached",
//           description: `Sorry, only ${item.product.stock} items available.`
//         }]);
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
//     setToastQueue(prev => [...prev, {
//       title: "Cart cleared",
//       description: "All items have been removed from your cart."
//     }]);
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
//   )
// }

// export const useCart = () => {
//   const context = useContext(CartContext)
//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider")
//   }
//   return context
// }
'use client'
import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { Address, PaymentMethod, Product, ShippingMethod } from "@prisma/client"
import useSWR from "swr"
import { saveCartToDatabase, getUserCart, mergeCartsOnLogin } from "@/lib/cart"

// Indonesian market constants
const IDR_FORMATTER = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
})

// const SHIPPING_METHODS = {
//   REGULAR: { id: 'regular', name: 'Pengiriman Reguler', baseCost: 15000 },
//   EXPRESS: { id: 'express', name: 'Pengiriman Kilat', baseCost: 35000 },
//   SAME_DAY: { id: 'same-day', name: 'Hari Ini Sampai', baseCost: 75000 },
// }

// const PAYMENT_METHODS = {
//   VIRTUAL_ACCOUNT: 'virtual_account',
//   E_WALLET: 'e_wallet',
//   RETAIL_OUTLET: 'retail_outlet',
//   QRIS: 'qris',
// } as const

export interface CartItem {
  product: Product
  quantity: number
}
interface CartContextType {
  items: CartItem[]
  itemCount: number
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  shippingMethod: ShippingMethod//keyof typeof SHIPPING_METHODS
  paymentMethod: PaymentMethod//keyof typeof PAYMENT_METHODS
  shippingAddress: Address
  setShippingMethod: (methodId: string) => void
  setPaymentMethod: (methodId: string) => void
  setShippingAddress: (address: Address) => void
  userAddresses: Address[]
  loadUserAddresses: () => Promise<void>
  shippingCost: number
  subtotal: number
  total: number
  formattedTotal: string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { data: session, status } = useSession()
  const isAuthenticated = !!session?.user?.id
  const { toast } = useToast()
  const [items, setItems] = useState<CartItem[]>([])

  // Fetch shipping methods
  const { data: shippingMethods = [] } = useSWR<ShippingMethod[]>('/api/shipping-methods')
  // Fetch payment methods
  const { data: paymentMethods = [] } = useSWR<PaymentMethod[]>('/api/payment-methods')

  
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(shippingMethods[0])//useState<keyof typeof SHIPPING_METHODS>('REGULAR')
  const [shippingCost, setShippingCost] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>()//useState<keyof typeof PAYMENT_METHODS>('VIRTUAL_ACCOUNT')
  const [shippingAddress, setShippingAddress] = useState<Address>()
  const [userAddresses, setUserAddresses] = useState<Address[]>([])
  // Fetch addresses if authenticated
  const loadUserAddresses = useCallback(async () => {
    if (status === 'authenticated') {
      const response = await fetch('/api/addresses')
      const addresses = await response.json()
      setUserAddresses(addresses)
    }
  }, [status])

  // Calculate derived values
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)
  const total = subtotal + shippingCost
  const formattedTotal = IDR_FORMATTER.format(total)

  // Toast queue system
  const [toastQueue, setToastQueue] = useState<Array<{
    variant?: 'destructive'
    title: string
    description: string
  }>>([])

  // Local storage management
  const CART_STORAGE_KEY = 'indonesia_cart_v1'

  const saveCartToStorage = useCallback((cartItems: CartItem[]) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (e) {
      console.error('Gagal menyimpan keranjang:', e)
    }
  }, [])

  const loadCartFromStorage = useCallback(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      return savedCart ? JSON.parse(savedCart) : []
    } catch (e) {
      console.error('Gagal memuat keranjang:', e)
      return []
    }
  }, [])

  // Shipping cost calculation
  const calculateShippingCost = useCallback(():number => {
    let cost = shippingMethod?.price//SHIPPING_METHODS[shippingMethod].baseCost
    
    // Free shipping for orders above 500k IDR
    if (subtotal >= 500000) {
      cost = 0
    }

    return cost
  }, [shippingMethod, subtotal])

   // Initialize cart from localStorage or database
   useEffect(() => {
    const initializeCart = async () => {
      setIsLoading(true)
      try {
        if (isAuthenticated) {
          // If user is authenticated, get cart from database
          const dbCart = await getUserCart(session.user.id)
          setItems(dbCart)
        } else {
          // If user is not authenticated, get cart from localStorage
          const storedCart = localStorage.getItem("cart")
          if (storedCart) {
            setItems(JSON.parse(storedCart))
          }
        }
      } catch (error) {
        console.error("Failed to initialize cart:", error)
        // Fallback to localStorage if database fetch fails
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
          setItems(JSON.parse(storedCart))
        }
      } finally {
        setIsLoading(false)
      }
    }

    initializeCart()
  }, [isAuthenticated, session?.user?.id])
  
  // Handle cart merging when user logs in
  useEffect(() => {
    const mergeCartsAfterLogin = async () => {
      if (isAuthenticated && status === "authenticated") {
        const localCartJson = sessionStorage.getItem("localCart")

        if (localCartJson) {
          try {
            const localCart = JSON.parse(localCartJson)
            if (localCart.length > 0) {
              const mergedCart = await mergeCartsOnLogin(session.user.id, localCart)
              setItems(mergedCart)
              sessionStorage.removeItem("localCart")
            }
          } catch (error) {
            console.error("Failed to merge carts:", error)
          }
        }
      }
    }

    mergeCartsAfterLogin()
  }, [isAuthenticated, session?.user?.id, status])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, isLoading, isAuthenticated])

  // Save cart to database if user is authenticated
  useEffect(() => {
    const syncCartToDatabase = async () => {
      if (isAuthenticated && !isLoading && items.length > 0) {
        try {
          await saveCartToDatabase(session.user.id, items)
        } catch (error) {
          console.error("Failed to sync cart to database:", error)
        }
      }
    }

    syncCartToDatabase()
  }, [items, isAuthenticated, isLoading, session?.user?.id])

  useEffect(() => {
    if(!shippingMethod) return
    setShippingCost(calculateShippingCost())
  }, [calculateShippingCost, shippingMethod])

  // Cart persistence
  useEffect(() => {
    setItems(loadCartFromStorage())
  }, [loadCartFromStorage])

  useEffect(() => {
    saveCartToStorage(items)
  }, [items, saveCartToStorage])

  // Toast processing
  useEffect(() => {
    if (toastQueue.length > 0) {
      const nextToast = toastQueue[0]
      toast(nextToast)
      setToastQueue(prev => prev.slice(1))
    }
  }, [toastQueue, toast])

  // Cart actions
  // Add item to cart
  const addToCart = (product: Product, quantity = 1) => {
    if (!product.stock || product.stock <= 0) {
      setToastQueue(prev => [...prev, {
        variant: 'destructive',
        title: 'Stok Habis',
        description: 'Maaf, produk ini sedang tidak tersedia'
      }])
      return
    }

    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      const newQuantity = (existing?.quantity || 0) + quantity

      if (newQuantity > product.stock!) {
        setToastQueue(prev => [...prev, {
          variant: 'destructive',
          title: 'Melebihi Stok',
          description: `Hanya tersedia ${product.stock} item`
        }])
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: product.stock! } 
            : item
        )
      }

      setToastQueue(prev => [...prev, {
        title: existing ? 'Keranjang Diupdate' : 'Ditambahkan ke Keranjang',
        description: `${product.name} ${existing ? 'diupdate' : 'ditambahkan'}`
      }])

      return existing
        ? prev.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: newQuantity } 
              : item
          )
        : [...prev, { product, quantity }]
    })
  }

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setItems(prev => {
      const product = prev.find(item => item.product.id === productId)?.product
      if (product) {
        setToastQueue(prev => [...prev, {
          title: 'Dihapus dari Keranjang',
          description: `${product.name} dihapus`
        }])
      }
      return prev.filter(item => item.product.id !== productId)
    })
  }

  // Update item quantity
  // const updateQuantity = useCallback(async (productId: string, quantity: number) => {
  //   const newItems = getCart().map(item => 
  //     item.product.id === productId ? { ...item, quantity } : item
  //   ).filter(item => item.quantity > 0)

  //   await persistCart(newItems)
  //   setItems(newItems)
  // }, [getCart, persistCart])
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId)
    
    setItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        if (quantity > item.product.stock!) {
          setToastQueue(prev => [...prev, {
            variant: 'destructive',
            title: 'Melebihi Stok',
            description: `Maksimal ${item.product.stock} item`
          }])
          return { ...item, quantity: item.product.stock! }
        }
        return { ...item, quantity }
      }
      return item
    }))
  }

  // const clearCart = useCallback(async () => {
  //   await persistCart([])
  //   setItem([])
  // }, [persistCart])
  // Clear cart
  const clearCart = () => {
    setItems([])
    setToastQueue(prev => [...prev, {
      title: 'Keranjang Dikosongkan',
      description: 'Semua item telah dihapus'
    }])
  }

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
        shippingMethod: shippingMethod || shippingMethods[0],
        setShippingMethod: (methodId) => {
          const method = shippingMethods.find(m => m.id === methodId)
          if(method) setShippingMethod(method)
        },
        shippingCost,
        paymentMethod: paymentMethod || paymentMethods[0],
        setPaymentMethod: (methodId) => {
          const method = paymentMethods.find(m => m.id === methodId)
          setPaymentMethod(method)
        },
        total,
        formattedTotal,
        userAddresses,
        loadUserAddresses,
        shippingAddress: shippingAddress || userAddresses[0],
        setShippingAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart harus digunakan dalam CartProvider')
  }
  return context
}