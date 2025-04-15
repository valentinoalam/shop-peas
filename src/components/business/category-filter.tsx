"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchStore } from "@/lib/store";

export function CategoryFilter() {
  const { setSelectedCategory } = useSearchStore();
  
  return (
    <Select onValueChange={setSelectedCategory}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        <SelectItem value="restaurant">Restaurants</SelectItem>
        <SelectItem value="hotel">Hotels</SelectItem>
        <SelectItem value="attraction">Attractions</SelectItem>
        <SelectItem value="shopping">Shopping</SelectItem>
      </SelectContent>
    </Select>
  );
}