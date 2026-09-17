import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaClock, FaCalendar, FaTag, FaArrowLeft, FaShare, FaBookmark } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { getBlogBySlug, blogPosts } from '../data/blogPosts';
import { getBlogContent } from '../data/blogContent';
import SocialShareButtons from '../components/SocialShareButtons';
import { StructuredData } from '../components/StructuredData';

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  if (!slug) return <Navigate to="/blog" replace />;

  const blogPost = getBlogBySlug(slug);
  const blogContent = getBlogContent(slug);

  if (!blogPost) return <Navigate to="/404" replace />;

  const currentIndex = blogPosts.findIndex(post => post.slug === slug);
  const relatedPosts = blogPosts
    .filter(post => post.slug !== slug && post.categories.some(cat => blogPost.categories.includes(cat)))
    .slice(0, 3);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = typeof blogPost.coverImage === 'function' ? await blogPost.coverImage() : blogPost.coverImage;
        setImageUrl(image);
        setIsImageLoading(false);
      } catch {
        setIsImageLoading(false);
      }
    };
    loadImage();
  }, [blogPost.coverImage]);

  const canonicalUrl = `https://www.souravsuvra.com/blog/${slug}`;
  const ogImageUrl = imageUrl || 'https://www.souravsuvra.com/og-image.png';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogPost.title,
    "description": blogPost.excerpt,
    "image": ogImageUrl,
    "author": { "@type": "Person", "name": blogPost.author.name, "url": "https://www.souravsuvra.com" },
    "publisher": {
      "@type": "Organization",
      "name": "Sourav Suvra",
      "logo": { "@type": "ImageObject", "url": "https://www.souravsuvra.com/favicon.svg" }
    },
    "datePublished": blogPost.publishedDate,
    "dateModified": blogPost.publishedDate,
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
    "keywords": blogPost.tags.join(", "),
    "articleSection": blogPost.categories[0],
    "wordCount": blogContent?.content ? blogContent.content.split(' ').length : 1000,
    "timeRequired": `PT${blogPost.readTime}M`
  };

  return (
    <>
      <Helmet>
        <title>{blogPost.title} | Sourav Suvra - Full Stack Developer</title>
        <meta name="description" content={blogPost.excerpt} />
        <meta name="keywords" content={blogPost.tags.join(', ')} />
        <meta name="author" content={blogPost.author.name} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Sourav Suvra" />
        <meta property="article:published_time" content={blogPost.publishedDate} />
        <meta property="article:author" content={blogPost.author.name} />
        <meta property="article:section" content={blogPost.categories[0]} />
        {blogPost.tags.map(tag => (<meta key={tag} property="article:tag" content={tag} />))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogPost.title} />
        <meta name="twitter:description" content={blogPost.excerpt} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:creator" content="@souravsuvra" />
      </Helmet>

      <StructuredData type="BlogPosting" data={articleSchema} />

      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${readingProgress}%` }} />
      </div>

      <article className={`min-h-screen pt-16 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <nav className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/blog" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Blog</Link>
            <span className="text-gray-400">/</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{blogPost.title}</span>
          </div>
          <Link to="/blog" className={`inline-flex items-center space-x-2 mt-4 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}>
            <FaArrowLeft /><span>Back to All Posts</span>
          </Link>
        </nav>

        <header className="container mx-auto px-4 mb-12">
          {!isImageLoading && imageUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <img src={imageUrl} alt={blogPost.title} className="w-full h-64 md:h-96 object-cover" loading="eager" />
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            {blogPost.categories.map(category => (
              <span key={category} className={`px-3 py-1.5 text-sm font-medium rounded-full ${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>{category}</span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{blogPost.title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <img src={blogPost.author.avatar} alt={blogPost.author.name} className="w-12 h-12 rounded-full border-2 border-blue-200" />
                <div>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{blogPost.author.name}</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Full Stack Developer</p>
                </div>
              </div>
              <div className={`flex items-center space-x-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="flex items-center space-x-1">
                  <FaCalendar />
                  <time dateTime={blogPost.publishedDate}>{new Date(blogPost.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
                <div className="flex items-center space-x-1"><FaClock /><span>{blogPost.readTime} min read</span></div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors`}><FaBookmark /></button>
              <button className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors`}><FaShare /></button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {blogPost.tags.map(tag => (
              <span key={tag} className={`px-3 py-1 text-sm rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
                <FaTag className="inline mr-2" />{tag}
              </span>
            ))}
          </div>
          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Share this article</span>
              <SocialShareButtons url={canonicalUrl} title={blogPost.title} />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4">
          <div className={`prose prose-lg lg:prose-xl max-w-4xl mx-auto ${theme === 'dark' ? 'prose-invert' : ''} prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-li:leading-relaxed`}>
            {blogContent ? (
              <div dangerouslySetInnerHTML={{ __html: blogContent.content }} />
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
                <p className="text-gray-600 mb-8">Sorry, the content for this blog post could not be found.</p>
                <Link to="/blog" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <FaArrowLeft className="mr-2" />Back to Blog
                </Link>
              </div>
            )}
          </div>

          <div className={`max-w-4xl mx-auto mt-16 p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="flex items-start space-x-4">
              <img src={blogPost.author.avatar} alt={blogPost.author.name} className="w-16 h-16 rounded-full" />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">About {blogPost.author.name}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                  Full Stack Developer specializing in React, TypeScript, and modern web technologies. Passionate about creating scalable applications and sharing knowledge with the developer community.
                </p>
              </div>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <section className="max-w-4xl mx-auto mt-16">
              <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(post => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
                    <h4 className="font-semibold mb-2">{post.title}</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-3`}>{post.excerpt.substring(0, 100)}...</p>
                    <div className="flex items-center text-sm text-blue-600"><span>Read more</span><span className="ml-1">→</span></div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <nav className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              {previousPost ? (
                <Link to={`/blog/${previousPost.slug}`} className={`flex-1 mr-4 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                  <div className="text-sm text-blue-600 mb-2">← Previous</div>
                  <div className="font-semibold">{previousPost.title}</div>
                </Link>
              ) : <div className="flex-1 mr-4" />}
              {nextPost ? (
                <Link to={`/blog/${nextPost.slug}`} className={`flex-1 ml-4 p-6 rounded-lg text-right ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                  <div className="text-sm text-blue-600 mb-2">Next →</div>
                  <div className="font-semibold">{nextPost.title}</div>
                </Link>
              ) : <div className="flex-1 ml-4" />}
            </div>
          </nav>
        </main>
      </article>
    </>
  );
};

export default BlogDetails;
