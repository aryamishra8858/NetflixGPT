// hooks/useUpcomingMovies.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OMDB_API_KEY, OMDB_BASE_URL } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const data = await fetch(
      `${OMDB_BASE_URL}?s=superman&apikey=${OMDB_API_KEY}`
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json));
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;