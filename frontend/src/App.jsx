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
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import { Children } from "react";
import AboutUs from "./components/Aboutus/Aboutus";
import NoAccess from "./components/UnauthorizedAccess/UnauthorizedAccess";
import Signup from "./components/Signup/Signup";
import NotFound from "./components/404/404";
import Aitheraphy from "./components/Ai/Aitheraphy";
import Profile from "./components/profile/profile";
import Anony from "./components/anonymoussharing/anosharing"
 //authorized router uncomment later;
const PrivateRoute=({ children }) => {
  const{ username: usernameFromUrl }=useParams(); //get username from url
  const token=localStorage.getItem('token');
  const usernameFromStorage=localStorage.getItem('tokenUser');

  if(!token || usernameFromUrl !==usernameFromStorage){
    localStorage.removeItem('token');
    localStorage.removeItem('tokenUser');
    return <Navigate to ="/unauthorizedAccess"/>
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorizedAccess" element={<NoAccess/>}/>
        <Route path="/*" element={<NotFound/>}/>
        <Route path="/:username/therapist" element={<PrivateRoute><Aitheraphy/></PrivateRoute>} /> 
        <Route path="/:username/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
        <Route path="/anonymousSharing" element={<Anony/>} />
        {/* sign up */}
        {/* aboutus */}
        {/* etc etc */}
      </Routes>
    </Router>
  );
}

export default App;
