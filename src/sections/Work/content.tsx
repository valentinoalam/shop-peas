import { Lightbulb, Palette, Code, Rocket } from 'lucide-react';

export const landingPageCreationProcess = [
    {
        id: 1, 
        icon: Lightbulb,
        title: 'Step 1: Konsultasi Awal',
        name: "Konsultasi Awal",
        description:
            "Kami mulai dengan memahami bisnis, tujuan, dan audiens target Anda.",
        text: "Langkah pertama dalam pembuatan landing page adalah memahami kebutuhan bisnis Anda. Dalam tahap ini, kami mengadakan diskusi untuk memahami tujuan utama landing page, audiens target, serta preferensi desain yang diinginkan. Kami juga mengidentifikasi fitur khusus yang dibutuhkan, seperti formulir pendaftaran, integrasi dengan sistem lain, atau animasi interaktif. Hasil dari tahap ini adalah sebuah brief proyek yang jelas, yang menjadi panduan utama dalam proses selanjutnya.",
        details: [
            "Tujuan landing page Anda (misalnya, menghasilkan prospek, menampilkan produk, dll.).",
            "Preferensi desain dan pedoman merek.",
            "Fitur atau fungsionalitas yang Anda butuhkan, seperti formulir, animasi, atau integrasi."
        ],
        process: "Kami memulai dengan mengadakan konsultasi awal untuk memahami bisnis, tujuan, dan audiens target Anda. Dalam tahap ini, kami akan menggali informasi mendalam tentang apa yang ingin Anda capai dengan landing page, seperti meningkatkan prospek penjualan, mempromosikan produk, atau memberikan informasi penting kepada pelanggan. Kami juga akan menanyakan preferensi desain, pedoman merek, serta fitur atau fungsionalitas yang Anda butuhkan, seperti formulir kontak, animasi, atau integrasi dengan alat lain.",
        Hasil:  "Setelah konsultasi, Anda akan menerima brief proyek yang jelas yang merinci semua kebutuhan dan ekspektasi Anda. Ini menjadi panduan bagi kami untuk memastikan landing page yang dibuat sesuai dengan visi Anda.",
        illustration:  "Bayangkan sebuah ruang meeting di mana tim kami duduk bersama Anda, mendiskusikan ide-ide kreatif sambil mencatat semua detail penting di sebuah papan tulis atau dokumen digital.",
        ensures: [
          "Pemahaman mendalam tentang kebutuhan dan ekspektasi Anda.",
          "Kesesuaian antara tujuan bisnis dan strategi landing page."
        ],
        outcome: "Brief proyek yang jelas yang merinci kebutuhan dan ekspektasi Anda."
    },
    {
        id: 2, 
        icon: Palette,
        title: 'Step 2: Proposal + Design & Penawaran Harga',
        name: "Proposal & Penawaran Harga",
        description:
            "Berdasarkan kebutuhan Anda, kami menyediakan proposal yang disesuaikan dengan rincian pekerjaan, timeline, dan harga yang transparan.",
        text: "Setelah memahami kebutuhan Anda, kami menyusun proposal proyek yang mencakup rincian pekerjaan, estimasi waktu pengerjaan, serta penawaran harga yang transparan. Proposal ini dirancang agar sesuai dengan kebutuhan spesifik Anda, memberikan gambaran yang jelas mengenai alur kerja dan hasil akhir yang diharapkan. Setelah disepakati, proyek siap untuk dilanjutkan ke tahap berikutnya.",
        details: [
            "Rincian scope pekerjaan.",
            "Timeline proyek.",
            "Harga yang transparan untuk layanan."
        ],
        process: "Berdasarkan informasi yang kami kumpulkan selama konsultasi, kami akan menyusun proposal yang disesuaikan dengan kebutuhan Anda. Proposal ini mencakup rincian scope pekerjaan, timeline proyek, dan harga yang transparan. Kami juga akan memberikan gambaran awal tentang desain dan fitur yang akan dikembangkan.",
        ensures: [
          "Transparansi dalam biaya dan timeline.",
          "Kesesuaian proposal dengan kebutuhan dan anggaran Anda."
        ],
        outcome: "Rencana yang disepakati yang mencakup semua aspek proyek, termasuk anggaran dan jadwal. Ini memastikan bahwa kedua belah pihak memiliki pemahaman yang sama sebelum melanjutkan ke tahap selanjutnya.",
        illustration: "Bayangkan sebuah dokumen proposal yang rapi, dilengkapi dengan timeline visual dan breakdown biaya yang mudah dipahami, siap untuk ditandatangani dan disetujui."
    },
    {
        id: 3, 
        icon: Code,
        title: 'Step 3: Pengumpulan Konten',
        name: "Pengumpulan Konten",
        description: "Kami berkolaborasi untuk mengumpulkan semua materi yang diperlukan.",
        text: "Agar landing page dapat tampil menarik dan efektif, kami mengumpulkan semua materi yang dibutuhkan. Ini meliputi gambar atau video berkualitas tinggi, konten tulisan yang menggambarkan pesan brand, serta aset desain seperti logo, font, dan palet warna. Jika diperlukan, tim kami juga siap membantu dalam pembuatan konten visual maupun penulisan teks yang menarik.",
        ensures: [
            "Brand identity yang jelas",
            "Konten yang lengkap dan sesuai dengan identitas merek.",
            "Ketersediaan aset desain yang diperlukan."
        ],
        process: "Pada tahap ini, kami akan berkolaborasi dengan Anda untuk mengumpulkan semua materi yang diperlukan untuk pembuatan landing page. Ini termasuk gambar atau video berkualitas tinggi, konten tulisan, pesan merek, serta aset desain seperti logo, font, dan palet warna. Jika diperlukan, tim kami juga dapat memberikan dukungan penulisan dan desain profesional.",
        outcome: "kumpulan konten yang lengkap dan siap digunakan untuk proses desain dan pengembangan. Ini memastikan bahwa landing page Anda memiliki materi yang menarik dan sesuai dengan identitas merek.",
        illustration: "Bayangkan sebuah folder digital yang terorganisir, berisi semua gambar, teks, dan aset desain yang telah dikumpulkan, siap untuk diolah menjadi landing page yang menarik.",
        // note: "Tim kami dapat memberikan dukungan penulisan dan desain profesional jika diperlukan.",
    },
    {
        id: 4, 
        icon: Rocket,
        title: 'Step 4: Desain & Pengembangan',
        name: "Desain & Pengembangan",
        description: "Kami memastikan landing page memiliki desain yang responsif, performa tinggi, dan tentunya sesuai dengan brief yang telah disepakati di awal.",
        process: [
            "Wireframing: Membuat sketsa layout dan struktur untuk umpan balik.",
            "Desain Visual: Membuat desain yang menarik dan sesuai merek.",
            "Pengembangan: Membangun landing page menggunakan teknologi modern yang dapat diperluas."
        ],
        ensures: [
            "Desain yang ramah seluler dan responsif.",
            "Performa yang cepat dan SEO-optimal.",
            "Integrasi dengan alat seperti pemasaran email atau analitik."
        ],
        outcome: "Landing page yang dihasilkan sudah ramah seluler, cepat, dan SEO-optimal, serta terintegrasi dengan alat-alat seperti pemasaran email atau analitik.",
        illustration: "Bayangkan sebuah layar komputer yang menampilkan desain landing page yang modern dan menarik, dengan animasi halus dan tata letak yang rapi.",
    },
    {
        id: 5, 
        icon: Rocket,
        title: 'Step 5: Final Revisi & Pembayaran',
        name: "Tinjauan & Umpan Balik",
        description: "Kami menyajikan hasil awal yang dapat anda tinjau ulang.",
        text: "Sebelum peluncuran, kami memberikan kesempatan bagi Anda untuk meninjau hasil awal. Anda dapat memberikan masukan atau meminta penyesuaian pada desain, konten, maupun fitur fungsional. Selain itu, kami juga melakukan pengujian di berbagai perangkat untuk memastikan pengalaman pengguna yang optimal. Setelah revisi selesai dan landing page memenuhi ekspektasi, tahap pembayaran akhir dilakukan.",
        details: [
            "Usulkan perubahan atau penyesuaian pada desain, konten, atau fitur.",
            "Uji fungsionalitas di berbagai perangkat."
        ],
        ensures: [
          "Kesesuaian landing page dengan ekspektasi Anda.",
          "Fungsionalitas yang optimal di semua perangkat."
        ],
        process: "Kami akan menyajikan hasil awal landing page untuk Anda tinjau. Anda dapat mengusulkan perubahan atau penyesuaian pada desain, konten, atau fitur. Kami juga akan melakukan pengujian fungsionalitas di berbagai perangkat untuk memastikan semuanya berfungsi dengan baik.",
        illustration: "Bayangkan sebuah tim yang sedang melakukan uji coba di berbagai perangkat, seperti laptop, tablet, dan ponsel, sambil mencatat setiap detail yang perlu diperbaiki.",
        outcome: "Landing page yang telah disempurnakan dan siap diluncurkan."
    },
    {
        id: 6, 
        icon: Rocket,
        title: 'Step 6: Peluncuran',
        name: "Pengaturan Domain & Peluncuran",
        description: "Kami menghubungkan dan meluncurkan landing page Anda.",
        text: "Kami membantu dalam menghubungkan landing page ke domain kustom atau subdomain pilihan Anda. Sebelum benar-benar ditayangkan, kami melakukan pengujian akhir untuk memastikan semua elemen berfungsi dengan sempurna. Setelah semua siap, landing page Anda resmi diluncurkan dan siap menjangkau audiens target.",
        details: [
            "Hubungkan landing page Anda ke domain kustom atau subdomain.",
            "Lakukan pengujian akhir untuk memastikan semuanya berfungsi dengan sempurna."
        ],
        ensures: [
          "Landing page yang terhubung dengan domain yang benar.",
          "Fungsionalitas penuh tanpa masalah teknis."
        ],
        process: "Kami akan menghubungkan landing page Anda ke domain kustom atau subdomain yang telah disiapkan. Setelah itu, kami melakukan pengujian akhir untuk memastikan semuanya berfungsi dengan sempurna sebelum peluncuran resmi.",
        illustration: "Bayangkan sebuah layar yang menampilkan pesan 'Peluncuran Sukses!' dengan grafik konfeti virtual yang merayakan keberhasilan proyek.",
        outcome:
            "Landing page yang hidup dan sepenuhnya fungsional siap untuk menarik audiens Anda."
    },
    {
        id: 7, 
        icon: Rocket,
        title: 'Step 7: Dukungan Pasca-Peluncuran',
        name: "Dukungan Pasca-Peluncuran",
        description: "Hubungan kami tidak berakhir dengan peluncuran.",
        services: [
            "Pemeliharaan: Pembaruan atau perubahan rutin seiring dengan kebutuhan Anda.",
            "Pelacakan Performa: Pengaturan analitik untuk mengukur kesuksesan dan mengoptimalkan.",
            "Peningkatan di Masa Depan: Kemampuan untuk menambah fitur atau mendesain ulang seiring pertumbuhan bisnis Anda."
        ],
        ensures: [
          "Landing page yang selalu diperbarui dan dioptimalkan.",
          "Dukungan berkelanjutan untuk memastikan kesuksesan jangka panjang."
        ],
        process: "Hubungan kami tidak berakhir dengan peluncuran. Kami menawarkan layanan dukungan pasca-peluncuran, termasuk pemeliharaan rutin, pelacakan performa, dan peningkatan di masa depan. Kami juga dapat membantu Anda menambahkan fitur baru atau mendesain ulang landing page seiring pertumbuhan bisnis Anda.",
        outcome: "Anda akan mendapatkan landing page yang terus dioptimalkan untuk mendukung pertumbuhan bisnis Anda.",
        illustration: "Bayangkan sebuah dashboard analitik yang menampilkan grafik pertumbuhan traffic dan konversi, sementara tim kami siap membantu Anda meningkatkan performa landing page.",
    }
];
  
