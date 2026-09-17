import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import About from '../components/About';
import LatestWorks from '../components/LatestWorks';
import Contact from '../components/Contact';
import SEO from '../components/SEO';
import { useScroll } from '../context/ScrollContext';
import Hero from '../components/Hero';
import LatestBlogsSlider from '../components/LatestBlogsSlider';
import ShareLanding from '../components/ShareLanding';

const Home: React.FC = () => {
  const { contactRef } = useScroll();

  const renderWithRef = useCallback((
    ref: React.RefObject<HTMLDivElement | null>,
    Component: React.ComponentType
  ) => {
    const safeRef = useMemo(() => {
      if (ref.current) {
        return ref as React.RefObject<HTMLDivElement>;
      }
      return { current: null };
    }, [ref]);

    return (
      <div ref={safeRef.current ? safeRef : undefined}>
        <Component />
      </div>
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <SEO
        title="Sourav Sarker - Portfolio"
        description="Full Stack Developer & Tech Enthusiast showcasing projects, insights, and professional journey."
      />
      <Hero />
      <About />
      <LatestWorks />
      <LatestBlogsSlider />
      {renderWithRef(contactRef, Contact)}
      <ShareLanding />
    </motion.div>
  );
};

export default Home;
