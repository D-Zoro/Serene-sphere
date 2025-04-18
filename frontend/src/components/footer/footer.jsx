import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black pt-12 pb-6 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl pointer-events-none" aria-hidden="true">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      
      <div className="container px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div 
            className="mb-6 md:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center mb-4">
              <img src="/applogo.png" className="h-10 mr-3" alt="Serene Sphere Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">Serene Sphere</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-sm">
              A peaceful environment for mental wellbeing, offering anonymous support and resources for your emotional health journey.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com/D-Zoro/Serene-sphere" className="text-pink-400 hover:text-pink-300 transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/neonpulse/" className="text-blue-400 hover:text-blue-300 transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="https://www.instagram.com/nish_ain.t" className="text-purple-400 hover:text-purple-300 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="mailto:neonpulse142k@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <FaEnvelope size={20} />
              </a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="mb-6 text-lg font-bold text-pink-400">Quick Links</h2>
            <ul className="text-gray-300">
              <li className="mb-3">
                <Link to="/about" className="hover:text-pink-400 transition-colors">About Us</Link>
              </li>
              <li className="mb-3">
                <Link to="/login" className="hover:text-pink-400 transition-colors">Login</Link>
              </li>
              <li className="mb-3">
                <Link to="/signup" className="hover:text-pink-400 transition-colors">Sign Up</Link>
              </li>
              <li className="mb-3">
                <Link to="/chat" className="hover:text-pink-400 transition-colors">AI Support</Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Resources */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-6 text-lg font-bold text-pink-400">Resources</h2>
            <ul className="text-gray-300">
              <li className="mb-3">
                <a href="https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                  WHO Mental Health
                </a>
              </li>
              <li className="mb-3">
                <a href="https://www.nimh.nih.gov/health" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                  NIMH Resources
                </a>
              </li>
              <li className="mb-3">
                <a href="https://www.samhsa.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                  SAMHSA
                </a>
              </li>
              <li className="mb-3">
                <a href="https://www.mentalhealth.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                  MentalHealth.gov
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="mb-6 text-lg font-bold text-pink-400">Contact Us</h2>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Email:</strong> neonpulse142k@gmail.com
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Support:</strong> +91 420-420-420
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Address:</strong> Dayananda Sagar College of Engneering, kumarswamy layout, Bangalore, Karnataka, India
            </p>
          </motion.div>
        </div>
        
        {/* Divider */}
        <hr className="my-8 border-gray-700" />
        
        {/* Copyright Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <motion.span 
            className="text-sm text-gray-400 sm:text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            © {currentYear} <Link to="/" className="hover:text-pink-400">Serene Sphere™</Link>. All Rights Reserved.
          </motion.span>
          <motion.div 
            className="flex mt-4 space-x-6 sm:mt-0 justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-pink-400">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-pink-400">Terms of Service</Link>
            <Link to="/cookies" className="text-sm text-gray-400 hover:text-pink-400">Cookie Policy</Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;