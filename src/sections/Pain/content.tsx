export const title = "Kenapa Masih Mengandalkan Brosur Tradisional Jika Landing Page Bisa Melonjakkan Bisnis Anda?"

export const tooltipInfo = "Layanan landing page adalah jasa yang ditawarkan kepada bisnis atau individu untuk membuat dan mengoptimalkan halaman arahan (landing page) yang efektif. Landing page ini dirancang khusus untuk mencapai tujuan tertentu, seperti meningkatkan penjualan, mengumpulkan lead, atau meningkatkan kesadaran merek.";
export const marketingMessage = {
    masalah: [
      "Brosur Anda Menghambat Pertumbuhan Bisnis",
      "Di era digital yang serba cepat ini, brosur tradisional tidak lagi efektif.",
      {
        poin: [
          "Mudah Hilang atau Terabaikan: Pelanggan sering kali salah tempat atau melupakan brosur begitu meninggalkan toko atau acara Anda.",
          "Biaya Cetak dan Pembaruan Mahal: Biaya cetak yang terus bertambah, ditambah setiap pembaruan memerlukan cetak ulang dari awal.",
          "Jangkauan Terbatas: Brosur hanya mencapai mereka yang Anda temui secara langsung, meninggalkan celah besar pada audiens potensial Anda."
        ]
      },
      "Anda menghabiskan anggaran untuk materi pemasaran yang hasilnya sulit diukur. Parahnya lagi, Anda kehilangan cara modern yang lebih disukai pelanggan untuk berinteraksi—melalui informasi yang cepat, interaktif, dan mudah diakses."
    ],
    keresahan: [
      "Setiap Hari Anda Kehilangan Peluang",
      "Bayangkan ini:",
      {
        poin: [
          "Seorang calon pelanggan meminta profil perusahaan Anda, tetapi brosur Anda habis—atau lebih buruk lagi, Anda tidak membawanya.",
          "Anda baru saja mengeluarkan biaya besar untuk mencetak brosur baru, tetapi seminggu kemudian harga atau layanan Anda berubah.",
          "Pelanggan ingin tahu lebih banyak tentang produk Anda, tetapi brosur Anda hanya berakhir di tempat sampah karena mereka lebih suka sesuatu yang online dan bisa dibagikan."
        ]
      },
      "Setiap momen ini adalah peluang yang terlewatkan. Dengan tetap mengandalkan brosur tradisional, Anda tertinggal dari kompetitor yang telah menggunakan landing page modern dengan tingkat konversi tinggi untuk memenangkan hati pelanggan."
    ],
    solusi: [
      "Tingkatkan dengan Landing Page yang Bekerja 24/7",
      "Ucapkan selamat tinggal pada brosur yang tidak efisien dan sambut masa depan pemasaran: Landing Page.",
      {
        keunggulan: [
          "Selalu Tersedia, Kapan Saja: Landing page bisa diakses 24/7 secara online. Bagikan dengan cepat melalui tautan atau QR code—tanpa perlu cetak, tanpa repot.",
          "Dinamis dan Mudah Diperbarui: Perlu mengubah layanan atau harga? Tidak masalah! Landing page bisa diperbarui dalam hitungan menit tanpa biaya tambahan.",
          "Interaktif dan Menarik: Dengan desain modern, animasi, dan video, landing page memikat audiens Anda dan mendorong mereka untuk bertindak—baik itu membeli, mengisi formulir, atau menjelajahi produk Anda.",
          "Jangkauan Luas dengan Hasil Terukur: Bagikan landing page Anda di media sosial, email, atau iklan online. Pantau kinerja, analisis data, dan optimalkan untuk hasil yang lebih baik.",
          "Efisien dan Hemat Biaya: Satu landing page bisa menggantikan ratusan brosur, mengurangi biaya cetak, sekaligus memberikan ROI yang jauh lebih tinggi."
        ]
      }
    ],
    transformasi: [
      "Dari Statis ke Dinamis",
      "Dengan Landing Page:",
      {
        manfaat: [
          "Materi pemasaran Anda tidak pernah habis.",
          "Anda dapat membagikannya secara instan dengan siapa saja, di mana saja.",
          "Pelanggan Anda tetap terlibat dengan konten modern dan interaktif.",
          "Anda bisa mengukur hasil dan terus meningkatkan performa."
        ]
      },
      "Bayangkan kemudahan yang Anda dapatkan dengan bertransformasi ke digital—dan mampu menjangkau lebih banyak pelanggan dan meningkatkan konversi dengan lebih mudah."
    ],
    ajakan: [
      "Apa yang Anda Tunggu?",
      "Brosur tradisional adalah masa lalu. Landing page yang dirancang profesional adalah kunci menuju keterlibatan yang lebih baik, tingkat konversi lebih tinggi, dan kesuksesan yang terukur.",
      "Dapatkan Landing Page Custom untuk Bisnis Anda Hari Ini!",
      "👉 Klik di sini untuk memulai dan rasakan kekuatan pemasaran digital yang efektif.",
      "Atau jika Anda sudah menghadirkan landing page, namun pertumbuhan bisnis Anda masih tetap tidak signifikan. Kami juga punya solusi untuk Anda."
    ]
};
export const pain = {
  title: "Brosur Anda Menghambat Pertumbuhan Bisnis",
  subtitle: "Di era digital yang serba cepat ini, brosur tradisional tidak lagi efektif.",
  points: [
    {
      title: "Mudah Hilang atau Terabaikan",
      description: "Pelanggan sering kali salah tempat atau melupakan brosur begitu meninggalkan toko atau acara Anda."
    },
    {
      title: "Biaya Cetak dan Pembaruan Mahal",
      description: "Biaya cetak yang terus bertambah, ditambah setiap pembaruan memerlukan cetak ulang dari awal."
    },
    {
      title: "Jangkauan Terbatas",
      description: "Brosur hanya mencapai mereka yang Anda temui secara langsung, meninggalkan celah besar pada audiens potensial Anda."
    }
  ],
  conclusion: "Anda menghabiskan anggaran untuk materi pemasaran yang hasilnya sulit diukur. Parahnya lagi, Anda kehilangan cara modern yang lebih disukai pelanggan untuk berinteraksi—melalui informasi yang cepat, interaktif, dan mudah diakses."
};
export const cta = {
  title: "Transform Your Business with a High-Converting Landing Page & Stunning Web Design!",
  message: "Ambil langkah pertama untuk mengubah landing page Anda hari ini. Jadwalkan konsultasi gratis dan temukan bagaimana kami dapat membantu Anda mencapai tujuan bisnis Anda."
}

