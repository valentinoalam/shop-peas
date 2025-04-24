import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold leading-tight">
            <Link 
              href={`/blog/posts/${post.slug}`}
              className="hover:underline hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {post.title}
            </Link>
          </h2>
          <time
            dateTime={post.date}
            className="text-sm text-zinc-600 dark:text-zinc-400"
          >
            {format(parseISO(post.date), "MMMM dd, yyyy")}
          </time>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>
      </CardContent>
      <CardFooter>
        {post.category && (
          <div className="flex gap-2 flex-wrap">
            {/* {post.categories.map((category) => ( */}
              <Link key={post.category} href={`/categories/${post.category.toLowerCase()}`}>
                <Badge variant="secondary">{post.category}</Badge>
              </Link>
            {/* ))} */}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
