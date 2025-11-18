import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies } from "../utils/moviesSlice";
import { OMDB_BASE_URL, OMDB_API_KEY } from "../utils/constants";

const useTrendingMovies = () => {
  const dispatch = useDispatch();

        const trendingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getTrendingMovies = async () => {
    const data = await fetch(
      `${OMDB_BASE_URL}?s=spiderman&apikey=${OMDB_API_KEY}`
    );
    const json = await data.json();
    dispatch(addTrendingMovies(json));
  };

  useEffect(() => {
    !trendingMovies && getTrendingMovies();
  }, []);
};

export default useTrendingMovies;
