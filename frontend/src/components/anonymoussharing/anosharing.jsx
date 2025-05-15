import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import { FaHeart, FaPaperPlane, FaFilter, FaTimes, FaTags } from 'react-icons/fa';

const Anony = () => {
  // States
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filterOption, setFilterOption] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  // Form states
  const [newPost, setNewPost] = useState({
    title: '',
    article: '',
    options: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch all anonymous posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/anonymouPosts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create new post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/createAnonymousPost`, newPost);
      fetchPosts(); // Refresh posts after creating a new one
      setShowCreateForm(false);
      setNewPost({ title: '', article: '', options: '', tags: [] }); // Reset form
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  // Handle tag input
  const handleAddTag = () => {
    if (tagInput && !newPost.tags.includes(tagInput)) {
      setNewPost(prev => ({ ...prev, tags: [...prev.tags, tagInput] }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle filters
  const handleFilterClick = (option) => {
    if (activeFilters.includes(option)) {
      setActiveFilters(activeFilters.filter(filter => filter !== option));
    } else {
      setActiveFilters([...activeFilters, option]);
    }
  };

  // Filter and search posts
  const filteredPosts = posts.filter(post => {
    // Filter by options if any filter is active
    const matchesFilter = activeFilters.length === 0 || 
                         (post.options && activeFilters.includes(post.options));
    
    // Search in title and content
    const matchesSearch = !searchQuery || 
                         post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return matchesFilter && matchesSearch;
  });

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      
      {/* Background gradient elements */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }} />
        </div>
        
        <div className="max-w-6xl mx-auto py-12">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Anonymous Sharing Space
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              A safe place to share your thoughts, experiences, and feelings anonymously. 
              Connect with others who might be going through similar experiences.
            </p>
          </motion.div>
          
          {/* Search and Filter Bar */}
          <motion.div 
            className="mb-8 flex flex-wrap items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <motion.button
                className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
              </motion.button>
              
              <motion.button
                className="px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-pink-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateForm(true)}
              >
                <FaPaperPlane /> Share Your Story
              </motion.button>
            </div>
          </motion.div>
          
          {/* Filter options */}
          {showFilters && (
            <motion.div 
              className="mb-8 p-4 bg-gray-800 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-medium mb-3 text-pink-400">Filter by category:</h3>
              <div className="flex flex-wrap gap-2">
                {['happy', 'sad', 'depression', 'adhd', 'other'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterClick(option)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeFilters.includes(option) 
                        ? 'bg-pink-500 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
                
                {activeFilters.length > 0 && (
                  <button
                    onClick={() => setActiveFilters([])}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Create Post Form Modal */}
          {showCreateForm && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <motion.div 
                className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                    Share Anonymously
                  </h2>
                  <button 
                    onClick={() => setShowCreateForm(false)}
                    className="p-1 rounded-full hover:bg-gray-700 transition-all"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleCreatePost}>
                  <div className="mb-4">
                    <label className="block text-pink-400 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newPost.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Give your post a title"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-pink-400 mb-2">Your Story</label>
                    <textarea
                      name="article"
                      value={newPost.article}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 h-40"
                      placeholder="Share your thoughts, experiences, or feelings..."
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-pink-400 mb-2">Category</label>
                    <select
                      name="options"
                      value={newPost.options}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">Select a category</option>
                      <option value="happy">Happy</option>
                      <option value="sad">Sad</option>
                      <option value="depression">Depression</option>
                      <option value="adhd">ADHD</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-pink-400 mb-2">Tags</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Add tags (press Enter to add)"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                      >
                        Add
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {newPost.tags.map((tag, index) => (
                        <div key={index} className="bg-gray-700 rounded-full px-3 py-1 flex items-center gap-2">
                          <span>#{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-gray-400 hover:text-gray-200"
                          >
                            <FaTimes size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-pink-500/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Post Anonymously
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
          
          {/* Posts Display */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500 border-opacity-50 mx-auto"></div>
              <p className="mt-4 text-lg text-gray-400">Loading stories...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-gray-800 bg-opacity-50 rounded-xl">
              <h3 className="text-2xl font-medium text-gray-400">No stories found</h3>
              <p className="mt-2 text-gray-500">Be the first to share your story!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post._id}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-pink-500/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                        {post.title}
                      </h2>
                      {post.options && (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          post.options === 'happy' ? 'bg-green-900 text-green-300' :
                          post.options === 'sad' ? 'bg-blue-900 text-blue-300' :
                          post.options === 'depression' ? 'bg-purple-900 text-purple-300' :
                          post.options === 'adhd' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-gray-700 text-gray-300'
                        }`}>
                          {post.options}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-300 mb-4 whitespace-pre-line">
                      {post.article}
                    </p>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs text-cyan-400">#{tag}</span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 mt-6">
                      <span>Anonymous</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }} />
        </div>
      </div>
    </div>
  );
};

export default Anony;
