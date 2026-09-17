import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  FaMountain, FaChess, FaAward, FaNetworkWired, FaGlobeAmericas,
  FaLaptopCode, FaPalette, FaBook, FaCertificate, FaBrain
} from 'react-icons/fa';
import { SiReact, SiTypescript } from 'react-icons/si';

const AnimatedCard: FC<{
  children: React.ReactNode;
  className?: string;
  headerIcon?: React.ReactNode;
  headerTitle?: string;
  headerColor?: string;
}> = ({ children, className = '', headerIcon, headerTitle, headerColor = 'bg-indigo-500/10' }) => (
  <motion.div
    className={`bg-white dark:bg-[#121827] rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-[1.02] border border-gray-100/20 dark:border-[#1E2433] backdrop-filter backdrop-blur-sm relative overflow-hidden ${className}`}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
  >
    <motion.div
      className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full"
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    {headerIcon && headerTitle && (
      <motion.div className="flex items-center mb-6" initial={{ x: -20 }} animate={{ x: 0 }}>
        <div className={`p-3 ${headerColor} rounded-xl mr-4`}>{headerIcon}</div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
          {headerTitle}
        </h3>
      </motion.div>
    )}
    {children}
  </motion.div>
);

const SkillProgress: FC<{ name: string; level: number; description: string; icon: React.ReactNode; color: string }> = ({
  name, level, description, icon, color
}) => (
  <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-base font-semibold text-gray-700 dark:text-gray-300">{name}</span>
      </div>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{level}%</span>
    </div>
    <div className="relative">
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div className={`h-full bg-gradient-to-r ${color} rounded-full`} initial={{ width: 0 }} animate={{ width: `${level}%` }} transition={{ duration: 1 }} />
      </div>
      <motion.p className="mt-1 text-sm text-gray-500 dark:text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {description}
      </motion.p>
    </div>
  </motion.div>
);

const IconBadge: FC<{ icon: React.ReactNode; text: string; color: string }> = ({ icon, text, color }) => (
  <motion.div
    className="flex flex-col items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <span className={`text-2xl ${color} mb-2`}>{icon}</span>
    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{text}</span>
  </motion.div>
);

const ProfessionalSkillsWidget: FC = () => {
  const professionalSkills = [
    { name: 'React', level: 90, color: 'from-cyan-500 to-blue-500', description: 'Enterprise-grade frontend development', icon: <SiReact className="text-cyan-500" /> },
    { name: 'Node.js', level: 85, color: 'from-green-500 to-emerald-600', description: 'Scalable backend solutions', icon: <FaAward className="text-green-500" /> },
    { name: 'TypeScript', level: 88, color: 'from-blue-500 to-indigo-600', description: 'Type-safe, robust architecture', icon: <SiTypescript className="text-blue-500" /> }
  ];
  return (
    <AnimatedCard headerIcon={<FaNetworkWired className="text-2xl text-blue-600" />} headerTitle="Technical Proficiency" headerColor="bg-blue-500/10">
      <div className="space-y-6">
        {professionalSkills.map((skill) => (
          <SkillProgress key={skill.name} {...skill} />
        ))}
      </div>
    </AnimatedCard>
  );
};

const ProfessionalVisionWidget: FC = () => {
  const techHighlights = [
    { icon: <SiReact />, text: "React", color: "text-cyan-500" },
    { icon: <SiTypescript />, text: "TypeScript", color: "text-blue-600" },
    { icon: <FaAward />, text: "Node.js", color: "text-green-600" }
  ];
  return (
    <AnimatedCard headerIcon={<FaLaptopCode className="text-2xl text-indigo-600" />} headerTitle="Professional Vision" headerColor="bg-indigo-500/10">
      <motion.p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        Strategic technology leader specializing in transformative digital solutions.
        With a proven track record of delivering high-impact, scalable architectures
        that drive business innovation and technological excellence.
      </motion.p>
      <motion.div className="grid grid-cols-3 gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        {techHighlights.map((item) => (
          <IconBadge key={item.text} {...item} />
        ))}
      </motion.div>
    </AnimatedCard>
  );
};

const HobbyExplorationWidget: FC = () => {
  const [activeHobby, setActiveHobby] = useState<string>('mountain');
  const hobbyData = {
    mountain: {
      icon: <FaMountain className="text-green-600" />,
      title: 'Mountain Exploration',
      description: 'Passionate about challenging outdoor adventures and nature photography.',
      stats: { peaksCrossed: 12, countriesExplored: 5, highestAltitude: '4,800m' }
    },
    travelling: {
      icon: <FaGlobeAmericas className="text-blue-600" />,
      title: 'Global Travelling',
      description: 'Enthusiastic about cultural immersion and global perspectives.',
      stats: { countriesVisited: 18, languagesLearned: 3, continentsExplored: 4 }
    },
    chess: {
      icon: <FaChess className="text-purple-600" />,
      title: 'Strategic Gaming',
      description: 'Analytical mind with a love for complex strategic challenges.',
      stats: { tournamentParticipations: 7, onlineRating: 1850, strategicBooks: 12 }
    },
    art: {
      icon: <FaPalette className="text-pink-600" />,
      title: 'Creative Arts',
      description: 'Expressing creativity through digital and traditional art forms.',
      stats: { artworkCreated: 45, digitalTools: 6, exhibitionsAttended: 3 }
    }
  };
  const currentHobby = hobbyData[activeHobby as keyof typeof hobbyData];
  return (
    <AnimatedCard headerIcon={currentHobby.icon} headerTitle={currentHobby.title} headerColor="bg-purple-500/10">
      <motion.div className="flex flex-col space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.p className="text-gray-700 dark:text-gray-300" initial={{ x: -20 }} animate={{ x: 0 }}>
          {currentHobby.description}
        </motion.p>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(currentHobby.stats).map(([key, value]) => (
            <div key={key} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-center">
              <span className="block text-xl font-bold text-gray-800 dark:text-gray-200">{value}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          {Object.keys(hobbyData).map((hobby) => (
            <button
              key={hobby}
              onClick={() => setActiveHobby(hobby)}
              className={`w-3 h-3 rounded-full ${
                activeHobby === hobby ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatedCard>
  );
};

const ContinuousLearningWidget: FC = () => (
  <AnimatedCard headerIcon={<FaBook className="text-2xl text-emerald-600" />} headerTitle="Continuous Learning" headerColor="bg-emerald-500/10">
    <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center space-x-4">
        <FaCertificate className="text-4xl text-emerald-500" />
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Advanced Web Technologies Certification</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">Completed advanced training in modern web development frameworks</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <FaBrain className="text-4xl text-indigo-500" />
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Machine Learning Fundamentals</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">Ongoing study in AI and machine learning technologies</p>
        </div>
      </div>
    </motion.div>
  </AnimatedCard>
);

const About: FC = () => {
  const { theme } = useTheme();
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.h2
          className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About My Journey
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProfessionalSkillsWidget />
          <ProfessionalVisionWidget />
          <HobbyExplorationWidget />
          <ContinuousLearningWidget />
        </div>
      </div>
    </section>
  );
};

export default About;
