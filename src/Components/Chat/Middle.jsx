import React, { useEffect, useState } from 'react';
import Right from './Right';
import Left from './Left';
import Typing from './Typing';
import axios from 'axios';
import { BaseUrl } from '../../BaseUrl';
import io from 'socket.io-client';

const Middle = (props) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
   
    // Initialize socket
    const newSocket = io('https://vht-backend.onrender.com', {
      query: { userId:props.fromUserId },
    });
    setSocket(newSocket);

    // Fetch messages
    const fetchMessages = async () => {
      try {
        const response = await axios.post(`${BaseUrl}/api/users/viewMessage`, {
          sender:props.fromUserId,
          receiver: props.receiver,
        });

        if (response.data.success) {
          setMessages(response.data.messages);
          console.log(response.data.messages[0] + ' middle messages');
          console.log(response.data + ' middle messages only data');
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Cleanup on component unmount
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [props.receiver]); // Added dependency array

  return (
    <div className="h-[80vh] overflow-y-scroll bg-transparent p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      {/* Render messages */}
      {messages.map((message) =>
        !message.sender === props.sender ? (
          // If the message sender is the logged-in user
          <Right
            key={message._id}
            content={message.content}
            timestamp={message.timestamp}
            status={message.status}
            isDeleted={message.isDeleted}
          />
        ) : (
          // If the message receiver is the logged-in user
          <Left
            key={message._id}
            content={message.content}
            timestamp={message.timestamp}
            status={message.status}
            isDeleted={message.isDeleted}
          />
        )
      )}

      {/* Typing indicator */}
      <Typing />
    </div>
  );
};

export default Middle;
