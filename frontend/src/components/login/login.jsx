import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SpotlightBox from '../reactcomp/SpotlightBox';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
      });
      console.log(response);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('tokenUser', response.data.user.username);
      navigate(`/`);
    } catch (_err) {
      setError('Invalid username or password');
    }
  };

  const closeModal = () => {
    setError('');
  };

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="relative isolate px-6 pt-7 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      
      {error && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-red-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8V7a1 1 0 112 0v3a1 1 0 01-2 0zm0 4a1 1 0 112 0 1 1 0 01-2 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Error
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{error}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={closeModal}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="w-screen mt-32">
        <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-md">
          <SpotlightBox>
            <h2 className="text-3xl font-extrabold text-pink-300 mb-4 text-center font-serif">
              Login
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  className="block text-blue-300 text-base font-semibold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="appearance-none border border-blue-400 rounded w-full py-3 px-4 text-pink-400 placeholder-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300 focus:shadow-outline transition-all duration-300"
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-blue-300 text-base font-semibold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none border border-blue-400 rounded w-full py-3 px-4 text-pink-400 placeholder-gray-500 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300 focus:shadow-outline transition-all duration-300"
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:scale-105 hover:bg-gray-600 duration-500"
                  type="button"
                  onClick={() => {
                    setUsername('');
                    setPassword('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition-transform transform hover:scale-110 hover:bg-pink-500 duration-500"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-8 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a
                href="/signup"
                className="font-semibold leading-6 text-pink-300 hover:text-pink-400"
              >
                Signup Now
              </a>
            </p>
            <p className="text-center text-sm text-gray-500">
              Go back to Homepage?{' '}
              <a
                href="/"
                className="font-semibold leading-6 text-pink-300 hover:text-pink-400"
              >
                Go back
              </a>
            </p>
          </SpotlightBox>
        </div>
      </div>
      <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
    </div>
    </div>
   
  );
};

export default Login;