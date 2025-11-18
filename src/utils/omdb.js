const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const OMDB_BASE_URL = "https://www.omdbapi.com/";

export const searchMovieByTitle = async (movieTitle) => {
  try {
    const response = await fetch(
      `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(movieTitle)}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("OMDB API Error:", error);
    return null;
  }
};

export const searchMoviesByQuery = async (query) => {
  try {
    const response = await fetch(
      `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("OMDB API Error:", error);
    return { Response: "False", Error: "Network error" };
  }
};