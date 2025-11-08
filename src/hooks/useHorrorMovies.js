// hooks/useHorrorMovies.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OMDB_API_KEY, OMDB_BASE_URL } from "../utils/constants";
import { addHorrorMovies } from "../utils/moviesSlice";

const useHorrorMovies = () => {
  const dispatch = useDispatch();

  const getHorrorMovies = async () => {
    const data = await fetch(
      `${OMDB_BASE_URL}?s=horror&apikey=${OMDB_API_KEY}`
    );
    const json = await data.json();
    dispatch(addHorrorMovies(json));
  };

  useEffect(() => {
    getHorrorMovies();
  }, []);
};

export default useHorrorMovies;