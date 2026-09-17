import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShareAlt, FaLink } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon
} from 'react-share';

const ShareLanding: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.origin : '';
  const title = "Check out Sourav's Portfolio - Full Stack Developer & Tech Enthusiast";
  const description = "Explore my portfolio showcasing full-stack development projects, tech insights, and professional journey.";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div className="relative" initial={false} animate={isExpanded ? 'expanded' : 'collapsed'}>
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaShareAlt className="text-lg group-hover:rotate-12 transition-transform duration-300" />
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: -10 }}
              exit={{ opacity: 0, scale: 0.9, y: 0 }}
              className="absolute bottom-full right-0 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4"
            >
              <div className="space-y-3">
                <motion.button
                  onClick={handleCopyLink}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaLink className="text-sm group-hover:rotate-12 transition-transform duration-300" />
                  Copy Link
                </motion.button>

                <div className="flex items-center justify-center gap-3">
                  <TwitterShareButton url={url} title={title} via="S_Sarker_Suvro" className="group">
                    <div className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      <TwitterIcon size={32} round className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </TwitterShareButton>

                  <LinkedinShareButton url={url} title={title} summary={description} source={url} className="group">
                    <div className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      <LinkedinIcon size={32} round className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </LinkedinShareButton>

                  <FacebookShareButton url={url} quote={`${title}\n\n${description}`} className="group">
                    <div className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      <FacebookIcon size={32} round className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </FacebookShareButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ShareLanding;
