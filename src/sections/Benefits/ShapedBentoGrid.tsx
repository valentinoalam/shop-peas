import Image from "next/image";
import React from 'react';

const ShapedBentoGrid = () => {
  return (
    (<div className="w-full max-w-6xl p-6 mx-auto bg-navy-900">
      <div className="relative grid grid-cols-12 gap-4">
        {/* First row with subtracted corner */}
        <div className="relative col-span-8">
          <div className="absolute bottom-0 right-0 w-[200px] h-[100px] bg-navy-900 
                          transform translate-x-[30%] translate-y-[30%] z-10"></div>
          <div className="relative p-6 bg-blue-400 rounded-3xl">
            <div className="text-sm text-gray-500">Capital raised</div>
            <div className="text-4xl font-bold">$3.5M+</div>
            <p className="text-sm text-gray-600 max-w-[80%]">
              Created for your comfort of choice. We are happy at your present trends.
            </p>
          </div>
        </div>

        {/* Main feature card with subtracted shape */}
        <div  style={{ width:400, height:400, clipPath: 'url(#clip2)' }} className="relative col-span-4 row-span-2">
          <div className="absolute top-0 left-0 w-[150px] h-[150px] bg-navy-900 
                          transform -translate-x-[30%] -translate-y-[30%] z-10"></div>
          <div className="relative h-full p-6 bg-red-400 rounded-3xl">
            <h2 className="text-2xl font-bold">We craft the future dwellin.</h2>
            <svg width="200" height="200">
              <defs>
              <clipPath id="clip1">
                <circle cx="500" cy="500" r="400" />
              </clipPath>
              <clipPath id="clip2"  fillRule="nonzero">
                <polygon points="300,20 10,10 120,600 80,1000 120,800" />
                <circle cx="50" cy="50" r="40" />
              </clipPath>
              <clipPath id="combinedClip" fillRule="nonzero">
                <use href="#clip1" />
                <use href="#clip2" />
              </clipPath>
              </defs>

              <Image
                src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRoOz3EYqE4eOMpQ47qFCXOdS0pragsU2RHlqFNSUW8HkGTL71r8CMddcmHNCf_"
                width="200"
                height="200"
                alt={''}
                style={{
                  clipPath: 'url(#clip2)',
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </svg>
          </div>
        </div>

        {/* Bottom cards with clip-path */}
        <div className="relative col-span-6">
          <div className="h-full p-6 bg-green-300 rounded-3xl"
               style={{
                clipPath: 'polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)'
               }}>
            <div className="text-xl font-bold">Introduction</div>
            <p className="mt-2">A vision for liveable, sustainable & affordable.</p>
          </div>
        </div>

        {/* Card with CSS mask */}
        <div className="relative col-span-6">
          <div className="relative p-6 overflow-hidden bg-purple-400 rounded-3xl">
            <div className="absolute top-0 right-0 w-24 h-24 transform rotate-45 translate-x-8 -translate-y-8 bg-navy-900"></div>
            <div className="relative z-10">
              <div className="text-sm text-gray-500">Satisfied Clients</div>
              <div className="text-4xl font-bold">8.4M+</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>)
  );
};

export default ShapedBentoGrid;