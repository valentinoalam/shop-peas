'use effect'
import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function MagicCard({ children, className, ...props }: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    
    if (!card || !glow) return;

    const updateGlow = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        opacity: 1,
        x: x - 150,
        y: y - 150,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const removeGlow = () => {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', updateGlow);
    card.addEventListener('mouseleave', removeGlow);

    return () => {
      card.removeEventListener('mousemove', updateGlow);
      card.removeEventListener('mouseleave', removeGlow);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        // 'relative overflow-hidden rounded-xl size-full group bg-gradient-to-b from-muted/50 to-muted p-6 shadow-lg',
        className
      )}
      {...props}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px opacity-0 blur-2xl"
        style={{
          background: 'radial-gradient(circle at center, rgba(var(--primary-rgb), 0.1), transparent 70%)',
          width: '300px',
          height: '300px',
        }}
      />
      {children}
    </div>
  );
}