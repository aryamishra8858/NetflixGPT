import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieTitle }) => {
  useMovieTrailer(movieTitle);
  
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {trailerVideo && (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${trailerVideo.id.videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerVideo.id.videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default VideoBackground;