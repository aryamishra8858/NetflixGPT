import React from 'react'

const MovieCard = ({ movie }) => {
  if (!movie?.Poster || movie.Poster === "N/A") return null;

  return (
    <div className="w-32 sm:w-36 md:w-40 lg:w-48 flex-shrink-0">
      <img 
        alt={movie?.Title || "Movie Card"} 
        src={movie.Poster}
        className="w-full h-48 sm:h-52 md:h-60 lg:h-72 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
      />
      <p className="text-white text-xs sm:text-sm mt-2 font-semibold truncate">
        {movie?.Title}
      </p>
      <p className="text-gray-400 text-xs">{movie?.Year}</p>
    </div>
  )
}

export default MovieCard