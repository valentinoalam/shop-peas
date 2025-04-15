
import React from "react";
import { cn } from "@/lib/utils";
import { categories } from "../../../prisma/data/gallery-data";

interface GalleryFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const GalleryFilter: React.FC<GalleryFilterProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-all duration-300",
            "hover:text-primary",
            activeCategory === category.id
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default GalleryFilter;
