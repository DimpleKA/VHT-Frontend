import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import io from "socket.io-client";

// StyledBadge for online status indicator
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
    "0%": { transform: "scale(.8)", opacity: 1 },
    "100%": { transform: "scale(2.4)", opacity: 0 },
  },
}));

const UserSlab = (props) => {
  const [greenDot, setGreenDot] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  // Debug: Log props
  useEffect(() => {
    console.log("UserSlab Props:", props);
  }, [props]);

  // Load logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) setLoggedInUser(storedUser);
  }, []);

  // Handle socket events
  useEffect(() => {
    if (!loggedInUser) return;

    const socket = io("https://vht-backend.onrender.com", {
      query: { userId: loggedInUser.userId },
    });

    // Debugging socket lifecycle
    socket.on("connect", () => console.log("Socket connected:", socket.id));
    socket.on("disconnect", () => console.log("Socket disconnected"));
    socket.on("connect_error", (err) => console.error("Socket connection error:", err));

    // Listen for typing events
    socket.on("user_typing", ({ from }) => {
      console.log(`${from} is typing`);
      if (from === props.userId) setIsTyping(true);
    });

    socket.on("user_stop_typing", ({ from }) => {
      console.log(`${from} stopped typing`);
      if (from === props.userId) setIsTyping(false);
    });

    // Handle online/offline events
    socket.on("user_online", (data) => {
      if (props.userId === data.userId) setGreenDot(true);
    });

    socket.on("user_offline", (data) => {
      if (props.userId === data.userId) setGreenDot(false);
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected for cleanup");
    };
  }, [props.userId, loggedInUser]);

  // Debugging state updates
  useEffect(() => {
    console.log("isTyping state updated:", isTyping);
  }, [isTyping]);

  const gotoChatPage = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div
      className="flex items-center justify-between p-4 bg-transparent hover:bg-[#333333] hover:shadow-lg rounded-lg mb-4 transition-all duration-300 ease-in-out"
      onClick={() => gotoChatPage(props.userId)}
    >
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
          {isTyping ? (
            <div className="text-green-400">Typing...</div>
          ) : (
            <div className="text-gray-400">{props.lastMessage}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end">
        {greenDot ? (
          <div className="text-green-600 text-sm">Online</div>
        ) : (
          <div className="text-gray-400 text-sm">{props.lastSeen}</div>
        )}
        {props.unreadMessage && (
          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full mt-1"></div>
        )}
      </div>
    </div>
  );
};

export default UserSlab;
