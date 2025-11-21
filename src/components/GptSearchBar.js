import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { searchMovieByTitle } from "../utils/omdb";
import { getGroqResponse } from "../utils/groq";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGptSearchClick = async () => {
    const query = searchText.current.value;
    console.log("Search Query:", query);

    if (!query.trim()) {
      setErrorMessage("Please enter a search query");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const prompt = `As a movie expert, suggest exactly 15 popular movies for: "${query}". Reply with ONLY movie names separated by commas. No explanations, just: Movie1, Movie2, Movie3, Movie4, Movie5, Movie6, Movie7, Movie8, Movie9, Movie10, Movie11, Movie12, Movie13, Movie14, Movie15`;

      console.log("Sending prompt to AI...");
      
      let aiResponse;
      try {
        aiResponse = await getGroqResponse(prompt);
        console.log("AI Response:", aiResponse);
      } catch (aiError) {
        console.error("AI API Error:", aiError);
        setErrorMessage(aiError.message || "AI service is temporarily unavailable. Please try again in a moment.");
        setIsLoading(false);
        return;
      }

      const cleanResponse = aiResponse
        .replace(/\n/g, ',')
        .replace(/\d+\./g, ',')
        .replace(/[-•*]/g, ',')
        .replace(/"/g, '');
      
      const movieNames = cleanResponse
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name.length > 0 && name.length < 100)
        .slice(0, 15);

      console.log("Parsed Movie Names:", movieNames);

      if (movieNames.length === 0) {
        setErrorMessage("No movie recommendations received. Please try again.");
        setIsLoading(false);
        return;
      }

      console.log("Searching movies in OMDB...");
      const movieResults = [];
      
      for (let i = 0; i < movieNames.length; i++) {
        try {
          const result = await searchMovieByTitle(movieNames[i]);
          if (result && result.Response === "True") {
            movieResults.push(result);
          }
          if (i < movieNames.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        } catch (error) {
          console.error(`Error fetching ${movieNames[i]}:`, error);
        }
      }

      console.log("OMDB Movie Results:", movieResults);

      if (movieResults.length === 0) {
        setErrorMessage("No movies found in database. Try different search terms.");
      } else {
        dispatch(
          addGptMovieResult({
            movieNames: movieNames.slice(0, movieResults.length),
            movieResults: movieResults,
          })
        );
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(`Error: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-[35%] sm:pt-[25%] md:pt-[12%] lg:pt-[10%] flex justify-center flex-col items-center px-4 sm:px-6 min-h-screen">
      <form
        className="bg-black bg-opacity-80 grid grid-cols-12 w-full sm:w-11/12 md:w-3/4 lg:w-1/2 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].getSearchPlaceholder}
          className="p-3 sm:p-4 m-2 sm:m-4 col-span-12 sm:col-span-9 rounded-lg text-sm sm:text-base"
        />
        <button
          className="py-2 sm:py-2 px-3 sm:px-4 m-2 sm:m-4 bg-red-700 text-white rounded-lg col-span-12 sm:col-span-3 disabled:bg-gray-500 disabled:cursor-not-allowed text-sm sm:text-base font-semibold"
          onClick={handleGptSearchClick}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : lang[langKey].search}
        </button>
      </form>
      {errorMessage && (
        <div className="text-red-500 mt-4 bg-black bg-opacity-80 p-3 sm:p-4 rounded max-w-xl w-full sm:w-auto text-center border border-red-500 text-sm sm:text-base mx-4">
          {errorMessage}
        </div>
      )}
      {isLoading && (
        <div className="text-white mt-4 bg-black bg-opacity-80 p-3 sm:p-4 rounded mx-4">
          <div className="flex items-center gap-2 justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span className="text-sm sm:text-base">Finding best movies for you...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;