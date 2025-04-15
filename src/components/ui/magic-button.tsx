import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  variant?: 'default' | 'outline';
}

export function MagicButton({ children, className, size = undefined, variant = 'default', ...props }: MagicButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const glow = glowRef.current;
    
    if (!button || !glow) return;

    const updateGlow = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        x: x,
        y: y,
        opacity: 1,
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const removeGlow = () => {
      gsap.to(glow, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mousemove', updateGlow);
    button.addEventListener('mouseleave', removeGlow);

    return () => {
      button.removeEventListener('mousemove', updateGlow);
      button.removeEventListener('mouseleave', removeGlow);
    };
  }, []);

  return (
    <Button
      ref={buttonRef}
      size={size}
      variant={variant}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 50%)',
          width: '30px',
          height: '30px',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {children}
    </Button>
  );
}