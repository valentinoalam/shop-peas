import { useRef, useEffect } from 'react';
import { MagicText } from '@/components/ui/magic-text';
// import { Label } from '@/components/ui/label';
import { Mail, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { email, whatsappNumber } from './content';
import ContactForm from './form';
import debounce from '@/lib/debounce';

export default function Contact() {
  const sectionRef = useRef<(HTMLDivElement | null)>(null)
  const addressAnimationRef = useRef<gsap.core.Tween>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const contactCtx = gsap.context(() => {
      // First animation
      gsap.from('.contact-content > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 1,
      });
      
      const createAddressAnimation = () => {
        // Kill previous animation if it exists
        if (addressAnimationRef.current) {
          addressAnimationRef.current.scrollTrigger?.kill();
          addressAnimationRef.current.kill();
        }
  
        addressAnimationRef.current = gsap.to('.address', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom 95%',
            scrub: 2,
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: (i, el) => {
            const rect = el.getBoundingClientRect()
            const scrollTop = (window.scrollY || document.documentElement.scrollTop) + window.innerHeight/2
            const offsetTop = (rect.top + scrollTop) / 2
            return window.innerWidth < 768 ? '0px' : `${offsetTop * 0.12}px`
          },
          ease: "power2.inOut",
        });
      }

      // Add resize listener with debounce
      const resizeObserver = new ResizeObserver(
        debounce(() => {
          createAddressAnimation();
        }, 250)
      );

      // Create initial address animation
      createAddressAnimation();

      // Observe the section for size changes
      if (sectionEl) {
        resizeObserver.observe(sectionEl);
      }
      // Return cleanup for the context
      return () => {
        resizeObserver.disconnect();
      };
  
    }, sectionRef); // Scope to sectionRef
  
    // Main cleanup
    return () => {
      contactCtx.revert(); // This will clean up all GSAP animations
    };
  }, [sectionRef]); // Remove sectionRef from dependencies as it's stable
  return (
    <div ref={sectionRef} className="py-12 md:py-24">
      <div className="container px-4 mx-auto relative">
        <div className="flex flex-col md:grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-2 mx-auto">
          <div className='contact-content order-1 md:order-2 w-full bg-stone-100 shadow-lg border-black border-2 p-4 sm:p-6 md:p-8 rounded-lg'>
            <div className="text-center mb-8 md:mb-16">
              <MagicText className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                Mari Bekerja Sama
              </MagicText>
              <p className="text-base sm:text-lg text-muted-foreground px-2">
                Ceritakan Sedikit Tentang Bisnis, Pelanggan dan Tujuan Anda
              </p>
            </div>
            <ContactForm />
          </div>

          <div className="address transform-none md:transform h-max order-2 md:order-1 space-y-6 md:space-y-8 px-2 sm:px-4">
            <h2 className="pt-14 text-lg sm:text-xl font-medium">
              Jika Anda tertarik atau ingin konsultasi lebih lanjut, dapat menghubungi alamat di bawah ini
            </h2>
            
            <div className="space-y-6 sticky">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email Saya</h3>
                  <p className="text-white break-words">{email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MessageSquare className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Chat Me at WA</h3>
                  <p className="text-stone-50 break-words">{whatsappNumber}</p>
                </div>
              </div>
            </div>
            <p className="text-base sm:text-lg">
              Kami siap membantu mewujudkan website atau landing page impian Anda! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}