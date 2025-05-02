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