import React from 'react';

import Head from 'next/head';

// TypeScript interface for NewsArticle SEO props
interface NewsArticleSEOProps {
  description: string;
  title: string;
  url: string;
  author?: string;
  category?: string;
  image?: string;
  publishedTime?: string;
  tags?: string[];
}

const NewsArticleSEO: React.FC<NewsArticleSEOProps> = ({
  author,
  category,
  description,
  image = '/default-news-image.jpg',
  publishedTime,
  tags = [],
  title,
  url,
}) => {
  // Truncate description if it's too long
  const truncatedDescription =
    description.length > 160 ? `${description.slice(0, 157)}...` : description;

  return (
    <Head>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={truncatedDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph / Facebook */}
      <meta content="article" property="og:type" />
      <meta content={title} property="og:title" />
      <meta content={truncatedDescription} property="og:description" />
      <meta content={url} property="og:url" />
      <meta content={image} property="og:image" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={image} />

      {/* Article-specific Metadata */}
      {publishedTime && (
        <meta content={publishedTime} property="article:published_time" />
      )}

      {author && <meta content={author} property="article:author" />}

      {category && <meta content={category} property="article:section" />}

      {/* Keywords */}
      {tags.length > 0 && <meta name="keywords" content={tags.join(', ')} />}

      {/* Structured Data - NewsArticle JSON-LD */}
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            description: truncatedDescription,
            headline: title,
            image: image,
            url: url,
            ...(publishedTime && { datePublished: publishedTime }),
            ...(author && {
              author: {
                '@type': 'Person',
                name: author,
              },
            }),
            ...(category && { articleSection: category }),
          }),
        }}
        type="application/ld+json"
      />
    </Head>
  );
};

export default NewsArticleSEO;
