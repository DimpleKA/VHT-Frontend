import React from 'react';

const Left = ({ content, timestamp, status, isDeleted }) => {
  return (
    <div className="flex justify-start items-end p-4">
      {/* Message Bubble */}
      <div>
        <div className="flex justify-start max-w-[100%] bg-[#1b1b1b] text-white py-2 px-4 rounded-tr-lg rounded-tl-lg rounded-br-lg shadow-md">
          {isDeleted ? "This message was deleted" : content}
        </div>
        {/* Timestamp */}
        <div className="flex justify-start text-sm text-gray-400 mt-1">
          <span>{new Date(timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Left;
