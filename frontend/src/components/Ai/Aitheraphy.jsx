import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Loader from 'react-js-loader';
import applogo from '../../assets/applogo.png';
import Navbar from '../navbar/Navbar';


const Aitheraphy = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello, I’m Serai, your AI therapist. How are you feeling today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null); // Ref for auto-scrolling

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AI_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': `${import.meta.env.VITE_HTTP_REF}`, // replace with your actual domain if deploying
          'X-Title': 'Serai - AI Therapist',
        },
        body: JSON.stringify({
            model: "anthropic/claude-3-haiku",
          messages: [
            {
              role: 'system',
              content:
                "You are Serai , an ai therapist that helps users with their mental health. keep the chats really short ",
            },
            ...newMessages,
          ],
        }),
      });

      const data = await res.json();
      console.log("🧠 OpenRouter Response:", data);
      // Safety check
if (data.choices && data.choices.length > 0 && data.choices[0].message?.content) {
    const aiReply = data.choices[0].message.content;
    setMessages([...newMessages, { role: 'assistant', content: aiReply }]);
  } else {
    console.warn("⚠️ Unexpected response:", data);
    setMessages([...newMessages, { role: 'assistant', content: 'The AI had nothing to say 🥲' }]);
  }

      
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Something went wrong. Please try again later.' },
      ]);
    }

    setLoading(false);
  };

  // Auto-scroll to the bottom of the chat box
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen overflow-x-hidden relative">
      <Navbar />
      
      {/* Main content with animated entrance */}
      <motion.div 
        className="relative flex justify-center items-center pt-28 pb-16 px-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Effects - Top */}
        <div className="fixed inset-x-0 top-0 -z-[1] transform-gpu overflow-hidden blur-3xl pointer-events-none" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
          />
        </div>

        {/* Chat Container */}
        <motion.div 
          className="w-full max-w-3xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden z-20"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Title Section */}
          <motion.div 
            className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3">
              <motion.img 
                src={applogo} 
                alt="App Logo" 
                className="h-12 w-12" 
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
              />
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">Serai</h2>
            </div>
            <p className="text-center text-gray-300 mt-2">Your personal AI therapist, ready to listen and support</p>
          </motion.div>

          {/* Chat Box */}
          <div
            ref={chatBoxRef}
            className="flex flex-col gap-4 p-6 bg-gradient-to-b from-gray-800 to-gray-900 overflow-y-auto max-h-[400px] h-[400px]"
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-2xl text-sm max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white self-end shadow-lg'
                    : 'bg-gradient-to-r from-gray-700 to-gray-600 text-gray-100 self-start shadow-md'
                }`}
              >
                {msg.content}
              </motion.div>
            ))}
            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 text-gray-300 self-start bg-gray-700 p-3 rounded-xl"
              >
                <Loader type="spinner-default" bgColor="#ff80b5" color="#ff80b5" size={24} />
                <span>Thinking...</span>
              </motion.div>
            )}
          </div>

          {/* Input Box */}
          <motion.div 
            className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Tell me what's on your mind..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 px-5 py-4 rounded-xl bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-gray-600 transition-all duration-300"
              />
              <motion.button
                onClick={sendMessage}
                className="px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Send
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Background Effects - Bottom */}
        <div className="fixed inset-x-0 bottom-0 -z-[1] transform-gpu overflow-hidden blur-3xl pointer-events-none" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9089fc] to-[#ff80b5] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Aitheraphy;
