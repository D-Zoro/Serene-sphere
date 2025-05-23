import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; // Import useInView
import Home2 from "./Home2";
import Home3 from "./Home3";

// Import icons (you'll need to install react-icons: npm install react-icons)
import { FaBrain, FaUserFriends, FaChartLine, FaQuestionCircle } from 'react-icons/fa';

const Home1 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in by looking for token
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const quotes = [
    { text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.", author: "Noam Shpancer" },
    { text: "Self-care is how you take your power back.", author: "Lalah Delia" },
    { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared and anxious.", author: "Lori Deschene" }
  ];

  // Use useInView for animations
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: quotesRef, inView: quotesInView } = useInView({ triggerOnce: true });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }} />
        </div>
        
        <div ref={heroRef} className="mx-auto max-w-4xl py-24 sm:py-32 lg:py-40">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}} // Animate only when in view
            transition={{ duration: 1.5 }} // Slower animation
          >
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 sm:text-7xl mb-6">
              Welcome to Serene Sphere
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
              A peaceful environment where you can anonymously chat, track your mood, and receive personalized support through quizzes and an AI assistant. Prioritize your emotional well-being discreetly and effectively with our compassionate community.
            </p>
            
            {/* Only show CTA buttons if not logged in */}
            {!isLoggedIn && (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="/login" className="rounded-md bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  Get Started
                </a>
                <a href="/aboutus" className="text-lg font-semibold text-cyan-300 hover:text-pink-400 transition-all duration-300">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
            
            {/* Show different CTA for logged in users */}
            {isLoggedIn && (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="/aboutus" className="text-lg font-semibold text-cyan-300 hover:text-pink-400 transition-all duration-300">
                  Learn more about our features <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }} />
        </div>
      </div>
      
      <Home3/>
      <Home2/>
      
      {/* Quote Carousel Section */}
      
      <section ref={quotesRef} className="py-16 ">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={quotesInView ? { opacity: 1, y: 0 } : {}} // Animate only when in view
            transition={{ duration: 1.5 }} // Slower animation
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-4">
              Words of Wisdom
            </h2>
            <p className="text-xl text-gray-300">Inspirations for your mental health journey</p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {quotes.map((quote, index) => (
              <motion.div 
                key={index} 
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-gray-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={quotesInView ? { opacity: 1, scale: 1 } : {}} // Animate only when in view
                transition={{ delay: 0.2 * index, duration: 1 }} // Slower animation
              >
                <p className="italic text-gray-300 mb-4">"{quote.text}"</p>
                <p className="text-right text-pink-400">— {quote.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      
    </div>
  );
};

export default Home1;