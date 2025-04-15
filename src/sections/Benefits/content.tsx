
import { ReactNode } from "react";
import {
  ArrowUpRight,
  LayoutTemplate,
  Gauge,
  Settings,
  Code2,
  Headphones,
  Wallet,
  ClipboardCheck,
  Brush,
  LineChart,
  ShieldCheck,
  Crosshair,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import AnimatedGridPattern from "@/components/ui/animated-grid-pattern"
import { cn } from "@/lib/utils";

export type FeatureItem = {
  Icon: React.ElementType | LucideIcon;
  name: string;
  description: string;
  detail: string;
  href?: string;
  cta: string;
  background: ReactNode;
  className: string;
};

/**
 * ✨ for transformation and sparkle
📊 for the statistics
💸 for money/business aspects
⚡ for speed and performance
🚀 for growth and progress
🤔 for the questioning section
🎯 for targeting goals
💎 for premium value
Kept the existing 👉 for the call-to-action
Added a 🚀 to the button for extra emphasis
 */

// ### **Solusi dari Kami**
const cardContents: FeatureItem[] = [
  {
    Icon: ArrowUpRight,
    name: "Peningkatan Konversi & Lead Berkualitas",
    description: "Optimasi CTA & strategi konversi teruji",
    detail: `🎯 Landing page dioptimalkan untuk CTA (Call to Action) yang jelas
             📈 A/B testing rutin untuk optimasi terus menerus
             💼 Copywriting persuasif untuk meningkatkan konversi`,
    cta: "Tingkatkan Konversi Sekarang",
    background: (
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    ),
    className: "border-blue-200",
  },
  {
    Icon: LayoutTemplate,
    name: "Desain Profesional & Responsif",
    description: "Tampilan modern di semua perangkat",
    detail: `✨ Desain minimalis sesuai identitas brand
             📱 Responsif di desktop, tablet, & mobile
             🎨 Kustomisasi warna, typography, dan gambar`,
    cta: "Lihat Contoh Desain",
    background: <div className="bg-purple-100/50" />,
    className: "border-purple-200",
  },
  {
    Icon: Gauge,
    name: "Optimasi Performa & SEO",
    description: "Website cepat & ramah mesin pencari",
    detail: `⚡ Loading di bawah 3 detik
             🔍 Optimasi meta tag & heading
             📊 Integrasi Google Analytics`,
    cta: "Optimasi Website Saya",
    background: <div className="bg-green-100/50" />,
    className: "border-green-200",
  },
  {
    Icon: Settings,
    name: "Pemeliharaan Berkala",
    description: "Update konten & keamanan terjaga",
    detail: `🛠️ Pemeliharaan rutin & backup data
             🔄 Update konten 1-4x/bulan
             🎁 Upgrade tampilan gratis 2-3 bulan sekali`,
    cta: "Jadwalkan Pemeliharaan",
    background: <div className="bg-yellow-100/50" />,
    className: "border-yellow-200",
  },
  {
    Icon: Code2,
    name: "Fitur Teknis Unggulan",
    description: "Teknologi terkini untuk bisnis Anda",
    detail: `🔒 SSL & proteksi DDoS
             🛒 Integrasi e-commerce & payment
             🌐 Hosting premium 99.9% uptime`,
    cta: "Lihat Fitur Lengkap",
    background: <div className="bg-red-100/50" />,
    className: "border-red-200",
  },
  {
    Icon: Headphones,
    name: "Dukungan 24/7",
    description: "Bantuan teknis kapan saja",
    detail: `📞 Support via WhatsApp/Email
             🕒 Garansi bug fixing 3 bulan
             💡 Konsultasi strategi digital gratis`,
    cta: "Hubungi Support Kami",
    background: <div className="bg-pink-100/50" />,
    className: "border-pink-200",
  },
  {
    Icon: Wallet,
    name: "Hemat Waktu & Biaya",
    description: "Solusi lengkap tanpa ribet",
    detail: `⏱️ Pengerjaan 1-2 minggu
             💰 Tidak perlu tim IT internal
             📉 Paket berlangganan terjangkau`,
    cta: "Cek Paket Harga",
    background: <div className="bg-indigo-100/50" />,
    className: "border-indigo-200",
  },
  // - 📑 Laporan performa bulanan (traffic, konversi, rekomendasi optimasi).
  // - 🎉 Gratis domain atau hosting tahun pertama untuk paket tertentu.
];

export default cardContents;

// masi mau pake cara lama?

export const landingPageBenefits = [
  {
    title: "Most businesses lose potential customers because of:",
    items: [
      "❌ Confusing website",
      "❌ Unclear or incoherent messaging",
      "❌ Ineffective call to action buttons",
      "❌ Design that doesn’t appeal to their audience"
    ]
  },
  {
    title: "Why Should Give Us a Try?",
    items: [
      {
        heading: "Proven Strategies",
        description: "Each landing page is designed with clear calls-to-action, compelling visuals, and responsive layouts that work on any device."
      },
      {
        heading: "Tailored to You",
        description: "We create custom landing pages that align with your brand and goals."
      },
      {
        heading: "Data-Driven Design",
        description: "Through analytics and A/B testing, we optimize every element for maximum impact."
      }
    ]
  },
  {
    title: "Our Promise",
    description: "Get a professionally designed landing page that’s guaranteed to:",
    items: [
      "Enhance user experience",
      "Drive conversions",
      "Reflect your brand’s unique identity"
    ]
  },
  {
    title: "Our Core Philosophy",
    items: [
      "Focus on a single, compelling landing page",
      "Prioritize clear communication over design perfection",
      "The goal is to attract and convert clients quickly"
    ]
  }
];


export const benefitsContents: FeatureItem[] = [
  {
    Icon: ClipboardCheck,
    name: "Proven Strategies",
    description: "Battle-tested conversion frameworks",
    detail: "• Clear calls-to-action\n• Compelling visuals\n• Responsive layouts\n• Mobile-first approach\n• Industry-best practices",
    cta: "See Case Studies",
    background: <div className="bg-green-100/50" />,
    className: "border-green-200",
  },
  {
    Icon: Brush,
    name: "Tailored to You",
    description: "Custom brand integration",
    detail: "• Brand-aligned design\n• Goal-oriented structure\n• Personalized content\n• Unique value propositions\n• Custom interaction design",
    cta: "Start Customization",
    background: <div className="bg-purple-100/50" />,
    className: "border-purple-200",
  },
  {
    Icon: LineChart,
    name: "Data-Driven Design",
    description: "Science-backed optimization",
    detail: "• Real-time analytics\n• A/B testing\n• Heatmap analysis\n• Conversion rate tracking\n• Continuous iteration",
    cta: "View Metrics",
    background: <div className="bg-blue-100/50" />,
    className: "border-blue-200",
  },
  {
    Icon: ShieldCheck,
    name: "Our Promise",
    description: "Guaranteed results",
    detail: "✓ Enhanced user experience\n✓ Higher conversions\n✓ Brand consistency\n✓ Technical reliability\n✓ Ongoing support",
    cta: "Get Started",
    background: <div className="bg-yellow-100/50" />,
    className: "border-yellow-200",
  },
  {
    Icon: Crosshair,
    name: "Core Philosophy",
    description: "Focus on what matters",
    detail: "① Single compelling focus\n② Clear communication\n③ Rapid conversion\n④ Mobile-first mindset\n⑤ Measurable results",
    cta: "Learn More",
    background: <div className="bg-red-100/50" />,
    className: "border-red-200",
  },
  {
    Icon: Rocket,
    name: "Fast Results",
    description: "Quick implementation",
    detail: "• 48-hour prototype\n• 2-week launch\n• Immediate analytics\n• Rapid iteration\n• 24/7 support",
    cta: "Launch Now",
    background: <div className="bg-orange-100/50" />,
    className: "border-orange-200",
  },
];

export const landingPageBenefit = [
  {
    concept: "24/7 Sales Representative Concept",
    benefits: [
      "Automated lead generation and sales",
      "Consistent messaging and branding",
      "Unlimited concurrent visitor handling",
      "No human limitations or fatigue",
      "Standardized pitch delivery",
      "Perfect recall of all product details",
      "Simultaneous multi-user engagement"
    ]
  },
  {
    concept: "Advantages Over Traditional Websites",
    advantages: [
      "Focused objective vs multiple goals",
      "Clear call-to-action vs multiple options",
      "Optimized conversion paths",
      "Targeted messaging for specific audiences",
      "No navigation distractions",
      "Measurable success metrics",
      "A/B testing capabilities"
    ]
  },
  {
    concept: "Return on Investment (ROI)",
    categories: [
      {
        title: "Continuous Income Generation",
        benefits: [
          "24/7 operation",
          "Automated lead capture",
          "Scalable visitor handling",
          "Passive revenue generation"
        ]
      },
      {
        title: "Performance Tracking",
        benefits: [
          "Detailed analytics",
          "Conversion rate monitoring",
          "User behavior insights",
          "ROI calculation capabilities"
        ]
      },
      {
        title: "Measurable Improvements",
        benefits: [
          "Before/after conversion comparisons",
          "Sales funnel optimization",
          "Customer journey tracking",
          "Revenue attribution"
        ]
      }
    ]
  },
  {
    concept: "Quick Implementation Benefits",
    benefits: [
      "Rapid development (7-day turnaround)",
      "Immediate market presence",
      "Fast iteration capability",
      "Quick response to market changes"
    ]
  }
];