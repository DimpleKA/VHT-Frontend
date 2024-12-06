
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  console.log(user+"login page ")
console.log(user.email+"login page ")
console.log(user.family_name+"login page ")
console.log(user.given_name+"login page ")

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};

export default LogoutButton;