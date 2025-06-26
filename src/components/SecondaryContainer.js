import { useState } from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import MovieTrailerOverlay from "./MovieTrailerOverlay";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="mt-0 pl-4 md:-mt-64 md:pl-10 relative z-20">
          <MovieList
            title={"Now Playing"}
            movies={movies.nowPlayingMovies}
            onCardClick={setSelectedMovie}
          />
          <MovieList
            title={"Popular"}
            movies={movies.popularMovies}
            onCardClick={setSelectedMovie}
          />
          <MovieList
            title={"Top Rated"}
            movies={movies.topRatedMovies}
            onCardClick={setSelectedMovie}
          />
          <MovieList
            title={"Upcoming Movies"}
            movies={movies.upcomingMovies}
            onCardClick={setSelectedMovie}
          />
        </div>

        {selectedMovie && (
          <MovieTrailerOverlay
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    )
  );
};

export default SecondaryContainer;
