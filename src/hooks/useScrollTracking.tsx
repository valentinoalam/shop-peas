'use client';
import { trackEvent } from '@/lib/utils';
import { useState, useRef, useEffect, createContext, useContext, useCallback, useMemo, RefObject } from 'react';
import throttle from 'lodash.throttle';
import { useClientWindow } from './useClientWindow';
export interface ScrollContextType {
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  scrollContainerRef: RefObject<HTMLElement | null>;
  scrollToPosition: (position: number, behavior?: ScrollBehavior) => void
  scrollToElement: (element: HTMLElement, offset?: number) => void;
  isOut1stScreen: boolean;
  isScrolled: boolean;
  isAtTop: boolean;
  isAtBottom: () => boolean;
}
const ScrollContext = createContext<ScrollContextType>({
  scrollY: 0,
  scrollDirection: null,
  scrollContainerRef: { current: null },
  scrollToPosition: () => {},
  scrollToElement: () => {},
  isOut1stScreen: false,
  isScrolled: false,
  isAtTop: true,
  isAtBottom: () => false,
});

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const { height: windowHeight } = useClientWindow();
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const scrollYRef = useRef(scrollY);
  const scrollDirectionRef = useRef(scrollDirection);
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const maxScrollRef = useRef(0);
  const isWindowContainer = useRef(false);
   // Sync refs with state
   useEffect(() => {
    scrollYRef.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    scrollDirectionRef.current = scrollDirection;
  }, [scrollDirection]);

  // Throttled handler with proper closure handling
  const handleScroll = useRef(throttle(() => {
    if (typeof window === 'undefined') return;
    const container = scrollContainerRef.current;
    let currentScrollY = 0;
    let scrollHeight = 0;
    let clientHeight = 0;

    if (isWindowContainer.current) {
      currentScrollY = window.scrollY;
      scrollHeight = document.documentElement.scrollHeight;
      clientHeight = window.innerHeight;
    } else if (container) {
      currentScrollY = container.scrollTop;
      scrollHeight = container.scrollHeight;
      clientHeight = container.clientHeight;
    } else {
      return;
    }

    // Update direction using ref comparison
    const newDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
    if (newDirection !== scrollDirectionRef.current) {
      setScrollDirection(newDirection);
    }

    // Update scroll position ref
    if (currentScrollY !== scrollYRef.current) {
      setScrollY(currentScrollY);
    }

    lastScrollY.current = currentScrollY;
    
    // Track scroll depth
    try {
      const scrollPosition = currentScrollY + clientHeight;
      const scrollPercent = Math.round((scrollPosition / scrollHeight) * 100);

      if (scrollPercent > maxScrollRef.current) {
        maxScrollRef.current = scrollPercent;
        if (scrollPercent % 25 === 0) {
          trackEvent({
            category: 'Engagement',
            action: 'Scroll Depth',
            label: `${scrollPercent}%`
          });
        }
      }
    } catch (error) {
      console.error("Error tracking scroll:", error);
    }
  }, 100, { leading: true, trailing: true })).current;

  // Initialize scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    isWindowContainer.current = !container;
    const target = container || window;
    target.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => {
      target.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll, windowHeight]);

  // Scroll control functions
  const scrollToPosition = useCallback((y: number, behavior: ScrollBehavior = 'smooth') => {
    if (isWindowContainer.current) {
      window.scrollTo({ top: y, behavior });
    } else if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: y, behavior });
    }
  }, []);

  const scrollToElement = useCallback((element: HTMLElement, offset = 0) => {
    if (!element) return;
    const elementTop = element.offsetTop - offset;
    scrollToPosition(elementTop);
  }, [scrollToPosition]);

  // Memoized return values
  const isOut1stScreen = scrollY > windowHeight/2;
  const isScrolled = scrollY > 50;
  const isAtTop = scrollY === 0;
  const isAtBottom = useCallback(() => {
    if (isWindowContainer.current) {
      return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    }
    if (!scrollContainerRef.current) return false;
    const { scrollHeight, clientHeight } = scrollContainerRef.current;
    return scrollY >= scrollHeight - clientHeight - 1;
  }, [scrollY]);
  
  const contextValue = useMemo(() => ({
    scrollY,
    scrollDirection,
    scrollContainerRef,
    scrollToPosition,
    scrollToElement,
    isOut1stScreen,
    isScrolled,
    isAtTop,
    isAtBottom
  }), [
    scrollY,
    scrollDirection,
    scrollToPosition,
    scrollToElement,
    isOut1stScreen,
    isScrolled,
    isAtTop,
    isAtBottom
  ]);
  
  return (
    <ScrollContext.Provider value={contextValue}>
      {children}
    </ScrollContext.Provider>
  );
};

