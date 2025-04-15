'use client';
import { useRef, useEffect } from 'react';

import gsap from 'gsap';
import { MagicCard } from '@/components/ui/magic-card';
import { MagicText } from '@/components/ui/magic-text';
import services from './content';



export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: {
          amount: 0.6,
          from: "start",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-background">
      <div className="container relative mx-auto px-4">
        <div className="text-center mb-16">
          <MagicText className="text-3xl md:text-4xl font-bold mb-4">
            Our Services
          </MagicText>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive suite of digital services to help your business grow and succeed in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <MagicCard key={index} className="service-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
}