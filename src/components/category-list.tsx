import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryListProps {
  categories: string[];
  currentCategory?: string;
}

export default function CategoryList({ categories, currentCategory }: CategoryListProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Link 
        href="/"
        className={cn(
          "px-4 py-2 rounded-full border transition-colors",
          !currentCategory 
            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent" 
            : "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-800"
        )}
      >
        All
      </Link>
      
      {categories.map((category) => (
        <Link
          key={category}
          href={`/categories/${category.toLowerCase()}`}
          className={cn(
            "px-4 py-2 rounded-full border transition-colors",
            currentCategory?.toLowerCase() === category.toLowerCase()
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent"
              : "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-800"
          )}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
