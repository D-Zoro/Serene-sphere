import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import Spotlight from '../reactcomp/SpotlightBox';

const NoAccess = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='h-screen w-screen overflow-hidden'>
    <Spotlight>
    <section className=" min-h-screen min-w-screen flex flex-col justify-center items-center">
      
      <div className="relative py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        {/* Decorative Icon */}
        <div className="absolute top-10 left-10">
          <ExclamationTriangleIcon className="h-16 w-16 text-white opacity-20" />
        </div>
        <div className="absolute bottom-10 right-10">
          <ExclamationTriangleIcon className="h-16 w-16 text-white opacity-20 rotate-180" />
        </div>

        <div className="mx-auto max-w-screen-sm text-center">
         
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-white drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
              ACCESS DENIED
            </span>
          </h1>

         
          <p className="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl">
            You are not allowed to view this page.
          </p>

         
          <p className="mb-6 text-lg font-light text-gray-200">
            Sorry, you are not allowed to view this page. Please log in again to continue.
          </p>

         
          <button
            onClick={handleBackToLogin}
            className="inline-flex items-center justify-center text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-6 py-3 transition-transform transform hover:scale-105 shadow-lg"
          >
            Back to Login
          </button>
        </div>
      </div>
    </section>
    </Spotlight>
    </div>
  );
};

export default NoAccess;