import React from 'react';
import { motion } from 'framer-motion';
import About from '../components/About';
import LatestWorks from '../components/LatestWorks';
import Contact from '../components/Contact';
import SEO from '../components/SEO';
import { useScroll } from '../context/ScrollContext';
import Hero from '../components/Hero';
import LatestBlogsSlider from '../components/LatestBlogsSlider';
import ShareLanding from '../components/ShareLanding';
import Projects from '../components/Projects';
import HireBand from '../components/HireBand';

const Home: React.FC = () => {
  const { contactRef } = useScroll();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SEO
        title="Sourav Sarker — AI-Powered Portfolio | Full Stack Developer"
        description="Full-stack developer portfolio: React, TypeScript, AI tools, brain games, production templates, and client work."
      />
      <Hero />
      <About />
      <Projects />
      <LatestWorks />
      <HireBand />
      <LatestBlogsSlider />
      <div ref={contactRef as React.RefObject<HTMLDivElement>}>
        <Contact />
      </div>
      <ShareLanding />
    </motion.div>
  );
};

export default Home;
