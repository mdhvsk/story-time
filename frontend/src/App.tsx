import React, {ReactNode} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import StoryDisplay from "./components/StoryDisplay/StoryDisplay";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
          <Routes>
              <Route path = '/' element={<StoryDisplay/>}/>
          </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