// export const useScrollHandler = (): ScrollContextType => {
//   const { height: windowHeight } = useClientWindow();
//   const [scrollY, setScrollY] = useState(0);
//   const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
//   const scrollYRef = useRef(scrollY);
//   const scrollDirectionRef = useRef(scrollDirection);
//   const scrollContainerRef = useRef<HTMLElement | null>(null);
//   const lastScrollY = useRef(0);
//   const maxScrollRef = useRef(0);
//   const isWindowContainer = useRef(false);

//    // Sync refs with state
//    useEffect(() => {
//     scrollYRef.current = scrollY;
//   }, [scrollY]);

//   useEffect(() => {
//     scrollDirectionRef.current = scrollDirection;
//   }, [scrollDirection]);

//   // Throttled handler with proper closure handling
//   const handleScroll = useRef(throttle(() => {
//     if (typeof window === 'undefined') return;
//     const container = scrollContainerRef.current;
//     let currentScrollY = 0;
//     let scrollHeight = 0;
//     let clientHeight = 0;

//     if (isWindowContainer.current) {
//       currentScrollY = window.scrollY;
//       scrollHeight = document.documentElement.scrollHeight;
//       clientHeight = window.innerHeight;
//     } else if (container) {
//       currentScrollY = container.scrollTop;
//       scrollHeight = container.scrollHeight;
//       clientHeight = container.clientHeight;
//     } else {
//       return;
//     }

//     // Update direction using ref comparison
//     const newDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
//     if (newDirection !== scrollDirectionRef.current) {
//       setScrollDirection(newDirection);
//     }

//     // Update scroll position ref
//     if (currentScrollY !== scrollYRef.current) {
//       setScrollY(currentScrollY);
//     }

//     lastScrollY.current = currentScrollY;
    
//     // Track scroll depth
//     try {
//       const scrollPosition = currentScrollY + clientHeight;
//       const scrollPercent = Math.round((scrollPosition / scrollHeight) * 100);

//       if (scrollPercent > maxScrollRef.current) {
//         maxScrollRef.current = scrollPercent;
//         if (scrollPercent % 25 === 0) {
//           trackEvent({
//             category: 'Engagement',
//             action: 'Scroll Depth',
//             label: `${scrollPercent}%`
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error tracking scroll:", error);
//     }
//   }, 100, { leading: true, trailing: true })).current;

//   // Initialize scroll listener
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     isWindowContainer.current = !container;
//     const target = container || window;
//     target.addEventListener('scroll', handleScroll, { passive: true });
//     handleScroll(); // Initial call
//     return () => {
//       target.removeEventListener('scroll', handleScroll);
//       handleScroll.cancel();
//     };
//   }, [handleScroll, windowHeight]);

//   // Scroll control functions
//   const scrollToPosition = useCallback((y: number, behavior: ScrollBehavior = 'smooth') => {
//     if (isWindowContainer.current) {
//       window.scrollTo({ top: y, behavior });
//     } else if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollTo({ top: y, behavior });
//     }
//   }, []);

//   const scrollToElement = useCallback((element: HTMLElement, offset = 0) => {
//     if (!element) return;
//     const elementTop = element.offsetTop - offset;
//     scrollToPosition(elementTop);
//   }, [scrollToPosition]);

//   // Memoized return values
//   const isOut1stScreen = scrollY > 706;
//   const isScrolled = scrollY > 50;
//   const isAtTop = scrollY === 0;
//   const isAtBottom = useCallback(() => {
//     if (isWindowContainer.current) {
//       return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
//     }
//     if (!scrollContainerRef.current) return false;
//     const { scrollHeight, clientHeight } = scrollContainerRef.current;
//     return scrollY >= scrollHeight - clientHeight - 1;
//   }, [scrollY]);
  
//   return useMemo(() => ({
//     scrollY,
//     scrollDirection,
//     scrollContainerRef,
//     scrollToPosition,
//     scrollToElement,
//     isOut1stScreen,
//     isScrolled,
//     isAtTop,
//     isAtBottom
//   }), [
//     scrollY,
//     scrollDirection,
//     scrollToPosition,
//     scrollToElement,
//     isOut1stScreen,
//     isScrolled,
//     isAtTop,
//     isAtBottom
//   ]);
// };

// Custom hook with error handling for consuming the context
const useScrollContext = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
};

export default useScrollContext
