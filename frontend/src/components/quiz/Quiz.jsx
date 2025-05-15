import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Loader from 'react-js-loader';

const Quiz = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Quiz questions
  const questions = [
    {
      id: 1,
      question: "How would you describe your overall mood today?",
      options: [
        "Very positive, I feel great",
        "Generally good",
        "Neutral/average",
        "Somewhat low/down",
        "Very negative, I feel terrible"
      ]
    },
    {
      id: 2,
      question: "How has your sleep quality been over the past week?",
      options: [
        "Excellent - I sleep well consistently",
        "Good - mostly restful sleep",
        "Fair - some good nights, some bad",
        "Poor - difficulty sleeping most nights",
        "Terrible - severe insomnia or excessive sleeping"
      ]
    },
    {
      id: 3,
      question: "How would you describe your energy levels lately?",
      options: [
        "Very high energy - feeling motivated and active",
        "Good energy - able to accomplish what I need to",
        "Moderate - some ups and downs",
        "Low energy - struggling to get things done",
        "Very low - exhausted most of the time"
      ]
    },
    {
      id: 4,
      question: "How often have you felt anxious or worried recently?",
      options: [
        "Rarely or never",
        "Occasionally but manageable",
        "Sometimes - moderate anxiety",
        "Often - significant anxiety",
        "Constantly - overwhelming anxiety"
      ]
    },
    {
      id: 5,
      question: "How has your ability to focus or concentrate been lately?",
      options: [
        "Excellent - very focused",
        "Good - minor distractions occasionally",
        "Fair - some difficulty focusing",
        "Poor - frequently distracted",
        "Very poor - unable to concentrate most of the time"
      ]
    },
    {
      id: 6,
      question: "How would you rate your social interactions and relationships recently?",
      options: [
        "Very fulfilling and supportive",
        "Generally positive",
        "Mixed - some good, some challenging",
        "Mostly difficult or strained",
        "Very isolated or conflicted"
      ]
    },
    {
      id: 7,
      question: "How often have you been able to enjoy activities you usually like?",
      options: [
        "Consistently enjoying activities",
        "Often able to enjoy them",
        "Sometimes enjoy them",
        "Rarely find enjoyment",
        "No enjoyment from activities at all"
      ]
    }
  ];

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: {
        questionId: questions[currentStep].id,
        question: questions[currentStep].question,
        answer
      }
    });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleQuizSubmission();
    }
  };

  const handleQuizSubmission = async () => {
    try {
      setIsSubmitting(true);
      
      // Convert answers object to array
      const answersArray = Object.values(answers);
      
      // Build the prompt for AI analysis
      let prompt = "Based on the following quiz answers, analyze the person's current mood state and mental wellbeing. Provide a brief assessment, category label (happy, content, neutral, anxious, depressed, stressed, or other), and a score from 0-100 where 100 is optimal mental wellbeing:\n\n";
      
      answersArray.forEach(item => {
        prompt += `Question: ${item.question}\nAnswer: ${item.answer}\n\n`;
      });
      
      // Call the AI API for analysis
      const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AI_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': `${import.meta.env.VITE_HTTP_REF}`,
          'X-Title': 'Mood Assessment Quiz',
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku",
          messages: [
            {
              role: 'system',
              content: "You are a mental health analysis system. Analyze the quiz answers and provide a JSON response with three fields: 'category' (one of: happy, content, neutral, anxious, depressed, stressed, other), 'score' (a number from 0-100 where higher is better mental wellbeing), and 'analysis' (a brief 2-3 sentence assessment)."
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          response_format: { type: "json_object" }
        }),
      });

      const data = await aiResponse.json();
      
      let moodResult;
      try {
        // Parse the content as JSON
        moodResult = JSON.parse(data.choices[0].message.content);
      } catch (e) {
        // If parsing fails, use a simple extraction approach
        const content = data.choices[0].message.content;
        moodResult = {
          category: content.match(/category["\s:]+([^"'\s,}]+)/i)?.[1] || "neutral",
          score: parseInt(content.match(/score["\s:]+(\d+)/i)?.[1] || "50"),
          analysis: content.match(/analysis["\s:]+["']([^"']+)/i)?.[1] || "Assessment unavailable."
        };
      }
      
      // Submit results to backend
      const submitResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/submitQuiz`, {
        username,
        answers: answersArray,
        moodResult
      });
      
      setResult(moodResult);
      setIsSubmitting(false);
      
      // Redirect to results page after 3 seconds
      setTimeout(() => {
        navigate(`/${username}/mood`);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setIsSubmitting(false);
      // Show error state
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
        
        <div className="mx-auto max-w-3xl py-24 sm:py-32">
          <motion.div 
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {!isSubmitting && !result && (
              <>
                <motion.h1 
                  className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Mental Wellbeing Quiz
                </motion.h1>
                
                <motion.div 
                  className="mb-8 bg-gray-800 rounded-full h-2.5 dark:bg-gray-700"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-2.5 rounded-full" 
                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  ></div>
                </motion.div>
                
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl text-gray-200 mb-6">{questions[currentStep].question}</h2>
                  
                  <div className="space-y-3">
                    {questions[currentStep].options.map((option, index) => (
                      <motion.button
                        key={index}
                        className="w-full text-left p-4 rounded-xl bg-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 text-gray-200 hover:text-white transition-all duration-300"
                        onClick={() => handleAnswer(option)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
            
            {isSubmitting && (
              <div className="text-center py-16">
                <Loader
                  type="spinner-default"
                  bgColor={"#ff80b5"}
                  color={"#ff80b5"}
                  size={80}
                />
                <p className="text-pink-400 mt-6 text-xl">Analyzing your responses...</p>
                <p className="text-gray-400 mt-2">This may take a moment</p>
              </div>
            )}
            
            {result && (
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                  result.score > 75 ? "bg-green-900 text-green-300" :
                  result.score > 50 ? "bg-blue-900 text-blue-300" :
                  result.score > 30 ? "bg-yellow-900 text-yellow-300" :
                  "bg-red-900 text-red-300"
                }`}>
                  <span className="text-2xl font-bold">{result.score}</span>
                </div>
                
                <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-3">
                  {result.category.charAt(0).toUpperCase() + result.category.slice(1)}
                </h2>
                
                <p className="text-gray-300 text-xl mb-8">{result.analysis}</p>
                
                <p className="text-gray-400">Redirecting to your mood dashboard...</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
