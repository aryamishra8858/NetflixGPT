// utils/moviesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        trendingMovies: null,
        horrorMovies: null,
        upcomingMovies: null,
        trailerVideo: null
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload.Search; 
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload.Search;
        },
        addTrendingMovies: (state, action) => {
            state.trendingMovies = action.payload.Search;
        },
        addHorrorMovies: (state, action) => {
            state.horrorMovies = action.payload.Search;
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload.Search;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        }
    }
});

export const { 
    addNowPlayingMovies, 
    addPopularMovies, 
    addTrendingMovies, 
    addHorrorMovies, 
    addUpcomingMovies, 
    addTrailerVideo 
} = movieSlice.actions;

export default movieSlice.reducer;