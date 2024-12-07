import React, { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import io from 'socket.io-client';

const Bottom = (props) => {
  const [message, setMessage] = useState('');
  const [openIcons, setOpenIcons] = useState(false);
  const [socket, setSocket] = useState(null);
  
  // Establish socket connection on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser')); 
    const fromUserId = storedUser?.userId || "vatsalrishabh001";

    const socketConnection = io('https://vht-backend.onrender.com', {
      query: { userId: fromUserId },
    });

    setSocket(socketConnection);

    socketConnection.on('user_online', (data) => {
      console.log(`${data.username} is online`);
    });

    socketConnection.on('user_offline', (data) => {
      console.log(`${data.userId} is offline`);
    });

    // Cleanup on component unmount
    return () => socketConnection.disconnect();
  }, []);

  // Handle message sending
  const sendMessage = () => {
    if (message.trim() === '') return; // Prevent sending empty messages
    const messageData = {
      content: message,
      from:fromUserId,
      to: props.receiver,
      timestamp: new Date(),
    };

    // Emit message to server
    socket.emit('send_message', messageData);
    setMessage(''); // Clear the input field
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="h-[10vh] bg-gradient-to-b from-[#1d1d1d] via-[#222323] to-[#222223] flex items-center px-4 border-t border-white">
      {/* Icon options (toggleable) */}
      {openIcons && (
        <div className="flex space-x-4 items-center">
          <div className="rounded-full p-2 bg-[#333333] border border-white cursor-pointer hover:bg-[#444444] transition">
            <AddAPhotoIcon className="text-white" />
          </div>
          <div className="rounded-full p-2 bg-[#333333] border border-white cursor-pointer hover:bg-[#444444] transition">
            <AudiotrackIcon className="text-white" />
          </div>
          <div className="rounded-full p-2 bg-[#333333] border border-white cursor-pointer hover:bg-[#444444] transition">
            <AttachFileIcon className="text-white" />
          </div>
          <div
            className="rounded-full p-2 bg-red-500 border border-white cursor-pointer hover:bg-red-600 transition"
            onClick={() => setOpenIcons(false)}
          >
            <CancelIcon className="text-white" />
          </div>
        </div>
      )}

      {/* Input box and send button */}
      <div className="flex flex-1 items-center ml-4 space-x-4">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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

      {/* Toggle Add Icons */}
      {!openIcons && (
        <div
          className="rounded-full p-2 bg-transparent border border-white cursor-pointer hover:bg-[#444444] ml-4 transition"
          onClick={() => setOpenIcons(true)}
        >
          <AddCircleIcon className="text-white" />
        </div>
      )}
    </div>
  );
};

export default Bottom;
