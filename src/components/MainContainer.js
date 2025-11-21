import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if (!movies) return null;

    const mainMovie = movies[0];

    const {Title, Year, imdbID} = mainMovie;
  return (
    <div className="pt-[30%] sm:pt-[20%] md:pt-0 bg-black w-full overflow-hidden">
      <VideoBackground movieTitle={Title} />
      <VideoTitle Title={Title} Year={Year} />
    </div>
  )
}

export default MainContainer