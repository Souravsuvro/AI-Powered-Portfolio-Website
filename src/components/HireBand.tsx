import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaCalendarAlt, FaBriefcase } from 'react-icons/fa';

const HireBand: React.FC = () => {
  return (
    <section className="py-16 px-4" id="hire">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/80 via-gray-900 to-purple-950/60 p-8 md:p-12 text-center shadow-xl shadow-indigo-500/10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Ready to build?</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Available for full-stack web apps, AI-assisted products, and growth systems.
          Book a call or hire on Upwork.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
          <a
            href="https://calendly.com/souravsuvra007"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 font-semibold text-white transition"
          >
            <FaCalendarAlt /> Schedule a meeting
          </a>
          <a
            href="https://www.upwork.com/freelancers/~souravsuvro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-green-500/50 bg-green-500/10 hover:bg-green-500/20 px-6 py-3 font-semibold text-green-300 transition"
          >
            <FaBriefcase /> Hire on Upwork
          </a>
          <a
            href="https://www.linkedin.com/in/sourav007/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-600 hover:border-blue-400 px-6 py-3 font-semibold text-gray-200 transition"
          >
            <FaLinkedin className="text-blue-400" /> LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default HireBand;
