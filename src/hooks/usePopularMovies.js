import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { OMDB_BASE_URL, OMDB_API_KEY } from "../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();

    const popularMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getPopularMovies = async () => {
    const data = await fetch(
      `${OMDB_BASE_URL}?s=avengers&apikey=${OMDB_API_KEY}`
    );
    const json = await data.json();
    dispatch(addPopularMovies(json));
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};

export default usePopularMovies;
