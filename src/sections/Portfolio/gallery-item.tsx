'use client'
import React, { useState } from "react";
import { GalleryItem as GalleryItemType } from "../../../prisma/data/gallery-data";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface GalleryItemProps {
  item: GalleryItemType;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative w-full h-0 pb-[100%] overflow-hidden",
          "transition-all duration-500 ease-out"
        )}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill priority unoptimized quality={60}
          className={cn(
            "absolute inset-0 w-full h-full object-cover",
            "transition-all duration-500 ease-out",
            isHovered ? "scale-105" : "scale-100"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 bg-black/50 flex flex-col justify-end p-6",
            "transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <h3 className="text-white text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-white/80 text-sm">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
