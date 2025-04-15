
import Icons from '@/components/icons/techIcons';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import React from 'react'

export const TechStack = () => {
  return (
    <div className="absolute right-0 top-1 flex h-[calc(123.4vh)] w-full z-0 flex-col items-center justify-center overflow-visible md:shadow-xl transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
      {/* <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        Landing Page
      </span> */}
  
      {/* Outer Circles (reverse) */}
      <OrbitingCircles  iconSize={70}
        // className="size-[50px] border-none bg-transparent"
        radius={270}
        duration={20}
        reverse
      >
        <Icons.whatsapp />
        
      </OrbitingCircles>
      <OrbitingCircles  iconSize={90}
        // className="size-[50px] border-none bg-transparent"
        radius={330}
        duration={25}
        delay={10}
      >
        <Icons.meta />
        <Icons.googleAnalytics />
      </OrbitingCircles>
    </div>
  )
}

