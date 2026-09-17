import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaTag, FaImage, FaSpinner, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useTheme } from '../context/ThemeContext';
import { BlogPost } from '../data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = "default", className }) => {
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  React.useEffect(() => {
    const loadImage = async () => {
      try {
        const image = typeof post.coverImage === 'function'
          ? await post.coverImage()
          : post.coverImage;
        setImageUrl(image);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading blog post image:', error);
        setIsLoading(false);
      }
    };
    loadImage();
  }, [post.coverImage]);

  const shareOnSocial = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/blog/${post.slug}`;
    const text = encodeURIComponent(post.title);
    const socialShareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${text}`
    };
    window.open(socialShareUrls[platform], '_blank', 'width=600,height=400');
  };

  const renderImage = () => {
    if (isLoading) {
      return (
        <div className={`w-full h-full flex items-center justify-center ${theme === 'light' ? 'bg-gray-100' : 'bg-[#1a1a1a] dark:bg-[#1a1a1a]'}`}>
          <FaSpinner className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'} text-4xl animate-spin`} />
        </div>
      );
    }
    if (!imageUrl) {
      return (
        <div className={`w-full h-full flex items-center justify-center ${theme === 'light' ? 'bg-gray-100' : 'bg-[#1a1a1a] dark:bg-[#1a1a1a]'}`}>
          <FaImage className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'} text-4xl`} />
        </div>
      );
    }
    return (
      <img
        src={imageUrl}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    );
  };

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-0 items-stretch glassmorphism dark:dark-card rounded-xl overflow-hidden shadow-lg dark:shadow-dark-glow">
      <div className="relative h-[250px] sm:h-[500px] overflow-hidden group">
        {renderImage()}
        <div className="absolute inset-0 flex items-center justify-between px-4 bg-black/20 sm:bg-transparent sm:group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs sm:text-sm" />
      </div>
      <div className="p-4 sm:p-8 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 rounded-full bg-primary-100/50 dark:bg-dark-50 text-primary-700 dark:text-primary-300 whitespace-nowrap"
              >
                {category}
              </span>
            ))}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-dark-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3" />
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
            >
              Read More
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
