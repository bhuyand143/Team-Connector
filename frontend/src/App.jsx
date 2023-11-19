import { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar"
import Users from "./components/Users"
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import Adduser from "./components/Adduser";
import Teams from "./components/Teams";

function App() {
  const [progress, setProgress] = useState(0);
  const setProgression=(progress)=>{
    setProgress(progress)
  }
  return (
    <>
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
          />
        <Routes>
           <Route exact path="/" element={<Home setProgress={setProgression}/>}/>
           <Route exact path="/users" element={<Users setProgress={setProgression}/>}/>
           <Route exact path="/adduser" element={<Adduser setProgress={setProgression}/>}/>
           <Route exact path="/teams" element={<Teams setProgress={setProgression}/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
