// components/Browse.js
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useHorrorMovies from "../hooks/useHorrorMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearchPage from "./GptSearchPage";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector((state) => state.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useHorrorMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearchPage />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
