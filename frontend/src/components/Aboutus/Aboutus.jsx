import React, { useEffect } from "react";
import Navbar from "../navbar/Navbar";

function AboutUs() {
  useEffect(() => {
    document.title = "About Us - Serene Sphere";
  }, []);

  return (
    <div className="w-screen">
      <Navbar />
      <div className="relative isolate px-6 pt-7 lg:px-8 overflow-hidden">
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

        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
          <div className="text-center -mt-24">
            <h1 className="text-5xl font-extrabold text-[#F9A8D4] sm:text-6xl mb-6">
              About Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Welcome to Serene Sphere space where your mental well-being is our
              priority. Our mission is to create a welcoming environment where
              you can find peace, track your emotions, and receive personalized
              support.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We provide tools that allow you to monitor your mood, engage in
              meaningful conversations, and access helpful resources tailored to
              your needs all with the help of advanced technology and a
              compassionate community.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At Serene Sphere, we believe everyone deserves a space where they
              feel heard, understood, and supported in their mental health
              journey. Join us, and let’s prioritize emotional well-being
              together.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="px-6 py-3 text-lg font-semibold text-white rounded-2xl hover:bg-[#F472B6] hover:rounded-2xl transition duration-300 transform hover:scale-105"
              >
                Back to Home
              </a>
            </div>
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
}

export default AboutUs;
