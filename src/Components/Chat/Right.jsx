import React from 'react';

const Right = ({ content, timestamp, status, isDeleted }) => {
  return (
    <div className="flex justify-end items-end p-4">
      {/* Message Bubble */}
      <div>
        <div className="flex justify-end max-w-[100%] bg-gradient-to-b from-[#3b3c3d] to-[#444546] text-white py-2 px-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg shadow-md">
          {isDeleted ? "This message was deleted" : content}
        </div>
        {/* Timestamp */}
        <div className="flex justify-end text-sm text-gray-400 ml-2">
          <span>{new Date(timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Right;
