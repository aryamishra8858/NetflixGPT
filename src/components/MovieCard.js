import React from 'react'

const MovieCard = ({ movie }) => {
  // If poster is missing or "N/A", do NOT render anything
  if (!movie?.Poster || movie.Poster === "N/A") return null;

  return (
    <div className="w-48 pr-4">
      <img 
        alt={movie?.Title || "Movie Card"} 
        src={movie.Poster}
        className="w-48 h-72 object-cover rounded-lg"
      />
      <p className="text-white text-sm mt-2 font-semibold truncate">
        {movie?.Title}
      </p>
      <p className="text-gray-400 text-xs">{movie?.Year}</p>
    </div>
  )
}

export default MovieCard
