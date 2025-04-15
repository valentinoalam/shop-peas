import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image";
import React, { useState } from 'react'

function PricingImage({images, name}: {images: string[] | string; name: string}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
      
    const nextImage = () => {
      setCurrentImageIndex(prev => 
        prev === images.length - 1 ? 0 : prev + 1
      );
    };
    
    const prevImage = () => {
      setCurrentImageIndex(prev => 
        prev === 0 ? images.length - 1 : prev - 1
      );
    };
    if (!images || images.length === 0) return
    return (
        (<NeonGradientCard  className="relative">
            {Array.isArray(images) && images.length > 0 ? (
            <>
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                        fill
                        src={images[currentImageIndex]}
                        alt={`${name} preview ${currentImageIndex + 1}`}
                        className="object-cover w-full h-full"
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }} />
                    <div className="absolute left-0 right-0 flex justify-center space-x-2 bottom-4">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                                onClick={() => setCurrentImageIndex(index)} />
                        ))}
                    </div>
                </div>
                <button
                    onClick={prevImage}
                    className="absolute p-2 transform -translate-y-1/2 rounded-full left-2 top-1/2 bg-white/80"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextImage}
                    className="absolute p-2 transform -translate-y-1/2 rounded-full right-2 top-1/2 bg-white/80"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </>
            ) : typeof images === "string" &&  (
                <Image
                    fill
                    src={images}
                    alt={`${name}`}
                    className="object-cover w-full h-full"
                    style={{
                        maxWidth: "100%",
                        height: "auto"
                    }} />
            )}
        </NeonGradientCard>)
    );
}

export default PricingImage