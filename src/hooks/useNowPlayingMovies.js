// hooks/useNowPlayingMovies.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OMDB_API_KEY, OMDB_BASE_URL } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      `${OMDB_BASE_URL}?s=batman&apikey=${OMDB_API_KEY}`
    );
    const json = await data.json();
    dispatch(addNowPlayingMovies(json));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;