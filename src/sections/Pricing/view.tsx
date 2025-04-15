'use client';

import { useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import gsap from 'gsap';
import { Checkbox } from '@/components/ui/checkbox';
import { BorderBeam } from '@/components/ui/border-beam';
import packages, { basicAddOns, moreAddOns } from './content';
import PricingImage from './pricingImage';
import { ThreeLines } from '@/components/lines/3lines';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ParallaxCard from '@/components/cards/paralax';

const PricingPackages = () => {
  const addonsData = [...basicAddOns, ...moreAddOns];
  const sectionRef = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<{ [key: string]: boolean }>({});
  // const calculateTotal = (pkg: Package) => {
  //   const selectedAddonsPrices = selectedAddons
  //     .map(id => {
  //       const addon = pkg.addons?.find(a => a.id === id);
  //       return addon ? parseInt(addon.cost.replace(/[^0-9]/g, '')) : 0; // Default to 0 if addon is not found
  //     })
  //     .reduce((a, b) => a + b, 0);
  //   return selectedAddonsPrices;
  // };


  // useEffect(() => {
  //   let ctx: gsap.Context | null = null;
  //   let toggleClickHandler: (() => void) | null = null;
  //   const toggleState = toggle.current;
  //   if (sectionRef.current) {
  //     ctx = gsap.context(() => {
  //       // Scope GSAP selectors to the sectionRef
  //       const pricingItems = gsap.utils.toArray<Element>('.pricing-item');
  //       const [annualPrices, monthlyPrices] = [
  //         gsap.utils.toArray('.annual'),
  //         gsap.utils.toArray('.month')
  //       ];
  //       // Initial hide monthly prices
  //       gsap.set(monthlyPrices, { opacity: 0, display: 'none' });

  //       // Animation setup
  //       gsap.fromTo(pricingItems,
  //         { opacity: 0, y: 50 },
  //         { 
  //           opacity: 1,
  //           y: 0,
  //           duration: 1.5,
  //           ease: 'power4.out',
  //           stagger: 0.15 // Add staggered animation
  //         }
  //       );

  //       // Add toggle interaction if needed
  //       if (toggle.current) {
  //         toggleClickHandler = () => {
  //           const isAnnual = toggle.current?.classList.contains('active');
            
  //           // Animate price switch
  //           gsap.timeline()
  //             .to(isAnnual ? annualPrices : monthlyPrices, {
  //               opacity: 0,
  //               duration: 0.3,
  //               onComplete: () => {
  //                 gsap.set(isAnnual ? annualPrices : monthlyPrices, { display: 'none' });
  //                 gsap.set(isAnnual ? monthlyPrices : annualPrices, { display: 'block' });
  //               }
  //             })
  //             .to(isAnnual ? monthlyPrices : annualPrices, {
  //               opacity: 1,
  //               duration: 0.3
  //             }, '<0.2');

  //           toggle.current?.classList.toggle('active');
  //         };

  //         toggle.current.addEventListener('click', toggleClickHandler);
  //       }
  //     }, [sectionRef]);
  //   }
  
  //   // Cleanup function
  //   return () => {
  //     if (toggleClickHandler && toggleState) {
  //       toggleState.removeEventListener('click', toggleClickHandler);
  //     }
  //     ctx?.revert();
  //   };
  // }, []); 

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [addonId]: !prev[addonId],
    }));
  };


  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div ref={sectionRef} className="container relative py-24 h-max mx-auto">
      <div className="w-full md:w-max mx-auto px-3 h-48 mb-11 content-center relative">
        <div
          className="w-full absolute -top-[0.5rem] md:-top-[1.5rem] left-0 px-3 z-0 bg-rose-600 h-full" 
          style={{ 
            maskImage: `url('${process.env.NEXT_PUBLIC_APP_URL}/divider/intersecting-tilt-angles2.svg')`, 
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "top",
            backgroundClip: "text",
        }}><h2 className='text-center sticky pb-3 md:pb-5 text-5xl md:text-7xl font-sans z-30 text-sky-800 font-bold'>We humbly offer</h2></div> 
        <div
          className="w-full absolute top-0 left-0 px-3 z-0 bg-rose-600 h-full" 
          style={{ 
            maskImage: `url('${process.env.NEXT_PUBLIC_APP_URL}/divider/layered-triangle2.svg')`, 
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center 18%",
            backgroundClip: "text",
        }}><h2 className='text-center sticky pb-3 md:pb-5 text-5xl md:text-7xl font-sans z-30 text-rose-600 font-bold'>We humbly offer</h2></div>
        <div
          className="w-full absolute top-[2rem] md:top-[4.6rem] left-0 px-3 z-0 text-slate-950 h-full" 
          style={{ 
            maskImage: `url('${process.env.NEXT_PUBLIC_APP_URL}/divider/layered-triangle.svg')`, 
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center 0%",
            backgroundClip: "text",
            
        }}><h2 className='text-center sticky pb-3 md:pb-5 text-5xl md:text-7xl font-sans z-30 font-bold'>We humbly offer</h2></div>
        <h2 className='text-center sticky pb-3 md:pb-5 text-5xl md:text-7xl font-sans z-30 font-bold'>We humbly offer</h2>
        <span className="text-md text-center sticky w-max z-30 drop-shadow-md flex place-content-center font-bold font-nunito pl-4 tracking-wider text-blue-600 uppercase">Our Packages</span>
      </div>
        
      <div className="flex flex-row justify-center my-4 text-sm tracking-tight font-medium text-gray-700">
        <p className="mx-3 annual">Annually</p>

        <label 
          htmlFor="toggle" 
          className="flex items-center cursor-pointer"
        >
          <div className="relative">
            {/* Hidden checkbox input */}
            <input
              ref={toggle}
              id="toggle"
              type="checkbox"
              className="sr-only peer"  // Changed from 'hidden' to 'sr-only' for screen readers
              onChange={handleToggle}    // Add onChange handler if needed
              checked={isChecked}        // Add checked state if controlled
              role="switch"              // Add ARIA role
              aria-checked={isChecked}   // Add ARIA attribute
            />
            
            {/* Track */}
            <div className="w-10 h-3 bg-gray-300 rounded-full shadow-inner peer-checked:bg-blue-500 transition-colors duration-300" />
            
            {/* Thumb */}
            <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 left-0 peer-checked:translate-x-5" />
          </div>
        </label>

        <p className="mx-3 month">Monthly</p>
      </div>
      <Tabs defaultValue="LP" className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TabsList className="bg-transparent col-span-1 md:col-span-2 p-4">
          {packages.map((pkg) => (
            <TabsTrigger key={pkg.id} value={pkg.id.toString()} className="w-max md:w-72 relative flex flex-col md:flex-row data-[state=active]:border-blue-400 group data-[state=active]:bg-blue-50 data-[state=active]:shadow-blue-500 data-[state=active]:shadow-lg hover:border-stone-600 transition-all duration-1000 items-center bg-white/50 justify-between mx-auto border cursor-pointer rounded-xl dark:border-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" stroke='white' strokeWidth={1} strokeOpacity={0.6} className="w-5 h-5 absolute -right-2 -top-3 drop-shadow-sm hidden group-data-[state=active]:inline-flex text-blue-600 sm:h-9 sm:w-9" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>

              <h2 className="text-lg font-medium text-gray-700 sm:text-2xl dark:text-gray-200">{pkg.title}</h2>
              <span className="text-xs font-semibold text-blue-600 sm:text-sm dark:text-gray-300 self-end">{ typeof pkg.price === "object"? pkg.price?.monthly : pkg.price }</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {packages.map((pkg) => (
          <TabsContent className='col-span-1 p-4' key={pkg.id} value={pkg.id.toString()}>
            <ParallaxCard className={`${pkg.id === 'LP' ? 'shadow-[10px_15px_1px_0px_rgba(0,40,159,1)]': 'shadow-[10px_15px_1px_0px_rgba(70,0,90,1)]'} transition-all duration-200 ease-in-out relative`}>
            <Card className={`${pkg.id === 'LP' ? 'from-[#667db6] via-[#0082c8] to-[#667db6]': 'from-[#b69166] via-[#c8c500] to-[#b68a66]'} transition-all duration-200 ease-in-out pricing-item relative text-white overflow-hidden bg-gradient-to-r`}>
              <CardContent className="p-6">
                <ThreeLines className='opacity-30' />
                <div className="">
                  <div className="space-y-6">
                    <div className='w-4/6'>
                      <h3 className="mb-2 text-2xl font-bold">{pkg.title}</h3>
                      <p>{pkg.description}</p>
                      { typeof pkg.price === "object"? (
                        <>
                          <p className="text-xl font-semibold text-gray-500">Monthly</p>
                          <p className="text-3xl font-bold text-yellow-300">{pkg.price?.monthly}</p>
                          <p className="text-xl font-semibold text-gray-500">Yearly</p>
                          <p className="text-3xl font-bold text-yellow-300">{pkg.price?.yearly}</p>
                        </>)
                      : (<p className="text-3xl font-bold text-yellow-300">{pkg.price}</p>)}
                      
                    </div>
                    {!Array.isArray(pkg.features) ? (
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="mb-4 font-semibold">Core Features</h4>
                        <ul className="space-y-3 flex relative flex-col">
                          {pkg.features.column1?.map((feature) => (
                            <li key={feature} className="flex items-center">
                              <span className='className="w-5 h-5 mr-2'><Check className="w-5 h-5 text-green-500" /></span> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-4 font-semibold">Additional Features</h4>
                        <ul className="space-y-3">
                          {pkg.features.column2?.map((feature) => (
                            <li key={feature} className="flex items-center">
                              <span className='className="w-5 h-5 mr-2'><Check className="w-5 h-5 text-green-500" /></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="mb-4 font-semibold">Core Features</h4>
                      <ul className="space-y-3">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <Check className="w-5 h-5 mr-2 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  { pkg.images && <PricingImage images={pkg.images} name={pkg.title} /> } 
                  {/* packages[0].images */}
                  </div>
                  <p className="text-sm mb-4">Durasi: {pkg.duration}</p>
                  {pkg.notes && (
                    <div className="text-sm text-gray-600">
                      <h3 className="font-semibold">Catatan:</h3>
                      <ul className="list-disc pl-5">
                        {pkg.notes.map((note, index) => (
                          <li key={index} className="mb-2">
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
              <BorderBeam size={300} duration={12} delay={9} borderWidth={2} />
            </Card>
            </ParallaxCard>
          </TabsContent>
        ))}
        <div className="col-span-1 px-2 py-6 bg-fuchsia-300/5 relative">
          <div className='absolute top-0 right-0 z-0'>
            <span className="absolute right-0 top-7">
              <svg
                width="77"
                height="172"
                viewBox="0 0 77 172"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="86"
                      y1="0"
                      x2="86"
                      y2="172"
                      gradientUnits="userSpaceOnUse"
                      >
                      <stop stopColor="#3056D3" stopOpacity="0.09" />
                      <stop
                          offset="1"
                          stopColor="#C4C4C4"
                          stopOpacity="0"
                          />
                    </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="absolute right-4 top-4">
              <svg
                  width="41"
                  height="89"
                  viewBox="0 0 41 89"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <circle
                      cx="38.9138"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 38.9138 87.4849)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="38.9138"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 38.9138 74.9871)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="38.9138"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 38.9138 62.4892)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="38.9138"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 38.9138 38.3457)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="38.9138"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 38.9138 13.634)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="38.9138"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 38.9138 50.2754)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="38.9138"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 38.9138 26.1319)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="38.9138"
                      cy="1.42021"
                      r="1.42021"
                      transform="rotate(180 38.9138 1.42021)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="26.4157"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 26.4157 87.4849)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="26.4157"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 26.4157 74.9871)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="26.4157"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 26.4157 62.4892)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="26.4157"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 26.4157 38.3457)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="26.4157"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 26.4157 13.634)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="26.4157"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 26.4157 50.2754)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="26.4157"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 26.4157 26.1319)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="26.4157"
                      cy="1.4202"
                      r="1.42021"
                      transform="rotate(180 26.4157 1.4202)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="13.9177"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 13.9177 87.4849)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="13.9177"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 13.9177 74.9871)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="13.9177"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 13.9177 62.4892)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="13.9177"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 13.9177 38.3457)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="13.9177"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 13.9177 13.634)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="13.9177"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 13.9177 50.2754)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="13.9177"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 13.9177 26.1319)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="13.9177"
                      cy="1.42019"
                      r="1.42021"
                      transform="rotate(180 13.9177 1.42019)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="1.41963"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 1.41963 87.4849)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="1.41963"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 1.41963 74.9871)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="1.41963"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 1.41963 62.4892)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="1.41963"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 1.41963 38.3457)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="1.41963"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 1.41963 13.634)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="1.41963"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 1.41963 50.2754)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="1.41963"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 1.41963 26.1319)"
                      fill="#3056D3"
                      />
                  <circle
                      cx="1.41963"
                      cy="1.4202"
                      r="1.42021"
                      transform="rotate(180 1.41963 1.4202)"
                      fill="#3056D3"
                      />
              </svg>
            </span>
          </div>
          <h3 className="mb-4 text-xl font-bold">Additional Options</h3>
          <TooltipProvider>
          <div className="relative justify-start border-4 rounded-3xl border-indigo-50 px-3 z-20 w-full bg-no-repeat bg-left-bottom bg-svg-bottom">
            {/* { addOns && addOns.length > 0 ? addOns.map((addon) => (
              <div key={addon.id} className="flex items-center justify-between p-1">
                <div className="flex items-center space-x-1">
                  <Checkbox
                    id={`addon-${addon.id}`}
                    checked={selectedAddons.includes(addon.id)}
                    onCheckedChange={() => handleAddonToggle(addon.id)}
                  />
                  <div className='w-4/5 min-w-52'>
                    <label 
                      htmlFor={`addon-${addon.id}`}
                      className="font-medium cursor-pointer"
                    >
                      {addon.title}
                    </label>
                    <p className="text-sm text-gray-600">{addon.details}</p>
                  </div>
                </div>
                <span className="font-semibold text-sm justify-end text-right min-w-48">{addon.cost}</span>
              </div>
              
            )): <></>} */}
            <Accordion 
              type="single" collapsible 
              className="space-y-1 mt-4 mb-6">
              {addonsData.map((category, index) => (
                <AccordionItem key={index} value={category.name} className='border-none'>
                  <AccordionTrigger className="text-lg font-semibold pt-4 pb-0">{category.name}</AccordionTrigger>
                  <AccordionContent className="space-y-1 border-none py-1">
                    {category.items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3 px-3 py-1 rounded-lg">
                        <Checkbox id={item.id} checked={selectedAddons[item.id] || false} onCheckedChange={() => handleAddonToggle(item.id)} />
                                                  {/* Tooltip Wrapper */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                        <div className="flex-1 flex justify-between">

                            <Label className="font-medium text-gray-900 cursor-pointer">{item.title}</Label>
                            {/* <p className="text-sm text-gray-600">{item.details}</p> */}
                            <p className="text-sm font-semibold text-gray-700">{item.cost}</p>
                            
                            {/* {item.note && <p className="text-xs text-gray-500 italic">{item.note}</p>} */}
                        </div>
                        </TooltipTrigger>
                            <TooltipContent className="max-w-md bg-slate-50 text-sm text-gray-900">
                              {item.details}
                              {item.note && <p className="mt-1 italic text-gray-500">{item.note}</p>}
                            </TooltipContent>
                          </Tooltip>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {/* {selectedAddons.length > 0 && (
              <div className="p-4 mt-4 rounded-lg bg-gray-50">
                <p className="font-bold">Selected Add-ons Total: ${calculateTotal(pkg)}</p>
              </div>
            )} */}
          </div>
          </TooltipProvider>
        </div>
      </Tabs>
    </div>
  );
};

export default PricingPackages;

/**
 * import React, { useState } from 'react';
import { Check, X, Info, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const PricingPackages = () => {
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      name: "Landing Page",
      price: "$799",
      features: [
        "Single page design",
        "Mobile responsive",
        "Contact form",
        "Basic SEO optimization",
        "2 rounds of revisions"
      ],
      details: [
        "Perfect for businesses needing a simple online presence",
        "Optimized for lead generation",
        "Fast loading and performance optimized",
        "Includes basic meta tags and SEO structure",
        "Mobile-first responsive design",
        "Basic analytics setup",
        "Standard contact form with email notifications",
        "Up to 2 rounds of revisions included"
      ],
      highlighted: false
    },
    {
      name: "Basic Website",
      price: "$1,499",
      features: [
        "Up to 5 pages",
        "Mobile responsive",
        "Contact form",
        "Basic SEO optimization",
        "Content management system",
        "Basic analytics integration",
        "3 rounds of revisions"
      ],
      details: [
        "Ideal for small to medium businesses",
        "Full content management system",
        "User-friendly admin panel",
        "Enhanced SEO structure and optimization",
        "Google Analytics integration",
        "Multiple contact forms with custom fields",
        "Social media integration",
        "Up to 3 rounds of revisions included",
        "30-day post-launch support"
      ],
      highlighted: true
    },
    {
      name: "Special Website",
      price: "$2,999",
      features: [
        "Up to 10 pages",
        "Mobile responsive",
        "Advanced contact forms",
        "Advanced SEO optimization",
        "Content management system",
        "Advanced analytics",
        "E-commerce ready",
        "5 rounds of revisions"
      ],
      details: [
        "Complete solution for growing businesses",
        "Advanced content management system",
        "Custom user roles and permissions",
        "Advanced SEO tools and features",
        "Enhanced security features",
        "Advanced analytics dashboard",
        "E-commerce functionality ready",
        "Multiple language support",
        "Advanced contact forms with CRM integration",
        "60-day post-launch support",
        "Priority support channel"
      ],
      highlighted: false
    }
  ];

  const addons = [
    { id: 1, name: "Additional page", price: "$150/page", details: "Custom designed page matching your site's style" },
    { id: 2, name: "Blog setup", price: "$299", details: "Complete blog setup with categories and tags" },
    { id: 3, name: "E-commerce integration", price: "$799", details: "Full shopping cart and payment processing setup" },
    { id: 4, name: "Custom animation", price: "$399", details: "Smooth, interactive animations and transitions" },
    { id: 5, name: "Newsletter integration", price: "$199", details: "Email capture and newsletter system setup" },
    { id: 6, name: "Additional revision round", price: "$149", details: "Extra round of revisions beyond package inclusion" }
  ];

  const handleAddonToggle = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const showPackageDetails = (pkg) => {
    setSelectedPackage(pkg);
    setOpenDialog(true);
  };

  const calculateTotal = () => {
    const selectedAddonsPrices = selectedAddons.map(id => {
      const addon = addons.find(a => a.id === id);
      return parseInt(addon.price.replace(/[^0-9]/g, ''));
    }).reduce((a, b) => a + b, 0);
    return selectedAddonsPrices;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.name} className={`relative ${pkg.highlighted ? 'border-blue-500 border-2' : ''}`}>
            {pkg.highlighted && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center">{pkg.name}</CardTitle>
              <p className="text-3xl font-bold text-center mt-2">{pkg.price}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full mt-4"
                onClick={() => showPackageDetails(pkg)}
              >
                View Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Additional Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {addons.map((addon) => (
              <div key={addon.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`addon-${addon.id}`}
                    checked={selectedAddons.includes(addon.id)}
                    onCheckedChange={() => handleAddonToggle(addon.id)}
                  />
                  <div>
                    <label 
                      htmlFor={`addon-${addon.id}`}
                      className="font-medium cursor-pointer"
                    >
                      {addon.name}
                    </label>
                    <p className="text-sm text-gray-500">{addon.details}</p>
                  </div>
                </div>
                <span className="font-semibold">{addon.price}</span>
              </div>
            ))}
          </div>
          {selectedAddons.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-bold">Selected Add-ons Total: ${calculateTotal()}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedPackage?.name} - Detailed Features</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <ul className="space-y-3">
              {selectedPackage?.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PricingPackages;

 */