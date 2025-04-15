import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const setupAnimations = (
  section: HTMLDivElement,
  tag: HTMLDivElement,
  title: HTMLElement,
  features: HTMLElement[],
) => {
  // Common animation defaults
  const defaults = {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
  };

  // Tag animation
  gsap.fromTo(tag,
    { opacity: 0, y: 30 },
    {
      ...defaults,
      y: 0,
      delay: 0.5,
      scrollTrigger: {
        trigger: section,
        start: "top 45%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Title animation
  gsap.fromTo(title,
    { opacity: 0, y: 40, x: -40 },
    {
      ...defaults,
      y: -100,
      x: -40,
      delay: 0.2,
      scrollTrigger: {
        trigger: section,
        start: "top 40%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Feature animations
  features.forEach((feature, index) => {
    const icon = feature.children[0];
    const detailElement = feature.querySelector<HTMLElement>(".feature-detail");
    const nextTrigger = index < features.length - 1 
      ? features[index + 1] 
      : section?.querySelector(".end");

    if (!icon || !nextTrigger) return;

    // Icon animation
    gsap.fromTo(icon,
      { scale: 0.7, opacity: 0 },
      {
        scale: 1,
        ...defaults,
        ease: "elastic.out(1.1, 0.5)",
        scrollTrigger: {
          trigger: nextTrigger,
          start: "top 90%",
          toggleActions: "play pause none reverse",
        },
      }
    );

    // Detail element animation
    if (detailElement) {
      gsap.fromTo(detailElement,
        { opacity: 0, x: -40 },
        {
          ...defaults,
          x: 0,
          delay: 0.3,
          scrollTrigger: {
            trigger: nextTrigger,
            start: "top 85%",
            toggleActions: "play pause none reverse",
          },
        }
      );
    }
  });
};