import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  if (!movieNames || movieNames.length === 0) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90 rounded-lg">
      <div>
        <h1 className="text-3xl py-4 font-bold">
          AI Movie Recommendations
        </h1>
        <div className="overflow-x-scroll">
          <div className="flex gap-4 pb-4">
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