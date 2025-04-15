'use client';
import gsap from 'gsap';
import { useRef, useEffect, useState, SVGProps, ForwardRefRenderFunction, useCallback } from 'react';
import propTypes from 'prop-types';
import Image from "next/image";
import { landingPageCreationProcess } from './content';
import { setupAnimations } from './animation';
import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import CircuitAnimation from './background';
import LayeredTriange from './topDivider';
import useBackgroundColor from '@/hooks/useBgColor';
import useScrollContext from '@/hooks/useScrollTracking';
interface StepType {
  id: number
  title: string
  name: string
  description: string
  ensures: string | string[] 
  process: string | string[]
  outcome: string 
  illustration: string 
  icon: React.ComponentType<SVGProps<SVGSVGElement>>
}
interface StepProps {
  step: StepType;
  activeStep: number;
  index: number;
  progress: number;
}
const Step: ForwardRefRenderFunction<HTMLDivElement, StepProps> = (props, ref) => {
  const { step, activeStep, index, progress } = props
  return (
    (<div ref={ref} className={`flex relative h-max origin-top ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
      <div className="w-full sm:w-40 text-center relative overflow-visible">
        <Popover>
          <PopoverTrigger asChild>
            <div
              className={`items-center ${
                index % 2 !== 0 ? "lg:absolute lg:left-0 lg:-translate-x-[60%]" : ""
              } rounded-3xl max-w-[calc(100vw-6rem)] sm:max-w-[38rem] w-max sm:w-96 bg-gray-200 shadow-md group overflow-hidden cursor-pointer hover:bg-gray-300 transition-colors`}
            >
              <div className="w-full h-full relative flex gap-2">
                <div
                  className="absolute top-0 w-full h-full bg-amber-400 -z-0"
                  style={{
                    maskImage: `url('${process.env.NEXT_PUBLIC_APP_URL}/divider/intersecting-tilt-angles2.svg')`,
                    maskRepeat: "repeat",
                    maskPosition: "top",
                    maskSize: "cover",
                  }}
                ></div>
                {/* Left side */}
                <div className="feature-detail flex flex-col relative items-start pl-2 sm:pl-4 py-2 sm:py-4">
                  <span className="font-semibold text-base sm:text-xl z-10">{step.title}</span>
                  <span className="text-gray-600 text-sm sm:text-base text-left z-10">{step.description}</span>
                </div>

                {/* Right side */}
                <div className="mb-2 sm:mb-0 z-50 pr-2 sm:pr-4 flex items-center">
                  <step.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-[calc(100vw-2rem)] sm:w-96 p-4 sm:p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>

              {/* Display Ensures */}
              {step.ensures && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Ensures:</h4>
                  {Array.isArray(step.ensures) && (
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {step.ensures.map((ensure, index) => (
                        <li key={index}>{ensure}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Display Process */}
              {step.process && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Process:</h4>
                  {Array.isArray(step.process) && (
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {step.process.map((processStep, index) => (
                        <li key={index}>{processStep}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Display Outcome */}
              {step.outcome && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Outcome:</h4>
                  <p className="text-sm text-gray-600">{step.outcome}</p>
                </div>
              )}

              {/* Display Illustration */}
              {/* {step.illustration && (
                <div className="mt-4">
                  <Image
                    src={step.illustration || "/placeholder.svg"}
                    alt="Illustration"
                    className="w-full h-auto rounded-lg"
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto"
                    }} />
                </div>
              )} */}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {/* Progress Indicator */}
      <div className="flex flex-col items-start px-2 sm:px-4 overflow-visible">
        <div
          className={`relative flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 transition duration-300 ${
            activeStep >= index ? "text-black" : "text-neutral-300"
          }`}
        >
          <svg
            viewBox="0 0 596 596"
            className="absolute w-full h-full overflow-visible"
            style={{
              transform: "scale(0.9)",
            }}
          >
            <path
              className={`transition-all duration-300 ${
                activeStep >= index
                  ? "animate-spin stroke-indigo-700 fill-[#DDCDAF] drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]"
                  : "fill-none stroke-slate-500/50"
              }`}
              style={{
                strokeWidth: 22,
                transformOrigin: "center",
                animationDuration: "3s",
              }}
              d="M 289.209 146.527 C 251.329 146.527 215.76 161.251 189.083 187.986 C 162.406 214.721 147.624 250.232 147.624 288.112 C 147.624 325.99 162.348 361.387 189.083 388.237 C 215.76 414.914 251.445 429.696 289.209 429.696 C 327.088 429.696 362.657 414.972 389.335 388.237 C 416.011 361.503 430.794 325.99 430.794 288.112 C 430.794 250.232 416.069 214.836 389.335 187.986 C 362.657 161.308 327.088 146.527 289.209 146.527 Z M 289.209 406.022 C 223.902 406.022 171.241 353.129 171.241 288.053 C 171.241 222.977 223.902 170.085 289.209 170.085 C 354.516 170.085 407.177 223.036 407.177 288.053 C 407.177 353.072 354.516 406.022 289.209 406.022 Z M 536.462 229.099 L 514.058 229.099 C 495.753 229.099 480.452 213.739 480.452 194.915 C 480.452 185.503 484.437 177.073 491.538 170.72 L 505.974 156.574 C 520.294 142.427 520.294 119.446 505.974 105.125 L 473.119 72.559 C 466.651 66.091 457.066 62.222 447.308 62.222 C 437.549 62.222 428.137 66.034 421.497 72.559 L 407.639 86.416 C 400.998 93.808 391.874 97.792 382.29 97.792 C 363.408 97.792 347.356 82.432 347.356 64.301 L 347.356 42.013 C 347.356 22.091 331.88 5 311.959 5 L 267.093 5 C 246.768 5 230.542 21.975 230.542 42.013 L 230.542 64.417 C 230.542 82.548 214.894 97.907 196.07 97.907 C 186.658 97.907 178.054 93.923 171.587 86.994 L 157.267 72.847 C 150.799 66.206 141.215 62.511 131.455 62.511 C 121.697 62.511 112.285 66.322 105.645 72.847 L 72.789 105.298 C 58.642 119.446 58.642 142.6 72.789 156.632 L 86.647 170.49 C 94.038 177.13 98.139 185.503 98.139 195.088 C 98.139 213.97 82.779 229.271 64.532 229.271 L 42.128 229.271 C 21.918 229.099 5 245.613 5 265.707 L 5 288.112 L 5 310.516 C 5 330.437 21.976 347.067 42.128 347.067 L 64.532 347.067 C 82.836 347.067 98.139 362.426 98.139 381.25 C 98.139 390.663 94.038 399.381 86.647 406.022 L 72.789 419.591 C 58.642 433.739 58.642 456.72 72.789 470.925 L 105.645 503.664 C 112.112 510.305 121.697 514.001 131.455 514.001 C 141.215 514.001 150.627 510.189 157.267 503.664 L 171.587 489.518 C 177.766 482.589 186.484 478.604 195.896 478.604 C 214.778 478.604 230.369 493.964 230.369 512.095 L 230.369 534.499 C 230.369 554.42 246.595 571.512 266.804 571.512 L 311.612 571.512 C 331.65 571.512 348.337 554.536 348.337 534.499 L 348.337 512.095 C 348.337 493.964 363.812 478.604 382.693 478.604 C 392.106 478.604 400.825 482.704 407.639 489.98 L 421.497 503.838 C 428.137 510.305 437.549 514.173 447.308 514.173 C 457.066 514.173 466.478 510.363 473.119 503.838 L 505.974 471.097 C 520.121 456.951 520.121 433.796 505.974 419.649 L 491.538 405.502 C 484.437 399.15 480.452 390.143 480.452 380.904 C 480.452 362.022 495.811 346.085 514.058 346.085 L 536.462 346.085 C 556.499 346.085 570.819 330.898 570.819 310.862 L 570.819 288.169 L 570.819 265.765 C 570.819 245.613 556.499 229.099 536.462 229.099 Z"
            />
          </svg>
          <span className="relative z-10 text-sm sm:text-lg font-semibold bg-white w-4 h-4 sm:w-5 sm:h-5 items-center flex justify-center text-center rounded-full">
            {index + 1}
          </span>
        </div>
        {index !== landingPageCreationProcess.length - 1 && (
          <div className="relative h-48 md:h-36 w-12 sm:w-16 overflow-visible justify-center">
            <div
              className="absolute overflow-visible left-1/2 top-0 w-0.5 bg-gradient-to-r from-red-500 via-red-300 to-red-500 blur-[2px]"
              style={{ height: `${progress}%` }}
            ></div>
            <div
              className="absolute overflow-visible left-1/2 top-0 w-0.5 bg-gradient-to-r from-red-500 via-red-300 to-red-500"
              style={{ height: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
      <div className="w-20 sm:w-40"></div>
    </div>)
  );
};

const ForwardedStep = React.forwardRef(Step); // Create the forwarded component

const ScrollStepper = ({stepRefs, sectionRef}: {stepRefs: React.RefObject<(HTMLDivElement | null)[]>; sectionRef: React.RefObject<(HTMLDivElement | null)>}) => {
  const { scrollY } = useScrollContext();
  const [activeStep, setActiveStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const setStepRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if(el) stepRefs.current[index] = el;  // Correctly assign to the array
  }, [stepRefs]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    // Get the section's position relative to the viewport
    const sectionTop = section.offsetTop
    const viewportHeight = window.innerHeight
    const scrollPosition = (scrollY - sectionTop) + viewportHeight / 2;
    const refs = stepRefs.current.filter(Boolean); // Filter out null refs
    let currentActiveStep = -1;
    if (refs.length === 0) return;
    // Find the last step that's above the scroll position
    for (let i = 0; i < refs.length; i++) {
      const ref = refs[i];
      // console.log(`ref[${i}]`, ref?.offsetTop, scrollPosition)
      if (ref && ref.offsetTop < scrollPosition) {
        currentActiveStep = i;
      } else {
        break; // Exit loop when we find first element below scroll position
      }
    }
    
    // Update active step
    setActiveStep(currentActiveStep);
    
    // Calculate progress
    if (currentActiveStep >= 0 && currentActiveStep < refs.length - 1) {
      const currentRef = refs[currentActiveStep];
      const nextRef = refs[currentActiveStep + 1];
      
      if (currentRef && nextRef) {
        const totalHeight = nextRef.offsetTop - currentRef.offsetTop;
        const scrolledHeight = window.innerWidth >= 768 ? scrollPosition - currentRef.offsetTop/2:scrollPosition - currentRef.offsetTop;
        setProgress(Math.min(Math.max((scrolledHeight / totalHeight) * 100, 0), 100));
      }
    } else if (currentActiveStep === refs.length - 1) {
      setProgress(100);
    } else {
      setProgress(0);
    }

  }, [scrollY, sectionRef, stepRefs]); 


  return (
    <div className='flex justify-start md:justify-center overflow-x-clip'>
      <div className="flex flex-col">
        {landingPageCreationProcess.map((step, index) => (
            <ForwardedStep 
              key={step.id}
              step={step} 
              ref={setStepRef(index)}
              activeStep={activeStep} 
              index={index}
              progress={
                activeStep === index ? progress : activeStep > index ? 100 : 0
              } 
            />
        ))}
      </div>
    </div>
  );
};

const HowThingsWork = () => {
  const {scrollDirection} = useScrollContext();
  const sectionRef = useRef<(HTMLDivElement | null)>(null)
  const tagRef = useRef<(HTMLDivElement | null)>(null)
  const titleRef = useRef<(HTMLDivElement | null)>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])
  // const [sectionSize,setSectionSize] = useState<{offsetTop:number, offsetBottom:number}>();
  const targetRef = useRef(null);
  const [showFrame, setShowFrame] = useState(false);
  const { bgColor } = useBackgroundColor();
  // const animationRef = useRef<number | null>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      setupAnimations(
        sectionRef.current!,
        tagRef.current!,
        titleRef.current!,
        featureRefs.current.filter((ref): ref is HTMLDivElement => ref !== null)
      );
    });
    
    return () => ctx.revert(); // Cleans up all GSAP animations
  }, []);

  useEffect(()=> {
    if (showFrame) return;
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && scrollDirection === "down") {
          setShowFrame(true);
          observer.disconnect(); // Stop observing after it becomes visible
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [scrollDirection, showFrame])
  return (
    (<div ref={sectionRef} className='container mx-auto pb-24 z-10 space-y-4 min-h-[2000px] relative overflow-x-clip'>
      <div className="shape-divider custom-shape-divider-top process">
        <LayeredTriange color={bgColor} />
      </div>
      <CircuitAnimation className={`${showFrame ? "flex" : "hidden"} mx-auto `} />
      <div className='absolute container top-0 left-0 w-full h-full'>
        <div className="flex justify-center h-60 z-50">
          <div ref={tagRef} className="relative mx-auto pr-24 text-7xl">
            <span className='relative z-10 text-white font-extrabold font-bebas'>How it Works</span>
            <Image
              src="/setting.png"
              width={256}
              height={283}
              className="absolute grayscale-75% invert -z-0 -right-7 -top-20 aspect-auto"
              alt="setting"
              style={{
                width: "256px",
                height: "283px",
              }}
              />
              
          </div>
        </div>
        <p
          ref={titleRef}
          className=" max-w-full sm:max-w-xl md:max-w-2xl mx-auto text-md sm:text-base md:text-lg text-justify mt-5 pl-16 text-green-50 px-4 leading-relaxed"
        >
          Landing page dimulai dari sebuah ide atau tujuan. Setelah melalui proses konsultasi dan 
          perencanaan, tujuan tersebut dituangkan dalam bentuk bahasa komunikasi yang jelas bagi audiens 
          brand klien, lalu dikemas dengan desain visual yang menarik. Setelah dikembangkan dengan 
          teknologi modern, landing page Anda siap diluncurkan ke dunia digital, menarik perhatian audiens, 
          dan membantu mencapai tujuan bisnis Anda dengan efektif.
        </p>

        <ScrollStepper stepRefs={featureRefs} sectionRef={sectionRef} />
        <div ref={targetRef} className='end py-8'></div>
      </div>
    </div>)
  );
};

Step.propTypes = {
  step: propTypes.object.isRequired,
  activeStep: propTypes.number.isRequired,
  index: propTypes.number.isRequired,
  progress: propTypes.number.isRequired
};

export default HowThingsWork;