import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Mdx } from "@/components/mdx-components";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from 'lucide-react';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PostPageProps) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link 
        href="/" 
        className="flex items-center text-sm mb-8 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Link>
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        {post.description && (
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-4">
            {post.description}
          </p>
        )}
        
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <time dateTime={post.date}>
            {format(parseISO(post.date), "MMMM dd, yyyy")}
          </time>
          {post.categories && (
            <div className="flex gap-2 flex-wrap">
              {post.categories.map((category) => (
                <Link key={category} href={`/categories/${category.toLowerCase()}`}>
                  <Badge variant="secondary">{category}</Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        <Mdx code={post.body.code} />
      </div>
    </article>
  );
}
