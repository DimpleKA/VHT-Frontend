import React, { useEffect, useState } from "react";
import axios from "axios";
import chatpagebg from "../../assets/chatpagebg.jpg";
import UserSlab from "./UserSlab";
import { BaseUrl } from "../../BaseUrl";

const Users = () => {
  const [users, setUsers] = useState([]); // State for storing users

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.post(`${BaseUrl}/api/users/allUsers`);
        console.log(response.data); // Verify the structure of your API response
        setUsers(response.data.user || []); // Ensure you're setting the correct data
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
              lastSeen={user.lastSeen || "N/A"}
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
