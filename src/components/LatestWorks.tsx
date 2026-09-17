import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaGithub, FaExternalLinkAlt, FaTags } from 'react-icons/fa';

interface Work {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  githubLink?: string;
  category: string;
  tags: string[];
}

const latestWorks: Work[] = [
  {
    id: 1,
    title: "Finance App Dashboard",
    description: "A modern finance dashboard with real-time analytics, transaction monitoring, and expense tracking capabilities.",
    imageUrl: "/images/latestwork/finance-app-dashboard.png",
    link: "https://personal-finance-app-navy.vercel.app/",
    githubLink: "#",
    category: "Dashboard",
    tags: ["React", "TypeScript", "Tailwind CSS"]
  },
  {
    id: 2,
    title: "Doctor Appointment System",
    description: "Admin dashboard for a healthcare platform, enabling efficient management of appointments, patient records, and schedules.",
    imageUrl: "/images/latestwork/doctor-appointment-admin-dashboard-web-design.png",
    link: "#",
    githubLink: "#",
    category: "Healthcare",
    tags: ["React", "Material-UI", "Node.js"]
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "Feature-rich e-commerce platform with a modern design, focusing on user experience and conversion optimization.",
    imageUrl: "/images/latestwork/ecommerce-design.png",
    link: "#",
    githubLink: "#",
    category: "E-commerce",
    tags: ["Next.js", "Tailwind CSS", "Stripe"]
  },
  {
    id: 4,
    title: "Finance App Landing",
    description: "Engaging landing page for a financial technology application, highlighting key features and benefits.",
    imageUrl: "/images/latestwork/finance-app-landing.png",
    link: "#",
    githubLink: "#",
    category: "Landing Page",
    tags: ["React", "GSAP", "Styled Components"]
  },
  {
    id: 5,
    title: "Money Transfer Platform",
    description: "Secure and user-friendly money transfer platform with international payment capabilities and real-time exchange rates.",
    imageUrl: "/images/latestwork/money-ransfer-web-design.png",
    link: "https://www.hamadaninternational.co.uk/",
    githubLink: "#",
    category: "FinTech",
    tags: ["Laravel", "Bootstrap", "PHP"]
  },
  {
    id: 6,
    title: "Quantum Leaps",
    description: "Educational platform interface designed to make complex quantum computing concepts accessible and engaging.",
    imageUrl: "/images/latestwork/quantam-leaps.png",
    link: "https://quantum-leap-site.vercel.app/",
    githubLink: "#",
    category: "Education",
    tags: ["React JS", "Tailwind CSS", "Node JS"]
  },
  {
    id: 7,
    title: "MarketFlick AI Landing Page",
    description: "A modern, responsive landing page for MarketFlick AI platform, featuring a clean design with interactive elements and smooth animations.",
    imageUrl: "/images/latestwork/marketflickai-landing-page-design.png",
    link: "https://market-flick-landing.vercel.app/",
    githubLink: "#",
    category: "Web Design",
    tags: ["React", "TailwindCSS", "TypeScript", "Framer Motion"]
  }
];

const LatestWorks: React.FC = () => {
  const { theme } = useTheme();
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(latestWorks.map(work => work.category)));
  const filteredWorks = selectedCategory
    ? latestWorks.filter(work => work.category === selectedCategory)
    : latestWorks;

  return (
    <section id="latest-works" className={`relative py-16 ${
      theme === 'light'
        ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    }`}>
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-green-400/10 to-blue-400/10 backdrop-blur-sm"
          >
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Latest Works
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Explore my recent projects showcasing UI/UX design and development expertise
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === null
                  ? 'bg-green-400 text-white shadow-lg scale-105'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Projects
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-green-400 text-white shadow-lg scale-105'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || 'all'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {filteredWorks.map((work, index) => (
              <motion.article
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                onMouseEnter={() => setActiveId(work.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                <div className="aspect-w-3 aspect-h-2 relative h-48">
                  <div className={`absolute inset-0 z-10 transition-all duration-500 ${
                    activeId === work.id
                      ? 'opacity-100 bg-gradient-to-t from-black/90 via-black/50 to-transparent'
                      : 'opacity-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent'
                  }`} />
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(work.title)}`;
                    }}
                  />
                </div>
                <div className={`absolute inset-0 z-20 p-4 flex flex-col justify-end transform transition-all duration-500 ${
                  activeId === work.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm">
                      {work.category}
                    </span>
                    <div className="flex gap-1">
                      {work.githubLink && (
                        <a href={work.githubLink} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
                          <FaGithub size={14} />
                        </a>
                      )}
                      <a href={work.link} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
                        <FaExternalLinkAlt size={14} />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{work.title}</h3>
                  <p className="text-gray-200 text-xs mb-3 line-clamp-2">{work.description}</p>
                  <div className="flex items-center gap-1.5">
                    <FaTags className="text-gray-400 text-xs" />
                    <div className="flex flex-wrap gap-1.5">
                      {work.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/10 text-white backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LatestWorks;
