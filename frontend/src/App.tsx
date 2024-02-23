import React, { ReactNode } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StoryBoard from './pages/StoryBoard/StoryBoard';
import StoryDisplay from './components/StoryDisplay/StoryDisplay';
import ResponsiveAppBar from './components/ResponsiveNavBar';
import RegisterForm from './components/Register/RegisterForm';
import StoryForm from "./components/StoryForm/StoryForm";
import LoginForm from "./components/Login/LoginForm";
import { UserProvider } from './hooks/UserContext';
import StoryFormPage from './pages/StoryFormPage/StoryFormPage';
import NotesPage from './pages/NotesPage/NotesPage';
import StoriesPage from './pages/StoriesPage/StoriesPage';


function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<StoryDisplay />} />
            <Route path='/story' element={<StoryBoard />} />
            <Route path='/story/form' element={<StoryFormPage />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/notes' element={<NotesPage />} />
            <Route path='/stories' element={<StoriesPage />} />

          </Routes>
        </BrowserRouter>
      </UserProvider>


    </div>
  );
}

export default App;
