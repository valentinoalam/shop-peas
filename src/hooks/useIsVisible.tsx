import { useEffect, useState, RefObject, useRef } from 'react';
import useScrollContext from './useScrollTracking';

interface IntersectionOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Custom hook to detect when an element is visible in the viewport
 * @param options Optional configuration for the IntersectionObserver
 * @returns [ref, isVisible] - A ref to attach to the element and a boolean indicating visibility
 */
function useSectionVisibility<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionOptions = {}, sectionRef: RefObject<T | null>
): boolean {
    const observerRef = useRef<IntersectionObserver>(null);
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScrollContext()
    useEffect(() => {
      if (!sectionRef.current) return;
      const sectionEl = sectionRef.current;
      // console.log(sectionEl, sectionEl.offsetTop, sectionEl.offsetHeight)
      // if(sectionEl?.offsetTop && (scrollY > sectionEl.offsetTop || scrollY < (sectionEl.offsetTop + sectionEl.offsetHeight)))
      // Configure observer properly
      const observerOptions = {
        root: null,
        rootMargin: options?.rootMargin || '0px',
        threshold: options?.threshold || 0.15 // Default 15% visibility
      };
      const handleIntersection: IntersectionObserverCallback = (entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > observerOptions.threshold) 
            setIsVisible(prev => entry.isIntersecting || prev);
          // console.log('Intersection ratio:', entry.intersectionRatio,  entry.isIntersecting, 
          //   'Bounds:', entry.boundingClientRect);
        });
        
      };
      
      observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);
      
      observerRef.current.observe(sectionEl);
      
      return () => {
        if (observerRef.current) {
          observerRef.current.unobserve(sectionEl)
          observerRef.current?.disconnect();
        }
      };
    }, [options?.rootMargin, options?.threshold, scrollY, sectionRef]);

    return isVisible;
}

export default useSectionVisibility;