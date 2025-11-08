// components/MovieCard.js
import React from 'react'

const MovieCard = ({ posterPath }) => {
  const IMG_CDN = posterPath && posterPath !== "N/A" 
    ? posterPath 
    : "https://via.placeholder.com/192x288/1a1a1a/ffffff?text=No+Image";
  
  return (
    <div className="w-48 pr-4">
      <img 
        alt="Movie Card" 
        src={IMG_CDN}
        className="w-48 h-72 object-cover"
      />
    </div>
  )
}

export default MovieCard