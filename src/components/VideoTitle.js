// components/VideoTitle.js
import React from "react";

const VideoTitle = ({ Title, Year }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-12 absolute top-0 text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{Title}</h1>
      <p className="py-6 text-lg w-1/4">{Year}</p>
      <div className="flex">
        <button className="bg-white text-black py-4 px-12 text-xl hover:bg-opacity-80 rounded-lg flex items-center">
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white py-4 px-12 ml-3 text-xl bg-opacity-50 rounded-lg flex items-center">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;