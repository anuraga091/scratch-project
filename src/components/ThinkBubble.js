import React from 'react';

const ThinkBubble = ({ message }) => {
  return (
    <div className="relative bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm font-medium inline-block">
      {message}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
        <svg width="30" height="28" className="fill-current text-gray-300">
          <circle cx="15" cy="10" r="6" fill="#d3d3d3" />
          <circle cx="13" cy="24" r="4" fill="#d3d3d3" />
        </svg>
      </div>
      <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 translate-y-full">
        <svg width="30" height="28" className="fill-current text-white">
          <circle cx="15" cy="10" r="6" fill="white" />
          <circle cx="13" cy="24" r="4" fill="white" />
        </svg>
      </div>
    </div>
  );
};

export default ThinkBubble;
