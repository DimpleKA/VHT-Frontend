import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import io from "socket.io-client";

// StyledBadge for the online status indicator
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const UserSlab = (props) => {
  const [greenDot, setGreenDot] = useState(false); // Online status indicator
  const [isOnline, setIsOnline] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // Logged-in user data
  const navigate = useNavigate();

  // Fetch logged-in user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setLoggedInUser(storedUser);
      console.log("User Loaded:", storedUser);
    }
  }, []);

  // Initialize socket connection
  useEffect(() => {
    if (!loggedInUser) {
      console.log("Waiting for loggedInUser to load...");
      return; // Don't initialize the socket until loggedInUser is ready
    }

    const socket = io("https://vht-backend.onrender.com", {
      query: { userId: loggedInUser.userId }, // Use loggedInUser's userId
    });

    console.log(`Socket initialized for userId: ${loggedInUser.userId}`);

    // Handle online status
    socket.on("user_online", (data) => {
      console.log(`${data.username} is online`);
      if (props.userId === data.userId) {
        setGreenDot(true);
        setIsOnline(true);
      }
    });

    // Handle offline status
    socket.on("user_offline", (data) => {
      console.log(`${data.userId} is offline`);
      if (props.userId === data.userId) {
        setGreenDot(false);
        setGreenDot(false);
      }
    });

    // Cleanup the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [props.userId, loggedInUser]);

  // Navigate to the chat page
  const gotoChatPage = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div
      className="flex items-center justify-between p-4 bg-transparent hover:bg-[#333333] hover:shadow-lg rounded-lg mb-4 transition-all duration-300 ease-in-out"
      onClick={() => gotoChatPage(props.userId)} // Pass as a callback
    >
      {/* Avatar with Status */}
      <div className="flex items-center">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant={greenDot ? "dot" : undefined}
        >
          <Avatar alt={props.name} src={props.imgUrl} />
        </StyledBadge>
        <div className="ml-3">
          <span className="text-white font-semibold">{props.name}</span>
          {props.isTyping ? (
            <div className="text-green-400">Typing...</div>
          ) : (
            <div className="text-gray-400">{props.lastMessage}</div>
          )}
        </div>
      </div>

      {/* Timestamp and Highlight Dot */}
      <div className="flex flex-col items-end">
        {isOnline?<div className="text-green-600 text-sm">online</div>:<div className="text-gray-400 text-sm">{props.lastSeen}</div>}

        {props.unreadMessage && (
          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full mt-1"></div>
        )}
      </div>
    </div>
  );
};

export default UserSlab;
