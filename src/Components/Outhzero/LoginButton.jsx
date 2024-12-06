import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect } from "react";
import {BaseUrl} from "../../BaseUrl";

const LoginButton = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      const registerUser = async () => {
        try {
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
        } catch (error) {
          console.error("Error registering user:", error);
        }
      };

      registerUser();
    }
  }, [isAuthenticated, user]);

  // Debugging logs
  if (user) {
    console.log(`User data:`, user);
    console.log(`Email: ${user.email}`);
    console.log(`Family Name: ${user.family_name}`);
    console.log(`Given Name: ${user.given_name}`);
  }

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
