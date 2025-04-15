'use client'
import React, { useState, useEffect } from "react";
import GalleryFilter from "./gallery-filter";
import GalleryItem from "./gallery-item";
import { galleryItems } from "../../../prisma/data/gallery-data";

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    
    const timer = setTimeout(() => {
      if (activeCategory === "all") {
        setFilteredItems(galleryItems);
      } else {
        setFilteredItems(
          galleryItems.filter((item) => item.category === activeCategory)
        );
      }
      
      setIsAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Gallery</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our collection of stunning projects showcasing our expertise and creative vision.
        </p>
      </div>

      <GalleryFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
        {filteredItems.map((item) => (
          <GalleryItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
