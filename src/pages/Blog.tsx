import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { blogPosts } from '../data/blogPosts';
import BlogCard from '../components/BlogCard';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const categories = ['All', ...Array.from(new Set(blogPosts.flatMap(post => post.categories)))];

  useEffect(() => {
    let filtered = blogPosts;

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.categories.includes(selectedCategory));
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Sourav Suvra's Blog",
    "description": "Technology insights, tutorials, and professional journey of a Full Stack Developer",
    "url": "https://www.souravsuvra.com/blog",
    "author": {
      "@type": "Person",
      "name": "Sourav Suvra",
      "url": "https://www.souravsuvra.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sourav Suvra",
      "url": "https://www.souravsuvra.com"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://www.souravsuvra.com/blog/${post.slug}`,
      "datePublished": post.publishedDate,
      "author": {
        "@type": "Person",
        "name": post.author.name
      }
    }))
  };

  return (
    <>
      <SEO
        title="Blog | Sourav Suvra - Tech Insights & Tutorials"
        description="Explore technology insights, tutorials, and industry updates. Discover articles about React, TypeScript, web development, career growth, and emerging technologies."
        keywords="Tech Blog, React Tutorials, TypeScript, Web Development, Career Growth, Software Engineering, Technology Insights"
        url="https://www.souravsuvra.com/blog"
        schemaMarkup={blogSchema}
      />

      <main className={`min-h-screen py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <nav className="mb-6">
              <Link
                to="/"
                className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
              >
                Back to Home
              </Link>
            </nav>
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              My Blog
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Exploring technology, sharing insights, and documenting my journey in software development.
            </p>
          </header>

          <div className="mb-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                  }`}
                />
              </div>
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                  }`}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <section className="max-w-6xl mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id}>
                    <BlogCard post={post} />
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  No articles found
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            )}
          </section>

          <footer className="text-center mt-12">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Page 1 of 1 • Showing {filteredPosts.length} of {blogPosts.length} articles
            </p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default Blog;
