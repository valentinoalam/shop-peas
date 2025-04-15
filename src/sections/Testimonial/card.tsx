// components/TestimonialCard.tsx
import { CardContent } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";

export interface TestimonialCardProps {
  name: string;
  image: string;
  quote: string;
  role: string;
  company: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = (
  { name, 
    image, 
    quote,
    role,
    company,
    rating
  }) => {
  return (
    <CardContent className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
      <div className="w-full flex mb-4 items-center">
        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            unoptimized={true}
            quality={60}
            loader={({ src, width, quality }) => `${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`}
            className="object-cover"
            style={{
              width: "100%",
              height: "auto"
            }} />
        </div>
        <div className="flex-grow pl-3">
          <h6 className="font-bold text-sm uppercase text-gray-600">{name}</h6>
          <p className="text-sm text-muted-foreground">
            {role}, {company}
          </p>
        </div>
        <div className="flex space-x-2">
          {Array.from({ length: 5 }).map((_, i) => {
            if (i < Math.floor(rating)) {
              return <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            } else if (i === Math.floor(rating) && rating % 1 !== 0) {
              return <StarHalf key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            } else {
              return <Star key={i} className="h-5 w-5 text-gray-300" />
            }
          })}
        </div>
      </div>
      <div className="w-full">
        <blockquote className="text-sm leading-tight">
          <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">&quot;</span>
          {quote}
          <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">&quot;</span>
        </blockquote>
      </div>
    </CardContent>
  );
};

export default TestimonialCard;
