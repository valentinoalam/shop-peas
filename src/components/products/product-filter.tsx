// import { useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
// import { Button } from "@/components/ui/button";
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "@/components/ui/select";
// import { 
//     categories, 
//     // priceRanges, 
//     sortOptions 
// } from "@/data/products";
// import { Filter, X } from "lucide-react";
// import { 
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetFooter,
// } from "@/components/ui/sheet";

// interface FilterProps {
//   selectedCategories: string[];
//   setSelectedCategories: (categories: string[]) => void;
//   priceRange: [number, number];
//   setPriceRange: (range: [number, number]) => void;
//   sortBy: string;
//   setSortBy: (sort: string) => void;
//   onClearFilters: () => void;
// }

// const ProductFilter = ({
//   selectedCategories,
//   setSelectedCategories,
//   priceRange,
//   setPriceRange,
//   sortBy,
//   setSortBy,
//   onClearFilters
// }: FilterProps) => {
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  
//   // Toggle category selection
//   const toggleCategory = (category: string) => {
//     if (selectedCategories.includes(category)) {
//       setSelectedCategories(selectedCategories.filter(c => c !== category));
//     } else {
//       setSelectedCategories([...selectedCategories, category]);
//     }
//   };
  
//   const handleSliderChange = (value: number[]) => {
//     setLocalPriceRange([value[0], value[1]]);
//   };
  
//   const applyFilters = () => {
//     setPriceRange(localPriceRange);
//     setIsSheetOpen(false);
//   };
  
//   const maxPrice = maxPrice; // Based on our product data
  
//   // Desktop filter view
//   const DesktopFilter = () => (
//     <div className="hidden lg:block space-y-6">
//       <div>
//         <h3 className="text-lg font-medium mb-3">Categories</h3>
//         <div className="space-y-2">
//           {categories.map(category => (
//             <div key={category} className="flex items-center space-x-2">
//               <Checkbox
//                 id={`category-${category}`}
//                 checked={selectedCategories.includes(category)}
//                 onCheckedChange={() => toggleCategory(category)}
//               />
//               <Label htmlFor={`category-${category}`}>{category}</Label>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       <div>
//         <h3 className="text-lg font-medium mb-3">Price Range</h3>
//         <div className="px-2">
//           <Slider
//             defaultValue={[priceRange[0], priceRange[1]]}
//             min={0}
//             max={maxPrice}
//             step={10}
//             value={[localPriceRange[0], localPriceRange[1]]}
//             onValueChange={handleSliderChange}
//             onValueCommit={(value) => setPriceRange([value[0], value[1]])}
//             className="my-6"
//           />
//           <div className="flex justify-between text-sm">
//             <span>${localPriceRange[0]}</span>
//             <span>${localPriceRange[1] === maxPrice ? `${maxPrice}+` : localPriceRange[1]}</span>
//           </div>
//         </div>
//       </div>
      
//       <div>
//         <h3 className="text-lg font-medium mb-3">Sort By</h3>
//         <Select value={sortBy} onValueChange={setSortBy}>
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Sort by" />
//           </SelectTrigger>
//           <SelectContent>
//             {sortOptions.map(option => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
      
//       <Button
//         variant="outline"
//         className="w-full"
//         onClick={onClearFilters}
//       >
//         <X className="h-4 w-4 mr-2" />
//         Clear Filters
//       </Button>
//     </div>
//   );
  
//   // Mobile filter view (using Sheet from shadcn)
//   return (
//     <>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Products</h2>
        
