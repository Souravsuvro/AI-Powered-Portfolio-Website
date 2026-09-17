import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
import { blogPosts, BlogPost } from '../data/blogPosts';

const LatestBlogsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(false);
      await Promise.all(
        blogPosts.map(async (blog: BlogPost, index: number) => {
          if (typeof blog.coverImage === 'function') {
            try {
              const imageUrl = await blog.coverImage();
              setLoadedImages(prev => ({ ...prev, [index]: imageUrl }));
            } catch (error) {
              console.error('Error loading blog image:', error);
            }
          } else {
            setLoadedImages(prev => ({ ...prev, [index]: blog.coverImage as string }));
          }
        })
      );
    };
    loadImages();
  }, []);

  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const itemsPerSlide = getItemsPerSlide();
  const totalSlides = Math.ceil(blogPosts.length / itemsPerSlide);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) nextSlide();
    if (touchStart - touchEnd < -75) prevSlide();
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-transparent via-gray-50/30 to-gray-100/50 dark:from-dark-start dark:via-dark-mid dark:to-dark-end">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
              Latest Blogs
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover our latest insights, tutorials, and industry updates
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600/10 hover:bg-primary-600/20 dark:bg-primary-400/10 dark:hover:bg-primary-400/20 text-primary-600 dark:text-primary-400 font-medium transition-all duration-300 hover:scale-105"
          >
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="overflow-hidden touch-pan-x"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, pageIndex) => (
                <div key={pageIndex} className="w-full flex-shrink-0 flex gap-4 sm:gap-6">
                  {blogPosts
                    .slice(pageIndex * itemsPerSlide, (pageIndex + 1) * itemsPerSlide)
                    .map((blog: BlogPost, index: number) => (
                      <div key={blog.id} className="w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3">
                        <Link to={`/blog/${blog.slug}`} className="block h-full">
                          <div className="glassmorphism dark:dark-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl dark:shadow-dark-glow transition-all duration-300 h-full group hover:-translate-y-1">
                            <div className="relative overflow-hidden aspect-video">
                              {loadedImages[pageIndex * itemsPerSlide + index] ? (
                                <img
                                  src={loadedImages[pageIndex * itemsPerSlide + index]}
                                  alt={blog.title}
                                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                              <div className="flex flex-wrap gap-2 mb-3">
                                {blog.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
                                  <span
                                    key={tagIndex}
                                    className="text-xs px-2 py-1 rounded-full bg-primary-100/50 dark:bg-dark-50 text-primary-700 dark:text-primary-300 whitespace-nowrap"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
                                {blog.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow hidden sm:block">
                                {blog.excerpt}
                              </p>
                              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-dark-200">
                                <div className="flex items-center gap-2">
                                  <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden">
                                    <img src={blog.author.avatar} alt={blog.author.name} className="object-cover" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{blog.author.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{blog.publishedDate}</p>
                                  </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-2">
                                  <FaClock className="text-gray-400 dark:text-gray-500" />
                                  <span className="text-sm text-gray-500 dark:text-gray-400">{blog.readTime} min read</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-6 bg-primary-600 dark:bg-primary-400'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogsSlider;
