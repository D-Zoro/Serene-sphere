import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Spotlight from "../reactcomp/SpotlightBox";
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
    <>
      <Spotlight>
        <Navbar />
        <main className="profile-page bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen">
          <section className="relative block h-[400px]">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${bg})`,
              }}
            >
              <span className="w-full h-full absolute opacity-50 bg-black"></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
              style={{ transform: "translateZ(0px)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                {/* <polygon
                  className="text-gray-800 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon> */}
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-gradient-to-b from-gray-800 to-gray-900">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-gradient-to-tr from-gray-800 to-gray-500 w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="Profile"
                          src={
                            userDetails.profilePicture
                              ? `${import.meta.env.VITE_API_BASE_URL}/${userDetails.profilePicture}`
                              : defaultProfilePicture
                          }
                          className="shadow-xl rounded-full align-middle border-4 border-cyan-500 absolute -m-16 -ml-20 lg:-ml-24 max-w-[180px]"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <a
                          className="bg-gradient-to-r from-pink-500 to-purple-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          href={`/${userDetails.username}/updateprofile`}
                        >
                          Update Profile
                        </a>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-pink-400">
                            {userDetails.journals.length}
                          </span>
                          <span className="text-sm text-gray-400">
                            Number of Journals
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-bold leading-normal mb-2 text-pink-400">
                      {userDetails.name}
                    </h3>
                    <div className="mb-2 text-gray-400 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-pink-400"></i>
                      Age: {userDetails.age}
                    </div>
                    <div className="mb-2 text-gray-400">
                      <i className="fas fa-university mr-2 text-lg text-pink-400"></i>
                      Email: {userDetails.email}
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-pink-300 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-gray-300">
                          {userDetails.bio}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center mt-6">
                      <Link to={`/${username}/createjournal`}>
                        <button
                          className="bg-gradient-to-r from-pink-500 to-purple-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Create Journal
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Spotlight>
    </>
  );
};

export default Profile;