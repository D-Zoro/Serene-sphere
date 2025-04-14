import React from "react";
import Home1 from "./Home1";
import Navbar from "../navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-20">
        <Home1 />
      </div>
    </div>
  );
};

export default Home;
