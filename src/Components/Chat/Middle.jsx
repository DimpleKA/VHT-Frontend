import React, { useEffect, useState } from 'react';
import Right from './Right';
import Left from './Left';
import Typing from './Typing';
import axios from 'axios';
import { BaseUrl } from '../../BaseUrl';
import io from 'socket.io-client';

const storedUser = JSON.parse(localStorage.getItem('loggedInUser')); // Replace with actual logged-in user logic
const fromUserId = storedUser?.userId || "vatsalrishabh001";

const socket = io('https://vht-backend.onrender.com', {
  query: { userId: fromUserId },
});

const Middle = (props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.post(`${BaseUrl}/api/users/viewMessage`, {
          sender: fromUserId,
          receiver: props.receiver, // Corrected typo
        });

        if (response.data.success) {
          setMessages(response.data.messages); // Set the messages from the response
          console.log(response.data.messages+"middle messages");
          console.log(response.data+"middle messages only dat");
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [fromUserId, props.receiver]); // Added dependency array

  return (
    <div className="h-[80vh] overflow-y-scroll bg-transparent p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      {/* Render messages */}
      {messages.map((message) => (
        message.sender === fromUserId ? (
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
      ))}

      {/* Typing indicator */}
      <Typing />
    </div>
  );
};

export default Middle;
