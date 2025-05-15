import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Loader from 'react-js-loader';
import applogo from '../../assets/applogo.png';
import Navbar from '../navbar/Navbar';
import { FaTrashAlt, FaPlus, FaHistory, FaCheck, FaEdit, FaPencilAlt, FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

// Custom typing indicator component
const TypingIndicator = ({ color = "#22d3ee" }) => {
  return (
    <div className="flex items-center">
      <span className="text-cyan-300 mr-2 font-medium">Serai</span>
      <div className="flex space-x-1">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              y: ["0%", "-40%", "0%"]
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: dot * 0.1
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Function to process message content and remove leading asterisks
const processMessageContent = (content) => {
  return content.replace(/^\s*\*\s*/gm, '');
};

const Aitheraphy = () => {
  const { username } = useParams();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello, I’m Serai, your AI therapist. How are you feeling today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const chatBoxRef = useRef(null);
  const messageQueueRef = useRef([]);
  
  // New state for chat management
  const [chatHistories, setChatHistories] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [selectedChats, setSelectedChats] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  
  // Function to render text with line breaks
  const renderTextWithLineBreaks = (text) => {
    const processedText = processMessageContent(text);
    return processedText.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < processedText.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Fetch chat histories
  useEffect(() => {
    if (username) {
      fetchChatHistories();
    }
  }, [username]);
  
  // Fetch chat histories from the server
  const fetchChatHistories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${username}/chathistories`);
      setChatHistories(response.data);
    } catch (error) {
      console.error('Error fetching chat histories:', error);
    }
  };
  
  // Load a specific chat history
  const loadChatHistory = async (chatId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chathistory/${chatId}`);
      setMessages(response.data.messages);
      setCurrentChatId(chatId);
      setShowSidebar(false);
      setIsSelectMode(false);
      setSelectedChats([]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading chat history:', error);
      setLoading(false);
    }
  };
  
  // Start a new chat
  const startNewChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello, I’m Serai, your AI therapist. How are you feeling today?',
      },
    ]);
    setCurrentChatId(null);
    setShowSidebar(false);
    setIsSelectMode(false);
    setSelectedChats([]);
  };
  
  // Save current chat to database
  const saveChat = async () => {
    try {
      if (messages.length <= 1) return; // Don't save empty chats
      
      if (currentChatId) {
        // Update existing chat
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/chathistory/${currentChatId}`, {
          messages
        });
      } else {
        // Create new chat
        const title = `Conversation on ${new Date().toLocaleDateString()}`;
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/chathistory`, {
          username,
          title,
          messages
        });
        setCurrentChatId(response.data._id);
      }
      
      // Refresh chat list
      fetchChatHistories();
    } catch (error) {
      console.error('Error saving chat:', error);
    }
  };
  
  // Update chat title
  const updateChatTitle = async () => {
    if (!currentChatId || !editTitle.trim()) return;
    
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/chathistory/${currentChatId}`, {
        title: editTitle
      });
      
      setIsTitleEditing(false);
      fetchChatHistories();
    } catch (error) {
      console.error('Error updating chat title:', error);
    }
  };
  
  // Delete selected chats
  const deleteSelectedChats = async () => {
    if (selectedChats.length === 0) return;
    
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/chathistories/delete`, {
        ids: selectedChats
      });
      
      // If current chat is deleted, start a new one
      if (selectedChats.includes(currentChatId)) {
        startNewChat();
      }
      
      setIsSelectMode(false);
      setSelectedChats([]);
      fetchChatHistories();
    } catch (error) {
      console.error('Error deleting chats:', error);
    }
  };
  
  // Toggle chat selection
  const toggleChatSelection = (chatId) => {
    if (selectedChats.includes(chatId)) {
      setSelectedChats(selectedChats.filter(id => id !== chatId));
    } else {
      setSelectedChats([...selectedChats, chatId]);
    }
  };
  
  // Toggle select mode
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    if (isSelectMode) {
      setSelectedChats([]);
    }
  };
  
  // Function to process the message queue with delay
  const processMessageQueue = () => {
    try {
      if (messageQueueRef.current.length === 0) {
        setTyping(false);
        return;
      }
      
      setTyping(true);
      const nextMessage = messageQueueRef.current.shift();
      
      setMessages(prev => [...prev, { role: 'assistant', content: nextMessage }]);
      
      // Add delay between messages
      setTimeout(() => {
        processMessageQueue();
      }, 800 + Math.random() * 500);
    } catch (error) {
      setTyping(false);
    }
  };

  // Send message to AI and save chat
  const sendMessage = async () => {
    if (!input.trim() || typing || loading) return;

    try {
      // Store user message first
      const userMessage = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
      setLoading(true);
      
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AI_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': `${import.meta.env.VITE_HTTP_REF}`,
          'X-Title': 'Serai - AI Therapist',
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku",
          messages: [
            {
              role: 'system',
              content:
                "You are Serai, an ai therapist that helps users with their mental health. Keep the chats really short. Format your responses if reply is too long make it shorter brief points like 2 points not more than that maybe 3 in worst casebut not always, keep it like chat is most cases like very shot maybe try to talk and ask instead of just answering at once like talk with 5-10 words. Use \n to separate new lines",
            },
            ...messages,
            userMessage,
          ],
        }),
      });

      const data = await res.json();
      
      if (data.choices && data.choices.length > 0 && data.choices[0].message?.content) {
        const aiReply = data.choices[0].message.content;
        
        // Split the response by newlines and add to message queue
        const messageParts = aiReply.split('\n').filter(part => part.trim() !== '');
        messageQueueRef.current = messageParts;
        
        setLoading(false);
        processMessageQueue();
        
        // Save chat with a small delay to ensure messages are updated
        setTimeout(() => {
          saveChat();
        }, 1500);
      } else {
        setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'The AI had nothing to say 🥲' }]);
        setLoading(false);
      }
    } catch (err) {
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Something went wrong. Please try again later.' }]);
      setLoading(false);
    }
  };

  // Auto-scroll to the bottom of the chat box
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Find current chat title
  const currentChatTitle = currentChatId 
    ? chatHistories.find(chat => chat._id === currentChatId)?.title
    : "New Conversation";

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

        {/* Chat history sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 h-screen w-80 bg-gray-900 border-r border-gray-700 z-30 pt-20 pb-4 flex flex-col shadow-xl"
            >
              <div className="p-4 flex justify-between items-center border-b border-gray-700">
                <h2 className="text-xl font-bold text-pink-400">Your Conversations</h2>
                <div className="flex gap-2">
                  {isSelectMode ? (
                    <>
                      <button 
                        className="p-2 text-red-400 hover:bg-gray-800 rounded-full"
                        onClick={deleteSelectedChats}
                        disabled={selectedChats.length === 0}
                      >
                        <FaTrashAlt />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:bg-gray-800 rounded-full"
                        onClick={toggleSelectMode}
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <button 
                      className="p-2 text-gray-400 hover:bg-gray-800 rounded-full"
                      onClick={toggleSelectMode}
                    >
                      <FaCheck />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <button
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg mb-4 hover:opacity-90"
                  onClick={startNewChat}
                >
                  <FaPlus /> New Chat
                </button>
              </div>
              
              <div className="overflow-y-auto flex-1 px-2">
                {chatHistories.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No conversation history found
                  </div>
                ) : (
                  chatHistories.map(chat => (
                    <motion.div
                      key={chat._id}
                      className={`p-3 mb-2 rounded-lg cursor-pointer flex items-center ${
                        chat._id === currentChatId
                          ? 'bg-gray-700'
                          : 'hover:bg-gray-800'
                      } ${
                        selectedChats.includes(chat._id) 
                          ? 'border-2 border-pink-500' 
                          : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        if (isSelectMode) {
                          toggleChatSelection(chat._id);
                        } else {
                          loadChatHistory(chat._id);
                        }
                      }}
                    >
                      {isSelectMode && (
                        <div className="mr-3">
                          <div className={`w-5 h-5 rounded-sm border border-gray-500 flex items-center justify-center ${
                            selectedChats.includes(chat._id) ? 'bg-pink-500 border-pink-500' : ''
                          }`}>
                            {selectedChats.includes(chat._id) && (
                              <FaCheck className="text-white text-xs" />
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex-1 truncate text-gray-300">
                        {chat.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(chat.lastUpdated).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
              
              <div className="p-4 border-t border-gray-700">
                <button
                  className="w-full py-2 text-gray-400 hover:text-gray-200 text-sm"
                  onClick={() => setShowSidebar(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay for sidebar on mobile */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Chat Container */}
        <motion.div 
          className="w-full max-w-3xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden z-10"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Title Section with History Button */}
          <motion.div 
            className="p-5 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <motion.button
                onClick={() => setShowSidebar(true)}
                className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHistory size={18} />
              </motion.button>
              
              <div className="flex items-center justify-center gap-3">
                <motion.img 
                  src={applogo} 
                  alt="App Logo" 
                  className="h-10 w-10" 
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5 }}
                />
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">Serai</h2>
              </div>
              
              <motion.button
                onClick={startNewChat}
                className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="New Chat"
              >
                <FaPlus size={18} />
              </motion.button>
            </div>
            
            {/* Chat title/header */}
            {currentChatId && (
              <div className="mt-2 flex items-center justify-center">
                {isTitleEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="px-2 py-1 rounded bg-gray-700 text-white text-sm border border-gray-600 focus:outline-none focus:border-pink-500"
                      autoFocus
                    />
                    <button 
                      className="text-gray-400 hover:text-green-400" 
                      onClick={updateChatTitle}
                    >
                      <FaCheck size={14} />
                    </button>
                    <button 
                      className="text-gray-400 hover:text-red-400" 
                      onClick={() => setIsTitleEditing(false)}
                    >
                      <FaTimes size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm text-gray-400">{currentChatTitle}</h3>
                    <button 
                      className="text-gray-500 hover:text-gray-300" 
                      onClick={() => {
                        setEditTitle(currentChatTitle);
                        setIsTitleEditing(true);
                      }}
                    >
                      <FaPencilAlt size={10} />
                    </button>
                  </div>
                )}
              </div>
            )}
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
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white self-end shadow-lg font-medium'
                    : 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-cyan-50 self-start shadow-md whitespace-pre-line font-medium tracking-wide'
                }`}
              >
                {renderTextWithLineBreaks(msg.content)}
              </motion.div>
            ))}
            {/* Replace AnimatedDots with our custom component */}
            {(loading || typing) && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-cyan-100 self-start bg-gradient-to-r from-emerald-800 to-cyan-900 bg-opacity-80 py-3 px-4 rounded-xl border border-cyan-800"
              >
                <TypingIndicator />
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !typing && !loading) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={typing || loading}
                className={`flex-1 px-5 py-4 rounded-xl bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-gray-600 transition-all duration-300 ${(typing || loading) ? 'opacity-70' : ''}`}
              />
              <motion.button
                onClick={sendMessage}
                disabled={typing || loading}
                className={`px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-500/25 ${typing ? 'opacity-70 cursor-not-allowed' : ''}`}
                whileHover={!typing ? { scale: 1.05 } : {}}
                whileTap={!typing ? { scale: 0.98 } : {}}
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
