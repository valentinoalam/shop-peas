'use client';

import React, { useEffect, useRef, useState } from "react";

import TextRevealByWord from '@/components/ui/text-reveal';
import { MagicText } from "@/components/ui/magic-text";
import Image from "next/image";
import Wave from "./wave";
import useBackgroundColor from "@/hooks/useBgColor";

import { useSocialScripts } from "@/hooks/useSocialScripts";
import SocialMediaGallery from "@/components/socialWidgets/widgets";

const Solutions = () => {
  const sectionRef = useRef<(HTMLDivElement | null)>(null)
  const { bgColor } = useBackgroundColor();
  const { scripts } = useSocialScripts();
  const [socialOpen, setSocialOpen] = useState(false);
  
  const socReady =  useRef(Object.values(scripts).some(Boolean));

  const pathRef = useRef<SVGPathElement>(null)
  const initialPath =
    "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z";
    useEffect(() => {
      let frame = 0
      let animationId: number

      const animate = () => {
          frame++

          // Create multiple waves with different frequencies and amplitudes
          const wave1 = Math.sin(frame / 40) * 8
          const wave2 = Math.sin(frame / 30) * 6
          const wave3 = Math.sin(frame / 50) * 10

          // Animate by adjusting the y-coordinates in the path
          const newPath = initialPath.replace(/(-?\d+\.?\d*)/g, (match, num) => {
              const number = Number.parseFloat(num)

              // Only animate y coordinates (every second number in the path)
              if (number === 0 || number === 1200) return num // Don't animate the start and end x coordinates

              // Add waves with different phases based on the x position

              const xPosition = number / 1200 // Normalize x position to 0-1
              const waveOffset =
                  wave1 * Math.sin(xPosition * Math.PI) +
                  wave2 * Math.sin(xPosition * Math.PI * 2) +
                  wave3 * Math.sin(xPosition * Math.PI * 1.5)
              return (number + waveOffset).toFixed(2)
          })
          if (pathRef.current) {
              pathRef.current.setAttribute("d", newPath)
          }
          animationId = requestAnimationFrame(animate)
      }
      animate()
      return () => cancelAnimationFrame(animationId)
  }, [])
  // useEffect(() => {
  //   let frame = 0
  //   let animationId: number

  //   const animate = () => {
  //     frame++
  //     // Create wave effect by adjusting control points using sine waves
  //     const wave1 = Math.sin(frame / 30) * 20
  //     const wave2 = Math.sin(frame / 30 + Math.PI) * 20

  //     const newPath = `M0,50 C25,${50 + wave1} 25,${50 + wave1} 50,50 C75,${50 + wave2} 75,${50 + wave2} 100,50`
  //     setPath(newPath)

  //     animationId = requestAnimationFrame(animate)
  //   }

  //   animate()
  //   return () => cancelAnimationFrame(animationId)
  // }, [])
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const backgroundImages = [
  //   `${process.env.NEXT_PUBLIC_APP_URL}/boo.png`,
  //   `${process.env.NEXT_PUBLIC_APP_URL}/umkm1_(Large).jpg`,
  // ];

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.75,
  //   }

  //   const handleIntersect: IntersectionObserverCallback = (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
  //       }
  //     })
  //   }

  //   const observer = new IntersectionObserver(handleIntersect, options)

  //   if (sectionRef.current) {
  //     observer.observe(sectionRef.current)
  //   }

  //   return () => {
  //     if (sectionRef.current) {
  //       observer.unobserve(sectionRef?.current)
  //     }
  //   }
  // }, [backgroundImages.length])

  return (
    <div ref={sectionRef} className="space-y-11 items-center h-max relative">
      <div className="sticky w-full max-[480px]:h-[1250px] min-[480px]:h-full">
        <TextRevealByWord
          className="absolute mx-auto emoji whitespace-break-spaces z-30 w-full backdrop-grayscale-0 -translate-y-28 min-[480px]:-translate-y-24 sm:-translate-y-32 text-black text-md"
          text="But don't worry. Tino akan membantu membuatkan landing page atau website untuk kebutuhan bisnis anda. Jadi, jika Anda memiliki bisnis, jangan ragu untuk membuat landing page atau website. Itu bisa menjadi langkah awal untuk mengembangkan bisnis Anda ke level yang lebih tinggi! 🚀"
        />
        <div
            className="hero w-full bg-white/30 sticky top-0 h-max min-h-screen"
            style={{
              backgroundImage: `url('${process.env.NEXT_PUBLIC_APP_URL}/boo2.png')`, //url('${backgroundImages[currentImageIndex]}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transition: 'background-image 3s',
              opacity:'60%',
              height: '990px'
            }}
        >

        {/* Background Image with Grayscale and Gradient Transparency */}
        <div
            className="absolute h-full z-20 inset-0 bg-gradient-to-t backdrop-filter backdrop-grayscale from-white/60 to-transparent"
          />

        </div>
        <div className="shape-divider custom-shape-divider-top solution-top">
          <Wave color={bgColor} />

        </div>
        <style>
        {`
          @keyframes wave1 {
            0% { transform: translateX(0) translateZ(0); }
            50% { transform: translateX(-25px) translateZ(0); }
            100% { transform: translateX(0) translateZ(0); }
          }
          @keyframes wave2 {
            0% { transform: translateX(0) translateZ(0); }
            50% { transform: translateX(25px) translateZ(0); }
            100% { transform: translateX(0) translateZ(0); }
          }
          @keyframes wave3 {
            0% { transform: translateX(0) translateZ(0); }
            50% { transform: translateX(-15px) translateZ(0); }
            100% { transform: translateX(0) translateZ(0); }
          }
          .wave1 {
            animation: wave1 8s ease-in-out infinite;
          }
          .wave2 {
            animation: wave2 6s ease-in-out infinite;
          }
          .wave3 {
            animation: wave3 4s ease-in-out infinite;
          }
        `}
      </style>
      
      {/* <div className="absolute bottom-0 left-0 w-full">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[150px]">
          <path 
            className="wave1 transition-all duration-300 ease-in-out" 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill={bgColor}
          />
          <path 
            className="wave2 transition-all duration-300 ease-in-out" 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            fill={bgColor}
          />
          <path 
            className="wave3 transition-all duration-300 ease-in-out" 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill={bgColor}
          />
        </svg>
      </div> */}

        <div className="shape-divider custom-shape-divider-bottom">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path className="wave1" ref={pathRef}
                d={initialPath} opacity=".25" fill={bgColor}></path>
              <path className="wave2" d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill={bgColor}></path>
              <path className="wave3" d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill={bgColor}></path>
          </svg>
        </div>
      </div>
      <div className="container relative h-max p-4 mx-auto space-y-1 text-center">
        <MagicText className="max-w-[500px] pb-3 mx-auto text-3xl font-exo font-extrabold md:text-4xl">
          Landing Page Anda adalah Mesin Penghasil Konversi
        </MagicText>
        
        <div
          className="w-max mx-auto pt-4 pb-5 px-4 items-center"
          style={{ 
            backgroundImage: `url(${process.env.NEXT_PUBLIC_APP_URL}/banner/stabilo1.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center bottom',
          }}>
          <p className=" font-bebas font-normal uppercase">Saatnya Bangun citra online Anda! </p>
        
        </div>
        <span 
          className="text-xs font-bold font-oswald tracking-wider text-blue-600 dark:text-orange-600">
          Bersama Kami
        </span>

        <div className="relative w-56 h-56 mx-auto group" onClick={() => setSocialOpen(true)}>
          <Image
            src={`/profile.jpg`}
            alt="Square Image"
            className=" size-56 absolute top-0 left-1/2 group-hover:opacity-0 -z-[0] opacity-100 transition-opacity duration-700 -translate-x-1/2 invert object-cover mx-auto rounded-b-lg rounded-t-full shadow-lg"
            // Set width
            width={500}
            // 25% of screen height
            height={500}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <Image
            src={`/profile.jpg`}
            alt="Square Image"
            className=" size-56 object-cover mx-auto z-30"
            // Set width
            width={500}
            // 25% of screen height
            height={500}
            style={{
              maskImage: `url('${process.env.NEXT_PUBLIC_APP_URL}/blob/Stacked_blob2.svg')`,
              maskComposite: "exclude",
              maskMode: "luminance",
              maskSize: "cover",
              maskRepeat: "no-repeat",
              maxWidth: "100%",
              height: "auto"
          }} />

          { socReady && (
          
            <span className="text-black animate animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 cursor-pointer font-black px-4 py-2 rounded z-50"
            >
              Click Me
            </span>
          )}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center text-white group-hover:rounded-t-sm bg-green-900/70 border-slate-300/60 border-2 rounded-b-md h-max w-full">
            <h6 className="text-md">Founder of TinoKarya</h6>
            <p className="text-sm">
              Valentino Alam
            </p>
          </div>
        </div>

         {socialOpen && (
        // <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 h-max w-full relative">
            <button
              onClick={() => setSocialOpen(false)}
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            <SocialMediaGallery />
          </div>
        // </div>  
         )} 
      </div>
    </div>
  );
};

export default Solutions