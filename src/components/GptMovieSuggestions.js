import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        <h1 className="text-3xl py-4 font-bold">AI Movie Recommendations</h1>
        <div className="flex overflow-x-scroll">
          <div className="flex">
            {movieResults?.map((movie, index) => (
              <MovieCard key={movie.imdbID || index} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptMovieSuggestions;