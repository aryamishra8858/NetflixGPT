// components/MainContainer.js
import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if (!movies) return null;

    const mainMovie = movies[0];

    const {Title, Year, Poster, imdbID} = mainMovie;
  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoBackground movieTitle={Title} />
      <VideoTitle Title={Title} Year={Year} Poster={Poster} />
    </div>
  )
}

export default MainContainer