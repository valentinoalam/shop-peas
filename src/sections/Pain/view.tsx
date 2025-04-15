'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { cerita_bergambar, pain } from './content';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import StoryCarousel from './story';
import debounce from '@/lib/debounce';
import useScrollContext from '@/hooks/useScrollTracking';


const Pain = () => {
  const sectionRef = useRef<(HTMLDivElement | null)>(null)
  const {scrollY} = useScrollContext();
  const [halfWidth, setHalfWidth] = useState(window.innerWidth / 2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Track animation state
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const conclusionRef = useRef(null);
  const painPoints = pain;
  const currentContentRef = useRef(null);
  const previousContentRef = useRef(null);
  const animationRefs = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    setHalfWidth(window.innerWidth / 2);

    const resizeObserver = new ResizeObserver(
      debounce(() => {
        setHalfWidth(window.innerWidth / 2);
      }, 250)
    );
    
    // Observe the section for size changes
    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current);
    }
    
    // Return cleanup for the context
    return () => {
      resizeObserver.disconnect();
    };
  }, [sectionRef]);

  useEffect(() => {
    const previousContent = previousContentRef.current;
    const currentContent = currentContentRef.current;
    let isMounted = true;
    
    const cleanupAnimations = () => {
      animationRefs.current.forEach(anim => anim?.kill());
      animationRefs.current = [];
    };

    const stopAnimation = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (isMounted) {
        setIsAnimating(false);
      }
    };
    
    const performAnimation = () => {
      if (!previousContent || !currentContent) return;

      cleanupAnimations();

      const direction = currentIndex > previousIndex ? "right" : "left";
      const slideDistance = halfWidth;

      gsap.set(previousContent, {
        x: 0,
        opacity: 1,
      });
      // Slide out the previous content
      const outAnimation = gsap.to(previousContent, {
        x: direction === "right" ? `-${slideDistance}px` : `${slideDistance}px`,
        opacity: 0,
        duration: 1,
        ease: "power2.in",
        onComplete: () => {
          // Slide in the current content
          const inAnimation = gsap.fromTo(
            currentContent,
            { x: direction === "right" ? `${slideDistance}px` : `-${slideDistance}px`, opacity: 0 },
            { 
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              onComplete: () => {
                stopAnimation();
                setPreviousIndex(currentIndex);
              }
            }
          );
          animationRefs.current.push(inAnimation);
        }
      });

      animationRefs.current.push(outAnimation);
    };

    if (isAnimating) {
      performAnimation();
    }

    return () => {
      isMounted = false; // Cleanup to prevent state updates on unmounted components
      cleanupAnimations();
    };
  }, [currentIndex, halfWidth, isAnimating, previousIndex, scrollY]);
  
  useLayoutEffect(() => {
    const scrollTriggers: ScrollTrigger[] = [];

    // Helper function to create scroll triggers
    const createScrollTrigger = (
      element: gsap.DOMTarget,
      animation: gsap.TweenVars,
      triggerConfig: ScrollTrigger.Vars
    ) => {
      const tl = gsap.fromTo(element, animation.from, animation.to);
      const st = ScrollTrigger.create({
        trigger: element,
        animation: tl,
        ...triggerConfig
      });
      scrollTriggers.push(st);
    };

    // Header animation
    if (titleRef.current) 
      createScrollTrigger(
        titleRef.current,
        { from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0, duration: 1 } },
        { start: "top 80%", toggleActions: "play none none reverse" }
      );

    if (subtitleRef.current)
      createScrollTrigger(
        subtitleRef.current,
        { from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0, duration: 1, delay: 0.2 } },
        { start: "top 80%", toggleActions: "play none none reverse" }
      );

    // Cards stagger animation
    if (cardsRef.current.length > 0) 
      cardsRef.current.forEach((card, index) => {
        if (card) {
          createScrollTrigger(
            card,
            { from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0, duration: 0.8, delay: index * 0.2 } },
            { start: "top 75%", toggleActions: "play none none reverse" }
          );
        }
      });

    // Conclusion fade in and slide
    if (conclusionRef.current)
      createScrollTrigger(
        conclusionRef.current,
        { from: { opacity: 0, x: -50 }, to: { opacity: 1, x: 0, duration: 1 } },
        { start: "top 80%", toggleActions: "play none none reverse" }
      );
    
    return () => {
      scrollTriggers.forEach(st => st.kill());
    };
  }, []);

  const handleTabChange = (index: number) => {
    if (index !== currentIndex) {
      // Start animation and update current index
      setIsAnimating(true);
      setCurrentIndex(index);
    }
  };
  
  return (
    <div ref={sectionRef} className="relative overflow-y-visible overflow-x-hidden z-10 space-y-11">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-3xl font-bold text-gray-900 mb-4 opacity-0">
            {painPoints.title}
          </h2>
          <p ref={subtitleRef} className="text-xl text-gray-600 opacity-0">
            {painPoints.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {painPoints.points.map((point, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-0"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>

        <div 
          ref={conclusionRef}
          className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg opacity-0"
        >
          <p className="text-lg text-gray-800">{painPoints.conclusion}</p>
        </div>
      </div>
      <Tabs defaultValue={cerita_bergambar[0].judul} className="w-full space-y-6 container relative mx-auto">
        <TabsList className="bg-transparent w-full grid-cols-4 gap-4 justify-evenly flex">
          {cerita_bergambar.map((cerita, index) => (
            <TabsTrigger key={index} value={cerita.judul} onClick={() => handleTabChange(index)}>
              {cerita.judul}
            </TabsTrigger>
          ))}
        </TabsList>
        {cerita_bergambar.map((cerita, index) => (
          <TabsContent key={index} value={cerita.judul} className={`relative h-[450px] py-9 rounded-2xl border-2 border-yellow-500/20 ${getBackgroundColor(currentIndex)} transition-colors delay-1000 duration-1000`}>
            {/* Previous Content */}
            {previousIndex !== index && (
              <StoryCarousel ref={previousContentRef} slides={cerita_bergambar[previousIndex].slides} />
            )}
            {/* Current Content */}
            <StoryCarousel className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`} ref={currentContentRef} slides={cerita.slides} />
          </TabsContent>
        ))}
      </Tabs>
      <div 
          className="container relative mx-auto min-h-48 h-max border-l-4 border-red-500 px-6 py-20 mt-16 rounded-r-lg"
        >
        <p className=''>Dari cerita-cerita di atas, kita bisa melihat bahwa landing page atau website adalah alat yang sangat penting untuk bisnis di era digital.   Landing page atau website tidak hanya membantu bisnis terlihat lebih profesional, tetapi juga memudahkan pelanggan untuk mengambil tindakan.  </p>
        </div>
    </div>
  );
};

export default Pain;


function getBackgroundColor(index: number) {
  switch (index) {
    case 0:
      return "bg-gray-100"
    case 1:
      return "bg-yellow-200"
    case 2:
      return "bg-red-200"
    case 3:
      return "bg-green-200"
    case 4:
      return "bg-blue-200"
    default:
      return "bg-gray-100"
  }
}