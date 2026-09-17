import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaBuilding, FaCalendar, FaMapMarkerAlt, FaCode, FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import LatestWorks from './LatestWorks';

interface Company {
  id: number;
  name: string;
  role: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  logo: string;
  website: string;
  achievements: string[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  videoUrl: string;
  githubUrl: string;
  liveUrl: string;
  thumbnail: string;
}

const companies: Company[] = [
  {
    id: 1,
    name: "Worldwide Services",
    role: "Full Stack Developer",
    period: "2020 - 2022",
    location: "92A Plumstead High Street, London, SE18",
    description: "Led development of scalable cloud solutions and microservices architecture for enterprise clients.",
    technologies: ["React", "Node.js", "MongoDB"],
    logo: "/images/company_logo1.png",
    website: "#",
    achievements: ["Reduced system latency by 40% through optimization", "Led a team of 5 developers", "Implemented CI/CD pipeline"]
  },
  {
    id: 2,
    name: "Sofilite LLC",
    role: "Web Designer and Developer",
    period: "2022 - 2023",
    location: "8700 Stonebrook Pkwy #34, Frisco, TX 75034, United States",
    description: "Developed and maintained enterprise-level web applications using modern technologies.",
    technologies: ["Vue.js", "Python", "Docker", "PostgreSQL"],
    logo: "/images/company_logo2.png",
    website: "#",
    achievements: ["Increased user engagement by 60%", "Developed 3 major features", "Mentored junior developers"]
  },
  {
    id: 3,
    name: "Friends Cars",
    role: "Full Stack Web Developer and IT Support",
    period: "2023 - Now",
    location: "11B Enterprise Way, Edenbridge TN8 6HF, United Kingdom",
    description: "Built innovative solutions for fintech clients focusing on security and performance.",
    technologies: ["Angular", "Java", "Spring Boot", "MongoDB"],
    logo: "/images/company_logo3.png",
    website: "#",
    achievements: ["Implemented secure payment gateway", "Reduced bug reports by 45%", "Improved API response time"]
  }
];

const projects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and Tailwind CSS, featuring AI-enhanced interactivity.',
    videoUrl: '/videos/portfolio.webm',
    thumbnail: '/images/project1-thumbnail.jpg',
    technologies: ['React', 'Tailwind CSS', 'TypeScript'],
    githubUrl: 'https://github.com/Souravsuvro/AI-Powered-Portfolio-Website',
    liveUrl: 'https://www.souravsuvra.com'
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory management and personalized shopping experiences.',
    videoUrl: '/videos/ecommerce.webm',
    thumbnail: '/images/project2-thumbnail.jpg',
    technologies: ['React', 'Node.js', 'GraphQL'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 3,
    title: 'Business Analysis Dashboard',
    description: 'A comprehensive analytics dashboard for business intelligence and data-driven decision making.',
    videoUrl: '/videos/businessanalysis.webm',
    thumbnail: '/images/project3-thumbnail.jpg',
    technologies: ['Vue.js', 'D3.js', 'Python'],
    githubUrl: '#',
    liveUrl: '#'
  }
];

