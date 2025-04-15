import React from 'react'
import { ArrowRight } from 'lucide-react';
import RealButton from '@/components/buttons/realButton';

export const CTA = () => {
  const phoneNumber = '+6285798079847'; // Replace with your WhatsApp number (include country code without +)
  const defaultMessage = 'Hello! I have a question.'; // Customize your default message

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-4 hero-buttons sm:flex-row sm:space-y-0 sm:space-x-4">
        <RealButton onClick={handleWhatsAppClick} className="group flex">
        <span className='transition-colors duration-150 font-bold  group-hover:text-yellow-500'>Mulai Project Anda</span>
        <ArrowRight className="w-4 h-4 ml-1 fill-black stroke-black z-20 opacity-80 group-hover:opacity-100 group-hover:stroke-yellow-300 group-hover:fill-yellow-400 transition-all duration-150 group-hover:translate-x-1" />
        </RealButton>
        {/* <MagicButton size="lg" variant="outline">
        View Our Work
        </MagicButton> */}
    </div>
  )
}