export const engLandingPageCreationProcess = [
    {
      step: "Initial Consultation",
      description:
        "We start by understanding your business, goals, and target audience.",
      details: [
        "The purpose of your landing page (e.g., lead generation, product showcase, etc.).",
        "Design preferences and branding guidelines.",
        "Features or functionalities you need, such as forms, animations, or integrations."
      ],
      outcome: "A clear project brief outlining your requirements and expectations."
    },
    {
      step: "Proposal & Pricing",
      description:
        "Based on your needs, we provide a customized proposal with a detailed scope of work, timeline, and transparent quote.",
      details: [
        "A detailed scope of work.",
        "A project timeline.",
        "A transparent quote for the service."
      ],
      outcome: "An agreed-upon plan to move forward."
    },
    {
      step: "Content Gathering",
      description: "We collaborate to gather all necessary materials.",
      details: [
        "High-quality images or videos.",
        "Copywriting content or brand messaging.",
        "Brand assets like logos, fonts, and color palettes."
      ],
      note:
        "Our team can provide professional copywriting and design support if needed."
    },
    {
      step: "Design & Development",
      description: "Our team crafts a custom landing page tailored to your needs.",
      process: [
        "Wireframing: Sketching the layout and structure for feedback.",
        "Visual Design: Creating a visually appealing and on-brand design.",
        "Development: Building the landing page using modern, scalable technologies."
      ],
      ensures: [
        "Mobile-friendly and responsive design.",
        "Fast-loading and SEO-optimized performance.",
        "Integration with tools like email marketing or analytics."
      ]
    },
    {
      step: "Review & Feedback",
      description: "We present the initial draft for your review.",
      details: [
        "Suggest changes or adjustments to the design, content, or features.",
        "Test functionality across devices."
      ],
      outcome: "Revisions made to ensure the landing page exceeds your expectations."
    },
    {
      step: "Domain Setup & Launch",
      description: "We connect and launch your landing page.",
      details: [
        "Connect your landing page to a custom domain or subdomain.",
        "Perform final testing to ensure everything works perfectly."
      ],
      outcome:
        "A live, fully functional landing page ready to engage your audience."
    },
    {
      step: "Post-Launch Support",
      description: "Our relationship doesn’t end with the launch.",
      services: [
        "Maintenance: Regular updates or changes as your needs evolve.",
        "Performance Tracking: Analytics setup to measure success and optimize.",
        "Future Upgrades: Scalability to add features or redesign as your business grows."
      ]
    }
];

