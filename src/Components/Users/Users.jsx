import React from 'react';
import chatpagebg from '../../assets/chatpagebg.jpg';
import UserSlab from './UserSlab';

const Users = () => {
  const users = [
    {
      userId: "user1",
      userEmail: "user1@email.com",
      name: "Aarav Mehta",
      imgUrl: "https://w0.peakpx.com/wallpaper/794/29/HD-wallpaper-best-whatsapp-dp-boy-walking-alone-birds.jpg",
      lastSeen: "10:30 AM",
      lastMessage: "Can we reschedule the meeting?",
      status: "offline",
      unreadMessage: false,
      isTyping:false,
      
    },
    {
      userId: "user2",
      userEmail: "user2@email.com",
      name: "Ishita Sharma",
      imgUrl: "https://cdn.lazyshop.com/files/9c375535-802d-4631-b284-43b398cad259/product/de06b4dfd0946c2c1c6b50c685c4b09e.jpeg?x-oss-process=style%2Fthumb",
      lastSeen: "11:45 AM",
      lastMessage: "Thank you for the update!",
      status: "online",
      unreadMessage: true,
      isTyping:true,
    },
    // More users here...
  ];

  return (
    <div
      className="h-[100vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${chatpagebg})` }}
    >
      <div className="p-5 text-white backdrop-blur-md w-full max-w-xl h-[97vh] overflow-y-auto hideScrollbar border border-gray-400 rounded-lg shadow-xl ">
        {users.map((user, index) => (
          <UserSlab
            key={index}
            userId={user.userId}
            userEmail={user.userEmail}
            name={user.name}
            imgUrl={user.imgUrl}
            lastSeen={user.lastSeen}
            lastMessage={user.lastMessage}
            status={user.status}
            unreadMessage={user.unreadMessage}
            isTyping={user.isTyping}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
