import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
//components
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import { Children } from "react";
import AboutUs from "./components/Aboutus/Aboutus";

//  authorized router uncomment later;
// const PrivateRoute=({ children }) => {
//   const{ username: usernameFromUrl }=useParams(); //get username from url
//   const token=localStorage.getItem('token');
//   const usernameFromStorage=localStorage.getItem('tokenUser');

//   if(!token || usernameFromUrl !==usernameFromStorage){
//     localStorage.removeItem('token');
//     localStorage.removeItem('tokenUser');
//     return <Navigate to ="/unauthorizedAccess"/>
//   }
//   return children;
// };

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        {/* aboutus */}
        {/* etc etc */}
      </Routes>
    </Router>
  );
}

export default App;
