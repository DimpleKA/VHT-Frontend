import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LogoutButton from '../Outhzero/LogoutButton'; // Import LogoutButton
import io from "socket.io-client";

const Top = (props) => {
  const [drop, setDrop] = useState("hidden");
  const [iconName, setIconName] = useState(" ");
  const [greenDot, setGreenDot] = useState(false); // Online status indicator

  // Refs to the dropdown and the profile icon to detect clicks outside
  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);

  // Toggle dropdown visibility
  const dropDown = () => {
    if (drop === "hidden") {
      setDrop("block");
      setIconName("hidden");
    } else {
      setDrop("hidden");
      setIconName(" ");
    }
  };

  // Handle click outside to close dropdown
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(event.target) && 
      profileIconRef.current && !profileIconRef.current.contains(event.target)
    ) {
      setDrop("hidden");
      setIconName(" ");
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside of dropdown and profile icon
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener when component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

useEffect(()=>{

  const socket = io("https://vht-backend.onrender.com", {
    query: { userId: props.loggedInUser }, // Use loggedInUser's userId
  });

  console.log(`Socket initialized for userId: ${props.loggedInUser}`);

  // Handle online status
  socket.on("user_online", (data) => {
    console.log(`${data.username} is online`);
    if (props.userId === data.userId) {
      setGreenDot(true);
      // setIsOnline(true);
    }
  });

  // Handle offline status
  socket.on("user_offline", (data) => {
    console.log(`${data.userId} is offline`);
    if (props.userId === data.userId) {
      setGreenDot(false);
      // setIsOnline(false);
    }
  });

  // Cleanup the socket connection on unmount
  return () => {
    socket.disconnect();
  };


},[])




  return (
    <>
      {/* Dropdown Menu */}
      <div ref={dropdownRef} className={`absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg ${drop}`}>
        <div className="p-2">
          <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700 rounded-md">Dashboard</Link>
          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700 rounded-md">Profile</Link>
          <LogoutButton /> {/* Use the LogoutButton component */}
        </div>
      </div>

      <div className="flex items-center justify-between bg-transparent p-4 border-b border-white h-[10vh]">
        {/* Backward Icon */}
        <Link to="../users">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white text-white hover:bg-[#333333] cursor-pointer transition">
            <KeyboardBackspaceIcon fontSize="large" />
          </div>
        </Link>

        {/* User Profile and Dropdown Trigger */}
        <div className={`relative flex items-center space-x-4 ${iconName}`} ref={profileIconRef}>
          {/* User Profile Picture Placeholder */}
          <div className="w-12 h-12 rounded-full border-2 border-white bg-[#333333] flex items-center justify-center cursor-pointer" onClick={dropDown}>
            <span className="text-white text-xl font-bold">
              {/* User's Profile Image */}
              <img
                src="https://cdn.pixabay.com/animation/2023/06/13/15/13/15-13-11-358_512.gif"
                alt="User Profile"
                className="rounded-full w-full h-full object-cover"
                onError={(e) => e.target.src = "https://cdn.pixabay.com/animation/2023/06/13/15/13/15-13-11-358_512.gif"} // Fallback image on error
              />
            </span>
          </div>

          {/* User Information */}
          <div className="text-white">
            <h3 className="text-lg font-semibold">{props.name}</h3> {/* Static name for now */}
            <div className="flex items-center space-x-2">
            {greenDot?<> <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div> <p className="text-sm">Online</p> </>:<>offline</>} 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Top;
