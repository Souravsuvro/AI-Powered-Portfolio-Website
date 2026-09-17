import { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Souravsuvro',
    icon: <FaGithub className="text-lg" />
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sourav007/',
    icon: <FaLinkedin className="text-lg" />
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/S_Sarker_Suvro',
    icon: <FaTwitter className="text-lg" />
  }
];

function Footer(): ReactElement {
  return (
    <footer className="relative mt-16">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
      <div className="container mx-auto px-4">
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/5 to-purple-500/5 flex items-center justify-center group relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <span className="text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {link.icon}
                </span>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {link.name}
                </span>
              </motion.a>
            ))}
          </div>
          <motion.div
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <FaHeart className="text-red-500 inline-block" />
            </motion.span>
            <span>by Sourav Suvra</span>
          </motion.div>
          <motion.div
            className="text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            &copy; {new Date().getFullYear()}
          </motion.div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20" />
    </footer>
  );
}

export default Footer;
