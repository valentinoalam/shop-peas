import React from 'react'

import TrustPilot from '@/components/socialWidgets/trustPilot'
import Testimonials  from './testimonial'

import { TestimonialForm } from '@/sections/Testimonial/testimonial-form'

const TestimonialSection = () => {
    return (
        <div className="w-full min-h-screen relative bg-gray-50 flex items-center justify-center py-5">
            <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-16 md:py-24 text-gray-800">
                <div className="w-full max-w-6xl mx-auto">
                    <div className='flex flex-col md:grid md:grid-cols-3'>
                        <div className='col-span-1'></div>
                        <div className="text-center col-span-1 max-w-xl mx-auto">
                            <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600">What people <br/>are saying.</h1>
                            <h3 className="text-xl mb-5 font-light">Don&apos;t just take our word for it. Here&apos;s what our clients have to say about our web and landing page services.</h3>
                            
                            <div className="text-center mb-10">
                                <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                                <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                                <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
                                <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                                <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                            </div>

                        </div>
                        <div className='col-span-1'>
                            <TrustPilot />
                        </div>
                    </div>
                    <Testimonials />

                    {/* Testimonial Form */}
                    <div className="mt-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">Share Your Experience</h2>
                        <TestimonialForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestimonialSection