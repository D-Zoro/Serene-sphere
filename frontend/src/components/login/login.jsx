import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SpotlightBox from '../reactcomp/SpotlightBox';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className='mt-5'>
    <SpotlightBox>
      <div >
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
          />
        </div>
      </div>

      <div className="flex h-130 w-100 items-center justify-center bg-gradient-to-r p-3">
        <div className="absolute top-1 flex justify-center w-full mt-4">
          <a href="/" className="cursor-pointer">
            <img src="applogo.png" alt="Logo" className="h-16" />
          </a>
        </div>

        {error && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform sm:max-w-lg sm:w-full">
              <div className="bg-red-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10">
                    <i className="fas fa-exclamation-circle text-red-600 text-lg"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Error</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-full max-w-md p-3">
          <form onSubmit={handleSubmit} className="rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r text-center">
              <h2 className="text-3xl font-bold text-white mt-6">Login</h2>
              <p className="text-indigo-100 mt-2">Welcome back!</p>
            </div>
            <div className='pt-3'>
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user text-pink-400"></i>
                  </div>
                  <input
                    className="pl-10 w-full rounded-lg border border-pink-400 py-3 px-4 text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-pink-400"></i>
                  </div>
                  <input
                    className="pl-10 w-full rounded-lg border border-pink-400 py-3 px-4 text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              <div className="mt-10 flex justify-center space-x-4">
                <button
                  className="px-6 py-3 cursor-pointer rounded-lg text-black bg-gray-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                  type="button"
                  onClick={() => {
                    setUsername('');
                    setPassword('');
                  }}
                >
                  <i className="fas fa-times mr-2"></i>Cancel
                </button>
                <button
                  className="px-6 py-3 cursor-pointer rounded-lg bg-gradient-to-r from-blue-900 to-pink-400 text-white hover:from-blue-800 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-lg"
                  type="submit"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>Sign in
                </button>
              </div>

              <p className="mt-8 text-center text-sm text-gray-500">
                Not a member?{' '}
                <a href="/signup" className="font-semibold leading-6 text-pink-300 hover:text-pink-400">
                  Signup Now
                </a>
              </p>
              <p className="text-center text-sm text-gray-500">
                Go back to Homepage?{' '}
                <a href="/" className="font-semibold leading-6 text-pink-300 hover:text-pink-400">
                  Go back
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
        />
      </div>
    </SpotlightBox>
    </div>
  );
};

export default Login;