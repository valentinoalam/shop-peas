/**
 * ### **Contoh Struktur Landing Page**

          Berikut contoh struktur landing page yang umum:
 (contoh: hero, tentang kami, layanan, testimoni, kontak).
          1. **Header**: Headline + CTA + Gambar/Video.
          2. **Tentang Produk/Layanan**: Deskripsi + Gambar.
          3. **Keunggulan**: Fitur/Benefits + Ikon.
          4. **Testimoni**: Ulasan Pelanggan.
          5. **Harga**: Tabel Paket (jika ada).
          6. **Formulir Kontak**: Lead Capture.
          7. **Footer**: Kontak + Media Sosial.

            {
              title: "Galeri foto/video",
              cost: "+Rp 800.000",
            },
 */
export const landingPageOffer = {
  benefits: [
    { text: "Fully functional Landing Page", icon: "fa-check-circle" },
    { text: "SEO-optimized pages", icon: "fa-check-circle" },
    { text: "Documentation and user guide", icon: "fa-check-circle" },
    { text: "Analytics and reporting setup", icon: "fa-check-circle" },
  ],
  totalValue: { text: "Total Nilai", value: "Rp 110 Juta+", icon: "fa-money-bill" },
  discountedPrice: { text: "Hari Ini", value: "Rp 22 Juta", icon: "fa-bolt" },
};
type FeatureColumns = string[] | {
  column1: string[];
  column2: string[];
};

type AddonCategory = {
  name: string
  items: Addon[]
}
type Addon = { 
  id: string; 
  title: string; 
  cost: string; 
  details?: string; 
  note?: string 
};

export type Package = {
  id: string;
  title: string;
  description: string;
  price: string | { monthly: string; yearly: string };
  features: FeatureColumns;
  duration?: string;
  cta: string;
  notes?: string[];
  images?: string[] | string;
  addons?: Addon[];
};
            
export const basicFeatures = [
  "Desain Responsif (Mobile-Friendly)",
  "1 Contact form yang terhubung ke WA/Email",
  "Basic SEO on Page", // (Meta Tags, Struktur, Schema Markup, dll.)
  "Fast loading speed", // (Lazy Loading, Minify, CDN, dll.)
  "Basic analytics",
  "Social media integrations",
  "SSL security",  // (SSL, Anti-Spam, Firewall, dll.)
  // "Cross-browser compatible"
]

export const monthlyServices = { 
  id: "backup_maintenance", 
  title: "Backup, Maintenance & Update Bulanan", 
  cost: "Rp 500.000/bulan", 
  features: [
    "Optimasi SEO lanjutan.",
    "Pemeliharaan rutin (bug fixing, keamanan, dll).",
    "A/B testing untuk optimasi konversi.",
    "Update konten 1-4x per bulan.",
    "Upgrade tampilan setiap 3 bulan sekali.",
    "Laporan performa bulanan.",
    "Hosting dan domain termasuk.",
    "Backup website secara berkala.",
    "Perbaikan bug atau error.",
    "Optimasi kecepatan website.",
    "Konsultasi teknis via WhatsApp/Email."
  ],
    details: "Pemeliharaan website, update sistem, dan backup data secara berkala."
};

