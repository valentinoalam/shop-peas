"use client";
import gsap from 'gsap';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Slide } from "./content";
import { cn } from "@/lib/utils";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { forwardRef, useEffect, useState } from "react";

import Image from "next/image";

interface CarouselProps {
  slides: Slide[];
  className?: string;
}

const StoryCarousel = forwardRef<HTMLDivElement, CarouselProps>(({ slides, className }, ref) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>()
  useEffect(() => {
    const element = document.querySelector('.current');
    const parent = document.querySelector('#content');
  
    // Early return if the element or parent doesn't exist
    if (!element || !parent) return;
  
    const children = parent.children;
  
    // Early return if there are no children or the currentSlideIndex is out of bounds
    if (!children.length || currentSlideIndex >= children.length || currentSlideIndex < 0) return;
  
    // Clear any existing tweens on the element
    gsap.killTweensOf(element);
  
    // Check if the current element is the first child of the current slide
    const isCurrentSlideElement = children[currentSlideIndex].children[0] === element;
  
    if (isCurrentSlideElement) {
      // Set the initial state for the first render
      gsap.set(element, {
        scale: 1.25,
        opacity: 1,
        transformOrigin: 'center', // Ensure scaling originates from the center
      });
  
      // Animate the element in (optional, if you want to animate it in later)
      gsap.fromTo(
        element,
        {
          scale: 1,
          opacity: 0,
        },
        {
          scale: 1.25,
          opacity: 1,
          duration: 0.3,
          ease: 'power1.inOut',
        }
      );
    } else {
      // Animate the element out
      gsap.to(element, {
        scale: 1,
        opacity: 0,
        duration: 0.3,
        ease: 'power1.inOut',
      });
    }
  }, [currentSlideIndex]);
  useEffect(() => {
    if (!api) {
      return
    }

    setCurrentSlideIndex(api.selectedScrollSnap())
 
    api.on("select", () => {
      setCurrentSlideIndex(api.selectedScrollSnap())
    })
  }, [api])
  // Function to calculate opacity based on distance from the current slide
  const calculateOpacity = (index: number) => {
    const distance = Math.abs(index - currentSlideIndex); // Calculate the distance
    // if distance >= 2? 
    return distance >= 2? 0:50; //Math.max(0, 100 - distance * 50); // Subtract 25% for each step
  };
  return (
    (<Carousel ref={ref} setApi={setApi} className={cn(`w-full max-w-xs mx-auto`, className)}>
      <CarouselContent id='content'>
      {slides.map((slide, index) => {
        const opacity = calculateOpacity(index); // Get the opacity for this slide
        const isActive = index === currentSlideIndex; // Check if this is the active slide
        return (
          (<CarouselItem key={index} className="self-center">
            {isActive ? (
              <NeonGradientCard borderRadius={6} className="current w-full scale-125 h-96 shadow-emerald-400 shadow-md">
                <CardHeader className="p-2 pb-1 text-center">
                  <CardTitle className='font-merriweather text-center'>{slide.judul}</CardTitle>
                  {/* absolute -top-0 -left-5 w-max px-2 bg-slate-50 rounded-3xl text-lg  */}
                </CardHeader>
                <CardContent className='py-2'>
                  <Image
                    src={slide.gambar}
                    alt={slide.judul}
                    width={300}
                    height={85}
                    className="w-full h-auto aspect-[16/11] object-cover overflow-hidden rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={80}
                    priority
                    style={{
                      width: "100%",
                      height: "auto"
                    }} />
                </CardContent>
                <CardFooter className="border-t-2 w-full bg-inherit border-slate-900 text-slate-900 shadow-md rounded-3xl hover:text-black">
                 {/* absolute -bottom-16 left-6 w-[300px] p-4 bg-inherit border-slate-900 text-slate-900 border shadow-lg rounded-3xl hover:text-black hover:shadow-xl */}
                  <CardDescription className='text-xs pt-1'>{slide.cerita}</CardDescription>
                </CardFooter>
              </NeonGradientCard>
            ) : (
              <Card className={`h-96 bg-opacity-80 blur-xs bg-transparent ${opacity===0? 'hidden': 'opacity-50'}`}>
                <CardHeader className="border-b-2 p-2 text-center">
                  <CardTitle>{slide.judul}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <Image src={slide.gambar} alt={slide.judul} className="w-full h-64 object-cover rounded-lg" /> */}
                </CardContent>
                <CardFooter className="border-t-2 p-3">
                  <CardDescription>{slide.cerita}</CardDescription>
                </CardFooter>
              </Card>
            )}
          </CarouselItem>)
        );})}
      </CarouselContent>
      <CarouselPrevious className='text-amber-300 stroke-current' />
      <CarouselNext className='text-amber-300 stroke-current' />
    </Carousel>)
  );
});

export default StoryCarousel;
StoryCarousel.displayName = "StoryCarousel";