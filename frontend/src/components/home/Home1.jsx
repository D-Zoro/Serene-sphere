import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

  const features = [
    {
      icon: <FaBrain className="text-4xl text-pink-400 mb-3" />,
      title: "AI Therapist",
      description: "Get personalized support and guidance from our AI-powered therapist."
    },
    {
      icon: <FaChartLine className="text-4xl text-cyan-400 mb-3" />,
      title: "Mood Tracker",
      description: "Track your emotional well-being and identify patterns over time."
    },
    {
      icon: <FaUserFriends className="text-4xl text-purple-400 mb-3" />,
      title: "Anonymous Sharing",
      description: "Share your thoughts and experiences in a safe, anonymous environment."
    },
    {
      icon: <FaQuestionCircle className="text-4xl text-blue-400 mb-3" />,
      title: "Self-Assessment Quiz",
      description: "Discover insights about yourself through our thoughtfully designed quizzes."
    }
  ];
  
  const quotes = [
    { text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.", author: "Noam Shpancer" },
    { text: "Self-care is how you take your power back.", author: "Lalah Delia" },
    { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared and anxious.", author: "Lori Deschene" }
  ];
  
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }} />
        </div>
        
        <div className="mx-auto max-w-4xl py-24 sm:py-32 lg:py-40">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
      
      {/* Features Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            Discover Our Features
          </h2>
          <p className="text-xl text-gray-300">Tools designed to support your mental well-being journey</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-pink-500/10 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            >
              <div className="text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold text-pink-300 mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Quote Carousel Section */}
      <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
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
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                <p className="italic text-gray-300 mb-4">"{quote.text}"</p>
                <p className="text-right text-pink-400">— {quote.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Only show if not logged in */}
      {!isLoggedIn && (
        <section className="py-16 px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center bg-gradient-to-r from-gray-800 to-gray-900 p-10 rounded-2xl shadow-2xl border border-pink-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
              Begin Your Journey Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our community and take the first step toward a more peaceful mind and emotional well-being.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/register" 
                className="w-full sm:w-auto rounded-md bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
              >
                Sign Up Free
              </a>
              <a 
                href="/login" 
                className="w-full sm:w-auto rounded-md border border-cyan-500 px-6 py-3 text-lg font-semibold text-cyan-400 shadow-sm hover:bg-cyan-950 transition-all duration-300"
              >
                Login
              </a>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default Home1;