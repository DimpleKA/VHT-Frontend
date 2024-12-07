import React, { useEffect, useState } from "react";
import axios from "axios";
import chatpagebg from "../../assets/chatpagebg.jpg";
import UserSlab from "./UserSlab";
import { BaseUrl } from "../../BaseUrl";
import { timeConversion } from "./Time";
import { setUserList } from "../../features/allUserSlice";
import { useDispatch } from "react-redux";

const Users = () => {
  const dispatch = useDispatch(); // Redux dispatch
  const [users, setUsers] = useState([]); // Optional: Local state
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Fetch logged-in user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setLoggedInUser(storedUser);
      console.log("User Loaded:", storedUser);
    }
  }, []);

  // Fetch all users from API
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.post(`${BaseUrl}/api/users/allUsers`);
        const usersData = response.data.user || [];

        // Format lastSeen for each user
        const updatedUsers = await Promise.all(
          usersData.map(async (user) => ({
            ...user,
            lastSeen: user.lastSeen ? await timeConversion(user.lastSeen) : "N/A",
          }))
        );

        setUsers(updatedUsers); // Update local state
        dispatch(setUserList(updatedUsers)); // Dispatch to Redux store
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, [dispatch]); // Added `dispatch` to dependency array

  return (
    <div
      className="h-[100vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${chatpagebg})` }}
    >
      <div className="p-5 text-white backdrop-blur-md w-full max-w-xl h-[97vh] overflow-y-auto hideScrollbar border border-gray-400 rounded-lg shadow-xl">
        {users.length > 0 ? (
          users.map((user) => (
            <UserSlab
              key={user._id}
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
