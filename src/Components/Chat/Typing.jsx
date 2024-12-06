import React from 'react';

const Typing = () => {
  return (
    <div className="flex items-center space-x-4 px-5">
      {/* Dot 1 */}
      <div className="h-2 w-2 bg-white rounded-full animate-move-up-down"></div>
      {/* Dot 2 */}
      <div className="h-2 w-2 bg-white rounded-full animate-move-up-down delay-150"></div>
      {/* Dot 3 */}
      <div className="h-2 w-2 bg-white rounded-full animate-move-up-down delay-300"></div>
    </div>
  );
};

export default Typing;
