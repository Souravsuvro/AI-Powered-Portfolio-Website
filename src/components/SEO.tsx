import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  articleTags?: string[];
  schemaMarkup?: any;
}

const SEO: React.FC<SEOProps> = ({
  title = "Sourav Suvro - Full Stack Developer | React Enthusiast | Open Source Contributor",
  description = "Full Stack Developer specializing in React, TypeScript, and modern web technologies. Explore my portfolio, blog posts, and professional journey.",
  keywords = "Full Stack Developer, React Developer, TypeScript, JavaScript, Web Development, Frontend, Backend, Portfolio",
  image = "https://www.souravsuvra.com/og-image.png",
  url = "https://www.souravsuvra.com",
  type = "website",
  author = "Sourav Suvro",
  publishedTime,
  modifiedTime,
  articleSection,
  articleTags = [],
  schemaMarkup
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Sourav Suvro" />
      <meta property="og:locale" content="en_US" />
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      {type === 'article' && articleTags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@souravsuvra" />
      <meta name="twitter:site" content="@souravsuvra" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta httpEquiv="content-language" content="en-US" />
      {schemaMarkup && (
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