const CompanyCard: React.FC<{ company: Company; index: number }> = ({ company, index }) => {
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative p-6 lg:p-8 ${theme === 'light' ? 'bg-white hover:bg-gray-50' : 'bg-[#1a1a1a] hover:bg-[#222222]'} rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl before:absolute before:inset-0 before:rounded-2xl before:transition-all before:border before:border-transparent hover:before:border-[#FFB800] before:duration-300 overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-[#FFB800] to-orange-600" />
      <div className="relative flex flex-col sm:flex-row items-start justify-between mb-6 lg:mb-8 gap-4">
        <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
          {company.logo ? (
            <img src={company.logo} alt={`${company.name} logo`} className="w-16 h-16 lg:w-20 lg:h-20 object-contain" />
          ) : (
            <FaBuilding size={40} className="text-[#FFB800]" />
          )}
        </div>
        <div className="flex flex-col items-start sm:items-end text-sm w-full sm:w-auto">
          <div className="flex items-center text-[#FFB800] mb-2">
            <FaCalendar className="mr-1" size={14} />
            <span className="whitespace-nowrap">{company.period}</span>
          </div>
          <div className="inline-flex items-center justify-end gap-1">
            <FaMapMarkerAlt size={14} className="text-[#FFB800]" />
            <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} break-words`}>{company.location}</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <h3 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'} group-hover:text-[#FFB800] transition-colors duration-300`}>{company.name}</h3>
        <div className="flex items-center space-x-3 mb-4">
          <span className={`text-lg font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{company.role}</span>
        </div>
        <p className={`text-base mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{company.description}</p>
        <div className="mb-6">
          <h4 className={`text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Key Achievements</h4>
          <ul className="space-y-2">
            {company.achievements.map((achievement, i) => (
              <li key={i} className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} flex items-center space-x-2`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" /><span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          {company.technologies.map((tech, techIndex) => (
            <span key={techIndex} className={`flex items-center text-sm px-3 py-1 rounded-full ${theme === 'light' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'} transition-colors duration-300`}>
              <FaCode className="mr-2" size={12} />{tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProjectsSlider: React.FC<{ onIndexChange?: (index: number) => void }> = ({ onIndexChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentProject = projects[currentIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (video) { video.pause(); video.currentTime = 0; setIsVideoReady(false); setIsHovered(false); }
    onIndexChange?.(currentIndex);
  }, [currentIndex, onIndexChange]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && isVideoReady) {
      if (isHovered) { video.play().catch(console.error); }
      else { video.pause(); video.currentTime = 0; }
    }
  }, [isHovered, isVideoReady]);

  const handleNext = () => { setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1)); setIsHovered(false); };
  const handlePrevious = () => { setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1)); setIsHovered(false); };
  const toggleVideoPlay = () => {
    const video = videoRef.current;
    if (video && isVideoReady) {
      if (video.paused) { video.play().catch(console.error); setIsHovered(true); }
      else { video.pause(); setIsHovered(false); }
    }
  };

  return (
    <div className="relative group w-full max-w-4xl mx-auto" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
        <video ref={videoRef} src={currentProject.videoUrl} poster={currentProject.thumbnail} className="w-full h-full object-cover" muted playsInline onLoadedMetadata={() => setIsVideoReady(true)} />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300" style={{ opacity: !isHovered && !isVideoReady ? 1 : 0, pointerEvents: isHovered || !isVideoReady ? 'none' : 'auto' }}>
          <div className="flex flex-col items-center">
            {!isVideoReady ? (
              <div className="animate-spin w-12 h-12 border-4 border-white/50 border-t-white rounded-full" />
            ) : (
              <button onClick={toggleVideoPlay} className="p-6 bg-[#FFB800]/80 rounded-full text-white hover:bg-[#FFB800] transition-all duration-300 transform hover:scale-110" aria-label="Play Video">
                <FaPlay size={48} />
              </button>
            )}
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center">
            <button onClick={handlePrevious} className="p-3 bg-white/30 text-white rounded-r-full hover:bg-white/50 transition" aria-label="Previous Project"><FaChevronLeft size={24} /></button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center">
            <button onClick={handleNext} className="p-3 bg-white/30 text-white rounded-l-full hover:bg-white/50 transition" aria-label="Next Project"><FaChevronRight size={24} /></button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {projects.map((_, index) => (
          <button key={index} onClick={() => { setCurrentIndex(index); setIsHovered(false); }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-[#FFB800] w-6' : 'bg-gray-400 hover:bg-gray-500'}`}
            aria-label={`Go to project ${index + 1}`} />
        ))}
      </div>
      <div className="mt-6 max-w-4xl mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">{currentProject.title}</h3>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6">{currentProject.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {currentProject.technologies.map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-200">{tech}</span>
          ))}
        </div>
        <div className="flex space-x-4">
          {currentProject.githubUrl && (
            <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition" aria-label="GitHub Repository"><FaGithub size={28} /></a>
          )}
          {currentProject.liveUrl && (
            <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition" aria-label="Live Project"><FaExternalLinkAlt size={28} /></a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <FeaturedProjectsSlider onIndexChange={setCurrentCompanyIndex} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {companies.map((company, index) => (
              <CompanyCard key={company.id} company={company} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
      <LatestWorks />
    </div>
  );
};

export default Projects;
