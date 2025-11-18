import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { OMDB_BASE_URL, OMDB_API_KEY } from "../utils/constants";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

          const upcomingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getUpcomingMovies = async () => {
    const data = await fetch(
      `${OMDB_BASE_URL}?s=superman&apikey=${OMDB_API_KEY}`
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json));
  };

  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
