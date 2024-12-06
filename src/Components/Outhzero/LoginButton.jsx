import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import axios from "axios";
import React, { useEffect } from "react";
import { BaseUrl } from "../../BaseUrl";
import { login } from "../../features/loginSlice"; // Import the login action from the Redux slice

const LoginButton = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && user) {
      const registerUser = async () => {
        try {
          // Send user data to backend for registration
          const response = await axios.post(
            `${BaseUrl}/api/users/registerUser`,
            JSON.stringify(user),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("User registered successfully:", response.data);
          localStorage.setItem(
            'loggedInUser', // Key for localStorage
            JSON.stringify({
              isLoggedIn:true,
              jwt: response.data.token, // Assuming backend returns JWT token
              name: user.name,
              profileImg: user.picture,
              email: user.email,
              mobile: user.mobile || '', // Optional: If mobile exists
            })
          );
          
          // Dispatch the login action to store user data and token in Redux store
          dispatch(login({
            jwt: response.data.token,  // Assuming backend returns JWT token
            name: user.name,
            profileImg: user.picture,
            email: user.email,
            mobile: user.mobile || '',  // If mobile exists
          }));
        } catch (error) {
          console.error("Error registering user:", error);
        }
      };

      registerUser();
    }
  }, [isAuthenticated, user, dispatch]);

  // Debugging logs
  if (user) {
    console.log(`User data:`, user);
    console.log(`Email: ${user.email}`);
    console.log(`Family Name: ${user.family_name}`);
    console.log(`Given Name: ${user.given_name}`);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-white mb-8">
          Welcome to Our Application!
        </h1>
        <p className="text-xl text-white mb-8">
          Please log in to continue.
        </p>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginButton;
