import React, { useEffect } from 'react';
import Right from './Right';
import Left from './Left';
import Typing from './Typing';
import axios from 'axios';
import io from 'socket.io-client';
import { BaseUrl } from '../../BaseUrl';

const storedUser = JSON.parse(localStorage.getItem('loggedInUser')); // Replace with actual logged-in user logic
const fromUserId = storedUser?.userId || "vatsalrishabh001";

const socket = io('https://vht-backend.onrender.com', {
  query: { userId: fromUserId },
});

const Middle = (props) => {
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.post(`${BaseUrl}/api/users/viewMessage`, {
          sender: fromUserId,
          receiver: props.receiver, // Corrected typo
        });
        console.log('Messages:', response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [fromUserId, props.receiver]); // Added dependency array


  return (
    <div className="h-[80vh] overflow-y-scroll bg-transparent p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      {/* Messages */}
     <Right />
      <Left />
      <Right />
      <Left />
      <Right />
      <Left />

      <Typing />
    </div>
  );
};

export default Middle;
