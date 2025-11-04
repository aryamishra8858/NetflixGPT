// hooks/useMovieTrailer.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { YOUTUBE_API_KEY } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieTitle) => {
  const dispatch = useDispatch();

  const getMovieTrailer = async () => {
    // Search YouTube for movie trailer
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieTitle} official trailer&type=video&key=${YOUTUBE_API_KEY}`
    );
    const json = await data.json();
    
    if (json.items && json.items.length > 0) {
      const trailer = json.items[0];
      dispatch(addTrailerVideo(trailer));
    }
  };

  useEffect(() => {
    if (movieTitle) {
      getMovieTrailer();
    }
  }, [movieTitle]);
};

export default useMovieTrailer;