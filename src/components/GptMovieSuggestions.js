import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  if (!movieNames || movieNames.length === 0) return null;

  return (
    <div className="p-2 sm:p-4 m-2 sm:m-4 bg-black text-white bg-opacity-90 rounded-lg w-full max-w-full overflow-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl py-2 sm:py-4 font-bold px-2 sm:px-4">
          AI Movie Recommendations
        </h1>
        <div className="overflow-x-scroll scrollbar-hide w-full">
          <div className="flex gap-2 sm:gap-3 md:gap-4 pb-4 px-2 sm:px-4">
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