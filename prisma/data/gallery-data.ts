export type GalleryItem = {
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
  };
  
  export const categories = [
    { id: "all", name: "All" },
    { id: "architecture", name: "Architecture" },
    { id: "nature", name: "Nature" },
    { id: "urban", name: "Urban" },
    { id: "interior", name: "Interior" },
  ];
  
  export const galleryItems: GalleryItem[] = [
    {
      id: "1",
      title: "Modern Architecture",
      category: "architecture",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      description: "Sleek lines and geometric patterns define this modern architectural masterpiece.",
    },
    {
      id: "2",
      title: "Mountain Peaks",
      category: "nature",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      description: "Majestic mountain landscape bathed in golden sunlight.",
    },
    {
      id: "3",
      title: "City Skyline",
      category: "urban",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e",
      description: "Urban skyline with dramatic perspective of high-rise buildings.",
    },
    {
      id: "4",
      title: "Ocean Waves",
      category: "nature",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      description: "Peaceful ocean waves rolling onto the shore at sunset.",
    },
    {
      id: "5",
      title: "Minimalist Structure",
      category: "architecture",
      image: "https://images.unsplash.com/photo-1486718448742-163732cd1544",
      description: "Minimalist architectural design with clean lines and smooth curves.",
    },
    {
      id: "6",
      title: "Forest Sunbeams",
      category: "nature",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
      description: "Sunlight filtering through ancient forest trees creating magical rays.",
    },
    {
      id: "7",
      title: "Glass Ceiling",
      category: "interior",
      image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4",
      description: "Stunning glass ceiling design allowing natural light to flood the interior.",
    },
    {
      id: "8",
      title: "Desert Landscape",
      category: "nature",
      image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
      description: "Vast desert landscape with rolling sand dunes stretching to the horizon.",
    },
    {
      id: "9",
      title: "Contemporary Space",
      category: "interior",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      description: "Contemporary interior design with balanced proportions and natural materials.",
    },
    {
      id: "10",
      title: "Cathedral Interior",
      category: "architecture",
      image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
      description: "Soaring arches and intricate details of a historic cathedral interior.",
    },
    {
      id: "11",
      title: "Urban Street",
      category: "urban",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      description: "Busy urban street scene capturing the energy of city life.",
    },
    {
      id: "12",
      title: "Mountain River",
      category: "nature",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
      description: "Pristine mountain river flowing through dramatic rock formations.",
    },
  ];
  