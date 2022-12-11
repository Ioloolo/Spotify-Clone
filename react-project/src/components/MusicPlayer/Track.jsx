import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="sm:flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlaying && isActive ? 'animate-[spin_10s_linear_infinite]' : ''
      }  sm:block h-16 w-16 mr-4`}
    >
      <img
        src={activeSong.albumPhotoUrl}
        alt="cover art"
        className="rounded-full"
      />
    </div>
    <div className="w-[70%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong.title}
      </p>
      <p className="truncate text-gray-300">
        {activeSong.subtitle}
      </p>
    </div>
  </div>
);

export default Track;
