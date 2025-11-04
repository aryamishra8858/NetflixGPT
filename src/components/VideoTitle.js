// components/VideoTitle.js
import React from "react";

const VideoTitle = ({ Title, Year, Poster }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{Title}</h1>
      <p className="py-6 text-lg w-1/2">{Year}</p>
      <div>
        <button className="bg-white text-black p-4 px-12 my-5 mx-2 text-xl hover:bg-opacity-80 rounded-lg">
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white p-4 px-12 my-5 text-xl bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;