//         <div className="flex items-center gap-2">
//           {/* Sort dropdown for all screen sizes */}
//           <div className="w-40">
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 {sortOptions.map(option => (
//                   <SelectItem key={option.value} value={option.value}>
//                     {option.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
          
//           {/* Filter button for mobile */}
//           <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//             <SheetTrigger asChild>
//               <Button variant="outline" className="lg:hidden">
//                 <Filter className="h-4 w-4 mr-2" />
//                 Filter
//               </Button>
//             </SheetTrigger>
//             <SheetContent className="overflow-y-auto">
//               <SheetHeader>
//                 <SheetTitle>Filter Products</SheetTitle>
//               </SheetHeader>
              
//               <div className="py-4 space-y-6">
//                 <div>
//                   <h3 className="text-lg font-medium mb-3">Categories</h3>
//                   <div className="space-y-2">
//                     {categories.map(category => (
//                       <div key={category} className="flex items-center space-x-2">
//                         <Checkbox
//                           id={`mobile-category-${category}`}
//                           checked={selectedCategories.includes(category)}
//                           onCheckedChange={() => toggleCategory(category)}
//                         />
//                         <Label htmlFor={`mobile-category-${category}`}>{category}</Label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div>
//                   <h3 className="text-lg font-medium mb-3">Price Range</h3>
//                   <div className="px-2">
//                     <Slider
//                       defaultValue={[priceRange[0], priceRange[1]]}
//                       min={0}
//                       max={maxPrice}
//                       step={10}
//                       value={[localPriceRange[0], localPriceRange[1]]}
//                       onValueChange={handleSliderChange}
//                       className="my-6"
//                     />
//                     <div className="flex justify-between text-sm">
//                       <span>${localPriceRange[0]}</span>
//                       <span>${localPriceRange[1] === maxPrice ? `${maxPrice}+` : localPriceRange[1]}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <SheetFooter className="flex flex-col space-y-2 sm:space-y-0">
//                 <Button onClick={applyFilters}>
//                   Apply Filters
//                 </Button>
//                 <Button variant="outline" onClick={onClearFilters}>
//                   Clear Filters
//                 </Button>
//               </SheetFooter>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
      
//       {/* Desktop filter sidebar */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//         <div className="hidden lg:block">
//           <DesktopFilter />
//         </div>
        
//         {/* Product grid will be placed here in the parent component */}
//       </div>
//     </>
//   );
// };

// export default ProductFilter;
// import { useState } from "react"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from "@/components/ui/label"
// import { Slider } from "@/components/ui/slider"
// import { Button } from "@/components/ui/button"
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "@/components/ui/select"
// import { Filter, X } from "lucide-react"
// import { 
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetFooter,
// } from "@/components/ui/sheet"

// interface FilterProps {
//   selectedCategories: string[]
//   setSelectedCategories: (categories: string[]) => void
//   priceRange: [number, number]
//   setPriceRange: (range: [number, number]) => void
//   sortBy: string
//   setSortBy: (sort: string) => void
//   onClearFilters: () => void
//   categories: string[]
// }

// const sortOptions = [
//   { value: "price-asc", label: "Price: Low to High" },
//   { value: "price-desc", label: "Price: High to Low" },
//   { value: "rating-desc", label: "Highest Rated" },
//   { value: "popular", label: "Most Popular" }
// ]

// const ProductFilter = ({
//   selectedCategories,
//   setSelectedCategories,
//   priceRange,
//   setPriceRange,
//   sortBy,
//   setSortBy,
//   onClearFilters,
//   categories
// }: FilterProps) => {
//   const [isSheetOpen, setIsSheetOpen] = useState(false)
//   const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange)
  
//   // Toggle category selection
//   const toggleCategory = (category: string) => {
//     if (selectedCategories.includes(category)) {
//       setSelectedCategories(selectedCategories.filter(c => c !== category))
//     } else {
//       setSelectedCategories([...selectedCategories, category])
//     }
//   }
  
//   const handleSliderChange = (value: number[]) => {
//     setLocalPriceRange([value[0], value[1]])
//   }
  
//   const applyFilters = () => {
//     setPriceRange(localPriceRange)
//     setIsSheetOpen(false)
//   }
  
//   const maxPrice = maxPrice // Based on our product data
  
//   // Desktop filter view
//   const DesktopFilter = () => (
//     <div className="hidden lg:block space-y-6">
//       <div>
//         <h3 className="text-lg font-medium mb-3">Categories</h3>
//         <div className="space-y-2">
//           {categories.map(category => (
//             <div key={category} className="flex items-center space-x-2">
//               <Checkbox
//                 id={`category-${category}`}
//                 checked={selectedCategories.includes(category)}
//                 onCheckedChange={() => toggleCategory(category)}
//               />
//               <Label htmlFor={`category-${category}`}>{category}</Label>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       <div>
//         <h3 className="text-lg font-medium mb-3">Price Range</h3>
//         <div className="px-2">
//           <Slider
//             defaultValue={[priceRange[0], priceRange[1]]}
//             min={0}
//             max={maxPrice}
//             step={10}
//             value={[localPriceRange[0], localPriceRange[1]]}
//             onValueChange={handleSliderChange}
//             onValueCommit={(value) => setPriceRange([value[0], value[1]])}
//             className="my-6"
//           />
//           <div className="flex justify-between text-sm">
//             <span>${localPriceRange[0]}</span>
//             <span>${localPriceRange[1] === maxPrice ? `${maxPrice}+` : localPriceRange[1]}</span>
//           </div>
//         </div>
//       </div>
      
//       <div>
//         <h3 className="text-lg font-medium mb-3">Sort By</h3>
//         <Select value={sortBy} onValueChange={setSortBy}>
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Sort by" />
//           </SelectTrigger>
//           <SelectContent>
//             {sortOptions.map(option => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
      
//       <Button
//         variant="outline"
//         className="w-full"
//         onClick={onClearFilters}
//       >
//         <X className="h-4 w-4 mr-2" />
//         Clear Filters
//       </Button>
//     </div>
//   )
  
//   // Mobile filter view (using Sheet from shadcn)
//   return (
//     <>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Products</h2>
        
//         <div className="flex items-center gap-2">
//           {/* Sort dropdown for all screen sizes */}
//           <div className="w-40">
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 {sortOptions.map(option => (
//                   <SelectItem key={option.value} value={option.value}>
//                     {option.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
          
//           {/* Filter button for mobile */}
//           <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//             <SheetTrigger asChild>
//               <Button variant="outline" className="lg:hidden">
//                 <Filter className="h-4 w-4 mr-2" />
//                 Filter
//               </Button>
//             </SheetTrigger>
//             <SheetContent className="overflow-y-auto">
//               <SheetHeader>
//                 <SheetTitle>Filter Products</SheetTitle>
//               </SheetHeader>
              
//               <div className="py-4 space-y-6">
//                 <div>
//                   <h3 className="text-lg font-medium mb-3">Categories</h3>
//                   <div className="space-y-2">
//                     {categories.map(category => (
//                       <div key={category} className="flex items-center space-x-2">
//                         <Checkbox
//                           id={`mobile-category-${category}`}
//                           checked={selectedCategories.includes(category)}
//                           onCheckedChange={() => toggleCategory(category)}
//                         />
//                         <Label htmlFor={`mobile-category-${category}`}>{category}</Label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div>
//                   <h3 className="text-lg font-medium mb-3">Price Range</h3>
//                   <div className="px-2">
//                     <Slider
//                       defaultValue={[priceRange[0], priceRange[1]]}
//                       min={0}
//                       max={maxPrice}
//                       step={10}
//                       value={[localPriceRange[0], localPriceRange[1]]}
//                       onValueChange={handleSliderChange}
//                       className="my-6"
//                     />
//                     <div className="flex justify-between text-sm">
//                       <span>${localPriceRange[0]}</span>
//                       <span>${localPriceRange[1] === maxPrice ? `${maxPrice}+` : localPriceRange[1]}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <SheetFooter className="flex flex-col space-y-2 sm:space-y-0">
//                 <Button onClick={applyFilters}>
//                   Apply Filters
//                 </Button>
//                 <Button variant="outline" onClick={onClearFilters}>
//                   Clear Filters
//                 </Button>
//               </SheetFooter>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
      
//       {/* Desktop filter sidebar */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//         <div className="hidden lg:block">
//           <DesktopFilter />
//         </div>
        
//         {/* Product grid will be placed here in the parent component */}
//       </div>
//     </>
//   )
// }

// export default ProductFilter
'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { formatCurrency } from '@/lib/utils'

interface Category {
  id: number
  name: string
}

interface ProductFilterProps {
  categories: Category[]
  selectedCategories: number[]
  setSelectedCategories: (categories: number[]) => void
  priceRange: [number, number]
  maxPrice: number
  setPriceRange: (range: [number, number]) => void
  sortBy: string
  setSortBy: (sort: string) => void
  onClearFilters: () => void
}

export default function ProductFilter({
  categories,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  onClearFilters,
  maxPrice
}: ProductFilterProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['categories', 'price', 'sort'])

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(
      selectedCategories.includes(categoryId)
        ? selectedCategories.filter(c => c !== categoryId)
        : [...selectedCategories, categoryId]
    )
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
  }

  const hasActiveFilters = selectedCategories.length > 0 || 
    priceRange[0] > 0 || 
    priceRange[1] < maxPrice || 
    sortBy !== "price-asc"

  return (
    <div className="sticky top-24 bg-white rounded-lg border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            Clear all
          </Button>
        )}
      </div>
      
      <Accordion
        type="multiple"
        value={expandedSections}
        onValueChange={setExpandedSections}
        className="space-y-4"
      >
        <AccordionItem value="categories" className="border-b-0">
          <AccordionTrigger className="py-2 text-base font-medium">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <Label 
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="py-2 text-base font-medium">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 pt-2">
              <Slider
                min={0}
                max={maxPrice}
                step={10}
                value={priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {formatCurrency(priceRange[0])}
                </span>
                <span className="text-sm text-gray-500">
                  {formatCurrency(priceRange[1])}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="sort" className="border-b-0">
          <AccordionTrigger className="py-2 text-base font-medium">
            Sort By
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={sortBy}
              onValueChange={setSortBy}
              className="space-y-2 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-asc" id="price-asc" />
                <Label htmlFor="price-asc" className="text-sm font-normal cursor-pointer">
                  Price: Low to High
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-desc" id="price-desc" />
                <Label htmlFor="price-desc" className="text-sm font-normal cursor-pointer">
                  Price: High to Low
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rating-desc" id="rating-desc" />
                <Label htmlFor="rating-desc" className="text-sm font-normal cursor-pointer">
                  Highest Rated
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="popular" id="popular" />
                <Label htmlFor="popular" className="text-sm font-normal cursor-pointer">
                  Most Popular
                </Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}