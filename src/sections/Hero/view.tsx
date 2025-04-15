'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { TechStack } from './TechStack';
import { CTA } from '../../components/buttons/cta';
import useBackgroundColor from '@/hooks/useBgColor';
import Loading from '../../app/(default)/loading';


// Dynamically import heavy components
const Globe = dynamic(() => import('@/components/ui/globe'), { ssr: false });
const FlickeringGrid = dynamic(() => import('@/components/ui/flickering-grid'), { ssr: false });
const WordRotate = dynamic(() => import('@/components/ui/word-rotate'), { ssr: false });

const wrapWords = (element: HTMLElement) => {
  const text = element.textContent || '';
  element.textContent = '';
  
  const words = text.split(' ').map(word => {
    const span = document.createElement('span');
    if (word === 'efisien') {
      span.className = 'text-yellow-400'; // Apply yellow color directly
      span.style.backgroundImage = 'none'; // Remove gradient for this word
    }
    span.textContent = word + ' ';
    span.style.display = 'inline-block';
    span.style.whiteSpace = 'pre'; // Preserve spaces
    return span;
  });
  
  words.forEach(word => element.appendChild(word));
  return words;
};

export default function Hero() {
  const { bgColor } = useBackgroundColor();
  const [isReady, setIsReady] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const loadContent = async () => {
      try {
        // Check critical resources
        const [
          globeComponentReady,
          flickerGridReady,
          wordRotateReady
        ] = await Promise.all([
          import('@/components/ui/globe').then(() => true).catch(() => false),
          import('@/components/ui/flickering-grid').then(() => true).catch(() => false),
          import('@/components/ui/word-rotate').then(() => true).catch(() => false)
        ]);

        // Only set ready if all critical components are loaded
        const allResourcesReady =
          globeComponentReady && 
          flickerGridReady && 
          wordRotateReady;

        setIsReady(allResourcesReady);
      } catch (error) {
        console.error('Loading failed', error);
        setIsReady(false);
      }
    };

    loadContent();

    // Animation setup when ready
    if (isReady) {
      const ctx = gsap.context(() => {
        if (!titleRef.current || !backgroundRef.current || !contentRef.current) return;
        // Title word animation with ScrollTrigger
        const words = wrapWords(titleRef.current);
        
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 50,
            rotateX: -45,
            scale: 0.5,
            filter: 'blur(10px)',
            transformOrigin: '50% 50% -50',
          },{
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 2,
            delay: 0.6,
            ease: "power2.out",
            stagger: {
              each: 0.06,
              from: "random"
            }
          });
        

        // Background animation timeline
        const backgroundTl = gsap.timeline({
          defaults: {
            ease: 'none',
            duration: 20,
            repeat: -1,
            yoyo: true,
          }
        });

        const shapes = backgroundRef.current.children;
        Array.from(shapes).forEach((shape, index) => {
          backgroundTl.to(shape, {
            scale: 1.5,
            opacity: 0.15,
            duration: 20,
            delay: index * 2,
          }, 0);
        });
        

        // Content animation timeline
        const contentTl = gsap.timeline({
          defaults: {
            ease: 'power3.out',
          }
        });

        contentTl
          .from(contentRef.current.querySelector('.hero-badge'), {
            y: 30,
            opacity: 0,
            duration: 0.8,
          })
          .from(contentRef.current.querySelector('.hero-title'), {
            y: 50,
            opacity: 0,
            duration: 1,
          }, '-=0.4')
          .from(contentRef.current.querySelector('.hero-description'), {
            y: 60,
            opacity: 0,
            duration: 0.8,
          }, '-=0.6')
          .from(contentRef.current.querySelector('.hero-buttons'), {
            y: 30,
            opacity: 0,
            duration: 0.8,
          }, '-=0.4');
        
      }, [heroRef, titleRef, backgroundRef, contentRef]);

      return () => {
        ctx.current?.revert(); // Cleanup with optional chaining
        ctx.current = null;
      };
    }

  }, [isReady]);
  if (!isReady) {
    return (
      <Loading />
    );
  }

  return (
    <div
      ref={heroRef} 
      className="relative flex items-center bg-background justify-center min-h-screen py-12 sm:py-16 overflow-x-clip"
    >
      {/* Animated background */}
      <div 
        ref={backgroundRef} 
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute rounded-full top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary/20 blur-3xl transform-gpu" />
        <div className="absolute rounded-full bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-secondary/20 blur-3xl transform-gpu" />
        <div className="absolute rounded-full top-1/2 left-1/2 w-56 h-56 sm:w-72 sm:h-72 bg-accent/20 blur-3xl transform-gpu" />
          {/* <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-3xl transform-gpu" />
          <div className="absolute rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 blur-3xl transform-gpu" />
          <div className="absolute rounded-full top-1/2 left-1/2 w-72 h-72 bg-accent/20 blur-3xl transform-gpu" /> */}
        </div>
        <FlickeringGrid
          className="absolute inset-0 z-10 size-full"
          squareSize={4}
          gridGap={12}
          color="#D4EFDA"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={700}
        />
          {/* bg-[#2c9483]bg-[#2c9475] */}
        <TechStack  />
        <Globe 
           className="absolute overflow-visible top-0 lg:top-24 h-[calc(100vh)] -z-0" />
        <div className="container relative z-10 px-4 mx-auto">
          <div 
            ref={contentRef}
            className="max-w-4xl mx-auto space-y-6 text-center"
          >
            <div className="flex items-center justify-center space-x-2 hero-badge">
              <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse fill-amber-50" />
              <span className="text-sm font-medium">
                Solusi Digital Anda
              </span>
            </div>
            <div className="hero-title">
              <div ref={titleRef} className="text-4xl font-bold md:text-6xl">
                Maksimalkan Potensi Online Untuk Menjangkau Prospek lebih efisien
              </div>
            </div>
            <div className='hero-description h-18 px-4 sm:px-6 lg:px-8'>
              <WordRotate
                duration={7000}
                className="font-bold text-black dark:text-white max-w-full sm:max-w-3xl tracking-[-0.02em] mx-auto text-base sm:text-lg md:text-xl lg:text-2xl leading-tight"
                words={[
                  "Ubah kehadiran digital Anda sebagai pengalaman keren bagi customer anda.", 
                  "Kami membangun situs web yang dapat meningkatkan konversi.",
                  "Mari wujudkan Halaman Utama Bisnis Anda bersama kami – mudah, cepat, dan menyenangkan! ✨ "]}
              />
            </div>
            <CTA />
          </div>
        </div>
        <div className={`absolute bottom-0 z-50 h-28 w-full bg-gradient-to-b from-transparent to-[${bgColor}]`}></div>
    </div>
  );
}