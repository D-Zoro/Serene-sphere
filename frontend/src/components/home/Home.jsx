import React from "react";
import Home1 from "./Home1";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-20">
        <Home1 />
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
