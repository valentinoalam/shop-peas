"use client"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import GridPattern from "@/components/ui/grid-pattern"
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern"
import Image from "next/image"
import { TechStack } from "./TechStack"
import { cn } from "@/lib/utils"
import {
  Shield,
  LayoutTemplate,
  Gauge,
  ArrowUpRight,
  Wallet,
  Settings,
  Code2,
} from "lucide-react"
// import Support from "@/assets/support.svg"
import { MagicText } from "@/components/ui/magic-text"
import { FeatureItem } from "./content"
gsap.registerPlugin(ScrollTrigger)

const Benefits = () => {
  const cardContents: FeatureItem[] = [
    {
      Icon: LayoutTemplate,
      name: "Desain Profesional & Responsif",
      description: "Tampilan modern di semua perangkat",
      detail: `✨ Desain minimalis sesuai identitas brand
                📱 Responsif di desktop, tablet, & mobile
                🎨 Kustomisasi warna, typography, dan gambar`,
      href: "/components",
      cta: "Lihat Contoh Desain",
      background: (
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "bg-purple-100/50 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      ),
      className: "bg-purple-600/50 col-span-2 row-span-4 md:col-span-2 md:row-span-4 border-purple-200",
    },
    {
      Icon: Code2,
      name: "Optimasi Performa & Teknologi terkini",
      description: "Website cepat & ramah mesin pencari",
      detail: `⚡ Loading di bawah 3 detik
              🛒 Integrasi e-commerce & payment
              📊 Integrasi Google Analytics`,
      href: "/templates",
      cta: "Lihat Fitur Lengkap",
      background: <TechStack />,
      className: "bg-green-800 col-span-1 row-span-4 md:col-span-1 md:row-span-4 border-green-200",
    },
    {
      name: "Peningkatan Konversi & Lead Berkualitas",
      description: "Optimasi CTA & strategi konversi teruji",
      detail: `🎯 Landing page dioptimalkan untuk CTA (Call to Action) yang jelas
              📈 A/B testing rutin untuk optimasi terus menerus
              💼 Copywriting persuasif untuk meningkatkan konversi`,
      Icon: ArrowUpRight,
      cta: "Tingkatkan Konversi Sekarang",
      className: "col-span-1 row-span-5 md:col-span-1 md:row-span-5 bg-blue-500/50 border-blue-200",
      background: (
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] bg-blue-100/50",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      ),
    },
    {
      name: "SEO & Konten Berkualitas",
      description: "Tingkatkan visibilitas di mesin pencari dengan konten yang dioptimalkan.",
      cta: "Pelajari Lebih Lanjut",
      detail: `Kami menyediakan layanan penulisan konten yang menarik dan dioptimalkan untuk SEO, 
              🔍 Optimasi meta tag & heading untuk setiap halaman
              Ini membantu halaman Anda muncul di hasil pencarian dan menarik lebih banyak pengunjung organik`,
      Icon: Gauge,
      // () => (
      //   <Image src={SEO} alt="SEO Icon" width={80} height={80} className="w-16 mx-auto" />
      // ),
      className: "col-span-2 row-span-4 md:col-span-1 md:row-span-4 bg-red-700/50 border-red-200",
      background: (
        <GridPattern
          x={-1}
          y={-1}
          className={cn("[mask-image:linear-gradient(to_bottom_right,white,50%,transparent)] bg-red-200/50")}
        />
      ),
    },
    {
      name: "Keamanan & Dukungan Terbaik",
      description: "Website aman dengan dukungan penuh dari tim kami.",
      detail: `Dari konsultasi awal hingga pemeliharaan website, 
      kami memberikan dukungan penuh untuk memastikan kesuksesan online Anda. 
      Hubungi kami kapan saja untuk bantuan teknis atau saran strategis.
              🔒 SSL & proteksi DDoS untuk melindungi data Anda. 
              📞 Support via WhatsApp/Email, 
              🌐 Pengawasan untuk memastikan website Anda tetap berjalan optimal
              🕒 Garansi bug fixing 3 bulan`,
      Icon: Shield,
      href: "/#contact",
      cta: "Hubungi saya",
      className: "col-span-1 relative row-span-4 lg:row-span-8 md:col-span-1 md:row-span-8 border-yellow-200",
      background: (
        <div className="absolute top-0 left-0 w-full">
          <Image
            src='/benefits/system.jpg'
            alt='sky'
            width={450}
            height={300}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              width: "410px",
              height: "auto",
              objectFit: "contain"
            }} />
        </div>
      ),
    },
    {
      name: "Hemat Waktu & Biaya",
      description: "Solusi lengkap tanpa ribet",
      detail: `⏱️ Pengerjaan 1-2 minggu
             💰 Tidak perlu tim IT internal
             📉 Paket berlangganan terjangkau
             💡 Konsultasi strategi digital gratis`,
             //"Kami menawarkan proses revisi yang fleksibel, memungkinkan Anda memberikan masukan dan penyesuaian hingga desain akhir sesuai dengan visi Anda. Tim kami siap membantu Anda mencapai hasil terbaik.",
      Icon: Wallet,
      cta: "Cek Paket Harga",
      className: "bg-indigo-600/50 border-indigo-200 col-span-1 row-span-4 md:col-span-1 md:row-span-4",
      background: (
        <GridPattern
          x={-1}
          y={-1}
          className={cn("bg-indigo-100/50 [mask-image:linear-gradient(to_bottom_right,white,50%,transparent)]")}
        />
      ),
    },
    {
      Icon: Settings,
      name: "Pemeliharaan Berkala",
      description: "Update konten & keamanan terjaga",
      detail: `🛠️ Pemeliharaan rutin & backup data
             🔄 Update konten 1-4x/bulan
             🎁 Upgrade tampilan gratis 2-3 bulan sekali`,
      href: "/#contact",
      cta: "Jadwalkan Pemeliharaan",
      background: (
        <GridPattern
          x={-1}
          y={-1}
          className={cn("bg-pink-100/50 [mask-image:linear-gradient(to_bottom_right,white,50%,transparent)]")}
        />
      ),
      className: "border-pink-200 bg-pink-600-40 border-pink-100 col-span-1 row-span-3 md:col-span-1 md:row-span-3",
    },
  ];
  cardContents.forEach((card) => {
    card.className = cn(
      card.className,
      `service-card p-0 place-content-center transform transition-all duration-300 hover:scale-105 h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg`,
    )
  })

  const [runEffect, setRunEffect] = useState(false) 
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const ctx = useRef<gsap.Context | null>(null);
  const rafRef = useRef<number |null>(null);

  useEffect(()=> {
    if(!sectionRef.current)  return
    const sectionEl = sectionRef.current;

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        setRunEffect(entry.isIntersecting);
      });
    };
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use viewport
      rootMargin: '0px',
      threshold: 0.1 // 50% visibility
    });
    
    observer.observe(sectionEl);
    return () => {
      if (sectionEl) {
        observer.unobserve(sectionEl);
      }
    };
  }, [])
  // Single useEffect for all scroll-related logic
  useEffect(() => {
    if(!runEffect)  return
    // Cache initial styles with CSS instead of GSAP
    ctx.current = gsap.context(() => {
      if (backgroundRef.current) {
        const children = Array.from(backgroundRef.current.children);
        
        // Store animation reference
        const scaleAnimation = gsap.to(children, {
          scale: 0.9,
          duration: 20,
          repeat: 1,
          yoyo: true,
          stagger: {
            each: 2,
            from: "random",
          },
          paused: true // Start paused
        });

        // Start animation after first paint
        rafRef.current = requestAnimationFrame(() => {
          scaleAnimation.play();
          // Clear ref after execution
          rafRef.current = null; 
        });
      }
    }, sectionRef);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      ctx.current?.revert();
    };
  }, [runEffect]); // Empty dependency array - runs once

  return (
    <div ref={sectionRef} className="relative space-y-2 z-10 overflow-x-clip">
      <div className="text-center pt-16 mb-4">
        <MagicText className="text-3xl md:text-4xl font-bold mb-4 leading-tight md:leading-tight lg:text-5xl lg:leading-tight bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
          No Hassle, Just Results!
        </MagicText>
        <MagicText className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We offer a comprehensive suite of digital services to help your business grow and succeed in the digital
          age.
        </MagicText>
      </div>
      
      <div ref={backgroundRef} className="relative h-[800px] z-30 w-full mx-auto space-y-9 px-4 inset-0 overflow-x-clip">
        <BentoGrid className="container origin-top sticky top-20 md:top-0 h-[500px] grid grid-rows-12 grid-cols-3 gap-x-4 gap-y-3 mx-auto p-4">
          {
            cardContents.map((card, index) => {
            return (
            <BentoCard 
              key={card.name} 
              style={{
                zIndex: cardContents.length - index,
              }}
              {...card} />
          )})}
        </BentoGrid>
      </div>
    </div>
  )
}

export default Benefits

