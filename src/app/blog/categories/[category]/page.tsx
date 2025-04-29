import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostCard from "@/components/post-card";
import CategoryList from "@/components/category-list";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const categories = Array.from(
    new Set(allPosts.flatMap((post) => post.categories || []))
  );

  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const {category} = await params;
  
  // Get all unique categories for the navigation
  const allCategories = Array.from(
    new Set(allPosts.flatMap((post) => post.categories || []))
  );
  
  // Filter posts by the current category
  const filteredPosts = allPosts
    .filter((post) => 
      post.categories?.some(
        (cat) => cat.toLowerCase() === category.toLowerCase()
      )
    )
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  
  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Category: {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Browse all posts in this category
        </p>
      </div>

      <CategoryList categories={allCategories} currentCategory={category} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {filteredPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
