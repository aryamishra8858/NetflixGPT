// Browse.js
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/* 
      MainContainer
         - Video Background
         - Video title
      Secondary Container
         - Movielist *n
         - Cards *n 
       */}
    </div>
  );
};

export default Browse;
