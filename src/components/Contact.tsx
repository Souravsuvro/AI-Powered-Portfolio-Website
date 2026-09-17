import * as React from 'react';
import { useState } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaCalendarAlt } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { PopupButton } from 'react-calendly';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { icon: <FaLinkedin className="text-xl" />, url: "https://www.linkedin.com/in/sourav007/", color: "hover:text-blue-600", label: "LinkedIn" },
    { icon: <FaGithub className="text-xl" />, url: "https://github.com/Souravsuvro", color: "hover:text-gray-600", label: "GitHub" },
    { icon: <FaTwitter className="text-xl" />, url: "https://twitter.com/S_Sarker_Suvro", color: "hover:text-blue-400", label: "Twitter" },
    { icon: <FaInstagram className="text-xl" />, url: "https://www.instagram.com/souravsuvro/", color: "hover:text-pink-500", label: "Instagram" },
  ];

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim()) { toast.error('Please enter your name'); return; }
    if (!emailRegex.test(email.trim())) { toast.error('Please enter a valid email address'); return; }
    if (!message.trim()) { toast.error('Please enter a message'); return; }

    setIsSubmitting(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: name.trim(), from_email: email.trim(), message: message.trim() },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success('Message sent successfully!');
      setName(''); setEmail(''); setMessage('');
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-transparent via-gray-50/30 to-gray-100/50 dark:from-dark-start dark:via-dark-mid dark:to-dark-end">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent mb-2">
              Let's Connect
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Have a project in mind? Let's bring it to life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="glassmorphism dark:dark-card rounded-xl p-6 shadow-lg dark:shadow-dark-glow-center flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                <FaCalendarAlt className="text-xl text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Let's discuss face to face!</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Book a convenient time slot for us to discuss your project in detail.</p>
              <PopupButton
                url="https://calendly.com/souravsuvra007"
                rootElement={document.getElementById('root')!}
                text="Schedule a Meeting"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 dark:shadow-purple-500/20 flex items-center justify-center gap-2 w-full sm:w-auto"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="glassmorphism dark:dark-card rounded-xl p-6 shadow-lg dark:shadow-dark-glow">
              <div className="space-y-6">
                <div className="relative">
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                    className="peer w-full bg-transparent border border-gray-300 dark:border-dark-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-300 placeholder-transparent dark:bg-dark-input"
                    placeholder="Your Name" required />
                  <label htmlFor="name" className="absolute left-3 -top-2.5 bg-white dark:bg-gray-800 px-1 text-xs text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-blue-500 dark:peer-focus:text-purple-400">Your Name</label>
                </div>
                <div className="relative">
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full bg-transparent border border-gray-300 dark:border-dark-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-300 placeholder-transparent dark:bg-dark-input"
                    placeholder="Email Address" required />
                  <label htmlFor="email" className="absolute left-3 -top-2.5 bg-white dark:bg-gray-800 px-1 text-xs text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-blue-500 dark:peer-focus:text-purple-400">Email Address</label>
                </div>
                <div className="relative">
                  <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
                    className="peer w-full bg-transparent border border-gray-300 dark:border-dark-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-300 placeholder-transparent resize-none dark:bg-dark-input"
                    placeholder="Your Message" required />
                  <label htmlFor="message" className="absolute left-3 -top-2.5 bg-white dark:bg-gray-800 px-1 text-xs text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-blue-500 dark:peer-focus:text-purple-400">Your Message</label>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white py-3 px-6 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary-500/20 dark:shadow-primary-400/20"
                  onClick={handleSubmit} disabled={isSubmitting || !name || !email || !message}>
                  {isSubmitting ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Sending...</span></>
                  ) : (
                    <><span>Send Message</span><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="glassmorphism dark:dark-card rounded-xl p-5 shadow-lg dark:shadow-dark-glow-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full translate-x-12 -translate-y-12" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full -translate-x-12 translate-y-12" />
            <div className="relative">
              <div className="flex flex-wrap gap-4 items-start">
                <motion.a href="mailto:souravsuvra007@gmail.com"
                  className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5 transition-all duration-300 group flex-1 min-w-[200px]"
                  initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} whileHover={{ x: 2 }}>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <MdEmail className="text-lg text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-500 dark:group-hover:text-purple-400 transition-colors duration-300">souravsuvra007@gmail.com</p>
                  </div>
                </motion.a>
                <motion.div className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5 transition-all duration-300 group flex-1 min-w-[200px]"
                  initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} whileHover={{ x: 2 }}>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <MdLocationOn className="text-lg text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Dhaka, Bangladesh</p>
                  </div>
                </motion.div>
                <div className="flex gap-1.5 ml-auto">
                  {socialLinks.map((link, index) => (
                    <motion.a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="group relative"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -2 }}>
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-0.5">
                        <div className="w-full h-full rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300">{link.icon}</span>
                        </div>
                      </div>
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">{link.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme={theme === 'light' ? 'light' : 'dark'} />
    </section>
  );
};

export default Contact;
