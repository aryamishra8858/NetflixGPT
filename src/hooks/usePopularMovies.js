// hooks/usePopularMovies.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OMDB_API_KEY, OMDB_BASE_URL } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const data = await fetch(
      `${OMDB_BASE_URL}?s=avengers&apikey=${OMDB_API_KEY}`
    );
    const json = await data.json();
    dispatch(addPopularMovies(json));
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;