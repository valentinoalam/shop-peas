"use client";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/lib/store";

export function Search() {
  const { setSearchQuery } = useSearchStore();

  return (
    <div className="relative">
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search places..."
        className="pl-8"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}