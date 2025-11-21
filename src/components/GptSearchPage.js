import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          src={BG_URL}
          alt="Login Banner"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      <div className="relative">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearch;