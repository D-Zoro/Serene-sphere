import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/signup', {
                username,
                password
            });
            console.log(response);
            navigate('/'); // Redirect to login after successful signup
        } catch (err) {
            setError('Signup failed. Try again.');
        }
    };

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            {error && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <p className="text-red-600">{error}</p>
                        <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded" onClick={() => setError('')}>Close</button>
                    </div>
                </div>
            )}
            <div className="w-screen mt-32">
                <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="px-6 py-4" style={{ background: 'linear-gradient(to right, #D1D5DB, #E5E7EB, #F3F4F6)' }}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Create an Account</h2>
                        <form onSubmit={handleSignup}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <input
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="!bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => {
                                        setUsername('');
                                        setPassword('');
                                        setConfirmPassword('');
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="!bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
