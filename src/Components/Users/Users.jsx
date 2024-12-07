import React, { useEffect, useState } from "react";
import axios from "axios";
import chatpagebg from "../../assets/chatpagebg.jpg";
import UserSlab from "./UserSlab";
import { BaseUrl } from "../../BaseUrl";
import { timeConversion } from "./Time";

const Users = () => {
  const [users, setUsers] = useState([]); // State for storing users
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Parse logged-in user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setLoggedInUser(storedUser);
      console.log("User Loaded:", storedUser);
    }
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.post(`${BaseUrl}/api/users/allUsers`);
        const usersData = response.data.user || [];

        // Convert `lastSeen` time for each user
        const updatedUsers = await Promise.all(
          usersData.map(async (user) => {
            const formattedLastSeen = user.lastSeen
              ? await timeConversion(user.lastSeen)
              : "N/A";
            return {
              ...user,
              lastSeen: formattedLastSeen,
            };
          })
        );

        setUsers(updatedUsers); // Update state with processed users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []); // Empty dependency array ensures the effect runs once

  return (
    <div
      className="h-[100vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${chatpagebg})` }}
    >
      <div className="p-5 text-white backdrop-blur-md w-full max-w-xl h-[97vh] overflow-y-auto hideScrollbar border border-gray-400 rounded-lg shadow-xl">
        {users.length > 0 ? (
          users.map((user, index) => (
            <UserSlab
              key={user._id || index}
              userId={user.userId}
              userEmail={user.email}
              name={user.name}
              imgUrl={user.profileImg}
              lastSeen={user.lastSeen}
              lastMessage={"No messages yet"}
              status={user.status || "offline"}
              unreadMessage={false}
              isTyping={false}
            />
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
