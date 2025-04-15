'use client';
import { useState } from 'react';
import { ThemeProviderWrapper } from '@/components/theme-provider'
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CartProvider } from "@/context/cart-context"
export function Providers({ children }: { children: React.ReactNode }) {
  
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
      },
    },
  }));
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProviderWrapper attribute="class" defaultTheme="system" enableSystem>
        <CartProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </CartProvider>
      </ThemeProviderWrapper>
    </QueryClientProvider>
  )
}