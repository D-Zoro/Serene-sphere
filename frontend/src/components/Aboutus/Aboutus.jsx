import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";
// Import social media icons
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import neo from "./neo.jpeg";
import jeo from "./jeo.jpeg"
import leo from "./leo.jpeg"
import ceo from "./ceo.jpeg"
import zeo from "./zeo.jpeg"
// Team member data - replace with actual info and image paths
const teamMembers = [
  {
    id: 1,
    name: "KVS Shri Krishna",
    position: "UI/UX Devloper",
    image: ceo,
    bio: "Creative designer focused on building intuitive user experiences",
    social: {
      github: "https://github.com/*",
      linkedin: "https://linkedin.com/in/*",
      instagram: "https://instagram.com/*",
    }
  },
  {
    id: 2,
    name: "Nisarga Reddy",
    position: "Frontend Devloper",
    image: zeo,
    bio: "Spealized in Frontend Devlopment",
    social: {
      github: "https://github.com/*",
      linkedin: "https://linkedin.com/in/*",
      instagram: "https://instagram.com/*",
    }
  },
  {
    id: 3,
    name: "Nishanth P. Ouseph",
    position: "Full Stack Developer",
    image: neo, // Replace with actual images
    bio: "Passionate developer with expertise in React and Node.js",
    social: {
      github: "https://github.com/D-Zoro",
      linkedin: "https://linkedin.com/in/neonpulse",
      instagram: "https://instagram.com/nish_ain.t",
    }
  },
 
  {
    id: 4,
    name: "Prachi Choudhary",
    position: "Researcher",
    image: jeo,
    bio: "Specialized in Researching and collecting Information",
    social: {
      github: "https://github.com/*",
      linkedin: "https://linkedin.com/in/*",
      instagram: "https://instagram.com/*",
    }
  }
];

const AboutUs = () => {
  useEffect(() => {
    document.title = "About Us - Serene Sphere";
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden">
        {/* Background effect */}
        <motion.div
          className="fixed inset-x-0 top-0 -z-[1] transform-gpu overflow-hidden blur-3xl pointer-events-none"
          aria-hidden="true"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </motion.div>
      </div>
      
      {/* Team Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="text-center mb-16">
          <motion.h1
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Meet Our Team
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            The passionate individuals behind Serene Sphere, dedicated to creating a supportive environment for mental wellbeing.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-700 hover:border-pink-500/40 transition-all duration-300"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                
                {/* Social Icons */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 p-4">
                  {member.social.github && (
                    <motion.a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 rounded-full p-2 text-pink-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <FaGithub size={18} />
                    </motion.a>
                  )}
                  {member.social.linkedin && (
                    <motion.a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 rounded-full p-2 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.2, rotate: -10 }}
                    >
                      <FaLinkedin size={18} />
                    </motion.a>
                  )}
                  {member.social.instagram && (
                    <motion.a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 rounded-full p-2 text-purple-400 hover:bg-gradient-to-tr from-purple-600 to-pink-600 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <FaInstagram size={18} />
                    </motion.a>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-pink-400 mb-1">{member.name}</h3>
                <p className="text-cyan-300 text-sm mb-4">{member.position}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* CTA Section */}
      <motion.section 
        className="py-16 px-4 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-x-6">
            <motion.a
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Home
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
