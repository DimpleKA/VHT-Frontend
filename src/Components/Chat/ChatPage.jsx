import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is installed and imported
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';
import chatpagebg from '../../assets/chatpagebg.jpg';

// 1. after selecting specific user that users data comes by making request to server

// 2. for top nav we will bring the selected users, name email profule lastSeen/online status or typing of not/ can also bring cursh or not and Button question
// 3. messages - 5 fields in this sentBy, to , time , date, message
// 4. sent message - we need sent by sent to message or files, types of messages once you see deleted



const ChatPage = () => {
  const [logUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Parse logged-in user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setLoggedInUser(storedUser);
      console.log("User Loaded:", storedUser);
    }
  }, []);
  const { userId } = useParams(); // Extract userId from the route
  const [chatData, setChatData] = useState([
    {
      sentBy:"userId1",
      sentTo:"userId2",
      message:"Hi hope you are doing well.",
      time:"09:45 AM",
      date:"12 June, 2024",
    },
    {
      sentBy:"userId2",
      sentTo:"userId1",
      message:"Yes I am doing fine",
      time:"09:49 AM",
      date:"12 June, 2024",
    },
    {
      sentBy:"userId2",
      sentTo:"userId1",
      message:"Hope you are also doing fine ?",
      time:"10:45 AM",
      date:"12 June, 2024",
    },
    {
      sentBy:"userId2",
      sentTo:"userId1",
      message:"Also I wanted to know can you come on trip ?",
      time:"11:45 AM",
      date:"14 June, 2024",
    }
  ]); // State to store chat data

  // Fetch chat data for the selected user
  // useEffect(() => {
  //   const fetchChatData = async () => {
  //     try {
  //       const response = await axios.post('/api/chat', {
  //         jwt: logUser.jwt,
  //         userId,
  //       });
  //       setChatData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching chat data:', error);
  //     }
  //   };

  //   if (logUser.isLoggedIn && userId) {
  //     fetchChatData();
  //   }
  // }, [logUser, userId]);

  return (
    <div
      className="h-[100vh] flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${chatpagebg})` }}
    >
      <Top  />    {/*  we need to display the data of selected user "userId"  and not logUser */}
      <Middle  />    {/* chat data between logUser and selected User comes in chatData */}
      <Bottom   />        {/* useId of selected User and logUser*/}
    </div>
  );
};

export default ChatPage;
