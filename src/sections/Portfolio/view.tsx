'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { MagicText } from '@/components/ui/magic-text';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import gsap from 'gsap';

const projects = [
  {
    title: 'E-commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1280&auto=format&fit=crop',
  },
  {
    title: 'Brand Identity',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=1280&auto=format&fit=crop',
  },
  {
    title: 'Mobile App',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=1280&auto=format&fit=crop',
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 100%',
          end: 'bottom 100%',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-24">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <MagicText className="mb-4 text-3xl font-bold md:text-4xl">
            Featured Work
          </MagicText>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore our latest projects and see how we help businesses achieve their digital goals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {projects.map((project, index) => (
            <div key={index} className="cursor-pointer work-item group">
              <div className="overflow-hidden rounded-lg">
                <AspectRatio ratio={16 / 9}>
                  <Image fill
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </AspectRatio>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-muted-foreground">{project.category}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}