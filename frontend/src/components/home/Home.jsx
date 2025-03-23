import React from "react";
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
import Navbar from '../navbar/navbar';

const Home = () => {
    return(
        <div>
            <div className="bg-gradient-to-t from-35% from-gray-900"><Navbar /></div>
            <div className='mt-20'>
            <Home1 />
            <Home2 />
            <Home3 />   
        </div>
        </div>
    )
}

export default Home