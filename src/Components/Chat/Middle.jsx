import React from 'react';
import Right from './Right';
import Left from './Left';
import Typing from './Typing';

const Middle = () => {
  return (
    <div className="h-[80vh] overflow-y-scroll bg-transparent p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      {/* Messages */}
      <Right />
      <Left />
      <Right />
      <Left />
      <Right />
      <Left />

      <Typing />
    </div>
  );
};

export default Middle;
