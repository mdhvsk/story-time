import React, {ReactNode} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import StoryBoard from './pages/StoryBoard/StoryBoard';
import StoryDisplay from './components/StoryDisplay/StoryDisplay';
import ResponsiveAppBar from './components/ResponsiveNavBar';
import SignUpForm from './pages/SignUp/SignUpForm';
import RegisterForm from './pages/Register/RegisterForm';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar/>
          <Routes>
              <Route path = '/' element={<StoryDisplay/>}/>
              <Route path = '/story' element={<StoryBoard/>}/>
              <Route path = '/register' element={<RegisterForm/>}/>

          </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
