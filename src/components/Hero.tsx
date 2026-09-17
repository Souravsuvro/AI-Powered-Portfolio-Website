import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiGmail, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiJavascript, SiGraphql, SiFigma } from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

interface TechBadgeProps {
  icon: React.ReactNode;
  text: string;
  color?: string;
  proficiency?: number;
  className?: string;
}

const TechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = 100;
    const particles: {
      x: number; y: number; radius: number; vx: number; vy: number; color: string;
    }[] = [];

    const colors = {
      light: {
        particle: 'rgba(55, 65, 81, 0.5)',
        line: 'rgba(55, 65, 81, 0.2)',
        background: 'rgba(229, 231, 235, 0.5)'
      },
      dark: {
        particle: 'rgba(147, 197, 253, 0.5)',
        line: 'rgba(147, 197, 253, 0.2)',
        background: 'rgba(17, 24, 39, 0.5)'
      }
    };

    const currentColors = theme === 'light' ? colors.light : colors.dark;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: currentColors.particle
      });
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = currentColors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = currentColors.line;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    animate();
    return () => window.removeEventListener('resize', handleResize);
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
    />
  );
};

const TechBadge: React.FC<TechBadgeProps> = ({
  icon, text, color = "from-white to-gray-100", proficiency = 0, className = ""
}) => {
  const { theme } = useTheme();
  return (
    <motion.div
      className={`relative flex items-center gap-2 bg-gradient-to-br ${color} ${theme === 'light' ? 'text-gray-800 shadow-md' : 'text-white bg-opacity-20 backdrop-blur-sm'} px-4 py-2 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 10 } }}
      whileHover={{ scale: 1.05, rotate: 2, transition: { type: "spring", stiffness: 300 } }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Skill in ${text}`}
    >
      <motion.span className="text-2xl mr-2" animate={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" } }} whileHover={{ scale: 1.2, rotate: 0, transition: { duration: 0.2 } }}>
        {icon}
      </motion.span>
      <span className="text-sm font-medium tracking-tight">{text}</span>
      {proficiency > 0 && (
        <motion.div className="absolute bottom-[-4px] left-0 right-0 h-1 bg-primary-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${proficiency}%`, transition: { duration: 1, delay: 0.5, type: "tween" } }} />
      )}
    </motion.div>
  );
};

const Hero = () => {
  const { theme } = useTheme();

  const socialLinks = [
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/sourav007/', ariaLabel: 'LinkedIn Profile' },
    { icon: FaGithub, href: 'https://github.com/Souravsuvro', ariaLabel: 'GitHub Profile' },
    { icon: SiGmail, href: 'mailto:suravsuvra007@gmail.com', ariaLabel: 'Email' }
  ];

  const techStack = [
    { icon: <SiTypescript />, text: 'TypeScript', color: 'from-blue-500 to-blue-700' },
    { icon: <SiReact />, text: "ReactJS", color: "from-blue-500 to-blue-600", proficiency: 90 },
    { icon: <SiNextdotjs />, text: "NextJS", color: theme === 'light' ? 'from-green-500 to-green-600' : 'from-gray-800 to-gray-900', proficiency: 85 },
    { icon: <SiTailwindcss />, text: "Tailwind", color: "from-cyan-500 to-cyan-600", proficiency: 80 },
    { icon: <SiJavascript />, text: "JavaScript", color: "from-yellow-500 to-yellow-600", proficiency: 88 },
    { icon: <SiGraphql />, text: "GraphQL", color: "from-pink-500 to-pink-600", proficiency: 75 },
    { icon: <SiFigma />, text: "Figma", color: "from-purple-500 to-purple-600", proficiency: 70 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } }
  };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    <motion.section
      id="hero"
      className="relative flex flex-col justify-center items-center h-screen max-h-screen min-h-screen px-4 md:px-8 lg:px-16 bg-transparent overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <TechBackground />
      <motion.div className="max-w-4xl text-center flex flex-col items-center relative z-10 w-full" variants={itemVariants}>
        <motion.div
          className="md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mb-4 md:mb-6 rounded-full overflow-hidden border-4 border-primary-600 dark:border-primary-400 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <img src="/images/sourav.png" alt="Sourav Suvra" className="w-full h-full object-cover" />
        </motion.div>
        <motion.h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-primary-800 dark:text-primary-200" variants={itemVariants}>
          Hi, I'm Sourav Suvra
        </motion.h1>
        <motion.p className="text-base md:text-lg mb-6 md:mb-8 text-gray-600 dark:text-gray-300 max-w-xl px-4" variants={itemVariants}>
          Full Stack Developer | React Enthusiast | Open Source Contributor
        </motion.p>
        <motion.div className="flex justify-center space-x-4 mb-6 md:mb-8" variants={containerVariants}>
          {socialLinks.map(({ icon: Icon, href, ariaLabel }, index) => (
            <motion.a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaLabel}
              className="text-2xl md:text-3xl text-primary-600 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-100 transition-colors"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full mt-4 md:mt-8 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div
          className="flex"
          animate={{
            x: [0, `-${(techStack.length * 180)}px`],
            transition: { duration: 15, repeat: Infinity, repeatType: 'loop', ease: 'linear' }
          }}
          whileTap={{ scale: 0.95 }}
        >
          {[...techStack, ...techStack, ...techStack].map((tech, index) => (
            <TechBadge
              key={index}
              icon={tech.icon}
              text={tech.text}
              color={tech.color}
              proficiency={tech.proficiency}
              className="mx-[15px] md:mx-[30px] flex-shrink-0 scale-75 md:scale-100"
            />
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.5 } }}
      >
        <motion.div
          className="animate-bounce cursor-pointer text-primary-600 dark:text-primary-300"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          ↓
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