export const basicAddOns: AddonCategory[] = [
  {
    name: "Customization",
    items: [
      { 
        id: "additional_section", 
        title: "Additional Section", 
        cost: "+ Rp 300.000/ section", 
        details: "Tambahkan satu section baru ke halaman, seperti fitur, testimoni, atau FAQ." 
      },
      { 
        id: "dark_theme", 
        title: "Dark Theme Feature", 
        cost: "+ Rp 500.000/ page", 
        details: "Menambahkan fitur mode gelap dan terang dengan toggle otomatis." 
      },
      { 
        id: "lang", 
        title: "Multi Language (Eng/Ind)", 
        cost: "+ Rp 500.000/ page", 
        details: "Menambahkan fitur multi-bahasa di website (Bahasa Inggris & Indonesia)."
      },
      { 
        id: "articles", 
        title: "Articles Section with SEO", 
        cost: "+ Rp 800.000/ 3 articles", 
        details: "Menambahkan fitur blog atau artikel ke dalam website."
      },
      { 
        id: "social_media", 
        title: "Integrasi Media Sosial", 
        cost: "+ Rp 500.000", 
        details: "Menghubungkan website dengan platform media sosial seperti Instagram dan Facebook."
      },
    ]
  },
  {
    name: "Design",
    items: [
      { 
        id: "figma", 
        title: "Figma Desain", 
        cost: "Rp 500.000 – Rp 2.000.000", 
        details: "Desain UI/UX menggunakan Figma untuk tampilan profesional dan responsif."
      },
      { 
        id: "logo", 
        title: "Logo Design", 
        cost: "+ Rp 1.000.000", 
        details: "Desain logo profesional yang unik dan sesuai brand bisnis."
      },
      { 
        id: "animate", 
        title: "Simple Animation", 
        cost: "+ Rp 250.000/section", 
        details: "Animasi dasar untuk meningkatkan daya tarik halaman."
      },
      { 
        id: "interactive", 
        title: "Custom Advanced Animation", 
        cost: "+ Rp 500.000 – Rp 1.500.000/section", 
        details: "Animasi canggih yang menyesuaikan dengan interaksi pengguna."
      },
      { 
        id: "art", 
        title: "Custom 2D Art", 
        cost: "+ Rp 150.000 – Rp 2.000.000/asset", 
        details: "Ilustrasi 2D custom untuk kebutuhan desain website."
      },
      { 
        id: "3d", 
        title: "3D Object/Full Scene", 
        cost: "+ Rp 500.000 – Rp 15.000.000/scene", 
        details: "Pembuatan objek dan scene 3D berkualitas tinggi."
      },
    ]
  },
  {
    name: "Support And Revisions",
    items: [
      { 
        id: "domain", 
        title: "Custom Domain Setup", 
        cost: "+ Rp 50.000", 
        details: "Konfigurasi dan pengaturan domain kustom untuk website.",
        note: "tidak termasuk pembelian domain"
      },
      { 
        id: "hosting_config", 
        title: "Penyediaan & Konfigurasi Hosting", 
        cost: "Rp 500.000 – Rp 2.500.000", 
        details: "Konfigurasi VPS, Shared Hosting, dan optimasi kinerja server.",
        note: "bergantung pada provider dan paket hosting yang diinginkan"
      },
    ]
  }
];

export const moreAddOns: AddonCategory[] = [
  {
    name:"communication",
    items: [
      { 
        id: "newsletter", 
        title: "Integrasi Newsletter", 
        cost: "Rp 200.000/layanan", 
        details: "Koneksi formulir dengan layanan newsletter seperti Mailchimp, SendGrid, dsb.",
        note: "Belum termasuk biaya pihak ketiga."
      },  
      { 
        id: "cms_integration", 
        title: "Integrasi CMS", 
        cost: "Rp 1.000.000 – Rp 3.500.000", 
        details: "Menambahkan sistem manajemen konten seperti WordPress atau Strapi."
      },
      { 
        id: "live_chat", 
        title: "Live Chat & Tombol WhatsApp", 
        cost: "Rp 300.000 – Rp 1.000.000", 
        details: "Menambahkan fitur chat langsung dan tombol WhatsApp untuk komunikasi lebih cepat."
      },
      { 
        id: "blog_setup", 
        title: "Pengaturan Blog", 
        cost: "Rp 4.500.000", 
        details: "Setup lengkap blog dengan kategori dan tag."
      },
    ]
  },
  {
    name: "extended",
    items: [
      { 
        id: "additional_page", 
        title: "Halaman Tambahan", 
        cost: "Rp 450.000/halaman", 
        details: "Halaman custom dengan desain yang sesuai dengan gaya situs Anda."
      },
      { 
        id: "additional_form", 
        title: "Additional Form", 
        cost: "+ Rp 200.000/form", 
        details: "Menambahkan formulir tambahan sesuai kebutuhan pengguna."
      },
      { 
        id: "api_integration", 
        title: "Integrasi API", 
        cost: "Rp 750.000 – Rp 2.500.000", 
        details: "Menghubungkan website dengan API eksternal seperti Google Maps dan Firebase."
      },
      {
        id: "memberships",
        title: "Sistem membership/pelanggan",
        cost: "Rp 2.500.000",
        details: "Membantu Anda mengelola pelanggan dengan fitur member area, reward, dan program loyalitas.",
      },
    ]
  },
  {
    name: "ecommerce",
    items: [
      { 
        id: "ecommerce_features", 
        title: "Fitur E-commerce", 
        cost: "Rp 12.000.000", 
        details: "Desain website toko online dengan Fitur belanja lengkap termasuk keranjang, galeri produk, checkout, dan opsi pembayaran melalui transfer bank.",
        note: "Tidak termasuk integrasi dengan payment gateway."
      },
      { 
        id: "payment_gateway", 
        title: "Integrasi Payment Gateway", 
        cost: "Rp 1.000.000 – Rp 3.500.000", 
        details: "Menghubungkan pembayaran dengan Midtrans, Xendit, PayPal, dan lainnya."
      },
      {
        id: "shipping_integration",
        title: "Integrasi sistem pengiriman",
        cost: "Rp 1.200.000",
        details: "Menambahkan fitur cek ongkir dan integrasi otomatis dengan ekspedisi seperti JNE, J&T, dan lainnya.",
      },
      {
        id: "manajemen_produk",
        title: "Manajemen produk dan kategori",
        cost: "Rp 2.000.000",
        details: "Memungkinkan pengelolaan produk dan kategori melalui sistem backend yang mudah digunakan.",
      },
      {
        id: "discount",
        title: "Fitur diskon/kupon",
        cost: "Rp 1.500.000",
        details: "Menyediakan sistem kupon dan diskon untuk promosi dan peningkatan penjualan.",
      },
      {
        id: "marketplace_integration",
        title: "Integrasi marketplace",
        cost: "Rp 2.000.000",
        details: "Menghubungkan toko online dengan marketplace seperti Tokopedia dan Shopee.",
      },
      {
        id: "report",
        title: "Laporan penjualan",
        cost: "Rp 1.000.000",
        details: "Menyediakan laporan transaksi dan analisis penjualan untuk membantu pengambilan keputusan bisnis.",
      },
    ]
  }
  
];

