import { useState } from "react";
import { BG_IMG } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import MovieTrailerOverlay from "./MovieTrailerOverlay";

const GPTSearch = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const handleGptCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <div className="fixed -z-10 w-full h-screen">
        <img
          className="w-full h-full object-cover"
          src={BG_IMG}
          alt="background-image"
        />
      </div>
      <div className="relative z-10">
        <GptSearchBar />
        <GptMovieSuggestions onCardClick={handleGptCardClick} />
        {selectedMovie && (
          <MovieTrailerOverlay
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </>
  );
};

export default GPTSearch;
