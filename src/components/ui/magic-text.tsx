import { ElementType, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';



interface MagicTextProps {
  children: string;
  className?: string;
  element?:  ElementType;
}

export function MagicText({ children, className, element: Element = 'div' }: MagicTextProps) {
  const textRef = useRef<HTMLElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  // const wrapWords = (element: HTMLElement) => {
  //   const text = element.textContent || '';
  //   element.textContent = '';
    
  //   const words = text.split(' ').map((word: string) => {
  //     const span = document.createElement('span');
  //     span.textContent = word + ' ';
  //     span.style.display = 'inline-block';
  //     return span;
  //   });
    
  //   words.forEach(word => element.appendChild(word));
  //   return words;
  // };
  // const wrapChars = (element: HTMLElement) => {
  //   const text = element.textContent || '';
  //   element.textContent = '';
    
  //   const chars = text.split('').map(char => {
  //     const span = document.createElement('span');
  //     span.textContent = char;
  //     span.style.display = 'inline-block'; // Important for transforms
  //     return span;
  //   });
    
  //   chars.forEach(char => element.appendChild(char));
  //   return chars;
  // };
  // useEffect(() => {
  //   const element = textRef.current;
  //   if (!element) return;

  //   const words = wrapWords(element);
  //   const chars = wrapChars(element);
  //   gsap.to(chars, {
  //     scrollTrigger: {
  //       trigger: element,
  //       start: 'top 80%',
  //       end: 'top 20%',
  //       scrub: 0.5,
  //     },
  //     opacity: 1,
  //     duration: 1.5,
  //     ease: "power4.out",
  //     stagger: {
  //       each: 0.05,
  //       from: "random"
  //     },
  //     filter: 'blur(0px)',
  //     y: 0,
  //     rotateX: 0,
  //     scale: 1,
  //     transformOrigin: '0% 50% -50',
  //       // Add initial state
  //     immediateRender: true,
  //     defaults: {
  //       opacity: 0.2,
  //       filter: 'blur(10px)',
  //       y: -30,
  //       rotateX: -45,
  //       scale: 0.5
  //     }
  //   });

  //   return () => {
  //     ScrollTrigger.getAll().forEach((trigger) =>{ 
  //       trigger.kill()
  //     });
  //   };
  // }, []);
  useEffect(() => {
    // Wait for the next frame to ensure DOM is ready
    const timeout = setTimeout(() => {
      const element = textRef.current;
      if (!element || isInitialized) return;

      setIsInitialized(true);


    // Create container for split text
    const container = document.createElement('div');
    container.style.cssText = 'display: inline-block; width: 100%;';
    
    // Split into words first
    const words = String(children).split(' ').map(word => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'pre'; // Preserve spaces
      
      // Split each word into characters
      const chars = word.split('').map(char => {
        const charSpan = document.createElement('span');
        charSpan.style.display = 'inline-block';
        charSpan.style.willChange = 'transform'; // Performance optimization
        charSpan.textContent = char;
        return charSpan;
      });
      
      chars.forEach(char => wordSpan.appendChild(char));
      wordSpan.appendChild(document.createTextNode('\u00A0')); // Add space after word
      return { wordSpan, chars };
    });

    // Clear and append new structure
    element.innerHTML = '';
    words.forEach(({ wordSpan }) => container.appendChild(wordSpan));
    element.appendChild(container);

    // Collect all chars for animation
    const allChars = words.flatMap(({ chars }) => chars);

    // Create animation
    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
        toggleActions: 'play none none reverse'
      },
    });

    // Set initial state with opacity 1
    gsap.set(allChars, {
      opacity: 1, // Changed to 1
      y: 0,      // Start at normal position
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)'
    });

    // Animate on scroll
    animation.fromTo(allChars, 
      {
        opacity: 0.2,
        y: 30,
        rotateX: -45,
        scale: 0.5,
        filter: 'blur(10px)',
        transformOrigin: '50% 50% -50'
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 35,
        ease: "power4.out",
        stagger: {
          each: 3,
          from: "random"
        }
      }
    );

    // Cleanup
    return () => {
      setIsInitialized(false);
      animation.kill();
      // ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, 0);

  return () => clearTimeout(timeout);
}, [children, isInitialized]);

  return (
    <Element ref={textRef} className={cn('font-bold whitespace-pre-wrap', className)}>
      {children}
    </Element>
  );
}