export const notes = [
  "Hosting dan domain tidak termasuk dalam paket.",
  "Revisi tambahan dikenakan biaya Rp 200.000 - Rp 350.000/revisi.",
];

const pricingPackages: Package[] = [
  {
    id: "LP",
    title: "Landing Page",
    description: "(One-Time Purchase)",
    cta: "",
    duration: "7-10 hari kerja",
    price: "Rp 3.500.000",
    features: {
      column1: basicFeatures,
      column2: [
        "Desain dan pengembangan awal.",
        "Dapat memilih 5 section",
        "2 kali revisi.",
        "Garansi bug fixing selama 1 bulan."
      ]
    },
    images: [],
  },
  {
    id: "BW",
    title: "Basic Website",
    description: "",
    cta: "",
    price: "Rp 8.000.000",
    features: {
      column1: [
        "Hingga 5 halaman.",
        "Mobile responsive.",
        "Formulir kontak.",
        "Optimasi SEO dasar.",
        "Sistem manajemen konten."
      ],
      column2: [
        "Integrasi analitik dasar.",
        "3 kali revisi.",
        "Fungsi blog.",
        "Email newsletter.",
        "Dukungan 30 hari setelah peluncuran."
      ]
    },
    images: [],
  },
  // {
  //   id: "SW",
  //   title: "Special Website",
  //   description: "",
  //   price: "Mulai dari Rp 12.000.000",
  //   features: {
  //     column1: [
  //       "Hingga 10 halaman.",
  //       "Desain website custom sesuai kebutuhan bisnis (landing page, company profile, e-commerce, atau sistem khusus).",
  //       "Fitur-fitur khusus seperti login user, dashboard admin, integrasi API, dll.",
  //       "Mobile responsive.",
  //       "Formulir kontak lanjutan.",
  //       "Optimasi SEO lanjutan.",
  //       "Sistem manajemen konten."
  //     ],
  //     column2: [
  //       "Integrasi analitik lanjutan.",
  //       "Siap untuk e-commerce.",
  //       "5 kali revisi.",
  //       "Dukungan prioritas.",
  //       "Dukungan 60 hari termasuk perbaikan bug."
  //     ]
  //   },
  //   images: [],
  //   addons: []
  // },
];

export default pricingPackages;
  