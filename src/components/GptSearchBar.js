import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { searchMovieByTitle } from "../utils/omdb";
import { getGroqResponse } from "../utils/groq"; // ← Changed this line
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
      // Create prompt for AI - ask for 15 movies
      const prompt = `As a movie expert, suggest exactly 15 popular movies for: "${query}". Reply with ONLY movie names separated by commas. No explanations, just: Movie1, Movie2, Movie3, Movie4, Movie5, Movie6, Movie7, Movie8, Movie9, Movie10, Movie11, Movie12, Movie13, Movie14, Movie15`;

      console.log("Sending prompt to AI...");
      
      let aiResponse;
      try {
        // Get AI movie recommendations
        aiResponse = await getGroqResponse(prompt); // ← Changed this line
        console.log("AI Response:", aiResponse);
      } catch (aiError) {
        console.error("AI API Error:", aiError);
        setErrorMessage(aiError.message || "AI service is temporarily unavailable. Please try again in a moment.");
        setIsLoading(false);
        return;
      }

      // Parse movie names from response - clean up the response
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

      // Search each movie in OMDB with delay to avoid rate limits
      console.log("Searching movies in OMDB...");
      const movieResults = [];
      
      for (let i = 0; i < movieNames.length; i++) {
        try {
          const result = await searchMovieByTitle(movieNames[i]);
          if (result && result.Response === "True") {
            movieResults.push(result);
          }
          // Small delay between requests to avoid rate limiting
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
        // Dispatch to Redux store
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
    <div className="pt-[10%] flex justify-center flex-col items-center">
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
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3 disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={handleGptSearchClick}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : lang[langKey].search}
        </button>
      </form>
      {errorMessage && (
        <div className="text-red-500 mt-2 bg-black bg-opacity-80 p-3 rounded max-w-xl text-center border border-red-500">
          {errorMessage}
        </div>
      )}
      {isLoading && (
        <div className="text-white mt-2 bg-black bg-opacity-80 p-3 rounded">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Finding best movies for you...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;