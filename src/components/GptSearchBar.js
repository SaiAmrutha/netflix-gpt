import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { genAI } from "../utils/geminiAi";
import lang from "../utils/languageConstants";
import { addGptMovieResult } from "../utils/useGPTSlice";

const GptSearchBar = () => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMBD = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGPTSearchClick = async () => {
    // console.log(searchText.current.value);
    // make an API call to GPT and get movie results
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query" +
      searchText.current.value +
      ". Only give me names of Top 5 movies, comma seperated like the example given ahead. Example: Kubera, Ace, Thug Life, Golmaal, Spider Man";

    const result = await model.generateContent(gptQuery);
    const response = await result.response;
    const responseText = response.text();

    // for each movie search TMDB API
    const match = responseText.match(/[:: ](.*)/);
    const movieListText = match ? match[1] : responseText;
    const gptMovies = movieListText.split(",").map((movie) => movie.trim()); //this will result in array of movies
    const promiseArray = gptMovies.map((movie) => searchMovieTMBD(movie));
    console.log("gptMovies", gptMovies);
    // a new promise will be created for each movie
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  // if (!response.result) {
  // to do: error handling
  // }

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-5 m-8 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="w-full col-span-2 m-8 py-2 px-4 bg-red-600 rounded-lg text-white"
          onClick={handleGPTSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
