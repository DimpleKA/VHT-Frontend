import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Connect to the server

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [typingStatus, setTypingStatus] = useState('');

  // Emit the typing event when the user starts typing
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      if (messageInput.trim()) {
        socket.emit('typing', { userId: 'user1', message: 'Typing...' });
      } else {
        setTypingStatus('');
      }
    }, 500); // Delay typing indication

    return () => clearTimeout(typingTimeout); // Cleanup on component unmount
  }, [messageInput]);

  // Listen for typing events
  useEffect(() => {
    socket.on('user_typing', (data) => {
      setTypingStatus(`${data.userId} is typing...`);
    });

    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('user_typing');
      socket.off('receive_message');
    };
  }, []);

  // Function to send message
  const sendMessage = () => {
    if (messageInput.trim()) {
      const message = {
        senderId: 'user1',
        receiverId: 'user2',
        content: messageInput,
        timestamp: new Date(),
      };
      socket.emit('send_message', message);
      setMessageInput(''); // Clear input field
    }
  };

  return (
    <div>
      <div id="messages" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <p key={index}><strong>{message.senderId}:</strong> {message.content}</p>
        ))}
      </div>
      <div id="typing-status" style={{ fontStyle: 'italic', color: 'gray' }}>
        {typingStatus}
      </div>

      <input
        type="text"
        id="messageInput"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
