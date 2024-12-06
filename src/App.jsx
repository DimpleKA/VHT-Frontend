import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Loader from "./Components/Loader";
import ChatPage from "./Components/Chat/ChatPage.jsx";
import Users from "./Components/Users/Users.jsx";
import LoginButton from "./Components/Outhzero/LoginButton.jsx";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Parse logged-in user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setLoggedInUser(storedUser);
      console.log("User Loaded:", storedUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loader />} />

        {/* Conditional Navigation */}
        <Route
          path="/home"
          element={
            loggedInUser?.isLoggedIn ? <Navigate to="/users" /> : <LoginButton />
          }
        />

        <Route
          path="/chat/:userId"
          element={
            loggedInUser?.isLoggedIn ? <ChatPage /> : <LoginButton />
          }
        />

        <Route
          path="/users"
          element={
            loggedInUser?.isLoggedIn ? <Users /> : <LoginButton />
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
