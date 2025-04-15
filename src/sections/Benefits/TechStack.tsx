
import Icons from '@/components/icons/techIcons';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';

import React from 'react'

export const TechStack = () => {
  return (
    <div className="absolute right-0 -top-40 flex h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-yellow-600 pb-5 to-yellow-50 bg-clip-text text-center text-xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        My Website
      </span>
 
      {/* Inner Circles */}
      <OrbitingCircles iconSize={40}
        // className="size-[30px] border-none bg-transparent"
        radius={80}
        duration={20}
        delay={20}
      >
        <Icons.nextjs />
        <Icons.htmx />
      </OrbitingCircles>
      {/* Outer Circles (reverse) */}
      <OrbitingCircles  iconSize={70}
        // className="size-[50px] border-none bg-transparent"
        radius={140}
        duration={20}
        reverse
      >
        <Icons.googleAnalytics />
      </OrbitingCircles>
      <OrbitingCircles  iconSize={90}
        // className="size-[50px] border-none bg-transparent"
        radius={190}
        duration={25}
        delay={20}
      >
        <Icons.meta />
        <Icons.whatsapp />
      </OrbitingCircles>
    </div>
  )
}

