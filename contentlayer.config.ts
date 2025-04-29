import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer2/source-files'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

/** @type {import('contentlayer/source-files').ComputedFields<"Post">} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc: { _raw: { flattenedPath: string} } ) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc: { _raw: { flattenedPath: string} } ) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  structuredData: {
    type: "json",
    resolve: (doc: {
      title: string
      publishedAt: string
      summary: string
      image?: string
      _raw: { flattenedPath: string} 
    }) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image ? `${doc.image}` : `/og?title=${encodeURIComponent(doc.title)}`,
      url: `https://davidilie.com/blog/${doc._raw.flattenedPath}`,
      author: {
        "@type": "Person",
        name: "David Ilie",
      },
    }),
  },
} as unknown as ComputedFields<"Post">; // <-- Important type assertion

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    tags: { 
      type: 'list', 
      of: { type: 'string' }, 
      required: false 
    },
    categories: { 
      type: 'list', 
      of: { type: 'string' }, 
      required: false 
    },
    published: {
      type: 'boolean',
      default: true,
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'content/posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node: { children: string | Array<{ type: string, value: string }> }) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node: {
            properties: { className: string[] };
          }) {
            node.properties.className.push('highlighted');
          },
          onVisitHighlightedWord(node: {
            properties: { className: string[] };
          }) {
            node.properties.className = ['word'];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})
