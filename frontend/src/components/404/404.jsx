import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import Spotlight from '../reactcomp/SpotlightBox';

// filepath: C:/COdezz/Projects/Miniproject2-Serene_sphere/app/serene_sphere/frontend/src/components/404/404.jsx

const NotFound = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='h-screen w-screen overflow-hidden'>
        <Spotlight>
            <section className="min-h-screen min-w-screen flex flex-col justify-center">
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
                                404
                            </span>
                        </h1>

                        <p className="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl">
                            Page Not Found
                        </p>

                        <p className="mb-6 text-lg font-light text-gray-200">
                            Sorry, the page you are looking for does not exist. You can always go back to the homepage.
                        </p>

                        <button
                            onClick={handleBackToHome}
                            className="inline-flex items-center justify-center text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-6 py-3 transition-transform transform hover:scale-105 shadow-lg"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </section>
        </Spotlight>
        </div>
    );
};

export default NotFound;