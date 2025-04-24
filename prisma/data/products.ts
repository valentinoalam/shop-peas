export interface Product {
  name: string;
  description: string;
  weight: number;
  price: number;
  image: string;
  category: number;
  stock: number;
  rating: number;
  reviews?: number;
  featured: boolean;
}

// export const categories = Array.from(new Set(products.map(product => product.category)));
export const categories = [
  {
    name: "Buah-buahan segar",
    description: "Berbagai jenis buah-buahan segar seperti tomat cherry dan alpukat."
  },
  {
    name: "Sayur-sayuran segar",
    description: "Berbagai jenis sayur-sayuran segar langsung dari petani."
  },
  {
    name: "Biji-bijian dan sereal",
    description: "Produk biji-bijian dan sereal seperti quinoa dan granola."
  },
  {
    name: "Produk susu",
    description: "Berbagai produk susu seperti yogurt probiotik dan keju cottage."
  },
  {
    name: "Suplemen makanan",
    description: "Suplemen makanan seperti chia seed dan tepung almond."
  },
  {
    name: "Makanan olahan",
    description: "Makanan olahan seperti mie soba dan roti gandum."
  },
  {
    name: "Produk bayi",
    description: "Produk makanan bayi seperti bubur bayi organik."
  },
  {
    name: "Protein hewani",
    description: "Produk protein hewani seperti daging sapi giling."
  },
  {
    name: "Minuman",
    description: "Berbagai jenis minuman seperti teh hijau."
  },
  {
    name: "Minyak dan selai",
    description: "Produk minyak dan selai seperti minyak zaitun dan selai stroberi."
  }
]

