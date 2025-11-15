import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { searchMovieByTitle } from "../utils/omdb";
import { getGeminiResponse } from "../utils/gemini";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGptSearchClick = async () => {
    const query = searchText.current.value;
    console.log("Search Query:", query);

    if (!query.trim()) {
      alert("Please enter a search query");
      return;
    }

    setIsLoading(true);

    try {
      // Create prompt for Gemini
      const prompt = `You are a movie recommendation expert. Based on the following query: "${query}", suggest exactly 5 movie names that match this query. Return ONLY the movie names separated by commas, nothing else. No numbering, no explanations, just movie names separated by commas.`;

      // Get AI movie recommendations from Gemini
      const geminiResponse = await getGeminiResponse(prompt);
      console.log("Gemini Response:", geminiResponse);

      // Parse movie names from response
      const movieNames = geminiResponse
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name.length > 0)
        .slice(0, 5);

      console.log("Parsed Movie Names:", movieNames);

      if (movieNames.length === 0) {
        alert("No movie recommendations received. Please try again.");
        setIsLoading(false);
        return;
      }

      // Search each movie in OMDB
      const moviePromises = movieNames.map((movieName) =>
        searchMovieByTitle(movieName)
      );

      const movieResults = await Promise.all(moviePromises);

      // Filter out movies not found in OMDB
      const validMovies = movieResults.filter(
        (movie) => movie && movie.Response === "True"
      );

      console.log("OMDB Movie Results:", validMovies);

      if (validMovies.length === 0) {
        alert("No movies found in database. Try different search terms.");
      } else {
        // Dispatch to Redux store
        dispatch(
          addGptMovieResult({
            movieNames: movieNames,
            movieResults: validMovies,
          })
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="bg-black grid grid-cols-12 w-1/2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].getSearchPlaceholder}
          className="p-4 m-4 col-span-9"
        />
        <button
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGptSearchClick}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;