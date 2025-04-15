'use client';
import { createContext, FC, useContext, useEffect, useRef, useState } from "react";

// Create the Context
const BackgroundColorContext = createContext<{  bgColor: string; } | undefined>(undefined);

export const BackgroundColorProvider: FC<{ selector: string; children: React.ReactNode }>
 = ({ selector, children }) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [bgColor, setBgColor] = useState<string>("initial");
  const observersRef = useRef<{
    mutation: MutationObserver | null;
    resize: ResizeObserver | null;
    document: MutationObserver | null;
  }>({ mutation: null, resize: null, document: null });

  useEffect(() => {
    // Cleanup previous observers
    observersRef.current.mutation?.disconnect();
    observersRef.current.resize?.disconnect();
    observersRef.current.document?.disconnect();

    const elements = document.querySelectorAll(selector);

    if (elements.length > 0) {
      elementRef.current = elements[0] as HTMLElement;

      const updateBgColor = () => {
        requestAnimationFrame(() => {
          const element = elementRef.current;
          if (element?.isConnected && document.contains(element)) {
            const newColor = window.getComputedStyle(element).backgroundColor;
            setBgColor((prev) => (newColor !== prev ? newColor : prev));
          }
        })
      };

      updateBgColor();
      
      if (elementRef.current) {
        // Create element-specific observers
        const mutationObserver = new MutationObserver(updateBgColor);
        mutationObserver.observe(elementRef.current, { attributes: true, attributeFilter: ["style", "class"] });
        
        const resizeObserver = new ResizeObserver(updateBgColor);
        resizeObserver.observe(elementRef.current);
  
        observersRef.current.mutation = mutationObserver;
        observersRef.current.resize = resizeObserver;
      }
  
      // Document-level observer for dynamic elements
      const documentObserver = new MutationObserver(() => {
        if (!elementRef.current?.isConnected) {
          const newElement = document.querySelector(selector) as HTMLElement | null;
          if (newElement && newElement !== elementRef.current) {
            // Update element reference and observers
            elementRef.current = newElement;
            updateBgColor();
            
            observersRef.current.mutation?.disconnect();
            observersRef.current.resize?.disconnect();
  
            const newMutationObserver = new MutationObserver(updateBgColor);
            newMutationObserver.observe(newElement, { 
              attributes: true, 
              attributeFilter: ["style", "class"] 
            });
            
            const newResizeObserver = new ResizeObserver(updateBgColor);
            newResizeObserver.observe(newElement);
  
            observersRef.current.mutation = newMutationObserver;
            observersRef.current.resize = newResizeObserver;
          }
        }
      });
  
      documentObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
  
      observersRef.current.document = documentObserver;
      const observer = observersRef.current;
      return () => {
        observer.mutation?.disconnect();
        observer.resize?.disconnect();
        observer.document?.disconnect();
      };
    //    // Setup mutation observer
    //   observerRef.current = new MutationObserver(updateBgColor);
    //   observerRef.current.observe(elementRef.current, {
    //     attributes: true,
    //     attributeFilter: ["style", "class"],
    //     childList: true, // Observe child changes that might affect styling
    //     subtree: true, // Observe changes in the entire subtree
    //   });

    //   // Setup resize observer for layout changes
    //   const resizeObserver = new ResizeObserver(updateBgColor);
    //   resizeObserver.observe(elementRef.current);

    //   return () => {
    //     observerRef.current?.disconnect();
    //     resizeObserver.disconnect();
    //   };
    }
  }, [selector]);
  
  return (
    <BackgroundColorContext.Provider value={{ bgColor }}>
      {children}
    </BackgroundColorContext.Provider>
  );
};

// Custom Hook to use the context
const useBackgroundColor = () => {
  const context = useContext(BackgroundColorContext);
  if (!context) {
    throw new Error("useBackgroundColor must be used within a BackgroundColorProvider");
  }
  return context;
};

export default useBackgroundColor