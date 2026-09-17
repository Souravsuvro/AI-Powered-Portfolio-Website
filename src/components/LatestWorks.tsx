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
    description: "A modern finance dashboard with real-time analytics, transaction monitoring, and expense tracking.",
    imageUrl: "/images/latestwork/finance-app-dashboard.svg",
    link: "https://personal-finance-app-navy.vercel.app/",
    githubLink: "#",
    category: "Dashboard",
    tags: ["React", "TypeScript", "Tailwind CSS"]
  },
  {
    id: 2,
    title: "Doctor Appointment System",
    description: "Admin dashboard for healthcare: appointments, patient records, and schedules.",
    imageUrl: "/images/latestwork/ecommerce-design.svg",
    link: "#",
    category: "Healthcare",
    tags: ["React", "Material-UI", "Node.js"]
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "Feature-rich e-commerce with modern UX and conversion-focused design.",
    imageUrl: "/images/latestwork/ecommerce-design.svg",
    link: "#",
    category: "E-commerce",
    tags: ["Next.js", "Tailwind CSS", "Stripe"]
  },
  {
    id: 4,
    title: "Finance App Landing",
    description: "Engaging landing page for a fintech product highlighting key benefits.",
    imageUrl: "/images/latestwork/finance-app-dashboard.svg",
    link: "#",
    category: "Landing Page",
    tags: ["React", "GSAP", "Styled Components"]
  },
  {
    id: 5,
    title: "Money Transfer Platform",
    description: "Secure international money transfer with real-time exchange rates.",
    imageUrl: "/images/latestwork/marketflickai-landing-page-design.svg",
    link: "https://www.hamadaninternational.co.uk/",
    category: "FinTech",
    tags: ["Laravel", "Bootstrap", "PHP"]
  },
  {
    id: 6,
    title: "Quantum Leaps",
    description: "Educational platform making quantum computing concepts accessible.",
    imageUrl: "/images/latestwork/finance-app-dashboard.svg",
    link: "https://quantum-leap-site.vercel.app/",
    category: "Education",
    tags: ["React", "Tailwind CSS", "Node.js"]
  },
  {
    id: 7,
    title: "MarketFlick AI Landing",
    description: "Modern responsive landing for MarketFlick AI with interactive motion.",
    imageUrl: "/images/latestwork/marketflickai-landing-page-design.svg",
    link: "https://market-flick-landing.vercel.app/",
    category: "Web Design",
    tags: ["React", "Tailwind", "TypeScript", "Framer Motion"]
  }
];

const LatestWorks: React.FC = () => {
  const { theme } = useTheme();
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(latestWorks.map((w) => w.category)));
  const filteredWorks = selectedCategory
    ? latestWorks.filter((w) => w.category === selectedCategory)
    : latestWorks;

  return (
    <section
      id="latest-works"
      className={`relative py-16 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
          : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-4"
          >
            Latest Works
          </motion.h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Recent projects showcasing UI/UX and full-stack delivery
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === null
                ? 'bg-green-400 text-white shadow-lg'
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
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? 'bg-green-400 text-white shadow-lg'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || 'all'}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {filteredWorks.map((work, index) => (
              <motion.article
                key={work.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                onMouseEnter={() => setActiveId(work.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 z-10 transition duration-500 ${
                      activeId === work.id
                        ? 'opacity-100 bg-gradient-to-t from-black/90 via-black/50 to-transparent'
                        : 'opacity-0'
                    }`}
                  />
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition duration-700"
                    loading="lazy"
                  />
                </div>
                <div
                  className={`absolute inset-0 z-20 p-4 flex flex-col justify-end transition duration-500 ${
                    activeId === work.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white backdrop-blur-sm">
                      {work.category}
                    </span>
                    <div className="flex gap-1">
                      {work.githubLink && work.githubLink !== '#' && (
                        <a href={work.githubLink} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20">
                          <FaGithub size={14} />
                        </a>
                      )}
                      {work.link !== '#' && (
                        <a href={work.link} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20">
                          <FaExternalLinkAlt size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{work.title}</h3>
                  <p className="text-gray-200 text-xs mb-2 line-clamp-2">{work.description}</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <FaTags className="text-gray-400 text-xs" />
                    {work.tags.map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-white">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 md:hidden">
                  <h3 className="font-bold text-gray-900 dark:text-white">{work.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{work.description}</p>
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
