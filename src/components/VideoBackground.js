// components/VideoBackground.js
import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieTitle }) => {
  useMovieTrailer(movieTitle);
  
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  return (
    <div className="w-screen aspect-video">
      {trailerVideo && (
        <iframe
          className="w-screen aspect-video"
          src={`https://www.youtube.com/embed/${trailerVideo.id.videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerVideo.id.videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      )}
    </div>
  );
};

export default VideoBackground;