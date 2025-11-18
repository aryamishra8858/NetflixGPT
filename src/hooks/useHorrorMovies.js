import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHorrorMovies } from "../utils/moviesSlice";
import { OMDB_BASE_URL, OMDB_API_KEY } from "../utils/constants";

const useHorrorMovies = () => {
  const dispatch = useDispatch();

      const horrorMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getHorrorMovies = async () => {
    const data = await fetch(
      `${OMDB_BASE_URL}?s=horror&apikey=${OMDB_API_KEY}`
    );
    const json = await data.json();
    dispatch(addHorrorMovies(json));
  };

  useEffect(() => {
    !horrorMovies && getHorrorMovies();
  }, []);
};

export default useHorrorMovies;
