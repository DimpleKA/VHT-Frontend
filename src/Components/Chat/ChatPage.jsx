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
  const [logUser, setLoggedInUser] = useState("dimpleka021");

  useEffect(() => {
    // Parse logged-in user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setLoggedInUser(storedUser);
      console.log("User Loaded:", storedUser);
    }
  }, []);
  const { userId } = useParams(); // Extract userId from the route
  const [chatData, setChatData] = useState([]); // State to store chat data

  return (
    <div
      className="h-[100vh] flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${chatpagebg})` }}
    >
      <Top  />    {/*  we need to display the data of selected user "userId"  and not logUser */}
      <Middle receiver={userId} />    {/* chat data between logUser and selected User comes in chatData */}
      <Bottom  receiver={userId} fromUserId={logUser.userId||"vatsalrishabh001"}  />        {/* useId of selected User and logUser*/}
    </div>
  );
};

export default ChatPage;
