import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-2 sm:px-4 md:px-6 w-full">
      <h1 className="text-xl sm:text-2xl md:text-3xl py-2 sm:py-3 md:py-4 text-white font-semibold">
        {title}
      </h1>
      <div className="overflow-x-scroll scrollbar-hide w-full">
        <div className="flex gap-2 sm:gap-3 md:gap-4 pb-2">
          {movies?.map((movie, index) => (
            <MovieCard key={movie.imdbID + "-" + index} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;