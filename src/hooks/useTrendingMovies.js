// hooks/useTrendingMovies.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OMDB_API_KEY, OMDB_BASE_URL } from "../utils/constants";
import { addTrendingMovies } from "../utils/moviesSlice";

const useTrendingMovies = () => {
  const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    const data = await fetch(
      `${OMDB_BASE_URL}?s=spiderman&apikey=${OMDB_API_KEY}`
    );
    const json = await data.json();
    dispatch(addTrendingMovies(json));
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);
};

export default useTrendingMovies;