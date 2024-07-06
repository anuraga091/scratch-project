import React from 'react';

const SpeechBubble = ({ message }) => {
  return (
    <div className="relative bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm font-medium inline-block">
      {message}
      <div className="absolute bottom-0 left-5 transform translate-y-full">
        <svg width="20" height="10" className="fill-current text-gray-300">
          <path d="M0,0 L10,10 L20,0 Z" />
        </svg>
      </div>
      <div className="absolute bottom-1 left-5 transform translate-y-full">
        <svg width="20" height="10" className="fill-current text-white">
          <path d="M0,0 L10,10 L20,0 Z" />
        </svg>
      </div>
    </div>
  );
};

export default SpeechBubble;
