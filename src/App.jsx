import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Loader from './Components/Loader';
import ChatPage from './Components/Chat/ChatPage.jsx';
import Users from './Components/Users/Users.jsx';
import LoginButton from './Components/Outhzero/LoginButton.jsx';

function App() {
  // Correct useSelector for accessing Redux state
  const loggedInUser = useSelector((state) => state.login);
  useEffect(()=>{

  },[loggedInUser.isLoggedIn])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loader />} />

        {/* Conditional Rendering based on login status */}
        <Route
          path="/home"
          element={
            loggedInUser.isLoggedIn ? <Navigate to="/users" /> : <LoginButton />
          }
        />

        <Route
          path="/chat/:userId"
          element={
            loggedInUser.isLoggedIn ? <ChatPage /> : <LoginButton />
          }
        />

        <Route
          path="/users"
          element={
            loggedInUser.isLoggedIn ? <Users /> : <LoginButton />
          }
        />

        <Route
          path="/patientlogin"
          element={
            <>
              <Navbar />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
