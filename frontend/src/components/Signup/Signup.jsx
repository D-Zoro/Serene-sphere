import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Spotlight from '../reactcomp/SpotlightBox';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        gender: '',
        bio: '',
        age: ''
    });

    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState('');
    const [missingDetailsError, setMissingDetailsError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['username', 'password', 'name', 'email', 'gender', 'age'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            setMissingDetailsError('Please fill in all required fields.');
            return;
        }

        try {
            const formDataWithFile = new FormData();
            for (const key in formData) {
                formDataWithFile.append(key, formData[key]);
            }
            if (profilePicture) {
                formDataWithFile.append('profilePicture', profilePicture);
            }

            const response = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                body: formDataWithFile,
            });

            if (response.status === 409) {
                const data = await response.json();
                setError(data.msg);
                return;
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Signup successful:', data);
            navigate('/login');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            username: '',
            password: '',
            name: '',
            email: '',
            gender: '',
            bio: '',
            age: ''
        });
        setProfilePicture(null);
        setError('');
        setMissingDetailsError('');
    };

    const closeModal = () => {
        setError('');
        setMissingDetailsError('');
    };

    return (
        <Spotlight>
            <div>
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-r p-6">
                <div className="absolute top-1 flex justify-center w-full mt-4">
                    <a href="/" className="cursor-pointer">
                        <img src="applogo.png" alt="Logo" className="h-16" />
                    </a>
                </div>
                {(error || missingDetailsError) && (
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
                                            <p className="text-sm text-gray-500">{error || missingDetailsError}</p>
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

                <div className="w-full max-w-4xl p-2">
                    <form onSubmit={handleSubmit} className="rounded-xl overflow-hidden">
                        <div className="bg-gradient-to-r  text-center">
                            <h2 className="text-3xl font-bold text-white mt-6">Create Account</h2>
                            <p className="text-indigo-100 mt-2">Complete the form to join us</p>
                        </div>
                        <div className='p-3'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="col-span-full flex justify-center">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-blue-900 shadow-lg flex items-center justify-center">
                                            {profilePicture ? (
                                                <div className="relative w-full h-full">
                                                    <img
                                                        src={URL.createObjectURL(profilePicture)}
                                                        alt="Profile"
                                                        className="w-full h-full object-cover rounded-full"
                                                    />
                                                    <label
                                                        onClick={() => setProfilePicture(null)}
                                                        className=" flex justify-center items-center absolute top-0 left-1 bg-red-500 rounded-full w-6 h-6 p-2 shadow-lg cursor-pointer hover:bg-red-600 transition z-10"
                                                        title="Remove image"
                                                    >
                                                        <i className="fas fa-times text-white text-xs"></i>
                                                    </label>
                                                </div>
                                            ) : (
                                                <i className="fas fa-user text-gray-400 text-6xl"></i>
                                            )}
                                        </div>
                                        <label
                                            htmlFor="profile-upload"
                                            className="absolute bottom-0 right-0 bg-blue-900 rounded-full w-10 h-10 p-2 shadow-lg cursor-pointer hover:bg-indigo-700 transition flex  items-center justify-center"
                                        >
                                            <i className="fas fa-camera text-white"></i>
                                            <input
                                                id="profile-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-user text-pink-400"></i>
                                        </div>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Username *"
                                            className="pl-10 w-full rounded-lg border border-pink-400 py-3 px-4 text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-lock text-pink-400"></i>
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Password *"
                                            className="pl-10 w-full rounded-lg border border-pink-400 py-3 px-4 text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-user-circle text-pink-400"></i>
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Full Name *"
                                            className="pl-10 w-full rounded-lg border border-pink-400 py-3 px-4 text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-envelope text-pink-400"></i>
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email Address *"
                                            className="pl-10 w-full rounded-lg border border-pink-400 py-3 px-4 text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-venus-mars text-pink-400"></i>
                                        </div>
                                        <select
                                            name="gender"
                                            id="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="pl-10 w-full rounded-lg border border-pink-400 py-3 px-4  text-gray-400 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            <option value="">Select Gender *</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Non Binary">Non Binary</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-calendar-alt text-pink-400"></i>
                                        </div>
                                        <input
                                            type="number"
                                            name="age"
                                            id="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            placeholder="Age *"
                                            className="pl-10 w-full rounded-lg border border-pink-400 py-3 px-4  text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 pointer-events-none">
                                            <i className="fas fa-comment-alt text-pink-400"></i>
                                        </div>
                                        <textarea
                                            name="bio"
                                            id="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            placeholder="Tell us about yourself..."
                                            rows="4"
                                            className="pl-10 w-full rounded-lg border border-pink-400 py-3 px-4 text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center text-sm text-gray-500">
                                <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                                <span>Fields marked with * are required</span>
                            </div>

                            <div className="mt-10 flex justify-center space-x-4">
                                <label
                                    onClick={handleCancel}
                                    className="px-6 py-3 cursor-pointer  rounded-lg text-black bg-gray-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                                >
                                    <i className="fas fa-times mr-2"></i>Cancel
                                </label>
                                <label
                                    className="px-6 py-3 cursor-pointer rounded-lg bg-gradient-to-r  from-blue-900 to-pink-400 text-white hover:from-blue-800 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-lg"
                                    onClick={handleSubmit}
                                >
                                    <i className="fas fa-user-plus mr-2"></i>Save
                                </label>
                            </div>
                            <p className="mt-8 text-center text-sm text-gray-500">
                                Already a member?{' '}
                                <a href="/login" className="font-semibold leading-6 text-pink-300 hover:text-pink-400">
                                    login Now
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
            <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
        </Spotlight>
    );
}