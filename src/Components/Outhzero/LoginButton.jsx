import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const {user,  loginWithRedirect } = useAuth0();
console.log(user+"login page ")
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;