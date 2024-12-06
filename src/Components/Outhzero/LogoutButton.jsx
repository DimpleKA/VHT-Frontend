import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/loginSlice"; // Import logout action

const LogoutButton = () => {
  const { logout: authLogout } = useAuth0();
  const dispatch = useDispatch(); // Initialize Redux dispatch

  const handleLogout = () => {
    // Dispatch logout action to Redux
    dispatch(logout());

    // Log out from Auth0
    authLogout({ returnTo: window.location.origin });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 hover:shadow-lg"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