/**
 *  1. **Initial Client Meeting**: The first meeting is crucial for understanding client needs and website goals.
    2. **Design Process**: Using tools like Figma for mock-ups helps streamline the design phase before building.
    3. **Client Expectations**: Clients primarily want an effective website; the method of creation is less important to them.
    4. **Testing and Deployment**: Thorough testing is essential before presenting the final product to the client.
    5. **Payment Strategies**: Offering discounts for upfront payments can facilitate smoother transactions.
        1. During the price negotiation, I offer the client a **15% discount** if they pay in full upfront.
        2. To make this work, I mark up my original price by 15%. That way, if they choose the discount, I still get my intended rate.
        3. If they don’t choose the discount, I still require half of the payment upfront, with the rest paid in milestones.
 */

/**
 * Key Landing Page Design Principles
 * 1. The 40-40-20 Rule of Marketing
    - 40% success depends on the offer
    - 40% depends on targeting the right audience
    - 20% relies on copy and design
 * 2. Crafting an Irresistible Offer
      Use the Clear Offer Formula:
      "We do X for Y so you can Z without W"
          - X: Your product/service
          - Y: Ideal customer
          - Z: Desired benefit
          - W: Unwanted outcome
  * 3. Landing Page Templates
        Two recommended designs:
        - Simple version: Minimalist, focused
        - More detailed version: Additional persuasion elements
    4. Key Design Principles:
      - Keep it simple
      - Align with audience expectations
      - Focus on clear, compelling communication
      - Test and iterate
    5. Optimize Form Design, Use Compelling Images, Ensure Content Congruence
 * Key Steps:

1. Call Out Your Audience
    - Directly address your specific target market
    - Use clear, attention-grabbing language
2. Create a Powerful Headline
    - Craft a headline that grabs readers' attention
    - Make a bold promise or benefit
    - Write 10-20 headline variations
3. Identify and Agitate the Problem
    - Describe the audience's pain points
    - Show you understand their challenges better than they do
    - Emphasize that people are more motivated to avoid pain than gain pleasure
4. Provide a Solution
    - Present your service as the remedy to their problems
    - Show how you can transform their current state
5. Demonstrate Credibility
    - Showcase results, case studies, and credentials
    - Use logos, testimonials, awards
    - Don't worry if you're just starting and lack extensive proof
6. Highlight Benefits
    - Focus on outcomes, not just features
    - Make benefits feel visceral and exciting
7. Add Social Proof
    - Include testimonials, statistics, expert quotes
    - Build trust and validate the problem's significance
8. Create a "Godfather Offer"
    - Make an irresistible, low-risk offer
    - Stack value
    - Make it clear and concise
9. Add Bonuses
    - Include extra value to tip potential clients towards action
    - Sweeten the deal with additional services
10. Inject Scarcity
    - Create urgency with limited-time offers
    - Motivate immediate action
11. Provide a Strong Guarantee
    - Remove purchase resistance
    - Show confidence in your service
12. Include a Clear Call to Action
    - Tell (not ask) people what to do next
    - Focus on booking a consultation
13. Add a Warning
    - Highlight what they'll miss by not acting
    - Reinforce the limited nature of the offer
14. Close with a Reminder
    - Summarize key benefits
    - Restate the call to action

Key Takeaways:

- Simplicity is key
- Focus on solving the customer's problem
- Create value that feels too good to pass up
 */