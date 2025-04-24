import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";
import Loader from "react-js-loader";
import defaultProfilePicture from "../../assets/Defaultpfp.jpg";
import bg from "./profile_bg.jpg";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/${username}/getuserdetails`
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [username]);

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="text-center">
          <Loader
            type="spinner-default"
            bgColor={"#ff80b5"}
            color={"#ff80b5"}
            size={100}
          />
          <p className="text-pink-400 mt-4">Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden">
      <Navbar />
      
      {/* Background gradient elements similar to Home1.jsx */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }} />
        </div>
        
        <main className="mx-auto max-w-5xl py-12 sm:py-16">
          {/* Profile Header */}
          <motion.div 
            className="relative rounded-xl overflow-hidden shadow-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Cover Image Background */}
            <div 
              className="h-64 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${bg})` }}
            >
              {/* Add overlay to make text more readable */}
             
            </div>
            
            {/* Profile Content */}
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 px-6 py-8 relative">
              {/* Profile Picture */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  <img
                    alt="Profile"
                    src={
                      userDetails.profilePicture
                        ? `${import.meta.env.VITE_API_BASE_URL}/${userDetails.profilePicture}`
                        : defaultProfilePicture
                    }
                    className="shadow-xl rounded-full border-4 border-pink-500 h-32 w-32 object-cover"
                  />
                </motion.div>
              </div>
              
              {/* User Name and Info */}
              <div className="text-center mt-20">
                <motion.h1 
                  className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {userDetails.name}
                </motion.h1>
                
                <motion.div 
                  className="flex justify-center space-x-6 text-gray-400 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <div>
                    <span className="font-medium text-pink-400">Age:</span> {userDetails.age}
                  </div>
                  <div>
                    <span className="font-medium text-pink-400">Email:</span> {userDetails.email}
                  </div>
                  <div>
                    <span className="font-medium text-pink-400">Journals:</span> {userDetails.journals.length}
                  </div>
                </motion.div>

                {/* Bio Section */}
                <motion.div 
                  className="mt-6 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <p className="text-lg leading-relaxed text-gray-300">
                    {userDetails.bio}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Action Buttons with Enhanced Effects */}
          <motion.div 
            className="flex justify-center gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Link to={`/${username}/updateprofile`}>
              <motion.button 
                className="rounded-md bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-md relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <span className="relative z-10">Update Profile</span>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            </Link>
            <Link to={`/${username}/createjournal`}>
              <motion.button 
                className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <span className="relative z-10">Create Journal</span>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            </Link>
          </motion.div>
        </main>
        
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }} />
        </div>
      </div>
    </div>
  );
};

export default Profile;