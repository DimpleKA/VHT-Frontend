import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
  // Accessing Redux state
  const loggedInUser = useSelector((state) => state.login);
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    // If the user is logged in, redirect them to /users
    if (loggedInUser.isLoggedIn) {
      navigate('/users');
    } else {
      navigate('/home'); // Redirect to home if not logged in
    }
  }, [loggedInUser.isLoggedIn, navigate]); // This effect depends on the login state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loader />} />

        {/* Home page that shows the login button or redirects */}
        <Route
          path="/home"
          element={loggedInUser.isLoggedIn ? <Navigate to="/users" /> : <LoginButton />}
        />

        {/* ChatPage route, only accessible if logged in */}
        <Route
          path="/chat/:userId"
          element={loggedInUser.isLoggedIn ? <ChatPage /> : <Navigate to="/home" />}
        />

        {/* Users route, only accessible if logged in */}
        <Route
          path="/users"
          element={loggedInUser.isLoggedIn ? <Users /> : <Navigate to="/home" />}
        />

        {/* Patient login route (example, adjust as necessary) */}
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
