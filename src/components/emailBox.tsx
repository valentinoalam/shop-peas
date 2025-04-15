'use client'

import React, { useEffect, useRef } from 'react'
import { Mail } from 'lucide-react'
import { gsap } from "gsap"

const EmailBox = () => {
    const boxRef = useRef<HTMLDivElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)
  
    useEffect(() => {
      if (boxRef.current && iconRef.current && inputRef.current && buttonRef.current) {
        gsap.set(boxRef.current, { width: "0.5rem", borderRadius: "100%" })
        gsap.set([iconRef.current, inputRef.current, buttonRef.current], { opacity: 0, y: 20 })
  
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: boxRef.current,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none reverse",
          },
        })
  
        tl.to(boxRef.current, {
          width: "70%",
          borderRadius: "999px",
          duration: 1,
          ease: "power3.out",
          // repeat: -1,
          // yoyo: true,
        })
          .to(iconRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.5")
          .to(inputRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
          .to(buttonRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      }
    }, [])
  
    return (
      <div ref={boxRef} className="bg-white p-4 rounded-full flex items-center mx-auto w-[70%] relative overflow-hidden">
        <div ref={iconRef}>
          <Mail size={30} className="text-gray-400" />
        </div>
  
        <input
          ref={inputRef}
          type="email"
          placeholder="Enter Email"
          className="outline-none border-none ml-4 text-base text-gray-500 font-josefin-sans flex-1 placeholder:text-sm"
        />
  
        <div
          ref={buttonRef}
          className="absolute right-2 h-[80%] bg-secondary-color flex items-center justify-center px-8 rounded-full text-white"
        >
          Get Funded
        </div>
      </div>
    )
  }

export default EmailBox
