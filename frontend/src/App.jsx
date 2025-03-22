//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

import{BrowserRouter as Router,Route, Routes} from "react-router-dom";
import Login from './components/login/login';



function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </Router>
   
  );
  
}

export default App;
