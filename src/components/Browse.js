import { useState } from "react";
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GPTSearch from "./GPTSearch";
import Header from "./Header";
import MainContainer from "./MainContainer";
import MovieTrailerOverlay from "./MovieTrailerOverlay";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const showGPTSearch = useSelector((store) => store.GPT.showGPTSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header />
      {showGPTSearch ? (
        <GPTSearch />
      ) : (
        <>
          {!selectedMovie && <MainContainer />}
          <SecondaryContainer onCardClick={setSelectedMovie} />
          {selectedMovie && (
            <MovieTrailerOverlay
              movie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Browse;
