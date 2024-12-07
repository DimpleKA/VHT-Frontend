import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect } from "react";
import { BaseUrl } from "../../BaseUrl";

const LoginButton = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();

  useEffect(() => {
    const registerUser = async () => {
      if (isAuthenticated && user) {
        try {
          // Backend API call to register the user
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

          // Store user data in localStorage
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
              userId:response.data.userId,
              isLoggedIn: true,
              jwt: response.data.token, // Assuming JWT token is returned
              name: user.name,
              profileImg: user.picture,
              email: user.email,
              mobile: user.mobile || "",
            })
          );
        } catch (error) {
          console.error("Error registering user:", error);
        }
      }
    };

    registerUser();
  }, [isAuthenticated, user]);

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
          onClick={loginWithRedirect}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginButton;
