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
    if (!props.fromUserId || !props.receiver) {
      console.warn('Required data not available to fetch messages');
      return; // Wait until both `fromUserId` and `receiver` are available
    }

    // Initialize socket
    const newSocket = io('https://vht-backend.onrender.com', {
      query: { userId: props.fromUserId },
    });
    setSocket(newSocket);

    // Fetch messages
    const fetchMessages = async () => {
      console.log('fetchMessages called');
      console.log(props.fromUserId + ' fromUserId');
      console.log(props.receiver + ' receiver');
      try {
        const response = await axios.post(`${BaseUrl}/api/users/viewMessage`, {
          sender: props.fromUserId,
          receiver: props.receiver,
        });

        if (response.data?.success) {
          setMessages(response.data.messages);
          console.log(response.data.messages + ' middle messages');
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
  }, [props.fromUserId, props.receiver]); // Added dependency array

  return (
    <div className="h-[80vh] overflow-y-scroll bg-transparent p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      {/* Render messages */}
      {messages.map((message) =>
        message.sender === props.fromUserId ? (
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
