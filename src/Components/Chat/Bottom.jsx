import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";

const Bottom = (props) => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const socketConnection = io("https://vht-backend.onrender.com", {
      query: { userId: props.fromUserId },
    });
    setSocket(socketConnection);

    return () => socketConnection.disconnect();
  }, [props.fromUserId]);

  const typingOn = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);

    if (socket && props.receiver) {
      socket.emit("typing", { from: props.fromUserId, to: props.receiver });

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stop_typing", { from: props.fromUserId, to: props.receiver });
      }, 1000);
    }
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    const messageData = {
      content: message,
      from: props.fromUserId,
      to: props.receiver,
      timestamp: new Date(),
    };

    socket.emit("send_message", messageData);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="h-[10vh] bg-gradient-to-b from-[#1d1d1d] via-[#222323] to-[#222223] flex items-center px-4 border-t border-white">
      <div className="flex flex-1 items-center ml-4 space-x-4">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={typingOn}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-[#333333] text-white rounded-full px-4 py-2 border border-white focus:outline-none focus:ring focus:ring-[#444444]"
        />
        <div
          className="rounded-full p-2 bg-[#333333] border border-white cursor-pointer hover:bg-[#444444] transition"
          onClick={sendMessage}
        >
          <SendIcon className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Bottom;
