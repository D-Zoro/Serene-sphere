import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
// Import Chart.js components
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MoodTracker = () => {
  const { username } = useParams();
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week'); // 'week', 'month', 'all'

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${username}/moodHistory`);
        setMoodHistory(response.data);
      } catch (error) {
        console.error('Error fetching mood history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodHistory();
  }, [username]);

  // Filter data based on selected time range
  const getFilteredData = () => {
    const today = new Date();
    const filtered = moodHistory.filter(item => {
      const date = new Date(item.createdAt);
      if (timeRange === 'week') {
        // Last 7 days
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        return date >= weekAgo;
      } else if (timeRange === 'month') {
        // Last 30 days
        const monthAgo = new Date();
        monthAgo.setDate(today.getDate() - 30);
        return date >= monthAgo;
      }
      // 'all' - return everything
      return true;
    });
    
    return filtered;
  };

  // Prepare chart data
  const prepareChartData = () => {
    const filteredData = getFilteredData();
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    };

    return {
      labels: filteredData.map(item => formatDate(item.createdAt)),
      datasets: [
        {
          label: 'Mood Score',
          data: filteredData.map(item => item.moodResult.score),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.3
        }
      ]
    };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0'
        }
      },
      title: {
        display: true,
        text: 'Your Mood Over Time',
        color: '#e2e8f0',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const index = context.dataIndex;
            const data = context.dataset.data[index];
            const filteredData = getFilteredData();
            const item = filteredData[index];
            
            return [
              `Score: ${data}`,
              `Category: ${item?.moodResult?.category || 'Unknown'}`,
              `Analysis: ${item?.moodResult?.analysis || 'No analysis available'}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: '#e2e8f0'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#e2e8f0'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  // Get latest mood for summary section
  const getLatestMood = () => {
    if (moodHistory.length === 0) return null;
    return moodHistory[0].moodResult;
  };

  const latestMood = getLatestMood();
  
  // Calculate average mood score
  const calculateAverageMood = () => {
    const filteredData = getFilteredData();
    if (filteredData.length === 0) return 0;
    
    const sum = filteredData.reduce((total, item) => total + item.moodResult.score, 0);
    return Math.round(sum / filteredData.length);
  };

  // Get mood category color
  const getMoodColor = (category) => {
    switch(category) {
      case 'happy': return 'from-green-500 to-emerald-400';
      case 'content': return 'from-teal-500 to-cyan-400';
      case 'neutral': return 'from-blue-500 to-indigo-400';
      case 'anxious': return 'from-yellow-500 to-amber-400';
      case 'stressed': return 'from-orange-500 to-amber-400';
      case 'depressed': return 'from-red-500 to-pink-400';
      default: return 'from-purple-500 to-indigo-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }} />
        </div>
        
        <div className="mx-auto max-w-6xl py-16">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-4">
              Your Mood Tracker
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Track your emotional wellbeing over time and gain insights into patterns affecting your mental health.
            </p>
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500 border-opacity-50"></div>
            </div>
          ) : moodHistory.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 text-center">
              <h2 className="text-2xl font-bold text-gray-300 mb-4">No Mood Data Yet</h2>
              <p className="text-gray-400 mb-6">Take your first quiz to start tracking your mood</p>
              <Link 
                to={`/${username}/quiz`}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-pink-500/20 transition-all"
              >
                Take Mood Quiz
              </Link>
            </div>
          ) : (
            <>
              {/* Time Range Selector */}
              <div className="flex justify-end mb-6">
                <div className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium rounded-l-lg ${timeRange === 'week' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    onClick={() => setTimeRange('week')}
                  >
                    Week
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium ${timeRange === 'month' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    onClick={() => setTimeRange('month')}
                  >
                    Month
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium rounded-r-lg ${timeRange === 'all' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    onClick={() => setTimeRange('all')}
                  >
                    All Time
                  </button>
                </div>
              </div>
              
              {/* Charts section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mood Summary */}
                <motion.div 
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold text-gray-200 mb-6">Current Mood State</h2>
                  
                  {latestMood && (
                    <>
                      <div className="flex items-center justify-center mb-4">
                        <div className={`bg-gradient-to-r ${getMoodColor(latestMood.category)} w-24 h-24 rounded-full flex items-center justify-center`}>
                          <span className="text-2xl font-bold text-white">{latestMood.score}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-2">
                        {latestMood.category.charAt(0).toUpperCase() + latestMood.category.slice(1)}
                      </h3>
                      
                      <p className="text-gray-300 text-center">{latestMood.analysis}</p>
                      
                      <div className="mt-6 text-center">
                        <Link 
                          to={`/${username}/quiz`}
                          className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm hover:opacity-90 transition-all"
                        >
                          Take New Quiz
                        </Link>
                      </div>
                    </>
                  )}
                </motion.div>
                
                {/* Main Chart */}
                <motion.div 
                  className="md:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-200">Mood Trends</h2>
                    <div className="text-right">
                      <span className="text-sm text-gray-400">Average: </span>
                      <span className="text-lg font-bold text-pink-400">{calculateAverageMood()}</span>
                    </div>
                  </div>
                  
                  <div className="h-[300px]">
                    <Line data={prepareChartData()} options={chartOptions} />
                  </div>
                </motion.div>
              </div>
              
              {/* Recent entries */}
              <motion.div 
                className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-gray-200 mb-4">Recent Entries</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Analysis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {moodHistory.slice(0, 5).map((entry, index) => {
                        const date = new Date(entry.createdAt);
                        return (
                          <tr key={index} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {date.toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                entry.moodResult.category === 'happy' ? 'bg-green-900 text-green-300' :
                                entry.moodResult.category === 'content' ? 'bg-teal-900 text-teal-300' :
                                entry.moodResult.category === 'neutral' ? 'bg-blue-900 text-blue-300' :
                                entry.moodResult.category === 'anxious' ? 'bg-yellow-900 text-yellow-300' :
                                entry.moodResult.category === 'stressed' ? 'bg-orange-900 text-orange-300' :
                                entry.moodResult.category === 'depressed' ? 'bg-red-900 text-red-300' :
                                'bg-purple-900 text-purple-300'
                              }`}>
                                {entry.moodResult.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {entry.moodResult.score}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300 truncate max-w-md">
                              {entry.moodResult.analysis}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
