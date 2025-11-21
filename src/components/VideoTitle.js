import React from "react";

const VideoTitle = ({ Title, Year }) => {
  return (
    <div className="w-full absolute top-0 left-0 pt-[40%] sm:pt-[30%] md:pt-[20%] px-4 sm:px-6 md:px-8 lg:px-12 text-white bg-gradient-to-r from-black overflow-hidden" style={{ aspectRatio: '16/9' }}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold truncate">
        {Title}
      </h1>
      <p className="py-2 sm:py-3 md:py-4 lg:py-6 text-xs sm:text-sm md:text-base lg:text-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/4 line-clamp-2">
        {Year}
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button className="bg-white text-black py-2 sm:py-3 md:py-4 px-6 sm:px-8 md:px-12 text-sm sm:text-base md:text-lg lg:text-xl hover:bg-opacity-80 rounded-lg flex items-center justify-center">
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white py-2 sm:py-3 md:py-4 px-6 sm:px-8 md:px-12 text-sm sm:text-base md:text-lg lg:text-xl bg-opacity-50 rounded-lg flex items-center justify-center">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;