export type Slide = {
  judul: string;
  gambar: string; // Assuming gambar is a URL or path to an image
  cerita: string;
};

type Story = {
  judul: string;
  slides: Slide[];
};
export const cerita_bergambar: Story[] = [
  // {
  //   judul: "Yummy Cake",
  //   slides: [
  //     { 
  //       judul: "Perjuangan Dina dan Toko Kue 'Yummy Cake'",
  //       gambar: "/story-slides/1-1.png",
  //       cerita: "Dina adalah seorang ibu rumah tangga yang pandai membuat kue. Kue-kue buatannya selalu laris manis di lingkungan rumahnya. Teman-teman dan tetangga sering memesan kue ulang tahun, kue kering, atau dessert box untuk acara-acara spesial. Melihat potensi ini, Dina memutuskan untuk membuka usaha kecil-kecilan bernama 'Lezatnya Dina'."
  //     },
  //     {
  //       judul: "Promosi Media Sosial",
  //       gambar: "/story-slides/1-2.png",
  //       cerita: "Awalnya, Dina hanya mengandalkan pesanan dari mulut ke mulut. Namun, lama-kelamaan, ia merasa usahanya tidak berkembang. Teman-temannya menyarankan untuk mempromosikan kuenya di media sosial. Dina pun membuat akun Instagram dan Facebook untuk memamerkan foto-foto kue buatannya. Pesanan pun mulai berdatangan dari luar lingkungan rumahnya."
  //     },
  //     {
  //       judul: "Pesanan Besar yang Hilang",
  //       gambar: "/story-slides/1-3-3.jpg",
  //       cerita: "Suatu hari, Dina mendapat pesanan besar dari seorang calon pelanggan yang menemukan akun Instagram-nya. Pelanggan itu ingin memesan 50 box dessert untuk acara kantor. Namun, si pelanggan kebingungan karena Dina hanya mengandalkan pesan langsung di Instagram. Tidak ada informasi lengkap tentang menu, harga, atau cara pemesanan. Akhirnya, si pelanggan memilih toko kue lain yang memiliki website dengan informasi lengkap."
  //     },
  //     {
  //       judul: "Membuat Landing Page",
  //       gambar: "/story-slides/1-4.png",
  //       cerita: "Dina pun menyadari kekurangannya. Ia belajar dari temannya yang sudah berpengalaman di dunia digital dan memutuskan untuk membuat landing page sederhana untuk usahanya. Di landing page tersebut, Dina menampilkan foto-foto kue terbaiknya, daftar menu lengkap dengan harga, testimoni dari pelanggan yang puas, dan tombol 'Pesan Sekarang' yang langsung terhubung ke WhatsApp-nya."
  //     },
  //     {
  //       judul: "Hasil Luar Biasa",
  //       gambar: "/story-slides/1-5.png",
  //       cerita: "Setelah landing page-nya aktif, Dina membagikan link-nya di media sosial dan iklan online. Hasilnya luar biasa! Banyak pelanggan baru yang merasa lebih nyaman karena semua informasi ada di satu halaman. Mereka tidak perlu lagi bertanya-tanya tentang harga atau menu. Bahkan, Dina mulai mendapat pesanan dari kota-kota lain berkat iklan online yang mengarahkan calon pelanggan ke landing page-nya."
  //     },
  //   ]
  // },
  {
    judul: "CreativeInk",
    slides: [
      {
        judul: "Perjalanan Rian dan Jasa Desain Grafis 'CreativeInk'",
        gambar: "/story-slides/2-1.png",
        cerita: "Rian adalah seorang desainer grafis berbakat yang baru memulai bisnis jasa desain bernama 'CreativeInk'. Awalnya, Rian hanya mengandalkan platform freelance lokal untuk mendapatkan proyek. Namun, ia merasa platform tersebut mengambil komisi besar dan membuatnya sulit membangun identitas bisnisnya sendiri. Rian pun memutuskan untuk mencari cara agar klien bisa langsung menghubunginya."
      },
      {
        judul: "Klien Potensial yang Hilang",
        gambar: "/story-slides/2-2.png",
        cerita: "Suatu hari, Rian bertemu dengan seorang calon klien potensial melalui rekomendasi teman. Klien tersebut membutuhkan desain logo dan branding untuk usaha barunya. Rian dengan antusias menjelaskan portofolio dan layanannya melalui email. Namun, klien tersebut meminta Rian mengirimkan link website atau halaman khusus yang berisi informasi lengkap tentang jasanya, termasuk portofolio, harga paket, dan testimoni dari klien sebelumnya. Rian kebingungan karena ia tidak memiliki website atau landing page. Ia hanya mengandalkan file PDF yang berisi portofolio dan penawaran harga. Klien tersebut akhirnya memilih desainer lain yang sudah memiliki website profesional dengan informasi lengkap dan mudah diakses."
      },
      {
        judul: "Membuat Landing Page",
        gambar: "/story-slides/2-3.png",
        cerita: "Menyadari kesalahannya, Rian segera membuat landing page sederhana untuk 'CreativeInk'. Di landing page tersebut, Rian menampilkan portofolio desain terbaiknya, paket layanan beserta harganya, testimoni dari klien sebelumnya, dan tombol 'Hubungi Saya' yang langsung terhubung ke email dan WhatsApp-nya."
      },
      {
        judul: "Hasil Menakjubkan",
        gambar: "/story-slides/2-4.png",
        cerita: "Setelah landing page-nya selesai, Rian mulai mempromosikannya di media sosial, forum desain, dan grup komunitas bisnis. Hasilnya sungguh menakjubkan! Banyak calon klien yang merasa lebih nyaman karena semua informasi yang mereka butuhkan sudah tersedia di satu halaman. Mereka tidak perlu lagi bertanya-tanya tentang harga atau proses kerja. Bahkan, Rian mulai mendapatkan klien dari luar kota dan luar negeri berkat promosi online yang mengarahkan calon klien ke landing page-nya."
      },
    ]
  },
  {
    judul: "Wanderlust Adventures",
    slides: [
      {
        judul: "Usaha Tour & Travel 'Wanderlust Adventures' milik Andi",
        gambar: "/story-slides/3-1.webp",
        cerita: "Andi adalah seorang pemandu wisata yang memiliki usaha tour & travel bernama 'Wanderlust Adventures'. Usahanya menawarkan paket wisata ke destinasi alam eksotis, seperti hiking ke gunung, menjelajahi hutan, atau mengunjungi pantai-pantai tersembunyi. Awalnya, Andi hanya mengandalkan promosi dari mulut ke mulut dan brosur fisik yang dibagikan di kafe-kafe atau tempat nongkrong anak muda."    
      },
      {
        judul: "Peluang yang Hilang",
        gambar: "/story-slides/3-2.webp",
        cerita: "Suatu hari, Andi mendapat kabar bahwa ada komunitas pecinta alam dari kota besar yang sedang mencari paket wisata untuk 30 orang. Mereka menemukan nama 'Wanderlust Adventures' dari rekomendasi teman, tetapi ketika mencoba mencari informasi lebih lanjut secara online, mereka tidak menemukan website atau landing page yang bisa diakses. Andi hanya memiliki akun Instagram yang jarang di-update, dan tidak ada informasi lengkap tentang paket wisata, harga, atau itinerary. Komunitas tersebut akhirnya memilih biro perjalanan lain yang memiliki website profesional dengan informasi lengkap, foto-foto destinasi, dan testimoni dari pelanggan sebelumnya. Andi pun kehilangan peluang besar karena calon kliennya tidak bisa menemukan informasi yang mereka butuhkan."
      },
      {
        judul: "Membuat Landing Page",
        gambar: "/story-slides/3-3-1.jpeg",
        cerita: "Menyadari hal ini, Andi memutuskan untuk membuat landing page sederhana untuk 'Wanderlust Adventures'. Di landing page tersebut, Andi menampilkan foto-foto destinasi wisata yang menakjubkan, daftar paket wisata beserta harganya, itinerary lengkap untuk setiap paket, testimoni dari pelanggan yang puas, dan tombol 'Daftar Sekarang' yang langsung terhubung ke WhatsApp-nya."
      },
      {
        judul: "Hasil Luar Biasa",
        gambar: "/story-slides/3-4-4.jpeg",
        cerita: "Setelah landing page-nya aktif, Andi mulai mempromosikannya melalui Google Ads dan media sosial. Hasilnya luar biasa! Banyak calon pelanggan yang merasa lebih percaya karena semua informasi tersedia dengan jelas. Mereka tidak perlu lagi bertanya-tanya tentang harga atau jadwal. Bahkan, Andi mulai mendapatkan pelanggan dari luar daerah yang tertarik dengan paket wisatanya."
      },
    ]
  },
  // {
  //   judul: "SkillUp Academy",
  //   slides: [
  //     {
  //       judul: "Bisnis Online Course 'SkillUp Academy' milik Sarah",
  //       gambar: "/story-slides/4-1.jpeg",
  //       cerita: "Sarah adalah seorang ahli pemasaran digital yang memutuskan untuk membuat bisnis online course bernama 'SkillUp Academy'. Ia menawarkan kursus online tentang digital marketing, SEO, dan content creation. Awalnya, Sarah hanya mengandalkan platform kursus online untuk menjual kelasnya. Namun, ia merasa platform tersebut mengambil komisi besar dan membatasi kreativitasnya dalam mempromosikan kelas."    
  //     },
  //     {
  //       judul: "Webinar yang Menarik",
  //       gambar: "/story-slides/4-2-1.jpeg",
  //       cerita: "Suatu hari, Sarah mengikuti webinar dan berkesempatan untuk mempromosikan kursusnya kepada ratusan peserta. Ia memberikan presentasi yang menarik, dan banyak peserta yang tertarik untuk mendaftar. Namun, ketika Sarah hanya memberikan link ke platform kursus online, banyak peserta yang merasa kurang nyaman karena harus mendaftar dan membayar melalui platform tersebut. Beberapa bahkan meminta link langsung ke website atau halaman khusus yang bisa memberikan informasi lebih lengkap."
  //     },
  //     {
  //       judul: "Membuat Landing Page",
  //       gambar: "/story-slides/4-3-2.jpeg",
  //       cerita: "Sarah pun menyadari pentingnya memiliki landing page sendiri. Ia segera membuat landing page untuk 'SkillUp Academy' yang berisi deskripsi lengkap tentang kursus yang ditawarkan, daftar modul dan manfaat yang akan didapatkan, testimoni dari peserta sebelumnya, dan tombol 'Daftar Sekarang' yang langsung mengarahkan ke pembayaran."
  //     },
  //     {
  //       judul: "Peningkatan Jumlah Pendaftar",
  //       gambar: "/story-slides/4-3-4.jpeg",
  //       cerita: "Setelah landing page-nya aktif, Sarah mulai mempromosikannya melalui webinar, email marketing, dan iklan Facebook. Hasilnya, jumlah pendaftar kursusnya meningkat signifikan karena calon peserta merasa lebih nyaman dan percaya dengan informasi yang tersedia di landing page-nya."
  //     }
  //   ]
  // },
];