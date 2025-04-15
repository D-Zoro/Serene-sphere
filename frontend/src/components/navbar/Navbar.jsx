import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import applogo from '../../assets/applogo.png'
import axios from 'axios'; // Add axios import

import Loader from "react-js-loader";
import Spotlight from '../reactcomp/SpotlightBox';
import Defaultpfp from '../../assets/Defaultpfp.jpg';


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null); // Add state for user details
  const navigate = useNavigate();
  const user = localStorage.getItem('tokenUser');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsLoggedIn(true);
      
      // Fetch user details if logged in
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/${user}/getuserdetails`
          );
          setUserDetails(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      
      if (user) {
        fetchUserDetails();
      }
    }
  }, [user]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenUser');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };
  const handleDelete = () => {
    // Show delete modal
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // Call the backend route to delete the user
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/delete-user/${user}`, {
        method: 'DELETE',
      });
      // Perform logout after deletion
      localStorage.removeItem('token');
      localStorage.removeItem('tokenUser');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const closeModal = () => {
    // Close the delete modal
    setShowDeleteModal(false);
  };

  const Linkiclass="text-lg font-semibold leading-6 text-cyan-300 hover:text-pink-400 transition duration-200 transform hover:scale-105 hover:tracking-wide font-size-";
  const Linkiclass1="text-sm font-semibold leading-6 text-cyan-300 hover:text-pink-400 transition duration-200 transform hover:scale-105 hover:tracking-wide font-size-";

  // Get profile picture source
  const getProfilePicture = () => {
    if (userDetails && userDetails.profilePicture) {
      return `${import.meta.env.VITE_API_BASE_URL}/${userDetails.profilePicture}`;
    }
    return Defaultpfp;
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 to-gray-800 w-full z-50 shadow-lg">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8 rounded-b-2xl bg-gradient-to-b from-blue-950 to-gray-900"
          aria-label="Global"
        >
          <div className="flex items-center lg:flex-1">
            <a href="/" className="flex items-center -m-1.5 p-1.5">
              <img className="h-8 w-auto" src={applogo} alt="Serene Sphere" />
              <span className="ml-3 text-xl font-bold text-pink-400 hover:text-pink-500">
                Serene Sphere
              </span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300 hover:text-white"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          {/* Desktop Navbar Links */}
          <div className="hidden lg:flex lg:gap-x-12">
            <a
              href={`/${user}/mood`}
              className={Linkiclass}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Mood Tracker
            </a>
            <a
              href={`/${user}/therapist`}
              className={Linkiclass}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              AI Therapist
            </a>
            <a
              href={`/${user}/quiz`}
              className={Linkiclass}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Quiz
            </a>
            <a
              href={`/${user}/anonymoussharing`}
              className={Linkiclass}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Anonymous Sharing
            </a>
            <a
              href="/aboutus"
              className={Linkiclass}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              About Us
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <div className="relative ml-3">
                <button
                  type="button"
                  className="relative flex rounded-full w-8 h-8 bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:ring-gray-500 "
                  id="user-menu-button"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={getProfilePicture()}
                    alt="Profile"
                  />
                </button>
                {dropdownOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 text-white transform transition-transform duration-300 "
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <a
                      href={`/${user}/profile`}
                      className="block text-sm font-semibold leading-6 text-cyan-200 hover:text-pink-500 transition duration-200 px-3 py-2"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </a>
                    <a
                      onClick={(e) => handleLogout(e)}
                      href="#"
                      className="block text-sm font-semibold leading-6 text-cyan-200 hover:text-red-500 transition duration-200 px-3 py-2"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign out
                    </a>
                    <a
                      onClick={handleDelete}
                      href="#"
                      className="block text-sm font-semibold text-red-500 leading-6 text- hover:text-red-700 transition duration-200 px-3 py-2"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Delete Profile
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="text-sm font-semibold leading-6 text-pink-400 hover:text-pink-500 transition duration-200"
              >
                Login <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </nav>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`fixed inset-y-0 right-0 z-50 bg-gray-800 text-white w-64 transform transition-transform duration-300 ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="h-full px-6 py-4">
              {/* Close Button */}
              <div className='flex justify-end'>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-red-500 focus:outline-none mb-4 "
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              </div>

              {/* App Logo */}
              <a href="/" className="flex items-center mb-6">
                <img className="h-8 w-auto" src={applogo} alt="Serene Sphere" />
                <span className="ml-3 text-xl font-bold text-pink-400">
                  Serene Sphere
                </span>
              </a>

              {/* Mobile Menu Links */}
              <div className="space-y-4">
                <a
                  href={`/${user}/mood`}
                  className={Linkiclass1}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Mood Tracker
                </a>
                <br />
                <a
                  href={`/${user}/therapist`}
                  className={Linkiclass1}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  AI Therapist
                </a>
                <br />
                <a
                  href={`/${user}/quiz`}
                  className={Linkiclass1}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Quiz
                </a>
                <br />
                <a
                  href={`/${user}/anonymoussharing`}
                  className={Linkiclass1}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Anonymous Sharing
                </a>
                <br />
                <a
                  href="/aboutus"
                  className={Linkiclass1}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  About Us
                </a>
                <br />
              </div>

              {/* Divider Line */}
              <hr className="my-6 border-teal-400" />

              {/* Profile Section */}
              {isLoggedIn ?(
                <div>
                  <div className="flex items-center gap-3">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={getProfilePicture()}
                      alt="Profile"
                    />
                    <span className="text-sm font-semibold text-gray-300">
                      {user}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <a
                      href={`/${user}/profile`}
                      className="block text-sm font-semibold leading-6 text-gray-300 hover:text-pink-400 transition duration-200"
                    >
                      Your Profile
                    </a>
                    <a
                      onClick={(e) => handleLogout(e)}
                      href="#"
                      className="block text-sm font-semibold leading-6 text-gray-300 hover:text-red-500 transition duration-200"
                    >
                      Sign out
                    </a>
                    <a
                      onClick={handleDelete}
                      href="#"
                      className="block text-sm font-semibold leading-6 text-gray-300 hover:text-red-500 transition duration-200"
                    >
                      Delete Profile
                    </a>
                  </div>
                </div>
              ):(
                <a
                  href="/login"
                  className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition duration-200"
                >
                  Login <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </div>
        )}
      </header>
      
      {/* Delete Profile Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-title">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Delete Profile
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete your profile? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={confirmDelete} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Delete
                </button>
                <button onClick={closeModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