export const products: Product[] = [
  {
    name: "Bayam Merah Organik",
    description: "Bayam merah segar langsung dari petani organik lokal di Lembang. Kaya zat besi dan vitamin. weight per ikat sekitar 250gr.",
    category: 2,
    price: 8500.00, // Contoh price dalam Rupiah
    weight: 250.0, // weight dalam gram
    stock: 150,   // Jumlah stok (ikat)
    rating: 4.7,  // Rating rata-rata (skala 1-5)
    reviews: 10,
    image: "/images/produk/bayam-merah-organik.jpg", // Path gambar placeholder
    featured: true // Tampil di bagian produk unggulan?
  },
  {
    name: "Brokoli Organik Premium",
    description: "Brokoli organik ukuran premium, padat nutrisi. Ideal untuk ditumis, dikukus, atau sup. weight per buah sekitar 400-500gr.",
    category: 2,
    price: 22000.00,
    weight: 450.0, // weight rata-rata dalam gram
    stock: 85,
    rating: 4.8,
    reviews: 10,
    image: "/images/produk/brokoli-organik-premium.jpg",
    featured: true
  },
  {
    name: "Wortel Baby Organik Manis",
    description: "Wortel baby organik dengan rasa manis alami dan tekstur renyah. Cocok untuk snack sehat atau campuran salad. Kemasan pack 300gr.",
    category: 2,
    price: 15500.00,
    weight: 300.0,
    stock: 120,
    rating: 4.6,
    reviews: 10,
    image: "/images/produk/wortel-baby-organik.jpg",
    featured: false
  },
  {
    name: "Beras Merah Organik Pecah Kulit",
    description: "Beras merah organik jenis pecah kulit, kaya serat dan nutrisi penting. Diproses secara alami tanpa pemutih. Kemasan 1kg.",
    category: 3,
    price: 28000.00,
    weight: 1000.0, // 1kg = 1000 gram
    stock: 250,
    rating: 4.9,    reviews: 10,
    image: "/images/produk/beras-merah-organik-1kg.jpg",
    featured: true
  },
  {
    name: "Minyak Kelapa Virgin Organik (Cold-Pressed)",
    description: "100% Virgin Coconut Oil (VCO) organik murni. Diproses secara cold-pressed untuk menjaga kualitas nutrisi. Aroma kelapa segar. Kemasan 250ml.",
    category: 10,
    price: 45000.00,
    weight: 230.0, // Estimasi weight untuk 250ml VCO (densitas ~0.92g/ml)
    stock: 95,
    rating: 4.9,    reviews: 10,
    image: "/images/produk/vco-organik-250ml.jpg",
    featured: true
  },
  {
    name: "Gula Aren Organik Bubuk",
    description: "Pemanis alami dari nira aren organik. Memiliki indeks glikemik lebih rendah dibanding gula pasir. Aroma khas karamel. Kemasan 250gr.",
    category: 6,
    price: 18000.00,
    weight: 250.0,
    stock: 210,
    rating: 4.7,    reviews: 10,
    image: "/images/produk/gula-aren-organik-250gr.jpg",
    featured: false
  },
  {
    name: "Telur Ayam Kampung Organik (Free-Range)",
    description: "Telur dari ayam kampung yang diberi pakan organik dan dibesarkan secara bebas (free-range). Kuning telur lebih pekat. Pack isi 10 butir.",
    category: 8,
    price: 35000.00,
    weight: 600.0, // Estimasi weight rata-rata 10 telur (@60gr/butir)
    stock: 55,
    rating: 4.8,    reviews: 10,
    image: "/images/produk/telur-ayam-kampung-organik-10.jpg",
    featured: true
  },
  {
    name: "Tempe Organik Non-GMO",
    description: "Tempe segar dibuat dari kedelai lokal pilihan non-GMO yang ditanam secara organik. Sumber protein nabati berkualitas. Papan @ 250gr.",
    category: 6,
    price: 7000.00,
    weight: 250.0,
    stock: 175,
    rating: 4.6,    reviews: 10,
    image: "/images/produk/tempe-organik.jpg",
    featured: false
  },
  {
    name: "Apel Fuji Organik Premium",
    description: "Apel Fuji organik premium dengan rasa manis, renyah, dan juicy. Cocok dimakan langsung atau dibuat jus. Dijual per kg (isi 4-5 buah).",
    category: 1,
    price: 65000.00, // price per kg
    weight: 1000.0, // Satuan jual per kg
    stock: 70, // Stok dalam satuan kg
    rating: 4.7,    reviews: 10,
    image: "/images/produk/apel-fuji-organik.jpg",
    featured: true
  },
  {
    name: "Kopi Arabika Gayo Organik (Bubuk)",
    description: "Kopi bubuk dari biji Arabika Gayo Aceh pilihan, ditanam secara organik di dataran tinggi. Medium roast, aroma kuat dan khas. Kemasan 200gr.",
    category: 9,
    price: 55000.00,
    weight: 200.0,
    stock: 90,
    rating: 4.9,    reviews: 10,
    image: "/images/produk/kopi-gayo-organik-bubuk-200gr.jpg",
    featured: false
  },
  {
    name: "Kale Keriting Organik",
    description: "Daun kale keriting organik, superfood kaya vitamin K, A, dan C. Cocok untuk salad, smoothies, atau keripik kale. Ikat @ 200gr.",
    category: 5,
    price: 16000.00,
    weight: 200.0,
    stock: 110,
    rating: 4.5,    reviews: 10,
    image: "/images/produk/kale-keriting-organik.jpg",
    featured: false
  },
  {
    name: "Pisang Cavendish Organik",
    description: "Pisang cavendish matang pohon, ditanam tanpa pestisida kimia. Rasa manis alami dan tekstur lembut. Dijual per sisir (± 800gr-1kg).",
    category: 1,
    price: 25000.00, // price per sisir
    weight: 900.0, // weight rata-rata per sisir dalam gram
    stock: 60, // Stok dalam satuan sisir
    rating: 4.6,    reviews: 10,
    image: "/images/produk/pisang-cavendish-organik.jpg",
    featured: true
  },
  {
    name: "Tomat Cherry Organik",
    description: "Tomat cherry organik segar dengan rasa manis dan sedikit asam. Cocok untuk salad atau camilan sehat. Kemasan pack 250gr.",
    category: 1,
    price: 19500.00,
    weight: 250.0,
    stock: 95,
    rating: 4.6,    reviews: 10,
    image: "/images/produk/tomat-cherry-organik.jpg",
    featured: false
  },
  {
    name: "Quinoa Organik",
    description: "Biji quinoa organik kaya protein dan asam amino lengkap. Alternatif sehat pengganti nasi atau bahan salad. Kemasan 500gr.",
    category: 5,
    price: 65000.00,
    weight: 500.0,
    stock: 45,
    rating: 4.8,    reviews: 10,
    image: "/images/produk/quinoa-organik-500gr.jpg",
    featured: true
  },
  {
    name: "Madu Hutan Organik Raw",
    description: "Madu hutan murni dari lebah liar di kawasan hutan lindung. Tidak dipasteurisasi untuk menjaga enzim dan nutrisi. Botol 350ml.",
    category: 5,
    price: 85000.00,
    weight: 470.0, // Estimasi weight untuk 350ml madu
    stock: 40,
    rating: 4.9,    reviews: 10,
    image: "/images/produk/madu-hutan-raw-350ml.jpg",
    featured: true
  },
  {
    name: "Tahu Sutera Organik",
    description: "Tahu sutera lembut dari kedelai organik pilihan. Tinggi protein dan rendah lemak. Tekstur lembut ideal untuk sup atau kukus. Pack 300gr.",
    category: 6,
    price: 12000.00,
    weight: 300.0,
    stock: 120,
    rating: 4.5,    reviews: 10,
    image: "/images/produk/tahu-sutera-organik.jpg",
    featured: false
  },
  {
    name: "Granola Organik Homemade",
    description: "Campuran oat, kacang-kacangan, dan biji-bijian organik yang dipanggang dengan madu organik. Sarapan sehat kaya serat. Kemasan 350gr.",
    category: 5,
    price: 58000.00,
    weight: 350.0,
    stock: 65,
    rating: 4.7,    reviews: 10,
    image: "/images/produk/granola-organik-homemade.jpg",
    featured: true
  },
  {
    name: "Alpukat Mentega Organik",
    description: "Alpukat varietas mentega organik dengan daging buah tebal dan creamy. Kaya lemak sehat dan antioksidan. Dijual per kg (3-4 buah).",
    category: 5,
    price: 45000.00,
    weight: 1000.0,
    stock: 55,
    rating: 4.7,    reviews: 10,
    image: "/images/produk/alpukat-mentega-organik.jpg",
    featured: true
  },
  {
    name: "Yogurt Probiotik Organik",
    description: "Yogurt plain dari susu sapi organik dengan kultur probiotik aktif. Baik untuk pencernaan dan imunitas. Kemasan glass jar 500gr.",
    category: 4,
    price: 39000.00,
    weight: 500.0,
    stock: 40,
    rating: 4.6,    reviews: 10,
    image: "/images/produk/yogurt-probiotik-organik.jpg",
    featured: false
  },
  {
    name: "Chia Seed Organik",
    description: "Biji chia organik kaya omega-3, serat, dan antioksidan. Cocok untuk pudding, smoothie, atau taburan. Kemasan 250gr.",
    category: 5,
    price: 49000.00,
    weight: 250.0,
    stock: 75,
    rating: 4.8,    reviews: 10,
    image: "/images/produk/chia-seed-organik.jpg",
    featured: false
  },
  {
    name: "Tepung Almond Organik",
    description: "Tepung dari kacang almond organik yang digiling halus. Bebas gluten, rendah karbohidrat. Ideal untuk kue dan pastry sehat. Kemasan 250gr.",
    category: 5,
    price: 97000.00,
    weight: 250.0,
    stock: 30,
    rating: 4.8,    reviews: 10,
    image: "/images/produk/tepung-almond-organik.jpg",
    featured: false
  },
  {
    name: "Edamame Organik Beku",
    description: "Kedelai muda organik yang dipanen pada waktu optimal dan dibekukan untuk menjaga kesegaran. Sumber protein nabati berkualitas. Pack 500gr.",
    category: 4,
    price: 35000.00,
    weight: 500.0,
    stock: 85,
    rating: 4.5,    reviews: 10,
    image: "/images/produk/edamame-organik-beku.jpg",
    featured: false
  },
  {
    name: "Mie Soba Organik",
    description: "Mie soba dari tepung soba (buckwheat) organik. Tekstur kenyal dengan rasa khas. Cocok untuk hidangan mie panas atau dingin. Kemasan 300gr.",
    category: 6,
    price: 42000.00,
    weight: 300.0,
    stock: 60,
    rating: 4.6,    reviews: 10,
    image: "/images/produk/mie-soba-organik.jpg",
    featured: false
  },
  {
    name: "Selai Stroberi Organik Homemade",
    description: "Selai stroberi dari buah stroberi organik segar, gula aren organik, dan perasan lemon. Tanpa pengawet atau pewarna. Jar 250gr.",
    category: 10,
    price: 48000.00,
    weight: 250.0,
    stock: 55,
    rating: 4.7,    reviews: 10,
    image: "/images/produk/selai-stroberi-organik.jpg",
    featured: true
  },
  {
    name: "Keju Cottage Organik",
    description: "Keju cottage segar dari susu sapi organik. Tekstur lembut dengan rasa creamy. Tinggi protein dan rendah lemak. Kemasan 250gr.",
    category: 4,
    price: 52000.00,
    weight: 250.0,
    stock: 35,
    rating: 4.5,    reviews: 10,
    image: "/images/produk/keju-cottage-organik.jpg",
    featured: false
  },
  {
    name: "Daging Sapi Giling Organik",
    description: "Daging sapi giling dari sapi yang diternakkan secara organik (grass-fed). Tanpa hormon dan antibiotik. Kemasan vacuum 500gr.",
    category: 8,
    price: 125000.00,
    weight: 500.0,
    stock: 25,
    rating: 4.8,    reviews: 10,
    image: "/images/produk/daging-sapi-giling-organik.jpg",
    featured: true
  },
  {
    name: "Bubur Bayi Organik Homemade",
    description: "Bubur bayi instan dari beras merah organik, labu kuning, dan wortel. Tanpa gula tambahan atau pengawet. Untuk bayi 6+ bulan. Pack 200gr.",
    category: 7,
    price: 38000.00,
    weight: 200.0,
    stock: 45,
    rating: 4.9,    reviews: 10,
    image: "/images/produk/bubur-bayi-organik.jpg",
    featured: true
  },
  {
    name: "Teh Hijau Organik",
    description: "Daun teh hijau organik berkualitas premium dari perkebunan Puncak Bogor. Kaya antioksidan dan L-theanine. Kemasan 100gr.",
    category: 9,
    price: 45000.00,
    weight: 100,
    stock: 85,
    rating: 4.7,    reviews: 10,
    image: "/images/produk/teh-hijau-organik.jpg",
    featured: false
  },
  {
    name: "Roti Gandum Utuh Organik",
    description: "Roti dari tepung gandum utuh organik, ragi alami, dan garam laut. Dipanggang tradisional dengan kayu bakar. Tinggi serat. weight 500gr.",
    category: 6,
    price: 35000.00,
    weight: 500.0,
    stock: 30,
    rating: 4.6,    reviews: 10,
    image: "/images/produk/roti-gandum-utuh-organik.jpg",
    featured: true
  },
  {
    name: "Minyak Zaitun Extra Virgin Organik",
    description: "Minyak zaitun extra virgin organik cold-pressed. Asam lemak tak jenuh tinggi, ideal untuk salad dan masakan. Botol kaca 250ml.",
    category: 10,
    price: 89000.00,
    weight: 230.0, // Estimasi weight untuk 250ml
    stock: 40,
    rating: 4.8,    reviews: 10,
    image: "/images/produk/minyak-zaitun-evoo-organik.jpg",
    featured: true
  },
  {
    name: "Beras Merah Organik Pecah Kulit",
    description: "Beras merah organik jenis pecah kulit, kaya serat dan nutrisi penting. Diproses secara alami tanpa pemutih. Kemasan 1kg.",
    category: 3,
    price: 28000.00,
    weight: 1000.0, // 1kg = 1000 gram
    stock: 250,
    rating: 4.9,    reviews: 10,
    image: "/images/produk/beras-merah-organik-1kg.jpg",
    featured: true
  },
  // {
  //   id: "1",
  //   name: "Wireless Headphones",
  //   description: "Premium noise-cancelling wireless headphones with 40-hour battery life.",
  //   price: 249.99,
  //   image: "/placeholder.svg",
  //   category: "Electronics",
  //   stock: 25,
  //   rating: 4.8,
  //   reviews: 120,
  //   featured: true
  // },
  // {
  //   id: "2",
  //   name: "Smartwatch Pro",
  //   description: "Advanced smartwatch with health tracking, GPS, and water resistance.",
  //   price: 199.99,
  //   image: "/placeholder.svg",
  //   category: "Electronics",
  //   stock: 15,
  //   rating: 4.5,
  //   reviews: 85,
  //   featured: true
  // },
  // {
  //   id: "3",
  //   name: "Digital Camera",
  //   description: "Professional-grade digital camera with 24MP sensor and 4K video recording.",
  //   price: 599.99,
  //   image: "/placeholder.svg",
  //   category: "Electronics",
  //   stock: 10,
  //   rating: 4.7,
  //   reviews: 65,
  //   featured: false
  // },
  // {
  //   id: "4",
  //   name: "Leather Wallet",
  //   description: "Handcrafted genuine leather wallet with RFID protection.",
  //   price: 49.99,
  //   image: "/placeholder.svg",
  //   category: "Accessories",
  //   stock: 50,
  //   rating: 4.6,
  //   reviews: 210,
  //   featured: true
  // },
  // {
  //   id: "5",
  //   name: "Running Shoes",
  //   description: "Lightweight running shoes with responsive cushioning.",
  //   price: 129.99,
  //   image: "/placeholder.svg",
  //   category: "Footwear",
  //   stock: 30,
  //   rating: 4.4,
  //   reviews: 95,
  //   featured: false
  // },
  // {
  //   id: "6",
  //   name: "Backpack",
  //   description: "Durable backpack with laptop compartment and anti-theft pockets.",
  //   price: 79.99,
  //   image: "/placeholder.svg",
  //   category: "Accessories",
  //   stock: 40,
  //   rating: 4.3,
  //   reviews: 75,
  //   featured: false
  // },
  // {
  //   id: "7",
  //   name: "Coffee Maker",
  //   description: "Programmable coffee maker with thermal carafe and multiple brewing options.",
  //   price: 149.99,
  //   image: "/placeholder.svg",
  //   category: "Home",
  //   stock: 20,
  //   rating: 4.5,
  //   reviews: 110,
  //   featured: true
  // },
  // {
  //   id: "8",
  //   name: "Yoga Mat",
  //   description: "Non-slip yoga mat made from eco-friendly materials.",
  //   price: 39.99,
  //   image: "/placeholder.svg",
  //   category: "Fitness",
  //   stock: 60,
  //   rating: 4.2,
  //   reviews: 150,
  //   featured: false
  // },
  // {
  //   id: "9",
  //   name: "Bluetooth Speaker",
  //   description: "Portable Bluetooth speaker with 360° sound and 24-hour battery life.",
  //   price: 89.99,
  //   image: "/placeholder.svg",
  //   category: "Electronics",
  //   stock: 35,
  //   rating: 4.4,
  //   reviews: 130,
  //   featured: false
  // },
  // {
  //   id: "10",
  //   name: "Desk Lamp",
  //   description: "Adjustable desk lamp with multiple brightness levels and USB charging port.",
  //   price: 59.99,
  //   image: "/placeholder.svg",
  //   category: "Home",
  //   stock: 45,
  //   rating: 4.1,
  //   reviews: 70,
  //   featured: false
  // },
  // {
  //   id: "11",
  //   name: "Water Bottle",
  //   description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours.",
  //   price: 34.99,
  //   image: "/placeholder.svg",
  //   category: "Fitness",
  //   stock: 100,
  //   rating: 4.6,
  //   reviews: 180,
  //   featured: false
  // },
  // {
  //   id: "12",
  //   name: "Sunglasses",
  //   description: "Polarized sunglasses with UV protection and durable frames.",
  //   price: 89.99,
  //   image: "/placeholder.svg",
  //   category: "Accessories",
  //   stock: 30,
  //   rating: 4.3,
  //   reviews: 95,
  //   featured: true
  // }
];

export const priceRanges = [
  { min: 0, max: 50, label: "Under $50" },
  { min: 50, max: 100, label: "$50 - $100" },
  { min: 100, max: 200, label: "$100 - $200" },
  { min: 200, max: Infinity, label: "$200+" }
];

export const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" }
];