import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';

const ParallaxCard = ({
    children, className
  }: Readonly<{
    children: React.ReactNode;
    className: string
  }>) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();

    // Calculate the center of the card
    const centerX = cardRect.left + cardRect.width / 2;
    const centerY = cardRect.top + cardRect.height / 2;

    // Calculate mouse position relative to card center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation (limit to prevent extreme tilting)
    const rotateX = Math.min(Math.max(-mouseY / 20, -15), 15);
    const rotateY = Math.min(Math.max(mouseX / 20, -15), 15);

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    // Reset to neutral position when mouse leaves
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      className="perspective-container w-full h-screen flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className="card-wrapper w-max h-max transition-transform duration-100"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div 
          className={cn("card shadow-2xl rounded-xl overflow-hidden w-full h-full relative", className)}
          style={{
            transform: 'translateZ(50px)',
            // boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
          }}
        >
          {/* Card Content Layers */}
            {children}
        </div>
      </div>
    </div>
  );
};

export default ParallaxCard;